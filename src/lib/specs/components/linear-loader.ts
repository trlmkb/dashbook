import type { ComponentSpec } from '../types.js';

export const linearLoader: ComponentSpec = {
	slug: 'linear-loader',
	name: 'Linear Loader',
	category: 'Feedback',
	status: 'stable',
	importPath: "import { LinearLoader } from '@dashfi/svelte/ui/linear-loader'",
	description:
		'Indeterminate horizontal progress bar. Use across the top of a panel or page during background work.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/linear-loader/linear-loader.svelte',

	dimensions: [
		{ name: 'Bar', value: '2px tall, 100% wide', tw: 'h-[2px] w-full' },
		{
			name: 'Positioning',
			value: 'absolute, all edges pinned',
			tw: 'absolute right-0 bottom-0 left-0',
			notes: 'Caller must place it inside a `relative`-positioned parent.'
		},
		{
			name: 'Overflow',
			value: 'clipped',
			tw: 'overflow-hidden',
			notes: "So the animated bar doesn't escape."
		},
		{
			name: 'Mount',
			value: 'fade transition',
			notes: 'Fades in/out via Svelte `fade` transition.'
		},
		{
			name: 'Animation',
			value: '1.2s linear infinite slideRight',
			notes:
				'Keyframe `slideRight`: translateX(-100%) scaleX(0.8) → translateX(100%) scaleX(0.1). Bar scales down as it travels right, suggesting acceleration. transform-origin: left center.'
		}
	],

	tokens: [
		{
			name: 'Bar fill',
			token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' },
			notes: '`bg-brand`. Jade.'
		},
		{
			name: 'Track',
			notes: "None. The bar sits over the parent's background (transparent track)."
		}
	],

	composition: [
		'Place at the bottom of a top-bar / card / panel. Mount conditionally to show or hide.',
		'Wrap in a positioned container — the bar uses <code>absolute</code> with all four edges pinned.'
	],

	nonFeatures: [
		'No props. Indeterminate-only. For determinate progress use <code>Progress</code>.',
		'No color / size / thickness props. 2px jade bar is brand-canonical.',
		"No track styling. Caller's surface shows through."
	],

	props: [
		{
			name: '—',
			type: 'never',
			description:
				'LinearLoader accepts no props. It animates indefinitely; mount it conditionally to show or hide. Wrap in a positioned container to scope the absolute 2px bar.'
		}
	],

	porting: [
		'2px absolute-positioned bar in <code>--color-brand</code>, 1.2s linear sliding-and-scaling animation.'
	],

	example: `<script lang="ts">
	import { LinearLoader } from '@dashfi/svelte/ui/linear-loader';
<\/script>

<LinearLoader />`,

	accessibility: [
		'For assistive tech, wrap the loader region with <code>role="status"</code> and an <code>aria-live="polite"</code> hint that work is in progress.',
		'Loader is purely visual; expose progress textually elsewhere when the user needs feedback.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). 2px absolute-positioned bar in bg-brand with a 1.2s linear translateX + scaleX keyframe animation. No props.'
		}
	]
};
