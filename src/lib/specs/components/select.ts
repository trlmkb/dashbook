import type { ComponentSpec } from '../types.js';

/**
 * Select — dropdown selection.
 *
 * Trigger mirrors Input exactly: 40px tall, transparent bg, border-b only
 * in --color-input, no radius, no shadow. Content surface uses
 * --color-popover, rounded-xl, shadow-lg.
 */
export const select: ComponentSpec = {
	slug: 'select',
	name: 'Select',
	category: 'Inputs',
	status: 'stable',
	importPath:
		"import { Select, SelectTrigger, SelectContent, SelectItem } from '@dashfi/svelte/ui/select'",
	description: 'Dropdown selection. Built on bits-ui — keyboard navigation, search, async.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/select/',

	dimensions: [
		{
			name: 'SelectTrigger',
			value: '40px tall, full width, padding 0px horizontal · 8px vertical, 14px type',
			tw: 'h-10 w-full px-0 py-2 text-sm',
			notes:
				'*No radius, no shadow, no full border*. Only a 1px bottom border (`border-b`). Mirrors Input shape exactly — underline-only field.'
		},
		{
			name: 'Trigger chevron',
			value: '16px lucide ChevronDown',
			tw: 'opacity-50',
			notes: 'Pushed to the right via `justify-between`.'
		},
		{
			name: 'SelectContent',
			value: 'popover surface, max-h 384px, min-w 128px',
			tw: 'max-h-96 min-w-[8rem] rounded-xl p-1',
			notes:
				'Stretches to the trigger anchor via bits-ui CSS vars `--bits-select-anchor-width` / `--bits-select-anchor-height`. Radius 12px. No border. `shadow-lg`. Viewport padded `p-1`.'
		},
		{
			name: 'SelectItem',
			value: 'full width, padding 8px left · 32px right · 6px vertical, 14px type',
			tw: 'py-1.5 pr-8 pl-2 rounded-md text-sm',
			notes: 'Radius 6px.'
		},
		{
			name: 'Check indicator',
			value: '16px lucide Check',
			tw: 'right-2 size-3.5',
			notes: 'Only visible when item is selected.'
		},
		{ name: 'Side offset', value: '4px between trigger and content' },
		{ name: 'z-index', value: 'z-[60]' }
	],

	tokens: [
		{
			name: 'Trigger surface',
			notes: '`bg-transparent`, text `--color-foreground`.'
		},
		{
			name: 'Trigger bottom-border',
			token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' }
		},
		{
			name: 'Trigger placeholder',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' },
			notes: 'Via `data-placeholder:text-muted-foreground` when no value set.'
		},
		{
			name: 'Trigger focus',
			token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' },
			notes: 'Bottom-border switches via `focus:border-foreground`; native outline removed. No ring.'
		},
		{ name: 'Trigger disabled', notes: '`opacity-40` + `cursor-not-allowed`.' },
		{
			name: 'Content surface',
			token: { cssVar: '--color-popover', light: '#ffffff', dark: '#141a19' },
			notes: 'Brighter than `--color-background` for menu separation. Text `--color-popover-foreground`.'
		},
		{
			name: 'Item highlighted',
			token: { cssVar: '--color-accent', light: '#eceae0', dark: '#181e1d' },
			notes: 'On highlight (keyboard or hover) via `data-highlighted`; text `--color-accent-foreground`.'
		},
		{ name: 'Disabled item', notes: '`opacity-50` + `pointer-events-none` via `data-disabled`.' },
		{
			name: 'Animation',
			notes:
				'Content fades in + zooms from 95% (`fade-in-0 zoom-in-95`), translates 4px from the trigger side (`slide-in-from-top-2` + `translate-y-1` on bottom side, mirrored for other sides).'
		}
	],

	composition: [
		'Standard tree: <code>Select &gt; SelectTrigger + SelectContent &gt; SelectItem...</code>. Trigger holds the visible selection text; SelectContent portals to <code>body</code>.',
		'<code>type="single"</code> for single-select (string value); <code>type="multiple"</code> for multi-select (string[] value).',
		'For groups / separators, use <code>SelectGroup</code> and <code>SelectSeparator</code>.',
		'To preserve typed selection state across re-renders, bind <code>value</code>.'
	],

	nonFeatures: [
		'No size variants on the trigger. Always <code>h-10</code> — matches Input.',
		'No <code>placeholder</code> prop on Select. Place the placeholder text inside <code>SelectTrigger</code> as fallback content (e.g. <code>{value ? labels[value] : \'Choose...\'}</code>).',
		'No full border, no radius, no shadow on the trigger. It is an underline-only field. The previous box-style trigger is gone.',
		'No native <code>&lt;select&gt;</code> fallback. The component is fully custom.',
		'No virtualisation. For very long lists, prefer Command palette pattern.',
		'No icon-prefix slot on the trigger. The chevron at the right is fixed.'
	],

	props: [
		{
			name: 'Select.type',
			type: "'single' | 'multiple'",
			required: true,
			description: 'Selection mode. Drives the shape of value (string vs string[]).'
		},
		{
			name: 'Select.value',
			type: 'string | string[]',
			bindable: true,
			description: 'Bindable selected value. Two-way binding via bind:value.'
		},
		{
			name: 'Select.open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Bindable open state of the dropdown.'
		},
		{
			name: 'Select.disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the entire select.'
		},
		{
			name: 'Select.name',
			type: 'string',
			description: 'Native form name for the hidden submission input.'
		},
		{
			name: 'SelectContent.sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in px between the trigger and the floating content.'
		},
		{
			name: 'SelectContent.side',
			type: "'top' | 'right' | 'bottom' | 'left'",
			default: "'bottom'",
			description: 'Preferred side relative to the trigger. Floats to opposite side if no room.'
		},
		{
			name: 'SelectContent.align',
			type: "'start' | 'center' | 'end'",
			default: "'start'",
			description: 'Alignment of content relative to the trigger.'
		},
		{
			name: 'SelectItem.value',
			type: 'string',
			required: true,
			description: 'The value committed when this item is selected.'
		},
		{
			name: '...restProps',
			type: 'bits-ui Select.* props',
			description: 'All bits-ui Select.* props pass through.'
		}
	],

	porting: [
		'Trigger mirrors Input exactly: 40px tall, transparent bg, <code>border-b</code> only in <code>--color-input</code>, no radius, no shadow. On focus the bottom border becomes <code>--color-foreground</code>. Content surface uses the brighter <code>--color-popover</code> token, <code>rounded-xl</code> 12px with <code>shadow-lg</code>, no border. Items highlight to <code>--color-accent</code>.'
	],

	example: `<script lang="ts">
	import { Select, SelectTrigger, SelectContent, SelectItem } from '@dashfi/svelte/ui/select';
<\/script>

let card = $state<string | undefined>(undefined);

<Select type="single" bind:value={card}>
	<SelectTrigger>{card ? labels[card] : 'Choose a card'}</SelectTrigger>
	<SelectContent>
		<SelectItem value="debit">Debit</SelectItem>
		<SelectItem value="corporate">Corporate</SelectItem>
		<SelectItem value="net60">Daily Net 60</SelectItem>
	</SelectContent>
</Select>`,

	accessibility: [
		'Built on bits-ui — implements WAI-ARIA combobox / listbox semantics; type-ahead, arrow-key navigation, and Esc-to-close work out of the box.',
		'Trigger inherits focus styling from the underline-on-focus pattern. For form labelling, pair with a sibling <code>&lt;Label for="…"&gt;</code>.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Trigger flipped from a boxed field to an underline-only field — height bumps from h-9 to h-10, padding from px-3 py-2 to px-0 py-2, the full border drops to border-b, and radius + shadow-sm are removed. Focus state is now a bottom-border colour change to --color-foreground (no ring). Content surface picks up rounded-xl (12px) and shadow-lg; items use rounded-md. The previous v0.3.1 anatomy referenced a stale branch and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-13',
			note: 'Anatomy added: trigger mirrors Input exactly (36px, transparent bg, --color-input border, focus ring in --color-ring), content uses --color-popover + shadow-md, items highlight to --color-accent. Composition rule (Select + Trigger + Content + Item siblings; placeholder is fallback content not a prop) and explicit non-features. Matches the Input precedent.'
		}
	]
};
