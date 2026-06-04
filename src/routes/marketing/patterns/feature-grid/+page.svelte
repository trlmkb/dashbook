<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import ScanLine from '@lucide/svelte/icons/scan-line';
	import Coins from '@lucide/svelte/icons/coins';
	import Plug from '@lucide/svelte/icons/plug';
	import Bell from '@lucide/svelte/icons/bell';
	import FileText from '@lucide/svelte/icons/file-text';
	import { featureGrid as spec } from '$specs/marketing/patterns/feature-grid';

	const cells = [
		{ icon: ShieldCheck, title: 'Invoice audit', blurb: 'Every carrier charge checked against your contract, line by line.' },
		{ icon: ScanLine, title: 'Duplicate detection', blurb: 'Spots the same parcel billed twice before it leaves your account.' },
		{ icon: Coins, title: 'Refund recovery', blurb: 'Files the claim and tracks the credit back to your statement.' },
		{ icon: Plug, title: 'Carrier connections', blurb: 'Link UPS, FedEx, and DHL in a couple of minutes, no IT ticket.' },
		{ icon: Bell, title: 'Overcharge alerts', blurb: 'A quiet nudge the moment a surcharge slips past the agreed rate.' },
		{ icon: FileText, title: 'Contract terms', blurb: 'Your negotiated rates parsed once, then enforced on every bill.' }
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<ul class="feature-grid">
				{#each cells as cell (cell.title)}
					<li class="cell">
						<span class="icon" aria-hidden="true"><cell.icon size={20} /></span>
						<h3 class="title">{cell.title}</h3>
						<p class="blurb">{cell.blurb}</p>
					</li>
				{/each}
			</ul>
		</div>
		<div class="demo" data-marketing-dark>
			<ul class="feature-grid">
				{#each cells.slice(0, 3) as cell (cell.title)}
					<li class="cell">
						<span class="icon" aria-hidden="true"><cell.icon size={20} /></span>
						<h3 class="title">{cell.title}</h3>
						<p class="blurb">{cell.blurb}</p>
					</li>
				{/each}
			</ul>
			<span class="tag">[data-marketing-dark]</span>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		position: relative;
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 48px 40px;
	}
	.tag {
		position: absolute;
		top: 10px;
		right: 12px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--m-fg-subtle);
	}
	.feature-grid {
		display: grid;
		gap: 32px;
		list-style: none;
		margin: 0;
		padding: 0;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	@media (max-width: 900px) {
		.feature-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 560px) {
		.feature-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
	.cell {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		corner-shape: squircle;
		background: var(--m-accent-soft);
		color: var(--m-accent);
	}
	.title {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		font-size: 18px;
		line-height: 1.1;
		color: var(--m-fg-strong);
	}
	.blurb {
		margin: 0;
		max-width: 38ch;
		font-size: 15px;
		line-height: 1.6;
		color: var(--m-fg-muted);
	}
</style>
