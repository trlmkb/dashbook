import type { ComponentSpec } from '../types.js';

/**
 * Dialog — generic modal.
 *
 * Centered, 512px max width on sm+, 24px padding, 16px radius, no border,
 * shadow-xl. Backdrop is black at 40%.
 */
export const dialog: ComponentSpec = {
	slug: 'dialog',
	name: 'Dialog',
	category: 'Feedback',
	status: 'beta',
	importPath:
		"import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@dashfi/svelte/ui/dialog'",
	description: 'Generic modal. Use for forms, confirmations, content panels.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/dialog/',

	dimensions: [
		{
			name: 'DialogContent width',
			value: '100% minus 32px gutters, capped at 512px',
			tw: 'w-full max-w-[calc(100%-2rem)] sm:max-w-lg',
			notes: '16px viewport gutters; max-w-lg on the sm breakpoint+.'
		},
		{
			name: 'DialogContent max height',
			value: '100dvh − 16px',
			tw: 'max-h-[calc(100dvh-1rem)] overflow-auto'
		},
		{
			name: 'Position',
			value: 'fixed centre',
			tw: 'start-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50'
		},
		{ name: 'Padding', value: '24px all sides', tw: 'p-6' },
		{ name: 'Gap', value: '16px between top-level children', tw: 'gap-4', notes: 'grid layout.' },
		{
			name: 'Radius',
			value: '16px',
			tw: 'rounded-2xl',
			notes: 'The dialog uses the larger pill radius — *not* the prior `rounded-lg`.'
		},
		{ name: 'Border', value: 'none', notes: 'The surface relies on shadow + overlay for separation.' },
		{
			name: 'Close button',
			value: 'absolute at end-4 top-4 (16px inset), 16px lucide X',
			tw: 'rounded-xs size-4',
			notes: '`opacity-70`, hover `opacity-100`. Focus: `ring-ring ring-2 ring-offset-2`.'
		},
		{
			name: 'Animation',
			value: '200ms fade + 95% zoom',
			tw: 'duration-200',
			notes: 'Enter: `fade-in-0 zoom-in-95`. Exit: `fade-out-0 zoom-out-95`.'
		}
	],

	tokens: [
		{
			name: 'DialogOverlay',
			notes:
				'Fixed full-viewport, `bg-black/40` (black at 40% alpha, both modes). Same fade animation as content. `z-50`.'
		},
		{
			name: 'DialogContent surface',
			token: { cssVar: '--color-background', light: '#faf8f1', dark: '#0f1413' },
			notes:
				'No border token. Shadow `shadow-xl` (Tailwind v4 default `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`) — heavier than the prior `shadow-lg`.'
		},
		{
			name: 'DialogTitle',
			notes: '`text-lg leading-none font-semibold` (18px). Inherits `--color-foreground`.'
		},
		{
			name: 'DialogDescription',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' },
			notes: '`text-sm` (14px).'
		},
		{
			name: 'DialogHeader',
			notes:
				'`flex flex-col gap-2 text-center sm:text-start` (centred on mobile, start-aligned on `sm`+).'
		},
		{
			name: 'DialogFooter',
			notes:
				'`flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` (column-reverse stack on mobile, right-aligned row on `sm`+).'
		}
	],

	composition: [
		'Standard tree: <code>Dialog &gt; DialogTrigger + DialogContent</code>. <code>DialogContent</code> auto-portals + auto-wraps in <code>DialogOverlay</code> + <code>DialogPortal</code>.',
		'Inside content, compose <code>DialogHeader &gt; DialogTitle + DialogDescription</code>, then body fields, then <code>DialogFooter</code> for the action row.',
		'Use <code>DialogTrigger child</code> snippet to delegate trigger to a custom element (e.g. Button): <code>&lt;DialogTrigger&gt;{#snippet child({props})}&lt;Button {...props}&gt;Open&lt;/Button&gt;{/snippet}&lt;/DialogTrigger&gt;</code>.'
	],

	nonFeatures: [
		'No size variants (sm / md / lg). Width is <code>sm:max-w-lg</code> by default; override via <code>class</code> on <code>DialogContent</code>.',
		'No <code>onClose</code> prop on the root — use <code>onOpenChange</code> from bits-ui semantics.',
		'No backdrop-customisation prop. The overlay is always <code>bg-black/40</code>.',
		'No border on the content surface. Separation comes from shadow + overlay, not a stroke.',
		'No drag-handle / resize behaviour. Dialogs are not draggable; for that pattern use Drawer.',
		'No destructive variant. Use <code>AlertDialog</code> for destructive confirmations.',
		'No <code>width</code> prop. Width is class-driven.'
	],

	props: [
		{
			name: 'Dialog.open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Whether the dialog is open. Two-way binding via bind:open.'
		},
		{
			name: 'Dialog.onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the open state changes.'
		},
		{
			name: 'DialogContent.showCloseButton',
			type: 'boolean',
			default: 'true',
			description: 'Render the built-in top-right close (X) button.'
		},
		{
			name: 'DialogContent.portalProps',
			type: 'DialogPortalProps',
			description: 'Props forwarded to the underlying DialogPortal.'
		},
		{
			name: 'DialogTrigger.child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-as-child snippet for delegating to a custom trigger element (e.g. Button).'
		},
		{
			name: '...restProps',
			type: 'bits-ui Dialog.* props',
			description: 'All bits-ui Dialog.* props pass through (e.g. forceMount, onEscapeKeydown, onInteractOutside).'
		}
	],

	porting: [
		'Centered fixed positioning, <code>sm:max-w-lg</code> default (512px), 24px padding, 16px radius (<code>rounded-2xl</code>), <em>no border</em>, <code>shadow-xl</code>. Backdrop is black at 40%. 200ms fade + 95% zoom transition.'
	],

	example: `<script lang="ts">
	import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@dashfi/svelte/ui/dialog';
<\/script>

<Dialog>
	<DialogTrigger>Open</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Issue virtual card</DialogTitle>
			<DialogDescription>For one-off vendor or ad-account spend.</DialogDescription>
		</DialogHeader>
		<!-- form -->
		<DialogFooter>
			<Button>Issue</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>`,

	accessibility: [
		'Built on bits-ui <code>Dialog.Root</code>; provides <code>role="dialog"</code>, focus trap, scroll lock, and ESC dismiss.',
		'<code>DialogTitle</code> wires the accessible name via <code>aria-labelledby</code>; <code>DialogDescription</code> wires <code>aria-describedby</code>.',
		'Built-in close button has <code>aria-label="Close"</code>. The trigger receives focus when the dialog closes.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Material changes: radius bumped to 16px (rounded-2xl, was rounded-lg 8px), shadow heavier (shadow-xl, was shadow-lg), the 1px border is gone, overlay drops to 40% alpha (bg-black/40, was bg-black/50), and the default cap is sm:max-w-lg (was max-w-3xl). Close button hit target switches to rounded-xs. Header/Footer compositions documented. The previous v0.3.1 anatomy referenced a stale branch and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-13',
			note: 'Anatomy added: centered fixed, max-w-3xl default, p-6, rounded-lg 8px, 1px border, shadow-lg, overlay bg-black/50, 200ms fade + 95% zoom transition, built-in close X. Explicit non-features (no size variants, no width prop, no drag handle, no destructive variant — use AlertDialog). Matches the Input precedent.'
		}
	]
};
