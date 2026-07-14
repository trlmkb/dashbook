/**
 * Static JSON catalogue endpoint — mirrors the MCP `product_list_components`
 * tool's response shape so any non-browser client (agents without MCP,
 * crawlers, SEO bots, archive fetches) can discover the component catalogue
 * with a single HTTP GET.
 *
 *   GET /api/components.json
 *
 * Same data the MCP server returns from `product_list_components` with no
 * filters applied. For one-component anatomy, see
 * `/api/components/[slug].json`.
 */

import type { RequestHandler } from './$types';
import { allComponentSpecs } from '$lib/specs/components';
import { getComponentImplementation, importPathOnly } from '$lib/specs/implementation';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async () => {
	const components = allComponentSpecs.map((s) => ({
		slug: s.slug,
		name: s.name,
		category: s.category,
		status: s.status,
		importPath: importPathOnly(s.importPath),
		description: s.description,
		implementation: getComponentImplementation(s)
	}));

	const payload = {
		count: components.length,
		components
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
