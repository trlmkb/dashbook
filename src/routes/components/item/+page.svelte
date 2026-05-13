<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Item,
		ItemContent,
		ItemTitle,
		ItemDescription,
		ItemMedia,
		ItemActions
	} from '@dashfi/svelte/ui/item';
	import { Button } from '@dashfi/svelte/ui/button';
	import CreditCard from '@lucide/svelte/icons/credit-card';

	const itemProps: PropDef[] = [
		{
			name: 'variant',
			type: "'default' | 'outline' | 'muted'",
			default: "'default'",
			description: 'Surface style. Outline adds a border; muted adds a tinted background.'
		},
		{
			name: 'size',
			type: "'default' | 'sm'",
			default: "'default'",
			description: 'Row density. sm tightens padding and gap for compact lists.'
		},
		{
			name: 'child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-prop alternative — replace the default <div> wrapper with a custom element receiving merged props.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Item parts — typically ItemMedia, ItemContent, ItemActions.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Native div attributes pass through to the root element.'
		}
	];

	const itemContentProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Typically an ItemTitle followed by an ItemDescription.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		}
	];

	const itemTitleProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Title text. Inline icons render with 2-unit gap.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		}
	];

	const itemDescriptionProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Description text — clamped to two lines by default.'
		},
		{
			name: 'ref',
			type: 'HTMLParagraphElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the underlying <p>.'
		}
	];

	const itemMediaProps: PropDef[] = [
		{
			name: 'variant',
			type: "'default' | 'icon' | 'image'",
			default: "'default'",
			description: 'icon adds a square muted tile; image enforces a 40px cover-fitted square.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Lucide icon, <img>, or avatar.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		}
	];

	const itemActionsProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Trailing controls — typically one or more Buttons.'
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
	import { Item, ItemContent, ItemTitle, ItemDescription, ItemMedia, ItemActions } from '@dashfi/svelte/ui/item';
<\/script>

<Item>
\t<ItemMedia><CreditCard /></ItemMedia>
\t<ItemContent>
\t\t<ItemTitle>Q2 Meta · brand campaign</ItemTitle>
\t\t<ItemDescription>•••• 4482 · $12,408 of $50,000 used</ItemDescription>
\t</ItemContent>
\t<ItemActions><Button size="sm" variant="outline">Manage</Button></ItemActions>
</Item>`;
</script>

<svelte:head><title>Item — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Item"
	description="List item primitive — leading icon/avatar, title + description, trailing action. The row in any list."
	importPath="@dashfi/svelte/ui/item"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="540px">
					<Item>
						<ItemMedia>
							<CreditCard size={20} strokeWidth={1.5} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Q2 Meta · brand campaign</ItemTitle>
							<ItemDescription>•••• 4482 · $12,408 of $50,000 used</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button size="sm" variant="outline">Manage</Button>
						</ItemActions>
					</Item>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Item" props={itemProps} />
			<PropsTable title="ItemContent" props={itemContentProps} />
			<PropsTable title="ItemTitle" props={itemTitleProps} />
			<PropsTable title="ItemDescription" props={itemDescriptionProps} />
			<PropsTable title="ItemMedia" props={itemMediaProps} />
			<PropsTable title="ItemActions" props={itemActionsProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Item (root)</strong> — <code>flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none</code>. 14px type, transparent 1px border (stable sizing when variant adds outline).</li>
				<li><strong>Sizes</strong> — <code>default</code> = <code>gap-4 p-4</code>; <code>sm</code> = <code>gap-2.5 px-4 py-3</code>.</li>
				<li><strong>Variants</strong> — <code>default</code> (transparent), <code>outline</code> (<code>border-border</code>), <code>muted</code> (<code>bg-muted/50</code>).</li>
				<li><strong>Header / Footer</strong> — <code>flex basis-full items-center justify-between gap-2</code>.</li>
				<li><strong>Content</strong> — <code>flex flex-1 flex-col gap-1</code> with neighbor-aware <code>[&amp;+[data-slot=item-content]]:flex-none</code>.</li>
				<li><strong>Title</strong> — <code>text-sm leading-snug font-medium</code>.</li>
				<li><strong>Description</strong> — <code>text-muted-foreground text-sm</code>.</li>
				<li><strong>Actions</strong> — right-anchored <code>flex items-center gap-2</code>.</li>
				<li><strong>Media</strong> — variant-driven (icon vs image).</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Link hover <code>[a]:hover:bg-accent/50</code>; focus ring <code>border-ring</code> + <code>ring-ring/50 ring-[3px]</code>; muted variant <code>bg-muted/50</code>.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>List row primitive — sidebar nav, transaction rows, settings.</li>
				<li><code>ItemMedia? + (ItemHeader | ItemContent) + ItemActions?</code>; optional <code>ItemFooter</code>.</li>
				<li>Group with <code>ItemGroup</code>; separate with <code>ItemSeparator</code>.</li>
			</ul>
			<div class="docs-h">Not part of Item</div>
			<ul class="docs-list">
				<li>No selection state — caller wires <code>aria-current</code> / <code>data-state</code>.</li>
				<li>No fixed height — sizes to content.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Composable list-row with two sizes / three variants and jade focus ring.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Composable row
					(default/sm × default/outline/muted) with sub-parts
					Media/Header/Content/Title/Description/Actions/Footer/Group/Separator.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
