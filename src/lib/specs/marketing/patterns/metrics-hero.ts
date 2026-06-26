import type { MarketingPatternSpec } from './types.js';

/**
 * MetricsHero — the product-page opener: copy beside a live metrics panel.
 *
 * An asymmetric two-column hero — a jade eyebrow chip, ultralight display
 * headline, sub, CTAs and proof bullets on one side; a product mock frame
 * holding a few live metric tiles on the other. The recurring shape across
 * the product pages (spend, bill-pay, vendor, ad-audit, …).
 */
export const metricsHero: MarketingPatternSpec = {
	slug: 'metrics-hero',
	name: 'MetricsHero',
	category: 'Heroes',
	status: 'stable',
	description:
		'The standard product-page hero — an asymmetric two-column opener pairing the copy (eyebrow chip, ultralight headline, sub, CTAs, proof bullets) with a product mock frame holding a few headline metric tiles (label · value · sub). Each product page skins it with its own metrics, but the shape is shared.',

	source: 'Per-page heroes: SpendManagementMetricsHero / BillPayMetricsHero / VendorManagementMetricsHero / AdAuditMetricsHero (+ the `*-hero-grid` section wrapper)',
	sourceNote: 'The metric tiles are an island; the surrounding two-column layout is page CSS with a shared `.hero-eyebrow` chip.',

	whenToUse:
		'Reach for MetricsHero to open a product page: state the value in words on the left and prove it with three or so live numbers on the right. Use ProductWindowHero when the right side should be a faithful product-UI replica rather than metric tiles; use the plain Hero when there is no panel at all.',

	recipe: [
		'Two-column grid (copy + visual); on the left, lead with the jade `.hero-eyebrow` chip, then an ultralight display H1 (PP Supply Mono ~200, tight tracking, text-wrap: balance), a one-paragraph sub, a CTA row, and a short proof list.',
		'On the right, a product mock frame (rounded, hairline, soft lift shadow) holding the metrics panel.',
		'Metrics panel = 2–4 tiles, each a label (`--m-fg-muted`), a value (display/mono, tabular, large), and an optional sub line (`--m-fg-subtle`). These are the headline proof, not a full table.',
		'Keep the headline column to ~the container measure; the visual takes the wider track on desktop and stacks under the copy on mobile.',
		'Animate the metric values in on load (count-up / fade), respecting reduced-motion (snap to final).',
		'Use the hero on a paper band; the mock frame provides the contrast, so the band stays light.',
	],

	dom: `<section class="metrics-hero">
  <div class="copy">
    <span class="hero-eyebrow">Spend management</span>
    <h1>Every card, every limit, enforced at the swipe.</h1>
    <p class="sub">Give each person the right limit — controlled before purchase, not reconciled after.</p>
    <div class="actions"><a class="btn-primary" href="/apply">Get started</a></div>
    <ul class="proof"><li>No personal guarantee</li><li>Unlimited virtual cards</li></ul>
  </div>
  <div class="visual">
    <div class="mock-frame">
      <div class="metric"><span class="label">Invite → first swipe</span><span class="value">&lt;2 min</span></div>
      <div class="metric"><span class="label">Unauthorised charges</span><span class="value">0</span></div>
      <div class="metric"><span class="label">Visibility</span><span class="value">Real-time</span></div>
    </div>
  </div>
</section>`,

	tokensUsed: [
		{ part: 'eyebrow chip', role: '--m-accent', notes: 'The shared jade .hero-eyebrow marker chip.' },
		{ part: 'headline', role: '--m-fg-strong' },
		{ part: 'sub / proof', role: '--m-fg-muted' },
		{ part: 'mock frame', role: '--m-card', notes: 'Hairline --m-border + soft lift shadow.' },
		{ part: 'metric value', role: '--m-fg-strong', notes: 'Display/mono, tabular-nums.' },
		{ part: 'metric label', role: '--m-fg-muted' },
		{ part: 'metric sub', role: '--m-fg-subtle' },
	],

	dimensions: [
		{ name: 'Columns', value: '2 (copy + visual), asymmetric; stacks on mobile' },
		{ name: 'Headline', value: 'ultralight display ~200, balance-wrapped' },
		{ name: 'Metric tiles', value: '2–4 · label + value + optional sub' },
		{ name: 'Values', value: 'display/mono, tabular, count-up on load' },
		{ name: 'Band', value: 'paper (frame carries the contrast)' },
	],

	variants: [
		{ name: 'metrics panel', description: 'Default — a few metric tiles in a mock frame.' },
		{ name: 'with proof bullets', description: 'Copy column adds a short qualifier list under the CTAs.' },
	],

	props: [
		{ name: 'eyebrow', type: 'string', description: 'Product name in the jade chip.' },
		{ name: 'headline', type: 'string', required: true, description: 'The hero headline (ultralight display).' },
		{ name: 'sub', type: 'string', description: 'One supporting paragraph under the headline.' },
		{ name: 'ctas', type: '{ label: string; href: string }[]', description: 'Primary (+ optional secondary).' },
		{ name: 'proof', type: 'string[]', description: 'Short qualifier bullets.' },
		{ name: 'metrics', type: '{ label: string; value: string; sub?: string }[]', required: true, description: '2–4 headline metric tiles.' },
	],

	nonFeatures: [
		'Not a data table — the panel shows a few headline numbers, not rows of data.',
		'Not centered — it is an asymmetric copy/visual split, not a centered hero.',
		'Copy headline stays on the container measure; only the visual takes the wider track.',
	],

	gotchas: [
		'Use the shared `.hero-eyebrow` chip (jade marker, width:fit-content) — not a plain text eyebrow — so the page openers stay consistent.',
		'Count-up animates to the real value and snaps under reduced-motion; tabular-nums so it does not jitter.',
		'Keep it to ~3 metrics — a metrics hero is the headline proof, not the dashboard; the full data lives further down.',
	],

	accessibility: [
		'One `<h1>` per page in the copy column; the metric tiles are supporting content, not headings.',
		'Animated values expose the final number to assistive tech, not the count-up frames.',
		'CTAs are real links/buttons with visible labels.',
	],

	example: `<section class="mh">
  <div class="mh-copy">
    <span class="mh-eyebrow">Spend management</span>
    <h1 class="mh-title">Every card, every limit, enforced at the swipe.</h1>
    <p class="mh-sub">Give each person the right limit — controlled before purchase, not reconciled after.</p>
  </div>
  <div class="mh-panel">
    <div class="mh-metric"><span class="l">Invite → first swipe</span><b class="v">&lt;2 min</b></div>
    <div class="mh-metric"><span class="l">Unauthorised charges</span><b class="v">0</b></div>
    <div class="mh-metric"><span class="l">Visibility</span><b class="v">Real-time</b></div>
  </div>
</section>

<style>
  .mh { display: grid; gap: 48px; align-items: center; grid-template-columns: 1fr 1fr; }
  .mh-eyebrow { display: inline-block; width: fit-content; font-family: var(--font-mono);
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; padding: 3px 6px;
    border-radius: 1px; background: var(--m-accent); color: #faf9f5; }
  .mh-title { margin: 16px 0 12px; font-family: var(--font-display); font-weight: 200;
    font-size: clamp(30px, 4vw, 52px); line-height: 1.05; letter-spacing: -0.02em;
    text-wrap: balance; color: var(--m-fg-strong); }
  .mh-sub { color: var(--m-fg-muted); max-width: 42ch; }
  .mh-panel { background: var(--m-card); border: 1px solid var(--m-border); border-radius: 16px;
    padding: 24px; display: grid; gap: 18px; box-shadow: 0 26px 56px -38px rgba(15,20,18,0.42); }
  .mh-metric { display: flex; flex-direction: column; gap: 2px; }
  .mh-metric .l { font-size: 13px; color: var(--m-fg-muted); }
  .mh-metric .v { font-family: var(--font-display); font-weight: 200; font-size: 30px;
    color: var(--m-fg-strong); font-variant-numeric: tabular-nums; }
  @media (max-width: 760px) { .mh { grid-template-columns: 1fr; } }
</style>`,
	exampleLang: 'html',

	porting: [
		'Asymmetric two-column hero: copy (jade chip + ultralight balanced H1 + sub + CTAs + proof) beside a carded mock frame of 2–4 metric tiles (label · tabular value · sub).',
		'Count-up the values on load; keep the headline on the container measure; stack on mobile; paper band.',
	],

	changelog: [{ version: 'v0.2.0', date: '2026-06-26', note: 'First documented — the shared product-page metrics hero.' }],
};
