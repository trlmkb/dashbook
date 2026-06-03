<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { statTrio as spec } from '$specs/marketing/patterns/stat-trio';

	const stats = [
		{ value: '$300M+', label: 'Overcharges recovered' },
		{ value: '98.4%', label: 'Invoices auto-audited' },
		{ value: '12', label: 'Carriers supported' }
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<dl class="stat-trio">
				{#each stats as stat (stat.label)}
					<div class="stat">
						<dd class="value">{stat.value}</dd>
						<dt class="label">{stat.label}</dt>
					</div>
				{/each}
			</dl>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 48px 40px;
	}
	.stat-trio {
		display: grid;
		gap: 24px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0;
	}
	.stat {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.value {
		margin: 0;
		font-family: var(--font-mono);
		font-weight: 400;
		font-size: clamp(2rem, 5vw, 3.25rem);
		line-height: 1;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
		color: var(--m-accent);
	}
	.label {
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	@media (max-width: 640px) {
		.stat-trio {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
