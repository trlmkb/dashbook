<script lang="ts">
	import Download from '@lucide/svelte/icons/download';
	import type { Snippet } from 'svelte';

	type Props = {
		name: string;
		format: string;
		size?: string;
		href: string;
		preview?: Snippet;
		downloadName?: string;
	};

	let { name, format, size, href, preview, downloadName }: Props = $props();
</script>

<a class="asset" {href} download={downloadName ?? true}>
	<div class="preview">
		{#if preview}{@render preview()}{/if}
	</div>
	<div class="meta">
		<div class="row-1">
			<span class="name">{name}</span>
			<span class="format">{format}</span>
		</div>
		<div class="row-2">
			{#if size}<span class="size">{size}</span>{/if}
			<span class="dl"><Download size={12} strokeWidth={1.5} /> Download</span>
		</div>
	</div>
</a>

<style>
	.asset {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: var(--fg);
		border: 1px solid var(--border);
		transition: border-color 150ms;
	}
	.asset:hover {
		border-color: var(--input-border);
	}
	.preview {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 160px;
		padding: 32px;
		border-bottom: 1px solid var(--border);
	}
	.meta {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.row-1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.name {
		font-size: 14px;
		font-weight: 500;
	}
	.format {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.row-2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
	}
	.dl {
		display: inline-flex;
		gap: 4px;
		align-items: center;
	}
	.asset:hover .dl {
		color: var(--brand);
	}
</style>
