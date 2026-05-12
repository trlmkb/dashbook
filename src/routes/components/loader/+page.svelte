<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Loader } from '@dashfi/svelte/ui/loader';

	const propsTable: PropDef[] = [
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
	];

	const example = `<script lang="ts">
	import { Loader } from '@dashfi/svelte/ui/loader';
<\/script>

<Loader />`;
</script>

<svelte:head><title>Loader — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Loader"
	description="Indeterminate spinner. Drop into a button, an empty state, or a card while data loads."
	importPath="@dashfi/svelte/ui/loader"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Loader />
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
