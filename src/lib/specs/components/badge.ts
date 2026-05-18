import type { ComponentSpec } from '../types.js';

/**
 * Badge — small categorical / decorative label.
 *
 * Five visual variants (default / brand / secondary / yellow / outline) ordered
 * by visual emphasis × three sizes (xs / sm / md). Mono uppercase tracked wider
 * in a hairline-bordered or filled chip.
 *
 * Badge encodes WHAT something IS (category, visual style). For semantic STATE
 * (Active / Pending / Failed / Frozen / ...) use Pill instead.
 */
export const badge: ComponentSpec = {
	slug: 'badge',
	name: 'Badge',
	category: 'Display',
	status: 'stable',
	importPath: "import { Badge } from '@dashfi/svelte/ui/badge'",
	description:
		'Small categorical or decorative label. Mono uppercase in a hairline-bordered or filled chip. Use Badge for category, count, or visual emphasis (DEBIT, 99+, AI, NEW). For semantic state (Active, Pending, Failed) use Pill.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/badge/badge.svelte',

	whenToUse:
		'Use Badge for WHAT something IS or HOW it is categorized — tier markers ("DEBIT", "CORPORATE"), count indicators ("3", "99+"), category tags ("Software", "Marketing"), visual emphasis on a known label ("Default", "AI", "New"). For semantic STATE (Active / Pending / Failed / Frozen) use Pill instead. Badge encodes category with visual style; Pill encodes condition with semantic color.',

	dimensions: [
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
		{ name: 'Inline icons', value: '12px (md/sm) · 10px (xs)', notes: 'Pointer-events disabled.' },
		{ name: 'Shadow', value: 'none' }
	],

	sizes: [
		{
			name: 'xs',
			height: '16px',
			padding: '4px horizontal',
			fontSize: '10px',
			notes: '`h-4 px-1 text-[10px]`. Inline icons size-2.5 (10px).'
		},
		{
			name: 'sm',
			height: '20px',
			padding: '6px horizontal',
			fontSize: '10px',
			notes: '`h-5 px-1.5 text-[10px]`. Inline icons size-3 (12px).'
		},
		{
			name: 'md',
			height: '18px',
			padding: '8px horizontal · 2px vertical',
			fontSize: '10px',
			notes:
				'`h-[18px] px-2 py-0.5 text-[10px]`. Default. Inline icons size-3 (12px). Matches the brand data-label rhythm.'
		}
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
			description: 'Ink-filled chip. The strongest visual emphasis.',
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
			name: 'brand',
			description: 'Jade-filled chip. Use for product brand emphasis on category labels.',
			tokens: [
				{ name: 'bg', token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' } },
				{
					name: 'text',
					token: { cssVar: '--color-brand-foreground', light: '#ffffff', dark: '#000000' },
					notes:
						'Dark text on lighter-jade dark-mode background — white-on-light-jade was sub-WCAG.'
				},
				{ name: 'border', token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' } }
			]
		},
		{
			name: 'secondary',
			description:
				'Cobalt-filled chip. Marketing-leaning / alternate brand emphasis. Distinct from `brand` (jade) — pick `secondary` when you want a deliberately different brand voice, e.g. partner-co-branded or marketing surfaces.',
			tokens: [
				{ name: 'bg', token: { cssVar: '--color-cobalt', light: '#354cef', dark: '#354cef' } },
				{
					name: 'text',
					token: { cssVar: '--color-cobalt-foreground', light: '#ffffff', dark: '#ffffff' }
				},
				{ name: 'border', token: { cssVar: '--color-cobalt', light: '#354cef', dark: '#354cef' } }
			]
		},
		{
			name: 'yellow',
			description:
				'Yellow-filled chip. Sparing — use only when the badge needs to grab attention (e.g. limited-time promo, hard-to-miss notice). Heavily-used yellow loses its sparing-ness.',
			tokens: [
				{ name: 'bg', token: { cssVar: '--color-yellow', light: '#ebff00', dark: '#ebff00' } },
				{
					name: 'text',
					token: { cssVar: '--color-yellow-foreground', light: '#181f1b', dark: '#181f1b' },
					notes: 'Ink — white-on-yellow is unreadable.'
				},
				{ name: 'border', token: { cssVar: '--color-yellow', light: '#ebff00', dark: '#ebff00' } }
			]
		},
		{
			name: 'outline',
			description: 'Transparent with hairline border and muted text. Quiet / decorative.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{
					name: 'text',
					token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
				},
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
		'No semantic state variants. <code>success</code>, <code>warning</code>, <code>info</code>, <code>destructive</code> moved to <code>Pill</code> — those are conditions, not categories.',
		'No <code>ghost</code> variant. Use <code>outline</code> for muted treatment.',
		'No <code>dot</code> prop. A leading dot is a manual element if needed.',
		'No body-sans variant. The badge is mono uppercase by design.',
		'No filled status palette (no Tailwind green/yellow/blue tints). For status, use <code>Pill</code>.',
		'No pill radius. Use <code>Pill</code> for that.',
		'No drop shadow.'
	],

	props: [
		{
			name: 'variant',
			type: "'default' | 'brand' | 'secondary' | 'yellow' | 'outline'",
			default: "'default'",
			description:
				'Visual variant. Controls surface, text, and border tokens. Ordered by visual emphasis: default (ink) > brand (jade) > secondary (cobalt) > yellow > outline (quiet).'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md'",
			default: "'md'",
			description: 'Size token. Affects height, horizontal padding, and inline-icon size.'
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
			description: 'Badge label content. Inline SVG icons render at 12px (md/sm) or 10px (xs).'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLSpanElement | HTMLAnchorElement>',
			description: 'All native span/anchor attributes are passed through to the underlying element.'
		}
	],

	porting: [
		'Mono 10px uppercase tracked wider, <code>rounded-md</code> 6px, 1px border. Five variants — <code>default</code> (ink), <code>brand</code> (jade), <code>secondary</code> (cobalt) and <code>yellow</code> are filled; <code>outline</code> is transparent with a hairline border. Three sizes — xs (h-4 px-1), sm (h-5 px-1.5), md (h-[18px] px-2 py-0.5, default). Yellow text must be dark (ink) — white-on-yellow is unreadable. Brand-foreground in dark mode is dark too — lighter-jade dark-mode background needs dark text. Semantic state belongs to Pill — do not reintroduce success/warning/danger/info variants on Badge.'
	],

	example: `<script lang="ts">
	import { Badge } from '@dashfi/svelte/ui/badge';
<\/script>

<Badge>Default</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="yellow">Yellow</Badge>
<Badge variant="outline">Outline</Badge>

<Badge size="xs">xs</Badge>
<Badge size="sm">sm</Badge>
<Badge size="md">md</Badge>

<Badge href="/transactions">As a link</Badge>`,

	accessibility: [
		'Renders as <code>&lt;span&gt;</code> by default, <code>&lt;a&gt;</code> if <code>href</code> is provided.',
		'Decorative-only badges should be hidden from AT (<code>aria-hidden="true"</code>).',
		'Badge is for category — for status changes (which need a live region) use Pill.'
	],

	changelog: [
		{
			version: 'v0.5.0',
			date: '2026-05-28',
			note: 'Badge gets two new filled variants: `secondary` is now cobalt-filled (was a near-twin of `outline` — transparent + border), and `yellow` is new (sparing accent for attention-grabbing badges, e.g. limited promos). The emphasis ladder is now default (ink) → brand (jade) → secondary (cobalt) → yellow → outline (quiet). All existing `<Badge variant="secondary">` usages in dashfi-ui were migrated to `outline` so production rendering is unchanged — the new cobalt look is opt-in. Bonus fix: dark-mode `brand` text is now ink instead of white (white-on-lighter-jade was sub-WCAG).'
		},
		{
			version: 'v0.4.0',
			date: '2026-05-28',
			note: 'Variant taxonomy split: Badge keeps four visual variants (default / brand / outline / secondary). Dropped semantic variants (success / warning / info / destructive / ghost) — semantic state now lives on Pill. Added a `size` prop (xs / sm / md, default md). The clean split is: Badge encodes WHAT something IS (category, visual style); Pill encodes WHAT CONDITION something is in (semantic state). See /components/pill for the counterpart.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. The canonical badge IS mono uppercase tracked wider — 10px (text-[10px] font-mono uppercase tracking-wider), not body sans. Padding tightened to px-2 py-0.5. Inline icons drop to 12px ([>svg]:size-3). Drop shadow removed. Variant table reshaped: status variants (destructive, success, warning) became hairline outlines in --color-foreground — no tinted Tailwind green/yellow/red palette anymore. Only default and brand rendered as filled chips. (Superseded by v0.4.0, which removes status variants entirely.)'
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
