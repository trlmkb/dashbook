import type { MarketingPatternSpec } from './types.js';

/**
 * CaseStudyCard — a card that links to a single customer case study.
 *
 * A customer logo or eyebrow, one headline metric (a large mono tabular value
 * in the accent or positive role), a one-line result, and a "Read the story"
 * link. Card surface, 1px hairline, soft lift shadow.
 */
export const caseStudyCard: MarketingPatternSpec = {
	slug: 'case-study-card',
	name: 'CaseStudyCard',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A card that links to one customer case study — a customer logo or eyebrow, one headline metric (a large mono tabular-nums value in `--m-accent` or `--m-positive`), a one-line result, and a "Read the story" link. Card surface, 1px hairline, soft lift shadow.',

	source: 'src/components/slide/CaseStudyCard.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'Reach for CaseStudyCard when the proof is a number — a customer who recovered a sum or cut a percentage — and you want it to link out to the full story. Use TestimonialCard when the proof is a sentence, and StatTrio / StatStrip when you want a row of figures with no per-customer framing or link.',

	recipe: [
		'Card shell: `background: var(--m-card)`, `border: 1px solid var(--m-border)`, `border-radius: 14–16px`, ~28px padding, and the soft lift shadow `0 26px 56px -38px rgba(15, 20, 18, 0.42)`.',
		'Top: a muted customer logo or a mono uppercase eyebrow in `--m-fg-subtle` naming the customer.',
		'Headline metric: ONE large value in `var(--font-mono)` with `font-variant-numeric: tabular-nums`, coloured `--m-accent` (or `--m-positive` for money saved), ~40–56px.',
		'Result line: a single sentence in `--m-fg-muted` saying what the metric means.',
		'Footer: a "Read the story" link or button in `--m-accent` — a real `<a href>` when it navigates to the case study.',
		'Wrap the card in the standard reveal target for the fade-rise entrance.',
	],

	dom: `<a class="case-study-card" href="/cases/northwind">
  <p class="eyebrow">Northwind Freight</p>
  <p class="metric">$1.2M</p>
  <p class="result">recovered across 14 carriers in the first year.</p>
  <span class="link">Read the story</span>
</a>`,

	tokensUsed: [
		{ part: 'card surface', role: '--m-card' },
		{ part: 'card border', role: '--m-border', notes: 'The default 1px hairline.' },
		{ part: 'eyebrow / logo', role: '--m-fg-subtle' },
		{ part: 'headline metric', role: '--m-positive', notes: 'Jade for money saved; use --m-accent for non-money figures. Never green, never red.' },
		{ part: 'result + link', role: '--m-fg-muted', notes: 'Result in muted; the "Read the story" link is --m-accent.' },
	],

	dimensions: [
		{ name: 'Card radius', value: '14–16px' },
		{ name: 'Card border', value: '1px' },
		{ name: 'Card padding', value: '~28px' },
		{ name: 'Metric size', value: '40–56px', notes: 'Mono, tabular-nums; one metric only.' },
		{ name: 'Lift shadow', value: '0 26px 56px -38px rgba(15, 20, 18, 0.42)', notes: 'Faint lift — long blur, negative spread.' },
	],

	variants: [
		{ name: 'positive metric', description: 'Money saved or recovered — the metric is jade (`--m-positive`).' },
		{ name: 'accent metric', description: 'A non-money figure (time, count, percent) — the metric is `--m-accent`.' },
		{ name: 'with logo', description: 'A muted customer logo replaces the text eyebrow.' },
	],

	props: [
		{ name: 'metric', type: '{ value: string; tone?: \'accent\' | \'positive\' }', required: true, description: 'The one headline figure and its colourway; rendered mono with tabular-nums.' },
		{ name: 'result', type: 'string', required: true, description: 'The one-line result describing what the metric means.' },
		{ name: 'href', type: 'string', required: true, description: 'The case-study URL the whole card links to.' },
	],

	nonFeatures: [
		'Not a multi-stat card — exactly one headline metric; for several figures use StatTrio / StatStrip.',
		'No red and no green — money is jade (`--m-positive`) and any loss framing is monochrome ink, never a red or green metric.',
		'No body paragraph — the result is one line; the depth lives behind the "Read the story" link.',
	],

	gotchas: [
		'Set the metric in `var(--font-mono)` with `font-variant-numeric: tabular-nums` so the value stays aligned and does not jitter between cards.',
		'If the whole card is the link, make the card itself the `<a href>` and avoid a second nested `<a>` inside it — never nest interactive controls.',
	],

	accessibility: [
		'When the entire card is clickable, use one real `<a href>` as the card root; the "Read the story" label is a visual cue inside it, not a second link.',
		'The metric tone is reinforced by the result sentence, never carried by colour alone.',
	],

	example: `<a class="case-study-card" href="/cases/northwind">
  <p class="eyebrow">Northwind Freight</p>
  <p class="metric">$1.2M</p>
  <p class="result">recovered across 14 carriers in the first year.</p>
  <span class="link">Read the story</span>
</a>

<style>
  .case-study-card { display: block; text-decoration: none;
    background: var(--m-card); border: 1px solid var(--m-border);
    border-radius: 16px; padding: 28px;
    box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42); }
  .eyebrow { margin: 0 0 16px; font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.16em; text-transform: uppercase; color: var(--m-fg-subtle); }
  .metric { margin: 0; font-family: var(--font-mono); font-size: 48px;
    line-height: 1; font-variant-numeric: tabular-nums; color: var(--m-positive); }
  .result { margin: 10px 0 18px; font-size: 14px; line-height: 1.55;
    color: var(--m-fg-muted); }
  .link { font-family: var(--font-mono); font-size: 12px;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--m-accent); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A linkable card on the shared card recipe: a muted eyebrow or logo, one mono tabular metric in positive/accent, a one-line muted result, and an accent "Read the story" cue.',
		'Make the card root the real `<a href>`; never nest a second link inside it.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
