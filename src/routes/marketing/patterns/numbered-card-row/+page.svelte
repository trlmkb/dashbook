<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { numberedCardRow as spec } from '$specs/marketing/patterns/numbered-card-row';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">Three steps</p>
			<ol class="numbered-card-row">
				<li class="card">
					<span class="index">01</span>
					<h3>Connect</h3>
					<p>Link your carrier accounts in a few minutes — no engineering work.</p>
				</li>
				<li class="card">
					<span class="index">02</span>
					<h3>Audit</h3>
					<p>Every invoice is checked against your contract automatically.</p>
				</li>
				<li class="card">
					<span class="index">03</span>
					<h3>Recover</h3>
					<p>We file the claims and track each credit back to your account.</p>
				</li>
			</ol>
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
	.numbered-card-row {
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
	.index {
		display: block;
		font-family: var(--font-mono);
		font-weight: 400;
		font-variant-numeric: tabular-nums;
		font-size: 2.5rem;
		line-height: 1;
		color: var(--m-accent);
	}
	.card h3 {
		margin: 16px 0 8px;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		font-size: 18px;
		color: var(--m-fg-strong);
	}
	.card p {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--m-fg-muted);
	}
	@media (max-width: 720px) {
		.numbered-card-row {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
