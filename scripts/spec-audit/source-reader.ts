import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { resolveUtility, type TokenRef, type TokenSheet } from './resolver.js';

export type SourceFile = {
	path: string;
	source: string;
};

const SOURCE_EXTENSIONS = ['.svelte', '.ts', '.js', '.css'];
const EXCLUDED_FILE = /(?:\.stories\.svelte|\.d\.ts|\.map)$/;

function literalContents(source: string): string[] {
	// Comments contain contractions and quoted examples that otherwise pair with
	// later source quotes and swallow real class strings in a regex scan.
	const code = source
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/(^|[^:])\/\/.*$/gm, '$1');
	const literal = /'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"|`((?:\\.|[^`\\])*)`/g;
	const values: string[] = [];
	let match: RegExpExecArray | null;
	while ((match = literal.exec(code)) !== null) {
		values.push(match[1] ?? match[2] ?? match[3] ?? '');
	}
	return values;
}

/** Read implementation sources recursively, excluding stories and generated declarations. */
export function readComponentSources(dir: string): SourceFile[] {
	const files: SourceFile[] = [];

	function visit(current: string): void {
		for (const entry of readdirSync(current).sort()) {
			const path = join(current, entry);
			const stat = statSync(path);
			if (stat.isDirectory()) {
				visit(path);
				continue;
			}
			if (EXCLUDED_FILE.test(entry) || !SOURCE_EXTENSIONS.some((ext) => entry.endsWith(ext))) {
				continue;
			}
			files.push({ path, source: readFileSync(path, 'utf8') });
		}
	}

	visit(dir);
	return files;
}

/**
 * Extract literal utility tokens from implementation source.
 *
 * This deliberately scans all string literals rather than only `class=` and
 * `cn()` calls: the library also stores classes in tv() configs, class maps,
 * and conditional expressions. Values still have to resolve against the
 * authoritative token sheet, so ordinary prose/prop literals are discarded.
 */
export function extractResolvedSourceTokens(
	files: SourceFile[],
	sheet: TokenSheet
): Map<string, TokenRef> {
	const tokens = new Map<string, TokenRef>();
	for (const file of files) {
		for (const content of literalContents(file.source)) {
			for (const candidate of content.split(/\s+/)) {
				const resolved = resolveUtility(candidate, sheet);
				if (resolved) tokens.set(resolved.cssVar, resolved);
			}
		}
	}

	return tokens;
}

/** Every whitespace-delimited token present in implementation string literals. */
export function extractSourceClassCandidates(files: SourceFile[]): Set<string> {
	const candidates = new Set<string>();
	for (const file of files) {
		for (const content of literalContents(file.source)) {
			for (const candidate of content.split(/\s+/)) {
				const value = candidate.trim();
				if (value && !value.includes('${')) {
					candidates.add(value);
					const unmodified = value.split(':').at(-1)?.replace(/^!/, '');
					if (unmodified) candidates.add(unmodified);
				}
			}
		}
	}
	return candidates;
}
