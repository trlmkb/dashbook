---
description: Generate a stack-specific implementation of a Dashbook component, matching dimensions, tokens, and non-features from the canonical anatomy.
argument-hint: <slug> <stack>
---

The user wants to port a Dashbook component to another stack.

Parse `$ARGUMENTS` as `<slug> <stack>`. Valid stacks: `react`, `react-native`, `html-css`, `vue`.

If either argument is missing, ask the user to specify.

Steps:

1. Call `product_port_to` with `{ slug, stack }`. The response includes the contract (dimensions, tokens, variants, sizes, nonFeatures), a porting checklist, and the canonical Svelte example.

2. Generate working code in the target stack. Honour every item in the contract:
   - **Dimensions** — exact px values.
   - **Tokens** — hex values from the response (light mode by default; mention dark hex in a comment if the component reacts to theme).
   - **Variants + sizes** — implement every one listed.
   - **Non-features** — DO NOT add features the canonical rejects (icon prefixes on Input, background fills on underline-only controls, borders on the canonical elevated Card, etc.).

3. Show the final code in a single block, ready to paste.

4. Below the code, list the dimensions and tokens you used as a short table so the user can verify.

If the user's stack isn't in the supported list, fall back to vanilla HTML + CSS using the same contract.
