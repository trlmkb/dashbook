<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Pill } from '@dashfi/svelte/ui/pill';

	const propsTable: PropDef[] = [
		{
			name: 'type',
			type: "'base' | 'info' | 'success' | 'warning' | 'danger'",
			default: "'base'",
			description: 'Semantic tone. Controls background, text, and border color tokens.'
		},
		{
			name: 'text',
			type: 'string',
			description: 'Plain-text label. Takes precedence over children when both are provided.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Pill content. Rendered when text is not set.'
		},
		{
			name: 'class',
			type: 'string',
			default: "''",
			description: 'Additional Tailwind classes appended to the root span.'
		}
	];

	const example = `<script lang="ts">
	import { Pill } from '@dashfi/svelte/ui/pill';
<\/script>

<Pill type="base">Pending</Pill>
<Pill type="info">New</Pill>
<Pill type="success">+3% cashback</Pill>
<Pill type="warning">Review</Pill>
<Pill type="danger">−$240</Pill>`;
</script>

<svelte:head><title>Pill — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Pill"
	description="Rounded label or count chip. Five semantic types — base, info, success, warning, danger."
	importPath="@dashfi/svelte/ui/pill"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<Pill type="base">Pending</Pill>
				<Pill type="info">New</Pill>
				<Pill type="success">+3% cashback</Pill>
				<Pill type="warning">Review</Pill>
				<Pill type="danger">−$240</Pill>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
