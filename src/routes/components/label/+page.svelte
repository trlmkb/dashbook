<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Label } from '@dashfi/svelte/ui/label';
	import { Input } from '@dashfi/svelte/ui/input';

	const propsTable: PropDef[] = [
		{
			name: 'for',
			type: 'string',
			description: 'ID of the associated input. Clicking the label focuses that input.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Label text content.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLLabelElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onclick',
			type: '(event: MouseEvent) => void',
			description: 'All bits-ui Label.Root props and native label attributes pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Label } from '@dashfi/svelte/ui/label';
	import { Input } from '@dashfi/svelte/ui/input';
<\/script>

<div class="space-y-1.5">
\t<Label for="email">Work email</Label>
\t<Input id="email" type="email" placeholder="you@company.com" />
</div>`;
</script>

<svelte:head><title>Label — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Label"
	description="Form label that pairs with any input via for/id. Required for screen-reader-friendly forms."
	importPath="@dashfi/svelte/ui/label"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="280px" style:display="flex" style:flex-direction="column" style:gap="6px">
					<Label for="email">Work email</Label>
					<Input id="email" type="email" placeholder="you@company.com" />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>The <code>for</code> attribute must match the input's <code>id</code>.</li>
				<li>Clicking the label focuses the associated input.</li>
				<li>Use <code>aria-label</code> on the input only if a visible label is not appropriate.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
