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
			<ul class="docs-list">
				<li>Re-export of <code>@tanstack/table-core</code> wired for Svelte 5 reactivity.</li>
				<li>Bring-your-own DOM. Use Table primitives (<a href="/components/table">/components/table</a>) for the markup.</li>
				<li>If you need sorting + filtering + pagination out of the box, prefer <a href="/components/enhanced-table">Enhanced Table</a>.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
