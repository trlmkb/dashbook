import type { MarketingPatternSpec } from './types.js';

/**
 * ProductWindowHero — a hero visual that is a faithful product-UI window.
 *
 * The hero's visual side is a browser/app window (chrome bar with traffic-light
 * dots, a faux URL, a "live" dot) that auto-cycles through a few real product
 * screens — transactions, wallet, a pipeline, cards. Used as the credit-cards /
 * rewards hero. The on-brand alternative to a flat screenshot.
 */
export const productWindowHero: MarketingPatternSpec = {
	slug: 'product-window-hero',
	name: 'ProductWindowHero',
	category: 'Heroes',
	status: 'stable',
	description:
		'A hero whose visual is a faithful product-UI window — a chrome bar (traffic-light dots, faux URL, live dot) over a stage that auto-cycles through a few real product screens (transactions, wallet, pipeline, cards), with position dots. Pairs with the standard hero copy column.',

	source: 'src/components/card/CardHeroWindow.tsx',
	sourceNote: 'A client island: slides cross-fade on an interval; `.chw-*` classes. Used on /credit-cards (and the rewards card hero).',

	whenToUse:
		'Reach for ProductWindowHero when the strongest proof is the product itself — show the real UI cycling through its best moments rather than one static screenshot. Use MetricsHero when a few headline numbers tell the story better than the UI; use ProductShot for a single, non-cycling framed mock.',

	recipe: [
		'Build a window shell: rounded card (`--m-card`, hairline `--m-border`, deep lift shadow), with a chrome bar on top — three muted traffic-light dots, a faux URL in mono (`app.dash.fi/…`), and a small "live" dot (`--m-accent`) that pulses.',
		'Below the chrome is a fixed-height stage; each slide is absolutely positioned and cross-fades (opacity + small translateY) on a timer, one shown via a `data-on` flag.',
		'Author 3–5 slides from real product surfaces — a transactions list, a rewards wallet, a process pipeline, a cards list — each built from the product tokens, not lorem.',
		'Add position dots beneath the window; the active dot widens and uses `--m-accent`. Dots are real controls (jump to a slide).',
		'Auto-advance on an interval; the typical cadence is a few seconds per slide, looping. Pause is optional but nice on hover.',
		'Sit the window in the hero visual column beside the copy (the standard hero split); it is the visual, not the whole hero.',
		'Respect reduced-motion: stop the auto-cycle (or cross-fade instantly) and let the dots drive.',
	],

	dom: `<div class="chw">
  <div class="chw-window">
    <div class="chw-chrome">
      <span class="chw-dot"></span><span class="chw-dot"></span><span class="chw-dot"></span>
      <span class="chw-chrome-name">app.dash.fi/cards</span>
      <span class="chw-live"><span class="chw-live-dot"></span> Live</span>
    </div>
    <div class="chw-stage">
      <div class="chw-slide" data-on="true"><!-- transactions --></div>
      <div class="chw-slide"><!-- wallet --></div>
    </div>
  </div>
  <div class="chw-dots"><button data-on="true"></button><button></button></div>
</div>`,

	tokensUsed: [
		{ part: 'window surface', role: '--m-card' },
		{ part: 'window border / chrome divider', role: '--m-border' },
		{ part: 'chrome dots / inactive position dots', role: '--m-border-strong' },
		{ part: 'faux URL', role: '--m-fg-subtle', notes: 'Mono.' },
		{ part: 'live dot / active position dot', role: '--m-accent' },
		{ part: 'slide content', role: '(product tokens)', notes: 'Built from real product surfaces, not placeholder text.' },
	],

	dimensions: [
		{ name: 'Chrome', value: '3 traffic dots + faux URL + pulsing live dot' },
		{ name: 'Stage', value: 'fixed height; slides absolutely positioned, cross-fade' },
		{ name: 'Slides', value: '3–5 real product screens' },
		{ name: 'Cadence', value: 'few seconds/slide, looping' },
		{ name: 'Position dots', value: 'active widens + --m-accent; clickable' },
	],

	variants: [
		{ name: 'auto-cycle', description: 'Default — slides advance on a timer with position dots.' },
		{ name: 'manual', description: 'Dots drive the slide; no auto-advance (reduced-motion fallback).' },
	],

	props: [
		{ name: 'slides', type: 'ReactNode[] | { url: string; content: … }[]', required: true, description: 'The product screens to cycle, with the chrome URL per slide.' },
		{ name: 'intervalMs', type: 'number', description: 'Auto-advance cadence.' },
	],

	nonFeatures: [
		'Not a static screenshot — the point is the cycling product UI; for one frame use ProductShot.',
		'Not lorem — slides are built from real product surfaces/tokens so the window reads as the actual app.',
		'Not the whole hero — it is the visual column; the copy column is the standard hero copy.',
	],

	gotchas: [
		'Fix the stage height so cross-fading slides of different lengths do not jump the layout.',
		'Auto-advance must pause/stop under reduced-motion; keep the position dots operable so it never traps a user on one slide.',
		'Keep the live dot decorative-but-labelled ("Live") — colour alone is not the signal.',
	],

	accessibility: [
		'Position dots are `<button>`s with the active one marked; the cycler is keyboard-operable and does not auto-advance under reduced-motion.',
		'Chrome (dots, URL, live indicator) is decorative — `aria-hidden`; the meaningful content is the slides.',
		'The window is the hero visual; the page `<h1>` lives in the copy column, not inside the window.',
	],

	example: `<div class="pw">
  <div class="pw-chrome">
    <span class="d"></span><span class="d"></span><span class="d"></span>
    <span class="pw-url">app.dash.fi/transactions</span>
  </div>
  <div class="pw-stage">
    <div class="pw-row"><span>Amazon Web Services</span><b>$2,480.00</b></div>
    <div class="pw-row"><span>Google Ads</span><b>$960.50</b></div>
  </div>
</div>

<style>
  .pw { background: var(--m-card); border: 1px solid var(--m-border); border-radius: 16px;
    overflow: hidden; box-shadow: 0 45px 90px -35px rgba(18,59,57,0.5); }
  .pw-chrome { display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px;
    border-bottom: 1px solid var(--m-border); }
  .pw-chrome .d { width: 10px; height: 10px; border-radius: 999px; background: var(--m-border-strong); }
  .pw-url { margin-left: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--m-fg-subtle); }
  .pw-stage { padding: 18px 22px; }
  .pw-row { display: flex; justify-content: space-between; padding: 12px 0;
    border-bottom: 1px solid var(--m-border); }
  .pw-row b { font-family: var(--font-mono); color: var(--m-fg-strong); font-variant-numeric: tabular-nums; }
</style>`,
	exampleLang: 'html',

	porting: [
		'A window shell (chrome bar: traffic dots + faux URL + pulsing live dot) over a fixed-height stage that cross-fades 3–5 real product screens on a timer, with clickable position dots.',
		'Built from product tokens; pauses/stops under reduced-motion; sits in the hero visual column beside the copy.',
	],

	changelog: [{ version: 'v0.2.0', date: '2026-06-26', note: 'First documented — the cycling product-UI window hero (CardHeroWindow).' }],
};
