import type { MarketingPatternSpec } from './types.js';

/**
 * ComparisonTable — N-column feature matrix with an emphasized "us" column.
 *
 * Replaced the old dedicated pricing page: home, /corporate-card, /rewards,
 * /shipping, and /ai-spend-audit all close their feature story with this
 * table instead of a price grid.
 */
export const comparisonTable: MarketingPatternSpec = {
	slug: 'comparison-table',
	name: 'ComparisonTable',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A 2–4 column feature matrix with one emphasized "us" column (jade header, subtly raised card). Rows are capability labels; cells are a check, a dash, or short text. Wraps in a horizontal-scroll container on mobile rather than reflowing to cards.',

	source: 'src/components/sections/ComparisonTable.tsx',
	sourceNote: 'Column count and emphasis prop pulled from the brief; verify exact breakpoint against the website source.',

	whenToUse:
		'Use ComparisonTable whenever the page needs to out-argue a named alternative (a competitor, "doing it manually", or a lesser plan) across several capabilities at once. It has effectively replaced the standalone pricing-grid page — reach for it instead of a dedicated pricing table.',

	recipe: [
		'Header row: first cell is blank (row-label column), remaining cells are column names — the "us" column gets a jade-tinted header cell, the rest neutral.',
		'Body rows: leading cell is the capability label (left-aligned, `--m-fg-strong`); other cells hold a check glyph (positive), an em-dash (unsupported), or a short text value.',
		'The "us" column carries a subtle raised treatment down its full height — `--m-surface` background a shade lighter than the table surface, plus a 1px `--m-accent-border` down both sides — so the eye locks onto it while scanning rows.',
		'Checks render in `--m-positive` (jade), never green; unsupported cells render a plain monochrome em-dash, never red.',
		'Wrap the table in a horizontally-scrolling container (`overflow-x: auto` with `-webkit-overflow-scrolling: touch`) below ~640px instead of reflowing rows into stacked cards — the row/column relationship is the point.',
		'Row dividers are hairline `--m-border`; no zebra striping.',
	],

	dom: `<div class="cmp-scroll">
  <table class="cmp">
    <thead>
      <tr><th></th><th>Manual tracking</th><th class="us">Dash.fi</th></tr>
    </thead>
    <tbody>
      <tr><td>Real-time spend visibility</td><td>—</td><td class="us"><Check /></td></tr>
      <tr><td>Automated receipt matching</td><td>—</td><td class="us"><Check /></td></tr>
    </tbody>
  </table>
</div>`,

	tokensUsed: [
		{ part: 'us column background', role: '--m-surface-2', notes: 'One shade lighter than the table surface.' },
		{ part: 'us column border', role: '--m-accent-border', notes: 'Down both vertical edges of the emphasized column.' },
		{ part: 'check glyph', role: '--m-positive', notes: 'Never green.' },
		{ part: 'unsupported dash', role: '--m-fg-subtle', notes: 'Monochrome, never red.' },
		{ part: 'row divider', role: '--m-border' },
		{ part: 'row label', role: '--m-fg-strong' },
	],

	dimensions: [
		{ name: 'Columns', value: '2–4', notes: 'Row-label column + 1–3 comparison columns.' },
		{ name: 'Row height', value: '~52px', notes: 'py-4 per cell.' },
		{ name: 'Us column border', value: '1px', notes: '--m-accent-border down both vertical edges.' },
		{ name: 'Mobile behavior', value: 'horizontal scroll, not reflow', notes: 'overflow-x: auto below ~640px.' },
	],

	variants: [
		{ name: '2-column', description: 'Us vs one named alternative — the most common case.' },
		{ name: '3–4-column', description: 'Us vs multiple competitor or plan tiers.' },
	],

	props: [
		{ name: 'columns', type: '{ label: string; emphasized?: boolean }[]', required: true, description: '2–4 columns; exactly one should set emphasized.' },
		{ name: 'rows', type: '{ label: string; values: (boolean | string)[] }[]', required: true, description: 'boolean renders check/dash; string renders as-is.' },
	],

	nonFeatures: [
		'Not a pricing table — no price cells, tier names as columns are fine but $/mo rows are not the point of this pattern.',
		'No sticky first column on scroll — the whole table scrolls together on mobile.',
		'Exactly one emphasized column; do not emphasize two competing columns at once.',
	],

	gotchas: [
		'Never use red for the unsupported cell — an em-dash in --m-fg-subtle carries "not included" without borrowing an alarm color.',
		'Keep the emphasized column literally adjacent to the row-label column on mobile scroll so it is visible without scrolling on first paint.',
	],

	motion: [
		'The table itself does not animate on reveal beyond the standard fade-rise wrapper; do not animate individual cells or checks in — the model is "at rest," not a slot-machine reveal.',
	],

	accessibility: [
		'Use a real <table> with <th scope="col"> headers — screen readers rely on the scope to announce which column a cell belongs to when navigating by cell.',
		'Check/dash cells include visually-hidden text ("Included" / "Not included") rather than relying on the glyph alone.',
	],

	example: `<div class="cmp-scroll">
  <table class="cmp">
    <thead>
      <tr>
        <th></th>
        <th>Manual tracking</th>
        <th class="us">Dash.fi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Real-time spend visibility</td>
        <td class="dash">—</td>
        <td class="us"><span class="check">✓</span><span class="sr-only">Included</span></td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .cmp-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .cmp { width: 100%; border-collapse: collapse; }
  .cmp th, .cmp td { padding: 16px 20px; text-align: left; border-bottom: 1px solid var(--m-border); }
  .cmp td:first-child { color: var(--m-fg-strong); font-weight: 500; }
  .cmp .us { background: var(--m-surface-2); border-left: 1px solid var(--m-accent-border); border-right: 1px solid var(--m-accent-border); }
  .cmp .check { color: var(--m-positive); }
  .cmp .dash { color: var(--m-fg-subtle); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A native table with an emphasized column carrying a lighter background and an accent-colored left/right border; checks in jade, unsupported cells as a monochrome dash.',
		'Below ~640px, wrap in a horizontally-scrolling container rather than reflowing to cards.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented — replaced the standalone pricing page across home, /corporate-card, /rewards, /shipping, /ai-spend-audit.' }],
};
