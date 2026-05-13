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
	description="Short status or category label. 10px tracked uppercase mono in a hairline-bordered chip. Use for tier markers (DEBIT, CORPORATE), status (Active, Frozen), or counts."
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
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Padding</strong> — 8px horizontal · 2px vertical (<code>px-2 py-0.5</code>).</li>
				<li><strong>Type</strong> — <strong>10px</strong> (<code>text-[10px]</code>) <strong>mono</strong> (<code>font-mono</code>, PP Supply Mono), weight 500 (<code>font-medium</code>), <code>tabular-nums</code>, <code>uppercase</code>, <code>tracking-wider</code> (0.05em). The badge itself transforms the text to uppercase — callers don't need to.</li>
				<li><strong>Radius</strong> — 6px (<code>rounded-md</code> · <code>--radius-md</code>). Not pill-shaped.</li>
				<li><strong>Border</strong> — 1px (<code>border</code>) — colour depends on variant.</li>
				<li><strong>Display</strong> — <code>inline-flex w-fit shrink-0 items-center justify-center</code>, <code>gap-1</code>, <code>overflow-hidden</code>, <code>whitespace-nowrap</code>, <code>select-none</code>.</li>
				<li><strong>Inline icons</strong> — 12px (<code>[&>svg]:size-3</code>), pointer-events disabled.</li>
				<li><strong>Shadow</strong> — none.</li>
			</ul>

			<div class="docs-h">Tokens (per variant)</div>
			<ul class="docs-list">
				<li><strong>default</strong> — bg <code>--color-primary</code> (light <code>#25261d</code>, dark <code>#ffffff</code>), text <code>--color-primary-foreground</code>, border <code>--color-primary</code>.</li>
				<li><strong>secondary</strong> — transparent bg, text <code>--color-foreground</code>, border <code>--color-border</code> (light <code>#e8e6dc</code>, dark <code>#1f2a29</code>).</li>
				<li><strong>ghost</strong> — transparent bg, text <code>--color-muted-foreground</code>, transparent border.</li>
				<li><strong>destructive</strong> — transparent bg, text <code>--color-foreground</code>, border <code>--color-foreground</code> — a hairline outline in the body colour, not a fill. (Destructive on Badge means "important, look here", not "filled orange".)</li>
				<li><strong>outline</strong> — transparent bg, text <code>--color-muted-foreground</code>, border <code>--color-border</code>.</li>
				<li><strong>success</strong> — transparent bg, text <code>--color-foreground</code>, border <code>--color-foreground</code> — same hairline-in-body-colour treatment as destructive.</li>
				<li><strong>brand</strong> — bg <code>--color-brand</code> (light jade <code>#2b605c</code>, dark <code>#5bb8b0</code>), text <code>--color-brand-foreground</code>, border <code>--color-brand</code>. Filled.</li>
				<li><strong>warning</strong> — transparent bg, text <code>--color-foreground</code>, border <code>--color-foreground</code> — hairline in body colour.</li>
				<li><strong>info</strong> — transparent bg, text <code>--color-foreground</code>, border <code>--color-border</code>.</li>
				<li><strong>Hover</strong> — none baked in (<code>transition-colors</code> applies if a parent surface changes colour).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Render as <code>&lt;span&gt;</code> by default. Passing <code>href</code> swaps to <code>&lt;a&gt;</code>.</li>
				<li>Children are free-form — typed in any case. The badge applies <code>uppercase</code> at the CSS level, so <code>&lt;Badge&gt;debit&lt;/Badge&gt;</code> and <code>&lt;Badge&gt;DEBIT&lt;/Badge&gt;</code> both render as <code>DEBIT</code>.</li>
				<li>Inline 12px SVG icons compose as children: <code>&lt;Badge&gt;&lt;Check /&gt;Active&lt;/Badge&gt;</code>.</li>
			</ul>

			<div class="docs-h">Not part of Badge</div>
			<ul class="docs-list">
				<li>No size prop. Single 10px mono size — matches the brand's data-label rhythm.</li>
				<li>No <code>dot</code> prop. A leading dot is a manual element if needed.</li>
				<li>No body-sans variant. The badge is mono uppercase by design.</li>
				<li>No filled status palette (no Tailwind green/yellow/blue tints). Status variants (<code>success</code>, <code>warning</code>, <code>destructive</code>) are hairline outlines in the body text colour — they read as "look here", not "tinted background".</li>
				<li>No pill radius. Use <code>Pill</code> for that.</li>
				<li>No drop shadow.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>variant</code> — see the matrix above.</li>
				<li><code>href</code> — switches to <code>&lt;a&gt;</code>.</li>
				<li>All native <code>&lt;span&gt;</code> / <code>&lt;a&gt;</code> attributes pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Mono 10px uppercase tracked wider, <code>rounded-md</code> 6px, 1px border. Variant table is the contract — note that on this branch most "status" variants are hairline outlines in body colour, not coloured tints. Only <code>default</code> and <code>brand</code> are filled.</li>
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
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch. The canonical badge IS mono uppercase tracked wider — 10px
					(<code>text-[10px] font-mono uppercase tracking-wider</code>), not body sans.
					Padding tightened to <code>px-2 py-0.5</code>. Inline icons drop to 12px
					(<code>[&gt;svg]:size-3</code>). Drop shadow removed. Variant table reshaped:
					status variants (<code>destructive</code>, <code>success</code>, <code>warning</code>)
					are now hairline outlines in <code>--color-foreground</code> — no tinted
					Tailwind green/yellow/red palette anymore. Only <code>default</code> and
					<code>brand</code> render as filled chips. v0.3.1 described the prior treatment.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-12</span>
				<p>
					Anatomy tightened: exact dimensions (<code>px-2.5 py-0.5</code>,
					<code>text-xs</code>, <code>rounded-md</code>), per-variant token
					tuples with resolved hex for both modes, composition rule, and
					explicit non-features (no size prop, no dot, no
					uppercase-mono transform). Matches the Input precedent. The
					prior anatomy claimed mono uppercase 10px — the canonical
					Tailwind class is <code>text-xs font-medium</code> body sans, no
					uppercase transform.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
