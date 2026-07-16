# Dashbook — project guide for agents

**Read `.knowledge/dashbook-operating-model.md` first.** It is the canonical
operating contract (authority model, design→code handoff, drift audit, Nx
migration) and carries an agent startup checklist (§19). When any other doc,
skill, PR description, or prompt disagrees with it, follow its precedence rules.

## The one thing to get right

`@dashfi/svelte` (core `libs/svelte-components/lib`) is the product component
authority; the dash.fi website is the marketing authority; **Dashbook is a
downstream mirror today.** A mismatch in Dashbook is corrected in Dashbook —
never pushed upstream. In a SvelteKit target that can consume `@dashfi/svelte`,
**import the shared component; do not recreate it** from anatomy/Foundation,
even if a Claude Design frame matched visually.

## Primary surface

People consume Dashbook mostly through **MCP + skills**, not the web pages. A
change that looks right in the browser but breaks MCP/JSON/skill output is not
done.

## Current state is perishable

Never trust counts, versions, or PR/deploy states written in any doc. Run
`gh pr list`, `pnpm spec-audit`, and the MCP list tools for the live picture.

## Checks before calling a change done

```
pnpm check && pnpm lint && pnpm test && pnpm spec-audit && pnpm build
```

Repo-wide lint has a known baseline — prove no NEW failures, don't claim a clean
run. Always tell the human to run the build/checks and to test the change
manually before it is considered verified.
