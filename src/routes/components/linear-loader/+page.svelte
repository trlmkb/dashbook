<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { LinearLoader } from '@dashfi/svelte/ui/linear-loader';

	const propsTable: PropDef[] = [
		{
			name: '—',
			type: 'never',
			description:
				'LinearLoader accepts no props. It animates indefinitely; mount it conditionally to show or hide. Wrap in a positioned container to scope the absolute 2px bar.'
		}
	];

	const example = `<script lang="ts">
	import { LinearLoader } from '@dashfi/svelte/ui/linear-loader';
<\/script>

<LinearLoader />`;
</script>

<svelte:head><title>Linear Loader — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Linear Loader"
	description="Indeterminate horizontal bar. Use across the top of a panel or page during background work."
	importPath="@dashfi/svelte/ui/linear-loader"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="320px"><LinearLoader /></div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
