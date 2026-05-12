<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Copy from '@lucide/svelte/icons/copy';

	type Props = {
		value: string;
		label?: string;
		class?: string;
	};

	let { value, label, class: className = '' }: Props = $props();
	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1200);
		} catch {
			// Clipboard unavailable (insecure context, permissions). Silent — UI shows no confirmation.
			copied = false;
		}
	}
</script>

<button
	type="button"
	class="copy {className}"
	onclick={copy}
	aria-label={label ? `Copy ${label}` : 'Copy value'}
	title={copied ? 'Copied' : `Copy ${value}`}
>
	<span class="value tabular-nums">{value}</span>
	<span class="icon" aria-hidden="true">
		{#if copied}
			<Check size={12} strokeWidth={1.5} />
		{:else}
			<Copy size={12} strokeWidth={1.5} />
		{/if}
	</span>
</button>

<style>
	.copy {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 2px 6px 2px 8px;
		border: 1px solid var(--border);
		background: transparent;
		cursor: pointer;
		transition:
			border-color 150ms,
			background 150ms;
		border-radius: 4px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: -0.01em;
		color: var(--fg);
	}
	.copy:hover {
		border-color: var(--input-border);
		background: var(--bg-muted);
	}
	.copy:active {
		transform: scale(0.97);
	}
	.value {
		font-family: var(--font-mono);
	}
	.icon {
		display: inline-flex;
		opacity: 0.5;
	}
	.copy:hover .icon {
		opacity: 1;
	}
</style>
