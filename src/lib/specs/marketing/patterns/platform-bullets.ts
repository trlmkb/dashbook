import type { MarketingPatternSpec } from './types.js';

/**
 * PlatformBullets — the "what's included" list.
 *
 * A usually two-column bulleted list of platform capabilities. Each bullet is a
 * leading positive-tone check icon plus a short capability line, so the block
 * reads as inclusion at a glance. Promoted site-wide from the slide/ library.
 */
export const platformBullets: MarketingPatternSpec = {
	slug: 'platform-bullets',
	name: 'PlatformBullets',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A usually two-column bulleted list of platform capabilities. Each bullet pairs a leading positive-tone check icon with a short capability line, so the block reads as "what\'s included".',

	source: 'src/components/slide/PlatformBullets.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'When a section needs a scannable list of "what\'s included" — platform capabilities, plan inclusions, the feature checklist inside a PlatformShowcase. Reach for it when the list is short capability lines, not multi-sentence features (use FeatureColumns for those).',

	recipe: [
		'Render a `<ul>` with `list-style: none`; on wider breakpoints set `grid-template-columns: repeat(2, minmax(0, 1fr))` so it flows into two columns.',
		'Each `<li>` is an inline-flex row: a leading check icon, then the capability line, with a 10–12px gap and items aligned to the top.',
		'Colour the check icon `--m-positive` (jade) so the row reads as inclusion; the icon is decorative.',
		'Set the label in body type (`--m-fg-muted`), one short line each — capabilities, not sentences.',
		'Keep a consistent row gap so the two columns align across the fold.',
	],

	dom: `<ul class="platform-bullets">
  <li>
    <svg class="check" aria-hidden="true">…</svg>
    Real-time carrier audit
  </li>
  <li>
    <svg class="check" aria-hidden="true">…</svg>
    Automatic refund recovery
  </li>
</ul>`,

	tokensUsed: [
		{ part: 'check icon', role: '--m-positive', notes: 'Jade — reads as "included". Decorative.' },
		{ part: 'label', role: '--m-fg-muted', notes: 'Body copy for the capability line.' },
		{ part: 'lead-in / emphasis', role: '--m-fg-strong', notes: 'Optional stronger phrase inside a line.' },
	],

	dimensions: [
		{ name: 'Columns', value: '1 → 2', notes: 'Single column on mobile; `repeat(2, minmax(0,1fr))` from the section breakpoint.' },
		{ name: 'Icon', value: '16–18px', notes: 'Leading check; --m-positive.' },
		{ name: 'Gap', value: '10–12px', notes: 'Icon-to-label gap; row gap kept consistent so columns align.' },
	],

	props: [
		{ name: 'items', type: 'string[]', required: true, description: 'The capability lines, one per bullet.' },
		{ name: 'columns', type: '1 | 2', default: '2', description: 'Column count at the section breakpoint.' },
	],

	nonFeatures: [
		'Not a feature grid — no per-item heading, icon-per-row hue, or body paragraph; just a check and a line.',
		'No mixed tones — every check is positive (jade); this block is inclusion only, not status or comparison.',
		'No interactivity — the bullets are display content, never links or toggles.',
	],

	gotchas: [
		'Set the check to `currentColor` driven by `--m-positive` so it flips correctly on an ink/dark band; do not hardcode the icon fill.',
		'The two-column grid must use `minmax(0, 1fr)` columns or a long capability line will push the column wider than its track and break the alignment.',
	],

	accessibility: [
		'The leading check is decorative (`aria-hidden`) — the label text carries the meaning, never colour alone.',
		'Use a real `<ul>` / `<li>` so the list is announced with its item count.',
	],

	example: `<ul class="platform-bullets">
  <li><Check /> Real-time carrier audit</li>
  <li><Check /> Automatic refund recovery</li>
  <li><Check /> Line-item invoice reconciliation</li>
  <li><Check /> Carrier-agnostic coverage</li>
</ul>

<style>
  .platform-bullets { list-style: none; margin: 0; padding: 0;
    display: grid; gap: 12px 32px; }
  @media (min-width: 640px) {
    .platform-bullets { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  .platform-bullets li { display: flex; align-items: flex-start; gap: 12px;
    font-size: 15px; line-height: 1.5; color: var(--m-fg-muted); }
  .platform-bullets .check { flex: none; width: 18px; height: 18px;
    color: var(--m-positive); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A list-reset `<ul>` that becomes `repeat(2, minmax(0,1fr))` at the section breakpoint; each row is a flex pair of a positive check and a short line.',
		'Icon colour comes from `--m-positive` via currentColor so it re-themes on dark bands; the check is decorative.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
