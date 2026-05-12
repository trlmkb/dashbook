<script lang="ts">
	type Filter = 'all' | 'major' | 'roadmap';
	let filter = $state<Filter>('all');

	const filters: { id: Filter; label: string; description: string }[] = [
		{ id: 'all', label: 'All', description: 'Every release.' },
		{ id: 'major', label: 'Major + minor', description: 'Skip patches.' },
		{ id: 'roadmap', label: 'Roadmap', description: 'Planned only.' }
	];
</script>

<svelte:head><title>Changelog — Dashbook</title></svelte:head>

<div class="content">
	<div class="page-label">Changelog</div>
	<h1>Changelog.</h1>
	<p class="lede">
		Dated release notes for the Dash.fi design system. Every entry has a date and a one-sentence
		summary — versioning is a trust signal.
	</p>

	<div class="filter-row" role="tablist" aria-label="Filter changelog">
		{#each filters as f (f.id)}
			<button
				type="button"
				role="tab"
				class="filter-btn"
				class:active={filter === f.id}
				aria-selected={filter === f.id}
				title={f.description}
				onclick={() => (filter = f.id)}
			>
				{f.label}
			</button>
		{/each}
	</div>

	<ul class="entries" data-filter={filter}>
		<li data-kind="roadmap" id="roadmap">
			<span class="when">Roadmap</span>
			<div class="what">
				<span class="ver upcoming">v1.0 — planned</span>
				<p>
					<strong>Production deploy</strong> to <code>brand.dash.fi</code> on Vercel.
					Requires publishing <code>@dashfi/svelte</code> to an internal npm registry
					(see <code>DEPLOY.md</code> §4 Option A) and pointing the CNAME at
					<code>cname.vercel-dns.com</code>. Plus the <strong>Figma library</strong> ships
					alongside — variables, text styles, and the canonical-10 component variants per
					<code>FIGMA_HANDOFF.md</code>, then Code Connect templates wired up for the lib's
					Svelte sources.
				</p>
			</div>
		</li>
		<li data-kind="minor" id="v0-9-0">
			<span class="when">2026-05-11</span>
			<div class="what">
				<span class="ver"><a href="#v0-9-0" class="ver-anchor">v0.9.0</a><span class="latest">Latest</span></span>
				<p>
					<strong>Press extras + Phase 8.</strong> The Press &amp; Partners page got a
					<strong>Partner kit</strong> — three Powered-by-Dash badge variants (jade on
					cream · white on ink · mono transparent), two customer logo lockup examples, and
					a do/don't grid of eight co-branding rules. The Powered-by badge was redesigned
					with caption hierarchy (60% opacity), jade <code>.fi</code> dot accent, an
					optional <code>href</code> turning the whole badge into a real link with hover
					inversion + ↗ arrow nudge, and three sizes (sm / md / lg). All <code>/press</code>
					badge previews now link to <code>dash.fi</code>.
				</p>
				<p>
					<strong>Real legal disclosures</strong> sourced from <code>dash.fi/legal</code> —
					replaced invented PCI-DSS / SOC 2 claims with accurate ones: Dash.fi Technologies
					Inc. + SF mailing address, issuing banks <strong>TransPecos Banks SSB +
					Patriot Bank N.A. (Mastercard)</strong>, correct FDIC language, Visa Global
					Services Inc. (NMLS 181032) + Currency Cloud (UK FCA FRN 900199 / CFSB US)
					payment services, FinCEN + FINTRAC MSB registrations, real (888) 733-0041 support
					hotline. The Leadership section was prototyped and removed per direction — not
					appropriate for the Press page.
				</p>
				<p>
					<strong>⌘K full-content search.</strong> The palette now indexes every nav
					route + 60 components + 6 patterns + brand / foundations / dev subpages.
					Substring-positional scoring (title hit dominates), results grouped by section
					with per-group counts, full keyboard nav (↑↓ ↵ esc), <code>mark</code> highlight
					on the matched substring, hover sync, scroll-into-view on active row, footer
					with keybinding hints + total count.
				</p>
				<p>
					<strong>Changelog polish.</strong> Filter chips (All / Major + minor / Roadmap),
					a "Latest" badge on the current stable, anchor IDs on every entry, version chip
					wrapped in a self-link with hover inversion. <code>scroll-margin-top</code> so
					deep links land below the header.
				</p>
				<p>
					<strong>PreviewCanvas Auto mode.</strong> Every preview canvas now defaults to
					"Auto" — syncs with the global page theme. Toggling Light or Dark detaches that
					canvas into manual override; clicking Auto again re-syncs. 200ms color/background
					transition so the auto-flip feels designed.
				</p>
				<p>
					<strong>Deploy prep.</strong> <code>vercel.json</code> at the repo root (build
					command, output dir, immutable caches for fonts + assets + <code>_app/immutable</code>,
					security headers, cleanUrls). <code>DEPLOY.md</code> ~140 lines documenting Vercel
					setup, DNS for <code>brand.dash.fi</code>, the lib-distribution choice
					(publish vs vendor), local <code>pnpm preview</code> smoke test, rollback,
					pre-deploy checklist (incl. compliance review for the legal copy), post-deploy
					verification.
				</p>
			</div>
		</li>
		<li data-kind="minor" id="v0-8-0">
			<span class="when">2026-05-11</span>
			<div class="what">
				<span class="ver"><a href="#v0-8-0" class="ver-anchor">v0.8.0</a></span>
				<p>
					<strong>Foundations completed.</strong> Four missing subpages built —
					<code>/foundations/elevation</code> (2-shadow philosophy, hairlines carry depth),
					<code>/foundations/accessibility</code> (WCAG 2.2 AA targets, focus ring spec,
					contrast tokens with <code>prefers-reduced-motion</code> live demo, screen-reader
					patterns), <code>/foundations/data-viz</code> (tabular numerics, semantic colors,
					5-series chart palette, <code>Intl.NumberFormat</code> patterns,
					<strong>EnhancedTable for ledger data</strong> with 8-row live preview),
					<code>/foundations/currency</code> (USD/EUR/GBP/JPY locale-aware rendering,
					<code>formatCurrency</code> helper, compact rendering, edge cases). All 9 Foundations
					subpages live.
				</p>
				<p>
					<strong>Developers section rewritten</strong> for the actual internal-only Nx-monorepo
					consumption pattern. Lock-icon "Internal only" banner. Four numbered config steps —
					<code>workspace:*</code> declaration → <code>pnpm install</code> + Nx serve →
					Tailwind preset import → Vite <code>ssr.noExternal</code> → <code>app.css</code> entry.
					60-row stability matrix driven from <code>components.ts</code>. "Add a new component"
					recipe pointing at the lib. Contributing rules. Four link cards. New subpage
					<code>/developers/figma</code> surfacing Figma library status with token tables and
					links to the handoff docs.
				</p>
				<p>
					<strong>Press layout fix.</strong> Switched from a hard-coded
					<code>&lt;div class="page"&gt;</code> + <code>&lt;Sidebar /&gt;</code> to
					<code>&lt;InnerPage section="/press" wide&gt;</code> + <code>&lt;PageHeader&gt;</code>
					— the old layout left a 222px sidebar ghost column when no nav children existed.
				</p>
				<p>
					<strong>Lib-wide orange shift</strong> — destructive / warning color moved from
					<code>#FF5F00</code> (HSL <code>22 100% 50%</code>) to <strong><code>#FF4000</code></strong>
					(HSL <code>15 100% 50%</code>). Updated in <code>app.css</code>,
					<code>PreviewCanvas.svelte</code>, custom Shiki theme, lib's <code>global.css</code>
					(3 HSL declarations), and the <code>/foundations/data-viz</code> semantic-colors row.
					Lib rebuilt; cascade reaches every preview canvas + the destructive button variant
					lib-wide.
				</p>
				<p>
					<strong>Accent color feature.</strong> Per <code>ACCENT_FEATURE.md</code>. The
					<code>AssetConfigurator</code> gets a <strong>Customize accent color</strong>
					checkbox with three options — <em>Match parent</em>, <em>Dash.fi yellow</em>
					(<code>#EBFF00</code>), or <em>Custom hex</em>. Live preview updates the
					<code>.fi</code> dot in the wordmark or the inner <code>d</code> glyph in the app icon.
					Filename + bundle ZIP entries get an <code>{`-accent-{yellow|hex}`}</code> suffix.
					<code>LogoMark.svelte</code> accepts an <code>accent</code> prop (backward-compatible).
					Two new tiles on <code>/brand/logo</code> — <strong>Wordmark · Yellow accent</strong>
					and <strong>App icon · Yellow glyph</strong> — both render <code>#EBFF00</code>.
				</p>
				<p>
					<strong>Figma library prep</strong> for Phase 7. Two complementary docs at the repo
					root: <code>FIGMA_HANDOFF.md</code> (721 lines, executable step-by-step by a designer
					authoring the Figma file — 8-page IA, three variable collections, 8 text styles,
					canonical-10 component variant trees, 50 stub specs, Code Connect templates,
					designer checklist, 4 open questions); and <code>FIGMA_INTEGRATION_RULES.md</code>
					(complementary rules doc for engineers using <code>figma-desktop</code> MCP to
					generate dashbook-compatible code from Figma designs — Figma-element-to-component
					cheat sheet, token mappings, "what NOT to do" guardrails). Actual Figma authoring
					happens in a separate Claude Code instance with dashfi-team auth.
				</p>
				<p>
					Type-check is now <strong>0 errors</strong> (was 20 mid-cycle). Production build
					passes clean. <code>PLAN.md</code> kept in sync after every task — §5 IA flips
					Foundations to <strong>✅</strong>, Developers to <strong>✅</strong>; §9 records
					every cross-cutting fix; §17 adds the plan-maintenance rule.
				</p>
			</div>
		</li>
		<li data-kind="minor" id="v0-7-0">
			<span class="when">2026-05-11</span>
			<div class="what">
				<span class="ver">v0.7.0</span>
				<p>
					<strong>Patterns library live</strong> — six starter recipes for the screens we
					build over and over. Transaction list with search + facet filters + status pills.
					Metric card grid for dashboards. Destructive confirmation flow with AlertDialog.
					Empty-zero state with primary CTA. Settings section with rhythm-locked rows. Card
					detail with two-column layout, status pill, limit progress, reversible/destructive
					action ordering. Each pattern includes <em>Preview</em> · <em>Code</em> ·
					<em>Rationale</em> · <em>Variations</em>. New <code>PatternLayout</code> chrome and
					a categorized index at <code>/patterns</code>. Patterns sidebar shows up everywhere
					inside <code>/patterns/*</code>.
				</p>
				<p>
					Also a wave of <strong>pre-existing prop bugs cleaned up</strong>: Pill page
					switched from invented <code>positive/negative/neutral</code> types to the real
					<code>base/info/success/warning/danger</code>; AlertError preview now passes
					<code>title/description/onRetry</code> instead of children; MultiSelect uses
					<code>bind:selected</code>; PhoneInput now passes the required
					<code>allowedCountryCodes</code>; TelInput preview has its required composite
					<code>value</code> shape. <strong>Lib-side fixes</strong>: Sheet's body-style
					cleanup now guards on <code>typeof document</code> so static prerender succeeds;
					DrawerTitle/Description switched from <code>bind:ref</code> to
					<code>bind:el</code> to match vaul-svelte's typed API. Type-check is now
					<strong>0 errors</strong> (was 20).
				</p>
			</div>
		</li>
		<li data-kind="minor" id="v0-6-0">
			<span class="when">2026-05-11</span>
			<div class="what">
				<span class="ver">v0.6.0</span>
				<p>
					<strong>Asset downloader live</strong> on <code>/brand/logo</code> and
					<code>/press</code>. New <code>&lt;AssetConfigurator&gt;</code> component — pick
					color from preset palette (jade, ink, cream, white, on-jade, on-cobalt, etc.) or a
					custom hex; size at 32 / 64 / 128 / 256 / 512 / 1024px or custom; format SVG / PNG /
					JPG; quality 1x / 2x / 3x for raster. Live preview re-renders as you configure.
					Filename resolves to <code>dashfi-logo-jade-256px-2x.png</code>. Raster output
					generated client-side via canvas. "Download bundle" ships every preset variant as SVG
					+ 256 / 512 / 1024 PNG in a single .zip — packed inline (no deps) with a tiny
					store-mode ZIP encoder. Press page also got real content — media contacts, legal
					disclosures.
				</p>
			</div>
		</li>
		<li data-kind="patch" id="v0-5-2">
			<span class="when">2026-05-11</span>
			<div class="what">
				<span class="ver">v0.5.2</span>
				<p>
					Component pages got a <strong>Docs tab</strong> with a structured
					<code>PropsTable</code> — Prop / Type / Default / Description, with
					<em>required</em> and <em>bindable</em> badges. Filled tables for all
					60 components by reading the lib source. Also: <strong>custom Shiki
					theme</strong> — keywords in jade, strings in cobalt, numerics in
					orange, Svelte directives picked out in orange italic. Light + dark
					themes both built from the canonical brand palette.
				</p>
			</div>
		</li>
		<li data-kind="patch" id="v0-5-1">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.5.1</span>
				<p>
					Fixed Code tab on every component page. The page-level <code>const code</code>
					variable was being shadowed by the <code>{`{#snippet code()}`}</code> declaration —
					inside the snippet, <code>code</code> resolved to the snippet itself, so
					<code>&lt;CodeSnippet code={`{code}`}&gt;</code> received a function instead of the
					source string. Bulk-renamed the page variable to <code>example</code> across all 60
					component pages.
				</p>
			</div>
		</li>
		<li data-kind="minor" id="v0-5-0">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.5.0</span>
				<p>
					Phase 5 — full component coverage. Added 24 more pages: Multi Select, Phone Input,
					Tel Input, Date Range Selector, Range Calendar, Form, Alert Error, Indicator, Item,
					Logo, Merchant Logo, Flow Lines, Magnetic Hover, Drawer, Fullscreen Dialog,
					Hover Card, Toast (Sonner), Support Modal, Command (⌘K), Sub Navigation, Table,
					Enhanced Table, Data Table, Table Filters. <strong>60 components live</strong> —
					full lib coverage.
				</p>
			</div>
		</li>
		<li data-kind="patch" id="v0-4-1">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.4.1</span>
				<p>
					Components section now has a persistent left sidebar — sticky list of all 36
					components grouped by category, active item indicated by a brand-color left border.
					"All components" link at top. Visible on the index and every component page.
				</p>
			</div>
		</li>
		<li data-kind="minor" id="v0-4-0">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.4.0</span>
				<p>
					Phase 4 — 28 new component pages. Added Accordion, Alert Dialog, Breadcrumb,
					Calendar, Checkbox, Code Block, Collapsible, Dialog, Dropdown Menu, Empty, Label,
					Linear Loader, Loader, Pagination, Pill, Popover, Progress, Radio Group,
					Scroll Area, Select, Separator, Sheet, Skeleton, Spinner, Textarea, Toggle,
					Toggle Group, Tooltip. Index now groups by category with stability badges.
					<strong>36 components live</strong> (up from 8). Beta-status flag used for
					components without upstream Storybook coverage.
				</p>
			</div>
		</li>
		<li data-kind="patch" id="v0-3-3">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.3.3</span>
				<p>
					Button variants refreshed across the lib (production app picks this up too).
					<code>default</code> is now <strong>ink</strong> <code>#25261D</code> (was pure black);
					<code>destructive</code> is now <strong>bright orange</strong>
					<code>#FF5F00</code> (was monochrome black); <code>secondary</code> is now
					<strong>cobalt</strong> <code>#354CEF</code> (was duplicate of outline).
					<code>brand</code> stays jade. Cascade: Alert <code>destructive</code> + Badge
					<code>destructive</code> now read as orange too. Lib link switched from
					<code>file:</code> (snapshot) to <code>link:</code> (live symlink) so future lib
					changes hot-reload without reinstall.
				</p>
			</div>
		</li>
		<li data-kind="patch" id="v0-3-2">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.3.2</span>
				<p>
					Two more Phase 3 fixes. (1) Bai Jamjuree font — replaced the broken
					<code>@import</code> URL with explicit <code>@font-face</code> per weight
					(400/500/600/700) pointing at <code>@fontsource</code> woff2 on jsDelivr. (2) Lib
					component variants now render — <code>@theme</code> color tokens are now direct
					hex values (instead of <code>hsl(var(--*))</code> wrappers that resolved invalid
					outside <code>.preview-canvas</code>). Dark mode flips via cascade.
				</p>
			</div>
		</li>
		<li data-kind="patch" id="v0-3-1">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.3.1</span>
				<p>
					Fixed two Phase 3 issues. (1) Pages without sub-nav (Components, Patterns,
					Developers, Press, Changelog) now render full-width — <code>InnerPage</code> detects
					missing sidebar and skips the grid. (2) Lib components (Button, Badge, etc.) now
					render with correct foreground colors — added the full lib-expected color taxonomy
					(<code>--color-primary-foreground</code>, <code>--color-brand-foreground</code>,
					<code>--color-secondary</code>, <code>--color-input</code>, etc.) to Tailwind
					<code>@theme</code>.
				</p>
			</div>
		</li>
		<li data-kind="minor" id="v0-3-0">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.3.0</span>
				<p>
					Components live. Real <code>@dashfi/svelte</code> components rendered in scoped
					preview canvases (light + dark) with multi-tab pages — Preview · Code · Anatomy ·
					Accessibility · Changelog. First 8 stable: Button, Badge, Card, Input, Alert, Avatar,
					Tabs, Switch. Components index grouped by category with stability badges.
				</p>
			</div>
		</li>
		<li data-kind="patch" id="v0-2-2">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.2.2</span>
				<p>
					Full base-palette restructure. Promoted all marketing colors to <code>--dash-*</code>
					primitives (13 named tokens). Marketing <code>--m-*</code> tokens are now aliases
					that reference the base. Added <code>--dash-cobalt-deep</code>. Resolved
					<code>--m-warm-fg</code> hex collision with <code>--dash-graphite</code>. Gradients
					now reference base tokens.
				</p>
			</div>
		</li>
		<li data-kind="patch" id="v0-2-1">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.2.1</span>
				<p>
					Restored named brand tokens — <code>--dash-ink</code>, <code>--dash-graphite</code>,
					<code>--dash-graphite-soft</code>, <code>--dash-yellow-glow</code>. Surfaced on
					Foundations / Color as a primitive layer between Product and Marketing.
				</p>
			</div>
		</li>
		<li data-kind="minor" id="v0-2-0">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.2.0</span>
				<p>
					Brand section live — Logo (with downloads + clearspace), Color story, Typography
					(specimens + scale + license), Voice (principles + tone matrix + before/after
					examples), Motion (live signature animations), Photography, Iconography. Foundations
					expanded with Typography, Spacing, Radius, and Motion technical references.
				</p>
			</div>
		</li>
		<li data-kind="minor" id="v0-1-0">
			<span class="when">2026-05-10</span>
			<div class="what">
				<span class="ver">v0.1.0</span>
				<p>
					Dashbook bootstrapped — public chrome (header, sidebar, footer, theme toggle, ⌘K),
					tokens wired from the canonical handoff, Foundations / Color page live.
				</p>
			</div>
		</li>
	</ul>
</div>

<style>
	.content {
		max-width: 880px;
	}
	h1 {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(2rem, 5vw, 3.5rem);
		line-height: 1;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 16px 0 24px;
	}
	.lede {
		font-size: 17px;
		line-height: 1.55;
		color: var(--fg-muted);
		margin-bottom: 48px;
	}
	.entries {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.entries li {
		display: grid;
		grid-template-columns: 140px 1fr;
		gap: 24px;
		padding: 24px 0;
		border-top: 1px solid var(--border);
	}
	.entries code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--bg-muted);
		padding: 1px 5px;
	}
	.entries li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.when {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: -0.01em;
		color: var(--fg-muted);
		padding-top: 4px;
	}
	.ver {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--brand);
		margin-bottom: 8px;
	}
	.ver-anchor {
		color: inherit;
		text-decoration: none;
		padding: 3px 10px;
		border: 1px solid var(--brand);
		transition: background-color 120ms, color 120ms;
	}
	.ver-anchor:hover {
		background: var(--brand);
		color: var(--brand-fg);
	}
	.latest {
		font-family: var(--font-mono);
		font-size: 9px;
		font-weight: 500;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bg);
		background: var(--brand);
		padding: 3px 8px;
		line-height: 1;
	}
	.ver.upcoming {
		color: var(--fg-muted);
	}
	.ver.upcoming .ver-anchor,
	.ver.upcoming {
		/* Roadmap entries don't get the anchor treatment — the text is just dashed */
		border: 0;
		padding: 0;
	}
	li[data-kind='roadmap'] .ver {
		display: inline-block;
		padding: 3px 10px;
		border: 1px dashed var(--input-border);
	}
	.what p {
		font-size: 15px;
		line-height: 1.6;
		color: var(--fg);
	}

	/* --- Filter row -------------------------------------------------------- */
	.filter-row {
		display: inline-flex;
		border: 1px solid var(--border);
		margin-bottom: 32px;
	}
	.filter-btn {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		padding: 8px 16px;
		border: 0;
		border-right: 1px solid var(--border);
		background: var(--bg);
		color: var(--fg-muted);
		cursor: pointer;
		transition: color 120ms, background-color 120ms;
	}
	.filter-btn:last-child {
		border-right: 0;
	}
	.filter-btn:hover {
		color: var(--fg);
	}
	.filter-btn.active {
		background: var(--brand);
		color: var(--brand-fg);
	}

	/* --- Filter behavior (CSS-driven) ------------------------------------- */
	.entries[data-filter='major'] li[data-kind='patch'] {
		display: none;
	}
	.entries[data-filter='roadmap'] li[data-kind='major'],
	.entries[data-filter='roadmap'] li[data-kind='minor'],
	.entries[data-filter='roadmap'] li[data-kind='patch'] {
		display: none;
	}

	/* Anchor scroll-margin so deep-linked entries land below the header */
	.entries li {
		scroll-margin-top: 96px;
	}

	@media (max-width: 720px) {
		.entries li {
			grid-template-columns: 1fr;
			gap: 8px;
		}
	}
</style>
