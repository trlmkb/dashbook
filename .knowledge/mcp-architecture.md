# MCP architecture — implementation notes

Internal reference. Not exposed to the public docs site.

## Layout

```
src/
├── lib/
│   ├── mcp/
│   │   ├── server.ts           # createDashbookMcpServer() — wires the SDK + tool registries
│   │   └── tools/
│   │       ├── product.ts      # product_* tools
│   │       ├── marketing.ts    # marketing_* tools
│   │       └── shared.ts       # version + changelog
│   ├── specs/                  # Typed source-of-truth
│   │   ├── types.ts
│   │   ├── render/Anatomy.svelte
│   │   ├── components/<slug>.ts + index.ts
│   │   ├── foundations/<name>.ts + index.ts
│   │   └── marketing/<name>.ts + index.ts
│   └── tokens.ts               # Existing typed token export (color/radius/motion)
└── routes/
    └── mcp/
        └── +server.ts          # SvelteKit endpoint exposing the MCP via HTTP/SSE
```

## Transport

- **Streamable HTTP** (`POST /mcp`) is the modern MCP transport. Single endpoint, supports both request/response and SSE-style streaming.
- Older clients (Claude Desktop pre-2025) used separate `GET /sse` + `POST /messages` endpoints. The SDK transport handles both behind the same route — agents that send the appropriate `Accept: text/event-stream` header get streaming.

## Distribution

- **Remote URL**: `https://dashbook.vercel.app/mcp` — zero-install. Works in Claude Cloud and any MCP-aware client that supports remote URLs.
- **npm package** `@dashfi/mcp-server`: stdio adapter that proxies to the remote URL (or runs the server locally for development). Lets Claude Desktop install it via `npx`.
- **Plugin**: published wherever the org's plugin marketplace is. Bundles the npm package + an auto-suggest skill.

## Tool naming

Prefix-based namespacing keeps the agent's tool list scannable:
- `product_list_components`, `product_get_component`, `product_get_foundation`, `product_get_token`, `product_search`, `product_port_to`
- `marketing_get_brand_voice`, `marketing_get_logo`, `marketing_get_marketing_palette`, `marketing_get_legal_disclosure`, `marketing_get_partner_kit`, `marketing_search`
- `version`, `changelog` (shared, unprefixed)

## Phase 1 scope

- Product tools wired to `src/lib/specs/components/*`
- Foundations tools wired to `src/lib/tokens.ts` + extension specs (`src/lib/specs/foundations/*`)
- Marketing tools — stubs (return "not yet implemented" pointing to dashbook.vercel.app pages)
- One SvelteKit endpoint at `/mcp`
- npm package skeleton (not yet published)

## Phase 2

- Marketing tools fully wired
- npm package published
- Install guide at `/developers/mcp`
- Auto-suggest skill
