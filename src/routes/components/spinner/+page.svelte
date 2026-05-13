<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Spinner } from '@dashfi/svelte/ui/spinner';

	const propsTable: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			default: "'h-2'",
			description: 'Tailwind classes merged onto the SVG. Override sizing via h-* / w-* utilities. Color follows currentColor.'
		}
	];

	const example = `<script lang="ts">
	import { Spinner } from '@dashfi/svelte/ui/spinner';
<\/script>

<Spinner />`;
</script>

<svelte:head><title>Spinner — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Spinner"
	description="Compact rotating indicator for indeterminate work. Smaller than Loader — fits inline next to text."
	importPath="@dashfi/svelte/ui/spinner"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<Spinner />
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
				<li><strong>Default size</strong> — 8px tall (<code>h-2</code>). Width matches height (square viewBox). Override via <code>h-*</code> / <code>w-*</code> utilities on <code>class</code>.</li>
				<li><strong>Geometry</strong> — 32-ray snowflake on a 161×161 viewBox. <em>Not</em> a single rotating arc — the visual is a static glyph that rotates as a whole if the consumer wraps it in <code>animate-spin</code>.</li>
				<li><strong>Element</strong> — single <code>&lt;svg&gt;</code>. No wrapper. <code>fill</code> uses <code>currentColor</code>.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Fill</strong> — <code>currentColor</code>. Inherits from parent's <code>color</code>. There is no dedicated spinner colour token — match the surrounding text colour.</li>
				<li><strong>Background</strong> — none. The spinner is its rays, nothing else.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Inline next to text or in a label: <code>&lt;Spinner /&gt;</code>. The default <code>h-2</code> sits within a line of body copy at 14px.</li>
				<li>To animate, the consumer wraps with <code>animate-spin</code> via <code>class="animate-spin"</code> — the library does not animate by default (some surfaces want the static glyph as a brand mark).</li>
				<li>For loading inside Buttons, Button uses <code>@lucide/svelte/icons/loader</code> + <code>animate-spin</code>, not Spinner. Spinner is a brand-mark first, indicator second.</li>
			</ul>

			<div class="docs-h">Not part of Spinner</div>
			<ul class="docs-list">
				<li>No <code>size</code> prop. Use Tailwind <code>h-*</code> / <code>w-*</code> via <code>class</code>.</li>
				<li>No built-in animation. Animation is opt-in by adding <code>animate-spin</code> at the call site.</li>
				<li>No <code>color</code> prop. Use <code>text-*</code> utilities to set <code>currentColor</code>.</li>
				<li>No determinate / value-based variant. For determinate progress, use Progress.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>class</code> — Tailwind classes merged onto the SVG root.</li>
				<li>All native <code>&lt;svg&gt;</code> attributes pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>The SVG is a 32-ray glyph on a 161×161 viewBox using <code>currentColor</code> fill. Copy the paths from <code>spinner.svelte</code>; the consumer decides on size + animation.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy reverified against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch — Spinner's canonical SVG is unchanged: 161×161 viewBox, 32-ray
					glyph, <code>currentColor</code> fill, default class <code>h-2</code>
					(8px tall) with all sizing overridable via the <code>class</code> prop.
					No animation is baked in — the consumer adds <code>animate-spin</code>.
					v0.3.1's anatomy still holds; this row exists for branch-traceability
					with the other component pages on the regen pass.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-12</span>
				<p>
					Anatomy added: 32-ray snowflake glyph on a 161×161 viewBox,
					default <code>h-2</code> (8px), <code>currentColor</code> fill,
					animation opt-in via <code>animate-spin</code>. Explicit
					non-features (no size / color / built-in animation props).
					Matches the Input precedent.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
