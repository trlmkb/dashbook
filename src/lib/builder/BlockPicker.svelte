<script lang="ts">
	/**
	 * Block picker — a searchable popover listing the available blocks grouped
	 * by category. Triggered by the empty-state and the insert-below `+`. Picking
	 * a block calls `onpick(blockId)`.
	 */
	import Search from '@lucide/svelte/icons/search';
	import { blocksByCategory } from './blocks/registry';

	let { onpick, onclose }: { onpick: (blockId: string) => void; onclose: () => void } = $props();

	let query = $state('');
	let inputEl = $state<HTMLInputElement | null>(null);

	const groups = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return blocksByCategory();
		return blocksByCategory()
			.map((g) => ({
				category: g.category,
				blocks: g.blocks.filter(
					(b) => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
				)
			}))
			.filter((g) => g.blocks.length > 0);
	});

	$effect(() => {
		inputEl?.focus();
	});

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={onKey} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="scrim" onclick={onclose}></div>
<div class="picker" role="dialog" aria-label="Add a section">
	<div class="search">
		<Search size={15} strokeWidth={1.6} />
		<input bind:this={inputEl} bind:value={query} placeholder="Search blocks…" />
	</div>
	<div class="list">
		{#each groups as group (group.category)}
			<div class="group">
				<div class="cat">{group.category}</div>
				{#each group.blocks as b (b.id)}
					<button type="button" class="opt" onclick={() => onpick(b.id)}>
						<span class="opt-name">{b.name}</span>
						<span class="opt-id">{b.id}</span>
					</button>
				{/each}
			</div>
		{:else}
			<p class="none">No blocks match.</p>
		{/each}
	</div>
</div>

<style>
	.scrim {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.18);
		z-index: 40;
	}
	.picker {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 380px;
		max-height: 70vh;
		display: flex;
		flex-direction: column;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 12px;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
		z-index: 41;
		overflow: hidden;
	}
	.search {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 14px;
		border-bottom: 1px solid var(--border);
		color: var(--fg-muted);
	}
	.search input {
		flex: 1;
		border: 0;
		background: transparent;
		font-size: 14px;
		color: var(--fg);
		outline: none;
	}
	.list {
		overflow-y: auto;
		padding: 8px;
	}
	.group {
		margin-bottom: 8px;
	}
	.cat {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--fg-muted);
		padding: 6px 8px;
	}
	.opt {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		width: 100%;
		padding: 9px 10px;
		border: 0;
		background: transparent;
		border-radius: 6px;
		cursor: pointer;
		text-align: left;
	}
	.opt:hover {
		background: var(--bg-muted);
	}
	.opt-name {
		font-size: 14px;
		color: var(--fg);
	}
	.opt-id {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--fg-muted);
	}
	.none {
		padding: 16px;
		font-size: 13px;
		color: var(--fg-muted);
		text-align: center;
	}
</style>
