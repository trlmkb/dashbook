<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { tabs as spec } from '$specs/components/tabs';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '@dashfi/svelte/ui/tabs';
</script>

<svelte:head><title>Tabs — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Composition" minHeight="280px">
				{#snippet children(_m)}
					<div style:width="100%" style:max-width="600px">
						<Tabs value="overview">
							<TabsList>
								<TabsTrigger value="overview">Overview</TabsTrigger>
								<TabsTrigger value="transactions">Transactions</TabsTrigger>
								<TabsTrigger value="rewards">Rewards</TabsTrigger>
							</TabsList>
							<TabsContent value="overview">
								<div style:padding="16px 0" style:font-size="14px">Overview pane.</div>
							</TabsContent>
							<TabsContent value="transactions">
								<div style:padding="16px 0" style:font-size="14px">Transactions pane.</div>
							</TabsContent>
							<TabsContent value="rewards">
								<div style:padding="16px 0" style:font-size="14px">Rewards pane.</div>
							</TabsContent>
						</Tabs>
					</div>
				{/snippet}
			</PreviewCanvas>
		</div>
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
