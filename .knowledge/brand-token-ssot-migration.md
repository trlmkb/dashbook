# Brand design-token single-source-of-truth — migration spec

Status: **draft for team sign-off. No code changes yet.**
Author aid: this pairs with [`brand-book-migration-analysis.md`](./brand-book-migration-analysis.md)
(the dashbook→core **app** move — deploy shape decided: adapter-node → Docker → ECR
→ Lambda → CloudFront, target `core/packages/brand/`). That analysis references a
`core/docs/superpowers/specs/2026-05-12-brand-source-of-truth-design.md` which **does
not exist** in core (the whole `docs/superpowers/specs/` path is absent). This
document fills that gap for the **token dimension** — the piece the app-move analysis
doesn't cover.

## 1. Goal

One token definition → **Figma variables + text styles · CSS custom properties ·
Tailwind theme · the `@dashfi/svelte` component lib · docs/MCP**. Edit once, propagate
everywhere. Kill the current multi-way drift.

## 2. Current state — the drift

The same brand colours are hand-maintained in **five** places, in three formats and
two Tailwind conventions:

| Representation | Where | Format / names | Consumed by |
| --- | --- | --- | --- |
| Token layer | dashbook `src/lib/generated/tokens.css` (now generated) | hex, `--dash-*` / `--*` / `--m-*` | dashbook CSS |
| Tailwind `@theme` | dashbook `src/lib/generated/theme.css` (now generated) | hex, `--color-*` (Tailwind **v4**) | dashbook utilities |
| Figma variables + text styles | Figma `91csAF1OGUmCZROdZlCRSv` | 0–1 colour + aliases | designers |
| Lib tokens | core `libs/svelte-components/lib/src/lib/styles/global.css` | **HSL triplets**, shadcn names (`--background`…), Tailwind **v3** preset | `@dashfi/svelte`, app.dash, Storybook |
| TS token map | dashbook `src/lib/tokens.ts` (hand-maintained) | TS objects | dashbook JSON API / MCP / foundations |

As of PR #13 the first three now regenerate from `tokens/dashbook.tokens.json`. The
**lib tokens** and the **TS map** do not — they're the remaining drift.

### Known divergences (must be decided, §4)
- `primary`: **ink `#25261d`** in `@theme` + the lib, but **black `#000`** in the token layer.
- `destructive`: **orange `#ff4000`** in `@theme` + the lib, but **black/white** in the token layer.
- Format: hex (dashbook) vs HSL triplet (lib).
- Names: `--bg`/`--fg` (dashbook) vs `--background`/`--foreground` (lib).
- Tailwind: v4 `@theme` (dashbook) vs v3 `preset + hsl(var())` (lib).
- Roles the lib has that the source doesn't: `success`, `warning`, `sidebar-*`, `card-surface-*`, `secondary`, `yellow`.

## 3. Target architecture

A small shared package — **`core/packages/brand/tokens`** — holds the DTCG source +
the zero-dep generator. The generator emits **per-consumer** artifacts so no consumer
has to change format or Tailwind version:

```
core/packages/brand/tokens/
  dashbook.tokens.json      ← the ONE source (DTCG, {light,dark}, {base.*} refs)
  build-tokens.mjs          ← generator (zero deps)
  dist/
    tokens.css   theme.css  ← hex, Tailwind v4     → dashbook / brand app
    lib.css                 ← HSL, shadcn names, v3 → @dashfi/svelte global.css
    tokens.ts               ← typed map            → docs / MCP / foundations
    figma-apply.gen.js       figma-text-styles.gen.js → Figma (paste into use_figma)
```

- **Lib** (`@dashfi/svelte`): its `global.css` `@import`s (or is generated from) `lib.css`.
- **Apps** (dashbook, future brand app): import `tokens.css` + `theme.css`.
- **Figma**: synced via the two appliers (no paid tooling; Variables REST API is Enterprise-only).
- Everything **workspace-linked** (`workspace:*`) once in core → one PR closes lib + consumers.

This is **decoupled from the full app move**: the token package can land and wire the
lib *before* dashbook itself relocates. That's the recommended first slice.

## 4. Decisions required (team-level)

1. **`primary` = ink or black?** Recommend **ink** — the lib and `@theme` already agree; the token-layer black is the outlier. Lets the lib + dashbook share one product-semantic set.
2. **`destructive` = orange or black?** Recommend **orange** (`#ff4000`) — same reasoning.
3. **Adopt the lib-only roles into the source?** (`success`, `warning`, `sidebar-*`, `card-surface-*`, `secondary`, `yellow`.) Recommend **yes** — otherwise they stay hand-maintained and drift returns.
4. **Keep both name sets** (`--bg` *and* `--background`) generated from one source, or unify? Recommend **keep both** initially (zero churn); unify later if desired.
5. **Source location:** `core/packages/brand/tokens` (recommend) vs keep in dashbook and publish `@dashfi/brand-tokens`. In-core is cleaner once the app move happens.

## 5. Phased plan (low-risk, incremental)

- **Phase 0 — dashbook-only, now, no core.** Point the JSON API / MCP / foundations at
  the generated `tokens.ts` (retire the hand-maintained `src/lib/tokens.ts` exports).
  Closes the last dashbook-internal gap; independent of everything below.
- **Phase 1 — extract `core/packages/brand/tokens`.** Move source + generator into core
  as an Nx project; emit all artifacts incl. the HSL `lib.css`. No app move, no lib change yet.
- **Phase 2 — wire the lib.** Point `libs/svelte-components/lib/src/lib/styles/global.css`
  at the generated HSL block; resolve divergences per decisions 1–3. `workspace:*`.
  Build + Storybook + **verify app.dash** before publish. (Can start as a *zero-value-change*
  reconcile — generate to the lib's current values — then flip the divergences deliberately.)
- **Phase 3 — dashbook consumes the shared package.** `workspace:*` (if in core) or the
  published token package (if still standalone).
- **Phase 4 — full dashbook → core app move.** Per `brand-book-migration-analysis.md`
  (adapter-node/Docker/ECR/Lambda/CloudFront). Tokens are already shared by now.
- **Figma** stays synced from the shared source at every phase (appliers).

Recommended near-term slice: **Phase 0 + 1 + 2** — gets the SSOT across core + lib + Figma
without the production-risky app relocation. Decisions 1–3 gate Phase 2.

## 6. Risks & mitigations

- **Publishing the lib touches live app.dash.** → Land Phase 2 as a zero-value-change
  reconcile first (match current lib values), verify Storybook + app.dash, *then* apply
  the divergence decisions as a separate, reviewed change.
- **Tailwind v3 (lib) vs v4 (dashbook).** → Generator emits both formats; no forced upgrade.
- **hex→HSL rounding drift.** → Pin the lib's existing HSL triplets in the source rather
  than recomputing, or accept ≤1% and verify visually.
- **Nx build/cache + workspace deps.** → Mirror `dashfi-ui` / `brand-book` conventions.
- **MCP/foundations output changes shape** when moving off `src/lib/tokens.ts`. → Keep the
  same export names/shape from the generated module; snapshot-test the JSON API.

## 7. Verification checklist (per phase)

- [ ] Change `base.dash-jade` → regenerate → diff appears in `tokens.css`, `theme.css`, `lib.css`, `tokens.ts`, and (after applier) Figma.
- [ ] Lib Storybook renders unchanged (Phase 2 zero-change reconcile) / per decisions (after flip).
- [ ] app.dash renders unchanged (or per decisions).
- [ ] dashbook renders unchanged; `pnpm build` + `pnpm check` clean.
- [ ] Figma reconcile reports only the expected diffs.
- [ ] JSON API `/api/foundations/color.json` shape unchanged (Phase 0).

## 8. Non-goals

- The app deploy / DNS / Lambda migration — owned by `brand-book-migration-analysis.md`.
- Figma library **publish** + **Code Connect activation** — plan-gated (needs Org/Enterprise; team is on Professional).
- Reconciling Tailwind v3→v4 in the lib — out of scope; the generator bridges both.
