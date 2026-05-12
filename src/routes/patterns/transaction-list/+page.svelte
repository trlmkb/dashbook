<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { SearchFilter, SelectFilter } from '@dashfi/svelte/ui/table-filters';
	import {
		Table,
		TableHeader,
		TableBody,
		TableRow,
		TableHead,
		TableCell
	} from '@dashfi/svelte/ui/table';
	import { Pill } from '@dashfi/svelte/ui/pill';

	let search = $state('');
	let merchant = $state('');

	const merchantOptions = [
		{ value: 'meta', label: 'Meta' },
		{ value: 'google', label: 'Google' },
		{ value: 'stripe', label: 'Stripe' },
		{ value: 'aws', label: 'AWS' }
	];

	const rows = [
		{ date: '2026-05-09', merchant: 'Stripe', card: 'Engineering · 4429', amount: -2890.0, status: 'posted' as const },
		{ date: '2026-05-09', merchant: 'AWS', card: 'Engineering · 4429', amount: -12_408.55, status: 'posted' as const },
		{ date: '2026-05-08', merchant: 'Meta Ads', card: 'Marketing · 1180', amount: -8_200.0, status: 'posted' as const },
		{ date: '2026-05-08', merchant: 'Google Ads', card: 'Marketing · 1180', amount: -6_044.12, status: 'pending' as const },
		{ date: '2026-05-07', merchant: 'Vercel', card: 'Engineering · 4429', amount: -990.0, status: 'posted' as const },
		{ date: '2026-05-07', merchant: 'Anthropic', card: 'Engineering · 4429', amount: -2_000.0, status: 'pending' as const }
	];

	const filtered = $derived(
		rows.filter((r) => {
			const matchesSearch = search
				? `${r.merchant} ${r.card}`.toLowerCase().includes(search.toLowerCase())
				: true;
			const matchesMerchant = merchant
				? r.merchant.toLowerCase().includes(merchant.toLowerCase())
				: true;
			return matchesSearch && matchesMerchant;
		})
	);

	function fmt(n: number): string {
		const sign = n < 0 ? '−' : '';
		return `${sign}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
	}

	const example = `<script lang="ts">
\timport { SearchFilter, SelectFilter } from '@dashfi/svelte/ui/table-filters';
\timport { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@dashfi/svelte/ui/table';
\timport { Pill } from '@dashfi/svelte/ui/pill';

\tlet search = $state('');
\tlet merchant = $state('');
\tconst merchantOptions = [/* ... */];
\tconst rows = [/* ... */];

\tconst filtered = $derived(rows.filter(/* search + facet logic */));
<\/script>

<div class="toolbar">
\t<SearchFilter bind:value={search} placeholder="Search merchants or cards" />
\t<SelectFilter bind:value={merchant} options={merchantOptions} placeholder="Merchant" />
</div>

<Table>
\t<TableHeader>
\t\t<TableRow>
\t\t\t<TableHead>Date</TableHead>
\t\t\t<TableHead>Merchant</TableHead>
\t\t\t<TableHead>Card</TableHead>
\t\t\t<TableHead class="text-right">Amount</TableHead>
\t\t\t<TableHead>Status</TableHead>
\t\t</TableRow>
\t</TableHeader>
\t<TableBody>
\t\t{#each filtered as r}
\t\t\t<TableRow>
\t\t\t\t<TableCell class="font-mono tabular-nums">{r.date}</TableCell>
\t\t\t\t<TableCell>{r.merchant}</TableCell>
\t\t\t\t<TableCell class="text-muted-foreground">{r.card}</TableCell>
\t\t\t\t<TableCell class="text-right font-mono tabular-nums">{fmt(r.amount)}</TableCell>
\t\t\t\t<TableCell>
\t\t\t\t\t<Pill type={r.status === 'pending' ? 'warning' : 'base'}>{r.status}</Pill>
\t\t\t\t</TableCell>
\t\t\t</TableRow>
\t\t{/each}
\t</TableBody>
</Table>`;
</script>

<svelte:head><title>Transaction list — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Transaction list"
	description="The canonical Dash.fi data screen. Search at top-left, facet filters next to it, sortable monospace-numeric table below, status pills for ledger state. Drop-in for cards, statements, vendors, ad spend."
	uses={['SearchFilter', 'SelectFilter', 'Table', 'Pill']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="540px">
			{#snippet children(_m)}
				<div class="pattern-frame">
					<div class="toolbar">
						<div style:flex="0 1 280px">
							<SearchFilter bind:value={search} placeholder="Search merchants or cards" />
						</div>
						<div style:flex="0 1 180px">
							<SelectFilter
								bind:value={merchant}
								options={merchantOptions}
								placeholder="Merchant"
							/>
						</div>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Merchant</TableHead>
								<TableHead>Card</TableHead>
								<TableHead class="text-right">Amount</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{#each filtered as r (r.merchant + r.date)}
								<TableRow>
									<TableCell class="font-mono tabular-nums">{r.date}</TableCell>
									<TableCell>{r.merchant}</TableCell>
									<TableCell class="text-muted-foreground">{r.card}</TableCell>
									<TableCell class="text-right font-mono tabular-nums">{fmt(r.amount)}</TableCell>
									<TableCell>
										<Pill type={r.status === 'pending' ? 'warning' : 'base'}>{r.status}</Pill>
									</TableCell>
								</TableRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				Every Dash.fi data screen — transactions, vendors, cards, ad spend — has the same shape:
				a thin filter strip on top, a dense monospace table below. We commit to it because the
				operator audience already knows their way around this layout from accounting software,
				BI tools, and the production app.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Amounts are monospaced + tabular-numeric</strong> so dollar columns align
					and the eye doesn't have to scan jagged numerals.
				</li>
				<li>
					<strong>Status is a pill, never a colored row</strong>. Row tinting is reserved for
					"this needs your attention now" (rare). Pills carry the state without recruiting the
					whole row.
				</li>
				<li>
					<strong>The card name is muted</strong> against the merchant. Operators scan by
					merchant first; the card is context.
				</li>
				<li>
					<strong>Filters live in the toolbar</strong>, never above the data screen. Reducing
					vertical chrome means more rows visible.
				</li>
			</ul>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>+ DateRangeFilter</strong> in the toolbar when the dataset spans more than one
					reporting period.
				</li>
				<li>
					<strong>+ Pagination</strong> below the table when the dataset exceeds ~50 rows.
				</li>
				<li>
					<strong>EnhancedTable</strong> instead of <code>Table</code> when you need column
					sorting, persisted state, or row selection.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.pattern-frame {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
		max-width: 880px;
	}
	.toolbar {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.rationale {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 720px;
	}
	.rationale h3 {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 24px 0 4px;
	}
	.rationale h3:first-child {
		margin-top: 0;
	}
	.rationale p {
		font-size: 14px;
		line-height: 1.65;
		color: var(--fg);
		margin: 0;
	}
	.rationale ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.rationale li {
		padding: 10px 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		border-top: 1px solid var(--border);
	}
	.rationale li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.rationale code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
</style>
