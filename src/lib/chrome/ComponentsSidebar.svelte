<script lang="ts">
	import { page } from '$app/state';
	import { componentsByCategory } from '../content/components.js';

	const grouped = componentsByCategory();
	const categories = [...grouped.entries()].filter(([, list]) => list.length > 0);

	function isActive(href: string, current: string): boolean {
		return current === href;
	}
</script>

<aside class="sidebar" aria-label="Components navigation">
	<a href="/components" class="all-link" class:active={page.url.pathname === '/components'}>
		<span>All components</span>
		<span class="count tabular-nums">60</span>
	</a>
	{#each categories as [category, list] (category)}
		<div class="group">
			<div class="cat-header">{category}</div>
			<nav class="sub-nav">
				{#each list as c (c.slug)}
					<a
						href="/components/{c.slug}"
						class="sub-item"
						class:active={isActive(`/components/${c.slug}`, page.url.pathname)}
					>
						{c.name}
					</a>
				{/each}
			</nav>
		</div>
	{/each}
</aside>

<style>
	.sidebar {
		position: sticky;
		top: 80px;
		align-self: flex-start;
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 8px 0;
		min-width: 200px;
		max-height: calc(100vh - 80px);
		overflow-y: auto;
	}
	.all-link {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 12px;
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		color: var(--fg-muted);
		text-decoration: none;
		border-left: 1px solid var(--border);
		transition: color var(--dur-fast) var(--easing-default);
	}
	.all-link::before {
		content: '';
		position: absolute;
		left: -1px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--brand);
		transform: scaleY(0);
		transform-origin: center;
		transition: transform var(--dur-fast) var(--easing-out);
	}
	.all-link:hover {
		color: var(--fg);
	}
	.all-link.active {
		color: var(--fg);
	}
	.all-link.active::before {
		transform: scaleY(1);
	}
	.all-link:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 2px;
	}
	.count {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
	}
	.group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.cat-header {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		padding: 0 12px;
	}
	.sub-nav {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.sub-item {
		position: relative;
		padding: 5px 12px;
		font-family: var(--font-sans);
		font-size: 13px;
		color: var(--fg-muted);
		text-decoration: none;
		border-left: 1px solid var(--border);
		transition: color var(--dur-fast) var(--easing-default);
	}
	.sub-item::before {
		content: '';
		position: absolute;
		left: -1px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--brand);
		transform: scaleY(0);
		transform-origin: center;
		transition: transform var(--dur-fast) var(--easing-out);
	}
	.sub-item:hover {
		color: var(--fg);
	}
	.sub-item.active {
		color: var(--fg);
	}
	.sub-item.active::before {
		transform: scaleY(1);
	}
	.sub-item:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 2px;
	}
	@media (max-width: 960px) {
		.sidebar {
			position: static;
			max-height: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.all-link,
		.all-link::before,
		.sub-item,
		.sub-item::before {
			transition: none;
		}
	}
</style>
