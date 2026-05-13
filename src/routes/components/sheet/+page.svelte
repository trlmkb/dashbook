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
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Content</strong> — <code>fixed z-50</code> with side-aware sizing via <code>sheetVariants</code>. The default <code>right</code> side is typically <code>w-3/4 sm:max-w-sm</code> (or similar); refer to the canonical for the exact size matrix.</li>
				<li><strong>Overlay</strong> — <code>fixed inset-0 z-50 bg-black/40</code> (40% black; lighter than Drawer's 80%).</li>
				<li><strong>Close button</strong> — <code>absolute end-2 top-2 rounded-xs</code> with <code>size-4</code> X glyph. Focus-visible ring at 2px offset 2.</li>
				<li><strong>Header / Footer / Title / Description</strong> — composable sub-components mirror Dialog's pattern.</li>
			</ul>
			<div class="docs-h">Sides</div>
			<ul class="docs-list">
				<li>Top / right / bottom / left — slides in from the matching edge with bits-ui's slide animations.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Content bg <code>--color-background</code>; overlay literal <code>bg-black/40</code>.</li>
				<li>Close button focus ring uses <code>--color-ring</code>.</li>
			</ul>
			<div class="docs-h">Not part of Sheet</div>
			<ul class="docs-list">
				<li>No drag-to-dismiss. Use Drawer for the bottom-sheet draggable behavior.</li>
				<li>No nested sheets. Compose carefully — keyboard focus management is per-instance.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Side-anchored modal panel, 40% black overlay, side-aware slide-in. Built on bits-ui Dialog primitives.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Side-anchored modal
					(top/right/bottom/left), <code>bg-black/40</code> overlay, absolute Close
					button at <code>end-2 top-2</code>.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
