import type { ComponentSpec } from '../types.js';

/**
 * Collapsible — unstyled bits-ui disclosure primitive.
 *
 * No styling, no animation, no chevron — caller styles every part.
 * Building block for accordions and disclosure UI.
 */
export const collapsible: ComponentSpec = {
	slug: 'collapsible',
	name: 'Collapsible',
	category: 'Navigation',
	status: 'beta',
	importPath:
		"import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@dashfi/svelte/ui/collapsible'",
	description:
		'Show/hide a single content block. Unstyled bits-ui primitive — caller styles every part. Building block for accordions and disclosure UI.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/collapsible/',

	dimensions: [
		{
			name: 'All three parts',
			value: 'unstyled bits-ui primitives',
			notes: 'Collapsible, CollapsibleTrigger, CollapsibleContent — caller controls every dimension.'
		}
	],

	tokens: [
		{
			name: 'Chrome',
			notes: 'No tokens. Collapsible is logic-only; visual treatment is caller responsibility.'
		}
	],

	composition: [
		'For inline show-more affordances. For full disclosure rows with a divider, use Accordion.',
		'Bind <code>open</code> for controlled state.',
		'Use <code>CollapsibleTrigger</code> with the <code>child</code> render-prop snippet to compose with a custom element such as a Button.'
	],

	nonFeatures: [
		'No styling, no animation, no chevron — all caller responsibility.',
		'No multi-item / group mode — Collapsible is single-block. For multi-block disclosure use Accordion.',
		'No heading wrapper for the trigger.'
	],

	props: [
		{
			name: 'Collapsible.open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Whether the content is currently expanded.'
		},
		{
			name: 'Collapsible.onOpenChange',
			type: '(open: boolean) => void',
			description: 'Fired when the open state changes.'
		},
		{
			name: 'Collapsible.disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the trigger.'
		},
		{
			name: 'CollapsibleTrigger.child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-prop snippet to compose the trigger with a custom element such as a Button.'
		},
		{
			name: 'CollapsibleContent.forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting when closed — useful for animated transitions.'
		}
	],

	porting: [
		'Unstyled disclosure primitive — <code>data-state="open" / "closed"</code> on the root drives show/hide.',
		'Replace bits-ui with your stack\'s disclosure primitive; preserve the data-state contract for caller styling.'
	],

	example: `<script lang="ts">
	import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@dashfi/svelte/ui/collapsible';
<\/script>

<Collapsible>
	<CollapsibleTrigger>Show details</CollapsibleTrigger>
	<CollapsibleContent>...</CollapsibleContent>
</Collapsible>`,

	accessibility: [
		'<code>aria-expanded</code> + <code>aria-controls</code> wired via bits-ui Collapsible primitives.',
		'Trigger is keyboard-activatable via Space / Enter.',
		'For accordion-like patterns with headings, wrap the trigger in a heading element at the call site or use <code>Accordion</code> instead.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Unstyled bits-ui Collapsible — caller styles every part.'
		}
	]
};
