/**
 * Foundation spec registry — typography, spacing, and (later) other foundations.
 *
 * Color, radius, motion, and shadows are sourced directly from `$lib/tokens` —
 * they are token-shaped and don't need a separate spec. Typography and spacing
 * are too structured to live as ad-hoc records in the MCP handler, so they get
 * their own typed specs here.
 *
 * Imported by:
 * - MCP server — `product_get_foundation({ name })` resolves through this index.
 * - (Future) docs pages, once foundation pages adopt the same spec-driven
 *   rendering pattern as component pages.
 */

import type { SpacingFoundation, TypographyFoundation } from './types.js';
import { typographyFoundation } from './typography.js';
import { spacingFoundation } from './spacing.js';

export { typographyFoundation } from './typography.js';
export { spacingFoundation } from './spacing.js';
export type * from './types.js';

/** Map of structured foundation specs (the ones not already covered by `$lib/tokens`). */
export const foundationSpecs = {
	typography: typographyFoundation,
	spacing: spacingFoundation
} as const;

export type StructuredFoundationName = keyof typeof foundationSpecs;

/**
 * Look up a structured foundation spec by name. Returns `undefined` for
 * foundations that live in `$lib/tokens` instead (color, radius, motion,
 * shadows) — the MCP handler short-circuits those cases before reaching here.
 */
export function getFoundation(
	name: StructuredFoundationName
): TypographyFoundation | SpacingFoundation {
	return foundationSpecs[name];
}
