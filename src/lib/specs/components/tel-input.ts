import type { ComponentSpec } from '../types.js';

/**
 * Tel Input — lighter telephone input primitive.
 *
 * Outline Button (dial code) + searchable Command popover + bare Input.
 * Composite { raw, dialCode, iso2 } value object instead of E.164 — pick
 * this when you want flexible storage; pick PhoneInput when you want E.164
 * validation.
 */
export const telInput: ComponentSpec = {
	slug: 'tel-input',
	name: 'Tel Input',
	category: 'Inputs',
	status: 'beta',
	importPath: "import { TelInput } from '@dashfi/svelte/ui/tel-input'",
	description:
		'Telephone input primitive. Outline button (dial code) + searchable Command popover + bare Input. Composite {raw, dialCode, iso2} binding.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/tel-input/tel-input.svelte',

	dimensions: [
		{
			name: 'Wrapper',
			value: 'flex row, 8px gap',
			tw: 'flex items-center gap-2'
		},
		{
			name: 'Country trigger',
			value: "Button outline variant — shows dial code (e.g. '+1')",
			notes: "Styled as <code>buttonVariants({ variant: 'outline' })</code>."
		},
		{
			name: 'Country picker',
			value: 'Popover.Content wrapping a Command',
			tw: 'p-0',
			notes: 'Search + list. Better than PhoneInput for long country lists.'
		},
		{
			name: 'Phone input',
			value: 'bare Input next to the country trigger',
			notes: 'Inherits canonical Input shape.'
		}
	],

	tokens: [
		{ name: 'Trigger', notes: 'Inherits Button outline variant tokens.' },
		{
			name: 'Popover surface',
			token: { cssVar: '--color-popover', light: '#ffffff', dark: '#141a19' }
		},
		{
			name: 'Phone field underline',
			token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' },
			notes: 'Inherits from Input.'
		}
	],

	composition: [
		'Lighter alternative to <code>PhoneInput</code> — uses a composite <code>{ raw, dialCode, iso2 }</code> object instead of E.164.',
		'Country picker is a searchable Command inside a Popover — better for long country lists.',
		'Pass a <code>name</code> for form submission.'
	],

	nonFeatures: [
		'No E.164 validation. The raw + dial + iso2 split is intentional for storage flexibility.',
		'No allowed-countries filter — full list shown. Use <code>PhoneInput</code> to narrow.',
		'No format-as-you-type — raw input only.',
		'Not interchangeable with PhoneInput — the value shape is different.'
	],

	props: [
		{
			name: 'value',
			type: '{ raw: string; dialCode: string; iso2: string }',
			required: true,
			bindable: true,
			description: 'Composite value combining the raw user input, country dial code, and ISO2 country.'
		},
		{
			name: 'name',
			type: 'string',
			default: "'phone'",
			description: 'Name attribute applied to the underlying tel input — used for form submission.'
		}
	],

	porting: [
		'Outline button (dial code) + searchable Command popover + bare Input. Composite value object.',
		'Pick this over PhoneInput when the consuming system stores the parts separately (dial-code in one column, national number in another).'
	],

	example: `<script lang="ts">
	import { TelInput } from '@dashfi/svelte/ui/tel-input';

	let phone = $state({ raw: '', dialCode: '+1', iso2: 'us' });
<\/script>

<TelInput name="phone" bind:value={phone} />`,

	accessibility: [
		'Country trigger is a Button — fully keyboard-accessible.',
		'Command popover supports type-ahead search — Tab into the search input, Enter selects.',
		'Phone input is a real <code>type="tel"</code> input — mobile keypad on touch devices.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Outline Button + Popover+Command country picker + Input. Composite { raw, dialCode, iso2 } value.'
		}
	]
};
