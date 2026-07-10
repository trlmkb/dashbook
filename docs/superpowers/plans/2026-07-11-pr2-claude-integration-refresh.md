# PR 2 — Claude Code integration refresh implementation plan

> **For agentic workers:** execute task-by-task, commit after each task,
> verify with `pnpm check && pnpm lint && pnpm build` before the PR.

**Goal:** Bring dashbook's agent-facing surfaces (plugin, remote MCP, skill,
discovery files, developer docs) up to July-2026 best practice, per the
integration audit summarized inline below. Version-verified, nothing
speculative.

**Branch:** `EN-XX/claude-integration-refresh` off `main`.

**Key repo files:** `src/routes/mcp/+server.ts`, `src/lib/mcp/server.ts`,
`src/lib/mcp/tools/{product,marketing,shared}.ts`,
`claude-plugin/.claude-plugin/plugin.json`,
`claude-plugin/.claude-plugin/marketplace.json`,
`claude-plugin/skills/dashbook-design-system/SKILL.md`,
`packages/mcp-server/`, `static/llms.txt`, `src/routes/developers/mcp/`,
`src/routes/use/{dev,maintainer}/`.

---

### Task 1: ARD discovery manifest — `/.well-known/ai-catalog.json`

Create `static/.well-known/ai-catalog.json` following Google's Agentic
Resource Discovery spec (published 2026-06-17; verify the exact manifest shape
by fetching the spec — https://developers.googleblog.com/announcing-the-agentic-resource-discovery-specification/
and the spec repo it links). The manifest must point at:
- MCP endpoint: `https://dashbook.vercel.app/mcp` (Streamable HTTP, no auth)
- JSON API root: `https://dashbook.vercel.app/api/components.json` et al.
- `https://dashbook.vercel.app/llms.txt`
- Human docs: `https://dashbook.vercel.app`

Also confirm the static adapter serves dotted directories (check `vercel.json`
/ adapter config; add a route handler under
`src/routes/.well-known/ai-catalog.json/+server.ts` with `prerender = true`
if `static/` dotfiles are excluded — test with `pnpm build` and inspect
`./build/.well-known/`).

Commit: `feat(discovery): ARD ai-catalog.json manifest`.

### Task 2: MCP capability honesty + structured tool output

In `src/lib/mcp/server.ts` the server declares
`capabilities: { tools: {}, resources: {}, prompts: {} }` but registers only
tools.

1. **Implement resources** (don't just drop the flag): register the component
   catalogue and per-component anatomy as MCP resources backed by the same
   data the JSON API serves — e.g. `dashbook://components` (list) and
   `dashbook://components/{slug}` via `registerResource` +
   `ResourceTemplate`, plus `dashbook://foundations/{slug}`. Reuse the
   existing spec-loading code from `src/lib/mcp/tools/product.ts` — do not
   duplicate data.
2. **Drop the `prompts` capability flag** (nothing registered; do not invent
   prompts in this PR).
3. **Add `outputSchema`** (zod → JSON schema, consistent with how inputs are
   declared in the existing code) to the structured lookup tools:
   `product_get_component`, `product_get_token`, `product_list_components`,
   `marketing_get_pattern`, `marketing_get_marketing_palette`. Return shapes
   must match what the tools already return — derive the schema from the
   existing TS types in `src/lib/specs/types.ts`, no `any`.

Verify with the MCP inspector or a direct POST to the dev server's `/mcp`
(initialize → list resources → read one → call product_get_component and
check `structuredContent` is present).

Commit: `feat(mcp): resources for components/foundations, output schemas, honest capabilities`.

### Task 3: Origin validation on the remote endpoint

In `src/routes/mcp/+server.ts`: keep CORS `*` for reads, but validate the
`Origin` header when present against an allowlist pattern (same-origin +
`https://claude.ai` + `https://claude.com` subdomains + absent-Origin
non-browser clients) and reject otherwise with 403. Server is public
read-only, so this is DNS-rebinding future-proofing, not auth. Keep it to a
small pure function with a unit-testable shape (export it), placed in
`src/lib/mcp/origin.ts`.

Commit: `feat(mcp): origin validation on remote endpoint`.

### Task 4: Plugin + marketplace manifest polish, v0.3.0

- `claude-plugin/.claude-plugin/plugin.json`: add
  `"displayName": "Dashbook — Dash.fi design system"`, bump `version` to
  `0.3.0`.
- `claude-plugin/.claude-plugin/marketplace.json`: add `category` (e.g.
  `"design"`), `tags` (`["design-system", "brand", "dash.fi", "mcp"]`) to the
  plugin entry — check the current marketplace schema at
  https://code.claude.com/docs/en/plugin-marketplaces.md and only use
  supported fields.
- Run `claude plugin validate claude-plugin --strict` if the CLI is
  available; otherwise validate JSON shape manually against the docs.
- Update `claude-plugin/README.md` version references.

Commit: `feat(plugin): v0.3.0 — displayName, marketplace category/tags`.

### Task 5: SKILL.md frontmatter currency

`claude-plugin/skills/dashbook-design-system/SKILL.md`: move the enumerated
trigger-keyword sentence from `description` into a `when_to_use` frontmatter
field (verify field name/format at https://code.claude.com/docs/en/skills.md);
keep `description` as one crisp sentence. Combined length must stay under the
1,536-char listing cap. Body content unchanged except: update the component
count/category claims if they've drifted, and confirm all URLs still resolve.

Commit: `feat(skill): when_to_use frontmatter, tightened description`.

### Task 6: Developer docs + llms.txt refresh

- `/developers/mcp` page: add "Add as a connector" section — current CLI
  syntax `claude mcp add --transport http dashbook https://dashbook.vercel.app/mcp`,
  claude.ai custom-connector path, and the new discovery surfaces (llms.txt +
  ai-catalog.json). Document the new MCP resources alongside tools.
- `/use/dev` and `/use/maintainer` runbooks: reflect plugin v0.3.0 and the
  resources feature; maintainer runbook gains a "release the plugin" checklist
  delta if one exists (check `src/routes/use/maintainer`).
- `static/llms.txt`: add the ai-catalog.json and MCP resources references;
  verify every listed URL still resolves in the built output.
- PLAN.md: mark MCP Phase-2 progress where genuinely covered; add a backlog
  note: "MCP SDK v2 / 2026-07-28 spec release — re-verify stateless server
  and upgrade after stable lands" and "Submit connector to Anthropic
  directory (claude.ai/directory)" as an owner-action item.
- CHANGELOG.md: entry under the unreleased heading.

Commit: `docs(developers): connector guidance, discovery surfaces, plugin v0.3.0`.

### Task 7: Verify + PR

- `pnpm check` (0 errors) · `pnpm lint` · `pnpm build`; confirm
  `./build/.well-known/ai-catalog.json` exists and `/mcp` still answers an
  initialize POST on `pnpm preview` or dev server.
- Do NOT bump `@modelcontextprotocol/sdk` past the 1.x stable line — v2 is
  days from stable; we stay on 1.29.x and note the follow-up in PLAN.
- Push, `gh pr create --base main`, title
  `EN-XX: Claude Code integration refresh — ARD discovery, MCP resources, plugin v0.3.0`.
  Body: summary, verification transcript, "How to test manually", and a note
  about the environment-level duplicate skill registration (dashbook skill
  registered 3× via different plugin paths — user action, not repo code).
  **Do not merge.**
