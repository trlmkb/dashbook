/**
 * Spec reader — statically extracts the token hex values a spec currently
 * records, without importing the spec module (which would drag in SvelteKit
 * aliases + svelte compilation). Same "parse, don't execute" principle the
 * design applies to lib source.
 *
 * Specs write TokenRefs as `{ cssVar: '--color-x', light: '#..', dark: '#..' }`.
 */

export type RecordedRef = { light: string; dark: string };

const TOKEN_REF = /cssVar:\s*'([^']+)'\s*,\s*light:\s*'([^']+)'\s*,\s*dark:\s*'([^']+)'/g;

/** Map of cssVar → recorded {light, dark} for every TokenRef literal in the source. */
export function readSpecTokenRefs(source: string): Map<string, RecordedRef> {
	const refs = new Map<string, RecordedRef>();
	let m: RegExpExecArray | null;
	while ((m = TOKEN_REF.exec(source)) !== null) {
		refs.set(m[1] as string, { light: m[2] as string, dark: m[3] as string });
	}
	return refs;
}

/** Utility classes the spec claims in structured `dimensions[].tw` fields. */
export function readSpecDimensionUtilities(source: string): Set<string> {
	const utilities = new Set<string>();
	const tw = /\btw:\s*(['"])(.*?)\1/g;
	let match: RegExpExecArray | null;
	while ((match = tw.exec(source)) !== null) {
		for (const utility of (match[2] ?? '').split(/\s+/)) {
			if (utility) utilities.add(utility);
		}
	}
	return utilities;
}

export type TokenRewrite = {
	cssVar: string;
	before: RecordedRef;
	after: RecordedRef;
};

/**
 * Rewrite only TokenRef light/dark literals. All surrounding prose, ordering,
 * comments, and formatting stay byte-for-byte identical.
 */
export function rewriteSpecTokenRefs(
	source: string,
	resolve: (cssVar: string) => RecordedRef | undefined
): { source: string; rewrites: TokenRewrite[] } {
	const rewrites: TokenRewrite[] = [];
	const rewritten = source.replace(
		TOKEN_REF,
		(full, cssVar: string, light: string, dark: string) => {
			const next = resolve(cssVar);
			if (!next || (next.light === light && next.dark === dark)) return full;
			rewrites.push({
				cssVar,
				before: { light, dark },
				after: next
			});
			return full
				.replace(`light: '${light}'`, `light: '${next.light}'`)
				.replace(`dark: '${dark}'`, `dark: '${next.dark}'`);
		}
	);
	return { source: rewritten, rewrites };
}
