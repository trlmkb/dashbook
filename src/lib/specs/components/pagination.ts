import type { ComponentSpec } from '../types.js';

/**
 * Pagination — bits-ui Pagination wired into Button variants.
 *
 * Centered icon-sized links. Outline for active, ghost for others. Driven
 * by the bits-ui pages snippet (numbers + ellipsis).
 */
export const pagination: ComponentSpec = {
	slug: 'pagination',
	name: 'Pagination',
	category: 'Navigation',
	status: 'beta',
	importPath:
		"import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@dashfi/svelte/ui/pagination'",
	description:
		'Paged navigation for long lists. Previous/Next buttons + ellipsis + numbered links via the bits-ui pages snippet.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/pagination/',

	dimensions: [
		{
			name: 'Pagination (root)',
			value: 'centered horizontal flex container',
			tw: 'mx-auto flex w-full flex-col items-center'
		},
		{
			name: 'PaginationContent',
			value: 'horizontal flex list with 4px gap',
			tw: 'flex flex-row items-center gap-1'
		},
		{
			name: 'PaginationLink',
			value: '36×36 (Button size="icon")',
			tw: 'size-icon',
			notes: 'Variant flips on active: outline when current, ghost otherwise.'
		},
		{
			name: 'PaginationNextButton / PrevButton',
			value: 'Button with leading/trailing chevron glyph',
			notes: 'Defaults to "Next" / "Previous" label; can render children for custom content.'
		},
		{
			name: 'PaginationEllipsis',
			value: 'non-interactive 36×36 slot showing "..."'
		}
	],

	tokens: [
		{
			name: 'Active page (outline variant)',
			token: { cssVar: '--color-input', light: '#b6c0bf', dark: '#1f2a29' },
			notes: 'Inherits Button outline tokens — border + transparent background.'
		},
		{
			name: 'Inactive page (ghost variant)',
			token: { cssVar: '--color-accent', light: '#eceae0', dark: '#181e1d' },
			notes: 'Inherits Button ghost tokens — transparent, accent on hover.'
		}
	],

	variants: [
		{ name: 'active page', description: 'Outline Button (border + transparent bg).' },
		{ name: 'inactive page', description: 'Ghost Button (transparent; hover-only fill).' }
	],

	composition: [
		'<code>Pagination count perPage page (bindable) siblingCount</code> drives the page model.',
		'Inside: <code>PaginationContent</code> with <code>PaginationPrevButton</code>, mapped <code>PaginationItem &gt; PaginationLink</code>, optional <code>PaginationEllipsis</code>, <code>PaginationNextButton</code>.',
		'The bits-ui <code>pages</code> snippet on the root yields <code>{ type: "page" | "ellipsis", value }</code> for each slot — pass through to <code>PaginationLink</code>.'
	],

	nonFeatures: [
		'No total-page text. Caller composes a "Page X of Y" label outside if needed.',
		'No "go to page" input field.',
		'No items-per-page selector.'
	],

	props: [
		{
			name: 'Pagination.count',
			type: 'number',
			required: true,
			description: 'Total number of items being paginated.'
		},
		{
			name: 'Pagination.perPage',
			type: 'number',
			default: '10',
			description: 'Items shown per page.'
		},
		{
			name: 'Pagination.page',
			type: 'number',
			default: '1',
			bindable: true,
			description: '1-indexed current page number.'
		},
		{
			name: 'Pagination.siblingCount',
			type: 'number',
			default: '1',
			description: 'How many page links to show on each side of the current page.'
		},
		{
			name: 'Pagination.onPageChange',
			type: '(page: number) => void',
			description: 'Fired when the current page changes.'
		},
		{
			name: 'Pagination.loop',
			type: 'boolean',
			default: 'false',
			description: 'Whether prev/next buttons loop around at the edges.'
		},
		{
			name: 'PaginationLink.page',
			type: '{ type: "page" | "ellipsis"; value: number }',
			required: true,
			description: 'Page object provided by bits-ui\'s pages snippet on the Pagination root.'
		},
		{
			name: 'PaginationLink.isActive',
			type: 'boolean',
			default: 'false',
			description: 'Whether this link represents the current page. Toggles outline vs ghost button variant.'
		},
		{
			name: 'PaginationLink.size',
			type: "'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'",
			default: "'icon'",
			description: 'Button size token passed through to buttonVariants.'
		},
		{
			name: 'PaginationPrevButton.children',
			type: 'Snippet',
			description: 'Optional custom content. Defaults to a "Previous" label with chevron-left icon.'
		},
		{
			name: 'PaginationNextButton.children',
			type: 'Snippet',
			description: 'Optional custom content. Defaults to a "Next" label with chevron-right icon.'
		}
	],

	porting: [
		'bits-ui Pagination wired into Button variants. Icon-sized links, outline for active, ghost for others.',
		'Replace bits-ui with your stack\'s pagination state primitive; preserve the outline-on-active + ghost-otherwise treatment.'
	],

	example: `<script lang="ts">
	import {
		Pagination, PaginationContent, PaginationItem, PaginationLink,
		PaginationPrevButton, PaginationNextButton, PaginationEllipsis
	} from '@dashfi/svelte/ui/pagination';
<\/script>

<Pagination count={120} perPage={10} bind:page={current}>
	<PaginationContent>
		<PaginationItem><PaginationPrevButton /></PaginationItem>
		<PaginationItem><PaginationEllipsis /></PaginationItem>
		<PaginationItem><PaginationNextButton /></PaginationItem>
	</PaginationContent>
</Pagination>`,

	accessibility: [
		'Renders as <code>&lt;nav&gt;</code> with <code>aria-label="pagination"</code> via bits-ui.',
		'Active page link sets <code>aria-current="page"</code>.',
		'Prev/Next buttons disable at the edges (unless <code>loop</code> is true).'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Centered flex list of icon-size Button links — outline for active, ghost for the rest. Driven by bits-ui Pagination state.'
		}
	]
};
