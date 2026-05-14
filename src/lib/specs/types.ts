/**
 * Canonical component specification.
 *
 * Single source of truth for:
 * - Component docs pages — render Dimensions / Tokens / Composition / etc. from this.
 * - MCP server (@dashfi/mcp-server) — return structured data to agents asking
 *   "what's the Button anatomy?" or "what tokens does Input use?".
 *
 * Each spec mirrors the visual + behavioural contract of a single component
 * in `@dashfi/svelte`. Keep dimensions, tokens, and non-features tight — these
 * are what downstream consumers (humans + agents) rely on.
 *
 * Authoring rules:
 * 1. Every visible value referenced in a docs page must trace to a field here.
 * 2. Resolved hex values (light + dark) are recorded — agents shouldn't need
 *    to resolve `var(--color-input)` to know what colour appears on screen.
 * 3. Non-features are explicit. Re-implementers reliably invent things that
 *    are NOT in the canonical (icon prefixes, background fills, full borders);
 *    listing those keeps the contract honest.
 */

import type { ComponentStatus } from '$chrome/StatusBadge.svelte';
import type { PropDef } from '$chrome/PropsTable.svelte';

export type { PropDef };

export type ComponentCategory =
	| 'Inputs'
	| 'Display'
	| 'Feedback'
	| 'Navigation'
	| 'Layout'
	| 'Data'
	| 'Chrome';

/** A token reference with resolved values per theme. */
export type TokenRef = {
	/** The CSS custom property name — e.g. `--color-input`. */
	cssVar: string;
	/** Resolved value in light mode — typically a hex, sometimes `rgba(...)`. */
	light: string;
	/** Resolved value in dark mode. */
	dark: string;
};

/** A logical "part" of the component with its token, resolved value, and notes. */
export type TokenPart = {
	/** Logical name — `border`, `background`, `placeholder`, `focus-ring`, etc. */
	name: string;
	/** Token reference if the part is tokened; omit for transparent / currentColor / etc. */
	token?: TokenRef;
	/** Free-form explanation — e.g. "bottom only", "currentColor", "transparent". */
	notes?: string;
};

/** Per-variant token map (Button has 7 variants × 5 token slots, Badge has 9, etc.). */
export type VariantSpec = {
	name: string;
	description?: string;
	tokens?: TokenPart[];
};

/** Per-size dimensional table (Button has sm/default/lg; Switch has xs/sm/base/lg). */
export type SizeSpec = {
	name: string;
	/** Height — e.g. `40px` or `h-10`. */
	height?: string;
	/** Horizontal padding — e.g. `16px` or `px-4`. */
	padding?: string;
	/** Font size — e.g. `14px` or `text-sm`. */
	fontSize?: string;
	/** Anything else worth surfacing — e.g. icon size, gap, thumb size. */
	notes?: string;
};

/** A single dimensional fact (height, width, padding, radius). */
export type DimensionEntry = {
	/** Logical part name — `Height`, `Width`, `Padding`, etc. */
	name: string;
	/** Resolved value as it appears in product — e.g. `40px`, `100% of parent`, `none`. */
	value: string;
	/** Optional Tailwind class for traceability — e.g. `h-10`, `w-full min-w-0`. */
	tw?: string;
	/** Optional clarifying note — e.g. "Fixed", "Constrain at the form-field level". */
	notes?: string;
};

/** A row in the page's Changelog tab. */
export type ChangelogEntry = {
	/** Version label — `v0.3.2`. */
	version: string;
	/** ISO date — `2026-05-13`. */
	date: string;
	/** Plain-text note. Markdown-safe but not parsed. */
	note: string;
};

export type ComponentSpec = {
	// ── Identity ─────────────────────────────────────────────────────────
	slug: string;
	name: string;
	category: ComponentCategory;
	status: ComponentStatus;
	importPath: string;
	/** One-line description for listings, search, MCP search results. */
	description: string;

	// ── Source-of-truth pointer ──────────────────────────────────────────
	/** Path in the core repo. Helps re-implementers locate the canonical Svelte. */
	canonicalSource: string;

	// ── Visual contract ──────────────────────────────────────────────────
	/** Top-level dimensions. Use `sizes[]` for variant-heavy dimensional tables. */
	dimensions: DimensionEntry[];
	/** Token usage per logical part (border / bg / placeholder / focus / ...). */
	tokens: TokenPart[];
	/** Optional variant table — for components with multiple visual modes. */
	variants?: VariantSpec[];
	/** Optional size table — for components with multiple size affordances. */
	sizes?: SizeSpec[];

	// ── Composition / behaviour ──────────────────────────────────────────
	/** Prose rules for how the component is composed — pairing with Label etc. */
	composition: string[];
	/** Explicit non-features — what is NOT part of the component. */
	nonFeatures: string[];
	/** Behaviour-only props (mirrors PropsTable's PropDef shape). */
	props: PropDef[];
	/** Stack-agnostic porting checklist. */
	porting: string[];

	// ── Examples ─────────────────────────────────────────────────────────
	/** Canonical Svelte usage snippet (rendered in the "Code" tab). */
	example: string;

	// ── Accessibility ────────────────────────────────────────────────────
	accessibility: string[];

	// ── Changelog ────────────────────────────────────────────────────────
	changelog: ChangelogEntry[];
};
