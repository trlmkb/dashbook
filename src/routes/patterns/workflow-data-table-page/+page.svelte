<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
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
	import { Checkbox } from '@dashfi/svelte/ui/checkbox';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import MoreHorizontal from '@lucide/svelte/icons/more-horizontal';
	import Plus from '@lucide/svelte/icons/plus';

	type Invoice = {
		id: string;
		vendor: string;
		po: string;
		amount: number;
		status: 'pending' | 'approved' | 'paid';
		due: string;
	};

	const rows: Invoice[] = [
		{ id: 'inv_001', vendor: 'Acme Logistics', po: 'PO-4421', amount: 12_408.55, status: 'pending', due: '2026-05-18' },
		{ id: 'inv_002', vendor: 'Northwind Print', po: 'PO-4422', amount: 2_890.0, status: 'pending', due: '2026-05-19' },
		{ id: 'inv_003', vendor: 'Meridian Studios', po: 'PO-4423', amount: 8_200.0, status: 'approved', due: '2026-05-20' },
		{ id: 'inv_004', vendor: 'Cobalt Industrial', po: 'PO-4424', amount: 990.0, status: 'pending', due: '2026-05-21' },
		{ id: 'inv_005', vendor: 'Harbor Freight Co.', po: 'PO-4425', amount: 6_044.12, status: 'approved', due: '2026-05-22' },
		{ id: 'inv_006', vendor: 'Greenline Energy', po: 'PO-4426', amount: 2_000.0, status: 'paid', due: '2026-05-23' }
	];

	let search = $state('');
	let statusFilter = $state('');
	let vendorFilter = $state('');
	let selected = $state(new Set<string>());

	const statusOptions = [
		{ value: 'pending', label: 'Pending' },
		{ value: 'approved', label: 'Approved' },
		{ value: 'paid', label: 'Paid' }
	];

	const vendorOptions = [
		{ value: 'acme', label: 'Acme Logistics' },
		{ value: 'northwind', label: 'Northwind Print' },
		{ value: 'meridian', label: 'Meridian Studios' },
		{ value: 'cobalt', label: 'Cobalt Industrial' }
	];

	function toggle(id: string): void {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		selected = next;
	}

	function toggleAll(): void {
		if (selected.size === rows.length) {
			selected = new Set();
		} else {
			selected = new Set(rows.map((r) => r.id));
		}
	}

	function clearSelection(): void {
		selected = new Set();
	}

	function fmt(n: number): string {
		return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
	}

	function statusPill(s: Invoice['status']): 'base' | 'warning' | 'success' {
		if (s === 'pending') return 'warning';
		if (s === 'paid') return 'success';
		return 'base';
	}

	const example = `<script lang="ts">
\timport { Button } from '@dashfi/svelte/ui/button';
\timport { SearchFilter, SelectFilter } from '@dashfi/svelte/ui/table-filters';
\timport {
\t\tTable, TableHeader, TableBody, TableRow, TableHead, TableCell
\t} from '@dashfi/svelte/ui/table';
\timport { Checkbox } from '@dashfi/svelte/ui/checkbox';
\timport { Pill } from '@dashfi/svelte/ui/pill';
\timport {
\t\tDropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
\t} from '@dashfi/svelte/ui/dropdown-menu';
\timport MoreHorizontal from '@lucide/svelte/icons/more-horizontal';
\timport type { PageData } from './$types';

\tlet { data }: { data: PageData } = $props();

\t// Filters come from the loader (URL state). Selection is local + transient.
\tlet selected = $state(new Set<string>());

\tfunction toggle(id: string) {
\t\tconst next = new Set(selected);
\t\tnext.has(id) ? next.delete(id) : next.add(id);
\t\tselected = next;
\t}
<\/script>

<header class="page-header">
\t<div>
\t\t<span class="label">Bill pay</span>
\t\t<h2>Invoices.</h2>
\t\t<p class="lede">{data.pendingCount} invoices awaiting action.</p>
\t</div>
\t<Button variant="brand">Issue payment</Button>
</header>

<div class="toolbar">
\t<SearchFilter bind:value={data.filters.q} placeholder="Search vendor or PO" />
\t<SelectFilter bind:value={data.filters.status} options={statusOptions} placeholder="Status" />
\t<SelectFilter bind:value={data.filters.vendor} options={vendorOptions} placeholder="Vendor" />
</div>

<Table>
\t<TableHeader>
\t\t<TableRow>
\t\t\t<TableHead class="w-10">
\t\t\t\t<Checkbox onCheckedChange={toggleAll} />
\t\t\t</TableHead>
\t\t\t<TableHead>Vendor</TableHead>
\t\t\t<TableHead>PO#</TableHead>
\t\t\t<TableHead class="text-right">Amount</TableHead>
\t\t\t<TableHead>Status</TableHead>
\t\t\t<TableHead>Due</TableHead>
\t\t\t<TableHead class="w-10"></TableHead>
\t\t</TableRow>
\t</TableHeader>
\t<TableBody>
\t\t{#each data.rows as r (r.id)}
\t\t\t<TableRow>
\t\t\t\t<TableCell>
\t\t\t\t\t<Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggle(r.id)} />
\t\t\t\t</TableCell>
\t\t\t\t<TableCell>{r.vendor}</TableCell>
\t\t\t\t<TableCell class="font-mono">{r.po}</TableCell>
\t\t\t\t<TableCell class="text-right font-mono tabular-nums">{fmt(r.amount)}</TableCell>
\t\t\t\t<TableCell>
\t\t\t\t\t<Pill type={statusPill(r.status)}>{r.status}</Pill>
\t\t\t\t</TableCell>
\t\t\t\t<TableCell class="font-mono tabular-nums">{r.due}</TableCell>
\t\t\t\t<TableCell>
\t\t\t\t\t<DropdownMenu>
\t\t\t\t\t\t<DropdownMenuTrigger aria-label="Row actions">
\t\t\t\t\t\t\t<MoreHorizontal size={16} />
\t\t\t\t\t\t</DropdownMenuTrigger>
\t\t\t\t\t\t<DropdownMenuContent>
\t\t\t\t\t\t\t<DropdownMenuItem>View</DropdownMenuItem>
\t\t\t\t\t\t\t<DropdownMenuItem>Edit</DropdownMenuItem>
\t\t\t\t\t\t\t<DropdownMenuItem>Archive</DropdownMenuItem>
\t\t\t\t\t\t</DropdownMenuContent>
\t\t\t\t\t</DropdownMenu>
\t\t\t\t</TableCell>
\t\t\t</TableRow>
\t\t{/each}
\t</TableBody>
</Table>

<Pagination
\tpage={data.page}
\tpageSize={data.pageSize}
\ttotal={data.total}
/>

{#if selected.size > 0}
\t<form method="POST" action="?/bulkApprove" class="bulk-bar">
\t\t{#each [...selected] as id}
\t\t\t<input type="hidden" name="ids" value={id} />
\t\t{/each}
\t\t<span class="count">{selected.size} selected</span>
\t\t<Button formaction="?/bulkApprove">Approve</Button>
\t\t<Button formaction="?/bulkReassign">Reassign</Button>
\t\t<Button formaction="?/bulkExport">Export CSV</Button>
\t\t<button type="button" class="clear" onclick={() => (selected = new Set())}>
\t\t\tClear
\t\t</button>
\t</form>
{/if}`;
</script>

<svelte:head><title>Workflow data table page — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Workflow data table page"
	description="Header + filters + table + row actions + bulk-action bar. The default shape for any 'list of work items' route — invoices, disputes, reconciliations."
	uses={[
		'PageHeader',
		'SearchFilter',
		'SelectFilter',
		'Table',
		'Checkbox',
		'Pagination',
		'DropdownMenu',
		'Button'
	]}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="560px">
			{#snippet children(_m)}
				<div class="frame">
					<header class="page-header">
						<div class="head-left">
							<span class="head-label">Bill pay</span>
							<h2 class="head-title">Invoices.</h2>
							<p class="head-lede">
								8 invoices awaiting action. Approve, reassign, or pay in bulk.
							</p>
						</div>
						<div class="head-right">
							<Button variant="brand">
								<Plus size={16} strokeWidth={1.5} />
								Issue payment
							</Button>
						</div>
					</header>

					<div class="toolbar">
						<div style:flex="0 1 260px">
							<SearchFilter bind:value={search} placeholder="Search vendor or PO" />
						</div>
						<div style:flex="0 1 160px">
							<SelectFilter
								bind:value={statusFilter}
								options={statusOptions}
								placeholder="Status"
							/>
						</div>
						<div style:flex="0 1 180px">
							<SelectFilter
								bind:value={vendorFilter}
								options={vendorOptions}
								placeholder="Vendor"
							/>
						</div>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead class="w-10">
									<Checkbox
										checked={selected.size === rows.length}
										onCheckedChange={toggleAll}
									/>
								</TableHead>
								<TableHead>Vendor</TableHead>
								<TableHead>PO#</TableHead>
								<TableHead class="text-right">Amount</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Due</TableHead>
								<TableHead class="w-10"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{#each rows as r (r.id)}
								<TableRow>
									<TableCell>
										<Checkbox
											checked={selected.has(r.id)}
											onCheckedChange={() => toggle(r.id)}
										/>
									</TableCell>
									<TableCell>{r.vendor}</TableCell>
									<TableCell class="font-mono text-muted-foreground">{r.po}</TableCell>
									<TableCell class="text-right font-mono tabular-nums">
										{fmt(r.amount)}
									</TableCell>
									<TableCell>
										<Pill type={statusPill(r.status)}>{r.status}</Pill>
									</TableCell>
									<TableCell class="font-mono tabular-nums text-muted-foreground">
										{r.due}
									</TableCell>
									<TableCell>
										<button class="row-action" type="button" aria-label="Row actions">
											<MoreHorizontal size={16} strokeWidth={1.5} />
										</button>
									</TableCell>
								</TableRow>
							{/each}
						</TableBody>
					</Table>

					<div class="pagination">
						<span class="page-count">Showing 1–6 of 8</span>
						<div class="page-buttons">
							<button type="button" aria-label="Previous page" disabled>
								<ChevronLeft size={14} strokeWidth={1.5} />
							</button>
							<button type="button" aria-label="Next page">
								<ChevronRight size={14} strokeWidth={1.5} />
							</button>
						</div>
					</div>

					{#if selected.size > 0}
						<div class="bulk-bar" role="region" aria-label="Bulk actions">
							<span class="bulk-count">{selected.size} selected</span>
							<div class="bulk-actions">
								<Button>Approve</Button>
								<Button>Reassign</Button>
								<Button>Export CSV</Button>
							</div>
							<button type="button" class="bulk-clear" onclick={clearSelection}>
								Clear
							</button>
						</div>
					{/if}
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
				The default shape for any "list of work items" route. It composes the
				<code>Transaction list</code> recipe (filters + table) into a full page, then adds
				row-level actions and bulk operations. The shape's strength: it lets the user scope
				(filters), inspect (rows), act on one (row menu), and act on many (bulk bar) — all
				without leaving the page.
			</p>

			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Bulk-action bar is sticky to the bottom</strong>, not the top. Selection is a
					transient state; the user is looking at the table, not at the page chrome.
					Bottom-sticky stays visible without breaking scroll context.
				</li>
				<li>
					<strong>Bulk bar only appears with ≥1 selection</strong>, with a small fade-in.
					Always-visible takes up real estate that doesn't earn it.
				</li>
				<li>
					<strong>Row actions sit in a <code>DropdownMenu</code> (kebab/MoreHorizontal)</strong>,
					not as visible buttons per row. Five rows × four buttons each = 20 buttons fighting
					for attention; a single trigger collapses that into one affordance.
				</li>
				<li>
					<strong>Filters are URL-state</strong>, so the page is bookmarkable and shareable for
					support workflows. Selection state is NOT in the URL — it's transient.
				</li>
				<li>
					<strong>The primary CTA lives in the header right</strong>, not in the bulk bar. The
					bulk bar is for actions on already-selected items; the header CTA is for creating new
					items.
				</li>
				<li>
					<strong>Empty states are pattern-aware</strong> — if filters yield 0 rows, the empty
					state says "No matches; clear filters?" not "Issue first invoice." See the
					<code>Empty state</code> pattern for the two distinct empty cases.
				</li>
			</ul>

			<h3>Server-side assumptions</h3>
			<ul>
				<li>
					Pagination is server-side; the page sends <code>?page=N&amp;pageSize=20</code> and the
					loader returns one page worth.
				</li>
				<li>
					Sort is server-side; <code>?sort=amount&amp;order=desc</code> round-trips.
				</li>
				<li>
					Total count is part of the loader response so the pagination footer can show "of
					248".
				</li>
				<li>
					Bulk operations are POST actions submitted with the selected ID set; the server
					returns the new page state so the UI doesn't need to optimistically update.
				</li>
			</ul>

			<h3>Source</h3>
			<p>
				<code>(protected)/bill-pay/overview/+page.svelte</code> in dashfi-ui. Inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern P2).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Inline row editing</strong> — for low-stakes fields (notes, tags), make a cell
					editable on click. Use the bare <code>Input</code> inside the cell. Don't allow
					inline editing of money values; those need a confirmation flow.
				</li>
				<li>
					<strong>Multi-select with shift-click</strong> — when the user shift-clicks a
					checkbox, select all rows between the previous selection and the click. Standard
					mail-client convention.
				</li>
				<li>
					<strong>Archived view toggle</strong> — a single "Show archived" Switch above the
					filter row toggles between active + archived datasets. Archived rows render with
					<code>opacity: 0.6</code> for visual distinction.
				</li>
				<li>
					<strong>Saved views</strong> — when filter combinations are reused (e.g. "My team ·
					Pending · Last 30 days"), let the user save them as named views in a
					<code>DropdownMenu</code> next to the filters. The view itself is just a URL.
				</li>
			</ul>

			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't put bulk actions in the header alongside the primary CTA.</strong>
					Mixing scopes (one item action vs many) confuses what the buttons do. Header is
					"this page"; bulk bar is "these selected rows."
				</li>
				<li>
					<strong>Don't paginate client-side past a few dozen rows.</strong> The whole
					architecture breaks above ~50 rows — counts lie, sort is partial, memory grows.
					Server-side from day one.
				</li>
				<li>
					<strong>Don't add a "Refresh" button.</strong> SvelteKit's invalidation handles it. A
					visible refresh button signals "the data might be wrong" — fix the loader, not the
					UI.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.frame {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
		max-width: 920px;
		padding-bottom: 64px;
	}

	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		padding-bottom: 4px;
		border-bottom: 1px solid var(--border);
	}
	.head-left {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.head-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.head-title {
		font-size: 28px;
		font-weight: 500;
		letter-spacing: -0.02em;
		margin: 0;
		color: var(--fg);
	}
	.head-lede {
		font-size: 14px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 0;
		max-width: 520px;
	}
	.head-right {
		flex-shrink: 0;
		padding-top: 6px;
	}

	.toolbar {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.row-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--fg-muted);
		cursor: pointer;
	}
	.row-action:hover {
		color: var(--fg);
		background: var(--bg-muted);
	}

	.pagination {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 8px;
	}
	.page-count {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: -0.01em;
		color: var(--fg-muted);
	}
	.page-buttons {
		display: flex;
		gap: 4px;
	}
	.page-buttons button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		padding: 0;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--fg);
		cursor: pointer;
	}
	.page-buttons button:hover:not(:disabled) {
		background: var(--bg-muted);
	}
	.page-buttons button:disabled {
		color: var(--fg-muted);
		cursor: not-allowed;
		opacity: 0.5;
	}

	.bulk-bar {
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: auto;
		padding: 10px 14px;
		background: var(--bg);
		border: 1px solid var(--border);
		box-shadow: 0 -8px 24px -16px rgba(0, 0, 0, 0.18);
		animation: fade-in 140ms ease-out;
	}
	.bulk-count {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: var(--fg);
		padding-right: 4px;
	}
	.bulk-actions {
		display: flex;
		gap: 6px;
	}
	.bulk-clear {
		margin-left: auto;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		color: var(--fg-muted);
		background: transparent;
		border: 0;
		padding: 4px 6px;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.bulk-clear:hover {
		color: var(--fg);
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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
