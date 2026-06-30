---
description: Search across the Dash.fi marketing surface — patterns, foundations, voice rules, palette, partners, legal disclosures, badges. Use for discovery when you don't know the exact slug ("find everything about Mastercard", "show hero patterns", "search for Net 60").
argument-hint: <query> [--kinds=pattern,partner,...]
---

Parse `$ARGUMENTS`. Everything before any `--kinds=` flag is the free-text query. Optional `--kinds=...` restricts results to specific entry types (comma-separated).

Call `marketing_search` with `{ query: "...", kinds: [...] }`.

Available kinds:

- `voice-principle`, `voice-rule`, `voice-example`, `voice-guidance` — brand voice surface
- `palette` — marketing palette tokens
- `legal-disclosure` — compliance copy
- `partner`, `partner-rule` — partner kit entries
- `badge-variant` — Powered-by-Dash badge variants

Format the response as:

1. **Total result count** — e.g. "12 matches across 4 kinds".
2. **Grouped by kind** — each kind a heading. Inside, list the top hits with title + one-line description + score.
3. **Top match deep-dive** — if the top score is decisively higher than the rest, expand that result with full content (call the relevant `marketing_get_*` tool to fetch it).

If results are sparse (≤ 2 hits), suggest broader queries OR call the relevant list tool directly (`marketing_list_patterns`, etc.) and present the full catalogue.

If the user's query mentions a partner name or legal concept, prefer kinds-filtered search to keep the result list scannable.
