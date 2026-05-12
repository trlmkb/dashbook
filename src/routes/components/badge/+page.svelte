<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Badge } from '@dashfi/svelte/ui/badge';

	const propsTable: PropDef[] = [
		{
			name: 'variant',
			type: "'default' | 'brand' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'success' | 'warning' | 'info'",
			default: "'default'",
			description: 'Visual variant. Controls surface, text, and border tokens.'
		},
		{
			name: 'href',
			type: 'string',
			description: 'When set, the badge renders as an <a> instead of a <span>.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Badge label content. Inline SVG icons render at 12px.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLSpanElement | HTMLAnchorElement>',
			description: 'All native span/anchor attributes are passed through to the underlying element.'
		}
	];

	const example = `<script lang="ts">
	import { Badge } from '@dashfi/svelte/ui/badge';
<\/script>

<Badge>Default</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="destructive">Destructive</Badge>

<Badge href="/transactions">As a link</Badge>`;
</script>

<svelte:head><title>Badge — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Badge"
	description="Short status or category label. Pill-shaped, 10px tracked uppercase mono. Use for tier markers (DEBIT, CORPORATE), status (Active, Frozen), or counts."
	importPath="@dashfi/svelte/ui/badge"
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Variants">
				{#snippet children(_m)}
					<Badge>Default</Badge>
					<Badge variant="brand">Brand</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="ghost">Ghost</Badge>
					<Badge variant="destructive">Destructive</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="info">Info</Badge>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="In context — card tier markers">
				{#snippet children(_m)}
					<Badge variant="default">DEBIT</Badge>
					<Badge variant="brand">CORPORATE</Badge>
					<Badge variant="outline">DAILY NET 60</Badge>
				{/snippet}
			</PreviewCanvas>
		</div>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Variants</div>
			<ul class="docs-list">
				<li><code>default</code> — black surface (the dominant in-product treatment).</li>
				<li><code>brand</code> — jade surface, white text.</li>
				<li><code>outline</code> — transparent with hairline border.</li>
				<li><code>secondary</code>, <code>ghost</code> — quieter affordances.</li>
				<li><code>destructive</code>, <code>success</code>, <code>warning</code>, <code>info</code> — semantic tones (still monochrome — the brand stays restrained).</li>
			</ul>
			<div class="docs-h">Typography</div>
			<ul class="docs-list">
				<li>10px PP Supply Mono, 500 weight, 0.05em+ tracking, uppercase.</li>
				<li><code>tabular-nums</code> on by default — numbers in badges align.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<div class="docs-h">Semantics</div>
			<ul class="docs-list">
				<li>Renders as <code>&lt;span&gt;</code> by default, <code>&lt;a&gt;</code> if <code>href</code> is provided.</li>
				<li>Decorative-only badges should be hidden from AT (<code>aria-hidden="true"</code>).</li>
				<li>Status badges should be paired with an accessible label or live region for state changes.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
