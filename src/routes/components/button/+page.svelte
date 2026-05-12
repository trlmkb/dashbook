<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import Plus from '@lucide/svelte/icons/plus';
	import Download from '@lucide/svelte/icons/download';

	const propsTable: PropDef[] = [
		{
			name: 'variant',
			type: "'brand' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'default'",
			description: 'Visual variant. See Anatomy for full mapping.'
		},
		{
			name: 'size',
			type: "'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'",
			default: "'default'",
			description: 'Size token. Icon sizes are square (no horizontal padding).'
		},
		{
			name: 'loading',
			type: 'boolean',
			default: 'false',
			description: 'Show an inline spinner over a blurred content layer. Disables activation.'
		},
		{
			name: 'href',
			type: 'string',
			description: 'When set, the button renders as an <a> instead of a <button>.'
		},
		{
			name: 'type',
			type: "'button' | 'submit' | 'reset'",
			default: "'button'",
			description: 'Standard HTML button type. Ignored when href is set.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 40% opacity.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Button label content. Can include Lucide icons.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | HTMLAnchorElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onclick',
			type: '(event: MouseEvent) => void',
			description: 'Standard click handler. All native button/anchor events are passed through.'
		}
	];

	const example = `<script lang="ts">
	import { Button } from '@dashfi/svelte/ui/button';
<\/script>

<Button>Default</Button>
<Button variant="brand">Brand</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

<Button loading>Submitting</Button>
<Button disabled>Disabled</Button>
<Button href="/signup">As a link</Button>`;
</script>

<svelte:head><title>Button — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Button"
	description="The primary action surface. Seven variants, six sizes, with a built-in loading state. Renders as a <button> by default — pass href to render as an <a>."
	importPath="@dashfi/svelte/ui/button"
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Variants">
				{#snippet children(_m)}
					<Button>Default</Button>
					<Button variant="brand">Brand</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="Sizes">
				{#snippet children(_m)}
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
					<Button size="lg">Large</Button>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="With icon">
				{#snippet children(_m)}
					<Button>
						<Plus size={16} strokeWidth={1.5} />
						New transaction
					</Button>
					<Button variant="outline">
						<Download size={16} strokeWidth={1.5} />
						Export
					</Button>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="States">
				{#snippet children(_m)}
					<Button loading>Submitting</Button>
					<Button disabled>Disabled</Button>
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
		<div class="anatomy">
			<h3>Variants</h3>
			<ul>
				<li><strong>default</strong> — black surface, white text. The system's primary CTA.</li>
				<li><strong>brand</strong> — jade surface, white text. Used for brand-tied affirmative actions.</li>
				<li><strong>destructive</strong> — black on light, white on dark (monochrome — never red).</li>
				<li><strong>outline</strong> — transparent background, hairline border, foreground text.</li>
				<li><strong>secondary</strong> — same as outline but with a hover-tint instead of a tonal shift.</li>
				<li><strong>ghost</strong> — no border or background; muted text resolves to fg on hover.</li>
				<li><strong>link</strong> — inline-text affordance with underline-offset on hover.</li>
			</ul>
			<h3>Sizes</h3>
			<ul>
				<li><strong>sm</strong> — h-9, gap-1.5, 13px</li>
				<li><strong>default</strong> — h-10, px-5, 14px</li>
				<li><strong>lg</strong> — h-11, px-8, 14px</li>
				<li><strong>icon · icon-sm · icon-lg</strong> — square, no padding</li>
			</ul>
			<h3>Behavior</h3>
			<ul>
				<li><code>active:scale(0.97)</code> on every press — 100ms snap, brand-signature.</li>
				<li><code>loading</code> prop renders an inline spinner over a blurred-content layer.</li>
				<li><code>href</code> prop converts the element to an anchor. Use for navigation only.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet accessibility()}
		<div class="a11y">
			<h3>Keyboard</h3>
			<ul>
				<li><code>Tab</code> — focuses the button.</li>
				<li><code>Space</code> / <code>Enter</code> — activates.</li>
			</ul>
			<h3>Screen reader</h3>
			<ul>
				<li>Renders as a native <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> — inherits semantics. No extra ARIA needed for typical use.</li>
				<li>For icon-only buttons, pass <code>aria-label</code> via <code>{`{...restProps}`}</code>.</li>
				<li><code>loading</code> state visually disables the button and prevents activation; consider an <code>aria-busy</code> announcement.</li>
			</ul>
			<h3>Focus</h3>
			<ul>
				<li>Outline ring uses <code>--ring</code> (jade in light, lifted jade in dark).</li>
				<li>Visible only on keyboard focus (<code>:focus-visible</code>).</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="cl">
			<li>
				<span class="when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>

<style>
	.preview-stack {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.anatomy h3,
	.a11y h3 {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 32px 0 12px;
	}
	.anatomy h3:first-child,
	.a11y h3:first-child {
		margin-top: 0;
	}
	.anatomy ul,
	.a11y ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.anatomy li,
	.a11y li {
		padding: 8px 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		border-top: 1px solid var(--border);
	}
	.anatomy li:first-child,
	.a11y li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
	.cl {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.cl li {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 24px;
		padding: 16px 0;
		border-top: 1px solid var(--border);
	}
	.cl li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.when {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-muted);
	}
	.cl p {
		font-size: 14px;
		color: var(--fg);
	}
</style>
