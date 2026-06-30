---
description: Fetch a partner co-branding kit from the Dashbook MCP — partner lockup, do/don't rules, legal disclosure, regulator references. Use when drafting partner-co-branded materials (Mastercard, Visa, TransPecos Bank, Patriot Bank, Currency Cloud, Powered-by-Dash badges).
argument-hint: [partner]
---

Call `marketing_get_partner_kit` with `{ partner: "$ARGUMENTS" }`.

If `$ARGUMENTS` is empty, call with no args to list all available partners (Mastercard, Visa, TransPecos Banks SSB, Patriot Bank N.A., The Currency Cloud Limited, Powered-by-Dash badge variants, customer-logo lockup), then ask the user which one.

Format the response as:

1. **Partner name + category** — e.g. "Mastercard (card-network)" or "Powered-by-Dash (customer-cobrand badge)"
2. **Co-branding rules** — when and how to combine the Dash wordmark with the partner mark. Spacing, hierarchy, do/don't list.
3. **Legal disclosure text** — verbatim, compliance-reviewed. Show in a quote block.
4. **Regulator reference** — license number / NMLS / FRN / registration ID with the issuing authority name.
5. **Lockup assets** — SVG / PNG URLs if available.
6. **Surfaces** — where this kit applies (email footer, press release, partner page, customer deck, etc.).

**Critical**: always use the canonical disclosure text — do NOT paraphrase compliance-reviewed copy. Copy + paste exactly.

If the user is drafting a partner-co-branded email or deck, also suggest calling `marketing_get_brand_voice` for the broader voice rules.
