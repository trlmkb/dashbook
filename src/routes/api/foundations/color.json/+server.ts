/**
 * Static JSON color-foundation endpoint — mirrors the MCP
 * `product_get_foundation({ name: 'color' })` response shape. Returns the
 * full color taxonomy: product semantic tokens (with light + dark hex
 * pairs), the base brand palette, and the marketing semantic aliases.
 *
 *   GET /api/foundations/color.json
 *
 * Both `light` and `dark` hex values are included for every token — the
 * dark-mode values were previously only exposed via the rendered docs
 * page, so this endpoint is the first machine-readable surface for them.
 */

import type { RequestHandler } from './$types';
import { productColors, baseColors, marketingColors } from '$lib/tokens';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async () => {
	// Field names mirror the MCP `product_get_foundation({ name: 'color' })`
	// response shape (`product` not `productSemantic`) so an agent using either
	// transport sees byte-identical JSON.
	const payload = {
		product: productColors,
		base: baseColors,
		marketing: marketingColors,
		rules: [
			'Brand accent is single-use. Never combine product jade with marketing cobalt in the same surface.',
			'Destructive is monochrome — black on light, white on dark. Never red.',
			'Yellow is highlight only. One element per slide; never a primary surface.'
		]
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
