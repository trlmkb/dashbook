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
</ComponentLayout>
