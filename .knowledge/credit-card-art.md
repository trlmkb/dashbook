# Credit card art configurator — design + build notes

Status: **planning** (PLAN.md §9 Pending row, 2026-05-14)

## Why now

Two threads merging:

1. **Card design refresh** — brand team has new redesigns "on the way in multiple places."
2. **6 new BINs being submitted for tokenization** — Mastercard MDES (Mastercard Digital Enablement Service) drives Apple Pay / Google Pay / Samsung Pay card art for tokenized cards. Each BIN submission needs MDES-compliant assets.

Aligning the refresh with the MDES submission is the natural moment to ship a configurator + a tooled-up press asset surface.

## Source artifacts the brand team is providing

(Live in `.knowledge/cardart-source/` once copied from `~/Downloads/cardart` — sandbox blocks reading `~/Downloads` directly.)

- **background** — card surface art (probably gradient / pattern / solid; the layer behind everything else)
- **icon** — Dash.fi mark used on the card (likely the `d` glyph from the app icon)
- **logo** — Dash.fi wordmark for the card face
- **single-pixel** — 1×1 transparent PNG used to satisfy the MDES "issuer logo" slot when the design bakes the issuer mark into the background instead of using the template's dedicated slot. Clever workaround; document this pattern explicitly so it doesn't surprise anyone.

Mastercard MDES requirements folder also provided — referenced below.

## MDES card art spec (confirmed from MC upload UI)

MDES tokenized card art is **four separately uploaded assets**, not a single flat image. Each upload form specifies the required dimensions:

| Slot                   | Dimensions     | Format                       | Purpose                                                                                                                                  | Editable per BIN  |
| ---------------------- | -------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **Card Background**    | **1536 × 969** | SVG (≤1MB) or PNG (≤3MB), RGB | Card surface — gradient, photography, pattern. The visual you see in Apple Pay / Google Pay / Samsung Pay.                                | Yes               |
| **App Icon**           | **100 × 100**  | PNG, RGB                      | Wallet app tile (small icon next to the card in the wallet listing).                                                                      | Yes               |
| **Cobrand Logo**       | **1372 × 283** | SVG (≤1MB) or PNG (≤3MB), RGB | Dash.fi wordmark placed in the MC-controlled cobrand slot on the rendered card.                                                           | Yes               |
| **Issuer Logo**        | **1372 × 283** | SVG (≤1MB) or PNG (≤3MB), RGB | Issuing bank's logo. If we bake the issuer mark into the background instead (or want it hidden), upload a 1×1 transparent PNG here.        | Yes (via pixel)   |

Plus per-card metadata fields:

- **Asset name** — must be ≤30 characters per upload.
- **Default colours** — these are configured separately in MC's UI:
  - Card Background Color: `#2C3FB2`
  - PAN Color: `#FFFFFF`
  - Card Description Color: `#EBEDE4`

**Rendered by Mastercard (not us)**:
- The masked PAN (`•••• 1234`)
- The Mastercard network mark (red + amber circles)
- Hologram, EMV chip, NFC indicator (where applicable)

We only own the four asset uploads above. MC composites everything on top of our Card Background at render time using the configured colour fields.

## Current visual (from `mdes-3.jpg`)

The existing card design that's already submitted to MC:

- Card Background: deep cobalt `#2C3FB2` with a radial highlight (lighter purple-blue glow, upper-left to lower-right diagonal).
- Wordmark: `dash.fi` in PP Supply Mono Ultralight, white `#FFFFFF`, anchored top-left of the card.
- PAN placeholder: `•••• 1234` in PP Supply Mono Regular, white, bottom-left (rendered by MC).
- MC logo: bottom-right, MC-controlled.
- Card corner radius: ~32–40px on the 1536×969 canvas (~2.5% of width).
- App icon: rounded-square cobalt tile (rx ≈ 12%), centred white lowercase `d` in PP Supply Mono.

This is the **current** design. The brand team has stated new redesigns are inbound — we'll need to plug those in as additional variants once delivered.

## What the configurator needs to do

### Phase 1 — content surface

`/brand/card` page mirroring the `/brand/logo` pattern (`InnerPage` + `AssetConfigurator` + `DoDontGrid`). For each variant:

- Preview the front face composited from background + icon + logo + (optional) issuer-pixel
- Optional back-face preview (the Dash.fi card has a back; MDES doesn't require it but it's nice to ship)
- Download buttons: full-res PNG at MDES-spec dimensions, plus a "press SVG" optimised for editorial use
- Per-variant metadata block: BIN range (if disclosed), product name (Operations? Payroll? Corporate?), launch date if applicable

### Phase 2 — MCP integration

Mirror `marketing_get_logo`:

```
marketing_get_card_art({ variant, preset, format })
  → { url, inlinePng (data: URL), inlineSvg, preset, dimensions }

marketing_list_card_presets()
  → [{ id, label, surface, bin? }, ...]
```

API endpoint: `/api/card/<variant>/<preset>` serving the composited PNG with `Content-Type: image/png`. SVG variant at `/api/card/<variant>/<preset>.svg` if we generate vector.

### Phase 3 — generator pattern

Two viable rendering paths; pick one:

- **A. Layered PNG composition** — backend assembles the final PNG from layered PNG sources via `sharp` / canvas. Pros: pixel-perfect match to MDES. Cons: needs server-side image lib in a Vercel function; bumps function cold-start.
- **B. SVG with embedded raster layers** — single SVG file with `<image>` tags wrapping each base64-encoded layer. Pros: same tooling chain as `logo-sources.ts`; client-side rasterization to PNG. Cons: more bytes; less crisp at giant sizes.

**Recommend A** for the MDES-targeted PNG download path. SVG version is for press / marketing.

## Build approach (proposed)

Spec is locked. Path forward — build the **plumbing now** with the current cobalt as variant 1, then plug new designs in as they arrive.

### Composition strategy — SVG-first

Generate the four MDES assets from a single Svelte component (`<CardArt>`) with prop-driven variants. Same pattern as `logo-sources.ts` / `marketing_get_logo`. Three render paths from the same source-of-truth component:

1. **Live preview** in `/brand/card` — Svelte component rendered inline.
2. **SVG export** — server returns the SVG string for upload to MC.
3. **PNG export** — server rasterises via `sharp` (Vercel function) at exact MDES dimensions (1536×969, 100×100, 1372×283).

Why SVG-first: re-colouring + variant generation stays editable. PNG rasterisation is a one-line transform at the edge.

### Page — `/brand/card`

Mirrors `/brand/logo`:

- Variant grid showing each design (live `<CardArt variant="..." />` rendered).
- Per-variant download buttons for each of the four MDES slots:
  - `card-background-<variant>.svg` + `.png`
  - `app-icon-<variant>.png` (100×100)
  - `cobrand-logo-<variant>.svg` + `.png` (1372×283)
  - `issuer-logo-<variant>.svg` + `.png` (1372×283) — defaults to the 1×1 transparent PNG trick; brand can override per variant
- "Submission checklist" panel: lists what each slot is for, MDES dimensions, asset name length limit (30 chars), so the person uploading to MC knows exactly what they're pasting where.
- Do / Don't grid (mirrors `/brand/logo`).

### MCP integration

Mirror `marketing_get_logo`:

```
marketing_get_card_art({ variant, slot, format })
  // variant: 'cobalt-current' | <future-variant-ids>
  // slot:    'background' | 'app-icon' | 'cobrand-logo' | 'issuer-logo'
  // format:  'svg' | 'png'
  → { url, inline, dimensions, variant, slot }

marketing_list_card_variants()
  → [{ id, label, status: 'production' | 'draft', usedForBins: [...] }, ...]
```

API endpoints (mirror `/api/logo/<variant>/<preset>`):

- `GET /api/card/<variant>/background.svg` (or `.png`) → 1536×969
- `GET /api/card/<variant>/app-icon.png` → 100×100
- `GET /api/card/<variant>/cobrand-logo.svg` (or `.png`) → 1372×283
- `GET /api/card/<variant>/issuer-logo.svg` (or `.png`) → 1372×283

All with `Cache-Control` for the 24h CDN cache, `Content-Type` set per format, CORS open.

### Variant 1 — `cobalt-current` (what's currently on file with MC)

Re-creates the existing design from `mdes-3.jpg`:

- Card Background: cobalt `#2C3FB2` with a radial highlight gradient (existing visual).
- Cobrand: Dash.fi wordmark, white `#FFFFFF`, anchored top-left of the 1536×969 canvas, ~30% width.
- App icon: cobalt rounded-square tile (rx ≈ 12%), white `d` glyph centred.
- Issuer logo: 1×1 transparent PNG (issuer mark baked into the background, hidden via MDES's documented pixel trick).

This becomes the **fallback** variant — if MC submission of a new variant doesn't go through in time, the existing approved card art still works.

### Future variants

Once the brand team delivers the redesign:

- Add a new file `src/lib/specs/marketing/card-variants/<variant-id>.ts` per variant.
- Variants can re-use `<CardArt>` components or override with bespoke SVG.
- Add the variant to `marketing_list_card_variants` and the configurator surface.

The 6 new BINs you mentioned: are these all going to share **one** new design, or do they need distinct art per BIN (six separate variants)? Knowing this drives the variant-list shape.

## Open questions (now narrower)

The MDES spec answered most of the original questions. Still need from brand:

1. **The 6 BINs vs variant count** — one design × six BINs, or six distinct designs?
2. **New design assets** — once the brand team's redesign drops, where do I find the source? Figma URL or SVG?
3. **`/brand/card` public, gated, or behind `/press`?** — the configurator surface itself.
4. **Cobrand logo content** — is the wordmark the canonical thing to place in the cobrand slot, or does MC require something specific (e.g. just the `d` glyph)?
5. **Issuer logo policy** — is the 1×1 pixel pattern fine for every variant, or do certain BINs require actual issuing-bank logos? (Probably partner-bank-dependent.)

## Distribution

Once built, the card art flows through:

- `/brand/card` — human-facing configurator (designers, partner marketing, sales).
- `marketing_get_card_art` / `marketing_list_card_presets` — programmatic via the Dashbook MCP, same way `marketing_get_logo` works today.
- MDES submission packet — a CI step that generates the 6 BIN-specific PNGs at MDES dimensions and bundles them for the Mastercard portal upload.

## Open questions for me to resolve via the source folder

Once `~/Downloads/cardart` is copied in:

- What PNG dimensions are in the MDES requirements doc? Confirm vs my assumption (1536×969 @ 350 DPI).
- Is there a Photoshop / Figma source file for the layered art, or are we starting from PNG layers + assembling?
- Are there alternative colourways already drafted, or is this currently a single design and Dashbook is generating the variants by re-colouring the background layer?
- Does Mastercard provide a foreground "overlay" PNG that must sit on top of every BIN's custom art? (Some networks do; if so we need to composite it in too.)
