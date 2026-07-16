# Design tokens — portal token generator (mirror / generation input)

`tokens/dashbook.tokens.json` is a **normalized mirror + generation input**, not a
token authority. It generates the Dashbook **portal's** CSS token layer and a
Figma variable mirror. Edit the JSON, run `pnpm tokens`, and the change
propagates to the generated CSS and the Figma payload.

**Authority (operating-model §11.1, §5):**

- **Product token authority** is `@dashfi/svelte` (core). The audited product-token
  **data** that the JSON API / MCP / docs serve is `src/lib/tokens.ts`, guarded by
  `pnpm spec-audit`.
- **Marketing token authority** is the dash.fi website.
- The `product` group in this file is the **Dashbook portal chrome** (Dashbook-owned)
  and intentionally differs from the audited library values. Do not treat this file
  as the product/marketing source of truth. The core-owned token SSOT is a **future**
  direction — see [`../.knowledge/brand-token-ssot-migration.md`](../.knowledge/brand-token-ssot-migration.md).

```
tokens/dashbook.tokens.json   ← EDIT HERE (DTCG format, {light,dark} modes, {base.*} refs)
        │   pnpm tokens  (scripts/build-tokens.mjs, zero deps, deterministic)
        ├─→ src/lib/generated/tokens.css        portal token layer (:root · html.dark · [data-marketing-dark])
        ├─→ src/lib/generated/theme.css         portal Tailwind @theme (--color-*) + dark override  ← both imported by app.css
        ├─→ tokens/figma.tokens.json            flat colour payload
        ├─→ tokens/figma-apply.gen.js           paste into use_figma → syncs Figma variables
        ├─→ tokens/figma-text-styles.gen.js     paste into use_figma → syncs the 8 text styles
        └─→ tokens/lib-tokens.reference.css     HSL reference for @dashfi/svelte (migration, see below)
```

A typed TS map is deliberately **not** generated: the audited product-token data
source is `src/lib/tokens.ts`, and a second generated map would be an unaudited
parallel source (operating-model §11.2, §14).

## Edit a token

1. Change a value in `tokens/dashbook.tokens.json`.
   - Colours are hex or `rgba(...)`. Mode-varying tokens use `{ "light": …, "dark": … }`.
   - Reference a primitive with `{base.dash-jade}` — becomes `var(--dash-jade)` in CSS and a **variable alias** in Figma.
2. `pnpm tokens` — regenerates CSS + Figma payload.
3. Commit the regenerated files. The Dashbook **portal** picks up the CSS
   automatically (`app.css` imports the generated files). `@dashfi/svelte` ships its
   own theme and does **not** consume these files.

`pnpm tokens --check` (also run by `pnpm build`) regenerates to memory and fails
if any committed generated artifact is stale — so the JSON and the generated files
can't drift apart.

## Sync Figma

Figma's Variables REST API is Enterprise-only, so the sync runs through the
Figma **plugin** (`use_figma`), no paid tooling. Identifiers (file key, collection
IDs, mode IDs) live in [`figma.config.json`](./figma.config.json) — configuration,
not baked authority. Two paste-and-run scripts:

1. `tokens/figma-apply.gen.js` → syncs **variable values** across Base palette,
   Product semantic (Light/Dark), Marketing (Light/Dark). Refs become aliases.
2. `tokens/figma-text-styles.gen.js` → syncs the **8 text styles**.

Both are idempotent and report `unchanged / updated`. The variable sync updates
**existing** variables only — it does **not** create them; if any expected variable
is missing it **throws** (blocks) with the list, so a partial mirror is never
reported as success. Create the missing variables in the Figma file first, then
re-run. Paste into the `use_figma` tool against the file in `figma.config.json`.

> A prior variable reconcile fixed 7 drifted values; the text-style reconcile
> reported all 8 in sync. The generator keeps the Figma mirror honest to this file.

## What is / isn't generated here

**Generated from this file (a mirror — edit here → regenerate):**
- **Portal token layer** — base palette, product/portal-chrome semantic (light/dark),
  marketing roles + aliases (light/dark), radius, shadows, motion → `--dash-*` / `--*` / `--m-*`.
- **Portal Tailwind `@theme`** (`--color-*`, light/dark) → `theme.css`, imported by app.css;
  Tailwind generates the `bg-*` / `text-*` utilities from it.
- **Figma mirror** — the 3 variable collections + the 8 text styles.

Variable/style **names are stable**, so component bindings survive regeneration.

> The portal token layer and the `@theme` surface are kept in sync (both use
> `primary` = ink and `destructive` = orange). Both are the **portal's** chrome and
> differ from the audited `@dashfi/svelte` library values in `src/lib/tokens.ts` —
> the portal theme is Dashbook-owned (operating-model §5), not a library mismatch.

**Migration follow-up — `@dashfi/svelte` (core `packages/brand`):**
The lib's `libs/svelte-components/lib/src/lib/styles/global.css` defines its own
tokens as **HSL triplets** (shadcn names) with roles we don't have yet (`success`,
`warning`, `sidebar-*`, `card-surface-*`). `pnpm tokens` emits
`tokens/lib-tokens.reference.css` — an HSL **reference** for the roles that derive
from Dashbook tokens. Landing it is a **reviewed core change**: (1) extend the
source with the lib-only roles, (2) point the lib's `global.css` at the generated
HSL block, (3) build + publish the lib in core, (4) verify app.dash. That's the
`packages/brand` migration — not done here.
