import type { ComponentSpec } from '../types.js';

/**
 * Toggle Group — group of Toggles bound together.
 *
 * bits-ui ToggleGroup with shared Toggle context. type drives single vs
 * multiple selection. Use for segmented controls (text alignment, sort
 * direction, view mode).
 */
export const toggleGroup: ComponentSpec = {
	slug: 'toggle-group',
	name: 'Toggle Group',
	category: 'Inputs',
	status: 'stable',
	importPath:
		"import { ToggleGroup, ToggleGroupItem } from '@dashfi/svelte/ui/toggle-group'",
	description:
		'Group of toggles bound together — single or multi-select. Segmented-control pattern. Shared size/variant via Svelte context.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/toggle-group/',

	dimensions: [
		{
			name: 'Root',
			value: 'flex row, 4px gap',
			tw: 'flex items-center justify-center gap-1'
		},
		{
			name: 'Items',
			value: "inherit Toggle's dimensions",
			notes: 'Size and variant flow from the root via Svelte context — no need to pass per-item.'
		}
	],

	tokens: [
		{
			name: 'Pressed background',
			token: { cssVar: '--color-accent', light: '#f1efea', dark: '#191f1d' },
			notes: 'Identical to a lone Toggle.'
		},
		{
			name: 'Pressed text',
			token: { cssVar: '--color-accent-foreground', light: '#123b38', dark: '#ffffff' }
		}
	],

	composition: [
		'<code>ToggleGroup type="single|multiple" &gt; ToggleGroupItem*</code>. Set <code>size</code> and <code>variant</code> on the root; children inherit via Svelte context.',
		'Use for segmented controls (text alignment, sort direction, view mode).',
		'Bind <code>value</code> — string for <code>type="single"</code>, string[] for <code>type="multiple"</code>.'
	],

	nonFeatures: [
		'No equal-width sizing — caller controls each item.',
		'No connected pill / segmented background. Items are independent buttons separated by gap.',
		'No required-selection enforcement. Caller validates if needed.'
	],

	props: [
		{
			name: 'type',
			type: "'single' | 'multiple'",
			required: true,
			description: "Selection mode. 'single' binds a string, 'multiple' binds a string array."
		},
		{
			name: 'value',
			type: 'string | string[]',
			bindable: true,
			description: 'Selected value(s). String for type="single", array for type="multiple".'
		},
		{
			name: 'variant',
			type: "'default' | 'outline'",
			default: "'default'",
			description: 'Visual variant shared by all items via context.'
		},
		{
			name: 'size',
			type: "'default' | 'sm' | 'lg'",
			default: "'default'",
			description: 'Size token shared by all items via context.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the whole group.'
		},
		{
			name: 'onValueChange',
			type: '(value: string | string[]) => void',
			description: 'Fires when selection changes. Bits-ui ToggleGroup root attributes pass through.'
		},
		{
			name: 'ToggleGroupItem.value',
			type: 'string',
			required: true,
			description: 'The value contributed to the group when this item is pressed.'
		},
		{
			name: 'ToggleGroupItem.disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables this individual item.'
		},
		{
			name: 'ToggleGroupItem.variant',
			type: "'default' | 'outline'",
			description: 'Per-item override. Falls back to group context.'
		},
		{
			name: 'ToggleGroupItem.size',
			type: "'default' | 'sm' | 'lg'",
			description: 'Per-item override. Falls back to group context.'
		},
		{
			name: 'ToggleGroupItem.restProps',
			type: 'ToggleGroupPrimitive.ItemProps',
			description: 'All bits-ui ToggleGroup.Item attributes and native button events pass through.'
		}
	],

	porting: [
		'bits-ui ToggleGroup with shared Toggle context. <code>type</code> drives single vs multiple selection.',
		'Reuse the Toggle implementation — Group is just a flex row that distributes size/variant via context.'
	],

	example: `<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '@dashfi/svelte/ui/toggle-group';

	let align = $state('left');
<\/script>

<ToggleGroup type="single" bind:value={align}>
\t<ToggleGroupItem value="left">Left</ToggleGroupItem>
\t<ToggleGroupItem value="center">Center</ToggleGroupItem>
\t<ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`,

	accessibility: [
		'bits-ui ToggleGroup manages the group keyboard model — arrow keys navigate between items.',
		'Set <code>aria-label</code> on the group root for screen-reader context.',
		'For icon-only items inside the group, give each Item an <code>aria-label</code>.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Flex row of Toggle items, 4px gap. Shared size/variant via Svelte context. Single or multiple selection.'
		}
	]
};
