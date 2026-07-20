<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { actionPlan as spec } from '$specs/marketing/patterns/action-plan';

	const reportItems = [
		{
			rank: 1,
			title: 'Negotiate DAS Commercial discount (target 50%)',
			effort: 'Medium',
			timeline: '30 days',
			value: '$19,280/yr'
		},
		{
			rank: 2,
			title: 'Request earned discount tier review with 52-week volume verification',
			effort: 'Low',
			timeline: 'Immediate',
			value: '$19,200/yr'
		},
		{
			rank: 3,
			title: 'Switch to online-only pickup scheduling',
			effort: 'Low',
			timeline: '1 week',
			value: '$14,637/yr'
		}
	];

	const briefItems = [
		{
			label: 'Move summarization to a smaller model',
			amount: '$4,200/mo',
			owner: 'Owner: Platform',
			status: 'In progress',
			statusTone: 'accent' as const
		},
		{
			label: 'Fix prompt caching on prod-api',
			amount: '$2,800/mo',
			owner: 'Owner: Backend',
			status: 'Pending',
			statusTone: 'muted' as const
		},
		{
			label: 'Consolidate and tag stray API keys',
			amount: '$900/mo',
			owner: 'Owner: DevOps',
			status: 'Complete',
			statusTone: 'positive' as const
		}
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">Report variant — /parcel-analytics shape</p>
			<div class="action-plan-report">
				{#each reportItems as item (item.rank)}
					<div class="item">
						<span class="rank">#{item.rank}</span>
						<div class="body">
							<p class="title">{item.title}</p>
							<p class="meta">
								<span>Effort: {item.effort}</span>
								<span class="gap">Timeline: {item.timeline}</span>
							</p>
						</div>
						<span class="value">{item.value}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="demo">
			<p class="eyebrow">Brief variant — /ai-spend-audit shape</p>
			<div class="action-plan-brief">
				<div class="brief-head">
					<span class="brief-icon" aria-hidden="true">✓</span>
					<span class="brief-title">Action plan</span>
					<span class="brief-eyebrow">Ranked by impact</span>
				</div>
				<ul class="brief-rows">
					{#each briefItems as item (item.label)}
						<li class="brief-row">
							<div class="row-main">
								<span class="label">{item.label}</span>
								<span class="amount">{item.amount}</span>
							</div>
							<div class="row-meta">
								<span class="owner">{item.owner}</span>
								<span class="status" data-tone={item.statusTone}>{item.status}</span>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 32px;
	}
	.demo + .demo {
		margin-top: 24px;
	}
	.eyebrow {
		margin: 0 0 20px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}

	/* ── Report variant (parcel-analytics / ShipShotAiReport shape) ── */
	.action-plan-report {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 640px;
	}
	.item {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 18px 20px;
		border-radius: 12px;
		background: var(--m-card);
		border: 1px solid var(--m-border);
	}
	.rank {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 34px;
		height: 26px;
		padding: 0 8px;
		border-radius: 8px;
		background: var(--m-accent-soft);
		color: var(--m-accent);
		font-size: 12px;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}
	.body {
		flex: 1 1 auto;
		min-width: 0;
	}
	.title {
		margin: 0;
		font-size: 15px;
		font-weight: 600;
		color: var(--m-fg-strong);
		line-height: 1.3;
	}
	.meta {
		margin: 5px 0 0;
		font-size: 12.5px;
		color: var(--m-fg-subtle);
	}
	.meta .gap {
		margin-left: 18px;
	}
	.value {
		flex: 0 0 auto;
		font-size: 15px;
		font-weight: 700;
		color: var(--m-positive);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	/* ── Brief variant (ai-spend-audit / .asa-brief shape) ── */
	.action-plan-brief {
		max-width: 480px;
		border: 1px solid var(--m-border-strong);
		border-radius: 16px;
		background: var(--m-card);
		overflow: hidden;
	}
	.brief-head {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 18px;
		border-bottom: 1px solid var(--m-border);
	}
	.brief-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 8px;
		background: var(--m-accent-soft);
		color: var(--m-accent);
		flex: none;
		font-size: 13px;
	}
	.brief-title {
		font-family: var(--font-mono);
		font-size: 15px;
		font-weight: 400;
		color: var(--m-fg-strong);
	}
	.brief-eyebrow {
		margin-left: auto;
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
	.brief-rows {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.brief-row {
		padding: 15px 18px;
		border-bottom: 1px solid var(--m-border);
	}
	.brief-row:last-child {
		border-bottom: 0;
	}
	.row-main {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 14px;
	}
	.label {
		font-size: 14.5px;
		font-weight: 600;
		line-height: 1.35;
		color: var(--m-fg-strong);
	}
	.amount {
		flex: none;
		font-family: var(--font-mono);
		font-size: 17px;
		font-weight: 200;
		font-variant-numeric: tabular-nums;
		color: var(--m-accent);
	}
	.row-meta {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 9px;
	}
	.owner {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	.status {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		height: 22px;
		padding: 0 9px;
		border-radius: 6px;
		font-family: var(--font-mono);
		font-size: 10.5px;
		font-weight: 600;
		letter-spacing: 0.02em;
	}
	.status[data-tone='accent'] {
		background: var(--m-accent-soft);
		color: var(--m-accent);
	}
	.status[data-tone='positive'] {
		background: var(--m-positive-soft);
		color: var(--m-positive);
	}
	.status[data-tone='muted'] {
		background: var(--m-negative-soft);
		color: var(--m-fg-subtle);
	}
</style>
