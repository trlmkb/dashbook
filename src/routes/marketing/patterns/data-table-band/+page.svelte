<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { dataTableBand as spec } from '$specs/marketing/patterns/data-table-band';

	type Row = {
		issue: string;
		severity: 'High' | 'Medium';
		monthly: string;
		annual: string;
		desc: string;
	};

	// Real hardcoded rows from ShipShotAudit.astro (dash.fi rev a5be701).
	const rows: Row[] = [
		{
			issue: 'Earned Discount Tier Misalignment',
			severity: 'High',
			monthly: '$1,600',
			annual: '$19,200',
			desc: 'Shipping volume qualifies for 11% earned discount tier but only receiving 8% tier.'
		},
		{
			issue: 'Direct Signature Overcharges',
			severity: 'High',
			monthly: '$1,213',
			annual: '$14,556',
			desc: '50% contracted discount on Direct Signature is not being applied to invoices.'
		},
		{
			issue: 'DIM Divisor Errors',
			severity: 'Medium',
			monthly: '$550',
			annual: '$6,600',
			desc: 'Some Express shipments billed using DIM divisor 139 instead of contracted 194.'
		},
		{
			issue: 'Missing Online Pickup Discounts',
			severity: 'Medium',
			monthly: '$400',
			annual: '$4,800',
			desc: 'Online-scheduled pickups not receiving the contracted free pickup benefit.'
		}
	];
	const totalMonthly = '$3,763';
	const totalAnnual = '$45,156';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">
				Real shape — normally framed inside the ShipShotAudit product-screenshot mockup (tabs,
				sidebar, KPI cards, alert banner), not bare on the page. See Recipe for the full frame.
			</p>
			<div class="card">
				<div class="card-head">Compliance Violations</div>
				<div class="scroll">
					<table class="dtb-table">
						<thead>
							<tr>
								<th>ISSUE</th>
								<th class="center">SEVERITY</th>
								<th class="right">MONTHLY COST</th>
								<th class="right">ANNUAL COST</th>
								<th>DESCRIPTION</th>
							</tr>
						</thead>
						<tbody>
							{#each rows as r (r.issue)}
								<tr>
									<td class="issue">{r.issue}</td>
									<td class="center">
										<span class="badge" class:high={r.severity === 'High'} class:medium={r.severity === 'Medium'}>
											{r.severity}
										</span>
									</td>
									<td class="right mono">{r.monthly}</td>
									<td class="right mono strong">{r.annual}</td>
									<td class="desc">{r.desc}</td>
								</tr>
							{/each}
							<tr class="total">
								<td class="issue">Total</td>
								<td class="center"></td>
								<td class="right mono strong">{totalMonthly}</td>
								<td class="right mono strong">{totalAnnual}</td>
								<td class="desc"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<p class="caption">
				No "+N more" link in the real source — the table is a fixed 4-row dataset ending in a
				Total row. High-severity red is hardcoded in the source and has no matching `--m-*` role
				(`--m-negative` is monochrome ink by policy); see the spec's gotchas.
			</p>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
	.card {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		border-radius: 12px;
		overflow: hidden;
	}
	.card-head {
		padding: 14px 20px;
		font-size: 13px;
		font-weight: 600;
		color: var(--m-fg-strong);
		border-bottom: 1px solid var(--m-border);
	}
	.scroll {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}
	.dtb-table {
		width: 100%;
		min-width: 640px;
		border-collapse: collapse;
	}
	.dtb-table th {
		text-align: left;
		padding: 11px 16px;
		font-size: 10.5px;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--m-fg-subtle);
		border-bottom: 1px solid var(--m-border);
		white-space: nowrap;
	}
	.dtb-table td {
		padding: 14px 16px;
		font-size: 12px;
		color: var(--m-fg-strong);
		border-bottom: 1px solid var(--m-border);
		vertical-align: middle;
	}
	.dtb-table tbody tr:last-child td {
		border-bottom: none;
	}
	.issue {
		font-weight: 500;
		white-space: nowrap;
		width: 1%;
	}
	.center {
		text-align: center;
	}
	.right {
		text-align: right;
	}
	.mono {
		font-variant-numeric: tabular-nums;
	}
	.strong {
		font-weight: 600;
	}
	.desc {
		color: var(--m-fg-muted);
		font-size: 11.5px;
		line-height: 1.45;
		max-width: 320px;
	}
	.badge {
		display: inline-flex;
		align-items: center;
		padding: 2px 10px;
		border-radius: 999px;
		font-size: 11px;
		font-weight: 600;
	}
	/* High severity: genuine red in the real source (ShipShotAudit). No
	   --m-* role covers this — --m-negative is monochrome ink by policy.
	   Hardcoded here to match reality, flagged in the spec as an open gap. */
	.badge.high {
		color: #b42318;
		background: rgba(180, 35, 24, 0.1);
	}
	.badge.medium {
		color: var(--m-warn);
		background: var(--m-warn-soft);
		border: 1px solid var(--m-warn-border);
	}
	.total td {
		background: rgba(180, 35, 24, 0.06);
		font-weight: 600;
	}
	.caption {
		margin: 0;
		font-size: 12px;
		line-height: 1.5;
		color: var(--m-fg-subtle);
	}
</style>
