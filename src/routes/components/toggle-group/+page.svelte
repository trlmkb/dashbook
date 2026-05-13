<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { ToggleGroup, ToggleGroupItem } from '@dashfi/svelte/ui/toggle-group';
	import AlignLeft from '@lucide/svelte/icons/align-left';
	import AlignCenter from '@lucide/svelte/icons/align-center';
	import AlignRight from '@lucide/svelte/icons/align-right';

	let align = $state('left');

	const rootProps: PropDef[] = [
		{
			name: 'type',
			type: "'single' | 'multiple'",
			required: true,
			description: "Selection mode. 'single' binds a string, 'multiple' binds a string array."
		},
		{
			name: 'value',
			type: 'string | string[]',
			bindable: true,
			description: 'Selected value(s). String for type="single", array for type="multiple".'
		},
		{
			name: 'variant',
			type: "'default' | 'outline'",
			default: "'default'",
			description: 'Visual variant shared by all items via context.'
		},
		{
			name: 'size',
			type: "'default' | 'sm' | 'lg'",
			default: "'default'",
			description: 'Size token shared by all items via context.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the whole group.'
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
			description: 'Element ref binding for the underlying group container.'
		},
		{
			name: 'onValueChange',
			type: '(value: string | string[]) => void',
			description: 'Fires when selection changes. Bits-ui ToggleGroup root attributes pass through.'
		}
	];

	const itemProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			required: true,
			description: 'The value contributed to the group when this item is pressed.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables this individual item.'
		},
		{
			name: 'variant',
			type: "'default' | 'outline'",
			description: 'Per-item override. Falls back to group context.'
		},
		{
			name: 'size',
			type: "'default' | 'sm' | 'lg'",
			description: 'Per-item override. Falls back to group context.'
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
			description: 'Element ref binding for the underlying button.'
		},
		{
			name: '...rest',
			type: 'ToggleGroupPrimitive.ItemProps',
			description: 'All bits-ui ToggleGroup.Item attributes and native button events pass through.'
		}
	];

	const example = `<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '@dashfi/svelte/ui/toggle-group';
<\/script>

<ToggleGroup type="single" bind:value={align}>
\t<ToggleGroupItem value="left">Left</ToggleGroupItem>
\t<ToggleGroupItem value="center">Center</ToggleGroupItem>
\t<ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`;
</script>

<svelte:head><title>Toggle Group — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Toggle Group"
	description="Group of toggles — single or multi-select. The segmented-control pattern."
	importPath="@dashfi/svelte/ui/toggle-group"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<ToggleGroup type="single" bind:value={align}>
					<ToggleGroupItem value="left"><AlignLeft size={14} strokeWidth={1.5} /></ToggleGroupItem>
					<ToggleGroupItem value="center"><AlignCenter size={14} strokeWidth={1.5} /></ToggleGroupItem>
					<ToggleGroupItem value="right"><AlignRight size={14} strokeWidth={1.5} /></ToggleGroupItem>
				</ToggleGroup>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="24px">
			<PropsTable title="ToggleGroup" props={rootProps} />
			<PropsTable title="ToggleGroupItem" props={itemProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Root</strong> — <code>flex items-center justify-center gap-1</code>. 4px gap between items.</li>
				<li><strong>Items</strong> — inherit Toggle's dimensions and variant via context (no need to pass <code>size</code> / <code>variant</code> per-item).</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li><code>ToggleGroup type="single|multiple" &gt; ToggleGroupItem*</code>. Set <code>size</code> and <code>variant</code> on the root; children inherit via Svelte context.</li>
				<li>Use for segmented controls (text alignment, sort direction, view mode).</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Items use <code>--color-accent</code> for the pressed state; identical to a lone Toggle.</li>
			</ul>
			<div class="docs-h">Not part of ToggleGroup</div>
			<ul class="docs-list">
				<li>No equal-width sizing — caller controls each item.</li>
				<li>No connected pill / segmented background. Items are independent buttons separated by gap.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>bits-ui ToggleGroup with shared Toggle context. <code>type</code> drives single vs multiple selection.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Flex row of Toggle
					items, 4px gap. Shared size/variant via Svelte context. Single or multiple
					selection.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
