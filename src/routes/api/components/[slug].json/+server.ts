/**
 * Static JSON component-anatomy endpoint — mirrors the MCP
 * `product_get_component` tool's response shape. Returns the full
 * `ComponentSpec` (dimensions, tokens, variants, sizes, composition rules,
 * non-features, props, porting checklist, canonical example) for one
 * component identified by slug.
 *
 *   GET /api/components/button.json
 *   GET /api/components/data-table.json
 *
 * Returns 404 (JSON body) when the slug is unknown. Discover available
 * slugs via `/api/components.json`.
 */

import type { RequestHandler } from './$types';
import { getComponentSpec } from '$lib/specs/components';
import { withComponentImplementation } from '$lib/specs/implementation';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;
	const spec = getComponentSpec(slug);

	if (!spec) {
		return new Response(
			JSON.stringify(
				{
					error: 'not_found',
					slug,
					hint: 'GET /api/components.json for the full catalogue'
				},
				null,
				2
			),
			{
				status: 404,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, OPTIONS'
				}
			}
		);
	}

	return new Response(JSON.stringify(withComponentImplementation(spec), null, 2), {
		status: 200,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': `public, max-age=${ONE_DAY}, s-maxage=${ONE_DAY}`,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS'
		}
	});
};

export const prerender = false;
