# Dashbook — Dash.fi design system plugin

One-click install for the Dash.fi brand & design system. Bundles:

- The **`dashbook-design-system` skill** — auto-activates on Dash.fi keywords (Dash.fi, dashbook, jade brand, dash card, AdPay/shipping/tokens/AP agent, partner co-branding, launch email) and routes the agent to the right tool namespace (product vs marketing).
- The **Dashbook MCP server** at `https://dashbook.vercel.app/mcp` — 15 tools across `product_*`, `marketing_*`, and shared. 60 components, foundations, brand voice, logo SVGs (URL + inline), partner kits, legal disclosures.
- Three **slash commands**: `/dashbook-component <slug>`, `/dashbook-port <slug> <stack>`, `/dashbook-voice`.

## Install

### Claude Code

```
/plugin marketplace add dashfi/dashbook
/plugin install dashbook@dashfi
```

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

Slash commands for direct tool access:

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
| product | `product_get_foundation` | Color / typography / spacing / radius / motion. |
| product | `product_get_token` | Resolve a single token to hex (light + dark). |
| product | `product_search` | Fuzzy search across components. |
| product | `product_port_to` | Stack-specific porting checklist. |
| marketing | `marketing_get_brand_voice` | Tone + sentence-case + numerics rules. |
| marketing | `marketing_get_logo` | Wordmark / app icon SVG (URL + inline). |
| marketing | `marketing_list_logo_presets` | Available colorways. |
| marketing | `marketing_get_marketing_palette` | Cobalt-based marketing palette. |
| marketing | `marketing_get_legal_disclosure` | FDIC / partner-bank / card-issuer text. |
| marketing | `marketing_get_partner_kit` | Partner co-branding rules. |
| marketing | `marketing_search` | Search marketing assets + guidance. |
| shared | `version` | MCP server + docs site version. |
| shared | `changelog` | Recent design-system changes. |

## License

MIT
