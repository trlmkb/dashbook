import type { ComponentSpec } from '../types.js';

export const skeleton: ComponentSpec = {
	slug: 'skeleton',
	name: 'Skeleton',
	category: 'Display',
	status: 'stable',
	importPath: "import { Skeleton } from '@dashfi/svelte/ui/skeleton'",
	description:
		'Placeholder shape for loading states. Match the silhouette of the eventual content.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/skeleton/skeleton.svelte',

	dimensions: [
		{
			name: 'Root',
			value: 'bare <div>',
			notes:
				'No intrinsic dimensions — caller sizes it via `class` (h-*, w-*, rounded-*).'
		},
		{
			name: 'Animation',
			value: '2s ease-in-out infinite',
			tw: 'animate-pulse',
			notes: 'Alternates opacity 1 → 0.5 → 1. Respects `prefers-reduced-motion`.'
		}
	],

	tokens: [
		{
			name: 'Background',
			token: { cssVar: '--color-muted', light: '#f1efea', dark: '#191f1d' },
			notes: '`bg-muted`.'
		}
	],

	composition: [
		'Match the silhouette of the eventual content. One Skeleton per visible text line / shape; not one giant block.',
		'Replace with real content as soon as data arrives — do not animate the transition.',
		'Stack vertically with gap; do not nest.'
	],

	nonFeatures: [
		'No size prop / no <code>size</code> variants. Caller controls dimensions via Tailwind classes.',
		'No shimmer / gradient animation. The single <code>animate-pulse</code> motion is intentional restraint.',
		"No children. The component does not accept content — it's a placeholder only."
	],

	props: [
		{
			name: 'class',
			type: 'string',
			description: 'Tailwind classes for size and shape — e.g. h-4 w-48 rounded-full.'
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
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Native div attributes pass through. The component does not accept children.'
		}
	],

	porting: [
		"Single <code>--color-muted</code> background + pulse animation. That's the entire contract."
	],

	example: `<script lang="ts">
	import { Skeleton } from '@dashfi/svelte/ui/skeleton';
<\/script>

<div class="space-y-2">
\t<Skeleton class="h-4 w-48" />
\t<Skeleton class="h-4 w-64" />
\t<Skeleton class="h-4 w-32" />
</div>`,

	accessibility: [
		'Skeleton is decorative. Wrap the loading region with <code>aria-busy="true"</code> + <code>aria-live="polite"</code> on the container that will be filled.',
		"<code>animate-pulse</code> automatically backs off under <code>prefers-reduced-motion</code>."
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Canonical is bg-muted animate-pulse; everything else (dimensions, radius) is caller-controlled.'
		}
	]
};
