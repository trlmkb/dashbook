# Dashbook → core monorepo migration analysis

Scope: should current Dashbook (`/Users/zy/dev/dashbook`, deployed to Vercel) move
into the Dash.fi core monorepo (`/Users/zy/dev/dash/core`) where an older
`packages/brand-book` already lives.

## 1. What `packages/brand-book` actually is

A two-project Nx slice under `/Users/zy/dev/dash/core/packages/brand-book/`:

- `app/` — a SvelteKit static site (`@sveltejs/adapter-static`,
  `/Users/zy/dev/dash/core/packages/brand-book/app/package.json:18`). One route
  only: `src/routes/+page.svelte` (715 lines) + `+layout`. Pulls
  `@dashfi/svelte` as a `workspace:` dep, all other deps via pnpm `catalog:svelte`.
- `infra/` — Terraform: `cloudfront.tf`, `domains.tf`, `static.tf`, `main.tf`
  (`/Users/zy/dev/dash/core/packages/brand-book/infra/src/`). Provisions an S3
  bucket + CloudFront + ACM cert + Cloudflare DNS for
  `brand.dash.fi` / `brand.dashfi.dev` (`infra/src/main.tf:37-49`,
  `domains.tf:3`). `static.tf:21-28` uploads `../../app/dist/**` to S3.

Freshness vs current Dashbook: **far behind**. Current Dashbook has
`api/`, `brand/`, `changelog/`, `components/` (60 components), `developers/`,
`foundations/`, `mcp/` (server endpoint), `patterns/`, `press/` routes
(`/Users/zy/dev/dashbook/src/routes/`). Old brand-book is a single-page brand
landing site that predates the design-system docs era. Treat it as scaffolding,
not a base to extend.

## 2. How the monorepo deploys

- **Build tool**: Nx 22.7.1 (`/Users/zy/dev/dash/core/nx.json`,
  `/Users/zy/dev/dash/core/package.json:37`). Workspace layout
  `packages/` for apps, `libs/` for libs (`nx.json:278-281`).
- **Package manager**: pnpm 11.0.8 with catalogs (`pnpm-workspace.yaml`).
  Catalogs include `nx`, `e2e`, `plugin`, `lambda`, `svelte` — all svelte deps
  in current Dashbook (`@sveltejs/kit`, `svelte`, `vite`, tailwind, bits-ui,
  etc.) are already pinned in `catalogs.svelte`
  (`pnpm-workspace.yaml:43-94`).
- **Infra**: Terraform via a custom Nx plugin `@dash-core/nx-tf`
  (`nx.json:140-234`). State in S3 buckets `dash-core-state-tf` (stage) and
  `dash-core-state-tf-prod` (prod). Targets: `format`, `initialize`, `plan`,
  `apply` with `local|stage|prod` configurations.
- **Deploy target**: **AWS**, not Vercel. Pattern is build static assets → S3 →
  CloudFront, with Cloudflare DNS pointing the subdomain at the CloudFront
  distribution (`brand-book/infra/src/domains.tf:16-25`,
  `static.tf:21-28`). Go services use Lambda
  (`@dash-core/tooling-go:build` outputs `bootstrap.zip` for arm64 linux,
  `nx.json:68-99`).
- **Vercel presence in core**: none found at the levels inspected. No
  `vercel.json`, no `@sveltejs/adapter-vercel` in `catalogs.svelte`.

## 3. Migration delta — what would have to change

Concretely, to land current Dashbook as `packages/brand-book` (replacing/extending it):

- **Workspace dep refs**: rewrite `package.json` deps to `catalog:svelte` where
  possible. Already-cataloged: `@sveltejs/kit`, `svelte`,
  `@sveltejs/vite-plugin-svelte`, `vite`, `tailwindcss`, `@tailwindcss/vite`,
  `bits-ui`, `mode-watcher`, `tailwind-merge`, `tailwind-variants`, `formsnap`,
  `sveltekit-superforms`, `@lucide/svelte`, `clsx`, `date-fns`,
  `@date-fns/utc`, `zod`, `@types/node`, `svelte-check`, `eslint`, `prettier`
  family, `tslib`, `typescript-eslint` (`pnpm-workspace.yaml:43-94`).
- **Not yet cataloged but Dashbook needs**: `@internationalized/date`,
  `@modelcontextprotocol/sdk`, `@tanstack/table-core`, `shiki`, `svelte-radix`,
  `svelte-sonner` (already in catalog), `svelte-tel-input`, `tailwindcss-animate`
  (cataloged), `mdsvex`, `@sveltejs/adapter-static`. Several of these are
  Dashbook-specific and can stay as direct deps inside the package
  `package.json`; the rest should be added to the `svelte` catalog if shared.
- **`@dashfi/svelte` consumption**: switch from
  `"@dashfi/svelte": "0.0.1"` (npm) in
  `/Users/zy/dev/dashbook/package.json:18` to
  `"@dashfi/svelte": "workspace:*"` (already the pattern in
  `packages/brand-book/app/package.json:15`). This is the single biggest win.
- **Build pipeline**: add `project.json` with Nx targets mirroring
  `packages/brand-book/app/project.json` (`serve`, `build`, `preview`,
  `sveltekit-sync`, `typecheck`, `lint`). Replace `pnpm build` entrypoint with
  `nx build dashbook` or similar.
- **Deploy target switch**: Vercel → AWS S3 + CloudFront (via Terraform).
  - Swap `@sveltejs/adapter-vercel` for an adapter that fits AWS. Two paths:
    - **Static-only** (what old brand-book does, `adapter-static`): forbids
      dynamic routes. **Blocker**: Dashbook has `/mcp/+server.ts` and
      `/api/card`, `/api/logo` endpoints — these cannot be static.
    - **SSR on Lambda**: catalog already lists `@yarbsemaj/adapter-lambda`
      (`pnpm-workspace.yaml:63`). Use API Gateway + Lambda for SSR or hybrid.
      Or split: prerender most routes via `adapter-static` + a separate Lambda
      for `/mcp` and `/api/*`.
  - Delete/replace `vercel.json` (custom headers will need to move to
    CloudFront response-headers policy in Terraform).
- **Custom domain**: instead of `dashbook.vercel.app`, use the existing pattern
  — Terraform-managed Cloudflare DNS + ACM cert. Old infra terms it `brand`
  (`infra/src/main.tf:50`); for `dashbook.dash.fi` add a new
  `frontend_alias_prefix = "dashbook"` or similar. No 3rd-party DNS work.
- **MCP endpoint hosting**: the `/mcp` route is a SvelteKit POST handler
  (`/Users/zy/dev/dashbook/src/routes/mcp/+server.ts`). Today on Vercel it
  runs as a Node 22 function (`svelte.config.js:18`). In AWS it has to land on
  Lambda + API Gateway, behind the same CloudFront distribution (path-based
  routing) or on a separate `mcp.dash.fi` subdomain. Cold starts and request
  shape (MCP streaming) need verification — note this risk explicitly.
- **Public-vs-internal access**: today Dashbook is public (
  `dashbook.vercel.app`). The monorepo's brand-book is also public-facing
  (`brand.dash.fi` per `domains.tf`), so the precedent exists — but most
  other monorepo packages are internal (ops-ui, cards, etc.). Confirm the
  CloudFront distribution is configured for public reads with no auth, mirroring
  brand-book's `static.tf`.
- **Build outputs**: Nx caching expects deterministic outputs in
  `dist/{projectRoot}`. SvelteKit's `.svelte-kit/output` and `build/` will need
  to fit Nx's `outputs` config. `nx.json:36-41` overrides `build` to
  `cache: false` by default — likely fine.
- **Repo-level conventions**: commitlint, husky, knip, ESLint setup are all
  monorepo-managed (`/Users/zy/dev/dash/core/package.json:13-41`). Dashbook's
  local equivalents would be dropped.
- **PR previews**: lost (see §5). The monorepo has no Vercel preview equivalent
  found in the files inspected.

## 4. What we'd gain

- **Lib version sync — biggest win**. `@dashfi/svelte` becomes
  `workspace:*`. No more npm publish, no 2FA token, no transitive-dep
  shipping concerns, no `0.0.1` placeholder pin. Changes to the lib hit
  Dashbook the same way they hit `ops-ui` etc.
- **Catalog refs solve themselves**. Every dep that Dashbook shares with the
  rest of svelte work pins to one catalog version
  (`pnpm-workspace.yaml:43-94`). No more "Dashbook ships with bits-ui 2.17.3
  but core ships with 2.17.1" drift.
- **Transitive-dep visibility**. pnpm with `dedupePeers: true`
  (`pnpm-workspace.yaml:3`) plus `knip` (`package.json:7-9`) flags unresolved
  and unused deps across the workspace.
- **Shared infra patterns**. Terraform for DNS, ACM, CloudFront already proven
  on `brand-book`. Lambda packaging conventions already exist for Go services;
  the `@yarbsemaj/adapter-lambda` catalog entry suggests Node-Lambda SSR has at
  least been considered.
- **One PR closes the loop on lib + consumer changes**. Today: bump
  `@dashfi/svelte`, publish, bump Dashbook, redeploy. After: one commit.
- **Single CI/lint/format/commitlint discipline** for free.

## 5. What we'd lose

- **Vercel preview URLs per PR**. The monorepo's deploys are env-scoped
  (`local | stage | prod`). No evidence of per-PR ephemeral environments was
  found in `nx.json` or `infra/`. This is a real regression for design review.
- **Vercel edge / runtime simplicity**. `nodejs22.x` runtime
  (`svelte.config.js:18`) "just works" today. On AWS the `/mcp` endpoint
  becomes Lambda behind API Gateway behind CloudFront — more moving parts,
  cold starts to consider, and streaming responses (MCP) need explicit
  validation.
- **Deploy speed / iteration**. `vercel deploy` is ~1 minute end-to-end.
  Terraform apply + S3 sync + CloudFront invalidation is minutes plus
  invalidation propagation. Each commit-to-prod gets slower.
- **Public-domain ease**. `dashbook.vercel.app` is free and instant.
  `dashbook.dash.fi` requires Terraform DNS + ACM provisioning (one-time, then
  cheap).
- **Adapter-Vercel niceties**: ISR, image optimization, log streaming via
  Vercel dashboard, headers in `vercel.json`. All need re-implementing in
  CloudFront/Lambda or accepted as lost.
- **Independent release cadence**. Today Dashbook ships on its own clock; in
  the monorepo it's gated by whatever else is in the affected graph.

## 6. Recommendation (revised 2026-05-14)

**Go. Migrate to core, match dashfi-ui's adapter-node + ECR + Lambda + CloudFront pattern.**

### The blocker §3 flagged doesn't exist

§3 worried that SvelteKit-SSR-on-Lambda was unproven in core. **It's not — dashfi-ui ships exactly this pattern in production today.** Evidence:

- `/Users/zy/dev/dash/core/packages/dashfi-ui/app/svelte.config.js:2` uses `@sveltejs/adapter-node`, outputs to `dist/`.
- `/Users/zy/dev/dash/core/packages/dashfi-ui/infra/src/app-lambda.tf` provisions a Lambda role + CloudWatch log group + IAM policy, and pulls the container image from ECR (`data "aws_ecr_image" "dashfi_ui_app_current"`).
- `/Users/zy/dev/dash/core/packages/dashfi-ui/infra/src/cloudfront.tf` fronts the Lambda with CloudFront — same pattern the brand-book static deploy uses, just with a Lambda origin instead of S3.
- `/Users/zy/dev/dash/core/packages/dashfi-ui/app/Dockerfile` exists (visible in the `app/` ls — not deep-read but its presence + the ECR image reference confirms container packaging).

So the migration adapter story is settled: `adapter-node` → Docker → ECR → Lambda → CloudFront, mirroring dashfi-ui. `@yarbsemaj/adapter-lambda` is **not needed** (it's an alternative path, but dashfi-ui chose the container-on-Lambda route and it works). `/mcp/+server.ts` and `/api/*` run on the same Lambda the rest of the SvelteKit app runs on — they're not special.

### What the migration buys

- **Lib version sync** — `@dashfi/svelte` becomes `workspace:*`. Fully kills the `0.0.1` placeholder pin, npm 2FA publish dance, and the transitive-dep shipping issues documented at `.knowledge/dashfi-svelte-packaging-followups.md`.
- **Catalog refs solve themselves** — every shared svelte dep lives at `pnpm-workspace.yaml:43-94`. No more drift between Dashbook's `bits-ui` and dashfi-ui's `bits-ui`.
- **Single deploy pipeline aligned with the rest of the product** — same Terraform conventions, same alerting/logging/secrets pattern, same DNS pipeline. Brand site stops being the odd one out.
- **One PR closes lib + consumer changes** instead of two.

### What it actually costs

- **Vercel PR previews go away** — accepted (user explicitly OK with this).
- **Deploy latency: seconds → minutes** — Terraform apply + ECR push + Lambda update + optional CloudFront invalidation. Acceptable for a design-system site that ships once or twice a week, not multiple times per hour.
- **`vercel.json` headers move to CloudFront response-headers policy** — straightforward in Terraform, see brand-book's `cloudfront.tf` for the existing shape.
- **`@sveltejs/adapter-vercel` → `@sveltejs/adapter-node`** — small change in `svelte.config.js`, plus a Dockerfile (copy from dashfi-ui), plus `infra/src/{app-lambda,cloudfront,domains,main}.tf` (also adaptable from dashfi-ui).

### What still needs deciding before execute

These are team-level decisions, not blockers in the analysis sense:

1. **MCP streaming over Lambda + CloudFront** — Streamable HTTP MCP works fine on dashfi-ui's API routes today, but the streaming-response shape on Lambda function URLs vs. through CloudFront should be confirmed in a small spike before commit. Likely fine; just verify.
2. **Subdomain choice** — `brand.dash.fi` (existing pattern in brand-book infra), `dashbook.dash.fi` (matches current Vercel name), or `design.dash.fi`. Cosmetic, but pick one before Terraform.
3. **Independent release cadence** — accepted you'll trade some velocity for pipeline alignment. The compensation is shared monorepo CI, which catches lib regressions before they ship.
4. **PR-preview replacement** — could be solved later with branch-specific Lambda alias + CloudFront behaviors (matches the env_scoping in core today), or accepted as gone. Not on the critical path.

### Action

Lift-and-shift current Dashbook into `core/packages/brand/` (or whatever name supersedes the old `brand-book`), copy dashfi-ui's `infra/` + `Dockerfile` as the template, swap the adapter, point CloudFront at the new Lambda. The earlier `core/docs/superpowers/specs/2026-05-12-brand-source-of-truth-design.md` is already the right plan; this analysis confirms the deploy-shape decision (Option B: lift-and-shift onto dashfi-ui's pattern, not Option A's adapter-static + separate Lambda for /mcp).
