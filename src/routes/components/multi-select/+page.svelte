<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { MultiSelect, type MultiSelectOption } from '@dashfi/svelte/ui/multi-select';

	const propsTable: PropDef[] = [
		{
			name: 'options',
			type: 'MultiSelectOption[]',
			required: true,
			description: 'Available options. Each option is { value: string; label: string }.'
		},
		{
			name: 'selected',
			type: 'string[]',
			default: '[]',
			bindable: true,
			description: 'Currently selected option values. Two-way binding via bind:selected.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Select...'",
			description: 'Placeholder shown when no options are selected.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the trigger, hides the clear button, and prevents opening.'
		},
		{
			name: 'onchange',
			type: '(selected: string[]) => void',
			description: 'Fires when selection changes. Receives the new selected array.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge on the wrapper.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the inner combobox div.'
		},
		{
			name: '...rest',
			type: "HTMLAttributes<HTMLDivElement> (without 'onchange')",
			description: 'Remaining native div attributes pass through to the outer container.'
		}
	];

	const options: MultiSelectOption[] = [
		{ value: 'meta', label: 'Meta' },
		{ value: 'google', label: 'Google' },
		{ value: 'tiktok', label: 'TikTok' },
		{ value: 'pinterest', label: 'Pinterest' },
		{ value: 'reddit', label: 'Reddit' }
	];
	let selected = $state<string[]>([]);

	const example = `<script lang="ts">
	import { MultiSelect, type MultiSelectOption } from '@dashfi/svelte/ui/multi-select';
<\/script>

const options: MultiSelectOption[] = [
\t{ value: 'meta', label: 'Meta' },
\t{ value: 'google', label: 'Google' }
];
let selected = $state<string[]>([]);

<MultiSelect {options} bind:selected placeholder="Select channels" />`;
</script>

<svelte:head><title>Multi Select — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Multi Select"
	description="Select multiple options. Built-in search and chips for selected values."
	importPath="@dashfi/svelte/ui/multi-select"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="320px">
					<MultiSelect {options} bind:selected placeholder="Select channels" />
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
				<li><strong>Trigger</strong> — mirrors the canonical Input shape (<code>h-10 border-b</code> underline). Shows selected <code>Badge</code> chips inline with a <code>ChevronDown</code> on the right.</li>
				<li><strong>Selected Badge chips</strong> — use the canonical <code>Badge</code> component with an <code>X</code> icon for in-place removal.</li>
				<li><strong>Dropdown panel</strong> — popover container with option rows; checked options show a check glyph.</li>
				<li><strong>Disabled state</strong> — opacity-40 + pointer-events-none on the whole control.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Trigger inherits Input tokens; chips inherit Badge tokens (mono caps, hairline border).</li>
				<li>Panel uses <code>--color-popover</code> + <code>--color-popover-foreground</code>.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Pass <code>options: {`{ value, label }[]`}</code>; bind <code>selected: string[]</code>.</li>
				<li><code>onchange</code> fires with the new selected array on every toggle.</li>
			</ul>
			<div class="docs-h">Not part of MultiSelect</div>
			<ul class="docs-list">
				<li>No search / typeahead. For searchable lists use <code>Command</code> inside a <code>Popover</code>.</li>
				<li>No grouped options. Flat list only.</li>
				<li>No custom option render slot.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Underline trigger + Badge chips + popover list. <code>options</code> + <code>selected</code> + <code>onchange</code> is the surface.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Underline-Input-shaped
					trigger with inline Badge chips, X-to-remove per chip,
					ChevronDown right. No search.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
