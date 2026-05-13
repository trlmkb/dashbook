/**
 * Product tool namespace (`product_*`) — components, foundations, tokens.
 *
 * Use these tools to build Dash.fi product UI in any stack.
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allComponentSpecs, getComponentSpec } from '../../specs/components/index.js';
import {
	productColors,
	baseColors,
	marketingColors,
	radii,
	motion as motionTokens,
	shadows
} from '../../tokens.js';

/** Wrap a JSON-serialisable value as MCP text content. */
function json(value: unknown): { content: { type: 'text'; text: string }[] } {
	return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] };
}

/** Strip the "import { X } from 'Y'" wrapper down to just "Y". */
function importPathOnly(importPath: string): string {
	return importPath.replace(/^import .+ from '/, '').replace(/'$/, '');
}

export function registerProductTools(server: McpServer): void {
	// ── list_components ────────────────────────────────────────────────
	server.registerTool(
		'product_list_components',
		{
			title: 'List Dashbook components',
			description:
				'Returns the catalogue of components in @dashfi/svelte. Each entry has slug, name, category, status, and importPath. Use this to discover available components before fetching anatomy.',
			inputSchema: {
				category: z
					.enum(['Inputs', 'Display', 'Feedback', 'Navigation', 'Layout', 'Data'])
					.optional()
					.describe('Filter to one category. Omit for all.'),
				status: z
					.enum(['stable', 'beta', 'deprecated'])
					.optional()
					.describe('Filter by stability status.')
			}
		},
		async ({ category, status }) => {
			let entries = allComponentSpecs.map((s) => ({
				slug: s.slug,
				name: s.name,
				category: s.category,
				status: s.status,
				importPath: importPathOnly(s.importPath),
				description: s.description
			}));
			if (category) entries = entries.filter((e) => e.category === category);
			if (status) entries = entries.filter((e) => e.status === status);
			return json({ count: entries.length, components: entries });
		}
	);

	// ── get_component ──────────────────────────────────────────────────
	server.registerTool(
		'product_get_component',
		{
			title: 'Get a component anatomy',
			description:
				'Returns the full structured spec for one component: dimensions, tokens-per-part, variants, sizes, composition rules, non-features, props, porting checklist, and the canonical Svelte usage example. This is the contract for re-implementing the component in any stack.',
			inputSchema: {
				slug: z
					.string()
					.describe('Component slug — e.g. "button", "input", "radio-group". Use `product_list_components` to discover.')
			}
		},
		async ({ slug }) => {
			const spec = getComponentSpec(slug);
			if (!spec) {
				return {
					content: [
						{
							type: 'text',
							text: `Component "${slug}" not found. Call product_list_components to see available slugs.`
						}
					],
					isError: true
				};
			}
			return json(spec);
		}
	);

	// ── get_foundation ─────────────────────────────────────────────────
	server.registerTool(
		'product_get_foundation',
		{
			title: 'Get a foundation (color, typography, etc.)',
			description:
				'Returns structured data for one Dashbook foundation. Foundations are the deeper-than-tokens conceptual layers: color taxonomy, type scale, spacing rhythm, radius scale, motion timings.',
			inputSchema: {
				name: z
					.enum(['color', 'typography', 'spacing', 'radius', 'motion', 'shadows'])
					.describe('Which foundation to fetch.')
			}
		},
		async ({ name }) => {
			switch (name) {
				case 'color':
					return json({
						product: productColors,
						base: baseColors,
						marketing: marketingColors,
						rules: [
							'Brand accent is single-use. Never combine product jade with marketing cobalt in the same surface.',
							'Destructive is monochrome — black on light, white on dark. Never red.',
							'Yellow is highlight only. One element per slide; never a primary surface.'
						]
					});
				case 'radius':
					return json({
						scale: radii,
						rules: [
							'Default radius is 0 (square) — components opt into rounding explicitly.',
							'`md` (6px) covers buttons + cards; `lg` (8px) covers card surfaces.',
							'`full` (9999px) for round avatars, dots, indicators.'
						]
					});
				case 'motion':
					return json({
						durations: motionTokens,
						rules: [
							'`fast` (120ms) for hover / focus state transitions.',
							'`base` (200ms) for layout shifts, card expansions.',
							'`slow` for explicit emphasis only — sparing.'
						]
					});
				case 'shadows':
					return json({
						scale: shadows,
						rules: [
							'Two-step elevation. `sm` for raised surfaces, `md` for popovers/modals.',
							'Jade-tinted at low opacity — never default Material-style black shadows.'
						]
					});
				case 'typography':
					return json({
						families: {
							sans: { name: 'Bai Jamjuree', license: 'SIL OFL', usage: 'Body, UI, buttons.' },
							mono: {
								name: 'PP Supply Mono',
								license: 'Commercial (Pangram Pangram)',
								usage: 'Display, labels, data values, tabular numbers.'
							},
							display: {
								name: 'PP Supply Mono Ultralight (weight 200)',
								usage: 'Display headings — uppercase, tight letter-spacing.'
							}
						},
						note: 'See https://dashbook.vercel.app/foundations/typography for the full type scale and tabular-numerics rules.'
					});
				case 'spacing':
					return json({
						scale: [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128],
						unit: 'px',
						rules: [
							'4px base unit. Pairs cleanly with Tailwind\'s default scale.',
							'Form-field rhythm: 6px label-to-input gap, 16px field-to-field gap.',
							'Section rhythm: 32px between related groups, 64px between sections.'
						],
						note: 'See https://dashbook.vercel.app/foundations/spacing for usage examples.'
					});
			}
		}
	);

	// ── get_token ──────────────────────────────────────────────────────
	server.registerTool(
		'product_get_token',
		{
			title: 'Look up a single token',
			description:
				'Resolve a single token to its hex values (light + dark). Accepts the bare name (e.g. "brand", "bg-muted") or the full CSS var (e.g. "--brand", "--color-input"). Searches product, base, and marketing palettes.',
			inputSchema: {
				name: z.string().describe('Token name or CSS var — e.g. "brand", "--input-border", "--m-cobalt".')
			}
		},
		async ({ name }) => {
			const normalised = name.replace(/^--/, '');
			const all = [...productColors, ...baseColors, ...marketingColors];
			const match = all.find(
				(t) =>
					t.name === normalised ||
					t.cssVar === `--${normalised}` ||
					t.cssVar === name ||
					t.name === name
			);
			if (!match) {
				return {
					content: [
						{ type: 'text', text: `Token "${name}" not found. Try product_get_foundation({name:"color"}) to see all.` }
					],
					isError: true
				};
			}
			return json(match);
		}
	);

	// ── search ─────────────────────────────────────────────────────────
	server.registerTool(
		'product_search',
		{
			title: 'Search components by keyword',
			description:
				'Fuzzy search across component names, descriptions, categories, and import paths. Returns up to 10 matches ordered by relevance. Use this when the user asks for "a dropdown" or "something with tabs" rather than knowing the exact slug.',
			inputSchema: {
				query: z.string().describe('Search query — e.g. "modal", "dropdown", "tabular data".'),
				limit: z.number().int().min(1).max(50).optional().default(10)
			}
		},
		async ({ query, limit }) => {
			const q = query.toLowerCase();
			const scored = allComponentSpecs
				.map((s) => {
					const haystack = [
						s.slug,
						s.name,
						s.description,
						s.category,
						s.importPath
					]
						.join(' ')
						.toLowerCase();
					let score = 0;
					if (s.slug === q) score += 100;
					else if (s.name.toLowerCase() === q) score += 80;
					else if (haystack.includes(q)) score += 40;
					// token-level fallback — split query into words
					for (const w of q.split(/\s+/)) {
						if (w && haystack.includes(w)) score += 10;
					}
					return { spec: s, score };
				})
				.filter((r) => r.score > 0)
				.sort((a, b) => b.score - a.score)
				.slice(0, limit);

			return json({
				query,
				count: scored.length,
				results: scored.map((r) => ({
					slug: r.spec.slug,
					name: r.spec.name,
					category: r.spec.category,
					status: r.spec.status,
					description: r.spec.description,
					relevance: r.score
				}))
			});
		}
	);

	// ── port_to ────────────────────────────────────────────────────────
	server.registerTool(
		'product_port_to',
		{
			title: 'Get the porting checklist for a component in a target stack',
			description:
				'Returns the stack-specific re-implementation guidance for one component: the dimensions, tokens, and composition rules to honour, plus a starter snippet for that stack. Targets: react, react-native, html-css, vue.',
			inputSchema: {
				slug: z.string().describe('Component slug.'),
				stack: z
					.enum(['react', 'react-native', 'html-css', 'vue'])
					.describe('Target stack.')
			}
		},
		async ({ slug, stack }) => {
			const spec = getComponentSpec(slug);
			if (!spec) {
				return {
					content: [
						{
							type: 'text',
							text: `Component "${slug}" not found. Call product_list_components to see available slugs.`
						}
					],
					isError: true
				};
			}
			return json({
				slug,
				stack,
				name: spec.name,
				contract: {
					dimensions: spec.dimensions,
					tokens: spec.tokens,
					variants: spec.variants,
					sizes: spec.sizes,
					nonFeatures: spec.nonFeatures
				},
				portingChecklist: spec.porting,
				canonicalExample: spec.example,
				canonicalSource: spec.canonicalSource,
				note: 'Tokens listed above have stable hex values across stacks when the Dashbook token sheet is imported. See https://dashbook.vercel.app/developers/from-another-stack for stack-specific setup.'
			});
		}
	);
}
