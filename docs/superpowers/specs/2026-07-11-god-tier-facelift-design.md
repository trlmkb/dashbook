# Dashbook god-tier lift — design spec

> Date: 2026-07-11 · Author: Claude (Fable orchestrator) + zy
> Status: approved-by-directive (autonomous session; user reviews at PR stage)

## Goal

Take dashbook from "looks and works great" to god-tier across four axes, shipped
as independent PRs (created, **not merged** — user reviews each):

1. **UI/UX facelift** — high-end micro-animations and interactions across the
   portal chrome, within the existing Ramp/Linear restraint.
2. **Claude Code integration refresh** — plugin, MCP server, skills, connector
   docs all current as of July 2026.
3. **Pattern extraction** — product app (`core/packages/dashfi-ui`) → product
   design system; dash.fi marketing site → marketing design system.
4. **Content analysis** — a report (not a PR) on component/pattern coverage,
   staleness, and drift, delivered in-chat with fixes folded into PRs 1–3.

## Constraints (non-negotiable)

- Brand motion doctrine: 3 easings (`--easing-out/in/default`), 4 durations
  (`--dur-instant/fast/normal/slow`), **no spring, no bounce**. Signature
  moves: per-character clipped slide-up (30ms stagger), 700ms count-up,
  `scale(0.97)` press at 100ms.
- Every animation gated behind `prefers-reduced-motion`.
- No emoji, sentence case, no exclamation marks. Lucide icons only.
- No `any` types. `pnpm check`, `pnpm lint`, `pnpm build` must pass per PR.
- Token discipline: all colors via tokens; `--m-*` never assigned raw hex.
- Do not touch the open Figma PR (#13) surface (`FIGMA_*` docs, token SSOT).
- Each PR updates PLAN.md + CHANGELOG.md for its own scope only.

## Execution model

Fable orchestrates; Sonnet-class subagents execute each PR in an isolated git
worktree, branch per PR (`EN-XX/*`), push, `gh pr create` against `main`,
leave unmerged.

## PR 1 — UI/UX facelift (branch `EN-XX/uiux-facelift-micro-interactions`)

Scope: portal chrome + landing page + shared layouts. Not the `@dashfi/svelte`
lib (separate repo), not marketing pattern demos (they document dash.fi, don't
restyle them).

1. **Motion utility layer** in `app.css`: shared classes/keyframes for
   reveal-on-scroll (fade + 8px rise, once), char-stagger display headings,
   press feedback, hover transitions — all built on existing tokens; single
   `@media (prefers-reduced-motion: reduce)` kill-switch.
2. **View transitions**: `onNavigate` + `document.startViewTransition` in
   `+layout.svelte`; 150ms crossfade, reduced-motion-safe fallback.
3. **Header**: sticky with scroll-condensed state (backdrop blur + hairline
   border fades in), animated active-nav indicator.
4. **Landing page**: signature per-character clipped slide-up on the display
   heading; 700ms count-up on the numbers band (IntersectionObserver, once,
   lands on exact value); staggered section reveals; palette strip hover
   interactions; fix stale v0.9.0 hero pill → derive from changelog.
5. **Command palette**: open/close fade + zoom-in-95 at `--dur-fast`; smooth
   selection highlight; subtle group-header treatment.
6. **Micro-interactions sweep**: CopyValue/Swatch copy-confirm morph
   (check swap, 150ms); ThemeToggle icon cross-fade/rotate; card/tile hover
   (border-strong + shadow-md lift 150ms); arrow-up-right icons nudge
   (translate 2px/−2px) on link hover; Tabs indicator polish; Sidebar active
   indicator slide; consistent `:focus-visible` rings.
7. **Docs**: new named recipes documented on `/foundations/motion` and
   `/brand/motion`; PLAN + CHANGELOG entries (v1.1.0 draft heading).

## PR 2 — Claude Code integration refresh (branch `EN-XX/claude-integration-refresh`)

Scope set by the claude-code-guide research report (see plan doc): plugin
manifest/version bump with any newly supported plugin surfaces (agents, hooks
if warranted), MCP SDK bump + newly available server features (tool output
schemas, resources, prompts where they fit), connector-citizenship for the
remote `/mcp` endpoint (CORS/.well-known as applicable), SKILL.md frontmatter
currency, `/developers/mcp` + `/use/*` docs refresh, marketplace listing sync,
llms.txt refresh. Everything version-verified, nothing speculative.

## PR 3 — Pattern extraction R3 (branch `EN-XX/pattern-extraction-r3`)

Scope set by the two gap-analysis reports: top product-app compositions not in
the 17 product patterns → new `PatternLayout` pages + registry entries + specs;
dash.fi sections missing from the 44 marketing patterns → new
`MarketingPatternLayout` pages + `src/lib/specs/marketing/patterns/*` specs
(which auto-feed the MCP + JSON API); stale patterns flagged, drift corrected.
Component coverage drift (lib vs 60 documented) folded in where cheap,
otherwise logged in PLAN backlog.

## Acceptance per PR

- `pnpm check` 0 errors · `pnpm lint` clean · `pnpm build` succeeds.
- Facelift verified in a real browser (dev server) before PR.
- PR body: what/why, screenshots or route list to review, test-manually notes.
