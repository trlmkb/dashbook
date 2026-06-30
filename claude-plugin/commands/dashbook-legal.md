---
description: Fetch a legal disclosure from the Dashbook MCP — FDIC deposit, partner-bank issuance, card-issuance, payment-services, MSB registrations. Compliance-reviewed copy that must be quoted verbatim.
argument-hint: <kind>
---

Call `marketing_get_legal_disclosure` with `{ kind: "$ARGUMENTS" }`.

If `$ARGUMENTS` is empty, call with no args to list available disclosure kinds (e.g. `deposit-fdic`, `card-mastercard`, `card-visa`, `payment-currency-cloud`, `msb-fincen`, `msb-fintrac`), then ask the user which one.

Format the response as:

1. **Disclosure name + kind** — e.g. "FDIC deposit insurance — `deposit-fdic`"
2. **Canonical text** — verbatim, in a quote block. This is the text to paste.
3. **Partner / regulator** — which entity this disclosure references (e.g. "TransPecos Banks SSB · Member FDIC")
4. **Where to use** — surfaces this applies to (email footer, fine print, partner page, marketing landing, T&C, etc.).
5. **Companion disclosures** — if this disclosure typically appears alongside others (e.g. deposit + card disclosures together), list them.

**Critical**: compliance-reviewed disclosures must be quoted EXACTLY — do not paraphrase, summarize, or "modernize" the language. Copy + paste only.

If the user shares draft copy that includes a disclosure-shaped sentence, compare it against the canonical version and flag every deviation, however small.
