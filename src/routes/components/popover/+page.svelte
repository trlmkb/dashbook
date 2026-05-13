<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { popover as spec } from '$specs/components/popover';
	import { Popover, PopoverTrigger, PopoverContent } from '@dashfi/svelte/ui/popover';
	import { Button } from '@dashfi/svelte/ui/button';
</script>

<svelte:head><title>Popover — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Popover>
					<PopoverTrigger>
						{#snippet child({ props }: { props: Record<string, unknown> })}
							<Button variant="outline" {...props}>Filter</Button>
						{/snippet}
					</PopoverTrigger>
					<PopoverContent>
						<div style:display="flex" style:flex-direction="column" style:gap="8px" style:padding="4px">
							<div style:font-size="13px" style:font-weight="500">Filter by tier</div>
							<div style:font-size="13px" style:color="var(--fg-muted)">Debit · Corporate · Net 60</div>
						</div>
					</PopoverContent>
				</Popover>
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
