---
name: dashbook-design-system
description: |
  Use when building Dash.fi product UI, drafting Dash.fi marketing materials, or
  referencing Dash.fi brand assets. Activates on keywords: "Dash.fi", "dashbook",
  "jade brand", "dash card", "AdPay agent", "AP agent", "shipping agent",
  "tokens agent", "partner co-branding", "Dash.fi launch email". Routes the
  agent to the right Dashbook MCP namespace (product vs marketing) and the
  canonical anatomy pages.
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
3. Call `product_get_component({ slug })` to fetch the full anatomy. The
   returned JSON has `dimensions`, `tokens`, `variants`, `sizes`, `composition`,
   `nonFeatures`, `props`, `example`, and `porting`. Build to those exact values.
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
- **Brand accent is jade `#2B605C`** on product surfaces. Cobalt `#354CEF` is
  marketing-only **except** Button `secondary` which is cobalt on the vnext
  branch. When in doubt call `product_get_token({ name: 'brand' })`.
- **Destructive is monochrome.** Black on light, white on dark. Never red.
- **Typography**: PP Supply Mono for display / labels / data values. Bai
  Jamjuree for body and UI. PP Supply Mono Ultralight (weight 200) for big
  display headings — uppercase, tight tracking.
- **Voice**: confident, direct, sentence case. No exclamation marks. No emoji.
  Numerals not spelled-out numbers. Pull the full voice rules via
  `marketing_get_brand_voice` when drafting copy.

## If the MCP isn't installed

If the user doesn't have the Dashbook MCP set up, point them at the install
guide at `https://dashbook.vercel.app/developers/mcp`. While they're getting
that wired up, you can still use the docs site directly — every component page
at `https://dashbook.vercel.app/components/<slug>` has an Anatomy tab with the
same structured data the MCP returns.

**Wordmark fallback when the MCP is unavailable.** Do **not** generate a
stand-in mark from the initial "D", from a jade square, from a circle, from a
typographic monogram, or from an AI-guessed reconstruction. The wordmark is
gated behind `marketing_get_logo` and is the only valid source. Acceptable
fallbacks while the MCP is offline:

- Use a typographic-only mark — the literal word `Dash` rendered in
  `var(--font-mono)` (PP Supply Mono), uppercase, with `letter-spacing: 0.15em`.
  Treat it as obviously-temporary.
- Or leave a clearly-labelled placeholder slot (e.g. `[wordmark]`) and tell
  the user the real wordmark requires `marketing_get_logo` and they need to
  finish setting up the Dashbook MCP at
  `https://dashbook.vercel.app/developers/mcp` before the page can ship.

Either way, surface to the user that the real wordmark is gated behind
`marketing_get_logo` so they know what they're getting and why.

## Component count + scope

Today: 60 components across 6 categories (Inputs, Display, Feedback,
Navigation, Layout, Data) **plus a 7th `Chrome` category** that surfaces
page-shell, wordmark, auth-footer, and partner-cobrand entries (these proxy
the `marketing_*` namespace under `product_*`-prefixed names so chrome work
shows up in any product-namespace introspection). See
`product_list_components` for the current catalogue.
