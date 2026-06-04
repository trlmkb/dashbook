import type { MarketingPatternSpec } from './types.js';

/**
 * CustomerPlatformsRail — the "works with your stack" integration rail.
 *
 * A muted rail or grid of the platforms and integrations customers connect:
 * carriers, ERPs, accounting tools, marketplaces. Like LogoRail, but
 * integration-flavoured — each item is a logo with an optional text label, sat
 * quietly on the surface as proof that Dash.fi fits the tools teams already run.
 */
export const customerPlatformsRail: MarketingPatternSpec = {
	slug: 'customer-platforms-rail',
	name: 'CustomerPlatformsRail',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A muted rail or grid of the platforms and integrations customers connect — a logo plus an optional label per item. Like LogoRail, but integration-flavoured: framed as "works with your stack", sat quietly on the surface in subtle/muted foreground.',

	source: 'src/components/sections/CustomerPlatformsRail.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'When you want to show the carriers, ERPs, accounting tools, and marketplaces Dash.fi plugs into — an "integrates with your stack" proof strip under a hero or between sections. Use LogoRail instead when the items are customer or press logos rather than integrations, and ThreeCardRow when each integration needs a paragraph rather than a label.',

	recipe: [
		'Lay the items out on a native element: a single-line `flex` rail that wraps, or an auto-fit grid (`repeat(auto-fit, minmax(0, 1fr))`) for an even multi-row block.',
		'Each item is a logo tile plus an optional label — a small fixed-height logo box with the label sat beside or beneath it, both muted into the surface.',
		'Mute the marks: tint logos to `--m-fg-subtle` / `--m-fg-muted` (or low opacity) so the rail reads as quiet proof, not a loud sponsor wall; lift to full strength only on hover if interactive.',
		'Lead the rail with a short eyebrow or one-line caption ("works with your stack") in mono `--m-fg-subtle`; keep the rail itself unframed on the section surface.',
		'Keep item heights uniform and let varied logo widths breathe with a consistent gap so the row stays calm; pad each tile so different aspect ratios optically align.',
	],

	dom: `<section class="platforms">
  <p class="eyebrow">Works with your stack</p>
  <ul class="rail">                  <!-- native: flex/auto-fit grid -->
    <li class="item">
      <span class="logo" aria-hidden="true"><!-- mark --></span>
      <span class="label">NetSuite</span>
    </li>
    <li class="item">…</li>
  </ul>
</section>`,

	tokensUsed: [
		{ part: 'logo mark', role: '--m-fg-subtle', notes: 'Marks muted into the surface; lift to --m-fg-muted on hover.' },
		{ part: 'label', role: '--m-fg-muted', notes: 'Optional text label beside or beneath each mark.' },
		{ part: 'eyebrow / caption', role: '--m-fg-subtle', notes: 'Mono, uppercase "works with your stack" lead-in.' },
		{ part: 'divider / tile edge', role: '--m-border', notes: 'Optional 1px hairline between items or around tiles.' },
	],

	dimensions: [
		{ name: 'Logo height', value: '~24–28px', notes: 'Uniform cap height; widths vary by mark.' },
		{ name: 'Item gap', value: '32 → 48px', notes: 'Generous, consistent gap so the rail reads calm.' },
		{ name: 'Layout', value: 'wrap flex / auto-fit grid', notes: '`repeat(auto-fit, minmax(0, 1fr))` for an even grid.' },
		{ name: 'Label', value: '~13px', notes: 'Optional; muted, beside or beneath the mark.' },
	],

	variants: [
		{ name: 'rail', description: 'Default — a single wrapping row of logo + label items.' },
		{ name: 'grid', description: 'An even auto-fit grid for many integrations across multiple rows.' },
	],

	props: [
		{ name: 'items', type: '{ name: string; logo: string; label?: string }[]', required: true, description: 'The platforms to show — a mark plus an optional text label per item.' },
		{ name: 'layout', type: "'rail' | 'grid'", default: "'rail'", description: 'Wrapping single-line rail or an even auto-fit grid.' },
		{ name: 'caption', type: 'string', description: 'The lead-in line ("works with your stack"). Signature pulled from the brief; verify against the website source.' },
	],

	nonFeatures: [
		'Not a marquee — the rail is static; it does not scroll or auto-advance (use Marquee for a moving logo strip).',
		'Not a logo wall at full strength — marks are muted into the surface; this is quiet proof, not a saturated sponsor grid.',
		'No per-item colour — logos are tinted to one muted foreground; brand colours are not reproduced inline.',
	],

	gotchas: [
		'Mute the marks with `--m-fg-subtle` / opacity rather than supplying pre-coloured logo files — a single tinted set re-themes on the ink band, where full-colour PNGs would clash.',
		'Put the flex / grid / gap classes on the NATIVE rail element, not a child component\'s root — Astro scoped styles do not reach a child root, so the layout silently no-ops to `display: block` (see the astro-scoped-styles pattern).',
	],

	accessibility: [
		'Each mark needs a text alternative — the optional label, or an `aria-label` / visually-hidden name; a decorative-only mark is `aria-hidden`.',
		'Do not rely on logo recognition alone: keep labels available (or as accessible names) so the integrations are legible without colour or shape memory.',
	],

	example: `<section class="platforms">
  <p class="eyebrow">Works with your stack</p>
  <ul class="rail">
    <li class="item"><span class="logo">…</span><span class="label">NetSuite</span></li>
    <li class="item"><span class="logo">…</span><span class="label">QuickBooks</span></li>
    <li class="item"><span class="logo">…</span><span class="label">UPS</span></li>
    <li class="item"><span class="logo">…</span><span class="label">Shopify</span></li>
  </ul>
</section>

<style>
  .platforms { text-align: center; }
  .eyebrow { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
    letter-spacing: 0.16em; color: var(--m-fg-subtle); margin: 0 0 20px; }
  .rail { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap;
    justify-content: center; align-items: center; gap: 40px; }
  .item { display: inline-flex; align-items: center; gap: 10px; }
  .logo { height: 26px; color: var(--m-fg-subtle); }
  .label { font-size: 13px; color: var(--m-fg-muted); }
  .item:hover .logo { color: var(--m-fg-muted); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A native wrapping flex rail (or auto-fit grid) of logo + optional-label items, all tinted to one muted foreground (`--m-fg-subtle` → `--m-fg-muted` on hover) so it re-themes on the dark band.',
		'Lead with a mono "works with your stack" caption; keep heights uniform and gaps generous; every mark carries a text alternative.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
