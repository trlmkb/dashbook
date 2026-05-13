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
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Container</strong> — <code>fixed inset-0 z-50 flex h-full flex-col overflow-auto bg-background</code>. Full-viewport.</li>
				<li><strong>Header</strong> — <code>flex items-center justify-between gap-8 p-8</code>. 32px padding, 32px gap.</li>
				<li><strong>Logo</strong> — <code>Logo class="h-4 w-auto text-brand dark:text-white"</code>. 16px tall.</li>
				<li><strong>Close button</strong> — <code>Button size="icon" variant="ghost" class="rounded-xl"</code>. 12px radius. Glyph <code>h-3 w-3</code> (12px).</li>
				<li><strong>Body</strong> — caller-controlled. Use the snippet for the content area below the header.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Bg <code>--color-background</code>; logo <code>--color-brand</code> (light) / white (dark); close uses Button ghost variant.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Use for onboarding flows, multi-step setups, hand-off screens — anything that warrants taking the whole viewport.</li>
				<li>Bind <code>isOpen</code>; provide <code>onClose</code> for the confirm-dismiss flow (wraps an AlertDialog with <code>onCloseMessage</code> + <code>onCloseDescription</code>).</li>
			</ul>
			<div class="docs-h">Not part of FullscreenDialog</div>
			<ul class="docs-list">
				<li>No backdrop overlay — the container IS the viewport.</li>
				<li>No portal config — it's already a fixed root.</li>
				<li>Confirm-close is required. To skip it, set <code>onCloseDescription</code> to null and the AlertDialog will not render.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Full-viewport fixed div with header (Logo + Close) and overflow-auto body. Confirm-on-close via AlertDialog.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Full-viewport
					<code>fixed inset-0 bg-background</code> with <code>p-8</code> header containing
					a <code>h-4</code> brand Logo and a ghost-icon Close. Confirm-close
					AlertDialog wrapper.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
