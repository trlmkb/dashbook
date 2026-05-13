import type { ComponentSpec } from '../types.js';

/**
 * Sheet — side-anchored modal panel.
 *
 * Slides in from any edge — top, right, bottom, left. Built on bits-ui
 * Dialog primitives with 40% black overlay. Use for details, filters,
 * secondary forms.
 */
export const sheet: ComponentSpec = {
	slug: 'sheet',
	name: 'Sheet',
	category: 'Feedback',
	status: 'stable',
	importPath:
		"import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@dashfi/svelte/ui/sheet'",
	description:
		'Side drawer — slides in from any edge (top, right, bottom, left). 40% black overlay, absolute Close button in the corner. Built on bits-ui Dialog primitives.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/sheet/',

	dimensions: [
		{
			name: 'Content',
			value: 'fixed, side-aware sizing',
			tw: 'fixed z-50',
			notes: 'Default <code>right</code> side is typically <code>w-3/4 sm:max-w-sm</code>. See <code>sheetVariants</code> in canonical for exact size matrix.'
		},
		{
			name: 'Overlay',
			value: '40% black backdrop',
			tw: 'fixed inset-0 z-50 bg-black/40',
			notes: 'Lighter than Drawer (80%).'
		},
		{
			name: 'Close button',
			value: 'absolute top-right, 16px glyph',
			tw: 'absolute end-2 top-2 rounded-xs',
			notes: '<code>size-4</code> X glyph; focus-visible ring at 2px offset.'
		},
		{ name: 'Header / Footer / Title / Description', value: 'mirror Dialog conventions' }
	],

	tokens: [
		{
			name: 'Content background',
			token: { cssVar: '--color-background', light: '#faf8f1', dark: '#0f1413' }
		},
		{ name: 'Overlay', notes: 'Literal <code>bg-black/40</code> — not a theme token.' },
		{
			name: 'Close button focus ring',
			token: { cssVar: '--color-ring', light: '#2b605c', dark: '#5bb8b0' }
		}
	],

	variants: [
		{ name: 'top', description: 'Slides in from the top edge.' },
		{ name: 'right', description: 'Default. Slides in from the right edge.' },
		{ name: 'bottom', description: 'Slides in from the bottom edge.' },
		{ name: 'left', description: 'Slides in from the left edge.' }
	],

	composition: [
		'<code>Sheet &gt; SheetTrigger &gt; SheetContent</code>. Inside <code>SheetContent</code>, compose <code>SheetHeader</code> / <code>SheetTitle</code> / <code>SheetDescription</code> / footer / body.',
		"Use the trigger's <code>child</code> snippet to delegate to a Button.",
		'Built on bits-ui <code>Dialog</code> primitives — full keyboard + focus-trap support.'
	],

	nonFeatures: [
		'No drag-to-dismiss. Use Drawer for the bottom-sheet draggable behavior.',
		'No nested sheets. Compose carefully — keyboard focus management is per-instance.',
		'No backdrop opacity override at the prop level — the 40% black is part of the look.'
	],

	props: [
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
			name: 'SheetTrigger.child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-as-child snippet for delegating to a custom trigger element.'
		},
		{
			name: 'SheetContent.side',
			type: "'top' | 'bottom' | 'left' | 'right'",
			default: "'right'",
			description: 'Edge the sheet slides in from.'
		},
		{
			name: 'SheetContent.overlayClass',
			type: 'string',
			description: 'Additional Tailwind classes applied to the backdrop overlay.'
		},
		{
			name: 'SheetContent.portalProps',
			type: 'SheetPortalProps',
			description: 'Props forwarded to the underlying SheetPortal.'
		},
		{
			name: 'SheetContent.restProps',
			type: 'Dialog.ContentProps',
			description: 'All bits-ui Dialog.Content props pass through (Sheet is built on Dialog primitive).'
		},
		{
			name: 'SheetHeader / SheetFooter',
			type: 'Component',
			description: 'Layout slots inside SheetContent. Mirror Dialog.'
		},
		{
			name: 'SheetTitle / SheetDescription',
			type: 'Component',
			description: 'Accessible heading and description, wired to the sheet for screen readers.'
		},
		{
			name: 'SheetClose',
			type: 'Component',
			description: 'Re-exported Close primitive for custom dismiss buttons inside the content.'
		}
	],

	porting: [
		'Side-anchored modal panel, 40% black overlay, side-aware slide-in. Built on Dialog primitives — full focus trap + Esc handling.',
		'Default <code>right</code> at <code>w-3/4 sm:max-w-sm</code>; mirror the side-variant matrix from the canonical when porting.'
	],

	example: `<script lang="ts">
	import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@dashfi/svelte/ui/sheet';
	import { Button } from '@dashfi/svelte/ui/button';
<\/script>

<Sheet>
\t<SheetTrigger>
\t\t{#snippet child({ props })}
\t\t\t<Button variant="outline" {...props}>Transaction details</Button>
\t\t{/snippet}
\t</SheetTrigger>
\t<SheetContent side="right">
\t\t<SheetHeader>
\t\t\t<SheetTitle>Transaction details</SheetTitle>
\t\t\t<SheetDescription>Receipt, merchant, cashback breakdown.</SheetDescription>
\t\t</SheetHeader>
\t</SheetContent>
</Sheet>`,

	accessibility: [
		'Built on bits-ui Dialog — full keyboard support (Esc closes, focus is trapped, returns to trigger on close).',
		'Pair <code>SheetTitle</code> + <code>SheetDescription</code> so the sheet is announced to screen readers.',
		'Close button is auto-included and accessible — no manual Close needed for the common case.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Side-anchored modal (top/right/bottom/left), bg-black/40 overlay, absolute Close button at end-2 top-2.'
		}
	]
};
