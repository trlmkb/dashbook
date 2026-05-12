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
	description="Text field. Hairline border, square corners, focus ring in jade. Supports masks (for formatted input) and debounced binding (for search)."
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
			<div class="docs-h">Props</div>
			<ul class="docs-list">
				<li><code>value</code> — bindable. Standard form-input pattern.</li>
				<li><code>debounce</code> — milliseconds between user input and value commit. For search/autocomplete.</li>
				<li><code>mask</code> — pattern string (e.g. <code>"$0,000.00"</code> or <code>"+1 (000) 000-0000"</code>). Powered by a Svelte action.</li>
				<li>All native <code>&lt;input&gt;</code> attributes pass through (<code>type</code>, <code>placeholder</code>, <code>disabled</code>, <code>readonly</code>, etc).</li>
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
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
