/**
 * Static JSON marketing-foundation endpoint — mirrors the MCP
 * `marketing_get_foundation` tool's response. Returns the full foundation spec
 * (the `--m-*` token roles, the typography scale, layout rules, section rhythm,
 * or motion contract) for one foundation identified by slug.
 *
 *   GET /api/marketing/foundations/tokens.json
 *   GET /api/marketing/foundations/typography.json
 *
 * Valid slugs: tokens · typography · layout · section · motion.
 * Returns 404 (JSON body) when the slug is unknown.
 */

import type { RequestHandler } from './$types';
import {
	getMarketingFoundation,
	marketingFoundationNames,
	type MarketingFoundationName
} from '$lib/specs/marketing/foundations';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;
	const isValid = (marketingFoundationNames as string[]).includes(slug);
	const spec = isValid ? getMarketingFoundation(slug as MarketingFoundationName) : undefined;

	if (!spec) {
		return new Response(
			JSON.stringify(
				{
					error: 'not_found',
					slug,
					hint: 'GET /api/marketing/foundations.json for the full set'
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
