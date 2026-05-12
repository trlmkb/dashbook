<script lang="ts">
	import { page } from '$app/state';
	import { primaryNav, type NavItem } from '../content/nav.js';

	type Props = {
		section?: string;
	};

	let { section }: Props = $props();

	// Find the current top-level item that owns this URL.
	const currentSection = $derived.by<NavItem | undefined>(() => {
		const pathname = page.url.pathname;
		if (section) return primaryNav.find((item) => item.href === section);
		return primaryNav.find((item) => item.href !== '/' && pathname.startsWith(item.href));
	});

	function isActive(href: string, current: string): boolean {
		return current === href;
	}
</script>

{#if currentSection?.children}
	<aside class="sidebar" aria-label="{currentSection.title} navigation">
		<div class="section-header">{currentSection.title}</div>
		<nav class="sub-nav">
			{#each currentSection.children as child (child.href)}
				<a
					href={child.href}
					class="sub-item"
					class:active={isActive(child.href, page.url.pathname)}
				>
					{child.title}
				</a>
			{/each}
		</nav>
	</aside>
{/if}

<style>
	.sidebar {
		position: sticky;
		top: 80px;
		align-self: flex-start;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 8px 0;
		min-width: 180px;
	}
	.section-header {
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
		padding: 6px 12px;
		font-family: var(--font-sans);
		font-size: 13px;
		color: var(--fg-muted);
		text-decoration: none;
		border-left: 1px solid var(--border);
		transition:
			color 150ms,
			border-color 150ms;
	}
	.sub-item:hover {
		color: var(--fg);
	}
	.sub-item.active {
		color: var(--fg);
		border-left-color: var(--brand);
	}
	@media (max-width: 960px) {
		.sidebar {
			position: static;
		}
	}
</style>
