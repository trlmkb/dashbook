import type { MarketingPatternSpec } from './types.js';

/**
 * ChartBand — a chart + explanatory copy proof section.
 *
 * Seen on /parcel-analytics, /parcel-audit, /ai-spend-audit. A simple
 * bar or line chart paired with a short claim and an optional range-tab
 * switcher, never a full BI dashboard.
 */
export const chartBand: MarketingPatternSpec = {
	slug: 'chart-band',
	name: 'ChartBand',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A single bar or line chart paired with a short explanatory copy block — optionally with a small range-tab switcher (7d / 30d / 90d) above it. Chart values derive from static demo data drawn on-brand with --m-* tokens; never a live third-party charting library skin.',

	source: 'src/components/proof/ChartBand.tsx',
	sourceNote: 'Chart shape (bar vs line) and range-tab presence pulled from the brief; verify exact data points against /parcel-analytics and /ai-spend-audit source.',

	whenToUse:
		'Use ChartBand when a trend over time (spend, savings recovered, audit hit-rate) is the clearest proof of the claim. For a single static number, prefer StatTrio; for a numbered list of recommendations derived from the same data, pair ChartBand with ActionPlan directly below it (the /parcel-analytics and /ai-spend-audit pattern).',

	recipe: [
		'Two-column layout on desktop: copy (eyebrow + heading + 1–2 sentence explainer) on one side, the chart on the other; stacks to copy-above-chart on mobile.',
		'Chart is either a simple bar chart (discrete categories, e.g. carriers) or a line chart (time series, e.g. spend over months) — never both in one instance, never a combo chart.',
		'Bars/line render in `--m-accent`; a secondary comparison series (if any) renders in `--m-fg-subtle`, never a second hue — this is a one-color-story chart.',
		'Axis labels and gridlines are mono, `--m-fg-subtle`, minimal — no axis titles beyond a unit suffix on the value axis (e.g. "$k").',
		'An optional range-tab switcher (7d / 30d / 90d) sits above the chart, styled as the same pill-tab treatment used elsewhere on the marketing surface (not the product Tabs component).',
		'Money/positive values are jade; if the chart ever needs to show a negative or "cost" series, render it in monochrome ink, never red.',
	],

	dom: `<section class="chart-band">
  <div class="copy">
    <span class="eyebrow">Where the spend goes</span>
    <h2>Ad spend, reconciled daily.</h2>
    <p>See every dollar mapped to a campaign the moment it clears.</p>
  </div>
  <div class="chart">
    <div class="range-tabs"><button data-active>30d</button><button>90d</button></div>
    <svg viewBox="0 0 320 140"><!-- bars/line --></svg>
  </div>
</section>`,

	tokensUsed: [
		{ part: 'primary series', role: '--m-accent', notes: 'Bars or line stroke.' },
		{ part: 'secondary/comparison series', role: '--m-fg-subtle', notes: 'Never a second hue.' },
		{ part: 'axis / gridlines', role: '--m-fg-subtle', notes: 'Mono, minimal.' },
		{ part: 'range-tab active', role: '--m-accent-soft', notes: 'Pill background on the active range tab.' },
	],

	dimensions: [
		{ name: 'Chart aspect', value: '~16:7 (bar) / ~16:6 (line)' },
		{ name: 'Layout', value: 'two columns desktop, stacked mobile' },
		{ name: 'Range tabs', value: '3 options typical (7d / 30d / 90d)' },
	],

	variants: [
		{ name: 'bar', description: 'Discrete categories — carriers, vendors, months as separate bars.' },
		{ name: 'line', description: 'Continuous time series — cumulative spend or recovery over time.' },
		{ name: 'with range tabs', description: 'Adds the 7d/30d/90d switcher above the chart.' },
	],

	props: [
		{ name: 'kind', type: "'bar' | 'line'", required: true, description: 'Chart shape.' },
		{ name: 'data', type: '{ label: string; value: number }[]', required: true, description: 'Static demo series.' },
		{ name: 'ranges', type: 'string[]', description: 'Optional range-tab labels, e.g. ["7d", "30d", "90d"].' },
	],

	nonFeatures: [
		'Not an embedded BI widget — no zoom, pan, tooltip-on-every-point, or export controls.',
		'Never more than two series in one chart.',
		'No live data fetch — values are static demo data matching the copy claim, same restraint as every other marketing demo.',
	],

	gotchas: [
		'Keep the value axis unit suffix short ("$k", "%") rather than a full axis title — the copy block already states what the chart shows.',
		'If range tabs are present, switching ranges must not resize the chart\'s bounding box — only the data and axis scale change, so surrounding copy never reflows.',
	],

	motion: [
		'Bars/line can draw in on first reveal (stroke-dashoffset or scale-from-baseline, ~500–700ms) gated behind prefers-reduced-motion; render fully drawn with no animation when reduced motion is set.',
		'Range-tab switches crossfade the chart at --dur-fast, no bounce.',
	],

	accessibility: [
		'Provide a visually-hidden text summary of the trend ("Spend rose from $12k to $34k over 90 days") alongside the SVG for screen-reader users.',
		'Range tabs are real buttons with aria-pressed reflecting the active range.',
	],

	example: `<section class="chart-band">
  <div class="copy">
    <span class="eyebrow">Where the spend goes</span>
    <h2>Ad spend, reconciled daily.</h2>
  </div>
  <div class="chart">
    <svg viewBox="0 0 320 140" role="img" aria-label="Bar chart of spend by carrier">
      <rect x="10" y="60" width="28" height="70" fill="var(--m-accent)" />
      <rect x="50" y="30" width="28" height="100" fill="var(--m-accent)" />
      <rect x="90" y="80" width="28" height="50" fill="var(--m-fg-subtle)" />
    </svg>
  </div>
</section>

<style>
  .chart-band { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .eyebrow { font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.16em;
    font-size: 12px; color: var(--m-fg-subtle); }
  @media (max-width: 640px) { .chart-band { grid-template-columns: 1fr; } }
</style>`,
	exampleLang: 'html',

	porting: [
		'A single-series (or two-series-max) bar/line chart in the accent color, paired with short copy — no BI chrome, no interactivity beyond an optional range switcher.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented — grounded in /parcel-analytics, /parcel-audit, /ai-spend-audit proof sections.' }],
};
