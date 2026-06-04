import type { MarketingPatternSpec } from './types.js';

/**
 * AsymmetricProductHero — copy + an edge-bleeding product shot.
 *
 * A narrower copy column on one side, a large scale-to-fit product shot
 * bleeding off the opposite viewport edge on the other. The product-led opener.
 */
export const asymmetricProductHero: MarketingPatternSpec = {
	slug: 'asymmetric-product-hero',
	name: 'AsymmetricProductHero',
	category: 'Heroes',
	status: 'stable',
	description:
		'A product-led opener: a narrower copy column on one side, a large scale-to-fit product shot bleeding off the opposite viewport edge on the other. Built on the full-bleed-to-edge layout.',

	source: 'src/components/slide/AsymmetricProductHero.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'When the product visual should lead the page and feel expansive (kissing the viewport edge). Use ProductHero for a contained/centred product shot, Hero/CenteredHero when there is no hero visual.',

	recipe: [
		'A full-width 2-col grid: copy column insets to the content margin; the product-shot column bleeds to the viewport edge (see the full-bleed-to-edge layout recipe).',
		'Copy column: the canonical copy unit + a CTA pair (accent + outline).',
		'Media column: a scale-to-fit product shot (see the product-shot pattern) so it stays crisp at the bleed width.',
		'Mobile: collapse to one column with `minmax(0, 1fr)`; the shot drops below the copy (the 1180px inner would otherwise overflow).',
		'Recolour the embedded product UI to `--m-accent`; keep semantic colours (money, severity).',
	],

	dom: `<div class="aph">              <!-- native element: scoped grid applies -->
  <div class="copy"><!-- copy unit + CTAs --></div>
  <div class="media"><!-- scale-to-fit product shot, bleeds right --></div>
</div>`,

	tokensUsed: [
		{ part: 'band', role: '--m-surface', notes: 'Or ink for a dark opener.' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'accent span', role: '--m-accent' },
		{ part: 'lede', role: '--m-fg-muted' },
		{ part: 'recoloured product UI', role: '--m-accent' },
	],

	dimensions: [
		{ name: 'Columns', value: '~1fr media-bleed', notes: 'Copy insets; media bleeds to the edge.' },
		{ name: 'Product shot width', value: 'up to viewport edge', notes: 'Scale-to-fit from a 1180px inner.' },
	],

	variants: [
		{ name: 'media-right', description: 'Copy left, shot bleeds right (default).' },
		{ name: 'media-left', description: 'Mirror — shot bleeds left.' },
	],

	props: [
		{ name: 'mediaSide', type: "'left' | 'right'", default: "'right'", description: 'Which edge the product shot bleeds to.' },
		{ name: 'background', type: "'paper' | 'ink'", default: "'paper'", description: 'Band.' },
	],

	nonFeatures: [
		'Not a flat <img> hero — the product visual is the scale-to-fit DOM shot.',
		'No symmetric two-column split — the asymmetry (copy inset, media bleed) is the point; use TwoColSlide for an even split.',
	],

	gotchas: [
		'Put the grid/order/overflow classes on a NATIVE element, not a child component root (scoped-style gotcha).',
		'Mobile blow-out: the 1180px shot inner needs `minmax(0, 1fr)` columns or it overflows the page.',
		'Re-run the product-shot scale on `fonts.ready` + `astro:page-load`.',
	],

	motion: ['Reveal the copy; the shot fades/rises with it. Honour reduced motion.'],

	accessibility: ['Hero heading is the page <h1>. Give the product shot a text alternative.'],

	example: `<div class="aph">
  <div class="copy">
    <p class="eyebrow">Shipping</p>
    <h1 class="display">See every <span class="accent">overcharge</span></h1>
    <p class="lede">Your carrier invoices, audited line by line.</p>
    <a class="m-btn" data-variant="accent" href="/start">Start a pilot</a>
  </div>
  <div class="media" data-product-shot>…scale-to-fit product UI…</div>
</div>`,
	exampleLang: 'astro',

	porting: [
		'Full-bleed 2-col: copy insets to the content margin, media bleeds to the viewport edge. Compose from section-intro + squircle-button + product-shot; honour the mobile minmax(0,1fr) rule.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
