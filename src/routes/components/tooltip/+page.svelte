<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Tooltip,
		TooltipTrigger,
		TooltipContent,
		TooltipProvider
	} from '@dashfi/svelte/ui/tooltip';
	import { Button } from '@dashfi/svelte/ui/button';

	const providerProps: PropDef[] = [
		{
			name: 'delayDuration',
			type: 'number',
			default: '700',
			description: 'Milliseconds before a tooltip opens after the pointer enters its trigger.'
		},
		{
			name: 'skipDelayDuration',
			type: 'number',
			default: '300',
			description:
				'When moving between triggers within this many milliseconds, the next tooltip opens immediately (no delay).'
		},
		{
			name: 'disableHoverableContent',
			type: 'boolean',
			default: 'false',
			description: 'When true, the tooltip content is not hoverable — it closes as soon as the pointer leaves the trigger.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'The subtree that should share this provider’s timing settings. Wrap your app once at the root.'
		}
	];

	const rootProps: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			bindable: true,
			description: 'Controlled open state. Use bind:open to read or drive visibility.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the open state changes.'
		},
		{
			name: 'delayDuration',
			type: 'number',
			description: 'Per-tooltip override for the provider’s delayDuration.'
		},
		{
			name: 'disableHoverableContent',
			type: 'boolean',
			description: 'Per-tooltip override — when true, the content is not hoverable.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Must contain a TooltipTrigger and a TooltipContent.'
		}
	];

	const triggerProps: PropDef[] = [
		{
			name: 'child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description:
				'Render-prop pattern for asChild behavior — receives merged props to spread onto your own element (e.g. a Button).'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Default trigger content. Renders a native <button>. Use the child snippet to render a custom element instead.'
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
			description: 'Element ref binding for the trigger.'
		}
	];

	const contentProps: PropDef[] = [
		{
			name: 'side',
			type: "'top' | 'right' | 'bottom' | 'left'",
			default: "'top'",
			description: 'Preferred side of the trigger to render against.'
		},
		{
			name: 'align',
			type: "'start' | 'center' | 'end'",
			default: "'center'",
			description: 'Alignment of the content along the chosen side.'
		},
		{
			name: 'sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in pixels between the trigger and the content.'
		},
		{
			name: 'alignOffset',
			type: 'number',
			default: '0',
			description: 'Offset in pixels along the alignment axis.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Tooltip body content — single sentence; never essential information.'
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
			description: 'Element ref binding for the content surface.'
		}
	];

	const example = `<script lang="ts">
	import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@dashfi/svelte/ui/tooltip';
<\/script>

<TooltipProvider>
\t<Tooltip>
\t\t<TooltipTrigger>Hover me</TooltipTrigger>
\t\t<TooltipContent>Resets midnight UTC.</TooltipContent>
\t</Tooltip>
</TooltipProvider>`;
</script>

<svelte:head><title>Tooltip — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Tooltip"
	description="Hover-revealed label. Single sentence; never essential information (must duplicate or replace it elsewhere)."
	importPath="@dashfi/svelte/ui/tooltip"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							{#snippet child({ props })}
								<Button variant="outline" {...props}>Daily limit</Button>
							{/snippet}
						</TooltipTrigger>
						<TooltipContent>Resets midnight UTC.</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div class="props-stack">
			<section>
				<h3>TooltipProvider</h3>
				<PropsTable props={providerProps} />
			</section>
			<section>
				<h3>Tooltip</h3>
				<PropsTable props={rootProps} />
			</section>
			<section>
				<h3>TooltipTrigger</h3>
				<PropsTable props={triggerProps} />
			</section>
			<section>
				<h3>TooltipContent</h3>
				<PropsTable props={contentProps} />
			</section>
		</div>
	{/snippet}
	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Tooltips show on hover AND keyboard focus — required for keyboard users.</li>
				<li>Never put the only copy of essential info in a tooltip.</li>
				<li>Wrap your app in <code>&lt;TooltipProvider&gt;</code> once at the root for shared timing.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Content</strong> — <code>rounded-md px-3 py-1.5 text-xs</code>. 6px radius, 12px horizontal padding, 6px vertical padding, 12px text.</li>
				<li><strong>Side offset</strong> — 4px default between trigger and content.</li>
				<li><strong>Z-index</strong> — <code>z-50</code>.</li>
				<li><strong>Animations</strong> — <code>data-[state=open]:animate-in fade-in-0 zoom-in-95</code> + side-aware slide-in by 2; reversed on close.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Background</strong> — <code>bg-primary</code> → <code>--color-primary</code> (light <code>#25261d</code> ink, dark <code>#ffffff</code>).</li>
				<li><strong>Text</strong> — <code>text-primary-foreground</code> → <code>--color-primary-foreground</code> (<code>#ffffff</code>/<code>#000000</code>).</li>
				<li>Inverted from surrounding surface — that's the tooltip's signature.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Wrap your app root with <code>TooltipProvider</code> once. Per-tooltip <code>delayDuration</code>/<code>disableHoverableContent</code> overrides are supported.</li>
				<li>Use <code>TooltipTrigger</code>'s <code>child</code> snippet to delegate to a custom element (Button, IconButton, etc.) — never re-trigger by stacking buttons.</li>
				<li>Content goes through a Portal so positioning never gets clipped by ancestor overflow.</li>
			</ul>

			<div class="docs-h">Not part of Tooltip</div>
			<ul class="docs-list">
				<li>No arrow / caret. Content is rectangular; positioning is the only directional cue.</li>
				<li>No multi-line layout helpers. Tooltips are single-sentence affordances.</li>
				<li>No interactive content. Use Popover or HoverCard instead.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li><code>--color-primary</code> bg, <code>--color-primary-foreground</code> text, 6px radius, 12/6 padding, 12px type. Position via Floating UI / equivalent.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Inverted
					surface — <code>bg-primary text-primary-foreground rounded-md px-3 py-1.5
					text-xs</code>. No arrow. Portal-rendered. Open/close
					<code>animate-in/fade-in-0/zoom-in-95</code> + side-aware slide-in.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>

<style>
	.props-stack {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.props-stack h3 {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 0 0 12px;
	}
</style>
