# Dashbook agent-integration guide — Claude refresh + Codex setup

How to (re)connect Dashbook's brand & design system to coding agents. Covers
**Claude** (Code / claude.ai / Desktop — refresh an existing install) and
**OpenAI Codex** (add from scratch).

> **Current live surface**
> - MCP server **v0.5.0**, plugin **v0.4.0**
> - Endpoint **`https://dashbook.vercel.app/mcp`** — Streamable HTTP (SSE fallback), public + read-only
> - ⚠️ **The endpoint moves to `https://brand.dash.fi/mcp` after the Stage-2 cutover** — see [Transition](#transition).
>
> State is perishable — confirm versions with the MCP `version` tool and the live
> `gh pr list` / deploy state before relying on any number here.

---

## A. Claude — refresh the existing integration

Three layers; refresh whichever you use.

### 1. MCP connector (the core)
It's a *remote* connector, so there's no version to pin — "refresh" = remove +
re-add so the client re-handshakes the current tool list (now includes the
`dashbook://` resources and tool output schemas).

- **Claude Code**
  ```bash
  claude mcp remove dashbook
  claude mcp add --transport http dashbook https://dashbook.vercel.app/mcp
  ```
- **claude.ai (personal):** Customize → Connectors → remove Dashbook → "+" → Add
  custom connector → paste `https://dashbook.vercel.app/mcp`.
- **claude.ai (org-wide):** Organization settings → Connectors → remove → Add →
  Custom → Web → the URL. Members then enable it under Customize → Connectors.
- **Claude Desktop:** uses an `npx` stdio bridge in its JSON config — re-run the
  snippet from `dashbook.vercel.app/developers/mcp`.

### 2. Plugin (v0.4.0)
Bundles the skill + slash commands + points at the MCP. Refresh is a
**version-keyed remove + re-add**:
- Org: claude.ai → Organization → Plugins → remove Dashbook → re-add from the
  marketplace (pulls the current version).
- Local: `/plugin` → marketplace → update Dashbook.

### 3. Skill `dashbook-design-system`
Ships **inside** the plugin, so re-adding the plugin re-syncs it. If it's
installed as a standalone org skill, re-sync from the org skill settings.

### Verify (fresh client)
- Tool list shows `product_*` + `marketing_*`.
- `version` tool → server `0.5.0` / plugin `0.4.0`.
- A trigger word ("dash.fi", "jade brand") loads the skill.

---

## B. OpenAI Codex — add from scratch

Codex has **no plugin/skill system**. The equivalents are an **MCP server**
(structured specs) + an **`AGENTS.md`** entry (the routing/voice rules the skill
carried).

### 1. Add the MCP server
`~/.codex/config.toml` (global) or `.codex/config.toml` (project-scoped). Transport
is chosen by key: `url` = Streamable HTTP, `command` = stdio.

```toml
[mcp_servers.dashbook]
url = "https://dashbook.vercel.app/mcp"
```
or via CLI:
```bash
codex mcp add dashbook --url https://dashbook.vercel.app/mcp
```

- **No auth/token** — the endpoint is public and read-only. Its origin check
  allows requests with no `Origin` header (all CLI clients), so Codex is not
  rejected; no server-side allowlist change is needed.
- **Older Codex (stdio-only builds):** if `url` isn't supported, bridge with
  `mcp-remote`:
  ```toml
  [mcp_servers.dashbook]
  command = "npx"
  args = ["-y", "mcp-remote", "https://dashbook.vercel.app/mcp"]
  ```
  Check `codex --version` / `codex mcp list`; prefer native `url` on current builds.

### 2. Add the guidance (the "skill" equivalent)
Drop this into `~/.codex/AGENTS.md` (global) or a repo's `AGENTS.md`:

```markdown
## Dash.fi design system (Dashbook)
Brand/design system is exposed via the `dashbook` MCP server. Two namespaces:
- `product_*` — building Dash.fi product UI (components, foundations, tokens, port-to-stack).
- `marketing_*` — brand assets, page patterns, voice, logos, partner kits, legal copy.
Workflow: `product_list_components` / `product_search` to find a component (don't guess
slugs) → `product_get_component({slug})` for full anatomy → build to those exact values;
`product_port_to({slug, stack})` for non-Svelte stacks.
Invariants: brand accent jade #2B605C (cobalt #354CEF is marketing-only); destructive is
monochrome (never red); PP Supply Mono for display/labels/data, Bai Jamjuree for body; voice
is confident, sentence case, no exclamation marks, no emoji, numerals not words.
If a shared @dashfi/svelte component exists, import it — do not recreate it from anatomy.
```

### Verify
`codex mcp list` shows `dashbook`; in a session, ask Codex to call
`product_list_components` — it should return the catalogue.

---

## Transition

Both platforms currently point at `dashbook.vercel.app/mcp`. **After the
`brand.dash.fi` Stage-2 cutover, the endpoint moves to
`https://brand.dash.fi/mcp`** and you re-run the connector / `config.toml` step
with the new URL. The plugin marketplace URL and the ARD manifest
(`/.well-known/ai-catalog.json`) also get their URLs bumped at cutover.
`brand.dash.fi` is already in the server's trusted-origins list, so no server-side
change is required.

**Recommendation:** refresh on the current URL now; re-point to `brand.dash.fi`
once Stage 2 is live and validated. This re-point belongs in the Stage-2 cutover
checklist so it isn't forgotten.
