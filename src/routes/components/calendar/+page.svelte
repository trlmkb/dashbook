<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Calendar } from '@dashfi/svelte/ui/calendar';

	const propsTable: PropDef[] = [
		{
			name: 'value',
			type: 'DateValue | DateValue[] | undefined',
			bindable: true,
			description: 'Selected date(s). Use @internationalized/date DateValue. Array when type="multiple".'
		},
		{
			name: 'placeholder',
			type: 'DateValue | undefined',
			bindable: true,
			description: 'The focused/displayed month. Bind to control which month is visible.'
		},
		{
			name: 'type',
			type: "'single' | 'multiple'",
			default: "'single'",
			description: 'Selection mode. Inherited from bits-ui Calendar.Root.'
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
			name: 'weekdayFormat',
			type: "'narrow' | 'short' | 'long'",
			default: "'short'",
			description: 'Intl.DateTimeFormat weekday style for the column headers.'
		},
		{
			name: 'captionLayout',
			type: "'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label'",
			default: "'label'",
			description: 'How the month/year caption renders. Dropdown variants enable quick navigation.'
		},
		{
			name: 'buttonVariant',
			type: 'ButtonVariant',
			default: "'ghost'",
			description: 'Variant applied to prev/next month buttons.'
		},
		{
			name: 'months',
			type: 'CalendarPrimitive.MonthSelectProps[\'months\']',
			description: 'Custom month list for the months dropdown.'
		},
		{
			name: 'years',
			type: 'CalendarPrimitive.YearSelectProps[\'years\']',
			description: 'Custom year list for the years dropdown.'
		},
		{
			name: 'monthFormat',
			type: 'CalendarPrimitive.MonthSelectProps[\'monthFormat\']',
			description: 'Format token for rendering month names. Defaults to long, or short for dropdown layouts.'
		},
		{
			name: 'yearFormat',
			type: 'CalendarPrimitive.YearSelectProps[\'yearFormat\']',
			default: "'numeric'",
			description: 'Format token for rendering year labels.'
		},
		{
			name: 'disableDaysOutsideMonth',
			type: 'boolean',
			default: 'false',
			description: 'When true, leading/trailing days from adjacent months are non-interactive.'
		},
		{
			name: 'day',
			type: 'Snippet<[{ day: DateValue; outsideMonth: boolean }]>',
			description: 'Custom render for each day cell. Replaces default Calendar.Day output.'
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
			type: 'CalendarPrimitive.RootProps',
			description: 'All bits-ui Calendar.Root props (onValueChange, readonly, disabled, etc.) pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Calendar } from '@dashfi/svelte/ui/calendar';
<\/script>

<Calendar bind:value={selected} />`;
</script>

<svelte:head><title>Calendar — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Calendar"
	description="Date picker grid. Keyboard-navigable, prev/next months, optional min/max bounds."
	importPath="@dashfi/svelte/ui/calendar"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="360px">
			{#snippet children(_m)}
				<Calendar />
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Arrow keys navigate days. <code>PgUp/PgDn</code> change months.</li>
				<li>Selected date is announced; bounds (<code>min</code>/<code>max</code>) prevent selection of disabled days.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
