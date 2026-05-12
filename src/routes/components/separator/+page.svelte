<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Separator } from '@dashfi/svelte/ui/separator';

	const propsTable: PropDef[] = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Layout axis. Horizontal renders a 1px height bar; vertical a 1px width bar.'
		},
		{
			name: 'decorative',
			type: 'boolean',
			default: 'true',
			description: 'When true, the element is hidden from assistive tech. Set false for semantic separation.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: '...restProps',
			type: 'SeparatorPrimitive.RootProps',
			description: 'All bits-ui Separator root props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Separator } from '@dashfi/svelte/ui/separator';
<\/script>

<div>Top section</div>
<Separator />
<div>Bottom section</div>

<!-- Vertical -->
<Separator orientation="vertical" />`;
</script>

<svelte:head><title>Separator — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Separator"
	description="Hairline divider. Horizontal by default; pass orientation='vertical' for column dividers."
	importPath="@dashfi/svelte/ui/separator"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="320px">
					<div style:padding="8px 0" style:font-size="14px">Above the line</div>
					<Separator />
					<div style:padding="8px 0" style:font-size="14px">Below the line</div>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
