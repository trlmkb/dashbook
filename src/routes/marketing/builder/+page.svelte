<script lang="ts">
	import { onMount } from 'svelte';
	import Undo2 from '@lucide/svelte/icons/undo-2';
	import Redo2 from '@lucide/svelte/icons/redo-2';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Copy from '@lucide/svelte/icons/copy';
	import Plus from '@lucide/svelte/icons/plus';
	import GripVertical from '@lucide/svelte/icons/grip-vertical';
	import Download from '@lucide/svelte/icons/download';
	import { builder } from '$lib/builder/state.svelte';
	import { getBlock } from '$lib/builder/blocks/registry';
	import Inspector from '$lib/builder/Inspector.svelte';
	import BlockPicker from '$lib/builder/BlockPicker.svelte';
	import ExportPanel from '$lib/builder/ExportPanel.svelte';
	import SectionRenderer from '$lib/builder/SectionRenderer.svelte';

	onMount(() => builder.load());

	let pickerOpen = $state(false);
	let pickerIndex = $state<number | undefined>(undefined);
	let exportOpen = $state(false);

	function openPicker(atIndex?: number) {
		pickerIndex = atIndex;
		pickerOpen = true;
	}
	function handlePick(blockId: string) {
		builder.add(blockId, pickerIndex);
		pickerOpen = false;
		pickerIndex = undefined;
	}
	function closePicker() {
		pickerOpen = false;
		pickerIndex = undefined;
	}

	function onFrameKey(e: KeyboardEvent, id: string) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			builder.select(id);
		}
	}

	// Section drag-reorder — the grip handle is the drag source, frames are the
	// drop targets. Native HTML5 DnD keeps it dependency-free and avoids any
	// conflict with section clicks / tools.
	let dragFromIndex = $state<number | null>(null);
	let dragOverIndex = $state<number | null>(null);

	function onDragStart(e: DragEvent, i: number) {
		dragFromIndex = i;
		if (!e.dataTransfer) return;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', String(i));
		const frame = (e.currentTarget as HTMLElement).closest('.frame') as HTMLElement | null;
		if (frame) e.dataTransfer.setDragImage(frame, 24, 24);
	}
	function onDragOver(e: DragEvent, i: number) {
		if (dragFromIndex === null) return;
		e.preventDefault();
		if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
		dragOverIndex = i;
	}
	function onDrop(e: DragEvent, i: number) {
		if (dragFromIndex === null) return;
		e.preventDefault();
		const from = dragFromIndex;
		if (from !== i) {
			const arr = [...builder.doc.sections];
			const [moved] = arr.splice(from, 1);
			arr.splice(i, 0, moved);
			builder.reorder(arr);
		}
		dragFromIndex = null;
		dragOverIndex = null;
	}
	function onDragEnd() {
		dragFromIndex = null;
		dragOverIndex = null;
	}
</script>

<svelte:head><title>Marketing builder — Dashbook</title></svelte:head>

<div class="builder">
	<header class="topbar">
		<div class="title">
			<span class="kicker">Marketing</span>
			<span class="name">Builder</span>
			<span class="tag">session sandbox</span>
		</div>
		<div class="actions">
			<button
				type="button"
				class="icon-btn"
				disabled={!builder.canUndo}
				onclick={() => builder.undo()}
				aria-label="Undo"
			>
				<Undo2 size={15} strokeWidth={1.6} />
			</button>
			<button
				type="button"
				class="icon-btn"
				disabled={!builder.canRedo}
				onclick={() => builder.redo()}
				aria-label="Redo"
			>
				<Redo2 size={15} strokeWidth={1.6} />
			</button>
			<div class="divider"></div>
			<div class="device" role="group" aria-label="Preview device">
				<button
					type="button"
					class="seg"
					class:active={builder.device === 'desktop'}
					onclick={() => builder.setDevice('desktop')}
					aria-label="Desktop preview"
				>
					<Monitor size={15} strokeWidth={1.6} />
				</button>
				<button
					type="button"
					class="seg"
					class:active={builder.device === 'mobile'}
					onclick={() => builder.setDevice('mobile')}
					aria-label="Mobile preview"
				>
					<Smartphone size={15} strokeWidth={1.6} />
				</button>
			</div>
			<div class="divider"></div>
			<button
				type="button"
				class="text-btn"
				disabled={builder.isEmpty}
				onclick={() => builder.clear()}
			>
				Clear
			</button>
			<button
				type="button"
				class="export-btn"
				disabled={builder.isEmpty}
				onclick={() => (exportOpen = true)}
			>
				<Download size={14} strokeWidth={1.7} /> Export
			</button>
		</div>
	</header>

	<div class="workspace">
		<main class="stage">
			<div class="canvas" class:mobile={builder.device === 'mobile'}>
				{#if builder.isEmpty}
					<div class="empty">
						<p class="empty-lede">Empty canvas. Drop in your first section.</p>
						<button type="button" class="add-primary" onclick={() => openPicker()}>
							<Plus size={16} strokeWidth={1.8} /> Add section
						</button>
					</div>
				{:else}
				{#each builder.doc.sections as node, i (node.id)}
					{@const block = getBlock(node.blockId)}
					<div
						class="frame"
						class:selected={builder.selectedId === node.id}
						class:drop-target={dragOverIndex === i && dragFromIndex !== null && dragFromIndex !== i}
						role="button"
						tabindex="0"
						aria-label={`Select ${block?.name ?? 'section'} section`}
						onclick={() => builder.select(node.id)}
						onkeydown={(e) => onFrameKey(e, node.id)}
						ondragover={(e) => onDragOver(e, i)}
						ondrop={(e) => onDrop(e, i)}
					>
						<div class="frame-bar">
							<div class="frame-left">
								<button
									type="button"
									class="grip"
									draggable="true"
									aria-label="Drag to reorder"
									ondragstart={(e) => onDragStart(e, i)}
									ondragend={onDragEnd}
									onclick={(e) => e.stopPropagation()}
								>
									<GripVertical size={13} strokeWidth={1.6} />
								</button>
								<span class="frame-name">{block?.name ?? node.blockId}</span>
							</div>
							<div class="frame-tools">
								<button
									type="button"
									class="tool"
									aria-label="Duplicate section"
									onclick={(e) => {
										e.stopPropagation();
										builder.duplicate(node.id);
									}}
								>
									<Copy size={13} strokeWidth={1.6} />
								</button>
								<button
									type="button"
									class="tool"
									aria-label="Delete section"
									onclick={(e) => {
										e.stopPropagation();
										builder.remove(node.id);
									}}
								>
									<Trash2 size={13} strokeWidth={1.6} />
								</button>
							</div>
						</div>
						<SectionRenderer {node} />
						<button
							type="button"
							class="insert-below"
							aria-label="Add section below"
							onclick={(e) => {
								e.stopPropagation();
								openPicker(i + 1);
							}}
						>
							<Plus size={14} strokeWidth={1.8} />
						</button>
					</div>
				{/each}
			{/if}
		</div>
	</main>
	<Inspector />
</div>
</div>

{#if pickerOpen}
	<BlockPicker onpick={handlePick} onclose={closePicker} />
{/if}

{#if exportOpen}
	<ExportPanel onclose={() => (exportOpen = false)} />
{/if}

<style>
	.builder {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: var(--bg-muted);
	}

	/* Top bar */
	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 52px;
		padding: 0 16px;
		background: var(--bg);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 10;
	}
	.title {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.kicker {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.name {
		font-size: 15px;
		font-weight: 500;
		color: var(--fg);
	}
	.tag {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--fg-muted);
		border: 1px solid var(--border);
		padding: 1px 6px;
		border-radius: 4px;
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.divider {
		width: 1px;
		height: 20px;
		background: var(--border);
		margin: 0 2px;
	}
	.icon-btn,
	.seg {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border: 1px solid transparent;
		background: transparent;
		color: var(--fg);
		cursor: pointer;
		border-radius: 6px;
		transition: background-color 120ms;
	}
	.icon-btn:hover:not(:disabled),
	.seg:hover {
		background: var(--bg-muted);
	}
	.icon-btn:disabled {
		opacity: 0.35;
		cursor: default;
	}
	.device {
		display: flex;
		gap: 2px;
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 2px;
	}
	.seg.active {
		background: var(--bg-muted);
		border-color: var(--border);
	}
	.text-btn {
		font-size: 13px;
		color: var(--fg);
		background: transparent;
		border: 1px solid var(--border);
		padding: 5px 12px;
		border-radius: 6px;
		cursor: pointer;
	}
	.text-btn:disabled {
		opacity: 0.35;
		cursor: default;
	}
	.export-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		font-weight: 500;
		color: var(--bg);
		background: var(--fg);
		border: 1px solid var(--fg);
		padding: 5px 12px;
		border-radius: 6px;
		cursor: pointer;
	}
	.export-btn:disabled {
		opacity: 0.35;
		cursor: default;
	}

	/* Workspace = canvas + inspector row */
	.workspace {
		display: flex;
		flex: 1;
		min-height: 0;
		align-items: flex-start;
	}

	/* Stage + canvas */
	.stage {
		flex: 1;
		display: flex;
		justify-content: center;
		padding: 32px 24px 96px;
		overflow: auto;
	}
	.canvas {
		width: 100%;
		max-width: 960px;
		background: var(--m-surface, #fff);
		border: 1px solid var(--border);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
		transition: max-width 200ms var(--easing-out, ease);
	}
	.canvas.mobile {
		max-width: 390px;
	}

	/* Empty state */
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 120px 24px;
		text-align: center;
	}
	.empty-lede {
		margin: 0;
		font-size: 14px;
		color: var(--fg-muted);
	}
	.add-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		font-weight: 500;
		color: var(--bg);
		background: var(--fg);
		border: 0;
		padding: 10px 18px;
		border-radius: 8px;
		cursor: pointer;
	}

	/* Section frame */
	.frame {
		position: relative;
		outline: 2px solid transparent;
		outline-offset: -2px;
		transition: outline-color 120ms;
		cursor: pointer;
	}
	.frame:hover {
		outline-color: var(--m-accent-border, rgba(43, 96, 92, 0.28));
	}
	.frame.selected {
		outline-color: var(--m-accent, #2b605c);
	}
	.frame.drop-target {
		outline-color: var(--m-accent, #2b605c);
	}
	.frame.drop-target::before {
		content: '';
		position: absolute;
		top: -2px;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--m-accent, #2b605c);
		z-index: 7;
	}
	.frame-left {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.grip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		padding: 0;
		border: 0;
		background: transparent;
		color: #fff;
		cursor: grab;
		border-radius: 3px;
	}
	.grip:hover {
		background: rgba(255, 255, 255, 0.2);
	}
	.grip:active {
		cursor: grabbing;
	}
	.frame-bar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 24px;
		padding: 0 8px;
		background: color-mix(in srgb, var(--m-accent, #2b605c) 90%, black 0%);
		opacity: 0;
		transition: opacity 120ms;
		z-index: 5;
		pointer-events: none;
	}
	.frame:hover .frame-bar,
	.frame.selected .frame-bar {
		opacity: 1;
		pointer-events: auto;
	}
	.frame-name {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #fff;
	}
	.frame-tools {
		display: flex;
		gap: 2px;
	}
	.tool {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 18px;
		border: 0;
		background: transparent;
		color: #fff;
		cursor: pointer;
		border-radius: 3px;
	}
	.tool:hover {
		background: rgba(255, 255, 255, 0.2);
	}
	.insert-below {
		position: absolute;
		bottom: -14px;
		left: 50%;
		transform: translateX(-50%);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--fg);
		border-radius: 999px;
		cursor: pointer;
		opacity: 0;
		transition: opacity 120ms;
		z-index: 6;
	}
	.frame:hover .insert-below {
		opacity: 1;
	}
</style>
