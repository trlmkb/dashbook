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
		/**
		 * When true, renders a "Drafting" banner above the meta-bar and downgrades the page
		 * status to indicate the preview / code / rationale are still being authored.
		 */
		draft?: boolean;
	};

	let {
		name,
		description,
		uses,
		preview,
		code,
		rationale,
		variations,
		draft = false
	}: Props = $props();

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

	{#if draft}
		<div class="draft-notice" role="status">
			<span class="draft-label">Drafting</span>
			<span class="draft-text">
				This pattern is scaffolded from the dashfi-ui inventory and awaiting full preview, code,
				and rationale. The shape and category are decided; the content is in flight.
			</span>
		</div>
	{/if}

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
	.draft-notice {
		display: flex;
		align-items: baseline;
		gap: 12px;
		margin: -24px 0 24px;
		padding: 12px 16px;
		border: 1px dashed var(--border);
		background: var(--bg-muted);
		flex-wrap: wrap;
	}
	.draft-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg);
		flex-shrink: 0;
	}
	.draft-text {
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
	}
</style>
