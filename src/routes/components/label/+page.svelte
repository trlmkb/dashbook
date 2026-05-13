<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Label } from '@dashfi/svelte/ui/label';
	import { Input } from '@dashfi/svelte/ui/input';

	const propsTable: PropDef[] = [
		{
			name: 'for',
			type: 'string',
			description: 'ID of the associated input. Clicking the label focuses that input.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Label text content.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLLabelElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onclick',
			type: '(event: MouseEvent) => void',
			description: 'All bits-ui Label.Root props and native label attributes pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Label } from '@dashfi/svelte/ui/label';
	import { Input } from '@dashfi/svelte/ui/input';
<\/script>

<div class="space-y-1.5">
\t<Label for="email">Work email</Label>
\t<Input id="email" type="email" placeholder="you@company.com" />
</div>`;
</script>

<svelte:head><title>Label — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Label"
	description="Form label that pairs with any input via for/id. Required for screen-reader-friendly forms."
	importPath="@dashfi/svelte/ui/label"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="280px" style:display="flex" style:flex-direction="column" style:gap="6px">
					<Label for="email">Work email</Label>
					<Input id="email" type="email" placeholder="you@company.com" />
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
				<li><strong>Type</strong> — 12px (<code>text-xs</code>), weight 500 (<code>font-medium</code>), <code>tracking-wider</code> (≈0.05em letter-spacing), <code>uppercase</code>. The label is now an eyebrow — mono-uppercase by default, not body sans.</li>
				<li><strong>Layout</strong> — <code>flex items-center gap-2</code>. The label is a flex row so adornments (e.g. info icons, badges) sit inline at 8px gap.</li>
				<li><strong>Element</strong> — <code>&lt;label&gt;</code> via bits-ui's <code>Label.Root</code>. No wrapper div.</li>
				<li><strong>Padding</strong> — none. The label sits flush; spacing relative to the input lives at the form-field level.</li>
				<li><strong>Selection</strong> — <code>select-none</code>; the label cannot be text-selected.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Colour</strong> — <code>--color-muted-foreground</code> (light <code>#6e7878</code>, dark <code>#8b9695</code>). The label is intentionally quieter than the input value.</li>
				<li><strong>Peer-disabled state</strong> — when the paired input has <code>disabled</code> and uses the <code>peer</code> class, the label becomes <code>opacity-40</code> + <code>cursor-not-allowed</code>.</li>
				<li><strong>Group-disabled state</strong> — inside a <code>group</code> with <code>data-disabled="true"</code>, the label becomes <code>opacity-40</code> + <code>pointer-events-none</code>.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Pair with any input via matching <code>for</code> / <code>id</code>: <code>&lt;Label for="email"&gt;Email&lt;/Label&gt; &lt;Input id="email" /&gt;</code>.</li>
				<li>For form-field layout, wrap Label + Input + helper in a column-flex container. The underline Input shape means labels can sit close to the input — 6px is a common gap.</li>
				<li>For inline pairing (e.g. Checkbox row), the Label can sit to the right of the input with <code>flex items-center gap-2</code> at the parent.</li>
				<li>Add inline adornments (icons, hint text, status badges) directly as children — the label's own flex row handles spacing.</li>
			</ul>

			<div class="docs-h">Not part of Label</div>
			<ul class="docs-list">
				<li>No <code>required</code> indicator. Add an asterisk or status badge inline as a child.</li>
				<li>No <code>helper</code> / caption slot. Helper text is a separate sibling under the input.</li>
				<li>No size variants. Always <code>text-xs</code> uppercase tracked.</li>
				<li>No body-sans variant. The label is the eyebrow style itself — if you need a body-sans label, render plain text rather than this component.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>for</code> — id of the input to associate. Native HTML semantic.</li>
				<li>All bits-ui <code>Label.Root</code> + native <code>&lt;label&gt;</code> attributes pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>12px weight-500 uppercase with <code>tracking-wider</code> letter-spacing, coloured <code>--color-muted-foreground</code>. Rendered as a flex row (<code>items-center gap-2</code>) so inline adornments work without wrappers. <code>for</code>/<code>htmlFor</code> wires to the input.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch. Label
					is now an eyebrow by default — <code>text-xs font-medium
					tracking-wider uppercase</code> coloured
					<code>--color-muted-foreground</code>, rendered as
					<code>flex items-center gap-2</code> with
					<code>select-none</code>. Previously it was 14px body sans
					inheriting colour. Peer-disabled / group-disabled states
					switch to <code>opacity-40</code>. The previous v0.3.1
					anatomy referenced a stale branch and is no longer accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-13</span>
				<p>
					Anatomy added: <code>text-sm font-medium leading-none</code>,
					inherits colour, peer-disabled state opacity-70. Composition
					rule (sibling to input with for/id) and explicit non-features
					(no required indicator, no helper slot, no size variants, no
					eyebrow variant — use <code>.section-header</code>). Matches
					the Input precedent.
				</p>
			</li>
		</ul>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>The <code>for</code> attribute must match the input's <code>id</code>.</li>
				<li>Clicking the label focuses the associated input.</li>
				<li>Use <code>aria-label</code> on the input only if a visible label is not appropriate.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
