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
	{ slug: 'centered-hero', name: 'CenteredHero', category: 'Heroes', description: 'The default page-opening hero — centred copy unit, CTA pair, optional product shot.' },
	{ slug: 'asymmetric-product-hero', name: 'AsymmetricProductHero', category: 'Heroes', description: 'Copy beside a large product shot that bleeds off the viewport edge.' },
	{ slug: 'product-hero', name: 'ProductHero', category: 'Heroes', description: 'Copy with a contained, framed scale-to-fit product shot.' },
	{ slug: 'cosmic-hero', name: 'CosmicHero', category: 'Heroes', description: 'A high-drama dark opener with an ambient drifting accent glow.' },
	// Layout frames
	{ slug: 'slide-frame', name: 'SlideFrame', category: 'Layout frames', description: 'The full-width section band — paper · cream · ink · cobalt.' },
	{ slug: 'two-col-slide', name: 'TwoColSlide', category: 'Layout frames', description: 'An even two-column copy↔media frame with a reverse prop.' },
	// Rhythm & connectors
	{ slug: 'section-intro', name: 'Section intro (eyebrow + copy unit)', category: 'Rhythm & connectors', description: 'Eyebrow → display heading (accent span) → body. The most-repeated section header.' },
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
	// Media & proof
	{ slug: 'product-shot', name: 'Scale-to-fit product shot', category: 'Media & proof', description: 'Product UI rebuilt as DOM, scaled to fit via a ResizeObserver.', toolId: 'marketing_product_shot' },
	// CTAs
	{ slug: 'split-cta', name: 'SplitCTA', category: 'CTAs', description: 'Two-column conversion block: copy + action panel.' },
	{ slug: 'cta-section', name: 'CTASection', category: 'CTAs', description: 'Centred full-width CTA band on an emphasis surface.' },
	{ slug: 'section-cta', name: 'SectionCTA', category: 'CTAs', description: 'Lightweight inline end-of-section nudge.' },
	{ slug: 'home-final-cta', name: 'HomeFinalCTA', category: 'CTAs', description: 'The oversized page closer on the ink band.' },
	// Building blocks
	{ slug: 'squircle-button', name: 'Squircle button', category: 'Building blocks', description: '6px squircle CTA, no shadow, press-scale 0.97.', toolId: 'marketing_button' },
	{ slug: 'chip', name: 'Chip', category: 'Building blocks', description: 'Soft-tinted pill tag; four tones via data-tone.', toolId: 'marketing_chip' },
	// Gotchas
	{ slug: 'astro-scoped-styles', name: 'Astro scoped styles + child components', category: 'Gotchas', description: "Scoped CSS doesn’t reach a child component root — put structural classes on a native element." },
];
