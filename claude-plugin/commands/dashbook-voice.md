---
description: Pull Dash.fi's brand voice rules from the MCP — tone, sentence case, exclamations, emoji policy, numerics. Use when drafting marketing copy, launch emails, partner-co-branded materials, or press releases.
---

Call `marketing_get_brand_voice` with no arguments. Present the full voice spec.

Format:

1. **Principles** — bullet list, verbatim.
2. **Rules** — sentence case, exclamations, emoji, numerics; show the rule + example.
3. **Examples** — good vs bad pairings, with the "why" for each bad example.
4. **Contextual guidance** — per-surface rules (product UI / marketing email / partner / press) if the response includes them.

Then say:

> Apply these to whatever copy you're drafting. If you're co-branding with a partner, also call `marketing_get_partner_kit` for the partner-specific override rules and `marketing_get_legal_disclosure` for the disclosure text.

If the user has already shared draft copy, also evaluate it against the rules and suggest specific edits — call out exclamation marks, emoji, title case, spelled-out numbers.
