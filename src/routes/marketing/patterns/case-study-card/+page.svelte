<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { caseStudyCard as spec } from '$specs/marketing/patterns/case-study-card';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="row">
				<a class="case-study-card" href="/marketing">
					<p class="eyebrow">Northwind Freight</p>
					<p class="metric">$1.2M</p>
					<p class="result">recovered across 14 carriers in the first year.</p>
					<span class="link">Read the story <ArrowRight size={14} /></span>
				</a>
				<a class="case-study-card" href="/marketing">
					<p class="eyebrow">Harbor Freight Co.</p>
					<p class="metric accent">31%</p>
					<p class="result">cut from monthly shipping spend after the audit.</p>
					<span class="link">Read the story <ArrowRight size={14} /></span>
				</a>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.row {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.case-study-card {
		display: block;
		text-decoration: none;
		background: var(--m-card);
		border: 1px solid var(--m-border);
		border-radius: 16px;
		corner-shape: squircle;
		padding: 28px;
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
	}
	.eyebrow {
		margin: 0 0 16px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
	.metric {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 48px;
		line-height: 1;
		font-variant-numeric: tabular-nums;
		color: var(--m-positive);
	}
	.metric.accent {
		color: var(--m-accent);
	}
	.result {
		margin: 10px 0 18px;
		font-size: 14px;
		line-height: 1.55;
		color: var(--m-fg-muted);
		max-width: 32ch;
	}
	.link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--m-accent);
	}
	@media (max-width: 720px) {
		.row {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
