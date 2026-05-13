<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { button as spec } from '$specs/components/button';
	import { Button } from '@dashfi/svelte/ui/button';
	import Plus from '@lucide/svelte/icons/plus';
	import Download from '@lucide/svelte/icons/download';
</script>

<svelte:head><title>Button — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Variants">
				{#snippet children(_m)}
					<Button>Default</Button>
					<Button variant="brand">Brand</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="Sizes">
				{#snippet children(_m)}
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
					<Button size="lg">Large</Button>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="With icon">
				{#snippet children(_m)}
					<Button>
						<Plus size={16} strokeWidth={1.5} />
						New transaction
					</Button>
					<Button variant="outline">
						<Download size={16} strokeWidth={1.5} />
						Export
					</Button>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="States">
				{#snippet children(_m)}
					<Button loading>Submitting</Button>
					<Button disabled>Disabled</Button>
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
