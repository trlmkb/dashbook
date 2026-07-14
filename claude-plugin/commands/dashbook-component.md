---
description: Fetch the canonical anatomy for one Dashbook component from the MCP and present dimensions, tokens, variants, props, and the porting checklist.
argument-hint: <slug>
---

You have access to the Dashbook MCP. Call `product_get_component` with `{ slug: "$ARGUMENTS" }` and present the result.

If `$ARGUMENTS` is empty, first call `product_list_components` and ask the user which slug they want.

Format the response as:

1. **Name + status** — e.g. "Button (stable)" with the importPath and
   `implementation.reusePolicy`.
2. **One-line description** — `spec.description`.
3. **Dimensions** — bullet each `dimension.name`: `dimension.value` (`dimension.tw`).
4. **Tokens (per part)** — bullet each token with the cssVar and resolved hex for light + dark.
5. **Variants / Sizes** — if present, a compact table.
6. **Composition + Non-features** — bulleted lists.
7. **Canonical example** — render `spec.example` in a code block.
8. **Porting** — bulleted `spec.porting`.

If the receiving project is Svelte/SvelteKit and `reusePolicy` is
`required-in-svelte`, lead with the exact `implementation.importStatement` and say
explicitly that the component must be imported rather than recreated from anatomy.

Keep the output dense — these are technical specs, not prose. The user is building UI and needs the values to copy.
