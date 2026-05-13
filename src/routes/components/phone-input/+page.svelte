<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { phoneInput as spec } from '$specs/components/phone-input';
	import { PhoneInput } from '@dashfi/svelte/ui/phone-input';
	import { Label } from '@dashfi/svelte/ui/label';

	let phone = $state<string | null>(null);

	// Allowed countries — narrow to the markets dash.fi supports.
	const allowed = new Set(['US', 'CA', 'GB', 'DE', 'FR', 'NL', 'AU'] as const);
</script>

<svelte:head><title>Phone Input — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="6px">
					<Label for="phone">Phone</Label>
					<PhoneInput bind:value={phone} allowedCountryCodes={allowed} />
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
