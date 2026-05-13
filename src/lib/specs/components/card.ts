import type { ComponentSpec } from '../types.js';

/**
 * Card — vertical content group with internal rhythm.
 *
 * Spacing primitive on this branch — no border, no background, no shadow,
 * no radius. Card, CardHeader, CardTitle, CardDescription, CardContent,
 * CardFooter as separate sibling parts.
 */
export const card: ComponentSpec = {
	slug: 'card',
	name: 'Card',
	category: 'Layout',
	status: 'stable',
	importPath:
		"import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@dashfi/svelte/ui/card'",
	description:
		'A bordered surface for grouping related content. Compositional — Card, CardHeader, CardContent, CardFooter.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/card/',

	dimensions: [
		{
			name: 'Card (root)',
			value: 'flex flex-col, gap 32px, padding 32px',
			tw: 'flex flex-col gap-8 p-8',
			notes: 'No border, no radius, no shadow, no background.'
		},
		{
			name: 'CardHeader',
			value: 'flex flex-col, vertical gap 6px',
			tw: 'flex flex-col space-y-1.5',
			notes: 'No padding.'
		},
		{
			name: 'CardTitle',
			value: '18px · weight 500 · tracking -0.025em',
			tw: 'text-lg font-medium tracking-tight',
			notes: 'Default tag <h3>.'
		},
		{
			name: 'CardDescription',
			value: '14px',
			tw: 'text-sm',
			notes: 'Renders as <p>; colour `--color-muted-foreground`.'
		},
		{
			name: 'CardContent',
			value: 'unstyled',
			notes: 'A bare <div> wrapper — no default styling.'
		},
		{
			name: 'CardFooter',
			value: 'flex items-center, top padding 16px',
			tw: 'flex items-center pt-4',
			notes: 'To separate from preceding content.'
		}
	],

	tokens: [
		{
			name: 'Card text',
			token: { cssVar: '--color-card-foreground', light: '#123b39', dark: '#ffffff' },
			notes: 'No background, no border, no shadow — Card reads against whatever surface it sits on.'
		},
		{
			name: 'CardDescription text',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
		},
		{ name: 'CardTitle text', notes: 'Inherits `--color-card-foreground`.' }
	],

	composition: [
		'The canonical composition is <code>Card &gt; CardHeader{CardTitle + CardDescription} + CardContent + CardFooter</code>. Each subpart is a separate sibling.',
		'The 32px <code>gap-8</code> on Card carries the rhythm between parts — sub-parts do not add their own vertical margins.',
		'For card-shaped surfaces in surrounding chrome (table rows, settings sections), use <code>Card</code> alone and let the parent surface provide any background or border treatment.'
	],

	nonFeatures: [
		'No border, no background, no rounded corners, no shadow on this branch. If you need a bordered surface, wrap Card in an outer container that provides those.',
		'No padding prop. <code>p-8</code> (32px) is baked into Card root; sub-parts use the parent\'s gap rhythm.',
		'No <code>variant</code> prop. Card is a single opinionated treatment.',
		'No click handler. Wrap the entire Card in <code>&lt;a&gt;</code> or <code>&lt;button&gt;</code> at the call site if it needs to be activatable.',
		'No <code>p-6</code>/<code>p-4</code> alternative paddings. 32px is the only padding step.'
	],

	props: [
		{
			name: 'Card.class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'Card.ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the root <div>.'
		},
		{
			name: 'Card.children',
			type: 'Snippet',
			description: 'Card body content. Compose with CardHeader, CardContent, CardFooter.'
		},
		{
			name: 'CardTitle.tag',
			type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
			default: "'h3'",
			description: 'Semantic heading level to render.'
		},
		{
			name: 'All sub-parts',
			type: 'class, ref',
			description: 'All sub-parts accept `class` and `ref` for the underlying DOM element.'
		}
	],

	porting: [
		'Card on this branch is a <strong>spacing primitive</strong>: 32px padding, 32px gap, no surface decoration. The visual weight comes from the typography (Title at <code>text-lg font-medium</code>) and the muted Description.'
	],

	example: `<script lang="ts">
	import {
		Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
	} from '@dashfi/svelte/ui/card';
<\/script>

<Card>
	<CardHeader>
		<CardTitle>Daily limit</CardTitle>
		<CardDescription>Resets midnight UTC.</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="data-value text-3xl">$2,408,210</div>
	</CardContent>
	<CardFooter>
		<Button variant="outline" size="sm">Increase limit</Button>
	</CardFooter>
</Card>`,

	accessibility: [
		'Renders as a plain <code>&lt;div&gt;</code> tree — no implicit ARIA.',
		'Use semantic heading levels inside <code>CardTitle</code> via the <code>tag</code> prop (h2/h3 typically).',
		'If the card is the primary affordance, wrap it in <code>&lt;a&gt;</code> or <code>&lt;button&gt;</code> at the call site.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Card is now a spacing primitive — no border, no radius, no shadow, no background. Root applies p-8 (32px), gap-8 (32px), flex flex-col. Title resized from leading-none font-semibold tracking-tight (no font-size) to text-lg font-medium tracking-tight — 18px weight 500. Header is a bare flex flex-col space-y-1.5, no padding. Content is unstyled. Footer is flex items-center pt-4. Sub-part paddings (p-6 / pt-0) are gone — rhythm comes from the root\'s gap-8. v0.3.1 described the prior bordered treatment.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-12',
			note: 'Anatomy tightened: per-part dimensions (root rounded-md 6px + 1px border + shadow-sm; p-6 on each sub-part), per-part tokens with resolved hex, composition rule (parts as siblings, header sits flush over content), and explicit non-features (no padding prop, no variant prop, no click handler, no rounded-lg). Matches the Input precedent.'
		},
		{
			version: 'v0.3.0',
			date: '2026-05-10',
			note: 'First documented in Dashbook.'
		}
	]
};
