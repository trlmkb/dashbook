import type { ComponentSpec } from '../types.js';

export const alertError: ComponentSpec = {
	slug: 'alert-error',
	name: 'Alert Error',
	category: 'Display',
	status: 'beta',
	importPath: "import { AlertError } from '@dashfi/svelte/ui/alert-error'",
	description:
		'Specialized error alert. Pre-styled wrapper around the destructive Alert variant for common error surfaces with retry/dismiss affordances.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/alert-error/alert-error.svelte',

	dimensions: [
		{
			name: 'Outer panel',
			value: 'flex centered, min 400px tall, 32px padding',
			tw: 'flex min-h-[400px] items-center justify-center p-8'
		},
		{
			name: 'Inner column',
			value: 'max 448px wide, centered',
			tw: 'flex max-w-md flex-col items-center text-center'
		},
		{
			name: 'Icon badge',
			value: '64×64',
			tw: 'size-16 rounded-full mb-4',
			notes: 'The alert glyph is `size-8` (32×32) inside.'
		},
		{
			name: 'Title',
			value: '18px semibold, 8px below',
			tw: 'text-lg font-semibold mb-2'
		},
		{
			name: 'Description',
			value: '14px, 24px bottom gap',
			tw: 'text-sm mb-6'
		},
		{
			name: 'Action row',
			value: 'flex with 8px gap',
			tw: 'flex gap-2',
			notes: 'Retry (outline) + Close (ghost) Buttons at `size="sm"`.'
		}
	],

	tokens: [
		{
			name: 'Icon badge bg',
			notes:
				"`bg-destructive/10` (10% destructive). In light mode that's `#0000001a`; in dark `#ffffff1a`."
		},
		{
			name: 'Icon glyph',
			token: { cssVar: '--color-destructive', light: '#000000', dark: '#ffffff' },
			notes: 'Monochrome via `text-destructive`.'
		},
		{
			name: 'Description text',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
		},
		{
			name: 'Buttons',
			notes: 'Inherit from the Button component (outline + ghost variants).'
		}
	],

	composition: [
		'Drop into a full-panel error surface — content area of a card, modal body, blank page state.',
		'Provide <code>onRetry</code> to render the retry CTA; <code>isRetryLoading</code> swaps the icon for a spinning <code>RefreshCw</code>.',
		'Provide <code>onClose</code> to render the dismiss CTA. Either, both, or neither — the actions row only renders when at least one handler is set.'
	],

	nonFeatures: [
		"Not the same shape as inline <code>Alert</code>. AlertError is a full-panel illustration; Alert is an inline-row variant. Don't conflate.",
		'No variant prop — the destructive monochrome treatment is fixed.',
		'No custom icon — uses Lucide <code>CircleAlert</code> always. To recolor or replace, compose your own panel using <code>Alert variant="destructive"</code>.'
	],

	props: [
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
	],

	porting: [
		'Vertical centered panel (min-h 400, p-8), 64px round icon badge in destructive/10, 18px title, 14px muted description, outline + ghost button row.'
	],

	example: `<script lang="ts">
	import { AlertError } from '@dashfi/svelte/ui/alert-error';
<\/script>

<AlertError
\ttitle="Card declined"
\tdescription="Daily limit reached. Resets midnight UTC."
\tretryButtonText="Retry"
\tonRetry={() => refetch()}
/>`,

	accessibility: [
		'The icon is decorative — the title carries the meaning. Never rely on color alone.',
		'Place inside a region with <code>role="alert"</code> for assertive announcements when the error appears mid-flow.',
		'Provide focusable retry / close buttons whenever the user can act on the error.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Full-panel min-h-400 centered illustration with a 64px round bg-destructive/10 badge, text-lg semibold title, text-sm muted description, optional retry + close Button row.'
		}
	]
};
