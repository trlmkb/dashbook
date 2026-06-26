import type { MarketingPatternSpec } from './types.js';

/**
 * CalculatorIsland — the slider-driven "what could you save" estimator section.
 *
 * An alternate-band section: an intro column (eyebrow, headline, qualifier
 * chips) beside a card holding a range slider whose value drives a live result.
 * The slider track fills via a `--m-slider-pct` custom property set from JS.
 */
export const calculatorIsland: MarketingPatternSpec = {
	slug: 'calculator-island',
	name: 'CalculatorIsland',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A slider-driven estimator section — an intro column (eyebrow, headline, qualifier chips) beside a card with a range slider that drives a live result. The recurring "move the slider to your spend" moment (recovery / savings / cashback calculators).',

	source: 'src/components/shipping/ShipCalculator.tsx (and ExpenseTimeCalculator / AdCreditCalculator)',
	sourceNote: 'A React island: one slider state drives the displayed result; the track fill is a `--m-slider-pct` custom property set inline from JS.',

	whenToUse:
		'Reach for CalculatorIsland to turn an abstract benefit into a personalised number — drop in a spend slider and show the estimated saving/cashback live. Keep it to one input; if you need several fields it is a form, not this pattern. Use a static StatTrio when there is nothing to personalise.',

	recipe: [
		'Place it as an alternate-band section (cream) so it reads as an interactive interlude.',
		'Two columns: an intro (mono eyebrow, display headline, a short sub, and qualifier "always free" chips) beside the calculator card.',
		'The card is the standard card recipe — `--m-card` surface, `--m-border` hairline, the soft lift shadow — holding a slider block: a label + the current value (mono, tabular) above a full-width `<input type="range">`.',
		'Fill the slider track to the thumb with a gradient stop at `var(--m-slider-pct)` — set that custom property inline from JS as `${pct}%` on input, splitting `--m-accent` (filled) from `--m-border-strong` (track).',
		'Compute the result live from the slider value and render it large (display face, tabular) with a plain-language caption; keep estimates clearly framed as estimates.',
		'Optionally show a risk/assumption note and a disclaimer line beneath, in `--m-fg-subtle`.',
		'Hydrate as an island (client-side) — it is interactive; everything else on the page stays static.',
	],

	dom: `<section class="mk-calc-section">
  <div class="mk-calc-layout">
    <div class="mk-calc-head">
      <span class="eyebrow">See what comes back</span>
      <h2>Estimate your recovery.</h2>
      <div class="mk-calc-chips"><span class="mk-calc-chip">Always free</span></div>
    </div>
    <div class="mk-card mk-calc-card">
      <div class="mk-calc-slider-block">
        <label for="spend">Monthly spend</label>
        <span class="mk-calc-slider-val">$40,000</span>
        <input id="spend" type="range" class="mk-calc-slider" style="--m-slider-pct: 42%" />
      </div>
      <div class="mk-calc-result">$1,440 <span>est. recovered / mo</span></div>
    </div>
  </div>
</section>`,

	tokensUsed: [
		{ part: 'section band', role: '--m-cream', notes: 'Alternate light band.' },
		{ part: 'card surface', role: '--m-card' },
		{ part: 'card border', role: '--m-border' },
		{ part: 'slider fill', role: '--m-accent', notes: 'Track filled to var(--m-slider-pct).' },
		{ part: 'slider track', role: '--m-border-strong', notes: 'Unfilled remainder past the thumb.' },
		{ part: 'value / result', role: '--m-fg-strong', notes: 'Mono, tabular-nums.' },
		{ part: 'disclaimer', role: '--m-fg-subtle' },
	],

	dimensions: [
		{ name: 'Layout', value: 'intro column + calculator card (stacks on mobile)' },
		{ name: 'Band', value: 'cream (alternate)' },
		{ name: 'Slider fill', value: 'linear-gradient split at var(--m-slider-pct, 50%)' },
		{ name: 'Result', value: 'display face, tabular-nums' },
		{ name: 'Hydration', value: 'client island (interactive)' },
	],

	variants: [
		{ name: 'recovery', description: 'Spend slider → estimated recovered dollars (shipping/ads audit).' },
		{ name: 'cashback', description: 'Spend slider → estimated cashback (rewards / meta cashback).' },
		{ name: 'time-saved', description: 'Volume slider → hours saved (expense / accounting).' },
	],

	props: [
		{ name: 'headline', type: 'string', required: true, description: 'The section headline.' },
		{ name: 'sliderLabel', type: 'string', required: true, description: 'Label for the single input (e.g. "Monthly spend").' },
		{ name: 'min / max / step', type: 'number', description: 'Range bounds for the slider.' },
		{ name: 'chips', type: 'string[]', description: 'Qualifier chips (e.g. "Always free").' },
		{ name: 'compute', type: '(value: number) => string', required: true, description: 'Maps the slider value to the displayed result.' },
	],

	nonFeatures: [
		'Not a multi-field form — exactly one slider input; more inputs make it a form, a different pattern.',
		'No submit/POST — the result is computed client-side and live; nothing is sent.',
		'Not a static stat — if there is nothing for the visitor to vary, use StatTrio instead.',
	],

	gotchas: [
		'Drive the track fill with a `--m-slider-pct` custom property set inline from JS (`${pct}%`) and read it in the `linear-gradient` with a `, 50%` fallback — do not recompute the gradient string per render.',
		'Frame results as estimates (caption + disclaimer); a hard number implies a guarantee.',
		'It must hydrate (client island) — a server-only render leaves a dead slider.',
		'Use tabular-nums on the value and result so the figure does not reflow as you drag.',
	],

	accessibility: [
		'Use a native `<input type="range">` with an associated `<label>`; native range is keyboard- and AT-operable for free.',
		'Reflect the current value in text next to the slider (not colour/position alone) so it is announced.',
	],

	example: `<section class="calc">
  <div class="head">
    <span class="eyebrow">See what comes back</span>
    <h2>Estimate your recovery.</h2>
  </div>
  <div class="card">
    <div class="slider-top">
      <label for="spend">Monthly spend</label>
      <span class="val">$40,000</span>
    </div>
    <input id="spend" type="range" min="0" max="100" value="42" class="slider" style="--m-slider-pct: 42%" />
    <div class="result">$1,440 <span>est. recovered / mo</span></div>
  </div>
</section>

<style>
  .card { background: var(--m-card); border: 1px solid var(--m-border);
    border-radius: 16px; padding: 28px; }
  .slider-top { display: flex; justify-content: space-between; }
  .val { font-family: var(--font-mono); color: var(--m-fg-strong); font-variant-numeric: tabular-nums; }
  .slider { width: 100%; appearance: none; height: 6px; border-radius: 999px;
    background: linear-gradient(to right,
      var(--m-accent) var(--m-slider-pct, 50%),
      var(--m-border-strong) var(--m-slider-pct, 50%)); }
  .result { margin-top: 20px; font-family: var(--font-display); font-size: 32px;
    color: var(--m-fg-strong); font-variant-numeric: tabular-nums; }
  .result span { font-family: var(--font-sans); font-size: 13px; color: var(--m-fg-muted); }
</style>`,
	exampleLang: 'html',

	porting: [
		'An alternate-band section: intro column beside a card with one `<input type="range">` whose value computes a live result.',
		'Track fill is a `linear-gradient` split at `var(--m-slider-pct)`, set inline from JS; the result uses the display face with tabular numerals and an estimate caption.',
		'Hydrate as a client island — it is the one interactive thing on the page.',
	],

	changelog: [{ version: 'v0.2.0', date: '2026-06-25', note: 'First documented — the live slider calculator section.' }],
};
