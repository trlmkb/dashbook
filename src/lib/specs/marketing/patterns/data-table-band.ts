import type { MarketingPatternSpec } from './types.js';

/**
 * DataTableBand — a marketing-surface data table used as a proof section.
 *
 * Not a product table re-skinned — a purpose-built table for showing
 * flagged/audited items as evidence, seen on /parcel-audit and
 * /carrier-contract-management.
 */
export const dataTableBand: MarketingPatternSpec = {
	slug: 'data-table-band',
	name: 'DataTableBand',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A dense data table rendered as a marketing proof section — real-looking rows (flagged violations, contract line items) with one column carrying a status chip. Sits on the cream or paper surface with a section-intro above it, never inside a card.',

	source: 'src/components/proof/DataTableBand.tsx',
	sourceNote: 'Row/column shape pulled from the brief; verify exact column set against /parcel-audit and /carrier-contract-management source.',

	whenToUse:
		'Use DataTableBand when the strongest proof of the product claim is literally showing the data it catches — flagged overcharges, contract discrepancies, audit violations. Pair it with a section-intro stating the claim ("We found $340K in overcharges") directly above the table.',

	recipe: [
		'Section-intro (eyebrow + heading) directly above the table states the claim the table is about to prove.',
		'Table header row is mono, uppercase, tracked, `--m-fg-subtle` — same treatment as a StatTrio label, not a heavier product-table header.',
		'Body rows are 15–16px, `--m-fg-strong` for the primary column (e.g. shipment ID, line item), `--m-fg-muted` for secondary columns.',
		'Exactly one column carries a status chip — `--m-warn` for "flagged"/"discrepancy", `--m-positive` for "resolved"/"recovered". No other column colors the row.',
		'Money columns are right-aligned, mono, tabular-nums; negative or overcharge amounts render in monochrome ink, never red — the flag chip already carries the "this is bad" signal.',
		'Cap the visible rows at 5–8 with a "+N more" text link rather than paginating — this is a proof snippet, not a full data browser.',
		'Wrap in the same horizontal-scroll container as ComparisonTable below ~640px.',
	],

	dom: `<section class="proof-band">
  <div class="intro"><span class="eyebrow">The receipts</span><h2>$340K in overcharges, found automatically.</h2></div>
  <table class="data-band">
    <thead><tr><th>Shipment</th><th>Carrier</th><th>Issue</th><th class="right">Amount</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>1Z 4V2 88 · · ·</td><td>UPS</td><td>Late delivery</td><td class="right mono">$42.10</td><td><span class="chip flagged">Flagged</span></td></tr>
    </tbody>
  </table>
</section>`,

	tokensUsed: [
		{ part: 'table header', role: '--m-fg-subtle', notes: 'Mono, uppercase, tracked — matches StatTrio label treatment.' },
		{ part: 'primary column', role: '--m-fg-strong' },
		{ part: 'secondary columns', role: '--m-fg-muted' },
		{ part: 'flagged chip', role: '--m-warn', notes: 'Amber, never red.' },
		{ part: 'resolved chip', role: '--m-positive', notes: 'Jade, never green outside the token.' },
		{ part: 'amount column', role: '--m-fg-strong', notes: 'Mono tabular-nums; monochrome even when negative.' },
	],

	dimensions: [
		{ name: 'Max visible rows', value: '5–8', notes: 'Follow with a "+N more" text link, not pagination.' },
		{ name: 'Row height', value: '~48px' },
		{ name: 'Header size', value: '11–12px mono, tracked 0.12em' },
		{ name: 'Body size', value: '15–16px' },
	],

	variants: [
		{ name: 'audit violations', description: 'Flagged/resolved status column — the /parcel-audit shape.' },
		{ name: 'contract line items', description: 'No status chip; a delta column instead — the /carrier-contract-management shape.' },
	],

	props: [
		{ name: 'columns', type: '{ label: string; align?: \'left\' | \'right\' }[]', required: true, description: 'Column headers; typically 4–5.' },
		{ name: 'rows', type: 'Record<string, string>[]', required: true, description: 'Row data keyed by column label.' },
		{ name: 'moreCount', type: 'number', description: 'When set, renders a "+N more" link below the table instead of all rows.' },
	],

	nonFeatures: [
		'Not paginated — this is a fixed-length proof snippet, not a browsable dataset.',
		'Not sortable or filterable — no interactive column headers.',
		'No row-level actions — this is read-only evidence, not a product table.',
	],

	gotchas: [
		'Never tint the whole row for a flagged item — only the status chip carries color; a fully-tinted row reads as an error state rather than a proof point.',
		'Keep amount columns monochrome even for large negative figures — pairing a red number with an amber chip double-signals and looks alarmist for a marketing surface.',
	],

	motion: [
		'Rows can stagger in on reveal (10–20ms per row) the first time the section scrolls into view; disable under prefers-reduced-motion and render all rows in their final state.',
	],

	accessibility: [
		'Use a real <table> with scoped headers, same as ComparisonTable — this is presented as literal data, not a decorative grid.',
		'Status chips carry text, not color alone ("Flagged", "Resolved").',
	],

	example: `<table class="data-band">
  <thead>
    <tr><th>Shipment</th><th>Carrier</th><th>Issue</th><th class="right">Amount</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>1Z 4V2 88 0F 12 3456</td>
      <td>UPS</td>
      <td>Late delivery guarantee</td>
      <td class="right mono">$42.10</td>
      <td><span class="chip flagged">Flagged</span></td>
    </tr>
  </tbody>
</table>

<style>
  .data-band { width: 100%; border-collapse: collapse; }
  .data-band th { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
    letter-spacing: 0.12em; color: var(--m-fg-subtle); text-align: left; padding: 12px 16px; }
  .data-band td { padding: 14px 16px; border-top: 1px solid var(--m-border); font-size: 15px; color: var(--m-fg-muted); }
  .data-band td:first-child { color: var(--m-fg-strong); }
  .right { text-align: right; }
  .mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
  .chip.flagged { color: var(--m-warn); background: var(--m-warn-soft); border: 1px solid var(--m-warn-border); padding: 2px 8px; border-radius: 999px; font-size: 12px; }
</style>`,
	exampleLang: 'html',

	porting: [
		'A quiet, mono-headed data table used as evidence, not a product data-grid — cap rows at 5-8, right-align money in tabular mono, and carry status only via a small chip in one column.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented — grounded in the /parcel-audit and /carrier-contract-management proof sections.' }],
};
