import type { ComponentSpec } from '../types.js';

/**
 * Radio Group — single-option selection within a group.
 *
 * 16px round, 1px --color-input border, 8px --color-primary dot indicator.
 * Built on bits-ui's RadioGroup.Root / RadioGroup.Item.
 */
export const radioGroup: ComponentSpec = {
	slug: 'radio-group',
	name: 'Radio Group',
	category: 'Inputs',
	status: 'stable',
	importPath: "import { RadioGroup, RadioGroupItem } from '@dashfi/svelte/ui/radio-group'",
	description: 'Single-option selection within a group. Keyboard-navigable.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/radio-group/',

	dimensions: [
		{
			name: 'RadioGroup (wrapper)',
			value: 'grid, 12px vertical gap',
			tw: 'grid gap-3',
			notes: 'No padding or visual surface — purely a focus / state container.'
		},
		{
			name: 'RadioGroupItem',
			value: '16px square',
			tw: 'size-4 aspect-square rounded-full border shadow-xs',
			notes: '1px border.'
		},
		{
			name: 'Indicator',
			value: '8px lucide Circle',
			tw: 'size-2',
			notes:
				'Filled, centred via `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`. Only visible when item is checked.'
		}
	],

	tokens: [
		{
			name: 'Border',
			token: { cssVar: '--color-input', light: '#c0cecd', dark: '#1e2928' },
			notes: 'The same hairline tone as Input borders. Stays the same colour in both checked and unchecked states.'
		},
		{
			name: 'Background',
			notes: 'Transparent in light mode. In dark mode `bg-input/30` (semi-transparent `--color-input`).'
		},
		{
			name: 'Indicator fill',
			token: { cssVar: '--color-primary', light: '#24251d', dark: '#ffffff' },
			notes: "Via the icon's `fill-primary` class."
		},
		{
			name: 'Focus ring',
			notes:
				'3px (`focus-visible:ring-[3px]`) in `--color-ring` at 50% alpha, plus border switches to `--color-ring`.'
		},
		{ name: 'Shadow', notes: '`shadow-xs` (Tailwind v4 default `0 1px rgb(0 0 0 / 0.05)`).' },
		{
			name: 'Invalid state',
			notes:
				'`aria-invalid` applies `--color-destructive` to border + a destructive-tinted ring at 20% / 40%.'
		},
		{ name: 'Disabled', notes: '`opacity-50` + `cursor-not-allowed`.' }
	],

	composition: [
		'Wrap <code>RadioGroupItem</code>s inside <code>RadioGroup</code>. The group holds <code>value</code>, the items declare their <code>value</code> + <code>id</code>.',
		'Pair each item with a sibling <code>&lt;Label for="…"&gt;</code> tied by matching <code>id</code>.',
		"The visible control is built on bits-ui's <code>RadioGroup.Item</code> — a <code>&lt;button&gt;</code> with <code>role=\"radio\"</code>."
	],

	nonFeatures: [
		'No <code>label</code> prop on items. Use a sibling <code>&lt;Label&gt;</code>.',
		'No size variants. Always <code>size-4</code> (16px).',
		'No tint variants — the indicator is always <code>--color-primary</code>.',
		'No card / row wrapping baked in. Layout (gap, padding around label) lives at the call site.'
	],

	props: [
		{
			name: 'RadioGroup.value',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Bindable selected value. Matches the value of the active RadioGroupItem.'
		},
		{
			name: 'RadioGroup.name',
			type: 'string',
			description: 'Native form name. All items share this name when wrapped in a form.'
		},
		{
			name: 'RadioGroup.disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables all items in the group.'
		},
		{
			name: 'RadioGroup.orientation',
			type: "'horizontal' | 'vertical'",
			default: "'vertical'",
			description: 'Arrow-key navigation direction.'
		},
		{
			name: 'RadioGroupItem.value',
			type: 'string',
			required: true,
			description: 'The value submitted/bound when this item is selected.'
		},
		{
			name: 'RadioGroupItem.id',
			type: 'string',
			description: 'DOM id — pair with Label for="…" for click-to-focus.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void',
			description: 'All bits-ui RadioGroup.Root props pass through.'
		}
	],

	porting: [
		'16px circle, 1px <code>--color-input</code> border, 8px <code>--color-primary</code> dot indicator (centred) when checked. Group manages selection — items are interchangeable.'
	],

	example: `<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '@dashfi/svelte/ui/radio-group';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

<RadioGroup bind:value={card}>
	<div style="display:flex;gap:8px;align-items:center">
		<RadioGroupItem value="debit" id="debit" />
		<Label for="debit">Debit</Label>
	</div>
	<div style="display:flex;gap:8px;align-items:center">
		<RadioGroupItem value="corporate" id="corp" />
		<Label for="corp">Corporate</Label>
	</div>
</RadioGroup>`,

	accessibility: [
		'Implements WAI-ARIA radio-group. Arrow keys cycle items; selection follows focus.',
		'Each <code>RadioGroupItem</code> needs a unique <code>value</code> and matching label.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy reverified against the EN-XX/design-vnext--sidebar-feature branch — RadioGroupItem\'s canonical class is unchanged: 16px size-4 circle, aspect-square rounded-full border shadow-xs, border-input hairline that switches to --color-ring on focus, with focus-visible:ring-[3px] at --color-ring/50. Indicator is the lucide Circle at size-2 (8px) filled with --color-primary. RadioGroup root remains grid gap-3. v0.3.1\'s anatomy still holds; this row exists for branch-traceability with the other component pages on the regen pass.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-12',
			note: 'Anatomy added: 16px size-4 circle in --color-input border, 8px --color-primary dot indicator, focus ring at 3px in --color-ring/50. Composition rule (group wraps items, each item gets a sibling Label) and explicit non-features. Matches the Input precedent.'
		}
	]
};
