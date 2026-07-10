<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { chartBand as spec } from '$specs/marketing/patterns/chart-band';

	const bars = [
		{ label: 'UPS', value: 62 },
		{ label: 'FedEx', value: 88 },
		{ label: 'DHL', value: 40 },
		{ label: 'USPS', value: 55 }
	];
	let range = $state('30d');
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="copy">
				<span class="eyebrow">Where the spend goes</span>
				<h3>Ad spend, reconciled daily.</h3>
				<p>See every dollar mapped to a campaign the moment it clears.</p>
			</div>
			<div class="chart">
				<div class="range-tabs">
					{#each ['7d', '30d', '90d'] as r (r)}
						<button type="button" class:active={range === r} onclick={() => (range = r)}>{r}</button>
					{/each}
				</div>
				<svg viewBox="0 0 320 140" role="img" aria-label="Bar chart of spend by carrier">
					{#each bars as b, i (b.label)}
						<rect
							x={20 + i * 74}
							y={130 - b.value}
							width="40"
							height={b.value}
							fill={i === 1 ? 'var(--m-accent)' : 'var(--m-fg-subtle)'}
						/>
					{/each}
				</svg>
				<div class="labels">
					{#each bars as b (b.label)}
						<span>{b.label}</span>
					{/each}
				</div>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 32px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		align-items: center;
	}
	.copy {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--m-fg-subtle);
	}
	.copy h3 {
		margin: 0;
		font-size: 22px;
		font-weight: 500;
		color: var(--m-fg-strong);
	}
	.copy p {
		margin: 0;
		font-size: 14px;
		color: var(--m-fg-muted);
	}
	.chart {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.range-tabs {
		display: flex;
		gap: 6px;
		align-self: flex-end;
	}
	.range-tabs button {
		font-family: var(--font-mono);
		font-size: 11px;
		padding: 4px 10px;
		border-radius: 999px;
		border: 1px solid var(--m-border);
		background: transparent;
		color: var(--m-fg-muted);
		cursor: pointer;
	}
	.range-tabs button.active {
		background: var(--m-accent-soft);
		color: var(--m-accent);
		border-color: var(--m-accent-border);
	}
	.labels {
		display: flex;
		justify-content: space-around;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	@media (max-width: 640px) {
		.demo {
			grid-template-columns: 1fr;
		}
	}
</style>
