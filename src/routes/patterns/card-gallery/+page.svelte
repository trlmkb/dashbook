<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Pill } from '@dashfi/svelte/ui/pill';
	import { Button } from '@dashfi/svelte/ui/button';
	import Search from '@lucide/svelte/icons/search';
	import Grid3x3 from '@lucide/svelte/icons/grid-3x3';
	import List from '@lucide/svelte/icons/list';
	import Funnel from '@lucide/svelte/icons/funnel';

	type Card = {
		id: string;
		name: string;
		holder: string;
		last4: string;
		status: 'active' | 'frozen';
		limit: number;
		spent: number;
	};

	const cards: Card[] = [
		{ id: 'c1', name: 'Engineering', holder: 'Alex Chen', last4: '4429', status: 'active', limit: 25_000, spent: 18_204 },
		{ id: 'c2', name: 'Marketing', holder: 'Priya Nair', last4: '1180', status: 'active', limit: 10_000, spent: 9_640 },
		{ id: 'c3', name: 'Ops', holder: 'Zygis Y.', last4: '7702', status: 'frozen', limit: 5_000, spent: 0 },
		{ id: 'c4', name: 'Travel', holder: 'Marcus Doe', last4: '2210', status: 'active', limit: 3_000, spent: 812 }
	];

	let viewMode = $state<'list' | 'grid'>('grid');
	let search = $state('');
	let showFilters = $state(false);

	const filtered = $derived(
		cards.filter((c) => `${c.name} ${c.holder}`.toLowerCase().includes(search.toLowerCase()))
	);

	function fmt(n: number): string {
		return `$${n.toLocaleString('en-US')}`;
	}

	const example = `<script lang="ts">
\timport { PaginationWrapper } from '@dashfi/svelte/ui/pagination-wrapper';
\timport * as Popover from '@dashfi/svelte/ui/popover';
\timport * as Command from '@dashfi/svelte/ui/command';

\tlet viewMode = \$state<'list' | 'grid'>('list');
\tlet showFilters = \$state(false);

\t// Cardholder facet is a Command-driven combobox in a Popover — searchable,
\t// infinite-scroll for admins with hundreds of cardholders.
<\/script>

<div class="toolbar">
\t<Input type="search" placeholder="Search cards..." debounce={300} bind:value={query.name} />
\t<Button variant="ghost" size="sm" onclick={() => (showFilters = !showFilters)}>
\t\t<Funnel /> Filter {#if activeFilterCount}<span class="badge">{activeFilterCount}</span>{/if}
\t</Button>
\t<Button variant="ghost" size="icon-sm" onclick={() => (viewMode = 'list')}><List /></Button>
\t<Button variant="ghost" size="icon-sm" onclick={() => (viewMode = 'grid')}><Grid3x3 /></Button>
</div>

{#if showFilters}
\t<fieldset>
\t\t<Popover.Root><!-- cardholder combobox --></Popover.Root>
\t\t<Select type="multiple" bind:value={query.status}>
\t\t\t{#each CARD_STATUS as s}<Select.Item value={s}>{s}</Select.Item>{/each}
\t\t</Select>
\t</fieldset>
{/if}

{#if viewMode === 'grid'}
\t<div class="grid">{#each cards as c}<GridCardItem card={c} />{/each}</div>
{:else}
\t<div class="list">{#each cards as c}<ListCardItem card={c} />{/each}</div>
{/if}

<PaginationWrapper bind:page bind:pageSize {totalItems} pageSizeOptions={[9, 12, 21]} />`;
</script>

<svelte:head><title>Card gallery — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Card gallery"
	description="Grid↔list toggle over a set of issued cards, with a cardholder combobox facet, status chips, and per-card freeze/edit/duplicate/archive actions. The overview shape for any 'collection of visual objects' surface."
	uses={['ToggleGroup', 'Command', 'Popover', 'Select', 'Input', 'Pagination']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="480px">
			{#snippet children(_m)}
				<div class="frame">
					<div class="toolbar">
						<div class="search" style:flex="0 1 260px">
							<Search size={14} strokeWidth={1.5} class="search-icon" />
							<Input type="search" placeholder="Search cards…" bind:value={search} />
						</div>
						<Button variant="ghost" size="sm" onclick={() => (showFilters = !showFilters)}>
							<Funnel size={14} strokeWidth={1.5} />
							Filter
						</Button>
						<div class="spacer"></div>
						<div class="view-toggle">
							<button
								type="button"
								class:active={viewMode === 'list'}
								onclick={() => (viewMode = 'list')}
								aria-label="List view"
							>
								<List size={14} strokeWidth={1.5} />
							</button>
							<button
								type="button"
								class:active={viewMode === 'grid'}
								onclick={() => (viewMode = 'grid')}
								aria-label="Grid view"
							>
								<Grid3x3 size={14} strokeWidth={1.5} />
							</button>
						</div>
					</div>

					{#if showFilters}
						<div class="filters">
							<span class="filter-chip">All holders</span>
							<span class="filter-chip">Active, Frozen</span>
						</div>
					{/if}

					{#if viewMode === 'grid'}
						<div class="grid">
							{#each filtered as c (c.id)}
								<div class="card-tile">
									<div class="tile-top">
										<span>{c.name}</span>
										<Pill type={c.status === 'active' ? 'success' : 'base'}>{c.status}</Pill>
									</div>
									<div class="tile-num mono">···· {c.last4}</div>
									<div class="tile-bottom">
										<span class="holder">{c.holder}</span>
										<span class="mono">{fmt(c.spent)} / {fmt(c.limit)}</span>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="list">
							{#each filtered as c (c.id)}
								<div class="list-row">
									<div class="list-card-icon"></div>
									<div class="list-meta">
										<div class="list-name">{c.name} · ···· {c.last4}</div>
										<div class="list-holder">{c.holder}</div>
									</div>
									<div class="list-limit mono">{fmt(c.spent)} / {fmt(c.limit)}</div>
									<Pill type={c.status === 'active' ? 'success' : 'base'}>{c.status}</Pill>
								</div>
							{/each}
						</div>
					{/if}
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
				Cards are visual objects (color, brand, physical-vs-virtual) as much as they are data
				rows, so the overview supports both a scan-friendly grid and a compare-friendly list,
				with the choice persisted per-user rather than reset on every visit.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>View mode persists to storage</strong>, not just component state — a returning
					user sees the layout they last chose.
				</li>
				<li>
					<strong>Two distinct cardholder filters</strong> depending on permission scope: admins
					get a searchable infinite-scroll combobox over every user; managers with
					<code>card:read.managed</code> get a small static list of only their managees. Same UI
					shape, different data source — never a single component branching on role internally.
				</li>
				<li>
					<strong>Filter panel is collapsed by default</strong>, toggled by a button with an
					active-count badge, so the toolbar stays a single row until the user asks for more.
				</li>
				<li>
					<strong>Empty state distinguishes "no cards" from "no matches."</strong> A brand-new
					workspace gets a "Request card" CTA; a filtered-to-zero result gets "Reset filters."
				</li>
			</ul>
			<h3>Source</h3>
			<p>Distilled from <code>(protected)/cards/overview/+page.svelte</code>.</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Client-side pagination for pre-loaded sets</strong> — the managed-cards path
					fetches the full managee list once and paginates client-side, since the dataset is
					small and permission-scoped; the admin path stays server-paginated.
				</li>
				<li>
					<strong>Loading skeleton mirrors the active view mode</strong> — the grid skeleton is a
					card-shaped block; the list skeleton is a row-shaped block. Never a single generic
					spinner for both.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.frame {
		display: flex;
		flex-direction: column;
		gap: 14px;
		width: 100%;
		max-width: 880px;
	}
	.toolbar {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}
	.search {
		position: relative;
	}
	:global(.search-icon) {
		position: absolute;
		left: 8px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--fg-muted);
		pointer-events: none;
	}
	.spacer {
		flex: 1;
	}
	.view-toggle {
		display: flex;
		border: 1px solid var(--border);
	}
	.view-toggle button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border: 0;
		background: transparent;
		color: var(--fg-muted);
		cursor: pointer;
	}
	.view-toggle button.active {
		background: var(--bg-muted);
		color: var(--fg);
	}
	.filters {
		display: flex;
		gap: 8px;
		padding: 10px 12px;
		border: 1px solid var(--border);
		background: var(--bg-muted);
	}
	.filter-chip {
		font-size: 12px;
		color: var(--fg-muted);
		padding: 3px 8px;
		border: 1px solid var(--border);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 12px;
	}
	.card-tile {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 14px;
		border: 1px solid var(--border);
	}
	.tile-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 13px;
		font-weight: 500;
	}
	.tile-num {
		font-size: 15px;
		color: var(--fg-muted);
	}
	.tile-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 11px;
		color: var(--fg-muted);
	}
	.list {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
	}
	.list-row {
		display: grid;
		grid-template-columns: 32px 1fr auto auto;
		align-items: center;
		gap: 12px;
		padding: 10px 14px;
		border-top: 1px solid var(--border);
	}
	.list-row:first-child {
		border-top: 0;
	}
	.list-card-icon {
		width: 32px;
		height: 20px;
		background: var(--bg-muted);
		border: 1px solid var(--border);
	}
	.list-name {
		font-size: 13px;
		font-weight: 500;
	}
	.list-holder {
		font-size: 11px;
		color: var(--fg-muted);
	}
	.mono {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		font-size: 12px;
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
</style>
