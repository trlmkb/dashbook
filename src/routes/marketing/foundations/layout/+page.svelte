<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import { marketingLayoutFoundation as f } from '$specs/marketing/foundations/layout';
</script>

<svelte:head><title>Layout — Marketing — Dashbook</title></svelte:head>

<InnerPage section="/marketing" wide>
	<PageHeader
		label="Marketing / Foundations"
		title="Layout."
		lede="Page-agnostic structural patterns: container, full-bleed-to-edge, alternating copy↔media rows, and the mobile blow-out fix. Recipes, not components."
	/>

	<Section label="Scale">
		<ul class="docs-list">
			<li><strong>Content max</strong> — {f.contentMax}</li>
			<li><strong>Gutters</strong> — sm {f.gutters.sm} · md {f.gutters.md} · lg {f.gutters.lg}</li>
		</ul>
	</Section>

	<Section label="Patterns">
		<div class="patterns">
			{#each f.patterns as p (p.name)}
				<div class="pat">
					<div class="pat-name">{p.name}</div>
					<p class="pat-summary">{p.summary}</p>
					{#if p.recipe}<code class="pat-recipe">{p.recipe}</code>{/if}
					{#if p.notes}<p class="pat-notes">{p.notes}</p>{/if}
				</div>
			{/each}
		</div>
	</Section>

	<Section label="The mobile rule">
		<p class="callout">{f.mobileRule}</p>
	</Section>

	<Section label="Related gotcha">
		<p class="callout">
			{f.scopedStyleGotcha}
			<a href="/marketing/patterns/astro-scoped-styles">→ astro-scoped-styles</a>
		</p>
	</Section>
</InnerPage>

<style>
	.patterns {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}
	.pat-name {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 500;
		color: var(--fg);
	}
	.pat-summary {
		margin: 8px 0 12px;
		font-size: 15px;
		line-height: 1.55;
		color: var(--fg);
		max-width: 70ch;
	}
	.pat-recipe {
		display: block;
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 12px 14px;
		line-height: 1.6;
		color: var(--fg);
		overflow-x: auto;
		white-space: pre-wrap;
	}
	.pat-notes {
		margin: 12px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 70ch;
	}
	.callout {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		background: var(--bg-muted);
		border: 1px solid var(--border);
		padding: 16px 20px;
		margin: 0;
		max-width: 75ch;
	}
	.callout a {
		color: var(--brand);
		text-decoration: underline;
		text-underline-offset: 2px;
		white-space: nowrap;
	}
</style>
