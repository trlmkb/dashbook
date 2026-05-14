<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Pill } from '@dashfi/svelte/ui/pill';
	import {
		Table,
		TableHeader,
		TableBody,
		TableRow,
		TableHead,
		TableCell
	} from '@dashfi/svelte/ui/table';

	type PillType = 'success' | 'warning' | 'info' | 'danger' | 'base';

	const metrics: Array<{ label: string; value: string; note: string; pill: PillType }> = [
		{
			label: 'Available balance',
			value: '$128,420.91',
			note: '+2.1% vs last month',
			pill: 'success'
		},
		{ label: 'Open bills', value: '$14,208', note: '3 due this week', pill: 'warning' },
		{ label: 'Active cards', value: '28', note: '+4 issued this month', pill: 'info' },
		{ label: 'Pending reviews', value: '7', note: 'Needs your attention', pill: 'danger' }
	];

	const recentActivity = [
		{ date: '2026-05-13', merchant: 'Stripe', amount: -2890.0, status: 'posted' as const },
		{ date: '2026-05-13', merchant: 'AWS', amount: -12_408.55, status: 'posted' as const },
		{ date: '2026-05-12', merchant: 'Meta Ads', amount: -8_200.0, status: 'pending' as const },
		{ date: '2026-05-12', merchant: 'Google Ads', amount: -6_044.12, status: 'pending' as const },
		{ date: '2026-05-11', merchant: 'Vercel', amount: -990.0, status: 'posted' as const }
	];

	const quickStats = [
		{ label: 'Active cards', value: '28' },
		{ label: 'Spend MTD', value: '$84,210' },
		{ label: 'Largest transaction', value: '$12,408' }
	];

	function fmt(n: number): string {
		const sign = n < 0 ? '−' : '';
		return `${sign}$${Math.abs(n).toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})}`;
	}

	const example = `<script lang="ts">
\timport { Button } from '@dashfi/svelte/ui/button';
\timport { Pill } from '@dashfi/svelte/ui/pill';
\timport {
\t\tTable, TableHeader, TableBody, TableRow, TableHead, TableCell
\t} from '@dashfi/svelte/ui/table';
\timport { goto } from '$app/navigation';

\tlet { data } = $props();
\tconst { metrics, recentActivity, quickStats } = data;
<\/script>

<header class="dash-header">
\t<div>
\t\t<p class="eyebrow">Workspace</p>
\t\t<h2>Dashboard.</h2>
\t\t<p class="lede">Snapshot of cards, balances, and recent activity.</p>
\t</div>
\t<div class="actions">
\t\t<Button variant="outline" onclick={() => goto('/cards/new')}>Issue card</Button>
\t\t<Button variant="outline" onclick={() => goto('/bill-pay')}>Pay bill</Button>
\t\t<Button variant="outline" onclick={() => goto('/team/invite')}>Add member</Button>
\t</div>
</header>

<section class="tiles">
\t{#each metrics as m (m.label)}
\t\t<div class="tile">
\t\t\t<p class="tile-label">{m.label}</p>
\t\t\t<p class="tile-value">{m.value}</p>
\t\t\t<div class="tile-note">
\t\t\t\t<Pill type={m.pill}>{m.note}</Pill>
\t\t\t</div>
\t\t</div>
\t{/each}
</section>

<section class="split">
\t<div class="activity">
\t\t<h3>Recent activity</h3>
\t\t<Table>
\t\t\t<TableHeader>
\t\t\t\t<TableRow>
\t\t\t\t\t<TableHead>Date</TableHead>
\t\t\t\t\t<TableHead>Merchant</TableHead>
\t\t\t\t\t<TableHead class="text-right">Amount</TableHead>
\t\t\t\t\t<TableHead>Status</TableHead>
\t\t\t\t</TableRow>
\t\t\t</TableHeader>
\t\t\t<TableBody>
\t\t\t\t{#each recentActivity as r (r.merchant + r.date)}
\t\t\t\t\t<TableRow>
\t\t\t\t\t\t<TableCell class="font-mono">{r.date}</TableCell>
\t\t\t\t\t\t<TableCell>{r.merchant}</TableCell>
\t\t\t\t\t\t<TableCell class="text-right font-mono">{fmt(r.amount)}</TableCell>
\t\t\t\t\t\t<TableCell>
\t\t\t\t\t\t\t<Pill type={r.status === 'pending' ? 'warning' : 'base'}>{r.status}</Pill>
\t\t\t\t\t\t</TableCell>
\t\t\t\t\t</TableRow>
\t\t\t\t{/each}
\t\t\t</TableBody>
\t\t</Table>
\t\t<a href="/transactions" class="view-all">View all transactions →</a>
\t</div>

\t<aside class="stats">
\t\t<h3>Quick stats</h3>
\t\t{#each quickStats as s (s.label)}
\t\t\t<div class="stat-row">
\t\t\t\t<span class="stat-label">{s.label}</span>
\t\t\t\t<span class="stat-value">{s.value}</span>
\t\t\t</div>
\t\t{/each}
\t</aside>
</section>

<!--
\t+page.server.ts
\t---------------
\texport async function load({ locals }) {
\t\tconst [metrics, recentActivity, quickStats] = await Promise.all([
\t\t\tlocals.api.dashboard.metrics(),
\t\t\tlocals.api.transactions.recent({ limit: 5 }),
\t\t\tlocals.api.dashboard.quickStats()
\t\t]);
\t\treturn { metrics, recentActivity, quickStats };
\t}
-->`;
</script>

<svelte:head><title>Dashboard summary — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Dashboard summary"
	description="Metric tiles row + recent activity + quick actions. The home of every authenticated section — overview before drill-in."
	uses={['Card', 'Pill', 'Table', 'Button']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="640px">
			{#snippet children(_m)}
				<div class="frame">
					<header class="dash-header">
						<div class="dash-header-text">
							<p class="eyebrow">Workspace</p>
							<h2 class="title">Dashboard.</h2>
							<p class="lede">Snapshot of cards, balances, and recent activity.</p>
						</div>
						<div class="actions">
							<Button variant="outline">Issue card</Button>
							<Button variant="outline">Pay bill</Button>
							<Button variant="outline">Add member</Button>
						</div>
					</header>

					<section class="tiles">
						{#each metrics as m (m.label)}
							<div class="tile">
								<p class="tile-label">{m.label}</p>
								<p class="tile-value">{m.value}</p>
								<div class="tile-note">
									<Pill type={m.pill}>{m.note}</Pill>
								</div>
							</div>
						{/each}
					</section>

					<section class="split">
						<div class="activity">
							<h3 class="section-head">Recent activity</h3>
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
									{#each recentActivity as r (r.merchant + r.date)}
										<TableRow>
											<TableCell class="font-mono tabular-nums">{r.date}</TableCell>
											<TableCell>{r.merchant}</TableCell>
											<TableCell class="text-right font-mono tabular-nums"
												>{fmt(r.amount)}</TableCell
											>
											<TableCell>
												<Pill type={r.status === 'pending' ? 'warning' : 'base'}
													>{r.status}</Pill
												>
											</TableCell>
										</TableRow>
									{/each}
								</TableBody>
							</Table>
							<a
								href="/patterns/dashboard-summary"
								class="view-all"
								onclick={(e) => e.preventDefault()}
							>
								View all transactions →
							</a>
						</div>

						<aside class="stats">
							<h3 class="section-head">Quick stats</h3>
							<div class="stats-body">
								{#each quickStats as s (s.label)}
									<div class="stat-row">
										<span class="stat-label">{s.label}</span>
										<span class="stat-value">{s.value}</span>
									</div>
								{/each}
							</div>
						</aside>
					</section>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				Every authenticated section opens on an overview before drill-in. The dashboard is the
				most-visited surface in dashfi-ui — every user lands here on login, and the screen has
				to give them an instant read on the workspace plus a clean handoff into wherever they
				meant to go. We don't invent new primitives for it: a row of <code>Metric card</code>
				patterns, a thin slice of the <code>Transaction list</code> recipe, and a small cluster
				of quick actions. Composition over invention.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>3–4 metric tiles, never more.</strong> Beyond four, the user can't track which
					one is most-important — and most-important is the whole point of a dashboard hero. When
					you feel the urge to add a fifth, the answer is a dedicated analytics surface, not a wider
					hero row.
				</li>
				<li>
					<strong>Recent activity is a slice, not the full table.</strong> 5 rows max with a "View
					all →" link out. The dashboard isn't where you process work; it's where you decide what
					to process next. Filters, pagination, and bulk actions belong on the full transactions
					surface.
				</li>
				<li>
					<strong>Quick actions live above the metrics</strong>, not below them. The user lands on
					the dashboard with intent ("issue a card", "pay a bill"); making them scroll past metrics
					to find the action is hostile.
				</li>
				<li>
					<strong>Status colour is the only colour in the metric tiles.</strong> Tiles are neutral;
					the Pill carries the urgency. Tinting the whole tile background by status creates a panic-button
					effect across the page.
				</li>
				<li>
					<strong>No charts in the default dashboard.</strong> Charts belong on dedicated analytics
					surfaces. Dashboard tiles are point-in-time numbers; charts demand range + interaction and
					they fight the scannability of the tile row.
				</li>
				<li>
					<strong>Dashboard data is loader-driven, not client-fetched.</strong> SSR the entire page
					so the user sees real numbers on first paint, not a skeleton flash. The dashboard is a first-impression
					surface; it should never look like it's still thinking.
				</li>
			</ul>
			<h3>When to extend this pattern</h3>
			<ul>
				<li>
					User has multiple sub-roles (e.g. admin + cardholder) → consider role-scoped tile
					selection so each role sees the four metrics that matter to them, not a union of all
					eight.
				</li>
				<li>
					Time-range scope is meaningful → add a single <code>SelectFilter</code> next to the
					header (Today / 7d / 30d / MTD) that re-fetches the loader. Resist adding more than one
					global filter; dashboards are not query builders.
				</li>
				<li>
					Workspace is multi-tenant → show the current org's tiles + a switcher in the topbar
					(NOT in the dashboard itself). The dashboard should never carry workspace-switching
					chrome.
				</li>
				<li>
					The metric tile reveals a deeper drill-in → make the whole tile clickable and link to
					the section. Pair it with a subtle hover affordance; don't bolt on a "View" button.
				</li>
			</ul>
			<h3>Source</h3>
			<p>
				Dashboard root inside <code>(protected)</code> in dashfi-ui. Inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern P7).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Activity-first variant</strong> — when the user's primary mode is reactive
					(review queues, approvals), flip the order: activity table on top, metrics below as
					context. Use for ops/approver personas.
				</li>
				<li>
					<strong>Comparison metrics</strong> — instead of point-in-time numbers, show this period
					vs last period as a side-by-side ($128k vs $112k). Useful for finance teams that think
					in deltas.
				</li>
				<li>
					<strong>Per-section dashboards</strong> — every protected section can have its own
					dashboard at its root (e.g. <code>/cards</code>, <code>/bill-pay</code>). Same pattern,
					scoped tiles + scoped activity. Stay consistent across sections so the muscle memory
					transfers.
				</li>
				<li>
					<strong>Empty-state for fresh accounts</strong> — on day one the metrics are zero.
					Replace the tile values with a single onboarding card spanning the metric row width:
					"Issue your first card to populate this dashboard." See the
					<a href="/patterns/empty-zero-state">Empty state</a> pattern.
				</li>
			</ul>
			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't show 8+ tiles.</strong> What you've actually shipped is a metric
					<em>table</em>, not a dashboard. Move the long tail to an analytics surface and let the
					dashboard stay a hero.
				</li>
				<li>
					<strong>Don't make every tile clickable as the primary affordance.</strong> If
					everything's a link, users second-guess what "View all" means. Tiles are summaries;
					explicit "View" buttons or the activity table are the navigation.
				</li>
				<li>
					<strong>Don't refresh tiles on a timer.</strong> Auto-refresh tells the user "the data
					might be wrong"; SvelteKit's invalidation handles it on focus/navigation. Live-updating
					ticker UIs are for trading apps, not dashboards.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.frame {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
		max-width: 880px;
	}
	.dash-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
		flex-wrap: wrap;
	}
	.dash-header-text {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 0;
	}
	.title {
		font-size: 28px;
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--fg);
		margin: 0;
	}
	.lede {
		font-size: 14px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 0;
		max-width: 440px;
	}
	.actions {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.tiles {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 12px;
	}
	.tile {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 16px;
		border: 1px solid var(--border);
		background: var(--bg);
		min-width: 0;
	}
	.tile-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 0;
	}
	.tile-value {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--fg);
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tile-note {
		display: flex;
		align-items: center;
	}

	.split {
		display: grid;
		grid-template-columns: 60fr 40fr;
		gap: 16px;
		align-items: start;
	}
	.activity {
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-width: 0;
	}
	.section-head {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 0 0 4px;
	}
	.view-all {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		color: var(--fg);
		text-decoration: none;
		align-self: flex-start;
		padding-top: 4px;
	}
	.view-all:hover {
		text-decoration: underline;
	}

	.stats {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 16px;
		border: 1px solid var(--border);
		background: var(--bg);
	}
	.stats-body {
		display: flex;
		flex-direction: column;
	}
	.stat-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 0;
		border-top: 1px solid var(--border);
	}
	.stat-row:first-child {
		border-top: 0;
		padding-top: 4px;
	}
	.stat-label {
		font-size: 13px;
		color: var(--fg-muted);
	}
	.stat-value {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		font-size: 14px;
		color: var(--fg);
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
		color: var(--fg);
		text-decoration: underline;
	}
</style>
