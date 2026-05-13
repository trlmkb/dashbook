<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { select as spec } from '$specs/components/select';
	import {
		Select,
		SelectTrigger,
		SelectContent,
		SelectItem
	} from '@dashfi/svelte/ui/select';

	let card = $state<string | undefined>(undefined);
	const labels: Record<string, string> = {
		debit: 'Debit',
		corporate: 'Corporate',
		net60: 'Daily Net 60'
	};
</script>

<svelte:head><title>Select — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="280px">
					<Select type="single" bind:value={card}>
						<SelectTrigger>{card ? labels[card] : 'Choose a card'}</SelectTrigger>
						<SelectContent>
							<SelectItem value="debit">Debit</SelectItem>
							<SelectItem value="corporate">Corporate</SelectItem>
							<SelectItem value="net60">Daily Net 60</SelectItem>
						</SelectContent>
					</Select>
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
