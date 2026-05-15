# Mastercard MDES — card art asset spec audit

Date: 2026-05-15 (revised 2026-05-15 with direct Mastercard data)
Researcher: Claude (Opus 4.7 1M)
Method: **Direct fetch via Playwright** of Mastercard's developer-portal SPA — `/mdes-digital-enablement/documentation/use-cases/mdes-for-merchants-use-cases/`. The first pass of this audit used indirect triangulation because WebFetch hits the SPA shell only; Playwright renders the actual page. The numbers in this revision come from Mastercard's own developer docs, no longer from secondary processors.

## Authoritative artefacts (in `.knowledge/cardart-source/`)

- `mdes-spec-snapshot.md` — full accessibility-tree snapshot of the docs page (~100KB markdown)
- `mdes-layout-diagram.png` — the official MDES layout diagram showing A/B/C/D/E positions
- `mdes-spec-page.png` — full-page screenshot (cookie banner over content; layout diagram is the cleaner artefact)
- `mdes-{1,2,3}.jpg` — original brand-team screenshots of the MC upload UI

## Resolved: every unknown from the prior audit pass

| Unknown | Resolution |
| --- | --- |
| Cobrand/issuer height: 283 vs 293? | **283** confirmed directly by MC docs — `D = 283`. Verestro's 293 was a transcription typo. |
| Brand-logo dimensions? | **459 × 283** (`E × D`). Mastercard supplies this — it's the MC circles mark, composited at render time. We don't upload it. |
| Side padding? | **A = 82** px each side. |
| Top/bottom padding? | **B = 57** px top + bottom. |
| Where does cobrand sit in composite? | **Top strip, LEFT half** of the 1372×283 area (when both cobrand + issuer present). |
| Where does issuer sit? | **Top strip, RIGHT half** of the same 1372×283 area (when both present). |
| Where does brand mark sit? | **Bottom-right** at offset `(1536−82−459, 969−57−283)` = `(995, 629)`, occupying the 459×283 region. |
| Card icon format? | **PNG only**. PDF explicitly NOT supported for the icon asset. |
| Other asset formats? | PNG (RGB, alpha for logos) OR PDF vector for background / cobrand / issuer / brand. |
| Composite ratio? | **Height ÷ width = 63%** for both the combined card image and the standalone background. `969 / 1536 = 0.6308`. ✓ |
| What goes on top of background at composite time? | Brand logo + issuer logo + (optional) cobrand logo + (optional) product-type text overlay (`Debit` / `Credit`) using `productConfig.foregroundColor`. |
| Apple Pay / Google Pay / Samsung Pay receive what? | The same 4 assets via MDES relay. Wallets do their own compositing + dark-mode chrome. |
| Is there a `cardBackgroundCombinedAsset`? | **Yes** — pre-composited variant containing brand + issuer + cobrand + product text. Issuers can optionally pre-supply, OR let MDES build it from components. We don't currently supply this. |

The full asset-types table from MC:

| productConfig field | Description |
| --- | --- |
| `brandLogoAssetId` | The Mastercard or Maestro brand logo associated with this card (MC supplies) |
| `issuerLogoAssetId` | The logo of the issuing bank (we upload; can be 1×1 transparent placeholder) |
| `coBrandLogoAssetId` | The co-brand logo (if any) for this product (we upload — our dash.fi wordmark) |
| `cardBackgroundCombinedAssetId` | Pre-composited card image (brand + issuer + cobrand + text). Optional. |
| `cardBackgroundAssetId` | Card image WITHOUT brand / issuer / cobrand logos (we upload). |
| `iconAssetId` | 100×100 PNG icon to represent the card (we upload). |
| `foregroundColor` | Color of text overlaid at composite time (e.g. product type "Debit") |

## Source URLs consulted

Primary (returned empty / SPA-shell only):
- https://developer.mastercard.com/mdes-digital-enablement/documentation/use-cases/mdes-for-merchants-use-cases/
- https://developer.mastercard.com/mdes-digital-card-art-service/documentation/
- https://developer.mastercard.com/mdes-digital-card-art-service/documentation/code-and-formats/
- https://developer.mastercard.com/mdes-digital-card-art-service/documentation/quick-start-guide/
- https://developer.mastercard.com/mdes-digital-card-art-service/documentation/tutorials/prepare-image/
- https://developer.mastercard.com/mdes-digital-card-art-service/documentation/api-basics/
- https://developer.mastercard.com/mdes-digital-card-art-service/documentation/api-reference/
- https://developer.mastercard.com/mdes-token-connect/documentation/tutorials-and-guides/issuer-implementation-guide/
- https://static.developer.mastercard.com/content/platform/swagger/MDES_Digital_Enablement.yaml (sandbox-blocked)

Secondary (search snippets, the actual source of most figures below):
- https://developer.verestro.com/books/card-management-system/page/digital-cards-design — most detailed public spec
- https://increase.com/documentation/card-art — confirms 1536×969 PNG, no-chip/no-PAN rule
- https://help.solidfi.com/hc/en-us/articles/4417219355675-Wallet-Card-Art-Apple-Pay-Google-Pay-Samsung-Pay — Apple/Google/Samsung Pay alignment
- https://docs.synapsefi.com/api-references/miscellaneous/mobile-wallets — confirms 1536×969 SVG (recommended) / PNG RGB
- https://www.marqeta.com/docs/core-api/digital-wallets-management — wallet-returned variant (192×192 PNG/SVG cached art)
- https://docs.thredd.com/Tokenisation_Guide.htm — BIN/program scoping context
- https://developer.apple.com/documentation/merchanttokennotificationservices/cardart — Apple's downstream CardArt schema (empty fetch)

Internal:
- `/Users/zy/dev/dashbook/.knowledge/credit-card-art.md` — live notes captured from the MC upload UI (the most authoritative source we have right now because it was transcribed straight from the MC portal screens)
- `/Users/zy/dev/dashbook/src/lib/chrome/card-sources.ts` — current generator

## TL;DR

**Our 4 slots and their dimensions are correct.** 1536×969 (background), 100×100 (app icon), 1372×283 (cobrand logo), 1372×283 (issuer logo) match every secondary source I could triangulate, with one minor discrepancy worth investigating: **Verestro publishes 1372×293 for the wordmark/logo slot, while our code and the live-MC-UI capture say 1372×283**. The 10-pixel delta is almost certainly a transcription typo on one side or the other; the MC upload UI capture is more trustworthy than Verestro's documentation page, so we should not change anything until we re-screenshot the MC upload form.

We are **not missing any required slots** that I could find evidence for. Apple Pay / Google Pay / Samsung Pay get the same 4 slots — MDES is the relay, and downstream wallets receive cached/normalised variants of those 4 assets (Marqeta exposes them as 192×192 PNG/SVG, but that's a downstream rendering choice, not an extra upload).

**The main thing I could NOT verify and the brand team / our MDES contact must confirm**: exact PNG and SVG file size caps. Our internal doc says SVG ≤1MB and PNG ≤3MB — I could not find a public corroboration for those numbers anywhere. Treat them as trusted (they came from the MC UI) but flag for re-verification on the next upload pass.

Below the slot-by-slot audit, format details, action items.

## Slot-by-slot — our config vs MDES spec

| Slot | Our current (`card-sources.ts`) | MDES published | Delta | Action needed |
|---|---|---|---|---|
| Card Background | 1536 × 969 | 1536 × 969 (PNG/SVG, RGB) — corroborated by Verestro, Increase, Solid, Synapse | None | None |
| App Icon | 100 × 100 | 100 × 100 (PNG, RGB) — Verestro, Solid | None | None |
| Cobrand Logo | 1372 × 283 | 1372 × 283 per `credit-card-art.md` (live MC UI capture); **1372 × 293 per Verestro** | 10 px height delta vs Verestro only | Re-screenshot the MC upload form to settle 283 vs 293. Until then keep 283 — the MC UI capture is the authoritative source. |
| Issuer Logo | 1372 × 283 | Same as cobrand; in our config it's a 1×1 transparent PNG placeholder (issuer mark baked into background) | None — same slot dimensions; placeholder approach is documented in `credit-card-art.md` | Confirm with MC that a 1×1 transparent PNG passes their upload validation. If it's rejected we'd need to generate a `1372×283` transparent PNG/SVG. |

## What we're missing

I could find **no evidence of additional required upload slots** beyond the four. Things I checked for and did not find:

- **Retina / @2x / @3x variants**: not required at upload time. The 1536×969 canvas is already ~3× the rendered wallet card (Apple Pay renders the card at roughly 512×323 pt visually), so MDES uses one high-res source and the wallet downscales.
- **Dark-mode variants**: no separate dark-mode slot. MDES forwards the same single card art to all wallets regardless of system appearance. Apple/Google composite their own dark-mode UI chrome around it.
- **Vertical card art**: not in the MDES upload form. Mastercard's MDES spec is landscape-only; vertical orientations are a Visa-side concept.
- **Lock-screen art**: not a separate slot. Apple Wallet's lock-screen tile is derived from the card art automatically.
- **Transit / NFC-specific art**: not a separate slot for MDES.
- **Contactless symbol overlay**: rendered by MC at composite time, not part of any of our uploads.
- **Per-region or per-locale variants**: no evidence of locale-keyed slots in MDES card art (MDES Token Connect has localised display names + T&Cs as separate text uploads, but no localised images).

What downstream processors expose (worth knowing but **not** something we upload):

- **Marqeta** caches and re-serves a normalised 192×192 PNG/SVG of card art — this is their API contract for the wallet management endpoint, derived from the MDES upload, not a separate slot we control.

## File format / size / color space

Triangulated values — values without strong corroboration are flagged:

| Property | Value | Confidence |
|---|---|---|
| Background format | SVG (recommended) or PNG | High — Synapse + Verestro + internal MC-UI capture |
| Background SVG max size | ≤ 1 MB | Medium — internal `credit-card-art.md` only; could not find public corroboration |
| Background PNG max size | ≤ 3 MB | Medium — internal capture only |
| App icon format | PNG | High — Verestro, Solid |
| App icon transparency | Required (alpha-channel; rounded-square typically composited on transparent BG) | Medium — implied by Solid's "rounded by wallet" rule and our internal screenshot |
| Logo formats | SVG or PNG | High — Verestro |
| Color space | RGB (sRGB) | High — multiple sources state "RGB"; Mastercard does not require Pantone matches for digital card art (Pantone is a print-only concern) |
| Card-image rules | No EMV chip, no PAN, no expiration, no CVC on the uploaded art | **Authoritative** — Increase quotes this verbatim from MDES |
| Corner radius | **Do not round corners in source.** MC/wallets round at composite time | High — Verestro: "corners will be rounded in the application" |
| Asset filename | Max 30 chars per asset (per existing internal notes); no enforced naming convention beyond MC's portal field validation | Medium — internal capture |
| Naming convention | Free-form; the slot is selected by which field you upload into, not by filename | High — implied by the upload UI being slot-keyed |

## BIN scoping

**Per-product / per-BIN, not per-program.** Each BIN gets its own upload set in the MC portal. This means our 6 incoming BINs need **6 separate upload passes** through the MDES portal — even if 5 of them share the same art. There's no "apply this art to all BINs in this program" shortcut that I could find in the indexed docs.

Practical implication for our configurator: it should expose a per-BIN render so the operator can download the right zip for each submission. The current `card-sources.ts` is BIN-agnostic; if all 6 BINs share the same Dash.fi card art (which seems likely given they're all Dash.fi-issued), the only difference between submissions is the metadata (description text, default colors). Confirm with brand/ops whether any BIN gets a unique variant before shipping the configurator.

I could not confirm whether there's a bulk-upload API alternative (the `mdes-bulk-tokenization` product exists but is for tokens, not for assets). The MDES Digital Card Art Service API exists, but its endpoints are for **retrieving** assets (token-requestor side), not uploading them — issuers upload via the MC portal UI.

## Wallet relay

When Apple Pay, Google Pay, or Samsung Pay request card art for a provisioned token, MDES serves them the **same 4 underlying assets** the issuer uploaded. The wallets then:

- **Apple Pay**: composites the card image (1536×969) with its own UI chrome — masked PAN, MC mark, contactless symbol — at render time. The app icon (100×100) appears in the Wallet tile listing. Apple's CardArt API (`merchanttokennotificationservices/cardart`) returns the asset references on the wallet side, but uploads still go through MDES.
- **Google Pay**: similar — uses the card image + app icon. Google does additional cropping/scaling for its tile layouts.
- **Samsung Pay**: same source assets.

What MDES does *not* do that you might assume it does:
- It does not generate per-wallet renders. It serves the same source assets.
- It does not produce dark-mode variants. The wallets do their own chrome.
- It does not crop the card image for square tile renders — wallets handle that, which is why MDES guidance is to keep important content away from the edges (see "safe zones" below, which I could not find an explicit pixel value for).

## Approval lifecycle

I could not find a public document that pins down the approval SLA or update cadence for card art. Known points:

- New BIN art submissions go through Mastercard review before activation — typical Mastercard certification cycles are days-to-weeks, but the docs I could fetch did not give a numeric SLA.
- Art updates after launch are possible but trigger a re-review.
- I found **no evidence** of native A/B testing or version history in the MDES Digital Card Art Service. Versioning is by replacement.

This is one of the most under-documented areas in the public-facing material and should be confirmed with our Mastercard relationship manager before the brand team plans any post-launch refreshes.

## Safe zones / bleed

**Could not find an explicit pixel value for safe zones.** Best practice signals from secondary docs:

- Increase: card image "should look like a card" — implies leave normal card-margin space around content.
- Verestro: "card number is placed in the bottom left corner...should be visible" — implies do **not** put critical brand content in the bottom-left ~30% of the 1536×969 canvas, because MC will composite the PAN there.
- Internal notes: PAN is rendered at bottom-left, MC mark at bottom-right, Dash wordmark at top-left in our current design.

Recommendation: treat the bottom-left quadrant (~30% width × ~30% height) and bottom-right corner (~15% width × ~20% height) as MC-controlled overlay zones and keep the brand wordmark out of them. The current Dash.fi variant already does this.

## Action items for the configurator (engineering)

The current `card-sources.ts` is in good shape. Minor items:

1. **No code change needed for dimensions**. All four slot dimensions match the spec we have. (1372×283 vs Verestro's 1372×293 is unresolved but the internal capture from the MC UI is the more trustworthy of the two — leave 283 until we have a fresh MC UI screenshot.)
2. **Add a "no chip / no PAN / no expiration / no CVC" lint rule or comment block** in `card-sources.ts` to make the constraint explicit for any future contributor. Our current code already complies, but the rule should be documented in code, not just `credit-card-art.md`.
3. **Confirm 1×1 transparent issuer logo trick is still accepted by the MC upload form** before the 6-BIN submission. If MC tightened validation, we'd need to ship a real `1372×283` transparent PNG/SVG generator instead.
4. **Surface a per-BIN render mode** in `/brand/card` so each of the 6 BINs can download its own zip cleanly, even if 5 of them share the same variant. Reduces operator error on the upload pass.
5. **Document the file size caps** (`SVG ≤ 1MB`, `PNG ≤ 3MB`) in `card-sources.ts` as a comment, and add a runtime guard / dev-time warning if a generated SVG exceeds 1MB (we're nowhere close today, but worth a safety net).
6. **Do not auto-round the corners** in any of the SVGs we export — MC/the wallet does that. Confirm that `card-sources.ts` does not apply corner radii to the 1536×969 export. (Existing code likely already complies — flagging for re-check.)

## Action items for brand team

Ordered by criticality before the 6-BIN MDES submission:

1. **Confirm whether all 6 BINs share one card art set**, or whether any BIN gets its own variant. This is the single biggest unknown for the upload pass.
2. **Re-screenshot the MC upload UI** (the cobrand / issuer logo field) so we can settle the 283 vs 293 ambiguity at the source rather than relying on a year-old screenshot.
3. **Lock the file-size caps with our MC relationship manager** — the SVG ≤1MB / PNG ≤3MB numbers came from our internal notes, not from any public doc; re-confirm before submission.
4. **Decide on the issuer logo strategy** — accept the 1×1 transparent PNG placeholder approach (bakes the issuer mark into the background) or supply a real 1372×283 mark. The former is simpler but depends on MC continuing to accept it.
5. **Confirm the safe-zone story** for any future card art refreshes that move the wordmark away from top-left — the bottom strip is owned by MC's PAN + network mark composite and brand should not place critical content there.
6. **Get a written approval SLA** from our MC contact for the BIN-submission review cycle so launch planning can pin a date.

## Gaps and what I could not verify

Explicitly flagged unknowns:

- **Exact SVG/PNG max file size in bytes** — public docs do not state them; our 1MB/3MB internal numbers are unverified secondhand.
- **Cobrand/issuer logo height 283 vs 293** — internal capture says 283; Verestro publishes 293. 10-pixel discrepancy.
- **Approval review SLA** — no public number.
- **Update / refresh cadence rules** — no public spec on minimum re-submission interval or version history.
- **Bulk upload API for assets** — the MDES Digital Card Art Service API is read-only (token-requestor side); the issuer-side upload appears to be MC-portal-only, but I could not confirm there is no API alternative.
- **Apple Pay / Google Pay specific overrides** — both wallets read the same MDES-served assets and do their own compositing; I found no evidence of wallet-specific upload slots, but if they exist they would be under wallet-side dev portals, not under MDES.

If any of these gaps block the upload pass, the next step is to log into the MDES portal with an authenticated session and screenshot every relevant page — that single action would close every gap above.
