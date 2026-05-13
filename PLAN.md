# Dashbook — Master Plan

> Source of truth for the Dash.fi brand & design system portal.
> Last updated: 2026-05-13 · current version v0.9.0
>
> This document is kept in sync with reality after every task. If a row here
> disagrees with the codebase, the codebase is right and this file is stale —
> open an issue.

---

## 1. Context

**Dashbook** is the public-facing brand & design system portal for Dash.fi (a fintech corporate-card company).

**Audience.** Designers, engineers, sales, marketing, partners, press, and the general public. Not a docs site for one of those — a single surface that serves all of them.

**Why it exists.** Internal Storybook (`@dashfi/svelte`) already covers engineering. What was missing: a discoverable, brand-grade public destination for logos, design tokens, voice, partner kits, and component documentation that non-engineers can use.

**Repo.** `/Users/zy/dev/dashbook/` — standalone, outside the Nx monorepo, links the component library via `link:` symlink.

**Deploy target.** `brand.dash.fi` on Vercel, prerendered static site. Fully public — no auth.

---

## 2. Vision & Principles

**The single most important insight from research:**

> Systems that succeed for our brief (Sprout Seeds, Cash App, Aalto, Wise) treat the design system page **as** the brand site — same subdomain, same typography, same restraint. Systems that fail (Razorpay Blade, SumUp Circuit, Palantir) treat it as engineering documentation.

**Visual register.** Minimal & aesthetic, fintech, Ramp / Linear restraint. Cream surfaces, hairline borders, monospace display headings, deliberate restraint on shadows and gradients.

**Voice.** Confident, direct, warm without being chummy. Sentence case across the UI. No exclamation marks. No emoji. Numerals not spelled-out numbers.

**Token philosophy.** Three layered tiers: base primitives → product semantic → marketing aliases. Single source of every hex value at the base layer.

**Dogfooding.** Dashbook renders `@dashfi/svelte` components live. If the lib breaks, dashbook visibly breaks. The portal must walk its own talk.

---

## 3. Research Foundation

### Aggregator coverage

- **designsystems.surf** — 87 systems indexed, 25 deep-dives
- **designsystems.com** — 47 entries (Figma community catalog)
- Plus prior pass on Vercel Geist, Stripe, Linear, Mailchimp, Polaris, Carbon, Atlassian, Primer, Spectrum, Notion, Ramp, Figma, Resend, Raycast

### Top 5 systems to mirror (in priority order)

| #   | System                  | Why                                                                                          |
| --- | ----------------------- | -------------------------------------------------------------------------------------------- |
| 1   | **Sprout Social Seeds** | Closest spiritual sibling. Brand-first IA (Align/Create/Connect), Writing as peer of Visual. |
| 2   | **Twilio Paste**        | Most complete IA. Page Templates + Experiences as peers above Components.                    |
| 3   | **Cash App**            | Fintech-native, brand-portal-first. Motion as foundation, hashed-URL asset downloads.        |
| 4   | **Wise**                | Fintech, editorial register, currency-as-ornament. Best aesthetic match.                     |
| 5   | **MongoDB LeafyGreen**  | Minimal aesthetic done in a component-heavy register. Per-component `live-example` URL.      |

### Top 5 to NOT emulate

Razorpay Blade · SumUp Circuit · Palantir Blueprint · GOV.UK (institutional/cold) · Workday Canvas (committee-built).

### Novel patterns stolen

- **GOV.UK** — explicit "When NOT to use this component" sections
- **Cash App** — hashed-URL single-click asset ZIPs (`/logo?e=…`)
- **Porsche v3** — per-component configurator with multi-framework code emit
- **Twilio Paste** — Page Templates / Experiences as IA peers above components
- **Razorpay** — Component status (Stable / Beta / Deprecated)
- **WPDS** — Release Notes / Changelog as top-level peer
- **Patternfly** — UX writing standards with terminology dictionary
- **Aalto** — brand and system at one domain
- **BBC GEL** — long-form editorial pattern docs (research + rationale)
- **Sprout Seeds** — Align / Create / Connect framing

### Fintech-specific differentiators (where most systems fail us)

- Currency formatting tokens & locale-aware rendering
- Number-heavy data viz as foundational (tabular figures, semantic up/down/neutral)
- Compliance & legal disclosure copy library — versioned, copy-to-clipboard
- Strong motion/loader spec (trust correlates with smooth motion on confirms)
- Card / transaction / receipt patterns as first-class
- Partner co-branding rules & "Powered by Dash" badge

---

## 4. Architecture

### Tech stack

| Layer               | Choice                                         | Reason                                              |
| ------------------- | ---------------------------------------------- | --------------------------------------------------- |
| Framework           | SvelteKit 2.59.1                               | Matches `@dashfi/svelte` toolchain; SSR + prerender |
| Adapter             | `@sveltejs/adapter-static`                     | All routes prerender; static hosting                |
| Styling             | Tailwind v4                                    | First-class `@theme` directive                      |
| Components          | `@dashfi/svelte` (link:)                       | Live symlink to monorepo lib                        |
| Long-form content   | mdsvex                                         | Markdown with Svelte component embedding            |
| Syntax highlighting | shiki 4.0                                      | High-quality, framework-agnostic                    |
| Type                | PP Supply Mono · Bai Jamjuree · PP Supply Sans | All self-hosted                                     |
| Icons               | `@lucide/svelte` only                          | No emoji, no second library                         |

### Token system (three tiers)

**Tier 1: Base palette (13 primitives, hex)** in `app.css` `:root`

```
--dash-cobalt        #354CEF   marketing brand
--dash-cobalt-deep   #2A3ECC   cobalt pressed
--dash-periwinkle    #B6C1F2   cobalt tint
--dash-mist          #E7E7F0   cool gray neutral
--dash-cream         #EBEDE4   warm cream surface
--dash-white         #FFFFFF
--dash-yellow        #EBFF00   electric highlight, sparing only
--dash-yellow-glow   rgba(235,255,0,0.5)
--dash-jade          #2B605C   product brand accent
--dash-jade-deep     #123B39   body text on light
--dash-ink           #25261D   button default, deck cover bg
--dash-graphite      #505148   warm gray body copy
--dash-graphite-soft #80817A   softest warm gray
```

**Tier 2: Product semantic (hex w/ light + dark)** — `--bg`, `--fg`, `--primary`, `--brand`, `--border`, `--input-border`, `--card`, `--popover`, `--destructive`, `--ring`, etc. These power the dashbook portal chrome and reference the base palette where appropriate.

**Tier 3: Marketing aliases** — every `--m-*` is `var(--dash-*)`. Never assign hex directly.

**Lib HSL token layer (scoped to `.preview-canvas` only).** The lib's components use Tailwind classes like `bg-primary` resolving via `hsl(var(--primary))` with HSL space-separated values. These are defined ONLY inside `.preview-canvas` so they don't collide with the portal's hex tokens of the same name.

### Preview canvas pattern

- Lib components render inside `.preview-canvas` (light or dark mode independent of page theme)
- HSL CSS variables scoped to the canvas only
- Each canvas has its own Light / Dark toggle
- Tailwind `@source "../node_modules/@dashfi/svelte/dist/**/*.{js,svelte}"` scans the lib's compiled output

### Chrome library (`src/lib/chrome/`)

25 components + 3 utilities:

| Component                  | Role                                                      |
| -------------------------- | --------------------------------------------------------- |
| `Header.svelte`            | Top nav with audience tiles, search trigger, theme toggle |
| `Sidebar.svelte`           | Generic sub-nav for any section with children             |
| `ComponentsSidebar.svelte` | Components-specific sidebar variant                       |
| `Footer.svelte`            | Brand + nav columns + legal                               |
| `Wordmark.svelte`          | `dash.fi` text mark with jade dot                         |
| `LogoMark.svelte`          | SVG wordmark + app icon (currentColor)                    |
| `ThemeToggle.svelte`       | Light / Dark / System cycle                               |
| `CommandPalette.svelte`    | ⌘K search palette                                         |
| `PageHeader.svelte`        | label + h1 + lede pattern                                 |
| `Section.svelte`           | section-header + content + optional note                  |
| `InnerPage.svelte`         | Two-col grid (sidebar + content) or full-width fallback   |
| `Tabs.svelte`              | Controlled tab switcher (used in ComponentLayout)         |
| `CopyValue.svelte`         | Right-click-style copy button with mono value display     |
| `Swatch.svelte`            | Color swatch with copy button + role description          |
| `DoDontGrid.svelte`        | 2-cell do/don't visual grid                               |
| `CodeSnippet.svelte`       | Copy-able code block with language label (shiki)          |
| `AssetDownload.svelte`     | Logo/font download card with preview                      |
| `AssetConfigurator.svelte` | Color + size + format + quality configurator; SVG/PNG/JPG download + .zip bundle |
| `MotionPreview.svelte`     | Replay-able animation preview                             |
| `PreviewCanvas.svelte`     | Isolated lib-context with HSL tokens + theme toggle       |
| `StatusBadge.svelte`       | Stable / Beta / Deprecated pill                           |
| `ComponentLayout.svelte`   | Component page shell: tabs + meta-bar                     |
| `PatternLayout.svelte`     | Pattern page shell                                        |
| `PropsTable.svelte`        | Typed prop docs (name · type · default · description)     |

Utilities: `logo-sources.ts` (inlined wordmark + app-icon SVG generators), `shiki-themes.ts` (custom brand-palette Shiki light + dark), `zip.ts` (~100-line store-mode ZIP encoder for the asset bundle).

---

## 5. Information Architecture (8 pages)

| #   | Path           | Page             | What lives there                                                                              | Built |
| --- | -------------- | ---------------- | --------------------------------------------------------------------------------------------- | ----- |
| 1   | `/`            | Overview         | Hero + 3 audience tiles + recent updates                                                      | ✅    |
| 2   | `/brand`       | Brand            | Logo (incl. AssetConfigurator) · Color · Typography · Voice · Motion · Photography · Iconography | ✅    |
| 3   | `/foundations` | Foundations      | All 9 subpages live: Color · Typography · Spacing · Radius · Elevation · Motion · Accessibility · Data viz · Currency | ✅    |
| 4   | `/components`  | Components       | **60** live previews; each with Preview / Code / Docs / Anatomy / Accessibility / Changelog tabs | ✅    |
| 5   | `/patterns`    | Patterns         | 6 recipes (Data · Forms · Confirmation · States · Layout) with Preview / Code / Rationale / Variations | ✅    |
| 6   | `/developers`  | Developers       | Install (pnpm/npm/yarn/bun tabs) · Quick start · Tailwind setup (v3 + v4) · Theming (3-tier) · 60-component stability matrix · Contributing · GitHub/Figma/Storybook link cards | ✅    |
| 7   | `/press`       | Press & Partners | AssetConfigurator (wordmark + app-icon) · Partner kit (3 Powered-by-Dash badge variants · 2 customer lockup examples · 8 do/don't co-branding rules) · Media contacts · Legal disclosures (real dash.fi data) | ✅    |
| 8   | `/changelog`   | Changelog        | Dated release notes through v0.7.0                                                            | ✅    |

---

## 6. Brand System

### Color

- 14 product semantic tokens (light + dark)
- 13 base palette primitives
- 10 marketing aliases
- All surfaced on `/foundations/color` with copy-to-clipboard hex values

### Typography

- **PP Supply Mono Ultralight** — display, page titles, big numerics, tabular numerics
- **PP Supply Mono Regular** — section labels, eyebrows, code
- **Bai Jamjuree** — body, UI, all reading copy
- **PP Supply Sans** — secondary display (rare)
- 10-step scale: 12 / 14 / 15 / 17 / 20 / 24 / 32 / 48 / 56 / 72 px
- 8 semantic classes: `heading-display`, `page-label`, `section-header`, `data-value`, `body-lg`, `body`, `body-sm`, `caption`

### Motion

- 3 easings (out / in / default) · 4 durations (instant 50ms · fast 150ms · normal 300ms · slow 500ms)
- Signature: per-character clipped slide-up, 30ms stagger, 600ms
- Numeric count-up: 700ms ease-out cubic
- Press feedback: `scale(0.97)` at 100ms
- No spring, no bounce

### Button variants (v0.3.3+)

| Variant                | Bg               | Text   | Notes                                    |
| ---------------------- | ---------------- | ------ | ---------------------------------------- |
| Default                | ink `#25261D`    | white  | Inverts in dark                          |
| Brand                  | jade `#2B605C`   | white  | Lifts to `#5BB8B0` in dark               |
| Destructive            | orange `#FF4000` | white  | Brand-constant. Updated from `#FF5F00` in v0.8.0 |
| Secondary              | cobalt `#354CEF` | white  | Brand-constant                           |
| Outline · Ghost · Link | transparent      | varies | Standard                                 |

---

## 7. Component System

60 components, 6 categories. Canonical tab order:

```
Preview → Code → Docs (PropsTable) → Anatomy → Accessibility → Changelog
```

Every page has a filled `PropsTable` driven by reading the actual `@dashfi/svelte` source. Multi-component umbrellas (Card, Tabs, Form, Pagination, etc.) render one titled `PropsTable` per sub-component. Code snippets are highlighted by a custom `dashbook-light` / `dashbook-dark` Shiki theme built from the brand palette.

### Categories

| Category   | Count |
| ---------- | ----- |
| Inputs     | 17    |
| Display    | 14    |
| Feedback   | 15    |
| Navigation | 9     |
| Layout     | 1     |
| Data       | 4     |

EnhancedTable usage and live ledger example documented at `/foundations/data-viz` (the data-viz foundation, not the raw component page) — the canonical place to look first when building a transaction / activity / ledger surface.

### Status taxonomy

- **Stable** — API frozen, fully documented
- **Beta** — Functional, API may shift
- **Deprecated** — Reserved

### PropsTable convention

`docs` snippet with `PropDef[]`. Each prop: `name`, `type`, `default?`, `required?`, `bindable?`, `description`.

---

## 8. Patterns System

6 patterns via `PatternLayout`:

| Category     | Pattern                  | Uses                                                       |
| ------------ | ------------------------ | ---------------------------------------------------------- |
| Data         | Transaction list         | SearchFilter, SelectFilter, Table, Pagination, Pill, Badge |
| Data         | Metric card              | Card, Pill                                                 |
| Forms        | Settings section         | Label, Input, Switch, Separator, Button                    |
| Confirmation | Destructive confirmation | Button, AlertDialog                                        |
| States       | Empty state              | Empty, Button                                              |
| Layout       | Card detail              | Card, Pill, Progress, Switch, Button, Separator            |

---

## 9. Phases — done · in flight · pending

### Done

| Phase | Version | Date       | Scope                                                                                                 |
| ----- | ------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| 1     | v0.1.0  | 2026-05-10 | Scaffold + chrome + tokens + `/foundations/color`                                                     |
| 2     | v0.2.0  | 2026-05-10 | All 7 Brand subpages + 4 Foundations technical pages                                                  |
| 2.1   | v0.2.1  | 2026-05-10 | Restored `--dash-ink`, `--dash-graphite`, `--dash-graphite-soft`, `--dash-yellow-glow`                |
| 2.2   | v0.2.2  | 2026-05-10 | Full base-palette restructure; `--m-*` become aliases                                                 |
| 3     | v0.3.0  | 2026-05-10 | Components scaffolding + first 8 documented (Button, Badge, Card, Input, Alert, Avatar, Tabs, Switch) |
| 3.1   | v0.3.1  | 2026-05-10 | Two-col layout fix for pages without sub-nav; full lib color taxonomy in `@theme`                     |
| 3.2   | v0.3.2  | 2026-05-10 | Bai Jamjuree font fix + `@theme` colors as direct hex                                                 |
| 3.3   | v0.3.3  | 2026-05-10 | Button variant refresh lib-wide: ink default, cobalt secondary, orange destructive                    |
| 4 / first half | v0.4.0 | 2026-05-10 | +28 component pages (36 total). Index grouped by category with stability badges                      |
| 4 / second half | v0.5.0 | 2026-05-10 | Full lib coverage — +24 pages = 60 components live                                                 |
| 4 (fix)| v0.5.1  | 2026-05-10 | Code tab variable-shadowing fix across 60 files                                                       |
| 4 (docs) | v0.5.2 | 2026-05-11 | Docs tab + filled PropsTables for all 60 components; custom brand-palette Shiki theme               |
| _interlude_ | v0.6.0 | 2026-05-11 | AssetConfigurator on `/brand/logo` + `/press` (cross-cuts plan Phases 2 and 6 Press half)        |
| 5     | v0.7.0  | 2026-05-11 | Patterns library — 6 recipes with full Rationale + Variations content. `PatternLayout` chrome added |
| 6 / Developers half | v0.8.0 | 2026-05-11 | `/developers` rewritten for **internal-only monorepo consumption**: `workspace:*` declaration, `pnpm install` + Nx serve flow, Tailwind preset import from `@dashfi/svelte/design-system/tailwind/config`, Vite `ssr.noExternal` config, `app.css` import + override, Quick start, 3-tier theming, 60-row stability matrix, "Add a new component" recipe pointing at `libs/svelte-components/lib`, Contributing rules, 4 link cards (dash monorepo, dashbook repo, Figma library, Storybook) |
| Foundations gaps    | v0.8.0 | 2026-05-11 | `/foundations/elevation` (2-shadow philosophy), `/foundations/accessibility` (WCAG 2.2 AA targets, focus ring spec, contrast table, motion reduction, screen-reader patterns), `/foundations/data-viz` (tabular numerics, semantic colors, 5-series chart palette, what-we-don't-ship, Intl number formatting, **EnhancedTable for ledger data** with live 8-row preview + paste-ready snippet), `/foundations/currency` (USD/EUR/GBP/JPY locale-aware rendering, `formatCurrency` helper, compact rendering, edge cases). Built by sub-agents (2 rounds). |
| Press layout fix    | v0.8.0 | 2026-05-11 | `/press` switched from hard-coded `<div class="page">` + `<Sidebar />` to `<InnerPage section="/press" wide>` + `<PageHeader>` to match the rest of the portal. The old layout left a 222px sidebar column ghost when no nav children existed |
| Lib-wide orange shift | v0.8.0 | 2026-05-11 | Destructive / orange shifted from `#FF5F00` (HSL `22 100% 50%`) to **`#FF4000`** (HSL `15 100% 50%`). Updated in `app.css`, `PreviewCanvas.svelte`, `shiki-themes.ts`, lib's `global.css` (3 declarations: `--orange` light, `--destructive` light, `--destructive` dark), and `/foundations/data-viz` semantic-colors row. Lib rebuilt + dashbook caches cleared so the change cascades into every preview canvas and the destructive button variant lib-wide |
| Figma handoff (Phase 7 prep) | v0.8.0 — doc-only | 2026-05-11 | Comprehensive 721-line `FIGMA_HANDOFF.md` written at repo root, executable by a designer or a Figma agent with write access. Covers file structure, three variable collections (Base 13, Product semantic × 2 modes, Marketing 10), 8 text styles, canonical-10 component variant trees + 50 stub specs, Code Connect templates, designer checklist, 4 open questions. **Actual Figma authoring is being done in a separate Claude Code instance with dashfi-team auth.** |
| Accent color feature | v0.8.0 | 2026-05-11 | Implemented per `ACCENT_FEATURE.md`. `logo-sources.ts` splits the wordmark into main paths + accent dot, generators accept optional `accent` parameter. `AssetConfigurator` gets a "Customize accent color" checkbox with three options (Match parent · Dash.fi yellow `#EBFF00` · Custom hex), live preview updates, filename + bundle ZIP entries get an `-accent-{yellow\|hex}` suffix. `LogoMark.svelte` accepts an `accent` prop; default behaviour unchanged for existing callers. `/brand/logo` got two new tiles: **Wordmark · Yellow accent** (yellow dot between dash and fi) and **App icon · Yellow glyph** (yellow `d` on ink background). Both render `#EBFF00` and are visible in the live preview |
| Phase 7 in-thread continuation | v0.8.0 | 2026-05-11 | The `mcp__figma-desktop__*` MCP is read-only (design→code). Three deliverables: (1) **`FIGMA_INTEGRATION_RULES.md`** at repo root — complementary rules doc for engineers using figma-desktop MCP to generate dashbook-compatible code from Figma designs. (2) **`/developers/figma`** route — surfaces handoff status, library overview, Tier 1+2 token tables, Code Connect explanation, links to both `.md` files, 4 open questions. (3) Nav updated to give `/developers` two children (Overview · Figma library). |
| **v0.8.0 release cut** | **v0.8.0** | **2026-05-11** | Version bumped in `package.json` (0.7.0 → 0.8.0), Footer badge updated, comprehensive changelog entry summarizing all of the above. |
| 6 / Press extras | (staged for v0.9.0) | 2026-05-11 | `/press` extended with **Partner kit** section (3 Powered-by-Dash badge variants via new `PoweredByBadge.svelte` chrome component, 2 customer logo lockup examples, 8 co-branding do/don't rules via `DoDontGrid`). Content in `$content/partners.ts` for one-file swap when marketing signs off real customers. Leadership section was prototyped but **removed per user direction** — exec exposure not appropriate for the Press page; `$content/team.ts` deleted. |
| 6 / Press refinements | (staged for v0.9.0) | 2026-05-11 | (1) **Real legal disclosures** sourced from dash.fi/legal — replaced fake content (PCI-DSS, SOC 2 claims I invented) with accurate ones: Dash.fi Technologies Inc. + SF mailing address, issuing banks **TransPecos Banks SSB + Patriot Bank N.A. for Mastercard** (not Visa), correct FDIC language ("account is not itself FDIC-insured"), Visa Global Services Inc. (NMLS 181032) + Currency Cloud (UK FCA FRN 900199 / CFSB US) payment services, FinCEN + FINTRAC MSB registrations, real (888) 733-0041 support hotline. (2) **PoweredByBadge redesigned** — caption drops to 60% opacity, wordmark is now the focal point with jade `.fi` dot accent for brand identity, optional `href` makes the whole badge a real link with hover state (border 18% → 50% currentColor + ↗ arrow nudge), three sizes (sm/md/lg). All `/press` badge previews now render as live links to dash.fi. **Legal copy needs compliance review before public publish.** |
| Phase 8a / ⌘K search | (staged for v0.9.0) | 2026-05-11 | Full-content ⌘K palette. New `$content/search-index.ts` aggregates nav routes + 60 components + 6 patterns + brand/foundations/dev subpages into a typed `SearchEntry[]`. Substring-positional scoring (title hit dominates, then description, then keywords). Results grouped by section (Pages / Brand / Foundations / Components / Patterns / Developers) with per-group count, keyboard nav (↑↓ + ↵), `mark` highlight on the matched substring, mouseenter sync, scroll-into-view for active row, footer with keybinding hints + total count. DOM-verified: query "butt" returns 11 results across 2 sections, top result Button active with highlight. |
| Phase 8b / Changelog polish | (staged for v0.9.0) | 2026-05-11 | Filter chips at top (All / Major + minor / Roadmap) — CSS-driven via `data-filter` on the `<ul>` + `data-kind` on each `<li>` (script annotated all 17 entries by version regex). **Latest** badge on v0.8.0 (jade fill, mono caps). Version chip rewrapped in a `.ver-anchor <a>` that deep-links to itself (`#v0-8-0`) and gets a hover inversion (jade fill on hover). Anchor IDs on every entry for shareable URLs. `scroll-margin-top: 96px` so deep links land below the header. |
| Phase 8c / Deploy prep | (staged for v0.9.0) | 2026-05-11 | (1) `vercel.json` at repo root — buildCommand `pnpm build`, outputDirectory `build`, immutable cache for `/fonts/*` + `/assets/*` + `/_app/immutable/*`, security headers (X-Content-Type-Options, Referrer-Policy, Permissions-Policy disabling FLoC), cleanUrls + trailingSlash:false. (2) `DEPLOY.md` at repo root (~140 lines) covering: Vercel project setup, brand.dash.fi DNS, the `@dashfi/svelte` link-vs-publish problem (Vercel doesn't have the local lib, so need Option A: publish to GitHub Packages, B: git submodule, C: vendor — recommends A), `pnpm preview` local-prod smoke test, rollback procedure, pre-deploy checklist (incl. **compliance review** for the legal copy), post-deploy curl verification. |
| PreviewCanvas — Auto mode | (staged for v0.9.0) | 2026-05-11 | `PreviewCanvas.svelte` gains a third **Auto** button (default active) that syncs each preview with the global `theme.resolved` from `stores/theme.svelte.ts`. Switching the page theme updates every Auto canvas; clicking Light or Dark detaches that canvas into a manual override; clicking Auto again re-syncs. Smooth 200ms color/background transition added so the auto-sync feels designed. DOM-verified across all three states. |
| **v0.9.0 release cut** | **v0.9.0** | **2026-05-11** | `package.json` 0.8.0 → 0.9.0, Footer badge updated, comprehensive changelog entry bundling Press extras + ⌘K search + changelog polish + Vercel deploy prep + PreviewCanvas Auto mode. "Latest" badge moves from v0.8.0 to v0.9.0. The old v0.9-planned roadmap row is replaced with a v1.0 roadmap covering production deploy + Figma library landing together. |
| Landing-page redesign | (staged for next release) | 2026-05-11 | `/` (route `+page.svelte`) reworked from a thin docs-index into a brand-forward marketing surface. New sections: (1) **Hero** — real `v0.9.0` jade pill + meta, big `BRAND & DESIGN SYSTEM FOR dash.fi` display heading using PP Supply Mono with line-level rise animation (respects `prefers-reduced-motion`), the dash.fi wordmark rendered inline as part of the heading. Right-aligned hero card displaying the **app icon with `#EBFF00` yellow accent glyph** (dogfoods the accent feature we built). (2) **Numbers grid** — `60 / 6 / 9 / 7` (components / patterns / foundations / brand surfaces) driven from real data (`$content/components`, `$content/patterns`, hardcoded counts for foundations + brand). Each cell links to the matching section. (3) **Palette strip** — six full-width swatches (Jade · Cobalt · Orange · Ink · Cream · Yellow) with hex + role label, hover lift, brightness-aware text color. Links to `/foundations/color`. (4) **Built-with-these** dogfood block — live Buttons (5 variants) + Pills (5 types) so the page visibly breaks if the lib breaks. (5) **Audience tiles** — kept, refined with subtle hover. (6) **Recent** — three latest version entries (v0.9.0 / v0.8.0 / v0.7.0) with anchor links into the changelog. (7) **"Full changelog"** link below. All data-driven so the page stays accurate as content evolves. |
| FlowLines docs preview fix | (staged for next release) | 2026-05-11 | `/components/flow-lines` was rendering at 0 height — the lib's root `<div class="relative">` doesn't auto-size, and the preview didn't pass sizing classes. Added `class="absolute inset-0 h-full w-full"` to the FlowLines instance and bumped the wrapping div to 280px. Canvas now mounts at proper viewport dimensions; WebGL animation runs as expected on pointer interaction. |
| /brand/photography upgrade | (staged for next release) | 2026-05-11 | Replaced the static 28-path SVG "vector map" with **live `<FlowLines preset="hero">`**. The dedicated "The vector map" section now renders the actual WebGL fluid simulation that the brand spec was always pointing at. The smaller "Marketing" position cell (with the `FASTER THAN LIGHT.` headline) also gets a `<FlowLines preset="subtle">` behind the text — the cell's caption already said "the vector map drifts behind", now it actually does. Both honour `prefers-reduced-motion` (falls back to the gradient layer alone). |
| Component-anatomy precision pass (Input) | (staged for next release) | 2026-05-12 | `/components/input` anatomy snippet rewritten from a 4-bullet prop list into a structured spec covering exact dimensions (height 36px / `h-9`, padding `py-1 px-3`), radius (`--radius-md` 6px), per-part tokens with resolved hex (`--color-input` `#b6c0bf`/`#1f2a29`, `--color-ring` jade `#2b605c`/`#5bb8b0`, `--color-muted-foreground` `#6e7878`/`#8b9695`), `shadow-sm` Tailwind v4 default literal value, composition rule (bare `<input>` + sibling `<Label>` — never a `label` prop), explicit non-features (no icon prefix, no built-in label, no background fill, no internal wrapper, no size variants), and a "Porting to another stack" subsection. v0.3.1 changelog row added on the page. **Sets a precedent**: this is the template for tightening every other component page so re-implementations in React / React Native / Vue / plain HTML+CSS can be 1:1 with the Svelte canonical without having to read the source. |
| Component-anatomy precision pass (batch — 17 components) | (staged for next release) | 2026-05-13 | Applied the Input precedent (v0.3.1 — 2026-05-12) to **17 more components**: Button, Badge, Pill, Card, Separator, Spinner, Checkbox, Radio Group, Switch, Progress, Avatar, Logo, Dialog, Select, Tabs, Label, Textarea. Each page's `{#snippet anatomy()}` rewritten with six subsections: Dimensions, Tokens (per part), Composition, Not part of X, Props, Porting to another stack. Per-variant tables for variant-heavy components (Button: 7 variants × 5 token slots; Badge: 9 variants; Switch + Button: 4 sizes each). Exact Tailwind classes resolved to px values (`h-9` → 36px; `text-sm` → 14px; `rounded-md` → `--radius-md` 6px). Token references resolved to literal hex for both light + dark modes (`--color-input` `#b6c0bf` / `#1f2a29`, `--color-primary` `#25261d` / `#ffffff`, `--color-popover` `#ffffff` / `#141a19`, `--color-muted` `#eceae0` / `#181e1d`). Per-component v0.3.1 changelog row added (2026-05-13). Cleaned up the obsolete page-local `<style>` block in Button (replaced ad-hoc `.anatomy h3` / `.a11y h3` / `.cl` selectors with portal-canonical `.docs-h` / `.docs-list` / `.docs-cl` classes). **Verification:** user runs `pnpm check` and `pnpm dev` + visits each component URL at `localhost:5173/components/<name>`. |
| MCP marketing — voice + partner kit + search wiring | (staged for next release) | 2026-05-13 | **`marketing_get_brand_voice` / `marketing_get_partner_kit` / `marketing_search` lifted out of stub state.** New typed marketing-spec layer at `src/lib/specs/marketing/{types,voice,partners,index}.ts` mirrors the existing component / foundation spec pattern. `voice.ts` extracts the full brand-voice contract from `/brand/voice` (4 principles, 4-row tone matrix, 6 copywriting rules with do/dont/exception, 9 good + 5 bad examples, 5 before/after pairs, 5 surface-specific guidance blocks). `partners.ts` exposes general co-branding rules + the 3 Powered-by-Dash badge variants + 8 do/don't rules + 2 placeholder customer lockups (all sourced from `$content/partners`) and **5 real, publicly-disclosed partner kits** (TransPecos Banks SSB, Patriot Bank N.A., Visa Global Services Inc., The Currency Cloud Limited, Mastercard) — each with category, co-branding rules, legal disclosure, and regulator reference, sourced verbatim from the `/press` legal-disclosures section. **No partner relationships were invented.** `marketing_search` now indexes 9 candidate kinds (voice-principle / voice-rule / voice-example / voice-guidance / palette / legal-disclosure / partner / partner-rule / badge-variant), optional `kinds[]` filter, mirrors the `product_search` scoring pattern (exact-id 100, exact-title 80, substring 40, per-word 10). The legal-disclosure tool now reads from the same typed map the search indexes against. Spec files: `types.ts` 5.8KB, `voice.ts` 9.4KB, `partners.ts` 6.7KB, `index.ts` 1.3KB. `pnpm check` → 0 errors. **MCP curl smoke-test still owed to the user** — couldn't run dev server from this worktree session (sandbox-blocked). |
| Component-anatomy precision pass — full library (60 components) | (staged for next release) | 2026-05-13 | **All 60 component docs pages** now carry a v0.3.2 anatomy section regenerated against the `EN-XX/design-vnext--sidebar-feature` branch. Extends the v0.3.1 precedent (18 components) to cover every entry under `src/routes/components/`: overlays (alert-dialog/drawer/dropdown-menu/fullscreen-dialog/hover-card/popover/sheet/sonner/support-modal/tooltip), form/data inputs (form/multi-select/phone-input/tel-input/toggle/toggle-group/calendar/range-calendar/date-range-selector), data + layout (code-block/data-table/enhanced-table/table/table-filters/pagination/accordion/collapsible/empty/navigation/scroll-area/item), feedback (alert/alert-error/indicator/linear-loader/loader/skeleton), and specialty (breadcrumb/command/flow-lines/magnetic-hover/merchant-logo). Each page's `{#snippet anatomy()}` rewritten with the canonical 6-subsection structure (Dimensions, Tokens, Composition, Not part of X, Props, Porting). Resolved values inlined (e.g. Table head 48px text-xs tracking-wider uppercase; Popover panel 288×16-radius shadow-lg over `--color-popover`; Calendar day cells `size-8` icon-buttons). Per-component v0.3.2 changelog row added (2026-05-13). Final `pnpm check` runs with 0 errors, 9 pre-existing warnings (chrome / changelog files). Original work was split across four parallel agents that all stalled on watchdog timeouts within the first 600s of execution — recovery was completed manually in the main session. |

### In flight

- **Phase 6 / Press half** — Logos ✅ · Media contacts ✅ · Legal disclosures ✅ · **Exec bios ❌** · **Partner kit (Powered-by-Dash badge, customer logo lockups) ❌**
- **Migration to `core/packages/brand/` (decided 2026-05-12).** Dashbook moves into the core monorepo as the `brand` package, replaces the Vercel + `adapter-static` setup with `adapter-node` deployed via Terraform per core convention, gains two MCP endpoints (public + internal) and a Claude Code skill. New surfaces added during migration: marketing patterns (public, content deferred to follow-on brainstorm) and credit card art configurator (public, integrated into `get_press_asset`). Standalone `/Users/zy/dev/dashbook` is kept untouched as a reference until migration is verified end-to-end. This supersedes the prior v1.0 / `DEPLOY.md` Vercel plan.
  - Spec: `core/docs/superpowers/specs/2026-05-12-brand-source-of-truth-design.md`
  - Phase 0+1 implementation plan (copy + lift-and-shift): `core/docs/superpowers/plans/2026-05-12-brand-migration-phase-0-1.md`
  - **Phase 0+1 IMPLEMENTED 2026-05-12.** `brand-app` builds and serves inside `core/packages/brand/`. 91 pages prerendered. `nx run brand-app:typecheck` → 0 errors. `nx run brand-app:lint` → 0 errors. HTTP spot-check 14/14 pass. Two lib fixes applied during migration (`drawer-title`/`drawer-description` `bind:ref` → `bind:el`; `sheet-content` SSR guards) — see commit message in core repo for details.
  - **Phase 1.5 IMPLEMENTED 2026-05-13.** `EN-XX/design-vnext--sidebar-feature` merged into `EN-XX/dashbook` to bring in the new canonical lib aesthetic (hover:opacity-80, no shadows, [corner-shape:squircle]). All 3 lib-file merge conflicts were trivial — design-vnext had independently arrived at the same drawer+sheet fixes. v0.3.2 anatomy (60 component pages with rewritten anatomy blocks) and the new public `developers/from-another-stack` route (vanilla CSS tokens, fonts, React/Vue/RN/server-rendered recipes) synced from standalone `3cf6acb`. Re-lint cleanup (12 errors, all `svelte/no-navigation-without-resolve` regressions or unused-import reappearances). Build → 92 prerendered pages (was 91, +1 for from-another-stack).
  - **Stack-agnostic shift (2026-05-13).** Spec revised: components move fully public (no Code/Docs tab gating). MCP surface restructured around stack-agnostic `get_component(name, stack?)` that emits per-stack code from the canonical anatomy. `get_porting_guide(target_stack)`, `get_component_changelog(name)`, `list_porting_targets()` added. Internal MCP shrinks to product patterns + monorepo-specific guides + Figma library setup. Rationale: the v0.3.2 anatomy describes a stack-agnostic spec, not Svelte-specific implementation — the contract belongs to the brand, not the implementation.
  - Known pre-existing dashbook issues NOT introduced by migration: `/components/form` imports `zod`, `/developers` imports `vitest/config` — both prerender fine but 500 in dev mode. Defer to follow-up.
  - **Phase 2/3/4 plans drafted 2026-05-13** at `core/docs/superpowers/plans/2026-05-13-brand-migration-phase-{2,3-outline,4-outline}.md`. Phase 2 is full step-level (~16 tasks, ready to execute). Phase 3 is task-level outline with 6 design-decision gates (MCP SDK choice, stack-emit storage shape, component-ID conventions, asset URL signing, skill content scope, port_component prompt shape) — each marked 🚧 brainstorm-before-task. Phase 4 is decision-gated sketch — needs 4 team-level decisions (deploy shape A/B/C, DNS cutover sequencing, internal-portal/key-rotation flow, lib-release coupling) before step-level tasks can be authored.

### Pending

| Phase             | Owner                        | Scope                                                                                                   |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| **7 — Figma library** | **External Claude Code instance** (in flight, separate auth) | Authoring the actual Figma library file per `FIGMA_HANDOFF.md`. Code-agent prep is done in this repo; the build itself is happening in a parallel session bound to the dashfi-team Figma account. Will land alongside the production deploy as part of v1.0. |
| **v1.0 — Brand-app production** | dashfi team       | Execute the migration spec at `core/docs/superpowers/specs/2026-05-12-brand-source-of-truth-design.md`. Phases 0–4: copy → lift-and-shift inside core → IA + auth → MCP + skill + new surfaces → DNS cutover. Includes compliance review of the legal copy on `/press`. `DEPLOY.md` in this repo is now obsolete. |
| **`@dashfi/svelte` next publish — packaging cleanup** | core / lib team | `v0.0.1` works but has three known packaging bugs; dashbook works around them with explicit transitives in `package.json`. Full notes + verification recipe at `.knowledge/dashfi-svelte-packaging-followups.md`. Summary: (1) move `svelte-radix`, `svelte-tel-input`, `formsnap`, `@internationalized/date` from `devDependencies` to `peerDependencies`; (2) filter `.stories.svelte`, `@faker-js/faker`, `@storybook/*` references out of the published `dist/`; (3) fix `sideEffects` glob from `lib/ui/**/*.css` to `dist/ui/**/*.css` so tree-shakers preserve component CSS. |
| **MCP server Phase 2** | dashbook / brand team | Foundations deep-extract beyond `tokens.ts` (typography type scale, spacing scale). **Brand voice + partner kit + marketing search wired 2026-05-13** (see Done table). Still pending: `marketing_get_partner_kit` per-partner **asset bundles** (lockup SVG + partner logo URLs — partner-ops owned), auth gating for partner-specific assets (FDIC partner data, exec bios — public assets stay public), end-to-end test from Claude Desktop + Claude Code against the live remote URL. |

### Cross-cutting fixes landed in v0.7.0 (not a phase per se)

| Area                                | Fix                                                                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Pill component preview              | Switched from invented `positive/negative/neutral` types to real `base/info/success/warning/danger` PillTypes                    |
| AlertError preview                  | Uses real props (`title`, `description`, `onRetry`) instead of children                                                          |
| MultiSelect preview                 | Uses `bind:selected` instead of `bind:value`                                                                                     |
| PhoneInput preview                  | Now provides required `allowedCountryCodes`                                                                                      |
| TelInput preview                    | Uses required composite `{ raw, dialCode, iso2 }` value shape with `bind:value`                                                  |
| Lib `sheet-content.svelte` (SSR)    | Body-style cleanup setTimeout now guards on `typeof document` — fixes static prerender                                           |
| Lib `drawer-title.svelte` / `drawer-description.svelte` | Switched from `bind:ref` to `bind:el` with nullable `HTMLDivElement \| undefined` / `HTMLHeadingElement \| undefined` to match vaul-svelte typed API |
| Drawer route page                   | Typed the `child({ props })` snippet as `{ props: Record<string, unknown> }`                                                     |

Type-check is now **0 errors** (was 20). Production build passes; the only remaining build warnings are the four Foundations 404s above.

---

## 10. Figma Plan — parallel agent

### Lanes

| Lane        | Owns                                                                              |
| ----------- | --------------------------------------------------------------------------------- |
| Code agent  | All `dashbook/` + lib changes                                                     |
| Figma agent | Dashbook Figma file (`sN3gd41e7FhsyoQ7WqJu0j`). Mirrors brief. Never writes back. |
| You         | Decisions, sign-off                                                               |

### Handoff brief contents

1. 13 base hex tokens → Figma primitive variables
2. Product semantic tokens × light/dark modes → alias variables in 2-mode collection
3. 10 marketing aliases → alias variables (single mode)
4. 8 typography styles → text styles
5. 58 component variant definitions → component variants
6. 8-page IA → Figma page structure
7. Code Connect templates → `@dashfi/svelte` imports

### Figma file pages

Cover · Brand · Foundations · Components · Patterns · Resources · Press & Partners · Changelog

---

## 11. Production & Deploy

> **Superseded 2026-05-12.** The Vercel + `adapter-static` plan below describes how *standalone dashbook* would have shipped. The new plan (and the one actually being executed) is the migration into `core/packages/brand/` — see `core/docs/superpowers/specs/2026-05-12-brand-source-of-truth-design.md` for the full design. The table below is retained for reference only.

| Setting      | Value (old, standalone)                                       | Value (new, in-core)                                          |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| Domain       | `brand.dash.fi`                                               | `brand.dash.fi` (unchanged target)                            |
| Auth         | Fully public                                                  | Public site + internal-gated route group + internal MCP API key |
| Hosting      | Vercel                                                        | AWS via Terraform (`@dash-core/nx-tf`)                        |
| Output       | `adapter-static`, prerendered                                 | `adapter-node` to `dist/`, prerender flag per static route    |
| Lib link     | `link:../dash/core/libs/svelte-components/lib` (live symlink) | `"@dashfi/svelte": "workspace:*"` inside the core monorepo    |
| Fonts        | Self-hosted PP Supply + Bai Jamjuree CDN                      | Same (no change)                                              |
| Font license | PP Supply = Pangram Pangram commercial; Bai Jamjuree = OFL    | Same (no change)                                              |

---

## 12. Open Decisions / Parking Lot

- Press kit ZIP composition
- Customer logo usage policy
- Editorial / News tab? (Atlassian pattern)
- Configurator stretch (Porsche pattern)
- Playroom stretch (Seek Braid pattern)
- Storybook deep-link strategy
- Per-region/locale component variants (Wise pattern)
- Trust artifacts page (SOC 2, PCI, security.txt)

---

## 13. Conventions

### Token naming

- Base: `--dash-{name}` (hex)
- Product semantic: `--{role}` (hex, two modes)
- Marketing aliases: `--m-{role}` (references `--dash-*`)
- Lib HSL: `--{role}` inside `.preview-canvas` only

### Page structure

```
<InnerPage> (wide=true for components)
  <PageHeader label="..." title="..." lede="..." />
  <Section label="..." note="...">...</Section>
</InnerPage>
```

### Voice

- Sentence case. Title case only for proper nouns.
- No exclamation marks. No emoji. No "click here."
- Contractions OK. Numerals not spelled-out. Currency prefixed.
- `you` for users, `we` for company.

### Folder structure

- `static/fonts/` — `.otf` self-hosted
- `static/assets/` — SVG logos with `currentColor`
- `static/favicon.svg`

---

## 14. Where things live

| Path                                                  | What                           |
| ----------------------------------------------------- | ------------------------------ |
| `/Users/zy/dev/dashbook/`                             | Portal                         |
| `/Users/zy/dev/dash/core/libs/svelte-components/lib/` | `@dashfi/svelte` lib           |
| `/Users/zy/dev/dash/core/packages/dashfi-ui/`         | Production app                 |
| `/Users/zy/dev/dash/DASHFI-ASSETS/`                   | Brand asset originals          |
| `/Users/zy/dev/dash/dash-fi-app-ds/project/`          | Canonical handoff              |
| `/Users/zy/dev/dash/brand/`                           | Legacy Astro PDF-frame replica |

---

## 15. Build commands

```bash
# Dev
cd /Users/zy/dev/dashbook
pnpm install
pnpm dev                   # http://localhost:5173

# After lib changes
cd /Users/zy/dev/dash/core/libs/svelte-components/lib
pnpm run build

# If Tailwind / types look stale
cd /Users/zy/dev/dashbook
rm -rf node_modules/.vite .svelte-kit
pnpm dev

# Quality
pnpm check                 # svelte-check
pnpm lint
pnpm format

# Production
pnpm build                 # → ./build (static)
pnpm preview
```

### Lib link gotcha

`link:` is live symlink (use this). `file:` is snapshot (rejected — required full reinstall per lib change).

---

## 16. Glossary

- **Base palette** — 13 hex `--dash-*` primitives.
- **Product semantic** — `--bg`, `--fg`, `--primary` for portal chrome.
- **Lib HSL tokens** — same names, HSL-formatted, scoped to `.preview-canvas`.
- **Marketing aliases** — `--m-*` referencing base.
- **Chrome** — dashbook's own component library (distinct from `@dashfi/svelte`).
- **Preview canvas** — isolated context for lib components.
- **Section** — content block on a foundation/brand page.
- **Pattern** — multi-component recipe.
- **Status** — Stable / Beta / Deprecated lifecycle marker.

---

## 17. Plan maintenance

This file is the single source of truth and is updated after every completed task — same turn as the code change, before reporting completion. The bar: PLAN.md disagreeing with reality is itself a bug.

After each task, edit:

- **Header**: "Last updated" → today's date. "Current version" if `package.json` version changed.
- **§5 IA table**: flip Built column when a page transitions placeholder → real (or vice versa).
- **§7 Component System counts**: if components are added or removed.
- **§9 Phase table**: mark Done / In flight / Pending with version + date. Don't round partial progress up.
- **§9 Cross-cutting fixes table**: append entries for bug fixes that don't belong to a numbered phase.
- **§4 Chrome library**: when a chrome component is added or removed.
- **§12 Open Decisions / Parking Lot**: when a decision is resolved (move it into the phase that absorbed it) or a new question surfaces.

Skip the update only for purely conversational replies that didn't touch code or scope.

---

_End of plan. Update when scope, IA, or token taxonomy changes — and after every task._
