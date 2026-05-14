/**
 * Foundation-level specification shapes.
 *
 * Single source of truth for:
 * - Docs pages — `src/routes/foundations/<name>/+page.svelte` can render from these.
 * - MCP server (@dashfi/mcp-server) — return structured data to agents asking
 *   "what's the typography scale?" or "what's the spacing rhythm?".
 *
 * Foundations differ from component specs in that they describe cross-cutting
 * design decisions (type ramps, spacing rhythms, motion timings) rather than a
 * single visual contract. Each foundation has its own shape but they share the
 * same authoring rules:
 *
 * 1. Every value visible on the docs page traces to a field here.
 * 2. Rules and rationale ship with the data — agents shouldn't have to guess
 *    why a value exists.
 * 3. No `any` types. Optional fields are explicit.
 */

// ── Typography ──────────────────────────────────────────────────────

/** A font family entry — token + CSS stack + licensing + usage. */
export type FontFamily = {
	/** CSS custom property — e.g. `--font-sans`. */
	cssVar: string;
	/** Display name — e.g. `Bai Jamjuree`. */
	name: string;
	/** Full CSS font-family stack, including fallbacks. */
	stack: string;
	/** License / source — e.g. `SIL OFL`, `Commercial (Pangram Pangram)`. */
	license?: string;
	/** Where this family is used. */
	usage: string;
};

/** One row of the type scale (display, h1, body, caption, ...). */
export type TypeScaleEntry = {
	/** Semantic name — `display`, `h1`, `body-lg`, `caption`. */
	name: string;
	/** Optional CSS class binding (e.g. `.heading-display`). */
	className?: string;
	/** Font family this style uses — `mono` | `sans` | `display`. */
	family: 'sans' | 'mono' | 'display';
	/** Resolved font-size — e.g. `0.9375rem`, `clamp(2.5rem, 6vw, 4.5rem)`. */
	fontSize: string;
	/** Resolved line-height — unitless or px. */
	lineHeight?: string;
	/** Resolved letter-spacing — e.g. `-0.02em`, `0.15em`. */
	letterSpacing?: string;
	/** Font weight — numeric or keyword. */
	weight?: string;
	/** `uppercase` | `lowercase` | `none`. */
	textTransform?: 'uppercase' | 'lowercase' | 'none';
	/** Where this style is used in product. */
	usage: string;
	/** Sample text — useful for spec consumers wanting to render previews. */
	sample?: string;
};

/** A reusable typography utility class (e.g. `.tabular-nums`, `.brand-underline`). */
export type SemanticClass = {
	className: string;
	/** Inline summary of the CSS the class applies. */
	css: string;
	/** Where + when to reach for it. */
	usage: string;
};

/** Tabular-numerics rule block. */
export type TabularNumericsRule = {
	/** CSS declaration that activates tabular figures. */
	declaration: string;
	/** When tabular figures are mandatory. */
	mandatoryWhen: string[];
	/** Convenience classes / attribute selectors that already opt in. */
	autoOptIn: string[];
};

/** Web-delivery URLs for the font families used by the system. */
export type FontWebDelivery = {
	/**
	 * Open-licensed sans family — Bai Jamjuree (SIL OFL). Free to self-host
	 * or load from Google Fonts.
	 */
	sans: {
		family: string;
		license: string;
		googleFonts: string;
		notes: string;
	};
	/**
	 * Commercial mono family — PP Supply Mono (Pangram Pangram). Paywalled.
	 * Embed licensed `@font-face` files inside licensed projects; surfaces
	 * without a license must fall back to `fallback` (JetBrains Mono).
	 */
	mono: {
		family: string;
		license: string;
		source: string;
		fallback: {
			family: string;
			license: string;
			googleFonts: string;
		};
		notes: string;
	};
};

export type TypographyFoundation = {
	families: Record<'sans' | 'mono' | 'display', FontFamily>;
	typeScale: TypeScaleEntry[];
	tabularNumerics: TabularNumericsRule;
	semanticClasses: SemanticClass[];
	/**
	 * Web-delivery URLs — Google Fonts URL for the free sans, license source
	 * + JetBrains Mono fallback for the paywalled mono. Non-Svelte consumers
	 * need these to actually load the fonts.
	 */
	webDelivery: FontWebDelivery;
	rules: string[];
};

// ── Spacing ─────────────────────────────────────────────────────────

/** One step on the 4px-base spacing scale. */
export type SpacingScaleEntry = {
	/** Token name without leading `--` — e.g. `space-4`. */
	token: string;
	/** Tailwind utility shorthand — e.g. `p-4`. */
	tw: string;
	/** Resolved value in px — e.g. `16px`. */
	value: string;
	/** Resolved value in rem — e.g. `1rem`. */
	rem: string;
	/** Where this step is typically applied. */
	usage: string;
};

/** A named breakpoint-driven token (e.g. page padding). */
export type SpacingBreakpointToken = {
	/** Human label — `Mobile`, `Tablet`, `Desktop`. */
	breakpoint: string;
	/** Resolved value at that breakpoint — `24px`. */
	value: string;
	/** Token reference — e.g. `--space-6`. */
	token: string;
};

/** A rhythm rule — describes a vertical/horizontal spacing convention. */
export type SpacingRhythmRule = {
	/** What the rule is called — `Label → Input`, `Field → Field`. */
	name: string;
	/** Resolved value — `6px`, `16px`. */
	value: string;
	/** Optional token reference. */
	token?: string;
	/** Why this rule exists. */
	notes?: string;
};

export type SpacingFoundation = {
	/** Base unit the system is built on — `4px`. */
	baseUnit: string;
	/** The full step scale shown in the docs. */
	scale: SpacingScaleEntry[];
	/** Page padding (or any other) tokens that vary by breakpoint. */
	pagePadding: SpacingBreakpointToken[];
	/** Form-field rhythm rules. */
	formFieldRhythm: SpacingRhythmRule[];
	/** Section rhythm rules. */
	sectionRhythm: SpacingRhythmRule[];
	/** Documented breakpoints, if any. Optional — many systems don't expose these. */
	breakpoints?: Record<string, string>;
	/** Layout rules — page padding, sidebar widths, content max-width. */
	rules: string[];
};

// ── Generic resolver type ──────────────────────────────────────────

export type FoundationName =
	| 'color'
	| 'typography'
	| 'spacing'
	| 'radius'
	| 'motion'
	| 'shadows';
