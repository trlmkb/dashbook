import type { ComponentSpec } from '../types.js';

/**
 * Multi Select — underline-Input-shaped trigger with selected Badge chips
 * and a popover dropdown of options. No search in the canonical (use Command
 * inside Popover for searchable lists).
 */
export const multiSelect: ComponentSpec = {
	slug: 'multi-select',
	name: 'Multi Select',
	category: 'Inputs',
	status: 'beta',
	importPath: "import { MultiSelect } from '@dashfi/svelte/ui/multi-select'",
	description:
		'Select multiple options from a flat list. Underline-Input-shaped trigger with inline Badge chips (X to remove) and a popover dropdown.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/multi-select/multi-select.svelte',

	dimensions: [
		{
			name: 'Trigger',
			value: '40px tall underline, full-width',
			tw: 'h-10 border-b',
			notes: 'Mirrors canonical Input shape. Selected chips inline; ChevronDown right.'
		},
		{
			name: 'Selected chips',
			value: 'canonical Badge with X icon',
			notes: 'Click X to remove a chip in-place.'
		},
		{
			name: 'Dropdown panel',
			value: 'popover container with option rows',
			notes: 'Checked options show a check glyph.'
		},
		{
			name: 'Disabled state',
			value: 'opacity-40 + pointer-events-none on the whole control'
		}
	],

	tokens: [
		{
			name: 'Trigger underline',
			token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' },
			notes: 'Inherits Input tokens.'
		},
		{ name: 'Chip', notes: 'Inherits Badge tokens (mono caps, hairline border).' },
		{
			name: 'Panel background',
			token: { cssVar: '--color-popover', light: '#ffffff', dark: '#141a19' }
		},
		{
			name: 'Panel text',
			token: { cssVar: '--color-popover-foreground', light: '#123b39', dark: '#ffffff' }
		}
	],

	composition: [
		'Pass <code>options: { value, label }[]</code> and bind <code>selected: string[]</code>.',
		'<code>onchange</code> fires with the new selected array on every toggle.',
		'For searchable lists use <code>Command</code> inside a <code>Popover</code> instead.'
	],

	nonFeatures: [
		'No search / typeahead. For searchable lists use <code>Command</code> inside a <code>Popover</code>.',
		'No grouped options. Flat list only.',
		'No custom option render slot.',
		'No async loading — pass a static <code>options</code> array.'
	],

	props: [
		{
			name: 'options',
			type: 'MultiSelectOption[]',
			required: true,
			description: 'Available options. Each option is { value: string; label: string }.'
		},
		{
			name: 'selected',
			type: 'string[]',
			default: '[]',
			bindable: true,
			description: 'Currently selected option values. Two-way binding via bind:selected.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Select...'",
			description: 'Placeholder shown when no options are selected.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the trigger, hides the clear button, and prevents opening.'
		},
		{
			name: 'onchange',
			type: '(selected: string[]) => void',
			description: 'Fires when selection changes. Receives the new selected array.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge on the wrapper.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the inner combobox div.'
		},
		{
			name: 'restProps',
			type: "HTMLAttributes<HTMLDivElement> (without 'onchange')",
			description: 'Remaining native div attributes pass through to the outer container.'
		}
	],

	porting: [
		'Underline trigger + Badge chips + popover list. <code>options</code> + <code>selected</code> + <code>onchange</code> is the surface.',
		'For another stack: mirror the underline Input shape, render selected as removable chips, and house the option list in a portal-rendered popover.'
	],

	example: `<script lang="ts">
	import { MultiSelect, type MultiSelectOption } from '@dashfi/svelte/ui/multi-select';

	const options: MultiSelectOption[] = [
		{ value: 'meta', label: 'Meta' },
		{ value: 'google', label: 'Google' }
	];
	let selected = $state<string[]>([]);
<\/script>

<MultiSelect {options} bind:selected placeholder="Select channels" />`,

	accessibility: [
		'Trigger is keyboard-focusable; Enter / Space opens the panel.',
		'Each option row is independently focusable; Space toggles selection.',
		'Chip X buttons are real buttons — Tab navigates between them for removal.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Underline-Input-shaped trigger with inline Badge chips, X-to-remove per chip, ChevronDown right. No search.'
		}
	]
};
