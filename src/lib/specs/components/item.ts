import type { ComponentSpec } from '../types.js';

/**
 * Item — composable list-row primitive.
 *
 * Two sizes (default / sm) × three variants (default / outline / muted).
 * Sub-parts: Media / Header / Content / Title / Description / Actions / Footer.
 */
export const item: ComponentSpec = {
	slug: 'item',
	name: 'Item',
	category: 'Display',
	status: 'beta',
	importPath:
		"import { Item, ItemContent, ItemTitle, ItemDescription, ItemMedia, ItemActions } from '@dashfi/svelte/ui/item'",
	description:
		'List item primitive — leading icon/avatar, title + description, trailing action. The row in any list.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/item/',

	dimensions: [
		{
			name: 'Item (root)',
			value: '14px type, transparent 1px border (stable sizing when variant adds outline)',
			tw: 'flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none'
		},
		{
			name: 'Header / Footer',
			value: 'full-width flex row',
			tw: 'flex basis-full items-center justify-between gap-2'
		},
		{
			name: 'Content',
			value: 'flex column, gap-1',
			tw: 'flex flex-1 flex-col gap-1',
			notes: 'Neighbor-aware: [&+[data-slot=item-content]]:flex-none.'
		},
		{
			name: 'Title',
			value: '14px, medium weight, snug leading',
			tw: 'text-sm leading-snug font-medium'
		},
		{
			name: 'Description',
			value: 'muted-foreground, 14px',
			tw: 'text-muted-foreground text-sm'
		},
		{
			name: 'Actions',
			value: 'right-anchored flex',
			tw: 'flex items-center gap-2'
		},
		{
			name: 'Media',
			value: 'variant-driven (icon vs image)',
			notes: '"icon" adds a square muted tile; "image" enforces a 40px cover-fitted square.'
		}
	],

	tokens: [
		{
			name: 'Link hover',
			token: { cssVar: '--color-accent', light: '#eceae0', dark: '#181e1d' },
			notes: 'Rendered at 50% via [a]:hover:bg-accent/50.'
		},
		{
			name: 'Focus ring',
			token: { cssVar: '--color-ring', light: '#2b605c', dark: '#5bb8b0' },
			notes: 'Applied via border-ring + ring-ring/50 ring-[3px] on focus.'
		},
		{
			name: 'Outline variant border',
			token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' }
		},
		{
			name: 'Muted variant background',
			token: { cssVar: '--color-muted', light: '#eceae0', dark: '#181e1d' },
			notes: 'Rendered at 50% via bg-muted/50.'
		}
	],

	variants: [
		{ name: 'default', description: 'Transparent — no border, no fill.' },
		{ name: 'outline', description: 'Adds border-border.' },
		{ name: 'muted', description: 'Adds bg-muted/50 background.' }
	],

	sizes: [
		{ name: 'default', padding: '16px', notes: 'gap-4 p-4.' },
		{ name: 'sm', padding: '16px horizontal · 12px vertical', notes: 'gap-2.5 px-4 py-3.' }
	],

	composition: [
		'List row primitive — sidebar nav, transaction rows, settings.',
		'<code>ItemMedia? + (ItemHeader | ItemContent) + ItemActions?</code>; optional <code>ItemFooter</code>.',
		'Group with <code>ItemGroup</code>; separate with <code>ItemSeparator</code>.',
		'Use <code>child</code> render-prop on Item to swap the root <code>&lt;div&gt;</code> for a custom element (e.g. an <code>&lt;a&gt;</code> tag).'
	],

	nonFeatures: [
		'No selection state — caller wires <code>aria-current</code> / <code>data-state</code>.',
		'No fixed height — sizes to content.',
		'No built-in drag handle.',
		'No swipe affordances on mobile.'
	],

	props: [
		{
			name: 'Item.variant',
			type: "'default' | 'outline' | 'muted'",
			default: "'default'",
			description: 'Surface style. Outline adds a border; muted adds a tinted background.'
		},
		{
			name: 'Item.size',
			type: "'default' | 'sm'",
			default: "'default'",
			description: 'Row density. sm tightens padding and gap for compact lists.'
		},
		{
			name: 'Item.child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-prop alternative — replace the default <div> wrapper with a custom element receiving merged props.'
		},
		{
			name: 'Item.class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ItemContent.children',
			type: 'Snippet',
			description: 'Typically an ItemTitle followed by an ItemDescription.'
		},
		{
			name: 'ItemTitle.children',
			type: 'Snippet',
			description: 'Title text. Inline icons render with 2-unit gap.'
		},
		{
			name: 'ItemDescription.children',
			type: 'Snippet',
			description: 'Description text — clamped to two lines by default.'
		},
		{
			name: 'ItemMedia.variant',
			type: "'default' | 'icon' | 'image'",
			default: "'default'",
			description: 'icon adds a square muted tile; image enforces a 40px cover-fitted square.'
		},
		{
			name: 'ItemActions.children',
			type: 'Snippet',
			description: 'Trailing controls — typically one or more Buttons.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Native div attributes pass through to the root element.'
		}
	],

	porting: [
		'Composable list-row with two sizes / three variants and jade focus ring.',
		'Sub-parts (Media / Header / Content / Title / Description / Actions / Footer / Group / Separator) are independent components — port them as separate primitives that all accept <code>class</code> + <code>children</code>.'
	],

	example: `<script lang="ts">
	import { Item, ItemContent, ItemTitle, ItemDescription, ItemMedia, ItemActions } from '@dashfi/svelte/ui/item';
<\/script>

<Item>
	<ItemMedia><CreditCard /></ItemMedia>
	<ItemContent>
		<ItemTitle>Q2 Meta · brand campaign</ItemTitle>
		<ItemDescription>•••• 4482 · $12,408 of $50,000 used</ItemDescription>
	</ItemContent>
	<ItemActions><Button size="sm" variant="outline">Manage</Button></ItemActions>
</Item>`,

	accessibility: [
		'When wrapping Item in an anchor / button (via <code>child</code> snippet), inherit native interactive semantics.',
		'For selection state, wire <code>aria-current="true"</code> or <code>data-state="selected"</code> at the call site.',
		'Description is clamped to two lines — keep the title load-bearing for screen readers.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Composable row (default/sm × default/outline/muted) with sub-parts Media/Header/Content/Title/Description/Actions/Footer/Group/Separator.'
		}
	]
};
