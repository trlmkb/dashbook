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
			<div class="docs-h">Parts</div>
			<ul class="docs-list">
				<li><strong>FilterPanel</strong> — the container wrapping a row of filters.</li>
				<li><strong>SearchFilter</strong> — Input-shaped search box bound to a string (typically with debounce).</li>
				<li><strong>SelectFilter</strong> — Select-shaped facet picker; bound to a single value.</li>
				<li><strong>DateRangeFilter</strong> — DateRangeSelector composed into the panel.</li>
			</ul>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li>All filter inputs use the canonical Input/Select underline shape (<code>h-10 border-b</code>, no full border, no radius).</li>
				<li>Panel is a horizontal flex row with gap between filters.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Inherits Input + Select tokens. No additional chrome.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Place above a Table or DataTable. Bind each filter's value into the table's filter state.</li>
				<li>Mix and match — only include the filter primitives you actually need.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Composable row of filter primitives wrapping Input/Select/DateRangeSelector.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Composable
					filter row above Tables: SearchFilter, SelectFilter, DateRangeFilter,
					all using canonical underline Input/Select shapes.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
