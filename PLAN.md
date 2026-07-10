# Dashbook — Master Plan

> Source of truth for the Dash.fi brand & design system portal.
> Last updated: 2026-05-18 · current version v1.0.0
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

**17 patterns via `PatternLayout` — all Done (full depth).** Scaffolded as stubs on 2026-05-14 from `.knowledge/dashfi-ui-patterns.md`; Architecture (Tier 1), Shells (Tier 2), and Pages (Tier 3) all promoted to full-depth on 2026-05-14. Categories grew from 5 → 7 to host the new shapes: `Shells` (page-level chrome compositions) and `Architecture` (cross-cutting techniques) joined Data / Forms / Confirmation / States / Layout.

| Category     | Pattern                              | Uses                                                                |
| ------------ | ------------------------------------ | ------------------------------------------------------------------- |
| Shells       | Protected app shell                  | Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarMenu |
| Shells       | Auth split-screen                    | Card, Button, Input, Label                                          |
| Shells       | Sub-section header with tabs         | PageHeader, Pill, $page.url, Separator                              |
| Data         | Transaction list                     | SearchFilter, SelectFilter, Table, Pagination, Pill, Badge          |
| Data         | Metric card                          | Card, Pill                                                          |
| Data         | Tabbed section with live counts      | Tabs, Pill, Table, $page.url                                        |
| Data         | Workflow data table page             | SearchFilter, SelectFilter, Table, Checkbox, Pagination, DropdownMenu, Button |
| Data         | Dashboard summary                    | Pill, Table, Button                                                 |
| Forms        | Settings section                     | Label, Input, Switch, Separator, Button                             |
| Forms        | Multi-section settings page          | Label, Input, Switch, Separator, Button, Pill, IntersectionObserver |
| Forms        | Multi-step onboarding flow           | Button, Input, Label, +layout.server.ts                             |
| Confirmation | Destructive confirmation             | Button, AlertDialog                                                 |
| States       | Empty state                          | Empty, Button                                                       |
| States       | Terminal state page                  | Button, Pill, Lucide icons                                          |
| Layout       | Card detail                          | Card, Pill, Progress, Switch, Button, Separator                     |
| Architecture | Auth route-group contract            | SvelteKit route groups, +layout.server.ts                           |
| Architecture | URL-as-state deep-linkable dialog    | Dialog, Sheet, replaceState, $page.url                              |

Drafting pages render a "Drafting" dashed-border notice and a single-paragraph rationale grounded in the dashfi-ui source path. They're routable, in nav, and indexed by ⌘K, but the Preview + Code tabs ship "Live preview being authored" placeholders until the canonical version lands. `PatternLayout.svelte` learned a new `draft` prop to surface this.

---

## 9. Phases — done · in flight · pending

### Done

| Phase | Version | Date       | Scope                                                                                                 |
| ----- | ------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| Plan reconciliation — crossed off shipped items | (next release) | 2026-06-27 | **The Pending/In-flight sections had drifted from reality** — three items were live but still listed open. Verified + crossed off: (1) **Credit card art configurator** — `/brand/card` live in prod (HTTP 200), `marketing_get_card_art` + `marketing_list_card_variants` exist (shipped 2026-05-15). (2) **Plugin org-wide publish** — live in claude.ai → Organization plugins (confirmed in admin UI); done via the **Cowork** path, which is the current mechanism (the old "Anthropic Console" wording in Pending was itself outdated). (3) **Press partner kit** — In-flight had it ❌, but `PoweredByBadge` + lockups + do/don't rules shipped v0.9.0; exec bios deliberately dropped. Updated the In-flight Press line, removed the two stale Pending rows. **Genuinely still open** (unchanged): core migration to `core/packages/brand/` (decision-gated, team-level — the one big rock), Figma library (Phase 7, external session), `@dashfi/svelte` packaging cleanup (3 known bugs), MCP Phase 2 remnants (partner asset bundles + auth gating + live e2e), builder deferred refactors (registry dedup / shared block CSS / inline decision). Also deleted the 5 merged session branches (plugin / page-builder / marketing-json-api / maintainer-runbook / marketplace-fix), local + origin. Branch `EN-XX/plan-reconciliation`. |
| Fix stale plugin marketplace listing | (next release) | 2026-06-27 | **Bug: claude.ai showed the plugin card as "ships three slash commands" / v0.1.0 even after the v0.2.0 plugin synced** (the 6 marketing commands appeared in the list, but the card metadata was stale). Root cause: PR #7 bumped `claude-plugin/.claude-plugin/plugin.json` (the plugin's own manifest) but NOT the root `.claude-plugin/marketplace.json` (the marketplace *listing* claude.ai reads for the card name/description/version). claude.ai pulls command files directly (so they refreshed) but keys the card on the marketplace entry's `version`. Fixed: marketplace.json plugin entry `version` 0.1.0 → 0.2.0, description → "nine slash commands across the product and marketing namespaces", added `marketing` keyword. Also corrected `/use/maintainer` §8 — there is NO manual "Re-sync" button in the org-plugins view (auto-pull only); documented that the card is keyed to marketplace.json `version` (so bump BOTH manifests) and that a forced refresh means remove + re-add the marketplace. **Takeaway for future plugin releases: bump the version in `.claude-plugin/marketplace.json` AND `claude-plugin/.claude-plugin/plugin.json`.** Branch `EN-XX/fix-marketplace-listing`. |
| Maintainer runbook — the two distribution channels | (next release) | 2026-06-27 | Rewrote `/use/maintainer` §8 (was "Cowork plugin + Connector") into "Landing updates org-wide — the two channels", capturing the mental model that trips people up: **Channel A** (MCP tools / `/api/*` JSON / `/llms.txt` / anything under `src/`) updates **automatically on Vercel deploy** — merge and it's live for every client, no version bump or admin action; **Channel B** (skill prose + slash commands, which ship inside the plugin from the `trlmkb/dashbook` GitHub repo) reaches the org via a **Cowork re-pull** — bump `plugin.json` version, merge, then claude.ai admin → Plugins re-syncs and members get it on their next Claude Code session. Includes the Connector caveat (web gets Channel A only) + verify commands for each channel. Durable maintainer knowledge that previously lived only in chat. Branch `EN-XX/maintainer-distribution-runbook`. |
| Marketing static JSON API + `/llms.txt` | (next release) | 2026-06-27 | **Marketing parity for the static JSON API** — product had `/api/components.json` + `/api/foundations/*.json` for non-MCP clients (CI, Figma plugins, plain-`WebFetch` agents, crawlers), but marketing was MCP-only. Added 4 endpoints mirroring the MCP `marketing_*` response shapes, CORS-open + 24h-cached + `prerender=false`, same headers/404-with-hint pattern as the product endpoints: `/api/marketing/patterns.json` (catalogue, 36) + `/api/marketing/patterns/[slug].json` (full `MarketingPatternSpec` — recipe, DOM, token roles, dimensions, variants, props, gotchas; mirrors `marketing_get_pattern`) + `/api/marketing/foundations.json` (5) + `/api/marketing/foundations/[slug].json` (full foundation; valid slugs tokens/typography/layout/section/motion). Discoverability: added both to `/developers/install` "Assets you can fetch directly". **Also adds `static/llms.txt`** (gap #2) — a curated, on-brand root index (served at `/llms.txt`, text/plain) that points any agent — MCP-aware or not — at the MCP endpoint, the full JSON API (product + marketing), the brand assets, and the key pages, with the product/marketing namespace split explained. Verified live: all 4 endpoints → 200 + correct shape, unknown slug → 404 with hint, `/llms.txt` → 200 text/plain. `pnpm check` → 0 errors. Closes both accessibility gaps (reachable via MCP **and** plain HTTP JSON **and** llms.txt). Branch `EN-XX/marketing-json-api`. |
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
| /patterns scaffolding from dashfi-ui inventory | (staged for next release) | 2026-05-14 | Added **11 new pattern stubs** to `/patterns/` from the dashfi-ui page-pattern inventory (`.knowledge/dashfi-ui-patterns.md`). New entries: Protected app shell · Auth split-screen · Sub-section tabs · Tabbed section with live counts · Workflow data table page · Dashboard summary · Multi-section settings · Multi-step onboarding · Terminal state · Auth route-group contract · URL-as-state dialog. Two new categories added: **Shells** (page-level chrome) and **Architecture** (cross-cutting techniques). `PatternLayout.svelte` gained a `draft` prop that renders a dashed-border "Drafting" notice + downgrades the page status; the `/patterns` index surfaces a `Drafting` chip on each stub card. All 11 stub pages render with single-paragraph rationale grounded in the dashfi-ui source path (e.g. `(protected)/transactions/+page.svelte`); Preview + Code tabs show "Live preview being authored" placeholders. Nav updated with all 17 children in IA order. PLAN.md §8 rewritten as the 17-row pattern table. |
| Server-side PNG rasterization for MCP asset tools | (staged for next release) | 2026-05-14 | The `/api/card/[variant]/[slot]/+server.ts` and `/api/logo/[variant]/[preset]/+server.ts` public endpoints, plus the `marketing_get_card_art` and `marketing_get_logo` MCP tools, now accept a `format: 'svg' \| 'png'` parameter (default `svg`). Rasterizer: **`@resvg/resvg-js` ^2.6.2** — picked over sharp because resvg ships platform binaries via `optionalDependencies` (Vercel-friendly), has a tiny dependency footprint, and skips libvips entirely. New `src/lib/chrome/rasterize.ts` exposes `svgToPng(svg, { width, height, scale? })` returning `Uint8Array`. HTTP endpoints accept `?format=png&scale=1-4` for retina renders and return `Content-Type: image/png` with 24h cache. MCP tools base64-encode the PNG bytes into a `pngBase64` field (MCP transport doesn't carry binary natively). PNG is explicitly flagged as **not MDES-uploadable** in `marketing_get_card_art` — MC portal accepts SVG only. Full rationale + verify recipe at `.knowledge/server-side-png.md`. **Install needed:** user must run `pnpm install` to pull the new dep before next dev/build. |
| Patterns Tier 1 (Architecture) full-depth | (staged for next release) | 2026-05-14 | The two Architecture-category patterns scaffolded earlier today were promoted to full-depth (matching the bar set by `transaction-list` and `empty-zero-state`). **`auth-route-groups`** ships with a color-coded folder-tree preview (4 groups + 1 nested group, legend below), two real `+layout.server.ts` guard snippets (`(protected)` and `(protected)/(2fa)`), 4-subsection rationale (Why this shape · Decisions · When to add a new group · Source) and a Variations tab (role-based / org-tenant / feature-flag groups + 3 anti-patterns). **`url-state-dialog`** ships with a live working demo — a real `Dialog` whose open state syncs bidirectionally to `?demo-detail=open` via `history.replaceState`, with a live URL preview pane showing the current location.search; refreshing reopens, browser-back closes, the URL is shareable; cleans up its private query key on unmount. Paste-ready code snippet shows the production `$app/state` + `replaceState` wiring. 4-subsection rationale + Variations (entity-ID dialogs, mobile Sheet variant, coordinated multi-dialog, hash fragment alt + 4 anti-patterns). Both patterns dropped their `draft: true` flag in `src/lib/content/patterns.ts`. PLAN.md §8 status table updated. |
| Agent-data reachability batch (P1+P3+P4+P5+P6) | (staged for next release) | 2026-05-14 | **Response to a consumer-agent feedback report** describing how the docs site is partially invisible to non-browser clients (SPA hydration) and how an MCP-unavailable agent silently degrades. Five fixes shipped in one batch via parallel subagents. (1) **Static JSON API** — 5 new `+server.ts` routes (`/api/components.json`, `/api/components/[slug].json`, `/api/foundations/{color,typography,spacing}.json`) serializing the existing typed specs (`src/lib/specs/components/*`, `foundations/*`). Same JSON shape MCP returns; one HTTP GET per resource; CORS-enabled; 24h cache. Field naming aligned with MCP: `color.json` uses `product` (not `productSemantic`) to byte-match `product_get_foundation`. (2) **Dark-mode hex on `/foundations/color`** — added a "Light / dark pairs" section between Product palette + Base palette showing all 14 product semantic tokens with both light and dark hex inline, each with a 20px color chip so the dark-mode value is visible regardless of active theme. Source: `productColors` from `src/lib/tokens.ts`. (3) **PP Supply Mono fallback documented** — typography foundation page gains a "Font delivery" section + `webDelivery` block promoted into the typed spec at `src/lib/specs/foundations/typography.ts` (and corresponding `FontWebDelivery` type in `types.ts`), so MCP `product_get_foundation` + the `/api/foundations/typography.json` endpoint now serve identical data. Three rows: Bai Jamjuree (OFL, Google Fonts URL), PP Supply Mono (paywalled commercial — source link), **JetBrains Mono fallback** (Apache-2.0, Google Fonts URL — closest open mono for both mono + display roles on unlicensed surfaces). (4) **Asset-URL discovery section on `/developers/install`** — new "Assets you can fetch directly" section listing logo SVG (`/api/logo/<variant>/<preset>`), card art (`/api/card/<variant>/<slot>`), components JSON, foundations JSON. Each with a copy-pasteable curl. Positioned after "Verify the server is alive" as the documented MCP-down fallback path. (5) **SKILL.md "If the MCP isn't installed" rewritten** — old version claimed the docs site was a full fallback ("every component page has an Anatomy tab with the same structured data"); that's false today because component anatomy is client-rendered. New version: foundations DO work via WebFetch (listed three URLs); components do NOT — point agents at the static JSON endpoints instead. Always surface what's missing to the user; never silently degrade. PP Supply Mono brand-rule extended with the JetBrains Mono fallback note. **Also addresses related feedback item P0 (consumer-agent reports zero results from `ToolSearch("+dashbook")`)**: an audit subagent confirmed the dashbook tools ARE reachable from another fresh session (not reproducible). Conclusion: reporter's issue is most likely client-side (stale plugin install, transient handshake failure, or session-level harness state). Reporter-diagnostics ask drafted in-thread for the user to send back. Tools (P0): 17 unchanged, payload tens-of-KB, well under any documented Claude Code handshake cap. **Deferred from this batch**: P2 (SSR'd anatomy) — covered functionally by the JSON API at lower complexity; revisit if real-user `WebFetch` need persists. |
| /developers/install rewrite — 4-surface matrix | (staged for next release) | 2026-05-14 | The install page (`src/routes/developers/install/+page.svelte`) was structured around three "paths" (Anthropic Console org plugins, Claude Code manual, Claude Desktop manual) but the Console path was stale (Anthropic moved org plugins from console.anthropic.com to claude.ai admin in 2026), and the page didn't distinguish between MCP / skill / connector / Cowork plugin mechanisms. Rewrote as a surface matrix covering all four Anthropic surfaces: **Claude Code** (per-user via `/plugin install`, org-wide via Cowork at claude.ai admin → Plugins), **claude.ai web** (org-wide via Connectors tab — MCP tools only; skill prose reaches indirectly via the boundary signal baked into every tool description), **Claude Desktop** (manual `claude_desktop_config.json` config; partial Cowork reach via Claude Code), **Claude Design** (Anthropic Labs — not yet MCP-aware; "coming weeks" per the announcement; workaround is to generate in Claude Code and paste). Page now opens with a 4×5 matrix table showing which mechanism each surface supports, then per-surface recipe sections (per-user + org-admin), then "What the plugin bundle includes" (skill + MCP + boundary signals + slash commands), then verify-the-server curl, then other-MCP-clients fallbacks. Added explicit link references to the Anthropic support docs ([Manage Cowork plugins](https://support.claude.com/en/articles/13837433), [Custom connectors with remote MCP](https://support.claude.com/en/articles/11175166), [Claude Design announcement](https://www.anthropic.com/news/claude-design-anthropic-labs)). Tool count updated 15 → 17 to reflect the cross-namespace fix (added `product_get_logo` + `product_get_page_template`). |
| /use runbooks — audience-routed how-to-use docs | (staged for next release) | 2026-05-18 | New top-level `/use` IA: landing page (`/use`) plus 4 audience-specific runbooks (`/use/{dev,designer,marketer,maintainer}`). Addresses the gap that existing sections (Brand, Foundations, Components, Patterns, Developers, Press) are organized by ASSET, not by AUDIENCE — and someone new to Dashbook needs a single page that says "here's how YOU use this." Landing page has 4 audience tiles + a Quick Links footer (wordmark SVG, components JSON, voice rules, card configurator, install, changelog). **Engineer runbook**: install (link to /developers/install), the canonical workflow loop (product_list_components → product_get_component → product_port_to → product_get_token), build-to-spec rules (dimensions, tokens, composition, non-features, props, porting), non-Svelte stacks (link to /developers/from-another-stack), no-MCP JSON API recipes, bug-reporting paths. **Designer runbook**: tokens at a glance (all 9 foundations), components catalogue + the canonical tabs (Preview / Code / Docs / Anatomy / Accessibility / Changelog), patterns library + emphasis on Shells + Architecture as highest-leverage, voice + tone integration, Figma library status, "when you're designing something new" loop (catalogue check → pattern check → new tokens are system-level). **Marketing/sales runbook**: voice rules as the headline (sentence case, no exclamations, no emoji, numerals), drafting copy with claude.ai + the Dashbook Connector (lets non-engineers use MCP), logos at stable URLs (every variant/preset listed), partner co-branding, legal disclosures (always use canonical text — compliance-reviewed), the standard draft-with-claude loop. **Maintainer runbook** (most substantial — ~300 lines, the user is the only audience): full release process (pnpm check + dev smoke + PLAN.md + commit + push + Vercel auto-deploy), how to add a component (spec file → index → docs page), how to add a pattern, how to add a card variant, how to update a foundation token (2-file rule: app.css + tokens.ts), how to bump versions (3 independent versioning trails: portal / mcp-server / @dashfi/svelte), Vercel deploy mechanics + rollback, Cowork plugin + claude.ai Connector update flow (both auto, no ceremony), `.knowledge/` folder discipline, PLAN.md discipline (the same rules this entry is following), reporter-bug investigation flow (reproduce → root-cause → fix forward → document), and a future-work parking lot (brand-app stage deploy, $derived warnings, real partner-bank logos, P2 SSR'd anatomy, visual regression tests). Nav updated: new "Use" top-level item registered second (after Overview), children visible in Sidebar + ⌘K. **Reasoning for `/use` over `/docs` or `/guides`**: `/use` is action-oriented ("how do I use this?"), shorter, and pairs naturally with "as a {role}". |
| Card art: facelift design + one-click MDES bundle | (staged for next release) | 2026-05-15 | Two follow-up improvements after the MDES spec encoding. (1) **Facelifted the card variant** — `cardVariants[0]` renamed from `cobalt-current` → `jade`, label updated to "Jade", colors swapped to jade-deep base (#123B39) with a much subtler jade highlight gradient (#2B605C at opacity 0.22 vs the old 0.55 radial glow), cream wordmark (#EBEDE4 vs old white), jade app-icon background with cream glyph. Matches the design-vnext brand language — jade is the product brand, less aggressive gradient, restraint over visual noise. No more multiple-variants confusion: there's one canonical Dash.fi card. (2) **One-click MDES bundle download** — new prominent jade "Download MDES bundle (zip)" button on the Preview section. Generates all 4 upload slots × (SVG + PNG) + the composite preview (SVG + PNG, marked NOT FOR UPLOAD) + a README.txt with submission steps, MC color fields, layout dimensions, "what must not appear" list, and naming conventions. Uses the existing `createZip` store-mode encoder from `src/lib/chrome/zip.ts` — no new dep. Brand-ops now goes from 8 button clicks (SVG+PNG per slot) to one click for an entire BIN submission package. Also added a "Preview SVG" + "Preview PNG" button alongside for quick visual exports. State machine: idle → building → done → idle with visible "Downloaded ✓" confirmation. |
| Card art configurator: MDES layout spec verified + encoded | (staged for next release) | 2026-05-15 | Fetched [Mastercard's Tokenizing Account PANs docs](https://developer.mastercard.com/mdes-digital-enablement/documentation/use-cases/mdes-for-merchants-use-cases/#creating-a-combined-image-from-components) directly via Playwright (the SPA returns empty bodies to WebFetch — Playwright renders JS). Captured the official layout diagram + accessibility-tree snapshot to `.knowledge/cardart-source/mdes-{layout-diagram.png,spec-snapshot.md,spec-page.png}`. Resolves every "unresolved" item from the 2026-05-14 audit pass: **cobrand/issuer height = 283** (confirmed; Verestro's 293 was a typo); **A = 82 (side padding), B = 57 (top/bottom padding), C = 1372 (logo-area width), D = 283 (logo-area height), E = 459 (brand-logo width)**. Brand logo (the MC circles mark) is supplied by Mastercard at composite time — we don't upload it; we just need to leave a 459×283 safe zone bottom-right at canvas offset `(995, 629)`. Layout: top strip at `(82, 57)` for cobrand+issuer (1372×283 — split LEFT/RIGHT when both present; full width when cobrand-only), brand-mark slot bottom-right (459×283). Icon slot is PNG-only (PDF explicitly unsupported); other slots accept PNG (RGB+alpha) or PDF vector. **Code changes** (`src/lib/chrome/card-sources.ts`): added `CARD_LAYOUT` constants exposing the spec values + canvas positions + safe zone; rewrote the header comment block with an explicit "must not appear" list (PAN, name, expiration, CVC, EMV chip, NFC symbol, MC brand mark, rounded corners) and an ASCII layout diagram; rewrote `cardPreviewSvg` to honour the real MDES composite (cobrand at `CARD_LAYOUT.positions.cobrandIssuerBand`, MC brand mark at `CARD_LAYOUT.positions.brandLogo` with two-circle sizing fit to E×D). New `cardPreviewSvg(variant, { safeZone })` option overlays translucent yellow rectangles showing the cobrand strip + brand-mark slot + outer padding zone — visualises where MC overlays will land so brand designers can validate any new background design doesn't crash into MC's regions. Wired through the public endpoint: `/api/card/<variant>/preview?safeZone=true` exposes the overlay. Audit doc rewritten with "every unknown resolved" table replacing the speculative triangulation prose. **No engineering blockers remain**; brand team still owes 6 BIN-specific variants + final designs + decision on issuer-logo strategy (real mark vs 1×1 transparent placeholder). |
| MCP cross-namespace fix (Issue: invented wordmark on 2FA page) | (staged for next release) | 2026-05-14 | **Severity-High bug fix.** Consumer agent built a 2FA login page using the Dashbook skill, was routed exclusively into `product_*` (where logos don't live), never discovered `marketing_get_logo`, and shipped an invented "D in a jade square" wordmark. Three reinforcing failures fixed: (1) **Skill prose** rewritten — namespace table now has a cross-cutting row for "Page chrome inside a product screen" mapping to both namespaces; workflow gains a **Step 0 — Chrome check** ("call `marketing_get_logo` first when building anything with a header/footer/auth shell"); brand-rules invariant **"Wordmark is single-source"** added with explicit anti-pattern list (no AI-imagined glyphs, no initials, no jade squares); MCP-unavailable fallback rule says use only typographic-mono "Dash" or labelled placeholder slot. (2) **MCP surface** — added **`product_get_logo`** as a thin proxy over `marketing_get_logo` (same input/output, marked `proxiedFrom`), and new **`product_get_page_template`** that returns composed scaffolds for 5 auth surfaces (auth-signin · auth-signup · auth-2fa · auth-magic-link · auth-reset) — each with `{ chrome: { logo, header, footer }, layout: { maxWidth, padding }, copyTokens, requiredComponents, notes }`. The product namespace is now self-sufficient for chrome-bearing surfaces. (3) **Chrome category in catalogue** — new `src/lib/specs/components/chrome.ts` defines `wordmark` / `page-shell` / `auth-footer` / `partner-cobrand` ComponentSpec entries; `product_list_components` now accepts category=`Chrome` and tool descriptions explicitly point chrome work into it. **Boundary signal added at tool-discovery time** — every `product_*` tool description ends with `PRODUCT_NON_FEATURES` constant: "the product_* namespace does not contain brand wordmarks, partner logos, legal disclosures, or marketing palette tokens — those live in marketing_*". Mirrored for `marketing_*`. This teaches LLM clients the namespace boundary at MCP introspection time, not just skill-load time. `@dashfi/mcp-server` bumped 0.1.0 → 0.2.0 (additive feature release). **Validation:** replay `/dashbook:dashbook-design-system create 2FA auth page in standalone html` and assert the tool trace includes `product_get_logo` (or `marketing_get_logo`) before HTML write; assert the file embeds the canonical wordmark SVG, not an invented glyph. Extend eval set with the 5 chrome-bearing auth surfaces. **Open follow-up:** Bai Jamjuree `googleFontsUrl` in `product_get_foundation('typography')` deferred (deliberate — PP Supply Mono is paywalled, must NOT auto-link; Bai is OFL-licensed and safe to auto-link; defer to dedicated webDelivery work). |
| Patterns Tier 3 (Pages) full-depth — 6 patterns via parallel subagents | (staged for next release) | 2026-05-14 | All six remaining Tier-3 page-level patterns promoted to full-depth in parallel via 6 background subagents. **`tabbed-section-counts`** — interactive 4-tab strip (All · Pending · Settled · Disputed) with status-coded count Pills (warning/danger), filters lib `Table` to the active tab, 8 mock rows. Code pair: `+layout.server.ts` returning `counts` from one query + `+layout.svelte` with URL-routed `<a href>` tabs and `isActive()` helper (`===` for index, `startsWith` for children). **`workflow-data-table-page`** — header (label + h2 + lede + brand "Issue payment" CTA) + filter row (`SearchFilter` + 2× `SelectFilter`) + selectable Table (6 mock invoice rows with `Checkbox`/`Pill`/MoreHorizontal row action) + Pagination footer + sticky-bottom bulk-action bar that fades in on selection (count + Approve/Reassign/Export/Clear). Code shows full `DropdownMenu` row-actions wiring + SvelteKit form-action bulk bar with hidden `ids` inputs. **`dashboard-summary`** — Workspace eyebrow + h2 + lede, 3-Button outline quick-actions row, 4-tile metric grid with mono uppercase eyebrow + large mono value + semantic `Pill` (success/warning/info/danger), 60/40 split with lib `Table` recent activity + Quick stats aside. Code shows loader-driven tiles via `{#each metrics}`. **`multi-section-settings`** — two-column page: 200px sticky anchor nav + scrollable right column with 5 sections (Profile · Contact · Security · Notifications · Integrations) using real `Label`/`Input`/`Switch`/`Separator`/`Button`/`Pill`. `IntersectionObserver` keeps the active anchor honest on direct scroll; click handler smooth-scrolls. Code shows the production wiring. **`multi-step-onboarding`** — interactive 4-step flow (Business · Contact · Banking · Review) with stepper indicator (jade filled+check / outline / muted), step-state persists across moves, completed-step jump-back, Continue becomes "Submit application" on review step. Code pair: `+layout.server.ts` with `ORDER` array + `furthestStep` redirect guard + `+layout.svelte` with stepper-as-link + Back/Continue footer + form-action submit. **`terminal-state`** — three variants stacked (Success / Failure / Blocked) inside ONE PreviewCanvas; real `Pill` + `Button` + Lucide icons (check-circle-2 / x-circle / shield-alert); Blocked variant has ZERO CTAs by design. Rationale explicitly contrasts Empty (creates data) vs Terminal (ends a flow). Code shows the success-route shape + note that terminal pages render WITHOUT the protected-app-shell. All 6 dropped their `draft: true` flag in `patterns.ts`. `uses` arrays corrected to honest sets (e.g. `multi-section-settings` dropped `Sidebar`/`Card` per its own anti-pattern). PLAN.md §8 table flattened — Status column dropped since every row is Done. |
| Patterns Tier 2 (Shells) full-depth | (staged for next release) | 2026-05-14 | All three Shells patterns promoted to full-depth. **`protected-app-shell`** ships with a live preview using real `SidebarProvider` + `Sidebar` (collapsible=none for in-page mount) + `SidebarInset` — 540px contained frame with header (brand mark), two `SidebarGroup` blocks (Workspace + Admin) where nav items are filtered through `perms` + `flags` predicates, `SidebarFooter` with user-menu, and a topbar+content area showing 3 metric tiles. Paste-ready code mirrors the production wiring with `$page.url.pathname.startsWith()` active-route highlighting and a `nav.filter()` permission gate. 4-subsection rationale (Why · Decisions × 6 · Responsive strategy · Source) + Variations (pinned context bar, floating variant, right-side, without-sidebar + 3 anti-patterns). **`auth-split-screen`** ships with a 50/50 grid preview — jade brand pane on the left (mark, eyebrow, headline, lede, footer) and a form column on the right with real `Input` + `Label` + `Button` (brand variant) for email/password. Code pair: `(auth)/+layout.svelte` (the grid shell, with mobile collapse) + `(auth)/login/+page.svelte` (the form). 4-subsection rationale (decisions × 6: 50/50 split, brand-left, form max-width, single-affordance, jade-not-cobalt, no-top-nav) + Variations (hero artwork, centered single-column, SSO+email split, multi-step + 3 anti-patterns). **`sub-section-tabs`** ships with a working tab-strip preview that updates content per click (5 tabs: Overview · Activity · Cards · Members · Settings, three with live Pill counts). Code shows the production `(protected)/settings/+layout.svelte` with URL-derived active-state via `$page.url.pathname` and a `tabs.filter()` permission gate. 4-subsection rationale (decisions × 6: URL-routed, live counts, header-in-layout, row-not-sidebar, bottom-rule indicator, exact-path index) + Variations (status-pill counts, icon-prefixed, right-aligned action, delta indicators, permission-gated tabs + 4 anti-patterns). Both shells use real lib components (SidebarProvider works contained via `!min-h-0 !h-full` class override). PLAN.md §8 status table updated. |
| **v1.0.0 release cut** | **v1.0.0** | **2026-05-18** | First declared-stable release. `package.json` 0.9.0 → 1.0.0, `packages/mcp-server/package.json` 0.1.0 → 0.3.0, Footer badge `v0.9.0` → `v1.0.0`. New repo-root `CHANGELOG.md` in Keep-a-Changelog format covering: 60 components + 17 patterns + 9 foundations, 17 MCP tools across product_*/marketing_* + cross-namespace boundary signals, distribution (Code plugin + Cowork + claude.ai Connector), static JSON + asset API, card-art configurator with MDES bundle download, brand voice + partner kit + legal disclosures, /use audience runbooks. `/changelog` page entry mirrors with "Latest" badge moved from v0.9.0. Drives external comms — the per-line Done entries below get folded under the v1.0.0 umbrella for external readers. |
| Internal section gating — components / patterns / developers | (v1.0.0) | 2026-05-18 | **Three sections (`/components`, `/patterns`, `/developers`) gated to dashfi-internal viewers.** They reveal component implementation, design-system architecture, and install-in-the-monorepo specifics that aren't appropriate for public/press. **Mechanism: shared passphrase + HMAC-signed cookie.** Vercel's paid Deployment Protection was ruled out; this is the free identity-less alternative. New `src/lib/server/internal-auth.ts` (~110 LOC) exposes `guardInternal()` + `checkPassphrase()` + `setInternalCookie()` using Node's `crypto.createHmac` and `timingSafeEqual`. Cookie `dashbook_internal=<expiresAt>.<sha256-hmac>` is httpOnly + secure + sameSite=lax + 90-day maxAge. Three new `+layout.server.ts` files in `/components`, `/patterns`, `/developers` opt out of prerender and delegate to `guardInternal` — unauthed visitors get a 303 redirect to `/internal-login?return=<original-path>`. New `/internal-login` route (server action + form) validates the passphrase with a 1.2s constant delay on failure to slow brute-force, then sets the cookie and 303s back. **Public-nav hardening (already landed earlier in the same change set):** `NavItem` got an `internal?: boolean` flag, the three entries are marked `internal: true`, `Header.svelte` filters `!item.internal` from the top-level nav, ⌘K search-index drops `Component` / `Pattern` / `Developer` entries (shrinks bundle by ~77 entries), home audience tile "For engineers" repointed from `/components` → `/use/dev`. **Not touched** (deliberate): `Sidebar` / `InnerPage` section resolution still uses unfiltered `primaryNav.find()` so authed team members get correct chrome; `/use/*` internal links resolve fine for authed visitors and bounce unauthed ones to login; home metric tiles + dogfood link to `/components` likewise; `/api/*` JSON endpoints stay fully public (separate data interface). **User action**: set `DASHBOOK_INTERNAL_PASSPHRASE` + `DASHBOOK_INTERNAL_SECRET` env vars locally in `.env.local` and in Vercel dashboard. See §11 for the env-var recipe. |
| Release-strategy deliverables | (v1.0.0) | 2026-05-18 | Three artefacts authored alongside the version cut to ship the system safely to the team. (1) **`.knowledge/release-slack-posts.md`** — drafts for #general (~330 words: what Dashbook is, the four roles, links, claude.ai Connector how-to) + #engineering (~475 words: install paths, the canonical workflow loop, JSON API for non-Svelte stacks, the dashfi-ui rebase plan, where to file issues). Date + maintainer name left as `<TBD>` for the user to fill. (2) **`.knowledge/visual-regression-strategy.md`** — ~330-line plan covering 5 failure modes (lib drift, API drift, pattern drift, ui regression, token drift), the 3 tooling options (Chromatic, Playwright, manual) with hybrid recommendation (Chromatic for lib, Playwright for dashbook, manual for the immediate dashfi-ui cutover), phased rollout (Phase 1 immediate manual checklist → Phase 2 Playwright on 20 routes → Phase 3 Chromatic on the lib), full Playwright code sample + gotchas + baseline workflow, named-route checklist for both surfaces, rollback procedure (3 paths), lib-bump workflow appendix. (3) **`.knowledge/cutover-runbook-dashfi-ui.md`** — 173-line 1-pager for dashfi-ui engineers rebasing on top of design-vnext. Sections: pre-merge prep (lib/portal checks, conflict-prone patterns to flag), merge-day rebase sequence with exact commands (`pnpm nx run dashfi-ui-app:typecheck`, `git rebase master`, `--no-frozen-lockfile`), 5-route visual smoke test with expected vnext changes (buttons / pills / sidebar / squircles / shadows), common rebase issues with fixes, file-issue vs fix-forward vs rollback decision matrix, post-rebase guidance (`--force-with-lease`, 24h prod watch), help channels. All three follow Dash.fi voice (sentence case, no exclamations, no emoji, numerals). |
| Component change flow — canonical runbook | (process) | 2026-05-29 | After two cycles of lib-and-dashbook coordination (Badge/Pill consolidation v0.1→v0.2 + the `--success` / `--warning` token follow-up v0.4), the cross-repo flow was captured as a runbook so future component work is checklist-driven instead of rediscovered. **New `.knowledge/component-change-flow.md`** — TL;DR loop, repo map (lib + dashfi-ui + dashbook, who consumes how), one-time npm-token setup, the four-step flow (lib edit → typecheck → bump → commit → publish → dashbook docs → bump dep → install → check → commit), gotchas table decoding every error from this session (`ERR_PNPM_GIT_UNCLEAN`, `ERR_PNPM_GIT_NOT_CORRECT_BRANCH`, 403 2FA, 402 access-public, `EBADDEVENGINES`, `#`-in-env-value, stale-lockfile, PLAN.md conflict, rebase commit-message preservation), and hygiene rules learned (stories file only renders its own component; Tailwind palette colors in the lib are a missing-token smell; lib is code-truth, dashbook documents). **Core CLAUDE.md updated** with a "Design system component changes (lib → npm → dashbook)" section pointing at the runbook + a quick-reference publish command block — so Claude sessions starting in core find the flow at session start. |
| Badge variant expansion — cobalt secondary + yellow + dark-mode brand text fix | (lib v0.2.0) | 2026-05-28 | **Follow-up to the Badge/Pill consolidation below**, after design feedback that the v0.4.0 `secondary` (transparent + foreground) was an empty distinction from `outline` (transparent + muted). Lib refactor on the same `EN-XX/follow-up-redesign-tweaks` core branch — published as `@dashfi/svelte@0.2.0`. (1) **`secondary` redefined → cobalt-filled** (`bg-cobalt text-cobalt-foreground border-cobalt`). The new cobalt `secondary` is the marketing-leaning / alternate brand emphasis (jade is product, cobalt is marketing — both now reachable from one Badge prop). All existing dashfi-ui `<Badge variant="secondary">` sites were migrated to `outline` in the core PR so production rendering is unchanged; the cobalt look is opt-in for new code. (2) **New `yellow` variant** filled with `#EBFF00` + ink text. Sparing — meant for genuinely attention-grabbing badges (limited promos, hard-to-miss notices); heavy use loses sparing-ness, doc'd in JSDoc + `nonFeatures`. (3) **Dark-mode `brand` text fix** — `--brand-foreground` in dark mode was white; lighter-jade dark-mode background made white-on-light-jade sub-WCAG (~3.1:1). Switched to ink (`0 0% 0%`) for clean contrast. (4) **New tokens** in `libs/svelte-components/lib/src/lib/styles/global.css`: `--yellow` + `--yellow-foreground` (both modes), `--cobalt` + `--cobalt-foreground` for dark mode (were missing). Tailwind config registered `yellow` color. Final Badge emphasis ladder: `default` (ink) > `brand` (jade) > `secondary` (cobalt) > `yellow` > `outline` (quiet). **Dashbook side (this PR)**: `badge.ts` spec rewritten with 5 variants and the new tokens; `+page.svelte` preview shows the 5-variant Variants canvas + an "emphasis ladder" in-context canvas; Badge-vs-Pill comparison table examples row swapped to demonstrate the new variants; per-component v0.5.0 changelog row added; `package.json` `@dashfi/svelte: ^0.2.0`; lockfile regenerated. `pnpm check` → 0 errors. |
| Badge / Pill taxonomy consolidation | (lib v0.1.0) | 2026-05-28 | **Badge and Pill split into a clean responsibility pair** (`@dashfi/svelte` core branch `EN-XX/follow-up-redesign-tweaks`, published as v0.1.0). Badge initially kept four categorical / decorative variants — `default` (ink fill), `brand` (jade fill), `outline` (transparent + hairline border + muted text), `secondary` (transparent + hairline border + foreground text) — and gained a `size` prop (`xs` h-4 px-1, `sm` h-5 px-1.5, `md` h-[18px] px-2 py-0.5, default `md`). Dropped from Badge: `success`, `warning`, `info`, `destructive`, `ghost` (the semantic-state variants moved to Pill, where they belong). Pill keeps its existing five-type semantic surface — `base`, `info`, `success`, `warning`, `danger` (note: `danger`, not `destructive`). The clean split: **Badge encodes WHAT something IS (category, visual style); Pill encodes WHAT CONDITION something is in (semantic state).** Industry-fuzzy parallel: shadcn/ui has only Badge; Material has Badge (notification dot) + Chip (interactive); Polaris uses Badge for status. The names are arbitrary — what matters is the codebase picks one taxonomy. Changes: (1) `src/lib/specs/components/badge.ts` rewritten — 9 variants → 4 variants, new `sizes` array, new `whenToUse` field, JSDoc-matched description, v0.4.0 changelog row. (2) `src/lib/specs/components/pill.ts` updated — added `whenToUse`, fleshed-out non-features (call out `danger` not `destructive`, no category variants), v0.4.0 changelog row. (3) `src/lib/specs/types.ts` — new optional `whenToUse?: string` field on `ComponentSpec` for "this vs that" disambiguation, rendered prominently above the preview when present. (4) `src/routes/components/badge/+page.svelte` and `src/routes/components/pill/+page.svelte` — preview rebuilt to show variants + size showcase, both pages opening with a "When to use" block and closing with an inline **Badge vs Pill** comparison table (Encodes / Examples / Variants / Typography / Radius). Comparison tables render live `Badge` and `Pill` instances in the Examples row so the reader sees the visual difference, not just words. (5) `package.json` — `"@dashfi/svelte"` initially bumped to `"^0.1.0"` (superseded by the v0.2.0 row above before this PR ships). |
| Component-anatomy precision pass — full library (60 components) | (staged for next release) | 2026-05-13 | **All 60 component docs pages** now carry a v0.3.2 anatomy section regenerated against the `EN-XX/design-vnext--sidebar-feature` branch. Extends the v0.3.1 precedent (18 components) to cover every entry under `src/routes/components/`: overlays (alert-dialog/drawer/dropdown-menu/fullscreen-dialog/hover-card/popover/sheet/sonner/support-modal/tooltip), form/data inputs (form/multi-select/phone-input/tel-input/toggle/toggle-group/calendar/range-calendar/date-range-selector), data + layout (code-block/data-table/enhanced-table/table/table-filters/pagination/accordion/collapsible/empty/navigation/scroll-area/item), feedback (alert/alert-error/indicator/linear-loader/loader/skeleton), and specialty (breadcrumb/command/flow-lines/magnetic-hover/merchant-logo). Each page's `{#snippet anatomy()}` rewritten with the canonical 6-subsection structure (Dimensions, Tokens, Composition, Not part of X, Props, Porting). Resolved values inlined (e.g. Table head 48px text-xs tracking-wider uppercase; Popover panel 288×16-radius shadow-lg over `--color-popover`; Calendar day cells `size-8` icon-buttons). Per-component v0.3.2 changelog row added (2026-05-13). Final `pnpm check` runs with 0 errors, 9 pre-existing warnings (chrome / changelog files). Original work was split across four parallel agents that all stalled on watchdog timeouts within the first 600s of execution — recovery was completed manually in the main session. |
| Marketing pattern & component library (`marketing_*`) | (staged for next release) | 2026-06-03 | **First cut of the marketing-side component & pattern library** — the marketing counterpart to the product component specs, but sourced from the dash.fi website (Astro 6 + Tailwind v4 + React islands) rather than `@dashfi/svelte`, so documented as recipes (DOM + `--m-*` token roles + gotchas + prop signatures pulled from source). Realizes the "marketing patterns (public, content deferred to follow-on brainstorm)" surface noted in the migration plan below, built from the `20260603-marketing-component-patterns.md` brief. **Tokens** — expanded the `--m-*` layer from 10 thin aliases to a ~20-role semantic set (surface / surface-2 / card · fg-strong/muted/subtle · border/-strong · accent/positive/warn/negative + -soft/-border), each with a light + dark value, plus a `data-tone` convention and an attribute-flipped dark variant (`[data-marketing-dark]`) decoupled from the product `html.dark`. New `marketingRoles` export in `src/lib/tokens.ts`, mirrored in `src/app.css`; one new primitive `--dash-jade-lifted` #5BB8B0. Color rules baked in: money/positive = jade, negative/violations = monochrome ink (never red), warn = amber (hex provisional, flagged to reconcile with `/shipping`). **Foundations (5)** at `src/lib/specs/marketing/foundations/*`: tokens, typography (PP Supply Mono 200 display + tracked mono eyebrows + Bai Jamjuree body + canonical copy unit + faux-bold gotcha), layout (container, full-bleed, alternating copy↔media rows, mobile blow-out fix), section rhythm (paper/cream/ink/cobalt bands), motion (reveal / ambient loops / anchors — reduced-motion-safe). **Patterns (8)** at `src/lib/specs/marketing/patterns/*`: CenteredHero, SlideFrame, section-intro (eyebrow + copy unit), feature-tabs (`marketing_feature_tabs`), product-shot (`marketing_product_shot`, scale-to-fit), squircle-button (`marketing_button`), chip (`marketing_chip`), and astro-scoped-styles (the brief's flagged #1 gotcha). **MCP** — 3 new tools (`marketing_list_patterns`, `marketing_get_pattern`, `marketing_get_foundation`) + `marketing_search` extended with `pattern` + `foundation` kinds. **Docs** — new internal `/marketing` section (index + 5 foundation pages + 8 pattern pages) via new `MarketingPatternLayout` + `MarketingAnatomy` render components, with live `--m-*`-driven previews; registered in `nav.ts` + new `content/marketing.ts` + `search-index.ts` (new "Marketing" ⌘K section). New spec types: `marketing/foundations/types.ts` + `marketing/patterns/types.ts` (reuse the product `DimensionEntry`/`VariantSpec`/`PropDef`/`ChangelogEntry`). `pnpm check` → 0 errors; `pnpm build` → 14 new routes prerendered. Lockfile aligned `@dashfi/svelte` ^0.2.0 → ^0.4.0 to match the existing `package.json` specifier (pre-existing mismatch that broke `--frozen-lockfile`). Prop signatures defer to the website source (not bundled here), matching the brief's "pull from source" intent. |
| Marketing catalogue build-out — full §3 set | (staged for next release) | 2026-06-03 | **Completed the marketing pattern catalogue to the brief's full §3 set — 38 patterns + 5 foundations.** Extends the first-cut row above with four batches, each on the same spec → MCP → docs-page template: **CTAs & closers** (SplitCTA, CTASection, SectionCTA, HomeFinalCTA); **Content blocks** (FeatureGrid, FeatureColumns, FeatureList, ThreeCardRow, NumberedCardRow, StepTimeline, PlatformBullets, PlatformShowcase, UtilityTiles); **Heroes & layout frames** (Hero, AsymmetricProductHero, ProductHero, CosmicHero, TwoColSlide); **Rhythm & connectors** (BigQuote, Marquee, StatTrio, StatStrip); **Media & proof** (TestimonialCard, CaseStudyCard, LogoRail, CustomerPlatformsRail, PinnedShowcase, DashfiWordmark); **Building blocks** (Duotone icon → `marketing_duotone_icon`, Live widget → `marketing_live_widget`). Each is a typed `MarketingPatternSpec` + a docs page with a live `--m-*`-driven preview, auto-flowing into `marketing_list_patterns` / `marketing_get_pattern`, the `/marketing` index, the sidebar, and the Marketing ⌘K section. Page-specific shipping examples (OverchargeCards, AlgoEdgeBlock, ProductTileGrid, CarrierBrief, ContractAuditMock) were folded into their generic site-wide patterns (card rows, tile grid, live-widget) per the brief's "nothing here is page-specific" purpose. DashfiWordmark documents the wordmark as a single-source asset (fetch via `marketing_get_logo`; never reconstruct/redraw) and the preview renders the real `Wordmark` component. The content-blocks / media-proof / rhythm / building-block batches were authored by parallel sub-agents against the established type + exemplars, then merged + verified centrally. `pnpm check` → 0 errors; `pnpm build` → 44 marketing routes prerendered (1 index + 5 foundations + 38 patterns). |
| Marketing patterns — source reconciliation vs `/shipping` flagship | (staged for next release) | 2026-06-04 | **Reconciled the marketing pattern library against the real dash.fi website source** (read locally from `trlmkb/dashfi` `main` at `www.dash.fi`), replacing the brief-only basis for the `/shipping`-grounded specs. Scope (per request): the flagship `/shipping` (AI Shipping Audit) index page only — all 11 `Ship*` components + the `--ship-*` token layer + 5 screenshots (card hero, audit hero/forensic widget, feature-tabs, product shots, dark band). Findings doc: `.knowledge/shipping-page-analysis.md`. **(1) Real amber token** — replaced the provisional `--m-warn` `#B5751A`/`#E0A64D` with the real `--ship-warn` `#B86400` (light) / `#D99A3C` (dark), corroborated by product `tokens.css --warning: #B86400`; updated `src/lib/tokens.ts` (`marketingRoles`: m-warn + -soft + -border, dropped "PROVISIONAL"), `src/app.css` (`:root` + `[data-marketing-dark]`), and an inline 5th spot in `chip.ts`. **(2) Spec reconciliation** — repointed `source:` to the verified components and removed `sourceNote` on the 6 flagship-grounded specs (squircle-button, chip, duotone-icon, feature-tabs, product-shot, live-widget); corrected drift the brief got wrong: squircle is a global `!important` override on the CTA list + the product Button primitive (not each component's own radius), press-scale `.97 → .98`; chip has two leading-marker variants (dot + check); duotone fill-opacity `.16 → .18` and uses literal per-module hues (#c2410c/#2b605c/#6d4bd1/#1d6fb8); product-shot fit uses a window `resize` listener (not a ResizeObserver); accent verified = jade (the CSS header comment's "cobalt" is stale v0), so `--m-accent` already correct; source dark attribute is `data-ship-dark` (renamed to `data-marketing-dark` here). **Deferred** (out of scope, `sourceNote` retained): ~31 specs sourced from `slide/`·`rhythm/`·`sections/`, exercised on the `/shipping/audit`·`/analytics`·`/contracts` deck pages rather than the flagship index. `pnpm check` → 0 errors; `pnpm build` → succeeds, amber `#B86400` confirmed in prerendered output. Branch `claude/friendly-cray-li0ZE`. |
| Marketing page builder — simplify pass (4-angle review) | (builder v0) | 2026-06-27 | Ran a 4-agent quality review (reuse · simplification · efficiency · altitude) over `src/lib/builder/` before PR. **Applied** (behavior-preserving, re-verified on :5173 — repeater add/move + all 3 export tabs still work): (1) ExportPanel collapsed 3 eager `$derived` (json/astro/recipe all computed on open) → 1 keyed on the active tab. (2) Extracted `src/lib/chrome/clipboard.ts` `copyToClipboard()` — ExportPanel was the 3rd inline copy of the writeText-then-flash pattern (CodeSnippet + CopyValue have it too; timeout had already drifted 1200↔1500ms); ExportPanel now uses the shared helper. (3) Inspector hoisted the per-row `items(field)` double-call to a single `{@const list}`. `pnpm check` → 0 errors. **Deferred to a focused follow-up PR** (high-value but high-surface refactors not worth rushing onto freshly-verified code): (a) `registry.ts` `defaults` objects duplicate `fields[].default` ~230 lines — derive via an `Object.fromEntries(fields.map(...))` helper; (b) extract shared block CSS / a `<Band>` wrapper — eyebrow/display/lede/`.m-btn` styles are copy-pasted across 8/3/4/5 blocks; (c) the `inline` field type is dual-handled (Inspector text input **and** on-canvas `<Editable>`) — tightening to canvas-only would remove working panel editing, so it's a product call, not a silent cleanup. **Kept as-is** (intentional headroom / honest special-cases): boolean+number Inspector field arms, `setDevice` wrapper, dark-cta-band opting out of the band system. |
| Marketing page builder — +4 Content blocks (14 total) | (builder v0) | 2026-06-27 | **Added the Content set**, authored from the marketing specs on the established pattern (band helper · repeaters · `--m-*` tokens · eyebrow as inspector `text` not inline, so they're robust regardless of inline-editing status): `FeatureListBlock` (checked title+desc rows), `NumberedCardRowBlock` (auto-numbered 01/02/03 step cards), `StepTimelineBlock` (vertical numbered timeline with connecting line), `FeatureColumnsBlock` (icon+heading+body columns with dividers, icon via the `icons.ts` select). Registry now **14 blocks** — Content category went from 3 → 7 (section-intro, feature-grid, three-card-row, faq, feature-list, numbered-card-row, step-timeline, feature-columns). `pnpm check` → 0 errors. **Not live-verified** — same dual-dev-server constraint: a second vite on the shared `.svelte-kit` dir conflicts with the server already on :5173 (blank pages), and running it risks destabilizing that server, so I stopped it. These 4 are low-risk (identical shape to the 10 verified blocks). Quick smoke test on the running server: open the picker → 14 blocks, Content group now has 7; drop in Feature columns / Step timeline / Numbered cards and edit their repeaters. |
| Marketing page builder — nav link · Astro export · on-canvas inline editing | (builder v0) | 2026-06-27 | **Three polish items.** (1) **Nav link** — `{ title: 'Page builder', href: '/marketing/builder' }` added as the first child of Marketing in `nav.ts`, so it's discoverable in the sidebar + ⌘K instead of a secret URL. (2) **Astro markup export** — `pageToAstro()` in `export.ts` emits an `.astro` scaffold: PascalCase component tags (`hero`→`Hero`) with the edited props as attributes (strings inline, arrays/objects in `{…}` braces), plus a placeholder import block the team repoints at the real www.dash.fi components. New **Astro** tab in the export panel (JSON · Astro · Recipe), downloads as `.astro`. This is what closes the loop toward shipping a real page. (3) **On-canvas inline editing** — new `Editable.svelte` (contenteditable span that syncs from `value` only while unfocused so the caret never fights; Enter blurs; paste-as-plaintext) + `SectionRenderer.svelte` (provides a per-section `builder-edit` context with `isEditable`/`onEdit`; one instance per placed section). The canvas now renders `<SectionRenderer {node}/>`; the four blocks with `inline` fields (hero, section-intro, split-cta, dark-cta-band) render eyebrow/heading/accent via `<Editable>` — click a selected section's heading and type, with a dashed-outline affordance. **Bug found + fixed**: moving the accent into the `<Editable>` child component broke the block-scoped `.display .accent` color selector (child markup isn't reached by parent scoped CSS) — fixed with scoped `:global()` (`.display :global(.accent)`) in all 4 blocks. `pnpm check` → 0 errors. **Verification note**: P0–P3 were all live-verified in preview; this batch is typecheck-clean + logic-reviewed but was NOT live-verified — a second dev server conflicts with the one already running on :5173 (two vite instances corrupt the shared `.svelte-kit` dir → blank pages), so self-driving the preview wasn't possible without disrupting the active server. Inline editing in particular wants a manual smoke test (see report). |
| Marketing page builder — P3 export (JSON + recipe) | (builder v0) | 2026-06-27 | **The composed page can now leave the sandbox.** New `src/lib/builder/export.ts` — `pageToJSON` (pretty `JSON.stringify` straight off the `$state` proxy — works where structuredClone didn't, since stringify only reads getters), `pageToRecipe` (human-readable section list: `1. Hero · surface — "Spend less on"`), `downloadText` (Blob + anchor). New `ExportPanel.svelte` modal — JSON / Recipe tabs, Copy (clipboard, graceful try/catch fallback), Download (.json / .txt), Done. Wired an **Export** button into the top bar (ink fill, disabled when empty) + `exportOpen` state. The JSON shape is exactly the marketing recipe model (`{sections:[{id,blockId,props}]}`) so a dev or future codegen consumes it directly. **Verified live**: build Hero + Stat trio → Export → JSON parses, 2 sections, nested stats repeater serialized correctly → Recipe tab renders the readable summary → screenshot of the full builder (canvas + inspector repeater + export panel). Clipboard is blocked in the headless preview (no trusted gesture) — the try/catch degrades gracefully; works on a real click. `pnpm check` → 0 errors. **Builder status: P0–P3 done.** v1 is functionally complete (10 blocks · picker · schema inspector incl. repeaters · background bands · undo/redo · drag-reorder · localStorage autosave · JSON/recipe export). **Remaining polish**: on-canvas inline text editing (inspector already edits these fields), markup/Astro export from spec `dom` templates (stretch), surface a link from `/marketing` index, optional internal-gate. |
| Marketing page builder — P1 complete (10 blocks) + P2 drag-reorder | (builder v0) | 2026-06-27 | **Finished the v1 block set and added section drag-reorder.** Five more blocks authored from the marketing specs (`--m-*` tokens, self-contained bands): `TestimonialBlock` (single centered quote — carousel rotation dropped for the editor), `LogoRailBlock` (repeater of label + optional image-url, renders `<img>` when a src is set else text), `ThreeCardRowBlock` (repeater of title/body/link, squircle cards), `FaqAccordionBlock` (renders static Q/A list in the editor — shipped page uses the interactive accordion), `DarkCtaBandBlock` (jade radial-glow closer, always-dark, no background prop). Registry now has all **10 blocks across 4 categories** (Heroes · Content · Proof · CTAs). **P2 drag-reorder**: native HTML5 DnD with a dedicated grip handle as the drag source (frames are drop targets) — dependency-free (no `svelte-dnd-action`), no conflict with section clicks/tools; drop-target shows a jade insertion line; reorder routes through `builder.reorder` so it's a single undo step. **Verified live**: picker lists all 10 grouped by category; added all 5 new blocks via insert-below (testimonial quote, 5-logo rail, 3 squircle cards, 3 FAQ rows, dark radial-gradient band all render); synthetic drag of section 0→2 reorders correctly and **undo restores order**; screenshot of logo-rail + three-card-row. `pnpm check` → 0 errors. **Deferred**: on-canvas inline text editing (the inspector already edits every field incl. `inline` ones, so this is polish not a blocker — flagged as the fiddliest piece in the design doc); JSON/markup export = P3. |
| Marketing page builder — P1 (picker · inspector · 5 blocks) | (builder v0) | 2026-06-27 | **Second slice — the builder is now genuinely usable to compose + edit a page.** (1) **Block picker** (`src/lib/builder/BlockPicker.svelte`) — searchable popover grouped by category, triggered by the empty-state and every insert-below `+`; replaces P0's direct-add-hero. `registry.blocksByCategory()` added. (2) **Schema-driven inspector** (`src/lib/builder/Inspector.svelte`) — right panel that renders editable controls purely from the selected block's `fields`: text / textarea / select / boolean / number / image-url / **repeater** (add / remove / move-up-down sub-items, each with its own typed sub-fields incl. nested selects). Edits flow through `builder.update`, which the canvas block reads reactively → **live preview**. (3) **Four new blocks** authored from the marketing specs, styled with `--m-*` tokens, each self-contained section band: `SectionIntroBlock`, `StatTrioBlock` (repeater of value/label), `FeatureGridBlock` (repeater of icon/title/blurb, icon via curated `icons.ts` select of 10 Lucide marks), `SplitCtaBlock` (copy + buttons + chips repeater). (4) **Shared band helper** (`blocks/band.ts`) — every block takes a `background` prop (surface / cream / ink) so the composer can build the alternating-band rhythm; ink flips `data-marketing-dark` for legible fg. (5) **Store**: `update()` now coalesces consecutive edits to the same field into one undo step (`#lastEditKey`), so typing doesn't flood history. Editor shell restructured into a `workspace` flex row (canvas + inspector). **Verified live in preview** (full flow): empty → picker (5 blocks) → insert Hero + Feature grid + Split CTA via insert-below → feature-grid renders 3 Lucide icons, split-cta renders buttons + chips → select a block → inspector opens → edit a repeater value (canvas live-updates `$300M+`→`$999M`) → change background to ink (band flips dark + `data-marketing-dark`) → add repeater item (3→4) → all persisted to localStorage draft → screenshot of a believable composed marketing page. `pnpm check` → 0 errors (2 new benign `corner-shape` Tailwind-v4 warnings, same as the marketing patterns). **Remaining**: ~5 more blocks (testimonial, logo-rail, three-card-row, faq-accordion, dark-cta-band) = rest of P1; on-canvas inline text editing + drag-reorder = P2; JSON/markup export = P3. |
| Marketing page builder — P0 scaffold (render loop) | (builder v0) | 2026-06-27 | **First working vertical slice of the page builder** per the design doc, on branch `EN-XX/marketing-page-builder`. New `src/lib/builder/`: `types.ts` (PageDoc/PageNode/BuilderBlock/BuilderField), `state.svelte.ts` (Svelte 5 rune store — doc + selection + device + undo/redo snapshot history + localStorage autosave, all session-only/no-backend), `blocks/HeroBlock.svelte` (first prop-driven block, authored from the `hero` spec, styled with `--m-*` tokens), `blocks/registry.ts` (block catalogue + `getBlock`). New route `src/routes/marketing/builder/+page.svelte` — lean editor shell: sticky top-bar (undo/redo · desktop⇆mobile device toggle · Clear), centered canvas, empty-state "+ Add section", per-section hover frame (jade selection outline + HERO label bar + duplicate/delete tools + insert-below `+`). **Verified live in preview** (render loop end-to-end): add → hero renders with jade accent (`#2b605c`) + PP Supply Mono display + CTA pair · auto-select · duplicate (1→2) · undo/redo (2→1→2) · mobile toggle constrains canvas to 390px · draft persists across full reload via `load()` on mount. **Bug found + fixed during verify**: `structuredClone(this.doc)` threw `DataCloneError` on the Svelte 5 `$state` proxy — swapped to `$state.snapshot()` (the purpose-built deep-plain-copy rune) in the history clone helper. `pnpm check` → 0 errors. Still P0: single block type (picker + remaining ~9 blocks = P1; schema-driven inspector + inline-edit + dnd-reorder = P1/P2; export = P3). **Preview note**: the session worktree (`.claude/worktrees/upbeat-wescoff-ddef21`, branch `claude/mcp-setup`) is stale and has broken deps; added a `dashbook-main` launch config pointing `pnpm -C /Users/zy/dev/dashbook dev` so the preview serves the real checkout. |
| Marketing page builder — design doc + 3-repo map | (design) | 2026-06-27 | **Researched + designed a minimal, session-only, drag-compose page builder for the marketing surface, to live in dashbook.** Two research passes (embeddable builder libs; big-name builder UX teardown) → `.knowledge/marketing-page-builder-design.md`. Key decisions: **home = dashbook** (SvelteKit) not www.dash.fi (Puck-needs-React, and session-only conflicts with shipping real pages); **tech = custom Svelte editor on `svelte-dnd-action`** (no mature Svelte builder exists; structured section-stacking doesn't need Puck's batteries); **UX = lean 3-zone** (thin top-bar, canvas with section stacking, right-inspector-on-selection, `+`-insert not drag-palette, inline-edit for content / panel for config, author-desktop-auto-mobile, undo/redo/duplicate table-stakes). **Honest reuse finding**: the 36 marketing previews are hand-written inline demos (not reusable prop-driven components) — only the `--m-*` token layer + spec `props` schemas are directly reusable, so ~10 v1 block components must be authored fresh from the specs (cheap: DOM + tokens + schema all exist). Page state = one serializable `{sections:[{blockId,props}]}` JSON tree (= the export format), session store + localStorage autosave, no backend. Phased plan P0–P4, ~4.5 dev-days for a polished v1 (dominated by block authoring). 4 open questions flagged (block source-of-truth, schema duplication, export consumer, gate-vs-public). Also updated `.knowledge/component-change-flow.md` with the canonical **3-repo map** (core `FunnelDash/core` · www.dash.fi `trlmkb/dashfi` · dashbook `trlmkb/dashbook`) + the insight that the marketing flow is the MIRROR of the product flow (website leads, dashbook reverse-documents). |
| Plugin marketing commands — `@dashbook` v0.2.0 | (plugin v0.2.0) | 2026-06-26 | **Six new slash commands cover the marketing surface in Claude Code** — closing the gap where the Dashbook MCP exposed full `marketing_*` tooling server-side but `/dashbook-...` slash commands only covered product (`dashbook-component`, `dashbook-port`) + voice. After the marketing pattern catalogue shipped (38 patterns, 5 foundations, ~16 MCP tools) the Code-side UX still showed "everything but marketing". New thin command wrappers in `claude-plugin/commands/`: (1) `dashbook-marketing-pattern <slug>` → `marketing_get_pattern` (auto-list via `marketing_list_patterns` if no slug). (2) `dashbook-marketing-foundation <slug>` → `marketing_get_foundation` (color / typography / spacing / motion / section). (3) `dashbook-marketing-asset <kind> [variant]` → routes to `marketing_get_logo` / `_card_art` / `_marketing_palette` based on first arg; auto-lists variants via `_list_logo_presets` / `_list_card_variants`. (4) `dashbook-partner-kit [partner]` → `marketing_get_partner_kit`, formatted with co-branding rules + verbatim legal disclosure + regulator references. (5) `dashbook-legal <kind>` → `marketing_get_legal_disclosure` with explicit "quote verbatim, never paraphrase" prompt. (6) `dashbook-marketing-search <query> [--kinds=...]` → `marketing_search` with grouped results + decisive-top-hit expansion. Each command is a 20-line .md with frontmatter (`description` + `argument-hint`), thin prose telling Claude which tool to call, and a numbered output format. `claude-plugin/.claude-plugin/plugin.json` bumped 0.1.0 → 0.2.0; `description` updated to mention marketing patterns + nine commands. `claude-plugin/skills/dashbook-design-system/SKILL.md` gained a "Slash commands" section listing all 9 commands grouped by namespace. Branch `EN-XX/plugin-marketing-commands`. |
| Component lib sync — `@dashfi/svelte` 0.5.0 (core #5116/#5062) | (lib v0.5.0) | 2026-06-04 | **Synced dashbook to the lib changes merged to core `master` since 0.4.0, published as `@dashfi/svelte@0.5.0`** (companion: core PR FunnelDash/core#5143 — version bump; 0.5.0 published to npm). Of the three flagged PRs, #5033 (auth-route polish) touched no lib code → no dashbook impact; #5056 (badge/pill/tokens) was already documented at v0.4.0. **Specs reconciled (7), each with a v0.5.0 changelog row (anatomy + MCP auto-derive):** Alert — left-accent strip → full 1px border at 40% + soft bg tint, `rounded-lg`, `px-4 py-3` (#5116); Sheet — left/right → floating inset panels (`inset-y-3 start-3/end-3`, `rounded-2xl`) (#5116); Sonner — `rounded-xl` + baked semantic toast tints (error/success/warning/info), no longer monochrome-by-default (#5116); Pill — icon support (`inline-flex gap-1` + `...restProps`) (#5062); Logo — LogoApp gradient cobalt `#344BEE`→ink `#262A36` ⇒ jade `#1A8577`→`#123B39` (#5116); PhoneInput — country-select trigger → transparent + right-border divider (#5116); Switch — unchecked track `--color-input` → `--color-muted-foreground/30` (#5116). Pill docs page gained a "With a leading icon" preview canvas. The lib's new `--success`/`--warning` product tokens are orphan (unused by any documented component — Alert/Sonner use brand/amber-500/sky-500) so not added to the token doc. `package.json` dep `^0.4.0` → `^0.5.0`; `pnpm check` → 0 errors; `pnpm build` → succeeds. Branch `claude/svelte-0.5.0-docs`. |

### In flight

- **Phase 6 / Press half** — Logos ✅ · Media contacts ✅ · Legal disclosures ✅ · **Partner kit ✅** (Powered-by-Dash badge + customer lockups + 8 do/don't rules, shipped v0.9.0 via `PoweredByBadge.svelte`) · Exec bios — **dropped on purpose** (exec exposure deemed inappropriate for the Press page; `$content/team.ts` deleted). Press half is effectively complete.
- **Migration to `core/packages/brand/` (decided 2026-05-12).** Dashbook moves into the core monorepo as the `brand` package, replaces the Vercel + `adapter-static` setup with `adapter-node` deployed via Terraform per core convention, gains two MCP endpoints (public + internal) and a Claude Code skill. New surfaces added during migration: marketing patterns (public, content deferred to follow-on brainstorm) and credit card art configurator (public, integrated into `get_press_asset`). Standalone `/Users/zy/dev/dashbook` is kept untouched as a reference until migration is verified end-to-end. This supersedes the prior v1.0 / `DEPLOY.md` Vercel plan.
  - Spec: `core/docs/superpowers/specs/2026-05-12-brand-source-of-truth-design.md`
  - Phase 0+1 implementation plan (copy + lift-and-shift): `core/docs/superpowers/plans/2026-05-12-brand-migration-phase-0-1.md`
  - **Phase 0+1 IMPLEMENTED 2026-05-12.** `brand-app` builds and serves inside `core/packages/brand/`. 91 pages prerendered. `nx run brand-app:typecheck` → 0 errors. `nx run brand-app:lint` → 0 errors. HTTP spot-check 14/14 pass. Two lib fixes applied during migration (`drawer-title`/`drawer-description` `bind:ref` → `bind:el`; `sheet-content` SSR guards) — see commit message in core repo for details.
  - **Phase 1.5 IMPLEMENTED 2026-05-13.** `EN-XX/design-vnext--sidebar-feature` merged into `EN-XX/dashbook` to bring in the new canonical lib aesthetic (hover:opacity-80, no shadows, [corner-shape:squircle]). All 3 lib-file merge conflicts were trivial — design-vnext had independently arrived at the same drawer+sheet fixes. v0.3.2 anatomy (60 component pages with rewritten anatomy blocks) and the new public `developers/from-another-stack` route (vanilla CSS tokens, fonts, React/Vue/RN/server-rendered recipes) synced from standalone `3cf6acb`. Re-lint cleanup (12 errors, all `svelte/no-navigation-without-resolve` regressions or unused-import reappearances). Build → 92 prerendered pages (was 91, +1 for from-another-stack).
  - **Stack-agnostic shift (2026-05-13).** Spec revised: components move fully public (no Code/Docs tab gating). MCP surface restructured around stack-agnostic `get_component(name, stack?)` that emits per-stack code from the canonical anatomy. `get_porting_guide(target_stack)`, `get_component_changelog(name)`, `list_porting_targets()` added. Internal MCP shrinks to product patterns + monorepo-specific guides + Figma library setup. Rationale: the v0.3.2 anatomy describes a stack-agnostic spec, not Svelte-specific implementation — the contract belongs to the brand, not the implementation.
  - Known pre-existing dashbook issues NOT introduced by migration: `/components/form` imports `zod`, `/developers` imports `vitest/config` — both prerender fine but 500 in dev mode. Defer to follow-up.
  - **Phase 2/3/4 plans drafted 2026-05-13** at `core/docs/superpowers/plans/2026-05-13-brand-migration-phase-{2,3-outline,4-outline}.md`. Phase 2 is full step-level (~16 tasks, ready to execute). Phase 3 is task-level outline with 6 design-decision gates (MCP SDK choice, stack-emit storage shape, component-ID conventions, asset URL signing, skill content scope, port_component prompt shape) — each marked 🚧 brainstorm-before-task. Phase 4 is decision-gated sketch — needs 4 team-level decisions (deploy shape A/B/C, DNS cutover sequencing, internal-portal/key-rotation flow, lib-release coupling) before step-level tasks can be authored.
  - **Research artifacts (2026-05-14) — both background-validate the migration plan.**
    - `.knowledge/brand-book-migration-analysis.md` — retrospective audit of whether the in-flight migration is still the right move. **Verdict: yes, full migration, no caveats.** Initial draft worried `/mcp` + `/api/*` would need an untested Lambda adapter — that's wrong. **dashfi-ui already ships SvelteKit-on-Lambda in production**: `adapter-node` → Dockerfile → ECR → Lambda → CloudFront (`/Users/zy/dev/dash/core/packages/dashfi-ui/{app/svelte.config.js,infra/src/app-lambda.tf,infra/src/cloudfront.tf}`). Migration plan locked in: lift-and-shift onto dashfi-ui's pattern. Open spikes (not blockers): MCP streaming-response shape through Lambda + CloudFront; subdomain choice (`brand.dash.fi` / `dashbook.dash.fi` / `design.dash.fi`); PR-preview replacement (branch-aliased Lambda or accepted as gone — user explicitly OK losing Vercel previews for pipeline alignment). This pre-resolves Phase 4's "deploy shape A/B/C" gate — answer is **B: lift-and-shift onto dashfi-ui's adapter-node + ECR + Lambda pattern**, not A's adapter-static-with-separate-MCP-Lambda.
    - `.knowledge/dashfi-ui-patterns.md` — page-pattern inventory from `core/packages/dashfi-ui/app/src/` (15 files read: 9 layouts + 4 representative pages + 2 specials). Catalogues **9 layout patterns** (root, auth shell, login wrapper, app shell with sidebar, sub-section layouts), **8 page patterns** (tabbed section with live counts, workflow data table, multi-section settings page, terminal state, onboarding apply flow, login form, dashboard summary, business form), **12 cross-cutting patterns** (route-group auth contract `(auth)`/`(protected)`/`(onboarding)`/`(protected)/(2fa)`, global modals as rune-store singletons, URL-as-state for deep-linkable dialogs via `replaceState`, per-user TanStack query persister, etc.). Top-5 candidates to lift into Dashbook `/patterns/`: (1) **Protected App Shell** — `Sidebar.Provider + Sidebar.Inset + permission/flag-driven nav + responsive dropdown↔sheet + global dialog mount`, (2) **Tabbed Section Page with Live Counts**, (3) **Workflow Data Table Page**, (4) **Auth Route-Group Contract**, (5) **Global-Modal-as-Singleton**. Feeds the §8 Patterns System and the migration's Phase 3 stack-emit decision (what does a `pattern` look like when ported across stacks).

### Pending

| Phase             | Owner                        | Scope                                                                                                   |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| **7 — Figma library** | **External Claude Code instance** (in flight, separate auth) | Authoring the actual Figma library file per `FIGMA_HANDOFF.md`. Code-agent prep is done in this repo; the build itself is happening in a parallel session bound to the dashfi-team Figma account. Will land alongside the production deploy as part of v1.0. |
| **v1.0 — Brand-app production** | dashfi team       | Execute the migration spec at `core/docs/superpowers/specs/2026-05-12-brand-source-of-truth-design.md`. Phases 0–4: copy → lift-and-shift inside core → IA + auth → MCP + skill + new surfaces → DNS cutover. Includes compliance review of the legal copy on `/press`. `DEPLOY.md` in this repo is now obsolete. |
| **`@dashfi/svelte` next publish — packaging cleanup** | core / lib team | `v0.0.1` works but has three known packaging bugs; dashbook works around them with explicit transitives in `package.json`. Full notes + verification recipe at `.knowledge/dashfi-svelte-packaging-followups.md`. Summary: (1) move `svelte-radix`, `svelte-tel-input`, `formsnap`, `@internationalized/date` from `devDependencies` to `peerDependencies`; (2) filter `.stories.svelte`, `@faker-js/faker`, `@storybook/*` references out of the published `dist/`; (3) fix `sideEffects` glob from `lib/ui/**/*.css` to `dist/ui/**/*.css` so tree-shakers preserve component CSS. |
| **MCP server Phase 2** | dashbook / brand team | Foundations deep-extract beyond `tokens.ts` (typography type scale, spacing scale). **Brand voice + partner kit + marketing search wired 2026-05-13** (see Done table). Still pending: `marketing_get_partner_kit` per-partner **asset bundles** (lockup SVG + partner logo URLs — partner-ops owned), auth gating for partner-specific assets (FDIC partner data, exec bios — public assets stay public), end-to-end test from Claude Desktop + Claude Code against the live remote URL. |
_(Plugin org-wide publish + Credit card art configurator — both **shipped**, moved out of Pending in the 2026-06-27 reconciliation; see Done.)_

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

### Internal section gate — shared passphrase (v1.0.0)

Three sections (`/components/*`, `/patterns/*`, `/developers/*`) are gated to a shared dashfi-team passphrase. Free; works on Vercel Hobby. Vercel's paid Deployment Protection was rejected.

**How it works.** SvelteKit `+layout.server.ts` in each protected directory opts out of prerender and calls `guardInternal()` from `src/lib/server/internal-auth.ts`. The guard checks the `dashbook_internal` cookie (an HMAC-signed `<expiresAt>.<hmac>` value, 90-day lifetime). If missing or invalid: 303 redirect to `/internal-login?return=<path>`. The login page validates the passphrase against `DASHBOOK_INTERNAL_PASSPHRASE`, sets the cookie, and 303s back to the original page.

**Env vars (REQUIRED — set in Vercel dashboard + `.env.local`):**

```
# .env.local (gitignored — set on each developer machine)
DASHBOOK_INTERNAL_PASSPHRASE=<the team passphrase you'll share>
DASHBOOK_INTERNAL_SECRET=<random 32+ char hex string — `openssl rand -hex 32`>
```

In Vercel: Project → Settings → Environment Variables → add both for Production AND Preview. Mark `DASHBOOK_INTERNAL_SECRET` as **Sensitive** so it's not visible in the dashboard after save.

**Rotation.** If the passphrase ever leaks, update `DASHBOOK_INTERNAL_PASSPHRASE` in Vercel + redeploy. (Old cookies remain valid until they expire — to forcibly log everyone out, rotate `DASHBOOK_INTERNAL_SECRET` instead and existing HMACs become invalid immediately.)

**Verify locally (after env vars are set):**

```
pnpm dev
# In an incognito window:
#   /                  → renders public (no prompt)
#   /use/dev           → renders public
#   /components        → 303 → /internal-login?return=%2Fcomponents
#   enter passphrase   → 303 → /components
#   /components again  → cookie present, renders
```

**Verify in production** (after deploy + env vars set in Vercel): same incognito flow against `https://dashbook.vercel.app`.

If we later need identity-tied auth (per-user, with audit trail), swap `guardInternal` for a GitHub-OAuth / magic-link variant — the route-level pattern stays the same.

### Vercel-Deployment-Protection alternative (rejected)

Vercel's built-in Deployment Protection (Vercel Authentication / Password Protection) is a paid feature on Hobby plans. The current trade-off favours the passphrase gate above. If Dashbook ever moves to a Pro/Enterprise Vercel plan and we want identity-tied auth without writing it, swap by: enabling Deployment Protection → Protected Paths = the 3 dirs → Team Members scope. The `+layout.server.ts` gate files can stay (no-op on authed requests) or be removed.

### Old standalone plan (superseded)

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
- `@dashfi/svelte` version reconciliation — dashbook pins `^0.5.0`, the lib's
  own `package.json` says `0.4.0` (workspace consumers unaffected; verify the
  published npm registry contents match before treating either number as
  authoritative).
- FDIC deposit-insurance copy on `/financial-accounts` should be diffed
  verbatim against the legal-disclosure library (`marketing_get_legal_disclosure`)
  — flagged for compliance review; do not change legal copy without that
  review.

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
