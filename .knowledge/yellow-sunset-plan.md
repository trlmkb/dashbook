# Yellow accent sunset → cobalt — execution plan

**Date:** 2026-06-04 · **Status:** approved, not started · **Owner:** zygis

## Decision (locked)

Sunset the brand **yellow accent `#EBFF00`**; its highlight / attention-grab role is
replaced by **cobalt `#354CEF`** (the existing marketing data accent). **Hard remove** —
no deprecation period, because production adoption is ~zero. **Accent only** — the
selectable yellow *card-art* colour (`constants/card.ts`, sibling to blue/red/green) stays;
it is a different concept from the brand accent.

## Context

- `@dashfi/svelte` **0.5.0** (core #5116/#5062, dashbook PR #3 — both merged) *just* added a
  Badge `yellow` variant + `--yellow`/`--yellow-foreground` lib tokens + a Tailwind `yellow`
  colour. They have **zero dashfi-ui adoption**, so this plan removes them again — net churn,
  but harmless. The core PR for the removal should say so.
- The only place yellow is genuinely load-bearing is the **marketing `/meta-cashback` page**.

## Footprint (audited 2026-06-04)

| Layer | References | Risk |
|---|---|---|
| **Lib `@dashfi/svelte`** | `styles/global.css` `--yellow` + `--yellow-foreground` (light+dark); `design-system/tailwind/config.ts` `yellow` colour; `ui/badge/index.ts` `yellow` variant + JSDoc; `ui/badge/badge.stories.svelte` (3 examples) | **0 consumers in `packages/dashfi-ui/app/src`** → clean pull |
| **Dashbook** | `app.css` `--dash-yellow`/`--dash-yellow-glow`/`--m-yellow`; `lib/tokens.ts` `dash-yellow`/`dash-yellow-glow`/`m-yellow`; `specs/components/badge.ts` yellow variant; `chrome/AssetConfigurator.svelte` "yellow" accent option; MCP/doc copy in `mcp/tools/product.ts`, `mcp/tools/marketing.ts`, `specs/components/chrome.ts`; `chrome/card-sources.ts` `#EBFF00` stroke | docs + 1 configurator toggle |
| **Marketing (`www.dash.fi`)** | `styles/tokens.css` `--dash-hilite`; `styles/global.css` `--color-hilite`; **`styles/meta-cashback.css` ~30 uses of `--mc-hilite`/`--mc-hilite-glow`**; `content/copy/dash-ai-assets.ts` 4 prompt strings ("electric-yellow #ebff00 spark") | **the real work** |
| *Out of scope (kept)* | `constants/card.ts` yellow card-art colour | — |

## Phase 1 — Design system (low-risk; do first; lib → publish → dashbook loop)

**Core PR → `@dashfi/svelte` 0.6.0** (branch off `master`, build, publish, restore working branch)
- [ ] `styles/global.css`: delete `--yellow` + `--yellow-foreground` (both `:root` light and dark blocks)
- [ ] `design-system/tailwind/config.ts`: delete the `yellow` colour entry
- [ ] `ui/badge/index.ts`: delete the `yellow` variant + its JSDoc line — emphasis ladder becomes default → brand → **secondary (cobalt)** → outline (cobalt `secondary` absorbs the attention role)
- [ ] `ui/badge/badge.stories.svelte`: drop `yellow` from the variant options + the 3 usages (Yellow / LIMITED / PREVIEW) → re-point to `secondary`
- [ ] bump `0.5.0` → **`0.6.0`**, `pnpm nx run svelte-components:build`, `pnpm publish --access public --no-git-checks`
- [ ] **no app migration** — verified 0 brand-yellow refs in `dashfi-ui` (excluding numbered Tailwind palette)
- [ ] leave `constants/card.ts` yellow card colour untouched
- [ ] open core PR; note "removes the 0.5.0 yellow addition per brand decision to sunset"

**Dashbook PR** (companion, branch off `main`)
- [ ] `package.json`: dep `^0.5.0` → `^0.6.0`; `pnpm install`
- [ ] `specs/components/badge.ts`: remove the `yellow` variant entry, drop it from the `variant` props union + the example line + the emphasis-ladder prose (description/anatomy/porting); add a `v0.6.0` changelog row
- [ ] `lib/tokens.ts`: remove `dash-yellow`, `dash-yellow-glow` (baseColors), `m-yellow` (marketingColors)
- [ ] `app.css`: remove `--dash-yellow`, `--dash-yellow-glow`, `--m-yellow`
- [ ] `chrome/AssetConfigurator.svelte`: remove the `yellow` accent option (keep `parent`/`custom`; optionally add a cobalt preset)
- [ ] scrub "yellow = highlight only" copy in `mcp/tools/product.ts`, `mcp/tools/marketing.ts` (marketing palette → cobalt/periwinkle/mist/cream, drop yellow), `specs/components/chrome.ts`
- [ ] `chrome/card-sources.ts` `#EBFF00` stroke — judge in-flight (card-art high-contrast stroke; likely keep, or swap to cobalt)
- [ ] gate: `pnpm check` (0 errors) + `pnpm build`; add PLAN.md §9 row; open PR + preview

## Phase 2 — Marketing site (`www.dash.fi`) — the real work · **zygis is driving this**

- [ ] `styles/tokens.css` + `styles/global.css`: repoint `--dash-hilite` / `--color-hilite` → cobalt `#354CEF`; `--mc-hilite-glow` → cobalt alpha. `--mc-hilite` derives from `--dash-hilite`, so this recolours the page from one place.
- [ ] **GOTCHA (the actual work):** yellow used **ink** text on its fills; cobalt needs **white** text. In `meta-cashback.css`, every spot where `--mc-hilite` is a *background* (≈ a third of the ~30 uses), flip the on-colour text from ink → white. Screenshot-review the whole page.
- [ ] `content/copy/dash-ai-assets.ts`: update the 4 prompts — "electric-yellow #ebff00 spark" → cobalt (copy only; regenerating the actual images is a separate follow-up)
- [ ] dash.fi PR + preview; eyeball `/meta-cashback` in light + dark

## Phase 3 — verify

- [ ] grep all three repos for `#EBFF00` / `hilite` / brand-`yellow` (excluding the retained card-art yellow colour + the `card-sources.ts` stroke if kept) — confirm clean
- [ ] update brand knowledge docs (any "yellow accent / highlight" mention)

## Sequencing

- **3 PRs:** core (`@dashfi/svelte` 0.6.0) → dashbook (docs) → dash.fi (marketing).
- Phase 1 is clean and can go first/now; Phase 2 is independent (separate repo + tokens) and is the bigger lift.
- **Merge order:** core PR → dashbook PR (so master's version matches npm); marketing PR is independent.
