# Brand design-token single-source-of-truth — migration spec

Status: **draft for team sign-off. No app-move code yet** (a small dashbook mirror
correction has already shipped — see §6).
Pairs with [`brand-book-migration-analysis.md`](./brand-book-migration-analysis.md)
(the dashbook→core **app** move — decided: adapter-node → Docker → ECR → Lambda →
CloudFront, target `core/packages/brand/`). That analysis covers hosting; this doc
covers **tokens**, which it didn't. (The `2026-05-12-brand-source-of-truth-design.md`
it references was never written — `core/docs/superpowers/specs/` doesn't exist.)

## 1. Authority model (the important part)

There are **two design systems, each owned by its own surface**:

| Design system | Source of truth | Format today |
| --- | --- | --- |
| **Product / app** | **`core`** — the `@dashfi/svelte` lib (`libs/svelte-components/lib/src/lib/styles/global.css`). What renders app.dash. | HSL triplets, shadcn role names, Tailwind v3 preset |
| **Marketing** | **the website** — the dash.fi Astro site. | `--m-*` roles / Tailwind v4 |

Everything else is **downstream / a mirror**, not a source:

- **Dashbook** = the brand book + docs + Figma handoff. It *mirrors* both systems and
  generates the Figma library. It must **not define token values** — where it has,
  it has drifted (see §6).
- **Figma** = a mirror too: product variables trace to core's product tokens,
  marketing variables to the website's.

The goal of this migration: make each source authoritative and have dashbook + Figma
**generate from upstream**, so a change to core (product) or the website (marketing)
propagates to CSS, the lib theme, docs, and Figma — with no hand-maintained copies.

## 2. Current drift

Same brand colours were hand-maintained in several places, in 3 formats / 2 Tailwind
conventions:

| Representation | Where | Role in the corrected model |
| --- | --- | --- |
| Lib tokens (HSL) | core `libs/svelte-components/lib/.../global.css` | **product source** ✅ |
| Marketing tokens | dash.fi website (Astro) | **marketing source** ✅ |
| dashbook token layer (`--dash-*`/`--*`/`--m-*`) | dashbook `src/lib/generated/tokens.css` (now generated) | **mirror** (was hand-authored; now generated) |
| dashbook `@theme` (`--color-*`) | dashbook `src/lib/generated/theme.css` (now generated) | **mirror** |
| Figma variables + text styles | Figma `91csAF1OGUmCZROdZlCRSv` | **mirror** |
| TS token map | dashbook `src/lib/tokens.ts` (hand-maintained) | **mirror** (JSON API/MCP still read it — Phase 0 gap) |

## 3. Target architecture

```
core: product token source ─┐                     website: marketing token source ─┐
  (formalized out of the     │                       (dash.fi Astro)                │
   lib's global.css into      │                                                     │
   packages/brand/tokens)     │                                                     │
        │ generate            │                                                     │ recipes / tokens
        ├─ HSL  → @dashfi/svelte global.css (the lib itself)                        │
        ├─ CSS/TS/Tailwind → product consumers                                      │
        └─ Figma payload → product variables                                        └─ Figma marketing variables + dashbook --m-* mirror
```

- **Product**: the source moves *up* into core (a `packages/brand/tokens` package, or
  the lib's own token module). The lib, dashbook, and Figma all consume its generated
  output. This is the "move to core" that matters for tokens.
- **Marketing**: the source stays in the **website**. Dashbook's `--m-*` and Figma's
  marketing variables mirror it. If marketing is to be single-sourced too, that work
  lives in the website repo — out of scope here.
- **Dashbook**: keeps the zero-dep generator (already built) but as a **mirror/Figma
  generator** fed from upstream — it stops being where product/marketing values are decided.

## 4. The generator (already exists, reusable)

`tokens/dashbook.tokens.json` + `scripts/build-tokens.mjs` (shipped in dashbook) already
emit CSS (token layer + `@theme`), HSL (`lib-tokens.reference.css`), TS, and two Figma
appliers. This is the engine; the migration is about **relocating the authoritative
inputs upstream** and pointing consumers at them — not rebuilding tooling.

## 5. Phased plan

- **Phase 0 — correct the dashbook mirror (partly done, §6).** Also: point dashbook's
  JSON API / MCP / foundations at the generated `tokens.ts` (retire hand-maintained
  `src/lib/tokens.ts`). Dashbook-only.
- **Phase 1 — product source into core.** Extract `core/packages/brand/tokens` from the
  lib's `global.css` (+ the zero-dep generator). The lib consumes its own generated HSL;
  add lib-only roles (`success`, `warning`, `sidebar-*`, `card-surface-*`). `workspace:*`.
  Land as a **zero-value-change reconcile** first (match current lib values), verify
  Storybook + app.dash, then publish.
- **Phase 2 — dashbook + Figma consume core.** Dashbook's product/`@theme` groups derive
  from core's generated output instead of being hand-authored; Figma product variables
  sync from the same. Marketing continues to mirror the website.
- **Phase 3 (optional) — single-source marketing in the website.** Own work in the
  website repo; dashbook + Figma keep mirroring.
- **Phase 4 — full dashbook→core app move** per `brand-book-migration-analysis.md`.

Recommended near-term: **Phase 0 + Phase 1** — establishes the product source in core
without the production-risky app relocation.

## 6. Corrections applied (not decisions) — 2026-07-01

The dashbook token layer diverged from core on two roles and was simply **wrong** (it
even contradicted the Figma handoff it claimed to mirror). Corrected to match core:

- `primary`: `#000000` (black) → **ink** (`{base.dash-ink}` / white in dark) — matches
  the lib + `@theme` + the handoff's default button.
- `destructive`: `#000000` (black) → **orange `#ff4000`** — matches the lib + `@theme` + handoff.

Applied in `tokens/dashbook.tokens.json`, regenerated, and synced to Figma (product
`primary` → alias to `dash/ink`, `destructive` → orange). Now dashbook mirror == core.

> **Note on naming:** `primary` here is the shadcn *action* role (the default button),
> **not** "the primary brand colour." Jade is the **brand** colour (`brand`/`ring`/`accent`
> roles) and is consistent everywhere — no drift, never in question.

**The one genuine open product question** (owned by core, not dashbook): should the
*default action button* be **jade** rather than the dark neutral? Today the system
deliberately keeps default = dark, brand = jade. Changing it is a core-side design call.

## 7. Risks & mitigations

- **Publishing the lib touches live app.dash** → land Phase 1 as a zero-value-change
  reconcile, verify Storybook + app.dash, then apply any intended changes separately.
- **Tailwind v3 (lib) vs v4 (dashbook)** → generator emits both formats; no forced upgrade.
- **hex→HSL rounding** → pin the lib's existing HSL triplets in the source rather than recomputing.
- **Nx build/cache + workspace deps** → mirror `dashfi-ui` / `brand-book` conventions.
- **JSON API/MCP output shape** when retiring `src/lib/tokens.ts` → keep export names/shape; snapshot-test.

## 8. Verification checklist (per phase)

- [ ] Change `base.dash-jade` upstream → regenerate → diff appears in every consumer (CSS, HSL, TS, Figma).
- [ ] Lib Storybook + app.dash render unchanged on a zero-value-change reconcile.
- [ ] dashbook `pnpm build` + `pnpm check` clean.
- [ ] Figma reconcile reports only expected diffs.
- [ ] JSON API `/api/foundations/color.json` shape unchanged (Phase 0).

## 9. Non-goals

- App deploy / DNS / Lambda migration — owned by `brand-book-migration-analysis.md`.
- Marketing single-sourcing internals — owned by the website repo.
- Figma library **publish** + **Code Connect** — plan-gated (needs Org/Enterprise; team is on Professional).
