<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Popover,
		PopoverTrigger,
		PopoverContent
	} from '@dashfi/svelte/ui/popover';
	import { Button } from '@dashfi/svelte/ui/button';

	const rootProps: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Whether the popover is open. Two-way binding via bind:open.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the open state changes.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Should contain PopoverTrigger and PopoverContent.'
		}
	];

	const triggerProps: PropDef[] = [
		{
			name: 'child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-as-child snippet for delegating to a custom trigger element (e.g. Button).'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Default trigger content when child snippet is not used.'
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
			description: 'Element ref binding.'
		}
	];

	const contentProps: PropDef[] = [
		{
			name: 'side',
			type: "'top' | 'bottom' | 'left' | 'right' | 'bottom-end'",
			description: 'Side of the trigger to position content. Bottom-end aligns the content end to the trigger end.'
		},
		{
			name: 'align',
			type: "'start' | 'center' | 'end'",
			default: "'center'",
			description: 'Alignment of the content relative to the trigger along the chosen side.'
		},
		{
			name: 'sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in px between the trigger and the popover content.'
		},
		{
			name: 'portalProps',
			type: 'PopoverPortalProps',
			description: 'Props forwarded to the underlying Popover.Portal.'
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
			description: 'Element ref binding for the content surface.'
		},
		{
			name: '...restProps',
			type: 'Popover.ContentProps',
			description: 'All bits-ui Popover.Content props pass through (e.g. forceMount, onEscapeKeydown, onInteractOutside).'
		}
	];

	const closeProps: PropDef[] = [
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
			description: 'Element ref binding.'
		},
		{
			name: '...restProps',
			type: 'Popover.CloseProps',
			description: 'All bits-ui Popover.Close props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Popover, PopoverTrigger, PopoverContent } from '@dashfi/svelte/ui/popover';
<\/script>

<Popover>
\t<PopoverTrigger>Filter</PopoverTrigger>
\t<PopoverContent>...</PopoverContent>
</Popover>`;
</script>

<svelte:head><title>Popover — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Popover"
	description="Floating panel anchored to a trigger. For filters, mini-forms, secondary actions."
	importPath="@dashfi/svelte/ui/popover"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Popover>
					<PopoverTrigger>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>Filter</Button>
						{/snippet}
					</PopoverTrigger>
					<PopoverContent>
						<div style:display="flex" style:flex-direction="column" style:gap="8px" style:padding="4px">
							<div style:font-size="13px" style:font-weight="500">Filter by tier</div>
							<div style:font-size="13px" style:color="var(--fg-muted)">Debit · Corporate · Net 60</div>
						</div>
					</PopoverContent>
				</Popover>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Popover" props={rootProps} />
			<PropsTable title="PopoverTrigger" props={triggerProps} />
			<PropsTable title="PopoverContent" props={contentProps} />
			<PropsTable title="PopoverClose" props={closeProps} />
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Content</strong> — <code>w-72 rounded-xl p-4 shadow-lg</code>. 288px wide, 12px radius, 16px padding, Tailwind v4 <code>shadow-lg</code> = <code>0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)</code>.</li>
				<li><strong>Side offset</strong> — 4px default between trigger and content; <code>align</code> defaults to <code>'center'</code>. Supports <code>side='bottom-end'</code> as an extension.</li>
				<li><strong>Z-index</strong> — <code>z-[60]</code> — sits above tooltips (z-50).</li>
				<li><strong>Animations</strong> — <code>data-[state=open]:animate-in fade-in-0 zoom-in-95</code> + side-aware slide-in by 2; reversed on close.</li>
				<li><strong>Outline</strong> — <code>outline-none</code> on focus (the surface itself doesn't show a ring; focusable children manage their own).</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Background</strong> — <code>bg-popover</code> → <code>--color-popover</code> (light <code>#ffffff</code>, dark <code>#141a19</code> — brighter than <code>--color-background</code>).</li>
				<li><strong>Text</strong> — <code>text-popover-foreground</code> → <code>--color-popover-foreground</code> (<code>#123b39</code>/<code>#ffffff</code>).</li>
				<li>No border — shadow alone separates the popover from the surface.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Wrap a <code>PopoverTrigger</code> + <code>PopoverContent</code> inside <code>Popover</code>. Use the trigger's <code>child</code> snippet to delegate to a Button.</li>
				<li>Portal-rendered — positioning never gets clipped by ancestor overflow.</li>
				<li>For interactive forms / filter chips. Use Tooltip for read-only labels and HoverCard for previews.</li>
			</ul>

			<div class="docs-h">Not part of Popover</div>
			<ul class="docs-list">
				<li>No arrow / caret. Positioning is the only directional cue.</li>
				<li>No backdrop overlay. Use Dialog if you need a modal interaction context.</li>
				<li>No header/footer slots — compose your own padding within <code>PopoverContent</code>.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>288px-wide panel, 12px radius, 16px padding, <code>shadow-lg</code>, no border. Brighter <code>--color-popover</code> surface against the page bg. Position via Floating UI / equivalent.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). 288px
					Portal-rendered panel — <code>bg-popover rounded-xl p-4 shadow-lg</code>.
					No border. <code>z-[60]</code> above tooltips. Open/close animations are
					fade + zoom-95 + side-aware slide-in.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
