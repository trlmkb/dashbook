<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import { marketingSectionFoundation as f } from '$specs/marketing/foundations/section';

	const swatch: Record<string, string> = {
		paper: 'var(--m-surface)',
		cream: 'var(--m-cream)',
		ink: 'var(--m-near-black)',
		cobalt: 'var(--m-cobalt)'
	};
	const fg: Record<string, string> = {
		paper: 'var(--m-fg-strong)',
		cream: 'var(--m-fg-strong)',
		ink: '#FAF9F5',
		cobalt: '#FFFFFF'
	};
</script>

<svelte:head><title>Section rhythm — Marketing — Dashbook</title></svelte:head>

<InnerPage section="/marketing" wide>
	<PageHeader
		label="Marketing / Foundations"
		title="Section rhythm."
		lede="Marketing pages read as a sequence of full-width bands. Alternate light surfaces, drop a dark band for emphasis, and use cobalt sparingly."
	/>

	<Section label="Bands">
		<div class="bands">
			{#each f.bands as b (b.name)}
				<div class="band" style:background={swatch[b.name]} style:color={fg[b.name]}>
					<span class="b-name">{b.name}</span>
					<span class="b-meta">{b.surface}</span>
					<span class="b-use">{b.usage}</span>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Rhythm rules">
		<ul class="docs-list">
			{#each f.rhythmRules as r (r)}
				<li>{r}</li>
			{/each}
		</ul>
	</Section>
</InnerPage>

<style>
	.bands {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--m-border);
	}
	.band {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 22px 28px;
	}
	.b-name {
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
	}
	.b-meta {
		font-family: var(--font-mono);
		font-size: 11px;
		opacity: 0.75;
	}
	.b-use {
		font-size: 13px;
		line-height: 1.45;
		opacity: 0.85;
		max-width: 60ch;
	}
</style>
