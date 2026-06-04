<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import { marketingTypographyFoundation as f } from '$specs/marketing/foundations/typography';
</script>

<svelte:head><title>Typography — Marketing — Dashbook</title></svelte:head>

<InnerPage section="/marketing" wide>
	<PageHeader
		label="Marketing / Foundations"
		title="Typography."
		lede="Two families, four roles, one canonical copy unit. PP Supply Mono ultralight for display, tracked mono for eyebrows + data, Bai Jamjuree for body."
	/>

	<Section label="Specimens">
		<div class="spec">
			<p class="s-eyebrow">Shipping</p>
			<h2 class="s-display">Spend less on <span class="accent">every parcel</span></h2>
			<p class="s-body">
				Body copy is Bai Jamjuree, 14–17px, line-height 1.55–1.65. One claim per section; specifics
				over hedges.
			</p>
			<p class="s-data tabular-nums">$1,240.00 · 4401-902F-X</p>
		</div>
	</Section>

	<Section label="Roles">
		<ul class="docs-list">
			{#each f.roles as r (r.name)}
				<li>
					<strong>{r.name}</strong> — {r.family}, weight {r.weight}, {r.size}{#if r.letterSpacing}, tracking {r.letterSpacing}{/if}{#if r.textTransform && r.textTransform !== 'none'}, {r.textTransform}{/if}. {r.usage}
				</li>
			{/each}
		</ul>
	</Section>

	<Section label="Canonical copy unit">
		<ol class="docs-list">
			{#each f.copyUnit as step (step)}
				<li>{step}</li>
			{/each}
		</ol>
	</Section>

	<Section label="Gotchas">
		<ul class="docs-list">
			{#each f.gotchas as g (g)}
				<li>{g}</li>
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
	.spec {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.s-eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	.s-display {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		font-size: clamp(2.25rem, 5vw, 3.5rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong);
	}
	.s-display .accent {
		color: var(--m-accent);
	}
	.s-body {
		margin: 0;
		font-size: 16px;
		line-height: 1.6;
		color: var(--m-fg-muted);
		max-width: 60ch;
	}
	.s-data {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--m-fg-strong);
	}
</style>
