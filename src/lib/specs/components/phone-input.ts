import type { ComponentSpec } from '../types.js';

/**
 * Phone Input — international phone number input.
 *
 * libphonenumber-js + dial-code Select on the left of an underline Input.
 * E.164 binding with optional allowed-country filter. Sister component to
 * TelInput (simpler composite-object binding).
 */
export const phoneInput: ComponentSpec = {
	slug: 'phone-input',
	name: 'Phone Input',
	category: 'Inputs',
	status: 'beta',
	importPath: "import { PhoneInput } from '@dashfi/svelte/ui/phone-input'",
	description:
		'International phone input — country flag picker, format-as-you-type, validates per region against E.164.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/phone-input/phone-input.svelte',

	dimensions: [
		{
			name: 'Wrapper',
			value: 'relative div housing Select left + Input right',
			tw: 'relative'
		},
		{
			name: 'Country Select trigger',
			value: '36px tall, 128px wide',
			tw: 'absolute inset-y-0 left-0 h-9 w-32 rounded-r-none bg-muted/50 hover:bg-muted/80',
			notes: 'Right radius removed so it visually joins the input.'
		},
		{
			name: 'Phone Input',
			value: '40px underline-only Input',
			tw: 'h-10 border-b px-0 py-2',
			notes: 'Left padding clears the country select.'
		}
	],

	tokens: [
		{
			name: 'Country select background',
			token: { cssVar: '--color-muted', light: '#eceae0', dark: '#181e1d' },
			notes: '50% opacity at rest, 80% on hover.'
		},
		{ name: 'Chevron + flag', notes: 'currentColor.' },
		{
			name: 'Phone field underline',
			token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' },
			notes: 'Inherits from Input.'
		},
		{
			name: 'Phone field focus',
			token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' },
			notes: 'Bottom border darkens on focus — same as Input.'
		}
	],

	composition: [
		'Pass <code>allowedCountryCodes</code> (Set of ISO-2 strings) to narrow the dropdown to relevant markets.',
		'Bind <code>value</code> for the E.164 string; bind <code>country</code> separately to read / write the ISO-2 code.',
		"<code>valid</code> binding flips to false when libphonenumber-js can't parse the input.",
		'Pair with <code>Label</code> at the call site.'
	],

	nonFeatures: [
		'No label / wrapper. Pair with <code>Label</code> at the call site.',
		'No formatting on blur. Caller decides when to format / display the canonical form.',
		'No standalone country picker — that is baked into the wrapper.',
		'No fallback for unparseable input — <code>valid</code> flips false; the caller decides how to react.'
	],

	props: [
		{
			name: 'value',
			type: 'E164Number | null',
			default: 'null',
			bindable: true,
			description: 'E.164-formatted phone number (e.g. "+14155551234"). Bind for two-way sync.'
		},
		{
			name: 'country',
			type: 'CountryCode | null',
			default: "'US'",
			bindable: true,
			description: "ISO 3166-1 alpha-2 country code (e.g. 'US', 'GB'). Drives the flag picker and formatting rules."
		},
		{
			name: 'valid',
			type: 'boolean',
			default: 'true',
			bindable: true,
			description: 'Whether the current value is a valid phone number for the selected country.'
		},
		{
			name: 'detailedValue',
			type: 'DetailedValue | null',
			default: 'null',
			bindable: true,
			description: 'Parsed detail from svelte-tel-input (national/international format, dialCode, type, etc.).'
		},
		{
			name: 'allowedCountryCodes',
			type: 'ReadonlySet<CountryCode>',
			required: true,
			description: 'Set of countries that appear in the picker. US is sorted to the top when present.'
		},
		{
			name: 'countrySelectDisabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables only the country picker, while keeping the number input editable.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables both the country picker and the number input.'
		},
		{
			name: 'restProps',
			type: "Omit<SelectRootProps, 'value' | 'type' | 'onValueChange'>",
			description: 'Remaining bits-ui Select.Root props pass through to the country picker.'
		}
	],

	porting: [
		'libphonenumber-js + dial-code Select on the left of an underline Input. Validates against E.164.',
		'Sister component <code>TelInput</code> uses a composite <code>{ raw, dialCode, iso2 }</code> object instead — pick PhoneInput when you want E.164 + region validation, TelInput when you want flexible storage.'
	],

	example: `<script lang="ts">
	import { PhoneInput } from '@dashfi/svelte/ui/phone-input';
	import { Label } from '@dashfi/svelte/ui/label';

	let phone = $state<string | null>(null);
	const allowed = new Set(['US', 'CA', 'GB', 'DE', 'FR']);
<\/script>

<div>
\t<Label for="phone">Phone</Label>
\t<PhoneInput bind:value={phone} allowedCountryCodes={allowed} />
</div>`,

	accessibility: [
		'Country Select is a real Select — full keyboard + screen-reader support.',
		'Phone input is a real <code>type="tel"</code> input — mobile keyboards swap to the phone keypad.',
		'Pair with <code>Label</code> at the call site so the input has an accessible name.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Country Select (h-9 w-32 bg-muted/50 rounded-r-none) on the left, canonical underline Input on the right. E.164 binding with allowed-country filter.'
		}
	]
};
