<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Pill } from '@dashfi/svelte/ui/pill';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '@dashfi/svelte/ui/select';
	import Bell from '@lucide/svelte/icons/bell';
	import Calendar from '@lucide/svelte/icons/calendar';

	type Notif = { id: string; title: string; group: 'today' | 'yesterday' | 'thisWeek'; read: boolean };

	let notifications = $state<Notif[]>([
		{ id: 'n1', title: 'Card ····4429 was frozen by Alex Chen', group: 'today', read: false },
		{ id: 'n2', title: 'Invoice PO-4421 approved', group: 'today', read: false },
		{ id: 'n3', title: 'Bill pay run completed — 8 invoices paid', group: 'yesterday', read: true },
		{ id: 'n4', title: 'New team member Priya Nair joined', group: 'thisWeek', read: true },
		{ id: 'n5', title: 'Statement for May is ready', group: 'thisWeek', read: false }
	]);

	const dateFilterOptions = { all: 'All time', today: 'Today', week: 'This week' } as const;
	let dateFilter = $state<keyof typeof dateFilterOptions>('all');

	const groupLabels: Record<Notif['group'], string> = {
		today: 'Today',
		yesterday: 'Yesterday',
		thisWeek: 'This week'
	};

	const filtered = $derived(
		notifications.filter((n) => {
			if (dateFilter === 'all') return true;
			if (dateFilter === 'today') return n.group === 'today';
			return n.group !== undefined;
		})
	);

	const grouped = $derived.by(() => {
		const groups: Record<string, Notif[]> = { today: [], yesterday: [], thisWeek: [] };
		for (const n of filtered) groups[n.group].push(n);
		return groups;
	});

	const unreadCount = $derived(notifications.filter((n) => !n.read).length);

	function markRead(n: Notif): void {
		if (n.read) return;
		notifications = notifications.map((x) => (x.id === n.id ? { ...x, read: true } : x));
	}

	const example = `<script lang="ts">
\timport { knockItems, unreadCount, markRead } from '$lib/knock';

\tconst dateFilterOptions = { all: 'All time', today: 'Today', week: 'This week', month: 'This month' };
\tlet dateFilter = \$state<keyof typeof dateFilterOptions>('all');

\tfunction groupNotificationsByDate(notifications) {
\t\tconst today = startOfDay(new Date());
\t\tconst yesterday = subDays(today, 1);
\t\tconst thisWeek = subDays(today, 7);
\t\tconst thisMonth = subDays(today, 30);
\t\treturn {
\t\t\ttoday: notifications.filter((n) => timestamp(n) >= today),
\t\t\tyesterday: notifications.filter((n) => timestamp(n) >= yesterday && timestamp(n) < today),
\t\t\tthisWeek: notifications.filter((n) => timestamp(n) >= thisWeek && timestamp(n) < yesterday),
\t\t\tthisMonth: notifications.filter((n) => timestamp(n) >= thisMonth && timestamp(n) < thisWeek),
\t\t\tolder: notifications.filter((n) => timestamp(n) < thisMonth)
\t\t};
\t}
<\/script>

<div class="head">
\t<h1>Notifications</h1>
\t<Button href="/notifications/preferences" variant="outline" size="sm"><Settings /> Preferences</Button>
</div>

<div class="inbox">
\t<div class="toolbar">
\t\t<p>{unreadCount} unread notifications</p>
\t\t<Select type="single" bind:value={dateFilter}>
\t\t\t{#each Object.entries(dateFilterOptions) as [value, label]}
\t\t\t\t<Select.Item {value}>{label}</Select.Item>
\t\t\t{/each}
\t\t</Select>
\t</div>
\t{#each Object.entries(groupedNotifications) as [period, items]}
\t\t{#if items.length}
\t\t\t<h2>{period}</h2>
\t\t\t{#each items as n}<NotificationItem notification={n} onclick={() => markRead(n)} />{/each}
\t\t{/if}
\t{/each}
</div>`;
</script>

<svelte:head><title>Notification inbox — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Notification inbox"
	description="Today / Yesterday / This week grouping over a flat notification feed, with a date-range Select filter and click-to-mark-read. The canonical shape for any chronological, groupable feed."
	uses={['Select', 'Separator', 'Pill']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="440px">
			{#snippet children(_m)}
				<div class="inbox">
					<div class="toolbar">
						<p class="unread">
							{unreadCount} unread notification{unreadCount === 1 ? '' : 's'}
						</p>
						<div class="filter">
							<Calendar size={14} strokeWidth={1.5} />
							<Select type="single" bind:value={dateFilter}>
								<SelectTrigger class="h-8 w-36 text-xs">{dateFilterOptions[dateFilter]}</SelectTrigger>
								<SelectContent>
									{#each Object.entries(dateFilterOptions) as [value, label] (value)}
										<SelectItem {value}>{label}</SelectItem>
									{/each}
								</SelectContent>
							</Select>
						</div>
					</div>

					{#each Object.entries(grouped) as [period, items] (period)}
						{#if items.length > 0}
							<div class="group">
								<h4 class="group-label">{groupLabels[period as Notif['group']]}</h4>
								{#each items as n (n.id)}
									<button type="button" class="notif" class:unread={!n.read} onclick={() => markRead(n)}>
										<span class="dot" class:visible={!n.read}></span>
										<span class="notif-title">{n.title}</span>
										{#if !n.read}<Pill type="info">New</Pill>{/if}
									</button>
								{/each}
							</div>
						{/if}
					{/each}

					{#if filtered.length === 0}
						<div class="empty">
							<Bell size={20} strokeWidth={1.5} />
							<p>No notifications for the selected time period.</p>
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
				A flat, ungrouped notification list becomes unscannable past a dozen items. Bucketing by
				recency — Today / Yesterday / This week / This month / Older — gives the eye a landmark
				without requiring the user to read every timestamp.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Grouping is computed client-side from a flat feed</strong>, not fetched
					pre-grouped — the date-range filter and the grouping share the same underlying list, so
					they can never disagree.
				</li>
				<li>
					<strong>Clicking a notification marks it read</strong>; there's no separate "mark read"
					affordance per row. Read state is a side effect of engagement, not a distinct action.
				</li>
				<li>
					<strong>Unread count in the toolbar, not per-group.</strong> The single count is the
					thing users scan for; per-group counts would fragment attention across five headers.
				</li>
				<li>
					<strong>Empty groups render nothing</strong> — no "No notifications today" filler between
					populated groups. Silence between headers, not noise.
				</li>
			</ul>
			<h3>Source</h3>
			<p>Distilled from <code>(protected)/notifications/all/+page.svelte</code>.</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Bell dropdown (compact)</strong> — the topbar's <code>NotificationBell</code>
					shows the same grouping logic in a small Popover with a "View all" link into this full
					page, capped to the 5 most recent items with no date filter.
				</li>
				<li>
					<strong>Mark-all-read</strong> — for high-volume workspaces, add a single "Mark all as
					read" text button in the toolbar next to the unread count, rather than per-row bulk
					selection (notifications aren't acted on in bulk the way table rows are).
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.inbox {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
		max-width: 560px;
		border: 1px solid var(--border);
		background: var(--bg);
		padding: 16px 18px;
	}
	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border);
		margin-bottom: 6px;
	}
	.unread {
		margin: 0;
		font-size: 13px;
		color: var(--fg-muted);
	}
	.filter {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--fg-muted);
	}
	.group {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-bottom: 8px;
	}
	.group-label {
		margin: 6px 0 4px;
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.notif {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		text-align: left;
		padding: 8px 6px;
		border: 0;
		background: transparent;
		cursor: pointer;
		font-size: 13px;
		color: var(--fg);
	}
	.notif:hover {
		background: var(--bg-muted);
	}
	.notif.unread .notif-title {
		font-weight: 500;
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		flex-shrink: 0;
		background: transparent;
	}
	.dot.visible {
		background: var(--m-jade, #2b605c);
	}
	.notif-title {
		flex: 1;
	}
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 40px 0;
		color: var(--fg-muted);
		font-size: 13px;
	}
	.empty p {
		margin: 0;
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
