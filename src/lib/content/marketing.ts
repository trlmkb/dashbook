/**
 * Lightweight marketing-library registry — for the ⌘K search index and nav.
 *
 * Mirrors `components.ts` / `patterns.ts`: a thin, client-safe list (no heavy
 * spec prose) so the search palette bundle stays lean. The full specs live in
 * `src/lib/specs/marketing/*` and drive the docs pages + MCP tools.
 *
 * Keep the slugs here in sync with the spec registries:
 * - `src/lib/specs/marketing/foundations/index.ts`
 * - `src/lib/specs/marketing/patterns/index.ts`
 */

export type MarketingFoundationEntry = {
	slug: string;
	name: string;
	description: string;
};

export type MarketingPatternContentEntry = {
	slug: string;
	name: string;
	category: string;
	description: string;
	toolId?: string;
};

export const marketingFoundationsContent: MarketingFoundationEntry[] = [
	{
		slug: 'tokens',
		name: 'Tokens',
		description:
			'The marketing surface role set + data-tone convention + attribute-flipped dark variant.',
	},
	{
		slug: 'typography',
		name: 'Typography',
		description: 'PP Supply Mono ultralight display, tracked mono eyebrows, Bai Jamjuree body.',
	},
	{
		slug: 'layout',
		name: 'Layout',
		description: 'Container, full-bleed, alternating copy↔media rows, the mobile blow-out fix.',
	},
	{
		slug: 'section',
		name: 'Section rhythm',
		description: 'The alternating paper / cream / ink / cobalt band cadence.',
	},
	{
		slug: 'motion',
		name: 'Motion',
		description: 'Reveal-on-scroll, ambient loops, smooth anchors — reduced-motion-safe.',
	},
];

export const marketingPatternsContent: MarketingPatternContentEntry[] = [
	// Heroes
	{ slug: 'hero', name: 'Hero', category: 'Heroes', description: 'The base hero primitive — eyebrow, display heading, lede, CTA pair; start-aligned.' },
	{ slug: 'product-hero', name: 'ProductHero', category: 'Heroes', description: 'Copy with a contained, framed scale-to-fit product shot.' },
	{ slug: 'cosmic-hero', name: 'CosmicHero', category: 'Heroes', description: 'A high-drama dark opener with an ambient drifting accent glow. No live usage on dash.fi as of 2026-07 — reserved for campaign surfaces.' },
	// Rhythm & connectors
	{ slug: 'section-intro', name: 'Section intro (eyebrow + copy unit)', category: 'Rhythm & connectors', description: 'Eyebrow → display heading (accent span) → body. The most-repeated section header.' },
	{ slug: 'big-quote', name: 'BigQuote', category: 'Rhythm & connectors', description: 'An oversized pull-quote that fills a band — large quote, attribution, optional accent quote-mark.' },
	{ slug: 'marquee', name: 'Marquee', category: 'Rhythm & connectors', description: 'A horizontally scrolling, infinitely-looping row of logos or phrases; pauses on hover, stops under reduced motion.' },
	{ slug: 'stat-trio', name: 'StatTrio', category: 'Rhythm & connectors', description: 'Three big stats in a row — a large tabular value plus an uppercase mono label each.' },
	// Content blocks
	{ slug: 'feature-grid', name: 'FeatureGrid', category: 'Content blocks', description: 'A responsive 2–3-column grid of feature cells — icon, title, and blurb.' },
	{ slug: 'feature-columns', name: 'FeatureColumns', category: 'Content blocks', description: '2–4 equal feature columns without card chrome — icon, heading, text.' },
	{ slug: 'feature-list', name: 'FeatureList', category: 'Content blocks', description: 'A dense vertical list of features — leading check, title, one-line description.' },
	{ slug: 'three-card-row', name: 'ThreeCardRow', category: 'Content blocks', description: 'Exactly three equal cards in a row — heading + body + optional link, on the card surface.' },
	{ slug: 'numbered-card-row', name: 'NumberedCardRow', category: 'Content blocks', description: 'A row of cards led by a large mono number (01 / 02 / 03) in the accent.' },
	{ slug: 'step-timeline', name: 'StepTimeline', category: 'Content blocks', description: 'A timeline of steps — a connector through numbered nodes, each with title + description.' },
	{ slug: 'platform-bullets', name: 'PlatformBullets', category: 'Content blocks', description: "A two-column “what’s included” list — a positive check plus a capability line per bullet." },
	{ slug: 'platform-showcase', name: 'PlatformShowcase', category: 'Content blocks', description: 'A copy unit paired with a product visual; two-column, alternating-row friendly.' },
	{ slug: 'utility-tiles', name: 'UtilityTiles', category: 'Content blocks', description: 'A dense auto-fit grid of small utility tiles — icon, label, optional sublabel.' },
	{ slug: 'feature-tabs', name: 'Feature tabs', category: 'Content blocks', description: 'Auto-rotating pill tabs with a left→right progress fill.', toolId: 'marketing_feature_tabs' },
	{ slug: 'faq-accordion', name: 'FaqAccordion', category: 'Content blocks', description: 'A hairline-divided Q/A list — one open at a time, mono "Q."/"A." markers, grid-rows reveal. Closes most marketing pages.' },
	{ slug: 'calculator-island', name: 'Calculator island', category: 'Content blocks', description: 'A slider-driven estimator — intro column beside a card whose range slider drives a live result (recovery / savings / cashback).' },
	{ slug: 'comparison-table', name: 'ComparisonTable', category: 'Content blocks', description: 'An N-column (2–4) feature matrix with an emphasized "us" column; replaced the standalone pricing page.' },
	{ slug: 'action-plan', name: 'ActionPlan', category: 'Content blocks', description: 'A numbered, prioritized recommendation list with effort / timeline / impact metadata.' },
	// Media & proof
	{ slug: 'trust-stat-band', name: 'TrustStatBand', category: 'Media & proof', description: 'The proof band — a rolling-counter headline stat, pillar stats, and a carrier/logo strip with a "live" indicator.' },
	{ slug: 'product-shot', name: 'Scale-to-fit product shot', category: 'Media & proof', description: 'Product UI rebuilt as DOM, scaled to fit via a ResizeObserver.', toolId: 'marketing_product_shot' },
	{ slug: 'testimonial-card', name: 'TestimonialCard', category: 'Media & proof', description: 'A customer quote card — quote, optional quote-mark, and attribution with an optional avatar or logo.' },
	{ slug: 'case-study-card', name: 'CaseStudyCard', category: 'Media & proof', description: 'A card linking to a case study — one headline metric, a one-line result, and a read-the-story link.' },
	{ slug: 'logo-rail', name: 'LogoRail', category: 'Media & proof', description: "An evenly-spaced rail of muted monochrome customer logos with an optional “Trusted by” eyebrow." },
	{ slug: 'customer-platforms-rail', name: 'CustomerPlatformsRail', category: 'Media & proof', description: 'A muted rail of the platforms and integrations customers connect — logo plus optional label per item.' },
	{ slug: 'pinned-showcase', name: 'PinnedShowcase', category: 'Media & proof', description: 'A sticky product visual stays in view while a column of steps scrolls past; the active step drives the visual. No live usage on dash.fi as of 2026-07.' },
	{ slug: 'dashfi-wordmark', name: 'DashfiWordmark', category: 'Media & proof', description: 'Inline use of the single-source Dash.fi wordmark — colourways per band, sizing, clear-space; fetched, never redrawn.' },
	{ slug: 'data-table-band', name: 'DataTableBand', category: 'Media & proof', description: 'A marketing-surface data table used as a proof section — flagged violations, contract line items, one status column.' },
	{ slug: 'chart-band', name: 'ChartBand', category: 'Media & proof', description: 'A chart + explanatory copy proof section — bar or line, optional range tabs.' },
	// CTAs
	{ slug: 'split-cta', name: 'SplitCTA', category: 'CTAs', description: 'Two-column conversion block: copy + action panel.' },
	{ slug: 'section-cta', name: 'SectionCTA', category: 'CTAs', description: 'Lightweight inline end-of-section nudge.' },
	{ slug: 'home-final-cta', name: 'HomeFinalCTA', category: 'CTAs', description: 'The oversized page closer on the ink band.' },
	{ slug: 'dark-cta-band', name: 'DarkCtaBand', category: 'CTAs', description: 'The jade-glow closing band — full-width dark section with a rising radial glow, reserved for the final page CTA.' },
	{ slug: 'form-capture', name: 'FormCapture', category: 'CTAs', description: 'An embedded application / email-capture form section — inline, not a modal.' },
	// Building blocks
	{ slug: 'squircle-button', name: 'Squircle button', category: 'Building blocks', description: '6px squircle CTA, no shadow, press-scale 0.97.', toolId: 'marketing_button' },
	{ slug: 'chip', name: 'Chip', category: 'Building blocks', description: 'Soft-tinted pill tag; four tones via data-tone.', toolId: 'marketing_chip' },
	{ slug: 'duotone-icon', name: 'Duotone icon', category: 'Building blocks', description: 'Filled silhouette at low opacity plus a stroked detail layer, both currentColor; per-item hue — the only sanctioned multi-color.', toolId: 'marketing_duotone_icon' },
	{ slug: 'live-widget', name: 'Live widget', category: 'Building blocks', description: 'Interactive product-mock island styled off --m-* tokens; all figures derived from state.', toolId: 'marketing_live_widget' },
	// Gotchas
	{ slug: 'astro-scoped-styles', name: 'Astro scoped styles + child components', category: 'Gotchas', description: "Scoped CSS doesn’t reach a child component root — put structural classes on a native element." },
];
