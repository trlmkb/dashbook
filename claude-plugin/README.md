# Dashbook — Dash.fi design system plugin

One-click install for the Dash.fi brand & design system. Bundles:

- The **`dashbook-design-system` skill** — auto-activates on Dash.fi keywords (Dash.fi, dashbook, jade brand, dash card, AdPay/shipping/tokens/AP agent, partner co-branding, launch email) and routes the agent to the right tool namespace (product vs marketing).
- The **Dashbook MCP server** at `https://dashbook.vercel.app/mcp` — 22 tools across `product_*`, `marketing_*`, and shared, plus MCP resources (`dashbook://components`, `dashbook://components/{slug}`, `dashbook://foundations/{slug}`). 60 components, foundations, brand voice, logo SVGs (URL + inline), partner kits, legal disclosures, marketing patterns.
- Nine **slash commands** across the product and marketing namespaces — see Usage below.

## Install

### Claude Code

```
/plugin marketplace add trlmkb/dashbook
/plugin install dashbook@dashfi
```

The GitHub coord is `trlmkb/dashbook` (where the source repo lives) but the
marketplace itself is named `dashfi` — that's what shows up in your plugin
list after install.

### Claude Desktop — via Anthropic Console (org-wide)

If you have admin access to your team's Anthropic Console workspace, register this plugin once and every employee sees it in **Customize → Plugins → Your organization** in Claude Desktop. Details at [https://dashbook.vercel.app/developers/install](https://dashbook.vercel.app/developers/install).

### Claude Desktop — manual (per user)

Until the org admin registers the plugin, you can wire the MCP server directly. Paste into `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
	"mcpServers": {
		"dashbook": {
			"url": "https://dashbook.vercel.app/mcp"
		}
	}
}
```

Restart Claude Desktop.

## Usage

Manual invocation by keyword scope:

```
Use the Dashbook product design system. Build a settings page with a
work-email input, a save button, and an avatar.
```

```
Use the Dashbook marketing design system. Draft a launch email with
the partner-bank disclosure.
```

Nine slash commands for direct tool access:

- `/dashbook-component <slug>` — anatomy for one component
- `/dashbook-port <slug> <stack>` — emit a component in React / RN / vanilla / etc.
- `/dashbook-marketing-pattern <slug>` — anatomy for one marketing pattern
- `/dashbook-marketing-foundation <slug>` — marketing color / typography / spacing / motion / section foundation
- `/dashbook-marketing-asset <kind> [variant]` — logo / card art / palette
- `/dashbook-partner-kit [partner]` — partner co-branding rules + legal disclosure
- `/dashbook-legal <kind>` — verbatim compliance copy (FDIC, partner-bank, MSB, etc.)
- `/dashbook-marketing-search <query>` — full-text search across the marketing surface
- `/dashbook-voice` — brand voice rules for drafting copy

```
/dashbook-component button
/dashbook-port input react
/dashbook-voice
```

## Tools the MCP exposes

| Namespace | Tool | Purpose |
| --- | --- | --- |
| product | `product_list_components` | Catalogue of all 60 components. |
| product | `product_get_component` | Full anatomy for one component. |
| product | `product_get_foundation` | Color / typography / spacing / radius / motion / shadows. |
| product | `product_get_token` | Resolve a single token to hex (light + dark). |
| product | `product_search` | Fuzzy search across components. |
| product | `product_port_to` | Stack-specific porting checklist. |
| product | `product_get_logo` | Wordmark / app icon SVG (proxies marketing_get_logo). |
| product | `product_get_page_template` | Composed auth-page scaffold (chrome + layout + copy). |
| marketing | `marketing_list_patterns` | Catalogue of marketing page patterns. |
| marketing | `marketing_get_pattern` | Full recipe for one marketing pattern. |
| marketing | `marketing_get_foundation` | Marketing tokens / typography / layout / section / motion. |
| marketing | `marketing_get_brand_voice` | Tone + sentence-case + numerics rules. |
| marketing | `marketing_get_logo` | Wordmark / app icon SVG (URL + inline). |
| marketing | `marketing_list_logo_presets` | Available colorways. |
| marketing | `marketing_list_card_variants` | Catalogue of credit-card art variants. |
| marketing | `marketing_get_card_art` | One Mastercard MDES asset slot. |
| marketing | `marketing_get_marketing_palette` | Cobalt-based marketing palette. |
| marketing | `marketing_get_legal_disclosure` | FDIC / partner-bank / card-issuer text. |
| marketing | `marketing_get_partner_kit` | Partner co-branding rules. |
| marketing | `marketing_search` | Search marketing assets + guidance. |
| shared | `version` | MCP server + docs site version. |
| shared | `changelog` | Recent design-system changes. |

## Resources the MCP exposes

| URI | Purpose |
| --- | --- |
| `dashbook://components` | Component catalogue (mirrors `product_list_components`). |
| `dashbook://components/{slug}` | One component's full anatomy (mirrors `product_get_component`). |
| `dashbook://foundations/{slug}` | One product foundation (mirrors `product_get_foundation`). |

## License

MIT
