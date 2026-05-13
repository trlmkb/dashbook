import type { ComponentSpec } from '../types.js';

/**
 * TableFilters — composable filter row for tables.
 *
 * Three filter primitives + a FilterPanel container. Each uses the canonical
 * underline Input/Select shape; helpers convert filter state to URL params.
 */
export const tableFilters: ComponentSpec = {
	slug: 'table-filters',
	name: 'Table Filters',
	category: 'Data',
	status: 'beta',
	importPath:
		"import { SearchFilter, DateRangeFilter, FilterButton } from '@dashfi/svelte/ui/table-filters'",
	description:
		'Pre-built filter UI — search, select facets, date range. Drops into table toolbars; URL-param helpers included.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/table-filters/',

	dimensions: [
		{
			name: 'FilterPanel',
			value: 'fieldset container wrapping a row of filters',
			notes: 'Legend with active-count badge; optional Reset button when activeCount > 0.'
		},
		{
			name: 'SearchFilter',
			value: 'Input-shaped search box',
			tw: 'h-10 border-b',
			notes: 'Inherits Input dimensions (40px tall, underline-only). Debounced.'
		},
		{
			name: 'SelectFilter',
			value: 'Select-shaped facet picker',
			tw: 'h-10 border-b',
			notes: 'Inherits Select dimensions. Single-value.'
		},
		{
			name: 'DateRangeFilter',
			value: 'DateRangeSelector composed into the panel',
			notes: 'Inherits DateRangeSelector trigger (outline Button) + popover.'
		}
	],

	tokens: [
		{
			name: 'Chrome',
			notes: 'Inherits Input + Select + DateRangeSelector tokens. No additional chrome.'
		}
	],

	composition: [
		'Place above a Table or DataTable. Bind each filter\'s value into the table\'s filter state.',
		'Mix and match — only include the filter primitives you actually need.',
		'Helpers: <code>countActiveFilters</code>, <code>hasActiveFilters</code>, <code>filtersToURLParams</code>, <code>filtersFromURLParams</code> for URL-state syncing.'
	],

	nonFeatures: [
		'No multi-select facet primitive — use <code>MultiSelect</code> outside the table-filters package if needed.',
		'No saved-filter / preset slot.',
		'No layout opinion beyond the FilterPanel container — caller controls grid / flex layout.'
	],

	props: [
		{
			name: 'SearchFilter.value',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Current search value.'
		},
		{
			name: 'SearchFilter.onValueChange',
			type: '(value: string) => void',
			description: 'Fired when the input value changes.'
		},
		{
			name: 'SearchFilter.debounce',
			type: 'number',
			default: '300',
			description: 'Debounce delay in milliseconds.'
		},
		{
			name: 'SearchFilter.placeholder',
			type: 'string',
			default: "'Search...'",
			description: 'Placeholder text.'
		},
		{
			name: 'SelectFilter.value',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Current selected option value.'
		},
		{
			name: 'SelectFilter.options',
			type: '{ value: string; label: string }[]',
			required: true,
			description: 'Available options to choose from.'
		},
		{
			name: 'SelectFilter.loading',
			type: 'boolean',
			default: 'false',
			description: 'Show a loading state in place of the options.'
		},
		{
			name: 'DateRangeFilter.value',
			type: 'DateRange',
			default: '{ start: undefined, end: undefined }',
			bindable: true,
			description: 'Current date range (from bits-ui).'
		},
		{
			name: 'DateRangeFilter.updateMode',
			type: "'onSubmit' | 'onChange'",
			default: "'onSubmit'",
			description: 'Whether to fire onValueChange on each selection or only on explicit submit.'
		},
		{
			name: 'FilterPanel.open',
			type: 'boolean',
			required: true,
			description: 'Whether the panel is expanded.'
		},
		{
			name: 'FilterPanel.activeCount',
			type: 'number',
			default: '0',
			description: 'Number of active filters; rendered as a badge on the legend.'
		},
		{
			name: 'FilterPanel.onReset',
			type: '() => void',
			description: 'Reset handler. Shows the Reset button when provided and activeCount > 0.'
		},
		{
			name: 'FilterPanel.legend',
			type: 'string',
			default: "'Filters'",
			description: 'Fieldset legend text.'
		}
	],

	porting: [
		'Composable row of filter primitives wrapping Input / Select / DateRangeSelector.',
		'URL-param helpers (<code>filtersToURLParams</code> / <code>filtersFromURLParams</code>) are pure functions — port directly.'
	],

	example: `<script lang="ts">
	import {
		SearchFilter, SelectFilter, DateRangeFilter, FilterPanel,
		countActiveFilters, hasActiveFilters,
		filtersToURLParams, filtersFromURLParams
	} from '@dashfi/svelte/ui/table-filters';
<\/script>

<div class="flex gap-2">
	<SearchFilter bind:value={search} placeholder="Search transactions" />
	<SelectFilter options={merchants} bind:value={merchant} placeholder="Merchant" />
	<DateRangeFilter bind:value={range} />
</div>

const count = countActiveFilters({ search, merchant, range });
const params = filtersToURLParams({ search, merchant, range });`,

	accessibility: [
		'Each filter is a labelled form control — pair with the <code>label</code> prop or external <code>&lt;Label&gt;</code>.',
		'FilterPanel uses <code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> for proper grouping semantics.',
		'Reset button is keyboard-focusable when shown.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Composable filter row above Tables: SearchFilter, SelectFilter, DateRangeFilter, all using canonical underline Input/Select shapes.'
		}
	]
};
