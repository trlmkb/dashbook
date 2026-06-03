import type { MarketingPatternSpec } from './types.js';

/**
 * CTASection — the centred full-width CTA band.
 *
 * A single centred message + CTA pair on an emphasis band. The generic
 * mid-to-late-page call to action.
 */
export const ctaSection: MarketingPatternSpec = {
	slug: 'cta-section',
	name: 'CTASection',
	category: 'CTAs',
	status: 'stable',
	description:
		'A centred full-width CTA band: heading + one-line lede + a primary/secondary button pair, on an ink or cobalt emphasis band. The generic call-to-action section.',

	source: 'src/components/slide/CTASection.astro',
	sourceNote: 'Verify exact prop names against the website source.',

	whenToUse:
		'The standard CTA band between content sections. Use SplitCTA when you need a copy/action split, HomeFinalCTA for the oversized page closer.',

	recipe: [
		'A SlideFrame (`ink` for emphasis, or `cobalt` for high energy) with extra vertical padding.',
		'Centre a compact copy unit: heading (one accent phrase) + a single supporting line, max ~40ch.',
		'CTA pair centred below: accent squircle primary + outline secondary.',
		'Keep it short — one claim, one action. No feature lists in a CTA band.',
	],

	dom: `<SlideFrame background="ink">
  <div class="cta-section">
    <h2 class="display">Ready when you are</h2>
    <p class="lede">Connect your carriers and see your first audit in a day.</p>
    <div class="cta">
      <a class="m-btn" data-variant="accent">Start a pilot</a>
      <a class="m-btn" data-variant="outline">Book a demo</a>
    </div>
  </div>
</SlideFrame>`,

	tokensUsed: [
		{ part: 'band', role: '--m-near-black / --m-cobalt' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'accent', role: '--m-accent' },
		{ part: 'lede', role: '--m-fg-muted' },
		{ part: 'primary CTA', role: '--m-accent' },
	],

	dimensions: [
		{ name: 'Alignment', value: 'centred', notes: 'Text + CTAs centred.' },
		{ name: 'Lede width', value: '~40ch' },
		{ name: 'Vertical padding', value: 'generous', notes: 'More than a content band — this is a beat.' },
	],

	variants: [
		{ name: 'ink', description: 'Dark emphasis band (default).' },
		{ name: 'cobalt', description: 'High-energy band — one per page.' },
	],

	props: [
		{ name: 'background', type: "'ink' | 'cobalt'", default: "'ink'", description: 'Band (via SlideFrame).' },
	],

	nonFeatures: [
		'No feature grid or bullets — a CTA band is one claim + one action.',
		'No more than two buttons.',
	],

	gotchas: [
		'On cobalt, the accent jade can fight the cobalt — prefer the ink band unless you specifically want the high-energy beat.',
	],

	motion: ['Reveal the block as one unit. Honour reduced motion.'],

	accessibility: ['One heading; primary CTA precedes secondary in the DOM.'],

	example: `<SlideFrame background="ink">
  <div class="cta-section">
    <h2 class="display">Ready when <span class="accent">you are</span></h2>
    <p class="lede">Connect your carriers and see your first audit in a day.</p>
    <div class="cta">
      <a class="m-btn" data-variant="accent" href="/start">Start a pilot</a>
      <a class="m-btn" data-variant="outline" href="/demo">Book a demo</a>
    </div>
  </div>
</SlideFrame>`,
	exampleLang: 'astro',

	porting: ['Centred copy + CTA pair on an emphasis band; reuse squircle-button. The band flips the role set.'],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
