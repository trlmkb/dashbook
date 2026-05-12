<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { DateRangeSelector } from '@dashfi/svelte/ui/date-range-selector';

	const propsTable: PropDef[] = [
		{
			name: 'value',
			type: 'DateRange',
			default: '{ start: undefined, end: undefined }',
			bindable: true,
			description: 'Selected range. DateRange from bits-ui — { start?: DateValue; end?: DateValue }.'
		},
		{
			name: 'isOpen',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Controls the popover open state. Bindable for external control.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the trigger button.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Filter by date'",
			description: 'Trigger text shown when no range is selected.'
		},
		{
			name: 'updateValueMode',
			type: "'onSubmit' | 'onChange'",
			default: "'onChange'",
			description: 'When onSubmit, value only updates after Apply; onChange syncs immediately.'
		},
		{
			name: 'popupAlignment',
			type: "'start' | 'end' | 'center'",
			default: "'end'",
			description: 'Popover alignment relative to the trigger.'
		},
		{
			name: 'minValue',
			type: "DateRange['start']",
			description: 'Earliest selectable date (inclusive).'
		},
		{
			name: 'maxValue',
			type: "DateRange['end']",
			description: 'Latest selectable date (inclusive).'
		},
		{
			name: 'onSubmit',
			type: '(dateRange?: DateRange) => void',
			description: 'Fires when Apply is clicked (onSubmit mode) or selection completes (onChange mode).'
		},
		{
			name: 'onClear',
			type: '() => void',
			description: 'Fires when Clear filters is clicked. Value is reset before the callback runs.'
		},
		{
			name: 'className',
			type: 'string',
			description: 'Additional Tailwind classes merged onto the trigger button.'
		}
	];

	const example = `<script lang="ts">
	import { DateRangeSelector } from '@dashfi/svelte/ui/date-range-selector';
<\/script>

<DateRangeSelector bind:value={range} />`;
</script>

<svelte:head><title>Date Range Selector — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Date Range Selector"
	description="Pick a start + end date with presets — Last 7d, MTD, QTD, YTD. Powers transaction filters and reports."
	importPath="@dashfi/svelte/ui/date-range-selector"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="240px">
			{#snippet children(_m)}
				<div style:width="320px"><DateRangeSelector /></div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
