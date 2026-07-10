<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';

	const releaseFlow = `# Standard release cycle (most days):
cd /Users/zy/dev/dashbook
# make changes …
pnpm check                    # expect 0 errors
pnpm dev                      # http://localhost:5173 — smoke-check visually
# update PLAN.md §9 with a Done row for what you just did
git add -A
git commit -m "EN-XX: <one-line scope>"   # uses the team's commit convention
git push                      # → Vercel auto-deploys; ~60s to live

# After the deploy, open https://dashbook.vercel.app to verify`;

	const addComponentSteps = `# 1. Create the typed spec
src/lib/specs/components/<slug>.ts
# Use an existing one as a template — e.g. button.ts has the full shape.

# 2. Register it in the index
src/lib/specs/components/index.ts        # alphabetical
src/lib/content/components.ts            # sidebar + search

# 3. Create the docs page
src/routes/components/<slug>/+page.svelte
# Use ComponentLayout. Reference button/+page.svelte as the template.

# 4. (Optional) Add to nav if it's a featured component
src/lib/content/nav.ts

# 5. Verify
pnpm check                               # spec type-checks
pnpm dev                                 # visit /components/<slug>`;

	const addPatternSteps = `# 1. Add the content entry
src/lib/content/patterns.ts
# Fields: slug, name, description, category, uses, optional draft flag.
# Categories: Shells · Data · Forms · Confirmation · States · Layout · Architecture.

# 2. Create the page
src/routes/patterns/<slug>/+page.svelte
# Use PatternLayout. Best templates:
#   - transaction-list/+page.svelte   (data recipe)
#   - empty-zero-state/+page.svelte   (simple state)
#   - url-state-dialog/+page.svelte   (architecture w/ live demo)

# 3. Update nav
src/lib/content/nav.ts                   # add child under Patterns

# 4. Verify
pnpm check
pnpm dev                                 # visit /patterns/<slug>`;

	const addCardVariantSteps = `# Append a new variant to src/lib/chrome/card-sources.ts:

export const cardVariants: CardVariant[] = [
  { id: 'jade', label: 'Jade', /* … */ },
  {
    id: 'cobalt',                        // kebab-case; ends up in URLs + MCP tool args
    label: 'Cobalt',
    description: '…',
    status: 'production' | 'draft',
    usedForBins: ['12345'],              // which BINs ship this variant
    bg: '#354CEF',
    gradient: { /* … */ },
    wordmarkFg: '#FFFFFF',
    appIcon: { bg: '#354CEF', glyph: '#FFFFFF', radius: 0.2 }
  }
];

# No other code changes needed — generators are variant-agnostic.
# Verify in /brand/card configurator and via:
#   curl http://localhost:5173/api/card/<id>/preview`;

	const tokenUpdate = `# Tokens are defined in two places that must stay in sync:

# 1. src/app.css           — the runtime CSS vars (--bg, --primary, etc.)
# 2. src/lib/tokens.ts     — typed exports for MCP/JSON API/spec consumers

# Update both. Then:
pnpm check
pnpm dev
# visit /foundations/color to confirm the token surfaces with the new value
# visit /foundations/typography or /spacing as relevant`;

	const versionBumpFlow = `# Four independent versioned things:

# Dashbook portal (this repo)
package.json   "version": "x.y.z"
# Bump on release-worthy changes. Currently 1.0.0 (first declared-stable release).

# Claude plugin manifest (Channel B — see §8)
claude-plugin/.claude-plugin/plugin.json   "version": "x.y.z"
.claude-plugin/marketplace.json   plugins[].version   "x.y.z"
# Bump BOTH together on skill/command/MCP-server-entry changes — the admin
# card reads marketplace.json, not plugin.json. Currently 0.3.0.

# @dashfi/mcp-server (the npm CLI proxy)
packages/mcp-server/package.json   "version": "x.y.z"
# Bump on additive features (new tools, new resources) or breaking changes
# (tool signature changes). Currently 0.3.0.

# @dashfi/svelte (the lib, in core monorepo)
core/libs/svelte-components/lib/package.json   "version": "x.y.z"
# Currently 0.0.1 (never bumped). On the next coordinated release, bump to
# 0.1.0 (additive features) or 1.0.0 (declared stable). NOT in this repo —
# that lives in core. Sync via the migration branch.`;

	const cofuncSetup = `# TWO UPDATE CHANNELS — they propagate very differently. The common trap is
# assuming an edited skill reaches everyone instantly. It doesn't; the MCP
# tools the skill talks about do.

# ── Channel A: MCP tools + JSON API + /llms.txt  (AUTOMATIC) ──
# Anything the deploy serves: /mcp tools, /api/* JSON, /llms.txt, all src/.
#   Merge to main → Vercel auto-deploys → live for ALL clients (Claude Code
#   plugin, claude.ai Connector, Desktop) on their next call.
#   No version bump, no admin action, no re-install.

# ── Channel B: skill prose + slash commands  (ORG-WIDE, needs a step) ──
# Ships INSIDE the plugin, pulled from the trlmkb/dashbook GitHub repo.
#   1. Edit claude-plugin/ — SKILL.md, commands/*.md.
#   2. Bump claude-plugin/.claude-plugin/plugin.json "version".  ← the signal; don't skip.
#   3. Merge to main on trlmkb/dashbook.
#   4. claude.ai admin → Plugins (Cowork) re-pulls from GitHub automatically —
#      there is NO manual sync button. The command list refreshes on the next
#      pull; the plugin CARD (name, description, version shown in admin) is keyed
#      to the "version" field in .claude-plugin/marketplace.json (the root
#      marketplace manifest — NOT claude-plugin/.claude-plugin/plugin.json), so
#      bump BOTH versions or the card shows stale metadata. To force a refresh:
#      remove + re-add the org marketplace in admin.
#   5. Members get it on their NEXT Claude Code session. No per-user install.

# Connector (claude.ai web users)
#   admin → Organization settings → Connectors → Add → Custom → Web
#   URL: https://dashbook.vercel.app/mcp
#   Gets Channel A (MCP tools) automatically. Does NOT get Channel B —
#   slash commands are a Claude Code convenience; web users invoke the tools
#   directly or via the skill.

# VERIFY
#   Channel A:  curl https://dashbook.vercel.app/api/marketing/patterns.json   (instant after deploy)
#   Channel B:  fresh Claude Code session → new /dashbook-* commands appear,
#               skill shows the bumped version.`;

	const reporterFlow = `# When someone files a bug or sends feedback:

# 1. Reproduce in your own session (fresh Claude Code, dashbook plugin installed).
# 2. If repro fails: likely client-side. Ask reporter for:
#       - /plugin list output
#       - /mcp connection status
#       - Time of failure (we can correlate to Vercel logs)
#       - Whether fresh install or existing
# 3. If repro succeeds: that's a real bug.
#       - File GH issue: trlmkb/dashbook/issues
#       - Fix forward, ship in next release
#       - Add to PLAN.md §9 Done with what changed + why

# Past examples in .knowledge/:
#   2FA-page wordmark bug    →  cross-namespace fix (0319f50)
#   MCP tool surface zero results  →  P0 investigation (still pending)
#   Docs SPA WebFetch invisible  →  /api/components.json + JSON API`;
</script>

<svelte:head><title>Use Dashbook as the maintainer — Dashbook</title></svelte:head>

<InnerPage>
	<PageHeader
		label="Use / Maintainer"
		title="Maintainer."
		lede="Internal runbook for the person who owns Dashbook. Release process, how to add components and patterns, how to bump versions, how to deploy. The other audience pages serve consumers — this one serves you."
	/>

	<Section label="1. Release process" note="The standard cycle for every change.">
		<CodeSnippet code={releaseFlow} language="bash" />
		<p class="note">
			Vercel watches the <code>main</code> branch and auto-deploys on push. There's no separate
			deploy step. If a deploy breaks, roll back via Vercel dashboard → Deployments → previous → Promote.
		</p>
	</Section>

	<Section
		label="2. Adding a component"
		note="60 components today. Every one follows the same recipe."
	>
		<CodeSnippet code={addComponentSteps} language="bash" />
		<p class="note">
			The single source of truth is the spec file at <code>src/lib/specs/components/&lt;slug&gt;.ts</code>.
			It drives the docs page anatomy, the MCP <code>product_get_component</code> tool, and the JSON
			API at <code>/api/components/&lt;slug&gt;.json</code> — fix it once, three surfaces update.
		</p>
	</Section>

	<Section
		label="3. Adding a pattern"
		note="17 patterns today across 7 categories. Patterns are page-level recipes — Shells (chrome compositions), Data (lists, tables), Forms, Confirmation, States, Layout, Architecture (cross-cutting techniques)."
	>
		<CodeSnippet code={addPatternSteps} language="bash" />
		<p class="note">
			Bar for adding a pattern: the shape appears repeatedly in real product UI (at least 3 times
			across surfaces) AND it isn't already covered by an existing pattern + a component composition.
			Pattern inventory should grow on demonstrated need, not on inspiration.
		</p>
	</Section>

	<Section
		label="4. Adding a card variant"
		note="Today: one canonical Jade variant. New variants (e.g. partner-co-branded BINs) get appended below."
	>
		<CodeSnippet code={addCardVariantSteps} language="ts" />
		<p class="note">
			Important: card backgrounds must NOT include PAN, name, expiration, CVC, EMV chip art, NFC
			symbol, or the Mastercard mark — MC composites those at render time. The 459×283 bottom-right
			region is reserved for MC's brand mark. See <code>.knowledge/mdes-asset-spec.md</code> for the
			full layout spec.
		</p>
	</Section>

	<Section
		label="5. Updating a foundation token"
		note="Color, typography, spacing, radius, motion, etc. Two-file rule: app.css for runtime, tokens.ts for typed exports."
	>
		<CodeSnippet code={tokenUpdate} language="bash" />
		<p class="note">
			Token changes cascade through every component preview AND every MCP / JSON API caller
			automatically — there's no separate token-export step. Just update both files.
		</p>
	</Section>

	<Section
		label="6. Version bumps"
		note="Three independent versioned things to keep track of."
	>
		<CodeSnippet code={versionBumpFlow} language="bash" />
		<p class="note">
			Update the Footer badge in <code>src/lib/chrome/Footer.svelte</code> at the same time as the
			portal version bump. The changelog entry for the version goes in
			<code>src/routes/changelog/+page.svelte</code> and PLAN.md §9.
		</p>
	</Section>

	<Section
		label="7. Vercel deploy"
		note="Push to main → deploys to dashbook.vercel.app. Roughly 60 seconds end-to-end."
	>
		<ul class="docs-list">
			<li>
				Vercel project linked to <code>trlmkb/dashbook</code>. Build command <code>pnpm build</code>,
				output <code>build</code>. Adapter-vercel handles the dynamic routes (<code>/mcp</code>,
				<code>/api/*</code>) as Node functions; everything else prerenders.
			</li>
			<li>
				Roll-back: Vercel dashboard → Deployments → pick a previous deployment → Promote.
				One-click revert. DNS stays put.
			</li>
			<li>
				Future: replaced by the in-core <code>brand-app</code> Lambda deploy
				(<code>brand.dash.fi</code>) — see DEPLOY-VERIFY.md in core. Not active yet.
			</li>
		</ul>
	</Section>

	<Section
		label="8. Landing updates org-wide — the two channels"
		note="The one thing to internalize about distribution: MCP tools / JSON / data update automatically on deploy (Channel A); the skill + slash commands ship in the plugin and reach the org via a Cowork re-pull from GitHub (Channel B). Knowing which channel a change rides decides whether you need to bump a version + confirm the sync."
	>
		<CodeSnippet code={cofuncSetup} language="bash" />
		<p class="note">
			Rule of thumb: changed something under <code>src/</code> (tools, JSON, pages, <code>/llms.txt</code>)?
			Channel A — just merge and it deploys. Changed something under <code>claude-plugin/</code>
			(skill prose, slash commands)? Channel B — bump <code>plugin.json</code> version, merge, and the
			org picks it up on the next Cowork sync.
		</p>
		<p class="note">
			<strong>Release-the-plugin checklist</strong> (Channel B, every time the plugin surface changes —
			skill, commands, or the MCP server entry it registers):
		</p>
		<ul class="docs-list">
			<li>Bump <code>claude-plugin/.claude-plugin/plugin.json</code> "version".</li>
			<li>Bump the matching plugin entry's "version" in <code>.claude-plugin/marketplace.json</code> — the admin card reads this file, not <code>plugin.json</code>.</li>
			<li>Run <code>claude plugin validate claude-plugin --strict</code> (or validate the JSON shape by hand against <a href="https://code.claude.com/docs/en/plugin-marketplaces.md">code.claude.com/docs/en/plugin-marketplaces.md</a> if the CLI isn't available).</li>
			<li>Update <code>claude-plugin/README.md</code> version/tool/command references.</li>
			<li>Merge to <code>main</code> — Vercel deploys Channel A immediately; Channel B needs the org's next Cowork re-pull (no manual sync button).</li>
		</ul>
	</Section>

	<Section
		label="9. Knowledge folder discipline"
		note=".knowledge/ at repo root holds research artifacts, audit docs, source materials for one-off investigations."
	>
		<ul class="docs-list">
			<li>
				One markdown file per investigation. Date in the header, the questions asked, the findings,
				the action items.
			</li>
			<li>
				Subdirectories for raw source materials (e.g. <code>.knowledge/cardart-source/</code> holds
				the MDES spec screenshots).
			</li>
			<li>
				Cross-reference from PLAN.md §9 entries — each Done row links to the relevant
				<code>.knowledge/*.md</code> file when one exists.
			</li>
			<li>
				If a knowledge doc is referenced from a code comment (e.g. <code>card-sources.ts</code>
				cites <code>credit-card-art.md</code>), the doc IS part of the deliverable — don't delete or
				rename without updating the reference.
			</li>
		</ul>
	</Section>

	<Section
		label="10. PLAN.md discipline"
		note="The single source of truth for what's done, what's in flight, and what's pending."
	>
		<ul class="docs-list">
			<li>
				<strong>Update after every task</strong>, same turn as the code change, before reporting
				completion. The bar: PLAN.md disagreeing with reality is itself a bug.
			</li>
			<li>
				<strong>Header</strong>: bump "Last updated" to today. Bump "current version" if
				package.json moved.
			</li>
			<li>
				<strong>§9 Done table</strong>: most recent at the top. Each row: scope · version · date ·
				prose description. The prose should let someone six months from now reconstruct what
				happened.
			</li>
			<li>
				<strong>§9 Cross-cutting fixes</strong>: append entries for bug fixes that don't fit a
				numbered phase.
			</li>
			<li>
				<strong>§5 IA table</strong>: flip Built column when a page transitions placeholder → real.
			</li>
			<li>
				<strong>§7 counts</strong>: update if components are added or removed.
			</li>
			<li>
				<strong>§12 Open Decisions / Parking Lot</strong>: when a decision is resolved, move it into
				the phase that absorbed it. When a new question surfaces, add it.
			</li>
		</ul>
	</Section>

	<Section
		label="11. Reporter bugs — investigation flow"
		note="When someone files a bug or sends structured feedback (the 2FA-page case, the MCP-tool-surface case)."
	>
		<CodeSnippet code={reporterFlow} language="bash" />
		<p class="note">
			Past reporter cases live in <code>.knowledge/</code>. The pattern: reproduce, root-cause, fix
			forward, document. Don't fix without documenting — drift accumulates faster than fixes.
		</p>
	</Section>

	<Section
		label="12. Future work parking lot"
		note="Things deferred — useful to revisit on idle days."
	>
		<ul class="docs-list">
			<li>
				<strong>Brand-app stage deploy</strong> (core <code>packages/brand/</code>). PR pending on
				<code>EN-XX/brandbook-move</code>. DEPLOY-VERIFY.md has the 4-step playbook.
			</li>
			<li>
				<strong>$derived warnings in chrome</strong>: ComponentLayout / PatternLayout have
				"reference only captures initial value" warnings on tab arrays. Fix: wrap in
				<code>{`$derived(() => [...])`}</code>. Cosmetic, harmless.
			</li>
			<li>
				<strong>Real partner-bank logos</strong> for the issuer slot — currently a 1×1 transparent
				placeholder. Pending TransPecos / Patriot Bank sending their lockups.
			</li>
			<li>
				<strong>P2 SSR'd component anatomy</strong> — the JSON API at <code>/api/components/</code>
				covers the use case, but if WebFetch usage grows, SSR'ing the anatomy tab is the cleaner
				long-term fix.
			</li>
			<li>
				<strong>Visual regression tests</strong> — Playwright screenshot suite or Chromatic for the
				lib + dashbook pages. Catches unintended visual drift on lib version bumps.
			</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.note {
		font-size: 13px;
		color: var(--fg-muted);
		margin-top: 16px;
		line-height: 1.55;
	}
	.note code,
	.docs-list code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
	.docs-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		padding-left: 18px;
	}
</style>
