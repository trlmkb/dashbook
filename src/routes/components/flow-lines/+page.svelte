<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { FlowLines } from '@dashfi/svelte/ui/flow-lines';

	const propsTable: PropDef[] = [
		{
			name: 'preset',
			type: "'auth' | 'hero' | 'subtle' | 'vibrant'",
			description: 'Named visual preset. Sets tileSize, flowRadius, resolution, and flow strength together.'
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
			description: 'Start the simulation on mount. Use play()/pause()/toggle() to control afterwards.'
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
	];

	const example = `<script lang="ts">
	import { FlowLines } from '@dashfi/svelte/ui/flow-lines';
<\/script>

<div class="relative h-64">
\t<FlowLines />
\t<!-- content overlay -->
</div>`;
</script>

<svelte:head><title>Flow Lines — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Flow Lines"
	description="Animated flowing lines — decorative brand element. The vector-map motif as a Svelte component."
	importPath="@dashfi/svelte/ui/flow-lines"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="320px">
			{#snippet children(_m)}
				<div style:position="relative" style:width="100%" style:height="280px" style:overflow="hidden">
					<FlowLines class="absolute inset-0 h-full w-full" />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li>Fills its parent — apply <code>absolute inset-0</code> + <code>h-full w-full</code> at the call site.</li>
				<li>Renders a single <code>&lt;canvas&gt;</code> sized to the container; resolution presets <code>low</code>/<code>medium</code>/<code>high</code>.</li>
				<li><code>z-index</code> low; optional <code>children</code> render above the canvas at z-10.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Default gradient</strong> — <code>['#123B39', '#0c1614']</code> (jade-deep → near-black). Overridable via <code>gradientColors</code>.</li>
				<li><strong>Line color</strong> — caller-controlled via <code>lineColor</code> (any CSS color).</li>
			</ul>
			<div class="docs-h">Presets</div>
			<ul class="docs-list">
				<li><code>auth</code> · <code>hero</code> · <code>subtle</code> · <code>vibrant</code> — predefined tileSize / flowRadius / resolution / strength bundles.</li>
			</ul>
			<div class="docs-h">Not part of FlowLines</div>
			<ul class="docs-list">
				<li>Decorative-only: <code>aria-hidden="true"</code> by default. Never use for state communication.</li>
				<li>Marketing surfaces only — auth screens, landing hero, deck covers.</li>
				<li>Honors <code>prefers-reduced-motion</code> (static fallback).</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>WebGL fluid sim with vec-field flow + dye layer. Match presets via own renderer if needed.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch. WebGL canvas fluid simulation, four presets
					(auth/hero/subtle/vibrant). Decorative-only, honors reduced-motion.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
