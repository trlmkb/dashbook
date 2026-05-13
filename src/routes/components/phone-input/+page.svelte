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
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Wrapper</strong> — <code>relative</code> div housing the country Select on the left and the phone Input on the right.</li>
				<li><strong>Country Select trigger</strong> — <code>absolute inset-y-0 left-0 h-9 w-32 rounded-r-none bg-muted/50 hover:bg-muted/80</code>. 36px tall, 128px wide, muted background. Right radius removed so it visually joins the input.</li>
				<li><strong>Phone Input</strong> — canonical underline-only Input (<code>h-10 border-b px-0 py-2</code>) with left padding to clear the country select.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Country select bg <code>--color-muted</code> at 50% / 80% on hover; chevron + flag glyph use currentColor.</li>
				<li>Phone field tokens inherit from Input.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Pass <code>allowedCountryCodes</code> (Set of ISO-2 strings) to narrow the dropdown to relevant markets.</li>
				<li>Bind <code>value</code> for the E.164 string; bind <code>country</code> separately to read/write the ISO-2 code.</li>
				<li><code>valid</code> binding flips to false when libphonenumber-js can't parse the input.</li>
			</ul>
			<div class="docs-h">Not part of PhoneInput</div>
			<ul class="docs-list">
				<li>No label / wrapper. Pair with <code>Label</code> at the call site.</li>
				<li>No formatting on blur. Caller decides when to format / display the canonical form.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>libphonenumber-js + dial-code Select on the left of an underline Input. Validates against E.164.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Country Select
					(<code>h-9 w-32 bg-muted/50 rounded-r-none</code>) on the left, canonical
					underline Input on the right. E.164 binding with allowed-country
					filter.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
