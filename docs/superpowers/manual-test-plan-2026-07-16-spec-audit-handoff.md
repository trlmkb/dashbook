# Manual flow test plan — spec-audit + handoff routing (PRs #17 / #18)

> Run these by hand before and after shipping. Each case: **do → expect →
> rollback trigger**. Automated checks (`pnpm test`, `pnpm spec-audit`, lint,
> build) are the gate; these cases validate the *behavior that matters* — no
> token drift, and agents reusing shared components instead of rebuilding them.
>
> Rollback floor: git tag `prod-checkpoint-2026-07-16` (`1d21d9f`) · Vercel prod
> deploy `dpl_498wyWA1BMbM7ypPPp1wHrvs9zuT`.

---

## A. Engine + drift audit (local, pre-merge)

**A1 — tests green**
- Do: `pnpm test`
- Expect: all pass (26 at time of writing).
- Rollback trigger: any failure → do not merge.

**A2 — no token drift**
- Do: `pnpm spec-audit`
- Expect: `0 stale resolved values`; exit 0. Coverage gaps/untraced dims may print (advisory).
- Rollback trigger: any `DRIFT` line, or nonzero exit without `--strict`.

**A3 — `--write` is idempotent**
- Do: `pnpm spec-audit --write` twice; `git diff` after each.
- Expect: first run may rewrite values; **second run produces no diff**.
- Rollback trigger: second run keeps changing files → resolver non-determinism.

**A4 — `--strict` behaves as designed**
- Do: `pnpm spec-audit --strict`
- Expect: nonzero exit because coverage/untraced gaps are gating; the report lists exactly which. Decide whether `--strict` is a required CI check now or after the generation frontier expands.
- Rollback trigger: `--strict` fails for a *stale value* (not just coverage) → real drift slipped in.

**A5 — detection actually works (negative test)**
- Do: temporarily edit one `light: '#…'` in a component spec to a wrong hex; `pnpm spec-audit`; then revert.
- Expect: that token reported as `DRIFT`; exit nonzero. Revert restores clean.
- Rollback trigger: audit reports `ok` on a value you know is wrong → detector blind spot.

---

## B. MCP handoff-routing contract (urgent item #2 — reuse)

Run against the PR preview `/mcp` (or `DASHBOOK_MCP_URL=<preview>/mcp`).

**B1 — shared component routes to import**
- Do: call `product_get_component` for `button`.
- Expect: `implementation.kind = "shared-svelte-component"`, `reusePolicy = "required-in-svelte"`, a correct `importStatement` (`import { Button } from '@dashfi/svelte/ui/button'`), `canonicalSource`, and a `handoffDirective` telling the receiver to import not rebuild. `nonSvelteFallback.tool = "product_port_to"`.
- Rollback trigger: missing/incorrect `implementation`, wrong import path.

**B2 — scaffold routes to guidance**
- Do: call `product_get_component` for a scaffold-type entry (a Dashbook-only pattern, not a shared component).
- Expect: `kind = "dashbook-scaffold"`, `reusePolicy = "reference-guidance"`.
- Rollback trigger: a scaffold advertised as `required-in-svelte` (would force a bad import).

**B3 — every surface agrees (the parity gate, §8.3)**
- Do: compare the `implementation` object for `button` across: `product_get_component`, `product_list_components`, resource `dashbook://components/button`, `/api/components.json`, `/api/components/button.json`.
- Expect: identical routing on all five.
- Rollback trigger: any surface omits or contradicts `implementation` → client-dependent behavior; block until #15 aligns.

**B4 — end-to-end reuse behavior (the money test)**
- Do: in a fresh Claude Code session with the dashbook skill/MCP, hand off a simple screen that includes a button + input + card. Ask it to implement in a SvelteKit target that can consume `@dashfi/svelte`.
- Expect: it emits `import { Button/Input/Card } from '@dashfi/svelte/...'` and does **not** hand-roll local `<button class=…>` / local Card. It queries the MCP for slugs rather than guessing.
- Rollback trigger: it recreates any shared primitive locally → the routing contract isn't changing behavior; the receiving-repo reuse-lint (Layer B) is needed before this is trustworthy.

---

## C. Drift → correctness (urgent item #1)

**C1 — reconciled value is right on every surface**
- Do: for a component the audit reconciled (e.g. `button` `--color-brand-foreground` dark), check the docs page, `product_get_component`, and `/api/components/button.json`.
- Expect: all show the lib-correct light/dark hex (dark brand-foreground = `#000000`, not white).
- Rollback trigger: any surface still shows the pre-reconcile value.

---

## D. Deployed surface (PR preview, then prod)

**D1 — pages render**
- Do: open the preview URL; load `/`, a component page, `/foundations/color`, `/changelog`, `/developers`.
- Expect: 200, correct render, token swatches match the lib.

**D2 — MCP over HTTP**
- Do: on the preview, `initialize`, `tools/list`, `resources/list`, and one representative `product_get_component` + `resources/read`.
- Expect: all respond; no `-32601`; routing present.

**D3 — JSON + llms.txt**
- Do: fetch `/api/components.json`, `/api/components/button.json`, `/api/foundations/*.json`, `/llms.txt`.
- Expect: valid shapes carrying `implementation`; counts match `product_list_components`.

---

## E. Plugin (fresh client)

**E1 — plugin card + commands**
- Do: in a fresh claude.ai / Claude Code session, open the dashbook plugin.
- Expect: correct **version** (post-bump) and the full `/dashbook-*` command list; run one command end-to-end.
- Rollback trigger: stale card/version → the marketplace.json + plugin.json bump didn't propagate (see §10.5).

---

## F. Post-deploy prod smoke + rollback drill

**F1 — prod smoke**
- Do: after deploy, repeat B3 + D1–D3 against `brand.dash.fi`.
- Expect: green.

**F2 — rollback drill (know it cold before you need it)**
- Do (dry, don't execute unless failing): in Vercel, confirm `dpl_498wyWA1BMbM7ypPPp1wHrvs9zuT` is promotable; confirm `git revert` of the merge is clean against tag `prod-checkpoint-2026-07-16`.
- Expect: a one-click re-promote path and a clean revert exist.

---

## Exit bar to call it shipped
- A1–A3 green; A5 proves detection.
- B1–B3 green; **B4 green is the acceptance test for the reuse problem.**
- C1 green.
- D + F1 green on prod.
- E1 green in a fresh client.
