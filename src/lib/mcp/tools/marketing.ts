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
	brandVoice,
	getPartnerKit,
	listPartnerSlugs,
	partnerKits
} from '../../specs/marketing/index.js';

function json(value: unknown): { content: { type: 'text'; text: string }[] } {
	return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] };
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
			title: 'Dash.fi logo SVG (inline + URL)',
			description:
				'Returns the wordmark or app icon SVG. Both the inline content (for embedding directly into HTML/JSX) and the canonical URL are returned — same bytes either way. Specify a preset to pick a colorway; both wordmark and app-icon expose their own preset list (see `marketing_list_logo_presets`).',
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
					.describe('Pixel width (wordmark) / square edge (app). Omit for natural size — 426×90 wordmark, 236×236 app.')
			}
		},
		async ({ variant, preset, size }) => {
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

			const urlBase = `${DOCS_BASE}/api/logo/${variant}/${p.id}`;
			const url = sz ? `${urlBase}?size=${sz}` : urlBase;

			return json({
				variant,
				preset: { id: p.id, label: p.label, fg: p.fg, bg: p.bg, glyph: p.glyph ?? null },
				size: sz ?? (variant === 'wordmark' ? { width: 426, height: 90 } : { width: 236, height: 236 }),
				url,
				inlineSvg,
				note: 'Same SVG content is served at the URL — fetch it or paste the inlineSvg string directly into your markup. The /api/logo endpoint sets Content-Type: image/svg+xml and caches for 24h.'
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

	// ── get_marketing_palette ──────────────────────────────────────────
	server.registerTool(
		'marketing_get_marketing_palette',
		{
			title: 'Marketing color palette',
			description:
				'Returns the marketing-only palette — cobalt, periwinkle, mist, cream, yellow. These are reserved for marketing surfaces (announcements, decks, billboards). Product UI uses the jade brand from `product_get_foundation`.',
			inputSchema: {}
		},
		async () => {
			return json({
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
							'badge-variant'
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
				| 'badge-variant';

			type Candidate = {
				kind: SearchKind;
				id: string;
				title: string;
				snippet: string;
				ref?: string;
				haystack: string;
			};

			const candidates: Candidate[] = [];

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
							'badge-variant'
						]
			});
		}
	);
}
