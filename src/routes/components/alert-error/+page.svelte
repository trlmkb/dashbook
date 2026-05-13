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

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Outer panel</strong> — <code>flex min-h-[400px] items-center justify-center p-8</code>. Minimum 400px tall, 32px padding.</li>
				<li><strong>Inner column</strong> — <code>flex max-w-md flex-col items-center text-center</code> (max 448px wide, centered).</li>
				<li><strong>Icon badge</strong> — <code>size-16</code> (64×64), <code>rounded-full</code>, <code>mb-4</code>; the alert glyph is <code>size-8</code> (32×32) inside.</li>
				<li><strong>Title</strong> — <code>text-lg font-semibold mb-2</code> (18px).</li>
				<li><strong>Description</strong> — <code>text-sm mb-6</code> (14px, 24px bottom gap).</li>
				<li><strong>Action row</strong> — <code>flex gap-2</code>. Retry (outline) + Close (ghost) Buttons at <code>size="sm"</code>.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Icon badge bg</strong> — <code>bg-destructive/10</code> (10% destructive). In light mode that's <code>#0000001a</code>; in dark <code>#ffffff1a</code>.</li>
				<li><strong>Icon glyph</strong> — <code>text-destructive</code> → <code>--color-destructive</code> (monochrome: <code>#000000</code>/<code>#ffffff</code>).</li>
				<li><strong>Description text</strong> — <code>text-muted-foreground</code> → <code>--color-muted-foreground</code> (<code>#6e7878</code>/<code>#8b9695</code>).</li>
				<li>Buttons inherit from the Button component (outline + ghost variants).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Drop into a full-panel error surface — content area of a card, modal body, blank page state.</li>
				<li>Provide <code>onRetry</code> to render the retry CTA; <code>isRetryLoading</code> swaps the icon for a spinning <code>RefreshCw</code>.</li>
				<li>Provide <code>onClose</code> to render the dismiss CTA. Either, both, or neither — the actions row only renders when at least one handler is set.</li>
			</ul>

			<div class="docs-h">Not part of AlertError</div>
			<ul class="docs-list">
				<li>Not the same shape as inline <code>Alert</code>. AlertError is a full-panel illustration; Alert is an inline-row variant. Don't conflate.</li>
				<li>No variant prop — the destructive monochrome treatment is fixed.</li>
				<li>No custom icon — uses Lucide <code>CircleAlert</code> always. To recolor or replace, compose your own panel using <code>Alert variant="destructive"</code>.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Vertical centered panel (min-h 400, p-8), 64px round icon badge in destructive/10, 18px title, 14px muted description, outline + ghost button row.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Full-panel
					min-h-400 centered illustration with a 64px round
					<code>bg-destructive/10</code> badge, <code>text-lg</code> semibold title,
					<code>text-sm</code> muted description, optional retry + close Button row.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
