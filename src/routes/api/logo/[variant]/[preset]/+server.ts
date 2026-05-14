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
 *   Append `?format=png` to any of the above to receive a server-rasterized
 *   PNG instead. Optional `?scale=N` (1–4) multiplies the output resolution
 *   for retina renders.
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
import { svgToPng } from '$chrome/rasterize';

const ONE_DAY = 60 * 60 * 24;

// Natural intrinsic dimensions of the two marks (viewBox-derived).
const WORDMARK_NATURAL = { width: 426, height: 90 };
const APP_NATURAL = { width: 236, height: 236 };

export const GET: RequestHandler = async ({ params, url }) => {
	const { variant, preset } = params;
	const sizeParam = url.searchParams.get('size');
	const size = sizeParam ? parseInt(sizeParam, 10) : null;

	let svg: string;
	let filename: string;
	let dims: { width: number; height: number };

	if (variant === 'wordmark') {
		const p = wordmarkPresets.find((x) => x.id === preset);
		if (!p) {
			error(
				404,
				`Unknown wordmark preset "${preset}". Available: ${wordmarkPresets.map((x) => x.id).join(', ')}`
			);
		}
		svg = wordmarkSvg(p.fg, p.bg, size);
		filename = `dashfi-wordmark-${preset}`;
		// When `size` is given it sets the wordmark's width; height scales by the natural aspect.
		dims = size
			? { width: size, height: Math.round((size / WORDMARK_NATURAL.width) * WORDMARK_NATURAL.height) }
			: WORDMARK_NATURAL;
	} else if (variant === 'app') {
		const p = appIconPresets.find((x) => x.id === preset);
		if (!p) {
			error(
				404,
				`Unknown app-icon preset "${preset}". Available: ${appIconPresets.map((x) => x.id).join(', ')}`
			);
		}
		svg = appIconSvg(p.bg ?? p.fg, p.glyph ?? '#FFFFFF', size);
		filename = `dashfi-app-icon-${preset}`;
		// App icon is square; `size` becomes both width and height.
		dims = size ? { width: size, height: size } : APP_NATURAL;
	} else {
		error(404, `Unknown logo variant "${variant}". Use "wordmark" or "app".`);
	}

	const format = (url.searchParams.get('format') ?? 'svg').toLowerCase();
	if (format !== 'svg' && format !== 'png') {
		error(400, `Unknown format "${format}". Use "svg" (default) or "png".`);
	}

	if (format === 'png') {
		const scaleParam = url.searchParams.get('scale');
		const scale = scaleParam ? Math.max(1, Math.min(4, parseInt(scaleParam, 10) || 1)) : 1;

		const png = await svgToPng(svg, { width: dims.width, height: dims.height, scale });
		// Buffer is a Uint8Array subclass; satisfies BodyInit cleanly under TS strict.
		return new Response(Buffer.from(png), {
			status: 200,
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': `public, max-age=${ONE_DAY}, s-maxage=${ONE_DAY}`,
				'Content-Disposition': `inline; filename="${filename}${scale > 1 ? `@${scale}x` : ''}.png"`,
				'Access-Control-Allow-Origin': '*'
			}
		});
	}

	return new Response(svg, {
		status: 200,
		headers: {
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'Cache-Control': `public, max-age=${ONE_DAY}, s-maxage=${ONE_DAY}`,
			'Content-Disposition': `inline; filename="${filename}.svg"`,
			'Access-Control-Allow-Origin': '*'
		}
	});
};

export const prerender = false;
