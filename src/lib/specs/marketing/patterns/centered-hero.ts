import type { MarketingPatternSpec } from './types.js';

/**
 * CenteredHero — the default page-opening hero.
 *
 * The simplest, most reusable hero: a centred copy unit over a paper or ink
 * band, with a CTA pair and optional product shot below. The asymmetric and
 * cosmic heroes are variations on this skeleton.
 */
export const centeredHero: MarketingPatternSpec = {
	slug: 'centered-hero',
	name: 'CenteredHero',
	category: 'Heroes',
	status: 'stable',
	description:
		'The default page-opening hero: a centred eyebrow → display heading → lede, a CTA pair, and an optional product shot below. Renders on paper or as an ink band.',

	source: 'src/components/sections/CenteredHero + slide/Hero',
	sourceNote: 'Several hero variants exist (Asymmetric, Product, Cosmic); this is the centred base.',

	whenToUse:
		'The default top-of-page hero when the message is a single claim and a CTA. Use AsymmetricProductHero when a product shot should sit beside the copy, or CosmicHero for a high-drama dark opener.',

	recipe: [
		'Wrap in a SlideFrame (`paper` for a light open, `ink` for a dark, high-contrast open).',
		'Centre the canonical copy unit (eyebrow → display heading with accent span → lede). Constrain the lede to ~60ch.',
		'Below the copy: a CTA pair — one accent squircle button (primary) + one outline button (secondary).',
		'Optional: a scale-to-fit product shot centred below the CTAs.',
		'Wrap the copy block in a reveal target; stagger eyebrow → heading → lede → CTAs.',
	],

	dom: `<SlideFrame background="paper">
  <header class="hero" data-reveal>
    <p class="eyebrow">Shipping</p>
    <h1 class="display">Spend less on <span class="accent">every parcel</span></h1>
    <p class="lede">Audit every carrier invoice automatically.</p>
    <div class="cta">
      <a class="m-btn" data-variant="accent">Start a pilot</a>
      <a class="m-btn" data-variant="outline">How it works</a>
    </div>
  </header>
</SlideFrame>`,

	tokensUsed: [
		{ part: 'band', role: '--m-surface / --m-near-black', notes: 'Via SlideFrame background.' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'accent span', role: '--m-accent' },
		{ part: 'lede', role: '--m-fg-muted' },
		{ part: 'primary CTA', role: '--m-accent', notes: 'Squircle button.' },
	],

	dimensions: [
		{ name: 'Heading', value: 'clamp(2.5rem, 6vw, 4.5rem)', notes: 'Display weight 200, uppercase.' },
		{ name: 'Lede width', value: '~60ch', notes: 'Centred.' },
		{ name: 'CTA gap', value: '~12–16px' },
	],

	variants: [
		{ name: 'paper', description: 'Light open — paper band.' },
		{ name: 'ink', description: 'Dark open — ink band; accent lifts to #5BB8B0.' },
	],

	props: [
		{ name: 'eyebrow', type: 'string', description: 'Tracked mono label.' },
		{ name: 'heading', type: 'string | Snippet', required: true, description: 'Display heading; mark the accent phrase.' },
		{ name: 'lede', type: 'string', description: 'Supporting paragraph (~60ch).' },
		{ name: 'background', type: "'paper' | 'ink'", default: "'paper'", description: 'Hero band.' },
	],

	nonFeatures: [
		'No background video — keep the open fast; use a scale-to-fit product shot if you need a visual.',
		'No stacked sub-claims — one headline claim, per the brand voice.',
		'No more than two CTAs — primary + secondary.',
	],

	gotchas: [
		'Put grid/flex/order classes on the native hero element, not on a child component root (scoped-style gotcha).',
		'On the ink variant, let the accent come from `--m-accent` so it lifts automatically; don\'t hardcode jade.',
	],

	motion: ['Reveal-stagger the copy + CTAs. Honour reduced motion (final state, no transform).'],

	accessibility: [
		'The hero heading is the page `<h1>` — exactly one per page.',
		'CTA order in the DOM matches visual priority (primary first) for keyboard + screen-reader users.',
	],

	example: `---
import SlideFrame from '../components/slide/SlideFrame.astro';
---
<SlideFrame background="paper">
  <header class="hero" data-reveal>
    <p class="eyebrow">Shipping</p>
    <h1 class="display">Spend less on <span class="accent">every parcel</span></h1>
    <p class="lede">Audit every carrier invoice automatically. Recover what you overpaid.</p>
    <div class="cta">
      <a class="m-btn" data-variant="accent" href="/start">Start a pilot</a>
      <a class="m-btn" data-variant="outline" href="/how">How it works</a>
    </div>
  </header>
</SlideFrame>`,
	exampleLang: 'astro',

	porting: [
		'A centred copy unit + CTA pair inside a full-bleed band; everything is composed from the SlideFrame, section-intro, and squircle-button recipes.',
		'Heading is display weight 200; the band drives the colour scheme via the role set.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
