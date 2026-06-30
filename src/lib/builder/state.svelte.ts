/**
 * Marketing page builder — session state store (Svelte 5 runes).
 *
 * Holds the page doc, current selection, device preview mode, and an
 * undo/redo snapshot history. Persists to localStorage so a refresh doesn't
 * nuke work — but never leaves the browser (session-only, no backend).
 *
 * See `.knowledge/marketing-page-builder-design.md`.
 */

import { browser } from '$app/environment';
import { getBlock } from './blocks/registry';
import type { BuilderDevice, PageDoc, PageNode } from './types';

const STORAGE_KEY = 'dashbook-builder-draft';
const MAX_HISTORY = 50;

function newId(): string {
	if (browser && typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}
	// SSR / older runtimes — only used pre-hydration where ids aren't persisted
	return `n_${Math.floor(Math.random() * 1e9).toString(36)}`;
}

function clone<T>(value: T): T {
	// $state.snapshot — not structuredClone — because `value` is usually a
	// Svelte 5 reactive proxy, which structuredClone cannot serialize
	// (DataCloneError). snapshot returns a plain, deep, non-reactive copy.
	return $state.snapshot(value) as T;
}

class BuilderState {
	doc = $state<PageDoc>({ sections: [] });
	selectedId = $state<string | null>(null);
	device = $state<BuilderDevice>('desktop');
	history = $state<PageDoc[]>([]);
	future = $state<PageDoc[]>([]);

	/** Coalesce consecutive edits to the same field into one undo step. */
	#lastEditKey: string | null = null;

	get canUndo(): boolean {
		return this.history.length > 0;
	}
	get canRedo(): boolean {
		return this.future.length > 0;
	}
	get isEmpty(): boolean {
		return this.doc.sections.length === 0;
	}
	get selected(): PageNode | null {
		return this.doc.sections.find((s) => s.id === this.selectedId) ?? null;
	}

	/** Snapshot the current doc before a mutation, for undo. */
	#snapshot() {
		this.history.push(clone(this.doc));
		if (this.history.length > MAX_HISTORY) this.history.shift();
		this.future = [];
		// Any structural mutation ends the current field-edit run, so the next
		// keystroke starts a fresh undo step.
		this.#lastEditKey = null;
	}

	#persist() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.doc));
		} catch {
			// storage full / disabled — non-fatal for a session sandbox
		}
	}

	/** Insert a fresh block instance at `atIndex` (default: end). */
	add(blockId: string, atIndex?: number) {
		const block = getBlock(blockId);
		if (!block) return;
		this.#snapshot();
		const node: PageNode = {
			id: newId(),
			blockId,
			props: clone(block.defaults)
		};
		const i = atIndex ?? this.doc.sections.length;
		this.doc.sections.splice(i, 0, node);
		this.selectedId = node.id;
		this.#persist();
	}

	select(id: string | null) {
		this.selectedId = id;
	}

	remove(id: string) {
		this.#snapshot();
		this.doc.sections = this.doc.sections.filter((s) => s.id !== id);
		if (this.selectedId === id) this.selectedId = null;
		this.#persist();
	}

	duplicate(id: string) {
		const idx = this.doc.sections.findIndex((s) => s.id === id);
		if (idx < 0) return;
		this.#snapshot();
		const copy: PageNode = { ...clone(this.doc.sections[idx]), id: newId() };
		this.doc.sections.splice(idx + 1, 0, copy);
		this.selectedId = copy.id;
		this.#persist();
	}

	/** Reorder: replace the section list (used by drag-reorder). */
	reorder(sections: PageNode[]) {
		this.#snapshot();
		this.doc.sections = sections;
		this.#persist();
	}

	/** Update one prop on a node. Consecutive edits to the same field coalesce. */
	update(id: string, key: string, value: unknown) {
		const node = this.doc.sections.find((s) => s.id === id);
		if (!node) return;
		const editKey = `${id}:${key}`;
		if (this.#lastEditKey !== editKey) {
			this.#snapshot(); // resets #lastEditKey to null
			this.#lastEditKey = editKey;
		}
		node.props[key] = value;
		this.#persist();
	}

	setDevice(device: BuilderDevice) {
		this.device = device;
	}

	undo() {
		const prev = this.history.pop();
		if (!prev) return;
		this.future.push(clone(this.doc));
		this.doc = prev;
		this.selectedId = null;
		this.#persist();
	}

	redo() {
		const next = this.future.pop();
		if (!next) return;
		this.history.push(clone(this.doc));
		this.doc = next;
		this.selectedId = null;
		this.#persist();
	}

	clear() {
		if (this.isEmpty) return;
		this.#snapshot();
		this.doc = { sections: [] };
		this.selectedId = null;
		this.#persist();
	}

	/** Restore the last session draft. Call once on mount. */
	load() {
		if (!browser) return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) this.doc = JSON.parse(raw) as PageDoc;
		} catch {
			// corrupt draft — start clean
		}
	}
}

export const builder = new BuilderState();
