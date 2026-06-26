import type { MarketingPatternSpec } from './types.js';

/**
 * HomeFinalCTA — the oversized page closer.
 *
 * The last thing on the homepage: an oversized display heading, a single
 * primary CTA, on a dark ink band with generous padding. Maximum emphasis.
 */
export const homeFinalCta: MarketingPatternSpec = {
	slug: 'home-final-cta',
	name: 'HomeFinalCTA',
	category: 'CTAs',
	status: 'stable',
	description:
		'The oversized page closer: a large display heading, one primary CTA (optional secondary), on a dark ink band with generous padding. The final beat of the homepage.',

	source: 'src/components/sections/HomeFinalCTA.astro',
	sourceNote: 'Verify exact prop names against the website source.',

	whenToUse:
		'The very last section of a homepage or long landing page — the maximum-emphasis closer. One per page. Use SplitCTA for mid-page CTAs.',

	recipe: [
		'A section band (`ink`) with the largest vertical padding on the page — this is the closing beat.',
		'An oversized centred display heading (push the clamp() max higher than a normal section), with one accent phrase.',
		'A single primary accent squircle button (optionally one outline secondary). No more.',
		'Optionally a single reassurance line below in `--m-fg-subtle`.',
	],

	dom: `<section class="m-band" data-band="ink">
  <div class="home-final-cta">
    <h2 class="display-xl">Spend less on <span class="accent">everything you ship</span></h2>
    <a class="m-btn" data-variant="accent">Start a pilot</a>
    <p class="reassure">No setup fee. Cancel anytime.</p>
  </div>
</section>`,

	tokensUsed: [
		{ part: 'band', role: '--m-near-black' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'accent', role: '--m-accent' },
		{ part: 'primary CTA', role: '--m-accent' },
		{ part: 'reassurance', role: '--m-fg-subtle' },
	],

	dimensions: [
		{ name: 'Heading', value: 'clamp(3rem, 8vw, 6rem)', notes: 'Larger than a normal section heading.' },
		{ name: 'Vertical padding', value: 'largest on the page', notes: 'This is the closing beat.' },
		{ name: 'CTAs', value: '1 (optionally 2)', notes: 'Primary accent; secondary outline at most.' },
	],

	props: [
		{ name: 'secondary', type: 'boolean', default: 'false', description: 'Show a secondary outline button beside the primary.' },
	],

	nonFeatures: [
		'Not mid-page — one HomeFinalCTA per page, at the very end.',
		'No feature content — heading + CTA only.',
	],

	gotchas: [
		'Don\'t reuse the same oversized heading scale elsewhere — its size is what signals "this is the end".',
		'Accent comes from `--m-accent` so it lifts on the ink band automatically.',
	],

	motion: ['Reveal-rise the heading then the CTA. Honour reduced motion.'],

	accessibility: ['Single heading; if two CTAs, primary precedes secondary in the DOM.'],

	example: `<section class="m-band" data-band="ink">
  <div class="home-final-cta">
    <h2 class="display-xl">Spend less on <span class="accent">everything you ship</span></h2>
    <a class="m-btn" data-variant="accent" href="/start">Start a pilot</a>
    <p class="reassure">No setup fee. Cancel anytime.</p>
  </div>
</section>`,
	exampleLang: 'astro',

	porting: ['Oversized centred heading + single CTA on the ink band, max page padding. Reuse squircle-button on a Section-rhythm ink band.'],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
