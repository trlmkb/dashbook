import type { ComponentSpec } from '../types.js';

/**
 * Checkbox — boolean input with square corners.
 *
 * 16px square, square corners (no radius), 1px --color-primary border,
 * lucide Check or Minus glyph in --color-primary-foreground when checked.
 */
export const checkbox: ComponentSpec = {
	slug: 'checkbox',
	name: 'Checkbox',
	category: 'Inputs',
	status: 'stable',
	importPath: "import { Checkbox } from '@dashfi/svelte/ui/checkbox'",
	description: 'Boolean input with checked / unchecked / indeterminate states.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/checkbox/checkbox.svelte',

	dimensions: [
		{
			name: 'Size',
			value: '16px square',
			tw: 'size-4',
			notes:
				'`box-content` so the border sits outside the 16px box (visible total ≈ 18px including the 1px border on each side).'
		},
		{
			name: 'Radius',
			value: 'none',
			notes: 'The control has square corners — the canonical class has no `rounded-*` token.'
		},
		{
			name: 'Border',
			value: '1px',
			tw: 'border',
			notes:
				'In `--color-primary` — light `#25261d`, dark `#ffffff`. The border colour does *not* change between unchecked and checked states.'
		},
		{
			name: 'Check glyph',
			value: '16px lucide Check or Minus',
			tw: 'size-4',
			notes:
				'Transparent when unchecked, `--color-primary-foreground` when checked. 16px lucide `Minus` when indeterminate.'
		},
		{
			name: 'Transition',
			value: 'colors',
			tw: 'transition-colors',
			notes: 'Fill / glyph animate; geometry does not.'
		}
	],

	tokens: [
		{
			name: 'Unchecked',
			notes: 'bg transparent (`bg-transparent`), border `--color-primary`, check glyph transparent.'
		},
		{
			name: 'Checked',
			token: { cssVar: '--color-primary', light: '#24251d', dark: '#ffffff' },
			notes:
				'bg `--color-primary` via `data-[state=checked]:bg-primary`, glyph `--color-primary-foreground` (light `#ffffff`, dark `#000000`).'
		},
		{
			name: 'Indeterminate',
			notes: 'bg unchanged from unchecked, glyph swaps from `Check` to `Minus` (always visible in `currentColor`).'
		},
		{
			name: 'Focus ring',
			token: { cssVar: '--color-ring', light: '#2b5f5b', dark: '#46b9af' },
			notes:
				'1px (`focus-visible:ring-1`) with `focus-visible:outline-none` on the native outline. Keyboard focus only.'
		},
		{ name: 'Shadow', notes: 'none on this branch. The class has no `shadow-*` token.' },
		{
			name: 'Disabled',
			notes:
				'`opacity-40` + `cursor-not-allowed`. Both `:disabled` and `data-[disabled=true]` apply the same.'
		}
	],

	composition: [
		'Render alongside a sibling <code>&lt;Label for="…"&gt;</code> tied by matching <code>id</code> — never wrap the checkbox in the label, never pass label content as a prop.',
		"The visible control is built on bits-ui's <code>Checkbox.Root</code> — a <code>&lt;button&gt;</code> with <code>role=\"checkbox\"</code> and a hidden form input below."
	],

	nonFeatures: [
		'No <code>label</code> prop. Use <code>&lt;Label&gt;</code> as a sibling.',
		'No size variants.',
		'No tint variants. The control is always <code>--color-primary</code> — checkboxes are not branded.',
		"No card-style wrapping (the rebuild's checkbox uses a popover surface — the canonical does not)."
	],

	props: [
		{
			name: 'checked',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Bindable checked state. Two-way binding via bind:checked.'
		},
		{
			name: 'indeterminate',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Tri-state for "some selected" — renders a minus icon instead of a check.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 40% opacity.'
		},
		{
			name: 'name',
			type: 'string',
			description: 'Native form name. Submits as on/off (or value) when wrapped in a form.'
		},
		{
			name: 'value',
			type: 'string',
			description: 'Value submitted with the form when checked.'
		},
		{
			name: 'id',
			type: 'string',
			description: 'DOM id — pair with Label for="…" for click-to-focus and screen readers.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onCheckedChange',
			type: '(checked: boolean) => void',
			description: 'All bits-ui Checkbox.Root props pass through.'
		}
	],

	porting: [
		'16px box (<code>size-4</code>), square corners (no radius), 1px <code>--color-primary</code> border + 16px check glyph in <code>--color-primary-foreground</code> on a <code>--color-primary</code> fill when checked. No shadow. Keep it monochrome.'
	],

	example: `<script lang="ts">
	import { Checkbox } from '@dashfi/svelte/ui/checkbox';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

let agreed = $state(false);

<div style="display:flex;gap:12px;align-items:center">
	<Checkbox id="terms" bind:checked={agreed} />
	<Label for="terms">I agree to the terms</Label>
</div>`,

	accessibility: [
		'Always pair with a <code>&lt;Label&gt;</code>.',
		'<code>Space</code> toggles. <code>Tab</code> moves focus.',
		'Use Switch instead when the change is committed immediately (e.g., a setting).'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Radius removed — Checkbox now has square corners (canonical class has no rounded-* token); v0.3.1 incorrectly claimed rounded-sm 4px. Shadow removed — canonical has no shadow-* token. Disabled opacity tightened to opacity-40 (was opacity-50) and applies via both :disabled and data-[disabled=true]. Focus treatment confirmed as focus-visible:ring-1 in --color-ring with focus-visible:outline-none. The previous v0.3.1 anatomy referenced a stale branch and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-12',
			note: 'Anatomy added: 16px size-4 box, rounded-sm (4px), 1px --color-primary border that stays the same colour in both states, fill flips to --color-primary when checked, lucide Check / Minus glyph. Composition rule (Label as sibling, never a prop) and explicit non-features. Matches the Input precedent.'
		}
	]
};
