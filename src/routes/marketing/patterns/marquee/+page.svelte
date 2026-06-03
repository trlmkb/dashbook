<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { marquee as spec } from '$specs/marketing/patterns/marquee';

	const items = ['UPS', 'FedEx', 'USPS', 'DHL', 'NetSuite', 'QuickBooks', 'Stripe', 'Slack'];
	// Duplicated inline so the -50% wrap is seamless.
	const track = [...items, ...items];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="marquee" aria-label="Carriers and platforms we audit">
				<div class="track" aria-hidden="true">
					{#each track as item, i (i)}
						<span class="item">{item}</span>
					{/each}
				</div>
			</div>
		</div>
		<p class="cap">
			The track is duplicated and translates <code>-50%</code> for a seamless loop. It pauses on hover;
			under <code>prefers-reduced-motion: reduce</code> the animation is removed and the row sits static.
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px 0;
	}
	.marquee {
		overflow: hidden;
		mask-image: linear-gradient(
			90deg,
			transparent,
			#000 64px,
			#000 calc(100% - 64px),
			transparent
		);
		-webkit-mask-image: linear-gradient(
			90deg,
			transparent,
			#000 64px,
			#000 calc(100% - 64px),
			transparent
		);
	}
	.track {
		display: flex;
		gap: 56px;
		width: max-content;
		animation: marquee 32s linear infinite;
	}
	.marquee:hover .track {
		animation-play-state: paused;
	}
	.item {
		font-family: var(--font-mono);
		font-size: 14px;
		letter-spacing: 0.02em;
		color: var(--m-fg-muted);
		white-space: nowrap;
	}
	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
		}
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
