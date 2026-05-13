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
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Dialog content</strong> — <code>sm:max-w-[425px]</code> (max 425px from <code>sm+</code>). Inherits all Dialog tokens (16px radius, no border, <code>shadow-xl</code>).</li>
				<li><strong>Option rows</strong> — <code>flex cursor-pointer items-center gap-4 rounded-md border p-4 transition hover:border-primary</code>. 16px padding, 16px gap, hover lifts border to <code>--color-primary</code>.</li>
				<li><strong>Row title</strong> — <code>text-medium</code> sized.</li>
				<li><strong>Row description</strong> — <code>text-muted-foreground text-sm</code>.</li>
				<li><strong>Stack</strong> — <code>flex flex-col gap-3</code> (12px gap between rows).</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Row border at rest <code>--color-border</code>; hover <code>--color-primary</code>.</li>
				<li>Description text <code>--color-muted-foreground</code>.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Pre-built support entry-points (call, message, etc.). Mount at app shell; bind <code>open</code> + <code>handleOnOpenChange</code>.</li>
			</ul>
			<div class="docs-h">Not part of SupportModal</div>
			<ul class="docs-list">
				<li>Not configurable per-instance. Content / options are baked into the component.</li>
				<li>For custom modals use <code>Dialog</code> directly.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Pre-built Dialog with hover-lift option rows.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). 425px Dialog
					with <code>rounded-md border p-4 hover:border-primary</code> option rows.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
