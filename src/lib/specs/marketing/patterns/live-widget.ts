import type { MarketingPatternSpec } from './types.js';

/**
 * Live widget (`marketing_live_widget`).
 *
 * An interactive product-mock island — React `client:visible` / `client:idle`
 * in production — styled entirely off the `--m-*` semantic tokens so it re-themes
 * with its surface (including `[data-marketing-dark]`). Every displayed figure is
 * derived from state; nothing is hardcoded to imply it updates when it doesn't.
 * CarrierBrief and ContractAuditMock are real instances of this pattern.
 */
export const liveWidget: MarketingPatternSpec = {
	slug: 'live-widget',
	name: 'Live widget',
	category: 'Building blocks',
	status: 'stable',
	toolId: 'marketing_live_widget',
	description:
		'An interactive product-mock island styled entirely off `--m-*` tokens so it re-themes with the surface (including `[data-marketing-dark]`). All displayed figures — bars, counters, values — are derived from state; nothing is hardcoded to fake an update.',

	source: '/shipping islands: ShipForensicWidget · ShipCalculator · ShipPillars feeds · ShipTrustBar (count-up); also slide/ CarrierBrief, ContractAuditMock',

	whenToUse:
		'When a section needs a small, believable slice of the product — a recovered-savings counter, an audit feed, a mini chart — that animates and reads as "live". CarrierBrief and ContractAuditMock are the reference instances. Reach for the scale-to-fit product shot instead when you want a static, pixel-crisp full screen rather than a moving widget.',

	recipe: [
		'Mount it as an island — `client:visible` (or `client:idle`) in production — so it hydrates only when it scrolls into view.',
		'Style every part off `--m-*` semantic roles — surfaces, text, borders, accent — so the widget re-themes with the surface, including under `[data-marketing-dark]`.',
		'Derive ALL displayed figures from state — bar heights, counters, values all read from a single source array; never hardcode a bar or number that implies it updates.',
		'Keep semantic colours meaningful: money/positive = jade (`--m-positive`), negative/overcharge = ink (`--m-negative`, never red), caution = amber (`--m-warn`).',
		'Animate subtly — a count-up, a bar grow, a soft pulse on a live dot — and desync per item so it reads organic, not mechanical.',
		'Honour `prefers-reduced-motion: reduce`: snap to final values, drop the count-up and any looped pulse.',
	],

	dom: `<div class="m-live" data-live-widget>            <!-- island: client:visible -->
  <div class="m-live-head">
    <span class="m-live-dot" aria-hidden="true"></span>
    Savings recovered
  </div>
  <p class="m-live-value">{formatted}</p>     <!-- derived from state -->
  <div class="m-live-bars">
    <!-- each bar height = value / max, from the state array -->
    <span class="m-live-bar" style="height: 64%"></span>
  </div>
</div>`,

	tokensUsed: [
		{ part: 'surface', role: '--m-card', notes: 'Widget panel; re-themes under [data-marketing-dark].' },
		{ part: 'border', role: '--m-border', notes: 'Hairline frame.' },
		{ part: 'value + bars', role: '--m-positive', notes: 'Money/savings = jade. Derived from state, never hardcoded.' },
		{ part: 'label', role: '--m-fg-muted', notes: 'Header + secondary text.' },
		{ part: 'negative figure', role: '--m-negative', notes: 'Overcharge/decline = ink, never red.' },
	],

	dimensions: [
		{ name: 'Surface', value: '--m-card', notes: 'On a 1px --m-border, faint lift.' },
		{ name: 'Hydration', value: 'client:visible / idle', notes: 'Island mounts on scroll-in.' },
		{ name: 'Bars', value: 'height = value / max', notes: 'Every bar derived from the state array.' },
		{ name: 'Count-up', value: '~800–1200ms', notes: 'Disabled under reduced motion.' },
	],

	variants: [
		{ name: 'savings feed', description: 'The default shape — a value + bar/counter feed (CarrierBrief, ContractAuditMock).' },
		{
			name: 'term-selector',
			description:
				'A Net-1 → Net-60 term picker (a segmented control or slider) drives the recomputed figures live — the /corporate-card instance. The term choice is the only input; every displayed number (rate, float, savings) re-derives from it.',
		},
		{
			name: 'tier-slider',
			description:
				'A single slider (spend tier or cashback tier) recomputes the reward/cashback figure as it drags — the /meta-cashback instance. Same one-source-of-truth rule applies: the slider value is state, the displayed figure is derived, never a lookup table of pre-rendered strings.',
		},
	],

	props: [
		{ name: 'data', type: 'Array<{ label; value }>', required: true, description: 'The source figures; every bar/counter derives from this. Signature pulled from the brief — verify against the website source.' },
		{ name: 'tone', type: "'positive' | 'negative' | 'accent'", default: "'positive'", description: 'Semantic colourway for the money figure (positive = jade, negative = ink).' },
		{ name: 'animate', type: 'boolean', default: 'true', description: 'Run the count-up / bar grow; auto-off under reduced motion.' },
	],

	nonFeatures: [
		'Not hardcoded — bars and counters always derive from state; a fixed bar that implies it updates is the anti-pattern this exists to prevent.',
		'No raw hex or per-widget palette — colour comes only from `--m-*` roles, so the widget re-themes with the surface.',
		'No red for money — negative/overcharge is monochrome ink; money/savings is jade.',
	],

	gotchas: [
		'If any value is hardcoded the widget lies the moment the surrounding data changes — keep one source array and derive every figure (and bar height) from it.',
		'Style off `--m-*` only — a single literal colour breaks the `[data-marketing-dark]` re-theme. The dashbook preview is Svelte while production is React; the token + state contract is identical either way.',
	],

	motion: [
		'Subtle count-up + bar grow on mount, plus an optional pulsing live dot, desynced per item.',
		'Under `prefers-reduced-motion: reduce`: snap to final values and drop the count-up and the pulse.',
	],

	accessibility: [
		'Expose the real value as text (not colour alone) and label the widget; the live dot is decorative (`aria-hidden`).',
		'Reduced motion shows the final state immediately — no count-up, no loop.',
	],

	example: `// island in production: <LiveWidget client:visible data={rows} tone="positive" />
const [n, setN] = useState(0);
useEffect(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(target);
  // …count-up to target…
}, [target]);

<div class="m-live">
  <p class="m-live-value">{format(n)}</p>          {/* derived from state */}
  {rows.map((r) => (
    <span class="m-live-bar" style={{ height: (r.value / max) * 100 + '%' }} />
  ))}
</div>

/* colour comes only from roles → re-themes under [data-marketing-dark] */
.m-live { background: var(--m-card); border: 1px solid var(--m-border); }
.m-live-value, .m-live-bar { color: var(--m-positive); background: var(--m-positive); }`,
	exampleLang: 'tsx',

	porting: [
		'Mount as an island (client:visible/idle). Hold figures in one state source; derive every counter and bar height from it.',
		'Colour from `--m-*` roles only (re-themes under [data-marketing-dark]); money = jade, negative = ink; subtle count-up/bar grow that respects reduced motion.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
