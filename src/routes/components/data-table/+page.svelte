<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';

	const createSvelteTableProps: PropDef[] = [
		{
			name: 'options',
			type: 'TableOptions<TData>',
			required: true,
			description: 'TanStack table options object. Use getters for reactive state (e.g. get data() { return data; }).'
		}
	];

	const createSvelteTableReturns: PropDef[] = [
		{
			name: 'returns',
			type: 'Table<TData>',
			description: 'TanStack Table instance — call getHeaderGroups(), getRowModel(), setPageIndex(), etc. to drive your custom markup.'
		}
	];

	const flexRenderProps: PropDef[] = [
		{
			name: 'content',
			type: 'ColumnDefTemplate<HeaderContext | CellContext> | string',
			description: 'The header/cell template from your column definition.'
		},
		{
			name: 'context',
			type: 'HeaderContext<TData, TValue> | CellContext<TData, TValue>',
			required: true,
			description: 'Result of header.getContext() or cell.getContext().'
		}
	];

	const renderHelpersProps: PropDef[] = [
		{
			name: 'renderComponent',
			type: '(Component, props) => RenderComponentConfig',
			description: 'Wrap a Svelte component so it can be returned from a cell or header renderer.'
		},
		{
			name: 'renderSnippet',
			type: '(snippet, params) => RenderSnippetConfig',
			description: 'Wrap a Svelte snippet so it can be returned from a cell or header renderer.'
		}
	];

	const example = `<script lang="ts">
	import { createSvelteTable } from '@dashfi/svelte/ui/data-table';
	import { getCoreRowModel, getSortedRowModel } from '@tanstack/table-core';
<\/script>

type Tx = { ref: string; merchant: string; amount: number };
const data = $state<Tx[]>([...transactions]);
let sorting = $state([]);

const table = createSvelteTable({
\tget data() { return data; },
\tcolumns: [
\t\t{ accessorKey: 'ref', header: 'Reference' },
\t\t{ accessorKey: 'merchant', header: 'Merchant' },
\t\t{ accessorKey: 'amount', header: 'Amount' }
\t],
\tstate: { get sorting() { return sorting; } },
\tonSortingChange: (u) => sorting = typeof u === 'function' ? u(sorting) : u,
\tgetCoreRowModel: getCoreRowModel(),
\tgetSortedRowModel: getSortedRowModel()
});

<!-- compose your own table from table.getHeaderGroups(), table.getRowModel().rows -->`;
</script>

<svelte:head><title>Data Table — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Data Table"
	description="Headless table utilities. Use to compose custom tables — sorting, paging, filtering hooks. Most consumers want Enhanced Table instead."
	importPath="@dashfi/svelte/ui/data-table"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:font-size="13px" style:color="var(--fg-muted)" style:max-width="540px" style:text-align="center">
					Headless utilities — no visual to preview. See Code tab.
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="createSvelteTable(options)" props={createSvelteTableProps} />
			<PropsTable title="createSvelteTable — returns" props={createSvelteTableReturns} />
			<PropsTable title="FlexRender" props={flexRenderProps} />
			<PropsTable title="Helpers" props={renderHelpersProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">What it is</div>
			<ul class="docs-list">
				<li>A thin TanStack-Table integration that renders into canonical <code>Table</code>/<code>TableRow</code>/<code>TableCell</code> primitives.</li>
				<li><strong>flex-render.svelte</strong> bridges TanStack's column-def cell renderers to Svelte's snippet API.</li>
				<li><strong>createSvelteTable(options)</strong> returns a reactive table instance — pass <code>data</code>/<code>columns</code> as getters for live updates.</li>
			</ul>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li>Visual chrome comes entirely from the underlying <code>Table</code> primitives — 48px headers in mono caps, 16/16 cells, hairline-bottom rows.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Define columns with <code>{`{ accessorKey | id, header, cell }`}</code>. Call <code>createSvelteTable</code>. Iterate over rows / cells inside the canonical Table primitives.</li>
				<li>Wire TanStack features (sorting, filtering, pagination, row selection) via the options object; chrome stays inside the Table primitives.</li>
			</ul>
			<div class="docs-h">Not part of DataTable</div>
			<ul class="docs-list">
				<li>No baked-in column headers, sort buttons, or pagination controls. Compose them yourself using TanStack's sort/filter state.</li>
				<li>No virtualisation built-in.</li>
				<li>For the opinionated all-in-one variant use <code>EnhancedTable</code>.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>TanStack Table + your stack's table primitives. <code>flex-render</code> bridges the cell-renderer abstraction.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Thin TanStack
					integration — <code>createSvelteTable</code> + <code>flex-render</code> + canonical
					Table primitives. No baked chrome.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
