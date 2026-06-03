import type { MarketingPatternSpec } from './types.js';

/**
 * ProductHero — copy + a contained, featured product shot.
 *
 * A centred copy unit with a framed scale-to-fit product shot directly below
 * (or beside). The product-forward opener that stays on the grid (no bleed).
 */
export const productHero: MarketingPatternSpec = {
	slug: 'product-hero',
	name: 'ProductHero',
	category: 'Heroes',
	status: 'stable',
	description:
		'A product-forward opener: a centred copy unit with a framed, contained scale-to-fit product shot directly below. Stays on the content grid (no edge bleed) — the contained counterpart to AsymmetricProductHero.',

	source: 'src/components/slide/ProductHero.astro / ProductHero',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'When you want the product visible up front but contained and centred (a framed screenshot under the headline). Use AsymmetricProductHero for an expansive edge-bleeding shot, Hero/CenteredHero when there is no hero visual.',

	recipe: [
		'A SlideFrame (`paper` or `ink`) with a centred copy unit (eyebrow → heading → lede → CTA pair).',
		'Below the copy, a framed scale-to-fit product shot constrained to the content max — a card surface with a 1px border and the soft lift shadow.',
		'Recolour the embedded product UI to `--m-accent`; keep semantic colours (money, severity).',
		'Mobile: the shot stays within the column (already constrained); ensure its inner uses the scale-to-fit transform.',
	],

	dom: `<SlideFrame background="paper">
  <header class="product-hero">
    <div class="copy"><!-- centred copy unit + CTAs --></div>
    <div class="shot" data-product-shot><!-- contained product UI --></div>
  </header>
</SlideFrame>`,

	tokensUsed: [
		{ part: 'band', role: '--m-surface / --m-near-black' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'accent span', role: '--m-accent' },
		{ part: 'shot frame', role: '--m-card / --m-border' },
		{ part: 'recoloured product UI', role: '--m-accent' },
	],

	dimensions: [
		{ name: 'Shot width', value: '≤ content max (1240px)', notes: 'Contained — no edge bleed.' },
		{ name: 'Shot frame', value: 'card + 1px border + lift shadow', notes: '0 26px 56px -38px rgba(15,20,18,.42).' },
	],

	props: [
		{ name: 'background', type: "'paper' | 'ink'", default: "'paper'", description: 'Band.' },
		{ name: 'framed', type: 'boolean', default: 'true', description: 'Wrap the shot in a card frame + lift shadow.' },
	],

	nonFeatures: [
		'No edge bleed — that is AsymmetricProductHero.',
		'Not a flat <img> — the shot is the scale-to-fit DOM pattern.',
	],

	gotchas: [
		'Re-run the product-shot scale on `fonts.ready` + `astro:page-load` or the frame height is wrong.',
		'Keep money/severity colours in the embedded UI — only recolour the accent.',
	],

	motion: ['Reveal copy then shot. Honour reduced motion.'],

	accessibility: ['Hero heading is the page <h1>; give the shot a text alternative.'],

	example: `<SlideFrame background="paper">
  <header class="product-hero">
    <div class="copy">
      <p class="eyebrow">Shipping</p>
      <h1 class="display">Your invoices, <span class="accent">audited</span></h1>
      <p class="lede">Every carrier, every line, automatically.</p>
      <a class="m-btn" data-variant="accent" href="/start">Start a pilot</a>
    </div>
    <div class="shot" data-product-shot>…contained product UI…</div>
  </header>
</SlideFrame>`,
	exampleLang: 'astro',

	porting: ['Centred copy unit + a contained framed product shot. Compose from section-intro + squircle-button + product-shot; the frame is a card surface with the lift shadow.'],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
