<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { productShot as spec } from '$specs/marketing/patterns/product-shot';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="frame">
				<div class="mock">
					<div class="mock-bar">
						<span class="dot"></span><span class="mock-title">Carrier audit</span>
					</div>
					<div class="mock-row"><span>UPS · 1Z…84</span><span class="ok">$0.00</span></div>
					<div class="mock-row"><span>FedEx · 77…21</span><span class="bad">−$14.20</span></div>
					<div class="mock-row"><span>USPS · 94…05</span><span class="ok">$0.00</span></div>
				</div>
			</div>
		</div>
		<p class="cap">
			Illustration of the rebuilt-as-DOM idea: the panel is real markup recoloured to
			<code>--m-accent</code>, while money keeps its semantic colour. In production a ResizeObserver
			scales a fixed-width inner to the container.
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.frame {
		max-width: 420px;
		margin: 0 auto;
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
	.cap {
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 60ch;
	}
	.cap code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 5px;
	}
</style>
