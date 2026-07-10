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
		lede="Marketing pages read as a sequence of full-width bands. Alternate light surfaces and drop a dark band for emphasis. Jade is the brand colour; cobalt is demoted and barely used."
	/>

	<Section label="Bands">
		<div class="bands">
			{#each f.bands as b (b.name)}
				<div class="band" class:rare={b.name === 'cobalt'} style:background={swatch[b.name]} style:color={fg[b.name]}>
					<span class="b-name">{b.name}{#if b.name === 'cobalt'}<span class="rare-tag">rare</span>{/if}</span>
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

	<Section label="Site IA note">
		<div class="ia-note">
			<p>
				The current top-level dash.fi information architecture groups its product-audit pages
				into an "Audit agents" nav family rather than listing them as flat, unrelated pages:
				<strong>shipping</strong> (parcel audit / carrier contract management / parcel
				analytics), <strong>ad-pay</strong> (AdPay agent), and <strong>ai-spend-audit</strong>.
				Each family shares the proof-section vocabulary documented here — TrustStatBand /
				ChartBand / DataTableBand / ActionPlan — even though the underlying data differs (parcel
				overcharges vs ad-spend anomalies vs contract line items).
			</p>
			<p>
				When building a new page inside one of these families, reach for the same proof-band
				sequence (stat → chart or table → action plan → CTA) rather than inventing a bespoke
				layout — the shared shape is what makes the "Audit agents" grouping legible as one
				product line in the nav, not three unrelated tools.
			</p>
		</div>
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
	.band.rare {
		padding-block: 13px;
		opacity: 0.92;
	}
	.b-name {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
	}
	.rare-tag {
		font-size: 9px;
		letter-spacing: 0.14em;
		padding: 2px 6px;
		border: 1px solid currentColor;
		border-radius: 999px;
		opacity: 0.7;
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
	.ia-note {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 68ch;
	}
	.ia-note p {
		margin: 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--m-fg-muted, var(--fg-muted));
	}
	.ia-note strong {
		color: var(--m-fg-strong, var(--fg));
		font-weight: 600;
	}
</style>
