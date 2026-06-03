<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { productHero as spec } from '$specs/marketing/patterns/product-hero';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<header class="copy">
				<p class="eyebrow">Shipping</p>
				<h1 class="display">Your invoices, <span class="accent">audited</span></h1>
				<p class="lede">Every carrier, every line, automatically.</p>
				<button type="button" class="m-btn">Start a pilot</button>
			</header>
			<div class="shot">
				<div class="mock-bar"><span class="dot"></span><span class="mock-title">Carrier audit</span></div>
				<div class="mock-row"><span>UPS · 1Z…84</span><span class="ok">$0.00</span></div>
				<div class="mock-row"><span>FedEx · 77…21</span><span class="bad">−$14.20</span></div>
				<div class="mock-row"><span>USPS · 94…05</span><span class="ok">$0.00</span></div>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 56px 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40px;
	}
	.copy {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 14px;
		max-width: 36ch;
	}
	.eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	.display {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		font-size: clamp(2rem, 5vw, 3.25rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong);
	}
	.display .accent {
		color: var(--m-accent);
	}
	.lede {
		margin: 0;
		font-size: 16px;
		line-height: 1.55;
		color: var(--m-fg-muted);
	}
	.m-btn {
		display: inline-flex;
		align-items: center;
		padding: 12px 20px;
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 500;
		border-radius: 6px;
		corner-shape: squircle;
		appearance: none;
		border: 0;
		cursor: pointer;
		background: var(--m-accent);
		color: var(--m-surface);
		transition: transform 150ms var(--easing-out);
	}
	.m-btn:active {
		transform: scale(0.97);
	}
	.shot {
		width: 100%;
		max-width: 440px;
		background: var(--m-card);
		border: 1px solid var(--m-border);
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
		padding: 16px;
	}
	.mock-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--m-border);
		margin-bottom: 8px;
	}
	.dot {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: var(--m-accent);
	}
	.mock-title {
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--m-accent);
	}
	.mock-row {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--m-fg-muted);
		font-variant-numeric: tabular-nums;
	}
	.ok {
		color: var(--m-positive);
	}
	.bad {
		color: var(--m-negative);
	}
</style>
