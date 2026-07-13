/**
 * Spec reader — statically extracts the token hex values a spec currently
 * records, without importing the spec module (which would drag in SvelteKit
 * aliases + svelte compilation). Same "parse, don't execute" principle the
 * design applies to lib source.
 *
 * Specs write TokenRefs as `{ cssVar: '--color-x', light: '#..', dark: '#..' }`.
 */

export type RecordedRef = { light: string; dark: string };

const TOKEN_REF =
	/cssVar:\s*'([^']+)'\s*,\s*light:\s*'([^']+)'\s*,\s*dark:\s*'([^']+)'/g;

/** Map of cssVar → recorded {light, dark} for every TokenRef literal in the source. */
export function readSpecTokenRefs(source: string): Map<string, RecordedRef> {
	const refs = new Map<string, RecordedRef>();
	let m: RegExpExecArray | null;
	while ((m = TOKEN_REF.exec(source)) !== null) {
		refs.set(m[1] as string, { light: m[2] as string, dark: m[3] as string });
	}
	return refs;
}
