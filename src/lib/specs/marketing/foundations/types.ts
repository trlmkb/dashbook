/**
 * Marketing-foundation spec shapes.
 *
 * Marketing foundations are the cross-cutting design decisions for Dash.fi
 * *marketing* surfaces (homepage, product pages, the shipping set) — the
 * counterpart to the product foundations in `src/lib/specs/foundations`, but
 * scoped to the site rather than the `@dashfi/svelte` lib.
 *
 * Source-of-truth for:
 * - `/marketing/foundations/<name>` docs pages.
 * - The `marketing_get_foundation` MCP tool.
 *
 * Authoring rules mirror every other spec in this repo:
 * 1. Every value visible on the docs page traces to a field here.
 * 2. Rules + rationale ship with the data.
 * 3. No `any`. Optional fields are explicit.
 */

import type { ColorToken } from '../../../tokens.js';

// ── Tokens ──────────────────────────────────────────────────────────

export type MarketingTone = 'accent' | 'positive' | 'warn' | 'negative';

export type MarketingTokensFoundation = {
	/** The one-paragraph "why this exists" — surface re-theming in one place. */
	philosophy: string;
	/** The semantic role set (mirror of `marketingRoles` in $lib/tokens). */
	roles: ColorToken[];
	/** The pre-existing thin `--m-*` aliases (named colors), kept for reference. */
	legacyAliases: ColorToken[];
	/** The `data-tone` convention — one element, four semantic styles, no extra class. */
	toneConvention: {
		attribute: string;
		values: MarketingTone[];
		usage: string;
	};
	/** The attribute-flipped dark variant. */
	darkVariant: {
		trigger: string;
		notes: string;
		/** Human-readable light → dark deltas worth knowing. */
		deltas: string[];
	};
	/** Radii scale + the squircle-button rule. */
	radii: { scale: string; button: string };
	/** Layout scale tokens. */
	layoutScale: { contentMax: string; gutters: { sm: string; md: string; lg: string } };
	/** The hard color rules (money = jade, negative = ink, amber = caution). */
	colorRules: string[];
};

// ── Typography ──────────────────────────────────────────────────────

export type MarketingFontFamily = {
	name: string;
	stack: string;
	license: string;
	usage: string;
};

export type MarketingTypeRole = {
	/** Semantic name — `display`, `eyebrow`, `body`, `data`. */
	name: string;
	family: 'display' | 'mono' | 'sans';
	weight: string;
	/** Resolved size — often a `clamp(...)`. */
	size: string;
	lineHeight?: string;
	letterSpacing?: string;
	textTransform?: 'uppercase' | 'lowercase' | 'none';
	usage: string;
	sample?: string;
};

export type MarketingTypographyFoundation = {
	families: { display: MarketingFontFamily; mono: MarketingFontFamily; sans: MarketingFontFamily };
	roles: MarketingTypeRole[];
	/** The canonical copy unit — eyebrow → display heading (accent span) → body. */
	copyUnit: string[];
	gotchas: string[];
	rules: string[];
};

// ── Layout ──────────────────────────────────────────────────────────

export type MarketingLayoutPattern = {
	name: string;
	summary: string;
	/** The CSS recipe — the load-bearing declaration(s). */
	recipe?: string;
	notes?: string;
};

export type MarketingLayoutFoundation = {
	contentMax: string;
	gutters: { sm: string; md: string; lg: string };
	patterns: MarketingLayoutPattern[];
	mobileRule: string;
	/** Pointer to the scoped-style gotcha pattern — the highest-value gotcha. */
	scopedStyleGotcha: string;
};

// ── Section rhythm ──────────────────────────────────────────────────

export type MarketingSurfaceBand = {
	/** `paper` · `cream` · `ink` · `cobalt`. */
	name: string;
	/** The role/var that paints the band background. */
	surface: string;
	/** Foreground role on that band. */
	fg: string;
	usage: string;
};

export type MarketingSectionFoundation = {
	bands: MarketingSurfaceBand[];
	rhythmRules: string[];
};

// ── Motion ──────────────────────────────────────────────────────────

export type MarketingMotionPattern = {
	name: string;
	summary: string;
	recipe?: string;
	/** What this animation does under `prefers-reduced-motion: reduce`. */
	reducedMotion: string;
};

export type MarketingMotionFoundation = {
	patterns: MarketingMotionPattern[];
	reducedMotion: string[];
	rules: string[];
};

// ── Resolver name union ─────────────────────────────────────────────

export type MarketingFoundationName = 'tokens' | 'typography' | 'layout' | 'section' | 'motion';
