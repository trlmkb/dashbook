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

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>AlertDialogContent</strong> — width <code>w-full max-w-[calc(100%-2rem)]</code> (16px viewport gutters), capped at <code>sm:max-w-lg</code> (512px) on <code>sm</code>+.</li>
				<li><strong>Position</strong> — fixed center via <code>start-[50%] top-[50%]</code> with <code>translate-x-[-50%] translate-y-[-50%]</code>. <code>z-70</code> (note: above the standard <code>z-50</code> Dialog so confirm-on-close patterns stack correctly).</li>
				<li><strong>Padding</strong> — 24px all sides (<code>p-6</code>).</li>
				<li><strong>Gap</strong> — 16px between top-level grid children (<code>gap-4</code>).</li>
				<li><strong>Radius</strong> — 8px (<code>rounded-lg</code>, <code>--radius-lg</code>).</li>
				<li><strong>Border</strong> — 1px (<code>border</code>) using <code>--color-border</code>. Unlike Dialog, AlertDialog <em>keeps</em> the border — the higher z-index alone is not enough separation.</li>
				<li><strong>Shadow</strong> — <code>shadow-lg</code> = <code>0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)</code>.</li>
				<li><strong>Animation</strong> — 200ms (<code>duration-200</code>). Enter: <code>fade-in-0 zoom-in-95</code>. Exit: <code>fade-out-0 zoom-out-95</code>. No slide — confirmation modals must feel decisive.</li>
				<li><strong>Trigger</strong> — unstyled bits-ui primitive. Use the <code>child</code> snippet to delegate to a Button (typically <code>variant="destructive"</code>).</li>
			</ul>

			<div class="docs-h">Tokens (per part)</div>
			<ul class="docs-list">
				<li><strong>AlertDialogOverlay</strong> — fixed full-viewport, <code>bg-black/40</code> (black at 40% alpha, both modes). Fades in/out with the content. <code>z-50</code> (sits below the content's <code>z-70</code>).</li>
				<li><strong>AlertDialogContent surface</strong> — bg <code>--color-background</code> (light <code>#faf8f1</code>, dark <code>#0f1413</code>). Border <code>--color-border</code> (light <code>#e8e6dc</code>, dark <code>#1f2a29</code>). Shadow as above.</li>
				<li><strong>AlertDialogTitle</strong> — <code>text-lg font-semibold</code> (18px). Inherits <code>--color-foreground</code> (light <code>#123b39</code>, dark <code>#ffffff</code>).</li>
				<li><strong>AlertDialogDescription</strong> — <code>text-sm</code> (14px) in <code>--color-muted-foreground</code> (light <code>#6e7878</code>, dark <code>#8b9695</code>).</li>
				<li><strong>AlertDialogHeader</strong> — <code>flex flex-col gap-2 text-center sm:text-start</code> (centred on mobile, start-aligned on <code>sm</code>+).</li>
				<li><strong>AlertDialogFooter</strong> — <code>flex flex-col-reverse gap-2 sm:flex-row sm:justify-end</code> (stack reversed on mobile so the action button is on top; right-aligned row on <code>sm</code>+).</li>
				<li><strong>AlertDialogAction</strong> — uses the <em>default</em> Button variant (primary). For destructive confirms, pass <code>class</code> overrides or wrap in a custom button via <code>child</code>.</li>
				<li><strong>AlertDialogCancel</strong> — uses the <em>outline</em> Button variant.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Standard tree: <code>AlertDialog &gt; AlertDialogTrigger + AlertDialogContent</code>. <code>AlertDialogContent</code> auto-portals + auto-wraps in <code>AlertDialogOverlay</code> + <code>AlertDialogPortal</code>.</li>
				<li>Inside content: <code>AlertDialogHeader &gt; AlertDialogTitle + AlertDialogDescription</code>, then <code>AlertDialogFooter &gt; AlertDialogCancel + AlertDialogAction</code> (cancel before action in source; the footer's <code>flex-col-reverse</code> + <code>sm:flex-row</code> handles the visual order).</li>
				<li>Use <code>AlertDialogTrigger child</code> snippet to delegate the trigger to a Button: <code>&lt;AlertDialogTrigger&gt;&#123;#snippet child(&#123;props&#125;)&#125;&lt;Button variant="destructive" &#123;...props&#125;&gt;Freeze&lt;/Button&gt;&#123;/snippet&#125;&lt;/AlertDialogTrigger&gt;</code>.</li>
			</ul>

			<div class="docs-h">Not part of Alert Dialog</div>
			<ul class="docs-list">
				<li>No size variants (sm / md / lg). Width is <code>sm:max-w-lg</code> by default.</li>
				<li>No close (X) button. Alert Dialogs are not casually dismissible — the user must choose Cancel or Action explicitly.</li>
				<li>No backdrop-customisation prop. The overlay is always <code>bg-black/40</code>.</li>
				<li>No <code>onClose</code> prop on the root — use <code>onOpenChange</code>.</li>
				<li>No icon slot or status variant (success / warning / error). For non-destructive informational modals, use <code>Dialog</code>.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>AlertDialog.open</code> — bindable. <code>onOpenChange</code> fires on change.</li>
				<li><code>AlertDialogContent.portalProps</code> — forwarded to <code>AlertDialogPortal</code>.</li>
				<li>All bits-ui <code>AlertDialog.*</code> props pass through (e.g. <code>escapeKeydownBehavior</code>, <code>onInteractOutside</code>).</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Centred fixed positioning, <code>sm:max-w-lg</code> (512px), 24px padding, 8px radius (<code>rounded-lg</code>), 1px border, <code>shadow-lg</code>, <code>z-70</code>. Backdrop black at 40%. 200ms fade + 95% zoom transition. No close X. Footer flips column-reverse → right-aligned row at the <code>sm</code> breakpoint.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch — the
					content surface sits at <code>z-70</code> (not the standard
					<code>z-50</code>) so a confirm-on-close AlertDialog can layer
					over a Dialog / FullscreenDialog without re-stacking. Overlay
					stays at <code>z-50</code>, alpha drops to <code>bg-black/40</code>.
					Radius is <code>rounded-lg</code> (8px), 1px <code>border</code>
					retained, padding <code>p-6</code>, <code>shadow-lg</code>, 200ms
					fade + 95% zoom. Action defaults to primary Button; Cancel to
					outline. Header / Footer compositions documented. Earlier
					prose-style anatomy did not reflect the current canonical and
					is superseded.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
