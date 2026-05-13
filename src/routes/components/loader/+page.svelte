<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Loader } from '@dashfi/svelte/ui/loader';

	const propsTable: PropDef[] = [
		{
			name: 'message',
			type: 'string',
			default: "'Loading, please wait..'",
			description: 'Caption shown beneath the rotating bar.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes appended to the outer container.'
		}
	];

	const example = `<script lang="ts">
	import { Loader } from '@dashfi/svelte/ui/loader';
<\/script>

<Loader />`;
</script>

<svelte:head><title>Loader — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Loader"
	description="Indeterminate spinner. Drop into a button, an empty state, or a card while data loads."
	importPath="@dashfi/svelte/ui/loader"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Loader />
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
				<li><strong>Outer wrapper</strong> — <code>my-auto flex flex-col items-center justify-center gap-2 p-8</code>. 32px padding, 8px gap, centered both axes.</li>
				<li><strong>Glyph container</strong> — <code>flex h-5 items-center justify-center</code> (20px tall).</li>
				<li><strong>Glyph bar</strong> — <code>h-1 w-5 rounded-xs</code> (4px tall × 20px wide, 2px radius).</li>
				<li><strong>Message</strong> — <code>text-sm</code> (14px).</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Bar</strong> — <code>bg-accent-foreground</code> → <code>--color-accent-foreground</code> (light <code>#123b39</code> deep jade, dark <code>#ffffff</code>).</li>
				<li><strong>Message text</strong> — <code>text-muted-foreground</code> → <code>--color-muted-foreground</code> (<code>#6e7878</code>/<code>#8b9695</code>).</li>
			</ul>

			<div class="docs-h">Animation</div>
			<ul class="docs-list">
				<li>Keyframes <code>loading-animation</code>: <code>0% rotate(0deg) → 75% rotate(730deg) → 100% rotate(720deg)</code>. Tiny back-and-forth at the end gives the bar a "settle" feel.</li>
				<li>Timing: <code>1600ms</code> infinite, <code>cubic-bezier(1, 0, 0, 1)</code>, both-direction fill.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Drop into an empty state, a loading card, a button (overrides padding via <code>class</code> prop).</li>
				<li>Message is optional but defaults to <code>'Loading, please wait..'</code>.</li>
			</ul>

			<div class="docs-h">Not part of Loader</div>
			<ul class="docs-list">
				<li>No size variants. The bar size is brand-tuned.</li>
				<li>No color prop. Mono accent-foreground is the canonical tint.</li>
				<li>No determinate progress. For known-progress loading, use <code>LinearLoader</code> or <code>Progress</code>.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Single rotating bar at 1.6s cubic-bezier(1,0,0,1) + a muted caption. <code>--color-accent-foreground</code> tint.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Canonical is a
					rotating 4×20 bar in <code>bg-accent-foreground</code> with a 1.6s
					cubic-bezier rotation keyframe, paired with a <code>text-sm</code> muted
					caption.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
