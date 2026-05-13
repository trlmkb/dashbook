<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Indicator } from '@dashfi/svelte/ui/indicator';
	import Bell from '@lucide/svelte/icons/bell';

	const propsTable: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes appended to the root div — use to absolutely position the dot over its anchor.'
		}
	];

	const example = `<script lang="ts">
	import { Indicator } from '@dashfi/svelte/ui/indicator';
<\/script>

<div class="relative">
\t<Bell />
\t<Indicator />
</div>`;
</script>

<svelte:head><title>Indicator — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Indicator"
	description="Small status dot. Layered over icons for unread counts, presence, alerts."
	importPath="@dashfi/svelte/ui/indicator"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:position="relative" style:display="inline-flex">
					<Bell size={20} strokeWidth={1.5} />
					<Indicator />
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
				<li><strong>Size</strong> — <code>size-2.5</code> → 10×10px.</li>
				<li><strong>Outer ring</strong> — <code>border</code> (1px) in <code>--color-background</code>. Acts as a halo so the dot reads on any surface.</li>
				<li><strong>Inner stack</strong> — two absolute-positioned <code>rounded-full</code> spans; the first animates <code>animate-ping</code> with <code>opacity-75</code>, the second is the solid dot.</li>
				<li><strong>Positioning</strong> — caller controls placement; the component renders relative to the parent's positioning context.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Dot + ping</strong> — <code>bg-brand</code> → <code>--color-brand</code> (jade <code>#2b605c</code>/<code>#5bb8b0</code>).</li>
				<li><strong>Halo</strong> — <code>border-background</code> → <code>--color-background</code> (cream <code>#faf8f1</code>/ink <code>#0f1413</code>).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Place over an icon or avatar via <code>position: absolute</code> on a relative parent. The component itself uses absolute-positioned inner spans, so the outer wrapper participates in the parent's positioning context.</li>
				<li>Status-only — for counts (1, 2, 9+) use a Badge instead.</li>
			</ul>

			<div class="docs-h">Not part of Indicator</div>
			<ul class="docs-list">
				<li>No count / number support. Status-only.</li>
				<li>No color prop. Brand jade is the single canonical accent for this dot.</li>
				<li>No size variants. <code>size-2.5</code> (10px) is the brand-tuned hit-target-adjacent size.</li>
				<li>No motion-prefers handling — <code>animate-ping</code> respects user reduced-motion settings via the Tailwind animation.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>10×10 jade dot + halo + pinging ring overlay. Single accent token (<code>--color-brand</code>).</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Canonical is
					<code>size-2.5 rounded-full</code> with a <code>border-background</code> halo and
					two absolute <code>bg-brand</code> spans — solid dot + animate-ping ring.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
