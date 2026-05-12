/**
 * Custom Shiki themes built from the Dash.fi brand palette.
 * Light: jade keywords, cobalt strings, orange numbers/constants, ink text.
 * Dark:  light-jade keywords, periwinkle strings, orange numbers, white text.
 *
 * Token scopes follow TextMate conventions. Order matters — later rules win.
 */

import type { ThemeRegistration } from 'shiki';

// --- Light --------------------------------------------------------------------

const LIGHT_INK = '#25261d';
const LIGHT_MUTED = '#80817a';
const LIGHT_JADE = '#2b605c';
const LIGHT_JADE_DEEP = '#123b39';
const LIGHT_COBALT = '#354cef';
const LIGHT_COBALT_DEEP = '#2a3ecc';
const LIGHT_ORANGE = '#ff4000';
const LIGHT_GRAPHITE = '#505148';

export const dashbookLight: ThemeRegistration = {
	name: 'dashbook-light',
	type: 'light',
	colors: {
		'editor.background': '#00000000',
		'editor.foreground': LIGHT_INK
	},
	tokenColors: [
		{
			scope: ['comment', 'punctuation.definition.comment'],
			settings: { foreground: LIGHT_MUTED, fontStyle: 'italic' }
		},
		{
			scope: ['punctuation', 'meta.brace', 'meta.bracket', 'meta.delimiter'],
			settings: { foreground: LIGHT_GRAPHITE }
		},
		{
			scope: [
				'keyword',
				'keyword.control',
				'keyword.operator.new',
				'keyword.operator.expression',
				'storage',
				'storage.type',
				'storage.modifier',
				'keyword.import',
				'keyword.export'
			],
			settings: { foreground: LIGHT_JADE, fontStyle: 'normal' }
		},
		{
			scope: ['keyword.operator', 'keyword.operator.assignment', 'keyword.operator.arithmetic'],
			settings: { foreground: LIGHT_GRAPHITE }
		},
		{
			scope: ['string', 'string.quoted', 'string.template'],
			settings: { foreground: LIGHT_COBALT }
		},
		{
			scope: ['constant.character.escape', 'punctuation.definition.template-expression'],
			settings: { foreground: LIGHT_ORANGE }
		},
		{
			scope: [
				'constant.numeric',
				'constant.language',
				'constant.language.boolean',
				'constant.language.null',
				'constant.language.undefined'
			],
			settings: { foreground: LIGHT_ORANGE }
		},
		{
			scope: ['variable', 'variable.other', 'meta.definition.variable'],
			settings: { foreground: LIGHT_INK }
		},
		{
			scope: ['variable.parameter', 'meta.parameter'],
			settings: { foreground: LIGHT_GRAPHITE, fontStyle: 'italic' }
		},
		{
			scope: ['variable.language', 'variable.language.this'],
			settings: { foreground: LIGHT_ORANGE, fontStyle: 'italic' }
		},
		{
			scope: [
				'entity.name.function',
				'meta.function-call entity.name.function',
				'support.function'
			],
			settings: { foreground: LIGHT_COBALT_DEEP }
		},
		{
			scope: [
				'entity.name.type',
				'entity.name.class',
				'support.type',
				'support.class',
				'meta.type'
			],
			settings: { foreground: LIGHT_JADE_DEEP }
		},
		// HTML / Svelte / JSX tags
		{
			scope: [
				'entity.name.tag',
				'entity.name.tag.html',
				'entity.name.tag.svelte',
				'support.class.component'
			],
			settings: { foreground: LIGHT_JADE_DEEP }
		},
		{
			scope: ['punctuation.definition.tag', 'meta.tag punctuation'],
			settings: { foreground: LIGHT_MUTED }
		},
		{
			scope: ['entity.other.attribute-name', 'meta.attribute.svelte'],
			settings: { foreground: LIGHT_COBALT, fontStyle: 'italic' }
		},
		// Svelte directives: on:click, bind:value, use:action, transition:fade
		{
			scope: ['entity.other.attribute-name.svelte', 'meta.directive.svelte'],
			settings: { foreground: LIGHT_ORANGE, fontStyle: 'italic' }
		},
		// {#if} {#each} {/if} {:else} — Svelte logic blocks
		{
			scope: [
				'meta.block.logic.svelte',
				'keyword.control.svelte',
				'punctuation.section.embedded.svelte',
				'entity.name.tag.svelte.logic'
			],
			settings: { foreground: LIGHT_JADE }
		},
		// Markdown / docs
		{
			scope: ['markup.heading', 'entity.name.section'],
			settings: { foreground: LIGHT_JADE_DEEP, fontStyle: 'bold' }
		},
		{
			scope: ['markup.bold'],
			settings: { foreground: LIGHT_INK, fontStyle: 'bold' }
		},
		{
			scope: ['markup.italic'],
			settings: { foreground: LIGHT_INK, fontStyle: 'italic' }
		},
		{
			scope: ['markup.inline.raw', 'markup.fenced_code'],
			settings: { foreground: LIGHT_COBALT }
		},
		// CSS
		{
			scope: ['entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css'],
			settings: { foreground: LIGHT_COBALT_DEEP }
		},
		{
			scope: ['support.type.property-name.css'],
			settings: { foreground: LIGHT_JADE }
		},
		{
			scope: ['support.constant.property-value.css', 'constant.other.color.rgb-value.hex.css'],
			settings: { foreground: LIGHT_ORANGE }
		}
	]
};

// --- Dark ---------------------------------------------------------------------

const DARK_FG = '#ffffff';
const DARK_MUTED = '#6e7878';
const DARK_JADE = '#5bb8b0';
const DARK_JADE_DEEP = '#8fd4ce';
const DARK_PERIWINKLE = '#b6c1f2';
const DARK_COBALT = '#7a8bff';
const DARK_ORANGE = '#ff8347';
const DARK_GRAPHITE = '#a8b2b1';

export const dashbookDark: ThemeRegistration = {
	name: 'dashbook-dark',
	type: 'dark',
	colors: {
		'editor.background': '#00000000',
		'editor.foreground': DARK_FG
	},
	tokenColors: [
		{
			scope: ['comment', 'punctuation.definition.comment'],
			settings: { foreground: DARK_MUTED, fontStyle: 'italic' }
		},
		{
			scope: ['punctuation', 'meta.brace', 'meta.bracket', 'meta.delimiter'],
			settings: { foreground: DARK_GRAPHITE }
		},
		{
			scope: [
				'keyword',
				'keyword.control',
				'keyword.operator.new',
				'keyword.operator.expression',
				'storage',
				'storage.type',
				'storage.modifier',
				'keyword.import',
				'keyword.export'
			],
			settings: { foreground: DARK_JADE }
		},
		{
			scope: ['keyword.operator', 'keyword.operator.assignment', 'keyword.operator.arithmetic'],
			settings: { foreground: DARK_GRAPHITE }
		},
		{
			scope: ['string', 'string.quoted', 'string.template'],
			settings: { foreground: DARK_PERIWINKLE }
		},
		{
			scope: ['constant.character.escape', 'punctuation.definition.template-expression'],
			settings: { foreground: DARK_ORANGE }
		},
		{
			scope: [
				'constant.numeric',
				'constant.language',
				'constant.language.boolean',
				'constant.language.null',
				'constant.language.undefined'
			],
			settings: { foreground: DARK_ORANGE }
		},
		{
			scope: ['variable', 'variable.other', 'meta.definition.variable'],
			settings: { foreground: DARK_FG }
		},
		{
			scope: ['variable.parameter', 'meta.parameter'],
			settings: { foreground: DARK_GRAPHITE, fontStyle: 'italic' }
		},
		{
			scope: ['variable.language', 'variable.language.this'],
			settings: { foreground: DARK_ORANGE, fontStyle: 'italic' }
		},
		{
			scope: [
				'entity.name.function',
				'meta.function-call entity.name.function',
				'support.function'
			],
			settings: { foreground: DARK_COBALT }
		},
		{
			scope: [
				'entity.name.type',
				'entity.name.class',
				'support.type',
				'support.class',
				'meta.type'
			],
			settings: { foreground: DARK_JADE_DEEP }
		},
		{
			scope: [
				'entity.name.tag',
				'entity.name.tag.html',
				'entity.name.tag.svelte',
				'support.class.component'
			],
			settings: { foreground: DARK_JADE_DEEP }
		},
		{
			scope: ['punctuation.definition.tag', 'meta.tag punctuation'],
			settings: { foreground: DARK_MUTED }
		},
		{
			scope: ['entity.other.attribute-name', 'meta.attribute.svelte'],
			settings: { foreground: DARK_PERIWINKLE, fontStyle: 'italic' }
		},
		{
			scope: ['entity.other.attribute-name.svelte', 'meta.directive.svelte'],
			settings: { foreground: DARK_ORANGE, fontStyle: 'italic' }
		},
		{
			scope: [
				'meta.block.logic.svelte',
				'keyword.control.svelte',
				'punctuation.section.embedded.svelte',
				'entity.name.tag.svelte.logic'
			],
			settings: { foreground: DARK_JADE }
		},
		{
			scope: ['markup.heading', 'entity.name.section'],
			settings: { foreground: DARK_JADE_DEEP, fontStyle: 'bold' }
		},
		{
			scope: ['markup.bold'],
			settings: { foreground: DARK_FG, fontStyle: 'bold' }
		},
		{
			scope: ['markup.italic'],
			settings: { foreground: DARK_FG, fontStyle: 'italic' }
		},
		{
			scope: ['markup.inline.raw', 'markup.fenced_code'],
			settings: { foreground: DARK_PERIWINKLE }
		},
		{
			scope: ['entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css'],
			settings: { foreground: DARK_COBALT }
		},
		{
			scope: ['support.type.property-name.css'],
			settings: { foreground: DARK_JADE }
		},
		{
			scope: ['support.constant.property-value.css', 'constant.other.color.rgb-value.hex.css'],
			settings: { foreground: DARK_ORANGE }
		}
	]
};
