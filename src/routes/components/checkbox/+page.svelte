<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Checkbox } from '@dashfi/svelte/ui/checkbox';
	import { Label } from '@dashfi/svelte/ui/label';

	let agreed = $state(false);
	let mark = $state(true);

	const propsTable: PropDef[] = [
		{
			name: 'checked',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Bindable checked state. Two-way binding via bind:checked.'
		},
		{
			name: 'indeterminate',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Tri-state for "some selected" — renders a minus icon instead of a check.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 40% opacity.'
		},
		{
			name: 'name',
			type: 'string',
			description: 'Native form name. Submits as on/off (or value) when wrapped in a form.'
		},
		{
			name: 'value',
			type: 'string',
			description: 'Value submitted with the form when checked.'
		},
		{
			name: 'id',
			type: 'string',
			description: 'DOM id — pair with Label for="…" for click-to-focus and screen readers.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onCheckedChange',
			type: '(checked: boolean) => void',
			description: 'All bits-ui Checkbox.Root props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Checkbox } from '@dashfi/svelte/ui/checkbox';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

let agreed = $state(false);

<div style="display:flex;gap:12px;align-items:center">
\t<Checkbox id="terms" bind:checked={agreed} />
\t<Label for="terms">I agree to the terms</Label>
</div>`;
</script>

<svelte:head><title>Checkbox — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Checkbox"
	description="Boolean input. Pair with a Label. Supports unchecked / checked states."
	importPath="@dashfi/svelte/ui/checkbox"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:display="flex" style:flex-direction="column" style:gap="12px">
					<div style:display="flex" style:gap="12px" style:align-items="center">
						<Checkbox id="cb-1" bind:checked={agreed} />
						<Label for="cb-1">Unchecked default</Label>
					</div>
					<div style:display="flex" style:gap="12px" style:align-items="center">
						<Checkbox id="cb-2" bind:checked={mark} />
						<Label for="cb-2">Checked default</Label>
					</div>
					<div style:display="flex" style:gap="12px" style:align-items="center">
						<Checkbox id="cb-3" disabled />
						<Label for="cb-3">Disabled</Label>
					</div>
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
				<li><strong>Size</strong> — 16px square (<code>size-4</code>). <code>box-content</code> so the border sits outside the 16px box (visible total ≈ 18px including the 1px border on each side).</li>
				<li><strong>Radius</strong> — none. The control has square corners — the canonical class has no <code>rounded-*</code> token.</li>
				<li><strong>Border</strong> — 1px (<code>border</code>) in <code>--color-primary</code> — light <code>#25261d</code>, dark <code>#ffffff</code>. The border colour does <em>not</em> change between unchecked and checked states.</li>
				<li><strong>Check glyph</strong> — 16px lucide <code>Check</code> icon (<code>size-4</code>), transparent when unchecked, <code>--color-primary-foreground</code> when checked. 16px lucide <code>Minus</code> when indeterminate.</li>
				<li><strong>Transition</strong> — <code>transition-colors</code>. Fill / glyph animate; geometry does not.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Unchecked</strong> — bg transparent (<code>bg-transparent</code>), border <code>--color-primary</code>, check glyph transparent.</li>
				<li><strong>Checked</strong> — bg <code>--color-primary</code> (light <code>#25261d</code>, dark <code>#ffffff</code>) via <code>data-[state=checked]:bg-primary</code>, glyph <code>--color-primary-foreground</code> (light <code>#ffffff</code>, dark <code>#000000</code>).</li>
				<li><strong>Indeterminate</strong> — bg unchanged from unchecked, glyph swaps from <code>Check</code> to <code>Minus</code> (always visible in <code>currentColor</code>).</li>
				<li><strong>Focus ring</strong> — 1px (<code>focus-visible:ring-1</code>) in <code>--color-ring</code> (light jade <code>#2b605c</code>, dark <code>#5bb8b0</code>), with <code>focus-visible:outline-none</code> on the native outline. Keyboard focus only.</li>
				<li><strong>Shadow</strong> — none on this branch. The class has no <code>shadow-*</code> token.</li>
				<li><strong>Disabled</strong> — <code>opacity-40</code> + <code>cursor-not-allowed</code>. Both <code>:disabled</code> and <code>data-[disabled=true]</code> apply the same.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Render alongside a sibling <code>&lt;Label for="…"&gt;</code> tied by matching <code>id</code> — never wrap the checkbox in the label, never pass label content as a prop.</li>
				<li>The visible control is built on bits-ui's <code>Checkbox.Root</code> — a <code>&lt;button&gt;</code> with <code>role="checkbox"</code> and a hidden form input below.</li>
			</ul>

			<div class="docs-h">Not part of Checkbox</div>
			<ul class="docs-list">
				<li>No <code>label</code> prop. Use <code>&lt;Label&gt;</code> as a sibling.</li>
				<li>No size variants.</li>
				<li>No tint variants. The control is always <code>--color-primary</code> — checkboxes are not branded.</li>
				<li>No card-style wrapping (the rebuild's checkbox uses a popover surface — the canonical does not).</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>checked</code> — bindable. Standard Svelte 5 <code>$bindable</code>.</li>
				<li><code>indeterminate</code> — bindable. Renders the minus glyph regardless of <code>checked</code>.</li>
				<li><code>disabled</code>, <code>name</code>, <code>value</code>, <code>id</code> — standard form attributes.</li>
				<li>All bits-ui <code>Checkbox.Root</code> props pass through (<code>onCheckedChange</code>, <code>required</code>, etc).</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>16px box (<code>size-4</code>), square corners (no radius), 1px <code>--color-primary</code> border + 16px check glyph in <code>--color-primary-foreground</code> on a <code>--color-primary</code> fill when checked. No shadow. Keep it monochrome.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch. Radius removed — Checkbox now has <strong>square corners</strong>
					(canonical class has no <code>rounded-*</code> token); v0.3.1 incorrectly
					claimed <code>rounded-sm</code> 4px. Shadow removed — canonical has no
					<code>shadow-*</code> token. Disabled opacity tightened to
					<code>opacity-40</code> (was <code>opacity-50</code>) and applies via both
					<code>:disabled</code> and <code>data-[disabled=true]</code>. Focus
					treatment confirmed as <code>focus-visible:ring-1</code> in
					<code>--color-ring</code> with <code>focus-visible:outline-none</code>.
					The previous v0.3.1 anatomy referenced a stale branch and is no longer
					accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-12</span>
				<p>
					Anatomy added: 16px <code>size-4</code> box, <code>rounded-sm</code>
					(4px), 1px <code>--color-primary</code> border that stays the same
					colour in both states, fill flips to <code>--color-primary</code>
					when checked, lucide <code>Check</code> / <code>Minus</code> glyph.
					Composition rule (Label as sibling, never a prop) and explicit
					non-features. Matches the Input precedent.
				</p>
			</li>
		</ul>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Always pair with a <code>&lt;Label&gt;</code>.</li>
				<li><code>Space</code> toggles. <code>Tab</code> moves focus.</li>
				<li>Use Switch instead when the change is committed immediately (e.g., a setting).</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
