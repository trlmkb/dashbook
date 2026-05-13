<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Empty,
		EmptyHeader,
		EmptyTitle,
		EmptyDescription,
		EmptyContent
	} from '@dashfi/svelte/ui/empty';
	import { Button } from '@dashfi/svelte/ui/button';
	import Inbox from '@lucide/svelte/icons/inbox';

	const sharedProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Slotted content.'
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
			description: 'Native div attributes pass through to the root element.'
		}
	];

	const emptyMediaProps: PropDef[] = [
		{
			name: 'variant',
			type: "'default' | 'icon'",
			default: "'default'",
			description: 'Icon variant adds a muted square background and centers the icon.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Typically a Lucide icon or small graphic.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		}
	];

	const emptyDescriptionProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Description text. Inline <a> tags are styled with underline-offset.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		}
	];

	const example = `<script lang="ts">
	import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@dashfi/svelte/ui/empty';
<\/script>

<Empty>
\t<EmptyHeader>
\t\t<EmptyTitle>No spending data available</EmptyTitle>
\t\t<EmptyDescription>Start using your card to see spending analytics here.</EmptyDescription>
\t</EmptyHeader>
\t<EmptyContent>
\t\t<Button>Order a card</Button>
\t</EmptyContent>
</Empty>`;
</script>

<svelte:head><title>Empty — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Empty"
	description="Empty-state container. Title, description, optional action — for 'no data yet' surfaces."
	importPath="@dashfi/svelte/ui/empty"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="320px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="480px">
					<Empty>
						<EmptyHeader>
							<EmptyTitle>No spending data available</EmptyTitle>
							<EmptyDescription>Start using your card to see spending analytics here.</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<Button>Order a card</Button>
						</EmptyContent>
					</Empty>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Empty" props={sharedProps} />
			<PropsTable title="EmptyHeader" props={sharedProps} />
			<PropsTable title="EmptyTitle" props={sharedProps} />
			<PropsTable title="EmptyDescription" props={emptyDescriptionProps} />
			<PropsTable title="EmptyContent" props={sharedProps} />
			<PropsTable title="EmptyMedia" props={emptyMediaProps} />
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Empty (root)</strong> — <code>flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12</code>. 24px padding on mobile, 48px from <code>md</code>. 24px gap between sections. Centered both axes. <code>rounded-lg</code> (8px) container with <code>border-dashed</code> — but no border-width set, so dashed style is opt-in (caller adds <code>border</code>).</li>
				<li><strong>EmptyHeader</strong> — title + description block.</li>
				<li><strong>EmptyTitle</strong> — heading text.</li>
				<li><strong>EmptyDescription</strong> — supporting copy.</li>
				<li><strong>EmptyContent</strong> — action area (typically a Button).</li>
				<li><strong>EmptyMedia</strong> — optional icon/graphic. Variant <code>'icon'</code> adds a muted square background.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Container border (when applied)</strong> — <code>border-border</code> dashed.</li>
				<li><strong>Title / description</strong> — inherit foreground; description typically uses <code>text-muted-foreground</code>.</li>
				<li><strong>EmptyMedia (icon variant)</strong> — muted background <code>--color-muted</code>.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Compose like a card: <code>Empty</code> → <code>EmptyHeader</code> (Title + Description) → <code>EmptyContent</code> (action Button).</li>
				<li>For an icon empty state, prepend <code>EmptyMedia variant="icon"</code> with a Lucide glyph inside.</li>
				<li>Use inside data-driven surfaces (table empty state, search-no-results, blank dashboard).</li>
			</ul>

			<div class="docs-h">Not part of Empty</div>
			<ul class="docs-list">
				<li>No background fill. The container is transparent — the dashed border is the only chrome (and only if caller adds <code>border</code> class).</li>
				<li>No size variants. Padding scales responsively via the built-in <code>md:p-12</code> breakpoint.</li>
				<li>No animations.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Six composable parts (Empty/Header/Title/Description/Content/Media). Centered flex column with responsive padding (24/48), 24px gap, 8px radius, dashed-border-ready.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Six-part
					composable empty-state. Root is <code>flex flex-col items-center
					justify-center gap-6 rounded-lg border-dashed p-6 md:p-12</code> with
					dashed border opt-in. Transparent fill, responsive padding (24/48).
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
