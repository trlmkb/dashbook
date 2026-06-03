import type { MarketingPatternSpec } from './types.js';

/**
 * SlideFrame — the full-width section band.
 *
 * Promoted from the site base `slide/` library. Every marketing section is a
 * SlideFrame: it paints one of four background bands edge-to-edge and centres
 * its content on the grid. The `ink` band flips the `--m-*` role set dark so
 * child components re-theme without per-component code.
 */
export const slideFrame: MarketingPatternSpec = {
	slug: 'slide-frame',
	name: 'SlideFrame',
	category: 'Layout frames',
	status: 'stable',
	description:
		'The full-width section band. Four backgrounds — paper · cream · ink · cobalt — painted edge-to-edge with content centred on the grid. The ink band flips the marketing dark variant.',

	source: 'src/components/slide/SlideFrame.astro',
	sourceNote:
		'Prop signature pulled from the brief; verify exact prop names against the website source.',

	whenToUse:
		'Reach for SlideFrame as the outer wrapper of every marketing section. Choose the background to drive the section rhythm (see the Section rhythm foundation): alternate paper ↔ cream, drop an ink band for emphasis, use cobalt sparingly for one high-energy section.',

	recipe: [
		'Render a full-bleed `<section>` that paints the chosen background edge-to-edge (100vw).',
		'Nest a `.container` centred at `var(--content-max)` with inline padding ramping `--gutter-sm → --gutter-md`.',
		'Map the `background` prop to a `data-bg` attribute; scoped CSS sets the surface + foreground roles per value.',
		'For `ink`, also set `data-marketing-dark` on the section so the `--m-*` roles flip and child components re-theme automatically.',
		'Apply the section vertical padding scale (consistent across bands — only the background changes).',
	],

	dom: `<section class="slide" data-bg="ink" data-marketing-dark>
  <div class="container">
    <slot />
  </div>
</section>`,

	tokensUsed: [
		{ part: 'paper background', role: '--m-surface', notes: 'Default band.' },
		{ part: 'cream background', role: '--m-cream', notes: 'Alternate light band.' },
		{ part: 'ink background', role: '--m-near-black', notes: 'Emphasis band; pair with data-marketing-dark.' },
		{ part: 'cobalt background', role: '--m-cobalt', notes: 'High-energy data band — sparing.' },
		{ part: 'foreground', role: '--m-fg-strong / --m-fg-muted', notes: 'Re-resolves on the ink band.' },
	],

	dimensions: [
		{ name: 'Content max', value: '1240px', notes: '`var(--content-max)` on the inner container.' },
		{ name: 'Inline padding', value: '24 → 40px', notes: 'Ramps `--gutter-sm` → `--gutter-md` across breakpoints.' },
		{ name: 'Vertical padding', value: 'section scale', notes: 'Shared across all four bands.' },
	],

	variants: [
		{
			name: 'paper',
			description: 'Default warm-paper band.',
			tokens: [{ name: 'background', token: { cssVar: '--m-surface', light: '#FAF9F5', dark: '#14181C' } }],
		},
		{
			name: 'cream',
			description: 'Alternate light band — breaks two adjacent paper sections.',
			tokens: [{ name: 'background', token: { cssVar: '--m-cream', light: '#EBEDE4', dark: '#EBEDE4' } }],
		},
		{
			name: 'ink',
			description: 'Dark emphasis band. Sets data-marketing-dark so the role set flips.',
			tokens: [{ name: 'background', token: { cssVar: '--m-near-black', light: '#25261D', dark: '#25261D' } }],
		},
		{
			name: 'cobalt',
			description: 'Marketing data-accent band. One per page, never adjacent to another saturated band.',
			tokens: [{ name: 'background', token: { cssVar: '--m-cobalt', light: '#354CEF', dark: '#354CEF' } }],
		},
	],

	props: [
		{ name: 'background', type: "'paper' | 'cream' | 'ink' | 'cobalt'", default: "'paper'", description: 'Which band to paint. `ink` also flips the marketing dark variant.' },
		{ name: 'as', type: 'string', default: "'section'", description: 'Element tag for the outer frame.' },
		{ name: 'class', type: 'string', description: 'Extra classes merged onto the outer frame.' },
	],

	nonFeatures: [
		'No max-width on the frame itself — the frame is full-bleed; only the inner container is constrained.',
		'No per-section padding override prop — vertical rhythm is shared; bands differ only by background.',
		'Not a grid — composition inside the slide is the caller\'s job (use the alternating-rows layout pattern).',
	],

	gotchas: [
		'Put the grid/order/overflow classes on the NATIVE container, not on a child component\'s root — Astro scoped styles do not reach a child component\'s root element (see the astro-scoped-styles pattern).',
		'The ink band only re-themes children that reference `--m-*` roles. A child with hardcoded hex will NOT flip.',
	],

	accessibility: [
		'Each SlideFrame should contain exactly one section landmark heading for screen-reader outline integrity.',
		'Ink/cobalt bands must keep foreground contrast ≥ 4.5:1 — the role set is tuned for this; do not override fg with a lower-contrast value.',
	],

	example: `---
import SlideFrame from '../components/slide/SlideFrame.astro';
---
<SlideFrame background="cream">
  <!-- section intro + content -->
</SlideFrame>

<SlideFrame background="ink">
  <!-- renders dark: child components reading --m-* roles flip automatically -->
</SlideFrame>`,
	exampleLang: 'astro',

	porting: [
		'The frame is full-bleed (100vw) with a centred inner container at var(--content-max); only the background and (for ink) the dark-variant attribute vary by variant.',
		'Map the four backgrounds to the surface roles; for the dark band, toggle the marketing dark variant on the subtree rather than recolouring each child.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook — promoted site-wide from the slide/ library.' }],
};
