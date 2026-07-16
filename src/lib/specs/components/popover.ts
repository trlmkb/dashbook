import type { ComponentSpec } from '../types.js';

/**
 * Popover — bits-ui Popover primitives with Tailwind chrome.
 *
 * Floating panel anchored to a trigger. 288px wide, no border, shadow-lg.
 * For filters, mini-forms, secondary actions.
 */
export const popover: ComponentSpec = {
	slug: 'popover',
	name: 'Popover',
	category: 'Feedback',
	status: 'beta',
	importPath:
		"import { Popover, PopoverTrigger, PopoverContent } from '@dashfi/svelte/ui/popover'",
	description:
		'Floating panel anchored to a trigger. 288px wide, 12px radius, shadow-lg, no border. For filters, mini-forms, secondary actions.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/popover/',

	dimensions: [
		{
			name: 'Content',
			value: '288px wide, 12px radius, 16px padding',
			tw: 'w-72 rounded-xl p-4 shadow-lg',
			notes: 'Tailwind v4 <code>shadow-lg</code> = <code>0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)</code>.'
		},
		{
			name: 'Side offset',
			value: '4px default',
			notes: '<code>align</code> defaults to <code>center</code>. Supports <code>side="bottom-end"</code> extension.'
		},
		{
			name: 'Z-index',
			value: 'z-[60]',
			notes: 'Sits above tooltips (z-50).'
		},
		{
			name: 'Animations',
			value: 'fade + zoom-95 + side-aware slide-in',
			tw: 'data-[state=open]:animate-in fade-in-0 zoom-in-95'
		},
		{ name: 'Outline', value: 'outline-none on focus' }
	],

	tokens: [
		{
			name: 'Background',
			token: { cssVar: '--color-popover', light: '#ffffff', dark: '#161d1a' },
			notes: 'Brighter than <code>--color-background</code> — that contrast is the popover signature.'
		},
		{
			name: 'Text',
			token: { cssVar: '--color-popover-foreground', light: '#123b38', dark: '#ffffff' }
		},
		{ name: 'Border', notes: 'None — shadow alone separates the popover from the surface.' }
	],

	composition: [
		'Wrap a <code>PopoverTrigger</code> + <code>PopoverContent</code> inside <code>Popover</code>.',
		"Use the trigger's <code>child</code> snippet to delegate to a Button.",
		'Portal-rendered — positioning never gets clipped by ancestor overflow.',
		'For interactive forms / filter chips. Use Tooltip for read-only labels and HoverCard for previews.'
	],

	nonFeatures: [
		'No arrow / caret. Positioning is the only directional cue.',
		'No backdrop overlay. Use Dialog if you need a modal interaction context.',
		'No header / footer slots — compose your own padding within <code>PopoverContent</code>.',
		'No border — shadow is the only edge.'
	],

	props: [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Whether the popover is open. Two-way binding via bind:open.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the open state changes.'
		},
		{
			name: 'PopoverTrigger.child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-as-child snippet for delegating to a custom trigger element (e.g. Button).'
		},
		{
			name: 'PopoverContent.side',
			type: "'top' | 'bottom' | 'left' | 'right' | 'bottom-end'",
			description: 'Side of the trigger to position content. <code>bottom-end</code> aligns the content end to the trigger end.'
		},
		{
			name: 'PopoverContent.align',
			type: "'start' | 'center' | 'end'",
			default: "'center'",
			description: 'Alignment of the content relative to the trigger along the chosen side.'
		},
		{
			name: 'PopoverContent.sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in px between the trigger and the popover content.'
		},
		{
			name: 'PopoverContent.portalProps',
			type: 'PopoverPortalProps',
			description: 'Props forwarded to the underlying Popover.Portal.'
		},
		{
			name: 'PopoverContent.restProps',
			type: 'Popover.ContentProps',
			description: 'All bits-ui Popover.Content props pass through (forceMount, onEscapeKeydown, onInteractOutside).'
		},
		{
			name: 'PopoverClose',
			type: 'Component',
			description: 'Re-exported from bits-ui — close button primitive for compositions that need an explicit dismiss.'
		}
	],

	porting: [
		'288px-wide panel, 12px radius, 16px padding, <code>shadow-lg</code>, no border. Brighter <code>--color-popover</code> surface against the page bg. Position via Floating UI / equivalent.'
	],

	example: `<script lang="ts">
	import { Popover, PopoverTrigger, PopoverContent } from '@dashfi/svelte/ui/popover';
	import { Button } from '@dashfi/svelte/ui/button';
<\/script>

<Popover>
\t<PopoverTrigger>
\t\t{#snippet child({ props })}
\t\t\t<Button variant="outline" {...props}>Filter</Button>
\t\t{/snippet}
\t</PopoverTrigger>
\t<PopoverContent>
\t\t<div>Filter by tier</div>
\t\t<div>Debit · Corporate · Net 60</div>
\t</PopoverContent>
</Popover>`,

	accessibility: [
		'bits-ui Popover owns focus management — focus moves inside on open, restores on close.',
		'Esc closes; click-outside closes; both can be intercepted via <code>onEscapeKeydown</code> / <code>onInteractOutside</code>.',
		'Trigger is a real Button — fully keyboard-accessible and announced.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). 288px Portal-rendered panel — bg-popover rounded-xl p-4 shadow-lg. No border. z-[60] above tooltips. Open/close animations are fade + zoom-95 + side-aware slide-in.'
		}
	]
};
