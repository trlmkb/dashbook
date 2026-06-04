<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { threeCardRow as spec } from '$specs/marketing/patterns/three-card-row';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">How it works</p>
			<ul class="three-card-row">
				<li class="card">
					<h3>Audit</h3>
					<p>Every carrier invoice is checked against the contract the moment it lands.</p>
					<button type="button" class="link">How it works <ArrowRight size={14} /></button>
				</li>
				<li class="card">
					<h3>Recover</h3>
					<p>We file the claims and track each credit back to your account.</p>
					<button type="button" class="link">See recoveries <ArrowRight size={14} /></button>
				</li>
				<li class="card">
					<h3>Report</h3>
					<p>One ledger of every dispute, refund, and saving across carriers.</p>
					<button type="button" class="link">View reports <ArrowRight size={14} /></button>
				</li>
			</ul>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.eyebrow {
		margin: 0 0 24px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
	.three-card-row {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.card {
		background: var(--m-card);
		border: 1px solid var(--m-border);
		border-radius: 16px;
		corner-shape: squircle;
		padding: 28px;
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
	}
	.card h3 {
		margin: 0 0 10px;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		font-size: 20px;
		color: var(--m-fg-strong);
	}
	.card p {
		margin: 0 0 18px;
		font-size: 14px;
		line-height: 1.55;
		color: var(--m-fg-muted);
	}
	.link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--m-accent);
	}
	@media (max-width: 720px) {
		.three-card-row {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
