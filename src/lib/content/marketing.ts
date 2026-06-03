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
	{ slug: 'centered-hero', name: 'CenteredHero', category: 'Heroes', description: 'The default page-opening hero — centred copy unit, CTA pair, optional product shot.' },
	{ slug: 'slide-frame', name: 'SlideFrame', category: 'Layout frames', description: 'The full-width section band — paper · cream · ink · cobalt.' },
	{ slug: 'section-intro', name: 'Section intro (eyebrow + copy unit)', category: 'Rhythm & connectors', description: 'Eyebrow → display heading (accent span) → body. The most-repeated section header.' },
	{ slug: 'feature-tabs', name: 'Feature tabs', category: 'Content blocks', description: 'Auto-rotating pill tabs with a left→right progress fill.', toolId: 'marketing_feature_tabs' },
	{ slug: 'product-shot', name: 'Scale-to-fit product shot', category: 'Media & proof', description: 'Product UI rebuilt as DOM, scaled to fit via a ResizeObserver.', toolId: 'marketing_product_shot' },
	{ slug: 'squircle-button', name: 'Squircle button', category: 'Building blocks', description: '6px squircle CTA, no shadow, press-scale 0.97.', toolId: 'marketing_button' },
	{ slug: 'chip', name: 'Chip', category: 'Building blocks', description: 'Soft-tinted pill tag; four tones via data-tone.', toolId: 'marketing_chip' },
	{ slug: 'astro-scoped-styles', name: 'Astro scoped styles + child components', category: 'Gotchas', description: 'Scoped CSS doesn\'t reach a child component root — put structural classes on a native element.' },
];
