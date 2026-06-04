<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import { marketingMotionFoundation as f } from '$specs/marketing/foundations/motion';
</script>

<svelte:head><title>Motion — Marketing — Dashbook</title></svelte:head>

<InnerPage section="/marketing" wide>
	<PageHeader
		label="Marketing / Foundations"
		title="Motion."
		lede="Quieter than it looks: one entrance (fade-rise), a couple of ambient loops, smooth in-page anchors. Everything honours prefers-reduced-motion. The product motion tokens live at /foundations/motion."
	/>

	<Section label="Patterns">
		<div class="patterns">
			{#each f.patterns as p (p.name)}
				<div class="pat">
					<div class="pat-name">{p.name}</div>
					<p class="pat-summary">{p.summary}</p>
					{#if p.recipe}<code class="pat-recipe">{p.recipe}</code>{/if}
					<p class="pat-rm"><span class="rm-label">Reduced motion</span> {p.reducedMotion}</p>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Reduced motion">
		<ul class="docs-list">
			{#each f.reducedMotion as r (r)}
				<li>{r}</li>
			{/each}
		</ul>
	</Section>

	<Section label="Rules">
		<ul class="docs-list">
			{#each f.rules as r (r)}
				<li>{r}</li>
			{/each}
		</ul>
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
	.pat-rm {
		margin: 12px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
	}
	.rm-label {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-right: 8px;
	}
</style>
