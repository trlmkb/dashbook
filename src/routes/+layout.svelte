<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$chrome/Header.svelte';
	import Footer from '$chrome/Footer.svelte';
	import CommandPalette from '$chrome/CommandPalette.svelte';
	import { internalState } from '$lib/state/internal-state.svelte';

	let { children } = $props();
	let paletteOpen = $state(false);

	// Read the UI-hint cookie once the client hydrates. If present, Header
	// reveals the internal nav items and ⌘K starts indexing them. Server-side
	// access is gated independently via `guardInternal()`.
	onMount(() => {
		internalState.refresh();
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Routes that render full-screen with no header/footer/palette chrome.
	// Currently just the internal-section login screen.
	const STANDALONE = ['/internal-login'];
	const isStandalone = $derived(STANDALONE.includes(page.url.pathname));

	function handleKey(e: KeyboardEvent) {
		if (isStandalone) return;
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			paletteOpen = !paletteOpen;
		}
	}
</script>

<svelte:window onkeydown={handleKey} />

{#if isStandalone}
	{@render children()}
{:else}
	<Header onOpenPalette={() => (paletteOpen = true)} />

	<main>
		{@render children()}
	</main>

	<Footer />

	<CommandPalette bind:open={paletteOpen} onClose={() => (paletteOpen = false)} />
{/if}

<style>
	main {
		max-width: 1800px;
		margin: 0 auto;
		padding: 48px 32px 24px;
	}
	@media (max-width: 720px) {
		main {
			padding: 24px 24px 16px;
		}
	}
</style>
