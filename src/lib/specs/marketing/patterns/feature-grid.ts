import type { MarketingPatternSpec } from './types.js';

/**
 * FeatureGrid — a responsive grid of feature cells.
 *
 * Promoted from the site `slide/` library. A 2–3-column grid of equal cells,
 * each a small duotone-style icon, a short title, and a body blurb. The grid
 * sits on any band and re-themes off the `--m-*` roles; on mobile it collapses
 * to one column via `minmax(0, 1fr)` to dodge the fixed-width blow-out.
 */
export const featureGrid: MarketingPatternSpec = {
	slug: 'feature-grid',
	name: 'FeatureGrid',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A responsive 2–3-column grid of feature cells — each a small duotone-style icon, a short title, and a body blurb. Drops onto any band and re-themes off the marketing roles.',

	source: 'src/components/slide/FeatureGrid.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'When a section needs to show 4–6 peer capabilities with equal weight and a little air around each — a balanced grid reads as a "what you get" overview. Reach for FeatureColumns when you want columns without card chrome, or FeatureList when the set is long and a denser row layout fits better.',

	recipe: [
		'Render a `<ul>` grid: `grid-template-columns: repeat(3, minmax(0, 1fr))` with a gap on the gutter scale; the `minmax(0, …)` is what keeps a long cell from blowing the column out.',
		'Each cell is an `<li>` stacking a duotone icon, then a short `<h3>` title, then a body blurb.',
		'Icon: a ~40px rounded tile filled `--m-accent-soft` with the glyph in `--m-accent` (currentColor flows to the SVG).',
		'Title in `--m-fg-strong`; blurb in `--m-fg-muted` capped at ~38ch so lines stay readable.',
		'Step the columns down at breakpoints — 3 → 2 → 1 — landing on a single `minmax(0, 1fr)` column on mobile.',
		'Cells are flat by default (no card chrome); add a 1px `--m-border` or `--m-card` fill only if the band needs the separation.',
	],

	dom: `<ul class="feature-grid">
  <li class="cell">
    <span class="icon" aria-hidden="true"><svg>…</svg></span>
    <h3 class="title">Invoice audit</h3>
    <p class="blurb">Every carrier charge checked against your contract.</p>
  </li>
  <!-- 4–6 cells -->
</ul>`,

	tokensUsed: [
		{ part: 'icon tile fill', role: '--m-accent-soft', notes: 'Soft jade wash behind the glyph.' },
		{ part: 'icon glyph', role: '--m-accent', notes: 'currentColor flows to the inline SVG.' },
		{ part: 'title', role: '--m-fg-strong' },
		{ part: 'blurb', role: '--m-fg-muted' },
		{ part: 'optional cell border', role: '--m-border', notes: 'Only when the band needs cell separation.' },
	],

	dimensions: [
		{ name: 'Columns', value: '3 → 2 → 1', notes: 'Steps down across breakpoints; mobile lands on minmax(0, 1fr).' },
		{ name: 'Gap', value: '24 → 40px', notes: 'Ramps the gutter scale.' },
		{ name: 'Icon tile', value: '40px', notes: 'Rounded soft-accent tile; glyph ~20px.' },
		{ name: 'Blurb measure', value: '~38ch', notes: 'Keeps cell copy to 2–3 lines.' },
	],

	variants: [
		{ name: 'default', description: '3 → 2 → 1 responsive feature grid, equal-weight cells.' },
		{
			name: '4-up audience-segment cards',
			description:
				'Four equal cards, each addressed to a distinct audience segment (e.g. finance teams, ops teams, agencies, franchises) rather than four capabilities of one product — seen on /partner and /growthnetwork. Each card typically adds a segment-specific CTA in addition to the icon/title/blurb triad.',
		},
	],

	props: [
		{ name: 'items', type: 'Array<{ icon; title; blurb }>', required: true, description: 'The feature cells in order.' },
		{ name: 'columns', type: '2 | 3', default: '3', description: 'Max columns on the widest breakpoint.' },
		{ name: 'bordered', type: 'boolean', default: 'false', description: 'Give each cell a 1px --m-border + --m-card fill.' },
	],

	nonFeatures: [
		'Not a card row — cells are flat by default; the bordered card treatment is opt-in, not the baseline.',
		'No equal-height media or hero imagery per cell — the icon is a small glyph tile, not a thumbnail.',
		'No per-cell CTA or link chrome — cells describe, they do not navigate.',
	],

	gotchas: [
		'Use `minmax(0, 1fr)` columns, not `1fr` — a long unbroken blurb otherwise sizes the track to its content and overflows the page on mobile.',
		'Keep the icon glyph `currentColor` so it inherits `--m-accent` and flips on the ink band; do not hardcode the icon fill per cell.',
	],

	accessibility: [
		'Mark the icon tile `aria-hidden` — the title and blurb carry the meaning.',
		'Use a list (`<ul>`/`<li>`) so assistive tech announces the count and lets users skip the group.',
	],

	example: `<ul class="feature-grid">
  <li class="cell">
    <span class="icon" aria-hidden="true"><ShieldCheck /></span>
    <h3 class="title">Invoice audit</h3>
    <p class="blurb">Every carrier charge checked against your contract.</p>
  </li>
</ul>

<style>
  .feature-grid { display: grid; gap: 32px; list-style: none; margin: 0; padding: 0;
    grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (max-width: 900px) { .feature-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 560px) { .feature-grid { grid-template-columns: minmax(0, 1fr); } }
  .cell { display: flex; flex-direction: column; gap: 12px; }
  .icon { display: inline-flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--m-accent-soft); color: var(--m-accent); }
  .title { margin: 0; font-family: var(--font-display); font-weight: 200;
    text-transform: uppercase; font-size: 18px; color: var(--m-fg-strong); }
  .blurb { margin: 0; max-width: 38ch; font-size: 15px; line-height: 1.6;
    color: var(--m-fg-muted); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A list rendered as a `minmax(0, 1fr)` grid that steps 3 → 2 → 1; each cell stacks a soft-accent icon tile, a display title, and a muted blurb.',
		'Icon glyph is currentColor and decorative; cell chrome (border/fill) is an opt-in flag, not the default.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
