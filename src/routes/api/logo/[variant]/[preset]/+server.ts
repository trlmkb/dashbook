/**
 * Dynamic logo endpoint. Serves the Dash.fi wordmark or app icon as inline
 * SVG with the requested colorway preset, suitable for `<img src>`, `fetch`,
 * or direct download.
 *
 *   GET /api/logo/wordmark/jade            (Jade on cream — the default)
 *   GET /api/logo/wordmark/cream-on-jade
 *   GET /api/logo/wordmark/white-on-ink?size=200
 *   GET /api/logo/app/cobalt
 *
 * Same SVG content the MCP's marketing_get_logo tool inlines, so URL fetches
 * and inline-string consumption are byte-identical.
 */

import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import {
	wordmarkSvg,
	appIconSvg,
	wordmarkPresets,
	appIconPresets
} from '$chrome/logo-sources.js';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = ({ params, url }) => {
	const { variant, preset } = params;
	const sizeParam = url.searchParams.get('size');
	const size = sizeParam ? parseInt(sizeParam, 10) : null;

	let svg: string;
	let filename: string;

	if (variant === 'wordmark') {
		const p = wordmarkPresets.find((x) => x.id === preset);
		if (!p) {
			error(404, `Unknown wordmark preset "${preset}". Available: ${wordmarkPresets.map((x) => x.id).join(', ')}`);
		}
		svg = wordmarkSvg(p.fg, p.bg, size);
		filename = `dashfi-wordmark-${preset}.svg`;
	} else if (variant === 'app') {
		const p = appIconPresets.find((x) => x.id === preset);
		if (!p) {
			error(404, `Unknown app-icon preset "${preset}". Available: ${appIconPresets.map((x) => x.id).join(', ')}`);
		}
		svg = appIconSvg(p.bg ?? p.fg, p.glyph ?? '#FFFFFF', size);
		filename = `dashfi-app-icon-${preset}.svg`;
	} else {
		error(404, `Unknown logo variant "${variant}". Use "wordmark" or "app".`);
	}

	return new Response(svg, {
		status: 200,
		headers: {
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'Cache-Control': `public, max-age=${ONE_DAY}, s-maxage=${ONE_DAY}`,
			'Content-Disposition': `inline; filename="${filename}"`,
			'Access-Control-Allow-Origin': '*'
		}
	});
};

export const prerender = false;
