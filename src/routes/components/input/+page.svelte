<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { input as spec } from '$specs/components/input';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Label } from '@dashfi/svelte/ui/label';

	let basicValue = $state('');
	let searchValue = $state('');
</script>

<svelte:head><title>Input — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Basic" minHeight="160px">
				{#snippet children(_m)}
					<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="6px">
						<Label for="email">Work email</Label>
						<Input id="email" type="email" placeholder="you@company.com" bind:value={basicValue} />
					</div>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="With debounce" minHeight="160px">
				{#snippet children(_m)}
					<div style:width="320px">
						<Input placeholder="Search transactions" bind:value={searchValue} debounce={250} />
					</div>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="States" minHeight="200px">
				{#snippet children(_m)}
					<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="12px">
						<Input placeholder="Empty" />
						<Input value="Filled" />
						<Input value="Disabled" disabled />
						<Input placeholder="Read only" readonly value="Cannot edit" />
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
