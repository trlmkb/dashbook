<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Drawer,
		DrawerTrigger,
		DrawerContent,
		DrawerHeader,
		DrawerTitle,
		DrawerDescription,
		DrawerFooter
	} from '@dashfi/svelte/ui/drawer';
	import { Button } from '@dashfi/svelte/ui/button';

	const propsTable: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Controlled open state. Bind with bind:open or pass onOpenChange to track changes.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the drawer requests to open or close.'
		},
		{
			name: 'shouldScaleBackground',
			type: 'boolean',
			default: 'true',
			description: 'Scale the page behind the drawer for the signature stacked-card effect.'
		},
		{
			name: 'activeSnapPoint',
			type: 'string | number | null',
			default: 'null',
			bindable: true,
			description: 'Current snap point when snapPoints is provided. Bindable for controlled behavior.'
		},
		{
			name: 'snapPoints',
			type: '(string | number)[]',
			description: 'Fractional or pixel positions the drawer will snap to on drag.'
		},
		{
			name: 'dismissible',
			type: 'boolean',
			default: 'true',
			description: 'Allow swipe-down and overlay-click to close the drawer.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Composition slot — typically DrawerTrigger and DrawerContent.'
		},
		{
			name: 'DrawerTrigger',
			type: 'Component',
			description: 'Re-exported from vaul-svelte. Renders the element that opens the drawer.'
		},
		{
			name: 'DrawerContent',
			type: 'Component',
			description: 'The bottom sheet surface. Accepts ref (bindable HTMLDivElement) and portalProps.'
		},
		{
			name: 'DrawerHeader / DrawerFooter',
			type: 'Component',
			description: 'Layout sections inside DrawerContent. Pass class to override.'
		},
		{
			name: 'DrawerTitle / DrawerDescription',
			type: 'Component',
			description: 'Accessible heading and description, wired to the drawer for screen readers.'
		},
		{
			name: 'DrawerOverlay / DrawerPortal / DrawerClose',
			type: 'Component',
			description: 'Lower-level primitives re-exported from vaul-svelte for custom compositions.'
		}
	];

	const example = `<script lang="ts">
	import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@dashfi/svelte/ui/drawer';
<\/script>

<Drawer>
\t<DrawerTrigger>Open</DrawerTrigger>
\t<DrawerContent>
\t\t<DrawerHeader>
\t\t\t<DrawerTitle>Issue virtual card</DrawerTitle>
\t\t\t<DrawerDescription>For one-off vendor or ad-account spend.</DrawerDescription>
\t\t</DrawerHeader>
\t</DrawerContent>
</Drawer>`;
</script>

<svelte:head><title>Drawer — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Drawer"
	description="Mobile-friendly bottom sheet. Slides up with momentum-scroll, swipe-to-dismiss."
	importPath="@dashfi/svelte/ui/drawer"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Drawer>
					<DrawerTrigger>
						{#snippet child({ props }: { props: Record<string, unknown> })}
							<Button variant="outline" {...props}>Open drawer</Button>
						{/snippet}
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Issue virtual card</DrawerTitle>
							<DrawerDescription>
								For one-off vendor or ad-account spend.
							</DrawerDescription>
						</DrawerHeader>
						<DrawerFooter>
							<Button>Issue</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Content (bottom sheet)</strong> — <code>fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border</code>. Pinned to bottom, full-width, 10px top radius, 96px gap from the top of the viewport.</li>
				<li><strong>Drag handle</strong> — <code>mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted</code>. 100×8px pill, centered.</li>
				<li><strong>Overlay</strong> — <code>fixed inset-0 z-50 bg-black/80</code>. Heavy 80% black backdrop (vs Sheet's 40% — drawer is more modal).</li>
				<li><strong>Header</strong> — <code>grid gap-1.5 p-4 text-center sm:text-left</code>.</li>
				<li><strong>Footer</strong> — <code>mt-auto flex flex-col gap-2 p-4</code>.</li>
				<li><strong>Title</strong> — <code>text-lg leading-none font-semibold tracking-tight</code> (18px).</li>
				<li><strong>Description</strong> — <code>text-muted-foreground text-sm</code>.</li>
			</ul>
			<div class="docs-h">Behavior</div>
			<ul class="docs-list">
				<li>Built on <code>vaul-svelte</code> — supports drag-to-dismiss and momentum.</li>
				<li><code>shouldScaleBackground</code> (default true) shrinks the page behind for the stacked-card effect.</li>
				<li>Optional <code>snapPoints</code> for multi-stop drawers.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Content bg <code>--color-background</code>; handle <code>--color-muted</code>; overlay literal <code>bg-black/80</code>.</li>
			</ul>
			<div class="docs-h">Not part of Drawer</div>
			<ul class="docs-list">
				<li>No side variants — bottom only. Use Sheet for side-anchored panels.</li>
				<li>No portal prop — vaul handles its own portal.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Bottom-anchored 10px-top-radius panel with a drag handle, 80% black overlay, optional page-scale.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Bottom-anchored vaul-svelte
					drawer — <code>rounded-t-[10px]</code>, 100×8 drag handle, <code>bg-black/80</code>
					heavy overlay, optional snap-points and page-scale.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
