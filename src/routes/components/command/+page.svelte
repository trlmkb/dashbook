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
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Command (root)</strong> — <code>bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden</code>. Fills its parent.</li>
				<li><strong>CommandInput</strong> — <code>flex h-10 w-full bg-transparent py-3 text-base md:text-sm</code> in a row with a <code>size-4</code> Search icon, wrapped in a <code>border-b px-3</code> container. 40px tall.</li>
				<li><strong>CommandItem</strong> — <code>relative flex cursor-default items-center gap-2 px-2 py-1.5 text-sm outline-none select-none</code>. 14px text, 8px horizontal padding, 6px vertical. Lucide glyph auto-sized to 16px.</li>
				<li><strong>Selection state</strong> — <code>aria-selected:bg-accent aria-selected:text-accent-foreground</code> via keyboard navigation.</li>
				<li><strong>Disabled state</strong> — <code>data-disabled:pointer-events-none data-disabled:opacity-50</code>.</li>
				<li><strong>CommandGroup</strong> — labelled list; heading uses <code>--color-muted-foreground</code> mono caps.</li>
				<li><strong>CommandEmpty</strong> — centered no-results placeholder.</li>
				<li><strong>CommandSeparator</strong> — <code>-mx-1 my-1 h-px bg-border</code>.</li>
				<li><strong>CommandDialog</strong> — wraps Command in a Dialog for the spotlight-style palette.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Surface <code>--color-popover</code>; item hover/select <code>--color-accent</code>; separator <code>--color-border</code>; Search icon at <code>opacity-50</code>.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li><code>Command &gt; CommandInput &gt; CommandList &gt; (CommandEmpty | CommandGroup &gt; CommandItem*)</code>.</li>
				<li>Use inside a Popover for inline search; use <code>CommandDialog</code> for ⌘K spotlight UX.</li>
				<li>Filtering is built-in via bits-ui Command — items match the input value automatically.</li>
			</ul>
			<div class="docs-h">Not part of Command</div>
			<ul class="docs-list">
				<li>Not a Select — for value binding form pickers use <code>Select</code>.</li>
				<li>Not a DropdownMenu — different a11y semantics.</li>
				<li>No custom filter function exposed in the canonical (bits-ui Command handles matching internally).</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>bits-ui Command palette. Input at top with Search icon; filterable list of items below.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). 40px Input row
					with Search icon and <code>border-b px-3</code> container; items
					<code>px-2 py-1.5 text-sm</code> with <code>aria-selected:bg-accent</code> highlight.
					CommandDialog wraps for ⌘K palette UX.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
