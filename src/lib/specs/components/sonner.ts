import type { ComponentSpec } from '../types.js';

/**
 * Toast (Sonner) — svelte-sonner wrapper.
 *
 * Stacked transient notifications. Mount <Toaster /> once at the app root;
 * imperatively trigger via toast() from anywhere.
 */
export const sonner: ComponentSpec = {
	slug: 'sonner',
	name: 'Toast (Sonner)',
	category: 'Feedback',
	status: 'beta',
	importPath: "import { Toaster } from '@dashfi/svelte/ui/sonner'",
	description:
		'Stacked transient notifications. Mount <code>Toaster</code> once at the app root; invoke <code>toast()</code> from anywhere. Wraps svelte-sonner with our theme.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/sonner/sonner.svelte',

	dimensions: [
		{ name: 'Position', value: 'bottom-right (default)', notes: '6 anchor corners available.' },
		{ name: 'Visible stack', value: '3 toasts max (default)', notes: 'Older toasts collapse beneath.' },
		{ name: 'Duration', value: '4000ms auto-dismiss (default)' },
		{ name: 'Theme', value: 'follows mode-watcher (light / dark / system)' },
		{
			name: 'Container',
			value: 'sonner internal',
			tw: 'toaster group',
			notes: 'The <code>group</code> class enables dark-mode-aware inner styling.'
		},
		{
			name: 'Radius',
			value: 'rounded-xl',
			notes: 'Toast surface is <code>rounded-xl</code> with a 1px <code>--color-border</code> (added in 0.5.0).'
		},
		{
			name: 'Status tints',
			value: 'error / success / warning / info',
			notes: 'Baked per-status tints (0.5.0): error = <code>destructive/10</code> + <code>/40</code> border; success = <code>brand/10</code>; warning = <code>amber-500/10</code>; info = <code>sky-500/10</code>. Applied by default — not gated behind <code>richColors</code>.'
		}
	],

	tokens: [
		{
			name: 'Theme',
			notes: 'Container has <code>class="toaster group"</code> — actual toast surfaces use sonner internal CSS but inherit theme via the group selector.'
		},
		{
			name: 'Status colours (default in 0.5.0)',
			notes: 'The Toaster now bakes soft brand-aligned status tints by default — error = destructive, success = brand (jade), warning = amber-500, info = sky-500, all <code>rounded-xl</code>. The <code>richColors</code> prop still switches to the saturated sonner palette.'
		}
	],

	composition: [
		'Mount <code>&lt;Toaster /&gt;</code> once near the app root.',
		'Invoke <code>toast(message)</code>, <code>toast.success(message)</code>, <code>toast.error(message)</code>, <code>toast.promise(...)</code>, <code>toast.dismiss(id)</code> from anywhere — <code>svelte-sonner</code> handles the queue.',
		'Per-toast options (duration, action, description) pass to <code>toast()</code> calls, not the Toaster.'
	],

	nonFeatures: [
		'No per-toast variant props on the Toaster — those are passed to <code>toast()</code> calls.',
		'No portal config — Toaster is its own portal at mount-point.',
		'No queue limit beyond <code>visibleToasts</code> — older toasts collapse rather than drop.'
	],

	props: [
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
			name: 'toast',
			type: '(message: string, options?: ToastOptions) => string | number',
			description: "Imperative API — imported from 'svelte-sonner'. Use toast.success(), toast.error(), toast.promise(), toast.dismiss() from anywhere."
		}
	],

	porting: [
		'Wraps the upstream sonner library. To port: pick a sonner-equivalent for the target stack (e.g. <code>sonner</code> on React) and mirror the defaults (bottom-right, mode-watcher theme, monochrome, 4s duration, 3 visible).'
	],

	example: `<script lang="ts">
	import { Toaster } from '@dashfi/svelte/ui/sonner';
	import { toast } from 'svelte-sonner';
<\/script>

<!-- Mount once at app root -->
<Toaster />

<!-- Anywhere -->
<button onclick={() => toast.success('Statement downloaded')}>Download</button>
<button onclick={() => toast.error('Card declined — limit reached')}>Charge</button>`,

	accessibility: [
		'Sonner manages live-region announcements internally — toasts are read out by screen readers as they arrive.',
		'Use <code>toast.error</code> for failures (sonner sets <code>aria-live="assertive"</code> on errors).',
		'Pair critical errors with persistent UI — never rely on a 4s toast for required information.'
	],

	changelog: [
		{
			version: 'v0.5.0',
			date: '2026-06-04',
			note: 'Restyled (lib 0.5.0, core #5116): toast surfaces are now rounded-xl with a 1px border, and the Toaster bakes soft semantic status tints by default — error (destructive/10 + /40 border), success (brand/10), warning (amber-500/10), info (sky-500/10). Previously toasts were monochrome unless richColors was set; the brand-aligned tints now apply out of the box.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Mounts as a single <Toaster /> with default position bottom-right and mode-watcher theming. Toasts triggered imperatively via toast(...).'
		}
	]
};
