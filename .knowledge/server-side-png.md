# Server-side PNG rasterization

Added 2026-05-14. Lets the `/api/card/...` and `/api/logo/...` endpoints — and the matching MCP tools — return PNG output for consumers that can't render inline SVG (markdown previews, embedded chat surfaces, legacy email clients, image-only crawlers).

SVG remains the canonical format. PNG is opt-in via `?format=png` on the HTTP endpoints or `format: 'png'` on the MCP tools.

## Rasterizer choice: `@resvg/resvg-js`

Picked over sharp / canvg / @resvg/resvg-wasm because:

- **napi-rs binding around Rust `resvg`** — small, focused, no general image-processing surface.
- **Vercel-friendly** — platform binaries (`@resvg/resvg-js-linux-x64-gnu`, etc.) ship as `optionalDependencies`, so Vercel's Linux build picks up the right one automatically. No platform-mismatch story like sharp v0.33 has had with `@sveltejs/adapter-vercel`.
- **Stays well under Vercel's 250MB unzipped function limit** — the napi binary is ~2 MB.
- **No font loading cost** — our wordmark + app-icon glyphs are inline paths, so we set `font: { loadSystemFonts: false }` and skip the heaviest part of resvg's startup.

Sharp was the obvious first thought but pulls in libvips (~20 MB) for image processing we don't need, and historically has needed `vercel-cache: --platform=linux/x64` workarounds. Not worth the surface area for a four-glyph rasterizer.

resvg-wasm (the pure-WASM variant) would have removed the optionalDependencies dance but at the cost of being ~3× slower per render — measurable for the 1536×969 card-background slot.

## Files

- `src/lib/chrome/rasterize.ts` — thin `svgToPng(svg, { width, height, scale? })` wrapper. Returns `Uint8Array`.
- `src/routes/api/card/[variant]/[slot]/+server.ts` — accepts `?format=png&scale=N`.
- `src/routes/api/logo/[variant]/[preset]/+server.ts` — accepts `?format=png&scale=N`.
- `src/lib/mcp/tools/marketing.ts` — `marketing_get_card_art` and `marketing_get_logo` accept `format: 'svg' | 'png'`. PNG output is base64-encoded into a `pngBase64` field (MCP doesn't natively transport binary).
- `package.json` — `@resvg/resvg-js: ^2.6.2` added under `dependencies`.

## Install + verify recipe

```bash
cd /Users/zy/dev/dashbook
pnpm install                         # picks up @resvg/resvg-js + the linux-x64-gnu binary on Vercel build
pnpm dev                             # http://localhost:5173

# In another terminal — SVG (default):
curl -s 'http://localhost:5173/api/card/cobalt-current/preview' | head -c 80

# PNG (1× scale):
curl -sI 'http://localhost:5173/api/card/cobalt-current/preview?format=png' | grep -i content-type
# expect: Content-Type: image/png

# PNG (2× retina):
curl -s 'http://localhost:5173/api/card/cobalt-current/background?format=png&scale=2' -o /tmp/card-2x.png
file /tmp/card-2x.png
# expect: PNG image data, 3072 x 1938

# Logo PNG:
curl -s 'http://localhost:5173/api/logo/wordmark/jade?format=png&size=400' -o /tmp/wordmark.png
file /tmp/wordmark.png
# expect: PNG image data, 400 x 84
```

## MCP usage example

```typescript
// Claude / MCP client
const result = await client.callTool('marketing_get_logo', {
  variant: 'app',
  preset: 'jade',
  size: 256,
  format: 'png',
  scale: 2
});
// → { format: 'png', size: { width: 256, height: 256 }, scale: 2, pngBase64: 'iVBORw0KGgoAAA...' }

const pngBytes = Uint8Array.from(atob(result.pngBase64), c => c.charCodeAt(0));
```

## Vercel caveats

- The PNG endpoints set `prerender = false` already (they're dynamic by nature) — Vercel ships them as Node functions. Fluid Compute is default, so cold starts are not a concern.
- `Cache-Control: public, max-age=86400` is set on both endpoints. CloudFront / Vercel's edge cache PNG by full URL including query, so `?format=png&scale=2` caches as a distinct key from `?format=png` — desired.
- If we ever switch to `adapter-static` (we won't — the MCP endpoint forbids it), these routes would need to move to a serverless function explicitly. Today on `adapter-vercel` they Just Work.

## Known limits

- **Only `image/png` output.** No WebP/AVIF — would require sharp or libvips. Not worth it right now.
- **PNG is NOT MDES-uploadable.** The MC portal accepts SVG only. `marketing_get_card_art` makes this explicit in its `mdesUploadable` field when `format: 'png'` (always `false`).
- **No font rasterization.** All glyphs are inline `<path>` data, so this isn't a current limitation — but if we ever add an SVG that depends on `<text>` we'd need `font: { loadSystemFonts: true }` and a font asset. Document it then, not now.
