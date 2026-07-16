import type { ComponentSpec } from '../types.js';

/** PaginationWrapper — composed Pagination + page-size Select. */
export const paginationWrapper: ComponentSpec = {
	slug: 'pagination-wrapper',
	name: 'Pagination Wrapper',
	category: 'Navigation',
	status: 'beta',
	importPath: "import { PaginationWrapper } from '@dashfi/svelte/ui/pagination-wrapper'",
	description:
		'Batteries-included pagination row with Previous/Next, numbered pages, optional total count, and a page-size Select.',
	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/pagination-wrapper/',
	dimensions: [
		{
			name: 'Root',
			value: 'single no-wrap row with 16px gap',
			tw: 'flex flex-nowrap gap-4'
		},
		{
			name: 'Pagination region',
			value: 'content-width; does not consume the full row',
			tw: 'ml-0 w-auto min-w-0'
		},
		{
			name: 'Page-size region',
			value: 'non-shrinking row with 16px gap',
			tw: 'flex shrink-0 items-center gap-4'
		},
		{
			name: 'Disabled',
			value: 'whole row non-interactive, 50% opacity, small blur',
			tw: 'pointer-events-none opacity-50 blur-sm'
		}
	],
	tokens: [
		{
			name: 'Total-items label',
			token: { cssVar: '--color-muted-foreground', light: '#6e8180', dark: '#819896' },
			notes: '`text-sm`; numeric count uses the mono font.'
		},
		{
			name: 'Page controls',
			notes: "Inherit the Pagination component's Button variants and tokens."
		},
		{
			name: 'Page-size control',
			notes: 'Inherits Select Trigger / Content / Item tokens.'
		}
	],
	composition: [
		'Use this shared component when a table/list needs both page navigation and page-size selection; do not rebuild the Pagination + Select composition locally.',
		'<code>page</code> is 1-indexed internally. <code>onPageChange</code> receives <code>page - 1</code> for zero-indexed application consumers.',
		'The total label only renders when <code>showTotalItems</code> is true and <code>totalItems</code> is non-zero.'
	],
	nonFeatures: [
		'No responsive stacking; the canonical root is <code>flex-nowrap</code>. The consumer owns overflow or breakpoint layout.',
		'No free-form page jump input.',
		'No custom snippet API for the controls; customize labels and page-size options through props.'
	],
	props: [
		{
			name: 'totalItems',
			type: 'number',
			required: true,
			bindable: true,
			description: 'Total item count passed to Pagination.'
		},
		{
			name: 'totalPages',
			type: 'number',
			required: true,
			description: 'Used to disable the sole page link when only one page exists.'
		},
		{
			name: 'page',
			type: 'number',
			required: true,
			bindable: true,
			description: 'Current 1-indexed page.'
		},
		{
			name: 'pageSize',
			type: 'number',
			required: true,
			bindable: true,
			description: 'Current number of items per page.'
		},
		{
			name: 'pageSizeOptions',
			type: '{ value: string; label: string }[]',
			default: '5, 10, 20, 50, 100',
			description: 'Options shown by the page-size Select.'
		},
		{
			name: 'pageSizeTitle',
			type: 'string',
			default: "'Items per page'",
			description: 'Fallback trigger label and Select group heading.'
		},
		{
			name: 'showTotalItems',
			type: 'boolean',
			default: 'false',
			description: 'Show the muted total-items label.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables and visually softens the whole row.'
		},
		{
			name: 'siblingCount',
			type: 'number',
			default: '1',
			description: 'Page links shown on each side of the current page.'
		},
		{
			name: 'onPageChange / onPageSizeChange',
			type: '(value: number) => void',
			description: 'Callbacks for page and page-size mutations.'
		}
	],
	porting: [
		'Prefer the actual <code>PaginationWrapper</code> export in Svelte. For other stacks, compose the canonical Pagination and Select contracts in a single no-wrap row.',
		'Keep the page-size choices at 5/10/20/50/100 unless product requirements specify otherwise.'
	],
	example: `<script lang="ts">
	import { PaginationWrapper } from '@dashfi/svelte/ui/pagination-wrapper';

	let page = $state(1);
	let pageSize = $state(20);
</script>

<PaginationWrapper
	totalItems={248}
	totalPages={13}
	bind:page
	bind:pageSize
	showTotalItems
/>`,
	accessibility: [
		'Pagination provides navigation semantics and current-page state.',
		'The page-size picker inherits Select keyboard and screen-reader behaviour.',
		'Disabled state removes pointer interaction; consumers should also communicate loading state when applicable.'
	],
	changelog: [
		{
			version: 'v0.5.0 audit',
			date: '2026-07-14',
			note: 'Added from the shipped shared-library export after the full lib inventory found it had no Dashbook spec.'
		}
	]
};
