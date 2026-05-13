import type { ComponentSpec } from '../types.js';

/**
 * Empty — empty-state container.
 *
 * Six-part composable: Empty/Header/Title/Description/Content/Media.
 * Centered flex column, responsive padding (24/48), 8px radius, dashed-border-ready.
 */
export const empty: ComponentSpec = {
	slug: 'empty',
	name: 'Empty',
	category: 'Display',
	status: 'stable',
	importPath:
		"import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@dashfi/svelte/ui/empty'",
	description:
		'Empty-state container. Title, description, optional action — for "no data yet" surfaces. Centered, transparent fill, dashed-border-ready.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/empty/',

	dimensions: [
		{
			name: 'Empty (root)',
			value: 'centered flex column, 24px padding (48px from md), 24px gap, 8px radius, dashed-border-ready',
			tw: 'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
			notes: 'No border-width set, so dashed style is opt-in (caller adds border class).'
		},
		{
			name: 'EmptyHeader',
			value: 'title + description block'
		},
		{
			name: 'EmptyTitle',
			value: 'heading text'
		},
		{
			name: 'EmptyDescription',
			value: 'supporting copy, typically muted-foreground',
			notes: 'Inline <a> tags styled with underline-offset.'
		},
		{
			name: 'EmptyContent',
			value: 'action area (typically a Button)'
		},
		{
			name: 'EmptyMedia',
			value: 'optional icon/graphic',
			notes: 'Variant "icon" adds a muted square background and centers the icon.'
		}
	],

	tokens: [
		{
			name: 'Container border (when applied)',
			token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' },
			notes: 'Dashed style; only visible if caller adds <code>border</code> class.'
		},
		{
			name: 'Title / foreground',
			token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' }
		},
		{
			name: 'Description',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' },
			notes: 'Conventional — typically applied at the call site.'
		},
		{
			name: 'EmptyMedia (icon variant) background',
			token: { cssVar: '--color-muted', light: '#eceae0', dark: '#181e1d' }
		}
	],

	variants: [
		{
			name: 'EmptyMedia.default',
			description: 'Inline media slot — no surface treatment.'
		},
		{
			name: 'EmptyMedia.icon',
			description: 'Square muted-background tile centring the icon.'
		}
	],

	composition: [
		'Compose like a card: <code>Empty</code> → <code>EmptyHeader</code> (Title + Description) → <code>EmptyContent</code> (action Button).',
		'For an icon empty state, prepend <code>EmptyMedia variant="icon"</code> with a Lucide glyph inside.',
		'Use inside data-driven surfaces (table empty state, search-no-results, blank dashboard).'
	],

	nonFeatures: [
		'No background fill. The container is transparent — the dashed border is the only chrome (and only if caller adds <code>border</code> class).',
		'No size variants. Padding scales responsively via the built-in <code>md:p-12</code> breakpoint.',
		'No animations.',
		'No built-in retry / action handlers — caller wires the Button.'
	],

	props: [
		{
			name: 'Empty.class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'Empty.children',
			type: 'Snippet',
			description: 'Slotted content — typically Header + Content.'
		},
		{
			name: 'EmptyHeader.children',
			type: 'Snippet',
			description: 'Title + description block.'
		},
		{
			name: 'EmptyTitle.children',
			type: 'Snippet',
			description: 'Heading text.'
		},
		{
			name: 'EmptyDescription.children',
			type: 'Snippet',
			description: 'Description text. Inline <a> tags are styled with underline-offset.'
		},
		{
			name: 'EmptyContent.children',
			type: 'Snippet',
			description: 'Action area — typically a Button.'
		},
		{
			name: 'EmptyMedia.variant',
			type: "'default' | 'icon'",
			default: "'default'",
			description: 'Icon variant adds a muted square background and centers the icon.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Native div attributes pass through to the root element on each part.'
		}
	],

	porting: [
		'Six composable parts (Empty/Header/Title/Description/Content/Media). Centered flex column with responsive padding (24/48), 24px gap, 8px radius, dashed-border-ready.',
		'EmptyMedia "icon" variant is a small affordance — square tile + centered glyph using <code>--color-muted</code>.'
	],

	example: `<script lang="ts">
	import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@dashfi/svelte/ui/empty';
<\/script>

<Empty>
	<EmptyHeader>
		<EmptyTitle>No spending data available</EmptyTitle>
		<EmptyDescription>Start using your card to see spending analytics here.</EmptyDescription>
	</EmptyHeader>
	<EmptyContent>
		<Button>Order a card</Button>
	</EmptyContent>
</Empty>`,

	accessibility: [
		'EmptyTitle should render as a heading — wrap with the appropriate heading level for the surface (typically h2 / h3).',
		'EmptyDescription is plain prose — keep it concise, one sentence.',
		'Action Button inherits its own focus / activation semantics.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Six-part composable empty-state. Root is flex flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 md:p-12 with dashed border opt-in. Transparent fill, responsive padding (24/48).'
		}
	]
};
