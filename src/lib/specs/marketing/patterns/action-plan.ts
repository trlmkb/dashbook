import type { MarketingPatternSpec } from './types.js';

/**
 * ActionPlan — a numbered, prioritized recommendation list.
 *
 * Seen on /parcel-analytics (a 7-item plan) and /ai-spend-audit. Each item
 * carries effort/timeline/impact metadata, read as a to-do list generated
 * by the product rather than generic marketing copy.
 */
export const actionPlan: MarketingPatternSpec = {
	slug: 'action-plan',
	name: 'ActionPlan',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A numbered list of prioritized recommendations, each with effort, timeline, and impact metadata in a small mono meta-row beneath the title. Reads as output the product generated, not written marketing copy — pairs naturally below a ChartBand or DataTableBand proof section.',

	source: 'src/components/proof/ActionPlan.tsx',
	sourceNote: 'Metadata field set (effort/timeline/impact) pulled from the brief; verify exact labels against the /parcel-analytics 7-item plan.',

	whenToUse:
		'Use ActionPlan directly after a proof section (ChartBand, DataTableBand, StatTrio) to turn "here is what we found" into "here is what to do about it." Keep the list to what the product would realistically surface — 4–8 items — never a generic feature list dressed up with numbers.',

	recipe: [
		'Each item is a numbered row: a large mono index (01, 02, …) in `--m-accent`, a title in `--m-fg-strong`, a one-line description in `--m-fg-muted`, and a small meta-row of pill-styled effort/timeline/impact values.',
		'The index numbers are NOT a plain ordered list marker — render them as their own element so they can be styled larger and in the accent color, matching the NumberedCardRow convention elsewhere on the site.',
		'Meta-row values use a label:value mono pattern ("Effort: Low", "Impact: $12k/mo") rather than icons — keeps the row scannable without adding a new iconography language.',
		'Impact values that are money are rendered mono tabular-nums in `--m-positive` when they represent savings/recovery; never colored when they represent a cost.',
		'Rows are hairline-divided, same `--m-border` treatment as FaqAccordion — no card chrome per item.',
		'Cap visible items at 4–8; if the source plan has more, truncate with a "+N more recommendations" link rather than scrolling the section indefinitely.',
	],

	dom: `<ol class="action-plan">
  <li class="item">
    <span class="index">01</span>
    <div class="body">
      <h3>Switch 40% of parcel volume to Ground</h3>
      <p>Ground-eligible packages are currently shipping Express.</p>
      <div class="meta"><span>Effort: Low</span><span>Timeline: 1 week</span><span class="impact">Impact: $8.2k/mo</span></div>
    </div>
  </li>
</ol>`,

	tokensUsed: [
		{ part: 'index number', role: '--m-accent', notes: 'Large mono, matches NumberedCardRow.' },
		{ part: 'title', role: '--m-fg-strong' },
		{ part: 'description', role: '--m-fg-muted' },
		{ part: 'meta labels', role: '--m-fg-subtle', notes: 'Mono, small.' },
		{ part: 'impact value (savings)', role: '--m-positive', notes: 'Only when the value represents money recovered/saved.' },
		{ part: 'row divider', role: '--m-border' },
	],

	dimensions: [
		{ name: 'Max items', value: '4–8', notes: 'Truncate with a "+N more" link beyond that.' },
		{ name: 'Index size', value: '~28–32px mono' },
		{ name: 'Title size', value: '~17–18px, 600 weight' },
		{ name: 'Meta row', value: '11–12px mono, 3 fields typical' },
	],

	variants: [
		{ name: 'with impact metric', description: 'Meta row includes a dollar or percentage impact figure — the /parcel-analytics shape.' },
		{ name: 'without impact metric', description: 'Effort + timeline only, for recommendations that are qualitative — the /ai-spend-audit shape for policy-type actions.' },
	],

	props: [
		{ name: 'items', type: '{ title: string; description: string; effort?: string; timeline?: string; impact?: string }[]', required: true, description: '4–8 recommended actions in priority order.' },
	],

	nonFeatures: [
		'Not a checklist — items are recommendations to consider, not tasks with a checkbox state.',
		'No per-item CTA button — the whole section closes with one shared CTA (typically a SplitCTA or SectionCTA below), not a button per row.',
		'No drag-to-reorder — the order is the product\'s priority ranking, not user-editable.',
	],

	gotchas: [
		'Do not color the effort/timeline meta fields — only the impact figure (when it represents savings) gets --m-positive; coloring every meta field turns the row into a traffic-light and dilutes the one signal that matters.',
		'Keep index numbers as two-digit strings ("01") even past item 9 for alignment; do not switch to three digits.',
	],

	motion: [
		'Rows can stagger fade-rise in on reveal (per the standard section-reveal recipe); no per-row hover lift — this is a reading list, not a set of interactive cards.',
	],

	accessibility: [
		'Use an ordered list (<ol>) so the sequence is programmatically conveyed, not just visually implied by the styled index.',
		'Meta-row label:value pairs should not rely on color alone to distinguish effort/timeline/impact — the text label always precedes the value.',
	],

	example: `<ol class="action-plan">
  <li class="item">
    <span class="index">01</span>
    <div class="body">
      <h3>Switch 40% of parcel volume to Ground</h3>
      <p>Ground-eligible packages are currently shipping Express.</p>
      <div class="meta">
        <span>Effort: Low</span>
        <span>Timeline: 1 week</span>
        <span class="impact">Impact: $8.2k/mo</span>
      </div>
    </div>
  </li>
</ol>

<style>
  .action-plan { list-style: none; margin: 0; padding: 0; }
  .item { display: flex; gap: 20px; padding: 24px 0; border-top: 1px solid var(--m-border); }
  .item:first-child { border-top: 0; }
  .index { font-family: var(--font-mono); font-size: 28px; font-weight: 300; color: var(--m-accent); flex-shrink: 0; }
  .body h3 { margin: 0 0 6px; font-size: 18px; font-weight: 600; color: var(--m-fg-strong); }
  .body p { margin: 0 0 10px; color: var(--m-fg-muted); }
  .meta { display: flex; gap: 16px; font-family: var(--font-mono); font-size: 12px; color: var(--m-fg-subtle); }
  .meta .impact { color: var(--m-positive); }
</style>`,
	exampleLang: 'html',

	porting: [
		'An ordered list of large-mono-index rows, each with title + description + a small label:value meta row; only the savings-impact value is colored (jade), everything else is monochrome.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented — grounded in the /parcel-analytics 7-item plan and /ai-spend-audit.' }],
};
