<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import Sidebar from './Sidebar.svelte';
	import ComponentsSidebar from './ComponentsSidebar.svelte';
	import { primaryNav } from '../content/nav.js';

	type Props = {
		children: Snippet;
		section?: string;
		wide?: boolean;
	};

	let { children, section, wide = false }: Props = $props();

	const isComponentsRoute = $derived(page.url.pathname.startsWith('/components'));

	const hasSidebar = $derived.by(() => {
		if (isComponentsRoute) return true;
		if (section) {
			const item = primaryNav.find((i) => i.href === section);
			return !!item?.children?.length;
		}
		const pathname = page.url.pathname;
		const item = primaryNav.find((i) => i.href !== '/' && pathname.startsWith(i.href));
		return !!item?.children?.length;
	});
</script>

<div class="page" class:wide class:no-sidebar={!hasSidebar}>
	{#if hasSidebar}
		{#if isComponentsRoute}
			<ComponentsSidebar />
		{:else}
			<Sidebar {section} />
		{/if}
	{/if}
	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.page {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 64px;
	}
	.page.no-sidebar {
		grid-template-columns: 1fr;
		gap: 0;
	}
	.content {
		max-width: 880px;
		min-width: 0;
	}
	.wide .content {
		max-width: 1100px;
	}
	@media (max-width: 960px) {
		.page {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}
</style>
