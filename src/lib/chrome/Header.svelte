<script lang="ts">
	import { page } from '$app/state';
	import Search from '@lucide/svelte/icons/search';
	import ThemeToggle from './ThemeToggle.svelte';
	import { primaryNav } from '../content/nav.js';

	type Props = {
		onOpenPalette: () => void;
	};

	let { onOpenPalette }: Props = $props();

	function isActive(href: string, current: string): boolean {
		if (href === '/') return current === '/';
		return current === href || current.startsWith(href + '/');
	}
</script>

<header class="header">
	<div class="row">
		<a href="/" class="brand" aria-label="Dashbook home">
			<span class="dashbook">dashbook</span>
		</a>

		<nav class="nav" aria-label="Primary">
			{#each primaryNav.slice(1) as item (item.href)}
				<a
					href={item.href}
					class="nav-item"
					class:active={isActive(item.href, page.url.pathname)}
				>
					{item.title}
				</a>
			{/each}
		</nav>

		<div class="actions">
			<button type="button" class="search-trigger" onclick={onOpenPalette} aria-label="Open search">
				<Search size={14} strokeWidth={1.5} />
				<span class="search-label">Search</span>
				<kbd>⌘K</kbd>
			</button>
			<ThemeToggle />
		</div>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 40;
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border);
	}
	.row {
		display: flex;
		align-items: center;
		gap: 24px;
		max-width: 1800px;
		margin: 0 auto;
		padding: 0 32px;
		height: 56px;
	}
	.brand {
		display: inline-flex;
		align-items: baseline;
		text-decoration: none;
		color: var(--fg);
	}
	.dashbook {
		font-family: var(--font-mono);
		font-size: 18px;
		letter-spacing: -0.02em;
		color: var(--fg);
	}
	.nav {
		display: flex;
		align-items: center;
		gap: 4px;
		flex: 1;
	}
	.nav-item {
		display: inline-flex;
		align-items: center;
		padding: 6px 10px;
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		color: var(--fg-muted);
		text-decoration: none;
		border-radius: 4px;
		transition: color 150ms;
	}
	.nav-item:hover {
		color: var(--fg);
	}
	.nav-item.active {
		color: var(--fg);
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.search-trigger {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px 6px 10px;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--fg-muted);
		cursor: pointer;
		border-radius: 6px;
		font-family: var(--font-sans);
		font-size: 12px;
		transition: border-color 150ms;
	}
	.search-trigger:hover {
		border-color: var(--input-border);
		color: var(--fg);
	}
	.search-label {
		display: inline-block;
		min-width: 56px;
		text-align: left;
	}
	kbd {
		font-family: var(--font-mono);
		font-size: 10px;
		padding: 1px 4px;
		border: 1px solid var(--border);
		border-radius: 3px;
		color: var(--fg-muted);
	}
	@media (max-width: 960px) {
		.nav {
			display: none;
		}
		.search-label {
			display: none;
		}
	}
</style>
