---
name: dashbook-design-system
description: Use when building Dash.fi product UI, drafting Dash.fi marketing materials, or referencing Dash.fi brand assets. Routes the agent to the right Dashbook MCP namespace (product vs marketing) and the canonical anatomy pages.
when_to_use: |
  Activates on keywords: "Dash.fi", "dashbook", "jade brand", "dash card",
  "AdPay agent", "AP agent", "shipping agent", "tokens agent", "partner
  co-branding", "Dash.fi launch email".
---

# Dashbook design system

You're building or referencing Dash.fi UI / marketing materials. The canonical
brand and design system is exposed via **two surfaces**:

1. **MCP server** at `https://dashbook.vercel.app/mcp` — query structured specs
   programmatically. Two tool namespaces (`product_*` and `marketing_*`) plus
   two shared tools (`version`, `changelog`). Install guide at
   `https://dashbook.vercel.app/developers/mcp`.

2. **Docs site** at `https://dashbook.vercel.app` — human-readable component
   pages with anatomy sections (every dimension, token-per-part with resolved
   hex, composition rules, non-features, props, porting checklist).

## Pick a namespace

| Task                                              | Namespace   |
| ------------------------------------------------- | ----------- |
| Building a product screen (settings, dashboard…)  | `product_*` |
| Picking a component (button, input, dialog, …)    | `product_*` |
| Resolving a token to a hex value                  | `product_*` |
| Porting a component to React / RN / vanilla       | `product_*` |
| Page chrome inside a product screen (header, footer, auth shell) | `marketing_*` (logo, legal disclosure, partner kit) **+** `product_*` (every other component on the page) |
| Drafting an announcement email or launch copy     | `marketing_*` |
| Pulling a logo SVG or partner co-branding rules   | `marketing_*` |
| Legal disclosure text (FDIC, partner-bank, card)  | `marketing_*` |
| Checking the marketing palette                    | `marketing_*` |

**Cross-namespace rule.** The two namespaces are not mutually exclusive within a
single page. Any product screen with chrome — login, sign-up, 2FA, magic link,
password reset, error pages, partner-co-branded screens, transactional emails
rendered as product UI — needs the wordmark from `marketing_*` even though the
form controls underneath come from `product_*`. The wordmark is always a brand
asset; never reconstruct it from product components or invent one. If you are
on `product_*` and you need a logo, cross over to `marketing_get_logo` (or call
the thin proxy `product_get_logo`, which forwards to the same source).

## Recommended workflow

### Design handoff contract

Treat Claude Design output as a visual proposal, not a new component implementation.
Before writing code, identify the target stack and inspect each Dashbook component's
`implementation` metadata:

- **Svelte / SvelteKit:** when `reusePolicy` is `required-in-svelte`, use the exact
  `implementation.importStatement`. Do not translate the generated HTML/CSS, copy
  anatomy classes into a local component, or rebuild the component from a screenshot.
- **React / React Native / Vue / plain HTML:** call `product_port_to`; the Svelte
  package is not a cross-framework runtime.
- **Astro:** reuse the shared Svelte component only when the project enables Svelte
  and already consumes `@dashfi/svelte`; otherwise use the non-Svelte porting path.

After handoff, scan the generated code for local buttons, inputs, badges, dialogs,
cards, and other shapes that duplicate a listed shared component. Replace those
approximations with shared imports while preserving page-specific composition and
business logic.

0. **Chrome check (BEFORE anything else).** If the screen has a header, footer,
   or sign-in shell — i.e. anything that frames the page rather than living
   inside it — call `marketing_get_logo` first. The wordmark is always a brand
   asset, even when the surrounding screen is product UI. Also pull
   `marketing_get_legal_disclosure` if the footer carries FDIC or
   partner-bank text, and `marketing_get_partner_kit` if the page is
   co-branded. For composed scaffolds (auth-2fa, auth-signin, auth-signup,
   auth-magic-link, auth-reset) call `product_get_page_template({ slug })` to
   get the whole chrome + layout + copy-tokens bundle in one call.
1. If the user's request involves Dash.fi UI work, ask once whether to load the
   **product** or **marketing** context (or assume based on the task). Remember
   page chrome straddles both — see the cross-namespace rule above.
2. Call `product_list_components` (or `product_search`) to find the right
   component. Don't guess slugs. The `Chrome` category surfaces page-shell,
   wordmark, auth-footer, and partner-cobrand entries that proxy the marketing
   namespace under product-namespaced names.
3. Call `product_get_component({ slug })` to fetch the full anatomy and
   `implementation` routing. In Svelte, import the production component; use the
   anatomy to verify the result, not to recreate it.
4. For a non-Svelte stack, also call `product_port_to({ slug, stack })` to get
   the stack-specific snippet template.
5. For tokens used outside a specific component (page background, type, etc.),
   call `product_get_foundation` or `product_get_token`.

## Brand rules — invariants

- **Wordmark is single-source.** The Dash.fi wordmark only comes from
  `marketing_get_logo` (or the thin proxy `product_get_logo`). Never invent,
  reconstruct, substitute, or AI-imagine the wordmark from initials, geometry,
  shapes, or a guess at "what the Dash logo probably looks like". If
  `marketing_get_logo` is unavailable for any reason, halt and surface that to
  the user — do not ship an off-brand placeholder.
- **Brand accent is `--color-brand`** on product surfaces (currently rendered by
  the shared lib as `#2B5F5B` light / `#46B9AF` dark). Cobalt is
  marketing-only **except** Button `secondary` which is cobalt on the vnext
  branch. When in doubt call `product_get_token({ name: 'brand' })`.
- **Destructive is orange `#FF4000`** in both modes in the shared library.
- **Typography**: PP Supply Mono for display / labels / data values. Bai
  Jamjuree for body and UI. PP Supply Mono Ultralight (weight 200) for big
  display headings — uppercase, tight tracking. **PP Supply Mono is paywalled
  (Pangram Pangram commercial license) — only available on licensed Dash.fi
  properties.** For non-Dash.fi stacks (consumer apps, partner sites, anywhere
  outside dash.fi), use **JetBrains Mono** (Apache 2.0, free via Google Fonts)
  as the closest open fallback. Bai Jamjuree is OFL-licensed and free via
  Google Fonts everywhere.
- **Voice**: confident, direct, sentence case. No exclamation marks. No emoji.
  Numerals not spelled-out numbers. Pull the full voice rules via
  `marketing_get_brand_voice` when drafting copy.

## If the MCP isn't installed

If the user doesn't have the Dashbook MCP set up, point them at the install
guide at `https://dashbook.vercel.app/developers/mcp`. ALWAYS surface to the
user what's missing — don't silently degrade. While they're getting that wired
up, here's what works as a fallback for non-browser clients (agents, WebFetch,
crawlers):

**Foundations work via WebFetch.** The foundation pages render their
structured data in static markup. Safe to fall back to:

- `https://dashbook.vercel.app/foundations/color`
- `https://dashbook.vercel.app/foundations/typography`
- `https://dashbook.vercel.app/foundations/spacing`

**Component anatomy pages do NOT work via WebFetch.** The Anatomy tab at
`/components/<slug>` is client-rendered and tab-gated — non-browser clients
only get the page shell. Instead, fetch the static JSON endpoints:

- `https://dashbook.vercel.app/api/components.json` — full component catalogue
- `https://dashbook.vercel.app/api/components/<slug>.json` — one component's
  full anatomy (same structured data the MCP returns)
- `https://dashbook.vercel.app/api/foundations/<color|typography|spacing>.json`
  — foundation JSON if you'd rather skip the HTML parse

These are GET, no auth, 24-hour cache, CORS-enabled. Designed for exactly
this fallback path.

**Wordmark fallback when the MCP is unavailable.** Do **not** generate a
stand-in mark from the initial "D", from a jade square, from a circle, from a
typographic monogram, or from an AI-guessed reconstruction. The wordmark is
gated behind `marketing_get_logo` and is the only valid source. Acceptable
fallbacks while the MCP is offline:

- Fetch the SVG directly:
  `https://dashbook.vercel.app/api/logo/wordmark/jade?format=svg&size=400`
  (no auth, same source the MCP returns).
- Or use a typographic-only mark — the literal word `Dash` rendered in
  `var(--font-mono)` (PP Supply Mono), uppercase, with `letter-spacing: 0.15em`.
  Treat it as obviously-temporary.
- Or leave a clearly-labelled placeholder slot (e.g. `[wordmark]`) and tell
  the user the real wordmark requires `marketing_get_logo` and they need to
  finish setting up the Dashbook MCP at
  `https://dashbook.vercel.app/developers/mcp` before the page can ship.

Either way, surface to the user that the real wordmark is gated behind
`marketing_get_logo` so they know what they're getting and why.

## Component count + scope

Use `product_list_components` for the current shared-component catalogue and
categories rather than relying on a hard-coded count. A separate `Chrome`
category surfaces page-shell, wordmark, auth-footer, and partner-cobrand
entries (these proxy the `marketing_*` namespace under `product_*`-prefixed
names so chrome work shows up in any product-namespace introspection).

## Slash commands

This plugin ships nine slash commands. Use them when the user's intent maps
cleanly to a single MCP call — they're thin wrappers that take an argument,
call the right tool, and format the result.

**Product** (work on dashfi-ui-style UI):

- `/dashbook-component <slug>` — anatomy for one component
- `/dashbook-port <slug> <stack>` — emit a component in React / RN / vanilla / etc.

**Marketing** (work on the public dash.fi site, launch copy, partner materials):

- `/dashbook-marketing-pattern <slug>` — anatomy for one marketing pattern (hero, stat-trio, feature-list, faq-accordion, etc.)
- `/dashbook-marketing-foundation <slug>` — marketing color / typography / spacing / motion / section foundation (the `--m-*` token surface)
- `/dashbook-marketing-asset <kind> [variant]` — logo / card art / palette
- `/dashbook-partner-kit [partner]` — partner co-branding rules + legal disclosure
- `/dashbook-legal <kind>` — verbatim compliance copy (FDIC, partner-bank, MSB, etc.)
- `/dashbook-marketing-search <query>` — full-text search across the marketing surface
- `/dashbook-voice` — brand voice rules for drafting copy

Any of these can also be invoked by name from natural-language prompts —
the commands exist so users don't have to remember the MCP tool names.
