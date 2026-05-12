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
</ComponentLayout>
