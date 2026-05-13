<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Label } from '@dashfi/svelte/ui/label';

	const propsTable: PropDef[] = [
		{
			name: 'value',
			type: 'string | number | string[]',
			bindable: true,
			description: 'Bindable value. Two-way binding via bind:value.'
		},
		{
			name: 'mask',
			type: 'string | null',
			default: 'null',
			description: 'Pattern string (e.g. "$0,000.00" or "+1 (000) 000-0000"). Powered by a Svelte action.'
		},
		{
			name: 'debounce',
			type: 'number',
			description: 'Delay in milliseconds before value commits — useful for search inputs.'
		},
		{
			name: 'type',
			type: "'text' | 'email' | 'tel' | 'number' | 'password' | 'search' | 'url' | string",
			default: "'text'",
			description: 'Native input type. Drives mobile keyboard variants.'
		},
		{
			name: 'placeholder',
			type: 'string',
			description: 'Native placeholder rendered in muted-foreground.'
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
			type: 'HTMLInputElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'oninput',
			type: '(event: Event) => void',
			description: 'Fires after each input change. All native input attributes and events pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Input } from '@dashfi/svelte/ui/input';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

<div>
\t<Label for="email">Work email</Label>
\t<Input id="email" type="email" placeholder="you@company.com" />
</div>

<!-- With debounce -->
<Input bind:value={query} debounce={250} placeholder="Search transactions" />

<!-- With mask (e.g. currency) -->
<Input mask="$0,000.00" />`;

	let basicValue = $state('');
	let searchValue = $state('');
</script>

<svelte:head><title>Input — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Input"
	description="Text field. Underline-only — 40px tall, no surrounding border or radius, bottom hairline darkens on focus. Supports masks (for formatted input) and debounced binding (for search)."
	importPath="@dashfi/svelte/ui/input"
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Basic" minHeight="160px">
				{#snippet children(_m)}
					<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="6px">
						<Label for="email">Work email</Label>
						<Input id="email" type="email" placeholder="you@company.com" bind:value={basicValue} />
					</div>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="With debounce" minHeight="160px">
				{#snippet children(_m)}
					<div style:width="320px">
						<Input
							placeholder="Search transactions"
							bind:value={searchValue}
							debounce={250}
						/>
					</div>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="States" minHeight="200px">
				{#snippet children(_m)}
					<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="12px">
						<Input placeholder="Empty" />
						<Input value="Filled" />
						<Input value="Disabled" disabled />
						<Input placeholder="Read only" readonly value="Cannot edit" />
					</div>
				{/snippet}
			</PreviewCanvas>
		</div>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Height</strong> — 40px (<code>h-10</code>). Fixed.</li>
				<li><strong>Width</strong> — 100% of parent (<code>w-full min-w-0</code>). Constrain at the form-field level.</li>
				<li><strong>Padding</strong> — 8px vertical · 0 horizontal (<code>py-2 px-0</code>). The text sits flush against the start of the line.</li>
				<li><strong>Type</strong> — 14px body sans (<code>text-sm font-sans</code>), Bai Jamjuree.</li>
				<li><strong>Radius</strong> — none. The control has no corners — only a bottom border.</li>
			</ul>

			<div class="docs-h">Tokens (per part)</div>
			<ul class="docs-list">
				<li><strong>Border</strong> — <em>bottom only</em> (<code>border-b</code>) — 1px in <code>--color-input</code> (light <code>#b6c0bf</code>, dark <code>#1f2a29</code>). No top / left / right border.</li>
				<li><strong>Background</strong> — transparent (<code>bg-transparent</code>). The input inherits whatever surface it sits on.</li>
				<li><strong>Placeholder</strong> — <code>--color-muted-foreground</code> (light <code>#6e7878</code>, dark <code>#8b9695</code>).</li>
				<li><strong>Focus</strong> — the bottom border darkens to <code>--color-foreground</code> (light <code>#123b39</code>, dark <code>#ffffff</code>) via <code>focus-visible:border-foreground</code>. No ring, no outline — the native <code>outline-none</code> is intentional. The thicker line <em>is</em> the focus indicator.</li>
				<li><strong>Shadow</strong> — none.</li>
				<li><strong>Disabled</strong> — <code>opacity-40</code> + <code>cursor-not-allowed</code>. No alternate fill.</li>
				<li><strong>File input</strong> — when <code>type="file"</code>: <code>file:border-0 file:bg-transparent file:text-sm file:font-medium</code> on the native button-like file picker.</li>
				<li><strong>Transition</strong> — <code>transition-colors</code>. Border animates; geometry does not.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Input is a bare <code>&lt;input&gt;</code> element. Pair it with <code>&lt;Label&gt;</code> as a sibling — never via a <code>label</code> prop. Wire the two with <code>id</code> + <code>for</code>.</li>
				<li>For helper text or validation captions, wrap Label + Input in your own form-field container and place the caption beneath.</li>
				<li>The canonical snippet (Label + Input pair) is shown in the Code tab.</li>
			</ul>

			<div class="docs-h">Not part of Input</div>
			<ul class="docs-list">
				<li>No icon prefix or suffix slot. If you need an affix, build it at the form-field level around the Input — Input itself stays a bare control.</li>
				<li>No built-in label. Always compose with <code>&lt;Label&gt;</code>.</li>
				<li>No background fill. Transparent is load-bearing.</li>
				<li>No internal wrapper element. The root <em>is</em> the <code>&lt;input&gt;</code>.</li>
				<li>No size variants. Height is fixed at 40px to match the field rhythm across the system.</li>
				<li>No corner radius. The control is underline-only — re-implementers must not add <code>rounded-md</code>, a full border, or a shadow.</li>
				<li>No focus ring. The focus indicator is the darkened bottom border alone.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>value</code> — bindable. Standard form-input pattern.</li>
				<li><code>debounce</code> — milliseconds between user input and value commit. For search / autocomplete.</li>
				<li><code>mask</code> — pattern string (e.g. <code>"$0,000.00"</code> or <code>"+1 (000) 000-0000"</code>). Powered by a Svelte action.</li>
				<li>All native <code>&lt;input&gt;</code> attributes pass through (<code>type</code>, <code>placeholder</code>, <code>disabled</code>, <code>readonly</code>, etc).</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>The contract is: 40px tall, transparent bg, no corner radius, no surrounding border, <strong>bottom-only</strong> 1px <code>--color-input</code> hairline, no shadow. Focus darkens the bottom line to <code>--color-foreground</code> — that is the entire focus treatment.</li>
				<li>Tokens (<code>--color-input</code>, <code>--color-foreground</code>, <code>--color-muted-foreground</code>) carry stable values when the Dashbook token sheet is imported.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Always pair with a <code>&lt;Label&gt;</code> or <code>aria-label</code>.</li>
				<li>Use <code>type="email"</code>, <code>"tel"</code>, <code>"number"</code> appropriately for mobile keyboard variants.</li>
				<li>For currency / formatted inputs, also pass <code>inputmode="decimal"</code> for the right keyboard.</li>
				<li>Focus ring uses <code>--ring</code>; visible only on keyboard focus.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch of <code>@dashfi/svelte</code>. Input is now <strong>underline-only</strong>:
					height <code>h-10</code> (40px, was 36), <code>border-b</code> bottom hairline
					only (no surrounding border), no <code>rounded-md</code>, no <code>shadow-sm</code>,
					<code>px-0</code> horizontal padding (text flush to the start). Focus darkens
					the bottom border to <code>--color-foreground</code> — the jade
					<code>focus-visible:ring-1</code> ring is gone. v0.3.1's anatomy described the
					prior boxed look; this row supersedes it.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-12</span>
				<p>
					Anatomy tightened: exact dimensions (h-9 · 36px), padding, radius
					(--radius-md · 6px), and per-part tokens (--color-input,
					--color-ring, --color-muted-foreground) documented with resolved
					hex values. Composition rule (bare input + sibling Label) and
					explicit non-features added so the spec is unambiguous for
					non-Svelte re-implementations. Sets the precedent for tightening
					other component pages.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
