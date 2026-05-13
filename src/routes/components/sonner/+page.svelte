<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Toaster } from '@dashfi/svelte/ui/sonner';
	import { Button } from '@dashfi/svelte/ui/button';
	import { toast } from 'svelte-sonner';

	const propsTable: PropDef[] = [
		{
			name: 'theme',
			type: "'light' | 'dark' | 'system'",
			default: 'mode.current',
			description: 'Color scheme. Defaults to the current mode-watcher value so toasts follow app theme.'
		},
		{
			name: 'position',
			type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
			default: "'bottom-right'",
			description: 'Anchor corner where toasts stack.'
		},
		{
			name: 'expand',
			type: 'boolean',
			default: 'false',
			description: 'Expand stacked toasts on hover so each is fully readable.'
		},
		{
			name: 'richColors',
			type: 'boolean',
			default: 'false',
			description: 'Use saturated status colors for success/error/warning instead of monochrome.'
		},
		{
			name: 'closeButton',
			type: 'boolean',
			default: 'false',
			description: 'Render a dismiss (x) button on each toast.'
		},
		{
			name: 'duration',
			type: 'number',
			default: '4000',
			description: 'Default visible duration in milliseconds before auto-dismiss.'
		},
		{
			name: 'visibleToasts',
			type: 'number',
			default: '3',
			description: 'Max number of toasts visible at once. Older ones collapse beneath.'
		},
		{
			name: 'offset',
			type: 'string | number',
			description: 'Distance from the viewport edge. Accepts px or any CSS length.'
		},
		{
			name: 'dir',
			type: "'ltr' | 'rtl' | 'auto'",
			default: "'auto'",
			description: 'Text and stacking direction.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged onto the toaster container.'
		},
		{
			name: 'toast',
			type: '(message: string, options?: ToastOptions) => string | number',
			description: "Imperative API — imported from 'svelte-sonner'. Use toast.success(), toast.error(), toast.promise(), toast.dismiss(), etc. from anywhere in the app."
		}
	];

	const example = `<script lang="ts">
	import { Toaster } from '@dashfi/svelte/ui/sonner';
	import { toast } from 'svelte-sonner';
<\/script>

<!-- Mount once at app root -->
<Toaster />

<!-- Anywhere -->
<button onclick={() => toast.success('Statement downloaded')}>Download</button>
<button onclick={() => toast.error('Card declined — limit reached')}>Charge</button>`;
</script>

<svelte:head><title>Toast (Sonner) — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Toast (Sonner)"
	description="Stacked transient notifications. Mount Toaster once at the app root; call toast() from anywhere."
	importPath="@dashfi/svelte/ui/sonner"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<div style:display="flex" style:gap="12px">
					<Button onclick={() => toast.success('Statement downloaded')}>Success</Button>
					<Button variant="outline" onclick={() => toast.error('Card declined — limit reached')}>
						Error
					</Button>
					<Button variant="outline" onclick={() => toast('Refresh complete')}>Default</Button>
				</div>
				<Toaster />
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Setup</div>
			<ul class="docs-list">
				<li>Mount <code>&lt;Toaster /&gt;</code> once near the app root.</li>
				<li>Invoke <code>toast(message)</code>, <code>toast.success(message)</code>, <code>toast.error(message)</code>, etc. from anywhere — <code>svelte-sonner</code> handles the queue.</li>
			</ul>
			<div class="docs-h">Defaults</div>
			<ul class="docs-list">
				<li><strong>Theme</strong> — follows <code>mode-watcher</code> (<code>light</code>/<code>dark</code>/<code>system</code>).</li>
				<li><strong>Position</strong> — <code>bottom-right</code>.</li>
				<li><strong>richColors</strong> — false (monochrome). Set true for saturated status tints (success green, error red).</li>
				<li><strong>closeButton</strong> — false (auto-dismiss). Set true for explicit x-to-dismiss.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Container is <code>class="toaster group"</code> — the actual toast surfaces use sonner's internal CSS but inherit theme via the <code>group</code> class for dark-mode awareness.</li>
			</ul>
			<div class="docs-h">Not part of Sonner</div>
			<ul class="docs-list">
				<li>No per-toast variant props in the Toaster — those are passed to <code>toast()</code> calls.</li>
				<li>No portal config — Toaster is its own portal at mount-point.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Wraps the upstream sonner library. To port: pick a sonner-equivalent for the target stack (e.g. <code>sonner</code> on React) and mirror the defaults (bottom-right, mode-watcher theme, monochrome).</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Mounts as a single
					<code>&lt;Toaster /&gt;</code> with default position bottom-right and mode-watcher
					theming. Toasts triggered imperatively via <code>toast(...)</code>.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
