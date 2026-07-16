import type { ComponentSpec } from '../types.js';

/**
 * Fullscreen Dialog — edge-to-edge modal for long flows.
 *
 * Full-viewport fixed div with a logo + close header and overflow-auto body.
 * Confirm-on-close wraps an internal AlertDialog.
 */
export const fullscreenDialog: ComponentSpec = {
	slug: 'fullscreen-dialog',
	name: 'Fullscreen Dialog',
	category: 'Feedback',
	status: 'beta',
	importPath: "import { FullscreenDialog } from '@dashfi/svelte/ui/fullscreen-dialog'",
	description:
		'Edge-to-edge modal for long flows — KYC, statement download, partner agreement. Brand logo + close in the header; body scrolls.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/fullscreen-dialog/fullscreen-dialog.svelte',

	dimensions: [
		{
			name: 'Container',
			value: 'full viewport',
			tw: 'fixed inset-0 z-50 flex h-full flex-col overflow-auto bg-background',
			notes: 'No overlay — the container IS the viewport.'
		},
		{
			name: 'Header',
			value: '32px padding, 32px gap',
			tw: 'flex items-center justify-between gap-8 p-8'
		},
		{ name: 'Logo', value: '16px tall', tw: 'h-4 w-auto text-brand dark:text-white' },
		{
			name: 'Close button',
			value: 'icon Button, 12px radius, 12px glyph',
			tw: 'rounded-xl',
			notes: '<code>Button size="icon" variant="ghost"</code> with an <code>h-3 w-3</code> X glyph.'
		},
		{ name: 'Body', value: 'caller-controlled, scrolls', notes: 'Anything below the header — flows in the snippet.' }
	],

	tokens: [
		{
			name: 'Background',
			token: { cssVar: '--color-background', light: '#faf9f5', dark: '#0f1412' }
		},
		{
			name: 'Logo (light)',
			token: { cssVar: '--color-brand', light: '#2b5f5b', dark: '#46b9af' },
			notes: 'In dark mode the logo overrides to pure white via <code>dark:text-white</code>.'
		},
		{ name: 'Close button', notes: 'Inherits Button ghost variant tokens.' }
	],

	composition: [
		'Use for onboarding flows, multi-step setups, hand-off screens — anything that warrants taking the whole viewport.',
		'Bind <code>isOpen</code>; provide <code>onClose</code> for the confirm-dismiss flow.',
		'<code>onCloseMessage</code> + <code>onCloseDescription</code> drive the close-confirmation AlertDialog. Set <code>onCloseDescription</code> to null to skip the confirmation entirely.'
	],

	nonFeatures: [
		'No backdrop overlay — the container IS the viewport.',
		'No portal config — it is already a fixed root.',
		'No side/edge variants — full-viewport only.',
		'No header customization beyond brand logo + close — for arbitrary headers use Dialog or Sheet.'
	],

	props: [
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
	],

	porting: [
		'Full-viewport fixed div with header (Logo + Close) and overflow-auto body. Confirm-on-close via AlertDialog wrapper.'
	],

	example: `<script lang="ts">
	import { FullscreenDialog } from '@dashfi/svelte/ui/fullscreen-dialog';

	let kycOpen = $state(false);
<\/script>

<FullscreenDialog bind:isOpen={kycOpen} onClose={() => (kycOpen = false)}>
\t<!-- KYC flow content -->
</FullscreenDialog>`,

	accessibility: [
		'Use only for flows that warrant taking the whole viewport — partial-state UIs belong in Dialog or Sheet.',
		'<code>onCloseDescription</code> drives the AlertDialog confirmation copy — write it from the user’s POV (e.g. "Your progress will be lost").',
		'The Close button is a real Button — fully keyboard-focusable; Esc triggers the same close path.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Full-viewport fixed inset-0 bg-background with p-8 header containing a h-4 brand Logo and a ghost-icon Close. Confirm-close AlertDialog wrapper.'
		}
	]
};
