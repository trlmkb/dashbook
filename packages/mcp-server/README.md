# @dashfi/mcp-server

Dashbook MCP server — Dash.fi brand & design system as MCP tools.

Components, foundations, brand voice, and asset URLs exposed over the Model
Context Protocol so any MCP-aware client (Claude Desktop, Claude Code, Claude
Cloud, …) can build Dash.fi UIs against the canonical brand spec.

## Install

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or
`%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
	"mcpServers": {
		"dashbook": {
			"command": "npx",
			"args": ["-y", "@dashfi/mcp-server"]
		}
	}
}
```

### Claude Code

`.mcp.json` in your project root (or `~/.claude.json` globally):

```json
{
	"mcpServers": {
		"dashbook": {
			"type": "http",
			"url": "https://dashbook.vercel.app/mcp"
		}
	}
}
```

Or use this package via stdio:

```json
{
	"mcpServers": {
		"dashbook": {
			"command": "npx",
			"args": ["-y", "@dashfi/mcp-server"]
		}
	}
}
```

## Usage

The MCP exposes two tool namespaces — manual invocation by keyword keeps
marketing and product surfaces from leaking into each other.

```
Use the Dashbook product design system. Build a settings page with a
work-email input, a save button, and an avatar.
```

```
Use the Dashbook marketing design system. Draft a launch announcement
email with the partner-bank disclosure.
```

## Tools

| Namespace | Tool | Purpose |
| --- | --- | --- |
| product | `product_list_components` | Catalogue of all 60 components. |
| product | `product_get_component` | Full anatomy for one component. |
| product | `product_get_foundation` | Color / typography / spacing / radius / motion. |
| product | `product_get_token` | Resolve a single token to hex (light + dark). |
| product | `product_search` | Fuzzy search across components. |
| product | `product_port_to` | Stack-specific porting checklist. |
| marketing | `marketing_get_brand_voice` | Tone + sentence-case + numerics rules. |
| marketing | `marketing_get_logo` | Wordmark / app icon SVG. |
| marketing | `marketing_get_marketing_palette` | Cobalt-based marketing palette. |
| marketing | `marketing_get_legal_disclosure` | FDIC / partner-bank / card-issuer text. |
| marketing | `marketing_get_partner_kit` | Partner co-branding rules. |
| marketing | `marketing_search` | Search marketing assets + guidance. |
| shared | `version` | MCP server + docs site version. |
| shared | `changelog` | Recent design-system changes. |

## How it works

This package is a thin stdio adapter — it proxies every MCP request to the
remote endpoint at `https://dashbook.vercel.app/mcp` and streams the response
back. The actual server logic, typed component specs, and token data all live
in the Dashbook repo and ship with each docs-site deploy. The npm package
stays small (~2 KB) and the spec content is always current.

For local development against an unpublished branch:

```sh
DASHBOOK_MCP_URL=http://localhost:5173/mcp npx @dashfi/mcp-server
```

## Docs

- Full install guide: <https://dashbook.vercel.app/developers/mcp>
- Stack-agnostic consumption guide: <https://dashbook.vercel.app/developers/from-another-stack>
- Component catalogue: <https://dashbook.vercel.app/components>

## License

MIT
