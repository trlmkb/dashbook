import type { MarketingPatternSpec } from './types.js';

/**
 * Chip / pill — the marketing tag atom (`marketing_chip`).
 *
 * A fully-rounded soft-tinted pill that styles four semantic ways from one
 * `data-tone` attribute. A leading check icon reads as "included".
 */
export const chip: MarketingPatternSpec = {
	slug: 'chip',
	name: 'Chip',
	category: 'Building blocks',
	status: 'stable',
	toolId: 'marketing_chip',
	description:
		'A pill tag — `border-radius: 999px`, 1px border, soft-tinted background, mono-ish 12–13px. Styles four semantic ways via `data-tone`; a leading check icon reads as "included".',

	source: '/shipping chip usage: .ship-cardhero-points (leading dot) · .ship-calc-chip (data-tone) · .ship-shotrow-chip (leading check = "included")',

	whenToUse:
		'Tag inclusion ("included"), status, category, or a feature flag inline with copy or on a card. Use `data-tone` to carry meaning: accent for on-brand, positive for savings/included, warn for caution, negative for an overcharge/violation.',

	recipe: [
		'`border-radius: 999px`, `border: 1px solid`, soft-tinted background, 12–13px mono-ish type, inline-flex with a 6px gap.',
		'Drive all four colourways from `data-tone` — read `--m-{tone}`, `--m-{tone}-soft` (fill), `--m-{tone}-border`.',
		'Optional leading marker — a small dot (lighter tag) or a check icon (16px, `currentColor`) reads as "included".',
		'Padding ~ 4px 10px; the icon and label sit on one baseline.',
	],

	dom: `<span class="m-chip" data-tone="positive">
  <svg class="check" aria-hidden="true">…</svg>
  Included
</span>`,

	tokensUsed: [
		{ part: 'fill', role: '--m-{tone}-soft', notes: 'tone ∈ accent | positive | warn | negative.' },
		{ part: 'border', role: '--m-{tone}-border' },
		{ part: 'text + icon', role: '--m-{tone}', notes: 'currentColor flows to the check icon.' },
	],

	dimensions: [
		{ name: 'Radius', value: '999px', notes: 'Fully rounded.' },
		{ name: 'Border', value: '1px' },
		{ name: 'Type', value: '12–13px', notes: 'Mono-ish, often tabular for counts.' },
		{ name: 'Padding', value: '~4px 10px' },
		{ name: 'Icon', value: '16px', notes: 'Leading check = "included". currentColor.' },
	],

	variants: [
		{ name: 'accent', description: 'On-brand tag.', tokens: [{ name: 'text', token: { cssVar: '--m-accent', light: '#2B605C', dark: '#5BB8B0' } }] },
		{ name: 'positive', description: 'Savings / included — jade.', tokens: [{ name: 'text', token: { cssVar: '--m-positive', light: '#2B605C', dark: '#5BB8B0' } }] },
		{ name: 'warn', description: 'Caution — amber. Sparing.', tokens: [{ name: 'text', token: { cssVar: '--m-warn', light: '#B86400', dark: '#D99A3C' } }] },
		{ name: 'negative', description: 'Overcharge / violation — monochrome ink. Never red.', tokens: [{ name: 'text', token: { cssVar: '--m-negative', light: '#25261D', dark: '#EBEDE4' } }] },
	],

	props: [
		{ name: 'tone', type: "'accent' | 'positive' | 'warn' | 'negative'", default: "'accent'", description: 'Semantic colourway via data-tone.' },
		{ name: 'icon', type: 'boolean', default: 'false', description: 'Show the leading check ("included").' },
	],

	nonFeatures: [
		'No red — negative is monochrome ink. This is a deliberate trust signal.',
		'No filled/solid chips — chips are soft-tinted with a hairline border, never a saturated fill.',
		'No close button — chips are display tags here, not removable input tokens.',
	],

	gotchas: [
		'Set the icon to `currentColor` so it inherits the tone — don\'t hardcode the icon fill per tone.',
		'Use tabular figures inside count chips so widths don\'t jitter as numbers change.',
	],

	accessibility: [
		'The leading check is decorative (`aria-hidden`) — the label text carries the meaning.',
		'Tone is reinforced by the label, never colour alone.',
	],

	example: `<span class="m-chip" data-tone="positive"><Check /> Included</span>
<span class="m-chip" data-tone="negative">Overcharge</span>

<style>
  .m-chip { display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 999px; font-size: 13px; line-height: 1;
    background: var(--m-accent-soft); border: 1px solid var(--m-accent-border);
    color: var(--m-accent); }
  .m-chip[data-tone='positive'] { background: var(--m-positive-soft);
    border-color: var(--m-positive-border); color: var(--m-positive); }
  .m-chip[data-tone='warn'] { background: var(--m-warn-soft);
    border-color: var(--m-warn-border); color: var(--m-warn); }
  .m-chip[data-tone='negative'] { background: var(--m-negative-soft);
    border-color: var(--m-negative-border); color: var(--m-negative); }
  .m-chip .check { width: 16px; height: 16px; }
</style>`,
	exampleLang: 'html',

	porting: [
		'One base style + four tone overrides reading `--m-{tone}` / `-soft` / `-border`. 999px radius, 1px border, soft fill.',
		'Leading check icon is currentColor and decorative.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook — promoted from the shipping rebuild.' }],
};
