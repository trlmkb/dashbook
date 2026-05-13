<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Toggle } from '@dashfi/svelte/ui/toggle';
	import Bold from '@lucide/svelte/icons/bold';

	let pressed = $state(false);

	const propsTable: PropDef[] = [
		{
			name: 'pressed',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Bindable pressed state. Two-way binding via bind:pressed.'
		},
		{
			name: 'variant',
			type: "'default' | 'outline'",
			default: "'default'",
			description: 'Visual variant. Outline adds a hairline border + shadow.'
		},
		{
			name: 'size',
			type: "'default' | 'sm' | 'lg'",
			default: "'default'",
			description: 'Size token. Heights: sm h-8, default h-9, lg h-10.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 50% opacity.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Toggle content. Can include Lucide icons.'
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
			name: 'onPressedChange',
			type: '(pressed: boolean) => void',
			description: 'All bits-ui Toggle.Root props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Toggle } from '@dashfi/svelte/ui/toggle';
	import Bold from '@lucide/svelte/icons/bold';
<\/script>

<Toggle bind:pressed>
\t<Bold size={14} />
\tBold
</Toggle>`;
</script>

<svelte:head><title>Toggle — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Toggle"
	description="Single press-on/press-off button. Shape and size match Button — but tracks a pressed state."
	importPath="@dashfi/svelte/ui/toggle"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<Toggle bind:pressed>
					<Bold size={14} strokeWidth={1.5} />
					Bold
				</Toggle>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions per size</div>
			<ul class="docs-list">
				<li><strong>sm</strong> — <code>h-8 min-w-8 px-2</code> (32px tall, min 32 wide, 8h padding).</li>
				<li><strong>default</strong> — <code>h-9 min-w-9 px-3</code> (36px tall, min 36 wide, 12h).</li>
				<li><strong>lg</strong> — <code>h-10 min-w-10 px-3</code> (40px tall, min 40 wide, 12h).</li>
				<li><strong>Body</strong> — <code>inline-flex items-center justify-center gap-2 text-sm font-medium</code> with auto-sized 16px Lucide glyph (<code>[&amp;_svg]:size-4</code>).</li>
			</ul>
			<div class="docs-h">Variants</div>
			<ul class="docs-list">
				<li><strong>default</strong> — <code>bg-transparent</code>. Hover <code>bg-muted text-muted-foreground</code>. Pressed (<code>data-[state=on]</code>) <code>bg-accent text-accent-foreground</code>.</li>
				<li><strong>outline</strong> — <code>border-input border bg-transparent shadow-sm</code>. Hover <code>bg-accent text-accent-foreground</code>.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Hover bg <code>--color-muted</code>; pressed bg <code>--color-accent</code>; outline border <code>--color-input</code>; focus ring <code>--color-ring</code>.</li>
				<li>Disabled <code>opacity-50</code> + <code>pointer-events-none</code>.</li>
			</ul>
			<div class="docs-h">Not part of Toggle</div>
			<ul class="docs-list">
				<li>Not a Switch — Toggle is press-to-activate (e.g., bold/italic in a rich text editor). Switch is binary on/off (e.g., setting).</li>
				<li>No label slot. Compose label + icon as children of the trigger.</li>
				<li>No destructive variant.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>bits-ui Toggle wrapped with a 2-variant × 3-size <code>tv()</code> matrix. Pressed state via <code>data-state="on"</code>. Switch (binary on/off) and Toggle (press-to-activate button) are two different canonical components — do not conflate when re-implementing.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). 2-variant × 3-size
					<code>tv()</code> matrix (default/outline × sm/default/lg). Pressed state via
					<code>data-state="on"</code> swaps to <code>bg-accent</code>.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
