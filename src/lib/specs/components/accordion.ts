import type { ComponentSpec } from '../types.js';

/**
 * Accordion — bits-ui Accordion wrapper.
 *
 * Hairline-bottom rows. ChevronDown rotates 180° on open (200ms).
 * Single or multi-open mode via type prop.
 */
export const accordion: ComponentSpec = {
	slug: 'accordion',
	name: 'Accordion',
	category: 'Navigation',
	status: 'stable',
	importPath:
		"import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@dashfi/svelte/ui/accordion'",
	description:
		'Collapsible content sections. Single or multi-open mode. Hairline-bottom rows; ChevronDown rotates 180° on open.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/accordion/',

	dimensions: [
		{
			name: 'AccordionItem',
			value: 'hairline bottom border',
			tw: 'border-b',
			notes: 'Border in --color-border.'
		},
		{
			name: 'AccordionTrigger',
			value: 'flex-row button with rotating ChevronDown',
			notes: 'Chevron is size-4 (16×16); rotates 180° on open over 200ms.'
		},
		{
			name: 'AccordionContent',
			value: '16px bottom padding',
			tw: 'pt-0 pb-4'
		}
	],

	tokens: [
		{
			name: 'Item separator',
			token: { cssVar: '--color-border', light: '#ebeae5', dark: '#1e2928' }
		},
		{
			name: 'Chevron & text',
			notes: 'currentColor — inherits from the surrounding text color.'
		}
	],

	composition: [
		'<code>Accordion type="single|multiple" &gt; AccordionItem &gt; AccordionTrigger + AccordionContent</code>.',
		'<code>type="single"</code> + <code>collapsible</code> allows closing the open item; <code>type="multiple"</code> allows any number open.',
		'Each AccordionItem requires a unique <code>value</code> string for state tracking.'
	],

	nonFeatures: [
		'No nested rows.',
		'No left-side chevron / icon prefix slot.',
		'No animation customisation beyond the default 200ms chevron rotation.',
		'No icon swap on open (only rotation).'
	],

	props: [
		{
			name: 'Accordion.type',
			type: "'single' | 'multiple'",
			required: true,
			description: 'Single allows one item open at a time; multiple allows any number.'
		},
		{
			name: 'Accordion.value',
			type: 'string | string[]',
			bindable: true,
			description: 'Open item value(s). String when type is "single", string[] when "multiple".'
		},
		{
			name: 'Accordion.onValueChange',
			type: '(value: string | string[]) => void',
			description: 'Fired when an item opens or closes.'
		},
		{
			name: 'Accordion.collapsible',
			type: 'boolean',
			default: 'false',
			description: 'Only with type="single" — allow closing the currently open item.'
		},
		{
			name: 'Accordion.disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable all items within the accordion.'
		},
		{
			name: 'Accordion.loop',
			type: 'boolean',
			default: 'true',
			description: 'Whether keyboard navigation wraps around at the ends.'
		},
		{
			name: 'Accordion.orientation',
			type: "'horizontal' | 'vertical'",
			default: "'vertical'",
			description: 'Layout orientation. Affects arrow-key navigation direction.'
		},
		{
			name: 'AccordionItem.value',
			type: 'string',
			required: true,
			description: 'Unique value identifying this item.'
		},
		{
			name: 'AccordionItem.disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable this individual item.'
		},
		{
			name: 'AccordionTrigger.level',
			type: '1 | 2 | 3 | 4 | 5 | 6',
			default: '3',
			description: 'Heading level for the surrounding accessible header element.'
		},
		{
			name: 'AccordionContent.forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting when closed — useful for animated transitions.'
		}
	],

	porting: [
		'bits-ui Accordion with hairline-bottom items and rotating ChevronDown.',
		'Replace bits-ui with your stack\'s disclosure primitive; preserve the heading-level wrapper, single/multiple modes, and ChevronDown rotation.'
	],

	example: `<script lang="ts">
	import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@dashfi/svelte/ui/accordion';
<\/script>

<Accordion type="single" value="overview">
	<AccordionItem value="overview">
		<AccordionTrigger>How does Dash.fi work?</AccordionTrigger>
		<AccordionContent>Charge card with built-in audit agents.</AccordionContent>
	</AccordionItem>
</Accordion>`,

	accessibility: [
		'Trigger is wrapped in a heading element at <code>level</code> (default h3) for proper outline.',
		'<code>aria-expanded</code> + <code>aria-controls</code> wired via bits-ui Accordion primitives.',
		'Keyboard: Arrow keys navigate items, Enter/Space toggles, Home/End jump to first/last.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Hairline-bottom rows; size-4 ChevronDown rotates 180° in 200ms.'
		}
	]
};
