<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Table,
		TableHeader,
		TableBody,
		TableRow,
		TableCell,
		TableHead
	} from '@dashfi/svelte/ui/table';

	const tableProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLTableElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the <table>. The component wraps it in a scrollable <div>.'
		}
	];

	const tableHeaderProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLTableSectionElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the <thead>.'
		}
	];

	const tableBodyProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLTableSectionElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the <tbody>.'
		}
	];

	const tableRowProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLTableRowElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the <tr>.'
		},
		{
			name: 'data-state',
			type: "'selected' | undefined",
			description: 'Setting data-state="selected" highlights the row with the muted background.'
		}
	];

	const tableCellProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'colspan',
			type: 'number',
			description: 'Standard HTML <td> colspan attribute.'
		},
		{
			name: 'ref',
			type: 'HTMLTableCellElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the <td>.'
		}
	];

	const tableHeadProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'colspan',
			type: 'number',
			description: 'Standard HTML <th> colspan attribute.'
		},
		{
			name: 'ref',
			type: 'HTMLTableCellElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the <th>.'
		}
	];

	const rows = [
		{ ref: 'TX-4400-A', merchant: 'Meta Ads', amount: '12,408.00', date: '2026-04-02' },
		{ ref: 'TX-4401-B', merchant: 'Google Ads', amount: '8,210.50', date: '2026-04-02' },
		{ ref: 'TX-4402-C', merchant: 'FedEx Ship', amount: '1,240.00', date: '2026-04-01' }
	];

	const example = `<script lang="ts">
	import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@dashfi/svelte/ui/table';
<\/script>

<Table>
\t<TableHeader>
\t\t<TableRow>
\t\t\t<TableHead>Reference</TableHead>
\t\t\t<TableHead>Merchant</TableHead>
\t\t\t<TableHead class="text-right">Amount</TableHead>
\t\t</TableRow>
\t</TableHeader>
\t<TableBody>
\t\t{#each rows as row}
\t\t\t<TableRow>
\t\t\t\t<TableCell>{row.ref}</TableCell>
\t\t\t\t<TableCell>{row.merchant}</TableCell>
\t\t\t\t<TableCell class="text-right tabular-nums">{row.amount}</TableCell>
\t\t\t</TableRow>
\t\t{/each}
\t</TableBody>
</Table>`;
</script>

<svelte:head><title>Table — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Table"
	description="Basic semantic table — Table, Header, Body, Row, Cell, Head. For static data; use Enhanced Table for sorting, filtering, paging."
	importPath="@dashfi/svelte/ui/table"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="240px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="640px">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Reference</TableHead>
								<TableHead>Merchant</TableHead>
								<TableHead class="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{#each rows as row (row.ref)}
								<TableRow>
									<TableCell class="font-mono text-xs">{row.ref}</TableCell>
									<TableCell>{row.merchant}</TableCell>
									<TableCell class="text-right tabular-nums">${row.amount}</TableCell>
								</TableRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Table" props={tableProps} />
			<PropsTable title="TableHeader" props={tableHeaderProps} />
			<PropsTable title="TableBody" props={tableBodyProps} />
			<PropsTable title="TableRow" props={tableRowProps} />
			<PropsTable title="TableHead" props={tableHeadProps} />
			<PropsTable title="TableCell" props={tableCellProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Table (root)</strong> — wrapped in <code>div.relative.w-full.overflow-auto</code>; the table itself is <code>w-full caption-bottom text-sm</code> (14px).</li>
				<li><strong>TableHead (th)</strong> — <code>h-12 px-4 text-start align-middle text-xs font-medium tracking-wider uppercase whitespace-nowrap text-muted-foreground</code>. 48px tall, 16px horizontal padding, mono-feel header (12px UPPERCASE TRACKED).</li>
				<li><strong>TableRow</strong> — <code>border-b border-border/50</code> + <code>hover:[&amp;&gt;th,&amp;&gt;td]:bg-muted/30</code>. Hover tints the cells, not the row. Selected state <code>data-[state=selected]:bg-muted</code>.</li>
				<li><strong>TableCell (td)</strong> — <code>px-4 py-4 align-middle whitespace-nowrap</code>. 16px horizontal, 16px vertical.</li>
				<li><strong>Caption</strong> — bottom-anchored via <code>caption-bottom</code>.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Row separator <code>--color-border</code> at 50% opacity.</li>
				<li>Header text <code>--color-muted-foreground</code>.</li>
				<li>Hover cell bg <code>--color-muted</code> at 30%; selected row bg <code>--color-muted</code>.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li><code>Table &gt; TableHeader &gt; TableRow &gt; TableHead*</code> for the column headers.</li>
				<li><code>Table &gt; TableBody &gt; TableRow &gt; TableCell*</code> for the data rows.</li>
				<li>Optional <code>TableFooter</code> for aggregates.</li>
			</ul>
			<div class="docs-h">Not part of Table</div>
			<ul class="docs-list">
				<li>No sorting, filtering, pagination, or selection state baked in. For those compose with <code>DataTable</code> / <code>EnhancedTable</code> / <code>TableFilters</code> / <code>Pagination</code>.</li>
				<li>No row-level click affordance — caller wires it via anchor or row click handler.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Semantic <code>&lt;table&gt;</code> primitive. 48px headers in mono-tracked uppercase, 14px body text, hairline-bottom rows with cell-hover tint.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). 48px headers in
					<code>text-xs tracking-wider uppercase</code>, 16/16 cells, hairline row
					separator at 50% border, hover tints cells (not row).
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
