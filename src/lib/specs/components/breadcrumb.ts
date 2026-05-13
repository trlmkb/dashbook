import type { ComponentSpec } from '../types.js';

export const breadcrumb: ComponentSpec = {
	slug: 'breadcrumb',
	name: 'Breadcrumb',
	category: 'Navigation',
	status: 'stable',
	importPath:
		"import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@dashfi/svelte/ui/breadcrumb'",
	description:
		'Hierarchical navigation trail. Always end with a non-link Page indicating the current location.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/breadcrumb/',

	dimensions: [
		{
			name: 'Breadcrumb (root)',
			value: 'bare <nav aria-label="breadcrumb">',
			notes: 'No styles applied to the root.'
		},
		{
			name: 'BreadcrumbList',
			value: '14px type, wrapping flex',
			tw: 'flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
			notes: '6px gap on mobile, 10px at sm+.'
		},
		{
			name: 'BreadcrumbItem',
			value: 'li element, inline flex',
			tw: 'inline-flex items-center gap-1.5'
		},
		{
			name: 'BreadcrumbLink',
			value: 'bare <a>',
			tw: 'transition-colors hover:text-foreground'
		},
		{
			name: 'BreadcrumbPage',
			value: 'non-link span, current page',
			tw: 'font-normal text-foreground',
			notes: '`role="link" aria-disabled="true" aria-current="page"`.'
		},
		{
			name: 'BreadcrumbSeparator',
			value: 'li with 14px chevron',
			tw: '[&>svg]:size-3.5',
			notes: 'Default glyph is `ChevronRight`; slot accepts override.'
		},
		{
			name: 'BreadcrumbEllipsis',
			value: '36×36 wrapper, 16px glyph',
			tw: 'flex h-9 w-9 items-center justify-center',
			notes: '16px `DotsHorizontal` glyph.'
		}
	],

	tokens: [
		{
			name: 'List + links (default)',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
		},
		{
			name: 'Links (hover) + Page (current)',
			token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' },
			notes: 'Links shift to foreground on hover; Page is foreground always (aria-disabled).'
		},
		{
			name: 'Separator chevron',
			notes: 'Inherits color from the list.'
		}
	],

	composition: [
		'<code>Breadcrumb &gt; BreadcrumbList &gt; BreadcrumbItem*</code>. Interleave items with <code>BreadcrumbSeparator</code>.',
		'End with a <code>BreadcrumbPage</code> for the current location (do NOT use a link for the leaf).',
		"<code>BreadcrumbLink asChild</code> lets you delegate to SvelteKit's <code>&lt;a&gt;</code> for client navigation.",
		'Use <code>BreadcrumbEllipsis</code> as a list item when collapsing deep trees.'
	],

	nonFeatures: [
		'No active styles on the leaf — semantic only via <code>aria-current</code>.',
		"No truncation. Wrapping is handled by Tailwind's <code>flex-wrap break-words</code>.",
		'No icon support next to labels. Compose at the call site if needed.'
	],

	props: [
		{
			name: 'href (BreadcrumbLink)',
			type: 'string',
			description: 'Destination URL for the anchor element.'
		},
		{
			name: 'asChild (BreadcrumbLink)',
			type: 'boolean',
			default: 'false',
			description:
				'When true, defers rendering to the slot so you can compose a custom link element (e.g. SvelteKit <a>).'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLElement | undefined',
			bindable: true,
			description: 'Element ref binding for each sub-component (nav / ol / li / a / span).'
		}
	],

	porting: [
		'Six composable parts. <code>text-sm</code> wrapping list, muted-foreground default + foreground on hover/current, 14px ChevronRight separators.'
	],

	example: `<script lang="ts">
	import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@dashfi/svelte/ui/breadcrumb';
<\/script>

<Breadcrumb>
\t<BreadcrumbList>
\t\t<BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
\t\t<BreadcrumbSeparator />
\t\t<BreadcrumbItem><BreadcrumbLink href="/cards">Cards</BreadcrumbLink></BreadcrumbItem>
\t\t<BreadcrumbSeparator />
\t\t<BreadcrumbItem><BreadcrumbPage>Q2 Meta · brand</BreadcrumbPage></BreadcrumbItem>
\t</BreadcrumbList>
</Breadcrumb>`,

	accessibility: [
		'Root nav is labelled <code>aria-label="breadcrumb"</code> so AT can announce the landmark.',
		'<code>BreadcrumbPage</code> sets <code>aria-current="page"</code> for the leaf — never link it.',
		'<code>BreadcrumbSeparator</code> is hidden from AT (decorative chevron).'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Six composable parts (Breadcrumb/List/Item/Link/Page/Separator/Ellipsis). Wrapping flex flex-wrap items-center gap-1.5 list, 14px type, muted-foreground default → foreground on hover. ChevronRight separator.'
		}
	]
};
