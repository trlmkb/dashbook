/**
 * Static JSON typography-foundation endpoint — mirrors the MCP
 * `product_get_foundation({ name: 'typography' })` response shape.
 * Returns families, type scale, semantic classes, tabular-numerics rules,
 * plus web-delivery URLs for the two font families.
 *
 *   GET /api/foundations/typography.json
 *
 * `webDelivery` was promoted to the typed spec on 2026-05-14 so this
 * endpoint and the MCP tool now serve identical data — no inline drift.
 */

import type { RequestHandler } from './$types';
import { typographyFoundation } from '$lib/specs/foundations';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async () => {
	const payload = {
		...typographyFoundation,
		note: 'See https://dashbook.vercel.app/foundations/typography for the rendered docs.'
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
