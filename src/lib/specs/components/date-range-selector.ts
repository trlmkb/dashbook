import type { ComponentSpec } from '../types.js';

/**
 * DateRangeSelector — outline Button trigger + Popover (presets + RangeCalendar).
 *
 * Powers transaction filters and reports — preset shortcuts (Today, Yesterday,
 * Last 7d, MTD, QTD, YTD) plus custom range via the embedded RangeCalendar.
 */
export const dateRangeSelector: ComponentSpec = {
	slug: 'date-range-selector',
	name: 'Date Range Selector',
	category: 'Inputs',
	status: 'beta',
	importPath: "import { DateRangeSelector } from '@dashfi/svelte/ui/date-range-selector'",
	description:
		'Pick a start + end date with presets — Last 7d, MTD, QTD, YTD. Powers transaction filters and reports.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/date-range-selector/',

	dimensions: [
		{
			name: 'Trigger button',
			value: 'inherits Button outline (40px tall by default)',
			tw: 'h-10',
			notes: 'Renders the start–end date label with a trailing ChevronDown.'
		},
		{
			name: 'Popover content',
			value: '16px padding, 12px radius, large shadow',
			tw: 'rounded-xl p-4 shadow-lg',
			notes: 'Houses the preset column + RangeCalendar.'
		},
		{
			name: 'Preset list',
			value: 'vertical Button-ghost rows, full-width, left-aligned',
			tw: 'justify-start',
			notes: 'Today, Yesterday, Last 7 days, Last 30 days, MTD, QTD, YTD.'
		},
		{
			name: 'RangeCalendar',
			value: 'embedded inside the popover for custom range selection'
		}
	],

	tokens: [
		{
			name: 'Popover surface',
			token: { cssVar: '--color-popover', light: '#ffffff', dark: '#141a19' }
		},
		{
			name: 'Trigger border (Button outline)',
			token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' },
			notes: 'Inherits Button outline tokens.'
		},
		{
			name: 'Preset hover (Button ghost)',
			token: { cssVar: '--color-accent', light: '#eceae0', dark: '#181e1d' }
		}
	],

	composition: [
		'Bind <code>value: DateRange</code>. Selecting a preset auto-fills the range; the calendar updates to highlight the selection.',
		'Use for analytics / reporting filters where presets are essential.',
		'<code>updateValueMode="onSubmit"</code> defers commit until the user clicks Apply; <code>"onChange"</code> syncs immediately.'
	],

	nonFeatures: [
		'No custom preset slot in the canonical — preset list is fixed. Wrap your own if you need custom labels.',
		'No time-of-day input.',
		'No multi-range selection.'
	],

	props: [
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
	],

	porting: [
		'Outline Button trigger + Popover containing a fixed preset list and an embedded RangeCalendar.',
		'Triggered by clicking the button; popover anchored at <code>popupAlignment</code>; commit semantics controlled by <code>updateValueMode</code>.'
	],

	example: `<script lang="ts">
	import { DateRangeSelector } from '@dashfi/svelte/ui/date-range-selector';
<\/script>

<DateRangeSelector bind:value={range} />`,

	accessibility: [
		'Trigger is a Button — full keyboard interaction (Space / Enter to open).',
		'Popover traps focus while open; Escape closes.',
		'Preset list uses standard Button focus / hover affordances.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Outline Button trigger + Popover (presets column + RangeCalendar).'
		}
	]
};
