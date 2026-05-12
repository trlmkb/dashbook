<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Select,
		SelectTrigger,
		SelectContent,
		SelectItem
	} from '@dashfi/svelte/ui/select';

	const selectProps: PropDef[] = [
		{
			name: 'type',
			type: "'single' | 'multiple'",
			required: true,
			description: 'Selection mode. Drives the shape of value (string vs string[]).'
		},
		{
			name: 'value',
			type: 'string | string[]',
			bindable: true,
			description: 'Bindable selected value. Two-way binding via bind:value.'
		},
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Bindable open state of the dropdown.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the entire select.'
		},
		{
			name: 'name',
			type: 'string',
			description: 'Native form name for the hidden submission input.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'SelectTrigger + SelectContent children.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void | (value: string[]) => void',
			description: 'Fired when selection changes. Type matches the type prop.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'All bits-ui Select.Root props pass through.'
		}
	];

	const selectTriggerProps: PropDef[] = [
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Trigger content — typically the current selection label or a placeholder.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the trigger.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onclick',
			type: '(event: MouseEvent) => void',
			description: 'All bits-ui Select.Trigger props pass through.'
		}
	];

	const selectContentProps: PropDef[] = [
		{
			name: 'sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in px between the trigger and the floating content.'
		},
		{
			name: 'side',
			type: "'top' | 'right' | 'bottom' | 'left'",
			default: "'bottom'",
			description: 'Preferred side relative to the trigger. Floats to opposite side if no room.'
		},
		{
			name: 'align',
			type: "'start' | 'center' | 'end'",
			default: "'start'",
			description: 'Alignment of content relative to the trigger.'
		},
		{
			name: 'portalProps',
			type: 'SelectPrimitive.PortalProps',
			description: 'Forwarded to the underlying Portal (e.g. target container).'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'SelectItem / SelectSeparator / SelectGroup children.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		}
	];

	const selectItemProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			required: true,
			description: 'The value committed when this item is selected.'
		},
		{
			name: 'label',
			type: 'string',
			description: 'Fallback rendered label when no children snippet is provided.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables this individual item.'
		},
		{
			name: 'children',
			type: 'Snippet<[{ selected: boolean; highlighted: boolean }]>',
			description: 'Custom render snippet. Receives selected and highlighted state.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		}
	];

	let card = $state<string | undefined>(undefined);
	const labels: Record<string, string> = {
		debit: 'Debit',
		corporate: 'Corporate',
		net60: 'Daily Net 60'
	};

	const example = `<script lang="ts">
	import { Select, SelectTrigger, SelectContent, SelectItem } from '@dashfi/svelte/ui/select';
<\/script>

let card = $state<string | undefined>(undefined);

<Select type="single" bind:value={card}>
\t<SelectTrigger>{card ? labels[card] : 'Choose a card'}</SelectTrigger>
\t<SelectContent>
\t\t<SelectItem value="debit">Debit</SelectItem>
\t\t<SelectItem value="corporate">Corporate</SelectItem>
\t\t<SelectItem value="net60">Daily Net 60</SelectItem>
\t</SelectContent>
</Select>`;
</script>

<svelte:head><title>Select — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Select"
	description="Dropdown selection with keyboard navigation. Built on bits-ui."
	importPath="@dashfi/svelte/ui/select"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="280px">
					<Select type="single" bind:value={card}>
						<SelectTrigger>{card ? labels[card] : 'Choose a card'}</SelectTrigger>
						<SelectContent>
							<SelectItem value="debit">Debit</SelectItem>
							<SelectItem value="corporate">Corporate</SelectItem>
							<SelectItem value="net60">Daily Net 60</SelectItem>
						</SelectContent>
					</Select>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Select" props={selectProps} />
			<PropsTable title="SelectTrigger" props={selectTriggerProps} />
			<PropsTable title="SelectContent" props={selectContentProps} />
			<PropsTable title="SelectItem" props={selectItemProps} />
		</div>
	{/snippet}
</ComponentLayout>
