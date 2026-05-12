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
</ComponentLayout>
