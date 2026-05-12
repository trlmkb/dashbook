<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { AlertError } from '@dashfi/svelte/ui/alert-error';

	const propsTable: PropDef[] = [
		{
			name: 'title',
			type: 'string',
			default: "'Error'",
			description: 'Heading displayed above the description.'
		},
		{
			name: 'description',
			type: 'string',
			default: "'Something went wrong'",
			description: 'Body copy explaining the failure.'
		},
		{
			name: 'onRetry',
			type: '() => void',
			description: 'When provided, renders a retry Button that invokes this handler.'
		},
		{
			name: 'isRetryLoading',
			type: 'boolean',
			default: 'false',
			description: 'Shows a spinning refresh icon and disables the retry button.'
		},
		{
			name: 'retryButtonText',
			type: 'string',
			default: "'Try Again'",
			description: 'Label for the retry button.'
		},
		{
			name: 'onClose',
			type: '() => void',
			description: 'When provided, renders a close Button that invokes this handler.'
		},
		{
			name: 'closeButtonText',
			type: 'string',
			default: "'Close'",
			description: 'Label for the close button.'
		}
	];

	const example = `<script lang="ts">
	import { AlertError } from '@dashfi/svelte/ui/alert-error';
<\/script>

<AlertError
\ttitle="Card declined"
\tdescription="Daily limit reached. Resets midnight UTC."
\tretryButtonText="Retry"
\tonRetry={() => refetch()}
/>`;
</script>

<svelte:head><title>Alert Error — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Alert Error"
	description="Specialized error alert. Pre-styled wrapper around the destructive Alert variant for common error surfaces."
	importPath="@dashfi/svelte/ui/alert-error"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="540px">
					<AlertError
						title="Card declined"
						description="Daily limit reached. Resets midnight UTC."
						retryButtonText="Retry"
						onRetry={() => {}}
					/>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
