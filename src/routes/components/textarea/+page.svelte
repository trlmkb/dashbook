<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Textarea } from '@dashfi/svelte/ui/textarea';
	import { Label } from '@dashfi/svelte/ui/label';

	let note = $state('');

	const propsTable: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			bindable: true,
			description: 'Bindable value. Two-way binding via bind:value.'
		},
		{
			name: 'placeholder',
			type: 'string',
			description: 'Native placeholder rendered in muted-foreground.'
		},
		{
			name: 'rows',
			type: 'number',
			description: 'Initial visible row count. Height auto-grows with content via field-sizing.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 40% opacity.'
		},
		{
			name: 'readonly',
			type: 'boolean',
			default: 'false',
			description: 'Native readonly — value is visible but cannot be edited.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLTextAreaElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'oninput',
			type: '(event: Event) => void',
			description: 'All native textarea attributes and events pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Textarea } from '@dashfi/svelte/ui/textarea';
<\/script>

<Textarea bind:value={note} placeholder="Internal note..." rows={4} />`;
</script>

<svelte:head><title>Textarea — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Textarea"
	description="Multiline text input. Same border + focus treatment as Input."
	importPath="@dashfi/svelte/ui/textarea"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="6px">
					<Label for="note">Note</Label>
					<Textarea id="note" bind:value={note} placeholder="Internal note about this transaction..." rows={4} />
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
				<li><strong>Min height</strong> — 96px (<code>min-h-24</code>). Auto-grows via <code>field-sizing-content</code> (Chrome 123+/Firefox 124+).</li>
				<li><strong>Width</strong> — 100% of parent (<code>w-full</code>).</li>
				<li><strong>Padding</strong> — 0px horizontal · 8px vertical (<code>px-0 py-2</code>). No horizontal padding — the underline runs the full width.</li>
				<li><strong>Type</strong> — 14px (<code>text-sm</code>). Native sans (Bai Jamjuree). No responsive bump.</li>
				<li><strong>Radius</strong> — <em>none</em>. The element has no rounded corners.</li>
				<li><strong>Resize handle</strong> — <code>resize-none</code>. Manual resize is disabled — growth is driven by <code>field-sizing-content</code> only.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Border</strong> — bottom border only (<code>border-b</code>), 1px, <code>--color-input</code> (light <code>#b6c0bf</code>, dark <code>#1f2a29</code>) — same underline-only shape as Input and Select trigger.</li>
				<li><strong>Background</strong> — <code>bg-transparent</code>. Inherits whatever surface it sits on.</li>
				<li><strong>Placeholder</strong> — <code>--color-muted-foreground</code> (light <code>#6e7878</code>, dark <code>#8b9695</code>).</li>
				<li><strong>Focus</strong> — bottom border switches to <code>--color-foreground</code> (<code>focus-visible:border-foreground</code>); native outline removed. No ring, no shadow change.</li>
				<li><strong>Disabled</strong> — <code>opacity-40</code> + <code>cursor-not-allowed</code>.</li>
				<li><strong>Transition</strong> — <code>transition-colors</code>. Only border colour animates.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Bare <code>&lt;textarea&gt;</code>. Pair with sibling <code>&lt;Label&gt;</code>.</li>
				<li>Set initial visible row count via <code>rows={`{4}`}</code> — height grows beyond that via <code>field-sizing-content</code>.</li>
				<li>For character / word counters, render adjacent to the textarea, not inside.</li>
				<li>The underline shape means Textarea slots into the same form field rhythm as Input and Select without horizontal alignment mismatch.</li>
			</ul>

			<div class="docs-h">Not part of Textarea</div>
			<ul class="docs-list">
				<li>No <code>label</code> prop. Use sibling <code>&lt;Label&gt;</code>.</li>
				<li>No <code>maxLength</code> / counter UI. Pass <code>maxlength</code> attribute; render count externally.</li>
				<li>No full border, no radius, no shadow. The textarea is an underline field — same shape language as Input.</li>
				<li>No invalid-state ring. <code>aria-invalid</code> styling is not baked in; apply at the call site if needed.</li>
				<li>No size variants.</li>
				<li>No internal wrapper. Root <em>is</em> the <code>&lt;textarea&gt;</code>.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>value</code> — bindable.</li>
				<li><code>rows</code> — initial visible row count.</li>
				<li>All native <code>&lt;textarea&gt;</code> attributes pass through (<code>placeholder</code>, <code>maxlength</code>, <code>readonly</code>, <code>disabled</code>, <code>name</code>, <code>required</code>).</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Underline-only textarea: <code>min-h-24</code> (96px) auto-growing via <code>field-sizing-content</code>, <code>w-full</code>, <code>border-b</code> in <code>--color-input</code>, <code>bg-transparent</code>, <code>px-0 py-2</code>, <code>text-sm</code>, <code>resize-none</code>. Focus flips the bottom border to <code>--color-foreground</code>. No radius, no full border, no shadow, no ring. Mirrors Input shape exactly.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch.
					Textarea moved to the underline-only shape used by Input and
					Select trigger: <code>border-b</code> in
					<code>--color-input</code>, no full border, no radius, no
					shadow, <code>px-0 py-2</code>, <code>text-sm</code>,
					<code>resize-none</code>, <code>min-h-24</code> (96px, was
					<code>min-h-16</code> 64px). Focus flips the bottom border
					to <code>--color-foreground</code> — no ring, no
					box-shadow. The previous v0.3.1 anatomy referenced a stale
					branch and is no longer accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-13</span>
				<p>
					Anatomy added: <code>min-h-16</code> (64px) auto-growing via
					<code>field-sizing-content</code>, <code>px-3 py-2</code>,
					<code>text-base md:text-sm</code>, 1px <code>--color-input</code>
					border (same as Input) but with a 3px ring at 50% alpha on
					focus and <code>shadow-xs</code> (lighter than Input's
					<code>shadow-sm</code>). Composition rule (bare textarea +
					sibling Label) and explicit non-features. Matches the Input
					precedent.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
