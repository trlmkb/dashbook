import type { MarketingPatternSpec } from './types.js';

/**
 * ActionPlan — a numbered/ranked list of prioritized recommendations.
 *
 * There is no single canonical "ActionPlan" component in the dash.fi source —
 * this pattern is documented from two real, structurally different instances:
 *
 * 1. `ShipShotAiReport.astro`, rendered on `/parcel-analytics` inside the
 *    "Action plan" split section. This is a static, fixed-1180px "screenshot"
 *    mock (scaled to fit via `ShipShotFit`) simulating a product screen — it
 *    is styled with hardcoded hex, not `--m-*` tokens, and does not re-theme.
 *    Rows show a rank badge (#1…#7), a title, an Effort/Timeline meta line,
 *    and an unlabeled dollar value. Rows have full card chrome (white,
 *    rounded, bordered) — not a hairline-divided list.
 * 2. The `.asa-brief` block on `/ai-spend-audit`, driven by
 *    `content/copy/ai-spend-audit.ts` → `actionPlan.items`. This one is real
 *    themed marketing DOM (`--m-*` tokens throughout) but has a completely
 *    different field set: no rank number, no effort/timeline — just a
 *    label, an unlabeled dollar amount, an owner string, and a status pill.
 *    Rows here ARE hairline-divided (no per-row card).
 *
 * These two do not share a metadata schema. Treat them as two variants, not
 * one component with optional fields — do not invent a merged "effort /
 * timeline / impact" shape that matches neither.
 */
export const actionPlan: MarketingPatternSpec = {
	slug: 'action-plan',
	name: 'ActionPlan',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A ranked list of prioritized recommendations. Two real shapes exist on dash.fi: a rank-badged "report" row (rank, title, Effort/Timeline meta, unlabeled dollar value, full card chrome) on /parcel-analytics, and a hairline-divided "brief" row (label, unlabeled dollar amount, owner, status pill — no rank, no effort/timeline) on /ai-spend-audit.',

	source:
		'src/components/shipping/shots/ShipShotAiReport.astro (rendered in the "an-plan-section" of src/pages/parcel-analytics.astro); second real instance: the `.asa-brief` markup in src/pages/ai-spend-audit.astro (~L446-505) with data from src/content/copy/ai-spend-audit.ts `actionPlan.items`.',
	sourceNote:
		'The parcel-analytics instance is a non-themed screenshot mock (hardcoded hex, fixed 1180px width, no --m-* tokens, does not respond to dark mode) — treat its colors/sizes as a reference to port INTO the token system, not values to copy verbatim. The ai-spend-audit instance already uses real --m-* tokens and is the better fidelity source for a themed, reusable pattern, but its field set (label/amount/owner/status) has no effort or timeline at all. Neither instance caps at "4-8 items with a +N more link" — that truncation behavior does not exist in the source; parcel-analytics hardcodes exactly 7, ai-spend-audit hardcodes 3.',

	sourceRevision: 'a5be701',
	lastVerifiedAt: '2026-07-20',
	verificationStatus: 'partial',

	whenToUse:
		'Use the "report" variant directly after a proof section (ChartBand, DataTableBand, StatTrio) when the recommendations carry effort/timeline framing and a rank ordering — the /parcel-analytics shape. Use the "brief" variant when the recommendations are closer to an engineering ticket list — label, dollar amount, an owner, and a status — the /ai-spend-audit shape. Do not blend the two field sets; pick one variant and use its real fields only.',

	recipe: [
		'Report variant (parcel-analytics): each row is its own card — white/`--m-card` surface, ~12px radius, 1px border — holding a rank badge, a title, an Effort/Timeline meta line, and a right-aligned unlabeled dollar value.',
		'Report variant rank badge: a small pill (not a bare "01" index) — rounded ~8px, tinted accent background, accent-colored bold number prefixed with "#" (e.g. "#1"), not zero-padded in the source.',
		'Report variant meta line: two label:value pairs only — "Effort: {Low|Medium|High}" and "Timeline: {free text}" — separated by a fixed gap; there is no "Impact:" label in the meta line, the dollar figure is a separate, unlabeled, bold, accent/positive-colored element at the row\'s trailing edge.',
		'Report variant has no separate one-line description under the title in the source — title + meta line only, no body copy row.',
		'Brief variant (ai-spend-audit): one outer card (`--m-card` surface, `--m-border-strong` border, radius, header) containing a header row (icon chip + "Action plan" title + a small "Ranked by impact" mono eyebrow) and a hairline-divided `<ul>` of rows — no per-row card chrome.',
		'Brief variant row: a baseline-aligned label + unlabeled dollar amount (mono/display font, light weight, `--m-accent` colored, not `--m-positive`) on one line, then a meta line below with an owner string (mono, `--m-fg-subtle`, e.g. "Owner: Platform" — the label is baked into the string, not separately marked up) and a right-aligned status pill colored by tone (`accent` / `positive` / `muted`).',
		'Neither real instance truncates with a "+N more" link — cap item count to what the recommendation set actually contains and do not invent overflow UI unless a specific integration needs it.',
	],

	dom: `<!-- report variant (parcel-analytics shape) -->
<div class="action-plan-report">
  <div class="item">
    <span class="rank">#1</span>
    <div class="body">
      <p class="title">Negotiate DAS Commercial discount (target 50%)</p>
      <p class="meta"><span>Effort: Medium</span><span>Timeline: 30 days</span></p>
    </div>
    <span class="value">$19,280/yr</span>
  </div>
</div>

<!-- brief variant (ai-spend-audit shape) -->
<div class="action-plan-brief">
  <div class="brief-head">
    <span class="brief-title">Action plan</span>
    <span class="brief-eyebrow">Ranked by impact</span>
  </div>
  <ul class="brief-rows">
    <li class="brief-row">
      <div class="row-main">
        <span class="label">Move summarization to a smaller model</span>
        <span class="amount">$4,200/mo</span>
      </div>
      <div class="row-meta">
        <span class="owner">Owner: Platform</span>
        <span class="status" data-tone="accent">In progress</span>
      </div>
    </li>
  </ul>
</div>`,

	tokensUsed: [
		{
			part: 'brief container',
			role: '--m-card / --m-border-strong',
			notes: 'Real token usage — from the ai-spend-audit .asa-brief instance.'
		},
		{
			part: 'brief header eyebrow / owner text',
			role: '--m-fg-subtle',
			notes: 'Mono, small, uppercase for the eyebrow.'
		},
		{ part: 'brief row divider', role: '--m-border', notes: 'Hairline, last row has none.' },
		{ part: 'brief label', role: '--m-fg-strong' },
		{
			part: 'brief amount',
			role: '--m-accent',
			notes: 'Not --m-positive in the source, despite representing recovered spend.'
		},
		{
			part: 'brief status pill (accent / positive tones)',
			role: '--m-accent-soft / --m-positive-soft',
			notes: 'Background per data-tone; "muted" tone actually uses --m-negative-soft as its background in the source — see gotchas.'
		},
		{
			part: 'report rank badge (ported)',
			role: '--m-accent-soft / --m-accent',
			notes: 'Source hardcodes rgba(43,96,92,.08) bg / #2b605c text — nearest token mapping, not a literal source reference.'
		},
		{
			part: 'report value (ported)',
			role: '--m-positive',
			notes: 'Source hardcodes #2f9e6f; this row IS colored --m-positive-equivalent in the report variant, unlike the brief variant\'s amount.'
		},
		{
			part: 'report card surface/border (ported)',
			role: '--m-card / --m-border',
			notes: 'Source hardcodes #ffffff bg / rgba(37,38,29,.1) border — the report variant is not themed in the source; this is a porting suggestion.'
		}
	],

	dimensions: [
		{
			name: 'Report — row',
			value: 'padding 18px 20px, radius 12px, 1px border',
			notes: 'ShipShotAiReport.astro .shotair__row.'
		},
		{
			name: 'Report — row gap',
			value: '12px',
			notes: 'Vertical gap between rows, .shotair__list.'
		},
		{
			name: 'Report — rank badge',
			value: 'min-width 34px, height 26px, radius 8px, 12px/700 text',
			notes: '.shotair__rank.'
		},
		{ name: 'Report — title', value: '15px / 600 weight', notes: '.shotair__rowtitle.' },
		{ name: 'Report — meta text', value: '12.5px', notes: '.shotair__meta, .shotair__metagap adds 18px left margin.' },
		{ name: 'Report — value', value: '15px / 700 weight, tabular-nums', notes: '.shotair__value.' },
		{ name: 'Report — item count', value: '7 (hardcoded)', notes: 'No truncation UI in the source.' },
		{
			name: 'Brief — container',
			value: 'radius 16px, 1px border',
			notes: '.asa-brief.'
		},
		{
			name: 'Brief — header',
			value: 'padding 14px 18px, 1px border-bottom',
			notes: '.asa-brief-head.'
		},
		{ name: 'Brief — row', value: 'padding 15px 18px, 1px border-bottom (none on last)', notes: '.asa-brief-row.' },
		{ name: 'Brief — label', value: '14.5px / 600 weight', notes: '.asa-brief-label.' },
		{ name: 'Brief — amount', value: '17px / 200 weight, tabular-nums', notes: '.asa-brief-amount.' },
		{ name: 'Brief — owner', value: '11px mono', notes: '.asa-brief-owner.' },
		{ name: 'Brief — status pill', value: 'height 22px, radius 6px, 10.5px/600 weight mono', notes: '.asa-brief-status.' },
		{ name: 'Brief — item count', value: '3 (hardcoded in the sample data)', notes: 'No truncation UI in the source.' }
	],

	variants: [
		{
			name: 'report',
			description:
				'The /parcel-analytics shape — rank-badged, card-chrome rows with an Effort/Timeline meta line and an unlabeled dollar value. Sourced from a non-themed screenshot mock; port its colors to --m-* tokens rather than copying the hardcoded hex.'
		},
		{
			name: 'brief',
			description:
				'The /ai-spend-audit shape — a bordered outer card with a header, hairline-divided rows, no rank number, a label + unlabeled dollar amount, and an owner + status pill. Already themed with real --m-* tokens in the source.'
		}
	],

	props: [
		{
			name: 'variant',
			type: "'report' | 'brief'",
			required: true,
			description: 'Selects which real field set to render — these are not interchangeable; do not merge them into one shape.'
		},
		{
			name: 'items (report variant)',
			type: '{ rank: number; title: string; effort: "Low" | "Medium" | "High"; timeline: string; value: string }[]',
			required: false,
			description: 'Matches ShipShotAiReport.astro Action type exactly (rank, title, effort, timeline, value).'
		},
		{
			name: 'items (brief variant)',
			type: '{ label: string; amount: string; owner: string; status: string; statusTone: "accent" | "positive" | "muted" }[]',
			required: false,
			description: 'Matches ai-spend-audit.ts actionPlan.items exactly (label, amount, owner, status, statusTone).'
		}
	],

	nonFeatures: [
		'Not a checklist — neither source instance renders a checkbox or completion-state control per row (the brief variant\'s "status" pill is a read-only label, not an interactive control).',
		'No per-item CTA button in either source instance.',
		'No drag-to-reorder in either source instance — rank/order is fixed in both.',
		'No "+N more" truncation link in either source instance — both hardcode their full item count with no overflow affordance.'
	],

	gotchas: [
		'The report variant (ShipShotAiReport.astro) is a static screenshot mock, not themed marketing DOM — it hardcodes hex colors and a fixed 1180px width scaled via ShipShotFit. Do not port its literal color values; map them to the nearest --m-* roles (see tokensUsed).',
		'The two variants use different colors for their "money" figure: the report variant\'s value is positive/green-coded, but the brief variant\'s amount is --m-accent (jade), not --m-positive, even though both represent recovered/saved spend. This is a real, verified discrepancy in the source — do not assume the two variants share a color convention.',
		'In the brief variant, the "muted" status tone (used for "Pending" in the sample data) renders on `--m-negative-soft` as its background — not a neutral gray. Verify this is intentional before reusing; a "Pending" item on a red-tinted chip reads as an alert to some users.',
		'The brief variant\'s owner field is a single pre-formatted string ("Owner: Platform") in the data, not a separate label + value pair in markup — do not add your own "Owner:" prefix if the data already includes one.',
		'Do not add an Effort/Timeline meta line to the brief variant, or an owner/status pill to the report variant — cross-pollinating the two real field sets produces a shape that matches neither source.'
	],

	motion: [
		'Both source instances sit inside a `Reveal` wrapper at the section level (fade-rise on scroll) — neither animates its rows individually or staggers per-item.'
	],

	accessibility: [
		'The brief variant marks its rows up as a `<ul>`, not an `<ol>` — the visual rank/order is not currently exposed as a semantic ordered list in the source; consider `<ol>` when porting if the order is meaningful to convey non-visually.',
		'The report variant carries the rank as a "#1"-style text pill, not a list marker — it is already programmatically available as text content.',
		'Neither instance relies on the status/tone color alone: the report variant\'s meta line always pairs a text label with its value, and the brief variant\'s status pill renders as text ("Pending", "Complete", etc.), not a color-only dot.'
	],

	example: `<!-- brief variant — closest to a portable, already-themed instance -->
<div class="action-plan-brief">
  <div class="brief-head">
    <span class="brief-title">Action plan</span>
    <span class="brief-eyebrow">Ranked by impact</span>
  </div>
  <ul class="brief-rows">
    <li class="brief-row">
      <div class="row-main">
        <span class="label">Move summarization to a smaller model</span>
        <span class="amount">$4,200/mo</span>
      </div>
      <div class="row-meta">
        <span class="owner">Owner: Platform</span>
        <span class="status" data-tone="accent">In progress</span>
      </div>
    </li>
    <li class="brief-row">
      <div class="row-main">
        <span class="label">Fix prompt caching on prod-api</span>
        <span class="amount">$2,800/mo</span>
      </div>
      <div class="row-meta">
        <span class="owner">Owner: Backend</span>
        <span class="status" data-tone="muted">Pending</span>
      </div>
    </li>
  </ul>
</div>

<style>
  .action-plan-brief { border: 1px solid var(--m-border-strong); border-radius: 16px;
    background: var(--m-card); overflow: hidden; }
  .brief-head { display: flex; align-items: center; gap: 10px; padding: 14px 18px;
    border-bottom: 1px solid var(--m-border); }
  .brief-title { font-family: var(--font-mono); font-size: 15px; color: var(--m-fg-strong); }
  .brief-eyebrow { margin-left: auto; font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--m-fg-subtle); }
  .brief-rows { list-style: none; margin: 0; padding: 0; }
  .brief-row { padding: 15px 18px; border-bottom: 1px solid var(--m-border); }
  .brief-row:last-child { border-bottom: 0; }
  .row-main { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; }
  .label { font-size: 14.5px; font-weight: 600; color: var(--m-fg-strong); }
  .amount { font-family: var(--font-mono); font-size: 17px; font-weight: 200;
    font-variant-numeric: tabular-nums; color: var(--m-accent); }
  .row-meta { display: flex; align-items: center; gap: 10px; margin-top: 9px; }
  .owner { font-family: var(--font-mono); font-size: 11px; color: var(--m-fg-subtle); }
  .status { margin-left: auto; display: inline-flex; align-items: center; height: 22px;
    padding: 0 9px; border-radius: 6px; font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; }
  .status[data-tone='accent'] { background: var(--m-accent-soft); color: var(--m-accent); }
  .status[data-tone='positive'] { background: var(--m-positive-soft); color: var(--m-positive); }
  .status[data-tone='muted'] { background: var(--m-negative-soft); color: var(--m-fg-subtle); }
</style>`,
	exampleLang: 'html',

	porting: [
		'Prefer the brief variant as the portable base — it is already expressed in --m-* tokens in the source. Port the report variant\'s rank-badge + Effort/Timeline idea only if the target integration genuinely needs that field set, and map its hardcoded hex to the token roles noted above rather than copying literal values.'
	],

	changelog: [
		{
			version: 'v0.2.0',
			date: '2026-07-20',
			note: 'Re-grounded against the live dash.fi source (rev a5be701): replaced the brief-fabricated single "effort/timeline/impact" shape with the two real, structurally different instances found in the source (ShipShotAiReport.astro report rows; ai-spend-audit.astro .asa-brief rows). Corrected source path, dropped the invented mono-index/no-card-chrome claims (false for the report variant), and dropped the "+N more" truncation claim (not present in either source instance).'
		},
		{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented — grounded in the /parcel-analytics 7-item plan and /ai-spend-audit (brief-authored, unverified against source).' }
	]
};
