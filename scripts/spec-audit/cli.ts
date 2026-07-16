/**
 * spec-audit CLI — compares Dashbook component specs with @dashfi/svelte.
 *
 * Safe default gate: every resolved token value recorded by every spec must
 * match the authoritative lib theme sheet. Source-token coverage is reported
 * for all implementation files and becomes gating with `--strict`.
 *
 * Usage:
 *   pnpm spec-audit
 *   pnpm spec-audit --write
 *   pnpm spec-audit --json
 *   DASHBOOK_LIB_ROOT=../../libs/svelte-components/lib/src/lib pnpm spec-audit
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { auditRecordedTokenValues, compareTokenMaps, type TokenFinding } from './audit.js';
import { parseTokenSheet, resolveCssVar, type TokenSheet } from './resolver.js';
import {
	readSpecDimensionUtilities,
	readSpecTokenRefs,
	rewriteSpecTokenRefs,
	type TokenRewrite
} from './spec-reader.js';
import {
	extractResolvedSourceTokens,
	extractSourceClassCandidates,
	readComponentSources
} from './source-reader.js';

const ROOT = process.cwd();
const LIB_ROOT = process.env.DASHBOOK_LIB_ROOT ?? join(ROOT, 'node_modules/@dashfi/svelte/dist');
const UI_DIR = join(LIB_ROOT, 'ui');
const SHEET_PATH = join(LIB_ROOT, 'styles/global.css');
const SPECS_DIR = join(ROOT, 'src/lib/specs/components');
const FOUNDATION_PATH = join(ROOT, 'src/lib/tokens.ts');
const asJson = process.argv.includes('--json');
const write = process.argv.includes('--write');
const strict = process.argv.includes('--strict');

type ComponentResult =
	| { slug: string; status: 'no-spec' }
	| {
			slug: string;
			status: 'audited';
			valueFindings: TokenFinding[];
			coverageFindings: TokenFinding[];
			untracedDimensions: string[];
			rewrites: TokenRewrite[];
	  };

type FoundationResult = {
	status: 'audited';
	valueFindings: TokenFinding[];
	rewrites: TokenRewrite[];
};

const FOUNDATION_ALIASES: Record<string, string> = {
	'--bg': '--color-background',
	'--bg-muted': '--color-muted',
	'--fg': '--color-foreground',
	'--fg-muted': '--color-muted-foreground',
	'--border': '--color-border',
	'--input-border': '--color-input',
	'--primary': '--color-primary',
	'--primary-fg': '--color-primary-foreground',
	'--brand': '--color-brand',
	'--brand-fg': '--color-brand-foreground',
	'--destructive': '--color-destructive',
	'--ring': '--color-ring',
	'--card': '--color-card',
	'--popover': '--color-popover'
};

function resolvedValue(
	cssVar: string,
	sheet: TokenSheet
): { light: string; dark: string } | undefined {
	const resolved = resolveCssVar(cssVar, sheet);
	return resolved ? { light: resolved.light, dark: resolved.dark } : undefined;
}

function auditComponent(slug: string, dir: string, sheet: TokenSheet): ComponentResult {
	const specPath = join(SPECS_DIR, `${slug}.ts`);
	if (!existsSync(specPath)) return { slug, status: 'no-spec' };

	let specSource = readFileSync(specPath, 'utf8');
	let rewrites: TokenRewrite[] = [];
	if (write) {
		const result = rewriteSpecTokenRefs(specSource, (cssVar) => resolvedValue(cssVar, sheet));
		specSource = result.source;
		rewrites = result.rewrites;
		if (rewrites.length > 0) writeFileSync(specPath, specSource);
	}

	const recorded = readSpecTokenRefs(specSource);
	const sources = readComponentSources(dir);
	const sourceTokens = extractResolvedSourceTokens(sources, sheet);
	const sourceClasses = extractSourceClassCandidates(sources);
	const untracedDimensions = [...readSpecDimensionUtilities(specSource)].filter(
		(utility) => !sourceClasses.has(utility)
	);
	return {
		slug,
		status: 'audited',
		valueFindings: auditRecordedTokenValues(recorded, sheet),
		coverageFindings: compareTokenMaps(sourceTokens, recorded),
		untracedDimensions,
		rewrites
	};
}

function auditFoundation(sheet: TokenSheet): FoundationResult {
	let source = readFileSync(FOUNDATION_PATH, 'utf8');
	let rewrites: TokenRewrite[] = [];
	const resolveFoundation = (cssVar: string): { light: string; dark: string } | undefined => {
		const libCssVar = FOUNDATION_ALIASES[cssVar];
		return libCssVar ? resolvedValue(libCssVar, sheet) : undefined;
	};
	if (write) {
		const result = rewriteSpecTokenRefs(source, resolveFoundation);
		source = result.source;
		rewrites = result.rewrites;
		if (rewrites.length > 0) writeFileSync(FOUNDATION_PATH, source);
	}

	const recorded = readSpecTokenRefs(source);
	const expected = new Map<string, { light: string; dark: string }>();
	const foundationRecorded = new Map<string, { light: string; dark: string }>();
	for (const [cssVar, libCssVar] of Object.entries(FOUNDATION_ALIASES)) {
		const value = resolvedValue(libCssVar, sheet);
		const current = recorded.get(cssVar);
		if (value && current) {
			expected.set(cssVar, value);
			foundationRecorded.set(cssVar, current);
		}
	}
	return {
		status: 'audited',
		valueFindings: compareTokenMaps(expected, foundationRecorded),
		rewrites
	};
}

function main(): void {
	if (!existsSync(UI_DIR)) {
		console.error(`lib ui dir not found: ${UI_DIR}\nSet DASHBOOK_LIB_ROOT to the lib source root.`);
		process.exitCode = 2;
		return;
	}
	if (!existsSync(SHEET_PATH)) {
		console.error(`lib token sheet not found: ${SHEET_PATH}`);
		process.exitCode = 2;
		return;
	}

	const sheet = parseTokenSheet(readFileSync(SHEET_PATH, 'utf8'));
	const foundation = auditFoundation(sheet);
	const results: ComponentResult[] = [];
	for (const slug of readdirSync(UI_DIR).sort()) {
		const dir = join(UI_DIR, slug);
		if (statSync(dir).isDirectory()) results.push(auditComponent(slug, dir, sheet));
	}

	if (asJson) console.log(JSON.stringify({ foundation, components: results }, null, 2));
	else report(foundation, results);

	const hasValueDrift = results.some(
		(result) =>
			result.status === 'audited' &&
			result.valueFindings.some((finding) => finding.verdict === 'drift')
	);
	const hasCoverageGap = results.some(
		(result) =>
			result.status === 'no-spec' ||
			(result.status === 'audited' &&
				(result.coverageFindings.some((finding) => finding.verdict === 'missing') ||
					result.untracedDimensions.length > 0))
	);
	const hasFoundationDrift = foundation.valueFindings.some(
		(finding) => finding.verdict === 'drift'
	);
	process.exitCode = hasFoundationDrift || hasValueDrift || (strict && hasCoverageGap) ? 1 : 0;
}

function report(foundation: FoundationResult, results: ComponentResult[]): void {
	let audited = 0;
	let valueDrift = 0;
	let coverageGaps = 0;
	let untracedDimensions = 0;
	let rewrites = 0;

	console.log('\nspec-audit — component spec ↔ @dashfi/svelte\n' + '='.repeat(52));
	const foundationDrift = foundation.valueFindings.filter((finding) => finding.verdict === 'drift');
	if (foundationDrift.length > 0 || foundation.rewrites.length > 0) {
		console.log(
			`\n${foundationDrift.length > 0 ? '✗' : '✓'} product foundation  (${foundationDrift.length} stale values${
				foundation.rewrites.length > 0 ? `, ${foundation.rewrites.length} rewritten` : ''
			})`
		);
		for (const finding of foundationDrift) {
			console.log(
				`    DRIFT ${finding.cssVar}: lib ${finding.expected.light}/${finding.expected.dark} vs foundation ${finding.recorded?.light}/${finding.recorded?.dark}`
			);
		}
	}
	for (const result of results) {
		if (result.status === 'no-spec') {
			console.log(`\n! ${result.slug}  no Dashbook spec`);
			continue;
		}

		audited++;
		const drifted = result.valueFindings.filter((finding) => finding.verdict === 'drift');
		const missing = result.coverageFindings.filter((finding) => finding.verdict === 'missing');
		const untraced = result.untracedDimensions;
		valueDrift += drifted.length;
		coverageGaps += missing.length;
		untracedDimensions += untraced.length;
		rewrites += result.rewrites.length;
		if (
			drifted.length === 0 &&
			missing.length === 0 &&
			untraced.length === 0 &&
			result.rewrites.length === 0
		)
			continue;

		const flag = drifted.length > 0 ? '✗' : missing.length > 0 || untraced.length > 0 ? '•' : '✓';
		console.log(
			`\n${flag} ${result.slug}  (${drifted.length} stale values, ${missing.length} source tokens undocumented, ${untraced.length} dimension classes untraced${
				result.rewrites.length > 0 ? `, ${result.rewrites.length} rewritten` : ''
			})`
		);
		for (const finding of drifted) {
			console.log(
				`    DRIFT ${finding.cssVar}: lib ${finding.expected.light}/${finding.expected.dark} vs spec ${finding.recorded?.light}/${finding.recorded?.dark}`
			);
		}
		for (const finding of missing) {
			console.log(
				`    COVERAGE ${finding.cssVar}: used by source, not recorded by spec (${finding.expected.light}/${finding.expected.dark})`
			);
		}
		for (const utility of untraced) {
			console.log(`    TRACE dimensions.tw records ${utility}, but source does not contain it`);
		}
	}

	const noSpec = results.filter((result) => result.status === 'no-spec').length;
	console.log('\n' + '='.repeat(52));
	console.log(
		`audited product foundation + ${audited} components · ${foundationDrift.length + valueDrift} stale resolved values · ` +
			`${coverageGaps} source-token coverage gaps · ${untracedDimensions} untraced dimension classes · ` +
			`${noSpec} lib components without specs` +
			(write ? ` · ${rewrites + foundation.rewrites.length} values rewritten` : '')
	);
	if (!strict && (coverageGaps > 0 || untracedDimensions > 0 || noSpec > 0)) {
		console.log('coverage gaps are advisory; pass --strict to make them gating');
	}
}

main();
