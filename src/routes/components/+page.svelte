<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import StatusBadge from '$chrome/StatusBadge.svelte';
	import { componentsByCategory } from '$content/components.js';

	const grouped = componentsByCategory();
	const categories = [...grouped.entries()].filter(([, list]) => list.length > 0);
</script>

<svelte:head><title>Components — Dashbook</title></svelte:head>

<InnerPage>
	<PageHeader
		label="Components"
		title="Components."
		lede="Live previews of every Svelte component from @dashfi/svelte. Tabs for code, anatomy, accessibility, and changelog. Drop-in for any consumer."
	/>

	<div class="meta">
		<span class="counts tabular-nums">
			{[...grouped.values()].reduce((s, l) => s + l.length, 0)} components
		</span>
		<span class="muted">·</span>
		<span class="muted">Phase 5 — 24 added (full lib coverage). Beta marks components without upstream stories.</span>
	</div>

	{#each categories as [category, list] (category)}
		<section class="cat">
			<div class="section-header">{category}</div>
			<ul class="list">
				{#each list as c (c.slug)}
					<li>
						<a href="/components/{c.slug}">
							<div class="left">
								<div class="name-row">
									<span class="name">{c.name}</span>
									<StatusBadge status={c.status} />
								</div>
								<p class="desc">{c.description}</p>
							</div>
							<ArrowUpRight size={16} strokeWidth={1.5} />
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</InnerPage>

<style>
	.meta {
		display: flex;
		align-items: center;
		gap: 12px;
		margin: -32px 0 48px;
		font-size: 13px;
		color: var(--fg);
	}
	.counts {
		font-family: var(--font-mono);
		color: var(--fg);
	}
	.muted {
		color: var(--fg-muted);
	}
	.cat {
		margin-bottom: 64px;
	}
	.cat .section-header {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 16px;
	}
	.list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.list li {
		border-top: 1px solid var(--border);
	}
	.list li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.list a {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 24px;
		padding: 20px 0;
		text-decoration: none;
		color: var(--fg);
		transition: color 150ms;
	}
	.list a:hover {
		color: var(--brand);
	}
	.name-row {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.name {
		font-size: 17px;
		font-weight: 500;
	}
	.desc {
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin-top: 6px;
	}
</style>
