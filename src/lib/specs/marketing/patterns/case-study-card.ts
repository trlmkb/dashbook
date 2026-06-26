import type { MarketingPatternSpec } from './types.js';

/**
 * CaseStudyCard — a dark-by-default proof card built around stats.
 *
 * Not a linking teaser: a self-contained block with an eyebrow, title,
 * optional description, a primary stat + supporting stats (count-up animated),
 * and an optional strategy list. Tone-flips across ink / jade / paper.
 */
export const caseStudyCard: MarketingPatternSpec = {
	slug: 'case-study-card',
	name: 'CaseStudyCard',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A self-contained, stat-led proof card — eyebrow, title, optional description, a lead stat plus supporting stats (count-up animated), and an optional strategy list. Dark by default (ink), with jade and paper tones. It is a presentational block, not a link to a case-study page.',

	source: 'src/components/slide/CaseStudyCard.astro',
	sourceNote: 'Tones paper | ink (default) | jade; variants default | hero-stat. Stats animate via CountUp when a `countTo` is given. No href — the card does not link.',

	whenToUse:
		'Reach for CaseStudyCard to make a result concrete — one headline metric backed by a few supporting stats, optionally with the strategies that produced them. Use the ink/jade tone as an emphasis band between light sections; use the paper tone when it sits inside an already-light section. For a single spoken quote use TestimonialCard; for a row of bare metrics use TrustStatBand or StatTrio.',

	recipe: [
		'Pick a tone: `ink` (default — `--m-near-black` surface, paper text), `jade` (`--m-jade-deep` surface, paper text), or `paper` (`--m-paper` surface + hairline border, ink text). Ink/jade read as an emphasis band; paper sits inside a light section.',
		'On dark tones the accent is the lifted mint (≈ #5BA69D); on paper it is jade-deep (`--m-jade-deep` / #2B605C). The eyebrow and strategy values use that accent.',
		'Lead with an eyebrow (mono, accent), then the title, then an optional description (paper at ~0.75 on dark, `--m-fg-muted` on light).',
		'Split the stats: the first is the primary (largest), the rest fill a responsive grid — `grid-cols-2` for 2 stats, `grid-cols-2 sm:grid-cols-4` for 4, else a 3-up. Each stat is a value (display, tabular), a label (muted), and an optional detail line.',
		'Animate numeric stats with CountUp on scroll-in via a `countTo` value; snap to final under reduced-motion.',
		'Optionally append a strategy list — label (strong) + value (accent) rows — for the levers behind the numbers.',
		'Separate regions with a tone-aware hairline: rgba(250,249,245,0.12) on dark, rgba(15,20,18,0.08) on light. No internal cards — it is one surface.',
	],

	dom: `<article class="case-study" data-tone="ink">
  <p class="eyebrow">Case study</p>
  <h3 class="title">Northwind cut parcel spend 18%</h3>
  <p class="desc">Audit + renegotiation across two carriers.</p>
  <div class="stats">
    <div class="stat stat--primary"><span class="value">$2.4M</span><span class="label">recovered</span></div>
    <div class="stat"><span class="value">18%</span><span class="label">lower rate</span></div>
    <div class="stat"><span class="value">6wk</span><span class="label">to close</span></div>
  </div>
  <ul class="strategies">
    <li><span class="s-label">Lead strategy</span><span class="s-value">DIM reweigh</span></li>
  </ul>
</article>`,

	tokensUsed: [
		{ part: 'surface (ink)', role: '--m-near-black', notes: 'Default dark tone.' },
		{ part: 'surface (jade)', role: '--m-jade-deep', notes: 'Alternate dark tone.' },
		{ part: 'surface (paper)', role: '--m-paper', notes: 'Light tone + hairline border.' },
		{ part: 'text on dark', role: '(literal)', notes: 'Paper #FAF9F5; muted = paper at ~0.6–0.75.' },
		{ part: 'text on paper', role: '--m-fg-strong', notes: 'Body/labels use --m-fg-muted.' },
		{ part: 'accent (eyebrow, strategy value)', role: '(literal)', notes: 'Mint ≈ #5BA69D on dark; --m-jade-deep (#2B605C) on paper.' },
		{ part: 'hairline', role: '(literal)', notes: 'rgba(250,249,245,0.12) dark / rgba(15,20,18,0.08) light.' },
	],

	dimensions: [
		{ name: 'Tones', value: 'ink (default) · jade · paper' },
		{ name: 'Variants', value: 'default · hero-stat' },
		{ name: 'Stats', value: 'primary + supporting; grid 2 / 2→4 / 3-up by count' },
		{ name: 'Stat values', value: 'display face, tabular-nums, CountUp on scroll-in' },
		{ name: 'Strategies', value: 'optional label + accent-value rows' },
		{ name: 'Linking', value: 'none — not a teaser/link' },
	],

	variants: [
		{ name: 'default', description: 'Eyebrow + title + stat grid (+ optional description / strategies).' },
		{ name: 'hero-stat', description: 'Leads with an oversized primary stat for a single dominant number.' },
		{ name: 'tone: ink / jade / paper', description: 'Dark emphasis (ink/jade) or in-section light (paper).' },
	],

	props: [
		{ name: 'eyebrow', type: 'string', default: "'Case study'", description: 'Mono kicker above the title.' },
		{ name: 'title', type: 'string', required: true, description: 'The headline result.' },
		{ name: 'description', type: 'string', description: 'Optional supporting line.' },
		{ name: 'stats', type: '{ label: string; value: string; detail?: string; countTo?: number }[]', required: true, description: 'First entry is the primary stat; the rest fill the grid. `countTo` enables CountUp.' },
		{ name: 'strategies', type: '{ label: string; value: string }[]', description: 'Optional levers-behind-the-numbers list.' },
		{ name: 'tone', type: "'paper' | 'ink' | 'jade'", default: "'ink'", description: 'Surface tone.' },
		{ name: 'variant', type: "'default' | 'hero-stat'", default: "'default'", description: 'Layout emphasis.' },
	],

	nonFeatures: [
		'Not a link — the card has no href and does not navigate to a case-study page; it presents the proof inline.',
		'Not light by default — the default tone is ink (dark); reach for the paper tone deliberately.',
		'No internal cards — stats and strategies sit on the one surface, separated by a hairline, not boxed.',
	],

	gotchas: [
		'The accent differs by tone: mint (~#5BA69D) on ink/jade, jade-deep on paper — do not use the light-mode jade on a dark card.',
		'Pick the stat grid by count (2 → 2-col, 4 → 2→4-col, else 3-up); an arbitrary column count leaves orphans on mobile.',
		'CountUp must land on the real value in the DOM and snap under reduced-motion — never leave a mid-animation number as the accessible value.',
	],

	accessibility: [
		'Title is an `<h3>` under the section `<h2>`; keep the outline intact.',
		'Animated stats expose the final value to assistive tech, not the count-up frames.',
		'Tone is conveyed by contrast-checked color pairs (paper on ink/jade, ink on paper) — not by color alone.',
	],

	example: `<article class="cs" data-tone="ink">
  <p class="cs-eyebrow">Case study</p>
  <h3 class="cs-title">Northwind cut parcel spend 18%</h3>
  <div class="cs-stats">
    <div class="cs-stat cs-stat--primary"><span class="v">$2.4M</span><span class="l">recovered</span></div>
    <div class="cs-stat"><span class="v">18%</span><span class="l">lower blended rate</span></div>
    <div class="cs-stat"><span class="v">6wk</span><span class="l">to first credit</span></div>
  </div>
</article>

<style>
  .cs { background: var(--m-near-black); color: #faf9f5; border-radius: 18px; padding: 32px; }
  .cs-eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em;
    text-transform: uppercase; color: #5ba69d; }
  .cs-title { color: #fff; font-family: var(--font-display); font-weight: 200;
    font-size: clamp(24px, 3vw, 34px); margin: 12px 0 24px; }
  .cs-stats { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 24px;
    border-top: 1px solid rgba(250,249,245,0.12); padding-top: 24px; }
  .cs-stat .v { display: block; font-family: var(--font-display); font-size: 30px;
    color: #fff; font-variant-numeric: tabular-nums; }
  .cs-stat--primary .v { font-size: 44px; }
  .cs-stat .l { font-size: 13px; color: rgba(250,249,245,0.6); }
</style>`,
	exampleLang: 'html',

	porting: [
		'A single tone-flipped surface (ink default / jade / paper) with eyebrow, title, optional description, a primary + supporting stat grid (CountUp, tabular), and an optional strategy list.',
		'Accent is mint on dark, jade-deep on paper; regions split by a tone-aware hairline; the card never links.',
	],

	changelog: [
		{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' },
		{ version: 'v0.2.0', date: '2026-06-26', note: 'Rewritten to match the live component: dark-by-default, multi-stat with CountUp, tone variants, non-linking.' },
	],
};
