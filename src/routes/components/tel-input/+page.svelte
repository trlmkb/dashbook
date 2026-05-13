<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { TelInput } from '@dashfi/svelte/ui/tel-input';

	let phone = $state({ raw: '', dialCode: '+1', iso2: 'us' });

	const propsTable: PropDef[] = [
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
	];

	const example = `<script lang="ts">
\timport { TelInput } from '@dashfi/svelte/ui/tel-input';

\tlet phone = $state({ raw: '', dialCode: '+1', iso2: 'us' });
<\/script>

<TelInput name="phone" bind:value={phone} />`;
</script>

<svelte:head><title>Tel Input — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Tel Input"
	description="Telephone input primitive. Internal — most surfaces should use Phone Input which composes this with country picker."
	importPath="@dashfi/svelte/ui/tel-input"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="280px">
					<TelInput name="phone" bind:value={phone} />
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
				<li><strong>Wrapper</strong> — <code>flex items-center gap-2</code>.</li>
				<li><strong>Country trigger</strong> — Popover trigger styled as <code>buttonVariants(&#123; variant: 'outline' &#125;)</code>. Shows the dial code (e.g. <code>+1</code>).</li>
				<li><strong>Country picker</strong> — Popover.Content with <code>p-0</code> wrapping a Command (search + list).</li>
				<li><strong>Phone input</strong> — bare Input next to the country trigger.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Lighter alternative to <code>PhoneInput</code> — uses a composite <code>&#123; raw, dialCode, iso2 &#125;</code> object instead of E.164.</li>
				<li>Country picker is a searchable Command inside a Popover — better for long country lists.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Trigger inherits Button outline tokens; popover surface uses <code>--color-popover</code>.</li>
			</ul>
			<div class="docs-h">Not part of TelInput</div>
			<ul class="docs-list">
				<li>No E.164 validation. The raw + dial + iso2 split is intentional for storage flexibility.</li>
				<li>No allowed-countries filter — full list shown. Use <code>PhoneInput</code> to narrow.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Outline button (dial code) + searchable Command popover + bare Input. Composite value object.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Outline Button +
					Popover+Command country picker + Input. Composite <code>{`{ raw, dialCode,
					iso2 }`}</code> value.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
