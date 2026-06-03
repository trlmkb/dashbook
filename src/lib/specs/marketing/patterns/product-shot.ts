import type { MarketingPatternSpec } from './types.js';

/**
 * Scale-to-fit product shot (`marketing_product_shot`).
 *
 * Rebuild a product screenshot as real DOM at a fixed natural width, then scale
 * the whole thing to the container with a transform driven by a ResizeObserver.
 * Crisp at any width, recolourable to the marketing accent, and accessible.
 */
export const productShot: MarketingPatternSpec = {
	slug: 'product-shot',
	name: 'Scale-to-fit product shot',
	category: 'Media & proof',
	status: 'stable',
	toolId: 'marketing_product_shot',
	description:
		'A product screenshot rebuilt as real DOM at a fixed natural width (e.g. 1180px), then scaled to the container via `transform: scale()` set by a ResizeObserver. Stays crisp at any size and recolours to the marketing accent.',

	source: 'src/components/slide/ProductImage.astro + the rebuilt product UI it wraps',
	sourceNote: 'The inner product UI is bespoke per shot; the scaling wrapper is the reusable part.',

	whenToUse:
		'When you want a pixel-crisp, recolourable, on-brand product visual instead of a flat PNG — hero shots, feature proof, "see it in the product" moments. Skip it for true photography (use a real <img>).',

	recipe: [
		'Build the product UI as real DOM at a fixed natural width (e.g. 1180px) — the "inner".',
		'Wrap it; set `transform: scale(clientWidth / 1180)` and `transform-origin: top left` on the inner.',
		'Drive the scale with a ResizeObserver on the wrapper; recompute on `resize`, `load`, `fonts.ready`, and `astro:page-load`.',
		'Set the wrapper height to `scaledInner.offsetHeight * scale` so it occupies the right space (the scaled child is out of normal flow for sizing).',
		'Recolour embedded product UI to the marketing accent (`--m-accent`); KEEP semantic colours intact (severity, money).',
	],

	dom: `<div class="shot" data-product-shot>
  <div class="shot-inner" style="width:1180px; transform-origin: top left;">
    <!-- product UI rebuilt as DOM -->
  </div>
</div>`,

	tokensUsed: [
		{ part: 'recoloured accent', role: '--m-accent', notes: 'Re-skin the product UI to the marketing accent.' },
		{ part: 'surface', role: '--m-card / --m-surface-2', notes: 'Panels inside the shot.' },
		{ part: 'semantic colours', role: 'severity / money', notes: 'KEEP these — do not recolour to accent.' },
	],

	dimensions: [
		{ name: 'Natural width', value: '1180px', notes: 'The fixed inner width the UI is authored at.' },
		{ name: 'Scale', value: 'clientWidth / 1180', notes: 'transform: scale(); transform-origin: top left.' },
		{ name: 'Wrapper height', value: 'inner.offsetHeight × scale', notes: 'Set explicitly so layout reserves the right space.' },
	],

	props: [
		{ name: 'naturalWidth', type: 'number', default: '1180', description: 'The fixed width the inner UI is authored at.' },
		{ name: 'class', type: 'string', description: 'Extra classes on the wrapper.' },
	],

	nonFeatures: [
		'Not an <img> — it is live DOM, so it stays crisp and themeable (and the screenshot can never go stale against a PNG export).',
		'Not interactive — it is a visual; don\'t wire real product behaviour into it.',
		'No recolouring of semantic colours — money and severity keep their meaning.',
	],

	gotchas: [
		'Recompute the scale on `fonts.ready` — web fonts change the inner height after first paint, and a stale wrapper height clips or gaps.',
		'Re-run on `astro:page-load` (view transitions) or the observer binds to a detached node.',
		'Mobile blow-out: the 1180px inner will size its column and overflow unless the parent grid uses `minmax(0, 1fr)` (see the Layout foundation).',
	],

	motion: ['No entrance of its own beyond the section reveal; the scale transform is layout, not animation.'],

	accessibility: [
		'Give the shot a text alternative (visually-hidden caption or `aria-label`) describing what the product UI shows.',
		'Decorative inner nodes are `aria-hidden`; don\'t expose a fake interactive tree to the screen reader.',
	],

	example: `<div class="shot" data-product-shot>
  <div class="shot-inner" style="width:1180px">…product UI…</div>
</div>

<script>
  const wrap = document.querySelector('[data-product-shot]');
  const inner = wrap.querySelector('.shot-inner');
  const fit = () => {
    const scale = wrap.clientWidth / 1180;
    inner.style.transform = 'scale(' + scale + ')';
    wrap.style.height = inner.offsetHeight * scale + 'px';
  };
  new ResizeObserver(fit).observe(wrap);
  addEventListener('load', fit);
  document.fonts?.ready.then(fit);
  document.addEventListener('astro:page-load', fit);
</script>`,
	exampleLang: 'html',

	porting: [
		'Author the inner at a fixed width; scale = container / natural; set wrapper height = inner.offsetHeight × scale.',
		'Recompute on resize + load + fonts.ready + framework page-transition event. Recolour to accent; keep semantic colours.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook — promoted from the shipping rebuild (slide/ProductImage).' }],
};
