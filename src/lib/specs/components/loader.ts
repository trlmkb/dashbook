import type { ComponentSpec } from '../types.js';

export const loader: ComponentSpec = {
	slug: 'loader',
	name: 'Loader',
	category: 'Feedback',
	status: 'stable',
	importPath: "import { Loader } from '@dashfi/svelte/ui/loader'",
	description:
		'Indeterminate spinner. Drop into a button, an empty state, or a card while data loads.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/loader/loader.svelte',

	dimensions: [
		{
			name: 'Glyph',
			value: '24×24px Lucide Loader icon',
			tw: 'size-6'
		},
		{
			name: 'Animation',
			value: 'continuous Tailwind spin',
			tw: 'animate-spin'
		}
	],

	tokens: [
		{
			name: 'Glyph',
			token: { cssVar: '--color-muted-foreground', light: '#6e8180', dark: '#819896' },
			notes: '`text-muted-foreground`.'
		}
	],

	composition: [
		'Drop the icon beside caller-owned loading copy or inside a caller-owned status region.',
		'Use Button\'s built-in <code>loading</code> prop for button loading states; it owns its own spinner.'
	],

	nonFeatures: [
		'No wrapper, padding, or message. Loader is only the spinning icon.',
		'No size variants. Override <code>class</code> only when the surrounding pattern requires another icon size.',
		'No color prop. Muted foreground is the canonical tint.',
		'No determinate progress. For known-progress loading, use <code>LinearLoader</code> or <code>Progress</code>.'
	],

	props: [
		{
			name: 'class',
			type: 'string',
			description: 'Additional classes merged onto the Lucide Loader icon.'
		}
	],

	porting: [
		'24px Lucide Loader icon in <code>--color-muted-foreground</code> with the standard continuous spin animation. Copy and status semantics belong to the caller.'
	],

	example: `<script lang="ts">
	import { Loader } from '@dashfi/svelte/ui/loader';
<\/script>

<Loader />`,

	accessibility: [
		'The icon alone does not announce loading. Wrap it with caller-owned <code>role="status"</code> and concise visually-hidden or visible copy.',
		'Keep motion non-essential; the surrounding status text must communicate the state.'
	],

	changelog: [
		{
			version: 'v0.5.0 audit',
			date: '2026-07-14',
			note: 'Reconciled against the shipped component. Loader is now a bare 24px muted Lucide spinner; the former padded wrapper, rotating bar, message prop, and custom keyframes are not present in the library.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Canonical is a rotating 4×20 bar in bg-accent-foreground with a 1.6s cubic-bezier rotation keyframe, paired with a text-sm muted caption.'
		}
	]
};
