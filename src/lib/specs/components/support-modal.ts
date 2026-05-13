import type { ComponentSpec } from '../types.js';

/**
 * Support Modal — Dash.fi help & support widget.
 *
 * Pre-built Dialog with hover-lift option rows. Mounted at app shell;
 * bound to the user session and tier.
 */
export const supportModal: ComponentSpec = {
	slug: 'support-modal',
	name: 'Support Modal',
	category: 'Feedback',
	status: 'beta',
	importPath: "import { SupportModal } from '@dashfi/svelte/ui/support-modal'",
	description:
		'Help & support widget — Dash.fi-specific. Opens a guided Dialog bound to the user session and tier with hover-lift option rows.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/support-modal/support-modal.svelte',

	dimensions: [
		{
			name: 'Dialog content',
			value: 'max 425px from sm+',
			tw: 'sm:max-w-[425px]',
			notes: 'Inherits all Dialog tokens (16px radius, no border, <code>shadow-xl</code>).'
		},
		{
			name: 'Option rows',
			value: '16px padding, 16px gap',
			tw: 'flex cursor-pointer items-center gap-4 rounded-md border p-4 transition hover:border-primary',
			notes: 'Hover lifts the border to <code>--color-primary</code>.'
		},
		{ name: 'Row title', value: 'medium-sized text', tw: 'text-medium' },
		{ name: 'Row description', value: '14px muted', tw: 'text-muted-foreground text-sm' },
		{ name: 'Stack', value: '12px gap between rows', tw: 'flex flex-col gap-3' }
	],

	tokens: [
		{
			name: 'Row border (rest)',
			token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' }
		},
		{
			name: 'Row border (hover)',
			token: { cssVar: '--color-primary', light: '#25261d', dark: '#ffffff' }
		},
		{
			name: 'Description text',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
		}
	],

	composition: [
		'Pre-built support entry-points (call, message, etc.). Mount at app shell; bind <code>open</code> + <code>handleOnOpenChange</code>.',
		'Content is baked in — no per-instance configuration of rows or actions.'
	],

	nonFeatures: [
		'Not configurable per-instance. Content and options are baked into the component.',
		'No customization of the support entry-points — those are Dash.fi-internal.',
		'For arbitrary modals use <code>Dialog</code> directly.'
	],

	props: [
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
	],

	porting: [
		'Pre-built Dialog with hover-lift option rows. Re-implementing this directly is unusual — it is Dash.fi-specific. Use Dialog + your own option-row component instead.'
	],

	example: `<script lang="ts">
	import { SupportModal } from '@dashfi/svelte/ui/support-modal';
<\/script>

<!-- Mount at app shell — bound to user session -->
<SupportModal />`,

	accessibility: [
		'Inherits Dialog accessibility — focus trap, Esc to close, focus restoration on close.',
		'Option rows are full-width interactive — single Tab stop per row, Enter / Space activates.',
		'Pair with a clearly-labeled trigger so screen readers know what opens.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). 425px Dialog with rounded-md border p-4 hover:border-primary option rows.'
		}
	]
};
