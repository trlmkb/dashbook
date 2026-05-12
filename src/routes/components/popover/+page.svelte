<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Popover,
		PopoverTrigger,
		PopoverContent
	} from '@dashfi/svelte/ui/popover';
	import { Button } from '@dashfi/svelte/ui/button';

	const rootProps: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Whether the popover is open. Two-way binding via bind:open.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the open state changes.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Should contain PopoverTrigger and PopoverContent.'
		}
	];

	const triggerProps: PropDef[] = [
		{
			name: 'child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-as-child snippet for delegating to a custom trigger element (e.g. Button).'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Default trigger content when child snippet is not used.'
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
			description: 'Element ref binding.'
		}
	];

	const contentProps: PropDef[] = [
		{
			name: 'side',
			type: "'top' | 'bottom' | 'left' | 'right' | 'bottom-end'",
			description: 'Side of the trigger to position content. Bottom-end aligns the content end to the trigger end.'
		},
		{
			name: 'align',
			type: "'start' | 'center' | 'end'",
			default: "'center'",
			description: 'Alignment of the content relative to the trigger along the chosen side.'
		},
		{
			name: 'sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in px between the trigger and the popover content.'
		},
		{
			name: 'portalProps',
			type: 'PopoverPortalProps',
			description: 'Props forwarded to the underlying Popover.Portal.'
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
			description: 'Element ref binding for the content surface.'
		},
		{
			name: '...restProps',
			type: 'Popover.ContentProps',
			description: 'All bits-ui Popover.Content props pass through (e.g. forceMount, onEscapeKeydown, onInteractOutside).'
		}
	];

	const closeProps: PropDef[] = [
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
			description: 'Element ref binding.'
		},
		{
			name: '...restProps',
			type: 'Popover.CloseProps',
			description: 'All bits-ui Popover.Close props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Popover, PopoverTrigger, PopoverContent } from '@dashfi/svelte/ui/popover';
<\/script>

<Popover>
\t<PopoverTrigger>Filter</PopoverTrigger>
\t<PopoverContent>...</PopoverContent>
</Popover>`;
</script>

<svelte:head><title>Popover — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Popover"
	description="Floating panel anchored to a trigger. For filters, mini-forms, secondary actions."
	importPath="@dashfi/svelte/ui/popover"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Popover>
					<PopoverTrigger>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>Filter</Button>
						{/snippet}
					</PopoverTrigger>
					<PopoverContent>
						<div style:display="flex" style:flex-direction="column" style:gap="8px" style:padding="4px">
							<div style:font-size="13px" style:font-weight="500">Filter by tier</div>
							<div style:font-size="13px" style:color="var(--fg-muted)">Debit · Corporate · Net 60</div>
						</div>
					</PopoverContent>
				</Popover>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Popover" props={rootProps} />
			<PropsTable title="PopoverTrigger" props={triggerProps} />
			<PropsTable title="PopoverContent" props={contentProps} />
			<PropsTable title="PopoverClose" props={closeProps} />
		</div>
	{/snippet}
</ComponentLayout>
