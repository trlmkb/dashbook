<script lang="ts">
	import type { Snippet } from 'svelte';
	import InnerPage from './InnerPage.svelte';
	import PageHeader from './PageHeader.svelte';
	import Tabs from './Tabs.svelte';
	import StatusBadge from './StatusBadge.svelte';
	import CodeSnippet from './CodeSnippet.svelte';
	import MarketingAnatomy from '$specs/render/MarketingAnatomy.svelte';
	import type { MarketingPatternSpec } from '$specs/marketing/patterns/types.js';

	type Props = {
		spec: MarketingPatternSpec;
		/** Optional live preview. When omitted, the Preview tab shows a recipe pointer. */
		preview?: Snippet;
	};

	let { spec, preview }: Props = $props();

	// Shiki has no 'astro' grammar loaded; Astro markup highlights fine as html.
	const codeLang = $derived(spec.exampleLang === 'astro' ? 'html' : (spec.exampleLang ?? 'html'));

	const tabs = [
		{ id: 'preview', label: 'Preview' },
		{ id: 'recipe', label: 'Recipe' },
		...(spec.example ? [{ id: 'code', label: 'Code' }] : []),
		{ id: 'changelog', label: 'Changelog' }
	];

	let active = $state('preview');
</script>

<svelte:head><title>{spec.name} — Marketing — Dashbook</title></svelte:head>

<InnerPage section="/marketing" wide>
	<PageHeader label="Marketing / {spec.category}" title={spec.name + '.'} lede={spec.description} />

	<div class="meta-bar">
		<StatusBadge status={spec.status} />
		{#if spec.toolId}<code class="tool">{spec.toolId}</code>{/if}
		<code class="src">{spec.source}</code>
	</div>

	<Tabs {tabs} {active} onSelect={(id) => (active = id)}>
		{#if active === 'preview'}
			<div class="preview-stack">
				{#if spec.whenToUse}
					<section class="when-to-use">
						<h3>When to use</h3>
						<p>{spec.whenToUse}</p>
					</section>
				{/if}
				{#if preview}
					{@render preview()}
				{:else}
					<p class="no-preview">
						No live preview for this pattern — see the <button
							type="button"
							class="link"
							onclick={() => (active = 'recipe')}>Recipe</button
						> tab for the DOM, token roles, and gotchas.
					</p>
				{/if}
			</div>
		{:else if active === 'recipe'}
			<MarketingAnatomy {spec} />
		{:else if active === 'code' && spec.example}
			<CodeSnippet code={spec.example} language={codeLang} />
		{:else if active === 'changelog'}
			<ul class="docs-cl">
				{#each spec.changelog as entry (entry.version)}
					<li>
						<span class="docs-cl-when">{entry.version} — {entry.date}</span>
						<p>{entry.note}</p>
					</li>
				{/each}
			</ul>
		{/if}
	</Tabs>
</InnerPage>

<style>
	.meta-bar {
		display: flex;
		align-items: center;
		gap: 12px;
		margin: -32px 0 32px;
		flex-wrap: wrap;
	}
	.tool,
	.src {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-muted);
		background: var(--bg-muted);
		padding: 4px 10px;
		letter-spacing: -0.02em;
	}
	.tool {
		color: var(--brand);
	}
	.preview-stack {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.when-to-use {
		border: 1px solid var(--border);
		padding: 16px 20px;
		background: var(--bg-muted);
	}
	.when-to-use h3 {
		margin: 0 0 8px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 500;
	}
	.when-to-use p {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--fg);
	}
	.no-preview {
		font-size: 14px;
		line-height: 1.55;
		color: var(--fg-muted);
	}
	.link {
		background: none;
		border: 0;
		padding: 0;
		font: inherit;
		color: var(--fg);
		text-decoration: underline;
		text-underline-offset: 2px;
		cursor: pointer;
	}
</style>
