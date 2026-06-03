import type { MarketingPatternSpec } from './types.js';

/**
 * NumberedCardRow — a row of cards each prefixed with a large mono number.
 *
 * Like ThreeCardRow, but each card leads with a big tabular mono index
 * (01 / 02 / 03) in the accent colour — for ordered steps or ranked reasons.
 * Title + body per card, on the card surface with the soft lift shadow.
 */
export const numberedCardRow: MarketingPatternSpec = {
	slug: 'numbered-card-row',
	name: 'NumberedCardRow',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A row of cards each prefixed with a large mono number (01 / 02 / 03) in the accent colour — for ordered steps or ranked reasons. Each card carries a title and a body on the card surface with a soft lift shadow.',

	source: 'src/components/sections/NumberedCardRow.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify exact prop names against the website source.',

	whenToUse:
		'Reach for NumberedCardRow when the cards are sequential ("how it works" in three steps) or ranked ("the three reasons"). Use ThreeCardRow when the points are parallel and unordered, or StepTimeline when the steps need a connecting line.',

	recipe: [
		'Lay out the cards on a grid with `grid-template-columns: repeat(N, minmax(0, 1fr))` and a ~24px gap (typically three).',
		'Each card: `background: var(--m-card)`, `border: 1px solid var(--m-border)`, `border-radius: 14–16px`, ~28px padding, plus the lift shadow `0 26px 56px -38px rgba(15, 20, 18, 0.42)`.',
		'Lead each card with the index — `font-family: var(--font-mono)`, `font-variant-numeric: tabular-nums`, large (~2.5rem), zero-padded (01, 02, 03), `color: var(--m-accent)`.',
		'Below the number, stack the title (`--m-fg-strong`) and body (`--m-fg-muted`, ~60ch).',
		'Collapse to one column under ~720px with `grid-template-columns: minmax(0, 1fr)`.',
		'Wrap the row (or each card, staggered) in a reveal target for the standard fade-rise entrance.',
	],

	dom: `<ol class="numbered-card-row">
  <li class="card">
    <span class="index">01</span>
    <h3>Connect</h3>
    <p>Link your carrier accounts in a few minutes.</p>
  </li>
  <li class="card"><span class="index">02</span>…</li>
  <li class="card"><span class="index">03</span>…</li>
</ol>`,

	tokensUsed: [
		{ part: 'index number', role: '--m-accent', notes: 'The large mono numeral leads each card.' },
		{ part: 'card surface', role: '--m-card' },
		{ part: 'card border', role: '--m-border' },
		{ part: 'title', role: '--m-fg-strong' },
		{ part: 'body', role: '--m-fg-muted' },
	],

	dimensions: [
		{ name: 'Columns', value: 'N (typically 3)', notes: 'repeat(N, minmax(0, 1fr)).' },
		{ name: 'Index size', value: '~2.5rem', notes: 'Mono, tabular-nums, zero-padded.' },
		{ name: 'Card radius', value: '14–16px' },
		{ name: 'Card padding', value: '~28px' },
		{ name: 'Lift shadow', value: '0 26px 56px -38px rgba(15, 20, 18, 0.42)' },
		{ name: 'Mobile breakpoint', value: '~720px', notes: 'Collapses to one column.' },
	],

	variants: [
		{ name: 'steps', description: 'Sequential — 01 → 02 → 03 reads as an ordered "how it works".' },
		{ name: 'ranked', description: 'Ranked reasons — the index is an ordinal, not a sequence.' },
	],

	props: [
		{ name: 'items', type: '{ title: string; body: string }[]', required: true, description: 'One entry per card; the index is derived from order (01, 02, 03…), not passed in.' },
		{ name: 'start', type: 'number', default: '1', description: 'First index value, if the row should not start at 01.' },
	],

	nonFeatures: [
		'No manual index prop per card — the number is derived from order so it never drifts out of sequence.',
		'No coloured index per card — the index is always the single accent colour, not a per-card hue.',
		'No connector line between cards — for a connected sequence use StepTimeline.',
	],

	gotchas: [
		'Set `font-variant-numeric: tabular-nums` on the index so 01 and 10 occupy the same width and the titles stay aligned across cards.',
		'PP Supply Mono ships only weights 200 and 400 — keep the big number at weight 400 or below; a heavier weight triggers synthetic faux-bold.',
	],

	accessibility: [
		'Use an `<ol>` so the sequence is conveyed semantically; the painted 01/02/03 is a decorative duplicate of the list order.',
		'Card titles are `<h3>` under the section `<h2>` — keep the heading outline intact.',
	],

	example: `<ol class="numbered-card-row">
  <li class="card">
    <span class="index">01</span>
    <h3>Connect</h3>
    <p>Link your carrier accounts in a few minutes — no engineering work.</p>
  </li>
  <li class="card">
    <span class="index">02</span>
    <h3>Audit</h3>
    <p>Every invoice is checked against your contract automatically.</p>
  </li>
  <li class="card">
    <span class="index">03</span>
    <h3>Recover</h3>
    <p>We file the claims and track each credit back to your account.</p>
  </li>
</ol>

<style>
  .numbered-card-row { list-style: none; margin: 0; padding: 0;
    display: grid; gap: 24px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .card { background: var(--m-card); border: 1px solid var(--m-border);
    border-radius: 16px; padding: 28px;
    box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42); }
  .index { display: block; font-family: var(--font-mono); font-weight: 400;
    font-variant-numeric: tabular-nums; font-size: 2.5rem; line-height: 1;
    color: var(--m-accent); }
  .card h3 { margin: 16px 0 8px; color: var(--m-fg-strong); }
  .card p { margin: 0; color: var(--m-fg-muted); line-height: 1.55; }
  @media (max-width: 720px) {
    .numbered-card-row { grid-template-columns: minmax(0, 1fr); }
  }
</style>`,
	exampleLang: 'html',

	porting: [
		'ThreeCardRow plus a leading mono index per card; the only extra colour decision is the accent on the number.',
		'Derive the index from list order and render it tabular so widths stay even; keep the mono face at weight ≤ 400.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
