<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Separator } from '@dashfi/svelte/ui/separator';

	const propsTable: PropDef[] = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Layout axis. Horizontal renders a 1px height bar; vertical a 1px width bar.'
		},
		{
			name: 'decorative',
			type: 'boolean',
			default: 'true',
			description: 'When true, the element is hidden from assistive tech. Set false for semantic separation.'
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
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: '...restProps',
			type: 'SeparatorPrimitive.RootProps',
			description: 'All bits-ui Separator root props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Separator } from '@dashfi/svelte/ui/separator';
<\/script>

<div>Top section</div>
<Separator />
<div>Bottom section</div>

<!-- Vertical -->
<Separator orientation="vertical" />`;
</script>

<svelte:head><title>Separator — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Separator"
	description="Hairline divider. Horizontal by default; pass orientation='vertical' for column dividers."
	importPath="@dashfi/svelte/ui/separator"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="320px">
					<div style:padding="8px 0" style:font-size="14px">Above the line</div>
					<Separator />
					<div style:padding="8px 0" style:font-size="14px">Below the line</div>
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
				<li><strong>Horizontal</strong> (default) — 1px tall (<code>h-px</code>), full width of parent (<code>w-full</code>).</li>
				<li><strong>Vertical</strong> — 1px wide (<code>w-px</code>), full height of parent (<code>h-full</code>). Requires the parent to be a flex container with a defined height.</li>
				<li><strong>Element</strong> — renders as a <code>&lt;div&gt;</code> (or <code>&lt;li role="separator"&gt;</code> in certain bits-ui contexts).</li>
				<li><strong>shrink</strong> — <code>shrink-0</code> — never collapses in a flex layout.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Background</strong> — <code>bg-border</code> resolves to <code>--color-border</code> (light <code>#e8e6dc</code>, dark <code>#1f2a29</code>). Single token for both orientations.</li>
				<li><strong>Border</strong> — none. The separator <em>is</em> the line; it has no surrounding border.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Drop between siblings as a visual divider: title group → separator → content.</li>
				<li>Horizontal separators do not need a wrapping container. Vertical separators must sit inside a flex row with explicit height (e.g. <code>h-6</code> on the parent).</li>
				<li>Use sparingly. The portal style is hairline + restraint — prefer spacing first, separators only when grouping reads ambiguously.</li>
			</ul>

			<div class="docs-h">Not part of Separator</div>
			<ul class="docs-list">
				<li>No thickness prop. 1px is the brand line weight; do not override.</li>
				<li>No colour prop. The single <code>--color-border</code> token is intentional.</li>
				<li>No margin / spacing. Margins live on adjacent siblings or the parent.</li>
				<li>No label / inline-text slot. For "OR" dividers, compose at the call site.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>orientation</code> — <code>'horizontal'</code> (default) or <code>'vertical'</code>.</li>
				<li><code>decorative</code> — when true (default), the element is hidden from AT (<code>role="none"</code>). Set false for semantic separation (e.g. between groups of related items).</li>
				<li>All bits-ui <code>Separator.Root</code> props pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>1px <code>--color-border</code>, full parent length on the appropriate axis. That's the entire contract.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy reverified against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch — Separator's canonical class is unchanged: <code>bg-border shrink-0
					data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full
					data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px</code>.
					Single token (<code>--color-border</code>), 1px line, full parent length on
					the active axis. v0.3.1's anatomy still holds; this row exists for
					branch-traceability with the other component pages on the regen pass.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-12</span>
				<p>
					Anatomy added: 1px line in <code>--color-border</code>, orientation
					behaviour, composition rules (vertical requires flex parent),
					and explicit non-features (no thickness / colour / margin
					props). Matches the Input precedent.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
