/**
 * Server-side SVG → PNG rasterization for the marketing asset endpoints
 * and the `marketing_get_*` MCP tools.
 *
 * Why this lives here:
 * Some consumers of `/api/card/...` and `/api/logo/...` can't render inline
 * SVG (markdown previews, embedded chat surfaces, image tags in legacy
 * email clients). PNG raster output gives them a drop-in fallback while the
 * SVG path stays canonical for the configurator and any consumer that can
 * render vector content.
 *
 * Rasterizer choice: `@resvg/resvg-js`.
 * - napi-rs binding around Rust `resvg`; platform-specific binaries are
 *   pulled in via optionalDependencies so Vercel's Linux build picks up the
 *   right `@resvg/resvg-js-linux-x64-gnu` package automatically.
 * - Pure-SVG focus (no general image processing surface), so the dependency
 *   footprint stays under Vercel's 250MB unzipped function limit comfortably.
 * - Sharp v0.33 has documented `@img/sharp-wasm32/versions` resolution issues
 *   with `@sveltejs/adapter-vercel`; we don't need general image processing
 *   here so the simpler-binding option is the right call.
 *
 * See `.knowledge/server-side-png.md` for the full rationale + install recipe.
 */

import { Resvg } from '@resvg/resvg-js';

export type RasterizeOptions = {
	/** Output pixel width. Used when the SVG declares no intrinsic width or you want to override it. */
	width: number;
	/** Output pixel height. Used purely for documentation/header purposes — resvg derives this from the SVG aspect ratio. */
	height: number;
	/**
	 * Multiplier applied to `width` for higher-DPI output. Default `1` (no scaling).
	 * Use `2` for retina-quality renders; the resulting PNG width is `width * scale`.
	 */
	scale?: number;
};

/**
 * Rasterize an SVG string to a PNG byte buffer.
 *
 * The SVG is fitted to a `width * scale` canvas; height is preserved from the
 * SVG's aspect ratio so callers don't have to pre-compute it.
 *
 * @param svg - Standalone SVG string (must include `<svg xmlns=...>` wrapper)
 * @param opts - Width / height target and optional scale factor
 * @returns PNG bytes as a `Uint8Array`
 */
export async function svgToPng(svg: string, opts: RasterizeOptions): Promise<Uint8Array> {
	const scale = opts.scale ?? 1;
	const targetWidth = Math.round(opts.width * scale);

	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: targetWidth },
		// Background stays transparent unless the SVG itself paints one (which
		// our card-background and app-icon generators already do).
		background: 'rgba(0, 0, 0, 0)',
		// We don't ship custom fonts inline — wordmark and app-icon glyphs are
		// inline paths, so we skip font loading entirely for speed.
		font: { loadSystemFonts: false }
	});

	const pngData = resvg.render().asPng();
	// resvg-js returns a Node Buffer in Node runtime; coerce to Uint8Array for
	// portability across the SvelteKit Response constructor.
	return new Uint8Array(pngData);
}
