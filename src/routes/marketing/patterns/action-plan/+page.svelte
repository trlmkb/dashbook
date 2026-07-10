<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { actionPlan as spec } from '$specs/marketing/patterns/action-plan';

	const items = [
		{
			index: '01',
			title: 'Switch 40% of parcel volume to Ground',
			description: 'Ground-eligible packages are currently shipping Express.',
			effort: 'Low',
			timeline: '1 week',
			impact: '$8.2k/mo'
		},
		{
			index: '02',
			title: 'Renegotiate the FedEx base rate',
			description: 'Your volume tier qualifies for a better bracket than you’re on.',
			effort: 'Medium',
			timeline: '4–6 weeks',
			impact: '$14k/mo'
		},
		{
			index: '03',
			title: 'Enable dimensional-weight pre-check',
			description: 'Catch DIM-weight billing errors before they post.',
			effort: 'Low',
			timeline: '2 days',
			impact: '$3.1k/mo'
		}
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<ol class="action-plan">
				{#each items as item (item.index)}
					<li class="item">
						<span class="index">{item.index}</span>
						<div class="body">
							<h3>{item.title}</h3>
							<p>{item.description}</p>
							<div class="meta">
								<span>Effort: {item.effort}</span>
								<span>Timeline: {item.timeline}</span>
								<span class="impact">Impact: {item.impact}</span>
							</div>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 32px;
	}
	.action-plan {
		list-style: none;
		margin: 0;
		padding: 0;
		max-width: 640px;
	}
	.item {
		display: flex;
		gap: 20px;
		padding: 24px 0;
		border-top: 1px solid var(--m-border);
	}
	.item:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.index {
		font-family: var(--font-mono);
		font-size: 28px;
		font-weight: 300;
		color: var(--m-accent);
		flex-shrink: 0;
	}
	.body h3 {
		margin: 0 0 6px;
		font-size: 18px;
		font-weight: 600;
		color: var(--m-fg-strong);
	}
	.body p {
		margin: 0 0 10px;
		color: var(--m-fg-muted);
		font-size: 14px;
	}
	.meta {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--m-fg-subtle);
	}
	.meta .impact {
		color: var(--m-positive);
	}
</style>
