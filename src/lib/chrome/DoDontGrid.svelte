<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import X from '@lucide/svelte/icons/x';

	type Item = { kind: 'do' | 'dont'; text: string };
	type Props = { items: Item[] };

	let { items }: Props = $props();
</script>

<div class="grid">
	{#each items as item, i (i)}
		<div class="cell" class:do={item.kind === 'do'} class:dont={item.kind === 'dont'}>
			<div class="icon" aria-hidden="true">
				{#if item.kind === 'do'}
					<Check size={14} strokeWidth={2} />
				{:else}
					<X size={14} strokeWidth={2} />
				{/if}
			</div>
			<div class="label">{item.kind === 'do' ? 'Do' : "Don't"}</div>
			<p>{item.text}</p>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.cell {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 24px;
		background: var(--bg);
	}
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 999px;
	}
	.do .icon {
		background: var(--brand);
		color: var(--brand-fg);
	}
	.dont .icon {
		background: transparent;
		color: var(--fg-muted);
		border: 1px solid var(--input-border);
	}
	.label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.do .label {
		color: var(--brand);
	}
	.cell p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
	}
</style>
