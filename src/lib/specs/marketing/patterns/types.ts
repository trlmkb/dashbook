/**
 * Marketing-pattern spec shape.
 *
 * A marketing pattern is a reusable building block for Dash.fi *marketing*
 * pages. Unlike a product `ComponentSpec` — which documents a published
 * `@dashfi/svelte` component with an npm import path — a marketing pattern is
 * sourced from the dash.fi **website** (Astro 6 + Tailwind v4 + React islands),
 * so it is documented as a *recipe*: DOM structure, the `--m-*` token roles it
 * consumes, the gotchas, and prop signatures pulled from the website source.
 *
 * Source-of-truth for:
 * - `/marketing/patterns/<slug>` docs pages.
 * - The `marketing_list_patterns` + `marketing_get_pattern` MCP tools.
 *
 * Authoring rules match every other spec here: every visible value traces to a
 * field; rules ship with the data; no `any`.
 */

import type { ComponentStatus } from '$chrome/StatusBadge.svelte';
import type { PropDef } from '$chrome/PropsTable.svelte';
import type { DimensionEntry, VariantSpec, ChangelogEntry } from '../../types.js';

export type { PropDef };

export type MarketingPatternCategory =
	| 'Heroes'
	| 'Layout frames'
	| 'Rhythm & connectors'
	| 'Content blocks'
	| 'Media & proof'
	| 'CTAs'
	| 'Building blocks'
	| 'Gotchas';

/** A token role the pattern consumes — references a `--m-*` semantic role. */
export type MarketingTokenUse = {
	/** Logical part — `surface`, `heading`, `accent fill`, `border`. */
	part: string;
	/** The `--m-*` role (or other var) it references. */
	role: string;
	notes?: string;
};

export type MarketingPatternSpec = {
	// ── Identity ───────────────────────────────────────────────────────
	slug: string;
	name: string;
	category: MarketingPatternCategory;
	status: ComponentStatus;
	/** The `marketing_*` id the brief promotes this under, if any (e.g. `marketing_button`). */
	toolId?: string;
	/** One-line description for listings, search, MCP results. */
	description: string;

	// ── Source-of-truth pointer ──────────────────────────────────────────
	/** Path in the dash.fi website repo — pull exact prop signatures from here. */
	source: string;
	/** Caveat about source verification (the website repo isn't bundled here). */
	sourceNote?: string;

	// ── Guidance ─────────────────────────────────────────────────────────
	whenToUse?: string;

	// ── The recipe ───────────────────────────────────────────────────────
	/** Ordered build steps — the reusable recipe. */
	recipe: string[];
	/** DOM / structure sketch (HTML / Astro). */
	dom?: string;
	/** Token roles consumed — references the `--m-*` role set. */
	tokensUsed: MarketingTokenUse[];
	/** Fixed dimensions (radius, sizes, spacing). Reuses the product shape. */
	dimensions?: DimensionEntry[];
	/** Visual variants (e.g. SlideFrame backgrounds). Reuses the product shape. */
	variants?: VariantSpec[];

	// ── Contract ─────────────────────────────────────────────────────────
	/** Prop signatures — authoritative in source; may be marked unverified. */
	props?: PropDef[];
	/** Explicit non-features. */
	nonFeatures?: string[];
	/** Gotchas — the scoped-style trap, mobile blow-out, faux-bold mono, etc. */
	gotchas?: string[];
	/** Motion behaviour, if any. */
	motion?: string[];
	accessibility?: string[];

	// ── Examples ─────────────────────────────────────────────────────────
	/** Canonical usage snippet. */
	example?: string;
	/** Highlighter language for the example — `astro`, `tsx`, `html`, `css`. */
	exampleLang?: string;

	// ── Porting + history ────────────────────────────────────────────────
	porting?: string[];
	changelog: ChangelogEntry[];
};
