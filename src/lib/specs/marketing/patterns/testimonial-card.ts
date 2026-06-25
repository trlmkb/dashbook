import type { MarketingPatternSpec } from './types.js';

/**
 * TestimonialCarousel — one rotating customer quote at a time.
 *
 * A single large quote that auto-advances through a set, with a word-by-word
 * reveal on each change, pause-on-hover, and a name + role attribution. The
 * live realisation is ShipQuoteCarousel (an island), not a static card.
 */
export const testimonialCard: MarketingPatternSpec = {
	slug: 'testimonial-card',
	name: 'TestimonialCarousel',
	category: 'Media & proof',
	status: 'stable',
	description:
		'One customer quote at a time, auto-rotating through a set — a large blockquote that reveals word-by-word on each change, pauses on hover, and shows a name + role attribution. Realised on the live site as the ShipQuoteCarousel island.',

	source: 'src/components/widgets/ShipQuoteCarousel.tsx',
	sourceNote: 'A client island: `quotes: { quote, name, role? }[]` rotate on an interval (pausing on hover); each change re-runs a per-word reveal. Replaces the old static slide/TestimonialCard.astro.',

	whenToUse:
		'Reach for TestimonialCarousel to let a few customer voices share one slot — a rotating pull quote rather than a wall of cards. Use BigQuote for a single fixed oversized quote with no rotation, and CaseStudyCard when the proof is a metric rather than a sentence.',

	recipe: [
		'Render one quote at a time as a large `<blockquote>` in `--m-fg-strong`, sized as a pull quote (display/serif-free, ~clamp(22–32px), generous line-height).',
		'Animate each change with a per-word reveal: split the quote into words and stagger them in (an in/out phase class drives opacity/translate), so the new quote types in rather than hard-cuts.',
		'Auto-advance on a fixed interval; **pause while hovered/focused** and resume on leave. Loop back to the first after the last.',
		'Attribution below: the name in `--m-fg-strong`, the role/company in `--m-fg-muted` (mono eyebrow scale).',
		'Optional position dots beneath; the active dot uses `--m-accent`. Dots are controls, not just decoration.',
		'Respect `prefers-reduced-motion`: drop the word reveal (show the quote at once) and, ideally, the auto-advance — or advance without animation.',
	],

	dom: `<figure class="quote-carousel" data-paused="false">
  <blockquote class="quote">
    <span class="word">Dash.fi</span> <span class="word">found</span> <span class="word">refunds…</span>
  </blockquote>
  <figcaption>
    <span class="name">Maya Rivera</span>
    <span class="role">VP Logistics, Northwind</span>
  </figcaption>
  <div class="dots"><button aria-current="true"></button><button></button></div>
</figure>`,

	tokensUsed: [
		{ part: 'quote', role: '--m-fg-strong' },
		{ part: 'name', role: '--m-fg-strong' },
		{ part: 'role / company', role: '--m-fg-muted' },
		{ part: 'active dot', role: '--m-accent', notes: 'Inactive dots use --m-border-strong.' },
	],

	dimensions: [
		{ name: 'Shown at once', value: '1 quote' },
		{ name: 'Quote size', value: 'clamp(22–32px), pull-quote weight' },
		{ name: 'Reveal', value: 'per-word stagger on each change' },
		{ name: 'Advance', value: 'fixed interval (intervalMs), pause on hover/focus' },
		{ name: 'Attribution', value: 'name (strong) + role (muted)' },
	],

	variants: [
		{ name: 'auto-rotating', description: 'Default — advances on an interval, pausing on hover.' },
		{ name: 'with dots', description: 'Position dots double as manual controls.' },
		{ name: 'single', description: 'One quote → no rotation (behaves like a fixed pull quote).' },
	],

	props: [
		{ name: 'quotes', type: '{ quote: string; name: string; role?: string }[]', required: true, description: 'The set to rotate through; one shown at a time.' },
		{ name: 'intervalMs', type: 'number', description: 'Auto-advance interval; pauses on hover/focus.' },
	],

	nonFeatures: [
		'Not a wall of cards — exactly one quote is visible; the others rotate through the same slot.',
		'No avatars or decorative quote-marks — the quote + name/role carry it (this is the carousel, not the old static card).',
		'No star ratings — the words and attribution are the trust signal.',
		'No accent-coloured quote text — the quote stays `--m-fg-strong`; only the active dot is tinted.',
	],

	gotchas: [
		'Pause on hover/focus or the quote moves out from under someone reading it.',
		'The full current quote text must be present in the DOM (the per-word spans are presentational) so assistive tech and crawlers read the whole quote.',
		'Under reduced-motion, skip the word reveal (and ideally the auto-advance) — a staggered type-in is motion.',
	],

	accessibility: [
		'Use a `<figure>` + `<blockquote>` + `<figcaption>`; the visible quote is real text, not built only from animated spans.',
		'If dots are interactive, they are `<button>`s with the active one marked (`aria-current`); the carousel is operable and pausable by keyboard.',
		'Attribution is plain text — name and role, never colour-coded alone.',
	],

	example: `<figure class="qc">
  <blockquote class="qc-quote">Dash.fi found refunds three carriers had quietly written off.</blockquote>
  <figcaption class="qc-cap">
    <span class="qc-name">Maya Rivera</span>
    <span class="qc-role">VP Logistics, Northwind</span>
  </figcaption>
</figure>

<style>
  .qc { text-align: center; }
  .qc-quote { margin: 0 auto; max-width: 26ch; font-family: var(--font-display);
    font-weight: 200; font-size: clamp(22px, 3vw, 32px); line-height: 1.3;
    color: var(--m-fg-strong); }
  .qc-cap { display: flex; flex-direction: column; gap: 2px; margin-top: 20px; }
  .qc-name { color: var(--m-fg-strong); font-weight: 600; }
  .qc-role { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase;
    letter-spacing: 0.14em; color: var(--m-fg-muted); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A single-quote slot that auto-advances through `quotes` (pausing on hover), re-running a per-word reveal on each change; attribution is name (strong) + role (muted).',
		'Hydrate as a client island; keep the current quote as real text and honor reduced-motion.',
	],

	changelog: [
		{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook (static TestimonialCard).' },
		{ version: 'v0.2.0', date: '2026-06-26', note: 'Re-pointed to the live ShipQuoteCarousel — now a rotating, word-revealing quote carousel, not a static card.' },
	],
};
