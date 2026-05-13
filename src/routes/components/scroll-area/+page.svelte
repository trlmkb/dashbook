<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { ScrollArea } from '@dashfi/svelte/ui/scroll-area';

	const propsTable: PropDef[] = [
		{
			name: 'orientation',
			type: "'vertical' | 'horizontal' | 'both'",
			default: "'vertical'",
			description: 'Which scrollbars to render.'
		},
		{
			name: 'type',
			type: "'auto' | 'always' | 'scroll' | 'hover'",
			default: "'hover'",
			description: 'Visibility behavior of the scrollbars.'
		},
		{
			name: 'scrollHideDelay',
			type: 'number',
			default: '600',
			description: 'Milliseconds before the scrollbar auto-hides (only with type="scroll" or "hover").'
		},
		{
			name: 'dir',
			type: "'ltr' | 'rtl'",
			default: "'ltr'",
			description: 'Text direction.'
		},
		{
			name: 'scrollbarXClasses',
			type: 'string',
			description: 'Additional classes applied to the horizontal scrollbar.'
		},
		{
			name: 'scrollbarYClasses',
			type: 'string',
			description: 'Additional classes applied to the vertical scrollbar.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the root container.'
		}
	];

	const example = `<script lang="ts">
	import { ScrollArea } from '@dashfi/svelte/ui/scroll-area';
<\/script>

<ScrollArea class="h-72 w-48 border">
\t<!-- long content -->
</ScrollArea>`;

	const items = Array.from({ length: 30 }, (_, i) => ({
		ref: 'TX-' + (4400 + i).toString(16).toUpperCase(),
		amount: (1240 + i * 17).toLocaleString()
	}));
</script>

<svelte:head><title>Scroll Area — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Scroll Area"
	description="Custom-styled scrollbar. Replaces native browser scrollbar for visual consistency."
	importPath="@dashfi/svelte/ui/scroll-area"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="320px">
			{#snippet children(_m)}
				<ScrollArea class="h-64 w-72 border border-border">
					<div style:padding="12px">
						{#each items as item (item.ref)}
							<div style:display="flex" style:justify-content="space-between" style:padding="6px 0" style:font-size="13px" style:font-family="var(--font-mono)">
								<span>{item.ref}</span>
								<span class="tabular-nums">${item.amount}</span>
							</div>
						{/each}
					</div>
				</ScrollArea>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Root</strong> — <code>relative</code>; caller sets bounding height/width.</li>
				<li><strong>Viewport</strong> — <code>size-full rounded-[inherit]</code>; scrollable content area with <code>focus-visible:ring-4 focus-visible:outline-1</code>.</li>
				<li><strong>Scrollbar rail</strong> — 10px (<code>w-2.5</code> / <code>h-2.5</code>) with <code>p-px</code> padding.</li>
				<li><strong>Thumb</strong> — <code>bg-border relative flex-1 rounded-full</code> (pill).</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Thumb <code>--color-border</code>; focus ring <code>--color-ring</code> (jade).</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Wrap any overflowing region (sidebar list, long table, code block) for custom scrollbars vs native.</li>
				<li><code>orientation</code> sets vertical / horizontal / both.</li>
			</ul>
			<div class="docs-h">Not part of ScrollArea</div>
			<ul class="docs-list">
				<li>No virtualization. For huge lists use a virtual-scroller wrapped by ScrollArea.</li>
				<li>No native fallback toggle.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>bits-ui ScrollArea with 10px rails, <code>--color-border</code> pill thumbs, jade focus-ring.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). 10px rails,
					<code>bg-border</code> pill thumbs, <code>--color-ring</code> focus ring.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
