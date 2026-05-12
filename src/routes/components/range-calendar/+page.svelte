<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { RangeCalendar } from '@dashfi/svelte/ui/range-calendar';

	const propsTable: PropDef[] = [
		{
			name: 'value',
			type: 'DateRange | undefined',
			bindable: true,
			description: 'Selected range. { start?: DateValue; end?: DateValue } from bits-ui.'
		},
		{
			name: 'placeholder',
			type: 'DateValue | undefined',
			bindable: true,
			description: 'The focused/displayed month. Bind to control which month is visible.'
		},
		{
			name: 'weekdayFormat',
			type: "'narrow' | 'short' | 'long'",
			default: "'short'",
			description: 'Intl.DateTimeFormat weekday style for the column headers.'
		},
		{
			name: 'numberOfMonths',
			type: 'number',
			default: '1',
			description: 'Number of months to display side-by-side. Inherited from bits-ui RangeCalendar.Root.'
		},
		{
			name: 'pagedNavigation',
			type: 'boolean',
			default: 'false',
			description: 'When true, prev/next buttons advance by numberOfMonths instead of one month.'
		},
		{
			name: 'minValue',
			type: 'DateValue',
			description: 'Earliest selectable date (inclusive).'
		},
		{
			name: 'maxValue',
			type: 'DateValue',
			description: 'Latest selectable date (inclusive).'
		},
		{
			name: 'locale',
			type: 'string',
			default: "'en-US'",
			description: 'BCP-47 locale for weekday/month formatting.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the root container.'
		},
		{
			name: '...rest',
			type: 'RangeCalendarPrimitive.RootProps',
			description: 'All bits-ui RangeCalendar.Root props (onValueChange, readonly, disabled, etc.) pass through.'
		}
	];

	const example = `<script lang="ts">
	import { RangeCalendar } from '@dashfi/svelte/ui/range-calendar';
<\/script>

<RangeCalendar bind:value={range} />`;
</script>

<svelte:head><title>Range Calendar — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Range Calendar"
	description="Two-month grid for selecting a date range. Underlies Date Range Selector."
	importPath="@dashfi/svelte/ui/range-calendar"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="400px">
			{#snippet children(_m)}
				<RangeCalendar />
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
