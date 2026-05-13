<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { pagination as spec } from '$specs/components/pagination';
	import {
		Pagination,
		PaginationContent,
		PaginationItem,
		PaginationNextButton,
		PaginationPrevButton,
		PaginationEllipsis
	} from '@dashfi/svelte/ui/pagination';
</script>

<svelte:head><title>Pagination — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<Pagination count={120} perPage={10}>
					<PaginationContent>
						<PaginationItem><PaginationPrevButton /></PaginationItem>
						<PaginationItem><PaginationEllipsis /></PaginationItem>
						<PaginationItem><PaginationNextButton /></PaginationItem>
					</PaginationContent>
				</Pagination>
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
