<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Textarea } from '@dashfi/svelte/ui/textarea';
	import { Label } from '@dashfi/svelte/ui/label';

	let note = $state('');

	const propsTable: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			bindable: true,
			description: 'Bindable value. Two-way binding via bind:value.'
		},
		{
			name: 'placeholder',
			type: 'string',
			description: 'Native placeholder rendered in muted-foreground.'
		},
		{
			name: 'rows',
			type: 'number',
			description: 'Initial visible row count. Height auto-grows with content via field-sizing.'
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
			type: 'HTMLTextAreaElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'oninput',
			type: '(event: Event) => void',
			description: 'All native textarea attributes and events pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Textarea } from '@dashfi/svelte/ui/textarea';
<\/script>

<Textarea bind:value={note} placeholder="Internal note..." rows={4} />`;
</script>

<svelte:head><title>Textarea — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Textarea"
	description="Multiline text input. Same border + focus treatment as Input."
	importPath="@dashfi/svelte/ui/textarea"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="320px" style:display="flex" style:flex-direction="column" style:gap="6px">
					<Label for="note">Note</Label>
					<Textarea id="note" bind:value={note} placeholder="Internal note about this transaction..." rows={4} />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}

	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
