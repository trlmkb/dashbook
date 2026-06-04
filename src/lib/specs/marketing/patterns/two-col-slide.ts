import type { MarketingPatternSpec } from './types.js';

/**
 * TwoColSlide — the even two-column content frame.
 *
 * Copy on one side, media on the other, with a `reverse` to swap. The workhorse
 * layout inside a SlideFrame band, and the unit you stack to build alternating
 * copy↔media row sequences.
 */
export const twoColSlide: MarketingPatternSpec = {
	slug: 'two-col-slide',
	name: 'TwoColSlide',
	category: 'Layout frames',
	status: 'stable',
	description:
		'An even two-column content frame — copy on one side, media on the other — with a `reverse` prop to swap sides. The unit you stack (alternating reverse) to build copy↔media row sequences inside a SlideFrame band.',

	source: 'src/components/slide/TwoColSlide.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'The default two-column content layout: a feature explained beside a visual. Stack several with alternating `reverse` for a rhythm of rows. Use AsymmetricProductHero when the media should bleed off the viewport edge; use SlideFrame for the surrounding band.',

	recipe: [
		'A two-column grid: `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)` with a column gap.',
		'`reverse` swaps the visual order (set `order` on the media, or `direction`) without changing the DOM order.',
		'For a row sequence, alternate sides automatically via `:nth-child(odd)` + `order` so consecutive rows mirror.',
		'Vertically centre the columns (`align-items: center`) so copy and media share a baseline.',
		'Mobile: collapse to a single `minmax(0, 1fr)` column; media drops below copy.',
	],

	dom: `<div class="two-col" data-reverse>      <!-- native element: scoped grid applies -->
  <div class="copy"><Reveal>…</Reveal></div>
  <div class="media"><Reveal>…</Reveal></div>
</div>`,

	tokensUsed: [
		{ part: 'surface', role: '--m-surface', notes: 'Inherited from the SlideFrame band.' },
		{ part: 'copy heading', role: '--m-fg-strong' },
		{ part: 'copy body', role: '--m-fg-muted' },
		{ part: 'media frame', role: '--m-card / --m-border', notes: 'When the media is a framed shot.' },
	],

	dimensions: [
		{ name: 'Columns', value: 'minmax(0,1fr) minmax(0,1fr)', notes: 'Collapses to 1 col on mobile.' },
		{ name: 'Column gap', value: '40–64px' },
		{ name: 'Align', value: 'center', notes: 'Copy and media share a vertical centre.' },
	],

	variants: [
		{ name: 'default', description: 'Copy left, media right.' },
		{ name: 'reverse', description: 'Media left, copy right — alternate down a row sequence.' },
	],

	props: [
		{ name: 'reverse', type: 'boolean', default: 'false', description: 'Swap the visual order of the two columns.' },
		{ name: 'align', type: "'center' | 'start'", default: "'center'", description: 'Vertical alignment of the columns.' },
	],

	nonFeatures: [
		'Not full-bleed — the media stays within the content grid; use AsymmetricProductHero for an edge bleed.',
		'Not a band — wrap it in a SlideFrame to set the surface.',
		'No more than two columns — use a content-block grid for 3+.',
	],

	gotchas: [
		'THE canonical scoped-style trap: put the `.two-col` grid/order/overflow classes on a NATIVE element, not on a child component root (e.g. not on `<Reveal class="two-col">`), or the scoped grid silently no-ops and the layout stacks. See the astro-scoped-styles pattern.',
		'Mobile blow-out: use `minmax(0, 1fr)` columns so a fixed-width media child (a 1180px shot, a min-width table) cannot size the column and overflow the page.',
		'`reverse` should change visual order only — keep the DOM in reading order for screen readers.',
	],

	motion: ['Reveal each column (optionally staggered). Honour reduced motion.'],

	accessibility: ['Keep DOM order = reading order even when `reverse` flips the visual order; one heading per copy column.'],

	example: `<SlideFrame background="paper">
  <div class="two-col">
    <div class="copy">
      <p class="eyebrow">Audit</p>
      <h2 class="display">Every line, <span class="accent">checked</span></h2>
      <p class="lede">We parse each invoice against the contract the moment it lands.</p>
    </div>
    <div class="media"><!-- product shot / image --></div>
  </div>
</SlideFrame>

<style>
  .two-col { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 48px; align-items: center; }
  .two-col[data-reverse] .media { order: -1; }
  @media (max-width: 720px) { .two-col { grid-template-columns: minmax(0,1fr); } }
</style>`,
	exampleLang: 'astro',

	porting: [
		'Even two-column grid with minmax(0,1fr) tracks; `reverse` swaps visual order via `order`. Structural classes belong on a native element. Collapses to one column on mobile.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
