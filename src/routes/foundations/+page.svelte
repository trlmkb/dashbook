<script lang="ts">
	import Sidebar from '$chrome/Sidebar.svelte';
	import { primaryNav } from '$content/nav.js';

	const foundations = primaryNav.find((n) => n.href === '/foundations');
</script>

<svelte:head>
	<title>Foundations — Dashbook</title>
</svelte:head>

<div class="page">
	<Sidebar />
	<div class="content">
		<div class="page-label">Foundations</div>
		<h1>The mechanics.</h1>
		<p class="lede">
			Tokens, type, spacing, motion, accessibility, data viz, and currency formatting — the
			building blocks every Dash.fi surface inherits.
		</p>

		<ul class="index">
			{#each foundations?.children ?? [] as child (child.href)}
				<li>
					<a href={child.href}>
						<span class="title">{child.title}</span>
						<span class="arrow">→</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.page {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 64px;
	}
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
	.index {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.index li {
		border-top: 1px solid var(--border);
	}
	.index li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.index a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 0;
		text-decoration: none;
		color: var(--fg);
		font-size: 17px;
		transition: color 150ms;
	}
	.index a:hover {
		color: var(--brand);
	}
	.title {
		font-family: var(--font-sans);
	}
	.arrow {
		font-family: var(--font-mono);
		color: var(--fg-muted);
	}
	@media (max-width: 960px) {
		.page {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}
</style>
