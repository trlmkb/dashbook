/**
 * Canonical token export for Dashbook.
 *
 * Product token source of truth: @dashfi/svelte/dist/styles/global.css.
 * The spec-audit guardrail refreshes the resolved values below from that sheet.
 * Marketing/base tokens remain Dashbook-owned brand primitives.
 *
 * Any time a token changes, both this file and `app.css` must be updated together.
 */

export type ColorToken = {
	name: string;
	cssVar: string;
	light: string;
	dark: string;
	role: string;
};

export type ThemeToken = ColorToken;

export const productColors: ColorToken[] = [
	{
		name: 'bg',
		cssVar: '--bg',
		light: '#faf9f5',
		dark: '#0f1412',
		role: 'Page background — warm cream in light, near-black in dark.'
	},
	{
		name: 'bg-muted',
		cssVar: '--bg-muted',
		light: '#f1efea',
		dark: '#191f1d',
		role: 'Hover, subtle fills. One step down from page background.'
	},
	{
		name: 'fg',
		cssVar: '--fg',
		light: '#123b38',
		dark: '#ffffff',
		role: 'Primary text. Deep jade in light, white in dark.'
	},
	{
		name: 'fg-muted',
		cssVar: '--fg-muted',
		light: '#6e8180',
		dark: '#819896',
		role: 'Captions, secondary labels, deactivated text.'
	},
	{
		name: 'border',
		cssVar: '--border',
		light: '#ebeae5',
		dark: '#1e2928',
		role: 'Hairline borders. The only stroke weight in the system: 1px.'
	},
	{
		name: 'input-border',
		cssVar: '--input-border',
		light: '#c0cecd',
		dark: '#1e2928',
		role: 'Form fields — slightly stronger than --border for affordance.'
	},
	{
		name: 'primary',
		cssVar: '--primary',
		light: '#24251d',
		dark: '#ffffff',
		role: 'Primary action surface (e.g. main button). Inverted in dark mode.'
	},
	{
		name: 'primary-fg',
		cssVar: '--primary-fg',
		light: '#ffffff',
		dark: '#000000',
		role: 'Foreground for primary surfaces.'
	},
	{
		name: 'brand',
		cssVar: '--brand',
		light: '#2b5f5b',
		dark: '#46b9af',
		role: 'The single brand accent — deep jade. Lifts in dark for legibility.'
	},
	{
		name: 'brand-fg',
		cssVar: '--brand-fg',
		light: '#ffffff',
		dark: '#000000',
		role: 'Foreground when over the brand color.'
	},
	{
		name: 'destructive',
		cssVar: '--destructive',
		light: '#ff4000',
		dark: '#ff4000',
		role: 'Destructive actions — bright orange in both modes.'
	},
	{
		name: 'ring',
		cssVar: '--ring',
		light: '#2b5f5b',
		dark: '#46b9af',
		role: 'Focus ring — same as brand.'
	},
	{
		name: 'card',
		cssVar: '--card',
		light: '#faf9f5',
		dark: '#0f1412',
		role: 'Card surface — same as page background by default (border-only cards).'
	},
	{
		name: 'popover',
		cssVar: '--popover',
		light: '#ffffff',
		dark: '#161d1a',
		role: 'Floating surfaces — popover, tooltip, dropdown menus.'
	}
];

/**
 * Base palette — named brand primitives. Every other color token references one of these.
 * Update hex values here only; `--m-*` and product semantic tokens follow automatically.
 */
export const baseColors: ColorToken[] = [
	{
		name: 'dash-cobalt',
		cssVar: '--dash-cobalt',
		light: '#354CEF',
		dark: '#354CEF',
		role: 'The dominant marketing brand color (~33k uses in Figma). Reserved for marketing surfaces.'
	},
	{
		name: 'dash-cobalt-deep',
		cssVar: '--dash-cobalt-deep',
		light: '#2A3ECC',
		dark: '#2A3ECC',
		role: 'Pressed/hover state for cobalt on marketing surfaces.'
	},
	{
		name: 'dash-periwinkle',
		cssVar: '--dash-periwinkle',
		light: '#B6C1F2',
		dark: '#B6C1F2',
		role: 'Cobalt tint — light marketing surfaces and accents.'
	},
	{
		name: 'dash-mist',
		cssVar: '--dash-mist',
		light: '#E7E7F0',
		dark: '#E7E7F0',
		role: 'Cool blue-gray neutral for marketing surfaces.'
	},
	{
		name: 'dash-cream',
		cssVar: '--dash-cream',
		light: '#EBEDE4',
		dark: '#EBEDE4',
		role: 'Warm cream — alternative marketing surface (the product uses #FAF8F1, slightly warmer).'
	},
	{
		name: 'dash-white',
		cssVar: '--dash-white',
		light: '#FFFFFF',
		dark: '#FFFFFF',
		role: 'Pure white. Used for popover surfaces in light mode.'
	},
	{
		name: 'dash-yellow',
		cssVar: '--dash-yellow',
		light: '#EBFF00',
		dark: '#EBFF00',
		role: 'Electric highlight — sparing only. Pulls focus to one element per surface.'
	},
	{
		name: 'dash-yellow-glow',
		cssVar: '--dash-yellow-glow',
		light: 'rgba(235, 255, 0, 0.5)',
		dark: 'rgba(235, 255, 0, 0.5)',
		role: 'The yellow-highlight focus glow. Used as box-shadow alpha layer.'
	},
	{
		name: 'dash-jade',
		cssVar: '--dash-jade',
		light: '#2B605C',
		dark: '#2B605C',
		role: 'The product brand accent. Single most-referenced color in product UI.'
	},
	{
		name: 'dash-jade-deep',
		cssVar: '--dash-jade-deep',
		light: '#123B39',
		dark: '#123B39',
		role: 'Body text on light surfaces. Carries weight without aggression.'
	},
	{
		name: 'dash-jade-lifted',
		cssVar: '--dash-jade-lifted',
		light: '#5BB8B0',
		dark: '#5BB8B0',
		role: 'Lifted jade — the accent on dark marketing surfaces (and product --brand in dark). Legible jade on near-black.'
	},
	{
		name: 'dash-ink',
		cssVar: '--dash-ink',
		light: '#25261D',
		dark: '#25261D',
		role: 'Warm near-black for marketing deck covers and brand-book backgrounds.'
	},
	{
		name: 'dash-graphite',
		cssVar: '--dash-graphite',
		light: '#505148',
		dark: '#505148',
		role: 'Warm gray for marketing body copy and disclaimers.'
	},
	{
		name: 'dash-graphite-soft',
		cssVar: '--dash-graphite-soft',
		light: '#80817A',
		dark: '#80817A',
		role: 'Soft warm gray — lightest neutral for tertiary marketing text.'
	}
];

/**
 * Marketing aliases — semantic names for marketing surfaces. Each is an alias
 * of a `--dash-*` primitive; do not assign hex values directly.
 */
export const marketingColors: ColorToken[] = [
	{
		name: 'm-cobalt',
		cssVar: '--m-cobalt',
		light: '#354CEF',
		dark: '#354CEF',
		role: 'Alias of --dash-cobalt. Marketing brand color.'
	},
	{
		name: 'm-cobalt-deep',
		cssVar: '--m-cobalt-deep',
		light: '#2A3ECC',
		dark: '#2A3ECC',
		role: 'Alias of --dash-cobalt-deep. Pressed/hover for marketing cobalt.'
	},
	{
		name: 'm-lavender',
		cssVar: '--m-lavender',
		light: '#B6C1F2',
		dark: '#B6C1F2',
		role: 'Alias of --dash-periwinkle. Light marketing surface.'
	},
	{
		name: 'm-cobalt-dust',
		cssVar: '--m-cobalt-dust',
		light: '#E7E7F0',
		dark: '#E7E7F0',
		role: 'Alias of --dash-mist. Cool blue-gray neutral.'
	},
	{
		name: 'm-cream',
		cssVar: '--m-cream',
		light: '#EBEDE4',
		dark: '#EBEDE4',
		role: 'Alias of --dash-cream. Alternate cream surface.'
	},
	{
		name: 'm-yellow',
		cssVar: '--m-yellow',
		light: '#EBFF00',
		dark: '#EBFF00',
		role: 'Alias of --dash-yellow. Highlight only — one element per surface.'
	},
	{
		name: 'm-jade',
		cssVar: '--m-jade',
		light: '#2B605C',
		dark: '#2B605C',
		role: 'Alias of --dash-jade. Marketing jade medium — same as product --brand.'
	},
	{
		name: 'm-jade-deep',
		cssVar: '--m-jade-deep',
		light: '#123B39',
		dark: '#123B39',
		role: 'Alias of --dash-jade-deep. Marketing jade deep — same as product --fg.'
	},
	{
		name: 'm-near-black',
		cssVar: '--m-near-black',
		light: '#25261D',
		dark: '#25261D',
		role: 'Alias of --dash-ink. Warm near-black for marketing decks.'
	},
	{
		name: 'm-warm-fg',
		cssVar: '--m-warm-fg',
		light: '#505148',
		dark: '#505148',
		role: 'Alias of --dash-graphite. Warm gray for marketing body copy.'
	}
];

/**
 * Marketing semantic ROLE set — the surface-theming layer.
 *
 * Promoted site-wide from the `/shipping` rebuild's per-surface token layer.
 * Philosophy: re-theme a whole marketing surface by editing this short list of
 * roles in one place; components reference roles (`--m-surface`, `--m-accent`,
 * `--m-positive`…), never raw hex. Pair with a `data-tone="accent|positive|
 * warn|negative"` attribute so one element styles four ways with no extra class.
 *
 * Dark variant: every role carries a `dark` value. A marketing surface goes dark
 * by setting `[data-marketing-dark]` on any subtree (see `app.css`) — independent
 * of the product-wide `html.dark` theme. Light→dark deltas worth knowing: accent
 * jade #2B605C → lifted #5BB8B0; surface #FAF9F5 → #14181C; text ink → paper;
 * borders rgba(37,38,29,.1) → rgba(234,230,219,.12).
 *
 * Color rules baked into the role choices: money/positive = jade; negative /
 * violations = monochrome ink (never red); warn/caution = amber.
 */
export const marketingRoles: ColorToken[] = [
	// ── Surfaces ──────────────────────────────────────────────────────
	{
		name: 'm-surface',
		cssVar: '--m-surface',
		light: '#FAF9F5',
		dark: '#14181C',
		role: 'Primary marketing surface — warm paper in light, near-black in dark. The page canvas.'
	},
	{
		name: 'm-surface-2',
		cssVar: '--m-surface-2',
		light: '#EBEDE4',
		dark: 'rgba(234, 230, 219, 0.04)',
		role: 'Raised/inset surface one step off the canvas — white in light, faint warm wash in dark.'
	},
	{
		name: 'm-card',
		cssVar: '--m-card',
		light: '#FFFFFF',
		dark: 'rgba(234, 230, 219, 0.04)',
		role: 'Card surface — sits on the canvas with a 1px --m-border and a faint lift shadow.'
	},
	// ── Foreground ────────────────────────────────────────────────────
	{
		name: 'm-fg-strong',
		cssVar: '--m-fg-strong',
		light: '#25261D',
		dark: '#FAF9F5',
		role: 'Primary text + display headings — ink in light, paper in dark.'
	},
	{
		name: 'm-fg-muted',
		cssVar: '--m-fg-muted',
		light: '#505148',
		dark: 'rgba(234, 230, 219, 0.66)',
		role: 'Body copy and secondary labels.'
	},
	{
		name: 'm-fg-subtle',
		cssVar: '--m-fg-subtle',
		light: '#5D5F55',
		dark: 'rgba(234, 230, 219, 0.40)',
		role: 'Tertiary text — captions, disclaimers, eyebrow detail.'
	},
	// ── Borders ───────────────────────────────────────────────────────
	{
		name: 'm-border',
		cssVar: '--m-border',
		light: 'rgba(37, 38, 29, 0.10)',
		dark: 'rgba(234, 230, 219, 0.12)',
		role: 'Hairline — the default 1px stroke on cards, chips, dividers.'
	},
	{
		name: 'm-border-strong',
		cssVar: '--m-border-strong',
		light: 'rgba(37, 38, 29, 0.20)',
		dark: 'rgba(234, 230, 219, 0.24)',
		role: 'Stronger hairline — hover borders, emphasized dividers.'
	},
	// ── Accent (jade) ─────────────────────────────────────────────────
	{
		name: 'm-accent',
		cssVar: '--m-accent',
		light: '#2B605C',
		dark: '#5BB8B0',
		role: 'The marketing accent — jade, lifting to #5BB8B0 in dark for legibility. data-tone="accent".'
	},
	{
		name: 'm-accent-deep',
		cssVar: '--m-accent-deep',
		light: '#123B39',
		dark: '#2B605C',
		role: 'Pressed/deep accent — deep jade, used for hover and accent text on light.'
	},
	{
		name: 'm-accent-soft',
		cssVar: '--m-accent-soft',
		light: 'rgba(43, 96, 92, 0.08)',
		dark: 'rgba(91, 184, 176, 0.14)',
		role: 'Soft accent tint — chip fills, highlighted rows, accent-toned backgrounds.'
	},
	{
		name: 'm-accent-border',
		cssVar: '--m-accent-border',
		light: 'rgba(43, 96, 92, 0.28)',
		dark: 'rgba(91, 184, 176, 0.34)',
		role: 'Accent-toned 1px border for soft-filled accent elements.'
	},
	// ── Positive (money = jade) ───────────────────────────────────────
	{
		name: 'm-positive',
		cssVar: '--m-positive',
		light: '#2B605C',
		dark: '#5BB8B0',
		role: 'Money/positive — jade. Savings, gains, "included". data-tone="positive". Never green.'
	},
	{
		name: 'm-positive-soft',
		cssVar: '--m-positive-soft',
		light: 'rgba(43, 96, 92, 0.08)',
		dark: 'rgba(91, 184, 176, 0.12)',
		role: 'Soft positive fill — positive chips, highlighted savings cells.'
	},
	{
		name: 'm-positive-border',
		cssVar: '--m-positive-border',
		light: 'rgba(43, 96, 92, 0.28)',
		dark: 'rgba(91, 184, 176, 0.32)',
		role: 'Positive-toned border.'
	},
	// ── Warn (caution = amber) ────────────────────────────────────────
	{
		name: 'm-warn',
		cssVar: '--m-warn',
		light: '#B86400',
		dark: '#D99A3C',
		role: 'Caution — amber #B86400, lifting to #D99A3C in dark. Sparing. data-tone="warn". Sourced from /shipping --ship-warn (= product --warning).'
	},
	{
		name: 'm-warn-soft',
		cssVar: '--m-warn-soft',
		light: 'rgba(184, 100, 0, 0.09)',
		dark: 'rgba(217, 154, 60, 0.12)',
		role: 'Soft amber fill for caution chips.'
	},
	{
		name: 'm-warn-border',
		cssVar: '--m-warn-border',
		light: 'rgba(184, 100, 0, 0.28)',
		dark: 'rgba(217, 154, 60, 0.36)',
		role: 'Amber-toned border.'
	},
	// ── Negative (violations = monochrome ink, NEVER red) ─────────────
	{
		name: 'm-negative',
		cssVar: '--m-negative',
		light: '#25261D',
		dark: '#EBEDE4',
		role: 'Negative/violations — monochrome ink (paper in dark). Overcharges, declines. data-tone="negative". Never red.'
	},
	{
		name: 'm-negative-soft',
		cssVar: '--m-negative-soft',
		light: 'rgba(37, 38, 29, 0.06)',
		dark: 'rgba(235, 237, 228, 0.08)',
		role: 'Soft ink fill for negative chips / flagged rows.'
	},
	{
		name: 'm-negative-border',
		cssVar: '--m-negative-border',
		light: 'rgba(37, 38, 29, 0.20)',
		dark: 'rgba(235, 237, 228, 0.20)',
		role: 'Ink-toned border for negative elements.'
	}
];

export const radii = {
	none: '0',
	sm: '4px',
	md: '6px',
	lg: '8px',
	full: '9999px'
} as const;

export const shadows = {
	sm: '0 1px 2px 0 rgba(18, 59, 57, 0.08)',
	md: '0 6px 20px -6px rgba(18, 59, 57, 0.14), 0 1px 2px rgba(18, 59, 57, 0.06)'
} as const;

export const motion = {
	easingOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
	easingIn: 'cubic-bezier(0.4, 0, 1, 1)',
	easingDefault: 'cubic-bezier(0.4, 0, 0.2, 1)',
	durations: {
		instant: '50ms',
		fast: '150ms',
		normal: '300ms',
		slow: '500ms'
	}
} as const;

export const tokens = {
	productColors,
	baseColors,
	marketingColors,
	marketingRoles,
	radii,
	shadows,
	motion
} as const;
