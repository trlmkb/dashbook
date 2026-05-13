import type { ComponentSpec } from '../types.js';

/**
 * Calendar — bits-ui Calendar wrapper.
 *
 * Date picker grid. Month-year caption + prev/next chevrons, weekday strip,
 * day-cell buttons (icon-sized). Selected fills primary, today fills accent.
 */
export const calendar: ComponentSpec = {
	slug: 'calendar',
	name: 'Calendar',
	category: 'Inputs',
	status: 'stable',
	importPath: "import { Calendar } from '@dashfi/svelte/ui/calendar'",
	description:
		'Date picker. Month grid with prev/next navigation, keyboard-navigable. Selected day fills primary; today fills accent.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/calendar/',

	dimensions: [
		{
			name: 'Root',
			value: 'centred container, ~3em padding around the grid',
			notes: 'Wraps caption + nav + weekday strip + day grid.'
		},
		{
			name: 'Caption / nav',
			value: 'month-year header with prev/next chevron buttons',
			notes: 'Buttons are size="icon" Button variants.'
		},
		{
			name: 'Weekday row (GridHead)',
			value: '12px abbreviated day names, equally spaced',
			tw: 'text-muted-foreground text-xs'
		},
		{
			name: 'Day cell',
			value: '32×32 hit target',
			tw: 'size-8',
			notes: 'The day Button uses size="icon" with default Button height; matches the rest of the system.'
		},
		{
			name: 'Selected day',
			value: 'primary fill',
			tw: 'bg-primary text-primary-foreground'
		},
		{
			name: 'Today',
			value: 'accent fill (when not selected)',
			tw: 'bg-accent text-accent-foreground'
		},
		{
			name: 'Outside month',
			value: 'muted-foreground at 50%',
			tw: 'text-muted-foreground/50'
		}
	],

	tokens: [
		{
			name: 'Selected day fill',
			token: { cssVar: '--color-primary', light: '#25261d', dark: '#ffffff' },
			notes: 'Background of the currently selected day.'
		},
		{
			name: 'Selected day text',
			token: { cssVar: '--color-primary-foreground', light: '#ffffff', dark: '#000000' }
		},
		{
			name: 'Today fill',
			token: { cssVar: '--color-accent', light: '#eceae0', dark: '#181e1d' },
			notes: 'Background of today when it is not the selected day.'
		},
		{
			name: 'Weekday row text',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
		},
		{
			name: 'Outside-month text',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' },
			notes: 'Rendered at 50% opacity via text-muted-foreground/50.'
		}
	],

	composition: [
		'Bind <code>value</code> for single or multiple selection via <code>type="single" | "multiple"</code>; pair with Popover for a date-picker pattern.',
		'Uses <code>@internationalized/date</code> DateValue for values, min/max bounds, and locale-aware formatting.',
		'<code>captionLayout</code> swaps the month/year header between a static label and dropdown navigation.'
	],

	nonFeatures: [
		'No time picker. Date only.',
		'No range selection. Use <code>RangeCalendar</code>.',
		'No preset shortcuts. Use <code>DateRangeSelector</code>.',
		'No popover trigger built in — Calendar is the grid; compose with Popover for a date-picker affordance.'
	],

	props: [
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
	],

	porting: [
		'bits-ui Calendar wrapped with Tailwind classes. Day cells are icon-sized buttons (size-8); selected/today/outside states swap surface tokens.',
		'Selected fills <code>--color-primary</code>, today is <code>--color-accent</code>, muted dates use <code>--color-muted-foreground</code> at 50% opacity.'
	],

	example: `<script lang="ts">
	import { Calendar } from '@dashfi/svelte/ui/calendar';
<\/script>

<Calendar bind:value={selected} />`,

	accessibility: [
		'Arrow keys navigate days. <code>PgUp/PgDn</code> change months.',
		'Selected date is announced; bounds (<code>minValue</code>/<code>maxValue</code>) prevent selection of disabled days.',
		'Day buttons render as <code>role="gridcell"</code> via bits-ui Calendar primitives.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Day cells are size-8 icon-Buttons. Selected bg-primary, today bg-accent, outside-month text-muted-foreground/50.'
		}
	]
};
