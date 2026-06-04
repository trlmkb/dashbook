import type { MarketingPatternSpec } from './types.js';

/**
 * TestimonialCard — a single customer quote on the card surface.
 *
 * A quote in strong ink, an optional oversized decorative quote-mark, and an
 * attribution line (name + title + company in muted text), with an optional
 * avatar or logo. Card surface, 1px hairline, soft lift shadow.
 */
export const testimonialCard: MarketingPatternSpec = {
	slug: 'testimonial-card',
	name: 'TestimonialCard',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A single customer quote on the card surface — the quote in `--m-fg-strong`, an optional oversized decorative quote-mark, and an attribution line (name + title + company in `--m-fg-muted`), with an optional avatar or logo. Card surface, 1px hairline, soft lift shadow.',

	source: 'src/components/slide/TestimonialCard.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'Reach for TestimonialCard when you want one customer voice carrying a section — a pull quote with a face and a name. Use BigQuote for a single oversized rhythm-band quote with no card frame, and CaseStudyCard when the proof is a metric rather than a sentence.',

	recipe: [
		'Card shell: `background: var(--m-card)`, `border: 1px solid var(--m-border)`, `border-radius: 14–16px`, ~28px padding, and the soft lift shadow `0 26px 56px -38px rgba(15, 20, 18, 0.42)`.',
		'Optional decorative quote-mark: an oversized glyph in `--m-accent-soft`, set `aria-hidden` and positioned behind or above the quote so it never reads as text.',
		'Quote: a `<blockquote>` in `--m-fg-strong`, ~18–20px, line-height ~1.5, sized to roughly 42ch so the line breaks read as a pull quote.',
		'Attribution: a `<figcaption>` with the name in `--m-fg-strong` and the title plus company in `--m-fg-muted`, on one or two lines.',
		'Optional avatar or company logo: a small round avatar (40px) or a muted logo to the left of the attribution; keep it decorative when the name already carries the meaning.',
		'Wrap the card in the standard reveal target for the fade-rise entrance.',
	],

	dom: `<figure class="testimonial-card">
  <span class="mark" aria-hidden="true">&ldquo;</span>
  <blockquote>Dash.fi found refunds three carriers had quietly written off.</blockquote>
  <figcaption>
    <img class="avatar" src="/avatars/rivera.jpg" alt="" />
    <span class="who"><b>Maya Rivera</b><span>VP Logistics, Northwind</span></span>
  </figcaption>
</figure>`,

	tokensUsed: [
		{ part: 'card surface', role: '--m-card' },
		{ part: 'card border', role: '--m-border', notes: 'The default 1px hairline.' },
		{ part: 'quote', role: '--m-fg-strong' },
		{ part: 'attribution', role: '--m-fg-muted', notes: 'Name lifts to --m-fg-strong; title + company stay muted.' },
		{ part: 'decorative quote-mark', role: '--m-accent-soft', notes: 'Oversized glyph; aria-hidden.' },
	],

	dimensions: [
		{ name: 'Card radius', value: '14–16px' },
		{ name: 'Card border', value: '1px' },
		{ name: 'Card padding', value: '~28px' },
		{ name: 'Quote size', value: '18–20px', notes: 'Pull-quote weight; ~42ch measure.' },
		{ name: 'Avatar', value: '40px', notes: 'Round; optional. Decorative when the name carries meaning.' },
		{ name: 'Lift shadow', value: '0 26px 56px -38px rgba(15, 20, 18, 0.42)', notes: 'Faint lift — long blur, negative spread.' },
	],

	variants: [
		{ name: 'with avatar', description: 'Attribution leads with a round customer avatar.' },
		{ name: 'with logo', description: 'Attribution leads with a muted company logo instead of an avatar.' },
		{ name: 'quote only', description: 'No avatar or logo — quote plus a name-and-title attribution.' },
	],

	props: [
		{ name: 'quote', type: 'string', required: true, description: 'The testimonial text; rendered inside the blockquote.' },
		{ name: 'author', type: '{ name: string; title?: string; company?: string; avatar?: string }', required: true, description: 'Attribution — name in strong ink, title and company muted, optional avatar URL.' },
		{ name: 'showMark', type: 'boolean', default: 'true', description: 'Show the oversized decorative quote-mark.' },
	],

	nonFeatures: [
		'Not a carousel — one card is one quote; rotating testimonials is a separate slider concern.',
		'No star ratings — the quote and attribution carry the trust signal, not a rating widget.',
		'No accent-coloured quote text — the quote stays in `--m-fg-strong`; only the decorative mark is tinted.',
	],

	gotchas: [
		'Mark the oversized quote-mark `aria-hidden` and keep real quotation marks out of the visible text, or a screen reader announces the glyph as content.',
		'Give a decorative avatar an empty `alt` so it is skipped; only write alt text when the image is the sole carrier of the company identity.',
	],

	accessibility: [
		'Use a `<figure>` with a `<blockquote>` and a `<figcaption>` so the quote and its attribution are programmatically linked.',
		'The decorative quote-mark is `aria-hidden`; the attribution is plain text, never colour-coded alone.',
	],

	example: `<figure class="testimonial-card">
  <span class="mark" aria-hidden="true">&ldquo;</span>
  <blockquote>Dash.fi found refunds three carriers had quietly written off.</blockquote>
  <figcaption>
    <img class="avatar" src="/avatars/rivera.jpg" alt="" />
    <span class="who"><b>Maya Rivera</b><span>VP Logistics, Northwind</span></span>
  </figcaption>
</figure>

<style>
  .testimonial-card { position: relative; background: var(--m-card);
    border: 1px solid var(--m-border); border-radius: 16px; padding: 28px;
    box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42); }
  .mark { position: absolute; top: 8px; left: 20px; font-size: 64px;
    line-height: 1; color: var(--m-accent-soft); }
  .testimonial-card blockquote { position: relative; margin: 0 0 20px;
    font-size: 19px; line-height: 1.5; color: var(--m-fg-strong); max-width: 42ch; }
  .testimonial-card figcaption { display: flex; align-items: center; gap: 12px; }
  .avatar { width: 40px; height: 40px; border-radius: 999px; object-fit: cover; }
  .who { display: flex; flex-direction: column; }
  .who b { color: var(--m-fg-strong); }
  .who span { color: var(--m-fg-muted); font-size: 13px; }
</style>`,
	exampleLang: 'html',

	porting: [
		'A `<figure>` on the shared card recipe: a quote in fg-strong, an attribution with the name in fg-strong and title + company in fg-muted.',
		'The oversized quote-mark is a decorative `--m-accent-soft` glyph (aria-hidden); the avatar is optional and decorative.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
