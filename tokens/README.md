# Design tokens — single source of truth

`tokens/dashbook.tokens.json` is the **one place** Dashbook's design tokens are
defined. Everything else is generated from it. Edit the JSON, run `pnpm tokens`,
and the change propagates to CSS, TypeScript, and Figma.

```
tokens/dashbook.tokens.json   ← EDIT HERE (DTCG format, {light,dark} modes, {base.*} refs)
        │   pnpm tokens  (scripts/build-tokens.mjs, zero deps)
        ├─→ src/lib/generated/tokens.css        token layer (:root · html.dark · [data-marketing-dark])
        ├─→ src/lib/generated/theme.css         Tailwind @theme (--color-*) + dark override  ← both imported by app.css
        ├─→ src/lib/generated/tokens.ts         typed token map + typography (docs / MCP / TS)
        ├─→ tokens/figma.tokens.json            flat colour payload
        ├─→ tokens/figma-apply.gen.js           paste into use_figma → syncs Figma variables
        ├─→ tokens/figma-text-styles.gen.js     paste into use_figma → syncs the 8 text styles
        └─→ tokens/lib-tokens.reference.css     HSL reference for @dashfi/svelte (migration, see below)
```

## Edit a token

1. Change a value in `tokens/dashbook.tokens.json`.
   - Colours are hex or `rgba(...)`. Mode-varying tokens use `{ "light": …, "dark": … }`.
   - Reference a primitive with `{base.dash-jade}` — becomes `var(--dash-jade)` in CSS and a **variable alias** in Figma.
2. `pnpm tokens` — regenerates CSS + TS + Figma payload.
3. Commit. The portal and `@dashfi/svelte` pick up the CSS automatically (app.css imports the generated file).

## Sync Figma

Figma's Variables REST API is Enterprise-only, so the sync runs through the
Figma **plugin** (`use_figma`), no paid tooling. Two paste-and-run scripts:

1. `tokens/figma-apply.gen.js` → upserts **variables** across Base palette (`3:2`),
   Product semantic (`3:3` Light/Dark), Marketing (`3:4` Light/Dark). Refs become aliases.
2. `tokens/figma-text-styles.gen.js` → upserts the **8 text styles**.

Both are idempotent and report `unchanged / updated / created / missing`. Paste
into the `use_figma` tool against file `91csAF1OGUmCZROdZlCRSv`.

> First variable reconcile fixed 7 drifted values; text-style reconcile reported
> all 8 in sync. The generator keeps Figma honest to the source going forward.

## What is / isn't sourced here

**Single-sourced (edit here → regenerate):**
- **Token layer** — base palette, product semantic (light/dark), marketing roles +
  aliases (light/dark), radius, shadows, motion → `--dash-*` / `--*` / `--m-*`.
- **Tailwind `@theme`** (`--color-*`, light/dark) → `theme.css`, imported by app.css;
  Tailwind generates the `bg-*` / `text-*` utilities from it.
- **`tokens.ts`** — typed map incl. `tailwind` + `typography`.
- **Figma** — the 3 variable collections + the 8 text styles.

Variable/style **names are stable**, so component bindings survive regeneration.

> The `@theme` surface intentionally keeps `primary` = ink and `destructive` =
> orange, which differ from the product token layer (`--primary` #000, `--destructive`
> #000). Both are now sourced from this file; unifying the two is a deliberate design
> decision, not a mechanical merge — left as-is on purpose.

**Migration follow-up — `@dashfi/svelte` (core `packages/brand`):**
The lib's `libs/svelte-components/lib/src/lib/styles/global.css` defines its own
tokens as **HSL triplets** (shadcn names) with roles we don't have yet (`success`,
`warning`, `sidebar-*`, `card-surface-*`). `pnpm tokens` emits
`tokens/lib-tokens.reference.css` — the HSL block for the roles that derive from
Dashbook tokens (matching the lib's current values). Landing it is a **reviewed
core change**: (1) extend this source with the lib-only roles, (2) point the lib's
`global.css` at the generated HSL block, (3) build + publish the lib in core,
(4) verify app.dash. That's the `packages/brand` migration — not done here.
