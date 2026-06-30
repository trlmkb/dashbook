<script lang="ts">
	/**
	 * Right-hand inspector — renders editable controls for the selected block,
	 * driven entirely by its registry `fields` schema. Edits flow through
	 * `builder.update`, which the canvas block reads reactively (live preview).
	 *
	 * P1: every field (including `inline`) is edited here. P2 moves `inline`
	 * fields to on-canvas contenteditable and drops them from this panel.
	 */
	import Plus from '@lucide/svelte/icons/plus';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { builder } from './state.svelte';
	import { getBlock } from './blocks/registry';
	import type { BuilderField } from './types';

	const sel = $derived(builder.selected);
	const block = $derived(sel ? getBlock(sel.blockId) : undefined);

	function val(key: string): unknown {
		return sel?.props[key];
	}

	function set(key: string, value: unknown) {
		if (sel) builder.update(sel.id, key, value);
	}

	function items(field: BuilderField): Record<string, unknown>[] {
		const v = sel?.props[field.key];
		return Array.isArray(v) ? (v as Record<string, unknown>[]) : [];
	}

	function snapshotItems(field: BuilderField): Record<string, unknown>[] {
		return ($state.snapshot(sel?.props[field.key]) as Record<string, unknown>[]) ?? [];
	}

	function setItem(field: BuilderField, index: number, subKey: string, value: unknown) {
		if (!sel) return;
		const arr = snapshotItems(field);
		arr[index] = { ...arr[index], [subKey]: value };
		builder.update(sel.id, field.key, arr);
	}

	function addItem(field: BuilderField) {
		if (!sel) return;
		const arr = snapshotItems(field);
		const next: Record<string, unknown> = {};
		for (const f of field.itemFields ?? []) next[f.key] = f.default;
		arr.push(next);
		builder.update(sel.id, field.key, arr);
	}

	function removeItem(field: BuilderField, index: number) {
		if (!sel) return;
		const arr = snapshotItems(field);
		arr.splice(index, 1);
		builder.update(sel.id, field.key, arr);
	}

	function moveItem(field: BuilderField, index: number, dir: -1 | 1) {
		if (!sel) return;
		const arr = snapshotItems(field);
		const j = index + dir;
		if (j < 0 || j >= arr.length) return;
		[arr[index], arr[j]] = [arr[j], arr[index]];
		builder.update(sel.id, field.key, arr);
	}
</script>

{#if sel && block}
	<aside class="inspector" aria-label="Section settings">
		<div class="head">
			<span class="kind">{block.name}</span>
			<button type="button" class="close" onclick={() => builder.select(null)} aria-label="Close">
				Done
			</button>
		</div>

		<div class="fields">
			{#each block.fields as field (field.key)}
				<div class="field">
					<label class="lbl" for={`f-${sel.id}-${field.key}`}>{field.label}</label>

					{#if field.type === 'textarea'}
						<textarea
							id={`f-${sel.id}-${field.key}`}
							value={String(val(field.key) ?? '')}
							rows="3"
							oninput={(e) => set(field.key, e.currentTarget.value)}
						></textarea>
					{:else if field.type === 'select'}
						<select
							id={`f-${sel.id}-${field.key}`}
							value={String(val(field.key) ?? '')}
							onchange={(e) => set(field.key, e.currentTarget.value)}
						>
							{#each field.options ?? [] as opt (opt)}
								<option value={opt}>{opt}</option>
							{/each}
						</select>
					{:else if field.type === 'boolean'}
						<input
							id={`f-${sel.id}-${field.key}`}
							type="checkbox"
							checked={Boolean(val(field.key))}
							onchange={(e) => set(field.key, e.currentTarget.checked)}
						/>
					{:else if field.type === 'number'}
						<input
							id={`f-${sel.id}-${field.key}`}
							type="number"
							value={Number(val(field.key) ?? 0)}
							oninput={(e) => set(field.key, e.currentTarget.valueAsNumber)}
						/>
					{:else if field.type === 'repeater'}
						{@const list = items(field)}
						<div class="repeater">
							{#each list as item, i (i)}
								<div class="rep-item">
									<div class="rep-head">
										<span class="rep-idx">{i + 1}</span>
										<div class="rep-tools">
											<button
												type="button"
												aria-label="Move up"
												disabled={i === 0}
												onclick={() => moveItem(field, i, -1)}><ChevronUp size={13} /></button
											>
											<button
												type="button"
												aria-label="Move down"
												disabled={i === list.length - 1}
												onclick={() => moveItem(field, i, 1)}><ChevronDown size={13} /></button
											>
											<button
												type="button"
												aria-label="Remove item"
												onclick={() => removeItem(field, i)}><Trash2 size={13} /></button
											>
										</div>
									</div>
									{#each field.itemFields ?? [] as sub (sub.key)}
										<label class="lbl sub" for={`f-${sel.id}-${field.key}-${i}-${sub.key}`}
											>{sub.label}</label
										>
										{#if sub.type === 'select'}
											<select
												id={`f-${sel.id}-${field.key}-${i}-${sub.key}`}
												value={String(item[sub.key] ?? '')}
												onchange={(e) => setItem(field, i, sub.key, e.currentTarget.value)}
											>
												{#each sub.options ?? [] as opt (opt)}
													<option value={opt}>{opt}</option>
												{/each}
											</select>
										{:else if sub.type === 'textarea'}
											<textarea
												id={`f-${sel.id}-${field.key}-${i}-${sub.key}`}
												value={String(item[sub.key] ?? '')}
												rows="2"
												oninput={(e) => setItem(field, i, sub.key, e.currentTarget.value)}
											></textarea>
										{:else}
											<input
												id={`f-${sel.id}-${field.key}-${i}-${sub.key}`}
												type="text"
												value={String(item[sub.key] ?? '')}
												oninput={(e) => setItem(field, i, sub.key, e.currentTarget.value)}
											/>
										{/if}
									{/each}
								</div>
							{/each}
							<button type="button" class="rep-add" onclick={() => addItem(field)}>
								<Plus size={14} strokeWidth={1.8} /> Add item
							</button>
						</div>
					{:else}
						<!-- text + inline (inline becomes on-canvas in P2) -->
						<input
							id={`f-${sel.id}-${field.key}`}
							type={field.type === 'image-url' ? 'url' : 'text'}
							value={String(val(field.key) ?? '')}
							oninput={(e) => set(field.key, e.currentTarget.value)}
						/>
					{/if}
				</div>
			{/each}
		</div>
	</aside>
{/if}

<style>
	.inspector {
		width: 300px;
		flex-shrink: 0;
		border-left: 1px solid var(--border);
		background: var(--bg);
		display: flex;
		flex-direction: column;
		max-height: calc(100vh - 52px);
		position: sticky;
		top: 52px;
		overflow-y: auto;
	}
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		background: var(--bg);
	}
	.kind {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg);
	}
	.close {
		font-size: 12px;
		color: var(--m-jade, #2b605c);
		background: transparent;
		border: 0;
		cursor: pointer;
	}
	.fields {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 16px;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.lbl {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.lbl.sub {
		margin-top: 6px;
	}
	input,
	textarea,
	select {
		width: 100%;
		box-sizing: border-box;
		font-family: var(--font-sans);
		font-size: 13px;
		color: var(--fg);
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 7px 9px;
	}
	textarea {
		resize: vertical;
		line-height: 1.5;
	}
	input:focus,
	textarea:focus,
	select:focus {
		outline: none;
		border-color: var(--m-jade, #2b605c);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--m-jade, #2b605c) 25%, transparent);
	}
	.repeater {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.rep-item {
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 10px;
		background: var(--bg-muted);
	}
	.rep-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 4px;
	}
	.rep-idx {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--fg-muted);
	}
	.rep-tools {
		display: flex;
		gap: 2px;
	}
	.rep-tools button {
		width: 22px;
		height: 20px;
		padding: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		background: var(--bg);
		border-radius: 4px;
		cursor: pointer;
		color: var(--fg);
	}
	.rep-tools button:disabled {
		opacity: 0.3;
		cursor: default;
	}
	.rep-add {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		font-size: 12px;
		padding: 7px;
		border: 1px dashed var(--border);
		background: transparent;
		border-radius: 6px;
		cursor: pointer;
		color: var(--fg);
	}
</style>
