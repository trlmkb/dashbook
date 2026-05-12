<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Command,
		CommandInput,
		CommandList,
		CommandGroup,
		CommandItem,
		CommandSeparator,
		CommandEmpty
	} from '@dashfi/svelte/ui/command';

	const commandProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Currently highlighted item value.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void',
			description: 'Fired when the highlighted item changes.'
		},
		{
			name: 'filter',
			type: '(value: string, search: string, keywords?: string[]) => number',
			description: 'Custom scoring function. Return 0 to filter out, >0 to keep (higher is more relevant).'
		},
		{
			name: 'shouldFilter',
			type: 'boolean',
			default: 'true',
			description: 'When false, disables built-in filtering — useful for server-driven results.'
		},
		{
			name: 'loop',
			type: 'boolean',
			default: 'false',
			description: 'Whether arrow-key navigation wraps around at the ends.'
		},
		{
			name: 'label',
			type: 'string',
			description: 'Accessible label for the command palette (sets aria-label).'
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
			description: 'Element ref binding for the root container.'
		}
	];

	const commandInputProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Current search query.'
		},
		{
			name: 'placeholder',
			type: 'string',
			description: 'Placeholder text for the input.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLInputElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the input.'
		}
	];

	const commandListProps: PropDef[] = [
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
			description: 'Element ref binding for the scrolling list container.'
		}
	];

	const commandGroupProps: PropDef[] = [
		{
			name: 'heading',
			type: 'string',
			description: 'Group heading text. Rendered above the items when provided.'
		},
		{
			name: 'value',
			type: 'string',
			description: 'Optional group value, used when filtering by group.'
		},
		{
			name: 'forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting even when the group has no visible items.'
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
			description: 'Element ref binding for the group container.'
		}
	];

	const commandItemProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			description: 'Unique value used for filtering and selection. Falls back to the rendered text content.'
		},
		{
			name: 'onSelect',
			type: '(value: string) => void',
			description: 'Fired when the item is selected (click or Enter).'
		},
		{
			name: 'keywords',
			type: 'string[]',
			description: 'Extra search keywords associated with the item.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable this item.'
		},
		{
			name: 'forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting even when filtered out.'
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
			description: 'Element ref binding for the item.'
		}
	];

	const example = `<script lang="ts">
	import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandSeparator, CommandEmpty } from '@dashfi/svelte/ui/command';
<\/script>

<Command>
\t<CommandInput placeholder="Search…" />
\t<CommandList>
\t\t<CommandEmpty>No results.</CommandEmpty>
\t\t<CommandGroup heading="Cards">
\t\t\t<CommandItem>Issue virtual card</CommandItem>
\t\t\t<CommandItem>Freeze card</CommandItem>
\t\t</CommandGroup>
\t\t<CommandSeparator />
\t\t<CommandGroup heading="Actions">
\t\t\t<CommandItem>Download statement</CommandItem>
\t\t</CommandGroup>
\t</CommandList>
</Command>`;
</script>

<svelte:head><title>Command — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Command"
	description="Cmd+K palette. Searchable, keyboard-navigable list of actions. Powers the global search."
	importPath="@dashfi/svelte/ui/command"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="360px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="480px">
					<Command>
						<CommandInput placeholder="Search…" />
						<CommandList>
							<CommandEmpty>No results.</CommandEmpty>
							<CommandGroup heading="Cards">
								<CommandItem>Issue virtual card</CommandItem>
								<CommandItem>Freeze card</CommandItem>
								<CommandItem>Close account</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading="Actions">
								<CommandItem>Download April statement</CommandItem>
								<CommandItem>Refresh spending data</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Command" props={commandProps} />
			<PropsTable title="CommandInput" props={commandInputProps} />
			<PropsTable title="CommandList" props={commandListProps} />
			<PropsTable title="CommandGroup" props={commandGroupProps} />
			<PropsTable title="CommandItem" props={commandItemProps} />
		</div>
	{/snippet}
	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Built on bits-ui Command — <kbd>Arrow Up/Down</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>.</li>
				<li>Filtering happens against the visible text of each <code>CommandItem</code>.</li>
				<li>Wrap in a Dialog for the modal Cmd+K pattern.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
