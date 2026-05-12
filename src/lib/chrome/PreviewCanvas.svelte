<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Monitor from '@lucide/svelte/icons/monitor';
	import { theme } from '../stores/theme.svelte.js';

	type Props = {
		children: Snippet<[mode: 'light' | 'dark']>;
		caption?: string;
		minHeight?: string;
	};

	let { children, caption, minHeight = '240px' }: Props = $props();

	// `null` = auto (sync with global theme). 'light' / 'dark' = manual override.
	let override = $state<'light' | 'dark' | null>(null);
	const mode = $derived<'light' | 'dark'>(override ?? theme.resolved);

	function setMode(next: 'light' | 'dark' | null) {
		override = next;
	}
</script>

<div class="canvas-wrap">
	<div class="canvas-bar">
		<div class="caption">
			{#if caption}{caption}{:else}<span class="muted">Preview</span>{/if}
		</div>
		<div class="actions">
			<button
				type="button"
				class="mode-btn"
				class:active={override === null}
				onclick={() => setMode(null)}
				aria-label="Auto — follow page theme"
				title="Auto — follow page theme"
			>
				<Monitor size={12} strokeWidth={1.5} />
				Auto
			</button>
			<button
				type="button"
				class="mode-btn"
				class:active={override === 'light'}
				onclick={() => setMode('light')}
				aria-label="Force light preview"
				title="Force light preview"
			>
				<Sun size={12} strokeWidth={1.5} />
				Light
			</button>
			<button
				type="button"
				class="mode-btn"
				class:active={override === 'dark'}
				onclick={() => setMode('dark')}
				aria-label="Force dark preview"
				title="Force dark preview"
			>
				<Moon size={12} strokeWidth={1.5} />
				Dark
			</button>
		</div>
	</div>
	<div class="preview-canvas" class:dark={mode === 'dark'} style:min-height={minHeight}>
		{@render children(mode)}
	</div>
</div>

<style>
	.canvas-wrap {
		border: 1px solid var(--border);
	}
	.canvas-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		border-bottom: 1px solid var(--border);
		background: var(--bg-muted);
	}
	.caption {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.muted {
		color: var(--fg-muted);
	}
	.actions {
		display: flex;
		gap: 4px;
	}
	.mode-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		font-family: var(--font-sans);
		font-size: 11px;
		color: var(--fg-muted);
		background: transparent;
		border: 1px solid transparent;
		cursor: pointer;
		transition:
			color 150ms,
			border-color 150ms;
		border-radius: 3px;
	}
	.mode-btn:hover {
		color: var(--fg);
	}
	.mode-btn.active {
		color: var(--fg);
		border-color: var(--border);
		background: var(--bg);
	}

	/* Per-canvas mode override — independent of the page's theme.
	   Always force light tokens here, then flip via .dark below.
	   This redeclares Tailwind's --color-* tokens (consumed by lib
	   components) so the canvas mode toggle works regardless of page mode. */
	.preview-canvas {
		--color-background: #faf8f1;
		--color-foreground: #123b39;
		--color-card: #faf8f1;
		--color-card-foreground: #123b39;
		--color-popover: #ffffff;
		--color-popover-foreground: #123b39;
		--color-primary: #25261d;
		--color-primary-foreground: #ffffff;
		--color-secondary: #eceae0;
		--color-secondary-foreground: #123b39;
		--color-muted: #eceae0;
		--color-muted-foreground: #6e7878;
		--color-accent: #eceae0;
		--color-accent-foreground: #123b39;
		--color-destructive: #ff4000;
		--color-destructive-foreground: #ffffff;
		--color-brand: #2b605c;
		--color-brand-foreground: #ffffff;
		--color-cobalt: #354cef;
		--color-cobalt-foreground: #ffffff;
		--color-orange: #ff4000;
		--color-orange-foreground: #ffffff;
		--color-border: #e8e6dc;
		--color-input: #b6c0bf;
		--color-ring: #2b605c;

		background: var(--color-background);
		color: var(--color-foreground);
		padding: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 16px;
		font-family: var(--font-sans);
		transition: background-color 200ms var(--easing-default), color 200ms var(--easing-default);
	}
	.preview-canvas.dark {
		--color-background: #0f1413;
		--color-foreground: #ffffff;
		--color-card: #0f1413;
		--color-card-foreground: #ffffff;
		--color-popover: #141a19;
		--color-popover-foreground: #ffffff;
		--color-primary: #ffffff;
		--color-primary-foreground: #000000;
		--color-secondary: #181e1d;
		--color-secondary-foreground: #ffffff;
		--color-muted: #181e1d;
		--color-muted-foreground: #8b9695;
		--color-accent: #181e1d;
		--color-accent-foreground: #ffffff;
		--color-destructive: #ff4000;
		--color-destructive-foreground: #ffffff;
		--color-brand: #5bb8b0;
		--color-brand-foreground: #ffffff;
		--color-cobalt: #354cef;
		--color-cobalt-foreground: #ffffff;
		--color-orange: #ff4000;
		--color-orange-foreground: #ffffff;
		--color-border: #1f2a29;
		--color-input: #1f2a29;
		--color-ring: #5bb8b0;
	}
</style>
