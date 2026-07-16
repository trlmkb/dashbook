import type { MarketingPatternSpec } from './types.js';

/**
 * CosmicHero — the high-drama dark opener.
 *
 * A dark band with an ambient animated backdrop (a drifting accent glow), an
 * oversized display heading, and a single CTA. The maximum-atmosphere opener.
 */
export const cosmicHero: MarketingPatternSpec = {
	slug: 'cosmic-hero',
	name: 'CosmicHero',
	category: 'Heroes',
	status: 'stable',
	description:
		'A high-drama dark opener: an ink band with an ambient drifting accent glow behind an oversized display heading and a single CTA. Maximum atmosphere — reduced-motion-safe.',

	source: 'src/components/slide/CosmicHero.astro',
	sourceNote:
		'Prop signatures pulled from the brief; verify against the website source. No live usage on dash.fi as of 2026-07 — reserved for campaign surfaces (e.g. a launch or funding-round landing page) rather than the current evergreen site flow.',
	sourceRevision: 'a5be701',
	lastVerifiedAt: '2026-07-16',
	verificationStatus: 'stale',

	whenToUse:
		'The statement opener for a homepage or campaign page where atmosphere matters. Use sparingly — one per site flow. Use Hero/CenteredHero for calmer openers, ProductHero when the product should lead.',

	recipe: [
		'A SlideFrame `ink` (sets `data-marketing-dark`) with a decorative backdrop layer behind the content.',
		'Backdrop: a soft radial accent glow (`--m-accent` at low alpha) that drifts on a slow ambient loop; keep amplitude small and desync if multiple.',
		'Foreground: a centred oversized display heading (one accent phrase) + a single primary CTA.',
		'Backdrop is decorative and `aria-hidden`; content sits above it with `position: relative`.',
		'Under `prefers-reduced-motion: reduce`, hold the glow static (no drift).',
	],

	dom: `<SlideFrame background="ink">
  <div class="cosmic">
    <div class="backdrop" aria-hidden="true"></div>
    <div class="content">
      <h1 class="display-xl">Ship at the <span class="accent">speed of light</span></h1>
      <a class="m-btn" data-variant="accent">Start a pilot</a>
    </div>
  </div>
</SlideFrame>`,

	tokensUsed: [
		{ part: 'band', role: '--m-near-black' },
		{ part: 'glow', role: '--m-accent', notes: 'Low-alpha radial; decorative.' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'accent span', role: '--m-accent' },
		{ part: 'primary CTA', role: '--m-accent' },
	],

	dimensions: [
		{ name: 'Heading', value: 'clamp(2.5rem, 8vw, 5.5rem)', notes: 'Oversized, display weight 200.' },
		{ name: 'Vertical padding', value: 'large', notes: 'A full-height-ish atmospheric beat.' },
	],

	props: [
		{ name: 'glow', type: "'jade' | 'cobalt'", default: "'jade'", description: 'Backdrop glow hue.' },
	],

	nonFeatures: [
		'No video backdrop — keep the open fast; the glow is CSS.',
		'No body paragraph — heading + CTA only; atmosphere carries it.',
		'Not for every page — one statement opener per flow.',
	],

	gotchas: [
		'Backdrop must be `aria-hidden` and behind `position: relative` content, or it can capture pointer events / confuse the reading order.',
		'Honour reduced motion — hold the glow static; never ship an animation with no reduced-motion fallback.',
		'Accent glow + heading accent both read `--m-accent` so they lift correctly on the ink band.',
	],

	motion: [
		'Slow ambient drift/float on the glow (long duration, small amplitude).',
		'Reduced motion: `animation: none`, static glow.',
	],

	accessibility: ['Hero heading is the page <h1>. Backdrop is decorative (aria-hidden). Contrast of heading/CTA over the glow stays ≥ 4.5:1.'],

	example: `<SlideFrame background="ink">
  <div class="cosmic">
    <div class="backdrop" aria-hidden="true"></div>
    <div class="content">
      <h1 class="display-xl">Ship at the <span class="accent">speed of light</span></h1>
      <a class="m-btn" data-variant="accent" href="/start">Start a pilot</a>
    </div>
  </div>
</SlideFrame>`,
	exampleLang: 'astro',

	porting: [
		'Ink band + a decorative low-alpha radial accent glow on a slow loop, oversized centred heading + one CTA. Reduced-motion holds the glow static.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
