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
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Root</strong> — bare <code>&lt;div&gt;</code>. No intrinsic dimensions — caller sizes it via <code>class</code> (<code>h-*</code>, <code>w-*</code>, <code>rounded-*</code>).</li>
				<li><strong>Animation</strong> — <code>animate-pulse</code>: 2s ease-in-out infinite, alternates opacity 1 → 0.5 → 1. Respects <code>prefers-reduced-motion</code>.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Background</strong> — <code>bg-muted</code> → <code>--color-muted</code> (light <code>#eceae0</code>, dark <code>#181e1d</code>).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Match the silhouette of the eventual content. One Skeleton per visible text line / shape; not one giant block.</li>
				<li>Replace with real content as soon as data arrives — do not animate the transition.</li>
				<li>Stack vertically with gap; do not nest.</li>
			</ul>

			<div class="docs-h">Not part of Skeleton</div>
			<ul class="docs-list">
				<li>No size prop / no <code>size</code> variants. Caller controls dimensions via Tailwind classes.</li>
				<li>No shimmer / gradient animation. The single <code>animate-pulse</code> motion is intentional restraint.</li>
				<li>No children. The component does not accept content — it's a placeholder only.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Single <code>--color-muted</code> background + pulse animation. That's the entire contract.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch. Canonical is <code>bg-muted animate-pulse</code>; everything else
					(dimensions, radius) is caller-controlled.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
