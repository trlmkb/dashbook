<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '@dashfi/svelte/ui/hover-card';
	import { Button } from '@dashfi/svelte/ui/button';

	const rootProps: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Controlled open state. Bind with bind:open or use onOpenChange to track.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the card opens or closes.'
		},
		{
			name: 'openDelay',
			type: 'number',
			default: '700',
			description: 'Milliseconds to wait after hover/focus before the card opens.'
		},
		{
			name: 'closeDelay',
			type: 'number',
			default: '300',
			description: 'Milliseconds to wait after pointer leaves before the card closes.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Composition slot — typically HoverCardTrigger and HoverCardContent.'
		}
	];

	const contentProps: PropDef[] = [
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
			description: 'Distance in pixels between the trigger and the content.'
		},
		{
			name: 'transition',
			type: '(node: Element, params?: unknown) => TransitionConfig',
			default: 'flyAndScale',
			description: 'Svelte transition function applied on mount/unmount.'
		},
		{
			name: 'transitionConfig',
			type: 'TransitionConfig',
			description: 'Parameters forwarded to the transition function.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged onto the content surface.'
		}
	];

	const triggerProps: PropDef[] = [
		{
			name: 'HoverCardTrigger',
			type: 'Component',
			description: 'Re-exported from bits-ui LinkPreview.Trigger. Use the child snippet to render a custom element.'
		}
	];

	const example = `<script lang="ts">
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '@dashfi/svelte/ui/hover-card';
<\/script>

<HoverCard>
\t<HoverCardTrigger>@dashfi</HoverCardTrigger>
\t<HoverCardContent>...preview content...</HoverCardContent>
</HoverCard>`;
</script>

<svelte:head><title>Hover Card — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Hover Card"
	description="Floating card on hover — richer than a tooltip. For previews, mini-profiles, link expansions."
	importPath="@dashfi/svelte/ui/hover-card"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<HoverCard>
					<HoverCardTrigger>
						{#snippet child({ props })}
							<Button variant="link" {...props}>@dashfi</Button>
						{/snippet}
					</HoverCardTrigger>
					<HoverCardContent>
						<div style:padding="4px" style:font-size="13px">
							<strong>Dash.fi</strong>
							<p style:margin-top="4px" style:color="var(--fg-muted)">
								The corporate charge card built for high-spend advertisers.
							</p>
						</div>
					</HoverCardContent>
				</HoverCard>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable title="HoverCard (Root)" props={rootProps} />
		<PropsTable title="HoverCardContent" props={contentProps} />
		<PropsTable title="HoverCardTrigger" props={triggerProps} />
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Content</strong> — <code>w-64 border p-4 shadow-md</code>. 256px wide, 1px border, 16px padding, Tailwind v4 <code>shadow-md</code> = <code>0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)</code>.</li>
				<li><strong>Side offset</strong> — 4px default; <code>align</code> defaults to <code>'center'</code>.</li>
				<li><strong>Z-index</strong> — <code>z-50</code>.</li>
				<li><strong>Open / close</strong> — Svelte <code>flyAndScale</code> transition (default).</li>
				<li><strong>Timing</strong> — root <code>openDelay</code> 700ms, <code>closeDelay</code> 300ms.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Background</strong> — <code>bg-popover</code> → <code>--color-popover</code> (light <code>#ffffff</code>, dark <code>#141a19</code>).</li>
				<li><strong>Text</strong> — <code>text-popover-foreground</code> → <code>--color-popover-foreground</code> (<code>#123b39</code>/<code>#ffffff</code>).</li>
				<li><strong>Border</strong> — <code>border-border</code> 1px (<code>--color-border</code> <code>#e8e6dc</code>/<code>#1f2a29</code>).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Use for previews, mini-profiles, link expansions — richer than a Tooltip, lighter than a Popover.</li>
				<li>Triggers on hover AND focus (keyboard-accessible).</li>
				<li>Use the trigger's <code>child</code> snippet to delegate to a Button (typically <code>variant="link"</code>).</li>
			</ul>

			<div class="docs-h">Not part of HoverCard</div>
			<ul class="docs-list">
				<li>No interaction with content — for that, use Popover.</li>
				<li>No essential information — hover affordances can be missed.</li>
				<li>Not for tooltips. Single-line label content belongs in Tooltip.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>256px-wide bordered panel — 1px border, 16px padding, <code>shadow-md</code>, fade-scale animation, hover-+-focus trigger.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). 256px panel —
					<code>bg-popover border p-4 shadow-md</code>. Hover + focus triggered, 700ms
					open delay / 300ms close delay, Svelte <code>flyAndScale</code> animation.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
