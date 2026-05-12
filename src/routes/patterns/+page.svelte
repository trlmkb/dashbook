<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import { patternsByCategory, patternCategoryOrder } from '$content/patterns';

	const grouped = patternsByCategory();
</script>

<svelte:head><title>Patterns — Dashbook</title></svelte:head>

<InnerPage section="/patterns" wide>
	<PageHeader
		label="Patterns"
		title="Patterns."
		lede="Composable recipes for the screens we build over and over. Each pattern is a live arrangement of real components with rationale and paste-ready code."
	/>

	{#each patternCategoryOrder as cat (cat)}
		{@const list = grouped.get(cat) ?? []}
		{#if list.length}
			<section class="cat">
				<div class="cat-head">
					<div class="cat-label">{cat}</div>
					<div class="cat-count tabular-nums">{list.length}</div>
				</div>
				<div class="grid">
					{#each list as p (p.slug)}
						<a class="card" href={`/patterns/${p.slug}`}>
							<div class="card-head">
								<span class="name">{p.name}</span>
							</div>
							<p class="desc">{p.description}</p>
							<div class="uses">
								{#each p.uses as u (u)}
									<code>{u}</code>
								{/each}
							</div>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	{/each}
</InnerPage>

<style>
	.cat {
		margin-bottom: 64px;
	}
	.cat-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-bottom: 12px;
		margin-bottom: 16px;
		border-bottom: 1px solid var(--border);
	}
	.cat-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg);
	}
	.cat-count {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 24px;
		background: var(--bg);
		text-decoration: none;
		color: inherit;
		transition: background-color 150ms;
	}
	.card:hover {
		background: var(--bg-muted);
	}
	.card-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.name {
		font-size: 15px;
		font-weight: 500;
		color: var(--fg);
	}
	.desc {
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		margin: 0;
	}
	.uses {
		display: flex;
		gap: 4px;
		flex-wrap: wrap;
		margin-top: 4px;
	}
	.uses code {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: -0.02em;
		color: var(--fg-muted);
		background: var(--bg-muted);
		padding: 2px 6px;
	}
	.card:hover .uses code {
		background: var(--bg);
	}
</style>
