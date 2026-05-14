<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Pill } from '@dashfi/svelte/ui/pill';

	type Tab = { id: string; href: string; label: string; count?: number; active?: boolean };

	let active = $state('overview');

	const tabs: Tab[] = [
		{ id: 'overview', href: '#', label: 'Overview' },
		{ id: 'activity', href: '#', label: 'Activity', count: 24 },
		{ id: 'cards', href: '#', label: 'Cards', count: 12 },
		{ id: 'members', href: '#', label: 'Members', count: 8 },
		{ id: 'settings', href: '#', label: 'Settings' }
	];

	const layoutCode = `<!-- src/routes/(protected)/settings/+layout.svelte -->
<script lang="ts">
\timport { page } from '$app/state';
\timport { Pill } from '@dashfi/svelte/ui/pill';
\timport type { LayoutData } from './$types';

\tlet { data, children }: { data: LayoutData; children: Snippet } = $props();

\tconst tabs = $derived([
\t\t{ href: '/settings', label: 'Overview' },
\t\t{ href: '/settings/activity', label: 'Activity', count: data.counts.activity },
\t\t{ href: '/settings/cards', label: 'Cards', count: data.counts.cards },
\t\t{ href: '/settings/members', label: 'Members', count: data.counts.members },
\t\t{ href: '/settings/billing', label: 'Billing' }
\t]);

\t// Active tab derives from URL — no local state, no router subscribe.
\tfunction isActive(href: string): boolean {
\t\treturn href === '/settings'
\t\t\t? page.url.pathname === '/settings'
\t\t\t: page.url.pathname.startsWith(href);
\t}
<\/script>

<section class="sub-section">
\t<header class="header">
\t\t<div class="label">Workspace</div>
\t\t<h1>Settings.</h1>
\t\t<p class="lede">
\t\t\tProfile, billing, members, and integrations for this workspace.
\t\t</p>
\t</header>

\t<nav class="tab-strip" role="tablist">
\t\t{#each tabs as t (t.href)}
\t\t\t<a
\t\t\t\thref={t.href}
\t\t\t\tclass="tab"
\t\t\t\tdata-active={isActive(t.href)}
\t\t\t\trole="tab"
\t\t\t\taria-selected={isActive(t.href)}
\t\t\t>
\t\t\t\t<span>{t.label}</span>
\t\t\t\t{#if t.count !== undefined}
\t\t\t\t\t<Pill type="base" size="sm">{t.count}</Pill>
\t\t\t\t{/if}
\t\t\t</a>
\t\t{/each}
\t</nav>

\t<div class="content">
\t\t{@render children()}
\t</div>
</section>`;
</script>

<svelte:head><title>Sub-section header with tabs — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Sub-section header with tabs"
	description="Section title + lede + tab strip + content. Reused inside settings, transactions, bill pay, anywhere a section needs internal navigation without leaving the protected shell."
	uses={['PageHeader', 'Pill', '$page.url', 'Separator']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="520px">
			{#snippet children(_m)}
				<div class="frame">
					<header class="header">
						<div class="label">Workspace</div>
						<h2>Settings.</h2>
						<p class="lede">
							Profile, billing, members, and integrations for this workspace.
						</p>
					</header>

					<nav class="tab-strip" role="tablist">
						{#each tabs as t (t.id)}
							<button
								type="button"
								class="tab"
								data-active={active === t.id}
								role="tab"
								aria-selected={active === t.id}
								onclick={() => (active = t.id)}
							>
								<span>{t.label}</span>
								{#if t.count !== undefined}
									<Pill type="base" size="sm">{t.count}</Pill>
								{/if}
							</button>
						{/each}
					</nav>

					<div class="content">
						{#if active === 'overview'}
							<div class="placeholder">
								<div class="placeholder-label">Overview</div>
								<p>Welcome to the section overview. This is where the matching child route renders.</p>
							</div>
						{:else if active === 'activity'}
							<div class="placeholder">
								<div class="placeholder-label">Activity · 24 items</div>
								<p>Recent workspace activity would render here, scoped to the section.</p>
							</div>
						{:else if active === 'cards'}
							<div class="placeholder">
								<div class="placeholder-label">Cards · 12 active</div>
								<p>Workspace cards table, filters, bulk actions.</p>
							</div>
						{:else if active === 'members'}
							<div class="placeholder">
								<div class="placeholder-label">Members · 8 seats</div>
								<p>Roster, roles, invite + remove flows.</p>
							</div>
						{:else}
							<div class="placeholder">
								<div class="placeholder-label">Settings</div>
								<p>Section-specific configuration.</p>
							</div>
						{/if}
					</div>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={layoutCode} language="svelte" />
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				Sections inside the protected shell — settings, transactions, bill pay, cards — need their
				own internal navigation without leaving the outer chrome. The sub-section pattern is a
				single layout that owns the header (label · title · lede) and the tab strip; each child
				route renders into the content slot. New sub-sections cost one route file with content;
				never a new shell, never a duplicated header.
			</p>

			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Tabs route by URL, not local state.</strong> Each tab is an
					<code>{`<a href>`}</code> to a child route. Active state is derived from
					<code>page.url.pathname</code>. Shareable, refresh-survivable, back-button-correct —
					and link-friendly for support tickets ("send them <code>/settings/members</code>").
				</li>
				<li>
					<strong>Live counts are part of the tab.</strong> When a tab represents a queryable
					set, the count goes inline as a small Pill. Counts come from the layout's loader, not
					per-tab fetches, so all tabs stay in sync without n queries on mount.
				</li>
				<li>
					<strong>Header lives in the layout, not the children.</strong> Each child route
					emits content only — no <code>PageHeader</code> inside <code>+page.svelte</code>.
					Otherwise the title scrolls with the content; here it's stable above the tab strip.
				</li>
				<li>
					<strong>Tab strip is a row, not a sidebar.</strong> Sub-sections rarely exceed 6
					tabs; tabs read horizontally without space loss. Beyond 6, reach for a sidebar
					(<a href="/patterns/multi-section-settings">Multi-section settings page</a>).
				</li>
				<li>
					<strong>Active tab uses bottom-rule indicator, not a background fill.</strong> Bottom
					rule is quieter — the page chrome stays calm. Background fills compete with content
					below them.
				</li>
				<li>
					<strong>Index tab matches an exact path.</strong> The "Overview" tab points at
					<code>/settings</code>, not <code>/settings/overview</code> — and the active check
					uses <code>===</code> rather than <code>startsWith</code> so it doesn't light up on
					every child route.
				</li>
			</ul>

			<h3>Responsive strategy</h3>
			<ul>
				<li>
					<strong>≥ 640px</strong> — tabs render inline. Overflow scrolls horizontally if there
					are many.
				</li>
				<li>
					<strong>&lt; 640px</strong> — keep the inline strip but allow horizontal scroll
					(<code>overflow-x: auto</code>). Don't collapse to a select — tabs are navigation, and
					a select disguises that.
				</li>
				<li>
					<strong>Sticky</strong> — when the section's content is long, sticky the tab strip to
					the top of <code>SidebarInset</code> (just below the topbar) so the user can re-orient
					while scrolling without losing nav.
				</li>
			</ul>

			<h3>Source</h3>
			<p>
				Distilled from <code>(protected)/settings/+layout.svelte</code> +
				<code>(protected)/transactions/+layout.svelte</code> in dashfi-ui. Full inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern L5).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Counts as status pills</strong> — when the count is semantically loaded
					(pending vs settled vs failed), switch from <code>Pill type="base"</code> to
					<code>warning</code> / <code>success</code> / <code>danger</code> so the colour
					carries the urgency. Useful for queues: "Pending (3 ⚠)" reads as "go look".
				</li>
				<li>
					<strong>Icon-prefixed tabs</strong> — for sections where tab labels are short and the
					icons are recognisable (Profile · Billing · Security), prefix with a 14px Lucide icon.
					Don't mix icon-prefixed and label-only tabs in the same strip.
				</li>
				<li>
					<strong>Right-aligned action</strong> — a section-level CTA (e.g. "Invite member" on
					the Members tab) belongs at the right end of the tab strip's row, separated by a
					flexible spacer. Keeps the most likely next action one click from anywhere in the
					section.
				</li>
				<li>
					<strong>Tab counts with delta indicators</strong> — for activity-style sections,
					append a small "+3 today" delta next to the count. Surfaces "new since you last
					looked" without a notification system.
				</li>
				<li>
					<strong>Permission-gated tabs</strong> — filter the tabs array by the user's
					permissions before render. Don't render the tab and disable it; remove it entirely
					— a disabled-but-visible tab tells the user what they're missing, which is the wrong
					message in most admin contexts.
				</li>
			</ul>

			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't model tabs as local state.</strong> Reach for
					<code>{`let active = $state(...)`}</code> only for in-page filters or transient panels
					inside a single route. Navigation between sub-sections belongs in the URL.
				</li>
				<li>
					<strong>Don't put a tab strip inside a Card.</strong> The section's chrome IS the
					card; nesting another bordered surface inside it creates a card-within-a-card.
				</li>
				<li>
					<strong>Don't use this pattern for the top-level Component or Pattern index
					pages.</strong> Those use the protected app shell's sidebar nav directly — sub-section
					tabs are for one-level-deeper navigation within a section.
				</li>
				<li>
					<strong>Don't hide overflow tabs in a "More" menu.</strong> If you can't fit them all,
					you have too many. Split the section, or move some tabs into a sidebar.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.frame {
		width: 100%;
		border: 1px solid var(--border);
		background: var(--bg);
		display: flex;
		flex-direction: column;
	}

	.header {
		padding: 24px 24px 0;
	}
	.label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 4px;
	}
	.header h2 {
		margin: 0 0 8px;
		font-size: 24px;
		font-weight: 400;
		letter-spacing: -0.01em;
	}
	.lede {
		margin: 0 0 24px;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 480px;
	}

	.tab-strip {
		display: flex;
		gap: 0;
		padding: 0 24px;
		border-bottom: 1px solid var(--border);
		overflow-x: auto;
		scrollbar-width: none;
	}
	.tab-strip::-webkit-scrollbar {
		display: none;
	}
	.tab {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px 11px;
		border: 0;
		background: transparent;
		font-family: inherit;
		font-size: 13px;
		color: var(--fg-muted);
		cursor: pointer;
		text-decoration: none;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		flex-shrink: 0;
		transition: color 150ms;
	}
	.tab:hover {
		color: var(--fg);
	}
	.tab[data-active='true'] {
		color: var(--fg);
		border-bottom-color: var(--m-jade, #2b605c);
	}

	.content {
		padding: 32px 24px;
		min-height: 200px;
	}
	.placeholder {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.placeholder-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.placeholder p {
		margin: 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		max-width: 540px;
	}

	.rationale {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 720px;
	}
	.rationale h3 {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 24px 0 4px;
	}
	.rationale h3:first-child {
		margin-top: 0;
	}
	.rationale p {
		font-size: 14px;
		line-height: 1.65;
		color: var(--fg);
		margin: 0;
	}
	.rationale ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.rationale li {
		padding: 10px 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		border-top: 1px solid var(--border);
	}
	.rationale li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.rationale code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
	.rationale a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
