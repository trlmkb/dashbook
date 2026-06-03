<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { statStrip as spec } from '$specs/marketing/patterns/stat-strip';

	const stats = [
		{ value: '$300M+', label: 'Recovered' },
		{ value: '98.4%', label: 'Auto-audited' },
		{ value: '12', label: 'Carriers' },
		{ value: '4.2d', label: 'Avg. recovery' }
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<section class="stat-strip" data-marketing-dark>
				<dl class="stats">
					{#each stats as stat (stat.label)}
						<div class="stat">
							<dd class="value">{stat.value}</dd>
							<dt class="label">{stat.label}</dt>
						</div>
					{/each}
				</dl>
				<span class="tag">ink · [data-marketing-dark]</span>
			</section>
		</div>
		<p class="cap">
			A full-width band of 4 stats with <code>--m-border</code> hairlines between cells. On the ink
			band the values re-resolve to paper via <code>data-marketing-dark</code>; dividers drop when
			the strip stacks on mobile.
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		border: 1px solid var(--m-border);
	}
	.stat-strip {
		position: relative;
		background: var(--m-near-black);
		padding: 44px max(24px, 3vw);
	}
	.tag {
		position: absolute;
		top: 10px;
		right: 12px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
	.stats {
		display: grid;
		gap: 0;
		margin: 0;
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
	.stat {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding-inline: 28px;
	}
	.stat + .stat {
		border-left: 1px solid var(--m-border);
	}
	.value {
		margin: 0;
		font-family: var(--font-mono);
		font-weight: 400;
		font-size: clamp(1.75rem, 4vw, 3rem);
		line-height: 1;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
		color: var(--m-fg-strong);
	}
	.label {
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	@media (max-width: 720px) {
		.stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 28px 0;
		}
		.stat:nth-child(odd) {
			border-left: 0;
		}
	}
	@media (max-width: 480px) {
		.stats {
			grid-template-columns: minmax(0, 1fr);
		}
		.stat + .stat {
			border-left: 0;
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
