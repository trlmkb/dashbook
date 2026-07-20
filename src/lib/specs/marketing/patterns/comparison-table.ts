import type { MarketingPatternSpec } from './types.js';

/**
 * ComparisonTable — the "us vs named competitors" feature matrix.
 *
 * Two real implementations exist on the live site under one visual idea:
 *
 * 1. A CSS-grid "table" (div rows, not a `<table>`) — `.mk-comparison-*` —
 *    used verbatim on `/corporate-card` and `/expense-management`. Fixed at
 *    4 columns (row-label + Dash.fi + Brex + Ramp), column headers are
 *    hardcoded per page (not data-driven), only the row values come from
 *    the page's content-copy file. This is the primary source below.
 * 2. A real `<table>` — `.rw-compare-*` — used once, on `/rewards`, inside a
 *    dark `data-mk-dark` band with hardcoded rgba colours (not the shared
 *    `--m-*` roles). It runs 6 columns (row-label + 5 competitors) and is
 *    the only instance that renders boolean cells as inline check/x SVGs
 *    rather than free text. Cited as an alternate in sourceNote.
 */
export const comparisonTable: MarketingPatternSpec = {
	slug: 'comparison-table',
	name: 'ComparisonTable',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A feature matrix with one emphasized "us" column, built as CSS-grid rows (not a semantic table) on /corporate-card and /expense-management: a fixed 4-column layout (row label + Dash.fi + Brex + Ramp), free-text cells (no check/dash glyphs), alternating-row tint, and a horizontal-scroll wrapper below the table\'s own min-width. A second, real-<table> variant with boolean check/x cells exists once on /rewards.',

	source:
		'src/pages/corporate-card.astro (section "compare", ~L262–316, class prefix `mk-comparison-`) — identical block reused in src/pages/expense-management.astro (section "comparison", ~L196–246). Styled by `--m-*` roles defined in src/styles/shipping-audit.css.',
	sourceNote:
		'Grounded directly against both live instances plus the shared token file. A second real-<table> implementation (`.rw-compare-*`, src/pages/rewards.astro ~L340–400 + CSS ~L1560–1626) is a one-off: it hardcodes rgba colours for a dark `data-mk-dark` band instead of using `--m-*` roles, runs 6 columns instead of 4, and is the only instance with boolean check/x SVG cells. Column count "2–4" from the original brief is unconfirmed — the only two live instances run 4 and 6 columns; no 2- or 3-column instance was found. Prop-shape flexibility (e.g. a generic `columns` prop) is not implemented on the primary instance — see props below.',

	sourceRevision: 'a5be701',
	lastVerifiedAt: '2026-07-20',
	verificationStatus: 'verified',

	whenToUse:
		'Reach for ComparisonTable when the page needs to out-argue named alternatives (Brex, Ramp, Amex, Capital One) across several capabilities at once — it has replaced a dedicated pricing page on every product page that uses it. The live instances always name real competitors in the header, never a generic "Alternative" column.',

	recipe: [
		'Primary (live) structure is CSS grid, not `<table>`: `.mk-comparison-table` (the card) contains `.mk-comparison-row` elements (`display: grid; grid-template-columns: 1fr 1fr 1fr 1fr`), each holding `.mk-comparison-cell` children — there is no `<table>`/`<tr>`/`<td>` in this instance.',
		'Column headers are literal per-page markup ("Feature", "Dash.fi", "Brex", "Ramp") — not passed as data/props. Only the row bodies are data-driven, from each page\'s content-copy file (`cc.compare.rows` / `em.comparison.rows`).',
		'Header row (`.mk-comparison-row--head`, background `--m-surface`): each header cell carries a `.mk-comparison-collabel` (mono, uppercase, letter-spacing). The Dash.fi header cell adds `.mk-comparison-collabel--accent` (colour `--m-accent`) plus a `.mk-comparison-rec` pill reading "Recommended" (solid `--m-accent` background, white text, fully rounded).',
		'Body cells are free text, never a check/dash glyph, in the primary instance — e.g. "3% on ad, shipping & AI spend, 2% on the rest", "None", "Yes". The row-label cell uses `.mk-comparison-feature-text` (bold, `--m-fg-strong`); other cells use `.mk-comparison-val` (`--m-fg-muted`), with the Dash.fi cell upgraded to `.mk-comparison-val--strong` (`--m-fg-strong`, semibold).',
		'The Dash.fi column (`.mk-comparison-dashfi`) gets `background: --m-accent-soft` and a `border-left: 1px solid --m-accent-border` — left edge only; there is no matching right-edge accent border.',
		'Every other body row alternates via `data-zebra="true"` (odd index) → `background: --m-negative-soft`. This is a monochrome ink tint (never a colour), not the "no zebra striping" the pre-verification brief assumed.',
		'Row divider is `border-top: 1px solid --m-border` on `.mk-comparison-row` (first row has it removed), not a bottom border.',
		'The whole table sits in `.mk-comparison-scroll { overflow-x: auto }`; the table itself is given `min-width: 720px`, which is what forces horizontal scroll on narrow viewports — there is no explicit media-query breakpoint and no reflow to stacked cards.',
		'A disclaimer line (`.mk-comparison-foot`, mono, `--m-fg-subtle`) sits directly under the scroll wrapper.',
	],

	dom: `<div class="mk-comparison-scroll">
  <div class="mk-comparison-table">
    <div class="mk-comparison-row mk-comparison-row--head">
      <div class="mk-comparison-cell mk-comparison-feature">
        <span class="mk-comparison-collabel">Feature</span>
      </div>
      <div class="mk-comparison-cell mk-comparison-dashfi">
        <span class="mk-comparison-collabel mk-comparison-collabel--accent">Dash.fi</span>
        <span class="mk-comparison-rec">Recommended</span>
      </div>
      <div class="mk-comparison-cell"><span class="mk-comparison-collabel">Brex</span></div>
      <div class="mk-comparison-cell"><span class="mk-comparison-collabel">Ramp</span></div>
    </div>
    <div class="mk-comparison-row" data-zebra="false">
      <div class="mk-comparison-cell mk-comparison-feature">
        <span class="mk-comparison-feature-text">Cash back</span>
      </div>
      <div class="mk-comparison-cell mk-comparison-dashfi">
        <span class="mk-comparison-val mk-comparison-val--strong">3% on ad, shipping &amp; AI spend, 2% on the rest</span>
      </div>
      <div class="mk-comparison-cell"><span class="mk-comparison-val">Points, with caps</span></div>
      <div class="mk-comparison-cell"><span class="mk-comparison-val">1.5% flat</span></div>
    </div>
  </div>
</div>
<p class="mk-comparison-foot">Based on publicly described capabilities, for general guidance.</p>`,

	tokensUsed: [
		{ part: 'table border + radius', role: '--m-border-strong', notes: '1px border, 14px radius, overflow: hidden, on .mk-comparison-table.' },
		{ part: 'table surface', role: '--m-card' },
		{ part: 'header row background', role: '--m-surface' },
		{ part: 'row divider', role: '--m-border', notes: 'border-top on .mk-comparison-row, not border-bottom.' },
		{ part: 'us (Dash.fi) column background', role: '--m-accent-soft' },
		{ part: 'us column border', role: '--m-accent-border', notes: 'Left edge only (border-left); no right-edge counterpart.' },
		{ part: 'us column label + rec pill', role: '--m-accent', notes: 'Collabel text colour and the solid "Recommended" pill background.' },
		{ part: 'zebra row background', role: '--m-negative-soft', notes: 'Alternating rows (data-zebra="true"); a monochrome ink tint, not a colour.' },
		{ part: 'header collabel', role: '--m-fg-muted' },
		{ part: 'row label text', role: '--m-fg-strong' },
		{ part: 'us column cell text', role: '--m-fg-strong', notes: '.mk-comparison-val--strong, semibold.' },
		{ part: 'other cell text', role: '--m-fg-muted' },
		{ part: 'footnote', role: '--m-fg-subtle' },
	],

	dimensions: [
		{ name: 'Columns', value: '4, fixed', notes: 'Row-label + Dash.fi + Brex + Ramp, all equal width (grid-template-columns: 1fr 1fr 1fr 1fr). The alternate <table> instance on /rewards runs 6 (row-label + 5 competitors) instead.' },
		{ name: 'Cell padding', value: '16px 20px', notes: 'No fixed row height is set — height is padding + content.' },
		{ name: 'Container radius', value: '14px', notes: '.mk-comparison-table; overflow: hidden.' },
		{ name: 'Container border', value: '1px', notes: '--m-border-strong around the whole table.' },
		{ name: 'Container shadow', value: '0 28px 64px -46px rgba(37, 38, 29, 0.5)', notes: 'Soft lift shadow on the card.' },
		{ name: 'Us column border', value: '1px, left edge only', notes: '--m-accent-border via border-left on .mk-comparison-dashfi; no right-edge border exists.' },
		{ name: 'Forced scroll width', value: '720px', notes: '.mk-comparison-table min-width, inside an overflow-x: auto wrapper — this is what triggers horizontal scroll, not a media query.' },
	],

	variants: [
		{ name: '4-column (verified)', description: 'Row-label + Dash.fi + 2 competitors — the only column count confirmed on /corporate-card and /expense-management today.' },
		{ name: '6-column, real <table> (secondary instance)', description: 'Row-label + 5 competitors, on /rewards — a different markup (`<table>`), different token strategy (hardcoded dark-band rgba, not --m-* roles), and the only instance with boolean check/x cells rendered as inline SVGs instead of text.' },
	],

	props: [
		{
			name: 'rows',
			type: '{ feature: string; dashfi: string; brex: string; ramp: string }[]',
			required: true,
			description: 'The only data-driven part of the primary instance. Each value is short free text (e.g. "None", "Yes", "Net-1 to Net-60, your choice") — there is no boolean/check-glyph rendering path in this instance.'
		},
		{
			name: 'disclaimer',
			type: 'string',
			required: true,
			description: 'Footnote rendered under the table, e.g. "Based on publicly described capabilities, for general guidance."'
		},
	],

	nonFeatures: [
		'Column headers are not a prop in the live instance — "Feature", "Dash.fi", "Brex", "Ramp" are hardcoded per page. Do not assume a generic N-competitor header prop without adding one.',
		'No check/dash glyphs in the primary instance — every cell is free text; a boolean-driven check/x rendering only exists in the separate /rewards <table> variant.',
		'Not a pricing table — no price rows; it replaced the standalone pricing page but keeps to capability rows.',
		'No sticky column on scroll — the whole grid/table scrolls together.',
	],

	gotchas: [
		'The "us" column\'s accent border is left-edge only (`border-left`) — there is no right-edge accent border in the live CSS, unlike a symmetric "raised card" treatment.',
		'Zebra striping is real here (`data-zebra="true"` on alternating rows, background `--m-negative-soft`) — do not assume a flat, non-striped table for this pattern.',
		'`--m-negative-soft` is documented in shipping-audit.css as deliberately monochrome/ink, never red — the zebra tint and any "negative" signal in this system stay achromatic.',
		'The forced horizontal scroll comes from the table\'s own `min-width` (720px primary / 760px on /rewards) inside an `overflow-x: auto` wrapper, not from an explicit `@media` breakpoint — do not invent a breakpoint value that isn\'t in the source.',
		'Do not port this as a semantic `<table>` by default — the verified, twice-used instance is CSS-grid divs. Use a real `<table>` only if mirroring the /rewards secondary variant specifically.',
	],

	motion: [
		'Wrapped in the standard `Reveal` fade-rise on entry (delay 80ms after the heading); no per-row or per-cell stagger.',
	],

	accessibility: [
		'The primary (grid-div) instance is not a semantic table — screen reader users get no column/row header association from markup alone; this is a real gap in the live source, not a documented accessibility feature.',
		'The /rewards `<table>` variant is more accessible by construction (`<th>`/`<td>`) and labels its check/x SVGs with `aria-label="Yes"` / `aria-label="No"`.',
	],

	example: `<div class="mk-comparison-scroll">
  <div class="mk-comparison-table">
    <div class="mk-comparison-row mk-comparison-row--head">
      <div class="mk-comparison-cell mk-comparison-feature">
        <span class="mk-comparison-collabel">Feature</span>
      </div>
      <div class="mk-comparison-cell mk-comparison-dashfi">
        <span class="mk-comparison-collabel mk-comparison-collabel--accent">Dash.fi</span>
        <span class="mk-comparison-rec">Recommended</span>
      </div>
      <div class="mk-comparison-cell"><span class="mk-comparison-collabel">Brex</span></div>
      <div class="mk-comparison-cell"><span class="mk-comparison-collabel">Ramp</span></div>
    </div>
    <div class="mk-comparison-row" data-zebra="false">
      <div class="mk-comparison-cell mk-comparison-feature"><span class="mk-comparison-feature-text">Cash back</span></div>
      <div class="mk-comparison-cell mk-comparison-dashfi"><span class="mk-comparison-val mk-comparison-val--strong">3% on ad, shipping &amp; AI spend, 2% on the rest</span></div>
      <div class="mk-comparison-cell"><span class="mk-comparison-val">Points, with caps</span></div>
      <div class="mk-comparison-cell"><span class="mk-comparison-val">1.5% flat</span></div>
    </div>
    <div class="mk-comparison-row" data-zebra="true">
      <div class="mk-comparison-cell mk-comparison-feature"><span class="mk-comparison-feature-text">Platform fee</span></div>
      <div class="mk-comparison-cell mk-comparison-dashfi"><span class="mk-comparison-val mk-comparison-val--strong">None</span></div>
      <div class="mk-comparison-cell"><span class="mk-comparison-val">Paid plans for more</span></div>
      <div class="mk-comparison-cell"><span class="mk-comparison-val">Free core, paid add-ons</span></div>
    </div>
  </div>
</div>
<p class="mk-comparison-foot">Based on publicly described capabilities, for general guidance.</p>

<style>
  .mk-comparison-scroll { overflow-x: auto; }
  .mk-comparison-table {
    min-width: 720px; border: 1px solid var(--m-border-strong); border-radius: 14px;
    overflow: hidden; background: var(--m-card);
    box-shadow: 0 28px 64px -46px rgba(37, 38, 29, 0.5);
  }
  .mk-comparison-row { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; border-top: 1px solid var(--m-border); }
  .mk-comparison-row:first-child { border-top: 0; }
  .mk-comparison-row--head { background: var(--m-surface); }
  .mk-comparison-row[data-zebra='true'] { background: var(--m-negative-soft); }
  .mk-comparison-cell { padding: 16px 20px; border-left: 1px solid var(--m-border); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .mk-comparison-cell:first-child { border-left: 0; }
  .mk-comparison-dashfi { background: var(--m-accent-soft); border-left: 1px solid var(--m-accent-border); }
  .mk-comparison-collabel { font-family: var(--font-mono); font-size: 9.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--m-fg-muted); }
  .mk-comparison-collabel--accent { color: var(--m-accent); }
  .mk-comparison-rec { font-size: 8px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; background: var(--m-accent); color: #fff; padding: 2px 7px; border-radius: 999px; }
  .mk-comparison-feature-text { font-size: 12.5px; font-weight: 700; color: var(--m-fg-strong); }
  .mk-comparison-val { font-size: 12.5px; line-height: 1.4; color: var(--m-fg-muted); }
  .mk-comparison-val--strong { color: var(--m-fg-strong); font-weight: 600; }
  .mk-comparison-foot { font-family: var(--font-mono); font-size: 11px; color: var(--m-fg-subtle); margin-top: 16px; }
</style>`,
	exampleLang: 'html',

	porting: [
		'A CSS-grid card (not a `<table>`): a header row plus N body rows, each row a grid of equal-width cells, wrapped in an `overflow-x: auto` container whose inner grid carries a `min-width` to force scroll on narrow viewports.',
		'The emphasized "us" column gets a soft accent background and a left-edge accent border only; its header cell adds an accent-coloured label plus a solid pill reading "Recommended".',
		'Body rows may alternate with a monochrome (never coloured) tint; row dividers are a top hairline, not a bottom one.',
		'If a boolean/check-vs-cross rendering is needed, follow the separate /rewards `<table>` variant instead — inline SVG check/x icons with `aria-label`, not this pattern\'s free-text cells.',
	],

	changelog: [
		{
			version: 'v0.2.0',
			date: '2026-07-20',
			note: 'Re-grounded against the live dash.fi source (rev a5be701): replaced the brief-fabricated .tsx source, "2–4 columns"/no-glyph claims, symmetric accent border, and "no zebra striping" claim with the measured CSS-grid `.mk-comparison-*` structure (4 fixed columns, free-text cells, left-only accent border, real ink-tint zebra striping) from /corporate-card and /expense-management, and documented the alternate real-<table> `.rw-compare-*` variant on /rewards.',
		},
		{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented — replaced the standalone pricing page across home, /corporate-card, /rewards, /shipping, /ai-spend-audit.' },
	],
};
