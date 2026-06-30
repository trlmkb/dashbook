---
description: Fetch the canonical anatomy for one marketing pattern (hero, stat-trio, feature-list, testimonial-card, faq-accordion, etc.) from the Dashbook MCP — dimensions, tokens, copy guidance, and the rendered route URL.
argument-hint: <slug>
---

You have access to the Dashbook MCP. Call `marketing_get_pattern` with `{ slug: "$ARGUMENTS" }` and present the result.

If `$ARGUMENTS` is empty, first call `marketing_list_patterns` and ask the user which slug they want. List patterns grouped by category.

Format the response as:

1. **Name + category** — e.g. "Stat Trio (proof)" with the live route URL (`https://dashbook.vercel.app/marketing/patterns/<slug>`).
2. **One-line description** — `spec.description`.
3. **When to use** — `spec.whenToUse` if present, plus typical surfaces (home, product, pricing, etc.).
4. **Anatomy** — dimensions, tokens (per part with resolved `--m-*` token values), composition rules.
5. **Copy guidance** — voice + content patterns specific to this pattern (headline length, supporting text, CTA tone).
6. **Non-features** — what this pattern is NOT for. Helps avoid misuse.
7. **Canonical example** — render `spec.example` in a Svelte code block.

Keep the output dense — these are marketing-page specs. Designers and copywriters need the values to use directly, not prose.

If the spec references other patterns, mention them inline so the user can chase the trail.
