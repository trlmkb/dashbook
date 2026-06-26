<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { trustStatBand as spec } from '$specs/marketing/patterns/trust-stat-band';

	const pillars = [
		{ v: '8', l: 'KPIs audited', sub: 'per carrier' },
		{ v: '99.9%', l: 'uptime', sub: 'last 12 mo' },
		{ v: '48h', l: 'to first finding', sub: 'on average' },
	];
	const carriers = ['UPS', 'FedEx', 'DHL', 'USPS'];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="trust">
			<div class="top">
				<div class="counter">
					<span class="value">$2.4M</span>
					<span class="label">recovered this year</span>
					<span class="trend">+18% MoM</span>
				</div>
				<div class="pillars">
					{#each pillars as p (p.l)}
						<div class="pillar">
							<span class="v">{p.v}</span>
							<span class="l">{p.l}</span>
							<span class="sub">{p.sub}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="bottom">
				<div class="carriers">
					{#each carriers as c (c)}<span class="carrier">{c}</span>{/each}
				</div>
				<span class="powered"><span class="dot"></span> Live</span>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.trust {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}
	.top {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 24px 56px;
	}
	.counter {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.counter .value {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(40px, 6vw, 64px);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong, #123b39);
		font-variant-numeric: tabular-nums;
	}
	.counter .label {
		color: var(--m-fg-muted, #505148);
		font-size: 14px;
	}
	.counter .trend {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--m-accent, #2b605c);
	}
	.pillars {
		display: flex;
		flex-wrap: wrap;
		gap: 36px;
	}
	.pillar {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.pillar .v {
		font-family: var(--font-mono);
		font-size: 24px;
		color: var(--m-fg-strong, #123b39);
		font-variant-numeric: tabular-nums;
	}
	.pillar .l {
		font-size: 13px;
		color: var(--m-fg-muted, #505148);
	}
	.pillar .sub {
		font-size: 11px;
		color: var(--m-fg-subtle, #80817a);
	}
	.bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-top: 20px;
		border-top: 1px solid var(--m-border, rgba(15, 20, 18, 0.08));
	}
	.carriers {
		display: flex;
		gap: 22px;
	}
	.carrier {
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.04em;
		color: var(--m-fg-muted, #505148);
	}
	.powered {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--m-fg-muted, #505148);
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: var(--m-accent, #2b605c);
		animation: pulse 1.6s ease-in-out infinite;
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.dot {
			animation: none;
		}
	}
</style>
