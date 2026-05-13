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
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li>Same skeleton as <code>Calendar</code> — centred caption + nav, weekday row, day cells (<code>size-8</code> hit target).</li>
				<li><strong>Range start / end</strong> — <code>bg-primary text-primary-foreground</code> (same as Calendar's selected state).</li>
				<li><strong>Range middle</strong> — <code>bg-accent/50</code> with rounded corners only at the start/end of each week row.</li>
				<li><strong>Hovered range preview</strong> — lighter accent tint during selection drag.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Start/end fill <code>--color-primary</code>; middle tint <code>--color-accent</code> at ~50%; outside month <code>--color-muted-foreground</code>.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Bind <code>value: DateRange</code> (<code>{`{ start, end }`}</code>). Two-step selection: click start, click end.</li>
				<li>Pair with Popover for inline range-pickers; use <code>DateRangeSelector</code> for the preset-shortcut variant.</li>
			</ul>
			<div class="docs-h">Not part of RangeCalendar</div>
			<ul class="docs-list">
				<li>No preset shortcuts (last 7 days, this month, etc.). Compose at the call site or use DateRangeSelector.</li>
				<li>No time-of-day input. Dates only.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>bits-ui RangeCalendar with Tailwind chrome. Start/end primary-filled, middle accent-tinted.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Same skeleton as
					Calendar, with range-start/end <code>bg-primary</code> and middle
					<code>bg-accent/50</code> tint.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
