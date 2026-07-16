import type { ComponentSpec } from '../types.js';

/**
 * Progress — determinate progress bar.
 *
 * 8px tall track in --color-brand at 10% alpha, fill at 100% alpha.
 * Fill mechanism is translateX-based with a 700ms ease-out transition.
 */
export const progress: ComponentSpec = {
	slug: 'progress',
	name: 'Progress',
	category: 'Feedback',
	status: 'stable',
	importPath: "import { Progress } from '@dashfi/svelte/ui/progress'",
	description: 'Determinate progress bar. 0–100% with optional label.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/progress/progress.svelte',

	dimensions: [
		{ name: 'Height', value: '8px', tw: 'h-2', notes: 'Fixed.' },
		{
			name: 'Width',
			value: '100% of parent',
			tw: 'w-full',
			notes: 'Constrain at the parent.'
		},
		{
			name: 'Radius',
			value: 'rounded-full',
			tw: 'rounded-full',
			notes: '`overflow-hidden` so the indicator clips cleanly.'
		},
		{
			name: 'Element',
			value: '<div role="progressbar">',
			notes:
				"bits-ui's <code>Progress.Root</code> renders a single <code>&lt;div role=\"progressbar\"&gt;</code> with a single inner indicator <code>&lt;div&gt;</code>. No labels, no segments."
		}
	],

	tokens: [
		{
			name: 'Track',
			notes:
				'`bg-brand/10` — `--color-brand` at 10% alpha (light jade #2b605c·10%, dark jade #5bb8b0·10%).'
		},
		{
			name: 'Indicator',
			token: { cssVar: '--color-brand', light: '#2b5f5b', dark: '#46b9af' },
			notes: 'The fill is the jade brand colour, not monochrome `--color-primary`.'
		},
		{
			name: 'Transition',
			notes:
				'Indicator is *always* 100% width; visual fill is driven by `transform: translateX(-(100 − pct)%)` on the indicator. `transition-transform duration-700 ease-out`. On mount the indicator starts at `translateX(-100%)` and slides to its target value via `requestAnimationFrame` for a one-shot entrance animation.'
		}
	],

	composition: [
		'Drop into a column-flex layout next to a numeric label or status pill: <code>&lt;div&gt;Used $200 of $1,000&lt;/div&gt; &lt;Progress value={20} /&gt;</code>.',
		'For indeterminate progress, prefer <code>Spinner</code> or <code>LinearLoader</code> — Progress is determinate-only.',
		'Set <code>max</code> explicitly when the natural max is not 100 (e.g. quota tracking).'
	],

	nonFeatures: [
		'No size / height variants. 8px is the system rhythm.',
		'No colour variants. Track is <code>brand/10</code>, fill is <code>brand</code> — no <code>primary</code> or destructive tints. The previous primary-based recipe is gone.',
		'No segmented / step variant. For step indicators, use <code>Stepper</code>.',
		'No indeterminate state. Use <code>Spinner</code> or <code>LinearLoader</code>.',
		'No built-in label / caption.'
	],

	props: [
		{
			name: 'value',
			type: 'number | null',
			description:
				'Current progress value. When null, the bar is shown empty. Combined with max to compute fill percentage.'
		},
		{
			name: 'max',
			type: 'number',
			default: '100',
			description: 'Maximum value that represents 100% fill.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		}
	],

	porting: [
		'8px tall <code>rounded-full</code> track with <code>--color-brand</code>·10% bg, a full-width child indicator at <code>--color-brand</code>·100% positioned via <code>translateX(-(100 − pct)%)</code>. 700ms <code>ease-out</code> transform transition; defer the initial transform one frame so it animates in on mount.'
	],

	example: `<script lang="ts">
	import { Progress } from '@dashfi/svelte/ui/progress';
<\/script>

<Progress value={66} max={100} />`,

	accessibility: [
		'Renders as <code>role="progressbar"</code> via bits-ui. AT consumes <code>aria-valuenow</code> / <code>aria-valuemax</code>.',
		'Pair with adjacent text for the human-readable status — Progress itself has no label.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Fill is now jade brand (bg-brand) over bg-brand/10 track — not the previous primary/primary/20 recipe. The fill mechanism switched from width-animation to a translateX-based transform with a 700ms ease-out timing and a one-shot mount animation. The previous v0.3.1 anatomy referenced a stale branch and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-13',
			note: 'Anatomy added: h-2 rounded-full track in --color-primary/20, indicator in --color-primary. Composition rule (determinate only) and explicit non-features (no colour variants, no indeterminate state). The jade fill on a muted brand background — canonical uses --color-primary. Matches the Input precedent.'
		}
	]
};
