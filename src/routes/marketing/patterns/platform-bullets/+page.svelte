<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import Check from '@lucide/svelte/icons/check';
	import { platformBullets as spec } from '$specs/marketing/patterns/platform-bullets';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">What's included</p>
			<ul class="platform-bullets">
				<li><Check class="check" size={18} /> Real-time carrier audit</li>
				<li><Check class="check" size={18} /> Automatic refund recovery</li>
				<li><Check class="check" size={18} /> Line-item invoice reconciliation</li>
				<li><Check class="check" size={18} /> Carrier-agnostic coverage</li>
				<li><Check class="check" size={18} /> Contract-rate verification</li>
				<li><Check class="check" size={18} /> Exportable savings ledger</li>
			</ul>
		</div>
		<div class="demo" data-marketing-dark>
			<p class="eyebrow">What's included</p>
			<ul class="platform-bullets">
				<li><Check class="check" size={18} /> Real-time carrier audit</li>
				<li><Check class="check" size={18} /> Automatic refund recovery</li>
				<li><Check class="check" size={18} /> Line-item invoice reconciliation</li>
				<li><Check class="check" size={18} /> Carrier-agnostic coverage</li>
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
	.platform-bullets {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 12px 32px;
		grid-template-columns: minmax(0, 1fr);
	}
	@media (min-width: 640px) {
		.platform-bullets {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.platform-bullets li {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		font-size: 15px;
		line-height: 1.5;
		color: var(--m-fg-muted);
	}
	.platform-bullets :global(.check) {
		flex: none;
		margin-top: 1px;
		color: var(--m-positive);
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
</style>
