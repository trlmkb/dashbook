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
			<ul class="docs-list">
				<li><code>type="single"</code> — exactly one item selected; <code>value</code> is a string.</li>
				<li><code>type="multiple"</code> — zero or more items; <code>value</code> is a string array.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
