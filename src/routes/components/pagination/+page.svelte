<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Pagination,
		PaginationContent,
		PaginationItem,
		PaginationNextButton,
		PaginationPrevButton,
		PaginationEllipsis
	} from '@dashfi/svelte/ui/pagination';

	const paginationProps: PropDef[] = [
		{
			name: 'count',
			type: 'number',
			default: '0',
			required: true,
			description: 'Total number of items being paginated.'
		},
		{
			name: 'perPage',
			type: 'number',
			default: '10',
			description: 'Items shown per page.'
		},
		{
			name: 'page',
			type: 'number',
			default: '1',
			bindable: true,
			description: '1-indexed current page number.'
		},
		{
			name: 'siblingCount',
			type: 'number',
			default: '1',
			description: 'How many page links to show on each side of the current page.'
		},
		{
			name: 'onPageChange',
			type: '(page: number) => void',
			description: 'Fired when the current page changes.'
		},
		{
			name: 'loop',
			type: 'boolean',
			default: 'false',
			description: 'Whether prev/next buttons loop around at the edges.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the root container.'
		}
	];

	const paginationContentProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLUListElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the list container.'
		}
	];

	const paginationItemProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLLIElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the list item.'
		}
	];

	const paginationLinkProps: PropDef[] = [
		{
			name: 'page',
			type: '{ type: "page" | "ellipsis"; value: number }',
			required: true,
			description: "Page object provided by bits-ui's pages snippet on the Pagination root."
		},
		{
			name: 'isActive',
			type: 'boolean',
			default: 'false',
			description: 'Whether this link represents the current page. Toggles outline vs ghost button variant.'
		},
		{
			name: 'size',
			type: "'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'",
			default: "'icon'",
			description: 'Button size token passed through to buttonVariants.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the page button.'
		}
	];

	const paginationPrevButtonProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the previous button.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Optional custom content. Defaults to a "Previous" label with chevron-left icon.'
		}
	];

	const paginationNextButtonProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the next button.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Optional custom content. Defaults to a "Next" label with chevron-right icon.'
		}
	];

	const example = `<script lang="ts">
\timport {
\t\tPagination, PaginationContent, PaginationItem, PaginationLink,
\t\tPaginationPrevButton, PaginationNextButton, PaginationEllipsis
\t} from '@dashfi/svelte/ui/pagination';
<\/script>

<Pagination count={120} perPage={10} bind:page={current}>
\t<PaginationContent>
\t\t<PaginationItem><PaginationPrevButton /></PaginationItem>
\t\t<PaginationItem><PaginationEllipsis /></PaginationItem>
\t\t<PaginationItem><PaginationNextButton /></PaginationItem>
\t</PaginationContent>
</Pagination>`;
</script>

<svelte:head><title>Pagination — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Pagination"
	description="Paged navigation for long lists. Previous/Next buttons + ellipsis + numbered links via the bits-ui pages snippet."
	importPath="@dashfi/svelte/ui/pagination"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<Pagination count={120} perPage={10}>
					<PaginationContent>
						<PaginationItem><PaginationPrevButton /></PaginationItem>
						<PaginationItem><PaginationEllipsis /></PaginationItem>
						<PaginationItem><PaginationNextButton /></PaginationItem>
					</PaginationContent>
				</Pagination>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Pagination" props={paginationProps} />
			<PropsTable title="PaginationContent" props={paginationContentProps} />
			<PropsTable title="PaginationItem" props={paginationItemProps} />
			<PropsTable title="PaginationLink" props={paginationLinkProps} />
			<PropsTable title="PaginationPrevButton" props={paginationPrevButtonProps} />
			<PropsTable title="PaginationNextButton" props={paginationNextButtonProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Pagination (root)</strong> — <code>mx-auto flex w-full flex-col items-center</code>. Centered horizontally.</li>
				<li><strong>PaginationContent</strong> — <code>flex flex-row items-center gap-1</code>.</li>
				<li><strong>PaginationLink</strong> — Button at <code>size="icon"</code> (36×36 default). Variant flips on active: <code>outline</code> when current, <code>ghost</code> otherwise.</li>
				<li><strong>PaginationNextButton / PrevButton</strong> — Button variants with leading/trailing chevron glyph.</li>
				<li><strong>PaginationEllipsis</strong> — non-interactive 36×36 slot showing "...".</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>All sub-parts inherit Button tokens. Active page uses <code>outline</code> variant (border + transparent bg); non-active uses <code>ghost</code> (transparent, hover-only).</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li><code>Pagination count perPage page (bindable) siblingCount</code> drives the page model.</li>
				<li>Inside: <code>PaginationContent</code> with <code>PaginationPrevButton</code>, mapped <code>PaginationItem &gt; PaginationLink</code>, optional <code>PaginationEllipsis</code>, <code>PaginationNextButton</code>.</li>
			</ul>
			<div class="docs-h">Not part of Pagination</div>
			<ul class="docs-list">
				<li>No total-page text. Caller composes a "Page X of Y" label outside if needed.</li>
				<li>No "go to page" input field.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>bits-ui Pagination wired into Button variants. Icon-sized links, outline for active, ghost for others.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Centered flex
					list of icon-size Button links — <code>outline</code> for active, <code>ghost</code>
					for the rest. Driven by bits-ui Pagination state.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
