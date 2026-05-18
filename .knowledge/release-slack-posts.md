# Dashbook v1.0 - Slack release posts (drafts)

Two drafts below. Edit before sending.

-

## #general

**TL;DR:** Dashbook is v1.0. One stable home for Dash.fi's brand, components, and design tokens - plus tools to plug it into your editor, your AI, and your partner decks.

Dashbook (https://dashbook.vercel.app) is now the source of truth for how Dash.fi looks and sounds. If you build product UI, write marketing copy, ship a partner deck, or hand off card art, you should know it exists.

What you get out of v1.0:

- **60 components** with full anatomy - dimensions, tokens, variants, props, composition rules, and a porting checklist for any stack
- **17 patterns** across shells, data, forms, confirmation, states, layout, and architecture - including the protected app shell, the workflow data table page, and the multi-step onboarding flow
- **9 foundation pages** for color, typography, spacing, radius, elevation, motion, accessibility, data viz, and currency, with light and dark hex values
- **Brand voice rules, partner co-branding kit, and the real legal disclosures** at https://dashbook.vercel.app/press
- **One-click MDES card art bundle** at https://dashbook.vercel.app/brand/card - facelift design, spec-verified against Mastercard's published spec

Pick your path:

- Engineers → https://dashbook.vercel.app/use/dev
- Designers → https://dashbook.vercel.app/use/designer
- Marketing and sales → https://dashbook.vercel.app/use/marketer
- Maintainers and release owners → https://dashbook.vercel.app/use/maintainer

**Using claude.ai?** Turn on the Dashbook connector and Claude will pull tokens, components, voice rules, and disclosures directly while it drafts. No copy-paste. Anything you write or build with the connector enabled comes out on-brand by default.

Same content is also available as a Claude Code plugin (`trlmkb/dashbook`, available via Cowork plugin admin) and as a static JSON API at `/api/components.json` and `/api/foundations/<name>.json` if you want to wire it into your own tools.

Feedback, requests, missing pieces - drop them in #dashbook

-

## #engineering

**TL;DR:** Dashbook v1.0 ships and `design-vnext` merges into `core` master on `<TBD date>`. If you have an in-flight feature branch in dashfi-ui, you'll need a quick rebase. Lib API is byte-identical, so this should be ~30 minutes per engineer.

### What's new that you'll actually use

- **MCP server** at https://dashbook.vercel.app/mcp with 17 tools. Newly worth knowing:
  - `product_get_logo` - fetch the right logo variant (lockup, mark, wordmark) for product chrome
  - `product_get_page_template` - get the canonical shell + pattern composition for full pages, not just components
  - `product_list_components` now has a **Chrome** category - headers, sidebars, nav rails, modals-as-shells live there
- **Static JSON API** at `/api/components/<slug>.json` for any client that can't talk MCP (CI scripts, Figma plugins, internal tools). Foundations at `/api/foundations/{color,typography,spacing}.json`. Logos at `/api/logo/<variant>/<preset>`. Card art at `/api/card/<variant>/<slot>`.
- **Card art configurator** at https://dashbook.vercel.app/brand/card - one-click MDES bundle download with all 8 required PNG/SVG slot assets, sized and named exactly to Mastercard's spec. \*Card configurator needs testing and review

### Feedback

Visual regressions, missing component anatomy, wrong tokens, broken MCP responses, rebase questions - ping in #dashbook
