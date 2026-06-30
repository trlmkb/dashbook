---
description: Fetch a marketing asset — Dash.fi logo, credit card art, or marketing palette. Returns URLs, SVG source, and available variants/presets. Use when embedding the wordmark, downloading card art, or pulling palette hexes.
argument-hint: <kind> [variant] [preset]
---

Parse `$ARGUMENTS` to identify the asset kind and variant.

- **`logo`**: call `marketing_get_logo` with `{ variant: ..., preset: ... }`.
  - If no variant: first call `marketing_list_logo_presets`, present the presets (jade / cobalt / ink / cream / white-on-ink / etc.), and ask the user which one.
  - Variants: `wordmark`, `mark`, `lockup`.
- **`card`**: call `marketing_get_card_art` with `{ variant: ..., slot: ... }`.
  - If no variant: call `marketing_list_card_variants` and ask which one.
  - Slots: `background`, `logo`, `icon`, `preview` (composite).
- **`palette`**: call `marketing_get_marketing_palette` with no args.

Format the response as:

1. **Asset name + variant** — e.g. "Wordmark · jade preset · SVG"
2. **URLs** — SVG, PNG (if rasterized). Both light + dark variants if applicable.
3. **Inline preview** — for logos/cards, render the SVG inline so the user sees the asset.
4. **Usage rules** — sizing, surfaces, restrictions. For card art, MDES upload constraints (1536×969 canvas, brand-mark slot, etc.).
5. **Bundle alternative** — if a full ZIP exists at `/brand/card` or `/brand/logo`, mention it.

For palette: render each color as a swatch with hex + CSS variable name + role.
