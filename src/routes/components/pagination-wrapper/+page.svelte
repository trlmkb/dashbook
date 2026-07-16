<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { paginationWrapper as spec } from '$specs/components/pagination-wrapper';
	import { PaginationWrapper } from '@dashfi/svelte/ui/pagination-wrapper';

	let page = $state(2);
	let pageSize = $state(20);
</script>

<svelte:head><title>Pagination Wrapper — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			<PaginationWrapper totalItems={248} totalPages={13} bind:page bind:pageSize showTotalItems />
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}<CodeSnippet code={spec.example} language="svelte" />{/snippet}
	{#snippet docs()}<PropsTable props={spec.props} />{/snippet}
	{#snippet anatomy()}<Anatomy {spec} />{/snippet}

	{#snippet accessibility()}
		<ul class="docs-list">
			{#each spec.accessibility as item (item)}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<li>{@html item}</li>
			{/each}
		</ul>
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
