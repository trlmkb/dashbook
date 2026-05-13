<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { scrollArea as spec } from '$specs/components/scroll-area';
	import { ScrollArea } from '@dashfi/svelte/ui/scroll-area';

	const items = Array.from({ length: 30 }, (_, i) => ({
		ref: 'TX-' + (4400 + i).toString(16).toUpperCase(),
		amount: (1240 + i * 17).toLocaleString()
	}));
</script>

<svelte:head><title>Scroll Area — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="320px">
			{#snippet children(_m)}
				<ScrollArea class="h-64 w-72 border border-border">
					<div style:padding="12px">
						{#each items as item (item.ref)}
							<div
								style:display="flex"
								style:justify-content="space-between"
								style:padding="6px 0"
								style:font-size="13px"
								style:font-family="var(--font-mono)"
							>
								<span>{item.ref}</span>
								<span class="tabular-nums">${item.amount}</span>
							</div>
						{/each}
					</div>
				</ScrollArea>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={spec.example} language="svelte" />
	{/snippet}

	{#snippet docs()}
		<PropsTable props={spec.props} />
	{/snippet}

	{#snippet anatomy()}
		<Anatomy {spec} />
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				{#each spec.accessibility as item (item)}
					<li>{@html item}</li>
				{/each}
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			{#each spec.changelog as entry (entry.version)}
				<li>
					<span class="docs-cl-when">{entry.version} — {entry.date}</span>
					<p>{entry.note}</p>
				</li>
			{/each}
		</ul>
	{/snippet}
</ComponentLayout>
