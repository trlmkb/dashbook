import type { MarketingPatternSpec } from './types.js';

/**
 * BigQuote — the oversized pull-quote band.
 *
 * A connective beat between sections: one large display-weight quote that fills
 * a whole band, an attribution line in muted text, and an optional oversized
 * accent quote-mark. Reads as a breath, not a testimonial card.
 */
export const bigQuote: MarketingPatternSpec = {
	slug: 'big-quote',
	name: 'BigQuote',
	category: 'Rhythm & connectors',
	status: 'stable',
	description:
		'An oversized pull-quote that fills a band: a large PP Supply Mono weight-200 quote, an attribution line (name, title, company) in muted text, and an optional accent quote-mark. A connective beat between sections, often on cream or ink.',

	source: 'src/components/rhythm/BigQuote.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'Drop a BigQuote between two content sections as a connective beat — a single strong line that earns a whole band. Use TestimonialCard instead when you need a portrait, logo, and metric in a contained card; BigQuote is the bare, oversized quote that sets rhythm, not proof density.',

	recipe: [
		'Render a centred block inside the band: an optional oversized quote-mark, a `<blockquote>`, then a `<figcaption>` attribution line.',
		'Quote text — `font-family: var(--font-display)`, weight 200, `clamp()` size (~`clamp(1.75rem, 4vw, 3rem)`), `line-height: 1.15–1.25`, `letter-spacing: -0.02em`, `color: var(--m-fg-strong)`, capped at ~24ch–30ch for a tall, narrow column.',
		'Attribution — one line, `color: var(--m-fg-muted)`; render the name in `--m-fg-strong` and the title/company in `--m-fg-subtle` if you want a two-tone caption.',
		'Optional accent quote-mark — an oversized "“" set in `var(--m-accent)`, `aria-hidden`, sitting above or behind the quote.',
		'On a cream or ink band: on ink, set `data-marketing-dark` on the section so `--m-fg-strong` / `--m-accent` re-resolve for the dark surface.',
		'Wrap the block in a reveal target for the standard fade-rise entrance.',
	],

	dom: `<figure class="big-quote" data-reveal>
  <span class="mark" aria-hidden="true">&ldquo;</span>
  <blockquote>We recovered $300M+ in overcharges without opening a single dispute ourselves.</blockquote>
  <figcaption>
    <span class="who">Dana Ortiz</span>
    <span class="role">VP Finance, Northwind Freight</span>
  </figcaption>
</figure>`,

	tokensUsed: [
		{ part: 'quote text', role: '--m-fg-strong', notes: 'Display weight 200; re-resolves on the ink band.' },
		{ part: 'attribution name', role: '--m-fg-strong' },
		{ part: 'attribution title/company', role: '--m-fg-subtle' },
		{ part: 'quote-mark', role: '--m-accent', notes: 'Optional oversized mark; lifts to #5BB8B0 on ink.' },
	],

	dimensions: [
		{ name: 'Quote size', value: 'clamp(1.75rem, 4vw, 3rem)', notes: 'Display weight 200, line-height 1.15–1.25, tracking -0.02em.' },
		{ name: 'Quote measure', value: '~24–30ch', notes: 'Narrow column so the quote stacks tall, not wide.' },
		{ name: 'Quote-mark size', value: '~3–5rem', notes: 'Oversized accent “. Decorative, aria-hidden.' },
		{ name: 'Attribution size', value: '13–15px', notes: 'Mono or body; one line.' },
		{ name: 'Quote → attribution gap', value: '~24px' },
	],

	variants: [
		{
			name: 'cream',
			description: 'Connective beat on the warm cream band — the default between two paper sections.',
			tokens: [{ name: 'background', token: { cssVar: '--m-cream', light: '#EBEDE4', dark: '#EBEDE4' } }],
		},
		{
			name: 'ink',
			description: 'Dark emphasis band; sets data-marketing-dark so text + accent flip.',
			tokens: [{ name: 'background', token: { cssVar: '--m-near-black', light: '#25261D', dark: '#25261D' } }],
		},
	],

	props: [
		{ name: 'quote', type: 'string', required: true, description: 'The pull-quote text. One sentence — kept short so it fills the band.' },
		{ name: 'attribution', type: '{ name: string; title?: string; company?: string }', description: 'The byline; name in strong, title/company in subtle.' },
		{ name: 'mark', type: 'boolean', default: 'true', description: 'Show the oversized accent quote-mark.' },
	],

	nonFeatures: [
		'Not a testimonial card — no portrait, logo, star rating, or contained card surface; it is a bare band-filling quote.',
		'No bold weight on the quote — display is weight 200 only; bolding triggers faux-bold in PP Supply Mono.',
		'No multiple quotes per band — exactly one quote fills the band; for several voices use TestimonialCard rows.',
	],

	gotchas: [
		'The oversized quote-mark is decorative — set it `aria-hidden` and rely on the `<blockquote>` for semantics; a screen reader should not announce a lone quote glyph.',
		'On the ink band the quote only re-themes if it reads `--m-fg-strong` / `--m-accent`; a hardcoded hex will not flip — keep the quote-mark on `--m-accent`, not raw jade.',
	],

	motion: [
		'Wrap the figure in a `data-reveal` target for the standard fade-rise entrance; honour `prefers-reduced-motion: reduce` by rendering in the final state.',
		'Any displayed figure inside the quote (e.g. "$300M+") is editorial copy drawn from real data, never an animated count-up implying live numbers.',
	],

	accessibility: [
		'Use a real `<figure>` / `<blockquote>` / `<figcaption>` so the quote and its attribution are programmatically associated.',
		'On the ink band keep the quote-text contrast ≥ 4.5:1 — the role set is tuned for this; do not override `--m-fg-strong` with a lower-contrast value.',
	],

	example: `<figure class="big-quote" data-reveal>
  <span class="mark" aria-hidden="true">&ldquo;</span>
  <blockquote>We recovered $300M+ in overcharges without opening a single dispute ourselves.</blockquote>
  <figcaption>
    <span class="who">Dana Ortiz</span> <span class="role">VP Finance, Northwind Freight</span>
  </figcaption>
</figure>

<style>
  .big-quote { display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 24px; max-width: 28ch; margin-inline: auto; }
  .big-quote .mark { font-family: var(--font-display); font-weight: 200;
    font-size: 4rem; line-height: 1; color: var(--m-accent); }
  .big-quote blockquote { margin: 0; font-family: var(--font-display);
    font-weight: 200; font-size: clamp(1.75rem, 4vw, 3rem); line-height: 1.2;
    letter-spacing: -0.02em; color: var(--m-fg-strong); }
  .big-quote figcaption { font-size: 14px; color: var(--m-fg-muted); }
  .big-quote .who { color: var(--m-fg-strong); }
  .big-quote .role { color: var(--m-fg-subtle); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A centred `<figure>` with one oversized weight-200 display quote, a muted attribution line, and an optional accent quote-mark; the only colour decisions are fg-strong (quote + name), fg-subtle (title/company), accent (the mark).',
		'On the dark band, flip the subtree with the marketing dark attribute rather than recolouring the quote; keep the mono/display face at weight 200.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
