<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { radioGroup as spec } from '$specs/components/radio-group';
	import { RadioGroup, RadioGroupItem } from '@dashfi/svelte/ui/radio-group';
	import { Label } from '@dashfi/svelte/ui/label';

	let card = $state('debit');
</script>

<svelte:head><title>Radio Group — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<div style:width="280px">
					<RadioGroup bind:value={card}>
						<div style:display="flex" style:gap="8px" style:align-items="center" style:padding="6px 0">
							<RadioGroupItem value="debit" id="rg-debit" />
							<Label for="rg-debit">Debit</Label>
						</div>
						<div style:display="flex" style:gap="8px" style:align-items="center" style:padding="6px 0">
							<RadioGroupItem value="corporate" id="rg-corp" />
							<Label for="rg-corp">Corporate</Label>
						</div>
						<div style:display="flex" style:gap="8px" style:align-items="center" style:padding="6px 0">
							<RadioGroupItem value="net60" id="rg-net60" />
							<Label for="rg-net60">Daily Net 60</Label>
						</div>
					</RadioGroup>
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
