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
			<ul class="docs-list">
				<li>For marketing surfaces only — auth screens, decks, landing hero.</li>
				<li>Honors <code>prefers-reduced-motion</code>: animation pauses to a static frame.</li>
				<li>See <a href="/brand/photography">Brand / Photography</a> for the underlying motif rationale.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
