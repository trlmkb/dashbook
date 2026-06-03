import type { MarketingPatternSpec } from './types.js';

/**
 * StatStrip — the full-width banded stat row.
 *
 * The band variant of StatTrio: 3–5 stats spanning a full-width strip, usually
 * on an ink or cobalt band, with hairline dividers between cells. One value +
 * label per cell, mono tabular figures throughout.
 */
export const statStrip: MarketingPatternSpec = {
	slug: 'stat-strip',
	name: 'StatStrip',
	category: 'Rhythm & connectors',
	status: 'stable',
	description:
		'A full-width strip of 3–5 stats, often on an ink or cobalt band — a value and an uppercase mono label per stat, with hairline dividers between cells. The banded sibling of StatTrio.',

	source: 'src/components/slide/StatStrip.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'Use a StatStrip as a full-width proof band between sections — 3–5 headline numbers on an ink or cobalt strip that punctuates the page rhythm. Use StatTrio when the three stats sit inline on the page canvas rather than in their own band.',

	recipe: [
		'Render the strip as a full-width band (usually `ink` or `cobalt`); on `ink` set `data-marketing-dark` so the `--m-*` roles flip and the values/labels re-theme.',
		'Lay out 3–5 equal cells: `grid-template-columns: repeat(N, minmax(0, 1fr))`.',
		'Insert hairline dividers between cells with `--m-border` (a left border on each cell after the first, or a 1px column rule).',
		'Each cell: a large mono tabular-nums value (`--m-fg-strong` on the band, or `--m-accent`) over an uppercase mono label in `--m-fg-subtle`; prefix currency on the value (e.g. `$300M+`).',
		'Collapse to a 2-up then 1-up grid on mobile (`minmax(0, 1fr)` tracks), dropping the vertical dividers when stacked.',
		'Wrap the strip in a reveal target for the standard fade-rise entrance.',
	],

	dom: `<section class="stat-strip" data-marketing-dark>
  <dl class="stats">
    <div class="stat"><dd class="value">$300M+</dd><dt class="label">Recovered</dt></div>
    <div class="stat"><dd class="value">98.4%</dd><dt class="label">Auto-audited</dt></div>
    <div class="stat"><dd class="value">12</dd><dt class="label">Carriers</dt></div>
    <div class="stat"><dd class="value">4.2d</dd><dt class="label">Avg. recovery</dt></div>
  </dl>
</section>`,

	tokensUsed: [
		{ part: 'band surface', role: '--m-near-black', notes: 'Or --m-cobalt. Pair ink with data-marketing-dark.' },
		{ part: 'value', role: '--m-fg-strong', notes: 'Mono, tabular-nums; re-resolves to paper on the ink band. Or --m-accent.' },
		{ part: 'label', role: '--m-fg-subtle', notes: 'Mono, uppercase, tracked.' },
		{ part: 'divider', role: '--m-border', notes: 'Hairline between cells.' },
	],

	dimensions: [
		{ name: 'Stats', value: '3–5', notes: 'repeat(N, minmax(0, 1fr)).' },
		{ name: 'Value size', value: 'clamp(1.75rem, 4vw, 3rem)', notes: 'Mono, tabular-nums, weight ≤ 400.' },
		{ name: 'Label size', value: '10–12px', notes: 'Mono caps, tracked 0.16–0.2em.' },
		{ name: 'Divider', value: '1px', notes: '--m-border between cells; dropped when stacked.' },
		{ name: 'Mobile breakpoints', value: '~900 / ~560px', notes: '5/4-up → 2-up → 1-up.' },
	],

	variants: [
		{
			name: 'ink',
			description: 'Dark band — sets data-marketing-dark so values/labels flip to the dark role set.',
			tokens: [{ name: 'background', token: { cssVar: '--m-near-black', light: '#25261D', dark: '#25261D' } }],
		},
		{
			name: 'cobalt',
			description: 'High-energy marketing data band — one per page, never adjacent to another saturated band.',
			tokens: [{ name: 'background', token: { cssVar: '--m-cobalt', light: '#354CEF', dark: '#354CEF' } }],
		},
		{
			name: 'paper',
			description: 'Quiet light band when the surrounding rhythm needs no dark beat.',
			tokens: [{ name: 'background', token: { cssVar: '--m-surface', light: '#FAF9F5', dark: '#14181C' } }],
		},
	],

	props: [
		{ name: 'stats', type: '{ value: string; label: string }[]', required: true, description: '3–5 entries; value renders large + tabular, label small + tracked.' },
		{ name: 'band', type: "'ink' | 'cobalt' | 'paper'", default: "'ink'", description: 'Which band to paint; `ink` also flips the marketing dark variant.' },
		{ name: 'tone', type: "'strong' | 'accent'", default: "'strong'", description: 'Value colour on the band.' },
	],

	nonFeatures: [
		'Not a chart — discrete numbers with hairline dividers, no bars or axes.',
		'Not a card row — the cells share one band and are split by hairlines, not boxed into individual cards.',
		'No count-up by default — figures are static editorial values, not animated odometers (and never under reduced motion).',
	],

	gotchas: [
		'On the ink band the values only flip if they read `--m-fg-strong` / `--m-accent`; a hardcoded hex stays dark and disappears — keep colours on the role set and set `data-marketing-dark`.',
		'Drop the vertical dividers when the strip stacks on mobile — a left-border divider on a stacked cell reads as a stray hairline.',
	],

	motion: [
		'Wrap the strip in a `data-reveal` target for the standard fade-rise entrance; honour `prefers-reduced-motion: reduce` by rendering in the final state.',
		'Any count-up derives from the real datum and lands on the true value; disable it under reduced motion and show the final figure.',
	],

	accessibility: [
		'Use a `<dl>` with `<dt>` label / `<dd>` value pairs so each number is associated with its label.',
		'On ink/cobalt keep value + label contrast ≥ 4.5:1 — the role set is tuned for this; do not override the foreground with a lower-contrast value.',
	],

	example: `<section class="stat-strip" data-marketing-dark>
  <dl class="stats">
    <div class="stat"><dd class="value">$300M+</dd><dt class="label">Recovered</dt></div>
    <div class="stat"><dd class="value">98.4%</dd><dt class="label">Auto-audited</dt></div>
    <div class="stat"><dd class="value">12</dd><dt class="label">Carriers</dt></div>
    <div class="stat"><dd class="value">4.2d</dd><dt class="label">Avg. recovery</dt></div>
  </dl>
</section>

<style>
  .stat-strip { background: var(--m-near-black); padding: 40px max(24px, 4vw); }
  .stats { display: grid; gap: 0; margin: 0;
    grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .stat { display: flex; flex-direction: column; gap: 8px; padding-inline: 28px; }
  .stat + .stat { border-left: 1px solid var(--m-border); }
  .value { margin: 0; font-family: var(--font-mono);
    font-size: clamp(1.75rem, 4vw, 3rem); line-height: 1;
    font-variant-numeric: tabular-nums; color: var(--m-fg-strong); }
  .label { font-family: var(--font-mono); text-transform: uppercase;
    letter-spacing: 0.18em; font-size: 11px; color: var(--m-fg-subtle); }
  @media (max-width: 560px) {
    .stats { grid-template-columns: minmax(0, 1fr); }
    .stat + .stat { border-left: 0; }
  }
</style>`,
	exampleLang: 'html',

	porting: [
		'A full-width band (ink/cobalt/paper) holding an N-track `minmax(0, 1fr)` grid of value+label cells with `--m-border` hairlines between them; for the dark band, flip the subtree with the marketing dark attribute rather than recolouring each cell.',
		'Keep values mono + tabular, collapse the grid on mobile, and drop the dividers when stacked.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
