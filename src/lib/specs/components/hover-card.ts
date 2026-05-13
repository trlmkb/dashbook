import type { ComponentSpec } from '../types.js';

/**
 * Hover Card — bits-ui LinkPreview wrapper.
 *
 * Floating card on hover or focus. Richer than a Tooltip, lighter than a
 * Popover — use for previews, mini-profiles, link expansions.
 */
export const hoverCard: ComponentSpec = {
	slug: 'hover-card',
	name: 'Hover Card',
	category: 'Feedback',
	status: 'beta',
	importPath:
		"import { HoverCard, HoverCardTrigger, HoverCardContent } from '@dashfi/svelte/ui/hover-card'",
	description:
		'Floating card on hover or focus. 256px panel — 1px border, 16px padding, shadow-md. Richer than a Tooltip, lighter than a Popover.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/hover-card/',

	dimensions: [
		{
			name: 'Content',
			value: '256px wide, 16px padding',
			tw: 'w-64 border p-4 shadow-md',
			notes: 'Tailwind v4 <code>shadow-md</code> = <code>0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)</code>.'
		},
		{ name: 'Side offset', value: '4px default', notes: 'Align defaults to <code>center</code>.' },
		{ name: 'Z-index', value: 'z-50' },
		{ name: 'Open / close', value: 'Svelte <code>flyAndScale</code> transition (default)' },
		{ name: 'Timing', value: 'openDelay 700ms, closeDelay 300ms' }
	],

	tokens: [
		{
			name: 'Background',
			token: { cssVar: '--color-popover', light: '#ffffff', dark: '#141a19' }
		},
		{
			name: 'Text',
			token: { cssVar: '--color-popover-foreground', light: '#123b39', dark: '#ffffff' }
		},
		{
			name: 'Border',
			token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' },
			notes: '1px <code>border-border</code>.'
		}
	],

	composition: [
		'Use for previews, mini-profiles, link expansions — richer than a Tooltip, lighter than a Popover.',
		'Triggers on hover AND focus (keyboard-accessible).',
		"Use the trigger's <code>child</code> snippet to delegate to a Button (typically <code>variant=\"link\"</code>)."
	],

	nonFeatures: [
		'No interaction with content — for that, use Popover.',
		'No essential information — hover affordances can be missed.',
		'Not for tooltips. Single-line label content belongs in Tooltip.',
		'No arrow / caret.'
	],

	props: [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Controlled open state. Bind with bind:open or use onOpenChange to track.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the card opens or closes.'
		},
		{
			name: 'openDelay',
			type: 'number',
			default: '700',
			description: 'Milliseconds to wait after hover/focus before the card opens.'
		},
		{
			name: 'closeDelay',
			type: 'number',
			default: '300',
			description: 'Milliseconds to wait after pointer leaves before the card closes.'
		},
		{
			name: 'HoverCardContent.align',
			type: "'start' | 'center' | 'end'",
			default: "'center'",
			description: 'Alignment of the content relative to the trigger along the chosen side.'
		},
		{
			name: 'HoverCardContent.sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in pixels between the trigger and the content.'
		},
		{
			name: 'HoverCardContent.transition',
			type: '(node: Element, params?: unknown) => TransitionConfig',
			default: 'flyAndScale',
			description: 'Svelte transition function applied on mount/unmount.'
		},
		{
			name: 'HoverCardContent.transitionConfig',
			type: 'TransitionConfig',
			description: 'Parameters forwarded to the transition function.'
		},
		{
			name: 'HoverCardTrigger',
			type: 'Component',
			description: 'Re-exported from bits-ui LinkPreview.Trigger. Use the child snippet to render a custom element.'
		}
	],

	porting: [
		'256px-wide bordered panel — 1px border, 16px padding, <code>shadow-md</code>, fade-scale animation, hover-+-focus trigger.'
	],

	example: `<script lang="ts">
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '@dashfi/svelte/ui/hover-card';
	import { Button } from '@dashfi/svelte/ui/button';
<\/script>

<HoverCard>
\t<HoverCardTrigger>
\t\t{#snippet child({ props })}
\t\t\t<Button variant="link" {...props}>@dashfi</Button>
\t\t{/snippet}
\t</HoverCardTrigger>
\t<HoverCardContent>
\t\t<strong>Dash.fi</strong>
\t\t<p>The corporate charge card built for high-spend advertisers.</p>
\t</HoverCardContent>
</HoverCard>`,

	accessibility: [
		'Triggers on hover AND keyboard focus — required for keyboard users.',
		'Never put essential information in a HoverCard — it should always supplement, never replace.',
		'Open / close delays (700 / 300ms by default) prevent accidental flashes.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). 256px panel — bg-popover border p-4 shadow-md. Hover + focus triggered, 700ms open delay / 300ms close delay, Svelte flyAndScale animation.'
		}
	]
};
