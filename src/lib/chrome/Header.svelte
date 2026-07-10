<script lang="ts">
	import { page } from '$app/state';
	import Search from '@lucide/svelte/icons/search';
	import ThemeToggle from './ThemeToggle.svelte';
	import { primaryNav } from '../content/nav.js';
	import { internalState } from '$lib/state/internal-state.svelte';

	type Props = {
		onOpenPalette: () => void;
	};

	let { onOpenPalette }: Props = $props();

	// Condensed header state — hairline border + solid backdrop fade in once
	// the user scrolls past a small threshold, so the transition never fires
	// on trivial reflow/resize noise.
	let scrolled = $state(false);
	function handleScroll() {
		scrolled = window.scrollY > 8;
	}

	// Filter rebuilds reactively when internalState.isInternal flips after
	// hydration. Internal items stay hidden in the prerendered HTML and
	// pop in on the client when the UI cookie is present.
	const visibleNav = $derived(
		primaryNav.slice(1).filter((item) => !item.internal || internalState.isInternal)
	);

	function isActive(href: string, current: string): boolean {
		if (href === '/') return current === '/';
		return current === href || current.startsWith(href + '/');
	}
</script>

<svelte:window onscroll={handleScroll} />

<header class="header" data-scrolled={scrolled}>
	<div class="row">
		<a href="/" class="brand" aria-label="Dashbook home">
			<span class="dashbook">dashbook</span>
		</a>

		<nav class="nav" aria-label="Primary">
			{#each visibleNav as item (item.href)}
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
		background: transparent;
		backdrop-filter: blur(0);
		-webkit-backdrop-filter: blur(0);
		border-bottom: 1px solid transparent;
		transition:
			background-color var(--dur-fast) var(--easing-default),
			border-color var(--dur-fast) var(--easing-default),
			backdrop-filter var(--dur-fast) var(--easing-default);
	}
	.header[data-scrolled='true'] {
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom-color: var(--border);
	}
	@media (prefers-reduced-motion: reduce) {
		.header {
			transition: none;
		}
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
		position: relative;
		display: inline-flex;
		align-items: center;
		padding: 6px 10px;
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		color: var(--fg-muted);
		text-decoration: none;
		border-radius: 4px;
		transition: color var(--dur-fast) var(--easing-default);
	}
	.nav-item::after {
		content: '';
		position: absolute;
		left: 10px;
		right: 10px;
		bottom: 2px;
		height: 1px;
		background: var(--fg);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--dur-fast) var(--easing-out);
	}
	.nav-item:hover {
		color: var(--fg);
	}
	.nav-item.active {
		color: var(--fg);
	}
	.nav-item.active::after {
		transform: scaleX(1);
	}
	.nav-item:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 2px;
	}
	@media (prefers-reduced-motion: reduce) {
		.nav-item,
		.nav-item::after {
			transition: none;
		}
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
		transition: border-color var(--dur-fast) var(--easing-default);
	}
	.search-trigger:hover {
		border-color: var(--input-border);
		color: var(--fg);
	}
	.search-trigger:focus-visible,
	.brand:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 2px;
	}
	@media (prefers-reduced-motion: reduce) {
		.search-trigger {
			transition: none;
		}
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
