<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { RadioGroup, RadioGroupItem } from '@dashfi/svelte/ui/radio-group';
	import { Label } from '@dashfi/svelte/ui/label';

	let card = $state('debit');

	const radioGroupProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Bindable selected value. Matches the value of the active RadioGroupItem.'
		},
		{
			name: 'name',
			type: 'string',
			description: 'Native form name. All items share this name when wrapped in a form.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables all items in the group.'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Marks the group as required for form validation.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'vertical'",
			description: 'Arrow-key navigation direction.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'RadioGroupItem children, typically alongside labels.'
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
			name: 'onValueChange',
			type: '(value: string) => void',
			description: 'All bits-ui RadioGroup.Root props pass through.'
		}
	];

	const radioGroupItemProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			required: true,
			description: 'The value submitted/bound when this item is selected.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables this individual item.'
		},
		{
			name: 'id',
			type: 'string',
			description: 'DOM id — pair with Label for="…" for click-to-focus.'
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
			name: 'onclick',
			type: '(event: MouseEvent) => void',
			description: 'All bits-ui RadioGroup.Item props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '@dashfi/svelte/ui/radio-group';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

<RadioGroup bind:value={card}>
\t<div style="display:flex;gap:8px;align-items:center">
\t\t<RadioGroupItem value="debit" id="debit" />
\t\t<Label for="debit">Debit</Label>
\t</div>
\t<div style="display:flex;gap:8px;align-items:center">
\t\t<RadioGroupItem value="corporate" id="corp" />
\t\t<Label for="corp">Corporate</Label>
\t</div>
</RadioGroup>`;
</script>

<svelte:head><title>Radio Group — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Radio Group"
	description="Single-option selection. Keyboard-navigable; arrow keys move between items."
	importPath="@dashfi/svelte/ui/radio-group"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<div style:width="280px">
					<RadioGroup bind:value={card}>
						<div style:display="flex" style:gap="8px" style:align-items="center" style:padding="6px 0">
							<RadioGroupItem value="debit" id="rg-debit" />
							<Label for="rg-debit">Debit</Label>
						</div>
						<div style:display="flex" style:gap="8px" style:align-items="center" style:padding="6px 0">
							<RadioGroupItem value="corporate" id="rg-corp" />
							<Label for="rg-corp">Corporate</Label>
						</div>
						<div style:display="flex" style:gap="8px" style:align-items="center" style:padding="6px 0">
							<RadioGroupItem value="net60" id="rg-net60" />
							<Label for="rg-net60">Daily Net 60</Label>
						</div>
					</RadioGroup>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="RadioGroup" props={radioGroupProps} />
			<PropsTable title="RadioGroupItem" props={radioGroupItemProps} />
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions (per part)</div>
			<ul class="docs-list">
				<li><strong>RadioGroup</strong> — wrapper <code>&lt;div&gt;</code> with <code>grid gap-3</code> (12px vertical gap between items). No padding or visual surface — purely a focus / state container.</li>
				<li><strong>RadioGroupItem</strong> — 16px square (<code>size-4</code>), <code>aspect-square</code>. Radius <code>rounded-full</code>. 1px border.</li>
				<li><strong>Indicator</strong> — 8px lucide <code>Circle</code> icon (<code>size-2</code>), filled, centred via <code>top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2</code>. Only visible when item is checked.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Border</strong> — 1px <code>--color-input</code> (light <code>#b6c0bf</code>, dark <code>#1f2a29</code>) — the same hairline tone as Input borders. Stays the same colour in both checked and unchecked states.</li>
				<li><strong>Background</strong> — transparent in light mode. In dark mode <code>bg-input/30</code> (semi-transparent <code>--color-input</code>).</li>
				<li><strong>Indicator fill</strong> — <code>--color-primary</code> (light <code>#25261d</code>, dark <code>#ffffff</code>) via the icon's <code>fill-primary</code> class.</li>
				<li><strong>Focus ring</strong> — 3px (<code>focus-visible:ring-[3px]</code>) in <code>--color-ring</code> at 50% alpha, plus border switches to <code>--color-ring</code>.</li>
				<li><strong>Shadow</strong> — <code>shadow-xs</code> (Tailwind v4 default <code>0 1px rgb(0 0 0 / 0.05)</code>).</li>
				<li><strong>Invalid state</strong> — <code>aria-invalid</code> applies <code>--color-destructive</code> to border + a destructive-tinted ring at 20% / 40%.</li>
				<li><strong>Disabled</strong> — <code>opacity-50</code> + <code>cursor-not-allowed</code>.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Wrap <code>RadioGroupItem</code>s inside <code>RadioGroup</code>. The group holds <code>value</code>, the items declare their <code>value</code> + <code>id</code>.</li>
				<li>Pair each item with a sibling <code>&lt;Label for="…"&gt;</code> tied by matching <code>id</code>.</li>
				<li>The visible control is built on bits-ui's <code>RadioGroup.Item</code> — a <code>&lt;button&gt;</code> with <code>role="radio"</code>.</li>
			</ul>

			<div class="docs-h">Not part of Radio</div>
			<ul class="docs-list">
				<li>No <code>label</code> prop on items. Use a sibling <code>&lt;Label&gt;</code>.</li>
				<li>No size variants. Always <code>size-4</code> (16px).</li>
				<li>No tint variants — the indicator is always <code>--color-primary</code>.</li>
				<li>No card / row wrapping baked in. Layout (gap, padding around label) lives at the call site.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>value</code> — bindable on <code>RadioGroup</code> (selected value).</li>
				<li><code>value</code> required on <code>RadioGroupItem</code> (the value committed when this item is selected).</li>
				<li><code>orientation</code> controls arrow-key navigation direction; defaults to vertical.</li>
				<li>All bits-ui <code>RadioGroup.Root</code> / <code>RadioGroup.Item</code> props pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>16px circle, 1px <code>--color-input</code> border, 8px <code>--color-primary</code> dot indicator (centred) when checked. Group manages selection — items are interchangeable.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy reverified against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch — RadioGroupItem's canonical class is unchanged: 16px
					<code>size-4</code> circle, <code>aspect-square rounded-full border
					shadow-xs</code>, <code>border-input</code> hairline that switches to
					<code>--color-ring</code> on focus, with <code>focus-visible:ring-[3px]</code>
					at <code>--color-ring/50</code>. Indicator is the lucide <code>Circle</code>
					at <code>size-2</code> (8px) filled with <code>--color-primary</code>.
					RadioGroup root remains <code>grid gap-3</code>. v0.3.1's anatomy still
					holds; this row exists for branch-traceability with the other component
					pages on the regen pass.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-12</span>
				<p>
					Anatomy added: 16px <code>size-4</code> circle in
					<code>--color-input</code> border, 8px <code>--color-primary</code>
					dot indicator, focus ring at 3px in <code>--color-ring/50</code>.
					Composition rule (group wraps items, each item gets a sibling
					Label) and explicit non-features. Matches the Input precedent.
				</p>
			</li>
		</ul>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Implements WAI-ARIA radio-group. Arrow keys cycle items; selection follows focus.</li>
				<li>Each <code>RadioGroupItem</code> needs a unique <code>value</code> and matching label.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
