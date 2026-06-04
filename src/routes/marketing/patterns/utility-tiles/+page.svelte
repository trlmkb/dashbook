<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import Boxes from '@lucide/svelte/icons/boxes';
	import { utilityTiles as spec } from '$specs/marketing/patterns/utility-tiles';

	const tiles = [
		{ label: 'UPS', sub: 'Parcel + freight' },
		{ label: 'FedEx', sub: 'Express + ground' },
		{ label: 'USPS', sub: 'Domestic mail' },
		{ label: 'DHL', sub: 'International' },
		{ label: 'NetSuite', sub: 'GL sync' },
		{ label: 'QuickBooks', sub: 'Reconciliation' },
		{ label: 'Stripe', sub: 'Payouts' },
		{ label: 'Slack', sub: 'Audit alerts' }
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">Works with</p>
			<ul class="utility-tiles">
				{#each tiles as tile (tile.label)}
					<li class="tile">
						<Boxes class="icon" size={22} />
						<span class="label">{tile.label}</span>
						<span class="sub">{tile.sub}</span>
					</li>
				{/each}
			</ul>
		</div>
		<p class="cap">
			Auto-fit grid — <code>repeat(auto-fit, minmax(180px, 1fr))</code>. ProductTileGrid is the
			same grid with a product image swapped in for the icon and label.
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.eyebrow {
		margin: 0 0 18px;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 10px;
		color: var(--m-fg-subtle);
	}
	.utility-tiles {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 14px;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		align-items: stretch;
	}
	.tile {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 16px;
		border-radius: 12px;
		background: var(--m-card);
		border: 1px solid var(--m-border);
	}
	.tile :global(.icon) {
		color: var(--m-accent);
	}
	.label {
		font-size: 14px;
		color: var(--m-fg-strong);
	}
	.sub {
		font-size: 12px;
		color: var(--m-fg-subtle);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
