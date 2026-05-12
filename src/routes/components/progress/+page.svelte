<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Progress } from '@dashfi/svelte/ui/progress';

	const propsTable: PropDef[] = [
		{
			name: 'value',
			type: 'number | null',
			description: 'Current progress value. When null, the bar is shown empty. Combined with max to compute fill percentage.'
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
	];

	const example = `<script lang="ts">
	import { Progress } from '@dashfi/svelte/ui/progress';
<\/script>

<Progress value={66} max={100} />`;
</script>

<svelte:head><title>Progress — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Progress"
	description="Determinate progress bar. Pass a value (0–100, or 0–max) to animate fill width."
	importPath="@dashfi/svelte/ui/progress"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="16px">
					<Progress value={20} />
					<Progress value={66} />
					<Progress value={100} />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
