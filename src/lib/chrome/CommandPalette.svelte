<script lang="ts">
	import { goto } from '$app/navigation';
	import Search from '@lucide/svelte/icons/search';
	import CornerDownLeft from '@lucide/svelte/icons/corner-down-left';
	import {
		searchEntries,
		scoreEntry,
		sectionOrder,
		type SearchEntry,
		type SearchSection
	} from '$content/search-index';

	type Props = {
		open: boolean;
		onClose: () => void;
	};

	let { open = $bindable(), onClose }: Props = $props();

	let query = $state('');
	let activeIdx = $state(0);
	let inputEl: HTMLInputElement | null = $state(null);
	let resultsEl: HTMLUListElement | null = $state(null);

	const flat: SearchEntry[] = $derived.by(() => {
		const q = query.trim();
		if (!q) {
			// Empty query — show a curated default ordering by section
			return [...searchEntries].sort((a, b) => {
				const sa = sectionOrder.indexOf(a.section);
				const sb = sectionOrder.indexOf(b.section);
				if (sa !== sb) return sa - sb;
				return a.title.localeCompare(b.title);
			});
		}
		return searchEntries
			.map((e) => ({ entry: e, score: scoreEntry(e, q) }))
			.filter((r) => r.score > 0)
			.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
			.map((r) => r.entry);
	});

	// Group results by section while preserving the flat order so keyboard nav
	// stays linear regardless of grouping.
	const grouped = $derived.by(() => {
		const map = new Map<SearchSection, SearchEntry[]>();
		for (const e of flat) {
			const arr = map.get(e.section) ?? [];
			arr.push(e);
			map.set(e.section, arr);
		}
		const ordered: { section: SearchSection; entries: SearchEntry[] }[] = [];
		for (const s of sectionOrder) {
			const list = map.get(s);
			if (list && list.length) ordered.push({ section: s, entries: list });
		}
		return ordered;
	});

	// Flat ordering used for keyboard navigation — matches `grouped` traversal.
	const flatForNav: SearchEntry[] = $derived(grouped.flatMap((g) => g.entries));

	$effect(() => {
		if (open) {
			activeIdx = 0;
			queueMicrotask(() => inputEl?.focus());
		} else {
			query = '';
		}
	});

	// Keep activeIdx within bounds when results change
	$effect(() => {
		if (flatForNav.length === 0) {
			activeIdx = 0;
		} else if (activeIdx >= flatForNav.length) {
			activeIdx = flatForNav.length - 1;
		}
	});

	$effect(() => {
		// Scroll the active row into view when activeIdx changes
		if (!resultsEl) return;
		const el = resultsEl.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`);
		el?.scrollIntoView({ block: 'nearest' });
	});

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			onClose();
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			activeIdx = Math.min(activeIdx + 1, Math.max(0, flatForNav.length - 1));
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			activeIdx = Math.max(activeIdx - 1, 0);
			return;
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			const target = flatForNav[activeIdx];
			if (target) select(target.href);
		}
	}

	function select(href: string) {
		onClose();
		goto(href);
	}

	function sectionLabel(s: SearchSection): string {
		switch (s) {
			case 'Page':
				return 'Pages';
			case 'Brand':
				return 'Brand';
			case 'Foundation':
				return 'Foundations';
			case 'Component':
				return 'Components';
			case 'Pattern':
				return 'Patterns';
			case 'Developer':
				return 'Developers';
		}
	}

	function highlight(text: string, q: string): string {
		if (!q) return text;
		const lower = text.toLowerCase();
		const ql = q.toLowerCase();
		const idx = lower.indexOf(ql);
		if (idx < 0) return text;
		const before = text.slice(0, idx);
		const match = text.slice(idx, idx + q.length);
		const after = text.slice(idx + q.length);
		return `${before}<mark>${match}</mark>${after}`;
	}

	function indexFor(entry: SearchEntry): number {
		return flatForNav.indexOf(entry);
	}
</script>

{#if open}
	<div
		class="overlay"
		role="dialog"
		aria-modal="true"
		aria-label="Search Dashbook"
		onclick={onClose}
		onkeydown={onKey}
	>
		<div
			class="panel"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="input-row">
				<Search size={16} strokeWidth={1.5} />
				<input
					bind:this={inputEl}
					bind:value={query}
					type="text"
					placeholder="Search components, patterns, tokens, pages…"
					autocomplete="off"
					spellcheck="false"
					onkeydown={onKey}
				/>
				<kbd>esc</kbd>
			</div>

			<ul class="results" bind:this={resultsEl}>
				{#if flatForNav.length === 0}
					<li class="empty">No results for <em>{query}</em>.</li>
				{:else}
					{#each grouped as g (g.section)}
						<li class="group">
							<div class="group-head">
								<span class="group-label">{sectionLabel(g.section)}</span>
								<span class="group-count tabular-nums">{g.entries.length}</span>
							</div>
							<ul class="group-list">
								{#each g.entries as r (r.href)}
									{@const i = indexFor(r)}
									<li>
										<button
											type="button"
											class="result"
											class:active={i === activeIdx}
											data-idx={i}
											onclick={() => select(r.href)}
											onmouseenter={() => (activeIdx = i)}
										>
											<div class="r-body">
												<!-- eslint-disable-next-line svelte/no-at-html-tags -->
												<span class="r-title">{@html highlight(r.title, query)}</span>
												{#if r.description}
													<span class="r-desc">{r.description}</span>
												{/if}
											</div>
											{#if i === activeIdx}
												<CornerDownLeft size={12} strokeWidth={1.5} />
											{/if}
										</button>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				{/if}
			</ul>

			<div class="footer">
				<span class="hint"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
				<span class="hint"><kbd>↵</kbd> select</span>
				<span class="hint"><kbd>esc</kbd> close</span>
				<span class="hint count">
					<span class="tabular-nums">{flatForNav.length}</span>
					<span>{flatForNav.length === 1 ? 'result' : 'results'}</span>
				</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 10vh;
		z-index: 100;
	}
	.panel {
		width: min(680px, calc(100vw - 32px));
		max-height: 70vh;
		display: flex;
		flex-direction: column;
		background: var(--popover);
		border: 1px solid var(--border);
		box-shadow: var(--shadow-md);
		overflow: hidden;
	}
	.input-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 16px;
		border-bottom: 1px solid var(--border);
		color: var(--fg-muted);
	}
	input {
		flex: 1;
		border: 0;
		outline: 0;
		background: transparent;
		font-family: var(--font-sans);
		font-size: 14px;
		color: var(--fg);
	}
	input::placeholder {
		color: var(--fg-muted);
	}
	kbd {
		font-family: var(--font-mono);
		font-size: 10px;
		padding: 2px 5px;
		border: 1px solid var(--border);
		color: var(--fg-muted);
		line-height: 1;
	}
	.results {
		list-style: none;
		padding: 0;
		margin: 0;
		overflow-y: auto;
		flex: 1;
	}
	.group + .group .group-head {
		border-top: 1px solid var(--border);
	}
	.group-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 14px 16px 6px;
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.group-list {
		list-style: none;
		padding: 0 4px 4px;
		margin: 0;
	}
	.result {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 8px 12px;
		border: 0;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font-family: var(--font-sans);
		font-size: 13px;
		color: var(--fg);
		transition: background-color 80ms;
	}
	.result.active {
		background: var(--bg-muted);
	}
	.r-body {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
		flex: 1;
	}
	.r-title {
		font-weight: 500;
		color: var(--fg);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.r-title :global(mark) {
		background: transparent;
		color: var(--brand);
		font-weight: 600;
	}
	.r-desc {
		font-size: 12px;
		color: var(--fg-muted);
		line-height: 1.4;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.result :global(svg) {
		color: var(--fg-muted);
		flex-shrink: 0;
	}
	.empty {
		padding: 32px;
		text-align: center;
		font-size: 13px;
		color: var(--fg-muted);
	}
	.empty em {
		color: var(--fg);
		font-style: normal;
	}
	.footer {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 10px 14px;
		border-top: 1px solid var(--border);
		background: var(--bg-muted);
		font-size: 11px;
		color: var(--fg-muted);
		font-family: var(--font-mono);
	}
	.hint {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.hint.count {
		margin-left: auto;
		letter-spacing: 0.05em;
	}
</style>
