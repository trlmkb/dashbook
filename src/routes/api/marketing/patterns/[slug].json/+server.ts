/**
 * Static JSON marketing-pattern recipe — mirrors the MCP `marketing_get_pattern`
 * tool's response. Returns the full `MarketingPatternSpec` (recipe, DOM sketch,
 * token roles, dimensions, variants, props, non-features, gotchas) for one
 * pattern identified by slug.
 *
 *   GET /api/marketing/patterns/hero.json
 *   GET /api/marketing/patterns/stat-trio.json
 *
 * Returns 404 (JSON body) when the slug is unknown. Discover available slugs
 * via `/api/marketing/patterns.json`.
 */

import type { RequestHandler } from './$types';
import { getMarketingPattern } from '$lib/specs/marketing/patterns';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;
	const spec = getMarketingPattern(slug);

	if (!spec) {
		return new Response(
			JSON.stringify(
				{
					error: 'not_found',
					slug,
					hint: 'GET /api/marketing/patterns.json for the full catalogue'
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

	return new Response(JSON.stringify(spec, null, 2), {
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
