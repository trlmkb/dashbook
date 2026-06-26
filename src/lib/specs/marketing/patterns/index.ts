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
import { sectionIntro } from './section-intro.js';
import { squircleButton } from './squircle-button.js';
import { chip } from './chip.js';
import { productShot } from './product-shot.js';
import { featureTabs } from './feature-tabs.js';
import { astroScopedStyles } from './astro-scoped-styles.js';
import { splitCta } from './split-cta.js';
import { sectionCta } from './section-cta.js';
import { homeFinalCta } from './home-final-cta.js';
import { hero } from './hero.js';
import { productHero } from './product-hero.js';
import { cosmicHero } from './cosmic-hero.js';
import { featureGrid } from './feature-grid.js';
import { featureColumns } from './feature-columns.js';
import { featureList } from './feature-list.js';
import { threeCardRow } from './three-card-row.js';
import { numberedCardRow } from './numbered-card-row.js';
import { stepTimeline } from './step-timeline.js';
import { platformBullets } from './platform-bullets.js';
import { platformShowcase } from './platform-showcase.js';
import { utilityTiles } from './utility-tiles.js';
import { bigQuote } from './big-quote.js';
import { marquee } from './marquee.js';
import { statTrio } from './stat-trio.js';
import { testimonialCard } from './testimonial-card.js';
import { caseStudyCard } from './case-study-card.js';
import { logoRail } from './logo-rail.js';
import { customerPlatformsRail } from './customer-platforms-rail.js';
import { pinnedShowcase } from './pinned-showcase.js';
import { dashfiWordmark } from './dashfi-wordmark.js';
import { duotoneIcon } from './duotone-icon.js';
import { liveWidget } from './live-widget.js';
import { darkCtaBand } from './dark-cta-band.js';
import { faqAccordion } from './faq-accordion.js';
import { trustStatBand } from './trust-stat-band.js';
import { calculatorIsland } from './calculator-island.js';
import { metricsHero } from './metrics-hero.js';
import { productWindowHero } from './product-window-hero.js';
import { fullBleedSection } from './full-bleed-section.js';

export type * from './types.js';

/** Every marketing pattern, keyed by slug. */
export const marketingPatternSpecs: Record<string, MarketingPatternSpec> = {
	// Heroes
	hero,
	'metrics-hero': metricsHero,
	'product-window-hero': productWindowHero,
	'product-hero': productHero,
	'cosmic-hero': cosmicHero,
	// Layout frames
	'full-bleed-section': fullBleedSection,
	// Rhythm & connectors
	'section-intro': sectionIntro,
	'big-quote': bigQuote,
	marquee,
	'stat-trio': statTrio,
	// Content blocks
	'feature-grid': featureGrid,
	'feature-columns': featureColumns,
	'feature-list': featureList,
	'three-card-row': threeCardRow,
	'numbered-card-row': numberedCardRow,
	'step-timeline': stepTimeline,
	'platform-bullets': platformBullets,
	'platform-showcase': platformShowcase,
	'utility-tiles': utilityTiles,
	'feature-tabs': featureTabs,
	'faq-accordion': faqAccordion,
	'calculator-island': calculatorIsland,
	// Media & proof
	'trust-stat-band': trustStatBand,
	'product-shot': productShot,
	'testimonial-card': testimonialCard,
	'case-study-card': caseStudyCard,
	'logo-rail': logoRail,
	'customer-platforms-rail': customerPlatformsRail,
	'pinned-showcase': pinnedShowcase,
	'dashfi-wordmark': dashfiWordmark,
	// CTAs
	'split-cta': splitCta,
	'section-cta': sectionCta,
	'home-final-cta': homeFinalCta,
	'dark-cta-band': darkCtaBand,
	// Building blocks
	'squircle-button': squircleButton,
	chip,
	'duotone-icon': duotoneIcon,
	'live-widget': liveWidget,
	// Gotchas
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
