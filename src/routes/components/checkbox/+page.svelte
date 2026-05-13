<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { checkbox as spec } from '$specs/components/checkbox';
	import { Checkbox } from '@dashfi/svelte/ui/checkbox';
	import { Label } from '@dashfi/svelte/ui/label';

	let agreed = $state(false);
	let mark = $state(true);
</script>

<svelte:head><title>Checkbox — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:display="flex" style:flex-direction="column" style:gap="12px">
					<div style:display="flex" style:gap="12px" style:align-items="center">
						<Checkbox id="cb-1" bind:checked={agreed} />
						<Label for="cb-1">Unchecked default</Label>
					</div>
					<div style:display="flex" style:gap="12px" style:align-items="center">
						<Checkbox id="cb-2" bind:checked={mark} />
						<Label for="cb-2">Checked default</Label>
					</div>
					<div style:display="flex" style:gap="12px" style:align-items="center">
						<Checkbox id="cb-3" disabled />
						<Label for="cb-3">Disabled</Label>
					</div>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={spec.example} language="svelte" />{/snippet}
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
