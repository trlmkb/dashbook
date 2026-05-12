<script lang="ts">
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import type { Snippet } from 'svelte';

	type Props = {
		label: string;
		caption?: string;
		children: Snippet<[number]>;
	};

	let { label, caption, children }: Props = $props();
	let key = $state(0);

	function replay() {
		key += 1;
	}
</script>

<div class="wrap">
	<div class="canvas">
		{#key key}
			{@render children(key)}
		{/key}
	</div>
	<div class="bar">
		<div class="meta">
			<div class="label">{label}</div>
			{#if caption}<div class="caption">{caption}</div>{/if}
		</div>
		<button type="button" class="replay" onclick={replay} aria-label="Replay animation">
			<RotateCcw size={12} strokeWidth={1.5} /> Replay
		</button>
	</div>
</div>

<style>
	.wrap {
		border: 1px solid var(--border);
	}
	.canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 200px;
		padding: 32px;
		overflow: hidden;
	}
	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		border-top: 1px solid var(--border);
	}
	.label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.caption {
		font-size: 12px;
		color: var(--fg-muted);
		margin-top: 2px;
	}
	.replay {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--fg-muted);
		cursor: pointer;
		font-family: var(--font-sans);
		font-size: 12px;
		transition:
			color 150ms,
			border-color 150ms;
		border-radius: 3px;
	}
	.replay:hover {
		color: var(--fg);
		border-color: var(--input-border);
	}
	.replay:active {
		transform: scale(0.97);
	}
</style>
