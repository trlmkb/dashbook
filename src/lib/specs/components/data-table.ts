import type { ComponentSpec } from '../types.js';

/**
 * DataTable — headless TanStack-Table utilities.
 *
 * No baked chrome. Pair with the canonical Table primitives. Most consumers
 * want EnhancedTable instead; DataTable is the integration layer.
 */
export const dataTable: ComponentSpec = {
	slug: 'data-table',
	name: 'Data Table',
	category: 'Data',
	status: 'beta',
	importPath: "import { createSvelteTable } from '@dashfi/svelte/ui/data-table'",
	description:
		'Headless TanStack-Table integration. Use to compose custom tables — sorting, paging, filtering hooks. Most consumers want Enhanced Table instead.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/data-table/',

	dimensions: [
		{
			name: 'createSvelteTable(options)',
			value: 'reactive table instance',
			notes: 'Pass data/columns as getters for live updates. Returns a TanStack Table instance.'
		},
		{
			name: 'flex-render.svelte',
			value: 'bridges TanStack column-def cell renderers to Svelte snippets',
			notes: 'Render { content, context } from header.getContext() / cell.getContext().'
		},
		{
			name: 'Visual chrome',
			value: 'inherited from the canonical Table primitives',
			notes: '48px headers in mono caps, 16/16 cells, hairline-bottom rows.'
		}
	],

	tokens: [
		{
			name: 'Chrome',
			notes: 'No DataTable-specific tokens. All visual styling comes from the Table primitives.'
		}
	],

	composition: [
		'Define columns with <code>{ accessorKey | id, header, cell }</code>. Call <code>createSvelteTable</code>. Iterate over rows / cells inside the canonical Table primitives.',
		'Wire TanStack features (sorting, filtering, pagination, row selection) via the options object; chrome stays inside the Table primitives.',
		'Use <code>renderComponent</code> / <code>renderSnippet</code> helpers to return Svelte components or snippets from cell renderers.'
	],

	nonFeatures: [
		'No baked-in column headers, sort buttons, or pagination controls. Compose them yourself using TanStack\'s sort/filter state.',
		'No virtualisation built-in.',
		'For the opinionated all-in-one variant use <code>EnhancedTable</code>.',
		'No styling — the integration is headless; visual chrome comes from <code>Table</code>.'
	],

	props: [
		{
			name: 'createSvelteTable(options)',
			type: 'TableOptions<TData>',
			description: 'TanStack table options. Use getters for reactive state (e.g. get data() { return data; }).'
		},
		{
			name: 'createSvelteTable returns',
			type: 'Table<TData>',
			description: 'TanStack Table instance — call getHeaderGroups(), getRowModel(), setPageIndex(), etc.'
		},
		{
			name: 'FlexRender.content',
			type: 'ColumnDefTemplate<HeaderContext | CellContext> | string',
			description: 'The header/cell template from your column definition.'
		},
		{
			name: 'FlexRender.context',
			type: 'HeaderContext<TData, TValue> | CellContext<TData, TValue>',
			description: 'Result of header.getContext() or cell.getContext().'
		},
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
	],

	porting: [
		'TanStack Table + your stack\'s table primitives. <code>flex-render</code> bridges the cell-renderer abstraction.',
		'The whole API surface is TanStack-native — porting means replacing only the Svelte-specific helpers (<code>renderComponent</code>, <code>renderSnippet</code>, <code>flex-render</code>).'
	],

	example: `<script lang="ts">
	import { createSvelteTable } from '@dashfi/svelte/ui/data-table';
	import { getCoreRowModel, getSortedRowModel } from '@tanstack/table-core';

	type Tx = { ref: string; merchant: string; amount: number };
	const data = $state<Tx[]>([...transactions]);
	let sorting = $state([]);

	const table = createSvelteTable({
		get data() { return data; },
		columns: [
			{ accessorKey: 'ref', header: 'Reference' },
			{ accessorKey: 'merchant', header: 'Merchant' },
			{ accessorKey: 'amount', header: 'Amount' }
		],
		state: { get sorting() { return sorting; } },
		onSortingChange: (u) => sorting = typeof u === 'function' ? u(sorting) : u,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});
<\/script>

<!-- compose your own table from table.getHeaderGroups(), table.getRowModel().rows -->`,

	accessibility: [
		'Inherits accessibility from the underlying Table primitives. <code>DataTable</code> itself adds no ARIA — it is a logic helper.',
		'When composing your own header buttons, wire <code>aria-sort</code> manually based on TanStack sort state.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Thin TanStack integration — createSvelteTable + flex-render + canonical Table primitives. No baked chrome.'
		}
	]
};
