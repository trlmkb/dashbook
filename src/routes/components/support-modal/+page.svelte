<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { SupportModal } from '@dashfi/svelte/ui/support-modal';

	const propsTable: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Controls visibility of the support modal. Bind with bind:open for two-way state.'
		},
		{
			name: 'handleOnOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the dialog requests to open or close — forwarded to the underlying Dialog.Root.'
		}
	];

	const example = `<script lang="ts">
	import { SupportModal } from '@dashfi/svelte/ui/support-modal';
<\/script>

<!-- Mount at app shell — bound to user session -->
<SupportModal />`;
</script>

<svelte:head><title>Support Modal — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Support Modal"
	description="Help & support widget — Dash.fi-specific. Opens a guided form bound to the user session and tier."
	importPath="@dashfi/svelte/ui/support-modal"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:font-size="13px" style:color="var(--fg-muted)">
					Mount once at the app shell. See Code tab.
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
			<ul class="docs-list">
				<li>Product-specific — designed for Dash.fi authenticated app shell.</li>
				<li>Reads the current session for context (tier, account, recent transactions).</li>
				<li>Routes contact requests to the appropriate queue (CX, Risk, Compliance).</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
