<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Skeleton } from '@dashfi/svelte/ui/skeleton';

	const propsTable: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Tailwind classes for size and shape — e.g. h-4 w-48 rounded-full.'
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
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Native div attributes pass through. The component does not accept children.'
		}
	];

	const example = `<script lang="ts">
	import { Skeleton } from '@dashfi/svelte/ui/skeleton';
<\/script>

<div class="space-y-2">
\t<Skeleton class="h-4 w-48" />
\t<Skeleton class="h-4 w-64" />
\t<Skeleton class="h-4 w-32" />
</div>`;
</script>

<svelte:head><title>Skeleton — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Skeleton"
	description="Placeholder shape for loading states. Match the silhouette of the eventual content."
	importPath="@dashfi/svelte/ui/skeleton"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="12px">
					<Skeleton class="h-12 w-12 rounded-full" />
					<Skeleton class="h-4 w-3/4" />
					<Skeleton class="h-4 w-1/2" />
					<Skeleton class="h-4 w-5/6" />
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
				<li>Pass dimensions via Tailwind classes: <code>h-*</code>, <code>w-*</code>, <code>rounded-*</code>.</li>
				<li>The pulse animation comes from <code>tailwindcss-animate</code> and respects <code>prefers-reduced-motion</code>.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
