/**
 * Zod output schemas for the MCP tools that return structured, everything's
 * settled data — mirrors the input-schema convention (`z.object` fields
 * passed as a raw shape to `registerTool`'s `outputSchema`), derived from the
 * canonical TS types in `src/lib/specs/types.ts` and
 * `src/lib/specs/marketing/patterns/types.ts` so the wire shape and the type
 * definitions can't drift silently.
 *
 * Kept intentionally structural (no `.strict()`) — these describe the shape
 * a client can rely on, not an exhaustive closed contract, since tool
 * responses append a few call-site-only fields (`docs`, `note`) on top of
 * the spec object.
 */

import { z } from 'zod';

// ── Shared building blocks (mirrors src/lib/specs/types.ts) ────────────────

const tokenRefShape = z.object({
	cssVar: z.string(),
	light: z.string(),
	dark: z.string()
});

const tokenPartShape = z.object({
	name: z.string(),
	token: tokenRefShape.optional(),
	notes: z.string().optional()
});

const variantSpecShape = z.object({
	name: z.string(),
	description: z.string().optional(),
	tokens: z.array(tokenPartShape).optional()
});

const sizeSpecShape = z.object({
	name: z.string(),
	height: z.string().optional(),
	padding: z.string().optional(),
	fontSize: z.string().optional(),
	notes: z.string().optional()
});

const dimensionEntryShape = z.object({
	name: z.string(),
	value: z.string(),
	tw: z.string().optional(),
	notes: z.string().optional()
});

const changelogEntryShape = z.object({
	version: z.string(),
	date: z.string(),
	note: z.string()
});

const propDefShape = z.object({
	name: z.string(),
	type: z.string(),
	default: z.string().optional(),
	required: z.boolean().optional(),
	bindable: z.boolean().optional(),
	description: z.string()
});

/** Mirrors `ColorToken` in `src/lib/tokens.ts`. */
const colorTokenShape = z.object({
	name: z.string(),
	cssVar: z.string(),
	light: z.string(),
	dark: z.string(),
	role: z.string()
});

/** Mirrors `ComponentSpec` in `src/lib/specs/types.ts`. */
const componentSpecShape = {
	slug: z.string(),
	name: z.string(),
	category: z.enum(['Inputs', 'Display', 'Feedback', 'Navigation', 'Layout', 'Data', 'Chrome']),
	status: z.enum(['stable', 'beta', 'deprecated']),
	importPath: z.string(),
	description: z.string(),
	canonicalSource: z.string(),
	dimensions: z.array(dimensionEntryShape),
	tokens: z.array(tokenPartShape),
	variants: z.array(variantSpecShape).optional(),
	sizes: z.array(sizeSpecShape).optional(),
	whenToUse: z.string().optional(),
	composition: z.array(z.string()),
	nonFeatures: z.array(z.string()),
	props: z.array(propDefShape),
	porting: z.array(z.string()),
	example: z.string(),
	accessibility: z.array(z.string()),
	changelog: z.array(changelogEntryShape)
};

/** Mirrors `MarketingTokenUse` in `src/lib/specs/marketing/patterns/types.ts`. */
const marketingTokenUseShape = z.object({
	part: z.string(),
	role: z.string(),
	notes: z.string().optional()
});

/** Mirrors `MarketingPatternSpec` in `src/lib/specs/marketing/patterns/types.ts`. */
const marketingPatternSpecShape = {
	slug: z.string(),
	name: z.string(),
	category: z.enum([
		'Heroes',
		'Layout frames',
		'Rhythm & connectors',
		'Content blocks',
		'Media & proof',
		'CTAs',
		'Building blocks',
		'Gotchas'
	]),
	status: z.enum(['stable', 'beta', 'deprecated']),
	toolId: z.string().optional(),
	description: z.string(),
	source: z.string(),
	sourceNote: z.string().optional(),
	whenToUse: z.string().optional(),
	recipe: z.array(z.string()),
	dom: z.string().optional(),
	tokensUsed: z.array(marketingTokenUseShape),
	dimensions: z.array(dimensionEntryShape).optional(),
	variants: z.array(variantSpecShape).optional(),
	props: z.array(propDefShape).optional(),
	nonFeatures: z.array(z.string()).optional(),
	gotchas: z.array(z.string()).optional(),
	motion: z.array(z.string()).optional(),
	accessibility: z.array(z.string()).optional(),
	example: z.string().optional(),
	exampleLang: z.string().optional(),
	porting: z.array(z.string()).optional(),
	changelog: z.array(changelogEntryShape),
	docs: z.string(),
	note: z.string()
};

// ── Per-tool output schemas ─────────────────────────────────────────────────

/** `product_get_component` — the raw `ComponentSpec`, no fields appended. */
export const productGetComponentOutputSchema = componentSpecShape;

/** `product_get_token` — one resolved `ColorToken`. */
export const productGetTokenOutputSchema = colorTokenShape.shape;

/** `product_list_components` — the catalogue listing. */
export const productListComponentsOutputSchema = {
	count: z.number().int(),
	components: z.array(
		z.object({
			slug: z.string(),
			name: z.string(),
			category: componentSpecShape.category,
			status: componentSpecShape.status,
			importPath: z.string(),
			description: z.string()
		})
	)
};

/** `marketing_get_pattern` — the pattern spec plus the call-site `docs`/`note`. */
export const marketingGetPatternOutputSchema = marketingPatternSpecShape;

/** `marketing_get_marketing_palette` — the marketing palette + base neutrals. */
export const marketingGetMarketingPaletteOutputSchema = {
	palette: z.array(colorTokenShape),
	base: z.array(colorTokenShape),
	rules: z.array(z.string()),
	docs: z.string()
};
