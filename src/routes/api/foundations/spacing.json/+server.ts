/**
 * Static JSON spacing-foundation endpoint — mirrors the MCP
 * `product_get_foundation({ name: 'spacing' })` response shape. Returns
 * the base unit, full scale (token + Tailwind class + px + rem + usage),
 * page padding per breakpoint, form-field rhythm, section rhythm, and
 * the spacing rules.
 *
 *   GET /api/foundations/spacing.json
 */

import type { RequestHandler } from './$types';
import { spacingFoundation } from '$lib/specs/foundations';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async () => {
	const payload = {
		...spacingFoundation,
		note: 'See https://dashbook.vercel.app/foundations/spacing for the rendered docs.'
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
