/**
 * Card art endpoint — serves the MDES-spec SVG for one slot of one variant.
 *
 *   GET /api/card/cobalt-current/background       → 1536×969 SVG
 *   GET /api/card/cobalt-current/app-icon         → 100×100 SVG
 *   GET /api/card/cobalt-current/cobrand-logo     → 1372×283 SVG
 *   GET /api/card/cobalt-current/issuer-logo      → 1372×283 SVG (transparent)
 *   GET /api/card/cobalt-current/preview          → 1536×969 SVG composite
 *                                                    (live preview only — NOT
 *                                                    for MDES upload)
 *
 *   Append `?format=png` to any of the above to receive a server-rasterized
 *   PNG instead. Optional `?scale=N` (1–4) multiplies the output resolution
 *   for retina renders.
 *
 * Same SVG content the `marketing_get_card_art` MCP tool inlines, so URL
 * fetches and inline-string consumption are byte-identical.
 */

import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import {
	cardSlotSvg,
	cardPreviewSvg,
	cardVariants,
	CARD_DIMENSIONS,
	type CardSlot
} from '$chrome/card-sources';
import { svgToPng } from '$chrome/rasterize';

const ONE_DAY = 60 * 60 * 24;

const slotAliases: Record<string, CardSlot | 'preview'> = {
	background: 'background',
	'app-icon': 'appIcon',
	appicon: 'appIcon',
	'cobrand-logo': 'cobrandLogo',
	cobrand: 'cobrandLogo',
	'issuer-logo': 'issuerLogo',
	issuer: 'issuerLogo',
	preview: 'preview'
};

export const GET: RequestHandler = async ({ params, url }) => {
	const { variant: variantId, slot: slotParam } = params;

	const variant = cardVariants.find((v) => v.id === variantId);
	if (!variant) {
		error(
			404,
			`Unknown card variant "${variantId}". Available: ${cardVariants.map((v) => v.id).join(', ')}`
		);
	}

	const slot = slotAliases[slotParam];
	if (!slot) {
		error(
			404,
			`Unknown slot "${slotParam}". Available: background, app-icon, cobrand-logo, issuer-logo, preview.`
		);
	}

	// `?safeZone=true` overlays translucent rectangles showing the MDES
	// composite-overlay regions (cobrand strip + brand-mark slot + padding).
	// Only applies to the preview slot — uploadable slots must stay clean.
	const safeZone = url.searchParams.get('safeZone') === 'true';
	const svg =
		slot === 'preview' ? cardPreviewSvg(variant, { safeZone }) : cardSlotSvg(variant, slot);

	const format = (url.searchParams.get('format') ?? 'svg').toLowerCase();
	if (format !== 'svg' && format !== 'png') {
		error(400, `Unknown format "${format}". Use "svg" (default) or "png".`);
	}

	if (format === 'png') {
		const dims = slot === 'preview' ? CARD_DIMENSIONS.background : CARD_DIMENSIONS[slot];
		const scaleParam = url.searchParams.get('scale');
		const scale = scaleParam ? Math.max(1, Math.min(4, parseInt(scaleParam, 10) || 1)) : 1;

		const png = await svgToPng(svg, {
			width: dims.width,
			height: dims.height,
			scale
		});
		const filename = `dashfi-card-${variantId}-${slotParam}${scale > 1 ? `@${scale}x` : ''}.png`;
		// Buffer is a Uint8Array subclass; satisfies BodyInit cleanly under TS strict.
		return new Response(Buffer.from(png), {
			status: 200,
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': `public, max-age=${ONE_DAY}, s-maxage=${ONE_DAY}`,
				'Content-Disposition': `inline; filename="${filename}"`,
				'Access-Control-Allow-Origin': '*'
			}
		});
	}

	const filename = `dashfi-card-${variantId}-${slotParam}.svg`;
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
