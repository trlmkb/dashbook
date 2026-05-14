<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import StatusBadge from '$chrome/StatusBadge.svelte';
	import { components } from '$content/components';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import Github from '@lucide/svelte/icons/github';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Lock from '@lucide/svelte/icons/lock';

	const pkgJsonEntry = `// packages/your-app/package.json
{
\t"dependencies": {
\t\t"@dashfi/svelte": "workspace:*"
\t}
}`;

	const vibeCheck = `# inside the dash monorepo
pnpm install                                # picks up the workspace symlink
nx serve dashfi-ui                          # OR pnpm --filter dashfi-ui dev
# the lib is live-symlinked — edits in libs/svelte-components/lib/ hot-reload`;

	const tailwindConfig = `// packages/your-app/tailwind.config.ts
import type { Config } from 'tailwindcss';
import { tailwindPreset } from '@dashfi/svelte/design-system/tailwind/config';

const config: Config = {
\tpresets: [tailwindPreset],
\tcontent: [
\t\t'./src/**/*.{html,js,svelte,ts}',
\t\t// Scan the lib source so Tailwind generates classes used by its components
\t\t'../../libs/svelte-components/lib/src/lib/**/*.{html,js,svelte,ts}',
\t]
};

export default config;`;

	const viteConfig = `// packages/your-app/vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
\tplugins: [tailwindcss(), sveltekit()],
\t// Required — bundle lib code in SSR so Svelte 5 components compile correctly
\tssr: {
\t\tnoExternal: ['@dashfi/svelte']
\t}
});`;

	const appCssImport = `/* packages/your-app/src/app.css */
@import 'tailwindcss';
@import '@dashfi/svelte/styles/global.css';     /* HSL token layer + base resets */

/* Optional — scoped overrides for your app surface */
@theme {
\t--color-brand: #2b605c;
\t--color-brand-foreground: #ffffff;
}`;

	const quickStart = `<script lang="ts">
\timport { Button } from '@dashfi/svelte/ui/button';
\timport { Card, CardHeader, CardTitle, CardContent } from '@dashfi/svelte/ui/card';
<\/script>

<Card>
\t<CardHeader>
\t\t<CardTitle>First card</CardTitle>
\t</CardHeader>
\t<CardContent>
\t\t<Button variant="brand">Hello, Dash</Button>
\t</CardContent>
</Card>`;

	const themeOverride = `/* app.css  ·  override a single semantic token */
:root {
\t--brand: #1a8a78;
\t--color-brand: #1a8a78;
}

html.dark {
\t--brand: #6dd0c6;
\t--color-brand: #6dd0c6;
}

/* The lib's components read --color-brand via Tailwind utilities (bg-brand,
   text-brand). The portal chrome reads --brand directly. Keep both in sync. */`;

	const newComponentRecipe = `# Add a new component to @dashfi/svelte
cd libs/svelte-components/lib

# Generate the directory: src/lib/ui/your-component/
#   your-component.svelte
#   your-component.stories.svelte
#   index.ts

# Re-export
echo "export { default as YourComponent } from './your-component.svelte';" \\
\t>> src/lib/ui/your-component/index.ts

# Build the lib (dashbook hot-reloads because of link: protocol)
pnpm build

# Open a stories file alongside — Storybook picks it up automatically`;

	// Group components by status — driven from the same source the components index uses
	const byStatus = $derived.by(() => {
		const map: Record<'stable' | 'beta' | 'deprecated', typeof components> = {
			stable: [],
			beta: [],
			deprecated: []
		};
		for (const c of components) map[c.status].push(c);
		return map;
	});

	const statusCounts = $derived({
		stable: byStatus.stable.length,
		beta: byStatus.beta.length,
		deprecated: byStatus.deprecated.length,
		total: components.length
	});
</script>

<svelte:head><title>Developers — Dashbook</title></svelte:head>

<InnerPage section="/developers" wide>
	<PageHeader
		label="Developers"
		title="For developers."
		lede="@dashfi/svelte is an internal Nx-workspace library — not published to npm. This page documents how to consume it from another package inside the dash monorepo, how to theme it, and the contract every component honors."
	/>

	<div class="banner">
		<Lock size={14} strokeWidth={1.5} />
		<span>
			<strong>Internal only.</strong> The lib is referenced via pnpm
			<code>workspace:*</code> from packages in
			<code>github.com/FunnelDash/core</code>. External consumption is not supported.
		</span>
	</div>

	<Section
		label="Add it to your package"
		note="Inside the dash monorepo: declare the workspace dependency, install, run. The lib is symlinked — no publish step."
	>
		<div class="setup-stack">
			<div>
				<div class="setup-head">1 · Declare the workspace dependency</div>
				<CodeSnippet code={pkgJsonEntry} language="json" />
			</div>
			<div>
				<div class="setup-head">2 · Install + run</div>
				<CodeSnippet code={vibeCheck} language="bash" />
			</div>
		</div>
	</Section>

	<Section
		label="Tailwind setup"
		note="The lib ships a Tailwind preset (jade brand color, ink primary, cobalt secondary, orange destructive). Extend it from your app config."
	>
		<CodeSnippet code={tailwindConfig} language="typescript" />
	</Section>

	<Section
		label="Vite config"
		note="SSR needs the lib bundled (Svelte 5 component compilation). Add @dashfi/svelte to ssr.noExternal."
	>
		<CodeSnippet code={viteConfig} language="typescript" />
	</Section>

	<Section
		label="Stylesheet entry"
		note="Import the lib's stylesheet once at the top of your app.css. Then layer your own @theme overrides on top."
	>
		<CodeSnippet code={appCssImport} language="css" />
	</Section>

	<Section
		label="Quick start"
		note="A working component in 10 lines. Drop this into any Svelte 5 route once the four config steps above are done."
	>
		<CodeSnippet code={quickStart} language="svelte" />
	</Section>

	<Section
		label="Theming"
		note="Three layered tiers: base primitives → product semantic → marketing aliases. The full taxonomy is documented at /foundations/color. To override, redeclare the semantic layer."
	>
		<div class="tier-cards">
			<div class="tier">
				<div class="tier-num">1</div>
				<div>
					<div class="tier-name">Base palette</div>
					<p>13 brand primitives — <code>--dash-jade</code>, <code>--dash-cobalt</code>, <code>--dash-ink</code>, etc. Single source of every hex.</p>
				</div>
			</div>
			<div class="tier">
				<div class="tier-num">2</div>
				<div>
					<div class="tier-name">Product semantic</div>
					<p>Component-facing — <code>--bg</code>, <code>--fg</code>, <code>--brand</code>, <code>--border</code>. Two modes (light + dark). What you override.</p>
				</div>
			</div>
			<div class="tier">
				<div class="tier-num">3</div>
				<div>
					<div class="tier-name">Marketing aliases</div>
					<p><code>--m-*</code> tokens. Reference the base palette directly. Used by marketing surfaces.</p>
				</div>
			</div>
		</div>
		<div class="theme-override">
			<div class="setup-head">Example — shift jade</div>
			<CodeSnippet code={themeOverride} language="css" />
		</div>
	</Section>

	<Section
		label="Component stability"
		note="{statusCounts.total} components shipped — {statusCounts.stable} stable, {statusCounts.beta} beta, {statusCounts.deprecated} deprecated. Beta APIs may shift; stable APIs are frozen until a major version cut."
	>
		<div class="matrix">
			<div class="matrix-head">
				<div class="col-name">Component</div>
				<div class="col-cat">Category</div>
				<div class="col-status">Status</div>
				<div class="col-import">Import</div>
			</div>
			{#each components as c (c.slug)}
				<a class="matrix-row" href={`/components/${c.slug}`}>
					<div class="col-name">{c.name}</div>
					<div class="col-cat">{c.category}</div>
					<div class="col-status"><StatusBadge status={c.status} /></div>
					<div class="col-import"><code>{c.importPath.split(' from ')[1]?.replace(/'/g, '') ?? c.importPath}</code></div>
				</a>
			{/each}
		</div>
	</Section>

	<Section
		label="Add a new component"
		note="The lib is the source of truth. Add the component in libs/svelte-components/lib first, then document it here in dashbook."
	>
		<CodeSnippet code={newComponentRecipe} language="bash" />
		<ul class="bullets">
			<li>Match existing patterns — Svelte 5 runes (<code>$props</code>, <code>$state</code>, <code>$derived</code>), <code>tailwind-variants</code> for variants, <code>bits-ui</code> for keyboard / focus semantics.</li>
			<li>Always forward <code>class</code> through <code>cn(...)</code> from <code>$lib/utils.js</code>.</li>
			<li>Make <code>ref</code> bindable for surfaces consumers will want to attach to.</li>
			<li>Add the new slug + metadata to <code>dashbook/src/lib/content/components.ts</code>.</li>
			<li>Generate a route page at <code>dashbook/src/routes/components/{`{slug}`}/+page.svelte</code> with the canonical Preview / Code / Docs / Anatomy / Accessibility / Changelog tabs.</li>
		</ul>
	</Section>

	<Section
		label="Contributing"
		note="Internal-only. Issues and PRs land in the dash monorepo. Voice and chrome conventions live in PLAN.md §13."
	>
		<div class="contrib">
			<div class="contrib-row">
				<div class="contrib-cap">Component changes</div>
				<p>
					Open a PR against <code>github.com/FunnelDash/core</code> touching
					<code>libs/svelte-components/lib/</code>. CI runs visual regression via Storybook
					Chromatic and svelte-check. Dashbook will hot-reload via the
					<code>link:</code> symlink — no extra step.
				</p>
			</div>
			<div class="contrib-row">
				<div class="contrib-cap">Dashbook changes</div>
				<p>
					Documentation, new patterns, foundations content — PR against
					<code>trlmkb/dashbook</code>. Match the existing chrome
					(<code>InnerPage</code>, <code>PageHeader</code>, <code>Section</code>) and tone
					(sentence case, no exclamation marks, no emoji). See
					<code>PLAN.md</code> §13 in the repo root.
				</p>
			</div>
			<div class="contrib-row">
				<div class="contrib-cap">What we don't take</div>
				<p>
					New components without a real consumer in <code>dashfi-ui</code> or another internal
					package. New patterns without a documented Dash.fi use case. Visual reskins of the
					portal that drift from the canonical handoff.
				</p>
			</div>
		</div>
	</Section>

	<Section
		label="External references"
		note="Storybook is the engineering deep-dive; the Figma library is the design source of truth and ships in a parallel track."
	>
		<div class="links">
			<a class="link-card" href="https://github.com/FunnelDash/core" target="_blank" rel="noopener">
				<Github size={18} strokeWidth={1.5} />
				<div class="link-body">
					<div class="link-title">dash monorepo <span class="link-tag">private</span></div>
					<p>Source for <code>@dashfi/svelte</code>, <code>dashfi-ui</code>, and all internal packages.</p>
				</div>
				<ExternalLink size={14} strokeWidth={1.5} class="link-arrow" />
			</a>
			<a class="link-card" href="https://github.com/trlmkb/dashbook" target="_blank" rel="noopener">
				<Github size={18} strokeWidth={1.5} />
				<div class="link-body">
					<div class="link-title">dashbook repo <span class="link-tag">private</span></div>
					<p>The portal you are reading. Documentation and brand surfaces.</p>
				</div>
				<ExternalLink size={14} strokeWidth={1.5} class="link-arrow" />
			</a>
			<a class="link-card" href="https://figma.com/" target="_blank" rel="noopener">
				<BookOpen size={18} strokeWidth={1.5} />
				<div class="link-body">
					<div class="link-title">Figma library <span class="link-tag">coming</span></div>
					<p>Component variants, text styles, and token variables. See <code>FIGMA_HANDOFF.md</code>.</p>
				</div>
				<ExternalLink size={14} strokeWidth={1.5} class="link-arrow" />
			</a>
			<a class="link-card" href="https://storybook.dash.fi" target="_blank" rel="noopener">
				<BookOpen size={18} strokeWidth={1.5} />
				<div class="link-body">
					<div class="link-title">Storybook <span class="link-tag">private</span></div>
					<p>Per-component stories — isolated states, controls, a11y inspector.</p>
				</div>
				<ExternalLink size={14} strokeWidth={1.5} class="link-arrow" />
			</a>
		</div>
	</Section>
</InnerPage>

<style>
	.banner {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		border: 1px solid var(--border);
		background: var(--bg-muted);
		font-size: 13px;
		color: var(--fg);
		margin: -16px 0 40px;
	}
	.banner :global(svg) {
		flex-shrink: 0;
		color: var(--brand);
	}
	.banner code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--bg);
		padding: 1px 5px;
	}
	.setup-stack {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.setup-head {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 8px;
	}
	.tier-cards {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		margin-bottom: 24px;
	}
	@media (min-width: 720px) {
		.tier-cards {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.tier {
		display: flex;
		gap: 16px;
		padding: 20px;
		background: var(--bg);
		align-items: flex-start;
	}
	.tier-num {
		font-family: var(--font-mono);
		font-size: 24px;
		font-weight: 200;
		color: var(--brand);
		letter-spacing: -0.02em;
		line-height: 1;
		padding-top: 2px;
	}
	.tier-name {
		font-size: 14px;
		font-weight: 500;
		color: var(--fg);
		margin-bottom: 4px;
	}
	.tier p {
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 0;
	}
	.tier code {
		font-family: var(--font-mono);
		font-size: 11px;
		background: var(--bg-muted);
		padding: 1px 4px;
		color: var(--fg);
	}
	.theme-override {
		margin-top: 16px;
	}
	.matrix {
		border: 1px solid var(--border);
		overflow: hidden;
	}
	.matrix-head,
	.matrix-row {
		display: grid;
		grid-template-columns: 200px 130px 130px 1fr;
		gap: 16px;
		padding: 12px 16px;
		align-items: center;
	}
	.matrix-head {
		background: var(--bg-muted);
		border-bottom: 1px solid var(--border);
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.matrix-row {
		border-top: 1px solid var(--border);
		font-size: 13px;
		text-decoration: none;
		color: var(--fg);
		transition: background-color 120ms;
	}
	.matrix-row:first-of-type {
		border-top: 0;
	}
	.matrix-row:hover {
		background: var(--bg-muted);
	}
	.col-name {
		font-weight: 500;
	}
	.col-cat {
		font-size: 12px;
		color: var(--fg-muted);
	}
	.col-import code {
		font-family: var(--font-mono);
		font-size: 11px;
		background: transparent;
		color: var(--fg-muted);
		padding: 0;
		letter-spacing: -0.02em;
	}
	@media (max-width: 880px) {
		.matrix-head,
		.matrix-row {
			grid-template-columns: 1fr 120px;
		}
		.col-cat,
		.col-import {
			display: none;
		}
	}
	.bullets {
		list-style: none;
		padding: 0;
		margin: 16px 0 0;
	}
	.bullets li {
		padding: 10px 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		border-top: 1px solid var(--border);
	}
	.bullets li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.bullets code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
	.contrib {
		display: flex;
		flex-direction: column;
	}
	.contrib-row {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 24px;
		padding: 16px 0;
		border-top: 1px solid var(--border);
	}
	.contrib-row:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.contrib-row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.contrib-cap {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.contrib p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		margin: 0;
	}
	.contrib code,
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
	.links {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	@media (min-width: 720px) {
		.links {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.link-card {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 12px;
		padding: 20px;
		background: var(--bg);
		text-decoration: none;
		color: var(--fg);
		transition: background-color 150ms;
		align-items: start;
	}
	.link-card :global(svg) {
		color: var(--fg-muted);
	}
	.link-card:hover {
		background: var(--bg-muted);
	}
	.link-card :global(.link-arrow) {
		color: var(--fg-muted);
		align-self: start;
	}
	.link-card:hover :global(.link-arrow) {
		color: var(--brand);
	}
	.link-title {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 4px;
	}
	.link-tag {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 400;
		margin-left: 6px;
		padding: 2px 6px;
		border: 1px solid var(--border);
		vertical-align: middle;
	}
	.link-card p {
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 0;
	}
</style>
