import type { MarketingPatternSpec } from './types.js';

/**
 * FormCapture — an inline email-capture form, and a HubSpot-embedded
 * multi-field application form.
 *
 * Two genuinely different mechanisms share the "form" job on dash.fi:
 * (1) a bespoke inline `<form method="get">` with a single email input,
 * used on the shipping-audit product hero and inside the shipping
 * calculator's CTA row — it navigates to `app.dash.fi/signup` rather than
 * submitting via JS; and (2) a third-party HubSpot form embed (an iframe
 * loaded by `js.hsforms.net`), used both inline in a card on the partner
 * page and inside a native `<dialog>` modal on the Growth Network page.
 * The HubSpot embed's field markup is opaque — it renders inside an
 * iframe Dash.fi does not control or template.
 */
export const formCapture: MarketingPatternSpec = {
	slug: 'form-capture',
	name: 'FormCapture',
	category: 'CTAs',
	status: 'stable',
	description:
		'Two form mechanisms: a bespoke single-field email capture (GET-action, navigates to signup) seen on the shipping-audit hero and calculator CTA; and a third-party HubSpot form embed (an iframe) used inline on the partner page and inside a modal dialog on the Growth Network page.',

	source:
		'src/components/shipping/ShipHero.astro + src/components/shipping/ShipCalculator.tsx (single-field email capture); src/components/growthnetwork/ApplyDialog.astro + src/pages/partner.astro#partner-form (HubSpot-embedded application form)',
	sourceNote:
		'The HubSpot embed variant only renders a `<div class="hs-form-frame">` target plus a loader script (`js.hsforms.net/forms/embed/46814392.js`) — the actual field count, labels, and validation live inside the HubSpot iframe and are not present in the dash.fi repo. Documented here as an embed shape, not a field-by-field recipe.',

	sourceRevision: 'a5be701',
	lastVerifiedAt: '2026-07-20',
	verificationStatus: 'partial',

	whenToUse:
		'Use the single-field variant when the page\'s conversion goal is "start signup with an email" inline in a hero or calculator — it is a real `<form>` that navigates to `app.dash.fi/signup`, not an AJAX submit. Use the HubSpot embed variant when the goal is a qualifying application (Growth Network, partner program) that needs a real backend and internal routing — that is deliberately outsourced to HubSpot rather than hand-built. For a plain click-through with no data collection, use SplitCTA or SectionCTA instead.',

	recipe: [
		'Single-field variant: a `<form method="get" action="https://app.dash.fi/signup">` with one `<input type="email" name="email">` and a submit `<button>`, laid out `flex-col` on mobile and `flex-row` at the `sm` breakpoint (640px) — `gap: 8px`, `max-width: 448px` (28rem).',
		'The input is a full pill: `border-radius: 999px`, `padding: 10px 16px 10px 40px` (left padding clears an inline mail-glyph icon), 1px `--m-border-strong` border, `--m-card` background, 14px text.',
		'The submit button is also a pill: `height: 42px`, `padding: 0 20px`, `background: --m-accent`, white text, an inline arrow icon after the label.',
		'On submit, the browser navigates to the action URL with `?email=...` appended — there is no in-place success state, no crossfade, no client-side validation beyond the native `required`/`type="email"` constraints.',
		'HubSpot-embed variant: render a `<div class="hs-form-frame" data-region="na1" data-form-id="..." data-portal-id="46814392">` inside a card, then load `https://js.hsforms.net/forms/embed/46814392.js` (deferred) — HubSpot injects an `<iframe>` into that div at runtime.',
		'Reserve layout space for the iframe while it loads: the partner-page card sets `min-height: 480px` on `.hs-form-frame`; the Growth Network dialog shows a spinner + "Loading the application form…" copy and polls for `iframe` height, falling back to a "having trouble? email hi@dash.fi" message after 48 × 250ms (~12s).',
		'The Growth Network usage wraps the same embed in a native `<dialog>` modal (open via `showModal()`), triggered by any element carrying `data-apply-open`; the partner-page usage renders the identical embed shape inline in a two-column section instead — same mechanism, two different placements.',
	],

	dom: `<!-- single-field variant -->
<form method="get" action="https://app.dash.fi/signup" class="mk-hero">
  <label class="sr-only" for="email">Work email</label>
  <input id="email" type="email" name="email" required placeholder="Enter your work email" />
  <button type="submit">Run your first audit</button>
</form>

<!-- HubSpot-embed variant (inline, e.g. partner page) -->
<div class="pn-form-card">
  <div class="hs-form-frame" data-region="na1" data-form-id="1ef1be61-01b8-43c4-bc6c-747a1bd4787c" data-portal-id="46814392"></div>
  <noscript>Enable JavaScript to load the form, or email partners@dash.fi.</noscript>
</div>`,

	tokensUsed: [
		{ part: 'input border', role: '--m-border-strong', notes: 'Single-field variant only.' },
		{ part: 'input surface', role: '--m-card' },
		{ part: 'input focus ring', role: '--m-accent', notes: 'box-shadow ring on focus, 3px --m-accent-soft.' },
		{ part: 'submit button fill', role: '--m-accent' },
		{ part: 'submit button hover', role: '--m-accent-deep' },
		{ part: 'HubSpot card surface', role: 'plain white card, not a documented --m-* card role in partner.css', notes: 'Card padding only; the iframe content is styled by HubSpot, outside token control.' },
	],

	dimensions: [
		{ name: 'Single-field row max-width', value: '448px (max-w-md)', notes: 'Row layout ≥640px, column below.' },
		{ name: 'Single-field row gap', value: '8px' },
		{ name: 'Input padding', value: '10px 16px 10px 40px', notes: 'Left padding clears an inline icon.' },
		{ name: 'Submit button height', value: '42px' },
		{ name: 'HubSpot card padding (partner page)', value: 'clamp(22px, 3vw, 36px)' },
		{ name: 'HubSpot iframe min-height (partner page)', value: '480px' },
		{ name: 'Growth Network dialog max-width', value: 'min(560px, 100vw) mobile; min(980px, 94vw) ≥900px (2-col grid, sidebar 280–340px)' },
		{ name: 'Growth Network dialog fallback timeout', value: '~12s (48 × 250ms polling)' },
	],

	variants: [
		{ name: 'single-field (email capture)', description: 'Real `<form method="get">` with one email input, on the shipping-audit hero and the shipping calculator CTA. Navigates to signup; no success-state swap.' },
		{ name: 'HubSpot embed — inline card', description: 'Partner page (#partner-form): the same iframe embed rendered inline in a two-column section, no modal.' },
		{ name: 'HubSpot embed — modal', description: 'Growth Network: the same embed mechanism wrapped in a native `<dialog>`, opened by any `data-apply-open` trigger, with a loading spinner and a timeout fallback.' },
	],

	nonFeatures: [
		'No bespoke multi-field markup — every "application form" on dash.fi is a HubSpot iframe embed, not hand-rolled inputs; there is nothing to theme with `--m-*` tokens inside it.',
		'No in-place success-state swap on the single-field variant — it is a real GET navigation to `app.dash.fi/signup`, not an AJAX submit handled client-side.',
		'No client-side validation beyond native `required` / `type="email"` on the single-field variant.',
		'No file upload, no CAPTCHA UI in either variant — that is either a native browser behavior or delegated entirely to HubSpot.',
	],

	gotchas: [
		'Do not assume the HubSpot embed variant is themeable with `--m-*` tokens beyond the surrounding card — the form fields render inside a third-party iframe dash.fi does not control.',
		'The single-field variant is a real page navigation on submit (GET to `app.dash.fi/signup?email=...`), not a fetch/AJAX call — do not build a success-message crossfade for it; there isn\'t one.',
		'The Growth Network modal only mounts (and loads) the HubSpot script the first time it is opened (`dialog.dataset.applyMounted`) — reopening does not remount or re-fetch.',
		'Reserve real layout height for the HubSpot iframe (`min-height: 480px` inline, or a spinner + polling loop in the modal) — collapsing height to 0 while the script loads causes a visible layout jump.',
	],

	motion: [
		'Growth Network dialog: opens with a 260ms cubic-bezier scale/translate-in (or a 300ms slide-up sheet on mobile, ≤640px), backdrop fades over 260ms; both are skipped under `prefers-reduced-motion: reduce`.',
		'No motion beyond native `:active` press feedback on the single-field submit button.',
	],

	accessibility: [
		'Single-field variant: the email input has a visually-hidden `<label>` ("Work email"); native `required`/`type="email"` provide baseline validation semantics.',
		'HubSpot embed (modal): the `<dialog>` uses `aria-labelledby` pointing at the modal title; a `<noscript>` fallback provides a mailto contact when JavaScript is unavailable.',
		'HubSpot embed (inline): same `<noscript>` fallback pattern on the partner page; internal iframe accessibility is owned by HubSpot, not dash.fi.',
	],

	example: `<form method="get" action="https://app.dash.fi/signup" class="capture">
  <label class="sr-only" for="email">Work email</label>
  <input id="email" type="email" name="email" required placeholder="Enter your work email" />
  <button type="submit">Run your first audit</button>
</form>

<style>
  .capture { display: flex; flex-direction: column; gap: 8px; max-width: 448px; }
  .capture input {
    border-radius: 999px; padding: 10px 16px 10px 40px;
    border: 1px solid var(--m-border-strong); background: var(--m-card); color: var(--m-fg-strong);
    font-size: 14px;
  }
  .capture input:focus { outline: none; border-color: var(--m-accent); box-shadow: 0 0 0 3px var(--m-accent-soft); }
  .capture button {
    height: 42px; padding: 0 20px; border-radius: 999px; border: 0;
    background: var(--m-accent); color: #fff; font-size: 14px; font-weight: 700;
  }
  .capture button:active { transform: scale(0.98); }
  @media (min-width: 640px) { .capture { flex-direction: row; } }
</style>`,
	exampleLang: 'html',

	porting: [
		'Single-field variant: a real `method="get"` form (or your framework\'s equivalent navigation) — one email input in a pill, a pill submit button, row on desktop / column on mobile. Do not add a client-side success state; the source navigates away on submit.',
		'HubSpot-embed variant: do not reimplement fields — port the embed shape (script tag + target div, reserved min-height, loading/fallback affordance) and point it at your own form backend or an equivalent HubSpot form id.',
	],

	changelog: [
		{
			version: 'v0.2.0',
			date: '2026-07-20',
			note: 'Re-grounded against dash.fi @ a5be701: dropped the fabricated "home hero" single-field claim (HomeHero.astro has no form, only two link buttons) and the fabricated in-place success-state behavior (the real single-field form is a GET navigation). Replaced the fabricated bespoke multi-field/application-form recipe with the real mechanism — a HubSpot iframe embed, used inline on the partner page and inside a modal on Growth Network. Sources, dimensions, and tokens rewritten from the live component/CSS files.',
		},
		{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented — grounded in /growthnetwork, /partner, and the home email-capture hero.' },
	],
};
