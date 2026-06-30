<script lang="ts">
	/**
	 * Export modal — shows the composed page as JSON (the canonical export) plus a
	 * human-readable recipe summary. Copy to clipboard or download a .json file.
	 */
	import Copy from '@lucide/svelte/icons/copy';
	import Download from '@lucide/svelte/icons/download';
	import Check from '@lucide/svelte/icons/check';
	import { builder } from './state.svelte';
	import { pageToJSON, pageToRecipe, pageToAstro, downloadText } from './export';
	import { copyToClipboard } from '$chrome/clipboard';

	let { onclose }: { onclose: () => void } = $props();

	let view = $state<'json' | 'astro' | 'recipe'>('json');
	let copied = $state(false);

	// Only the active tab's serializer runs — switching tabs recomputes just one.
	const text = $derived(
		view === 'json'
			? pageToJSON(builder.doc)
			: view === 'astro'
				? pageToAstro(builder.doc)
				: pageToRecipe(builder.doc)
	);

	async function copy() {
		if (await copyToClipboard(text)) {
			copied = true;
			setTimeout(() => (copied = false), 1200);
		}
	}

	function save() {
		const meta =
			view === 'json'
				? { name: 'marketing-page.json', type: 'application/json' }
				: view === 'astro'
					? { name: 'marketing-page.astro', type: 'text/plain' }
					: { name: 'marketing-page.txt', type: 'text/plain' };
		downloadText(meta.name, text, meta.type);
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={onKey} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="scrim" onclick={onclose}></div>
<div class="panel" role="dialog" aria-label="Export page">
	<div class="head">
		<div class="tabs">
			<button type="button" class="tab" class:on={view === 'json'} onclick={() => (view = 'json')}>
				JSON
			</button>
			<button type="button" class="tab" class:on={view === 'astro'} onclick={() => (view = 'astro')}>
				Astro
			</button>
			<button
				type="button"
				class="tab"
				class:on={view === 'recipe'}
				onclick={() => (view = 'recipe')}
			>
				Recipe
			</button>
		</div>
		<div class="acts">
			<button type="button" class="act" onclick={copy}>
				{#if copied}<Check size={14} strokeWidth={1.8} /> Copied{:else}<Copy
						size={14}
						strokeWidth={1.6}
					/> Copy{/if}
			</button>
			<button type="button" class="act" onclick={save}>
				<Download size={14} strokeWidth={1.6} /> Download
			</button>
			<button type="button" class="close" onclick={onclose} aria-label="Close">Done</button>
		</div>
	</div>
	<pre class="out">{text}</pre>
</div>

<style>
	.scrim {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.18);
		z-index: 40;
	}
	.panel {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(680px, 92vw);
		max-height: 80vh;
		display: flex;
		flex-direction: column;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 12px;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
		z-index: 41;
		overflow: hidden;
	}
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 12px;
		border-bottom: 1px solid var(--border);
		gap: 12px;
	}
	.tabs {
		display: flex;
		gap: 2px;
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 2px;
	}
	.tab {
		font-size: 12px;
		padding: 5px 12px;
		border: 0;
		background: transparent;
		color: var(--fg-muted);
		border-radius: 6px;
		cursor: pointer;
	}
	.tab.on {
		background: var(--bg-muted);
		color: var(--fg);
	}
	.acts {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.act {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		padding: 6px 10px;
		border: 1px solid var(--border);
		background: var(--bg);
		border-radius: 6px;
		cursor: pointer;
		color: var(--fg);
	}
	.act:hover {
		background: var(--bg-muted);
	}
	.close {
		font-size: 12px;
		color: var(--m-jade, #2b605c);
		background: transparent;
		border: 0;
		cursor: pointer;
		padding: 6px 4px;
	}
	.out {
		margin: 0;
		padding: 16px;
		overflow: auto;
		font-family: var(--font-mono);
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg);
		white-space: pre;
		tab-size: 2;
	}
</style>
