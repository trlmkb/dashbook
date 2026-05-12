<script lang="ts">
	import type { Snippet } from 'svelte';

	type Tab = { id: string; label: string };
	type Props = {
		tabs: Tab[];
		active: string;
		onSelect: (id: string) => void;
		children: Snippet;
	};

	let { tabs, active, onSelect, children }: Props = $props();
</script>

<div class="tabs-shell">
	<div class="tabs" role="tablist">
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				role="tab"
				class="tab"
				class:active={tab.id === active}
				aria-selected={tab.id === active}
				aria-controls="panel-{tab.id}"
				id="tab-{tab.id}"
				onclick={() => onSelect(tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>
	<div class="panel" role="tabpanel" id="panel-{active}" aria-labelledby="tab-{active}">
		{@render children()}
	</div>
</div>

<style>
	.tabs-shell {
		display: flex;
		flex-direction: column;
	}
	.tabs {
		display: flex;
		gap: 0;
		border-bottom: 1px solid var(--border);
		margin-bottom: 0;
	}
	.tab {
		position: relative;
		padding: 12px 16px;
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		background: transparent;
		border: 0;
		color: var(--fg-muted);
		cursor: pointer;
		transition: color 150ms;
	}
	.tab:hover {
		color: var(--fg);
	}
	.tab.active {
		color: var(--fg);
	}
	.tab.active::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1px;
		height: 1px;
		background: var(--brand);
	}
	.panel {
		padding: 32px 0 0;
	}
</style>
