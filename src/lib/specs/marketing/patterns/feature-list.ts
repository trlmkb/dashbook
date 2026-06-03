import type { MarketingPatternSpec } from './types.js';

/**
 * FeatureList — a dense vertical list of features.
 *
 * Promoted from the site `sections/` library. Each feature is one row: a
 * leading check / positive icon, a title, and a one-line description. Denser
 * than cards or columns — built for a long "everything included" rundown that
 * stays scannable.
 */
export const featureList: MarketingPatternSpec = {
	slug: 'feature-list',
	name: 'FeatureList',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A dense vertical list of features — each a row of a leading check / positive icon, a title, and a one-line description. Built for long "everything included" rundowns; denser than cards.',

	source: 'src/components/sections/FeatureList.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'When the set is long (6+) and each item is a single clear claim — a list reads faster than a grid and signals completeness. The leading check tones positive ("included"). Reach for FeatureGrid or FeatureColumns when items need more room to breathe or carry a longer blurb.',

	recipe: [
		'Render a `<ul>` of rows; each row is a 2-column grid: a fixed leading-icon column, then a text column (`grid-template-columns: auto minmax(0, 1fr)`).',
		'Leading icon: a 20px check in `--m-positive` (currentColor) — it reads as "included".',
		'Text column puts the title in `--m-fg-strong` and a one-line description in `--m-fg-muted` on the same row or directly beneath.',
		'Separate rows with a 1px `--m-border` between items (not above the first / below the last) for the dense ledger feel.',
		'Keep row padding tight (~12–14px vertical) and the description to one line so the list scans top-to-bottom.',
	],

	dom: `<ul class="feature-list">
  <li class="row">
    <span class="icon" aria-hidden="true"><svg>…</svg></span>
    <div class="text">
      <span class="title">Duplicate-charge detection</span>
      <span class="desc">Flags the same parcel billed twice.</span>
    </div>
  </li>
  <!-- many rows -->
</ul>`,

	tokensUsed: [
		{ part: 'leading icon', role: '--m-positive', notes: 'Check = "included"; jade, currentColor. Never green.' },
		{ part: 'title', role: '--m-fg-strong' },
		{ part: 'description', role: '--m-fg-muted' },
		{ part: 'row divider', role: '--m-border', notes: '1px rule between rows.' },
	],

	dimensions: [
		{ name: 'Row padding', value: '~12–14px', notes: 'Vertical; tighter than a card grid.' },
		{ name: 'Icon', value: '20px', notes: 'Leading check, --m-positive, currentColor.' },
		{ name: 'Columns', value: 'auto / minmax(0, 1fr)', notes: 'Fixed icon gutter, fluid text.' },
		{ name: 'Divider', value: '1px', notes: '--m-border between rows only.' },
	],

	props: [
		{ name: 'items', type: 'Array<{ title; desc }>', required: true, description: 'The feature rows in order.' },
		{ name: 'icon', type: 'IconComponent', default: 'Check', description: 'Leading positive glyph (defaults to a check).' },
		{ name: 'dividers', type: 'boolean', default: 'true', description: 'Hairline rule between rows.' },
	],

	nonFeatures: [
		'Not a checklist input — rows are static display, never toggleable checkboxes.',
		'No multi-line blurbs — descriptions are one line so the list stays a fast scan; use FeatureGrid for longer copy.',
		'No per-row icon hues — the leading icon is uniformly positive; this is not a duotone-icon grid.',
	],

	gotchas: [
		'Use the positive role for the check, not a literal green — money / positive is jade in this system (negative is ink, never red).',
		'Put the divider between rows only (`.row + .row`), so the list does not get a stray rule above the first item or below the last.',
	],

	accessibility: [
		'Use a real list (`<ul>`/`<li>`) so the count is announced and the group is skippable.',
		'The leading check is decorative (`aria-hidden`) — the title text, not colour, carries "included".',
	],

	example: `<ul class="feature-list">
  <li class="row">
    <span class="icon" aria-hidden="true"><Check /></span>
    <div class="text">
      <span class="title">Duplicate-charge detection</span>
      <span class="desc">Flags the same parcel billed twice.</span>
    </div>
  </li>
</ul>

<style>
  .feature-list { list-style: none; margin: 0; padding: 0; }
  .row { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 12px;
    align-items: start; padding: 13px 0; }
  .row + .row { border-top: 1px solid var(--m-border); }
  .icon { color: var(--m-positive); margin-top: 1px; }
  .text { display: flex; flex-direction: column; gap: 2px; }
  .title { font-size: 15px; font-weight: 500; color: var(--m-fg-strong); }
  .desc { font-size: 14px; line-height: 1.5; color: var(--m-fg-muted); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A list of `auto / minmax(0, 1fr)` rows — leading positive check, then a strong title over a muted one-line description — with a 1px border between rows only.',
		'The check is currentColor + decorative and uses the positive role (jade), never a literal green.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
