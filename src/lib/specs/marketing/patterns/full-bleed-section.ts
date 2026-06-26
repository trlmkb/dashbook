import type { MarketingPatternSpec } from './types.js';

/**
 * FullBleedSection — media kisses the viewport edge, copy stays on the grid.
 *
 * A full-width band whose background/media bleeds to one viewport edge while
 * its copy stays aligned to the centered content container. The bled side
 * alternates row to row. Promotes the Layout foundation's "full-bleed to edge"
 * recipe into a first-class section pattern.
 */
export const fullBleedSection: MarketingPatternSpec = {
	slug: 'full-bleed-section',
	name: 'FullBleedSection',
	category: 'Layout frames',
	status: 'stable',
	description:
		'A full-width section where a visual bleeds to one viewport edge while the copy stays aligned to the centered content container — content padded on one side, the media run to the edge on the other. The bled side alternates between consecutive rows. See Foundations → Layout for the underlying container/bleed math.',

	source: 'Foundations → Layout ("Full-bleed to edge" + the alternating copy↔media row)',
	sourceNote: 'A layout treatment, not a single component: applied to product-shot and media rows across the marketing pages.',

	whenToUse:
		'Reach for FullBleedSection when a screenshot, chart, or product visual should feel expansive — running off the edge of the screen — while the headline and copy stay legible on the same measure as the rest of the page. Use a contained card (ThreeCardRow, FeatureGrid) when the media should sit inside the grid rather than break it; use ProductShot when the visual is a single framed mock with no bleed.',

	recipe: [
		'Keep copy on the grid: the text column uses the standard container measure (`max-width: var(--content-max)`), so it lines up with every other section.',
		'Bleed the media to the edge: the visual side runs to the viewport edge on one side. Content-side padding = `max(var(--gutter-md), calc((100vw - var(--content-max)) / 2 + var(--gutter-lg)))`; the bleed side uses `var(--gutter-lg)`. Mirror the two values to bleed the other way.',
		'Use a full-width 2-col grid for the row; the media cell bleeds, the copy cell insets to the content margin.',
		'Alternate the bled side row to row (media-right, then media-left) so a stack of these reads as a rhythm, not a repeat.',
		'Let the band background (paper / cream / ink) follow the Section-rhythm cadence; bleeding the media does not change the band tone rules.',
		'Never bleed the copy — text always stays on the container measure; only media crosses the gutter.',
		'On mobile, drop the bleed: stack copy over media at the normal container padding (a full-bleed image on a phone is just an edge-to-edge image).',
	],

	dom: `<section class="full-bleed" data-bleed="right">
  <div class="copy"><!-- on the container measure --></div>
  <div class="media"><!-- runs to the viewport edge --></div>
</section>`,

	tokensUsed: [
		{ part: 'band surface', role: '--m-surface', notes: 'Or --m-cream / dark, per Section rhythm.' },
		{ part: 'copy', role: '--m-fg-strong', notes: 'Body in --m-fg-muted.' },
		{ part: 'container measure', role: '(layout)', notes: 'var(--content-max) + gutters from the Layout foundation.' },
	],

	dimensions: [
		{ name: 'Columns', value: '2 (copy + media)' },
		{ name: 'Content-side padding', value: 'max(gutter-md, calc((100vw − content-max)/2 + gutter-lg))' },
		{ name: 'Bleed-side padding', value: 'gutter-lg' },
		{ name: 'Alternation', value: 'media side flips each consecutive row' },
		{ name: 'Mobile', value: 'bleed off — stacked at container padding' },
	],

	variants: [
		{ name: 'media-right', description: 'Copy on the grid left; media bleeds to the right edge.' },
		{ name: 'media-left', description: 'Mirror — media bleeds left, copy insets right.' },
		{ name: 'alternating', description: 'A stack of rows flipping side to side.' },
	],

	props: [
		{ name: 'side', type: "'left' | 'right'", default: "'right'", description: 'Which viewport edge the media bleeds to.' },
		{ name: 'tone', type: "'paper' | 'cream' | 'ink'", default: "'paper'", description: 'Band surface, per Section rhythm.' },
	],

	nonFeatures: [
		'Not a full-bleed card — the card patterns stay inside the grid; this breaks the grid only for media.',
		'Copy never bleeds — text stays on the container measure; only the visual crosses the gutter.',
		'Not a hero — it is a mid-page media row, not the page opener.',
	],

	gotchas: [
		'Compute the content-side padding from `(100vw - content-max)/2` so the copy lines up with other sections exactly — eyeballing a fixed padding drifts off the grid at wide viewports.',
		'Drop the bleed on mobile; a viewport-edge bleed below the container width is just an edge-to-edge image and usually wants normal padding instead.',
		'Alternate the side across a stack — two media-right rows in a row read as a mistake.',
	],

	accessibility: [
		'Bleeding is purely visual — keep the DOM order copy-then-media (or logical) so reading order is unaffected by which side bleeds.',
		'Edge-bled media still needs alt text / a caption when it carries meaning, not just decoration.',
	],

	example: `<section class="fb" data-bleed="right">
  <div class="fb-copy">
    <h2>Every invoice, audited the moment it lands.</h2>
    <p>The agent checks each charge against your contract — no queue, no project.</p>
  </div>
  <div class="fb-media"><img src="/shots/audit.png" alt="Audit dashboard" /></div>
</section>

<style>
  .fb { --content-max: 1120px; display: grid; gap: 40px; align-items: center;
    grid-template-columns: 1fr 1fr;
    padding-left: max(var(--gutter-md, 40px), calc((100vw - var(--content-max)) / 2 + var(--gutter-lg, 80px)));
    padding-right: var(--gutter-lg, 80px); }
  .fb-media img { width: 100%; border-radius: 16px 0 0 16px; display: block; }
  @media (max-width: 760px) {
    .fb { grid-template-columns: 1fr; padding: 0 var(--gutter-sm, 24px); }
    .fb-media img { border-radius: 16px; }
  }
</style>`,
	exampleLang: 'html',

	porting: [
		'A 2-col band: copy held to the container measure, media run to one viewport edge via asymmetric inline padding derived from `(100vw - content-max)/2`.',
		'Alternate the bled side across rows; collapse to a normal-padded stack on mobile. Band tone follows Section rhythm.',
	],

	changelog: [{ version: 'v0.2.0', date: '2026-06-26', note: 'First documented — promotes the Layout-foundation full-bleed recipe to a pattern.' }],
};
