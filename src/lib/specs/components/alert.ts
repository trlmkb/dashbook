import type { ComponentSpec } from '../types.js';

export const alert: ComponentSpec = {
	slug: 'alert',
	name: 'Alert',
	category: 'Feedback',
	status: 'stable',
	importPath:
		"import { Alert, AlertTitle, AlertDescription } from '@dashfi/svelte/ui/alert'",
	description:
		'Inline contextual messaging — success, warning, error, info. Always paired with an icon and short copy. Border-left strip in the variant color.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/alert/',

	dimensions: [
		{
			name: 'Root',
			value: 'CSS grid',
			tw: 'grid grid-cols-[0_1fr] gap-y-1.5',
			notes:
				'grid-cols-[calc(var(--spacing)*5)_1fr] when an SVG is present. gap-y-1.5 (6px) row gap, gap-x-3 (12px) col gap when icon present.'
		},
		{
			name: 'Border-left strip',
			value: '3px',
			tw: 'border-l-[3px]',
			notes: 'The visual signature.'
		},
		{
			name: 'Padding',
			value: '16px left, 10px vertical, 0 right',
			tw: 'pl-4 py-2.5'
		},
		{ name: 'Type', value: '14px', tw: 'text-sm' },
		{
			name: 'Icon (Lucide child)',
			value: '16×16',
			tw: 'size-4 translate-y-0.5',
			notes: '2px baseline nudge.'
		},
		{
			name: 'AlertTitle',
			value: 'inherits text-sm',
			notes: 'Default semibold leading.'
		},
		{
			name: 'AlertDescription',
			value: 'same row in grid',
			notes: 'Sits under the title.'
		}
	],

	tokens: [
		{
			name: 'Root text',
			token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' },
			notes: 'Variant only colors the border + icon.'
		}
	],

	variants: [
		{
			name: 'default',
			description: 'Neutral informational alert.',
			tokens: [
				{
					name: 'Border + text/icon',
					token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' },
					notes: 'Text + icon also use --color-muted-foreground.'
				},
				{
					name: 'Text/icon',
					token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
				}
			]
		},
		{
			name: 'destructive',
			description: 'Error / blocking alerts.',
			tokens: [
				{
					name: 'Border + icon',
					token: { cssVar: '--color-destructive', light: '#000000', dark: '#ffffff' },
					notes: 'Monochrome.'
				}
			]
		},
		{
			name: 'success',
			description: 'Positive confirmation.',
			tokens: [
				{
					name: 'Border + icon',
					token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' },
					notes: 'Jade brand colour.'
				}
			]
		},
		{
			name: 'info',
			description: 'Informational callout.',
			tokens: [
				{
					name: 'Border + icon',
					notes: 'Tailwind `sky-500` `#0ea5e9` — not a Dashbook token.'
				}
			]
		},
		{
			name: 'warning',
			description: 'Approaching limit / cautionary.',
			tokens: [
				{
					name: 'Border + icon',
					notes: 'Tailwind `amber-500` `#f59e0b` — not a Dashbook token.'
				}
			]
		},
		{
			name: 'brand',
			description: 'Marketing / reward callout.',
			tokens: [
				{
					name: 'Border + icon',
					token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' }
				}
			]
		}
	],

	composition: [
		'Place a Lucide icon as the first child — the grid auto-detects it and re-allocates the first column.',
		'Follow with <code>AlertTitle</code> then optional <code>AlertDescription</code>.',
		'Mounts with an optional Svelte slide transition via <code>transitionParams</code> (default <code>{ duration: 0 }</code>).'
	],

	nonFeatures: [
		'No close button. Compose at the call site if dismissal is needed.',
		'No background fill — variants are border-left + icon tint only.',
		'No radius. The shape is flat-edged.',
		'No <code>role</code> auto-set — pair with <code>role="alert"</code>/<code>"status"</code> at the call site per AT need.'
	],

	props: [
		{
			name: 'variant',
			type: "'default' | 'destructive' | 'success' | 'info' | 'warning' | 'brand'",
			default: "'default'",
			description: 'Visual variant. Controls the border-left and icon color.'
		},
		{
			name: 'transitionParams',
			type: 'SlideParams',
			default: '{ duration: 0 }',
			description: 'Svelte slide transition params used when the alert mounts/unmounts.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Alert content — typically an icon followed by AlertTitle and AlertDescription.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'All native div attributes pass through to the rendered element.'
		}
	],

	porting: [
		"Six variants, three-column-aware grid, 3px left border in the variant color. That's the whole contract."
	],

	example: `<script lang="ts">
	import { Alert, AlertTitle, AlertDescription } from '@dashfi/svelte/ui/alert';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
<\/script>

<Alert variant="success">
\t<CircleCheck />
\t<AlertTitle>Spending data refreshed.</AlertTitle>
\t<AlertDescription>Last updated just now.</AlertDescription>
</Alert>

<Alert variant="destructive">
\t<CircleX />
\t<AlertTitle>Card declined.</AlertTitle>
\t<AlertDescription>Daily limit reached. Resets midnight UTC.</AlertDescription>
</Alert>`,

	accessibility: [
		'Wrap with <code>role="alert"</code> at the call site for assertive announcements (errors, warnings).',
		'Use <code>role="status"</code> for non-urgent feedback (success, info).',
		'The icon is decorative — title carries the meaning. Never rely on color alone.',
		'Keep copy short. One-sentence title + one-sentence description is the rhythm.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch — Alert is a CSS-grid with a 3px border-l-[3px] strip in the variant color, text-sm body text, size-4 Lucide icon translated translate-y-0.5. Six variants (default/destructive/success/info/warning/brand). No bg fill, no radius, no auto role. Earlier prose-style anatomy is superseded.'
		},
		{
			version: 'v0.3.0',
			date: '2026-05-10',
			note: 'First documented in Dashbook.'
		}
	]
};
