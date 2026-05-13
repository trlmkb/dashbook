<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { collapsible as spec } from '$specs/components/collapsible';
	import {
		Collapsible,
		CollapsibleTrigger,
		CollapsibleContent
	} from '@dashfi/svelte/ui/collapsible';
	import { Button } from '@dashfi/svelte/ui/button';
</script>

<svelte:head><title>Collapsible — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<div style:width="320px">
					<Collapsible>
						<CollapsibleTrigger>
							{#snippet child({ props })}
								<Button variant="ghost" size="sm" {...props}>Show transaction metadata</Button>
							{/snippet}
						</CollapsibleTrigger>
						<CollapsibleContent>
							<div style:padding="12px" style:font-size="13px" style:color="var(--fg-muted)">
								Authorization 4401-902F-X · MCC 7311 · Posted 2026-04-02
							</div>
						</CollapsibleContent>
					</Collapsible>
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
