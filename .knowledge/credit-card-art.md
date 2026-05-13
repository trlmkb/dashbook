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

## MDES card art spec (high-level)

MDES tokenized card art is **layered**, not a single flat image. Standard layers:

| Layer            | Purpose                                                                                        | Editable per BIN  |
| ---------------- | ---------------------------------------------------------------------------------------------- | ----------------- |
| Background       | Card surface — colour, gradient, pattern, photography                                          | Yes               |
| Foreground       | Logos, design accents, hologram-friendly artwork                                                | Yes               |
| Issuer logo slot | Mandatory MDES element — issuer mark or 1×1 pixel to hide it                                    | Yes (via pixel)   |
| Mastercard logo  | Mandatory Mastercard brand mark                                                                  | No (MC-controlled) |
| Network hologram | Required visual security element                                                                | No (MC-controlled) |
| Chip / contactless icon | EMV chip + NFC mark                                                                       | No (MC-controlled) |

Pull the exact MDES spec from the docs in the cardart-source folder once copied. Typically:

- **Dimensions**: usually 1536×969 (3:1.9 aspect) at 350 DPI for primary digital art; verify in the MC docs
- **Format**: PNG, sRGB, no transparency (background must be opaque)
- **Safe zones**: keep custom artwork out of corners where MC overlays the network mark + hologram

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

## What I need from you to build

These came from the original ask plus what I see in the source folder description:

1. **Variants we ship** — how many distinct card designs? "Operations card", "Payroll card", "Corporate card" — same art with different copy? Same brand colour with different surface treatments?
2. **The 6 BINs and what they're for** — is each BIN a separate visual variant, or are they all the same single design? Knowing this drives the preset list shape.
3. **The "current artifacts" thread** — could you share the link to the original thread that triggered this so I can pull any additional context the team has been discussing?
4. **MDES dimensions** — exact size + DPI the team is targeting. Once I can read `~/Downloads/cardart/<mdes-docs>` I'll pull this from there; until then please confirm.
5. **Back-face artwork** — do we have a back-face design too, or is this front-only?
6. **PAN + cardholder placeholders** — for the press / Dashbook preview, do we render last-4 as a placeholder like `•••• 4218`, omit entirely, or use a stylised "your number here" treatment?
7. **Issuer-logo decision per variant** — is the 1px hide pattern the default for every variant, or do some variants surface an actual issuer logo? If the latter, which one?
8. **Public on `/brand/card` or partner-gated?** — the configurator surface itself; the underlying generated PNGs probably need to be downloadable to partner marketing teams either way.

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
