/**
 * Audit core — the pure comparison logic. Given the tv() blocks extracted from
 * lib source and the token sheet, compute the token table a spec *should*
 * record; diff it against what the spec *does* record.
 *
 * Colour comparison uses `hexWithinTolerance` so the lib's HSL rounding is not
 * reported as drift (see resolver.ts).
 */
import { resolveUtility, hexWithinTolerance, type TokenSheet } from './resolver.js';
import type { TvBlock } from './tv-extractor.js';
import type { RecordedRef } from './spec-reader.js';

export type ExpectedRef = { light: string; dark: string };
export type TokenMap = Map<string, ExpectedRef>;

export type TokenFinding = {
	cssVar: string;
	verdict: 'ok' | 'drift' | 'missing';
	expected: ExpectedRef;
	recorded?: RecordedRef;
};

/** Resolve every colour utility across all tv blocks into a cssVar → {light,dark} map. */
export function expectedTokensFromTv(blocks: TvBlock[], sheet: TokenSheet): TokenMap {
	const out: TokenMap = new Map();
	for (const block of blocks) {
		const classStrings = [
			...(block.base ? [block.base] : []),
			...Object.values(block.variants).flatMap((axis) => Object.values(axis))
		];
		for (const classString of classStrings) {
			for (const cls of classString.split(/\s+/).filter(Boolean)) {
				const ref = resolveUtility(cls, sheet);
				if (ref) out.set(ref.cssVar, { light: ref.light, dark: ref.dark });
			}
		}
	}
	return out;
}

/**
 * Diff expected (from lib) against recorded (from spec). Every expected token is
 * reported: `ok` within tolerance, `drift` when light or dark moved, `missing`
 * when the spec records no value for it.
 */
export function compareTokenMaps(
	expected: TokenMap,
	recorded: Map<string, RecordedRef>
): TokenFinding[] {
	const findings: TokenFinding[] = [];
	for (const [cssVar, exp] of expected) {
		const rec = recorded.get(cssVar);
		if (!rec) {
			findings.push({ cssVar, verdict: 'missing', expected: exp });
			continue;
		}
		const same =
			hexWithinTolerance(exp.light, rec.light) && hexWithinTolerance(exp.dark, rec.dark);
		findings.push({ cssVar, verdict: same ? 'ok' : 'drift', expected: exp, recorded: rec });
	}
	return findings;
}
