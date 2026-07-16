import type { ComponentSpec } from '../types.js';

/**
 * Separator — hairline divider.
 *
 * 1px line in --color-border, horizontal or vertical, full parent length.
 */
export const separator: ComponentSpec = {
	slug: 'separator',
	name: 'Separator',
	category: 'Display',
	status: 'stable',
	importPath: "import { Separator } from '@dashfi/svelte/ui/separator'",
	description: 'Hairline divider. Horizontal or vertical, decorative or semantic.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/separator/separator.svelte',

	dimensions: [
		{
			name: 'Horizontal (default)',
			value: '1px tall, full width of parent',
			tw: 'h-px w-full',
			notes: 'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full.'
		},
		{
			name: 'Vertical',
			value: '1px wide, full height of parent',
			tw: 'h-full w-px',
			notes: 'Requires the parent to be a flex container with a defined height.'
		},
		{
			name: 'Element',
			value: '<div>',
			notes: 'Renders as a <div> (or <li role="separator"> in certain bits-ui contexts).'
		},
		{ name: 'Shrink', value: 'never collapses', tw: 'shrink-0' }
	],

	tokens: [
		{
			name: 'Background',
			token: { cssVar: '--color-border', light: '#ebeae5', dark: '#1e2928' },
			notes: '`bg-border` — single token for both orientations.'
		},
		{ name: 'Border', notes: 'none. The separator *is* the line; it has no surrounding border.' }
	],

	composition: [
		'Drop between siblings as a visual divider: title group → separator → content.',
		'Horizontal separators do not need a wrapping container. Vertical separators must sit inside a flex row with explicit height (e.g. <code>h-6</code> on the parent).',
		'Use sparingly. The portal style is hairline + restraint — prefer spacing first, separators only when grouping reads ambiguously.'
	],

	nonFeatures: [
		'No thickness prop. 1px is the brand line weight; do not override.',
		'No colour prop. The single <code>--color-border</code> token is intentional.',
		'No margin / spacing. Margins live on adjacent siblings or the parent.',
		'No label / inline-text slot. For "OR" dividers, compose at the call site.'
	],

	props: [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Layout axis. Horizontal renders a 1px height bar; vertical a 1px width bar.'
		},
		{
			name: 'decorative',
			type: 'boolean',
			default: 'true',
			description: 'When true, the element is hidden from assistive tech. Set false for semantic separation.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: '...restProps',
			type: 'SeparatorPrimitive.RootProps',
			description: 'All bits-ui Separator root props pass through.'
		}
	],

	porting: [
		'1px <code>--color-border</code>, full parent length on the appropriate axis. That\'s the entire contract.'
	],

	example: `<script lang="ts">
	import { Separator } from '@dashfi/svelte/ui/separator';
<\/script>

<div>Top section</div>
<Separator />
<div>Bottom section</div>

<!-- Vertical -->
<Separator orientation="vertical" />`,

	accessibility: [
		'Decorative by default (<code>role="none"</code>); pass <code>decorative={false}</code> for semantic separation between groups of related items.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy reverified against the EN-XX/design-vnext--sidebar-feature branch — Separator\'s canonical class is unchanged: bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px. Single token (--color-border), 1px line, full parent length on the active axis. v0.3.1\'s anatomy still holds; this row exists for branch-traceability with the other component pages on the regen pass.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-12',
			note: 'Anatomy added: 1px line in --color-border, orientation behaviour, composition rules (vertical requires flex parent), and explicit non-features (no thickness / colour / margin props). Matches the Input precedent.'
		}
	]
};
