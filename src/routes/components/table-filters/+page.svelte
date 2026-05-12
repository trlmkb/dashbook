<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { SearchFilter, FilterPanel, SelectFilter, DateRangeFilter } from '@dashfi/svelte/ui/table-filters';

	const searchFilterProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Current search value.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void',
			description: 'Fired when the input value changes.'
		},
		{
			name: 'label',
			type: 'string',
			description: 'Optional label rendered above the input.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Search...'",
			description: 'Placeholder text.'
		},
		{
			name: 'debounce',
			type: 'number',
			default: '300',
			description: 'Debounce delay in milliseconds.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the input.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes for the container.'
		}
	];

	const selectFilterProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Current selected option value.'
		},
		{
			name: 'options',
			type: '{ value: string; label: string }[]',
			required: true,
			description: 'Available options to choose from.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void',
			description: 'Fired when the selected value changes.'
		},
		{
			name: 'label',
			type: 'string',
			description: 'Optional label rendered above the select.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Select...'",
			description: 'Placeholder shown when nothing is selected.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the select.'
		},
		{
			name: 'loading',
			type: 'boolean',
			default: 'false',
			description: 'Show a loading state in place of the options.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes for the container.'
		}
	];

	const dateRangeFilterProps: PropDef[] = [
		{
			name: 'value',
			type: 'DateRange',
			default: '{ start: undefined, end: undefined }',
			bindable: true,
			description: 'Current date range (from bits-ui).'
		},
		{
			name: 'onValueChange',
			type: '(value: DateRange) => void',
			description: 'Fired when the range changes (timing depends on updateMode).'
		},
		{
			name: 'updateMode',
			type: "'onSubmit' | 'onChange'",
			default: "'onSubmit'",
			description: 'Whether to fire onValueChange on each selection or only on explicit submit.'
		},
		{
			name: 'label',
			type: 'string',
			description: 'Optional label rendered above the picker.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Select date range...'",
			description: 'Placeholder shown when no range is selected.'
		},
		{
			name: 'minValue',
			type: 'DateRange["start"]',
			description: 'Minimum selectable date.'
		},
		{
			name: 'maxValue',
			type: 'DateRange["end"]',
			description: 'Maximum selectable date.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the picker.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes for the container.'
		}
	];

	const filterPanelProps: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			required: true,
			description: 'Whether the panel is expanded.'
		},
		{
			name: 'activeCount',
			type: 'number',
			default: '0',
			description: 'Number of active filters; rendered as a badge on the legend.'
		},
		{
			name: 'onReset',
			type: '() => void',
			description: 'Reset handler. Shows the Reset button when provided and activeCount > 0.'
		},
		{
			name: 'legend',
			type: 'string',
			default: "'Filters'",
			description: 'Fieldset legend text.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Filter inputs rendered inside the panel grid.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes for the container.'
		}
	];

	let search = $state('');

	const example = `<script lang="ts">
\timport {
\t\tSearchFilter, SelectFilter, DateRangeFilter, FilterPanel,
\t\tcountActiveFilters, hasActiveFilters,
\t\tfiltersToURLParams, filtersFromURLParams
\t} from '@dashfi/svelte/ui/table-filters';
<\/script>

<div class="flex gap-2">
\t<SearchFilter bind:value={search} placeholder="Search transactions" />
\t<SelectFilter options={merchants} bind:value={merchant} placeholder="Merchant" />
\t<DateRangeFilter bind:value={range} />
</div>

<!-- helpers -->
const count = countActiveFilters({ search, merchant, range });
const params = filtersToURLParams({ search, merchant, range });`;
</script>

<svelte:head><title>Table Filters — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Table Filters"
	description="Pre-built filter UI — search, select facets, date range. Drops into table toolbars; URL-param helpers included."
	importPath="@dashfi/svelte/ui/table-filters"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="600px">
					<SearchFilter bind:value={search} placeholder="Search transactions" />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="SearchFilter" props={searchFilterProps} />
			<PropsTable title="SelectFilter" props={selectFilterProps} />
			<PropsTable title="DateRangeFilter" props={dateRangeFilterProps} />
			<PropsTable title="FilterPanel" props={filterPanelProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<ul class="docs-list">
				<li><code>SearchFilter</code> — debounced text input.</li>
				<li><code>SelectFilter</code> — single-select facet.</li>
				<li><code>DateRangeFilter</code> — start + end with presets.</li>
				<li><code>FilterPanel</code> — wrapping container for advanced filter sets.</li>
				<li>Helpers: <code>countActiveFilters</code>, <code>hasActiveFilters</code>, <code>resetFilters</code>, <code>filtersToURLParams</code>, <code>filtersFromURLParams</code>, <code>debounce</code>.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
