/**
 * spec-audit CLI — runs the drift engine against the real lib + specs.
 *
 * Migration-neutral: the lib root is a single env knob.
 *   - today (standalone):  node_modules/@dashfi/svelte/dist   (default)
 *   - after core migration: set DASHBOOK_LIB_ROOT to libs/svelte-components/lib/src/lib
 *
 * This first cut covers the tv() tier (components whose variants come from a
 * tailwind-variants config). Components with no tv() config are reported as
 * `unsupported` — they need the static-cn / class-map / cn-conditional
 * extractors, which are the tracked follow-ups.
 *
 * Exit code is nonzero when any drift is found (the future CI gate).
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseTokenSheet } from './resolver.js';
import { extractTvBlocks } from './tv-extractor.js';
import { readSpecTokenRefs } from './spec-reader.js';
import { expectedTokensFromTv, compareTokenMaps, type TokenFinding } from './audit.js';

const ROOT = process.cwd();
const LIB_ROOT = process.env.DASHBOOK_LIB_ROOT ?? join(ROOT, 'node_modules/@dashfi/svelte/dist');
const UI_DIR = join(LIB_ROOT, 'ui');
const SHEET_PATH = join(LIB_ROOT, 'styles/global.css');
const SPECS_DIR = join(ROOT, 'src/lib/specs/components');
const asJson = process.argv.includes('--json');

type ComponentResult =
	| { slug: string; status: 'unsupported' }
	| { slug: string; status: 'no-spec' }
	| { slug: string; status: 'audited'; findings: TokenFinding[] };

function componentSource(dir: string): string {
	const parts: string[] = [];
	for (const entry of readdirSync(dir)) {
		if (entry.endsWith('.ts') || entry.endsWith('.svelte')) {
			parts.push(readFileSync(join(dir, entry), 'utf8'));
		}
	}
	return parts.join('\n');
}

function main(): void {
	if (!existsSync(UI_DIR)) {
		console.error(`lib ui dir not found: ${UI_DIR}\nSet DASHBOOK_LIB_ROOT to the lib source root.`);
		process.exit(2);
	}
	const sheet = parseTokenSheet(readFileSync(SHEET_PATH, 'utf8'));

	const results: ComponentResult[] = [];
	for (const slug of readdirSync(UI_DIR).sort()) {
		const dir = join(UI_DIR, slug);
		if (!statSync(dir).isDirectory()) continue;

		const blocks = extractTvBlocks(componentSource(dir));
		if (blocks.length === 0) {
			results.push({ slug, status: 'unsupported' });
			continue;
		}
		const specPath = join(SPECS_DIR, `${slug}.ts`);
		if (!existsSync(specPath)) {
			results.push({ slug, status: 'no-spec' });
			continue;
		}
		const expected = expectedTokensFromTv(blocks, sheet);
		const recorded = readSpecTokenRefs(readFileSync(specPath, 'utf8'));
		results.push({ slug, status: 'audited', findings: compareTokenMaps(expected, recorded) });
	}

	if (asJson) {
		console.log(JSON.stringify(results, null, 2));
	} else {
		report(results);
	}

	const anyDrift = results.some(
		(r) => r.status === 'audited' && r.findings.some((f) => f.verdict === 'drift')
	);
	process.exit(anyDrift ? 1 : 0);
}

function report(results: ComponentResult[]): void {
	let audited = 0;
	let drift = 0;
	let missing = 0;
	console.log('\nspec-audit — tv() tier drift report\n' + '='.repeat(40));
	for (const r of results) {
		if (r.status !== 'audited') continue;
		audited++;
		const drifted = r.findings.filter((f) => f.verdict === 'drift');
		const miss = r.findings.filter((f) => f.verdict === 'missing');
		drift += drifted.length;
		missing += miss.length;
		const ok = r.findings.length - drifted.length - miss.length;
		const flag = drifted.length ? '✗' : miss.length ? '•' : '✓';
		console.log(`\n${flag} ${r.slug}  (${ok} ok, ${drifted.length} drift, ${miss.length} missing)`);
		for (const f of drifted) {
			console.log(
				`    DRIFT ${f.cssVar}: lib ${f.expected.light}/${f.expected.dark} vs spec ${f.recorded?.light}/${f.recorded?.dark}`
			);
		}
		for (const f of miss) {
			console.log(`    MISSING ${f.cssVar}: lib says ${f.expected.light}/${f.expected.dark}, spec records none`);
		}
	}
	const unsupported = results.filter((r) => r.status === 'unsupported').length;
	const noSpec = results.filter((r) => r.status === 'no-spec').length;
	console.log('\n' + '='.repeat(40));
	console.log(
		`audited ${audited} tv() components · ${drift} drift · ${missing} missing · ` +
			`${unsupported} unsupported (need other extractors) · ${noSpec} no-spec`
	);
}

main();
