<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { customerPlatformsRail as spec } from '$specs/marketing/patterns/customer-platforms-rail';

	const items = ['NetSuite', 'QuickBooks', 'UPS', 'Shopify', 'FedEx', 'Stripe'];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">Works with your stack</p>
			<ul class="rail">
				{#each items as name (name)}
					<li class="item">
						<span class="logo" aria-hidden="true"></span>
						<span class="label">{name}</span>
					</li>
				{/each}
			</ul>
		</div>
		<p class="cap">
			Marks are muted into the surface in <code>--m-fg-subtle</code> with labels in
			<code>--m-fg-muted</code>, so the rail reads as quiet "works with your stack" proof rather than a
			saturated logo wall. Tiles are placeholders; production pulls each integration mark.
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
		text-align: center;
	}
	.eyebrow {
		margin: 0 0 24px;
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--m-fg-subtle);
	}
	.rail {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 32px 40px;
	}
	.item {
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}
	.logo {
		width: 26px;
		height: 26px;
		border-radius: 6px;
		border: 1px solid var(--m-border);
		background: var(--m-fg-subtle);
		opacity: 0.35;
	}
	.label {
		font-size: 13px;
		color: var(--m-fg-muted);
		font-variant-numeric: tabular-nums;
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
