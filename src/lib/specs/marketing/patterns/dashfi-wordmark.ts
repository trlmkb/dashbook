import type { MarketingPatternSpec } from './types.js';

/**
 * DashfiWordmark — inline use of the Dash.fi wordmark on marketing surfaces.
 *
 * The wordmark is a single-source brand asset. This pattern covers placing it
 * inline — colourways per band, sizing, and clear-space — but it does NOT
 * redraw the mark: the SVG is always fetched from the canonical source
 * (`marketing_get_logo`, or the repo's Wordmark component), never reconstructed.
 */
export const dashfiWordmark: MarketingPatternSpec = {
	slug: 'dashfi-wordmark',
	name: 'DashfiWordmark',
	category: 'Media & proof',
	status: 'stable',
	description:
		'Inline use of the Dash.fi wordmark on marketing surfaces — colourways per band, sizing, and clear-space. A single-source brand asset: the SVG is fetched from the canonical source (`marketing_get_logo` or the repo Wordmark component), never reconstructed or redrawn.',

	source: 'src/components/slide/DashfiWordmark.astro',
	sourceNote:
		'The wordmark glyph is the canonical brand asset (viewBox 426×90); this component only places it. Verify prop names against the website source.',

	whenToUse:
		'When the Dash.fi wordmark appears inline on a marketing surface — a footer lockup, a "from the team at" line, a co-brand pairing, or a slide cover. Reach for the app icon (the rounded-square "d") instead when you need a square mark for an avatar or favicon, and a real partner logo lockup for co-branding.',

	recipe: [
		'Fetch the wordmark from the single source — `marketing_get_logo` (variant `wordmark`), the `/api/logo/wordmark/<preset>` endpoint, or the repo `Wordmark` component. NEVER reconstruct, redraw, or retype the glyph.',
		'Pick the colourway by band: a paper / cream band takes the jade or ink preset; an ink or cobalt band takes a white-on-dark preset (or set `data-marketing-dark` so a token-driven render flips).',
		'Size by setting width and letting the 426×90 aspect ratio drive the height — do not stretch, condense, or set height independently.',
		'Reserve clear-space around the mark (roughly the cap height of the "d" on every side) and keep that zone free of copy, rules, and other logos.',
		'Give the inline mark an accessible name ("Dash.fi") and keep it on a surface with sufficient contrast for the chosen colourway.',
	],

	dom: `<!-- Canonical asset, fetched — never hand-drawn -->
<a class="wordmark" href="/" aria-label="Dash.fi">
  <img src="/api/logo/wordmark/jade" alt="Dash.fi" width="120" />
</a>

<!-- On an ink band, use a light colourway -->
<span class="wordmark" data-marketing-dark>
  <img src="/api/logo/wordmark/white-on-ink" alt="Dash.fi" width="120" />
</span>`,

	tokensUsed: [
		{ part: 'wordmark on paper / cream', role: '--m-accent / --m-fg-strong', notes: 'Jade or ink colourway; the mark sits in the accent or the strong foreground.' },
		{ part: 'wordmark on ink / cobalt', role: '--m-surface', notes: 'A light (paper) colourway on the dark band, via data-marketing-dark or the white-on-dark preset.' },
		{ part: 'the dot', role: '--m-accent', notes: 'The "." between dash and fi reads in the accent in token-driven renders.' },
		{ part: 'clear-space (no fill)', role: 'layout only', notes: 'Reserved padding around the mark; not a painted token.' },
	],

	dimensions: [
		{ name: 'viewBox', value: '426 × 90', notes: 'Natural aspect of the canonical wordmark; height follows width.' },
		{ name: 'Inline size', value: '~96–140px wide', notes: 'Typical inline lockup width on a marketing surface.' },
		{ name: 'Clear-space', value: '≈ cap height of the "d"', notes: 'Minimum keep-clear zone on every side.' },
		{ name: 'Aspect', value: 'locked', notes: 'Width drives height; never stretch or condense.' },
	],

	variants: [
		{ name: 'jade', description: 'Jade colourway — the default, for paper / cream bands.' },
		{ name: 'ink', description: 'Ink colourway — for light bands needing maximum contrast.' },
		{ name: 'white-on-ink', description: 'Light mark for the ink band.' },
		{ name: 'white-on-cobalt', description: 'Light mark for the cobalt band.' },
	],

	props: [
		{ name: 'preset', type: "'jade' | 'jade-dark' | 'ink' | 'cream-on-jade' | 'white-on-ink' | 'white-on-cobalt' | 'black' | 'transparent'", default: "'jade'", description: 'Canonical colourway preset; chosen to suit the band. Signatures pulled from the brief; verify against the website source.' },
		{ name: 'width', type: 'number', description: 'Inline width in px; the 426×90 aspect drives the height.' },
		{ name: 'label', type: 'string', default: "'Dash.fi'", description: 'Accessible name for the inline mark.' },
	],

	nonFeatures: [
		'Not a redraw — the glyph is never reconstructed, retyped, or rebuilt from the letters "dash.fi"; only the canonical SVG is placed.',
		'Not recolourable beyond the sanctioned presets — pick a colourway preset; do not tint the mark to an arbitrary hex.',
		'Not distortable — no stretch, condense, rotate, drop-shadow, or independent height; the aspect ratio and clear-space are fixed.',
	],

	gotchas: [
		'Treat the wordmark as a fetched asset, not type: even though it reads as "dash.fi" in a mono face, re-typing it in CSS drifts from the canonical letterforms and spacing — always pull the SVG from the single source.',
		'On the ink / cobalt bands a jade or ink mark loses contrast — switch to a light colourway (or `data-marketing-dark`) rather than leaving the default on a dark surface.',
	],

	accessibility: [
		'Give the mark a text alternative — `alt="Dash.fi"` (or `aria-label` on the wrapping link); a purely decorative repeat is `aria-hidden`.',
		'Keep contrast sufficient for the chosen colourway on its band; do not place a low-contrast colourway on a busy or mismatched surface.',
	],

	example: `---
// Canonical asset — fetched, never hand-drawn.
import Wordmark from '$chrome/Wordmark.svelte';
---
<!-- On a paper / cream band: jade colourway -->
<a href="/" aria-label="Dash.fi">
  <Wordmark size="md" />
</a>

<!-- On an ink band: light colourway via the dark attribute or a white-on-dark preset -->
<span data-marketing-dark>
  <img src="/api/logo/wordmark/white-on-ink" alt="Dash.fi" width="120" />
</span>`,
	exampleLang: 'astro',

	porting: [
		'Always fetch the wordmark from the single source — `marketing_get_logo`, the `/api/logo/wordmark/<preset>` endpoint, or the Wordmark component — and place it; never reconstruct the glyph.',
		'Choose a colourway preset per band, size by width on the locked 426×90 aspect, reserve clear-space, and give the mark an accessible name.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
