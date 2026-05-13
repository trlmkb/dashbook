import type { ComponentSpec } from '../types.js';

export const label: ComponentSpec = {
	slug: 'label',
	name: 'Label',
	category: 'Inputs',
	status: 'stable',
	importPath: "import { Label } from '@dashfi/svelte/ui/label'",
	description:
		'Form label that pairs with any input via for/id. Required for screen-reader-friendly forms. Eyebrow style — 12px uppercase tracked.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/label/label.svelte',

	dimensions: [
		{
			name: 'Type',
			value: '12px, weight 500, uppercase, tracking-wider',
			tw: 'text-xs font-medium tracking-wider uppercase',
			notes:
				'The label is an eyebrow — mono-uppercase by default, not body sans. tracking-wider ≈ 0.05em letter-spacing.'
		},
		{
			name: 'Layout',
			value: 'flex row, 8px gap',
			tw: 'flex items-center gap-2',
			notes:
				'The label is a flex row so adornments (e.g. info icons, badges) sit inline at 8px gap.'
		},
		{
			name: 'Element',
			value: '<label> via bits-ui Label.Root',
			notes: 'No wrapper div.'
		},
		{
			name: 'Padding',
			value: 'none',
			notes:
				'The label sits flush; spacing relative to the input lives at the form-field level.'
		},
		{
			name: 'Selection',
			value: 'disabled',
			tw: 'select-none',
			notes: 'The label cannot be text-selected.'
		}
	],

	tokens: [
		{
			name: 'Colour',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' },
			notes: 'The label is intentionally quieter than the input value.'
		},
		{
			name: 'Peer-disabled state',
			notes:
				'When the paired input has `disabled` and uses the `peer` class, the label becomes `opacity-40` + `cursor-not-allowed`.'
		},
		{
			name: 'Group-disabled state',
			notes:
				'Inside a `group` with `data-disabled="true"`, the label becomes `opacity-40` + `pointer-events-none`.'
		}
	],

	composition: [
		'Pair with any input via matching <code>for</code> / <code>id</code>: <code>&lt;Label for="email"&gt;Email&lt;/Label&gt; &lt;Input id="email" /&gt;</code>.',
		'For form-field layout, wrap Label + Input + helper in a column-flex container. The underline Input shape means labels can sit close to the input — 6px is a common gap.',
		'For inline pairing (e.g. Checkbox row), the Label can sit to the right of the input with <code>flex items-center gap-2</code> at the parent.',
		"Add inline adornments (icons, hint text, status badges) directly as children — the label's own flex row handles spacing."
	],

	nonFeatures: [
		'No <code>required</code> indicator. Add an asterisk or status badge inline as a child.',
		'No <code>helper</code> / caption slot. Helper text is a separate sibling under the input.',
		'No size variants. Always <code>text-xs</code> uppercase tracked.',
		'No body-sans variant. The label is the eyebrow style itself — if you need a body-sans label, render plain text rather than this component.'
	],

	props: [
		{
			name: 'for',
			type: 'string',
			description: 'ID of the associated input. Clicking the label focuses that input.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Label text content.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLLabelElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onclick',
			type: '(event: MouseEvent) => void',
			description: 'All bits-ui Label.Root props and native label attributes pass through.'
		}
	],

	porting: [
		'12px weight-500 uppercase with <code>tracking-wider</code> letter-spacing, coloured <code>--color-muted-foreground</code>. Rendered as a flex row (<code>items-center gap-2</code>) so inline adornments work without wrappers. <code>for</code>/<code>htmlFor</code> wires to the input.'
	],

	example: `<script lang="ts">
	import { Label } from '@dashfi/svelte/ui/label';
	import { Input } from '@dashfi/svelte/ui/input';
<\/script>

<div class="space-y-1.5">
\t<Label for="email">Work email</Label>
\t<Input id="email" type="email" placeholder="you@company.com" />
</div>`,

	accessibility: [
		'The <code>for</code> attribute must match the input\'s <code>id</code>.',
		'Clicking the label focuses the associated input.',
		'Use <code>aria-label</code> on the input only if a visible label is not appropriate.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Label is now an eyebrow by default — text-xs font-medium tracking-wider uppercase coloured --color-muted-foreground, rendered as flex items-center gap-2 with select-none. Previously it was 14px body sans inheriting colour. Peer-disabled / group-disabled states switch to opacity-40. The previous v0.3.1 anatomy referenced a stale branch and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-13',
			note: 'Anatomy added: text-sm font-medium leading-none, inherits colour, peer-disabled state opacity-70. Composition rule (sibling to input with for/id) and explicit non-features (no required indicator, no helper slot, no size variants, no eyebrow variant — use .section-header). Matches the Input precedent.'
		}
	]
};
