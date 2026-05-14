# Deploy — Dashbook → brand.dash.fi

Production target: **`brand.dash.fi`** on Vercel. Fully public, no auth, prerendered static.

---

## 1. One-time Vercel setup

### Connect the repo

1. Sign into Vercel with the dashfi org account.
2. **New Project → Import Git Repository** → pick `trlmkb/dashbook`.
3. Framework preset: **Other** (Vercel auto-detects SvelteKit's `package.json` script + `vercel.json`).
4. Root directory: `.` (default).
5. Build & output settings: leave defaults — `vercel.json` overrides them with:
   ```
   buildCommand:     pnpm build
   installCommand:   pnpm install --frozen-lockfile
   outputDirectory:  build
   ```
6. Environment variables: **none required** for the portal itself. (`@dashfi/svelte` is consumed via the `link:` symlink at dev time — at build time we resolve the published version from the workspace.)

### Wire the domain

1. In the Vercel project → **Settings → Domains** → add `brand.dash.fi`.
2. In whoever owns DNS for `dash.fi`, add a CNAME record:
   ```
   brand.dash.fi.   CNAME   cname.vercel-dns.com.
   ```
   (Or use the A-record values Vercel shows in the domain panel — Vercel auto-configures the SSL cert.)
3. Wait for DNS propagation (usually < 5 min). The domain status in Vercel flips to "Valid Configuration" once it's live.

### Preview branches

Vercel automatically creates preview deployments for every PR branch (URL: `dashbook-<branch>-<hash>.vercel.app`). No extra config needed.

The production deployment is gated to merges into `main`. Any commit to `main` triggers a production rebuild.

---

## 2. The build pipeline

```bash
# Triggered by Vercel on every push
pnpm install --frozen-lockfile
pnpm build                           # → ./build/  (static output)
# Vercel serves ./build/ directly
```

What `pnpm build` does:

1. `vite build` — bundles client + server with SvelteKit
2. `adapter-static` prerenders every reachable route into the `./build/` directory
3. `fallback: 'index.html'` is set so non-prerendered routes (e.g. `/components/sheet` if we opt that out again) fall back to SPA hydration

**Build time on Vercel free tier**: typically ~2-3 minutes (the bottleneck is svelte-check + Shiki theme compilation). Production-tier infra is faster.

---

## 3. `vercel.json` highlights

Lives at the repo root.

| Header rule | What it does |
|---|---|
| `/fonts/*` immutable cache | PP Supply + Bai Jamjuree fonts cached for a year |
| `/assets/*` immutable cache | Brand SVGs cached for a year |
| `/_app/immutable/*` immutable cache | SvelteKit hashed-name bundles cached for a year |
| Global `X-Content-Type-Options: nosniff` | Default security hardening |
| Global `Referrer-Policy: strict-origin-when-cross-origin` | Reasonable privacy default for outbound links |
| Global `Permissions-Policy: interest-cohort=()` | Disable Google FLoC tracking |
| `cleanUrls: true` | `/components/button` instead of `/components/button.html` |
| `trailingSlash: false` | Always strip trailing slashes |

---

## 4. Lib changes that affect dashbook builds

The portal consumes `@dashfi/svelte` via `link:`. That works locally because the lib is a sibling repo on disk. **For Vercel, the lib must be available as a regular npm dependency at build time** — Vercel doesn't have `/Users/zy/dev/dash/`.

Two viable paths:

### Option A — Publish `@dashfi/svelte` to an internal npm registry

GitHub Packages (`@dashfi/svelte` → `https://npm.pkg.github.com`) or a private npm registry the dashfi org owns.

- Publish from CI on lib `main`: `pnpm publish --registry https://npm.pkg.github.com`
- Add `.npmrc` to dashbook:
  ```
  @dashfi:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
  ```
- Add `GITHUB_TOKEN` env var in Vercel (read:packages scope).
- Update dashbook `package.json` to:
  ```
  "@dashfi/svelte": "^X.Y.Z"
  ```

### Option B — Vendor the lib as a git submodule + build it at install time

- Add `dash` as a git submodule at `./vendor/dash`.
- In `pnpm-workspace.yaml` (root of dashbook), reference `./vendor/dash/core/libs/svelte-components/lib`.
- Build script: `pnpm --filter @dashfi/svelte run build`.
- More fragile; only use if the team can't publish.

### Option C — Bake the lib into dashbook

- One-time copy of `libs/svelte-components/lib/dist/` into `dashbook/vendor/dashfi-svelte/`.
- Reference via `file:./vendor/dashfi-svelte` in `package.json`.
- Manual sync on every lib release.
- Only viable if lib releases are rare.

**Recommendation: Option A.** Standard, scalable, fast. The team will need a published lib anyway when consumers outside the monorepo (e.g. partner-issued white-label apps) start showing up.

---

## 5. Preview the production build locally

```bash
cd /Users/zy/dev/dashbook
pnpm build                           # creates ./build/
pnpm preview                         # serves ./build/ on http://localhost:4173
```

Open http://localhost:4173 — this is byte-equivalent to what Vercel will serve. Smoke-test the routes that depend on prerender:

- `/changelog` — filter chips work, anchor IDs work (visit `/changelog#v0-8-0`)
- `/components/button` — code snippet renders with Shiki theme
- `/foundations/data-viz` — EnhancedTable preview renders
- `/brand/logo` — AssetConfigurator renders, "Download bundle (.zip)" works
- ⌘K — palette opens with the 100+ search index

---

## 6. Rollback

Vercel keeps every deployment forever. To roll back:

1. Project → **Deployments**.
2. Find the last good deployment by SHA or timestamp.
3. Click **⋯ → Promote to Production**.

Takes ~10 seconds; no rebuild required.

---

## 7. Pre-deploy checklist

Before the first production push:

- [ ] `pnpm check` — 0 errors locally
- [ ] `pnpm build` — succeeds locally and writes to `./build/`
- [ ] `pnpm preview` — every route in the 8-page IA loads, components render
- [ ] `@dashfi/svelte` published (Option A) or vendored (Option B/C)
- [ ] DNS for `brand.dash.fi` is owned by an account someone in the dashfi team can edit
- [ ] PLAN.md §9 reflects the v0.8.0 cut
- [ ] FIGMA_HANDOFF.md placed somewhere accessible to the design team (or moved into the Figma file once Phase 7 ships)
- [ ] Legal disclosure copy on `/press` has been reviewed by compliance — currently sourced from dash.fi/legal but not signed off

---

## 8. Post-deploy verification

```bash
# Sanity checks against brand.dash.fi
curl -sI https://brand.dash.fi | head -5            # 200 OK + cache headers
curl -s https://brand.dash.fi/_app | head -c 200    # static bundle is served
curl -sI https://brand.dash.fi/fonts/PPSupplyMono-Regular.otf | grep -i cache
                                                    # immutable cache header present
```

If `curl -I` returns anything other than `200 OK`, check the Vercel deployment logs.

Manual smoke test:
1. Visit `/` — overview loads, audience tiles render
2. Visit `/changelog` — filter chips work, v0.8.0 has "Latest" badge
3. Visit `/components/button` — Preview / Code / Docs / Anatomy tabs all switch
4. Visit `/brand/logo` — AssetConfigurator color swatches respond, "Download" produces a real file
5. Open ⌘K — type "transaction" — returns the Transaction list pattern
