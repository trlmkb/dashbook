import type { MarketingPatternSpec } from './types.js';

/**
 * ThreeCardRow — the classic three-benefits / three-products row.
 *
 * Exactly three equal cards on one row: heading + body + an optional inline
 * link per card. Cards sit on the canvas with a 1px hairline and the soft
 * low-lift card shadow, and the row collapses to a single column on mobile.
 */
export const threeCardRow: MarketingPatternSpec = {
	slug: 'three-card-row',
	name: 'ThreeCardRow',
	category: 'Content blocks',
	status: 'stable',
	description:
		'Exactly three equal cards in a row — the classic three benefits / three products. Each card is a heading, a body paragraph, and an optional inline link, on the card surface with a hairline border and a soft lift shadow.',

	source: 'src/components/sections/ThreeCardRow.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify exact prop names against the website source.',

	whenToUse:
		'Reach for ThreeCardRow when a section makes three parallel points of equal weight — three benefits, three products, three plans. Use FeatureColumns when you want more than three items, or NumberedCardRow when the cards are sequential or ranked.',

	recipe: [
		'Lay out a three-track grid: `grid-template-columns: repeat(3, minmax(0, 1fr))` with a ~24px gap.',
		'Each card: `background: var(--m-card)`, `border: 1px solid var(--m-border)`, `border-radius: 14–16px`, ~28px padding.',
		'Apply the soft lift shadow `0 26px 56px -38px rgba(15, 20, 18, 0.42)` — long blur, big negative spread reads as a faint lift, not a drop shadow.',
		'Stack the card content: heading (`--m-fg-strong`) → body (`--m-fg-muted`, ~60ch) → optional inline link (`--m-accent`).',
		'Collapse to one column under ~720px — switch the grid to `grid-template-columns: minmax(0, 1fr)` so a wide child never sizes the column past the viewport.',
		'Wrap the row (or each card, staggered) in a reveal target for the standard fade-rise entrance.',
	],

	dom: `<div class="three-card-row">
  <article class="card">
    <h3>Audit</h3>
    <p>Every carrier invoice is checked against the contract.</p>
    <a class="link" href="/audit">How it works</a>
  </article>
  <article class="card">…</article>
  <article class="card">…</article>
</div>`,

	tokensUsed: [
		{ part: 'card surface', role: '--m-card' },
		{ part: 'card border', role: '--m-border', notes: 'The default 1px hairline.' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'body', role: '--m-fg-muted' },
		{ part: 'inline link', role: '--m-accent', notes: 'Lifts to #5BB8B0 on ink bands automatically.' },
	],

	dimensions: [
		{ name: 'Columns', value: '3', notes: 'repeat(3, minmax(0, 1fr)); exactly three.' },
		{ name: 'Card radius', value: '14–16px' },
		{ name: 'Card border', value: '1px' },
		{ name: 'Card padding', value: '~28px' },
		{ name: 'Lift shadow', value: '0 26px 56px -38px rgba(15, 20, 18, 0.42)', notes: 'Faint lift — long blur, negative spread.' },
		{ name: 'Mobile breakpoint', value: '~720px', notes: 'Collapses to one column.' },
	],

	variants: [
		{ name: 'three up', description: 'Default — three equal cards in one row.' },
		{ name: 'stacked', description: 'The mobile fallback — one column, full-width cards.' },
	],

	props: [
		{ name: 'cards', type: '{ heading: string; body: string; href?: string; linkLabel?: string }[]', required: true, description: 'Exactly three entries; each renders one card. The optional href + label render the inline link.' },
		{ name: 'align', type: "'start' | 'center'", default: "'start'", description: 'Inline alignment of the card content.' },
	],

	nonFeatures: [
		'Not a flexible grid — this is exactly three cards. For four or more, use FeatureColumns / FeatureGrid.',
		'No per-card background colour — every card is the one card surface; tone differences come from chips, not card fills.',
		'No drop shadow — the lift shadow is a soft ambient lift, never a hard offset shadow.',
	],

	gotchas: [
		'Use `minmax(0, 1fr)` tracks, not `1fr` — a `1fr` track resolves to `minmax(auto, 1fr)`, so a long unbroken word or a fixed-width child blows the column past the viewport on mobile.',
		'Put the grid classes on the native row element, not on a child component root — Astro scoped styles do not reach a child root (see the astro-scoped-styles pattern).',
	],

	accessibility: [
		'Each card heading is an `<h3>` under the section `<h2>` — keep the outline intact; the cards are siblings, not nested headings.',
		'If the whole card is clickable, keep one real `<a>` per card and let the heading sit inside it — do not wrap interactive controls in interactive controls.',
	],

	example: `<div class="three-card-row">
  <article class="card">
    <h3>Audit</h3>
    <p>Every carrier invoice is checked against the contract the moment it lands.</p>
    <a class="link" href="/audit">How it works</a>
  </article>
  <article class="card">
    <h3>Recover</h3>
    <p>We file the claims and track each credit back to your account.</p>
    <a class="link" href="/recover">See recoveries</a>
  </article>
  <article class="card">
    <h3>Report</h3>
    <p>One ledger of every dispute, refund, and saving across carriers.</p>
    <a class="link" href="/report">View reports</a>
  </article>
</div>

<style>
  .three-card-row { display: grid; gap: 24px;
    grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .card { background: var(--m-card); border: 1px solid var(--m-border);
    border-radius: 16px; padding: 28px;
    box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42); }
  .card h3 { margin: 0 0 10px; color: var(--m-fg-strong); }
  .card p { margin: 0 0 16px; color: var(--m-fg-muted); line-height: 1.55; }
  .card .link { color: var(--m-accent); text-decoration: none; }
  @media (max-width: 720px) {
    .three-card-row { grid-template-columns: minmax(0, 1fr); }
  }
</style>`,
	exampleLang: 'html',

	porting: [
		'A three-track `minmax(0, 1fr)` grid of cards built from the shared card recipe; the only colours are the card surface, the hairline border, fg-strong / fg-muted, and the accent link.',
		'Collapse to a single `minmax(0, 1fr)` column on mobile so a wide child cannot size a track past the viewport.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
