<script lang="ts">
	import type { Snippet } from 'svelte';
	import InnerPage from './InnerPage.svelte';
	import PageHeader from './PageHeader.svelte';
	import Tabs from './Tabs.svelte';
	import StatusBadge, { type ComponentStatus } from './StatusBadge.svelte';

	type Props = {
		name: string;
		description: string;
		status?: ComponentStatus;
		importPath?: string;
		preview: Snippet;
		code: Snippet;
		docs?: Snippet;
		anatomy?: Snippet;
		accessibility?: Snippet;
		changelog?: Snippet;
	};

	let {
		name,
		description,
		status = 'stable' as ComponentStatus,
		importPath,
		preview,
		code,
		docs,
		anatomy,
		accessibility,
		changelog
	}: Props = $props();

	const tabs = [
		{ id: 'preview', label: 'Preview' },
		{ id: 'code', label: 'Code' },
		...(docs ? [{ id: 'docs', label: 'Docs' }] : []),
		...(anatomy ? [{ id: 'anatomy', label: 'Anatomy' }] : []),
		...(accessibility ? [{ id: 'accessibility', label: 'Accessibility' }] : []),
		...(changelog ? [{ id: 'changelog', label: 'Changelog' }] : [])
	];

	let active = $state('preview');
</script>

<InnerPage section="/components" wide>
	<PageHeader label="Components / {name}" title={name + '.'} lede={description} />

	<div class="meta-bar">
		<StatusBadge {status} />
		{#if importPath}
			<code class="import">{importPath}</code>
		{/if}
	</div>

	<Tabs {tabs} {active} onSelect={(id) => (active = id)}>
		{#if active === 'preview'}
			{@render preview()}
		{:else if active === 'code'}
			{@render code()}
		{:else if active === 'docs' && docs}
			{@render docs()}
		{:else if active === 'anatomy' && anatomy}
			{@render anatomy()}
		{:else if active === 'accessibility' && accessibility}
			{@render accessibility()}
		{:else if active === 'changelog' && changelog}
			{@render changelog()}
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
	.import {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-muted);
		background: var(--bg-muted);
		padding: 4px 10px;
		letter-spacing: -0.02em;
	}
</style>
