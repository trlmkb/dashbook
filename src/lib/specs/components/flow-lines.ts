import type { ComponentSpec } from '../types.js';

export const flowLines: ComponentSpec = {
	slug: 'flow-lines',
	name: 'Flow Lines',
	category: 'Display',
	status: 'beta',
	importPath: "import { FlowLines } from '@dashfi/svelte/ui/flow-lines'",
	description:
		'Animated flowing lines — decorative brand element. The vector-map motif as a Svelte component. WebGL fluid simulation, marketing surfaces only.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/flow-lines/',

	dimensions: [
		{
			name: 'Footprint',
			value: 'fills its parent',
			notes: 'Apply `absolute inset-0` + `h-full w-full` at the call site.'
		},
		{
			name: 'Renderer',
			value: 'single <canvas>',
			notes:
				'Sized to the container; resolution presets `low` / `medium` / `high` via simResolution + dyeResolution.'
		},
		{
			name: 'Stacking',
			value: 'low z-index canvas, optional child overlay at z-10',
			notes: 'Optional `children` snippet renders above the canvas at z-10.'
		}
	],

	tokens: [
		{
			name: 'Default gradient',
			notes:
				"`['#123B39', '#0c1614']` (jade-deep → near-black). Overridable via `gradientColors`."
		},
		{
			name: 'Line color',
			notes: 'Caller-controlled via `lineColor` (any CSS color).'
		}
	],

	variants: [
		{
			name: 'auth',
			description: 'Auth-screen preset — calmer flow, deeper field.'
		},
		{
			name: 'hero',
			description: 'Landing hero preset — wider tiles, stronger flow.'
		},
		{
			name: 'subtle',
			description: 'Background-grade preset — fine grid, minimal motion.'
		},
		{
			name: 'vibrant',
			description: 'Maximum motion preset — dense flow, high contrast.'
		}
	],

	composition: [
		'Wrap in a <code>relative</code>, sized container. Apply <code>absolute inset-0 h-full w-full</code> to FlowLines.',
		'Place foreground content as <code>children</code> — they render at z-10 above the canvas.',
		'Pick a preset (<code>auth</code> / <code>hero</code> / <code>subtle</code> / <code>vibrant</code>) for bundled tileSize, flowRadius, resolution, and strength.'
	],

	nonFeatures: [
		'Decorative-only: <code>aria-hidden="true"</code> by default. Never use for state communication.',
		'Marketing surfaces only — auth screens, landing hero, deck covers. Do not use inside product UI.',
		'No CPU fallback. Honors <code>prefers-reduced-motion</code> with a static fallback frame.'
	],

	props: [
		{
			name: 'preset',
			type: "'auth' | 'hero' | 'subtle' | 'vibrant'",
			description:
				'Named visual preset. Sets tileSize, flowRadius, resolution, and flow strength together.'
		},
		{
			name: 'tileSize',
			type: 'number',
			description: 'Spacing of the underlying grid in pixels. Smaller = denser lines.'
		},
		{
			name: 'flowRadius',
			type: 'number',
			description: 'Radius of the velocity splat as a fraction of the viewport (e.g. 0.004).'
		},
		{
			name: 'lineColor',
			type: 'string',
			description: 'Line stroke color — any CSS color string.'
		},
		{
			name: 'gradientColors',
			type: '[string, string]',
			default: "['#123B39', '#0c1614']",
			description: 'Top-to-bottom gradient background behind the line field.'
		},
		{
			name: 'opacity',
			type: 'number',
			default: '1',
			description: 'Opacity of the background gradient layer (0-1).'
		},
		{
			name: 'simResolution',
			type: "'low' | 'medium' | 'high' | number",
			default: "'medium'",
			description: 'Fluid simulation grid resolution. Lower is faster; higher is more detailed.'
		},
		{
			name: 'dyeResolution',
			type: "'low' | 'medium' | 'high' | number",
			default: "'medium'",
			description: 'Dye field resolution for the rendered lines.'
		},
		{
			name: 'autoPlay',
			type: 'boolean',
			default: 'true',
			description:
				'Start the simulation on mount. Use play()/pause()/toggle() to control afterwards.'
		},
		{
			name: 'speed',
			type: 'number',
			default: '1',
			description: 'Flow-strength multiplier — base 500 is multiplied by this value.'
		},
		{
			name: 'reducedMotion',
			type: 'boolean',
			default: 'false',
			description: 'Force the reduced-motion static fallback. Also auto-enabled via prefers-reduced-motion.'
		},
		{
			name: 'aria-hidden',
			type: 'boolean',
			default: 'true',
			description: 'Hide the canvas from assistive tech. Defaults to true since the element is decorative.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the container.'
		},
		{
			name: 'style',
			type: 'string',
			description: 'Inline style string applied to the container.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Optional content rendered above the flow layer with z-index 10.'
		}
	],

	porting: [
		'WebGL fluid sim with vec-field flow + dye layer. Match presets via own renderer if needed. Always emit <code>aria-hidden="true"</code>; always honor <code>prefers-reduced-motion</code>.'
	],

	example: `<script lang="ts">
	import { FlowLines } from '@dashfi/svelte/ui/flow-lines';
<\/script>

<div class="relative h-64">
\t<FlowLines />
\t<!-- content overlay -->
</div>`,

	accessibility: [
		'Decorative-only. The canvas is <code>aria-hidden="true"</code> by default — do not rely on it to communicate state.',
		'Auto-honors <code>prefers-reduced-motion</code> via a static fallback frame.',
		'For users who explicitly disable it via <code>reducedMotion</code>, the canvas freezes at first frame.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. WebGL canvas fluid simulation, four presets (auth/hero/subtle/vibrant). Decorative-only, honors reduced-motion.'
		}
	]
};
