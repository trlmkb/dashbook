import type { MarketingPatternSpec } from './types.js';

/**
 * TrustStatBand — the proof band: one rolling lead metric + supporting pillars.
 *
 * A full-width band that leads with a single large rolling-counter stat, backs
 * it with a row of supporting pillar stats, and grounds it with a carrier/logo
 * strip and a "live"/powered-by indicator. The recurring "here's the proof" row.
 */
export const trustStatBand: MarketingPatternSpec = {
	slug: 'trust-stat-band',
	name: 'TrustStatBand',
	category: 'Media & proof',
	status: 'stable',
	description:
		'The proof band — a full-width row that leads with one large rolling-counter metric, supports it with a set of pillar stats (value + label + sub), and grounds it with a carrier/logo strip plus a "live"/powered-by indicator. The standard "here is the evidence" moment on product pages.',

	source: 'Live ship-design `.mk-trust*` band (trust bar island)',
	sourceNote: 'The lead counter animates (rolling/odometer) into view; the pillars and carrier strip are static.',

	whenToUse:
		'Reach for TrustStatBand once per page to anchor credibility — a recovered-dollars or volume figure as the hero stat, a few supporting pillars, and the carriers/platforms it works across. Use StatTrio for three equal stats with no lead metric, or LogoRail when you only need the logo strip.',

	recipe: [
		'Lay the band in two zones: a top row (the lead counter + pillars) and a bottom row (carrier strip + powered-by). Both sit on a paper or cream band.',
		'Lead metric: a large rolling counter — value (display face, ~clamp(40–64px)), a label beneath, and an optional trend chip. Animate the value on first scroll-in (count-up), respecting reduced-motion (snap to final).',
		'Pillars: a row of 2–4 supporting stats, each a value (`--m-fg-strong`, mono/tabular), a label (`--m-fg-muted`), and an optional sub line (`--m-fg-subtle`). Separate from the lead by weight, not a box.',
		'Carrier/coverage strip: a muted row of partner marks (`--m-fg-muted`), de-framed — no tiles, just the marks.',
		'Powered-by: a small mono label with a pulsing accent dot (`--m-accent` / mint on dark) signalling "live".',
		'Keep everything on the band surface — pillars and counters are not carded; tone separation comes from type scale and the hairline, not borders.',
	],

	dom: `<section class="mk-trust">
  <div class="mk-trust-top">
    <div class="mk-trust-counter">
      <span class="mk-trust-counter-value">$2.4M</span>
      <span class="mk-trust-counter-label">recovered this year</span>
      <span class="mk-trust-counter-trend">+18% MoM</span>
    </div>
    <div class="mk-trust-pillars">
      <div class="mk-trust-pillar">
        <span class="mk-trust-pillar-value">8</span>
        <span class="mk-trust-pillar-label">KPIs audited</span>
        <span class="mk-trust-pillar-sub">per carrier</span>
      </div>
      <!-- more pillars -->
    </div>
  </div>
  <div class="mk-trust-bottom">
    <div class="mk-trust-carriers"><span class="mk-trust-carrier">UPS</span>…</div>
    <span class="mk-trust-powered"><span class="mk-trust-powered-dot"></span> Live</span>
  </div>
</section>`,

	tokensUsed: [
		{ part: 'counter value', role: '--m-fg-strong', notes: 'Display face, tabular numerals.' },
		{ part: 'counter label', role: '--m-fg-muted' },
		{ part: 'trend chip', role: '--m-accent', notes: 'Positive trend in accent/mint.' },
		{ part: 'pillar value', role: '--m-fg-strong' },
		{ part: 'pillar label', role: '--m-fg-muted' },
		{ part: 'pillar sub', role: '--m-fg-subtle' },
		{ part: 'carrier marks', role: '--m-fg-muted', notes: 'De-framed, no tiles.' },
		{ part: 'powered dot', role: '--m-accent', notes: 'Pulsing "live" dot.' },
	],

	dimensions: [
		{ name: 'Lead counter', value: 'clamp(40px, 6vw, 64px), display, tabular' },
		{ name: 'Pillars', value: '2–4, value + label + optional sub' },
		{ name: 'Counter animation', value: 'count-up on first scroll-in (reduced-motion: snap)' },
		{ name: 'Layout', value: 'top row (counter + pillars) over bottom row (carriers + live)' },
		{ name: 'Surface', value: 'paper or cream band — no cards' },
	],

	variants: [
		{ name: 'full', description: 'Lead counter + pillars + carrier strip + live indicator.' },
		{ name: 'metrics-only', description: 'Lead counter + pillars, no carrier strip — when there are no logos to show.' },
	],

	props: [
		{ name: 'counter', type: '{ value: string; label: string; trend?: string }', required: true, description: 'The lead rolling-counter metric.' },
		{ name: 'pillars', type: '{ value: string; label: string; sub?: string }[]', required: true, description: '2–4 supporting stats.' },
		{ name: 'carriers', type: 'string[]', description: 'Optional partner/carrier marks for the strip.' },
	],

	nonFeatures: [
		'Not a card grid — stats sit directly on the band; the lead metric outweighs the pillars by type scale, not by a box.',
		'Not StatTrio — TrustStatBand has a single dominant lead metric; StatTrio is three equal stats.',
		'Carrier marks are de-framed — no logo tiles, no borders.',
	],

	gotchas: [
		'Animate the counter only on first scroll-in, once; do not re-run on every intersection, and snap to the final value under reduced-motion.',
		'Keep the lead metric clearly dominant — if a pillar competes with it in size, the "one headline number" read is lost.',
		'Use tabular-nums on every figure so the counter does not jitter mid-animation.',
	],

	accessibility: [
		'The animated counter must end on the real value in the DOM (count-up is presentational); screen readers should get the final number, not the in-between frames.',
		'The "live" dot is decorative — label the indicator in text ("Live"), not by colour alone.',
	],

	example: `<section class="trust">
  <div class="top">
    <div class="counter">
      <span class="value">$2.4M</span>
      <span class="label">recovered this year</span>
    </div>
    <div class="pillars">
      <div class="pillar"><span class="v">8</span><span class="l">KPIs audited</span></div>
      <div class="pillar"><span class="v">99.9%</span><span class="l">uptime</span></div>
      <div class="pillar"><span class="v">48h</span><span class="l">to first finding</span></div>
    </div>
  </div>
</section>

<style>
  .top { display: flex; flex-wrap: wrap; align-items: baseline; gap: 48px; }
  .counter .value { font-family: var(--font-display); font-size: clamp(40px, 6vw, 64px);
    color: var(--m-fg-strong); font-variant-numeric: tabular-nums; display: block; }
  .counter .label { color: var(--m-fg-muted); }
  .pillars { display: flex; gap: 40px; }
  .pillar .v { display: block; font-family: var(--font-mono); font-size: 24px;
    color: var(--m-fg-strong); font-variant-numeric: tabular-nums; }
  .pillar .l { color: var(--m-fg-muted); font-size: 13px; }
</style>`,
	exampleLang: 'html',

	porting: [
		'A band with one large rolling-counter lead metric (display face, tabular, count-up on scroll-in) plus a row of supporting pillar stats, optionally a de-framed carrier strip and a "live" dot.',
		'Everything sits on the band surface — separation is by type scale and the hairline, never card borders.',
	],

	changelog: [{ version: 'v0.2.0', date: '2026-06-25', note: 'First documented — the live trust/proof band.' }],
};
