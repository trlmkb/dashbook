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

function json(value: unknown): { content: { type: 'text'; text: string }[] } {
	return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] };
}

const DOCS_BASE = 'https://dashbook.vercel.app';

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
				principles: [
					'Confident, direct, warm without being chummy.',
					'Sentence case across the UI. No title-case for UI labels.',
					'No exclamation marks.',
					'No emoji.',
					'Numerals not spelled-out numbers — "5–7%" not "five to seven percent".'
				],
				examples: {
					good: 'The audit is already running.',
					bad: "We're so excited to announce that the audit has started! 🚀"
				},
				docs: `${DOCS_BASE}/brand/voice`,
				note: 'Marketing voice extension (longer-form principles, do/dont matrix) is Phase 2.'
			});
		}
	);

	// ── get_logo ───────────────────────────────────────────────────────
	server.registerTool(
		'marketing_get_logo',
		{
			title: 'Dash.fi logo SVG (inline + URL)',
			description:
				'Returns the wordmark or app icon SVG. Both the inline content (for embedding directly into HTML/JSX) and the canonical URL are returned. Specify a preset to pick a colorway.',
			inputSchema: {
				variant: z.enum(['wordmark', 'app']).default('wordmark').describe('Which mark.'),
				preset: z
					.enum([
						'jade-on-cream',
						'jade-on-ink',
						'cream-on-jade',
						'white-on-ink',
						'white-on-cobalt',
						'black-on-white'
					])
					.default('jade-on-cream')
					.describe('Colorway preset.')
			}
		},
		async ({ variant, preset }) => {
			return json({
				variant,
				preset,
				url: `${DOCS_BASE}/brand/logo/${variant}-${preset}.svg`,
				inlineSvg: null,
				note: 'Inline SVG content delivery is Phase 2. For now, fetch the URL above. Source presets are defined in src/lib/chrome/logo-sources.ts; the docs page at /brand/logo has the live AssetConfigurator for human downloads.'
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
			const disclosures: Record<string, string> = {
				fdic: 'Banking services provided by partner banks, members FDIC.',
				'partner-bank':
					'Dash.fi is a financial technology company, not a bank. Banking services provided by partner banks, members FDIC.',
				'card-issuer':
					'The Dash.fi Card is issued by [partner bank], pursuant to a license from Visa U.S.A. Inc.',
				'full-footer':
					'Dash.fi is a financial technology company, not a bank. Banking services provided by partner banks, members FDIC. The Dash.fi Card is issued by [partner bank], pursuant to a license from Visa U.S.A. Inc.'
			};
			const text = disclosures[kind];
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
					note: 'Partner kit data is Phase 2. The full list lives at /press.',
					docs: `${DOCS_BASE}/press`
				});
			}
			return json({
				partner,
				rules: [
					'Powered-by-Dash badge is opt-in for partner surfaces.',
					'Co-branded lockups use jade + partner brand color side-by-side, never overlayed.',
					'Legal disclosures: see `marketing_get_legal_disclosure({ kind: "partner-bank" })`.'
				],
				note: 'Per-partner asset bundles are Phase 2.',
				docs: `${DOCS_BASE}/press`
			});
		}
	);

	// ── search ─────────────────────────────────────────────────────────
	server.registerTool(
		'marketing_search',
		{
			title: 'Search marketing assets + guidance',
			description:
				'Fuzzy search across marketing-surface content — voice, logos, palette, disclosures, partner kits.',
			inputSchema: {
				query: z.string().describe('Search query.')
			}
		},
		async ({ query }) => {
			return json({
				query,
				note: 'Marketing search is Phase 2. For now, see the docs index at /brand and /press.',
				docs: { brand: `${DOCS_BASE}/brand`, press: `${DOCS_BASE}/press` }
			});
		}
	);
}
