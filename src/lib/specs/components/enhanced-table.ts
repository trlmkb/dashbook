import type { ComponentSpec } from '../types.js';

/**
 * EnhancedTable — opinionated all-in-one wrapper around DataTable.
 *
 * SortButton, FilterButton, ColumnVisibilityDropdown, ExpandButton baked in.
 * Built on @tanstack/table-core; renders into canonical Table primitives.
 */
export const enhancedTable: ComponentSpec = {
	slug: 'enhanced-table',
	name: 'Enhanced Table',
	category: 'Data',
	status: 'beta',
	importPath: "import { EnhancedTable } from '@dashfi/svelte/ui/enhanced-table'",
	description:
		'Feature-rich table — sorting, filtering, pagination, column visibility, row expansion. Built on @tanstack/table-core.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/enhanced-table/',

	dimensions: [
		{
			name: 'EnhancedTable (root)',
			value: 'opinionated all-in-one wrapper around DataTable + Table primitives'
		},
		{
			name: 'Headers',
			value: '48px tall, mono caps',
			tw: 'h-12',
			notes: 'Inherited from Table — 16px horizontal padding, text-xs tracking-wider uppercase.'
		},
		{
			name: 'Cells',
			value: '16px horizontal · 16px vertical',
			tw: 'px-4 py-4',
			notes: 'Hairline-bottom rows in --color-border at 50% opacity.'
		},
		{
			name: 'SortButton',
			value: 'click-to-sort header with up/down chevron indicator',
			notes: 'Cycles asc → desc → none. Active chevron uses --color-foreground; inactive at opacity-50.'
		},
		{
			name: 'FilterButton',
			value: 'header-cell filter trigger',
			notes: 'Opens a Popover with the appropriate filter primitive (text / select / date-range).'
		},
		{
			name: 'ColumnVisibilityDropdown',
			value: 'top-right utility toggling column visibility'
		},
		{
			name: 'ExpandButton',
			value: '32×32 per-row chevron for expandable rows',
			tw: 'h-8 w-8 p-0',
			notes: 'Ghost Button with size="sm" plus an explicit 32px square override. Renders only when expandableRows is true.'
		},
		{
			name: 'Per-column controls',
			value: 'align, minWidth, sticky, cellClassName, headerClassName',
			notes: 'Extensions to TanStack column def via EnhancedTableColumnDef.'
		}
	],

	tokens: [
		{
			name: 'Chrome',
			notes: 'Inherits Table + Button tokens. No EnhancedTable-specific tokens.'
		},
		{
			name: 'Sort indicator (active)',
			token: { cssVar: '--color-foreground', light: '#123b38', dark: '#ffffff' }
		},
		{
			name: 'Sort indicator (inactive)',
			notes: 'Same foreground at opacity-50.'
		},
		{
			name: 'Row separator',
			token: { cssVar: '--color-border', light: '#ebeae5', dark: '#1e2928' },
			notes: 'Rendered at 50% opacity (inherited from Table).'
		}
	],

	composition: [
		'Pass <code>columns: EnhancedTableColumnDef&lt;TData&gt;[]</code> (extends TanStack column def) + <code>data</code>. The component handles sort / filter / column-visibility / expansion state internally.',
		'Bind <code>SortingState</code> + <code>VisibilityState</code> from <code>@tanstack/table-core</code> for controlled behaviour.',
		'For very large datasets, paginate <code>data</code> server-side by passing <code>totalItems</code> and binding <code>page</code>/<code>pageSize</code>.',
		'Use <code>persistState</code> + <code>tableId</code> to persist sort / column visibility / page size to localStorage.'
	],

	nonFeatures: [
		'Not unstyled — opinionated variant. For barebones primitives use Table / DataTable.',
		'No CSV export.',
		'No drag-and-drop column reordering.',
		'No row drag-and-drop.'
	],

	props: [
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
	],

	porting: [
		'TanStack-driven table with Sort / Filter / ColumnVisibility / Expand buttons composed into the canonical Table primitives.',
		'Replace the Svelte wrapper with your stack\'s equivalent; the column-def extension (<code>align</code>, <code>sticky</code>, <code>minWidth</code>, <code>cellClassName</code>) is a thin object layer.'
	],

	example: `<script lang="ts">
	import { EnhancedTable, type EnhancedTableColumnDef } from '@dashfi/svelte/ui/enhanced-table';

	type Tx = { ref: string; merchant: string; amount: number; date: string };
	const columns: EnhancedTableColumnDef<Tx>[] = [
		{ accessorKey: 'ref', header: 'Reference' },
		{ accessorKey: 'merchant', header: 'Merchant' },
		{ accessorKey: 'amount', header: 'Amount' },
		{ accessorKey: 'date', header: 'Date' }
	];
<\/script>

<EnhancedTable {columns} data={transactions} />`,

	accessibility: [
		'Header buttons render with <code>aria-sort</code> reflecting TanStack sort state.',
		'Row selection checkboxes are real <code>&lt;input type="checkbox"&gt;</code> elements.',
		'Expand chevrons have <code>aria-expanded</code> bound to row state.'
	],

	changelog: [
		{
			version: 'v0.5.0 audit',
			date: '2026-07-14',
			note: 'Corrected the ExpandButton trace to the shipped h-8 w-8 p-0 override instead of the non-literal size-icon shorthand.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Opinionated wrapper on DataTable — Sort / Filter / ColumnVisibility / Expand buttons + sticky columns + per-column align/minWidth/className.'
		}
	]
};
