import type { ComponentSpec } from '../types.js';

/**
 * Input — canonical bare `<input>`.
 *
 * Underline-only on the current `EN-XX/design-vnext--sidebar-feature` branch.
 * The bottom border IS the focus indicator.
 */
export const input: ComponentSpec = {
	slug: 'input',
	name: 'Input',
	category: 'Inputs',
	status: 'stable',
	importPath: "import { Input } from '@dashfi/svelte/ui/input'",
	description:
		'Text field. Underline-only — 40px tall, no surrounding border or radius, bottom hairline darkens on focus. Supports masks (for formatted input) and debounced binding (for search).',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/input/input.svelte',

	dimensions: [
		{ name: 'Height', value: '40px', tw: 'h-10', notes: 'Fixed.' },
		{
			name: 'Width',
			value: '100% of parent',
			tw: 'w-full min-w-0',
			notes: 'Constrain at the form-field level.'
		},
		{
			name: 'Padding',
			value: '8px vertical · 0 horizontal',
			tw: 'py-2 px-0',
			notes: 'Text sits flush against the start of the line.'
		},
		{ name: 'Type', value: '14px body sans (Bai Jamjuree)', tw: 'text-sm font-sans' },
		{ name: 'Radius', value: 'none', notes: 'The control has no corners — only a bottom border.' }
	],

	tokens: [
		{
			name: 'Border (bottom only)',
			token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' },
			notes: '1px `border-b`. No top / left / right border.'
		},
		{ name: 'Background', notes: 'transparent (`bg-transparent`). Inherits surface.' },
		{
			name: 'Placeholder',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
		},
		{
			name: 'Focus border',
			token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' },
			notes:
				'Bottom border darkens via `focus-visible:border-foreground`. No ring, no outline — `outline-none` is intentional. The thicker line IS the focus indicator.'
		},
		{ name: 'Shadow', notes: 'none.' },
		{
			name: 'Disabled',
			notes: '`opacity-40` + `cursor-not-allowed`. No alternate fill.'
		},
		{
			name: 'File input',
			notes:
				'When `type="file"`: `file:border-0 file:bg-transparent file:text-sm file:font-medium` on the native button-like picker.'
		},
		{
			name: 'Transition',
			notes: '`transition-colors`. Border animates; geometry does not.'
		}
	],

	composition: [
		'Input is a bare `<input>` element. Pair it with `<Label>` as a sibling — never via a `label` prop. Wire the two with `id` + `for`.',
		'For helper text or validation captions, wrap Label + Input in your own form-field container and place the caption beneath.',
		'The canonical snippet (Label + Input pair) is shown in the Code tab.'
	],

	nonFeatures: [
		'No icon prefix or suffix slot. If you need an affix, build it at the form-field level around the Input — Input itself stays a bare control.',
		'No built-in label. Always compose with `<Label>`.',
		'No background fill. Transparent is load-bearing.',
		'No internal wrapper element. The root IS the `<input>`.',
		'No size variants. Height is fixed at 40px to match the field rhythm across the system.',
		'No corner radius. The control is underline-only — re-implementers must not add `rounded-md`, a full border, or a shadow.',
		'No focus ring. The focus indicator is the darkened bottom border alone.'
	],

	props: [
		{
			name: 'value',
			type: 'string | number | string[]',
			bindable: true,
			description: 'Bindable value. Two-way binding via bind:value.'
		},
		{
			name: 'mask',
			type: 'string | null',
			default: 'null',
			description: 'Pattern string (e.g. "$0,000.00" or "+1 (000) 000-0000"). Powered by a Svelte action.'
		},
		{
			name: 'debounce',
			type: 'number',
			description: 'Delay in milliseconds before value commits — useful for search inputs.'
		},
		{
			name: 'type',
			type: "'text' | 'email' | 'tel' | 'number' | 'password' | 'search' | 'url' | string",
			default: "'text'",
			description: 'Native input type. Drives mobile keyboard variants.'
		},
		{
			name: 'placeholder',
			type: 'string',
			description: 'Native placeholder rendered in muted-foreground.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 40% opacity.'
		},
		{
			name: 'readonly',
			type: 'boolean',
			default: 'false',
			description: 'Native readonly — value is visible but cannot be edited.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLInputElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'oninput',
			type: '(event: Event) => void',
			description: 'Fires after each input change. All native input attributes and events pass through.'
		}
	],

	porting: [
		'The contract is: 40px tall, transparent bg, no corner radius, no surrounding border, bottom-only 1px `--color-input` hairline, no shadow. Focus darkens the bottom line to `--color-foreground` — that is the entire focus treatment.',
		'Tokens (`--color-input`, `--color-foreground`, `--color-muted-foreground`) carry stable values when the Dashbook token sheet is imported.'
	],

	example: `<script lang="ts">
	import { Input } from '@dashfi/svelte/ui/input';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

<div>
\t<Label for="email">Work email</Label>
\t<Input id="email" type="email" placeholder="you@company.com" />
</div>

<!-- With debounce -->
<Input bind:value={query} debounce={250} placeholder="Search transactions" />

<!-- With mask (e.g. currency) -->
<Input mask="$0,000.00" />`,

	accessibility: [
		'Always pair with a `<Label>` or `aria-label`.',
		'Use `type="email"`, `"tel"`, `"number"` appropriately for mobile keyboard variants.',
		'For currency / formatted inputs, also pass `inputmode="decimal"` for the right keyboard.',
		'Focus indicator is the darkened bottom border; visible only on keyboard focus (`:focus-visible`).'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Input is now underline-only: height 40px (h-10, was 36), border-b bottom hairline only (no surrounding border), no rounded-md, no shadow-sm, px-0 horizontal padding. Focus darkens the bottom border to --color-foreground — the jade focus ring is gone. Supersedes v0.3.1.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-12',
			note: 'Anatomy tightened: exact dimensions (h-9 · 36px), padding, radius (--radius-md · 6px), and per-part tokens documented with resolved hex values. Composition rule (bare input + sibling Label) and explicit non-features added. Sets the precedent for tightening other component pages.'
		},
		{
			version: 'v0.3.0',
			date: '2026-05-10',
			note: 'First documented in Dashbook.'
		}
	]
};
