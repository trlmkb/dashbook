import type { ComponentSpec } from '../types.js';

/**
 * Table — semantic table primitive.
 *
 * Visual chrome only: 48px headers in mono caps, 16/16 cells, hairline rows
 * with cell-hover tint. No sort/filter/page state.
 */
export const table: ComponentSpec = {
	slug: 'table',
	name: 'Table',
	category: 'Data',
	status: 'beta',
	importPath:
		"import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@dashfi/svelte/ui/table'",
	description:
		'Basic semantic table — Table, Header, Body, Row, Cell, Head. For static data; use Enhanced Table for sorting, filtering, paging.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/table/',

	dimensions: [
		{
			name: 'Table (root)',
			value: 'wrapped in scrollable container',
			tw: 'relative w-full overflow-auto',
			notes: 'The <table> itself is w-full caption-bottom text-sm (14px).'
		},
		{
			name: 'TableHead (th)',
			value: '48px tall · 16px horizontal padding · 12px UPPERCASE tracked',
			tw: 'h-12 px-4 text-start align-middle text-xs font-medium tracking-wider uppercase whitespace-nowrap text-muted-foreground'
		},
		{
			name: 'TableRow',
			value: 'hairline-bottom hover tints cells',
			tw: 'border-b border-border/50 hover:[&>th,&>td]:bg-muted/30',
			notes: 'Hover tints the cells, not the row. Selected state data-[state=selected]:bg-muted.'
		},
		{
			name: 'TableCell (td)',
			value: '16px horizontal · 16px vertical',
			tw: 'px-4 py-4 align-middle whitespace-nowrap'
		},
		{
			name: 'Caption',
			value: 'bottom-anchored',
			tw: 'caption-bottom'
		}
	],

	tokens: [
		{
			name: 'Row separator',
			token: { cssVar: '--color-border', light: '#ebeae5', dark: '#1e2928' },
			notes: 'Rendered at 50% opacity via border-border/50.'
		},
		{
			name: 'Header text',
			token: { cssVar: '--color-muted-foreground', light: '#6e8180', dark: '#819896' }
		},
		{
			name: 'Hover cell background',
			token: { cssVar: '--color-muted', light: '#f1efea', dark: '#191f1d' },
			notes: 'Rendered at 30% opacity via bg-muted/30.'
		},
		{
			name: 'Selected row background',
			token: { cssVar: '--color-muted', light: '#f1efea', dark: '#191f1d' },
			notes: 'Triggered by data-state="selected" on TableRow.'
		}
	],

	composition: [
		'<code>Table &gt; TableHeader &gt; TableRow &gt; TableHead*</code> for the column headers.',
		'<code>Table &gt; TableBody &gt; TableRow &gt; TableCell*</code> for the data rows.',
		'Optional <code>TableFooter</code> for aggregates.',
		'Use <code>data-state="selected"</code> on a TableRow to apply the selected background.'
	],

	nonFeatures: [
		'No sorting, filtering, pagination, or selection state baked in. For those compose with <code>DataTable</code> / <code>EnhancedTable</code> / <code>TableFilters</code> / <code>Pagination</code>.',
		'No row-level click affordance — caller wires it via anchor or row click handler.',
		'No sticky headers built in — caller adds <code>sticky top-0</code> classes if needed.'
	],

	props: [
		{
			name: 'Table.class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'Table.ref',
			type: 'HTMLTableElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the <table>. The component wraps it in a scrollable <div>.'
		},
		{
			name: 'TableHeader.class',
			type: 'string',
			description: 'Additional Tailwind classes for the <thead>.'
		},
		{
			name: 'TableBody.class',
			type: 'string',
			description: 'Additional Tailwind classes for the <tbody>.'
		},
		{
			name: 'TableRow.data-state',
			type: "'selected' | undefined",
			description: 'Setting data-state="selected" highlights the row with the muted background.'
		},
		{
			name: 'TableRow.class',
			type: 'string',
			description: 'Additional Tailwind classes for the <tr>.'
		},
		{
			name: 'TableCell.colspan',
			type: 'number',
			description: 'Standard HTML <td> colspan attribute.'
		},
		{
			name: 'TableCell.class',
			type: 'string',
			description: 'Additional Tailwind classes for the <td>.'
		},
		{
			name: 'TableHead.colspan',
			type: 'number',
			description: 'Standard HTML <th> colspan attribute.'
		},
		{
			name: 'TableHead.class',
			type: 'string',
			description: 'Additional Tailwind classes for the <th>.'
		}
	],

	porting: [
		'Semantic <code>&lt;table&gt;</code> primitive. 48px headers in mono-tracked uppercase, 14px body text, hairline-bottom rows with cell-hover tint.',
		'Wrap in <code>overflow-auto</code> for horizontal scroll on narrow surfaces.'
	],

	example: `<script lang="ts">
	import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@dashfi/svelte/ui/table';
<\/script>

<Table>
	<TableHeader>
		<TableRow>
			<TableHead>Reference</TableHead>
			<TableHead>Merchant</TableHead>
			<TableHead class="text-right">Amount</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each rows as row}
			<TableRow>
				<TableCell>{row.ref}</TableCell>
				<TableCell>{row.merchant}</TableCell>
				<TableCell class="text-right tabular-nums">{row.amount}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>`,

	accessibility: [
		'Native <code>&lt;table&gt;</code> semantics — screen readers announce columns / rows correctly.',
		'Use <code>&lt;caption&gt;</code> (rendered bottom-anchored) to describe the table contents.',
		'For interactive rows, add appropriate <code>role</code> / <code>tabindex</code> + keyboard handlers at the call site.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). 48px headers in text-xs tracking-wider uppercase, 16/16 cells, hairline row separator at 50% border, hover tints cells (not row).'
		}
	]
};
