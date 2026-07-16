/**
 * Marketing tool namespace (`marketing_*`) — brand voice, logos, partner kits.
 *
 * Phase 1: stubs that point at the canonical pages in the docs site.
 * Phase 2: full structured-data tools wired to typed marketing specs.
 *
 * Use these tools for non-product surfaces: announcement emails, partner
 * co-branding, decks, press kits, social posts.
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { marketingColors, baseColors } from '../../tokens.js';
import {
	wordmarkSvg,
	appIconSvg,
	wordmarkPresets,
	appIconPresets
} from '$chrome/logo-sources.js';
import {
	cardVariants,
	cardSlotSvg,
	cardPreviewSvg,
	getCardVariant,
	CARD_DIMENSIONS,
	type CardSlot
} from '$chrome/card-sources.js';
import {
	brandVoice,
	getPartnerKit,
	listPartnerSlugs,
	partnerKits,
	allMarketingPatterns,
	getMarketingPattern,
	marketingFoundationMeta,
	getMarketingFoundation,
	marketingFoundationNames
} from '../../specs/marketing/index.js';
import {
	marketingGetPatternOutputSchema,
	marketingGetMarketingPaletteOutputSchema
} from '../schemas.js';

function json(value: unknown): { content: { type: 'text'; text: string }[] } {
	return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] };
}

/**
 * Same as `json`, plus `structuredContent` — required by the SDK whenever a
 * tool declares an `outputSchema` (see `../schemas.ts`).
 */
function jsonWithSchema(value: Record<string, unknown>): {
	content: { type: 'text'; text: string }[];
	structuredContent: Record<string, unknown>;
} {
	return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }], structuredContent: value };
}

const DOCS_BASE = 'https://dashbook.vercel.app';

const wordmarkPresetIds = wordmarkPresets.map((p) => p.id) as [string, ...string[]];
const appIconPresetIds = appIconPresets.map((p) => p.id) as [string, ...string[]];

// Disclosure catalogue — duplicated as a typed map so `marketing_search` can
// index across kinds without re-parsing the registerTool handler.
type DisclosureKind = 'fdic' | 'partner-bank' | 'card-issuer' | 'full-footer';
const legalDisclosures: Record<DisclosureKind, string> = {
	fdic: 'Banking services provided by partner banks, members FDIC.',
	'partner-bank':
		'Dash.fi is a financial technology company, not a bank. Banking services provided by partner banks, members FDIC.',
	'card-issuer':
		'The Dash.fi Card is issued by [partner bank], pursuant to a license from Visa U.S.A. Inc.',
	'full-footer':
		'Dash.fi is a financial technology company, not a bank. Banking services provided by partner banks, members FDIC. The Dash.fi Card is issued by [partner bank], pursuant to a license from Visa U.S.A. Inc.'
};

export function registerMarketingTools(server: McpServer): void {
	// ── list_patterns ──────────────────────────────────────────────────
	server.registerTool(
		'marketing_list_patterns',
		{
			title: 'List Dash.fi marketing patterns',
			description:
				'Returns the catalogue of reusable marketing page patterns (heroes, layout frames, rhythm/connectors, content blocks, media/proof, CTAs, building blocks, gotchas). These are sourced from the dash.fi website (Astro + Tailwind v4 + React islands), NOT from @dashfi/svelte — for product UI components use product_list_components. Each entry has slug, name, category, status, source path, and the marketing_* tool id (if promoted). Use this to discover patterns before fetching one with marketing_get_pattern.',
			inputSchema: {
				category: z
					.enum([
						'Heroes',
						'Layout frames',
						'Rhythm & connectors',
						'Content blocks',
						'Media & proof',
						'CTAs',
						'Building blocks',
						'Gotchas'
					])
					.optional()
					.describe('Filter to one category. Omit for all.'),
				status: z
					.enum(['stable', 'beta', 'deprecated'])
					.optional()
					.describe('Filter by stability status.')
			}
		},
		async ({ category, status }) => {
			let entries = allMarketingPatterns.map((p) => ({
				slug: p.slug,
				name: p.name,
				category: p.category,
				status: p.status,
				toolId: p.toolId ?? null,
				source: p.source,
				description: p.description
			}));
			if (category) entries = entries.filter((e) => e.category === category);
			if (status) entries = entries.filter((e) => e.status === status);
			return json({
				count: entries.length,
				patterns: entries,
				docs: `${DOCS_BASE}/marketing`,
				note: 'Marketing patterns are recipes from the dash.fi website (DOM + --m-* token roles + gotchas + props pulled from source), not published npm components. Fetch one with marketing_get_pattern({ slug }).'
			});
		}
	);

	// ── get_pattern ────────────────────────────────────────────────────
	server.registerTool(
		'marketing_get_pattern',
		{
			title: 'Get a marketing pattern recipe',
			description:
				'Returns the full structured spec for one marketing pattern: when to use, the build recipe, DOM sketch, the --m-* token roles it consumes, dimensions, variants, prop signatures, non-features, gotchas, motion, accessibility, a usage example, and a porting checklist. This is the contract for rebuilding the pattern on a marketing page in any stack. Use marketing_list_patterns to discover slugs; use marketing_get_foundation for the tokens/typography/layout/section/motion these build on.',
			inputSchema: {
				slug: z
					.string()
					.describe('Pattern slug — e.g. "slide-frame", "squircle-button", "feature-tabs". Use marketing_list_patterns to discover.')
			},
			outputSchema: marketingGetPatternOutputSchema
		},
		async ({ slug }) => {
			const spec = getMarketingPattern(slug);
			if (!spec) {
				return {
					content: [
						{
							type: 'text',
							text: `Marketing pattern "${slug}" not found. Call marketing_list_patterns to see available slugs.`
						}
					],
					isError: true
				};
			}
			return jsonWithSchema({
				...spec,
				docs: `${DOCS_BASE}/marketing/patterns/${spec.slug}`,
				note: 'Prop signatures are authoritative in the website source (see `source`). The recipe + tokensUsed + gotchas are the portable contract.'
			});
		}
	);

	// ── get_foundation ─────────────────────────────────────────────────
	server.registerTool(
		'marketing_get_foundation',
		{
			title: 'Get a marketing foundation (tokens, type, layout, section, motion)',
			description:
				'Returns structured data for one marketing foundation: tokens (the ~20-role surface palette + data-tone convention + attribute-flipped dark variant), typography (PP Supply Mono display + Bai Jamjuree body + the canonical copy unit), layout (container, full-bleed, alternating rows, mobile rule), section (the paper/cream/ink/cobalt band rhythm), or motion (reveal, ambient loops, anchors). These are the marketing counterpart to product_get_foundation. For raw palette hex see marketing_get_marketing_palette.',
			inputSchema: {
				name: z
					.enum(['tokens', 'typography', 'layout', 'section', 'motion'])
					.describe('Which marketing foundation to fetch.')
			}
		},
		async ({ name }) => {
			const foundation = getMarketingFoundation(name);
			if (!foundation) {
				return {
					content: [
						{
							type: 'text',
							text: `Unknown marketing foundation "${name}". Valid: ${marketingFoundationNames.join(', ')}.`
						}
					],
					isError: true
				};
			}
			return json({
				name,
				...foundation,
				docs: `${DOCS_BASE}/marketing/foundations/${name}`,
				note: 'The marketing role tokens resolve in src/app.css; flip a subtree dark with [data-marketing-dark]. Product surfaces use product_get_foundation instead.'
			});
		}
	);

	// ── get_brand_voice ────────────────────────────────────────────────
	server.registerTool(
		'marketing_get_brand_voice',
		{
			title: 'Dash.fi brand voice + tone',
			description:
				'Returns the brand voice principles: tone, sentence case rules, exclamation/emoji policy, numeric conventions. Use when drafting marketing copy, press releases, social posts.',
			inputSchema: {}
		},
		async () => {
			return json({
				...brandVoice,
				docs: `${DOCS_BASE}/brand/voice`,
				note: 'Canonical voice spec extracted from /brand/voice. Use the `contextualGuidance` block when drafting for a specific surface (product UI vs marketing email vs press release).'
			});
		}
	);

	// ── get_logo ───────────────────────────────────────────────────────
	server.registerTool(
		'marketing_get_logo',
		{
			title: 'Dash.fi logo SVG / PNG (inline + URL)',
			description:
				'Returns the wordmark or app icon. SVG by default; pass `format: "png"` to receive a server-rasterized PNG as base64. Both the inline content and the canonical URL are returned — fetching the URL yields the same bytes. Specify a preset to pick a colorway; both wordmark and app-icon expose their own preset list (see `marketing_list_logo_presets`).',
			inputSchema: {
				variant: z
					.enum(['wordmark', 'app'])
					.default('wordmark')
					.describe('Which mark. `wordmark` = the "dash.fi" letters (viewBox 426×90). `app` = the rounded-square "d" icon (viewBox 236×236).'),
				preset: z
					.string()
					.optional()
					.describe(
						'Colorway preset ID. Wordmark: jade, jade-dark, ink, cream-on-jade, white-on-ink, white-on-cobalt, black, transparent. App: jade, cobalt, ink, cream, white, black. Defaults to "jade" for both variants.'
					),
				size: z
					.number()
					.int()
					.positive()
					.optional()
					.describe('Pixel width (wordmark) / square edge (app). Omit for natural size — 426×90 wordmark, 236×236 app.'),
				format: z
					.enum(['svg', 'png'])
					.default('svg')
					.describe('Output format. `svg` (default) returns vector content inline. `png` returns server-rasterized PNG bytes base64-encoded — use this when your consumer can\'t render inline SVG.'),
				scale: z
					.number()
					.int()
					.min(1)
					.max(4)
					.optional()
					.describe('PNG-only DPI multiplier (1–4). Default 1. Use 2 for retina-quality renders. Ignored when format is "svg".')
			}
		},
		async ({ variant, preset, size, format, scale }) => {
			const presets = variant === 'wordmark' ? wordmarkPresets : appIconPresets;
			const resolvedPresetId = preset ?? 'jade';
			const p = presets.find((x) => x.id === resolvedPresetId);
			if (!p) {
				return {
					content: [
						{
							type: 'text',
							text: `Unknown ${variant} preset "${resolvedPresetId}". Valid: ${presets.map((x) => x.id).join(', ')}`
						}
					],
					isError: true
				};
			}

			const sz = size ?? null;
			const inlineSvg =
				variant === 'wordmark'
					? wordmarkSvg(p.fg, p.bg, sz)
					: appIconSvg(p.bg ?? p.fg, p.glyph ?? '#FFFFFF', sz);

			const naturalSize =
				variant === 'wordmark' ? { width: 426, height: 90 } : { width: 236, height: 236 };
			const renderedSize = sz
				? variant === 'wordmark'
					? { width: sz, height: Math.round((sz / naturalSize.width) * naturalSize.height) }
					: { width: sz, height: sz }
				: naturalSize;

			const urlBase = `${DOCS_BASE}/api/logo/${variant}/${p.id}`;
			const urlQuery: string[] = [];
			if (sz) urlQuery.push(`size=${sz}`);
			if (format === 'png') urlQuery.push('format=png');
			if (format === 'png' && scale && scale > 1) urlQuery.push(`scale=${scale}`);
			const url = urlQuery.length ? `${urlBase}?${urlQuery.join('&')}` : urlBase;

			if (format === 'png') {
				const { svgToPng } = await import('$chrome/rasterize');
				const png = await svgToPng(inlineSvg, {
					width: renderedSize.width,
					height: renderedSize.height,
					scale: scale ?? 1
				});
				// Base64-encode for transport — MCP doesn't natively carry binary content.
				const base64 = Buffer.from(png).toString('base64');
				return json({
					variant,
					preset: { id: p.id, label: p.label, fg: p.fg, bg: p.bg, glyph: p.glyph ?? null },
					size: renderedSize,
					format: 'png',
					scale: scale ?? 1,
					url,
					pngBase64: base64,
					note: 'Decode the `pngBase64` field to bytes for use, or fetch the URL directly (same bytes). The endpoint sets Content-Type: image/png and caches for 24h.'
				});
			}

			return json({
				variant,
				preset: { id: p.id, label: p.label, fg: p.fg, bg: p.bg, glyph: p.glyph ?? null },
				size: renderedSize,
				format: 'svg',
				url,
				inlineSvg,
				note: 'Same SVG content is served at the URL — fetch it or paste the inlineSvg string directly into your markup. The /api/logo endpoint sets Content-Type: image/svg+xml and caches for 24h. Pass format="png" to receive a server-rasterized PNG instead.'
			});
		}
	);

	// ── list_logo_presets ──────────────────────────────────────────────
	server.registerTool(
		'marketing_list_logo_presets',
		{
			title: 'List logo colorway presets',
			description:
				'Returns the available colorway presets for either the wordmark or the app icon. Each preset has an id, label, foreground color, optional background, and (app icon only) glyph color.',
			inputSchema: {
				variant: z.enum(['wordmark', 'app']).default('wordmark').describe('Which mark.')
			}
		},
		async ({ variant }) => {
			const presets = variant === 'wordmark' ? wordmarkPresets : appIconPresets;
			return json({
				variant,
				count: presets.length,
				presets
			});
		}
	);

	// ── list_card_variants ─────────────────────────────────────────────
	server.registerTool(
		'marketing_list_card_variants',
		{
			title: 'List Dash.fi credit card art variants',
			description:
				'Returns the catalogue of available card design variants. Each variant generates the four Mastercard MDES asset slots (Card Background, App Icon, Cobrand Logo, Issuer Logo) at the exact dimensions required by the MC tokenization portal. Use this before calling `marketing_get_card_art` to discover variant ids.',
			inputSchema: {}
		},
		async () => {
			return json({
				count: cardVariants.length,
				variants: cardVariants.map((v) => ({
					id: v.id,
					label: v.label,
					status: v.status,
					description: v.description,
					usedForBins: v.usedForBins,
					colors: { bg: v.bg, wordmarkFg: v.wordmarkFg, appIconBg: v.appIcon.bg }
				})),
				slots: Object.entries(CARD_DIMENSIONS).map(([slot, { width, height }]) => ({
					slot,
					width,
					height
				}))
			});
		}
	);

	// ── get_card_art ───────────────────────────────────────────────────
	const cardSlotInputs = ['background', 'app-icon', 'cobrand-logo', 'issuer-logo', 'preview'] as const;
	const slotAliasToInternal: Record<(typeof cardSlotInputs)[number], CardSlot | 'preview'> = {
		background: 'background',
		'app-icon': 'appIcon',
		'cobrand-logo': 'cobrandLogo',
		'issuer-logo': 'issuerLogo',
		preview: 'preview'
	};

	server.registerTool(
		'marketing_get_card_art',
		{
			title: 'Dash.fi credit card art (one MDES slot, SVG or PNG)',
			description:
				'Returns one Mastercard MDES asset slot for one card variant. SVG by default; pass `format: "png"` to receive a server-rasterized PNG as base64 (useful for consumers that can\'t render inline SVG). Both inline content and the canonical URL are returned. Use `marketing_list_card_variants` to discover variant ids before calling this. The `preview` slot returns a composite of all four slots simulating the rendered card — useful for visual review, but NOT for MDES upload (which only accepts SVG).',
			inputSchema: {
				variant: z
					.string()
					.describe('Card variant id — e.g. "cobalt-current". Use marketing_list_card_variants to discover.'),
				slot: z
					.enum(cardSlotInputs)
					.describe(
						'Which asset slot. MDES requires four separate uploads per BIN: background (1536×969), app-icon (100×100), cobrand-logo (1372×283), issuer-logo (1372×283 transparent). `preview` returns a composite preview (NOT for MDES upload).'
					),
				format: z
					.enum(['svg', 'png'])
					.default('svg')
					.describe('Output format. `svg` (default) returns vector content inline — required for MDES uploads. `png` returns server-rasterized PNG bytes base64-encoded — useful for visual previews in consumers that can\'t render SVG.'),
				scale: z
					.number()
					.int()
					.min(1)
					.max(4)
					.optional()
					.describe('PNG-only DPI multiplier (1–4). Default 1. Use 2 for retina-quality renders. Ignored when format is "svg".')
			}
		},
		async ({ variant, slot, format, scale }) => {
			const v = cardVariants.find((x) => x.id === variant);
			if (!v) {
				return {
					content: [
						{
							type: 'text',
							text: `Unknown card variant "${variant}". Valid: ${cardVariants.map((x) => x.id).join(', ')}`
						}
					],
					isError: true
				};
			}
			const internalSlot = slotAliasToInternal[slot];
			const svg =
				internalSlot === 'preview' ? cardPreviewSvg(v) : cardSlotSvg(v, internalSlot);
			const dims =
				internalSlot === 'preview'
					? CARD_DIMENSIONS.background
					: CARD_DIMENSIONS[internalSlot];

			const urlBase = `${DOCS_BASE}/api/card/${v.id}/${slot}`;
			const urlQuery: string[] = [];
			if (format === 'png') urlQuery.push('format=png');
			if (format === 'png' && scale && scale > 1) urlQuery.push(`scale=${scale}`);
			const url = urlQuery.length ? `${urlBase}?${urlQuery.join('&')}` : urlBase;

			if (format === 'png') {
				const { svgToPng } = await import('$chrome/rasterize');
				const png = await svgToPng(svg, { width: dims.width, height: dims.height, scale: scale ?? 1 });
				const base64 = Buffer.from(png).toString('base64');
				return json({
					variant: v.id,
					slot,
					dimensions: dims,
					format: 'png',
					scale: scale ?? 1,
					url,
					pngBase64: base64,
					mdesUploadable: false,
					note: 'PNG is NOT accepted by the MDES portal — request the same slot with format="svg" (the default) for upload. PNG is provided for preview/embedding only.'
				});
			}

			return json({
				variant: v.id,
				slot,
				dimensions: dims,
				format: 'svg',
				url,
				inlineSvg: svg,
				mdesUploadable: slot !== 'preview',
				note:
					slot === 'preview'
						? 'This is a composite preview only — do NOT upload to MDES. Use the individual slot URLs/SVGs for MC submissions.'
						: 'Upload this SVG to the matching slot in the MC MDES portal. Asset name must be ≤30 characters.'
			});
		}
	);

	// ── get_marketing_palette ──────────────────────────────────────────
	server.registerTool(
		'marketing_get_marketing_palette',
		{
			title: 'Marketing color palette',
			description:
				'Returns the marketing-only palette — cobalt, periwinkle, mist, cream, yellow. These are reserved for marketing surfaces (announcements, decks, billboards). Product UI uses the jade brand from `product_get_foundation`.',
			inputSchema: {},
			outputSchema: marketingGetMarketingPaletteOutputSchema
		},
		async () => {
			return jsonWithSchema({
				palette: marketingColors,
				base: baseColors,
				rules: [
					'Cobalt is the marketing brand color. It does NOT appear in product UI components (with one exception in vnext — Button `secondary`).',
					'Yellow is highlight-only. One element per surface.',
					'Periwinkle + mist are tints of cobalt, used for soft backgrounds and gradients.',
					'Cream is the warm-neutral surface that ties product + marketing together.'
				],
				docs: `${DOCS_BASE}/foundations/color`
			});
		}
	);

	// ── get_legal_disclosure ───────────────────────────────────────────
	server.registerTool(
		'marketing_get_legal_disclosure',
		{
			title: 'Legal disclosure snippet',
			description:
				'Returns the canonical legal disclosure text for a given context. Use these verbatim in emails, footers, and partner co-branding.',
			inputSchema: {
				kind: z
					.enum(['fdic', 'partner-bank', 'card-issuer', 'full-footer'])
					.describe('Which disclosure to fetch.')
			}
		},
		async ({ kind }) => {
			const text = legalDisclosures[kind];
			if (!text) {
				return {
					content: [
						{ type: 'text', text: `Unknown disclosure kind: "${kind}". Phase 2 will expand the catalogue.` }
					],
					isError: true
				};
			}
			return json({
				kind,
				text,
				docs: `${DOCS_BASE}/press`,
				note: 'Replace bracketed placeholders with the partner-specific value at use time.'
			});
		}
	);

	// ── get_partner_kit ────────────────────────────────────────────────
	server.registerTool(
		'marketing_get_partner_kit',
		{
			title: 'Partner co-branding kit',
			description:
				'Returns the partner co-branding rules and asset URLs. Use when producing announcement materials, joint landing pages, integration docs.',
			inputSchema: {
				partner: z.string().optional().describe('Partner slug. Omit to list partners.')
			}
		},
		async ({ partner }) => {
			if (!partner) {
				return json({
					summary:
						'Co-branding rules, Powered-by-Dash badge variants, and publicly disclosed partner relationships.',
					partnerSlugs: listPartnerSlugs(),
					general: partnerKits.general,
					notes: partnerKits.notes,
					docs: `${DOCS_BASE}/press`,
					hint: 'Call again with `partner: "<slug>"` to get a single partner kit with its category, co-branding rules, legal disclosure, and any asset URLs.'
				});
			}
			const kit = getPartnerKit(partner);
			if (!kit) {
				return {
					content: [
						{
							type: 'text',
							text: `Unknown partner slug "${partner}". Known slugs: ${listPartnerSlugs().join(', ')}.`
						}
					],
					isError: true
				};
			}
			return json({
				...kit,
				generalRules: partnerKits.general.rules,
				legalDisclosurePolicy: partnerKits.general.legalDisclosures,
				docs: `${DOCS_BASE}/press`,
				note: kit.assetUrls
					? undefined
					: 'Asset URLs (lockup SVG, partner logo) are not yet authored — coordinate with Partner Operations.'
			});
		}
	);

	// ── search ─────────────────────────────────────────────────────────
	server.registerTool(
		'marketing_search',
		{
			title: 'Search marketing assets + guidance',
			description:
				'Fuzzy search across marketing-surface content — voice principles, voice examples, copywriting rules, palette tokens, legal disclosures, partner kits. Returns up to 10 matches ordered by relevance.',
			inputSchema: {
				query: z.string().describe('Search query — e.g. "exclamation", "cobalt", "FDIC", "issuing bank".'),
				limit: z.number().int().min(1).max(50).optional().default(10),
				kinds: z
					.array(
						z.enum([
							'voice-principle',
							'voice-rule',
							'voice-example',
							'voice-guidance',
							'palette',
							'legal-disclosure',
							'partner',
							'partner-rule',
							'badge-variant',
							'pattern',
							'foundation'
						])
					)
					.optional()
					.describe('Restrict search to these kinds. Omit for all kinds.')
			}
		},
		async ({ query, limit, kinds }) => {
			type SearchKind =
				| 'voice-principle'
				| 'voice-rule'
				| 'voice-example'
				| 'voice-guidance'
				| 'palette'
				| 'legal-disclosure'
				| 'partner'
				| 'partner-rule'
				| 'badge-variant'
				| 'pattern'
				| 'foundation';

			type Candidate = {
				kind: SearchKind;
				id: string;
				title: string;
				snippet: string;
				ref?: string;
				haystack: string;
			};

			const candidates: Candidate[] = [];

			// Marketing patterns
			for (const p of allMarketingPatterns) {
				candidates.push({
					kind: 'pattern',
					id: p.slug,
					title: p.name,
					snippet: `${p.category}${p.toolId ? ` · ${p.toolId}` : ''} — ${p.description}`,
					ref: `marketing_get_pattern({ slug: "${p.slug}" })`,
					haystack: `${p.slug} ${p.name} ${p.category} ${p.toolId ?? ''} ${p.description}`.toLowerCase()
				});
			}

			// Marketing foundations
			for (const fname of marketingFoundationNames) {
				const meta = marketingFoundationMeta[fname];
				candidates.push({
					kind: 'foundation',
					id: fname,
					title: `${meta.name} (marketing)`,
					snippet: meta.description,
					ref: `marketing_get_foundation({ name: "${fname}" })`,
					haystack: `${fname} ${meta.name} marketing foundation ${meta.description}`.toLowerCase()
				});
			}

			// Voice principles
			for (const p of brandVoice.principles) {
				candidates.push({
					kind: 'voice-principle',
					id: p.title.toLowerCase().replace(/\s+/g, '-'),
					title: p.title,
					snippet: p.body,
					ref: 'marketing_get_brand_voice → principles',
					haystack: `${p.title} ${p.body}`.toLowerCase()
				});
			}

			// Voice copywriting rules
			for (const r of brandVoice.rules) {
				candidates.push({
					kind: 'voice-rule',
					id: r.id,
					title: r.id,
					snippet: `${r.do} | ${r.dont}`,
					ref: `marketing_get_brand_voice → rules.${r.id}`,
					haystack: `${r.id} ${r.do} ${r.dont} ${r.exception ?? ''}`.toLowerCase()
				});
			}

			// Voice examples (good + bad)
			for (const ex of brandVoice.examples.good) {
				candidates.push({
					kind: 'voice-example',
					id: `good:${ex.context}`,
					title: `Good — ${ex.context}`,
					snippet: ex.text,
					ref: 'marketing_get_brand_voice → examples.good',
					haystack: `good ${ex.context} ${ex.text}`.toLowerCase()
				});
			}
			for (const ex of brandVoice.examples.bad) {
				candidates.push({
					kind: 'voice-example',
					id: `bad:${ex.context}`,
					title: `Bad — ${ex.context}`,
					snippet: `${ex.text}${ex.why ? ` — ${ex.why}` : ''}`,
					ref: 'marketing_get_brand_voice → examples.bad',
					haystack: `bad ${ex.context} ${ex.text} ${ex.why ?? ''}`.toLowerCase()
				});
			}

			// Voice before/after pairs
			for (const ba of brandVoice.beforeAfter) {
				candidates.push({
					kind: 'voice-example',
					id: `before-after:${ba.context}`,
					title: `Before/after — ${ba.context}`,
					snippet: `Before: ${ba.before} → After: ${ba.after}`,
					ref: 'marketing_get_brand_voice → beforeAfter',
					haystack: `before after ${ba.context} ${ba.before} ${ba.after}`.toLowerCase()
				});
			}

			// Voice surface guidance
			for (const sg of brandVoice.contextualGuidance) {
				candidates.push({
					kind: 'voice-guidance',
					id: sg.surface.toLowerCase().replace(/\s+/g, '-'),
					title: sg.surface,
					snippet: sg.rules.join(' · '),
					ref: 'marketing_get_brand_voice → contextualGuidance',
					haystack: `${sg.surface} ${sg.rules.join(' ')}`.toLowerCase()
				});
			}

			// Palette tokens (marketing + base — these are the colorways exposed for marketing)
			for (const t of [...marketingColors, ...baseColors]) {
				candidates.push({
					kind: 'palette',
					id: t.name,
					title: t.name,
					snippet: `${t.cssVar} · light ${t.light} · dark ${t.dark}${t.role ? ` · ${t.role}` : ''}`,
					ref: 'marketing_get_marketing_palette',
					haystack: `${t.name} ${t.cssVar} ${t.light} ${t.dark} ${t.role ?? ''}`.toLowerCase()
				});
			}

			// Legal disclosures
			for (const [kind, text] of Object.entries(legalDisclosures)) {
				candidates.push({
					kind: 'legal-disclosure',
					id: kind,
					title: kind,
					snippet: text,
					ref: `marketing_get_legal_disclosure({ kind: "${kind}" })`,
					haystack: `${kind} ${text}`.toLowerCase()
				});
			}

			// Partners
			for (const partner of partnerKits.partners) {
				const blob = [
					partner.slug,
					partner.displayName,
					partner.category,
					partner.legalDisclosure ?? '',
					partner.regulator ?? '',
					partner.coBrandingRules.join(' ')
				].join(' ');
				candidates.push({
					kind: 'partner',
					id: partner.slug,
					title: partner.displayName,
					snippet: `${partner.category}${partner.regulator ? ` · ${partner.regulator}` : ''}`,
					ref: `marketing_get_partner_kit({ partner: "${partner.slug}" })`,
					haystack: blob.toLowerCase()
				});
			}

			// General partner co-branding rules
			for (let i = 0; i < partnerKits.general.rules.length; i++) {
				const rule = partnerKits.general.rules[i];
				candidates.push({
					kind: 'partner-rule',
					id: `general-${i}`,
					title: `General co-branding rule #${i + 1}`,
					snippet: rule,
					ref: 'marketing_get_partner_kit → general.rules',
					haystack: rule.toLowerCase()
				});
			}

			// Powered-by-Dash badge variants
			for (const bv of partnerKits.general.badgeVariants) {
				candidates.push({
					kind: 'badge-variant',
					id: bv.id,
					title: bv.label,
					snippet: `${bv.note} · fg ${bv.fg} on bg ${bv.bg}`,
					ref: 'marketing_get_partner_kit → general.badgeVariants',
					haystack: `${bv.id} ${bv.label} ${bv.note} ${bv.fg} ${bv.bg}`.toLowerCase()
				});
			}

			// Filter by kinds if specified
			const filtered = kinds && kinds.length > 0
				? candidates.filter((c) => kinds.includes(c.kind))
				: candidates;

			// Score (mirrors product_search pattern)
			const q = query.toLowerCase().trim();
			const words = q.split(/\s+/).filter(Boolean);
			const scored = filtered
				.map((c) => {
					let score = 0;
					if (c.id.toLowerCase() === q) score += 100;
					else if (c.title.toLowerCase() === q) score += 80;
					else if (c.haystack.includes(q)) score += 40;
					for (const w of words) {
						if (!w) continue;
						if (c.haystack.includes(w)) score += 10;
					}
					return { c, score };
				})
				.filter((r) => r.score > 0)
				.sort((a, b) => b.score - a.score)
				.slice(0, limit);

			return json({
				query,
				count: scored.length,
				results: scored.map((r) => ({
					kind: r.c.kind,
					id: r.c.id,
					title: r.c.title,
					snippet: r.c.snippet,
					ref: r.c.ref,
					relevance: r.score
				})),
				kindsSearched:
					kinds && kinds.length > 0
						? kinds
						: [
							'voice-principle',
							'voice-rule',
							'voice-example',
							'voice-guidance',
							'palette',
							'legal-disclosure',
							'partner',
							'partner-rule',
							'badge-variant',
							'pattern',
							'foundation'
						]
			});
		}
	);
}
