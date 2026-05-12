<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogTitle,
		DialogDescription,
		DialogHeader,
		DialogFooter
	} from '@dashfi/svelte/ui/dialog';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Label } from '@dashfi/svelte/ui/label';

	const rootProps: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Whether the dialog is open. Two-way binding via bind:open.'
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
			description: 'Should contain DialogTrigger and DialogContent.'
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
			name: 'showCloseButton',
			type: 'boolean',
			default: 'true',
			description: 'Render the built-in top-right close (X) button.'
		},
		{
			name: 'portalProps',
			type: 'DialogPortalProps',
			description: 'Props forwarded to the underlying DialogPortal.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Dialog body content — typically DialogHeader, body, and DialogFooter.'
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
			type: 'Dialog.ContentProps',
			description: 'All bits-ui Dialog.Content props pass through (e.g. forceMount, onEscapeKeydown, onInteractOutside).'
		}
	];

	const titleProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLHeadingElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		}
	];

	const descriptionProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLParagraphElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		}
	];

	const headerFooterProps: PropDef[] = [
		{
			name: 'children',
			type: 'Snippet',
			description: 'Layout slot content.'
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
			description: 'Element ref binding.'
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
			type: 'Dialog.CloseProps',
			description: 'All bits-ui Dialog.Close props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@dashfi/svelte/ui/dialog';
<\/script>

<Dialog>
\t<DialogTrigger>Open</DialogTrigger>
\t<DialogContent>
\t\t<DialogHeader>
\t\t\t<DialogTitle>Issue virtual card</DialogTitle>
\t\t\t<DialogDescription>For one-off vendor or ad-account spend.</DialogDescription>
\t\t</DialogHeader>
\t\t<!-- form -->
\t\t<DialogFooter>
\t\t\t<Button>Issue</Button>
\t\t</DialogFooter>
\t</DialogContent>
</Dialog>`;
</script>

<svelte:head><title>Dialog — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Dialog"
	description="Generic modal. Use for forms, content panels, secondary flows. For destructive confirmations, use Alert Dialog."
	importPath="@dashfi/svelte/ui/dialog"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Dialog>
					<DialogTrigger>
						{#snippet child({ props })}
							<Button {...props}>Issue virtual card</Button>
						{/snippet}
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Issue virtual card</DialogTitle>
							<DialogDescription>For one-off vendor or ad-account spend.</DialogDescription>
						</DialogHeader>
						<div style:display="flex" style:flex-direction="column" style:gap="8px">
							<Label for="name">Card nickname</Label>
							<Input id="name" placeholder="Q2 Meta · brand campaign" />
						</div>
						<DialogFooter>
							<Button>Issue</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Dialog" props={rootProps} />
			<PropsTable title="DialogTrigger" props={triggerProps} />
			<PropsTable title="DialogContent" props={contentProps} />
			<PropsTable title="DialogHeader" props={headerFooterProps} />
			<PropsTable title="DialogFooter" props={headerFooterProps} />
			<PropsTable title="DialogTitle" props={titleProps} />
			<PropsTable title="DialogDescription" props={descriptionProps} />
			<PropsTable title="DialogClose" props={closeProps} />
		</div>
	{/snippet}
</ComponentLayout>
