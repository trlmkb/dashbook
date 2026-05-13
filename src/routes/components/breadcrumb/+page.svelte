<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Breadcrumb,
		BreadcrumbList,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbPage,
		BreadcrumbSeparator
	} from '@dashfi/svelte/ui/breadcrumb';

	const breadcrumbProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLElement | undefined',
			bindable: true,
			description: 'Element ref binding for the nav container.'
		}
	];

	const breadcrumbListProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLOListElement | undefined',
			bindable: true,
			description: 'Element ref binding for the ordered list.'
		}
	];

	const breadcrumbItemProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLLIElement | undefined',
			bindable: true,
			description: 'Element ref binding for the list item.'
		}
	];

	const breadcrumbLinkProps: PropDef[] = [
		{
			name: 'href',
			type: 'string',
			description: 'Destination URL for the anchor element.'
		},
		{
			name: 'asChild',
			type: 'boolean',
			default: 'false',
			description: 'When true, defers rendering to the slot so you can compose a custom link element (e.g. SvelteKit <a>).'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLAnchorElement | undefined',
			bindable: true,
			description: 'Element ref binding for the anchor.'
		}
	];

	const breadcrumbPageProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLSpanElement | undefined',
			bindable: true,
			description: 'Element ref binding for the page span. Already wired with aria-current="page".'
		}
	];

	const breadcrumbSeparatorProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLLIElement | undefined',
			bindable: true,
			description: 'Element ref binding. Slot accepts a custom separator icon (defaults to ChevronRight).'
		}
	];

	const example = `<script lang="ts">
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
</Breadcrumb>`;
</script>

<svelte:head><title>Breadcrumb — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Breadcrumb"
	description="Hierarchical navigation trail. Always end with a non-link Page indicating the current location."
	importPath="@dashfi/svelte/ui/breadcrumb"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem><BreadcrumbLink href="/cards">Cards</BreadcrumbLink></BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem><BreadcrumbPage>Q2 Meta · brand</BreadcrumbPage></BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Breadcrumb" props={breadcrumbProps} />
			<PropsTable title="BreadcrumbList" props={breadcrumbListProps} />
			<PropsTable title="BreadcrumbItem" props={breadcrumbItemProps} />
			<PropsTable title="BreadcrumbLink" props={breadcrumbLinkProps} />
			<PropsTable title="BreadcrumbPage" props={breadcrumbPageProps} />
			<PropsTable title="BreadcrumbSeparator" props={breadcrumbSeparatorProps} />
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Breadcrumb (root)</strong> — bare <code>&lt;nav aria-label="breadcrumb"&gt;</code>. No styles applied to the root.</li>
				<li><strong>BreadcrumbList</strong> — <code>flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5</code>. 6px gap on mobile, 10px at <code>sm+</code>. 14px type.</li>
				<li><strong>BreadcrumbItem</strong> — <code>inline-flex items-center gap-1.5</code> (li element).</li>
				<li><strong>BreadcrumbLink</strong> — bare <code>&lt;a&gt;</code> with <code>transition-colors hover:text-foreground</code>.</li>
				<li><strong>BreadcrumbPage</strong> — non-link span, <code>font-normal text-foreground</code>, <code>role="link" aria-disabled="true" aria-current="page"</code>.</li>
				<li><strong>BreadcrumbSeparator</strong> — li with <code>[&amp;&gt;svg]:size-3.5</code> (14px chevron). Default glyph is <code>ChevronRight</code>; slot accepts override.</li>
				<li><strong>BreadcrumbEllipsis</strong> — <code>flex h-9 w-9 items-center justify-center</code> wrapper around a 16px <code>DotsHorizontal</code> glyph.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>List + links</strong> — <code>text-muted-foreground</code> (<code>#6e7878</code>/<code>#8b9695</code>) by default; links shift to <code>text-foreground</code> on hover (<code>#123b39</code>/<code>#ffffff</code>).</li>
				<li><strong>Page (current)</strong> — <code>text-foreground</code> (no hover shift; aria-disabled).</li>
				<li><strong>Separator chevron</strong> — inherits color from the list.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li><code>Breadcrumb &gt; BreadcrumbList &gt; BreadcrumbItem*</code>. Interleave items with <code>BreadcrumbSeparator</code>.</li>
				<li>End with a <code>BreadcrumbPage</code> for the current location (do NOT use a link for the leaf).</li>
				<li><code>BreadcrumbLink asChild</code> lets you delegate to SvelteKit's <code>&lt;a&gt;</code> for client navigation.</li>
				<li>Use <code>BreadcrumbEllipsis</code> as a list item when collapsing deep trees.</li>
			</ul>

			<div class="docs-h">Not part of Breadcrumb</div>
			<ul class="docs-list">
				<li>No active styles on the leaf — semantic only via <code>aria-current</code>.</li>
				<li>No truncation. Wrapping is handled by Tailwind's <code>flex-wrap break-words</code>.</li>
				<li>No icon support next to labels. Compose at the call site if needed.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Six composable parts. <code>text-sm</code> wrapping list, muted-foreground default + foreground on hover/current, 14px ChevronRight separators.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Six composable
					parts (Breadcrumb/List/Item/Link/Page/Separator/Ellipsis). Wrapping
					<code>flex flex-wrap items-center gap-1.5</code> list, 14px type,
					muted-foreground default → foreground on hover. ChevronRight separator.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
