<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Pill } from '@dashfi/svelte/ui/pill';

	const propsTable: PropDef[] = [
		{
			name: 'type',
			type: "'base' | 'info' | 'success' | 'warning' | 'danger'",
			default: "'base'",
			description: 'Semantic tone. Controls background, text, and border color tokens.'
		},
		{
			name: 'text',
			type: 'string',
			description: 'Plain-text label. Takes precedence over children when both are provided.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Pill content. Rendered when text is not set.'
		},
		{
			name: 'class',
			type: 'string',
			default: "''",
			description: 'Additional Tailwind classes appended to the root span.'
		}
	];

	const example = `<script lang="ts">
	import { Pill } from '@dashfi/svelte/ui/pill';
<\/script>

<Pill type="base">Pending</Pill>
<Pill type="info">New</Pill>
<Pill type="success">+3% cashback</Pill>
<Pill type="warning">Review</Pill>
<Pill type="danger">−$240</Pill>`;
</script>

<svelte:head><title>Pill — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Pill"
	description="Rounded label or count chip. Five semantic types — base, info, success, warning, danger."
	importPath="@dashfi/svelte/ui/pill"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<Pill type="base">Pending</Pill>
				<Pill type="info">New</Pill>
				<Pill type="success">+3% cashback</Pill>
				<Pill type="warning">Review</Pill>
				<Pill type="danger">−$240</Pill>
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
				<li><strong>Padding</strong> — 10px horizontal · 2px vertical (<code>px-2.5 py-0.5</code>).</li>
				<li><strong>Type</strong> — 12px (<code>text-xs</code>), weight 500 (<code>font-medium</code>), Bai Jamjuree body sans, <code>whitespace-nowrap</code>.</li>
				<li><strong>Radius</strong> — 4px (<code>rounded-sm</code> · <code>--radius-sm</code>). <em>Not</em> pill-shaped despite the name — Pill takes its name from "status pill", not the geometry.</li>
				<li><strong>Border</strong> — 1px — colour matches the type tone.</li>
				<li><strong>Display</strong> — <code>&lt;span&gt;</code>; renders inline.</li>
			</ul>

			<div class="docs-h">Tokens (per type)</div>
			<ul class="docs-list">
				<li><strong>base</strong> — bg <code>--color-muted</code> (light <code>#eceae0</code>, dark <code>#181e1d</code>), text <code>--color-muted-foreground</code> (light <code>#6e7878</code>, dark <code>#8b9695</code>), border <code>--color-border</code>. Neutral.</li>
				<li><strong>info</strong> — bg <code>--color-brand</code> at 10% alpha, text <code>--color-brand</code>, border <code>--color-brand</code> at 30% alpha. Info is brand-tinted on this branch — not blue Tailwind palette. (Both modes use the same alpha-on-brand recipe; <code>--color-brand</code> itself differs light/dark.)</li>
				<li><strong>success</strong> — bg <code>green-100</code> light / <code>green-900</code> at 50% dark, text <code>green-700</code> / <code>green-400</code>, border <code>green-400</code> / <code>green-800</code>.</li>
				<li><strong>warning</strong> — bg <code>orange-100</code> / <code>orange-900</code> at 50%, text <code>orange-700</code> / <code>orange-300</code>, border <code>orange-400</code> / <code>orange-800</code>.</li>
				<li><strong>danger</strong> — bg <code>red-100</code> / <code>red-900</code> at 50%, text <code>red-700</code> / <code>red-300</code>, border <code>red-400</code> / <code>red-800</code>.</li>
				<li>Status types (info / success / warning / danger) sit on tinted backgrounds — distinct from Badge's hairline-only status treatment. The two components serve different surfaces: Pill is for inline status chips, Badge is for tier markers.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Render as <code>&lt;span&gt;</code>. Decorative — does not respond to interaction.</li>
				<li>Content is either <code>text</code> (string prop, takes precedence) or <code>children</code> (snippet). Use <code>text</code> for short literals; <code>children</code> when wrapping is needed.</li>
				<li>Inline with text — drop the Pill into a table cell, sentence, or list item. No surrounding wrapper needed.</li>
			</ul>

			<div class="docs-h">Not part of Pill</div>
			<ul class="docs-list">
				<li>No size variants.</li>
				<li>No icon slot.</li>
				<li>No <code>active</code> / <code>onClick</code> behaviour. Pills are <em>not</em> interactive — for clickable chips use Button with the appropriate styling.</li>
				<li>No pill-shaped radius. The radius is <code>rounded-sm</code> (4px). For full-pill shape, build inline.</li>
				<li>No focus or hover treatment. Decorative.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>type</code> — one of <code>'base' | 'info' | 'success' | 'warning' | 'danger'</code>.</li>
				<li><code>text</code> — plain-text literal. Wins over <code>children</code>.</li>
				<li><code>class</code> — appended to the root <code>&lt;span&gt;</code> class string.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Type token tuples above are the contract. <code>info</code> is brand-tinted on this branch (10% bg / 30% border alpha on <code>--color-brand</code>); <code>success</code>/<code>warning</code>/<code>danger</code> are Tailwind palette tints.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch. <code>base</code> tokens corrected — the prior anatomy had a typo
					(<code>bg-mutescript-muted-foreground</code>); canonical is <code>bg-muted</code>
					with <code>--color-muted-foreground</code> text and <code>--color-border</code>
					border. <code>info</code> is brand-tinted (<code>--color-brand</code> at 10% bg /
					30% border alpha), not blue Tailwind palette. <code>success</code>,
					<code>warning</code>, and <code>danger</code> remain Tailwind palette tints.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-12</span>
				<p>
					Anatomy added: dimensions (<code>px-2.5 py-0.5</code>,
					<code>text-xs</code>, <code>rounded-sm</code> 4px — <em>not</em>
					pill-shaped), per-type Tailwind palette tuples (bg/text/border
					for light + dark), composition rule (decorative
					<code>&lt;span&gt;</code>, not interactive), explicit
					non-features. Sets the precedent vs Badge: Pill is status-only
					and Tailwind-palette-based; Badge carries brand variants.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
