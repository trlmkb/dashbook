<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Spinner } from '@dashfi/svelte/ui/spinner';

	const propsTable: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			default: "'h-2'",
			description: 'Tailwind classes merged onto the SVG. Override sizing via h-* / w-* utilities. Color follows currentColor.'
		}
	];

	const example = `<script lang="ts">
	import { Spinner } from '@dashfi/svelte/ui/spinner';
<\/script>

<Spinner />`;
</script>

<svelte:head><title>Spinner — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Spinner"
	description="Compact rotating indicator for indeterminate work. Smaller than Loader — fits inline next to text."
	importPath="@dashfi/svelte/ui/spinner"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<Spinner />
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
