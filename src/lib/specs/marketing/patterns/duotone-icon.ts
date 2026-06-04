import type { MarketingPatternSpec } from './types.js';

/**
 * Duotone icon (`marketing_duotone_icon`).
 *
 * A filled silhouette at low opacity plus a stroked detail layer, both drawn in
 * `currentColor`, so the icon inherits its hue from the parent. This is the
 * brief's only sanctioned multi-colour element — and the only place a per-item
 * hue is allowed.
 */
export const duotoneIcon: MarketingPatternSpec = {
	slug: 'duotone-icon',
	name: 'Duotone icon',
	category: 'Building blocks',
	status: 'stable',
	toolId: 'marketing_duotone_icon',
	description:
		'A two-layer icon: a filled silhouette at low opacity plus a stroked detail layer, both `currentColor`. The icon inherits its hue from the parent, and a per-item hue is allowed here — the only sanctioned multi-colour element.',

	source: 'src/components/shipping/ShipPillars.tsx MODULE_ICONS (filled silhouette fill-opacity .18 + stroked detail, currentColor, per-module hue)',

	whenToUse:
		'Section and feature icons that want a touch of depth without going full multi-colour. Set the hue on the parent (or the svg itself) so a row of icons can each carry a different role colour — a box in accent, a doc in positive, a bolt in cobalt. Reach for a single-layer stroked icon when the glyph is too small for the fill to read (≤16px).',

	recipe: [
		'Draw two layers in one `<svg>`: a filled silhouette (`fill="currentColor"`, opacity ~0.18) and a stroked detail layer (`stroke="currentColor"`, `fill="none"`).',
		'Both layers use `currentColor` — never a literal hue — so the icon inherits its colour from the parent and re-themes with the surface.',
		'Per-item hue is allowed here and nowhere else: set `color: var(--m-accent | --m-positive | --m-cobalt | …)` on the svg (or its parent) and both layers follow. The /shipping source (ShipPillars MODULE_ICONS) uses a small fixed palette of literal categorical hues for this — orange #c2410c, jade #2b605c, violet #6d4bd1, blue #1d6fb8.',
		'Typical size 24px; stroke ~1.5 with round joins/caps so it reads at small sizes.',
		'The fill is the silhouette mass; the stroke is the readable outline + interior detail. Keep them on the same 24×24 grid so they register.',
		'Mark the icon `aria-hidden` when a text label sits beside it; otherwise give the svg a `role="img"` + title.',
	],

	dom: `<svg class="m-duo" viewBox="0 0 24 24" width="24" height="24"
     style="color: var(--m-accent)" aria-hidden="true">
  <path class="fill" fill="currentColor" fill-opacity="0.18" d="…silhouette…" />
  <path class="detail" fill="none" stroke="currentColor"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="…detail…" />
</svg>`,

	tokensUsed: [
		{ part: 'icon hue', role: '--m-accent', notes: 'Set as `color` on the svg/parent; both layers read currentColor.' },
		{ part: 'per-item hue', role: '--m-positive', notes: 'Money/included icons — jade. Per-item hue is sanctioned here only.' },
		{ part: 'data-accent hue', role: '--m-cobalt', notes: 'Marketing-only data accent for variety in a row of icons.' },
	],

	dimensions: [
		{ name: 'Size', value: '24px', notes: 'Typical; both layers share the 24×24 grid.' },
		{ name: 'Stroke', value: '~1.5', notes: 'Round joins + caps; the readable outline.' },
		{ name: 'Fill opacity', value: '~0.18', notes: 'The low-opacity silhouette behind the stroke.' },
		{ name: 'Layers', value: '2', notes: 'Filled silhouette + stroked detail, both currentColor.' },
	],

	variants: [
		{ name: 'accent', description: 'On-brand hue — jade.', tokens: [{ name: 'hue', token: { cssVar: '--m-accent', light: '#2B605C', dark: '#5BB8B0' } }] },
		{ name: 'positive', description: 'Money / included — jade.', tokens: [{ name: 'hue', token: { cssVar: '--m-positive', light: '#2B605C', dark: '#5BB8B0' } }] },
		{ name: 'cobalt', description: 'Marketing data accent.', tokens: [{ name: 'hue', token: { cssVar: '--m-cobalt', light: '#354CEF', dark: '#354CEF' } }] },
	],

	props: [
		{ name: 'name', type: 'string', required: true, description: 'Which glyph to render (box, doc, bolt, …).' },
		{ name: 'size', type: 'number', default: '24', description: 'Square size in px; stroke scales with it.' },
		{ name: 'tone', type: "'accent' | 'positive' | 'cobalt' | string", default: "'accent'", description: 'Sets the svg `color`; both layers follow via currentColor.' },
	],

	nonFeatures: [
		'No literal hues inside the paths — both layers are currentColor so the parent owns the colour.',
		'Not a place for arbitrary brand colours — per-item hue draws only from the `--m-*` role set.',
		'No third layer or gradient — two flat layers (filled silhouette + stroked detail) is the whole recipe.',
	],

	gotchas: [
		'Set the hue with `color` on the svg (or parent), not `fill`/`stroke` on the paths — overriding the paths breaks the inherit-from-parent contract and the re-theme.',
		'This is the one exception to the monochrome rule: per-item hue is allowed for duotone icons and nowhere else. Keep money/positive = jade, negative = ink, warn = amber if the glyph carries semantic meaning.',
	],

	motion: ['No motion of its own; it rides the section reveal. Nothing to disable under reduced motion.'],

	accessibility: [
		'Decorative beside a label: `aria-hidden="true"` so the label carries the meaning.',
		'Standalone: give the svg `role="img"` and a `<title>` describing it.',
	],

	example: `<!-- per-item hue via color on the svg; both layers are currentColor -->
<svg class="m-duo" viewBox="0 0 24 24" style="color: var(--m-accent)" aria-hidden="true">
  <path fill="currentColor" fill-opacity="0.18" d="…silhouette…" />
  <path fill="none" stroke="currentColor" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" d="…detail…" />
</svg>

<style>
  .m-duo { width: 24px; height: 24px; }
  /* hue is inherited from the parent — no per-path colour */
  .doc  { color: var(--m-positive); }
  .bolt { color: var(--m-cobalt); }
</style>`,
	exampleLang: 'html',

	porting: [
		'One svg, two paths: filled silhouette (currentColor, low opacity) + stroked detail (currentColor, ~1.5, round caps). 24×24 grid.',
		'Hue comes from the parent via `color` — both layers read currentColor. Per-item hue allowed here only; draw it from the `--m-*` roles.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
