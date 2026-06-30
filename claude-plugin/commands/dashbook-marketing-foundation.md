---
description: Fetch a marketing foundation (color, typography, spacing, motion) from the Dashbook MCP. Marketing foundations are tuned for landing-page rhythm — bigger display type, looser spacing, more motion than product UI. Returns the `--m-*` token surface.
argument-hint: <slug>
---

Call `marketing_get_foundation` with `{ slug: "$ARGUMENTS" }` and present the result.

If `$ARGUMENTS` is empty, list available foundation slugs (color, typography, spacing, motion, section, etc.) and ask the user which one.

Format the response as:

1. **Foundation name** — e.g. "Marketing Typography".
2. **One-line description**.
3. **Tokens** — full table: token name (`--m-...`), value, role, and a one-line usage note. Resolve values to actual hex/px/ms — do not leave them as variable references.
4. **How it differs from product UI** — if there's a sibling product foundation, note the deviations (typically: larger scale, more motion, jade-leaning palette).
5. **Usage rules** — when to apply, when not to (e.g. "do not use marketing display type inside product UI").

Marketing foundations use `--m-*` token names — reference them verbatim in any generated code. Do not substitute `--color-*` product tokens.
