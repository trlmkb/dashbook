import type { ComponentSpec } from '../types.js';

export const loader: ComponentSpec = {
	slug: 'loader',
	name: 'Loader',
	category: 'Feedback',
	status: 'stable',
	importPath: "import { Loader } from '@dashfi/svelte/ui/loader'",
	description:
		'Indeterminate spinner. Drop into a button, an empty state, or a card while data loads.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/loader/loader.svelte',

	dimensions: [
		{
			name: 'Outer wrapper',
			value: '32px padding, 8px gap, centered both axes',
			tw: 'my-auto flex flex-col items-center justify-center gap-2 p-8'
		},
		{
			name: 'Glyph container',
			value: '20px tall',
			tw: 'flex h-5 items-center justify-center'
		},
		{
			name: 'Glyph bar',
			value: '4px tall × 20px wide, 2px radius',
			tw: 'h-1 w-5 rounded-xs'
		},
		{ name: 'Message', value: '14px', tw: 'text-sm' },
		{
			name: 'Animation',
			value: '1.6s cubic-bezier(1,0,0,1) infinite',
			notes:
				'Keyframes `loading-animation`: 0% rotate(0deg) → 75% rotate(730deg) → 100% rotate(720deg). Tiny back-and-forth at the end gives the bar a "settle" feel.'
		}
	],

	tokens: [
		{
			name: 'Bar',
			token: { cssVar: '--color-accent-foreground', light: '#123b39', dark: '#ffffff' },
			notes: '`bg-accent-foreground`. Deep jade in light, white in dark.'
		},
		{
			name: 'Message text',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' },
			notes: '`text-muted-foreground`.'
		}
	],

	composition: [
		'Drop into an empty state, a loading card, a button (overrides padding via <code>class</code> prop).',
		"Message is optional but defaults to <code>'Loading, please wait..'</code>."
	],

	nonFeatures: [
		'No size variants. The bar size is brand-tuned.',
		'No color prop. Mono accent-foreground is the canonical tint.',
		'No determinate progress. For known-progress loading, use <code>LinearLoader</code> or <code>Progress</code>.'
	],

	props: [
		{
			name: 'message',
			type: 'string',
			default: "'Loading, please wait..'",
			description: 'Caption shown beneath the rotating bar.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes appended to the outer container.'
		}
	],

	porting: [
		'Single rotating bar at 1.6s cubic-bezier(1,0,0,1) + a muted caption. <code>--color-accent-foreground</code> tint.'
	],

	example: `<script lang="ts">
	import { Loader } from '@dashfi/svelte/ui/loader';
<\/script>

<Loader />`,

	accessibility: [
		'Wrap the loading region with <code>role="status"</code> + <code>aria-live="polite"</code> so screen readers announce the work is in progress.',
		'The message prop is read by AT — keep it concise and meaningful (e.g. "Loading transactions…").'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Canonical is a rotating 4×20 bar in bg-accent-foreground with a 1.6s cubic-bezier rotation keyframe, paired with a text-sm muted caption.'
		}
	]
};
