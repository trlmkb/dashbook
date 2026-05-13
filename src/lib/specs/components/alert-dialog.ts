import type { ComponentSpec } from '../types.js';

export const alertDialog: ComponentSpec = {
	slug: 'alert-dialog',
	name: 'Alert Dialog',
	category: 'Feedback',
	status: 'stable',
	importPath:
		"import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@dashfi/svelte/ui/alert-dialog'",
	description:
		'Confirmation modal — interrupts the user for a destructive or irreversible action.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/alert-dialog/',

	dimensions: [
		{
			name: 'AlertDialogContent',
			value: 'w-full max-w-[calc(100%-2rem)], capped at 512px on sm+',
			tw: 'w-full max-w-[calc(100%-2rem)] sm:max-w-lg',
			notes: '16px viewport gutters on mobile.'
		},
		{
			name: 'Position',
			value: 'fixed center, z-70',
			tw: 'start-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-70',
			notes: 'Above the standard z-50 Dialog so confirm-on-close patterns stack correctly.'
		},
		{ name: 'Padding', value: '24px all sides', tw: 'p-6' },
		{
			name: 'Gap',
			value: '16px between top-level grid children',
			tw: 'gap-4'
		},
		{ name: 'Radius', value: '8px', tw: 'rounded-lg', notes: '--radius-lg.' },
		{
			name: 'Border',
			value: '1px',
			tw: 'border',
			notes:
				'Uses --color-border. Unlike Dialog, AlertDialog keeps the border — higher z-index alone is not enough separation.'
		},
		{
			name: 'Shadow',
			value: 'shadow-lg',
			notes: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1).'
		},
		{
			name: 'Animation',
			value: '200ms',
			tw: 'duration-200',
			notes:
				'Enter: fade-in-0 zoom-in-95. Exit: fade-out-0 zoom-out-95. No slide — confirmation modals must feel decisive.'
		},
		{
			name: 'Trigger',
			value: 'unstyled bits-ui primitive',
			notes: 'Use the `child` snippet to delegate to a Button (typically variant="destructive").'
		}
	],

	tokens: [
		{
			name: 'AlertDialogOverlay',
			notes:
				'Fixed full-viewport, `bg-black/40` (black at 40% alpha, both modes). Fades in/out with the content. z-50 (below the content z-70).'
		},
		{
			name: 'AlertDialogContent surface (bg)',
			token: { cssVar: '--color-background', light: '#faf8f1', dark: '#0f1413' }
		},
		{
			name: 'AlertDialogContent surface (border)',
			token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' }
		},
		{
			name: 'AlertDialogTitle',
			token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' },
			notes: '`text-lg font-semibold` (18px).'
		},
		{
			name: 'AlertDialogDescription',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' },
			notes: '`text-sm` (14px).'
		},
		{
			name: 'AlertDialogHeader',
			notes:
				'`flex flex-col gap-2 text-center sm:text-start` (centred on mobile, start-aligned on sm+).'
		},
		{
			name: 'AlertDialogFooter',
			notes:
				'`flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` (stack reversed on mobile so the action button is on top; right-aligned row on sm+).'
		},
		{
			name: 'AlertDialogAction',
			notes:
				'Uses the *default* Button variant (primary). For destructive confirms, pass `class` overrides or wrap in a custom button via `child`.'
		},
		{
			name: 'AlertDialogCancel',
			notes: 'Uses the *outline* Button variant.'
		}
	],

	composition: [
		'Standard tree: <code>AlertDialog &gt; AlertDialogTrigger + AlertDialogContent</code>. <code>AlertDialogContent</code> auto-portals + auto-wraps in <code>AlertDialogOverlay</code> + <code>AlertDialogPortal</code>.',
		"Inside content: <code>AlertDialogHeader &gt; AlertDialogTitle + AlertDialogDescription</code>, then <code>AlertDialogFooter &gt; AlertDialogCancel + AlertDialogAction</code> (cancel before action in source; the footer's <code>flex-col-reverse</code> + <code>sm:flex-row</code> handles the visual order).",
		'Use <code>AlertDialogTrigger child</code> snippet to delegate the trigger to a Button: <code>&lt;AlertDialogTrigger&gt;{#snippet child({props})}&lt;Button variant="destructive" {...props}&gt;Freeze&lt;/Button&gt;{/snippet}&lt;/AlertDialogTrigger&gt;</code>.'
	],

	nonFeatures: [
		'No size variants (sm / md / lg). Width is <code>sm:max-w-lg</code> by default.',
		'No close (X) button. Alert Dialogs are not casually dismissible — the user must choose Cancel or Action explicitly.',
		'No backdrop-customisation prop. The overlay is always <code>bg-black/40</code>.',
		'No <code>onClose</code> prop on the root — use <code>onOpenChange</code>.',
		'No icon slot or status variant (success / warning / error). For non-destructive informational modals, use <code>Dialog</code>.'
	],

	props: [
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
			name: 'portalProps',
			type: 'AlertDialogPortalProps',
			description: 'Props forwarded to the underlying AlertDialogPortal on AlertDialogContent.'
		},
		{
			name: 'child (Trigger)',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-as-child snippet for delegating to a custom trigger element (e.g. Button).'
		},
		{
			name: '...AlertDialog.* props',
			type: 'bits-ui types',
			description:
				'All bits-ui AlertDialog.* props pass through (e.g. escapeKeydownBehavior, onInteractOutside, forceMount).'
		}
	],

	porting: [
		'Centred fixed positioning, <code>sm:max-w-lg</code> (512px), 24px padding, 8px radius (<code>rounded-lg</code>), 1px border, <code>shadow-lg</code>, <code>z-70</code>. Backdrop black at 40%. 200ms fade + 95% zoom transition. No close X. Footer flips column-reverse → right-aligned row at the <code>sm</code> breakpoint.'
	],

	example: `<script lang="ts">
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
</AlertDialog>`,

	accessibility: [
		'Focus is trapped inside the dialog while open. <code>Esc</code> closes (cancel).',
		'Use for actions the user might regret. Routine confirmations should not interrupt.',
		"The destructive action button uses Button's <code>destructive</code> variant — orange."
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch — the content surface sits at z-70 (not the standard z-50) so a confirm-on-close AlertDialog can layer over a Dialog / FullscreenDialog without re-stacking. Overlay stays at z-50, alpha drops to bg-black/40. Radius is rounded-lg (8px), 1px border retained, padding p-6, shadow-lg, 200ms fade + 95% zoom. Action defaults to primary Button; Cancel to outline. Header / Footer compositions documented. Earlier prose-style anatomy did not reflect the current canonical and is superseded.'
		}
	]
};
