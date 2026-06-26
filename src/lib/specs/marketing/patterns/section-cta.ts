import type { MarketingPatternSpec } from './types.js';

/**
 * SectionCTA — the lightweight inline end-of-section nudge.
 *
 * A single line of copy + one link/button, sitting on the current surface
 * (no band change). The quiet "learn more" at the foot of a content section.
 */
export const sectionCta: MarketingPatternSpec = {
	slug: 'section-cta',
	name: 'SectionCTA',
	category: 'CTAs',
	status: 'stable',
	description:
		'A lightweight inline CTA that closes a content section: one line of copy + a single link or button, on the current surface (no band change). The quiet counterpart to the dark closing CTA band.',

	source: 'src/components/sections/SectionCTA.astro',
	sourceNote: 'Verify exact prop names against the website source.',

	whenToUse:
		'A low-emphasis nudge at the end of a content section — "see how it works", "read the case study". When you want a CTA without interrupting the section rhythm with a full band. Escalate to SplitCTA / HomeFinalCTA for real conversion moments.',

	recipe: [
		'A single row at the end of a section: a short prompt + one squircle button (accent or outline) or an underlined link.',
		'Stays on the current surface — does NOT open a new band; it is part of the preceding content block.',
		'Keep it to one line; align start (or center to match the section).',
	],

	dom: `<div class="section-cta">
  <p>Want the math? <a class="m-btn" data-variant="outline" href="/how">See how the audit works</a></p>
</div>`,

	tokensUsed: [
		{ part: 'prompt text', role: '--m-fg-muted' },
		{ part: 'button', role: '--m-accent / --m-border-strong', notes: 'accent or outline' },
	],

	dimensions: [{ name: 'Height', value: 'one line', notes: 'Inline; sits within the section padding.' }],

	props: [
		{ name: 'variant', type: "'accent' | 'outline' | 'link'", default: "'outline'", description: 'Button treatment, or a plain underlined link.' },
	],

	nonFeatures: [
		'No band of its own — if you want a surface change, use SplitCTA or the dark closing band.',
		'No heading — it is a one-line nudge, not a section.',
	],

	gotchas: ['Keep it visually quieter than the section above it — it should not compete with the next full CTA band.'],

	accessibility: ['Real <a>/<button>; the prompt text gives the link context (avoid bare "click here").'],

	example: `<div class="section-cta">
  <p class="prompt">
    Want the math?
    <a class="m-btn" data-variant="outline" href="/how">See how the audit works</a>
  </p>
</div>`,
	exampleLang: 'html',

	porting: ['A single inline prompt + button on the current surface; no band. Reuse squircle-button.'],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
