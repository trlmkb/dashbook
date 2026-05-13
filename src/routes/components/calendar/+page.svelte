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
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Root</strong> — centred container, ~3em padding around the grid.</li>
				<li><strong>Caption / nav</strong> — month-year header with prev/next chevron buttons. Buttons are <code>size="icon"</code> Button variants.</li>
				<li><strong>GridHead (weekday row)</strong> — <code>text-muted-foreground text-xs</code> (12px) abbreviated day names, equally spaced.</li>
				<li><strong>Day cell</strong> — <code>size-8</code> (32×32) hit target. The day Button uses <code>size="icon"</code> with default Button height; matches the rest of the system.</li>
				<li><strong>Selected day</strong> — <code>bg-primary text-primary-foreground</code>.</li>
				<li><strong>Today</strong> — <code>bg-accent text-accent-foreground</code> (when not selected).</li>
				<li><strong>Outside month</strong> — <code>text-muted-foreground/50</code>.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Selected day fills with <code>--color-primary</code>; today is <code>--color-accent</code>; muted dates are <code>--color-muted-foreground</code>.</li>
				<li>Weekday row uses <code>--color-muted-foreground</code>.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Bind <code>value</code> for single or multiple selection via <code>type</code>; pair with Popover for a date-picker pattern.</li>
				<li>Uses <code>@internationalized/date</code> DateValue.</li>
			</ul>
			<div class="docs-h">Not part of Calendar</div>
			<ul class="docs-list">
				<li>No time picker. Date only.</li>
				<li>No range selection. Use <code>RangeCalendar</code>.</li>
				<li>No preset shortcuts. Use <code>DateRangeSelector</code>.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>bits-ui Calendar wrapped with Tailwind classes. Day cells are icon-sized buttons; selected/today/outside states swap surface tokens.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Day cells are
					<code>size-8</code> icon-Buttons. Selected <code>bg-primary</code>, today
					<code>bg-accent</code>, outside-month <code>text-muted-foreground/50</code>.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
