import type { MarketingPatternSpec } from './types.js';

/**
 * Feature tabs (`marketing_feature_tabs`).
 *
 * Pill tabs whose active background fills left→right as a progress indicator,
 * auto-rotating on a timer and locking on click. The single trickiest invariant:
 * the CSS fill duration must equal the JS advance timeout.
 */
export const featureTabs: MarketingPatternSpec = {
	slug: 'feature-tabs',
	name: 'Feature tabs',
	category: 'Content blocks',
	status: 'stable',
	toolId: 'marketing_feature_tabs',
	description:
		'Pill tabs that auto-rotate: the active tab\'s background fills left→right as a progress bar, advancing on a timer and locking on click. Deep-linkable via a global var + CustomEvent.',

	source: 'src/components/shipping/ShipPillars.tsx (feature-tab island, client:visible) + shipping-audit.css .ship-pil-tab*',

	whenToUse:
		'When a feature section has 3–5 facets you want to showcase in sequence without demanding a click — the auto-rotate previews each, the progress fill signals timing, and a click lets the visitor take control.',

	recipe: [
		'Render the tabs as pills; the active pill has a background that fills left→right via a CSS keyframe (`@keyframes fill { from { width: 0 } to { width: 100% } }` on an inner bar).',
		'Auto-advance on a JS timeout; on each tick, move active to the next tab and restart the fill.',
		'CRITICAL: the CSS fill duration MUST equal the JS advance timeout, or the bar finishes before/after the switch.',
		'On click, lock: cancel the timer, jump to the clicked tab, fill instantly (or hold full).',
		'Deep-link: read an initial tab from a global var; emit a CustomEvent on change so other islands can react and the URL can update.',
		'Render the panel for the active tab below; cross-fade panels on switch.',
	],

	dom: `<div class="ftabs" data-feature-tabs>
  <div class="tablist" role="tablist">
    <button role="tab" aria-selected="true" class="tab">
      Audit <span class="fill"></span>
    </button>
    <button role="tab" aria-selected="false" class="tab">Recover</button>
  </div>
  <div class="panel" role="tabpanel"><!-- active panel --></div>
</div>`,

	tokensUsed: [
		{ part: 'active fill', role: '--m-accent', notes: 'The progress bar inside the active pill.' },
		{ part: 'tab text', role: '--m-fg-strong / --m-fg-muted', notes: 'Active vs idle.' },
		{ part: 'pill border', role: '--m-border' },
		{ part: 'panel surface', role: '--m-card' },
	],

	dimensions: [
		{ name: 'Tab radius', value: '999px', notes: 'Pill tabs.' },
		{ name: 'Rotate interval', value: 'e.g. 5000ms', notes: 'MUST equal the CSS fill keyframe duration.' },
		{ name: 'Fill', value: 'width 0 → 100%', notes: 'Left→right progress inside the active pill.' },
	],

	props: [
		{ name: 'tabs', type: 'Array<{ id; label; panel }>', required: true, description: 'The tab definitions.' },
		{ name: 'interval', type: 'number', default: '5000', description: 'Auto-advance ms — must match the CSS fill duration.' },
		{ name: 'initial', type: 'string', description: 'Tab id to open first (deep-link).' },
	],

	nonFeatures: [
		'Not a carousel — there\'s no infinite swipe; it\'s a fixed small set of facets.',
		'No more than ~5 tabs — beyond that the rotation is too slow to be useful.',
		'No second progress style — the left→right fill is the only progress affordance.',
	],

	gotchas: [
		'The #1 bug: CSS fill duration ≠ JS advance timeout → the bar and the switch desync. Keep them a single shared constant.',
		'Auto-rotation must stop on click (lock) and should pause on hover/focus for usability.',
		'Re-bind the island on `astro:page-load`; clear the timer on teardown or you leak intervals across navigations.',
	],

	motion: [
		'The fill is the motion; under `prefers-reduced-motion: reduce`, disable auto-rotation and the fill — show static tabs, switch only on click.',
	],

	accessibility: [
		'Use real `role="tablist"` / `role="tab"` / `role="tabpanel"` with `aria-selected` and arrow-key navigation.',
		'Auto-rotation is motion + a timing change — pause on focus and respect reduced motion.',
		'Each panel is labelled by its tab (`aria-labelledby`).',
	],

	example: `<!-- island: client:visible -->
<FeatureTabs interval={5000} initial="audit" tabs={tabs} />

/* the shared constant — CSS and JS read the SAME value */
const ROTATE_MS = 5000;            // JS advance timeout
:root { --ftab-fill: 5000ms; }     /* CSS fill keyframe duration */
.tab[aria-selected='true'] .fill { animation: fill var(--ftab-fill) linear; }
@keyframes fill { from { width: 0 } to { width: 100% } }`,
	exampleLang: 'tsx',

	porting: [
		'A controlled tab set with a timer; the active pill hosts a width 0→100% fill bar.',
		'Single source of truth for the duration shared by CSS + JS. Lock on click, pause on hover/focus, respect reduced motion, deep-link via initial + a change event.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook — promoted from the shipping rebuild.' }],
};
