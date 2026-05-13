import type { ComponentSpec } from '../types.js';

export const command: ComponentSpec = {
	slug: 'command',
	name: 'Command',
	category: 'Navigation',
	status: 'beta',
	importPath:
		"import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandSeparator, CommandEmpty } from '@dashfi/svelte/ui/command'",
	description:
		'Cmd+K palette. Searchable, keyboard-navigable list of actions. Powers the global search. Built on bits-ui.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/command/',

	dimensions: [
		{
			name: 'Command (root)',
			value: 'fills its parent',
			tw: 'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden'
		},
		{
			name: 'CommandInput',
			value: '40px tall, 14px+ type',
			tw: 'flex h-10 w-full bg-transparent py-3 text-base md:text-sm',
			notes:
				'Sits in a row with a `size-4` Search icon, wrapped in a `border-b px-3` container.'
		},
		{
			name: 'CommandItem',
			value: '14px text, 8px h-padding, 6px v-padding',
			tw: 'relative flex cursor-default items-center gap-2 px-2 py-1.5 text-sm outline-none select-none',
			notes: 'Lucide glyph auto-sized to 16px.'
		},
		{
			name: 'Selection state',
			value: 'highlighted',
			tw: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
			notes: 'Driven by keyboard navigation.'
		},
		{
			name: 'Disabled state',
			value: '50% opacity, no pointer',
			tw: 'data-disabled:pointer-events-none data-disabled:opacity-50'
		},
		{
			name: 'CommandGroup',
			value: 'labelled list',
			notes: 'Heading uses `--color-muted-foreground` mono caps.'
		},
		{
			name: 'CommandEmpty',
			value: 'centered no-results placeholder'
		},
		{
			name: 'CommandSeparator',
			value: '1px hairline',
			tw: '-mx-1 my-1 h-px bg-border'
		},
		{
			name: 'CommandDialog',
			value: 'wraps Command in a Dialog',
			notes: 'For the spotlight-style palette.'
		}
	],

	tokens: [
		{
			name: 'Surface',
			token: { cssVar: '--color-popover', light: '#faf8f1', dark: '#0f1413' },
			notes: '`bg-popover`.'
		},
		{
			name: 'Surface text',
			token: { cssVar: '--color-popover-foreground', light: '#123b39', dark: '#ffffff' }
		},
		{
			name: 'Item hover / selected (bg)',
			token: { cssVar: '--color-accent', light: '#e6f2ef', dark: '#1d3936' }
		},
		{
			name: 'Item hover / selected (text)',
			token: { cssVar: '--color-accent-foreground', light: '#123b39', dark: '#ffffff' }
		},
		{
			name: 'Separator',
			token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' }
		},
		{
			name: 'Search icon',
			notes: 'Inherits foreground at `opacity-50`.'
		}
	],

	composition: [
		'<code>Command &gt; CommandInput &gt; CommandList &gt; (CommandEmpty | CommandGroup &gt; CommandItem*)</code>.',
		'Use inside a Popover for inline search; use <code>CommandDialog</code> for ⌘K spotlight UX.',
		'Filtering is built-in via bits-ui Command — items match the input value automatically.'
	],

	nonFeatures: [
		'Not a Select — for value binding form pickers use <code>Select</code>.',
		'Not a DropdownMenu — different a11y semantics.',
		'No custom filter function exposed in the canonical (bits-ui Command handles matching internally).'
	],

	props: [
		{
			name: 'value (Command)',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Currently highlighted item value.'
		},
		{
			name: 'onValueChange (Command)',
			type: '(value: string) => void',
			description: 'Fired when the highlighted item changes.'
		},
		{
			name: 'filter (Command)',
			type: '(value: string, search: string, keywords?: string[]) => number',
			description: 'Custom scoring function. Return 0 to filter out, >0 to keep (higher is more relevant).'
		},
		{
			name: 'shouldFilter (Command)',
			type: 'boolean',
			default: 'true',
			description: 'When false, disables built-in filtering — useful for server-driven results.'
		},
		{
			name: 'loop (Command)',
			type: 'boolean',
			default: 'false',
			description: 'Whether arrow-key navigation wraps around at the ends.'
		},
		{
			name: 'label (Command)',
			type: 'string',
			description: 'Accessible label for the command palette (sets aria-label).'
		},
		{
			name: 'value (CommandInput)',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Current search query.'
		},
		{
			name: 'placeholder (CommandInput)',
			type: 'string',
			description: 'Placeholder text for the input.'
		},
		{
			name: 'heading (CommandGroup)',
			type: 'string',
			description: 'Group heading text. Rendered above the items when provided.'
		},
		{
			name: 'value (CommandItem)',
			type: 'string',
			description:
				'Unique value used for filtering and selection. Falls back to the rendered text content.'
		},
		{
			name: 'onSelect (CommandItem)',
			type: '(value: string) => void',
			description: 'Fired when the item is selected (click or Enter).'
		},
		{
			name: 'keywords (CommandItem)',
			type: 'string[]',
			description: 'Extra search keywords associated with the item.'
		},
		{
			name: 'disabled (CommandItem)',
			type: 'boolean',
			default: 'false',
			description: 'Disable this item.'
		},
		{
			name: 'forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting even when filtered out / group has no visible items.'
		}
	],

	porting: [
		'bits-ui Command palette. Input at top with Search icon; filterable list of items below. Items <code>px-2 py-1.5 text-sm</code> with <code>aria-selected:bg-accent</code> highlight.'
	],

	example: `<script lang="ts">
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
</Command>`,

	accessibility: [
		'Built on bits-ui Command — <kbd>Arrow Up/Down</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>.',
		'Filtering happens against the visible text of each <code>CommandItem</code>.',
		'Wrap in a Dialog for the modal Cmd+K pattern.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). 40px Input row with Search icon and border-b px-3 container; items px-2 py-1.5 text-sm with aria-selected:bg-accent highlight. CommandDialog wraps for ⌘K palette UX.'
		}
	]
};
