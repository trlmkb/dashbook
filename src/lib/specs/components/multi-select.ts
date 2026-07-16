import type { ComponentSpec } from '../types.js';

/**
 * Multi Select — bordered combobox trigger with selected Badge chips and an
 * anchored option panel. No search in the canonical.
 */
export const multiSelect: ComponentSpec = {
	slug: 'multi-select',
	name: 'Multi Select',
	category: 'Inputs',
	status: 'beta',
	importPath: "import { MultiSelect } from '@dashfi/svelte/ui/multi-select'",
	description:
		'Select multiple options from a flat list. Bordered combobox trigger with inline Badge chips, clear controls, and an anchored option panel.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/multi-select/multi-select.svelte',

	dimensions: [
		{
			name: 'Trigger',
			value: 'minimum 40px tall, full-width, 6px radius, 1px border, 12×8px padding',
			tw: 'min-h-10 w-full rounded-md border px-3 py-2',
			notes: 'Selected chips wrap inline; clear + ChevronDown controls sit at the end.'
		},
		{
			name: 'Selected chips',
			value: 'canonical Badge with X icon',
			notes: 'Click X to remove a chip in-place.'
		},
		{
			name: 'Dropdown panel',
			value: 'full trigger width; 6px radius, 4px padding, shadow-md',
			tw: 'absolute z-50 mt-1 w-full rounded-md border p-1 shadow-md',
			notes: 'Checked options show a 16px checkbox and check glyph.'
		},
		{
			name: 'Disabled state',
			value: 'opacity 50% + not-allowed cursor on the trigger'
		}
	],

	tokens: [
		{
			name: 'Trigger border',
			token: { cssVar: '--color-input', light: '#c0cecd', dark: '#1e2928' },
			notes: '`border-input`; full border, not underline-only.'
		},
		{
			name: 'Trigger background',
			token: { cssVar: '--color-background', light: '#faf9f5', dark: '#0f1412' }
		},
		{
			name: 'Trigger focus ring',
			token: { cssVar: '--color-ring', light: '#2b5f5b', dark: '#46b9af' },
			notes: '2px ring with 2px background offset; also shown while open.'
		},
		{
			name: 'Placeholder / controls',
			token: { cssVar: '--color-muted-foreground', light: '#6e8180', dark: '#819896' }
		},
		{
			name: 'Trigger hover',
			token: { cssVar: '--color-accent', light: '#f1efea', dark: '#191f1d' },
			notes: '50% alpha.'
		},
		{ name: 'Chip', notes: 'Inherits Badge tokens (mono caps, hairline border).' },
		{
			name: 'Panel background',
			token: { cssVar: '--color-popover', light: '#ffffff', dark: '#161d1a' }
		},
		{
			name: 'Panel text',
			token: { cssVar: '--color-popover-foreground', light: '#123b38', dark: '#ffffff' }
		},
		{
			name: 'Option hover background',
			token: { cssVar: '--color-accent', light: '#f1efea', dark: '#191f1d' }
		},
		{
			name: 'Option hover text',
			token: { cssVar: '--color-accent-foreground', light: '#123b38', dark: '#ffffff' }
		},
		{
			name: 'Selected checkbox',
			token: { cssVar: '--color-primary', light: '#24251d', dark: '#ffffff' },
			notes: 'Fill + border; glyph uses --color-primary-foreground.'
		},
		{
			name: 'Selected checkbox glyph',
			token: { cssVar: '--color-primary-foreground', light: '#ffffff', dark: '#000000' }
		},
		{
			name: 'Clear control hover',
			token: { cssVar: '--color-muted', light: '#f1efea', dark: '#191f1d' }
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
		'Bordered, rounded combobox trigger + Badge chips + anchored list. <code>options</code> + <code>selected</code> + <code>onchange</code> is the surface.',
		'For another stack: mirror the 40px-min trigger, removable chips, 2px focus ring, and full-width option panel.'
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
			version: 'v0.5.0 audit',
			date: '2026-07-14',
			note: 'Reconciled against the shipped component. The trigger is a full rounded border with background and focus ring, not the older underline-Input treatment; panel and option-state tokens are now explicit.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Underline-Input-shaped trigger with inline Badge chips, X-to-remove per chip, ChevronDown right. No search.'
		}
	]
};
