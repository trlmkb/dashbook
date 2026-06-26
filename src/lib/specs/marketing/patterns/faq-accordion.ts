import type { MarketingPatternSpec } from './types.js';

/**
 * FaqAccordion — the Q/A disclosure list that closes most marketing pages.
 *
 * A hairline-divided list of questions. One row open at a time; the question
 * carries a mono "Q." marker and a rotating "+" toggle, and the answer reveals
 * with a grid-rows height animation. Also the source for FAQPage structured data.
 */
export const faqAccordion: MarketingPatternSpec = {
	slug: 'faq-accordion',
	name: 'FaqAccordion',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A hairline-divided list of question/answer rows — one open at a time. Each question has a mono "Q." marker, a rotating "+" toggle, and an answer that reveals with a grid-rows height animation. Used to close most marketing pages, and the on-page source for FAQPage JSON-LD.',

	source: 'src/components/widgets/FAQAccordion.tsx',
	sourceNote: 'Single-open accordion driven by one open-index state (default 0; re-clicking the open row collapses it).',

	whenToUse:
		'Reach for FaqAccordion at the foot of a marketing or product page to answer the recurring objections before the final CTA. Pair it with FAQPage structured data so the same questions are eligible for FAQ rich results. For a single highlighted statement use BigQuote, not an accordion.',

	recipe: [
		'Render a vertical list, each row divided by a top/bottom hairline — `divide-y` with `--m-border` (≈ rgba(15,20,18,0.08); the paper-alpha hairline on dark).',
		'Each row is a full-width `<button aria-expanded>` so the whole header is the hit target — question text left, toggle right.',
		'Prefix the question with a mono "Q." marker: 11px, weight 500, uppercase, ~0.22em tracking, in `--m-accent` at ~0.72 (mint on dark). The question itself is `--m-fg-strong`, ~17px, semibold.',
		'Toggle is a mono "+" at ~20px extralight in `--m-fg-muted`; rotate it 45° to an "×" when open over 220ms `cubic-bezier(0.2,0.8,0.2,1)`.',
		'Animate the answer open by transitioning a CSS grid from `grid-template-rows: 0fr` → `1fr` (the height-auto-animation trick) over ~280ms; the inner wrapper is `min-height: 0; overflow: hidden`.',
		'The answer mirrors the question layout — an "A." mono marker + the body in `--m-fg-muted` (~0.8), 16px / 1.6.',
		'Keep one row open at a time. Default the first row open; re-clicking the open row collapses it (set index to -1).',
	],

	dom: `<div class="faq">
  <div class="faq-row">
    <button class="faq-q" aria-expanded="true">
      <span><span class="marker">Q.</span> How does the audit work?</span>
      <span class="toggle">+</span>
    </button>
    <div class="faq-a" data-open>
      <div><span class="marker">A.</span> <p>We check every invoice against your contract.</p></div>
    </div>
  </div>
  <!-- more rows -->
</div>`,

	tokensUsed: [
		{ part: 'row divider', role: '--m-border', notes: 'Top/bottom hairline between rows.' },
		{ part: 'Q. / A. marker', role: '--m-accent', notes: 'At ~0.72 alpha; lifts to mint #5BB8B0 on dark.' },
		{ part: 'question', role: '--m-fg-strong' },
		{ part: 'toggle (+)', role: '--m-fg-muted', notes: 'Rotates 45° when open.' },
		{ part: 'answer body', role: '--m-fg-muted' },
	],

	dimensions: [
		{ name: 'Row padding', value: '~24px block (py-6)' },
		{ name: 'Question', value: '17px / 600 / 1.35' },
		{ name: 'Answer', value: '16px / 1.6' },
		{ name: 'Marker', value: 'mono 11px / 500 / uppercase / 0.22em' },
		{ name: 'Toggle', value: 'mono 20px extralight, rotate 0→45°' },
		{ name: 'Toggle transition', value: '220ms cubic-bezier(0.2,0.8,0.2,1)' },
		{ name: 'Reveal', value: 'grid-template-rows 0fr→1fr, ~280ms' },
	],

	variants: [
		{ name: 'single-open', description: 'Default — one row open at a time, first row open on load.' },
	],

	props: [
		{ name: 'items', type: '{ q: string; a: string }[]', required: true, description: 'The question/answer pairs, in display order.' },
	],

	nonFeatures: [
		'Not a multi-open accordion — exactly one row is open at a time by default.',
		'No icon set per row — the only ornament is the "Q."/"A." markers and the "+"/"×" toggle.',
		'No nested accordions — answers are plain prose, not further disclosure.',
	],

	gotchas: [
		'Animate height with `grid-template-rows: 0fr→1fr` (inner `min-height:0; overflow:hidden`), not `max-height` — `max-height` either clips long answers or eases on a guessed ceiling.',
		'The whole header must be one `<button aria-expanded>` — do not make only the "+" clickable, and do not wrap the button in a link.',
		'Respect `prefers-reduced-motion`: drop the rotate + grid transition to instant.',
	],

	accessibility: [
		'Each header is a real `<button>` with `aria-expanded` reflecting state; the answer panel is `aria-hidden` when closed.',
		'The "Q."/"A." markers and the "+" toggle are decorative — mark them `aria-hidden` so they are not announced.',
		'Questions live under the section `<h2>`; keep them as buttons, not headings, so the outline stays clean.',
	],

	example: `<div class="faq">
  <div class="faq-row">
    <button class="faq-q" aria-expanded="true">
      <span class="q-text"><span class="marker">Q.</span> Is the audit really free?</span>
      <span class="toggle open" aria-hidden="true">+</span>
    </button>
    <div class="faq-a" data-open="true" aria-hidden="false">
      <div class="a-inner">
        <span class="marker" aria-hidden="true">A.</span>
        <p>Yes — the parcel audit is free with the card. You only pay nothing.</p>
      </div>
    </div>
  </div>
</div>

<style>
  .faq { border-top: 0; }
  .faq-row + .faq-row { border-top: 1px solid var(--m-border); }
  .faq-q { display: flex; width: 100%; gap: 24px; justify-content: space-between;
    padding: 24px 0; background: none; border: 0; text-align: left; cursor: pointer; }
  .q-text { display: flex; gap: 16px; color: var(--m-fg-strong);
    font-size: 17px; font-weight: 600; line-height: 1.35; }
  .marker { font-family: var(--font-mono); font-size: 11px; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.22em; color: var(--m-accent); }
  .toggle { font-family: var(--font-mono); font-size: 20px; font-weight: 200;
    color: var(--m-fg-muted); transition: transform 220ms cubic-bezier(0.2,0.8,0.2,1); }
  .toggle.open { transform: rotate(45deg); }
  .faq-a { display: grid; grid-template-rows: 0fr; overflow: hidden;
    transition: grid-template-rows 280ms cubic-bezier(0.2,0.8,0.2,1); }
  .faq-a[data-open="true"] { grid-template-rows: 1fr; }
  .a-inner { min-height: 0; display: flex; gap: 16px; padding-bottom: 24px; }
  .a-inner p { margin: 0; color: var(--m-fg-muted); font-size: 16px; line-height: 1.6; }
  @media (prefers-reduced-motion: reduce) {
    .toggle, .faq-a { transition: none; }
  }
</style>`,
	exampleLang: 'html',

	porting: [
		'A hairline-divided list; each row is an `aria-expanded` button (question + "Q." marker + rotating "+") over a grid-rows height-animated answer panel.',
		'One open at a time, first open by default; the only colours are the hairline, the accent marker, fg-strong (question), and fg-muted (toggle + answer).',
	],

	changelog: [{ version: 'v0.2.0', date: '2026-06-25', note: 'First documented — the live FAQ accordion.' }],
};
