<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import {
		Table,
		TableHeader,
		TableBody,
		TableRow,
		TableHead,
		TableCell
	} from '@dashfi/svelte/ui/table';
	import { Pill } from '@dashfi/svelte/ui/pill';

	type Status = 'settled' | 'pending' | 'disputed';
	type TabId = 'all' | 'pending' | 'settled' | 'disputed';

	const rows: { date: string; merchant: string; amount: number; status: Status }[] = [
		{ date: '2026-05-09', merchant: 'Stripe', amount: -2890.0, status: 'settled' },
		{ date: '2026-05-09', merchant: 'AWS', amount: -12_408.55, status: 'settled' },
		{ date: '2026-05-08', merchant: 'Meta Ads', amount: -8_200.0, status: 'settled' },
		{ date: '2026-05-08', merchant: 'Google Ads', amount: -6_044.12, status: 'pending' },
		{ date: '2026-05-07', merchant: 'Vercel', amount: -990.0, status: 'settled' },
		{ date: '2026-05-07', merchant: 'Anthropic', amount: -2_000.0, status: 'disputed' },
		{ date: '2026-05-06', merchant: 'Notion', amount: -480.0, status: 'settled' },
		{ date: '2026-05-06', merchant: 'Figma', amount: -1_200.0, status: 'settled' }
	];

	const counts = $derived({
		all: rows.length,
		pending: rows.filter((r) => r.status === 'pending').length,
		settled: rows.filter((r) => r.status === 'settled').length,
		disputed: rows.filter((r) => r.status === 'disputed').length
	});

	let active = $state<TabId>('all');

	const tabs: {
		id: TabId;
		label: string;
		count: number;
		pillType: 'base' | 'warning' | 'danger';
	}[] = $derived([
		{ id: 'all', label: 'All', count: counts.all, pillType: 'base' },
		{ id: 'pending', label: 'Pending', count: counts.pending, pillType: 'warning' },
		{ id: 'settled', label: 'Settled', count: counts.settled, pillType: 'base' },
		{ id: 'disputed', label: 'Disputed', count: counts.disputed, pillType: 'danger' }
	]);

	const visibleRows = $derived(
		(active === 'all' ? rows : rows.filter((r) => r.status === active)).slice(0, 5)
	);

	function fmt(n: number): string {
		const sign = n < 0 ? '−' : '';
		return `${sign}$${Math.abs(n).toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})}`;
	}

	function statusPillType(s: Status): 'base' | 'warning' | 'danger' {
		if (s === 'pending') return 'warning';
		if (s === 'disputed') return 'danger';
		return 'base';
	}

	const layoutExample = `<script lang="ts">
\timport type { LayoutServerLoad } from './$types';

\texport const load: LayoutServerLoad = async ({ locals, url }) => {
\t\t// Filters (date range, merchant) live on the URL so counts and rows
\t\t// stay in lock-step. One query returns all four totals at once.
\t\tconst filters = {
\t\t\tfrom: url.searchParams.get('from'),
\t\t\tto: url.searchParams.get('to'),
\t\t\tmerchant: url.searchParams.get('merchant')
\t\t};

\t\tconst counts = await locals.db.transactions.countByStatus(filters);
\t\t// → { all: 124, pending: 3, settled: 119, disputed: 2 }

\t\treturn { counts, filters };
\t};
<\/script>`;

	const pageExample = `<script lang="ts">
\timport { page } from '$app/state';
\timport { Pill } from '@dashfi/svelte/ui/pill';
\timport type { LayoutData } from './$types';

\tlet { data, children }: { data: LayoutData; children: Snippet } = $props();

\tconst tabs = $derived([
\t\t{ id: 'all', label: 'All', href: '/transactions', count: data.counts.all, type: 'base' },
\t\t{ id: 'pending', label: 'Pending', href: '/transactions/pending', count: data.counts.pending, type: 'warning' },
\t\t{ id: 'settled', label: 'Settled', href: '/transactions/settled', count: data.counts.settled, type: 'base' },
\t\t{ id: 'disputed', label: 'Disputed', href: '/transactions/disputed', count: data.counts.disputed, type: 'danger' }
\t]);

\tfunction isActive(href: string): boolean {
\t\t// "All" is the index — match exactly so child routes don't also light it up.
\t\tif (href === '/transactions') return page.url.pathname === '/transactions';
\t\treturn page.url.pathname.startsWith(href);
\t}
<\/script>

<nav class="tabs" aria-label="Transaction status">
\t{#each tabs as tab (tab.id)}
\t\t<a
\t\t\thref={tab.href}
\t\t\tclass="tab"
\t\t\tclass:active={isActive(tab.href)}
\t\t\taria-current={isActive(tab.href) ? 'page' : undefined}
\t\t>
\t\t\t<span>{tab.label}</span>
\t\t\t<Pill type={tab.type} size="sm">{tab.count}</Pill>
\t\t</a>
\t{/each}
</nav>

{@render children()}`;
</script>

<svelte:head><title>Tabbed section with live counts — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Tabbed section with live counts"
	description="Page-level pattern: tabs that double as data counters. 'All (124) · Pending (3) · Settled (121).' Counts react to filters. The single most-replicated page shape inside dashfi-ui."
	uses={['Tabs', 'Pill', 'Badge', 'Table', '$page.url']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="540px">
			{#snippet children(_m)}
				<div class="pattern-frame">
					<nav class="tabs" aria-label="Transaction status">
						{#each tabs as tab (tab.id)}
							<button
								type="button"
								class="tab"
								class:active={active === tab.id}
								aria-current={active === tab.id ? 'page' : undefined}
								onclick={() => (active = tab.id)}
							>
								<span class="tab-label">{tab.label}</span>
								<Pill type={tab.pillType} size="sm">{tab.count}</Pill>
							</button>
						{/each}
					</nav>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Merchant</TableHead>
								<TableHead class="text-right">Amount</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{#each visibleRows as r (r.merchant + r.date)}
								<TableRow>
									<TableCell class="font-mono tabular-nums">{r.date}</TableCell>
									<TableCell>{r.merchant}</TableCell>
									<TableCell class="text-right font-mono tabular-nums">{fmt(r.amount)}</TableCell>
									<TableCell>
										<Pill type={statusPillType(r.status)} size="sm">{r.status}</Pill>
									</TableCell>
								</TableRow>
							{/each}
							{#if visibleRows.length === 0}
								<TableRow>
									<TableCell class="empty" colspan={4}>
										No {active} transactions in the current view.
									</TableCell>
								</TableRow>
							{/if}
						</TableBody>
					</Table>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<div class="code-stack">
			<div class="code-block">
				<div class="code-label">(protected)/transactions/+layout.server.ts</div>
				<CodeSnippet code={layoutExample} language="typescript" />
			</div>
			<div class="code-block">
				<div class="code-label">(protected)/transactions/+layout.svelte</div>
				<CodeSnippet code={pageExample} language="svelte" />
			</div>
		</div>
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				This is the most-replicated page shape inside dashfi-ui — transactions, vendors, invoices,
				disputes, bills all use it. Counts tell the user where the work is at a glance, so they
				don't have to click each tab to find pending items. The combination of tabs-as-nav and
				counts-as-status is the daily-driver page for ops users: open the surface, see "Pending
				(3)" lit up, go straight there.
			</p>

			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Counts come from the loader, not per-tab fetches.</strong> All four counts
					arrive in one query so tabs stay in sync without n-mount-effects. The
					<code>+layout.server.ts</code> returns
					<code>counts: &#123; all, pending, settled, disputed &#125;</code> in a single
					round-trip, and every child route reads from the same shared <code>data</code>.
				</li>
				<li>
					<strong>Counts react to filters.</strong> If the user applies a date range or merchant
					filter, the counts re-fetch and reflect filtered totals — otherwise the counts lie. The
					filters live on the URL, the loader reads them, and the counts and rows recompute
					together.
				</li>
				<li>
					<strong>Tabs route via URL, not local state.</strong> Each tab is an
					<code>&lt;a href&gt;</code> so refresh, back-button, and share-link all behave
					naturally. (Note the preview above uses local state purely for demo convenience — the
					production wiring in the Code tab is URL-driven.)
				</li>
				<li>
					<strong>Tab order is by frequency-of-use, not alphabetical.</strong> "All" first as the
					safe default, then the most-actionable status (Pending), then steady states (Settled,
					Disputed). The user shouldn't have to hunt for "Pending" — it's the reason they came to
					the page.
				</li>
				<li>
					<strong>Status-coded count Pills.</strong> Pending uses <code>warning</code>, Disputed
					uses <code>danger</code>. Colour-only signals are paired with text labels so the
					affordance is accessible without colour vision — the Pill carries colour plus number,
					the tab carries word plus colour.
				</li>
				<li>
					<strong>The "All" tab is the index route.</strong> The active-state check uses
					<code>===</code> for the bare <code>/transactions</code>, <code>startsWith</code> for
					child tabs — otherwise "All" lights up on every nested route, because every child path
					starts with the parent.
				</li>
			</ul>

			<h3>When to NOT use this</h3>
			<ul>
				<li>
					<strong>Only one possible status</strong> → no tabs needed. Render the table directly.
				</li>
				<li>
					<strong>Tabs would exceed ~6</strong> → switch to a sidebar nav or split into separate
					sections. Tab strips collapse poorly on mobile past six entries.
				</li>
				<li>
					<strong>Counts can't be computed cheaply on the server</strong> → don't show fake
					numbers. Either invest in the cheap aggregate or drop the counts entirely; never let a
					tab claim "Pending (?)" or stale numbers.
				</li>
				<li>
					<strong>Status changes don't matter to the user's flow</strong> → just use filters. Tabs
					are for states the user actively switches between; if they never switch, a single filter
					control is honest about the lower priority.
				</li>
			</ul>

			<h3>Source</h3>
			<p>
				Distilled from <code>(protected)/transactions/+page.svelte</code> in dashfi-ui. Full
				inventory at <code>.knowledge/dashfi-ui-patterns.md</code> (pattern P1).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Tabs with deltas</strong> — append "+3 today" beside the count when there's
					recent activity worth flagging. Implements "what's new since you last looked" without a
					notification system. The delta is a second muted Pill or a small subscript on the
					count.
				</li>
				<li>
					<strong>Tabs with action affordance on each</strong> — when a status has a primary
					action (e.g. "Approve" on Pending), surface it as a right-aligned button on that tab's
					content area, not in the tab itself. Tabs are navigation; actions belong to the surface
					the tab reveals.
				</li>
				<li>
					<strong>Tab strip + secondary filter row</strong> — when filters apply across all tabs
					(date range, merchant), put filters in a second row above the tabs. Tabs are status;
					filters are scope. Keep the two rows visually distinct so the user knows which control
					affects which axis.
				</li>
				<li>
					<strong>Compact variant for sub-section</strong> — without the page header, embed the
					tab strip directly inside <a href="/patterns/sub-section-tabs">Sub-section header with
						tabs</a> for nested workflows. Same counting logic, smaller type scale, less
					vertical chrome.
				</li>
			</ul>

			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't fetch counts per-tab on mount.</strong> N requests when 1 will do. It also
					introduces a race: tabs render before their counts arrive, then jitter into place. One
					query, one render.
				</li>
				<li>
					<strong>Don't omit the count when it's zero.</strong> "Settled (0)" tells the user the
					status is empty <em>and active</em>. Hiding the count makes the tab look broken — the
					user wonders whether the count failed to load or the tab is disabled.
				</li>
				<li>
					<strong>Don't badge tabs with colour AND background fill.</strong> Pill colour is enough
					signal. Tab background fills should stay reserved for the active state — otherwise the
					eye can't tell at a glance which tab is selected versus which tab has urgent work.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.pattern-frame {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
		max-width: 720px;
	}

	.tabs {
		display: flex;
		gap: 0;
		border-bottom: 1px solid var(--border);
	}
	.tab {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		background: transparent;
		border: 0;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		color: var(--fg-muted);
		cursor: pointer;
		transition:
			color 120ms ease,
			border-color 120ms ease;
	}
	.tab:hover {
		color: var(--fg);
	}
	.tab.active {
		color: var(--fg);
		border-bottom-color: var(--fg);
	}
	.tab-label {
		letter-spacing: -0.01em;
	}

	.empty {
		text-align: center;
		color: var(--fg-muted);
		font-style: italic;
		padding: 32px 0;
	}

	.code-stack {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.code-block {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.code-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
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
	.rationale em {
		font-style: italic;
	}
	.rationale a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
