<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { item as spec } from '$specs/components/item';
	import {
		Item,
		ItemContent,
		ItemTitle,
		ItemDescription,
		ItemMedia,
		ItemActions
	} from '@dashfi/svelte/ui/item';
	import { Button } from '@dashfi/svelte/ui/button';
	import CreditCard from '@lucide/svelte/icons/credit-card';
</script>

<svelte:head><title>Item — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="540px">
					<Item>
						<ItemMedia>
							<CreditCard size={20} strokeWidth={1.5} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Q2 Meta · brand campaign</ItemTitle>
							<ItemDescription>•••• 4482 · $12,408 of $50,000 used</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button size="sm" variant="outline">Manage</Button>
						</ItemActions>
					</Item>
				</div>
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
