# Changelog

All notable changes to Dashbook. Sourced from PLAN.md §9; this is the
external-facing changelog for consumers (engineers using the Claude Code
plugin, dashfi-ui contributors, marketing/sales using the claude.ai
Connector). The internal-facing tracker is PLAN.md.

## [1.3.0] — 2026-07-16

UI/UX facelift — the first of four independent PRs from the god-tier
facelift session (see `docs/superpowers/specs/2026-07-11-god-tier-facelift-design.md`).
Scope: portal chrome + landing page + shared layouts. Everything below
uses the existing three easings and four durations — no new motion
primitives, no spring, no bounce — and is gated behind
`prefers-reduced-motion`.

### Added — motion
- Shared reveal-on-scroll and count-up Svelte actions
  (`src/lib/utils/motion.ts`) plus `.db-reveal` / `.db-press` CSS
  utilities in `app.css`.
- View transitions between routes (`onNavigate` +
  `document.startViewTransition`), 90ms out / 150ms in crossfade.
- Sticky, scroll-condensed header with an animated active-nav underline.
- Per-character clipped slide-up on the landing-page display heading;
  700ms count-up on the numbers band; staggered section reveals; palette
  swatch hover polish.
- Command palette entrance animation (fade + scale/translate) and a
  token-driven selection-highlight transition.
- Copy-confirm icon cross-fade with a "copied" label; theme toggle icon
  rotate/fade swap; card and tile hover lift (border + shadow); arrow-nudge
  on external/internal link icons; tabs and sidebar active-item indicators
  rebuilt as animated (previously static); `:focus-visible` rings added
  where missing across the chrome.
- New "Recipes — v1.1 facelift" table and two live demos on
  `/brand/motion`; a pointer to it from `/foundations/motion`.

### Fixed
- The homepage hero version pill, the "Recent" band, and the Footer
  version badge all hardcoded their own version strings and had drifted
  (`v0.9.0` on the homepage while the site was already `v1.0.0`). All
  three now read from a single `src/lib/content/releases.ts` module,
  which is also the declared first stop when cutting a release — the
  changelog page's rich prose entries stay hardcoded by design, with a
  release checklist comment linking the two.

## [1.2.0] — 2026-07-16

### Added — Claude Code integration refresh (plugin v0.4.0, MCP server v0.5.0)
- ARD discovery manifest at `/.well-known/ai-catalog.json` (draft Agentic
  Resource Discovery spec) pointing at the MCP server card, JSON API,
  llms.txt, and docs site. The `application/mcp-server-card+json` entry
  resolves to a server-card document, not the execution endpoint.
- MCP resources: `dashbook://components`, `dashbook://components/{slug}`,
  `dashbook://foundations/{slug}` — same data as the matching product_* tools,
  for clients that browse a catalogue instead of calling a tool. The component
  resources carry the same `implementation` handoff routing as the tools and
  JSON API (§8.3 parity).
- `outputSchema` (structured content) on product_get_component (incl. the
  `implementation` field), product_get_token, product_list_components,
  marketing_get_pattern, and marketing_get_marketing_palette.
- Origin validation on the public `/mcp` endpoint — allows the request's
  actual same origin plus a configurable trusted-client allowlist; DNS-
  rebinding future-proofing, not an auth boundary.
- Plugin manifest: `displayName`, version 0.4.0; marketplace listing gained
  `category` and `tags`.
- SKILL.md: trigger keywords moved to `when_to_use` frontmatter.
- `/developers/mcp`: "Add as a connector" section (Claude Code CLI,
  claude.ai custom connector, ARD/llms.txt discovery) and a Resources list.

### Removed
- Dropped the `prompts` MCP capability flag — the server had declared it
  without ever registering a prompt.

## [1.1.0] — 2026-07-16

Spec↔lib drift audit and machine-readable Design → Code handoff routing.
Bumps the MCP server to **v0.4.0** and the Claude plugin to **v0.3.0** — a
contract change, so consumers should refresh the plugin to pick it up.

### Added — Drift audit
- `pnpm spec-audit` — a reusable runner that compares each Dashbook component
  spec's recorded light/dark token values against the pinned `@dashfi/svelte`
  theme. `--write` reconciles Dashbook (never upstream), `--json` emits a
  machine-readable report, `--strict` makes advisory coverage/trace gaps
  gating. The audit is asymmetric: it corrects Dashbook, not the library.
- Result on this release: 0 stale resolved values. Source-token coverage gaps
  and untraced dimension classes are reported as advisory.

### Added — Design → Code handoff routing (MCP server v0.4.0)
- Every component response now carries a machine-readable `implementation`
  object. Shared `@dashfi/svelte` components route to
  `kind: "shared-svelte-component"` / `reusePolicy: "required-in-svelte"` with
  the exact `importStatement` and a `handoffDirective` telling Svelte/SvelteKit
  receivers to import the shared component rather than recreate it from anatomy
  HTML/CSS or screenshots. Non-Svelte receivers get a `nonSvelteFallback`
  pointing at `product_port_to`. Dashbook-only scaffolds route to
  `kind: "dashbook-scaffold"` / `reusePolicy: "reference-guidance"`.
- The same routing is emitted by `product_get_component`,
  `product_list_components`, `/api/components.json`, and
  `/api/components/<slug>.json` from one shared enrichment path.
- Receiving-skill guidance updated to teach the import-vs-port decision.

### Fixed
- Token drift reconciled against the pinned library (e.g. Button
  `--color-brand-foreground` dark resolves to `#000000`).

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
