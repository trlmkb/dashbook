<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Select,
		SelectTrigger,
		SelectContent,
		SelectItem
	} from '@dashfi/svelte/ui/select';

	const selectProps: PropDef[] = [
		{
			name: 'type',
			type: "'single' | 'multiple'",
			required: true,
			description: 'Selection mode. Drives the shape of value (string vs string[]).'
		},
		{
			name: 'value',
			type: 'string | string[]',
			bindable: true,
			description: 'Bindable selected value. Two-way binding via bind:value.'
		},
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Bindable open state of the dropdown.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the entire select.'
		},
		{
			name: 'name',
			type: 'string',
			description: 'Native form name for the hidden submission input.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'SelectTrigger + SelectContent children.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void | (value: string[]) => void',
			description: 'Fired when selection changes. Type matches the type prop.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'All bits-ui Select.Root props pass through.'
		}
	];

	const selectTriggerProps: PropDef[] = [
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Trigger content — typically the current selection label or a placeholder.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the trigger.'
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
			description: 'All bits-ui Select.Trigger props pass through.'
		}
	];

	const selectContentProps: PropDef[] = [
		{
			name: 'sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in px between the trigger and the floating content.'
		},
		{
			name: 'side',
			type: "'top' | 'right' | 'bottom' | 'left'",
			default: "'bottom'",
			description: 'Preferred side relative to the trigger. Floats to opposite side if no room.'
		},
		{
			name: 'align',
			type: "'start' | 'center' | 'end'",
			default: "'start'",
			description: 'Alignment of content relative to the trigger.'
		},
		{
			name: 'portalProps',
			type: 'SelectPrimitive.PortalProps',
			description: 'Forwarded to the underlying Portal (e.g. target container).'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'SelectItem / SelectSeparator / SelectGroup children.'
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
		}
	];

	const selectItemProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			required: true,
			description: 'The value committed when this item is selected.'
		},
		{
			name: 'label',
			type: 'string',
			description: 'Fallback rendered label when no children snippet is provided.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables this individual item.'
		},
		{
			name: 'children',
			type: 'Snippet<[{ selected: boolean; highlighted: boolean }]>',
			description: 'Custom render snippet. Receives selected and highlighted state.'
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
		}
	];

	let card = $state<string | undefined>(undefined);
	const labels: Record<string, string> = {
		debit: 'Debit',
		corporate: 'Corporate',
		net60: 'Daily Net 60'
	};

	const example = `<script lang="ts">
	import { Select, SelectTrigger, SelectContent, SelectItem } from '@dashfi/svelte/ui/select';
<\/script>

let card = $state<string | undefined>(undefined);

<Select type="single" bind:value={card}>
\t<SelectTrigger>{card ? labels[card] : 'Choose a card'}</SelectTrigger>
\t<SelectContent>
\t\t<SelectItem value="debit">Debit</SelectItem>
\t\t<SelectItem value="corporate">Corporate</SelectItem>
\t\t<SelectItem value="net60">Daily Net 60</SelectItem>
\t</SelectContent>
</Select>`;
</script>

<svelte:head><title>Select — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Select"
	description="Dropdown selection with keyboard navigation. Built on bits-ui."
	importPath="@dashfi/svelte/ui/select"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="280px">
					<Select type="single" bind:value={card}>
						<SelectTrigger>{card ? labels[card] : 'Choose a card'}</SelectTrigger>
						<SelectContent>
							<SelectItem value="debit">Debit</SelectItem>
							<SelectItem value="corporate">Corporate</SelectItem>
							<SelectItem value="net60">Daily Net 60</SelectItem>
						</SelectContent>
					</Select>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Select" props={selectProps} />
			<PropsTable title="SelectTrigger" props={selectTriggerProps} />
			<PropsTable title="SelectContent" props={selectContentProps} />
			<PropsTable title="SelectItem" props={selectItemProps} />
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions (per part)</div>
			<ul class="docs-list">
				<li><strong>SelectTrigger</strong> — 40px height (<code>h-10</code>), full width (<code>w-full</code>), padding 0px horizontal · 8px vertical (<code>px-0 py-2</code>). Type 14px (<code>text-sm</code>). <em>No radius, no shadow, no full border</em>. Only a 1px bottom border (<code>border-b</code>). Mirrors Input shape exactly — underline-only field.</li>
				<li><strong>Trigger chevron</strong> — 16px lucide <code>ChevronDown</code> at 50% opacity (<code>opacity-50</code>), pushed to the right via <code>justify-between</code>.</li>
				<li><strong>SelectContent</strong> — popover surface. <code>max-h-96</code> (384px), <code>min-w-[8rem]</code> (128px), and stretches to the trigger anchor via the bits-ui CSS vars <code>--bits-select-anchor-width</code> / <code>--bits-select-anchor-height</code>. Radius <code>rounded-xl</code> (12px). No border. <code>shadow-lg</code>. Viewport padded <code>p-1</code>.</li>
				<li><strong>SelectItem</strong> — full width, padding 8px left · 32px right · 6px vertical (<code>py-1.5 pr-8 pl-2</code>). Type 14px. Radius <code>rounded-md</code> (6px).</li>
				<li><strong>Check indicator</strong> — 16px lucide <code>Check</code>, absolute at <code>right-2</code> inside a 14px (<code>size-3.5</code>) flex box, only visible when item is selected.</li>
				<li><strong>Side offset</strong> — 4px between trigger and content (<code>sideOffset=4</code>).</li>
				<li><strong>z-index</strong> — content <code>z-[60]</code>.</li>
			</ul>

			<div class="docs-h">Tokens (per part)</div>
			<ul class="docs-list">
				<li><strong>Trigger surface</strong> — <code>bg-transparent</code>, text <code>--color-foreground</code>, bottom-border <code>--color-input</code> (light <code>#b6c0bf</code>, dark <code>#1f2a29</code>).</li>
				<li><strong>Trigger placeholder</strong> — when no value set, text uses <code>--color-muted-foreground</code> (light <code>#6e7878</code>, dark <code>#8b9695</code>) via <code>data-placeholder:text-muted-foreground</code>.</li>
				<li><strong>Trigger focus</strong> — bottom-border switches to <code>--color-foreground</code> (<code>focus:border-foreground</code>); native outline removed. No ring.</li>
				<li><strong>Trigger disabled</strong> — <code>opacity-40</code> + <code>cursor-not-allowed</code>.</li>
				<li><strong>Content surface</strong> — bg <code>--color-popover</code> (light <code>#ffffff</code>, dark <code>#141a19</code>) — brighter than <code>--color-background</code> for menu separation. Text <code>--color-popover-foreground</code>.</li>
				<li><strong>Item</strong> — bg transparent. On highlight (keyboard or hover): bg <code>--color-accent</code> (light <code>#eceae0</code>, dark <code>#181e1d</code>), text <code>--color-accent-foreground</code> via <code>data-highlighted</code>.</li>
				<li><strong>Disabled item</strong> — <code>opacity-50</code> + <code>pointer-events-none</code> via <code>data-disabled</code>.</li>
				<li><strong>Animation</strong> — content fades in + zooms from 95% (<code>fade-in-0 zoom-in-95</code>), translates 4px from the trigger side (<code>slide-in-from-top-2</code> + <code>translate-y-1</code> on bottom side, mirrored for other sides).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Standard tree: <code>Select &gt; SelectTrigger + SelectContent &gt; SelectItem...</code>. Trigger holds the visible selection text; SelectContent portals to <code>body</code>.</li>
				<li><code>type="single"</code> for single-select (string value); <code>type="multiple"</code> for multi-select (string[] value).</li>
				<li>For groups / separators, use <code>SelectGroup</code> and <code>SelectSeparator</code>.</li>
				<li>To preserve typed selection state across re-renders, bind <code>value</code>.</li>
			</ul>

			<div class="docs-h">Not part of Select</div>
			<ul class="docs-list">
				<li>No size variants on the trigger. Always <code>h-10</code> — matches Input.</li>
				<li>No <code>placeholder</code> prop on Select. Place the placeholder text inside <code>SelectTrigger</code> as fallback content (e.g. <code>&#123;value ? labels[value] : 'Choose...'&#125;</code>).</li>
				<li>No full border, no radius, no shadow on the trigger. It is an underline-only field. The previous box-style trigger is gone.</li>
				<li>No native <code>&lt;select&gt;</code> fallback. The component is fully custom.</li>
				<li>No virtualisation. For very long lists, prefer Command palette pattern.</li>
				<li>No icon-prefix slot on the trigger. The chevron at the right is fixed.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>Select.type</code> — required, <code>'single'</code> or <code>'multiple'</code>.</li>
				<li><code>Select.value</code> — bindable, string or string[].</li>
				<li><code>SelectContent.sideOffset</code>, <code>side</code>, <code>align</code> — positioning.</li>
				<li><code>SelectItem.value</code> — required.</li>
				<li>All bits-ui <code>Select.*</code> props pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Trigger mirrors Input exactly: 40px tall, transparent bg, <code>border-b</code> only in <code>--color-input</code>, no radius, no shadow. On focus the bottom border becomes <code>--color-foreground</code>. Content surface uses the brighter <code>--color-popover</code> token, <code>rounded-xl</code> 12px with <code>shadow-lg</code>, no border. Items highlight to <code>--color-accent</code>.</li>
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
					Trigger flipped from a boxed field to an underline-only
					field — height bumps from <code>h-9</code> to <code>h-10</code>,
					padding from <code>px-3 py-2</code> to <code>px-0 py-2</code>,
					the full border drops to <code>border-b</code>, and radius
					+ <code>shadow-sm</code> are removed. Focus state is now a
					bottom-border colour change to <code>--color-foreground</code>
					(no ring). Content surface picks up <code>rounded-xl</code>
					(12px) and <code>shadow-lg</code>; items use
					<code>rounded-md</code>. The previous v0.3.1 anatomy
					referenced a stale branch and is no longer accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-13</span>
				<p>
					Anatomy added: trigger mirrors Input exactly (36px, transparent
					bg, <code>--color-input</code> border, focus ring in
					<code>--color-ring</code>), content uses <code>--color-popover</code>
					+ <code>shadow-md</code>, items highlight to
					<code>--color-accent</code>. Composition rule (Select +
					Trigger + Content + Item siblings; placeholder is fallback
					content not a prop) and explicit non-features. Matches the
					Input precedent.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
