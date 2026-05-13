<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { LinearLoader } from '@dashfi/svelte/ui/linear-loader';

	const propsTable: PropDef[] = [
		{
			name: '—',
			type: 'never',
			description:
				'LinearLoader accepts no props. It animates indefinitely; mount it conditionally to show or hide. Wrap in a positioned container to scope the absolute 2px bar.'
		}
	];

	const example = `<script lang="ts">
	import { LinearLoader } from '@dashfi/svelte/ui/linear-loader';
<\/script>

<LinearLoader />`;
</script>

<svelte:head><title>Linear Loader — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Linear Loader"
	description="Indeterminate horizontal bar. Use across the top of a panel or page during background work."
	importPath="@dashfi/svelte/ui/linear-loader"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="320px"><LinearLoader /></div>
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
				<li><strong>Bar</strong> — <code>h-[2px]</code> (2px tall), <code>w-full</code> width.</li>
				<li><strong>Positioning</strong> — <code>absolute right-0 bottom-0 left-0</code>. Caller must place it inside a <code>relative</code>-positioned parent.</li>
				<li><strong>Overflow</strong> — clipped via <code>overflow-hidden</code> so the animated bar doesn't escape.</li>
				<li><strong>Mount</strong> — fades in/out via Svelte <code>fade</code> transition.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Bar fill</strong> — <code>bg-brand</code> → <code>--color-brand</code> (jade <code>#2b605c</code>/<code>#5bb8b0</code>).</li>
				<li><strong>Track</strong> — none. The bar sits over the parent's background (transparent track).</li>
			</ul>

			<div class="docs-h">Animation</div>
			<ul class="docs-list">
				<li>Keyframe <code>slideRight</code>: <code>translateX(-100%) scaleX(0.8)</code> → <code>translateX(100%) scaleX(0.1)</code>.</li>
				<li>Timing: <code>1.2s linear infinite</code>. Bar scales down as it travels right, suggesting acceleration.</li>
				<li><code>transform-origin: left center</code>.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Place at the bottom of a top-bar / card / panel. Mount conditionally to show or hide.</li>
				<li>Wrap in a positioned container — the bar uses <code>absolute</code> with all four edges pinned.</li>
			</ul>

			<div class="docs-h">Not part of LinearLoader</div>
			<ul class="docs-list">
				<li>No props. Indeterminate-only. For determinate progress use <code>Progress</code>.</li>
				<li>No color / size / thickness props. 2px jade bar is brand-canonical.</li>
				<li>No track styling. Caller's surface shows through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>2px absolute-positioned bar in <code>--color-brand</code>, 1.2s linear sliding-and-scaling animation.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). 2px
					absolute-positioned bar in <code>bg-brand</code> with a 1.2s linear
					<code>translateX</code> + <code>scaleX</code> keyframe animation. No props.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
