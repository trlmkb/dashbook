# Component change flow — the loop

For adding, updating, or replacing a design system component (Badge, Pill, Button, anything in `@dashfi/svelte`).

If you've done this before and just need a checklist: skip to [The loop](#the-loop).

---

## TL;DR

```
core lib edit → typecheck → bump → commit → publish to npm
              ↓
dashbook spec + page edit → bump dep → pnpm install → check → commit
              ↓
both PRs merged in core + dashbook
```

---

## The three repos

| Repo | Local path | GitHub | Stack | Role |
|---|---|---|---|---|
| **core** | `~/dev/dash/core` | `FunnelDash/core` | Nx monorepo · Go + SvelteKit · AWS Lambda | Backend services + `dashfi-ui` product app + **`@dashfi/svelte`** (the published component lib, at `libs/svelte-components/lib/`) |
| **www.dash.fi** | `~/dev/dash/www.dash.fi` | `trlmkb/dashfi` | Astro 6 + React islands + Tailwind v4 + TinaCMS | The public marketing website (live dash.fi) |
| **dashbook** | `~/dev/dashbook` | `trlmkb/dashbook` | SvelteKit + Vercel | Design-system portal + MCP server. Documents **both** sides. |

> Note: several stale duplicate checkouts exist on disk (`core too`, `core three`, `core-brand`, `www.dash.fi - standalone pages`). Canonical paths are the ones above.

## The map — who consumes what (PRODUCT side)

| Surface | Where | Consumes lib via |
|---|---|---|
| **`@dashfi/svelte` (the lib)** | `~/dev/dash/core/libs/svelte-components/lib/` | itself — source-of-truth |
| **dashfi-ui** (production app) | `~/dev/dash/core/packages/dashfi-ui/app/` | `workspace:` link → auto-updates on lib edit |
| **dashbook** (docs the product side) | `~/dev/dashbook/` (separate repo) | npm package → manual version bump |
| **Storybook for the lib** | `~/dev/dash/core/libs/svelte-components/lib/.storybook/` | same workspace link |

**Why two-repo + npm-bridge for dashbook**: dashbook is a separate Vercel deploy outside the monorepo. It can't workspace-link into core. So lib changes ride to dashbook through an npm publish.

**Key insight**: dashfi-ui sees lib changes immediately (workspace). dashbook needs a published version + dep bump. So `pnpm publish` is the chokepoint.

## The marketing flow is the MIRROR of the product flow

Product components live in code (`@dashfi/svelte`) and dashbook documents them. **Marketing is the opposite**: the source of truth is `www.dash.fi`'s actual Astro source (the `--m-*` / `--ship-*` tokens, the `Ship*` / marketing components), and dashbook **reverse-documents** them as recipes (DOM shape + token roles + gotchas + prop signatures pulled from source), NOT as importable components.

```
PRODUCT:   edit lib  →  publish npm  →  dashbook documents it
MARKETING: ship on www.dash.fi  →  dashbook reverse-documents it (website leads, dashbook follows)
```

So when reconciling marketing specs, read `~/dev/dash/www.dash.fi` source directly — that's ground truth. The marketing `marketing_*` MCP tools serve these reverse-documented recipes. (See PLAN.md §9 "source reconciliation vs /shipping flagship" for a worked example.)

---

## One-time setup

Already done on your machine. Skip if `npm whoami` returns `jurele`.

### npm auth

You have a **granular access token** at npmjs.com with:
- Scope: `@dashfi`
- Permission: Read and write
- **Bypass 2FA toggled ON** — so `pnpm publish` doesn't need an OTP every time

Token lives in `~/.npmrc`:
```
//registry.npmjs.org/:_authToken=npm_xxxxxx
```

If the token expires (typical 1-year expiry), generate a new one at npmjs.com → Profile → Access Tokens → Generate New → Granular, then replace the line in `~/.npmrc`.

### Verify auth

```bash
npm whoami      # → jurele
```

---

## The loop

Concrete commands. Branch names use placeholders — substitute your real ticket number / scope.

### Step 1 — Lib changes in core (1 PR)

```bash
cd ~/dev/dash/core
git checkout master && git pull --ff-only
git checkout -b EN-XX/<branch-name>

# Edit lib source
# - libs/svelte-components/lib/src/lib/ui/<component>/   ← the component
# - libs/svelte-components/lib/src/lib/styles/global.css ← if tokens change
# - libs/svelte-components/lib/src/lib/design-system/tailwind/config.ts ← if tokens added
# - libs/svelte-components/lib/src/lib/ui/<component>/<component>.stories.svelte ← keep Storybook in sync

# If a variant was renamed/removed, migrate dashfi-ui consumers:
# - find packages/dashfi-ui/app/src -name '*.svelte' -exec sed -i '' 's/old-variant/new-variant/g' {} +
# - or sed-by-pattern per the change

# Bump version
# Edit libs/svelte-components/lib/package.json — "version": "0.x.y"
# Convention: any visual / API change on a 0.x package bumps minor. Bug-fix-only is patch.

# Verify
pnpm nx run dashfi-ui-app:typecheck
pnpm nx run dashfi-ui-app:lint

git add -A
git commit -m "EN-XX: <what changed in 60 chars>"
git push -u origin EN-XX/<branch-name>
# open PR
```

### Step 2 — Publish the lib to npm

You can publish either pre-merge (lets you start the dashbook PR while core PR is in review) or post-merge (cleaner — master + npm always in sync). Both work.

```bash
# From the lib directory:
cd ~/dev/dash/core/libs/svelte-components/lib

# Build dist/ (only this builds the publishable artifact)
pnpm nx run svelte-components:build

# Sanity-check what would publish (optional)
pnpm pack       # produces dashfi-svelte-0.x.y.tgz
tar -tzf dashfi-svelte-0.x.y.tgz | head -20  # inspect contents
rm dashfi-svelte-0.x.y.tgz                   # don't commit this

# Publish — --no-git-checks lets you publish from a feature branch with no OTP prompt
# (your token has bypass-2FA so no --otp needed)
pnpm publish --access public --no-git-checks

# Verify
npm view @dashfi/svelte versions  # should show your new version on top
```

**Note on `--no-git-checks`**: this skips both the "publish from master" and "clean tree" guards. Acceptable on a personal trusted machine. If you'd rather be strict, publish only from master after the PR merges — same outcome.

### Step 3 — Dashbook docs update (1 PR, separate repo)

```bash
cd ~/dev/dashbook
git checkout main && git pull --ff-only
git checkout -b EN-XX/<related-branch-name>

# Update the spec — describes anatomy + variants + tokens
# - src/lib/specs/components/<component>.ts

# Update the rendered page — preview, examples, comparison tables, code snippet
# - src/routes/components/<component>/+page.svelte

# Bump the lib dep version
# Edit package.json — "@dashfi/svelte": "^0.x.y"
# (^ on 0.x packages requires explicit minor bump — semver treats 0.x minor as breaking)

# Install + verify
pnpm install
pnpm check
pnpm build  # optional but catches prerender issues

# Add a Done row to PLAN.md §9
git add -A
git commit -m "EN-XX: <component> docs + dep bump @dashfi/svelte ^0.x.y"
git push -u origin EN-XX/<related-branch-name>
# open PR
```

### Step 4 — Merge order

1. Merge core PR (master gets the lib code matching the already-published npm version)
2. Merge dashbook PR (Vercel auto-deploys, live portal updates)

If dashbook PR opens first and gets a PLAN.md conflict from a v1.0.0-style merge: `git rebase origin/main`, resolve PLAN.md (almost always "keep both"), `git push --force-with-lease`.

---

## Gotchas decoded

| Error | What it means | Fix |
|---|---|---|
| `ERR_PNPM_GIT_UNCLEAN` | Working tree has uncommitted changes | Commit first OR add `--no-git-checks` |
| `ERR_PNPM_GIT_NOT_CORRECT_BRANCH` | pnpm's `publish-branch` is set to master, you're on a feature branch | Add `--no-git-checks` OR merge first and publish from master |
| `403 Two-factor required` | Token doesn't have bypass-2FA, or no token at all | Use `--otp=<6-digit code>` once, OR regenerate token with bypass-2FA |
| `402 Payment required` | Scoped package needs explicit public access | Add `--access public` to the publish command |
| `EBADDEVENGINES Node 24` | Repo's devEngines wants Node 24, you're on 22 | `nvm use 24` — npm CLI enforces this; pnpm tolerates Node 22 fine |
| `Already published` | Can't republish the same version | Bump version, try again |
| `# in env value gets stripped` | `.env.local` treats `#` as comment | Quote the value: `KEY="value#with#hash"` |
| `pnpm install` says "Already up to date" but version stayed at old | `package.json` edit didn't save, or you forgot to bump | Verify `cat package.json \| grep dashfi/svelte`, fix, run install again |
| PR shows conflict on PLAN.md | Main got a v1.0.0-style commit that touched PLAN.md too | `git rebase origin/main`, resolve PLAN.md (keep both), `git push --force-with-lease` |
| Rebase preserved the wrong commit message | The branch's HEAD was named after old work | `git commit --amend -m "new message"`, then `git push --force-with-lease` |

---

## Hygiene rules learned this session

- **Stories file only renders its own component.** `badge.stories.svelte` should not import Pill. If the story would naturally use Pill (e.g. "card with a status"), rewrite the example to use Badge for its real purpose (tier marker, count, category) and add a comment pointing to `pill.stories.svelte` for status.
- **Tailwind palette colors (`bg-green-100`, `bg-orange-100`) are a smell in the lib.** If you find them mid-write, that's a signal a semantic token is missing — add `--success` / `--warning` style tokens to `global.css` + Tailwind config + use them, don't ship raw palette colors.
- **Dashbook documents the lib, not vice versa.** Lib is code-truth. Dashbook's spec files mirror what the lib actually does. When they disagree, the lib wins.
- **One JSDoc, one comparison page.** Lib's JSDoc on the component is the canonical "when to use." Dashbook expands it with examples. Don't write the same prose in three places — link to the JSDoc from the spec's `whenToUse` field.

---

## Why this shape

`@dashfi/svelte` is published to npm because dashbook (the public design system portal) lives in a separate repo on Vercel and can't workspace-link into the core monorepo. The npm publish is the bridge.

If we ever fold dashbook into the core monorepo, the publish step goes away and dashbook can `workspace:` the lib like dashfi-ui does today. That's tracked as the `core/packages/brand/` migration in `PLAN.md` §9, deferred for now.

---

## Pointers

- **Core CLAUDE.md** — has a short summary of this flow with the key commands. See `~/dev/dash/core/CLAUDE.md` § "Design system component changes" (if added).
- **/use/maintainer** on dashbook — the public-facing maintainer runbook. Has version-bump info but predates the structured component-change flow. Treat this file as authoritative when they disagree.
- **PLAN.md §9** — historical record of past component changes. Useful for seeing real examples of how Done rows are written.
