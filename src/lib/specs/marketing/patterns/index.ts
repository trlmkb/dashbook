/**
 * Marketing-pattern registry.
 *
 * Imported by:
 * - `/marketing/patterns/<slug>` docs pages.
 * - The MCP server — `marketing_list_patterns` + `marketing_get_pattern`.
 *
 * To add a pattern:
 * 1. Create `<slug>.ts` exporting a `MarketingPatternSpec`.
 * 2. Import + register here.
 * 3. It flows into the index page, sidebar, ⌘K, and the MCP tools automatically.
 */

import type { MarketingPatternSpec, MarketingPatternCategory } from './types.js';
import { slideFrame } from './slide-frame.js';
import { sectionIntro } from './section-intro.js';
import { squircleButton } from './squircle-button.js';
import { chip } from './chip.js';
import { productShot } from './product-shot.js';
import { featureTabs } from './feature-tabs.js';
import { centeredHero } from './centered-hero.js';
import { astroScopedStyles } from './astro-scoped-styles.js';

export type * from './types.js';

/** Every marketing pattern, keyed by slug. */
export const marketingPatternSpecs: Record<string, MarketingPatternSpec> = {
	'centered-hero': centeredHero,
	'slide-frame': slideFrame,
	'section-intro': sectionIntro,
	'feature-tabs': featureTabs,
	'product-shot': productShot,
	'squircle-button': squircleButton,
	chip,
	'astro-scoped-styles': astroScopedStyles,
};

/** Flat array — convenient for iteration in the MCP server + listings. */
export const allMarketingPatterns: MarketingPatternSpec[] = Object.values(marketingPatternSpecs);

/** Resolve a pattern by slug; undefined if missing. */
export function getMarketingPattern(slug: string): MarketingPatternSpec | undefined {
	return marketingPatternSpecs[slug];
}

/** Display order for categories on the index page + sidebar. */
export const marketingPatternCategoryOrder: MarketingPatternCategory[] = [
	'Heroes',
	'Layout frames',
	'Rhythm & connectors',
	'Content blocks',
	'Media & proof',
	'CTAs',
	'Building blocks',
	'Gotchas',
];

/** Group patterns by category, preserving the declared order. */
export function marketingPatternsByCategory(): Map<MarketingPatternCategory, MarketingPatternSpec[]> {
	const map = new Map<MarketingPatternCategory, MarketingPatternSpec[]>();
	for (const c of marketingPatternCategoryOrder) map.set(c, []);
	for (const p of allMarketingPatterns) map.get(p.category)?.push(p);
	// drop empty categories
	for (const [c, list] of map) if (list.length === 0) map.delete(c);
	return map;
}

export const marketingPatternCount = allMarketingPatterns.length;
