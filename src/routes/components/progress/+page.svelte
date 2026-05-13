<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Progress } from '@dashfi/svelte/ui/progress';

	const propsTable: PropDef[] = [
		{
			name: 'value',
			type: 'number | null',
			description: 'Current progress value. When null, the bar is shown empty. Combined with max to compute fill percentage.'
		},
		{
			name: 'max',
			type: 'number',
			default: '100',
			description: 'Maximum value that represents 100% fill.'
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
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		}
	];

	const example = `<script lang="ts">
	import { Progress } from '@dashfi/svelte/ui/progress';
<\/script>

<Progress value={66} max={100} />`;
</script>

<svelte:head><title>Progress — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Progress"
	description="Determinate progress bar. Pass a value (0–100, or 0–max) to animate fill width."
	importPath="@dashfi/svelte/ui/progress"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="16px">
					<Progress value={20} />
					<Progress value={66} />
					<Progress value={100} />
				</div>
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
				<li><strong>Height</strong> — 8px (<code>h-2</code>). Fixed.</li>
				<li><strong>Width</strong> — 100% of parent (<code>w-full</code>). Constrain at the parent.</li>
				<li><strong>Radius</strong> — <code>rounded-full</code> on the track, <code>overflow-hidden</code> so the indicator clips cleanly.</li>
				<li><strong>Element</strong> — bits-ui's <code>Progress.Root</code> renders a single <code>&lt;div role="progressbar"&gt;</code> with a single inner indicator <code>&lt;div&gt;</code>. No labels, no segments.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Track</strong> — <code>bg-brand/10</code> — <code>--color-brand</code> at 10% alpha (light jade <code>#2b605c</code>·10%, dark jade <code>#5bb8b0</code>·10%).</li>
				<li><strong>Indicator</strong> — <code>bg-brand</code> — <code>--color-brand</code> at 100% (light <code>#2b605c</code>, dark <code>#5bb8b0</code>). The fill is the jade brand colour, not monochrome <code>--color-primary</code>.</li>
				<li><strong>Transition</strong> — indicator is <em>always</em> 100% width; visual fill is driven by <code>transform: translateX(-(100 − pct)%)</code> on the indicator. <code>transition-transform duration-700 ease-out</code>. On mount the indicator starts at <code>translateX(-100%)</code> and slides to its target value via <code>requestAnimationFrame</code> for a one-shot entrance animation.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Drop into a column-flex layout next to a numeric label or status pill: <code>&lt;div&gt;Used $200 of $1,000&lt;/div&gt; &lt;Progress value=&#123;20&#125; /&gt;</code>.</li>
				<li>For indeterminate progress, prefer <code>Spinner</code> or <code>LinearLoader</code> — Progress is determinate-only.</li>
				<li>Set <code>max</code> explicitly when the natural max is not 100 (e.g. quota tracking).</li>
			</ul>

			<div class="docs-h">Not part of Progress</div>
			<ul class="docs-list">
				<li>No size / height variants. 8px is the system rhythm.</li>
				<li>No colour variants. Track is <code>brand/10</code>, fill is <code>brand</code> — no <code>primary</code> or destructive tints. The previous primary-based recipe is gone.</li>
				<li>No segmented / step variant. For step indicators, use <code>Stepper</code>.</li>
				<li>No indeterminate state. Use <code>Spinner</code> or <code>LinearLoader</code>.</li>
				<li>No built-in label / caption.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>value</code> — current value. Null renders an empty track.</li>
				<li><code>max</code> — default 100. Indicator fill % = <code>(value / max) * 100</code>.</li>
				<li>All bits-ui <code>Progress.Root</code> props pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>8px tall <code>rounded-full</code> track with <code>--color-brand</code>·10% bg, a full-width child indicator at <code>--color-brand</code>·100% positioned via <code>translateX(-(100 − pct)%)</code>. 700ms <code>ease-out</code> transform transition; defer the initial transform one frame so it animates in on mount.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch. Fill
					is now jade brand (<code>bg-brand</code>) over
					<code>bg-brand/10</code> track — not the previous
					<code>primary</code>/<code>primary/20</code> recipe. The fill
					mechanism switched from width-animation to a
					translateX-based transform with a 700ms ease-out timing and a
					one-shot mount animation. The previous v0.3.1 anatomy
					referenced a stale branch and is no longer accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-13</span>
				<p>
					Anatomy added: <code>h-2</code> rounded-full track in
					<code>--color-primary/20</code>, indicator in
					<code>--color-primary</code>. Composition rule (determinate
					only) and explicit non-features (no colour variants, no
					indeterminate state). The jade fill on a muted brand background
					— canonical uses <code>--color-primary</code>. Matches the
					Input precedent.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
