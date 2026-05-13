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
			type: "'sm' | 'default' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg'",
			default: "'default'",
			description: 'Size token. h-9 / h-10 / h-11; icon sizes are square (size-9 / size-10 / size-11).'
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
			description: 'Native disabled — non-interactive, dimmed to 40% opacity, pointer-events disabled.'
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
		<div>
			<div class="docs-h">Dimensions (per size)</div>
			<ul class="docs-list">
				<li><strong>sm</strong> — 36px height (<code>h-9</code>), 16px horizontal padding (<code>px-4</code>), 13px type (<code>text-[13px]</code>), 6px gap (<code>gap-1.5</code>).</li>
				<li><strong>default</strong> — 40px height (<code>h-10</code>), 20px horizontal padding (<code>px-5</code>), 8px vertical (<code>py-2</code>), 14px type (<code>text-sm</code>), 8px gap (<code>gap-2</code>).</li>
				<li><strong>lg</strong> — 44px height (<code>h-11</code>), 32px horizontal padding (<code>px-8</code>), 14px type, 8px gap.</li>
				<li><strong>icon-sm</strong> — 36×36px square (<code>size-9</code>). Icon-only.</li>
				<li><strong>icon</strong> — 40×40px square (<code>size-10</code>). Default icon-only size.</li>
				<li><strong>icon-lg</strong> — 44×44px square (<code>size-11</code>). Larger icon-only.</li>
				<li><strong>Radius</strong> — <code>rounded-md</code> (<code>--radius-md</code> 6px), with <code>[corner-shape:squircle]</code> applied so corners render as squircles in browsers that support the property.</li>
				<li><strong>Type weight</strong> — 500 (<code>font-medium</code>), <code>font-sans</code> (Bai Jamjuree), <code>whitespace-nowrap</code>.</li>
				<li><strong>Inline icons</strong> — 16px (<code>[&_svg]:size-4</code>), <code>shrink-0</code>, pointer-events disabled. Icons compose as children.</li>
				<li><strong>Press</strong> — <code>active:scale-[0.97]</code> baked in (the brand's signature press feedback applies to every button by default on this branch).</li>
			</ul>

			<div class="docs-h">Tokens (per variant)</div>
			<ul class="docs-list">
				<li><strong>brand</strong> — bg <code>--color-brand</code> (light jade <code>#2b605c</code>, dark <code>#5bb8b0</code>), text <code>--color-brand-foreground</code> (<code>#ffffff</code>). Hover drops opacity to 80%.</li>
				<li><strong>default</strong> — bg <code>--color-primary</code> (light <code>#25261d</code>, dark <code>#ffffff</code>), text <code>--color-primary-foreground</code> (light <code>#ffffff</code>, dark <code>#000000</code>). Hover 80% opacity.</li>
				<li><strong>destructive</strong> — bg <code>--color-destructive</code> (<code>#ff4000</code>, both modes), text <code>--color-destructive-foreground</code> (<code>#ffffff</code>). Hover 80% opacity.</li>
				<li><strong>outline</strong> — transparent bg, 1px border in <code>--color-border</code>, text <code>--color-foreground</code>. Hover bg <code>--color-muted</code> at 50% alpha.</li>
				<li><strong>secondary</strong> — bg <code>--color-cobalt</code> (<code>#354cef</code>, both modes — brand constant), text <code>--color-cobalt-foreground</code> (<code>#ffffff</code>). Hover 80% opacity. <em>Note: secondary on this branch is cobalt blue, not the warm-grey surface from previous releases.</em></li>
				<li><strong>ghost</strong> — transparent bg, text <code>--color-muted-foreground</code>. Hover bg <code>--color-muted</code> at 40% alpha, text <code>--color-foreground</code>. No shadow.</li>
				<li><strong>link</strong> — transparent bg, text <code>--color-foreground</code> with <code>underline-offset-4</code>, underline on hover. No shadow.</li>
				<li><strong>Shadow</strong> — none on this branch. Buttons are flat surfaces; the press-scale carries the affordance.</li>
				<li><strong>Focus</strong> — native <code>outline-none</code>. Focus is communicated by browser keyboard cursor / app-level focus styling; the button class doesn't add a ring.</li>
				<li><strong>Disabled</strong> — <code>opacity-40</code> + <code>pointer-events-none</code>. No alternate fill.</li>
				<li><strong>Transition</strong> — <code>transition-all duration-150</code>. Bg, text, border, and scale animate.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Render as <code>&lt;button&gt;</code> by default. Passing <code>href</code> swaps the element to <code>&lt;a&gt;</code> — never both.</li>
				<li>Icons compose as <em>children</em> using <code>@lucide/svelte</code> at <code>size={16}</code>: <code>&lt;Button&gt;&lt;Plus size=&#123;16&#125; /&gt;New&lt;/Button&gt;</code>. There is no <code>icon</code> prop.</li>
				<li><code>loading</code> renders a centred <code>Loader</code> overlay (lucide, <code>animate-spin</code>) inside <code>inset-2</code>; the children layer drops to 50% opacity with <code>blur-xs</code>. On the button (vs anchor) variant the wrapper also adds a <code>backdrop-blur-sm</code> layer.</li>
			</ul>

			<div class="docs-h">Not part of Button</div>
			<ul class="docs-list">
				<li>No <code>icon</code> / <code>iconRight</code> prop. Icons go in the children slot.</li>
				<li>No <code>fullWidth</code> prop. Set <code>w-full</code> via <code>class</code> at the call site.</li>
				<li>No drop shadow. Buttons on this branch are flat — the press-scale and opacity changes are the affordance.</li>
				<li>No focus ring on the class. Rely on the browser keyboard cursor (Buttons inherit <code>outline-none</code>; surface-level focus styling is the caller's responsibility if needed).</li>
				<li>No "primary" variant alias. Use <code>default</code> directly; <code>brand</code> for jade.</li>
				<li>No warm-grey secondary. Secondary is cobalt on this branch.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>variant</code> — see the variant matrix above.</li>
				<li><code>size</code> — <code>'sm' | 'default' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg'</code>.</li>
				<li><code>loading</code> — overlay spinner + disabled. Mutually exclusive with content interactions.</li>
				<li><code>href</code> — switches to <code>&lt;a&gt;</code>.</li>
				<li>All native <code>&lt;button&gt;</code> / <code>&lt;a&gt;</code> attributes pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Sizes: h-9 / h-10 / h-11 (sm / default / lg) with px-4 / px-5 / px-8. Three square icon sizes match the three width sizes. Radius is <code>--radius-md</code> 6px with optional squircle corner-shape; bake the active scale 0.97 transition into the class. No shadows.</li>
				<li>Variant table is the contract: brand jade, default ink, destructive orange, secondary <strong>cobalt</strong> (not warm-grey), outline hairline + muted hover, ghost muted-foreground text, link underline-only. Hover drops opacity to 80%.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<div class="docs-h">Keyboard</div>
			<ul class="docs-list">
				<li><code>Tab</code> — focuses the button.</li>
				<li><code>Space</code> / <code>Enter</code> — activates.</li>
			</ul>
			<div class="docs-h">Screen reader</div>
			<ul class="docs-list">
				<li>Renders as a native <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> — inherits semantics. No extra ARIA needed for typical use.</li>
				<li>For icon-only buttons, pass <code>aria-label</code> via <code>{`{...restProps}`}</code>.</li>
				<li><code>loading</code> state visually disables the button and prevents activation; consider an <code>aria-busy</code> announcement.</li>
			</ul>
			<div class="docs-h">Focus</div>
			<ul class="docs-list">
				<li>Outline ring uses <code>--ring</code> (jade in light, lifted jade in dark).</li>
				<li>Visible only on keyboard focus (<code>:focus-visible</code>).</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch. Variant table refreshed: <code>secondary</code> is now <strong>cobalt
					blue</strong> (<code>--color-cobalt</code> <code>#354cef</code>), not warm-grey.
					Sizes bumped one notch (sm → <code>h-9</code>, default → <code>h-10</code>,
					lg → <code>h-11</code>); padding default is now <code>px-5</code>. New
					<code>icon-sm</code> / <code>icon-lg</code> sizes (<code>size-9</code> /
					<code>size-11</code>). Hover drops opacity to <strong>80%</strong> (was 90%).
					Press scale <code>active:scale-[0.97]</code> baked into base. Drop shadows
					removed across all variants. Disabled is now <code>opacity-40</code>. Focus
					ring removed (relies on native <code>outline-none</code>).
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-12</span>
				<p>
					Anatomy tightened: per-size dimensions (h-8/9/10), per-variant
					token tuples (bg, text, border, hover, shadow) with resolved hex
					for both modes, composition rule (icons as children, never an
					<code>icon</code> prop), and explicit non-features. Matches the
					Input precedent so non-Svelte re-implementations have an
					unambiguous spec.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
