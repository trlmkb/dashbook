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
			tw: 'absolute inset-y-0 left-0 h-9 w-32 rounded-l-md rounded-r-none border-y-0 border-r border-l-0 border-input bg-transparent px-3 hover:bg-muted/50',
			notes: 'Transparent with a right-border divider joining the input; rounded only on the left, hover tints muted/50, no focus ring (0.5.0). Was a muted/50 fill.'
		},
		{
			name: 'Phone Input',
			value: '36px full-border field, 6px radius, 12px horizontal padding',
			tw: 'h-9 w-full rounded-md border px-3 py-1 pl-36 shadow-sm',
			notes: 'Left padding clears the country select; invalid input adds the library error border class.'
		}
	],

	tokens: [
		{
			name: 'Country select background',
			token: { cssVar: '--color-muted', light: '#f1efea', dark: '#191f1d' },
			notes: 'Transparent at rest; --color-muted at 50% on hover (0.5.0). A 1px --color-input right-border divides it from the field. Was muted/50 at rest, /80 hover.'
		},
		{ name: 'Chevron + flag', notes: 'currentColor.' },
		{
			name: 'Phone field border',
			token: { cssVar: '--color-input', light: '#c0cecd', dark: '#1e2928' },
			notes: 'Full 1px border.'
		},
		{
			name: 'Phone field placeholder',
			token: { cssVar: '--color-muted-foreground', light: '#6e8180', dark: '#819896' }
		},
		{
			name: 'Phone field focus ring',
			token: { cssVar: '--color-ring', light: '#2b5f5b', dark: '#46b9af' },
			notes: '1px focus-visible ring.'
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
			version: 'v0.5.0 audit',
			date: '2026-07-14',
			note: 'Reconciled the phone field itself: it is h-9 with a full rounded border, shadow-sm, and 1px focus ring. The prior underline-only Input description was stale.'
		},
		{
			version: 'v0.5.0',
			date: '2026-06-04',
			note: 'Country-select trigger restyled (lib 0.5.0, core #5116): now transparent with a right-border divider (border-r border-input) + rounded-l-md + px-3 + no focus ring, instead of a muted/50 fill (hover /80). Functionality (E.164 binding, allowed-country filter) unchanged.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Country Select (h-9 w-32 bg-muted/50 rounded-r-none) on the left, canonical underline Input on the right. E.164 binding with allowed-country filter.'
		}
	]
};
