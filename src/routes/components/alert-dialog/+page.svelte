<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		AlertDialog,
		AlertDialogTrigger,
		AlertDialogContent,
		AlertDialogTitle,
		AlertDialogDescription,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogHeader,
		AlertDialogFooter
	} from '@dashfi/svelte/ui/alert-dialog';
	import { Button } from '@dashfi/svelte/ui/button';

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
			description: 'Should contain AlertDialogTrigger and AlertDialogContent.'
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
			name: 'portalProps',
			type: 'AlertDialogPortalProps',
			description: 'Props forwarded to the underlying AlertDialogPortal.'
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
			type: 'AlertDialog.ContentProps',
			description: 'All bits-ui AlertDialog.Content props pass through (e.g. forceMount, onEscapeKeydown).'
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

	const actionProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes. The action button uses the default Button variant.'
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
			type: 'AlertDialog.ActionProps',
			description: 'All bits-ui AlertDialog.Action props pass through.'
		}
	];

	const cancelProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes. The cancel button uses the outline Button variant.'
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
			type: 'AlertDialog.CancelProps',
			description: 'All bits-ui AlertDialog.Cancel props pass through.'
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

	const example = `<script lang="ts">
	import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@dashfi/svelte/ui/alert-dialog';
<\/script>

<AlertDialog>
\t<AlertDialogTrigger>Freeze card</AlertDialogTrigger>
\t<AlertDialogContent>
\t\t<AlertDialogTitle>Freeze this card?</AlertDialogTitle>
\t\t<AlertDialogDescription>The card will stop accepting new transactions immediately.</AlertDialogDescription>
\t\t<AlertDialogCancel>Cancel</AlertDialogCancel>
\t\t<AlertDialogAction>Freeze</AlertDialogAction>
\t</AlertDialogContent>
</AlertDialog>`;
</script>

<svelte:head><title>Alert Dialog — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Alert Dialog"
	description="Confirmation modal — interrupts the user for a destructive or irreversible action."
	importPath="@dashfi/svelte/ui/alert-dialog"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<AlertDialog>
					<AlertDialogTrigger>
						{#snippet child({ props })}
							<Button variant="destructive" {...props}>Freeze card</Button>
						{/snippet}
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Freeze this card?</AlertDialogTitle>
							<AlertDialogDescription>
								The card will stop accepting new transactions immediately. You can unfreeze it
								anytime.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Freeze</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="AlertDialog" props={rootProps} />
			<PropsTable title="AlertDialogTrigger" props={triggerProps} />
			<PropsTable title="AlertDialogContent" props={contentProps} />
			<PropsTable title="AlertDialogHeader" props={headerFooterProps} />
			<PropsTable title="AlertDialogFooter" props={headerFooterProps} />
			<PropsTable title="AlertDialogTitle" props={titleProps} />
			<PropsTable title="AlertDialogDescription" props={descriptionProps} />
			<PropsTable title="AlertDialogAction" props={actionProps} />
			<PropsTable title="AlertDialogCancel" props={cancelProps} />
		</div>
	{/snippet}
	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Focus is trapped inside the dialog while open. <code>Esc</code> closes (cancel).</li>
				<li>Use for actions the user might regret. Routine confirmations should not interrupt.</li>
				<li>The destructive action button uses Button's <code>destructive</code> variant — orange.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
