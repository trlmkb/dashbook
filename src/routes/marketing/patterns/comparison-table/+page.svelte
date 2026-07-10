<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { comparisonTable as spec } from '$specs/marketing/patterns/comparison-table';

	const columns = ['Manual tracking', 'Dash.fi'];
	const rows: { label: string; values: (boolean | string)[] }[] = [
		{ label: 'Real-time spend visibility', values: [false, true] },
		{ label: 'Automated receipt matching', values: [false, true] },
		{ label: 'Carrier contract audit', values: ['Quarterly, by hand', true] },
		{ label: 'Cashback on spend', values: [false, '1.5%'] }
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="cmp-scroll">
				<table class="cmp">
					<thead>
						<tr>
							<th></th>
							{#each columns as c, i (c)}
								<th class:us={i === columns.length - 1}>{c}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each rows as row (row.label)}
							<tr>
								<td class="label">{row.label}</td>
								{#each row.values as v, i (i)}
									<td class:us={i === row.values.length - 1}>
										{#if v === true}
											<span class="check">✓</span>
											<span class="sr-only">Included</span>
										{:else if v === false}
											<span class="dash">—</span>
											<span class="sr-only">Not included</span>
										{:else}
											{v}
										{/if}
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 24px;
	}
	.cmp-scroll {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}
	.cmp {
		width: 100%;
		border-collapse: collapse;
		min-width: 480px;
	}
	.cmp th,
	.cmp td {
		padding: 14px 18px;
		text-align: left;
		border-bottom: 1px solid var(--m-border);
		font-size: 14px;
	}
	.cmp th {
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--m-fg-subtle);
	}
	.cmp td.label {
		color: var(--m-fg-strong);
		font-weight: 500;
	}
	.cmp .us {
		background: var(--m-surface-2, rgba(43, 96, 92, 0.05));
		border-left: 1px solid var(--m-accent-border);
		border-right: 1px solid var(--m-accent-border);
	}
	.check {
		color: var(--m-positive);
		font-weight: 600;
	}
	.dash {
		color: var(--m-fg-subtle);
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
	}
</style>
