import type { MarketingPatternSpec } from './types.js';

/**
 * ChartBand — a bar chart paired with explanatory copy.
 *
 * There is no single canonical ChartBand component on dash.fi. This spec
 * grounds three real, independently-styled instances: two fixed-width
 * (1180px) product-screenshot bar charts embedded in two-column splits on
 * /parcel-analytics (hardcoded jade hex, no --m-* tokens), and one
 * --m-accent-based minimal bar strip inside the /ai-spend-audit dashboard
 * mock (paired with real, but chart-inert, range pills). No line/time-series
 * chart exists anywhere in the grounded source.
 */
export const chartBand: MarketingPatternSpec = {
	slug: 'chart-band',
	name: 'ChartBand',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A bar chart (never a line chart — none exists in the grounded source) paired with explanatory copy. On /parcel-analytics it is a full 1180px product-screenshot mock (KPI cards, tabs, one chart panel) in a two-column split; on /ai-spend-audit it is a lighter unlabelled bar strip inside one tab of an interactive dashboard mock, with real range pills that update a KPI number elsewhere but never redraw the bars.',

	source:
		'src/components/shipping/shots/ShipShotAnalytics.astro + ShipShotZone.astro (bar charts rendered in two-column splits on src/pages/parcel-analytics.astro); src/pages/ai-spend-audit.astro + src/styles/ai-spend-audit.css (.asa-bars minimal strip + real .asa-mock-range range pills, data in src/content/copy/ai-spend-audit.ts)',
	sourceNote:
		'Grounded directly against dash.fi rev a5be701 (2026-07-20). All three instances render bars as plain div/span elements sized by inline style percentage — never <svg>, <canvas>, or a charting library. No line/time-series chart markup was found anywhere in the repo; "Monthly Spend Trend" exists only as an inert sub-nav label in ShipShotAnalytics/ShipShotZone, never as a rendered chart.',

	sourceRevision: 'a5be701',
	lastVerifiedAt: '2026-07-20',
	verificationStatus: 'partial',

	whenToUse:
		'Reach for a bar chart panel when a screenshot-style proof of "real" product data reads more convincing than a stat number alone — parcel-analytics pairs one beside copy in a two-column split, ai-spend-audit drops a lighter unlabelled strip into one tab of an interactive dashboard mock. There is no grounded line/time-series chart anywhere on the marketing site; treat that shape as unverified until a real instance ships. For a single static number, prefer StatTrio; for a ranked list of recommendations, that is ActionPlan (see ShipShotAiReport), not ChartBand.',

	recipe: [
		'Two-column layout on desktop: copy (eyebrow + heading + lede paragraph) on one side, the chart on the other; stacks to copy-above-chart on mobile — this is the /parcel-analytics shape. The /ai-spend-audit shape instead stacks copy above a single centered dashboard mock in the hero, not a two-column split.',
		'Chart is always a bar chart — horizontal (label left, bar grows right, width = value / maxAxis) or vertical (bar height = value / maxAxis, category label below). Never a line/time-series chart in the grounded source, and never both shapes combined in one instance.',
		'Every bar in every grounded instance renders in a single jade/accent tone — no second hue, no comparison series exists anywhere in the source.',
		'Bars are plain HTML (div/span), sized via an inline style percentage against a fixed `maxAxis` value — never SVG, canvas, or a charting library.',
		'Horizontal and vertical bar charts (ShipShotAnalytics / ShipShotZone) render inside a full 1180px product-screenshot mock — KPI cards, a tab strip, a side nav, and one chart panel with axis ticks and dashed gridlines — scaled down by a wrapper component to fit the split column, never a standalone small chart.',
		'The lighter minimal-strip shape (ai-spend-audit `.asa-bars`) has no per-bar labels and no axis; it sits inside the "Usage" tab of an interactive dashboard mock, above a "cost by" breakdown toggle (a separate list widget, not part of the chart).',
		'If range pills are present (real only on /ai-spend-audit: 7d / 15d / 30d / 60d / 90d, styled as pills in the mock\'s chrome bar), they are genuine interactive buttons — but in the one grounded instance they rewrite a KPI number and a "last N days" caption elsewhere on the page; they do not resize, rescale, or redraw the bar strip itself.',
	],

	dom: `<section class="chart-band">
  <div class="copy">
    <span class="eyebrow">Daily cost</span>
    <h2>Every dollar, tracked by day.</h2>
    <p>See spend accumulate day over day, broken out by model, provider, or key.</p>
  </div>
  <div class="chart">
    <div class="range-tabs"><button data-active>30d</button><button>90d</button></div>
    <div class="bars">
      <span class="bar" style="height: 40%"></span>
      <span class="bar" style="height: 52%"></span>
      <span class="bar" style="height: 96%"></span>
    </div>
  </div>
</section>`,

	tokensUsed: [
		{
			part: 'bar-horizontal / bar-vertical fill (ShipShotAnalytics / ShipShotZone)',
			role: 'hardcoded hex — linear-gradient(#2b605c, #357670)',
			notes: 'Not on the --m-* system. These two components hardcode the product jade gradient directly and ship their own [data-mk-dark] override block (#5bb8b0 family) instead of consuming marketing custom properties.',
		},
		{
			part: 'bar-horizontal / bar-vertical chrome',
			role: 'hardcoded hex (#faf9f5 bg, #25261d text, rgba(37,38,29,*) hairlines)',
			notes: 'The whole ShipShot mock is a self-contained product-screenshot recreation styled outside --m-*.',
		},
		{ part: 'minimal-strip bar fill', role: '--m-accent', notes: 'ai-spend-audit .asa-bars — the one grounded instance actually on the --m-* system, rendered at 0.55 opacity.' },
		{
			part: 'range pill active state',
			role: '--m-accent-soft / --m-accent-border / --m-accent',
			notes: '.asa-mock-range[data-active="true"] — real, matches the token roles a marketing pill normally uses.',
		},
		{ part: 'minimal-strip surrounding chrome', role: '--m-card / --m-border-strong / --m-surface-2', notes: 'The .asa-mock frame that holds the strip.' },
	],

	dimensions: [
		{
			name: 'Product-screenshot canvas',
			value: '1180px fixed width',
			notes: 'ShipShotAnalytics / ShipShotZone render at a fixed 1180px width, scaled down by a <ShipShotFit> wrapper to fit the split column — not a native responsive chart.',
		},
		{
			name: 'Horizontal chart rows',
			value: '24px bar height, 20px row gap, 140px label column',
			notes: 'ShipShotAnalytics "Spend by Service" — axis ticks run below the plot area.',
		},
		{
			name: 'Vertical chart plot',
			value: '320px tall, 34px column width',
			notes: 'ShipShotZone "Volume by Zone" — y-axis ticks left, dashed gridlines, category label below each column.',
		},
		{ name: 'Minimal bar strip', value: '96px tall track, 5px gaps, 14 bars', notes: 'ai-spend-audit .asa-bars — flex:1 bars, no per-bar labels, no axis.' },
		{ name: 'Range pills', value: '5 options: 7d / 15d / 30d / 60d / 90d', notes: 'Real only on /ai-spend-audit — updates a KPI number + caption, not the bar strip.' },
		{
			name: 'Layout',
			value: 'two-column split (parcel-analytics) or stacked hero (ai-spend-audit)',
			notes: 'Not one fixed layout — the two grounded pages diverge.',
		},
	],

	variants: [
		{
			name: 'bar-horizontal',
			description:
				'ShipShotAnalytics "Spend by Service" — category label on the left, bar grows rightward, width = value / maxAxis, axis ticks along the bottom. Embedded in a two-column split on /parcel-analytics.',
		},
		{
			name: 'bar-vertical',
			description:
				'ShipShotZone "Volume by Zone" — bar height = value / maxAxis, category label below each column, y-axis ticks plus dashed gridlines. Embedded in a two-column split on /parcel-analytics.',
		},
		{
			name: 'minimal-strip-with-range-pills',
			description:
				'ai-spend-audit .asa-bars — a flat, unlabelled bar strip inside the "Usage" tab of a larger interactive dashboard mock, paired with real 7d/15d/30d/60d/90d range pills that update a KPI number and caption but do not redraw the bars themselves.',
		},
	],

	props: [
		{ name: 'kind', type: "'bar-horizontal' | 'bar-vertical' | 'minimal-strip'", required: true, description: 'Chart shape — no line/time-series variant exists in the grounded source.' },
		{
			name: 'data',
			type: '{ label: string[]; value: number }[] | { zone: string; value: number }[] | number[]',
			required: true,
			description: 'Shape depends on kind: multi-line label + value for bar-horizontal, zone + value for bar-vertical, raw height numbers for minimal-strip.',
		},
		{ name: 'maxAxis', type: 'number', description: 'bar-horizontal / bar-vertical only — the axis ceiling each value is scaled against (value / maxAxis * 100%).' },
		{ name: 'axisTicks', type: 'string[]', description: 'bar-horizontal / bar-vertical only — pre-formatted tick labels (e.g. "$0k".."$380k"), not derived from data.' },
		{
			name: 'ranges',
			type: '{ label: string; days: number; active: boolean }[]',
			description: 'minimal-strip only — the real example is 7d/15d/30d/60d/90d; updates a KPI and caption elsewhere on the page, not the bars.',
		},
	],

	nonFeatures: [
		'No SVG anywhere in the grounded source — every real instance sizes plain div/span elements via inline style percentages, never <svg>, <canvas>, or a charting library.',
		'No accessible text alternative on the bar charts themselves in the current source — unlike a typical accessible-chart pattern, there is no visually-hidden trend summary; this is a real gap in the live markup, not a feature to replicate uncritically.',
		'No second series or comparison color anywhere — every bar in every grounded instance is the single jade/accent tone.',
		'No client-side interactivity on the ShipShotAnalytics / ShipShotZone bar charts — fully static Astro markup. Only the ai-spend-audit dashboard mock has JS (tab switching, range-pill-to-KPI text swap, cost-by/violation toggles) via one inline <script>.',
	],

	gotchas: [
		'ShipShotAnalytics and ShipShotZone hardcode the jade gradient and dark-mode override directly (#2b605c / #357670 / #5bb8b0) rather than consuming --m-accent — do not "fix" this to tokens without checking both the light values and the manual [data-mk-dark] block.',
		'Range pills on /ai-spend-audit are real but cosmetic-only for the chart: clicking 7d/15d/30d/60d/90d rewrites a KPI number and a "last N days" caption via inline <script>; the .asa-bars heights never change. Do not assume switching ranges redraws the chart.',
		'No line/time-series chart exists anywhere in the grounded source ("Monthly Spend Trend" is an inert sub-nav label in ShipShotAnalytics/ShipShotZone\'s subViews list, never rendered as a chart) — treat a line variant as unverified, not a documented option.',
		'The two ShipShot bar charts are not standalone chart-plus-copy blocks — they are full 1180px product-screenshot mockups (KPI cards, tabs, side nav, one chart panel) scaled by a fit wrapper. Porting "just the chart" means extracting the chart-panel block, not the whole mock.',
	],

	motion: [
		'No draw-in animation on the bars themselves in any grounded instance — bars render fully drawn on load/mount.',
		'The surrounding split section uses the site-wide Reveal fade/rise-on-scroll wrapper (not chart-specific motion).',
		'The ai-spend-audit tab switch (.asa-screen[data-active="true"]) crossfades + translates in over 0.4s, gated behind prefers-reduced-motion — this is the mock\'s tab transition, not a chart-data transition.',
	],

	accessibility: [
		'The bar charts carry no aria-label, role="img", or visually-hidden text summary in the grounded source — values are only conveyed through the on-page copy paragraph, not the chart markup itself. Flag this as a real gap when porting, not an accessible pattern to copy as-is.',
		'Range pills (.asa-mock-range) are real <button> elements with a data-active attribute but no aria-pressed/aria-selected in source — only the separate tab strip (role="tab") carries aria-selected.',
	],

	example: `<section class="chart-band">
  <div class="copy">
    <span class="eyebrow">Daily cost</span>
    <h2>Every dollar, tracked by day.</h2>
  </div>
  <div class="chart">
    <div class="bars">
      <span class="bar" style="height: 40%"></span>
      <span class="bar" style="height: 52%"></span>
      <span class="bar" style="height: 96%"></span>
    </div>
  </div>
</section>

<style>
  .chart-band { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .bars { display: flex; align-items: flex-end; gap: 5px; height: 96px; }
  .bar { flex: 1; min-width: 0; border-radius: 4px 4px 0 0; background: var(--m-accent); opacity: 0.55; }
  .eyebrow { font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.16em;
    font-size: 12px; color: var(--m-fg-subtle); }
  @media (max-width: 640px) { .chart-band { grid-template-columns: 1fr; } }
</style>`,
	exampleLang: 'html',

	porting: [
		'A bar chart (horizontal label+track rows or vertical columns) rendered as plain divs/spans sized by inline style percentage against a fixed maxAxis — never SVG/canvas/a charting library.',
		'Ground the fill color to the page it lives on: the parcel-analytics ShipShot mocks hardcode the product jade hex plus a manual dark-mode override; only the ai-spend-audit minimal strip actually consumes --m-accent — pick one convention deliberately rather than assuming --m-* everywhere.',
		'If range pills are wanted, they are real UI (5 pill buttons, one active) but in the only grounded instance they relabel a KPI/caption elsewhere on the page, not the chart — decide explicitly whether your port makes them functional against the chart data or keeps them decorative like the source.',
	],

	changelog: [
		{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented — brief-authored, not yet verified against dash.fi source.' },
		{
			version: 'v0.2.0',
			date: '2026-07-20',
			note: 'Regrounded against the live dash.fi source (rev a5be701): real source paths, bar-only chart shapes (horizontal + vertical, no line chart found), real 5-option range pills (chart-inert), hardcoded-hex vs --m-accent token split, and dropped the unverified line-chart variant.',
		},
	],
};
