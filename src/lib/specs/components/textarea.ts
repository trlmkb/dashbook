import type { ComponentSpec } from '../types.js';

export const textarea: ComponentSpec = {
	slug: 'textarea',
	name: 'Textarea',
	category: 'Inputs',
	status: 'stable',
	importPath: "import { Textarea } from '@dashfi/svelte/ui/textarea'",
	description: 'Multiline text input. Same underline-only border + focus treatment as Input.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/textarea/textarea.svelte',

	dimensions: [
		{
			name: 'Min height',
			value: '96px',
			tw: 'min-h-24',
			notes: 'Auto-grows via `field-sizing-content` (Chrome 123+/Firefox 124+).'
		},
		{ name: 'Width', value: '100% of parent', tw: 'w-full' },
		{
			name: 'Padding',
			value: '0px horizontal · 8px vertical',
			tw: 'px-0 py-2',
			notes: 'No horizontal padding — the underline runs the full width.'
		},
		{
			name: 'Type',
			value: '14px',
			tw: 'text-sm',
			notes: 'Native sans (Bai Jamjuree). No responsive bump.'
		},
		{ name: 'Radius', value: 'none', notes: 'The element has no rounded corners.' },
		{
			name: 'Resize handle',
			value: 'disabled',
			tw: 'resize-none',
			notes: 'Manual resize is disabled — growth is driven by `field-sizing-content` only.'
		}
	],

	tokens: [
		{
			name: 'Border (bottom only)',
			token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' },
			notes: '1px `border-b`. Same underline-only shape as Input and Select trigger.'
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
				'Bottom border darkens via `focus-visible:border-foreground`. Native outline removed. No ring, no shadow change.'
		},
		{ name: 'Disabled', notes: '`opacity-40` + `cursor-not-allowed`.' },
		{ name: 'Transition', notes: '`transition-colors`. Only border colour animates.' }
	],

	composition: [
		'Bare <code>&lt;textarea&gt;</code>. Pair with sibling <code>&lt;Label&gt;</code>.',
		'Set initial visible row count via <code>rows={4}</code> — height grows beyond that via <code>field-sizing-content</code>.',
		'For character / word counters, render adjacent to the textarea, not inside.',
		'The underline shape means Textarea slots into the same form field rhythm as Input and Select without horizontal alignment mismatch.'
	],

	nonFeatures: [
		'No <code>label</code> prop. Use sibling <code>&lt;Label&gt;</code>.',
		'No <code>maxLength</code> / counter UI. Pass <code>maxlength</code> attribute; render count externally.',
		'No full border, no radius, no shadow. The textarea is an underline field — same shape language as Input.',
		'No invalid-state ring. <code>aria-invalid</code> styling is not baked in; apply at the call site if needed.',
		'No size variants.',
		'No internal wrapper. Root <em>is</em> the <code>&lt;textarea&gt;</code>.'
	],

	props: [
		{
			name: 'value',
			type: 'string',
			bindable: true,
			description: 'Bindable value. Two-way binding via bind:value.'
		},
		{
			name: 'placeholder',
			type: 'string',
			description: 'Native placeholder rendered in muted-foreground.'
		},
		{
			name: 'rows',
			type: 'number',
			description: 'Initial visible row count. Height auto-grows with content via field-sizing.'
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
			type: 'HTMLTextAreaElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'oninput',
			type: '(event: Event) => void',
			description: 'All native textarea attributes and events pass through.'
		}
	],

	porting: [
		'Underline-only textarea: <code>min-h-24</code> (96px) auto-growing via <code>field-sizing-content</code>, <code>w-full</code>, <code>border-b</code> in <code>--color-input</code>, <code>bg-transparent</code>, <code>px-0 py-2</code>, <code>text-sm</code>, <code>resize-none</code>. Focus flips the bottom border to <code>--color-foreground</code>. No radius, no full border, no shadow, no ring. Mirrors Input shape exactly.'
	],

	example: `<script lang="ts">
	import { Textarea } from '@dashfi/svelte/ui/textarea';
<\/script>

<Textarea bind:value={note} placeholder="Internal note..." rows={4} />`,

	accessibility: [
		'Always pair with a `<Label>` or `aria-label`.',
		'Use `readonly` to display non-editable values; use `disabled` to indicate the field is not currently usable.',
		'Focus indicator is the darkened bottom border; visible only on keyboard focus (`:focus-visible`).'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Textarea moved to the underline-only shape used by Input and Select trigger: border-b in --color-input, no full border, no radius, no shadow, px-0 py-2, text-sm, resize-none, min-h-24 (96px, was min-h-16 64px). Focus flips the bottom border to --color-foreground — no ring, no box-shadow. The previous v0.3.1 anatomy referenced a stale branch and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-13',
			note: 'Anatomy added: min-h-16 (64px) auto-growing via field-sizing-content, px-3 py-2, text-base md:text-sm, 1px --color-input border (same as Input) but with a 3px ring at 50% alpha on focus and shadow-xs (lighter than Input\'s shadow-sm). Composition rule (bare textarea + sibling Label) and explicit non-features. Matches the Input precedent.'
		}
	]
};
