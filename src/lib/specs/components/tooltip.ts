import type { ComponentSpec } from '../types.js';

/**
 * Tooltip — bits-ui Tooltip primitives with Tailwind chrome.
 *
 * Hover-revealed label. Single sentence; never essential information.
 * Inverted surface vs the page — that's the tooltip's signature.
 */
export const tooltip: ComponentSpec = {
	slug: 'tooltip',
	name: 'Tooltip',
	category: 'Feedback',
	status: 'beta',
	importPath:
		"import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@dashfi/svelte/ui/tooltip'",
	description:
		'Hover-revealed label. Inverted surface — bg-primary text-primary-foreground. Single sentence; never essential information.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/tooltip/',

	dimensions: [
		{
			name: 'Content',
			value: '6px radius, 12px horizontal padding, 6px vertical, 12px text',
			tw: 'rounded-md px-3 py-1.5 text-xs'
		},
		{ name: 'Side offset', value: '4px default' },
		{ name: 'Z-index', value: 'z-50' },
		{
			name: 'Animations',
			value: 'fade + zoom-95 + side-aware slide-in',
			tw: 'animate-in fade-in-0 zoom-in-95'
		}
	],

	tokens: [
		{
			name: 'Background',
			token: { cssVar: '--color-primary', light: '#24251d', dark: '#ffffff' },
			notes: 'Inverted from surrounding surface — that is the tooltip signature.'
		},
		{
			name: 'Text',
			token: { cssVar: '--color-primary-foreground', light: '#ffffff', dark: '#000000' }
		}
	],

	composition: [
		'Wrap your app root with <code>TooltipProvider</code> once. Per-tooltip <code>delayDuration</code> / <code>disableHoverableContent</code> overrides are supported.',
		"Use <code>TooltipTrigger</code>'s <code>child</code> snippet to delegate to a custom element (Button, IconButton). Never re-trigger by stacking buttons.",
		'Content goes through a Portal so positioning never gets clipped by ancestor overflow.'
	],

	nonFeatures: [
		'No arrow / caret. Content is rectangular; positioning is the only directional cue.',
		'No multi-line layout helpers. Tooltips are single-sentence affordances.',
		'No interactive content. Use Popover or HoverCard instead.',
		'Never essential information. Tooltip content must duplicate or supplement something visible elsewhere.'
	],

	props: [
		{
			name: 'TooltipProvider.delayDuration',
			type: 'number',
			default: '700',
			description: 'Milliseconds before a tooltip opens after the pointer enters its trigger.'
		},
		{
			name: 'TooltipProvider.skipDelayDuration',
			type: 'number',
			default: '300',
			description: 'When moving between triggers within this many milliseconds, the next tooltip opens immediately.'
		},
		{
			name: 'TooltipProvider.disableHoverableContent',
			type: 'boolean',
			default: 'false',
			description: 'When true, the tooltip content is not hoverable — it closes as soon as the pointer leaves the trigger.'
		},
		{
			name: 'Tooltip.open',
			type: 'boolean',
			bindable: true,
			description: 'Controlled open state. Use bind:open to read or drive visibility.'
		},
		{
			name: 'Tooltip.onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the open state changes.'
		},
		{
			name: 'Tooltip.delayDuration',
			type: 'number',
			description: 'Per-tooltip override for the provider delay.'
		},
		{
			name: 'Tooltip.disableHoverableContent',
			type: 'boolean',
			description: 'Per-tooltip override.'
		},
		{
			name: 'TooltipTrigger.child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-prop pattern for asChild behavior — receives merged props to spread onto your own element.'
		},
		{
			name: 'TooltipContent.side',
			type: "'top' | 'right' | 'bottom' | 'left'",
			default: "'top'",
			description: 'Preferred side of the trigger to render against.'
		},
		{
			name: 'TooltipContent.align',
			type: "'start' | 'center' | 'end'",
			default: "'center'",
			description: 'Alignment of the content along the chosen side.'
		},
		{
			name: 'TooltipContent.sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in pixels between the trigger and the content.'
		},
		{
			name: 'TooltipContent.alignOffset',
			type: 'number',
			default: '0',
			description: 'Offset in pixels along the alignment axis.'
		}
	],

	porting: [
		'<code>--color-primary</code> bg, <code>--color-primary-foreground</code> text, 6px radius, 12/6 padding, 12px type. Position via Floating UI / equivalent.',
		'Provider pattern (TooltipProvider at root) shares timing across the subtree — most stacks have an equivalent.'
	],

	example: `<script lang="ts">
	import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@dashfi/svelte/ui/tooltip';
	import { Button } from '@dashfi/svelte/ui/button';
<\/script>

<TooltipProvider>
\t<Tooltip>
\t\t<TooltipTrigger>
\t\t\t{#snippet child({ props })}
\t\t\t\t<Button variant="outline" {...props}>Daily limit</Button>
\t\t\t{/snippet}
\t\t</TooltipTrigger>
\t\t<TooltipContent>Resets midnight UTC.</TooltipContent>
\t</Tooltip>
</TooltipProvider>`,

	accessibility: [
		'Tooltips show on hover AND keyboard focus — required for keyboard users.',
		'Never put the only copy of essential info in a tooltip.',
		'Wrap your app in <code>&lt;TooltipProvider&gt;</code> once at the root for shared timing.'
	],

	changelog: [
		{
			version: 'v0.5.0 audit',
			date: '2026-07-14',
			note: 'Aligned the animation trace with the shipped class list: animate-in is applied directly, while close-state animation remains state-qualified.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Inverted surface — bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs. No arrow. Portal-rendered. Open/close animate-in/fade-in-0/zoom-in-95 + side-aware slide-in.'
		}
	]
};
