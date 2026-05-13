import type { ComponentSpec } from '../types.js';

/**
 * Badge — short status or category label.
 *
 * 10px tracked uppercase mono in a hairline-bordered chip. Most status
 * variants are hairline outlines in body colour, not coloured tints.
 */
export const badge: ComponentSpec = {
	slug: 'badge',
	name: 'Badge',
	category: 'Display',
	status: 'stable',
	importPath: "import { Badge } from '@dashfi/svelte/ui/badge'",
	description:
		'Short status or category label. 10px tracked uppercase mono in a hairline-bordered chip. Use for tier markers (DEBIT, CORPORATE), status (Active, Frozen), or counts.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/badge/badge.svelte',

	dimensions: [
		{ name: 'Padding', value: '8px horizontal · 2px vertical', tw: 'px-2 py-0.5' },
		{
			name: 'Type',
			value: '10px mono · weight 500 · uppercase · tracking 0.05em',
			tw: 'text-[10px] font-mono font-medium tabular-nums uppercase tracking-wider',
			notes: "PP Supply Mono. The badge transforms text to uppercase — callers don't need to."
		},
		{ name: 'Radius', value: '6px', tw: 'rounded-md', notes: '`--radius-md`. Not pill-shaped.' },
		{ name: 'Border', value: '1px', tw: 'border', notes: 'Colour depends on variant.' },
		{
			name: 'Display',
			value: 'inline-flex',
			tw: 'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap select-none'
		},
		{ name: 'Inline icons', value: '12px', tw: '[&>svg]:size-3', notes: 'Pointer-events disabled.' },
		{ name: 'Shadow', value: 'none' }
	],

	tokens: [
		{
			name: 'Hover',
			notes: 'None baked in (`transition-colors` applies if a parent surface changes colour).'
		}
	],

	variants: [
		{
			name: 'default',
			description: 'Ink-filled chip.',
			tokens: [
				{ name: 'bg', token: { cssVar: '--color-primary', light: '#25261d', dark: '#ffffff' } },
				{
					name: 'text',
					token: { cssVar: '--color-primary-foreground', light: '#ffffff', dark: '#000000' }
				},
				{ name: 'border', token: { cssVar: '--color-primary', light: '#25261d', dark: '#ffffff' } }
			]
		},
		{
			name: 'secondary',
			description: 'Transparent with hairline border.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{ name: 'text', token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' } },
				{ name: 'border', token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' } }
			]
		},
		{
			name: 'ghost',
			description: 'Transparent surface and border.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{
					name: 'text',
					token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
				},
				{ name: 'border', notes: 'transparent.' }
			]
		},
		{
			name: 'destructive',
			description: 'Hairline outline in body colour — reads as "look here", not "filled orange".',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{ name: 'text', token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' } },
				{
					name: 'border',
					token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' }
				}
			]
		},
		{
			name: 'outline',
			description: 'Transparent with hairline border, muted text.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{
					name: 'text',
					token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
				},
				{ name: 'border', token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' } }
			]
		},
		{
			name: 'success',
			description: 'Same hairline-in-body-colour treatment as destructive.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{ name: 'text', token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' } },
				{
					name: 'border',
					token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' }
				}
			]
		},
		{
			name: 'brand',
			description: 'Jade filled chip.',
			tokens: [
				{ name: 'bg', token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' } },
				{
					name: 'text',
					token: { cssVar: '--color-brand-foreground', light: '#ffffff', dark: '#ffffff' }
				},
				{ name: 'border', token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' } }
			]
		},
		{
			name: 'warning',
			description: 'Hairline outline in body colour.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{ name: 'text', token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' } },
				{
					name: 'border',
					token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' }
				}
			]
		},
		{
			name: 'info',
			description: 'Hairline outline in border token.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{ name: 'text', token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' } },
				{ name: 'border', token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' } }
			]
		}
	],

	composition: [
		'Render as <code>&lt;span&gt;</code> by default. Passing <code>href</code> swaps to <code>&lt;a&gt;</code>.',
		'Children are free-form — typed in any case. The badge applies <code>uppercase</code> at the CSS level, so <code>&lt;Badge&gt;debit&lt;/Badge&gt;</code> and <code>&lt;Badge&gt;DEBIT&lt;/Badge&gt;</code> both render as <code>DEBIT</code>.',
		'Inline 12px SVG icons compose as children: <code>&lt;Badge&gt;&lt;Check /&gt;Active&lt;/Badge&gt;</code>.'
	],

	nonFeatures: [
		"No size prop. Single 10px mono size — matches the brand's data-label rhythm.",
		'No <code>dot</code> prop. A leading dot is a manual element if needed.',
		'No body-sans variant. The badge is mono uppercase by design.',
		'No filled status palette (no Tailwind green/yellow/blue tints). Status variants (<code>success</code>, <code>warning</code>, <code>destructive</code>) are hairline outlines in the body text colour — they read as "look here", not "tinted background".',
		'No pill radius. Use <code>Pill</code> for that.',
		'No drop shadow.'
	],

	props: [
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
	],

	porting: [
		'Mono 10px uppercase tracked wider, <code>rounded-md</code> 6px, 1px border. Variant table is the contract — note that on this branch most "status" variants are hairline outlines in body colour, not coloured tints. Only <code>default</code> and <code>brand</code> are filled.'
	],

	example: `<script lang="ts">
	import { Badge } from '@dashfi/svelte/ui/badge';
<\/script>

<Badge>Default</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="destructive">Destructive</Badge>

<Badge href="/transactions">As a link</Badge>`,

	accessibility: [
		'Renders as <code>&lt;span&gt;</code> by default, <code>&lt;a&gt;</code> if <code>href</code> is provided.',
		'Decorative-only badges should be hidden from AT (<code>aria-hidden="true"</code>).',
		'Status badges should be paired with an accessible label or live region for state changes.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. The canonical badge IS mono uppercase tracked wider — 10px (text-[10px] font-mono uppercase tracking-wider), not body sans. Padding tightened to px-2 py-0.5. Inline icons drop to 12px ([>svg]:size-3). Drop shadow removed. Variant table reshaped: status variants (destructive, success, warning) are now hairline outlines in --color-foreground — no tinted Tailwind green/yellow/red palette anymore. Only default and brand render as filled chips. v0.3.1 described the prior treatment.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-12',
			note: 'Anatomy tightened: exact dimensions (px-2.5 py-0.5, text-xs, rounded-md), per-variant token tuples with resolved hex for both modes, composition rule, and explicit non-features (no size prop, no dot, no uppercase-mono transform). Matches the Input precedent. The prior anatomy claimed mono uppercase 10px — the canonical Tailwind class is text-xs font-medium body sans, no uppercase transform.'
		},
		{
			version: 'v0.3.0',
			date: '2026-05-10',
			note: 'First documented in Dashbook.'
		}
	]
};
