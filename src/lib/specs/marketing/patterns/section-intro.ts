import type { MarketingPatternSpec } from './types.js';

/**
 * Section intro — the canonical copy unit + SectionEyebrow.
 *
 * The reusable header of every marketing section: eyebrow → display heading
 * (trailing phrase in an accent span) → body paragraph. SectionEyebrow is the
 * top line; the unit as a whole is the most-repeated pattern on the site.
 */
export const sectionIntro: MarketingPatternSpec = {
	slug: 'section-intro',
	name: 'Section intro (eyebrow + copy unit)',
	category: 'Rhythm & connectors',
	status: 'stable',
	description:
		'The canonical section header: a tracked mono eyebrow, a PP Supply Mono ultralight display heading with its trailing phrase in an accent span, and a body paragraph. Reusable on every section.',

	source: 'src/components/slide/SectionEyebrow + the section intro composition',
	sourceNote: 'SectionEyebrow is a real component; the copy unit is a composition convention.',

	whenToUse:
		'Open almost every section with this unit. Use SectionEyebrow alone when you only need the label line; use the full three-part unit when introducing a section with a heading and lede.',

	recipe: [
		'Eyebrow — mono caps, `letter-spacing: 0.16–0.2em`, 10–12px, `color: var(--m-fg-subtle)`. This is the SectionEyebrow component.',
		'Display heading — `font-family: var(--font-display)`, weight 200, uppercase, `clamp()` size, `line-height: ~1`, `letter-spacing: -0.02em`.',
		'Wrap the trailing phrase of the heading in `<span class="accent">` → `color: var(--m-accent)`.',
		'Body — Bai Jamjuree 15–17px, `line-height: 1.55–1.65`, `color: var(--m-fg-muted)`, `max-width: ~60ch`.',
		'Stack with a small gap (eyebrow→heading ~12px, heading→body ~20px). Wrap each line in a reveal target for the standard fade-rise entrance.',
	],

	dom: `<header class="section-intro" data-reveal>
  <p class="eyebrow">Shipping</p>
  <h2 class="display">
    Spend less on <span class="accent">every parcel</span>
  </h2>
  <p class="lede">One claim per section. Specifics over hedges.</p>
</header>`,

	tokensUsed: [
		{ part: 'eyebrow', role: '--m-fg-subtle' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'heading accent span', role: '--m-accent' },
		{ part: 'body', role: '--m-fg-muted' },
	],

	dimensions: [
		{ name: 'Eyebrow size', value: '10–12px', notes: 'Mono caps, tracked 0.16–0.2em.' },
		{ name: 'Heading size', value: 'clamp(2.5rem, 6vw, 4.5rem)', notes: 'Weight 200, uppercase, tracking -0.02em.' },
		{ name: 'Body size', value: '15–17px', notes: 'Line-height 1.55–1.65, max ~60ch.' },
		{ name: 'Eyebrow → heading gap', value: '~12px' },
		{ name: 'Heading → body gap', value: '~20px' },
	],

	props: [
		{ name: 'eyebrow', type: 'string', description: 'The tracked mono label line (SectionEyebrow text).' },
		{ name: 'align', type: "'start' | 'center'", default: "'start'", description: 'Inline alignment of the unit.' },
	],

	nonFeatures: [
		'No bold weight on the heading — display is weight 200 only; bolding triggers faux-bold (see Typography gotchas).',
		'No more than one accent span per heading — the accent marks one phrase, not a rainbow.',
		'No exclamation marks, no emoji — sentence case body per the brand voice.',
	],

	gotchas: [
		'Setting the heading to weight 600/700 produces synthetic faux-bold in PP Supply Mono. Keep it at 200 and set `font-synthesis: none` globally.',
		'The accent span colour comes from `--m-accent`, so it lifts to #5BB8B0 on ink bands automatically — don\'t hardcode jade.',
	],

	motion: [
		'Wrap the unit (or each line, staggered) in a `data-reveal` target for the standard fade-rise entrance.',
		'Honour reduced motion — render in final state when `prefers-reduced-motion: reduce`.',
	],

	accessibility: [
		'The eyebrow is decorative copy — keep the real document outline on the `<h2>`/`<h3>`, not the eyebrow.',
		'Accent span is colour-only emphasis; never rely on it alone to convey meaning.',
	],

	example: `<header class="section-intro" data-reveal>
  <p class="eyebrow">Shipping</p>
  <h2 class="display">Spend less on <span class="accent">every parcel</span></h2>
  <p class="lede">Audit every carrier invoice automatically. Recover what you overpaid.</p>
</header>

<style>
  .eyebrow { font-family: var(--font-mono); text-transform: uppercase;
    letter-spacing: 0.18em; font-size: 11px; color: var(--m-fg-subtle); }
  .display { font-family: var(--font-display); font-weight: 200; text-transform: uppercase;
    font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1; letter-spacing: -0.02em;
    color: var(--m-fg-strong); }
  .display .accent { color: var(--m-accent); }
  .lede { font-size: 17px; line-height: 1.6; color: var(--m-fg-muted); max-width: 60ch; }
</style>`,
	exampleLang: 'html',

	porting: [
		'Three stacked lines; the only colour decisions are fg-subtle (eyebrow), fg-strong (heading), accent (one trailing span), fg-muted (body).',
		'Keep the mono face at weight ≤ 400 and ship the JetBrains Mono fallback.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
