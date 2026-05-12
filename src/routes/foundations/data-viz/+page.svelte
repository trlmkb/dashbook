<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CopyValue from '$chrome/CopyValue.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import Minus from '@lucide/svelte/icons/minus';
	import {
		EnhancedTable,
		type EnhancedTableColumnDef
	} from '@dashfi/svelte/ui/enhanced-table';
	import { renderSnippet } from '@dashfi/svelte/ui/data-table';
	import { Pill } from '@dashfi/svelte/ui/pill';

	const moneyRows = [
		{ label: 'Operations', a: '$2,408,210.55', b: '$182,003.10', c: '$24.95' },
		{ label: 'Vendors', a: '$986,540.00', b: '$1,400,082.22', c: '$1,002.00' },
		{ label: 'Travel', a: '$47,200.40', b: '$8,710.00', c: '$220.50' }
	];

	const semantics = [
		{
			role: 'success',
			label: 'Up · positive',
			hex: '#2B605C',
			cssVar: '--color-success',
			note: 'Revenue, balance growth, anything trending the right way. Same hex as --brand — single jade.'
		},
		{
			role: 'warning',
			label: 'Down · negative',
			hex: '#FF4000',
			cssVar: '--color-warning',
			note: 'Spend variance over budget, declined transactions, alerts. Brand-constant across modes.'
		},
		{
			role: 'neutral',
			label: 'Flat · no change',
			hex: '#6E7878',
			cssVar: '--color-neutral',
			note: 'No movement, draft state, archived data. Inherits --fg-muted.'
		}
	];

	const chartSeries = [
		{ name: 'Jade', hex: '#2B605C', cssVar: '--dash-jade' },
		{ name: 'Cobalt', hex: '#354CEF', cssVar: '--dash-cobalt' },
		{ name: 'Periwinkle', hex: '#B6C1F2', cssVar: '--dash-periwinkle' },
		{ name: 'Ink', hex: '#25261D', cssVar: '--dash-ink' },
		{ name: 'Graphite', hex: '#505148', cssVar: '--dash-graphite' }
	];

	const formatExamples = [
		{ kind: 'Full currency', value: '$2,408,210', note: 'Tables, ledgers, exact-amount surfaces.' },
		{ kind: 'Compact currency', value: '$2.4M', note: 'KPIs, dashboards, hero numbers.' },
		{ kind: 'Percent delta', value: '+12.4%', note: 'Up signed with a plus, never bare.' },
		{ kind: 'Negative amount', value: '−$240', note: 'Unicode minus U+2212, not the hyphen-minus.' },
		{ kind: 'Cardinal count', value: '2,408,210 cards', note: 'Thousands grouped, units lowercase.' }
	];

	const intlSnippet = `// Full currency for tables and ledgers
const fmtMoney = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
fmtMoney.format(2408210.55); // "$2,408,210.55"

// Compact currency for KPIs and dashboards
const fmtCompact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 1
});
fmtCompact.format(2408210); // "$2.4M"`;

	const deltaSnippet = `// Signed percentage delta with locale-aware minus glyph
const fmtDelta = new Intl.NumberFormat('en-US', {
  style: 'percent',
  signDisplay: 'exceptZero',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});
fmtDelta.format(0.124);   // "+12.4%"
fmtDelta.format(-0.018);  // "−1.8%"  (uses U+2212)`;

	type LedgerStatus = 'posted' | 'pending';
	type LedgerRow = {
		id: string;
		date: string;
		merchant: string;
		card: string;
		amount: number;
		status: LedgerStatus;
	};

	let ledgerRows = $state<LedgerRow[]>([
		{ id: 'tx_01', date: '2026-05-09', merchant: 'Stripe', card: 'Engineering · 4429', amount: -2890.0, status: 'posted' },
		{ id: 'tx_02', date: '2026-05-09', merchant: 'AWS', card: 'Engineering · 4429', amount: -12408.55, status: 'posted' },
		{ id: 'tx_03', date: '2026-05-08', merchant: 'Meta Ads', card: 'Marketing · 1180', amount: -8200.0, status: 'posted' },
		{ id: 'tx_04', date: '2026-05-08', merchant: 'Google Ads', card: 'Marketing · 1180', amount: -6044.12, status: 'pending' },
		{ id: 'tx_05', date: '2026-05-07', merchant: 'Vercel', card: 'Engineering · 4429', amount: -990.0, status: 'posted' },
		{ id: 'tx_06', date: '2026-05-07', merchant: 'Anthropic', card: 'Engineering · 4429', amount: -2000.0, status: 'pending' },
		{ id: 'tx_07', date: '2026-05-06', merchant: 'Datadog', card: 'Engineering · 4429', amount: -1480.0, status: 'posted' },
		{ id: 'tx_08', date: '2026-05-06', merchant: 'Notion', card: 'Operations · 7720', amount: -240.0, status: 'posted' }
	]);

	// signDisplay: 'exceptZero' emits the U+2212 minus glyph automatically.
	const fmtLedgerAmount = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		signDisplay: 'exceptZero',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	const ledgerColumns: EnhancedTableColumnDef<LedgerRow>[] = [
		{ accessorKey: 'date', header: 'Date', sortable: true, cellClassName: 'font-mono tabular-nums' },
		{ accessorKey: 'merchant', header: 'Merchant', sortable: true },
		{ accessorKey: 'card', header: 'Card', cellClassName: 'text-muted-foreground' },
		{
			accessorKey: 'amount',
			header: 'Amount',
			sortable: true,
			align: 'right',
			cellClassName: 'font-mono tabular-nums',
			cell: ({ row }) => fmtLedgerAmount.format(row.getValue<number>('amount'))
		},
		{
			accessorKey: 'status',
			header: 'Status',
			// Structural cast: the lib bundles its own `svelte` peer, so its `Snippet`
			// nominal-types differently from the app's. Cast keeps the shape, no `any`.
			cell: ({ row }) =>
				renderSnippet(
					statusPill as unknown as Parameters<typeof renderSnippet<LedgerStatus>>[0],
					row.getValue<LedgerStatus>('status')
				)
		}
	];

	const ledgerExample = `<script lang="ts">
\timport { EnhancedTable, type EnhancedTableColumnDef } from '@dashfi/svelte/ui/enhanced-table';
\timport { renderSnippet } from '@dashfi/svelte/ui/data-table';
\timport { Pill } from '@dashfi/svelte/ui/pill';

\ttype LedgerStatus = 'posted' | 'pending';
\ttype LedgerRow = {
\t\tid: string;
\t\tdate: string;
\t\tmerchant: string;
\t\tcard: string;
\t\tamount: number;
\t\tstatus: LedgerStatus;
\t};

\tconst rows: LedgerRow[] = [/* ... */];

\t// signDisplay: 'exceptZero' emits the U+2212 minus glyph automatically.
\tconst fmtAmount = new Intl.NumberFormat('en-US', {
\t\tstyle: 'currency',
\t\tcurrency: 'USD',
\t\tsignDisplay: 'exceptZero',
\t\tminimumFractionDigits: 2,
\t\tmaximumFractionDigits: 2
\t});

\tconst columns: EnhancedTableColumnDef<LedgerRow>[] = [
\t\t{ accessorKey: 'date', header: 'Date', sortable: true, cellClassName: 'font-mono tabular-nums' },
\t\t{ accessorKey: 'merchant', header: 'Merchant', sortable: true },
\t\t{ accessorKey: 'card', header: 'Card', cellClassName: 'text-muted-foreground' },
\t\t{
\t\t\taccessorKey: 'amount',
\t\t\theader: 'Amount',
\t\t\tsortable: true,
\t\t\talign: 'right',
\t\t\tcellClassName: 'font-mono tabular-nums',
\t\t\tcell: ({ row }) => fmtAmount.format(row.getValue<number>('amount'))
\t\t},
\t\t{
\t\t\taccessorKey: 'status',
\t\t\theader: 'Status',
\t\t\tcell: ({ row }) => renderSnippet(statusPill, row.getValue<LedgerStatus>('status'))
\t\t}
\t];
<\/script>

{#snippet statusPill(status: LedgerStatus)}
\t<Pill type={status === 'pending' ? 'warning' : 'base'}>{status}</Pill>
{/snippet}

<EnhancedTable
\t{columns}
\tbind:data={rows}
\tsearchable
\tsearchPlaceholder="Search merchants or cards"
\tpageSize={10}
/>`;
</script>

<svelte:head><title>Data viz — Foundations — Dashbook</title></svelte:head>

<InnerPage section="/foundations" wide>
	<PageHeader
		label="Foundations / Data viz"
		title="Data viz."
		lede="Numbers above all. Tables, charts, and KPIs share one palette and one number-formatting opinion."
	/>

	<Section
		label="Tabular numerics"
		note="Money columns get font-variant-numeric: tabular-nums so digits align by column. Without it, proportional digits drift and the eye loses the row."
	>
		<div class="dual">
			<div class="dual-cell">
				<div class="cell-cap">Without tabular-nums</div>
				<table class="money proportional">
					<tbody>
						{#each moneyRows as r (r.label)}
							<tr>
								<td class="m-l">{r.label}</td>
								<td class="m-v">{r.a}</td>
								<td class="m-v">{r.b}</td>
								<td class="m-v">{r.c}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="dual-cell">
				<div class="cell-cap">With tabular-nums</div>
				<table class="money tabular">
					<tbody>
						{#each moneyRows as r (r.label)}
							<tr>
								<td class="m-l">{r.label}</td>
								<td class="m-v tabular-nums">{r.a}</td>
								<td class="m-v tabular-nums">{r.b}</td>
								<td class="m-v tabular-nums">{r.c}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<div class="snippet-wrap">
			<CodeSnippet
				language="css"
				code={`/* Apply globally to money columns or wrap them with .tabular-nums */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}`}
			/>
		</div>
	</Section>

	<Section label="Semantic colors" note="Three colours, three meanings. Up is jade, down is orange, flat is muted. No green vs. red — that swap is the one fintech tell we don't repeat.">
		<div class="sem-grid">
			{#each semantics as s (s.role)}
				<div class="sem-card">
					<div class="sem-swatch" style:background={s.hex}>
						<span class="sem-icon" aria-hidden="true">
							{#if s.role === 'success'}<ArrowUp size={20} strokeWidth={1.5} color="#FAF8F1" />
							{:else if s.role === 'warning'}<ArrowDown size={20} strokeWidth={1.5} color="#FAF8F1" />
							{:else}<Minus size={20} strokeWidth={1.5} color="#FAF8F1" />{/if}
						</span>
					</div>
					<div class="sem-meta">
						<div class="sem-label">{s.label}</div>
						<div class="sem-tokens">
							<CopyValue value={s.cssVar} label={s.cssVar} />
							<CopyValue value={s.hex} label={`${s.role} hex`} />
						</div>
						<p class="sem-note">{s.note}</p>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Chart palette" note="Categorical series, drawn from the base palette. Maximum five — beyond that the eye stops separating them and the chart owes its reader a redesign.">
		<div class="series">
			{#each chartSeries as c, i (c.cssVar)}
				<div class="series-item">
					<div class="series-swatch" style:background={c.hex}></div>
					<div class="series-meta">
						<div class="series-name">
							<span class="series-idx tabular-nums">{(i + 1).toString().padStart(2, '0')}</span>
							<span class="series-label">{c.name}</span>
						</div>
						<div class="series-tokens">
							<CopyValue value={c.cssVar} label={c.cssVar} />
							<CopyValue value={c.hex} label={`${c.name} hex`} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="What we don't ship">
		<ul class="rules">
			<li><strong>Pie.</strong> Slice angles read worse than bar heights for every comparison.</li>
			<li><strong>Donut.</strong> Pie with worse data-ink ratio.</li>
			<li><strong>Radar.</strong> Polygons hide direction and magnitude both.</li>
		</ul>
		<p class="rules-foot">
			Bar, line, and area cover ~95% of fintech needs and are honest about magnitude. When you need
			a part-to-whole view, use a stacked bar.
		</p>
	</Section>

	<Section label="Number formatting" note="Intl.NumberFormat is the single source. Components never hand-roll thousands separators.">
		<div class="fmt-grid">
			{#each formatExamples as f (f.kind)}
				<div class="fmt-card">
					<div class="fmt-kind">{f.kind}</div>
					<div class="fmt-value tabular-nums">{f.value}</div>
					<div class="fmt-note">{f.note}</div>
				</div>
			{/each}
		</div>

		<div class="snippet-wrap">
			<CodeSnippet language="typescript" code={intlSnippet} />
		</div>
		<div class="snippet-wrap">
			<CodeSnippet language="typescript" code={deltaSnippet} />
		</div>
	</Section>

	<Section
		label="EnhancedTable for ledger data"
		note="The workhorse for any ledger, transaction, or activity view in Dash.fi. Sortable columns, integrated pagination, filter toolbar, column visibility controls, row selection. Built on @tanstack/table-core — column defs are TanStack defs extended with a few Dash conveniences (align, sortable, cellClassName, sticky)."
	>
		<PreviewCanvas minHeight="380px">
			{#snippet children(_m)}
				<div class="ledger-frame">
					<EnhancedTable
						columns={ledgerColumns}
						bind:data={ledgerRows}
						searchable
						searchPlaceholder="Search merchants or cards"
						pageSize={10}
					/>
				</div>
			{/snippet}
		</PreviewCanvas>

		<div class="snippet-wrap">
			<CodeSnippet language="svelte" code={ledgerExample} />
		</div>

		<div class="reach">
			<div class="reach-col">
				<div class="reach-head">When to reach for it</div>
				<ul class="reach-list">
					<li>Datasets larger than ~50 rows — pagination becomes load-bearing, not optional.</li>
					<li>Users need sorting, search, or pagination without building a custom toolbar.</li>
					<li>Column visibility should persist per user (customizable activity views).</li>
					<li>Row-level selection drives a bulk action (export, categorize, reconcile).</li>
					<li>Server-side fetching with <code>totalItems</code> + <code>onPaginationChange</code>.</li>
				</ul>
			</div>
			<div class="reach-col">
				<div class="reach-head">When not to</div>
				<ul class="reach-list">
					<li>Small static lists under ~20 rows — raw <code>Table</code> is lighter and reads cleaner.</li>
					<li>Summary breakdowns where rows are aggregates, not records.</li>
					<li>Header / overview rows inside a dashboard composition — use <code>Card</code> + KPIs.</li>
				</ul>
			</div>
		</div>
	</Section>
</InnerPage>

{#snippet statusPill(status: LedgerStatus)}
	<Pill type={status === 'pending' ? 'warning' : 'base'}>{status}</Pill>
{/snippet}

<style>
	.dual {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.dual-cell {
		background: var(--bg);
		padding: 20px;
	}
	.cell-cap {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 16px;
	}
	.money {
		width: 100%;
		border-collapse: collapse;
	}
	.money td {
		padding: 8px 8px 8px 0;
		border-bottom: 1px solid var(--border);
		font-size: 13px;
	}
	.money tr:last-child td {
		border-bottom: 0;
	}
	.m-l {
		color: var(--fg);
		width: 100px;
	}
	.m-v {
		text-align: right;
		color: var(--fg);
	}
	.money.proportional .m-v {
		font-family: var(--font-sans);
		font-variant-numeric: normal;
	}
	.money.tabular .m-v {
		font-family: var(--font-mono);
	}

	.snippet-wrap {
		margin-top: 24px;
	}

	.sem-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.sem-card {
		background: var(--bg);
		display: flex;
		flex-direction: column;
	}
	.sem-swatch {
		min-height: 96px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.sem-meta {
		padding: 16px 20px 20px;
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.sem-label {
		font-size: 13px;
		font-weight: 500;
		color: var(--fg);
	}
	.sem-tokens {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.sem-note {
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 0;
	}

	.series {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.series-item {
		background: var(--bg);
		display: flex;
		flex-direction: column;
	}
	.series-swatch {
		height: 64px;
	}
	.series-meta {
		padding: 14px 16px 16px;
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.series-name {
		display: flex;
		gap: 10px;
		align-items: baseline;
	}
	.series-idx {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--fg-muted);
	}
	.series-label {
		font-size: 13px;
		color: var(--fg);
	}
	.series-tokens {
		display: flex;
		flex-direction: column;
		gap: 6px;
		align-items: flex-start;
	}

	.rules {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.rules li {
		padding: 16px 0;
		border-top: 1px solid var(--border);
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
	}
	.rules li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.rules-foot {
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.6;
		color: var(--fg-muted);
		max-width: 640px;
	}

	.fmt-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		margin-bottom: 8px;
	}
	.fmt-card {
		background: var(--bg);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.fmt-kind {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.fmt-value {
		font-family: var(--font-mono);
		font-size: 18px;
		color: var(--fg);
		letter-spacing: -0.02em;
	}
	.fmt-note {
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg-muted);
	}

	.ledger-frame {
		width: 100%;
		max-width: 880px;
	}

	.reach {
		margin-top: 24px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.reach-col {
		background: var(--bg);
		padding: 20px 24px 24px;
	}
	.reach-head {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 12px;
	}
	.reach-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.reach-list li {
		padding: 10px 0;
		font-size: 13px;
		line-height: 1.6;
		color: var(--fg);
		border-top: 1px solid var(--border);
	}
	.reach-list li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.reach-list code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}

	@media (max-width: 960px) {
		.dual,
		.sem-grid,
		.reach {
			grid-template-columns: 1fr;
		}
		.series,
		.fmt-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 480px) {
		.series,
		.fmt-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
