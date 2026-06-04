import type { MarketingPatternSpec } from './types.js';

/**
 * Squircle button — the marketing CTA atom (`marketing_button`).
 *
 * Promoted from the `/shipping` rebuild. A 6px squircle, no shadow, with the
 * brand press-scale. Mirrors the product Button's radius + press feel but is a
 * standalone marketing recipe (no @dashfi/svelte dependency).
 */
export const squircleButton: MarketingPatternSpec = {
	slug: 'squircle-button',
	name: 'Squircle button',
	category: 'Building blocks',
	status: 'stable',
	toolId: 'marketing_button',
	description:
		'The marketing CTA. A 6px squircle (`corner-shape: squircle`), no shadow, with an `active:scale(.98)` press. Accent (jade) primary, ink, and outline treatments.',

	source: 'src/styles/global.css (squircle override on the CTA list, border-radius:6px !important) + src/components/primitives/Button.astro; /shipping CTAs .ship-*-primary/-secondary/-submit',

	whenToUse:
		'The single CTA style across marketing pages. Use the accent (jade) treatment for the primary action, ink for a high-contrast alternative, and outline for the secondary action beside a primary.',

	recipe: [
		'`border-radius: 6px; corner-shape: squircle` — the squircle is a progressive enhancement; it degrades to a 6px rounded rect where unsupported and survives minification.',
		'No box-shadow — the press-scale is the affordance.',
		'`transition: transform 150ms; active { transform: scale(0.98); }`.',
		'Type: Bai Jamjuree, 14–15px, medium weight, `white-space: nowrap`.',
		'Padding ~ 12px 20px (default). Inline icons 16px, `shrink-0`.',
		'Colour by treatment: accent fills `--m-accent` with paper text; ink fills `--m-fg-strong`; outline is transparent + `--m-border-strong` + `--m-fg-strong` text.',
	],

	dom: `<a class="m-btn" data-variant="accent" href="/start">
  Start a pilot
</a>`,

	tokensUsed: [
		{ part: 'accent fill', role: '--m-accent', notes: 'Primary CTA background.' },
		{ part: 'accent text', role: 'paper / #FFFFFF', notes: 'On the jade fill.' },
		{ part: 'ink fill', role: '--m-fg-strong', notes: 'High-contrast alternative.' },
		{ part: 'outline border', role: '--m-border-strong' },
		{ part: 'outline text', role: '--m-fg-strong' },
	],

	dimensions: [
		{ name: 'Radius', value: '6px', notes: '`corner-shape: squircle` where supported.' },
		{ name: 'Press', value: 'scale 0.98', tw: 'active:scale-[0.98]', notes: 'The signature affordance.' },
		{ name: 'Transition', value: '150ms' },
		{ name: 'Padding', value: '~12px 20px', notes: 'Default size.' },
		{ name: 'Icon size', value: '16px', notes: 'shrink-0; icons compose inline.' },
		{ name: 'Shadow', value: 'none' },
	],

	variants: [
		{ name: 'accent', description: 'Primary — jade fill, paper text.', tokens: [{ name: 'bg', token: { cssVar: '--m-accent', light: '#2B605C', dark: '#5BB8B0' } }] },
		{ name: 'ink', description: 'High-contrast — ink fill, paper text.', tokens: [{ name: 'bg', token: { cssVar: '--m-fg-strong', light: '#0F1412', dark: '#FAF9F5' } }] },
		{ name: 'outline', description: 'Secondary — transparent, hairline border.', tokens: [{ name: 'border', token: { cssVar: '--m-border-strong', light: 'rgba(37,38,29,.2)', dark: 'rgba(234,230,219,.24)' } }] },
	],

	props: [
		{ name: 'variant', type: "'accent' | 'ink' | 'outline'", default: "'accent'", description: 'Treatment.' },
		{ name: 'href', type: 'string', description: 'Renders as <a> when set; otherwise a <button>.' },
		{ name: 'class', type: 'string', description: 'Extra classes.' },
	],

	nonFeatures: [
		'No drop shadow — flat by design; the press-scale carries the affordance.',
		'No gradient fills — solid role colours only.',
		'No size zoo — one default size; scale type/padding at the call site if a hero needs a larger CTA.',
	],

	gotchas: [
		'`corner-shape: squircle` is not universally supported — always pair it with `border-radius: 6px` so it degrades cleanly.',
		'Keep the press-scale on `transform` (compositor-friendly); animating width/padding causes layout jank.',
	],

	motion: ['`active { transform: scale(0.98) }` over 150ms. Under reduced motion, drop the scale.'],

	accessibility: [
		'Render a real `<a>` (with href) or `<button>` — never a styled `<div>`.',
		'Accent contrast: jade fill + paper text clears AA; the lifted jade on dark also clears AA.',
	],

	example: `<a class="m-btn" data-variant="accent" href="/start">Start a pilot</a>
<a class="m-btn" data-variant="outline" href="/how">How it works</a>

<style>
  .m-btn { display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 20px; font-family: var(--font-sans); font-size: 15px; font-weight: 500;
    border-radius: 6px; corner-shape: squircle; white-space: nowrap;
    transition: transform 150ms var(--easing-out); text-decoration: none; }
  .m-btn:active { transform: scale(0.98); }
  .m-btn[data-variant='accent'] { background: var(--m-accent); color: #fff; }
  .m-btn[data-variant='ink'] { background: var(--m-fg-strong); color: var(--m-surface); }
  .m-btn[data-variant='outline'] { background: transparent;
    border: 1px solid var(--m-border-strong); color: var(--m-fg-strong); }
</style>`,
	exampleLang: 'html',

	porting: [
		'Radius 6px + corner-shape squircle (with fallback), no shadow, active scale 0.98 over 150ms.',
		'Three treatments map to three roles: accent fill, ink fill, outline border+text. Text is medium-weight sans.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook — promoted from the shipping rebuild.' }],
};
