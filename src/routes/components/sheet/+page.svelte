<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Sheet,
		SheetTrigger,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetDescription
	} from '@dashfi/svelte/ui/sheet';
	import { Button } from '@dashfi/svelte/ui/button';

	const rootProps: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Whether the sheet is open. Two-way binding via bind:open.'
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
			description: 'Should contain SheetTrigger and SheetContent.'
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
			type: "'top' | 'bottom' | 'left' | 'right'",
			default: "'right'",
			description: 'Edge the sheet slides in from.'
		},
		{
			name: 'overlayClass',
			type: 'string',
			description: 'Additional Tailwind classes applied to the backdrop overlay.'
		},
		{
			name: 'portalProps',
			type: 'SheetPortalProps',
			description: 'Props forwarded to the underlying SheetPortal.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Sheet body content — typically SheetHeader, body, and SheetFooter.'
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
			description: 'All bits-ui Dialog.Content props pass through (Sheet is built on Dialog primitive).'
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
	import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@dashfi/svelte/ui/sheet';
<\/script>

<Sheet>
\t<SheetTrigger>Open</SheetTrigger>
\t<SheetContent side="right">
\t\t<SheetHeader>
\t\t\t<SheetTitle>Transaction details</SheetTitle>
\t\t\t<SheetDescription>Receipt, merchant, cashback breakdown.</SheetDescription>
\t\t</SheetHeader>
\t</SheetContent>
</Sheet>`;
</script>

<svelte:head><title>Sheet — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Sheet"
	description="Side drawer. Slides in from an edge — left, right, top, or bottom. For details, filters, secondary forms."
	importPath="@dashfi/svelte/ui/sheet"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Sheet>
					<SheetTrigger>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>Transaction details</Button>
						{/snippet}
					</SheetTrigger>
					<SheetContent side="right">
						<SheetHeader>
							<SheetTitle>Transaction details</SheetTitle>
							<SheetDescription>Receipt, merchant, cashback breakdown.</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Sheet" props={rootProps} />
			<PropsTable title="SheetTrigger" props={triggerProps} />
			<PropsTable title="SheetContent" props={contentProps} />
			<PropsTable title="SheetHeader" props={headerFooterProps} />
			<PropsTable title="SheetFooter" props={headerFooterProps} />
			<PropsTable title="SheetTitle" props={titleProps} />
			<PropsTable title="SheetDescription" props={descriptionProps} />
			<PropsTable title="SheetClose" props={closeProps} />
		</div>
	{/snippet}
</ComponentLayout>
