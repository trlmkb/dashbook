/**
 * Marketing page builder — core types.
 *
 * The whole page is one serializable tree (`PageDoc`). That tree IS the export
 * format. Blocks are prop-driven Svelte components registered in
 * `blocks/registry.ts`; their inspector fields are described by `BuilderField`.
 *
 * See `.knowledge/marketing-page-builder-design.md` for the full design.
 */

import type { Component } from 'svelte';

/** How a single editable prop is surfaced in the editor. */
export type BuilderFieldType =
	| 'text' // single-line, side-panel
	| 'textarea' // multi-line, side-panel
	| 'inline' // edited on-canvas (contenteditable), not in the panel
	| 'select' // enum (variant, alignment, background band)
	| 'boolean'
	| 'number'
	| 'image-url' // URL string (no upload — session-only, no backend)
	| 'repeater'; // array of sub-items, each with its own fields

export type BuilderField = {
	key: string;
	label: string;
	type: BuilderFieldType;
	/** for 'select' */
	options?: string[];
	/** for 'repeater' — the sub-fields of each item */
	itemFields?: BuilderField[];
	default: unknown;
};

/** A registered, draggable block — pairs a component with its inspector schema. */
export type BuilderBlock = {
	/** matches the marketing pattern slug, e.g. 'hero' */
	id: string;
	name: string;
	/** reuse the spec category — Heroes, Proof, Content, CTAs, … */
	category: string;
	/** the prop-driven Svelte block; receives the node's props spread in */
	component: Component<Record<string, unknown>>;
	/** inspector schema (mirrors the marketing spec's `props`) */
	fields: BuilderField[];
	/** initial props applied when a fresh instance is inserted */
	defaults: Record<string, unknown>;
};

/** One placed section on the page. */
export type PageNode = {
	/** stable instance id — dnd key + selection target */
	id: string;
	/** → BuilderBlock.id */
	blockId: string;
	props: Record<string, unknown>;
};

/** The whole composed page. This is what gets exported. */
export type PageDoc = {
	sections: PageNode[];
};

export type BuilderDevice = 'desktop' | 'mobile';
