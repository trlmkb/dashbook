<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';

	const enhancedTableProps: PropDef[] = [
		{
			name: 'columns',
			type: 'EnhancedTableColumnDef<TData>[]',
			required: true,
			description: 'TanStack column definitions extended with align, sortable, sticky, minWidth, cellClassName, and headerClassName.'
		},
		{
			name: 'data',
			type: 'TData[]',
			required: true,
			bindable: true,
			description: 'Row data array.'
		},
		{
			name: 'page',
			type: 'number',
			default: '1',
			bindable: true,
			description: '1-indexed current page. When set together with totalItems triggers server-side pagination.'
		},
		{
			name: 'pageSize',
			type: 'number',
			default: '10',
			bindable: true,
			description: 'Rows per page.'
		},
		{
			name: 'totalItems',
			type: 'number',
			bindable: true,
			description: 'Total server-side row count. Presence switches the table into manual pagination mode.'
		},
		{
			name: 'loading',
			type: 'boolean',
			bindable: true,
			description: 'Show the loading overlay and dim the table.'
		},
		{
			name: 'sorting',
			type: 'SortingState',
			default: '[]',
			bindable: true,
			description: 'Active sort state from @tanstack/table-core.'
		},
		{
			name: 'onSortingChange',
			type: '(sorting: SortingState) => void',
			description: 'Fired when sort state changes.'
		},
		{
			name: 'columnVisibility',
			type: 'VisibilityState',
			default: '{}',
			bindable: true,
			description: 'Map of columnId → boolean controlling column visibility.'
		},
		{
			name: 'showColumnVisibility',
			type: 'boolean',
			default: 'false',
			description: 'Render the column-visibility dropdown in the toolbar.'
		},
		{
			name: 'searchable',
			type: 'boolean',
			default: 'false',
			description: 'Render the global search input in the toolbar.'
		},
		{
			name: 'searchPlaceholder',
			type: 'string',
			default: "'Search...'",
			description: 'Placeholder for the search input.'
		},
		{
			name: 'onSearchChange',
			type: '(value: string) => void',
			description: 'Server-side search handler. When set, disables client-side global filtering.'
		},
		{
			name: 'filters',
			type: 'FilterConfig[]',
			description: 'Declarative filter definitions (text, select, date-range).'
		},
		{
			name: 'filterValues',
			type: 'FilterValues',
			description: 'Current filter values, keyed by filter id.'
		},
		{
			name: 'onFilterChange',
			type: '(values: FilterValues) => void',
			description: 'Fired when any filter value changes.'
		},
		{
			name: 'enableRowSelection',
			type: 'boolean',
			default: 'false',
			description: 'Show a leading checkbox column and emit selected rows.'
		},
		{
			name: 'onSelected',
			type: '(rows: TData[]) => void',
			description: 'Fired with the currently selected row originals.'
		},
		{
			name: 'expandableRows',
			type: 'boolean',
			default: 'false',
			description: 'Add an expand toggle column.'
		},
		{
			name: 'renderExpandedContent',
			type: '(row: TData) => unknown',
			description: 'Renderer for the expanded panel body.'
		},
		{
			name: 'onRowClick',
			type: '(row: TData) => void',
			description: 'Fired when a row is clicked (or activated via Enter/Space).'
		},
		{
			name: 'groupBy',
			type: '(row: TData) => string | undefined',
			description: 'Group rows visually under a header row by the returned key.'
		},
		{
			name: 'persistState',
			type: 'boolean | { sorting?: boolean; columnVisibility?: boolean; pageSize?: boolean }',
			default: 'false',
			description: 'Persist selected pieces of table state to localStorage. Requires tableId.'
		},
		{
			name: 'tableId',
			type: 'string',
			description: 'Storage key prefix for persistState.'
		},
		{
			name: 'stickyHeader',
			type: 'boolean',
			default: 'false',
			description: 'Pin the header to the top of the scroll container.'
		},
		{
			name: 'emptyMessage',
			type: 'string',
			default: "'No results'",
			description: 'Heading shown when there are no rows.'
		}
	];

	const example = `<script lang="ts">
	import { EnhancedTable, type EnhancedTableColumnDef } from '@dashfi/svelte/ui/enhanced-table';
<\/script>

type Tx = { ref: string; merchant: string; amount: number; date: string };

const columns: EnhancedTableColumnDef<Tx>[] = [
\t{ accessorKey: 'ref', header: 'Reference' },
\t{ accessorKey: 'merchant', header: 'Merchant' },
\t{
\t\taccessorKey: 'amount',
\t\theader: 'Amount',
\t\tcell: ({ getValue }) => '
<\/script>

<svelte:head><title>Enhanced Table — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Enhanced Table"
	description="Feature-rich table — sorting, filtering, pagination, column visibility. Built on @tanstack/table-core."
	importPath="@dashfi/svelte/ui/enhanced-table"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="280px">
			{#snippet children(_m)}
				<div style:font-size="13px" style:color="var(--fg-muted)" style:max-width="540px" style:text-align="center">
					Live preview omitted — Enhanced Table requires column definitions, data, and a wrapping page context.
					See Code tab for the canonical pattern; the lib's Storybook has interactive examples.
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable title="EnhancedTable" props={enhancedTableProps} />
	{/snippet}
	{#snippet anatomy()}
		<div>
			<ul class="docs-list">
				<li>Pass <code>columns</code> as <code>EnhancedTableColumnDef[]</code> with optional <code>cell</code> renderers.</li>
				<li>State <code>SortingState</code> + <code>VisibilityState</code> from <code>@tanstack/table-core</code> are bindable.</li>
				<li>Pair with <code>TableSearch</code>, <code>FilterButton</code>, <code>SortButton</code>, <code>ColumnVisibilityDropdown</code> in the toolbar.</li>
				<li>For very large datasets, supply paginated <code>data</code> and a server-side fetch.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
 + (getValue<number>()).toLocaleString()
\t},
\t{ accessorKey: 'date', header: 'Date' }
];

<EnhancedTable {columns} data={transactions} />`;
</script>

<svelte:head><title>Enhanced Table — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Enhanced Table"
	description="Feature-rich table — sorting, filtering, pagination, column visibility. Built on @tanstack/table-core."
	importPath="@dashfi/svelte/ui/enhanced-table"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="280px">
			{#snippet children(_m)}
				<div style:font-size="13px" style:color="var(--fg-muted)" style:max-width="540px" style:text-align="center">
					Live preview omitted — Enhanced Table requires column definitions, data, and a wrapping page context.
					See Code tab for the canonical pattern; the lib's Storybook has interactive examples.
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable title="EnhancedTable" props={enhancedTableProps} />
	{/snippet}
	{#snippet anatomy()}
		<div>
			<ul class="docs-list">
				<li>Pass <code>columns</code> as <code>EnhancedTableColumnDef[]</code> with optional <code>cell</code> renderers.</li>
				<li>State <code>SortingState</code> + <code>VisibilityState</code> from <code>@tanstack/table-core</code> are bindable.</li>
				<li>Pair with <code>TableSearch</code>, <code>FilterButton</code>, <code>SortButton</code>, <code>ColumnVisibilityDropdown</code> in the toolbar.</li>
				<li>For very large datasets, supply paginated <code>data</code> and a server-side fetch.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
