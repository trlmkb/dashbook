<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { dataTableBand as spec } from '$specs/marketing/patterns/data-table-band';

	const rows = [
		{ shipment: '1Z 4V2 88 0F 12 3456', carrier: 'UPS', issue: 'Late delivery guarantee', amount: '$42.10', status: 'flagged' },
		{ shipment: '1Z 7K1 92 1A 88 7712', carrier: 'FedEx', issue: 'Dimensional weight error', amount: '$118.40', status: 'flagged' },
		{ shipment: '1Z 2M9 40 0C 44 9981', carrier: 'UPS', issue: 'Duplicate surcharge', amount: '$19.75', status: 'resolved' }
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="intro">
				<span class="eyebrow">The receipts</span>
				<h3>$340K in overcharges, found automatically.</h3>
			</div>
			<div class="scroll">
				<table class="data-band">
					<thead>
						<tr>
							<th>Shipment</th>
							<th>Carrier</th>
							<th>Issue</th>
							<th class="right">Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{#each rows as r (r.shipment)}
							<tr>
								<td class="mono">{r.shipment}</td>
								<td>{r.carrier}</td>
								<td class="muted">{r.issue}</td>
								<td class="right mono">{r.amount}</td>
								<td>
									<span class="chip" class:flagged={r.status === 'flagged'} class:resolved={r.status === 'resolved'}>
										{r.status === 'flagged' ? 'Flagged' : 'Resolved'}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<button type="button" class="more">+ 340 more findings</button>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 28px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.intro {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--m-fg-subtle);
	}
	.intro h3 {
		margin: 0;
		font-size: 22px;
		font-weight: 500;
		color: var(--m-fg-strong);
	}
	.scroll {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}
	.data-band {
		width: 100%;
		border-collapse: collapse;
		min-width: 520px;
	}
	.data-band th {
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--m-fg-subtle);
		text-align: left;
		padding: 10px 14px;
	}
	.data-band td {
		padding: 12px 14px;
		border-top: 1px solid var(--m-border);
		font-size: 14px;
		color: var(--m-fg-muted);
	}
	.data-band td.mono {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
	.right {
		text-align: right;
	}
	.chip {
		font-size: 11px;
		padding: 2px 8px;
		border-radius: 999px;
	}
	.chip.flagged {
		color: var(--m-warn);
		background: var(--m-warn-soft);
		border: 1px solid var(--m-warn-border);
	}
	.chip.resolved {
		color: var(--m-positive);
		background: var(--m-positive-soft);
		border: 1px solid var(--m-positive-border);
	}
	.more {
		align-self: flex-start;
		font: inherit;
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		font-size: 13px;
		color: var(--m-fg-muted);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
