<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuLabel
	} from '@dashfi/svelte/ui/dropdown-menu';
	import { Button } from '@dashfi/svelte/ui/button';

	const dropdownMenuProps: PropDef[] = [
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
		}
	];

	const dropdownMenuTriggerProps: PropDef[] = [
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the trigger.'
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
			description: 'Element ref binding for the trigger.'
		},
		{
			name: 'child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-prop snippet to compose the trigger with a custom element such as a Button.'
		}
	];

	const dropdownMenuContentProps: PropDef[] = [
		{
			name: 'side',
			type: "'top' | 'right' | 'bottom' | 'left'",
			default: "'bottom'",
			description: 'Preferred side relative to the trigger.'
		},
		{
			name: 'align',
			type: "'start' | 'center' | 'end'",
			default: "'center'",
			description: 'Alignment along the chosen side.'
		},
		{
			name: 'sideOffset',
			type: 'number',
			default: '4',
			description: 'Pixel gap between the trigger and the content panel.'
		},
		{
			name: 'alignOffset',
			type: 'number',
			default: '0',
			description: 'Pixel offset along the alignment axis.'
		},
		{
			name: 'avoidCollisions',
			type: 'boolean',
			default: 'true',
			description: 'Automatically reposition to stay within the viewport.'
		},
		{
			name: 'forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting when closed — useful for animated transitions.'
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
			description: 'Element ref binding for the content panel.'
		}
	];

	const dropdownMenuItemProps: PropDef[] = [
		{
			name: 'onSelect',
			type: '(event: Event) => void',
			description: 'Fired when the item is selected via click or keyboard.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable this item.'
		},
		{
			name: 'inset',
			type: 'boolean',
			default: 'false',
			description: 'Add left padding so the label aligns with checked/radio items.'
		},
		{
			name: 'textValue',
			type: 'string',
			description: 'Text used for typeahead matching when the item content is not a plain string.'
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
	import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@dashfi/svelte/ui/dropdown-menu';
<\/script>

<DropdownMenu>
\t<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
\t<DropdownMenuContent>
\t\t<DropdownMenuItem>Issue card</DropdownMenuItem>
\t\t<DropdownMenuItem>Freeze card</DropdownMenuItem>
\t\t<DropdownMenuItem>Close card</DropdownMenuItem>
\t</DropdownMenuContent>
</DropdownMenu>`;
</script>

<svelte:head><title>Dropdown Menu — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Dropdown Menu"
	description="Contextual action menu attached to a trigger. Keyboard-navigable, supports nested submenus."
	importPath="@dashfi/svelte/ui/dropdown-menu"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<DropdownMenu>
					<DropdownMenuTrigger>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>Actions</Button>
						{/snippet}
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Card</DropdownMenuLabel>
						<DropdownMenuItem>Issue virtual card</DropdownMenuItem>
						<DropdownMenuItem>Freeze card</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Close account</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="DropdownMenu" props={dropdownMenuProps} />
			<PropsTable title="DropdownMenuTrigger" props={dropdownMenuTriggerProps} />
			<PropsTable title="DropdownMenuContent" props={dropdownMenuContentProps} />
			<PropsTable title="DropdownMenuItem" props={dropdownMenuItemProps} />
		</div>
	{/snippet}
</ComponentLayout>
