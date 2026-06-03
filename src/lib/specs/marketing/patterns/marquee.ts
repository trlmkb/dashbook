import type { MarketingPatternSpec } from './types.js';

/**
 * Marquee — the infinite horizontal scroller.
 *
 * A row of logos / words / phrases that loops forever by translating a
 * duplicated track by -50%. Pauses on hover and stops entirely under reduced
 * motion. The single invariant: the track is duplicated so the wrap is seamless.
 */
export const marquee: MarketingPatternSpec = {
	slug: 'marquee',
	name: 'Marquee',
	category: 'Rhythm & connectors',
	status: 'stable',
	description:
		'A horizontally scrolling, infinitely looping row of logos, words, or phrases. A duplicated track translates -50% on a CSS keyframe; it pauses on hover and stops entirely under reduced motion, with optionally mask-faded edges.',

	source: 'src/components/rhythm/Marquee.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'Use a Marquee for a low-stakes ambient band — a logo wall, a list of carriers, or a string of value phrases — where the motion signals "and many more" without demanding attention. Use a static LogoRail instead when the set is small and order matters, or when the band must not move.',

	recipe: [
		'Render a track containing the items once, then duplicate the exact set inline so the two halves are identical (`[...items, ...items]`).',
		'Animate the track with a CSS keyframe `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }` — translating by -50% lands the duplicate exactly where the original started for a seamless loop.',
		'Set a linear, infinite animation; drive the speed by duration (longer = slower). Keep the wrapper `overflow: hidden`.',
		'Pause on hover/focus: `:hover .track { animation-play-state: paused }` so a visitor can read a logo.',
		'CRITICAL: under `@media (prefers-reduced-motion: reduce)` set `animation: none` so the track is static — no animation at all.',
		'Optional edge fade: a `mask-image` linear-gradient (transparent → opaque → transparent) on the wrapper so items dissolve at both edges.',
	],

	dom: `<div class="marquee" aria-label="Trusted by">
  <div class="track" aria-hidden="true">
    <!-- the set, then an identical duplicate -->
    <span class="item">UPS</span><span class="item">FedEx</span><span class="item">USPS</span>
    <span class="item">UPS</span><span class="item">FedEx</span><span class="item">USPS</span>
  </div>
</div>`,

	tokensUsed: [
		{ part: 'items', role: '--m-fg-muted', notes: 'Logos/words; mono-ish for word marquees.' },
		{ part: 'edge fade', role: '--m-surface', notes: 'mask-image to the surface colour at both edges.' },
		{ part: 'optional divider/dot', role: '--m-border', notes: 'Hairline separator between phrases.' },
	],

	dimensions: [
		{ name: 'Translate', value: '0 → -50%', notes: 'Half the duplicated track = one seamless loop.' },
		{ name: 'Duration', value: 'e.g. 30–60s', notes: 'Longer is slower; the only speed control.' },
		{ name: 'Timing', value: 'linear infinite', notes: 'Constant speed; no easing on a loop.' },
		{ name: 'Edge fade', value: '~48–80px', notes: 'mask-image gradient width at each edge.' },
		{ name: 'Item gap', value: '~40–64px', notes: 'Generous spacing between items.' },
	],

	variants: [
		{ name: 'logos', description: 'A row of partner/carrier logos — the logo-wall use.' },
		{ name: 'words', description: 'A string of value phrases or keywords, mono-ish, dot/hairline separated.' },
	],

	props: [
		{ name: 'items', type: 'string[] | { src: string; alt: string }[]', required: true, description: 'The set to loop; duplicated internally for the seamless wrap.' },
		{ name: 'duration', type: 'number', default: '40', description: 'Loop duration in seconds — larger is slower.' },
		{ name: 'fade', type: 'boolean', default: 'true', description: 'Mask-fade the two edges.' },
	],

	nonFeatures: [
		'Not a carousel — there are no controls, no snapping, no pagination; it is an ambient loop, not a navigable component.',
		'Not interactive content — items are not links you are expected to click while moving; pause-on-hover exists for reading, not selecting.',
		'No reverse-on-scroll or scroll-jacking — the loop is autonomous and constant-speed.',
	],

	gotchas: [
		'Duplicate the EXACT same set inline (translating -50% assumes two identical halves). If the second half differs or is missing, the wrap visibly jumps.',
		'Pause on hover by toggling `animation-play-state`, not by removing the animation — restarting the keyframe snaps the track back to the start.',
	],

	motion: [
		'The loop is the motion: a single CSS keyframe translating the duplicated track `translateX(0) → translateX(-50%)`, linear and infinite.',
		'REQUIRED reduced-motion stop: under `@media (prefers-reduced-motion: reduce)` set `animation: none` so the marquee is fully static — no animation, no auto-scroll.',
		'Pause on hover/focus (`animation-play-state: paused`) so a visitor can read an individual item.',
		'Any figure shown in a word marquee is editorial copy derived from real data — never an animated count-up that implies a live number.',
	],

	accessibility: [
		'Label the region (`aria-label`) and mark the duplicated track `aria-hidden` so a screen reader hears the set once, not twice.',
		'Honour reduced motion (no animation) and pause on focus — continuous motion next to text is a vestibular and readability hazard.',
	],

	example: `<div class="marquee" aria-label="Carriers we audit">
  <div class="track" aria-hidden="true">
    <span class="item">UPS</span><span class="item">FedEx</span><span class="item">USPS</span><span class="item">DHL</span>
    <span class="item">UPS</span><span class="item">FedEx</span><span class="item">USPS</span><span class="item">DHL</span>
  </div>
</div>

<style>
  .marquee { overflow: hidden;
    mask-image: linear-gradient(90deg, transparent, #000 64px, #000 calc(100% - 64px), transparent); }
  .track { display: flex; gap: 56px; width: max-content;
    animation: marquee 40s linear infinite; }
  .marquee:hover .track { animation-play-state: paused; }
  .item { font-family: var(--font-mono); font-size: 14px; color: var(--m-fg-muted); white-space: nowrap; }
  @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  @media (prefers-reduced-motion: reduce) { .track { animation: none; } }
</style>`,
	exampleLang: 'html',

	porting: [
		'Render the set twice in one flex track at `width: max-content`, animate `translateX(0 → -50%)` linear + infinite; the -50% relies on the two halves being identical.',
		'Pause on hover via `animation-play-state`, mask-fade the edges to the surface colour, and ship the `prefers-reduced-motion: reduce` → `animation: none` static fallback.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
