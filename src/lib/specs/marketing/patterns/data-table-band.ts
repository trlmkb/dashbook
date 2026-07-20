import type { MarketingPatternSpec } from './types.js';

/**
 * DataTableBand — the "Compliance Violations" proof table used inside a
 * fake product-screenshot mockup on the shipping marketing pages.
 *
 * The real thing is NOT a standalone marketing-native table sitting directly
 * on the cream/paper surface — it is a `<table>` inside `ShipShotAudit.astro`,
 * a screenshot-style mockup of the actual product app (browser tabs + sidebar
 * nav + KPI cards + a red alert banner, all at a fixed 1180px canvas scaled
 * down via `ShipShotFit`). That mockup is reused byte-for-byte on both
 * `/parcel-audit` and `/carrier-contract-management` — there is only one real
 * table shape, not two. See `sourceNote` and `gotchas` for what the original
 * brief got wrong.
 */
export const dataTableBand: MarketingPatternSpec = {
	slug: 'data-table-band',
	name: 'DataTableBand',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A dense violations table ("Compliance Violations") rendered inside a screenshot-style product mockup — issue, severity badge, monthly/annual cost, description, ending in a highlighted Total row. Reused identically inside the ShipShotAudit mockup on /parcel-audit and /carrier-contract-management; framed by fake app chrome (tabs, sidebar, KPI cards, alert banner), not a bare marketing-surface table.',

	source: 'src/components/shipping/shots/ShipShotAudit.astro',
	sourceNote:
		'Grounded against dash.fi rev a5be701. The brief guessed the source was a marketing-native `.tsx` table living directly on the page — that is wrong. The real table lives inside `ShipShotAudit.astro`, a hardcoded-pixel screenshot mockup of the product app (own chrome: tab bar, sidebar nav, KPI cards, alert banner), wrapped in `ShipShotFit` (fixed 1180px canvas, JS-computed `scale()` to fit its column) and embedded in a two-column `cc-split` section with copy beside it — never a full-bleed band with a section-intro directly above. The SAME `<ShipShotAudit />` instance (same component, same hardcoded rows) is used on both /parcel-audit (lines ~264-304, light `mk-section--alt`) and /carrier-contract-management (lines ~340-365, `data-mk-dark`, reversed column order) — there is no second "contract line items with delta column" variant of this table. The closest related-but-different component is `src/components/slide/CarrierBrief.astro` (used in a separate "Carrier Brief" section), which is a label:value list on a dark card ending in one bold total figure — not a multi-column table, no status/severity badge, no per-row delta column. It is a different pattern, not a variant of this one; see gotchas.',

	sourceRevision: 'a5be701',
	lastVerifiedAt: '2026-07-20',
	verificationStatus: 'partial',

	whenToUse:
		'Reach for this when the strongest proof is showing the actual flagged line items an audit caught — real-looking issue names, a severity badge, and a dollar figure per row, ending in a totals row. In the real source this always ships framed as a product-app screenshot (tabs/sidebar/KPI cards/alert banner), not as a bare table sitting on the marketing surface; if you want the standalone-table treatment described by the original brief, that is an aspirational new pattern, not something dash.fi ships today.',

	recipe: [
		'The table never appears alone on the real site — it sits inside a fixed 1180px screenshot mockup (own tab bar, left sidebar nav, 4 KPI cards, a red alert banner) wrapped by `ShipShotFit`, which scales the whole canvas down via `transform: scale(containerWidth / 1180)` rather than reflowing it.',
		'That mockup sits as one side of a two-column split section (`cc-split`) with an eyebrow + heading + lede on the other side — there is no section-intro directly above the table itself; the intro lives beside it, not above it.',
		'Above the table: a row of 4 KPI cards (icon, bold value, muted label), then a red-tinted alert banner ("Contract Compliance Issues Detected") stating the dollar claim, then the table inside its own white card with a plain header label ("Compliance Violations").',
		'Table header cells are sans-serif (inherits the mockup body font, not mono), 10.5px, weight 600, letter-spacing 0.05em, color a muted grey — the all-caps look comes from literal uppercase text in the markup ("ISSUE", "SEVERITY"), not text-transform or a mono face.',
		'Issue column: left-aligned, `white-space: nowrap`, a small severity-coloured warning-triangle icon beside the label. Severity column: a centered pill badge — High is red, Medium is amber; there is no "flagged"/"resolved" chip vocabulary in the real source, only severity.',
		'Monthly Cost and Annual Cost columns are right-aligned, tabular-nums; Annual Cost is the heavier/bold weight of the two.',
		'Description column is muted, smaller (11.5px), wraps, capped at max-width 320px.',
		'Row count in the real source is exactly 4 data rows, always ending in a highlighted Total row (red-tinted background) that sums Monthly and Annual — there is no "+N more" link and no pagination; the table is a fixed, non-interactive dataset.',
		'The floating "Ask Agent" pill button anchored to the mockup corner is part of the surrounding screenshot chrome, not part of the table pattern itself.',
	],

	dom: `<div class="shotaud__card">
  <div class="shotaud__cardhead">Compliance Violations</div>
  <table class="shotaud__table">
    <thead>
      <tr>
        <th>ISSUE</th>
        <th>SEVERITY</th>
        <th>MONTHLY COST</th>
        <th>ANNUAL COST</th>
        <th>DESCRIPTION</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><svg class="warn is-high" />Earned Discount Tier Misalignment</td>
        <td><span class="badge is-high">High</span></td>
        <td>$1,600</td>
        <td>$19,200</td>
        <td>Shipping volume qualifies for 11% earned discount tier but only receiving 8% tier.</td>
      </tr>
      <!-- 3 more rows -->
      <tr class="total">
        <td>Total</td><td></td><td>$3,763</td><td>$45,156</td><td></td>
      </tr>
    </tbody>
  </table>
</div>`,

	tokensUsed: [
		{
			part: 'canvas / card surface',
			role: '--m-surface',
			notes:
				'Real source hardcodes #faf9f5 (cream) and #ffffff (card white) — the mockup does not consume `--m-*` tokens at all. This is a recommended mapping for a marketing-native port, not a sourced fact.'
		},
		{
			part: 'table header text',
			role: '--m-fg-subtle',
			notes: 'Real hardcoded value #80817a; sans-serif, not mono, in source.'
		},
		{
			part: 'primary column (issue) + strong figures',
			role: '--m-fg-strong',
			notes: 'Real hardcoded ink #25261d.'
		},
		{
			part: 'description column',
			role: '--m-fg-muted',
			notes: 'Real hardcoded #80817a at 11.5px.'
		},
		{
			part: 'high-severity badge + icon + alert banner + Total row tint',
			role: 'none — open gap',
			notes:
				'Real source hardcodes genuine red (#b42318, badge bg rgba(180,35,24,0.1), Total row bg rgba(180,35,24,0.06)) for High severity, the alert banner, and the Total row. This is NOT a faithful match for `--m-negative`: per `marketing/foundations/tokens.ts` colorRules, "--m-negative = monochrome ink... never red" (confirmed by the already-grounded `chip.ts` and `comparison-table.ts` specs). ShipShotAudit is a screenshot mockup of the product app, not a native marketing component, so it simply does not follow the marketing token color rules — do not remap this red to `--m-negative` when porting; that would silently launder a genuine-red product screenshot into a "never red" marketing claim. Treat this as an unresolved gap: either desaturate to `--m-negative` (losing the real red signal) or keep it out of the `--m-*` system entirely as a deliberately product-styled screenshot.'
		},
		{
			part: 'medium-severity badge + icon',
			role: '--m-warn',
			notes: 'Real hardcoded amber #b86400, bg rgba(184,100,0,0.1) — this one DOES line up with the token system\'s "amber = caution only" rule.'
		},
		{
			part: 'active sidebar/tab item, "Ask Agent" pill',
			role: '--m-accent',
			notes: 'Real hardcoded jade #2b605c — lines up with the shared brand accent.'
		}
	],

	dimensions: [
		{ name: 'Screenshot canvas width', value: '1180px fixed', notes: 'Scaled to fit its column via `transform: scale(containerWidth / 1180)` in `ShipShotFit`, not a fluid layout.' },
		{ name: 'Data row height', value: '~45px', notes: 'Computed from source CSS: 14px top+bottom cell padding + a 12px/1.4 line box; not pixel-measured from a rendered screenshot.' },
		{ name: 'Header row', value: '~37px', notes: '11px top+bottom padding + a 10.5px/1.4 line box.' },
		{ name: 'Header type', value: '10.5px, weight 600, tracking 0.05em', notes: 'Sans-serif (inherits Bai Jamjuree); caps are literal text, not CSS uppercase or a mono face.' },
		{ name: 'Body type', value: '12px', notes: 'Description column is smaller, 11.5px.' },
		{ name: 'Visible data rows', value: '4, plus a Total row', notes: 'Fixed dataset in source — no "+N more" affordance, no pagination.' }
	],

	variants: [
		{
			name: 'compliance violations table (ShipShotAudit)',
			description:
				'The only confirmed real variant. Identical component and identical hardcoded row data reused on /parcel-audit (light section) and /carrier-contract-management (dark `data-mk-dark` section, reversed column order) — not two different table shapes.'
		}
	],

	props: [
		{ name: 'rows', type: '{ issue: string; severity: \'High\' | \'Medium\'; monthly: string; annual: string; desc: string }[]', required: true, description: 'Real source hardcodes exactly 4 rows inline in ShipShotAudit.astro; not exposed as a component prop today.' },
		{ name: 'totalMonthly', type: 'string', required: true, description: 'Hardcoded total ($3,763) in source, not derived at runtime.' },
		{ name: 'totalAnnual', type: 'string', required: true, description: 'Hardcoded total ($45,156) in source, not derived at runtime.' }
	],

	nonFeatures: [
		'Not paginated and has no "+N more" link — the real source is a fixed 4-row dataset with a Total row, contradicting the original brief\'s "cap at 5-8 with +N more" recipe.',
		'Not sortable or filterable — no interactive column headers.',
		'No row-level actions — read-only screenshot content, not a live product table.',
		'Not a standalone marketing-surface table — always appears inside the ShipShotAudit product-screenshot mockup (tabs, sidebar, KPI cards, alert banner), never bare on the page.'
	],

	gotchas: [
		'The real source uses genuine red for High severity (badge, icon, alert banner, and the Total row tint). This directly conflicts with the marketing token system\'s own documented rule — `marketing/foundations/tokens.ts` colorRules: "Negative / violations = monochrome ink... Never red" (also enforced in the already-grounded `chip.ts` and `comparison-table.ts` specs). Do not resolve this by mapping the red to `--m-negative`; that token is specifically monochrome-only elsewhere in this system. ShipShotAudit is a screenshot of the product app, not a native marketing component, so its red simply falls outside the marketing token rules — treat as an open gap, not evidence for or against the "never red" policy.',
		'There is no second table variant with a delta column. The brief\'s "contract line items" variant does not exist as a variant of this table — /carrier-contract-management reuses the exact same ShipShotAudit component and data. The closest real analog to a "delta" surface is `CarrierBrief.astro` (a dark label:value card with one bold total figure), which is a structurally different, non-tabular component used in a separate section — do not conflate the two when porting.',
		'The whole mockup is a fixed 1180px canvas scaled by a JS-computed `transform: scale()`, not a responsive/fluid table — porting this pattern as a genuinely responsive marketing table (rather than a scaled screenshot) is a deliberate reinterpretation, not a faithful port.'
	],

	motion: [
		'No row-level motion in source — the mockup is a static screenshot; the containing `Reveal` wrapper on the section fades/rises the whole shot in once on scroll, not per-row.'
	],

	accessibility: [
		'Source uses a real `<table>` with `<th>` header cells, consistent with treating this as literal data rather than a decorative grid.',
		'Severity is conveyed by both text ("High"/"Medium") and colour on the badge, not colour alone.'
	],

	example: `<div class="dtb-card">
  <div class="dtb-head">Compliance Violations</div>
  <table class="dtb-table">
    <thead>
      <tr>
        <th>ISSUE</th>
        <th class="center">SEVERITY</th>
        <th class="right">MONTHLY COST</th>
        <th class="right">ANNUAL COST</th>
        <th>DESCRIPTION</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="issue">Earned Discount Tier Misalignment</td>
        <td class="center"><span class="badge is-high">High</span></td>
        <td class="right mono">$1,600</td>
        <td class="right mono strong">$19,200</td>
        <td class="desc">Shipping volume qualifies for 11% earned discount tier but only receiving 8% tier.</td>
      </tr>
      <tr class="total">
        <td class="issue">Total</td>
        <td class="center"></td>
        <td class="right mono strong">$3,763</td>
        <td class="right mono strong">$45,156</td>
        <td class="desc"></td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .dtb-card { background: var(--m-surface); border: 1px solid var(--m-border); border-radius: 12px; overflow: hidden; }
  .dtb-head { padding: 14px 20px; font-size: 13px; font-weight: 600; color: var(--m-fg-strong); border-bottom: 1px solid var(--m-border); }
  .dtb-table { width: 100%; border-collapse: collapse; }
  .dtb-table th { text-align: left; padding: 11px 16px; font-size: 10.5px; font-weight: 600; letter-spacing: 0.05em; color: var(--m-fg-subtle); border-bottom: 1px solid var(--m-border); }
  .dtb-table td { padding: 14px 16px; font-size: 12px; color: var(--m-fg-strong); border-bottom: 1px solid var(--m-border); }
  .center { text-align: center; }
  .right { text-align: right; }
  .mono { font-variant-numeric: tabular-nums; }
  .strong { font-weight: 600; }
  .desc { color: var(--m-fg-muted); font-size: 11.5px; max-width: 320px; }
  .badge { display: inline-flex; padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; }
  /* No --m-* role covers genuine red — --m-negative is monochrome-ink by
     policy (see gotchas). This literal red matches the real source
     (ShipShotAudit) but is an intentional exception, not a token. */
  .badge.is-high { color: #b42318; background: rgba(180, 35, 24, 0.1); }
  tr.total td { background: rgba(180, 35, 24, 0.06); border-bottom: none; font-weight: 600; }
</style>`,
	exampleLang: 'html',

	porting: [
		'The real component is a hardcoded, fixed-width (1180px) product-app screenshot scaled by JS transform, not a native responsive marketing table — porting it as a genuinely fluid table is a reinterpretation; keep the column set (issue, severity badge, monthly, annual, description), the 4-row-plus-Total shape, and the real red-for-High / amber-for-Medium severity colouring rather than inventing a flagged/resolved chip vocabulary that is not in the source.',
		'Do not port `CarrierBrief.astro` as a "variant" of this table — it is a different, non-tabular label:value component; document it separately if needed.'
	],

	changelog: [
		{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented from the brief — unverified source path and fabricated variants/values.' },
		{ version: 'v0.2.0', date: '2026-07-20', note: 'Regrounded against dash.fi rev a5be701: real source is ShipShotAudit.astro (a product-screenshot mockup), reused identically on /parcel-audit and /carrier-contract-management; corrected column set, severity-badge (not flagged/resolved chip) vocabulary, real red-for-High colouring, fixed 4-row-plus-Total shape (no "+N more"), and removed the fabricated second "contract line items" variant.' }
	]
};
