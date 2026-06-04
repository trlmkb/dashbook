import type { MarketingPatternSpec } from './types.js';

/**
 * UtilityTiles — the dense capabilities / integrations grid.
 *
 * A responsive grid of small utility tiles: a leading icon, a short label, an
 * optional one-line sublabel. Reads as a capabilities or integrations matrix.
 * ProductTileGrid is the product-image variant of the same grid.
 */
export const utilityTiles: MarketingPatternSpec = {
	slug: 'utility-tiles',
	name: 'UtilityTiles',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A dense responsive grid of small utility tiles — a leading icon plus a short label and an optional one-line sublabel. Reads as a capabilities or integrations grid.',

	source: 'src/components/rhythm/UtilityTiles.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'When you have many small, parallel capabilities or integrations to show at a glance — a "works with everything" matrix, a feature roster, a logo-light integrations grid. Reach for FeatureColumns instead when each item needs a paragraph; reach for the ProductTileGrid variant when each tile is a product image.',

	recipe: [
		'Lay out an auto-fitting grid: `grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))` with a small gap so tile count reflows by width.',
		'Each tile is a small card: 1px `--m-border`, card surface, modest padding and radius; a leading icon, a short label, an optional one-line sublabel.',
		'Colour the icon `--m-accent`; keep the label `--m-fg-strong` and the sublabel `--m-fg-subtle`.',
		'Keep every tile the same height (align the grid items to stretch) so the matrix reads as a clean grid.',
		'Truncate the sublabel to a single line so a long string never grows a tile out of the rhythm.',
	],

	dom: `<ul class="utility-tiles">
  <li class="tile">
    <svg class="icon" aria-hidden="true">…</svg>
    <span class="label">UPS</span>
    <span class="sub">Parcel + freight</span>
  </li>
  <li class="tile">…</li>
</ul>`,

	tokensUsed: [
		{ part: 'tile surface', role: '--m-card', notes: 'Each tile sits on the card surface.' },
		{ part: 'tile border', role: '--m-border', notes: 'The 1px hairline around each tile.' },
		{ part: 'icon', role: '--m-accent', notes: 'Leading utility icon — jade.' },
		{ part: 'label', role: '--m-fg-strong', notes: 'Short tile label.' },
		{ part: 'sublabel', role: '--m-fg-subtle', notes: 'Optional one-line detail.' },
	],

	dimensions: [
		{ name: 'Columns', value: 'auto-fit', notes: '`repeat(auto-fit, minmax(180px, 1fr))` — count reflows by width.' },
		{ name: 'Min tile', value: '180px', notes: 'The minmax floor; tiles grow to fill the row.' },
		{ name: 'Icon', value: '20–24px', notes: 'Leading icon; --m-accent.' },
		{ name: 'Gap', value: '12–16px', notes: 'Grid gap between tiles.' },
	],

	variants: [
		{
			name: 'UtilityTiles',
			description: 'Default — icon + label + optional sublabel. Capabilities / integrations.',
		},
		{
			name: 'ProductTileGrid',
			description: 'Product-image variant of the same grid: each tile is a product image (or recoloured product shot) instead of an icon + label. Same auto-fit reflow and tile chrome.',
		},
	],

	props: [
		{ name: 'tiles', type: 'Array<{ icon; label; sub? }>', required: true, description: 'The tile definitions.' },
		{ name: 'minTile', type: 'string', default: '180px', description: 'The minmax floor for the auto-fit columns.' },
		{ name: 'variant', type: "'icon' | 'product'", default: "'icon'", description: 'Icon tiles (UtilityTiles) vs product-image tiles (ProductTileGrid).' },
	],

	nonFeatures: [
		'Not a feature grid — tiles carry a label and at most a one-line sub, never a paragraph.',
		'Not interactive by default — tiles are display items; if a tile links out it becomes an anchor, but the grid is not a menu.',
		'No fixed column count — the grid auto-fits by width rather than hardcoding columns per breakpoint.',
	],

	gotchas: [
		'Use `repeat(auto-fit, minmax(180px, 1fr))` rather than a fixed column count so the grid stays dense at every width; the `minmax` floor (not a fixed width) is what prevents a tile blowing out the track.',
		'Truncate the sublabel to one line (`white-space: nowrap; text-overflow: ellipsis`) or a long integration name will grow its tile taller than its row.',
	],

	accessibility: [
		'The leading icon is decorative (`aria-hidden`) — the label text identifies the tile.',
		'Use a real `<ul>` / `<li>` so the matrix is announced as a list with its count; if a tile links, the whole tile is one focusable target.',
	],

	example: `<ul class="utility-tiles">
  <li class="tile"><Box class="icon" /> <span class="label">UPS</span>
    <span class="sub">Parcel + freight</span></li>
  <li class="tile"><Box class="icon" /> <span class="label">FedEx</span></li>
</ul>

<style>
  .utility-tiles { list-style: none; margin: 0; padding: 0; display: grid;
    gap: 14px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .tile { display: flex; flex-direction: column; gap: 6px; padding: 16px;
    border-radius: 12px; background: var(--m-card);
    border: 1px solid var(--m-border); }
  .tile .icon { width: 22px; height: 22px; color: var(--m-accent); }
  .tile .label { font-size: 14px; color: var(--m-fg-strong); }
  .tile .sub { font-size: 12px; color: var(--m-fg-subtle);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>`,
	exampleLang: 'html',

	porting: [
		'An auto-fit grid (`repeat(auto-fit, minmax(180px, 1fr))`) of small hairline cards; each tile is icon + label + optional one-line sub, icon in `--m-accent`.',
		'ProductTileGrid is the same grid with a product image swapped in for the icon + label; keep the auto-fit reflow and the `minmax` floor in both.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
