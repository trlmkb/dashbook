import type { ComponentSpec } from '../types.js';

/**
 * RangeCalendar — bits-ui RangeCalendar wrapper.
 *
 * Two-month grid for selecting a date range. Same skeleton as Calendar,
 * with range start/end primary-filled and middle days accent-tinted.
 */
export const rangeCalendar: ComponentSpec = {
	slug: 'range-calendar',
	name: 'Range Calendar',
	category: 'Inputs',
	status: 'beta',
	importPath: "import { RangeCalendar } from '@dashfi/svelte/ui/range-calendar'",
	description:
		'Two-month calendar grid for selecting a date range. Underlies Date Range Selector. Start/end primary-filled, middle accent-tinted.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/range-calendar/',

	dimensions: [
		{
			name: 'Skeleton',
			value: 'same as Calendar — caption + nav, weekday row, day cells',
			notes: 'Day cells use size-8 (32×32) hit target.'
		},
		{
			name: 'Range start / end',
			value: 'primary fill',
			tw: 'bg-primary text-primary-foreground',
			notes: 'Same as Calendar selected state.'
		},
		{
			name: 'Range middle',
			value: 'accent fill at 50%',
			tw: 'bg-accent/50',
			notes: 'Rounded corners only at the start/end of each week row.'
		},
		{
			name: 'Hovered range preview',
			value: 'lighter accent tint during selection drag'
		}
	],

	tokens: [
		{
			name: 'Start / end fill',
			token: { cssVar: '--color-primary', light: '#24251d', dark: '#ffffff' }
		},
		{
			name: 'Start / end text',
			token: { cssVar: '--color-primary-foreground', light: '#ffffff', dark: '#000000' }
		},
		{
			name: 'Middle tint',
			token: { cssVar: '--color-accent', light: '#f1efea', dark: '#191f1d' },
			notes: 'Rendered at ~50% opacity via bg-accent/50.'
		},
		{
			name: 'Outside month',
			token: { cssVar: '--color-muted-foreground', light: '#6e8180', dark: '#819896' }
		}
	],

	composition: [
		'Bind <code>value: DateRange</code> (<code>{ start, end }</code>). Two-step selection: click start, click end.',
		'Pair with Popover for inline range-pickers; use <code>DateRangeSelector</code> for the preset-shortcut variant.',
		'<code>numberOfMonths</code> defaults to 1 but can render side-by-side months.'
	],

	nonFeatures: [
		'No preset shortcuts (last 7 days, this month, etc.). Compose at the call site or use DateRangeSelector.',
		'No time-of-day input. Dates only.',
		'No popover trigger built in.'
	],

	props: [
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
	],

	porting: [
		'bits-ui RangeCalendar with Tailwind chrome. Start/end primary-filled, middle accent-tinted at 50%.',
		'Identical grid skeleton to Calendar; only the day-cell selection treatment differs.'
	],

	example: `<script lang="ts">
	import { RangeCalendar } from '@dashfi/svelte/ui/range-calendar';
<\/script>

<RangeCalendar bind:value={range} />`,

	accessibility: [
		'Arrow keys navigate days. <code>PgUp/PgDn</code> change months.',
		'Range selection is two-step: focus + select start, then focus + select end. Both endpoints announced.',
		'Bounds (<code>minValue</code>/<code>maxValue</code>) prevent selection of disabled days.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Same skeleton as Calendar, with range-start/end bg-primary and middle bg-accent/50 tint.'
		}
	]
};
