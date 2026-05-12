<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { MultiSelect, type MultiSelectOption } from '@dashfi/svelte/ui/multi-select';

	const propsTable: PropDef[] = [
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
			name: '...rest',
			type: "HTMLAttributes<HTMLDivElement> (without 'onchange')",
			description: 'Remaining native div attributes pass through to the outer container.'
		}
	];

	const options: MultiSelectOption[] = [
		{ value: 'meta', label: 'Meta' },
		{ value: 'google', label: 'Google' },
		{ value: 'tiktok', label: 'TikTok' },
		{ value: 'pinterest', label: 'Pinterest' },
		{ value: 'reddit', label: 'Reddit' }
	];
	let selected = $state<string[]>([]);

	const example = `<script lang="ts">
	import { MultiSelect, type MultiSelectOption } from '@dashfi/svelte/ui/multi-select';
<\/script>

const options: MultiSelectOption[] = [
\t{ value: 'meta', label: 'Meta' },
\t{ value: 'google', label: 'Google' }
];
let selected = $state<string[]>([]);

<MultiSelect {options} bind:selected placeholder="Select channels" />`;
</script>

<svelte:head><title>Multi Select — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Multi Select"
	description="Select multiple options. Built-in search and chips for selected values."
	importPath="@dashfi/svelte/ui/multi-select"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="320px">
					<MultiSelect {options} bind:selected placeholder="Select channels" />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
