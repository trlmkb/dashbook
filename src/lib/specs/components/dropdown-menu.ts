import type { ComponentSpec } from '../types.js';

/**
 * Dropdown Menu — bits-ui DropdownMenu primitives with Tailwind chrome.
 *
 * Contextual action menu attached to a trigger button. Keyboard-navigable,
 * portal-rendered, supports nested submenus, checkbox + radio items.
 */
export const dropdownMenu: ComponentSpec = {
	slug: 'dropdown-menu',
	name: 'Dropdown Menu',
	category: 'Navigation',
	status: 'beta',
	importPath:
		"import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@dashfi/svelte/ui/dropdown-menu'",
	description:
		'Contextual action menu attached to a trigger. Keyboard-navigable, portal-rendered, supports nested submenus and checkbox / radio items.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/dropdown-menu/',

	dimensions: [
		{
			name: 'Content',
			value: 'min 128px wide, 12px radius, 4px padding, shadow-lg; no border',
			tw: 'min-w-[8rem] rounded-xl p-1 shadow-lg',
			notes: 'Portal-rendered popover panel with max-height constrained to available viewport space.'
		},
		{
			name: 'Item',
			value: '6px horizontal padding, 8px vertical, 14px text',
			tw: 'relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none'
		},
		{ name: 'Separator', value: '1px line, 4px vertical margin', tw: '-mx-1 my-1 h-px bg-muted' },
		{
			name: 'Label / group heading',
			value: '14px semibold',
			tw: 'px-2 py-1.5 text-sm font-semibold'
		},
		{
			name: 'Shortcut',
			value: '12px right-aligned text at 60% opacity',
			tw: 'ml-auto text-xs tracking-widest opacity-60'
		},
		{
			name: 'Checkbox / Radio items',
			value: 'left indicator slot 32px',
			tw: 'pl-8',
			notes: 'Absolute-positioned check glyph in the left slot.'
		}
	],

	tokens: [
		{
			name: 'Content background',
			token: { cssVar: '--color-popover', light: '#ffffff', dark: '#161d1a' }
		},
		{
			name: 'Content text',
			token: { cssVar: '--color-popover-foreground', light: '#123b38', dark: '#ffffff' }
		},
		{
			name: 'Item hover / focus background',
			token: { cssVar: '--color-accent', light: '#f1efea', dark: '#191f1d' }
		},
		{
			name: 'Item hover / focus text',
			token: { cssVar: '--color-accent-foreground', light: '#123b38', dark: '#ffffff' }
		},
		{
			name: 'Separator',
			token: { cssVar: '--color-muted', light: '#f1efea', dark: '#191f1d' }
		}
	],

	composition: [
		'<code>DropdownMenu &gt; DropdownMenuTrigger &gt; DropdownMenuContent &gt; DropdownMenuItem*</code>. Interleave with <code>DropdownMenuSeparator</code> and group <code>DropdownMenuLabel</code>.',
		"Use the trigger's <code>child</code> snippet to delegate to a Button.",
		'For toggle-able items, use <code>DropdownMenuCheckboxItem</code> / <code>DropdownMenuRadioItem</code>.',
		'Submenus via <code>DropdownMenuSub &gt; DropdownMenuSubTrigger &gt; DropdownMenuSubContent</code>.'
	],

	nonFeatures: [
		'Not a Select — for value-binding form pickers use Select.',
		'Not a Command palette — for searchable lists use Command.',
		'No icon prop on Items. Compose a Lucide glyph as the first child.',
		'No backdrop overlay. Click-outside dismisses; the page behind stays interactive visually.'
	],

	props: [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Whether the menu is open.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Fired when the open state changes.'
		},
		{
			name: 'dir',
			type: "'ltr' | 'rtl'",
			default: "'ltr'",
			description: 'Text direction for the menu.'
		},
		{
			name: 'closeOnEscape',
			type: 'boolean',
			default: 'true',
			description: 'Close when the Escape key is pressed.'
		},
		{
			name: 'DropdownMenuTrigger.disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the trigger.'
		},
		{
			name: 'DropdownMenuTrigger.child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-prop snippet to compose the trigger with a custom element such as a Button.'
		},
		{
			name: 'DropdownMenuContent.side',
			type: "'top' | 'right' | 'bottom' | 'left'",
			default: "'bottom'",
			description: 'Preferred side relative to the trigger.'
		},
		{
			name: 'DropdownMenuContent.align',
			type: "'start' | 'center' | 'end'",
			default: "'center'",
			description: 'Alignment along the chosen side.'
		},
		{
			name: 'DropdownMenuContent.sideOffset',
			type: 'number',
			default: '4',
			description: 'Pixel gap between the trigger and the content panel.'
		},
		{
			name: 'DropdownMenuContent.alignOffset',
			type: 'number',
			default: '0',
			description: 'Pixel offset along the alignment axis.'
		},
		{
			name: 'DropdownMenuContent.avoidCollisions',
			type: 'boolean',
			default: 'true',
			description: 'Automatically reposition to stay within the viewport.'
		},
		{
			name: 'DropdownMenuContent.forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting when closed — useful for animated transitions.'
		},
		{
			name: 'DropdownMenuItem.onSelect',
			type: '(event: Event) => void',
			description: 'Fired when the item is selected via click or keyboard.'
		},
		{
			name: 'DropdownMenuItem.disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable this item.'
		},
		{
			name: 'DropdownMenuItem.inset',
			type: 'boolean',
			default: 'false',
			description: 'Add left padding so the label aligns with checked/radio items.'
		},
		{
			name: 'DropdownMenuItem.textValue',
			type: 'string',
			description: 'Text used for typeahead matching when the item content is not a plain string.'
		}
	],

	porting: [
		'bits-ui DropdownMenu primitives + Tailwind chrome. Portal panel, popover-tone surface, accent-tone hover/focus on items.',
		'Items, separators, group-heading labels, keyboard shortcuts, checkbox + radio items, and submenus all sit on the same canonical surface.'
	],

	example: `<script lang="ts">
	import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@dashfi/svelte/ui/dropdown-menu';
	import { Button } from '@dashfi/svelte/ui/button';
<\/script>

<DropdownMenu>
\t<DropdownMenuTrigger>
\t\t{#snippet child({ props })}
\t\t\t<Button variant="outline" {...props}>Actions</Button>
\t\t{/snippet}
\t</DropdownMenuTrigger>
\t<DropdownMenuContent>
\t\t<DropdownMenuLabel>Card</DropdownMenuLabel>
\t\t<DropdownMenuItem>Issue virtual card</DropdownMenuItem>
\t\t<DropdownMenuItem>Freeze card</DropdownMenuItem>
\t\t<DropdownMenuSeparator />
\t\t<DropdownMenuItem>Close account</DropdownMenuItem>
\t</DropdownMenuContent>
</DropdownMenu>`,

	accessibility: [
		'bits-ui DropdownMenu owns the full keyboard model — arrow-up/down navigation, type-ahead, Esc to close.',
		'Use <code>textValue</code> on Items whose children are not plain strings (e.g. icon + label) so type-ahead stays accurate.',
		'Submenus open on hover or Right Arrow — and close on Left Arrow / Esc.'
	],

	changelog: [
		{
			version: 'v0.5.0 audit',
			date: '2026-07-14',
			note: 'Reconciled production chrome: content is rounded-xl with shadow-lg and no border; items use rounded-md; separators use bg-muted; shortcut text uses inherited color at 60% opacity.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Portal popover — min-w-[8rem] rounded-md p-1 border shadow-md on --color-popover. Items, separators, group-heading labels, shortcuts, checkbox/radio items, and submenus all in canonical.'
		}
	]
};
