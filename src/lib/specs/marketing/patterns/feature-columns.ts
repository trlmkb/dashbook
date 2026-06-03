import type { MarketingPatternSpec } from './types.js';

/**
 * FeatureColumns — equal feature columns without card chrome.
 *
 * Promoted from the site `rhythm/` library. 2–4 equal columns sit side-by-side
 * with no card fill or border — just an icon, a heading, and text per column.
 * Optional hairline dividers between columns carry the rhythm. A lighter, more
 * editorial cousin of FeatureGrid.
 */
export const featureColumns: MarketingPatternSpec = {
	slug: 'feature-columns',
	name: 'FeatureColumns',
	category: 'Content blocks',
	status: 'stable',
	description:
		'2–4 equal feature columns side-by-side with no card chrome — just an icon, a heading, and text per column. Optional hairline dividers between columns carry the rhythm.',

	source: 'src/components/rhythm/FeatureColumns.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'When you want a clean, editorial row of 2–4 peer features that breathes with the band rather than sitting in cards — ideal directly under a section intro. Use FeatureGrid when you want contained cells or more than four items, and FeatureList when the set is long enough to want a dense vertical layout.',

	recipe: [
		'Render a `<ul>` as a grid of equal tracks: `grid-template-columns: repeat(N, minmax(0, 1fr))`, N between 2 and 4.',
		'Each column stacks an icon, a heading, and a short paragraph — no fill, no border, no shadow.',
		'Icon: ~28px glyph in `--m-accent`, currentColor, no tile behind it (the column is chromeless).',
		'Optional vertical dividers: a `--m-border` left border on every column except the first, with inline padding so text clears the rule.',
		'Heading in `--m-fg-strong`; body in `--m-fg-muted`; collapse to a single column on mobile.',
	],

	dom: `<ul class="feature-cols" data-dividers>
  <li class="col">
    <span class="icon" aria-hidden="true"><svg>…</svg></span>
    <h3 class="heading">Connect carriers</h3>
    <p class="body">Link UPS, FedEx, and DHL in a couple of minutes.</p>
  </li>
  <!-- 2–4 columns -->
</ul>`,

	tokensUsed: [
		{ part: 'icon', role: '--m-accent', notes: 'currentColor; no tile behind it.' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'body', role: '--m-fg-muted' },
		{ part: 'divider', role: '--m-border', notes: 'Optional 1px rule between columns.' },
	],

	dimensions: [
		{ name: 'Columns', value: '2–4', notes: 'Equal minmax(0, 1fr) tracks; collapses to 1 on mobile.' },
		{ name: 'Gap', value: '32 → 48px', notes: 'Wider than FeatureGrid since there is no card padding.' },
		{ name: 'Icon', value: '28px', notes: 'Bare glyph, no tile.' },
		{ name: 'Divider', value: '1px', notes: 'Left border on columns 2..N when enabled.' },
	],

	props: [
		{ name: 'items', type: 'Array<{ icon; heading; body }>', required: true, description: 'The columns in order (2–4).' },
		{ name: 'columns', type: '2 | 3 | 4', default: '3', description: 'Track count on the widest breakpoint.' },
		{ name: 'dividers', type: 'boolean', default: 'false', description: 'Show hairline rules between columns.' },
	],

	nonFeatures: [
		'No card chrome — columns never get a fill, border box, or shadow; that is FeatureGrid bordered.',
		'No more than four columns — past four the measure gets too narrow and it should become a grid.',
		'No per-column CTA — columns are descriptive, not actionable.',
	],

	gotchas: [
		'The divider is a per-column left border (skip the first), not a wrapper background — a background stripe will not line up once columns wrap on mobile.',
		'Drop the dividers when the grid collapses to one column, or you get a stray rule down the left edge of every item.',
	],

	accessibility: [
		'Dividers are decorative — never rely on them to convey grouping; the headings do that.',
		'Keep the icon `aria-hidden`; the heading is the column label.',
	],

	example: `<ul class="feature-cols" data-dividers>
  <li class="col">
    <span class="icon" aria-hidden="true"><Plug /></span>
    <h3 class="heading">Connect carriers</h3>
    <p class="body">Link UPS, FedEx, and DHL in a couple of minutes.</p>
  </li>
</ul>

<style>
  .feature-cols { display: grid; gap: 40px; list-style: none; margin: 0; padding: 0;
    grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (max-width: 720px) { .feature-cols { grid-template-columns: minmax(0, 1fr); } }
  .col { display: flex; flex-direction: column; gap: 10px; }
  .feature-cols[data-dividers] .col + .col {
    border-left: 1px solid var(--m-border); padding-left: 40px; }
  @media (max-width: 720px) {
    .feature-cols[data-dividers] .col + .col { border-left: 0; padding-left: 0; } }
  .icon { color: var(--m-accent); }
  .heading { margin: 0; font-family: var(--font-display); font-weight: 200;
    text-transform: uppercase; font-size: 17px; color: var(--m-fg-strong); }
  .body { margin: 0; font-size: 15px; line-height: 1.6; color: var(--m-fg-muted); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A 2–4 track `minmax(0, 1fr)` grid of chromeless columns — bare accent icon, display heading, muted body — collapsing to one column on mobile.',
		'Dividers are an opt-in per-column left border (columns 2..N) that must drop when the grid wraps.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
