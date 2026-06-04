/**
 * Marketing-foundation registry.
 *
 * Imported by:
 * - `/marketing/foundations/<name>` docs pages.
 * - The MCP server — `marketing_get_foundation({ name })` resolves through here.
 */

import type {
	MarketingFoundationName,
	MarketingTokensFoundation,
	MarketingTypographyFoundation,
	MarketingLayoutFoundation,
	MarketingSectionFoundation,
	MarketingMotionFoundation,
} from './types.js';
import { marketingTokensFoundation } from './tokens.js';
import { marketingTypographyFoundation } from './typography.js';
import { marketingLayoutFoundation } from './layout.js';
import { marketingSectionFoundation } from './section.js';
import { marketingMotionFoundation } from './motion.js';

export { marketingTokensFoundation } from './tokens.js';
export { marketingTypographyFoundation } from './typography.js';
export { marketingLayoutFoundation } from './layout.js';
export { marketingSectionFoundation } from './section.js';
export { marketingMotionFoundation } from './motion.js';
export type * from './types.js';

type MarketingFoundationValue =
	| MarketingTokensFoundation
	| MarketingTypographyFoundation
	| MarketingLayoutFoundation
	| MarketingSectionFoundation
	| MarketingMotionFoundation;

/** Map of marketing foundation specs, keyed by name. */
export const marketingFoundations: Record<MarketingFoundationName, MarketingFoundationValue> = {
	tokens: marketingTokensFoundation,
	typography: marketingTypographyFoundation,
	layout: marketingLayoutFoundation,
	section: marketingSectionFoundation,
	motion: marketingMotionFoundation,
};

/** Short labels + descriptions for the index page + nav + search. */
export const marketingFoundationMeta: Record<
	MarketingFoundationName,
	{ name: string; description: string }
> = {
	tokens: {
		name: 'Tokens',
		description:
			'The ~20-role marketing surface palette + the `data-tone` convention + the attribute-flipped dark variant.',
	},
	typography: {
		name: 'Typography',
		description:
			'PP Supply Mono ultralight display + tracked mono eyebrows + Bai Jamjuree body, and the canonical copy unit.',
	},
	layout: {
		name: 'Layout',
		description:
			'Container, full-bleed-to-edge, alternating copy↔media rows, and the mobile blow-out fix.',
	},
	section: {
		name: 'Section rhythm',
		description: 'The alternating paper / cream / ink / cobalt band cadence.',
	},
	motion: {
		name: 'Motion',
		description: 'Reveal-on-scroll, ambient loops, smooth in-page anchors — all reduced-motion-safe.',
	},
};

export function getMarketingFoundation(
	name: MarketingFoundationName
): MarketingFoundationValue | undefined {
	return marketingFoundations[name];
}

export const marketingFoundationNames = Object.keys(
	marketingFoundations
) as MarketingFoundationName[];
