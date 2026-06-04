import type { MarketingPatternSpec } from './types.js';

/**
 * SplitCTA — a two-column conversion block.
 *
 * Copy on one side, an action panel (primary + secondary buttons, optional
 * reassurance chips) on the other. The mid-page "ready to move?" moment.
 */
export const splitCta: MarketingPatternSpec = {
	slug: 'split-cta',
	name: 'SplitCTA',
	category: 'CTAs',
	status: 'stable',
	description:
		'A two-column conversion block: copy unit on one side, an action panel (primary + secondary squircle buttons + optional reassurance chips) on the other. Sits on a cream or ink band.',

	source: 'src/components/rhythm/SplitCTA.astro',
	sourceNote: 'Prop names pulled from the brief; verify against the website source.',

	whenToUse:
		'A mid-page CTA with room for one supporting line and a couple of reassurances. Use CTASection for a centred full-width band, HomeFinalCTA for the oversized page closer, SectionCTA for a lightweight inline nudge.',

	recipe: [
		'Two-column grid inside a SlideFrame (`cream` or `ink`); copy left, action panel right. Add a `reverse` to swap sides.',
		'Copy column: the canonical copy unit (eyebrow → heading with accent span → one-line lede).',
		'Action column: a primary accent squircle button + a secondary outline button, stacked or inline.',
		'Optional: a row of positive-tone chips below the buttons reading as reassurances ("No setup fee", "14-day pilot").',
		'On mobile, collapse to one column with `minmax(0, 1fr)`; action panel drops below the copy.',
	],

	dom: `<SlideFrame background="cream">
  <div class="split-cta">
    <div class="copy"><!-- eyebrow + heading + lede --></div>
    <div class="action">
      <a class="m-btn" data-variant="accent">Start a pilot</a>
      <a class="m-btn" data-variant="outline">Talk to us</a>
    </div>
  </div>
</SlideFrame>`,

	tokensUsed: [
		{ part: 'band', role: '--m-cream / --m-near-black' },
		{ part: 'heading', role: '--m-fg-strong' },
		{ part: 'heading accent', role: '--m-accent' },
		{ part: 'lede', role: '--m-fg-muted' },
		{ part: 'primary CTA', role: '--m-accent' },
		{ part: 'reassurance chips', role: '--m-positive-soft / --m-positive' },
	],

	dimensions: [
		{ name: 'Columns', value: 'minmax(0,1fr) minmax(0,1fr)', notes: 'Collapses to 1 col on mobile.' },
		{ name: 'Column gap', value: '40–64px' },
	],

	variants: [
		{ name: 'default', description: 'Copy left, action right.' },
		{ name: 'reverse', description: 'Action left, copy right (alternate the rhythm).' },
	],

	props: [
		{ name: 'reverse', type: 'boolean', default: 'false', description: 'Swap the copy / action columns.' },
		{ name: 'background', type: "'cream' | 'ink'", default: "'cream'", description: 'Band (via SlideFrame).' },
	],

	nonFeatures: [
		'Not a form — it links out to a flow; no inline email capture here (use a dedicated form pattern).',
		'No more than two buttons — primary + secondary.',
	],

	gotchas: [
		'Put the grid class on a native element, not a child component root (scoped-style gotcha).',
		'Give the mobile single-column grid `minmax(0,1fr)` so the action panel never forces overflow.',
	],

	motion: ['Reveal the columns together (or stagger copy → action). Honour reduced motion.'],

	accessibility: ['DOM order = primary CTA before secondary; one section heading.'],

	example: `<SlideFrame background="cream">
  <div class="split-cta">
    <header class="copy">
      <p class="eyebrow">Get started</p>
      <h2 class="display">Stop overpaying on <span class="accent">shipping</span></h2>
      <p class="lede">Connect your carriers in minutes. We audit the rest.</p>
    </header>
    <div class="action">
      <a class="m-btn" data-variant="accent" href="/start">Start a pilot</a>
      <a class="m-btn" data-variant="outline" href="/contact">Talk to us</a>
    </div>
  </div>
</SlideFrame>`,
	exampleLang: 'astro',

	porting: [
		'Two-column grid; copy unit + action panel. Reuse the section-intro and squircle-button recipes; the band drives colour via the role set.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
