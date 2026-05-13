<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { badge as spec } from '$specs/components/badge';
	import { Badge } from '@dashfi/svelte/ui/badge';
</script>

<svelte:head><title>Badge — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Variants">
				{#snippet children(_m)}
					<Badge>Default</Badge>
					<Badge variant="brand">Brand</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="ghost">Ghost</Badge>
					<Badge variant="destructive">Destructive</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="info">Info</Badge>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="In context — card tier markers">
				{#snippet children(_m)}
					<Badge variant="default">DEBIT</Badge>
					<Badge variant="brand">CORPORATE</Badge>
					<Badge variant="outline">DAILY NET 60</Badge>
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
