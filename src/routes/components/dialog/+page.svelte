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

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>DialogContent</strong> — width <code>w-full max-w-[calc(100%-2rem)]</code> with 16px viewport gutters, capped at <code>sm:max-w-lg</code> (512px) on the <code>sm</code> breakpoint+. Max height <code>max-h-[calc(100dvh-1rem)]</code>, <code>overflow-auto</code>.</li>
				<li><strong>Position</strong> — fixed center via <code>start-[50%] top-[50%]</code> with <code>translate-x-[-50%] translate-y-[-50%]</code>. <code>z-50</code>.</li>
				<li><strong>Padding</strong> — 24px all sides (<code>p-6</code>).</li>
				<li><strong>Gap</strong> — 16px between top-level children (<code>gap-4</code>) — grid layout.</li>
				<li><strong>Radius</strong> — 16px (<code>rounded-2xl</code>). The dialog uses the larger pill radius — <em>not</em> the prior <code>rounded-lg</code>.</li>
				<li><strong>Border</strong> — <em>none</em>. The surface relies on shadow + overlay for separation.</li>
				<li><strong>Close button</strong> — absolute at <code>end-4 top-4</code> (16px inset). <code>rounded-xs</code> hit target. 16px lucide <code>X</code> (<code>size-4</code>). <code>opacity-70</code>, hover <code>opacity-100</code>. Focus: <code>ring-ring ring-2 ring-offset-2</code>.</li>
				<li><strong>Animation</strong> — 200ms (<code>duration-200</code>). Enter: <code>fade-in-0 zoom-in-95</code>. Exit: <code>fade-out-0 zoom-out-95</code>.</li>
			</ul>

			<div class="docs-h">Tokens (per part)</div>
			<ul class="docs-list">
				<li><strong>DialogOverlay</strong> — fixed full-viewport, <code>bg-black/40</code> (black at 40% alpha, both modes). Same fade animation as content. <code>z-50</code>.</li>
				<li><strong>DialogContent surface</strong> — bg <code>--color-background</code> (light <code>#faf8f1</code>, dark <code>#0f1413</code>). No border token. Shadow <code>shadow-xl</code> (Tailwind v4 default <code>0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)</code>) — heavier than the prior <code>shadow-lg</code>.</li>
				<li><strong>DialogTitle</strong> — <code>text-lg leading-none font-semibold</code> (18px). Inherits <code>--color-foreground</code>.</li>
				<li><strong>DialogDescription</strong> — <code>text-sm</code> (14px) in <code>--color-muted-foreground</code> (light <code>#6e7878</code>, dark <code>#8b9695</code>).</li>
				<li><strong>DialogHeader</strong> — <code>flex flex-col gap-2 text-center sm:text-start</code> (centred on mobile, start-aligned on <code>sm</code>+).</li>
				<li><strong>DialogFooter</strong> — <code>flex flex-col-reverse gap-2 sm:flex-row sm:justify-end</code> (column-reverse stack on mobile, right-aligned row on <code>sm</code>+).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Standard tree: <code>Dialog &gt; DialogTrigger + DialogContent</code>. <code>DialogContent</code> auto-portals + auto-wraps in <code>DialogOverlay</code> + <code>DialogPortal</code>.</li>
				<li>Inside content, compose <code>DialogHeader &gt; DialogTitle + DialogDescription</code>, then body fields, then <code>DialogFooter</code> for the action row.</li>
				<li>Use <code>DialogTrigger child</code> snippet to delegate trigger to a custom element (e.g. Button): <code>&lt;DialogTrigger&gt;&#123;#snippet child(&#123;props&#125;)&#125;&lt;Button &#123;...props&#125;&gt;Open&lt;/Button&gt;&#123;/snippet&#125;&lt;/DialogTrigger&gt;</code>.</li>
			</ul>

			<div class="docs-h">Not part of Dialog</div>
			<ul class="docs-list">
				<li>No size variants (sm / md / lg). Width is <code>sm:max-w-lg</code> by default; override via <code>class</code> on <code>DialogContent</code>.</li>
				<li>No <code>onClose</code> prop on the root — use <code>onOpenChange</code> from bits-ui semantics.</li>
				<li>No backdrop-customisation prop. The overlay is always <code>bg-black/40</code>.</li>
				<li>No border on the content surface. Separation comes from shadow + overlay, not a stroke.</li>
				<li>No drag-handle / resize behaviour. Dialogs are not draggable; for that pattern use Drawer.</li>
				<li>No destructive variant. Use <code>AlertDialog</code> for destructive confirmations.</li>
				<li>No <code>width</code> prop. Width is class-driven.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>Dialog.open</code> — bindable. <code>onOpenChange</code> fires on change.</li>
				<li><code>DialogContent.showCloseButton</code> — toggles the built-in X. Default true.</li>
				<li><code>DialogContent.portalProps</code> — forwarded to DialogPortal (e.g. <code>to</code> target container).</li>
				<li>All bits-ui <code>Dialog.*</code> props pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Centered fixed positioning, <code>sm:max-w-lg</code> default (512px), 24px padding, 16px radius (<code>rounded-2xl</code>), <em>no border</em>, <code>shadow-xl</code>. Backdrop is black at 40%. 200ms fade + 95% zoom transition.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch.
					Material changes: radius bumped to 16px
					(<code>rounded-2xl</code>, was <code>rounded-lg</code> 8px),
					shadow heavier (<code>shadow-xl</code>, was
					<code>shadow-lg</code>), the 1px border is gone, overlay
					drops to 40% alpha (<code>bg-black/40</code>, was
					<code>bg-black/50</code>), and the default cap is
					<code>sm:max-w-lg</code> (was <code>max-w-3xl</code>). Close
					button hit target switches to <code>rounded-xs</code>.
					Header/Footer compositions documented. The previous v0.3.1
					anatomy referenced a stale branch and is no longer accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-13</span>
				<p>
					Anatomy added: centered fixed, <code>max-w-3xl</code> default,
					<code>p-6</code>, <code>rounded-lg</code> 8px, 1px border,
					<code>shadow-lg</code>, overlay <code>bg-black/50</code>, 200ms
					fade + 95% zoom transition, built-in close X. Explicit
					non-features (no size variants, no width prop, no drag handle,
					no destructive variant — use AlertDialog). Matches the Input
					precedent.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
