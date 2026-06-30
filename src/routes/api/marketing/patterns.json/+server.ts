/**
 * Static JSON marketing-pattern catalogue — mirrors the MCP
 * `marketing_list_patterns` tool's response so any non-MCP client (agents
 * without MCP, CI scripts, Figma plugins, crawlers) can discover the marketing
 * pattern library with a single HTTP GET.
 *
 *   GET /api/marketing/patterns.json
 *
 * For one pattern's full recipe, see `/api/marketing/patterns/[slug].json`.
 */

import type { RequestHandler } from './$types';
import { allMarketingPatterns } from '$lib/specs/marketing/patterns';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async () => {
	const patterns = allMarketingPatterns.map((p) => ({
		slug: p.slug,
		name: p.name,
		category: p.category,
		status: p.status,
		toolId: p.toolId,
		description: p.description
	}));

	const payload = {
		count: patterns.length,
		patterns
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
