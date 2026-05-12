<script lang="ts">
	import type { Snippet } from 'svelte';
	import InnerPage from './InnerPage.svelte';
	import PageHeader from './PageHeader.svelte';
	import Tabs from './Tabs.svelte';

	type Props = {
		name: string;
		description: string;
		uses: string[];
		preview: Snippet;
		code: Snippet;
		rationale?: Snippet;
		variations?: Snippet;
	};

	let { name, description, uses, preview, code, rationale, variations }: Props = $props();

	const tabs = [
		{ id: 'preview', label: 'Preview' },
		{ id: 'code', label: 'Code' },
		...(rationale ? [{ id: 'rationale', label: 'Rationale' }] : []),
		...(variations ? [{ id: 'variations', label: 'Variations' }] : [])
	];

	let active = $state('preview');
</script>

<InnerPage section="/patterns" wide>
	<PageHeader label="Patterns / {name}" title={name + '.'} lede={description} />

	<div class="meta-bar">
		<span class="meta-label">Built from</span>
		<div class="uses">
			{#each uses as u (u)}
				<code>{u}</code>
			{/each}
		</div>
	</div>

	<Tabs {tabs} {active} onSelect={(id) => (active = id)}>
		{#if active === 'preview'}
			{@render preview()}
		{:else if active === 'code'}
			{@render code()}
		{:else if active === 'rationale' && rationale}
			{@render rationale()}
		{:else if active === 'variations' && variations}
			{@render variations()}
		{/if}
	</Tabs>
</InnerPage>

<style>
	.meta-bar {
		display: flex;
		align-items: center;
		gap: 16px;
		margin: -32px 0 32px;
		flex-wrap: wrap;
	}
	.meta-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.uses {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
	.uses code {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg);
		background: var(--bg-muted);
		padding: 3px 8px;
		letter-spacing: -0.02em;
	}
</style>
