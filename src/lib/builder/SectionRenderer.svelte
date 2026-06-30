<script lang="ts">
	/**
	 * Renders one section's block and provides the per-section `builder-edit`
	 * context that <Editable> reads for on-canvas inline editing. One instance
	 * per placed section (keyed by node id in the canvas).
	 */
	import { setContext } from 'svelte';
	import { builder } from './state.svelte';
	import { getBlock } from './blocks/registry';
	import type { PageNode } from './types';

	let { node }: { node: PageNode } = $props();

	const block = $derived(getBlock(node.blockId));

	setContext('builder-edit', {
		isEditable: () => builder.selectedId === node.id,
		onEdit: (key: string, value: string) => builder.update(node.id, key, value)
	});
</script>

{#if block}
	{@const Block = block.component}
	<Block {...node.props} />
{:else}
	<div class="missing">Unknown block: {node.blockId}</div>
{/if}

<style>
	.missing {
		padding: 24px;
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--destructive, #ff4000);
	}
</style>
