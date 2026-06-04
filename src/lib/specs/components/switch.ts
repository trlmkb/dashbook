import type { ComponentSpec } from '../types.js';

/**
 * Switch — binary on/off control with four sizes.
 *
 * Track flips from --color-muted-foreground/30 to --color-primary on check.
 * Thumb is always --color-background (the surface colour).
 */
export const switchSpec: ComponentSpec = {
	slug: 'switch',
	name: 'Switch',
	category: 'Inputs',
	status: 'stable',
	importPath: "import { Switch } from '@dashfi/svelte/ui/switch'",
	description:
		'Binary on/off control. Larger affordance than a checkbox — for settings, toggles.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/switch/switch.svelte',

	dimensions: [
		{
			name: 'Radius',
			value: 'rounded-full',
			tw: 'rounded-full',
			notes: 'Track and thumb both `rounded-full`.'
		},
		{
			name: 'Border',
			value: '2px transparent on track',
			tw: 'border-2 border-transparent',
			notes: 'Reserves space so the focus ring sits cleanly. Thumb has no border.'
		},
		{
			name: 'Transition',
			value: 'colors + transform',
			notes: 'Track colour animates (`transition-colors`); thumb position animates (`transition-transform`).'
		}
	],

	tokens: [
		{
			name: 'Track unchecked',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' },
			notes: 'At 30% opacity (0.5.0, core #5116). Was --color-input — the new off-state reads more clearly.'
		},
		{
			name: 'Track checked',
			token: { cssVar: '--color-primary', light: '#25261d', dark: '#ffffff' }
		},
		{
			name: 'Thumb',
			token: { cssVar: '--color-background', light: '#faf8f1', dark: '#0f1413' },
			notes: 'Always the surface colour, regardless of state. Shadow `shadow-lg` (Tailwind v4 default) for lift.'
		},
		{
			name: 'Focus ring',
			notes:
				'2px (`focus-visible:ring-2`) in `--color-ring` with 2px offset against `--color-background`.'
		},
		{ name: 'Disabled', notes: '`opacity-50` + `cursor-not-allowed`.' }
	],

	variants: [],

	sizes: [
		{
			name: 'xs',
			notes: 'track 16×28px (`h-4 w-7`), thumb 12px (`size-3`) translating 12px.'
		},
		{
			name: 'sm',
			notes: 'track 20×36px (`h-5 w-9`), thumb 16px (`size-4`) translating 16px.'
		},
		{
			name: 'base',
			notes:
				'track 24×44px (`h-6 w-11`) — default — thumb 20px (`size-5`) translating 20px.'
		},
		{
			name: 'lg',
			notes: 'track 28×48px (`h-7 w-12`), thumb 24px (`size-6`) translating 24px.'
		}
	],

	composition: [
		'Pair with a sibling <code>&lt;Label for="…"&gt;</code> via matching <code>id</code>. The label takes the role of "what this switch toggles".',
		'For settings rows, place Switch right of a label-and-helper-text block: <code>&lt;div&gt;Label + helper&lt;/div&gt; &lt;Switch /&gt;</code>.',
		'Use Switch for settings that <em>commit immediately</em>. Use Checkbox for selections that need a submit step.'
	],

	nonFeatures: [
		'No <code>label</code> prop. Use a sibling <code>&lt;Label&gt;</code>.',
		'No icon inside the thumb. The brand stays minimal — no check / cross glyphs inside the thumb.',
		'No coloured track variants. Track-on is always <code>--color-primary</code> — switches read as state, not as brand.',
		'No loading or async confirmation state. Wrap with your own optimistic / pending logic at the call site.'
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
			name: 'size',
			type: "'xs' | 'sm' | 'base' | 'lg'",
			default: "'base'",
			description: 'Size token. See Anatomy for pixel dimensions.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 50% opacity.'
		},
		{
			name: 'name',
			type: 'string',
			description: 'Native form name. Submits as on/off when wrapped in a form.'
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
			description: 'All bits-ui Switch.Root props pass through.'
		}
	],

	porting: [
		'Track + thumb radii are both <code>rounded-full</code>. Thumb is the surface colour. Track flips from <code>--color-muted-foreground</code> (30%) to <code>--color-primary</code> on check. Thumb translates by <code>(track_width − thumb_size − 2)</code>px (the 2 comes from the 2px transparent border).'
	],

	example: `<script lang="ts">
	import { Switch } from '@dashfi/svelte/ui/switch';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

let notifications = $state(true);

<div style="display:flex;align-items:center;gap:12px">
	<Switch id="notif" bind:checked={notifications} />
	<Label for="notif">Email notifications</Label>
</div>

<!-- Sizes: xs · sm · base · lg -->
<Switch size="sm" />
<Switch size="lg" />`,

	accessibility: [
		'Always pair with a <code>&lt;Label&gt;</code> using <code>for</code> + matching <code>id</code>.',
		'Implements <code>role="switch"</code>; screen readers announce "On" / "Off".',
		'<code>Space</code> toggles. <code>Tab</code> moves focus.',
		'Visible focus ring uses <code>--ring</code> with a 2px offset.',
		"Don't use a switch where confirmation is needed — switches commit immediately. Use a checkbox + submit instead."
	],

	changelog: [
		{
			version: 'v0.5.0',
			date: '2026-06-04',
			note: 'Unchecked track colour changed (lib 0.5.0, core #5116): off-state is now --color-muted-foreground at 30% (was --color-input) for a clearer affordance. Checked track (--color-primary), thumb, sizes, and radii unchanged.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Track colour spec confirmed: off uses --color-input, on uses --color-primary (not --color-brand). Thumb is always --color-background (the surface colour), with Tailwind v4 shadow-lg. The size table holds — xs/sm/base/lg track-and-thumb pairs unchanged. The previous v0.3.1 anatomy referenced a stale branch and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-13',
			note: 'Anatomy tightened: per-size track + thumb dimensions, per-state token tuples (--color-input off, --color-primary on, thumb --color-background), composition rule (Label as sibling), and explicit non-features (no inside-thumb icon, no coloured track variants, no loading state). Matches the Input precedent.'
		},
		{
			version: 'v0.3.0',
			date: '2026-05-10',
			note: 'First documented in Dashbook.'
		}
	]
};
