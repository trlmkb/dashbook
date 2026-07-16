import type { ComponentSpec } from '../types.js';

/**
 * Drawer — vaul-svelte bottom sheet.
 *
 * Mobile-friendly slide-up panel pulled from the bottom edge. Supports
 * drag-to-dismiss, momentum scroll, optional snap-points, and stacked-card
 * page-scale effect.
 */
export const drawer: ComponentSpec = {
	slug: 'drawer',
	name: 'Drawer',
	category: 'Feedback',
	status: 'beta',
	importPath:
		"import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@dashfi/svelte/ui/drawer'",
	description:
		'Mobile-friendly slide-up panel. Pulls from the bottom edge with momentum scroll, drag-to-dismiss, and an optional page-scale effect.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/drawer/',

	dimensions: [
		{
			name: 'Content (bottom sheet)',
			value: 'fixed bottom, full-width, 10px top radius',
			tw: 'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border',
			notes: 'Pinned to bottom with a 96px gap from the top of the viewport.'
		},
		{
			name: 'Drag handle',
			value: '100×8px pill, centered',
			tw: 'mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted'
		},
		{
			name: 'Overlay',
			value: '80% black backdrop',
			tw: 'fixed inset-0 z-50 bg-black/80',
			notes: 'Heavier than Sheet (40%) — drawer reads as more modal.'
		},
		{ name: 'Header', value: '16px padding', tw: 'grid gap-1.5 p-4 text-center sm:text-left' },
		{ name: 'Footer', value: '16px padding, pushed to bottom', tw: 'mt-auto flex flex-col gap-2 p-4' },
		{ name: 'Title', value: '18px, semibold', tw: 'text-lg leading-none font-semibold tracking-tight' },
		{ name: 'Description', value: '14px muted', tw: 'text-muted-foreground text-sm' }
	],

	tokens: [
		{
			name: 'Content background',
			token: { cssVar: '--color-background', light: '#faf9f5', dark: '#0f1412' }
		},
		{
			name: 'Drag handle',
			token: { cssVar: '--color-muted', light: '#f1efea', dark: '#191f1d' }
		},
		{ name: 'Overlay', notes: 'Literal `bg-black/80` — 80% pure black, not a theme token.' },
		{
			name: 'Description text',
			token: { cssVar: '--color-muted-foreground', light: '#6e8180', dark: '#819896' }
		}
	],

	composition: [
		'Wrap a <code>DrawerTrigger</code> + <code>DrawerContent</code> inside <code>Drawer</code>. Compose <code>DrawerHeader</code> / <code>DrawerTitle</code> / <code>DrawerDescription</code> / <code>DrawerFooter</code> inside the content.',
		'Built on <code>vaul-svelte</code> — supports drag-to-dismiss, momentum, and optional <code>snapPoints</code> for multi-stop drawers.',
		'<code>shouldScaleBackground</code> (default true) shrinks the page behind for the stacked-card effect.'
	],

	nonFeatures: [
		'No side variants — bottom only. Use Sheet for side-anchored panels.',
		'No portal prop — vaul handles its own portal.',
		'No backdrop opacity override — the 80% black is part of the canonical look.',
		'Not interchangeable with Dialog — Drawer is mobile-first with momentum scroll.'
	],

	props: [
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
	],

	porting: [
		'Bottom-anchored panel with a 10px top radius, full viewport width, 100×8 drag handle, and 80% black overlay. Drag to dismiss, momentum scroll, optional snap-points, optional page-scale behind.',
		'Underlying library is <code>vaul</code> (React) / <code>vaul-svelte</code> — pick the equivalent on the target stack and mirror the dimensions + overlay literal.'
	],

	example: `<script lang="ts">
	import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@dashfi/svelte/ui/drawer';
	import { Button } from '@dashfi/svelte/ui/button';
<\/script>

<Drawer>
\t<DrawerTrigger>
\t\t{#snippet child({ props })}
\t\t\t<Button variant="outline" {...props}>Open drawer</Button>
\t\t{/snippet}
\t</DrawerTrigger>
\t<DrawerContent>
\t\t<DrawerHeader>
\t\t\t<DrawerTitle>Issue virtual card</DrawerTitle>
\t\t\t<DrawerDescription>For one-off vendor or ad-account spend.</DrawerDescription>
\t\t</DrawerHeader>
\t\t<DrawerFooter>
\t\t\t<Button>Issue</Button>
\t\t</DrawerFooter>
\t</DrawerContent>
</Drawer>`,

	accessibility: [
		'Built on vaul — full keyboard support (Escape closes, focus is trapped while open).',
		'Pair <code>DrawerTitle</code> + <code>DrawerDescription</code> so screen readers announce the panel context.',
		'<code>dismissible</code> defaults to true — Esc / overlay-click both close. Set to false for required interactions.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Bottom-anchored vaul-svelte drawer — rounded-t-[10px], 100×8 drag handle, bg-black/80 heavy overlay, optional snap-points and page-scale.'
		}
	]
};
