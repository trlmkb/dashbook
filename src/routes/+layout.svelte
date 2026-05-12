<script lang="ts">
	import '../app.css';
	import Header from '$chrome/Header.svelte';
	import Footer from '$chrome/Footer.svelte';
	import CommandPalette from '$chrome/CommandPalette.svelte';

	let { children } = $props();
	let paletteOpen = $state(false);

	function handleKey(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			paletteOpen = !paletteOpen;
		}
	}
</script>

<svelte:window onkeydown={handleKey} />

<Header onOpenPalette={() => (paletteOpen = true)} />

<main>
	{@render children()}
</main>

<Footer />

<CommandPalette bind:open={paletteOpen} onClose={() => (paletteOpen = false)} />

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
