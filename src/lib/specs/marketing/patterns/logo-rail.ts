import type { MarketingPatternSpec } from './types.js';

/**
 * LogoRail — a horizontal, evenly-spaced rail of customer logos.
 *
 * Logos render muted and monochrome (low-opacity `--m-fg-subtle`) so they read
 * as quiet social proof, with an optional "Trusted by" eyebrow. Logos are
 * `<img>` slots in production; previews use simple text or box placeholders.
 */
export const logoRail: MarketingPatternSpec = {
	slug: 'logo-rail',
	name: 'LogoRail',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A horizontal, evenly-spaced rail of customer logos rendered muted and monochrome (low-opacity `--m-fg-subtle`), with an optional "Trusted by" eyebrow. Logos are `<img>` slots in production; previews use text or box placeholders.',

	source: 'src/components/sections/LogoRail.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'Reach for LogoRail when you want quiet, at-a-glance social proof — a band of recognisable customer logos under a hero or between sections. Use CaseStudyCard or TestimonialCard when a single customer carries weight, and Marquee when you want the logos to scroll continuously instead of sitting evenly spaced.',

	recipe: [
		'Optional eyebrow: a mono uppercase "Trusted by" label in `--m-fg-subtle`, centred above the rail.',
		'Lay out the logos in an evenly-spaced row — `display: flex` with `justify-content: space-between` (or a `repeat(n, minmax(0, 1fr))` grid) and a generous gap, wrapping on narrow widths.',
		'Each logo is an `<img>` slot, height-capped (~28px) with `width: auto`, sitting on one optical baseline.',
		'Render the logos monochrome and quiet — low-opacity `--m-fg-subtle`, e.g. a grayscale filter plus reduced opacity — so no single brand pulls focus.',
		'Optionally lift opacity to full on hover for a subtle "these are real" cue.',
		'Collapse the rail to a wrapping, centred row under ~720px so logos never crush together.',
	],

	dom: `<section class="logo-rail">
  <p class="eyebrow">Trusted by</p>
  <ul class="rail">
    <li><img src="/logos/northwind.svg" alt="Northwind" /></li>
    <li><img src="/logos/harbor.svg" alt="Harbor Freight Co." /></li>
    <li><img src="/logos/meridian.svg" alt="Meridian" /></li>
  </ul>
</section>`,

	tokensUsed: [
		{ part: 'eyebrow', role: '--m-fg-subtle' },
		{ part: 'logos', role: '--m-fg-subtle', notes: 'Monochrome, low opacity, so logos read as quiet proof.' },
		{ part: 'surface', role: '--m-surface', notes: 'The rail sits directly on the page canvas — no card frame.' },
	],

	dimensions: [
		{ name: 'Logo height', value: '~28px', notes: 'Height-capped; width auto, one optical baseline.' },
		{ name: 'Gap', value: '40–64px', notes: 'Generous; even spacing across the rail.' },
		{ name: 'Opacity', value: '~0.5', notes: 'Muted; optionally lifts to 1 on hover.' },
		{ name: 'Mobile breakpoint', value: '~720px', notes: 'Wraps to a centred multi-row rail.' },
	],

	variants: [
		{ name: 'with eyebrow', description: 'A "Trusted by" eyebrow sits above the rail.' },
		{ name: 'bare', description: 'No eyebrow — just the row of muted logos.' },
		{ name: 'wrapped', description: 'The mobile fallback — logos wrap to a centred multi-row rail.' },
	],

	props: [
		{ name: 'logos', type: '{ src: string; alt: string }[]', required: true, description: 'The customer logos; each renders one height-capped <img> in the rail.' },
		{ name: 'eyebrow', type: 'string', default: "'Trusted by'", description: 'Optional mono label above the rail; omit for a bare rail.' },
		{ name: 'interactive', type: 'boolean', default: 'false', description: 'Lift each logo to full opacity on hover.' },
	],

	nonFeatures: [
		'Not a marquee — the logos sit evenly spaced and static; use Marquee for a continuous scroll.',
		'No full-colour logos — the rail is monochrome and muted on purpose so no brand dominates.',
		'No links by default — logos are proof, not navigation; only wrap one in an `<a href>` when it genuinely links out.',
	],

	gotchas: [
		'Cap logo height (not width) and set `width: auto`, or wide wordmarks and square marks render at wildly different visual weights.',
		'Use `minmax(0, 1fr)` tracks if you lay the rail out as a grid — a fixed-width logo on a `1fr` track can size the column past the viewport on mobile.',
	],

	accessibility: [
		'Each logo `<img>` carries the company name as `alt` text so the proof is announced, not skipped.',
		'The "Trusted by" eyebrow is real text, not baked into an image, so it stays readable and translatable.',
	],

	example: `<section class="logo-rail">
  <p class="eyebrow">Trusted by</p>
  <ul class="rail">
    <li><img src="/logos/northwind.svg" alt="Northwind" /></li>
    <li><img src="/logos/harbor.svg" alt="Harbor Freight Co." /></li>
    <li><img src="/logos/meridian.svg" alt="Meridian" /></li>
    <li><img src="/logos/atlas.svg" alt="Atlas Logistics" /></li>
  </ul>
</section>

<style>
  .logo-rail { background: var(--m-surface); text-align: center; }
  .eyebrow { margin: 0 0 24px; font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--m-fg-subtle); }
  .rail { display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 48px; list-style: none; margin: 0; padding: 0; }
  .rail img { height: 28px; width: auto;
    filter: grayscale(1); opacity: 0.5; }
  @media (max-width: 720px) {
    .rail { justify-content: center; gap: 32px; }
  }
</style>`,
	exampleLang: 'html',

	porting: [
		'An evenly-spaced flex (or `minmax(0, 1fr)` grid) row of height-capped `<img>` logos, rendered grayscale and low-opacity so they read as quiet proof.',
		'An optional mono "Trusted by" eyebrow in `--m-fg-subtle`; the rail sits on `--m-surface` with no card frame and wraps centred on mobile.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
