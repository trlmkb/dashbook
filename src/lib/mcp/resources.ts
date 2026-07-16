/**
 * MCP resources — `dashbook://` URIs backed by the same spec data the
 * `product_*` tools serve.
 *
 * Resources exist for clients that browse/subscribe to a catalogue rather
 * than calling a tool: `resources/list`, `resources/read`. They intentionally
 * reuse the exact data the tools already expose (`allComponentSpecs`,
 * `getComponentSpec`, `getProductFoundationData`) — no parallel copy of the
 * spec data lives here.
 *
 * URIs:
 * - `dashbook://components`            — the full component catalogue.
 * - `dashbook://components/{slug}`     — one component's full anatomy.
 * - `dashbook://foundations/{slug}`    — one product foundation.
 */

import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allComponentSpecs, getComponentSpec } from '../specs/components/index.js';
import { getProductFoundationData, type ProductFoundationName } from './tools/product.js';
import {
	getComponentImplementation,
	withComponentImplementation,
	importPathOnly
} from '../specs/implementation.js';

const JSON_MIME = 'application/json';

const PRODUCT_FOUNDATION_NAMES: ProductFoundationName[] = [
	'color',
	'typography',
	'spacing',
	'radius',
	'motion',
	'shadows'
];

export function registerDashbookResources(server: McpServer): void {
	// ── components (list) ──────────────────────────────────────────────
	server.registerResource(
		'components',
		'dashbook://components',
		{
			title: 'Dashbook component catalogue',
			description:
				'The full catalogue of @dashfi/svelte components plus Chrome-category scaffolds — same data as the product_list_components tool with no filters applied.',
			mimeType: JSON_MIME
		},
		async (uri) => {
			const components = allComponentSpecs.map((s) => ({
				slug: s.slug,
				name: s.name,
				category: s.category,
				status: s.status,
				importPath: importPathOnly(s.importPath),
				description: s.description,
				implementation: getComponentImplementation(s)
			}));
			return {
				contents: [
					{
						uri: uri.href,
						mimeType: JSON_MIME,
						text: JSON.stringify({ count: components.length, components }, null, 2)
					}
				]
			};
		}
	);

	// ── components/{slug} (template) ─────────────────────────────────────
	server.registerResource(
		'component',
		new ResourceTemplate('dashbook://components/{slug}', {
			list: async () => ({
				resources: allComponentSpecs.map((s) => ({
					uri: `dashbook://components/${s.slug}`,
					name: s.name,
					description: s.description,
					mimeType: JSON_MIME
				}))
			})
		}),
		{
			title: 'Dashbook component anatomy',
			description:
				'Full structured spec for one component — same data as the product_get_component tool.',
			mimeType: JSON_MIME
		},
		async (uri, variables) => {
			const slug = Array.isArray(variables.slug) ? variables.slug[0] : variables.slug;
			const spec = slug ? getComponentSpec(slug) : undefined;
			if (!spec) {
				throw new Error(`Component "${String(slug)}" not found. Read dashbook://components for available slugs.`);
			}
			return {
				contents: [
					{
						uri: uri.href,
						mimeType: JSON_MIME,
						text: JSON.stringify(withComponentImplementation(spec), null, 2)
					}
				]
			};
		}
	);

	// ── foundations/{slug} (template) ────────────────────────────────────
	server.registerResource(
		'foundation',
		new ResourceTemplate('dashbook://foundations/{slug}', {
			list: async () => ({
				resources: PRODUCT_FOUNDATION_NAMES.map((name) => ({
					uri: `dashbook://foundations/${name}`,
					name,
					mimeType: JSON_MIME
				}))
			})
		}),
		{
			title: 'Dashbook product foundation',
			description:
				'Structured data for one product foundation (color, typography, spacing, radius, motion, shadows) — same data as the product_get_foundation tool.',
			mimeType: JSON_MIME
		},
		async (uri, variables) => {
			const slug = Array.isArray(variables.slug) ? variables.slug[0] : variables.slug;
			if (!PRODUCT_FOUNDATION_NAMES.includes(slug as ProductFoundationName)) {
				throw new Error(
					`Unknown foundation "${String(slug)}". Valid: ${PRODUCT_FOUNDATION_NAMES.join(', ')}.`
				);
			}
			const data = getProductFoundationData(slug as ProductFoundationName);
			return {
				contents: [{ uri: uri.href, mimeType: JSON_MIME, text: JSON.stringify(data, null, 2) }]
			};
		}
	);
}
