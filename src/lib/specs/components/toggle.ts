import type { ComponentSpec } from '../types.js';

/**
 * Toggle — single press-on/press-off button.
 *
 * bits-ui Toggle wrapped with a 2-variant × 3-size tv() matrix. Pressed
 * state via data-state="on" swaps to bg-accent. NOT a Switch (binary
 * on/off setting) — Toggle is press-to-activate (e.g., bold in a rich
 * text editor).
 */
export const toggle: ComponentSpec = {
	slug: 'toggle',
	name: 'Toggle',
	category: 'Inputs',
	status: 'stable',
	importPath: "import { Toggle } from '@dashfi/svelte/ui/toggle'",
	description:
		'Single press-on/press-off button. Same hit target as Button, different state model — tracks a pressed state via data-state="on".',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/toggle/toggle.svelte',

	dimensions: [
		{
			name: 'Body',
			value: 'inline-flex, 14px medium text, 16px Lucide glyph slot',
			tw: 'inline-flex items-center justify-center gap-2 text-sm font-medium',
			notes: '<code>[&_svg]:size-4</code> auto-sizes child Lucide icons.'
		}
	],

	tokens: [
		{
			name: 'Hover background',
			token: { cssVar: '--color-muted', light: '#eceae0', dark: '#181e1d' }
		},
		{
			name: 'Pressed background',
			token: { cssVar: '--color-accent', light: '#eceae0', dark: '#181e1d' },
			notes: '<code>data-[state=on]</code>.'
		},
		{
			name: 'Pressed text',
			token: { cssVar: '--color-accent-foreground', light: '#123b39', dark: '#ffffff' }
		},
		{
			name: 'Outline border',
			token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' },
			notes: 'Outline variant only.'
		},
		{
			name: 'Focus ring',
			token: { cssVar: '--color-ring', light: '#2b605c', dark: '#5bb8b0' }
		},
		{ name: 'Disabled', notes: '<code>opacity-50</code> + <code>pointer-events-none</code>.' }
	],

	variants: [
		{
			name: 'default',
			description: 'Transparent surface. Hover muted, pressed accent.',
			tokens: [
				{ name: 'Background (rest)', notes: 'transparent (<code>bg-transparent</code>).' },
				{
					name: 'Hover',
					token: { cssVar: '--color-muted', light: '#eceae0', dark: '#181e1d' },
					notes: 'Hover text uses <code>--color-muted-foreground</code>.'
				},
				{
					name: 'Pressed',
					token: { cssVar: '--color-accent', light: '#eceae0', dark: '#181e1d' },
					notes: 'Text becomes <code>--color-accent-foreground</code>.'
				}
			]
		},
		{
			name: 'outline',
			description: 'Hairline border + shadow-sm. Hover swaps to accent.',
			tokens: [
				{
					name: 'Border',
					token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' },
					notes: '<code>border-input border</code>, <code>bg-transparent</code>, <code>shadow-sm</code>.'
				},
				{
					name: 'Hover',
					token: { cssVar: '--color-accent', light: '#eceae0', dark: '#181e1d' },
					notes: 'Hover text <code>--color-accent-foreground</code>.'
				}
			]
		}
	],

	sizes: [
		{ name: 'sm', height: '32px', padding: '8px horizontal', notes: '<code>h-8 min-w-8 px-2</code>.' },
		{
			name: 'default',
			height: '36px',
			padding: '12px horizontal',
			notes: '<code>h-9 min-w-9 px-3</code>.'
		},
		{ name: 'lg', height: '40px', padding: '12px horizontal', notes: '<code>h-10 min-w-10 px-3</code>.' }
	],

	composition: [
		'Bind <code>pressed</code> for two-way state. Compose label + icon as children of the trigger.',
		'Use for rich-text-editor affordances (bold, italic, underline). For a binary on/off setting use <code>Switch</code>.',
		'Pair with <code>ToggleGroup</code> for segmented-control patterns.'
	],

	nonFeatures: [
		'Not a Switch — Toggle is press-to-activate. Switch is a binary on/off setting.',
		'No label slot. Compose label + icon as children of the trigger.',
		'No destructive variant.',
		'No loading state. Pair with Spinner if you need busy UI.'
	],

	props: [
		{
			name: 'pressed',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Bindable pressed state. Two-way binding via bind:pressed.'
		},
		{
			name: 'variant',
			type: "'default' | 'outline'",
			default: "'default'",
			description: 'Visual variant. Outline adds a hairline border + shadow.'
		},
		{
			name: 'size',
			type: "'default' | 'sm' | 'lg'",
			default: "'default'",
			description: 'Size token. Heights: sm h-8, default h-9, lg h-10.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 50% opacity.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Toggle content. Can include Lucide icons.'
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
			name: 'onPressedChange',
			type: '(pressed: boolean) => void',
			description: 'Fires when the pressed state changes. All bits-ui Toggle.Root props pass through.'
		}
	],

	porting: [
		'bits-ui Toggle wrapped with a 2-variant × 3-size <code>tv()</code> matrix. Pressed state via <code>data-state="on"</code> swaps to <code>bg-accent</code>.',
		'Switch (binary on/off) and Toggle (press-to-activate button) are two different canonical components — do not conflate when re-implementing.'
	],

	example: `<script lang="ts">
	import { Toggle } from '@dashfi/svelte/ui/toggle';
	import Bold from '@lucide/svelte/icons/bold';

	let pressed = $state(false);
<\/script>

<Toggle bind:pressed>
\t<Bold size={14} />
\tBold
</Toggle>`,

	accessibility: [
		'Built on bits-ui Toggle — has <code>aria-pressed</code> wired correctly.',
		'Compose icon + visible label for non-icon-only triggers; pure-icon Toggles need <code>aria-label</code>.',
		'Focus ring uses <code>--color-ring</code> on <code>focus-visible</code> only — mouse clicks do not show the ring.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). 2-variant × 3-size tv() matrix (default/outline × sm/default/lg). Pressed state via data-state="on" swaps to bg-accent.'
		}
	]
};
