# Changelog

All notable changes to Dashbook. Sourced from PLAN.md §9; this is the
external-facing changelog for consumers (engineers using the Claude Code
plugin, dashfi-ui contributors, marketing/sales using the claude.ai
Connector). The internal-facing tracker is PLAN.md.

## [Unreleased]

### Added — Pattern extraction R3 (product app + dash.fi sweeps)
- 6 new full-depth product patterns (17 → 23): Bulk action bar, Bulk import
  wizard, In-dialog stepper, Card gallery, Secret reveal, Notification
  inbox — grounded in the dashfi-ui product-app source.
- 3 new draft product patterns: Statement archive, Role permission matrix,
  Product catalog.
- New Sidebar component (60 → 61) — the authenticated-app navigation shell
  family (Sidebar, SidebarProvider, SidebarInset, SidebarTrigger,
  SidebarMenu, SidebarGroup, SidebarHeader/Footer/Rail/Separator/Input),
  previously referenced by the Protected app shell pattern but undocumented.
- 5 new marketing patterns (36 → 41): ComparisonTable, DataTableBand,
  ChartBand, ActionPlan, FormCapture — grounded in live dash.fi evidence
  (home, /corporate-card, /rewards, /shipping, /parcel-audit,
  /parcel-analytics, /ai-spend-audit, /carrier-contract-management,
  /growthnetwork, /partner).
- New variants documented: step-timeline (compare, pipeline status),
  live-widget (term-selector, tier-slider), split-cta
  (dual-peer-CTA-boxes), feature-grid (4-up audience-segment),
  case-study-card (confidence-score + strategy-bullets).

### Fixed — drift corrections
- `content/marketing.ts` reconciled against the real marketing pattern spec
  registry: removed 6 phantom slugs with no backing spec, added 4
  previously-undocumented specs (dark-cta-band, faq-accordion,
  trust-stat-band, calculator-island). ⌘K now indexes exactly the shipped
  pattern set.
- workflow-data-table-page, multi-step-onboarding, table-filters, and
  card-detail docs updated to cross-link the new patterns / note scope
  limitations.
- pinned-showcase and cosmic-hero flagged with a "no live usage on dash.fi
  as of 2026-07" source note.

## [1.0.0] — 2026-05-18

First declared-stable release. Everything below is live at
https://dashbook.vercel.app.

### Added — Components + patterns
- 60 components documented with full anatomy (dimensions, tokens, variants,
  composition rules, non-features, props, porting checklist). 6 categories
  + a new Chrome category for page-level scaffolds.
- 17 patterns across 7 categories: Shells (Protected app shell, Auth
  split-screen, Sub-section tabs), Data (Transaction list, Metric card,
  Tabbed section with live counts, Workflow data table page, Dashboard
  summary), Forms (Settings section, Multi-section settings, Multi-step
  onboarding), Confirmation (Destructive confirmation), States (Empty
  state, Terminal state page), Layout (Card detail), Architecture (Auth
  route-group contract, URL-as-state deep-linkable dialog).
- 9 foundation pages with both light + dark hex values inline: color,
  typography, spacing, radius, elevation, motion, accessibility, data viz,
  currency.

### Added — MCP server (v0.3.0)
- 17 tools across product_* and marketing_* namespaces, plus version +
  changelog shared tools.
- New: product_get_logo (thin proxy over marketing_get_logo so agents
  introspecting the product namespace see the wordmark), product_get_page_template
  (composed scaffolds for auth-signin / auth-signup / auth-2fa / auth-magic-link
  / auth-reset).
- Cross-namespace boundary signal on every product_* tool description —
  agents see "wordmarks live in marketing_*" at tool-discovery time, not just
  in skill prose.
- format: 'svg' | 'png' parameter on marketing_get_card_art and
  marketing_get_logo — PNG output is base64-encoded for transport.

### Added — Distribution
- Claude Code plugin at trlmkb/dashbook — install via
  `/plugin marketplace add trlmkb/dashbook` + `/plugin install dashbook@dashfi`.
- Cowork plugin distribution for org-wide auto-install (claude.ai admin →
  Plugins → GitHub syncing).
- claude.ai Connector for web users (claude.ai admin → Organization settings
  → Connectors → Add → Custom → Web, URL: https://dashbook.vercel.app/mcp).
- /use audience runbooks: /use/dev, /use/designer, /use/marketer,
  /use/maintainer. Workflow-oriented per-audience how-to.

### Added — Static JSON + asset API
- /api/components.json — full component catalogue.
- /api/components/<slug>.json — per-component anatomy.
- /api/foundations/{color,typography,spacing}.json — tokens incl. light +
  dark hex pairs and font webDelivery URLs (Bai Jamjuree Google Fonts,
  JetBrains Mono fallback for PP Supply Mono).
- /api/logo/<variant>/<preset>?format=svg|png — wordmark + app icon.
- /api/card/<variant>/<slot>?format=svg|png — MDES card art slots.
- All CORS-open, 24h cached, no auth.

### Added — Card art configurator
- /brand/card — live configurator for the canonical Jade card variant.
  Spec-verified against Mastercard's MDES layout (A=82, B=57, C=1372,
  D=283, E=459 — captured directly from MC's developer docs via Playwright).
- One-click MDES bundle download — all 4 upload slots (SVG + PNG) +
  composite preview + README in a single zip. Replaces an 8-click process
  for brand-ops.
- ?safeZone=true query param overlays MC's overlay regions for design
  validation.

### Added — Brand voice + assets
- Brand voice rules at /brand/voice with good/bad examples and
  before/after rewrites. Available programmatically via marketing_get_brand_voice.
- Partner co-branding kit at /press (Powered-by-Dash badges, customer
  lockups, 8 do/don't rules).
- Real legal disclosures at /press (TransPecos + Patriot Bank for Mastercard,
  Visa Global Services, Currency Cloud, FinCEN + FINTRAC MSB).

### Notable design + IA decisions
- Jade (#2B605C) is the product brand; cobalt (#354CEF) is marketing-only
  (with one exception: Button `secondary`).
- The skill prose ships an explicit "Wordmark is single-source" invariant
  after a consumer agent shipped an invented wordmark on a 2FA page.
- Boundary signals are baked into MCP tool descriptions so the cross-
  namespace rule reaches agents at tool-discovery time, not just at
  skill-load time.

### Internal — for the maintainer
- /use/maintainer runbook documents release process, add-component flow,
  add-pattern flow, card-variant flow, token updates, version bumps,
  Vercel deploy + rollback, Cowork plugin + Connector update flow,
  .knowledge/ discipline, PLAN.md discipline, reporter-bug investigation
  flow.

---

## Older versions

For pre-1.0 entries, see PLAN.md §9 (Phases — Done table).
