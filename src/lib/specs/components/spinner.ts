import type { ComponentSpec } from '../types.js';

/**
 * Spinner — compact rotating indicator for indeterminate work.
 *
 * 32-ray snowflake glyph on a 161×161 viewBox; default h-2 (8px tall).
 * Animation is opt-in via `animate-spin`.
 */
export const spinner: ComponentSpec = {
	slug: 'spinner',
	name: 'Spinner',
	category: 'Feedback',
	status: 'beta',
	importPath: "import { Spinner } from '@dashfi/svelte/ui/spinner'",
	description: 'Compact spinning indicator. Smaller than Loader.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/spinner/spinner.svelte',

	dimensions: [
		{
			name: 'Default size',
			value: '8px tall',
			tw: 'h-2',
			notes: 'Width matches height (square viewBox). Override via `h-*` / `w-*` utilities on `class`.'
		},
		{
			name: 'Geometry',
			value: '32-ray snowflake on 161×161 viewBox',
			notes:
				'*Not* a single rotating arc — the visual is a static glyph that rotates as a whole if the consumer wraps it in `animate-spin`.'
		},
		{
			name: 'Element',
			value: '<svg>',
			notes: 'Single <svg>. No wrapper. `fill` uses `currentColor`.'
		}
	],

	tokens: [
		{
			name: 'Fill',
			notes:
				"`currentColor`. Inherits from parent's `color`. There is no dedicated spinner colour token — match the surrounding text colour."
		},
		{ name: 'Background', notes: 'none. The spinner is its rays, nothing else.' }
	],

	composition: [
		'Inline next to text or in a label: <code>&lt;Spinner /&gt;</code>. The default <code>h-2</code> sits within a line of body copy at 14px.',
		'To animate, the consumer wraps with <code>animate-spin</code> via <code>class="animate-spin"</code> — the library does not animate by default (some surfaces want the static glyph as a brand mark).',
		'For loading inside Buttons, Button uses <code>@lucide/svelte/icons/loader</code> + <code>animate-spin</code>, not Spinner. Spinner is a brand-mark first, indicator second.'
	],

	nonFeatures: [
		'No <code>size</code> prop. Use Tailwind <code>h-*</code> / <code>w-*</code> via <code>class</code>.',
		'No built-in animation. Animation is opt-in by adding <code>animate-spin</code> at the call site.',
		'No <code>color</code> prop. Use <code>text-*</code> utilities to set <code>currentColor</code>.',
		'No determinate / value-based variant. For determinate progress, use Progress.'
	],

	props: [
		{
			name: 'class',
			type: 'string',
			default: "'h-2'",
			description:
				'Tailwind classes merged onto the SVG. Override sizing via h-* / w-* utilities. Color follows currentColor.'
		}
	],

	porting: [
		'The SVG is a 32-ray glyph on a 161×161 viewBox using <code>currentColor</code> fill. Copy the paths from <code>spinner.svelte</code>; the consumer decides on size + animation.'
	],

	example: `<script lang="ts">
	import { Spinner } from '@dashfi/svelte/ui/spinner';
<\/script>

<Spinner />`,

	accessibility: [
		'Decorative by default — no semantic role. For loading announcements, pair with an <code>aria-live</code> region or use a parent component (Button\'s loading state, etc.) that handles the announcement.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy reverified against the EN-XX/design-vnext--sidebar-feature branch — Spinner\'s canonical SVG is unchanged: 161×161 viewBox, 32-ray glyph, currentColor fill, default class h-2 (8px tall) with all sizing overridable via the class prop. No animation is baked in — the consumer adds animate-spin. v0.3.1\'s anatomy still holds; this row exists for branch-traceability with the other component pages on the regen pass.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-12',
			note: 'Anatomy added: 32-ray snowflake glyph on a 161×161 viewBox, default h-2 (8px), currentColor fill, animation opt-in via animate-spin. Explicit non-features (no size / color / built-in animation props). Matches the Input precedent.'
		}
	]
};
