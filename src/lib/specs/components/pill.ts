import type { ComponentSpec } from '../types.js';

/**
 * Pill — small label that encodes semantic STATE.
 *
 * Five semantic types: base, info, success, warning, danger.
 * Info is brand-tinted; success/warning/danger use Tailwind palette tints.
 *
 * Pill encodes WHAT CONDITION something is in. For categorical / decorative
 * labels (tier markers, counts, "NEW") use Badge instead.
 */
export const pill: ComponentSpec = {
	slug: 'pill',
	name: 'Pill',
	category: 'Display',
	status: 'stable',
	importPath: "import { Pill } from '@dashfi/svelte/ui/pill'",
	description:
		'Small label that encodes semantic state. Five types map to intent (base / info / success / warning / danger) — use Pill for status ("Active", "Pending", "Failed", "Connected"). For categorical or decorative labels (DEBIT, 99+, NEW) use Badge.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/pill/pill.svelte',

	whenToUse:
		'Use Pill for WHAT CONDITION / status something is in — "Active" / "Frozen" / "Pending" / "Failed", "Approved" / "Rejected" / "In review", "Connected" / "Disconnected" / "Needs update". Types map to semantic intent: base (neutral, no signal), info (informational, brand-tinted), success (positive outcome), warning (attention required, not failing yet), danger (error, critical state). For categorical / decorative labels (tier markers, counts, "NEW") use Badge instead. Pill encodes condition with semantic color; Badge encodes category with visual style.',

	dimensions: [
		{ name: 'Padding', value: '10px horizontal · 2px vertical', tw: 'px-2.5 py-0.5' },
		{
			name: 'Type',
			value: '12px · weight 500',
			tw: 'text-xs font-medium',
			notes: 'Bai Jamjuree body sans, `whitespace-nowrap`.'
		},
		{
			name: 'Radius',
			value: '4px',
			tw: 'rounded-sm',
			notes:
				'`--radius-sm`. *Not* pill-shaped despite the name — Pill takes its name from "status pill", not the geometry.'
		},
		{ name: 'Border', value: '1px', notes: 'Colour matches the type tone.' },
		{
			name: 'Display',
			value: 'inline-flex <span>',
			tw: 'inline-flex w-fit items-center gap-1',
			notes: 'inline-flex with items-center + gap-1 so a leading icon aligns with the label (0.5.0).'
		}
	],

	tokens: [
		{
			name: 'Note',
			notes:
				'Status types (info / success / warning / danger) sit on tinted backgrounds — distinct from Badge\'s hairline-only status treatment. The two components serve different surfaces: Pill is for inline status chips, Badge is for tier markers.'
		}
	],

	variants: [
		{
			name: 'base',
			description: 'Neutral.',
			tokens: [
				{ name: 'bg', token: { cssVar: '--color-muted', light: '#eceae0', dark: '#181e1d' } },
				{
					name: 'text',
					token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
				},
				{ name: 'border', token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' } }
			]
		},
		{
			name: 'info',
			description:
				'Brand-tinted on this branch — not blue Tailwind palette. Both modes use the same alpha-on-brand recipe; `--color-brand` itself differs light/dark.',
			tokens: [
				{ name: 'bg', notes: '`--color-brand` at 10% alpha.' },
				{
					name: 'text',
					token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' }
				},
				{ name: 'border', notes: '`--color-brand` at 30% alpha.' }
			]
		},
		{
			name: 'success',
			description: 'Tailwind green palette tint.',
			tokens: [
				{ name: 'bg', notes: '`green-100` light / `green-900` at 50% dark.' },
				{ name: 'text', notes: '`green-700` light / `green-400` dark.' },
				{ name: 'border', notes: '`green-400` light / `green-800` dark.' }
			]
		},
		{
			name: 'warning',
			description: 'Tailwind orange palette tint.',
			tokens: [
				{ name: 'bg', notes: '`orange-100` light / `orange-900` at 50% dark.' },
				{ name: 'text', notes: '`orange-700` light / `orange-300` dark.' },
				{ name: 'border', notes: '`orange-400` light / `orange-800` dark.' }
			]
		},
		{
			name: 'danger',
			description: 'Tailwind red palette tint.',
			tokens: [
				{ name: 'bg', notes: '`red-100` light / `red-900` at 50% dark.' },
				{ name: 'text', notes: '`red-700` light / `red-300` dark.' },
				{ name: 'border', notes: '`red-400` light / `red-800` dark.' }
			]
		}
	],

	composition: [
		'Render as <code>&lt;span&gt;</code>. Decorative — does not respond to interaction.',
		'Content is either <code>text</code> (string prop, takes precedence) or <code>children</code> (snippet). Use <code>text</code> for short literals; <code>children</code> when wrapping or a leading icon is needed — the pill is inline-flex with gap-1 so an icon aligns with the label.',
		'Inline with text — drop the Pill into a table cell, sentence, or list item. No surrounding wrapper needed.'
	],

	nonFeatures: [
		'No size variants.',
		'No dedicated icon prop — put a leading icon in <code>children</code> (the layout is inline-flex with gap-1 so it aligns).',
		'No <code>active</code> / <code>onClick</code> behaviour. Pills are <em>not</em> interactive — for clickable chips use Button with the appropriate styling.',
		'No pill-shaped radius. The radius is <code>rounded-sm</code> (4px). For full-pill shape, build inline.',
		'No focus or hover treatment. Decorative.',
		'No <code>destructive</code> type. The error/critical tone is named <code>danger</code> — not <code>destructive</code>. (Destructive is a Button concept, for confirm-then-act actions.)',
		'No category variants. Pill is semantic state only. For category / count / decoration ("DEBIT", "99+", "NEW") use Badge.'
	],

	props: [
		{
			name: 'type',
			type: "'base' | 'info' | 'success' | 'warning' | 'danger'",
			default: "'base'",
			description: 'Semantic tone. Controls background, text, and border color tokens.'
		},
		{
			name: 'text',
			type: 'string',
			description: 'Plain-text label. Takes precedence over children when both are provided.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Pill content. Rendered when text is not set.'
		},
		{
			name: 'class',
			type: 'string',
			default: "''",
			description: 'Additional Tailwind classes appended to the root span.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLSpanElement>',
			description: 'All native span attributes pass through to the rendered element (added in 0.5.0).'
		}
	],

	porting: [
		'Type token tuples above are the contract. <code>info</code> is brand-tinted on this branch (10% bg / 30% border alpha on <code>--color-brand</code>); <code>success</code>/<code>warning</code>/<code>danger</code> are Tailwind palette tints.'
	],

	example: `<script lang="ts">
	import { Pill } from '@dashfi/svelte/ui/pill';
<\/script>

<Pill type="base">Pending</Pill>
<Pill type="info">New</Pill>
<Pill type="success">+3% cashback</Pill>
<Pill type="warning">Review</Pill>
<Pill type="danger">−$240</Pill>`,

	accessibility: [
		'Decorative-only — pair with adjacent text for context if the meaning is conveyed by the pill alone.',
		'For status changes, announce via an external live region — Pill itself has no ARIA semantics.'
	],

	changelog: [
		{
			version: 'v0.5.0',
			date: '2026-06-04',
			note: 'Icon support (lib 0.5.0, core #5062): the pill is now inline-flex with items-center + gap-1 so a leading icon in children aligns with the label, and it spreads ...restProps (HTMLAttributes<HTMLSpanElement>) so native span attributes pass through. Types and tints unchanged.'
		},
		{
			version: 'v0.4.0',
			date: '2026-05-28',
			note: 'Badge/Pill taxonomy clarified. Pill is now the canonical home for semantic STATE — `base`, `info`, `success`, `warning`, `danger`. Badge keeps only categorical / decorative variants (default / brand / outline / secondary) and dropped its status variants entirely. The clean split: Pill encodes WHAT CONDITION something is in; Badge encodes WHAT something IS. See /components/badge for the counterpart.'
		},
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. base tokens corrected — the prior anatomy had a typo (bg-mutescript-muted-foreground); canonical is bg-muted with --color-muted-foreground text and --color-border border. info is brand-tinted (--color-brand at 10% bg / 30% border alpha), not blue Tailwind palette. success, warning, and danger remain Tailwind palette tints.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-12',
			note: 'Anatomy added: dimensions (px-2.5 py-0.5, text-xs, rounded-sm 4px — not pill-shaped), per-type Tailwind palette tuples (bg/text/border for light + dark), composition rule (decorative <span>, not interactive), explicit non-features. Sets the precedent vs Badge: Pill is status-only and Tailwind-palette-based; Badge carries brand variants.'
		}
	]
};
