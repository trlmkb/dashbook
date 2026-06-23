import type { MarketingMotionFoundation } from './types.js';

/**
 * Marketing motion — reveal-on-scroll, ambient loops, smooth anchors.
 *
 * Marketing motion is quieter than it looks: one entrance (fade-rise), a couple
 * of ambient loops, and smooth in-page anchoring. Everything honours
 * `prefers-reduced-motion`.
 */
export const marketingMotionFoundation: MarketingMotionFoundation = {
	patterns: [
		{
			name: 'Reveal (fade-rise)',
			summary:
				'The standard section entrance. An IntersectionObserver toggles `data-reveal` → `data-revealed`; an optional `delay` staggers siblings.',
			recipe:
				"[data-reveal] { opacity: 0; transform: translateY(16px); transition: opacity/transform 900ms var(--ease-out); } [data-reveal][data-revealed='true'] { opacity: 1; transform: none; } JS adds [data-revealed='true'] on intersection; stagger via per-item delay.",
			reducedMotion: 'Render in the final state (opacity 1, no transform); skip the transition.',
		},
		{
			name: 'Ambient loops',
			summary:
				'Subtle continuous motion — orbit/float for decorative elements, pulse/spin for live dots. Desync per item so they never march in lockstep.',
			recipe:
				'CSS keyframes with a long duration and per-item `animation-delay`; keep amplitude small (a few px / a few degrees).',
			reducedMotion: 'animation: none — hold the static frame.',
		},
		{
			name: 'In-page anchors',
			summary: 'Smooth scroll to a target, offset for the sticky header.',
			recipe:
				"el.scrollIntoView({ behavior: 'smooth' }); target gets `scroll-margin-top: <sticky-header-height>`. Wire in a small island, guard against double-bind, re-run on `astro:page-load`.",
			reducedMotion: "Use behavior: 'auto' (instant jump) — still offset by scroll-margin-top.",
		},
	],

	reducedMotion: [
		'Global `@media (prefers-reduced-motion: reduce)` plus a per-animation `animation: none` / final-state fallback.',
		'Honour it for loops, count-ups, feature-tab rotation, and smooth scroll.',
	],

	rules: [
		'Reveal is the default entrance — do not invent per-section bespoke entrances.',
		'Feature-tab auto-rotation: the CSS keyframe duration MUST equal the JS advance timeout, or the progress fill desyncs from the tab switch.',
		'Re-bind scroll/animation islands on `astro:page-load` (Astro view transitions) and guard against double-binding.',
		'Drive any displayed figure (bars, counters) from state — never hardcode values that imply they update.',
	],
};
