import type { MarketingPatternSpec } from './types.js';

/**
 * StatTrio — three big stats in a row.
 *
 * Three equal cells, each a large mono tabular-nums value over an uppercase mono
 * label. The on-canvas version of the proof beat; TrustStatBand is its full-width
 * banded sibling.
 */
export const statTrio: MarketingPatternSpec = {
	slug: 'stat-trio',
	name: 'StatTrio',
	category: 'Rhythm & connectors',
	status: 'stable',
	description:
		'Three big stats in a row — each a large mono tabular-nums value (accent or strong) over an uppercase mono label in subtle text. Three minmax(0,1fr) tracks that collapse to a stacked column on mobile.',

	source: 'src/components/rhythm/StatTrio.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'Use a StatTrio as a compact proof beat inside a section on the page canvas — three headline numbers that anchor a claim. Reach for TrustStatBand when you want a full-width banded proof row — a lead counter, supporting pillars, and hairline dividers.',

	recipe: [
		'Lay out three equal cells: `grid-template-columns: repeat(3, minmax(0, 1fr))` with a column gap.',
		'Each cell stacks a value over a label, with the value first (it is the figure that matters).',
		'Value — `font-family: var(--font-mono)`, large `clamp()` size, `font-variant-numeric: tabular-nums`, `color: var(--m-accent)` (or `--m-fg-strong`); prefix currency on the value itself (e.g. `$300M+`).',
		'Label — mono, uppercase, `letter-spacing: 0.16–0.2em`, 10–12px, `color: var(--m-fg-subtle)`.',
		'Collapse to one column under ~640px (`grid-template-columns: minmax(0, 1fr)`), keeping the value/label pairing.',
		'Wrap the row (or each cell, staggered) in a reveal target for the standard fade-rise entrance.',
	],

	dom: `<dl class="stat-trio">
  <div class="stat">
    <dd class="value">$300M+</dd>
    <dt class="label">Overcharges recovered</dt>
  </div>
  <div class="stat">
    <dd class="value">98.4%</dd>
    <dt class="label">Invoices auto-audited</dt>
  </div>
  <div class="stat">
    <dd class="value">12</dd>
    <dt class="label">Carriers supported</dt>
  </div>
</dl>`,

	tokensUsed: [
		{ part: 'value', role: '--m-accent', notes: 'Or --m-fg-strong. Mono, tabular-nums.' },
		{ part: 'label', role: '--m-fg-subtle', notes: 'Mono, uppercase, tracked.' },
		{ part: 'optional divider', role: '--m-border', notes: 'Hairline between cells, if used.' },
	],

	dimensions: [
		{ name: 'Columns', value: '3', notes: 'repeat(3, minmax(0, 1fr)); exactly three.' },
		{ name: 'Value size', value: 'clamp(2rem, 5vw, 3.25rem)', notes: 'Mono, tabular-nums, weight ≤ 400.' },
		{ name: 'Label size', value: '10–12px', notes: 'Mono caps, tracked 0.16–0.2em.' },
		{ name: 'Value → label gap', value: '~8px' },
		{ name: 'Mobile breakpoint', value: '~640px', notes: 'Collapses to one stacked column.' },
	],

	variants: [
		{ name: 'accent', description: 'Default — values in jade (--m-accent).' },
		{ name: 'strong', description: 'Quieter — values in --m-fg-strong when the band is already saturated.' },
	],

	props: [
		{ name: 'stats', type: '{ value: string; label: string }[]', required: true, description: 'Exactly three entries; value renders large + tabular, label small + tracked.' },
		{ name: 'tone', type: "'accent' | 'strong'", default: "'accent'", description: 'Value colour — jade accent or ink/paper strong.' },
	],

	nonFeatures: [
		'Not a chart — three discrete numbers, no bars, axes, or trend lines.',
		'Not a flexible grid — this is exactly three stats; for a full-width banded proof row use TrustStatBand.',
		'No count-up by default — the figures are static editorial values, not animated odometers (and never under reduced motion).',
	],

	gotchas: [
		'Set `font-variant-numeric: tabular-nums` on every value so widths do not jitter and the three values align on a consistent grid.',
		'Use `minmax(0, 1fr)` tracks, not `1fr` — a long value or unit string can otherwise size a track past the viewport on mobile.',
	],

	motion: [
		'Wrap the row in a `data-reveal` target for the standard fade-rise entrance; honour `prefers-reduced-motion: reduce` by rendering in the final state.',
		'If you animate a count-up, it derives from the real datum and lands on the true value; disable the count-up under reduced motion and show the final figure.',
	],

	accessibility: [
		'Use a `<dl>` with `<dt>` label / `<dd>` value pairs so each number is programmatically associated with its label.',
		'Do not rely on the value colour alone to convey meaning — the label carries the meaning; tone is emphasis only.',
	],

	example: `<dl class="stat-trio">
  <div class="stat"><dd class="value">$300M+</dd><dt class="label">Overcharges recovered</dt></div>
  <div class="stat"><dd class="value">98.4%</dd><dt class="label">Invoices auto-audited</dt></div>
  <div class="stat"><dd class="value">12</dd><dt class="label">Carriers supported</dt></div>
</dl>

<style>
  .stat-trio { display: grid; gap: 24px;
    grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; }
  .stat { display: flex; flex-direction: column; gap: 8px; }
  .value { margin: 0; font-family: var(--font-mono);
    font-size: clamp(2rem, 5vw, 3.25rem); line-height: 1;
    font-variant-numeric: tabular-nums; color: var(--m-accent); }
  .label { font-family: var(--font-mono); text-transform: uppercase;
    letter-spacing: 0.18em; font-size: 11px; color: var(--m-fg-subtle); }
  @media (max-width: 640px) {
    .stat-trio { grid-template-columns: minmax(0, 1fr); }
  }
</style>`,
	exampleLang: 'html',

	porting: [
		'A three-track `minmax(0, 1fr)` grid; each cell is a large mono tabular-nums value over a small tracked mono label. Colours: value = accent (or fg-strong), label = fg-subtle.',
		'Collapse to one column on mobile and keep tabular figures so the values align and do not reflow.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
