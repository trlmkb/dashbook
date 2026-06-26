import type { MarketingPatternSpec } from './types.js';

/**
 * Hero — the base hero primitive.
 *
 * The flexible page opener that ProductHero, CosmicHero, MetricsHero, and
 * ProductWindowHero specialize: eyebrow → display heading (accent span) →
 * lede → CTA pair, start-aligned by default.
 */
export const hero: MarketingPatternSpec = {
	slug: 'hero',
	name: 'Hero',
	category: 'Heroes',
	status: 'stable',
	description:
		'The base hero primitive — eyebrow, display heading with an accent phrase, lede, and a CTA pair, start-aligned by default. ProductHero, CosmicHero, MetricsHero, and ProductWindowHero are specializations.',

	source: 'src/components/slide/Hero.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'The default flexible opener — reach for it when you want a copy-led hero with no required product visual. Use ProductHero or ProductWindowHero when a product visual leads, MetricsHero when a metrics panel proves the claim, CosmicHero for a dark ambient opener.',

	recipe: [
		'Place on a section band (`paper` or `ink`, per the Section-rhythm foundation).',
		'Render the canonical copy unit start-aligned: eyebrow → display heading (one accent span) → lede (~50ch).',
		'A CTA pair below: accent squircle primary + outline secondary.',
		'Leave a slot below/beside for optional media (a product shot) — the specializations fill it.',
		'Reveal-stagger eyebrow → heading → lede → CTAs.',
	],

	dom: `<section class="m-band" data-band="paper">
  <header class="hero" data-reveal>
    <p class="eyebrow">Shipping</p>
    <h1 class="display">Spend less on <span class="accent">every parcel</span></h1>
    <p class="lede">Audit every carrier invoice automatically.</p>
    <div class="cta">
      <a class="m-btn" data-variant="accent">Start a pilot</a>
      <a class="m-btn" data-variant="outline">How it works</a>
    </div>
    <slot name="media" />
  </header>
</section>`,

	tokensUsed: [
		{ part: 'band', role: '--m-surface / --m-near-black', notes: 'Set by the section band.' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'accent span', role: '--m-accent' },
		{ part: 'lede', role: '--m-fg-muted' },
		{ part: 'primary CTA', role: '--m-accent' },
	],

	dimensions: [
		{ name: 'Heading', value: 'clamp(2.5rem, 6vw, 4.5rem)', notes: 'Display weight 200, uppercase.' },
		{ name: 'Lede width', value: '~50ch' },
		{ name: 'Alignment', value: 'start', notes: 'Center via the `align` variant.' },
	],

	variants: [
		{ name: 'start', description: 'Left-aligned copy (default).' },
		{ name: 'center', description: 'Centred copy variant via `align: center`.' },
	],

	props: [
		{ name: 'eyebrow', type: 'string', description: 'Tracked mono label.' },
		{ name: 'heading', type: 'string | Snippet', required: true, description: 'Display heading; mark the accent phrase.' },
		{ name: 'lede', type: 'string', description: 'Supporting paragraph.' },
		{ name: 'align', type: "'start' | 'center'", default: "'start'", description: 'Copy alignment.' },
		{ name: 'background', type: "'paper' | 'ink'", default: "'paper'", description: 'Band.' },
	],

	nonFeatures: [
		'No stacked sub-claims — one headline claim (brand voice).',
		'No more than two CTAs.',
		'No required media — that is what the product-hero specializations add.',
	],

	gotchas: [
		'Display weight is 200 — never bold (faux-bold in PP Supply Mono).',
		'Let the accent come from `--m-accent` so it lifts on ink; do not hardcode jade.',
	],

	motion: ['Reveal-stagger the copy + CTAs. Honour reduced motion (final state).'],

	accessibility: ['The hero heading is the page <h1> — exactly one per page. Primary CTA precedes secondary in the DOM.'],

	example: `<section class="m-band" data-band="paper">
  <header class="hero" data-reveal>
    <p class="eyebrow">Shipping</p>
    <h1 class="display">Spend less on <span class="accent">every parcel</span></h1>
    <p class="lede">Audit every carrier invoice automatically. Recover what you overpaid.</p>
    <div class="cta">
      <a class="m-btn" data-variant="accent" href="/start">Start a pilot</a>
      <a class="m-btn" data-variant="outline" href="/how">How it works</a>
    </div>
  </header>
</section>`,
	exampleLang: 'astro',

	porting: ['A copy unit + CTA pair on a section band, with an optional media slot. Compose from section-intro + squircle-button on a Section-rhythm band.'],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
