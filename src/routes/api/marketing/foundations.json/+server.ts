/**
 * Static JSON marketing-foundation catalogue — the list counterpart to
 * `/api/marketing/foundations/[slug].json`. One HTTP GET to discover the
 * marketing foundation set (tokens, typography, layout, section rhythm, motion).
 *
 *   GET /api/marketing/foundations.json
 */

import type { RequestHandler } from './$types';
import { marketingFoundationMeta, marketingFoundationNames } from '$lib/specs/marketing/foundations';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async () => {
	const foundations = marketingFoundationNames.map((slug) => ({
		slug,
		name: marketingFoundationMeta[slug].name,
		description: marketingFoundationMeta[slug].description
	}));

	const payload = {
		count: foundations.length,
		foundations
	};

	return new Response(JSON.stringify(payload, null, 2), {
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
