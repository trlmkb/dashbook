# /shipping flagship — source-grounded pattern analysis

**Date:** 2026-06-04 · **Branch:** `claude/friendly-cray-li0ZE` · **Scope:** the flagship
`/shipping` (index = "AI Shipping Audit") page only — its 11 `Ship*` components + the
`--ship-*` token layer + the patterns it demonstrates. Sister pages (`/shipping/audit`,
`/analytics`, `/contracts`) are out of scope (they exercise the shared `slide/`·`rhythm/`·
`sections/` libraries — deferred to a follow-on pass; see §7).

**Method:** read the real source in `trlmkb/dashfi` (checked out locally at
`/Users/zy/dev/dash/www.dash.fi`, `main`) — all 11 components + `shipping-audit.css` (1648
lines) + `tokens.css` + the squircle override in `global.css` — and screenshotted the live
dev render (`astro dev`, 5 captures: card hero, audit hero, feature-tabs, product shots,
dark band). This replaces the *brief-only* basis the specs were originally built from.

> **Why this matters:** the previous session built the library from the uploaded brief
> because the source was unreachable. Reading the source corrected several things the brief
> got subtly wrong (accent hue, button mechanism, chip variants, the real amber). Those
> corrections are in §5–6.

---

## 1. Page composition (`src/pages/shipping/index.astro`)

A single full-bleed scroll, 11 sections, alternating paper/cream surfaces with one dark band:

| # | Section (component) | Island? | Patterns it demonstrates |
|---|---|---|---|
| 1 | `ShipCardHero` | no (scroll script) | full-screen card hero · rebuilt card + orbiting carrier bubbles · dot-chips · squircle CTAs · display headline |
| 2 | `ShipTrustBar` | `client:visible` | count-up (IO-triggered) · stat pillars · live-widget |
| 3 | `ShipHero` + `ShipForensicWidget` | widget `client:visible` | email-capture hero · **live-widget** (terminal chrome, LIVE badge, data-tone matrix) |
| 4 | `ShipPillars` | `client:visible` | **feature-tabs** (auto-rotate/lock/pause, deep-link) · **duotone icons** · live feed |
| 5 | `ShipEvidenceGrid` (+ `ShipProductShots`) | no | card grid (timeline/rate-bars/vectors) · **product-shot scale-to-fit** · alternating rows |
| 6 | `ShipCalculator` | `client:visible` | **live-widget** (slider→derived figures) · data-tone rows · chips |
| 7 | `ShipComparison` | no | comparison table · native horizontal-scroll wrapper · highlighted column |
| 8 | `ShipHowItWorks` | no | **step-timeline** · Reveal stagger · full-bleed asymmetric grid |
| 9 | `ShipFintechAdvantage` | no | **dark band** (`data-ship-dark`) · ghost-number cards |
| 10 | `ShipFinalCta` | no | centered CTA closer · dual squircle buttons · check-list proof |

---

## 2. Token foundation — the canonical `--ship-*` layer

`src/styles/shipping-audit.css` is the per-surface semantic layer the dashbook `--m-*` role
set was generalized from. ~16 roles, each referencing a `--dash-*` primitive, re-themed in
ONE place. **Real values (verified against source):**

| Role | Light | Dark |
|---|---|---|
| surface / surface-2 / card | `#FAF9F5` / `#EBEDE4` / `#FFFFFF` | `#14181C` / `#181E1D` / `rgba(234,230,219,.04)` |
| fg / fg-strong / fg-muted / fg-subtle | jade-deep / ink / graphite / graphite-soft | paper / white / `.62` / `.42` |
| border / border-strong | `rgba(37,38,29,.10)` / `.16` | `rgba(234,230,219,.12)` / `.20` |
| **accent** (+deep/soft/border) | **jade `#2B605C`** / `#123B39` / `.08` / `.28` | **lifted `#5BB8B0`** / `#2B605C` / `.14` / `.34` |
| positive (money) | jade `#2B605C` | lifted `#5BB8B0` |
| **warn (caution = amber)** | **`#B86400`** soft `rgba(184,100,0,.09)` border `.28` | **`#D99A3C`** soft `rgba(217,154,60,.12)` |
| negative (violations) | ink `#25261D` (monochrome, never red) | ink-soft |
| violet (decorative) | `#6D4BD1` | — |

**Three headline findings the brief got wrong / left open:**

1. **Real caution/amber = `#B86400` (light) / `#D99A3C` (dark)** — not the invented
   `#B5751A`/`#E0A64D`. Corroborated twice: `--ship-warn` *and* product `tokens.css :root`
   `--warning: #B86400`. → token fix in §4.
2. **`--ship-accent` resolves to JADE, not cobalt.** The CSS header comment claims a
   "first-pass mapping: accent → cobalt #354CEF", but the shipped value is
   `var(--dash-jade, #2b605c)`, lifting to `#5BB8B0` on dark. The dashbook `--m-accent`
   (jade) is therefore **already correct** for shipping. (Cobalt remains the *other*
   marketing surfaces' data accent per the brief — verify in the cross-page pass.)
3. **Dark variant attribute is `[data-ship-dark]`** (per-subtree, decoupled from product
   `html.dark`) — the dashbook renamed this to `[data-marketing-dark]`; same mechanism,
   intentional rename. Live proof: `ShipFintechAdvantage` carries `data-ship-dark` and flips
   surfaces→ink, text→paper, accent→lifted (screenshot 5).

**`data-tone` convention is real and pervasive** — `data-tone="accent|positive|warn|
negative"` (+ a `neutral`) on dots, bars, rows, cells, markers, chips. One element styles
4–5 ways with no extra class. Confirmed in `ShipCalculator`, `ShipPillars`, `ShipEvidenceGrid`,
`ShipHowItWorks`.

---

## 3. Pattern inventory (grounded)

**Squircle button** — every shipping CTA renders as **`border-radius: 6px; corner-shape:
squircle`**, but NOT from its own scoped CSS. Each component declares `4px` (card hero) or
`999px` (all others); a **global override** in `global.css:3308` force-sets the canonical
shape on the whole CTA list (`.ship-cardhero-primary`, `.ship-hero-submit`,
`.ship-finalcta-*`, `.ship-fintech-cta`, `.ship-calc-submit`, `.mc-btn-*`) with
`border-radius:6px !important; corner-shape:squircle`. The product `primitives/Button.astro`
self-applies the same (`rounded-[6px] [corner-shape:squircle]`). No shadow; `:active` →
`transform: scale(0.98)` (brief said `.97`). *Reading the component alone gives the wrong
answer — the squircle is a global concern.*

**Chip — two variants** (brief documented one):
- *dot-chip* — `border-radius:999px`, 1px border, soft-tinted bg, mono ~12px uppercase,
  **leading dot** (`.ship-cardhero-points`, `.ship-calc-chip` with `data-tone`).
- *check-chip* — same pill, **leading circle-check icon** in jade = "included"
  (`.ship-shotrow-chip`, screenshot 4). This is the brief's "leading check reads as included".

**Duotone icon** (`ShipPillars` `MODULE_ICONS`, screenshot 3) — filled silhouette at
`opacity="0.18"` + stroked detail, both `currentColor`, with a per-item hue set inline:
late-shipment `#c2410c` (orange), parcel-audit `#2b605c` (jade), analytics `#6d4bd1`
(violet), contracts `#1d6fb8` (blue). The only sanctioned multi-color.

**Feature-tabs** (`ShipPillars`, screenshot 3) — pill tabs; active tab's `.ship-pil-tab-prog`
fills L→R as a progress bar. **Invariant holds:** CSS `animation: ship-tab-fill 5s` ===
JS `setTimeout(…, 5000)`. Three modes via `data-mode`: `auto` (rotate), `locked` (click →
fill to 100%, stop), `paused` (out of view, IntersectionObserver). Deep-linkable via
`window.__shipPillarTab` + a `ship-pillar-tab` CustomEvent (the card-hero sublinks dispatch
it). Reduced-motion → `animation:none; scaleX(1)`.

**Live widget** — four on this page (`ShipForensicWidget`, `ShipCalculator`, `ShipPillars`
feeds, `ShipTrustBar` count-up). All are React islands that **derive every displayed figure
from state** (calculator: `spend * rate`; trustbar: rAF cubic count-up to target), styled
entirely off `--ship-*` so they re-theme with the surface, with a reduced-motion branch that
jumps to final state. Forensic widget: terminal chrome (3 traffic dots + title + pulsing
LIVE badge), connection matrix (data-tone cells), auto-looping audit log (`LOOP_MS=6000`),
result footer (screenshot 2).

**Product-shot scale-to-fit** (`ShipProductShots` + `shots/ShipShot{Audit,Analytics,
Scenario}`, screenshot 4) — each shot is a product UI **rebuilt as real DOM at a fixed
1180px** natural width, then scaled: `scale = fit.clientWidth / 1180; inner.style.transform
= scale(...)`, wrapper height set to `inner.offsetHeight * scale`. Re-runs on
`resize`/`load`/`fonts.ready`/`astro:page-load`. Embedded UI recolored to the marketing
accent (jade) while keeping semantic colors (the red/amber compliance flags survive). *Drift:
uses a `resize` **event listener**, not a `ResizeObserver` as the brief states.*

**Alternating copy↔media rows** (`ShipProductShots`) — full-width 2-col grid; side alternates
by `:nth-child(odd)` + `order`; media bleeds to its edge, copy insets to the content margin
via `--ship-edge: max(--gutter-md, calc((100vw - --content-max)/2 + --gutter-lg))`. The
brief's recipe, verbatim.

**Step-timeline** (`ShipHowItWorks`, `ShipEvidenceGrid` SLA timeline) — `<ol>` with numbered
markers (44px, `border-radius:12px`, `data-tone`-tinted), gradient connector fading to
transparent, per-step icons, `Reveal` stagger (`delay={i*80}`).

**Card** — `.ship-card` = 1px `--m-border` + `border-radius:14px` + card bg, **flat by
default**; specific cards add the soft lift shadow `0 18–32px 40–64px -28…-40px rgba(…,.3–.5)`
(proof cards, comparison table, product shots, forensic widget). Matches brief's "long blur +
big negative spread = faint lift".

**§7 Astro scoped-style gotcha — confirmed in the wild, with comments.** `shipping-audit.css`
hoists layout rules to global precisely because the elements are `<Reveal>` (child-component)
roots:
> `/* Evidence cells are <Reveal> roots, so the component's scoped styles don't reach them — these layout rules must live globally. */` → `.ship-ev-cell`, `.ship-how-step`, `.ship-how-proof-card` (Fix B). This is the single highest-value gotcha to keep documented.

**Reveal motion** (`motion/Reveal.astro`) — IntersectionObserver fade-rise
(`data-reveal`→`data-revealed`, `rootMargin: -10% 0 -5% 0`, optional `delay` for stagger);
reduced-motion → reveal immediately.

---

## 4. Token reconciliation (DONE)

Replaced the provisional amber with the real `--ship-warn` value in all 4 places the handoff
listed. Base RGB taken from source (`#B86400` / `#D99A3C`); soft/border alphas kept on the
dashbook role convention (light `.10`/`.28`, dark `.16`/`.36`) so `--m-warn` stays consistent
with `--m-accent`/`--m-positive`:

- `src/lib/tokens.ts` `marketingRoles`: `m-warn` `#B86400`/`#D99A3C`, `m-warn-soft`
  `rgba(184,100,0,.10)`/`rgba(217,154,60,.16)`, `m-warn-border` `rgba(184,100,0,.28)`/
  `rgba(217,154,60,.36)`; dropped "PROVISIONAL" from the role note (now cites the source).
- `src/app.css` `:root`: `--m-warn:#b86400` (+ soft/border); removed the `/* provisional */`
  comment.
- `src/app.css` `[data-marketing-dark]`: `--m-warn:#d99a3c` (+ soft/border).

---

## 5. Spec reconciliation (this pass)

Specs the flagship page **genuinely grounds** → reconciled `props`/`dom`/recipe and removed
`sourceNote`:

| Spec | Action |
|---|---|
| `squircle-button` | corrected: 6px squircle via global override + Button primitive (not component radius); `:active scale(.98)` |
| `chip` | documented both variants (dot + check-icon); `data-tone` |
| `duotone-icon` | real recipe (fill `opacity .18` + stroke, `currentColor`, per-item hue) + real hues |
| `feature-tabs` | confirmed 5s===5000ms invariant, `data-mode` auto/locked/paused, deep-link CustomEvent |
| `product-shot` | 1180px scale-to-fit; corrected ResizeObserver → resize listener |
| `live-widget` | state-derived figures, reduced-motion branch, `--ship-*`-only styling |
| `astro-scoped-styles` | confirmed (real in-source comments cited) |

## 6. Corrections vs the brief (drift log)

1. Accent is **jade**, not cobalt (CSS header comment is stale v0). dashbook already correct.
2. Squircle is a **global `!important` override** on a CTA list, not each component's radius.
3. **Two** chip variants (dot + check), not one.
4. Product-shot fit uses a **resize listener**, not a ResizeObserver.
5. Source dark attribute is **`data-ship-dark`** (dashbook renamed → `data-marketing-dark`).
6. `:active` scale is **`.98`**, brief said `.97`.
7. Real amber **`#B86400`/`#D99A3C`** (was provisional `#B5751A`/`#E0A64D`).

## 7. Deferred (next pass — out of this scope)

~31 catalogue specs whose `source:` points at `slide/`·`rhythm/`·`sections/` components are
exercised on `/shipping/audit`·`/analytics`·`/contracts`, **not** the flagship index, so
their `sourceNote` stays until those pages are read: heroes (asymmetric/cosmic/centered/
product), `slide-frame`, `two-col-slide`, `big-quote`, `marquee`, `stat-strip`/`stat-trio`,
`feature-grid`/`feature-columns`/`feature-list`, `numbered-card-row`/`three-card-row`,
`platform-bullets`/`platform-showcase`, `case-study-card`/`testimonial-card`, the CTA family,
`logo-rail`, `customer-platforms-rail`, `dashfi-wordmark`, `pinned-showcase`, `utility-tiles`,
`section-cta`, `section-intro`, `cosmic-hero`. Plus: verify whether broader marketing surfaces
use cobalt (not jade) as the data accent.
