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
| Drafting an announcement email or launch copy     | `marketing_*` |
| Pulling a logo SVG or partner co-branding rules   | `marketing_*` |
| Legal disclosure text (FDIC, partner-bank, card)  | `marketing_*` |
| Checking the marketing palette                    | `marketing_*` |

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

1. If the user's request involves Dash.fi UI work, ask once whether to load the
   **product** or **marketing** context (or assume based on the task).
2. Call `product_list_components` (or `product_search`) to find the right
   component. Don't guess slugs.
3. Call `product_get_component({ slug })` to fetch the full anatomy and
   `implementation` routing. In Svelte, import the production component; use the
   anatomy to verify the result, not to recreate it.
4. For a non-Svelte stack, also call `product_port_to({ slug, stack })` to get
   the stack-specific snippet template.
5. For tokens used outside a specific component (page background, type, etc.),
   call `product_get_foundation` or `product_get_token`.

## Brand rules — invariants

- **Brand accent is `--color-brand`** on product surfaces (currently rendered by
  the shared lib as `#2B5F5B` light / `#46B9AF` dark). Cobalt is
  marketing-only **except** Button `secondary` which is cobalt on the vnext
  branch. When in doubt call `product_get_token({ name: 'brand' })`.
- **Destructive is orange `#FF4000`** in both modes in the shared library.
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

## Component count + scope

The catalogue evolves with the shared library. Use `product_list_components`
for the current components and categories rather than relying on a hard-coded
count.
