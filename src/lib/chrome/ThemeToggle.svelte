<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Monitor from '@lucide/svelte/icons/monitor';
	import { theme } from '../stores/theme.svelte.js';

	function label(t: string) {
		if (t === 'light') return 'Light theme — click to switch to dark';
		if (t === 'dark') return 'Dark theme — click to switch to system';
		return 'System theme — click to switch to light';
	}
</script>

<button
	type="button"
	class="theme-toggle"
	onclick={() => theme.cycle()}
	aria-label={label(theme.theme)}
	title={label(theme.theme)}
>
	{#if theme.theme === 'light'}
		<Sun size={16} strokeWidth={1.5} />
	{:else if theme.theme === 'dark'}
		<Moon size={16} strokeWidth={1.5} />
	{:else}
		<Monitor size={16} strokeWidth={1.5} />
	{/if}
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: 0;
		background: transparent;
		color: var(--fg-muted);
		cursor: pointer;
		border-radius: 6px;
		transition:
			color 150ms,
			background 150ms;
	}
	.theme-toggle:hover {
		color: var(--fg);
		background: var(--bg-muted);
	}
	.theme-toggle:active {
		transform: scale(0.97);
	}
</style>
