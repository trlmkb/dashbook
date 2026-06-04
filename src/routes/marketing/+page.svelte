<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import StatusBadge from '$chrome/StatusBadge.svelte';
	import { marketingFoundationMeta, marketingFoundationNames } from '$specs/marketing/foundations/index';
	import {
		marketingPatternsByCategory,
		marketingPatternCount
	} from '$specs/marketing/patterns/index';

	const grouped = [...marketingPatternsByCategory().entries()];
</script>

<svelte:head><title>Marketing — Dashbook</title></svelte:head>

<InnerPage section="/marketing" wide>
	<PageHeader
		label="Marketing"
		title="Marketing."
		lede="Reusable building blocks for any Dash.fi marketing page — heroes, layout frames, rhythm, content blocks, media, CTAs, and the building-block atoms. Sourced from the dash.fi website (Astro + Tailwind v4 + React islands), documented as recipes: DOM, the --m-* token roles, gotchas, and prop signatures."
	/>

	<div class="meta">
		<span class="counts tabular-nums">{marketingFoundationNames.length} foundations · {marketingPatternCount} patterns</span>
		<span class="muted">·</span>
		<span class="muted">The marketing counterpart to the product component library. Query via the <code>marketing_*</code> MCP tools.</span>
	</div>

	<section class="cat">
		<div class="section-header">Foundations</div>
		<ul class="list">
			{#each marketingFoundationNames as name (name)}
				<li>
					<a href="/marketing/foundations/{name}">
						<div class="left">
							<span class="name">{marketingFoundationMeta[name].name}</span>
							<p class="desc">{marketingFoundationMeta[name].description}</p>
						</div>
						<ArrowUpRight size={16} class="arrow" />
					</a>
				</li>
			{/each}
		</ul>
	</section>

	{#each grouped as [category, list] (category)}
		<section class="cat">
			<div class="section-header">{category}</div>
			<ul class="list">
				{#each list as p (p.slug)}
					<li>
						<a href="/marketing/patterns/{p.slug}">
							<div class="left">
								<div class="name-row">
									<span class="name">{p.name}</span>
									<StatusBadge status={p.status} />
									{#if p.toolId}<code class="tool">{p.toolId}</code>{/if}
								</div>
								<p class="desc">{p.description}</p>
							</div>
							<ArrowUpRight size={16} class="arrow" />
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
		align-items: baseline;
		gap: 10px;
		flex-wrap: wrap;
		margin: -32px 0 48px;
		font-size: 13px;
	}
	.counts {
		font-family: var(--font-mono);
		color: var(--fg);
	}
	.muted {
		color: var(--fg-muted);
	}
	.muted code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 5px;
	}
	.cat {
		margin-bottom: 48px;
	}
	.section-header {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 16px;
	}
	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--border);
	}
	.list a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 4px;
		border-bottom: 1px solid var(--border);
		text-decoration: none;
		color: var(--fg);
		transition: background 150ms;
	}
	.list a:hover {
		background: var(--bg-muted);
	}
	.left {
		min-width: 0;
	}
	.name-row {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
	.name {
		font-size: 15px;
		font-weight: 500;
	}
	.tool {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--brand);
		background: var(--bg-muted);
		padding: 2px 7px;
		letter-spacing: -0.02em;
	}
	.desc {
		margin: 4px 0 0;
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
		max-width: 70ch;
	}
	.list a :global(.arrow) {
		color: var(--fg-muted);
		flex-shrink: 0;
	}
	.list a:hover :global(.arrow) {
		color: var(--brand);
	}
</style>
