<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { asymmetricProductHero as spec } from '$specs/marketing/patterns/asymmetric-product-hero';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="aph">
				<div class="copy">
					<p class="eyebrow">Shipping</p>
					<h1 class="display">See every <span class="accent">overcharge</span></h1>
					<p class="lede">Your carrier invoices, audited line by line.</p>
					<button type="button" class="m-btn">Start a pilot</button>
				</div>
				<div class="media">
					<div class="shot">
						<div class="mock-bar"><span class="dot"></span><span class="mock-title">Carrier audit</span></div>
						<div class="mock-row"><span>UPS · 1Z…84</span><span class="ok">$0.00</span></div>
						<div class="mock-row"><span>FedEx · 77…21</span><span class="bad">−$14.20</span></div>
						<div class="mock-row"><span>DHL · 30…77</span><span class="bad">−$8.60</span></div>
						<div class="mock-row"><span>USPS · 94…05</span><span class="ok">$0.00</span></div>
					</div>
				</div>
			</div>
		</div>
		<p class="cap">In production the shot bleeds to the viewport edge; here it is clipped to the demo frame.</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 48px 0 48px 40px;
		overflow: hidden;
	}
	.aph {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: 40px;
		align-items: center;
	}
	@media (max-width: 720px) {
		.aph {
			grid-template-columns: minmax(0, 1fr);
		}
	}
	.copy {
		display: flex;
		flex-direction: column;
		gap: 14px;
		max-width: 34ch;
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
		font-size: clamp(2rem, 4.5vw, 3.25rem);
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
		align-self: flex-start;
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
	.media {
		min-width: 0;
	}
	.shot {
		background: var(--m-card);
		border: 1px solid var(--m-border);
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
		padding: 16px;
		/* extends past the demo's right edge to suggest the bleed */
		margin-right: -40px;
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
	.cap {
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
	}
</style>
