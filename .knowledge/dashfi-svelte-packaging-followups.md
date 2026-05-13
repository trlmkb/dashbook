# @dashfi/svelte packaging — follow-ups for the next publish

Internal engineering notes. Created 2026-05-13 after publishing v0.0.1.

## Context

`@dashfi/svelte@0.0.1` shipped to public npm on 2026-05-13 from
`core/libs/svelte-components/lib` on branch `EN-XX/design-vnext--sidebar-feature`.

Dashbook's Vercel build had been failing because the previous `link:` resolution
to the sibling core repo only worked locally. Publishing to npm unblocked
production deploys.

The published `v0.0.1` works but has three packaging bugs that I worked around
in dashbook's `package.json` by adding explicit transitive deps. The lib should
fix these properly in its next version.

---

## 1. Move runtime deps from `devDependencies` to `dependencies` or `peerDependencies`

Several packages are imported from the published `dist/` but only declared in
`devDependencies`. Consumers running `npm install @dashfi/svelte` don't get
them, and Rollup fails to resolve at build time:

| Package | Used by | Currently in |
| --- | --- | --- |
| `svelte-radix` | `ui/breadcrumb/breadcrumb-ellipsis.svelte` (and others importing `svelte-radix/Check.svelte`, `ChevronRight.svelte`, `DotFilled.svelte`, `DotsHorizontal.svelte`, `Minus.svelte`) | `devDependencies` |
| `svelte-tel-input` | `ui/phone-input/phone-input.svelte`, `ui/tel-input/...` | `devDependencies` |
| `formsnap` | `ui/form/...` (FormField composition) | `devDependencies` |
| `@internationalized/date` | `ui/calendar/...`, `ui/range-calendar/...` | `devDependencies` |

**Fix:** decide per package whether it should be `dependencies` (the lib owns
the version constraint) or `peerDependencies` (consumers pick the version).
Most likely all four should be `peerDependencies` to match the convention
established by `svelte`, `bits-ui`, `clsx`, `date-fns`, etc.

Until then, dashbook works around it by listing all four in its own
`dependencies`. See `dashbook/package.json` after commit `d51b4c4`.

## 2. Filter test / Storybook leftovers out of `dist`

Bare imports from the published `dist/` that should not be there:

- `@faker-js/faker` — from compiled `.stories.svelte.js` files leaking into dist
- `@storybook/addon-svelte-csf` — same source
- `@dash-components/ui` — internal alias, accidentally pinned through compile

These don't break dashbook's build (nothing in the consumer import path reaches
them) but they:
- inflate the tarball
- show up in `pnpm peers check` warnings
- will eventually break a downstream consumer that imports something different

**Fix:** add `.stories.*` to the `files` exclude or `.npmignore`, and verify
the `vite build` step in the lib's build script excludes Storybook chunks.

## 3. Fix `sideEffects` glob

Current `package.json`:

```json
"sideEffects": ["lib/ui/**/*.css"]
```

But the actual shipped path is `dist/ui/**/*.css` because `files` only includes
`dist`. Tree-shaking bundlers will drop component CSS as a result.

**Fix:**

```json
"sideEffects": ["dist/ui/**/*.css"]
```

Verify by importing one component into a stripped-down consumer and confirming
the CSS still ships in the output bundle.

---

## Verification recipe for the next publish

After bumping version and fixing the above:

```sh
cd core/libs/svelte-components/lib
pnpm build
pnpm publish --access public --no-git-checks --dry-run

# Verify in the dry-run tarball listing:
#   - catalog:* refs are resolved to real version strings ✓
#   - dist/ exists with all ui/<name>/ subdirs ✓
#   - .stories.svelte / @faker-js / @storybook refs are GONE
#   - sideEffects glob points at dist/

# In a fresh dir, simulate a consumer install:
mkdir /tmp/dashfi-svelte-check && cd /tmp/dashfi-svelte-check
npm init -y
npm install @dashfi/svelte@<new-version>
# Should install with NO missing-peer warnings for svelte-radix /
# svelte-tel-input / formsnap / @internationalized/date.
```

Then in dashbook, after the new version is live:

```sh
cd ~/dev/dashbook
pnpm update @dashfi/svelte@latest
# Optionally drop the four transitives we added in commit d51b4c4 if the
# lib now declares them properly:
pnpm remove svelte-radix svelte-tel-input formsnap @internationalized/date
pnpm build  # should still succeed
```
