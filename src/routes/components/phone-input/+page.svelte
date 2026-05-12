<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { PhoneInput } from '@dashfi/svelte/ui/phone-input';
	import { Label } from '@dashfi/svelte/ui/label';

	let phone = $state<string | null>(null);

	// Allowed countries — narrow to the markets dash.fi supports.
	const allowed = new Set(['US', 'CA', 'GB', 'DE', 'FR', 'NL', 'AU'] as const);

	const propsTable: PropDef[] = [
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
			name: '...rest',
			type: "Omit<SelectRootProps, 'value' | 'type' | 'onValueChange'>",
			description: 'Remaining bits-ui Select.Root props pass through to the country picker.'
		}
	];

	const example = `<script lang="ts">
\timport { PhoneInput } from '@dashfi/svelte/ui/phone-input';

\tlet phone = $state<string | null>(null);
\tconst allowed = new Set(['US', 'CA', 'GB', 'DE', 'FR']);
<\/script>

<PhoneInput bind:value={phone} allowedCountryCodes={allowed} />`;
</script>

<svelte:head><title>Phone Input — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Phone Input"
	description="International phone input — country flag picker, format-as-you-type, validates per region."
	importPath="@dashfi/svelte/ui/phone-input"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="6px">
					<Label for="phone">Phone</Label>
					<PhoneInput bind:value={phone} allowedCountryCodes={allowed} />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
