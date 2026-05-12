<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { FullscreenDialog } from '@dashfi/svelte/ui/fullscreen-dialog';

	const propsTable: PropDef[] = [
		{
			name: 'isOpen',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Controls visibility. Bind with bind:isOpen for two-way state.'
		},
		{
			name: 'onClose',
			type: '() => void',
			required: true,
			description: 'Fires after the outro transition completes following a confirmed close.'
		},
		{
			name: 'onCloseMessage',
			type: 'string',
			default: "'Are you sure?'",
			description: 'Title displayed in the close-confirmation AlertDialog.'
		},
		{
			name: 'onCloseDescription',
			type: 'string | null',
			default: 'null',
			description: 'Optional description inside the close-confirmation AlertDialog.'
		},
		{
			name: 'onCloseConfirmText',
			type: 'string',
			default: "'Confirm'",
			description: 'Label for the confirm button in the close-confirmation dialog.'
		},
		{
			name: 'onCloseCancelText',
			type: 'string',
			default: "'Cancel'",
			description: 'Label for the cancel button in the close-confirmation dialog.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Body content rendered inside the edge-to-edge surface, beneath the logo bar.'
		}
	];

	const example = `<script lang="ts">
	import { FullscreenDialog } from '@dashfi/svelte/ui/fullscreen-dialog';
<\/script>

<FullscreenDialog bind:isOpen={kycOpen} onClose={() => (kycOpen = false)}>
\t<!-- KYC flow content -->
</FullscreenDialog>`;
</script>

<svelte:head><title>Fullscreen Dialog — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Fullscreen Dialog"
	description="Edge-to-edge modal — for long flows like KYC, statement download, partner agreement."
	importPath="@dashfi/svelte/ui/fullscreen-dialog"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:font-size="13px" style:color="var(--fg-muted)">
					Trigger via <code>isOpen</code> prop. See Code tab.
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
