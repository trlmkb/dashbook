<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		label: string;
		note?: string;
		id?: string;
		children: Snippet;
	};

	let { label, note, id, children }: Props = $props();
</script>

<section class="block" {id}>
	<div class="head">
		<div class="section-header">{label}</div>
		{#if note}<p class="note">{note}</p>{/if}
	</div>
	{@render children()}
</section>

<style>
	.block {
		margin-bottom: 80px;
	}
	.head {
		margin-bottom: 32px;
	}
	.note {
		margin-top: 12px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg-muted);
		max-width: 640px;
	}
</style>
