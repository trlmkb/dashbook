import type { MarketingPatternSpec } from './types.js';

/**
 * FormCapture — an embedded application / email-capture form section.
 *
 * Seen on /growthnetwork, /partner, and the home email-capture hero. A
 * lightweight inline form (not a modal, not a separate page) that sits
 * directly in the page flow.
 */
export const formCapture: MarketingPatternSpec = {
	slug: 'form-capture',
	name: 'FormCapture',
	category: 'CTAs',
	status: 'stable',
	description:
		'An inline lead-capture form — one to three fields plus a submit button, in the page flow rather than a modal. Ranges from a single email input beside a button (home hero) to a short multi-field application form (partner / growth-network pages).',

	source: 'src/components/cta/FormCapture.tsx',
	sourceNote: 'Field-count variants pulled from the brief; verify exact validation and success-state copy against /growthnetwork and /partner source.',

	whenToUse:
		'Use FormCapture when the page\'s conversion goal is data collection (an email, an application) rather than a click-through — pair it with a short section-intro stating what the visitor gets. For a click-through to another page or product, use SplitCTA or SectionCTA instead; those are not form patterns.',

	recipe: [
		'Single-field variant: one email Input plus an adjacent squircle-button submit, laid out as one row on desktop, stacked on mobile — the home hero shape.',
		'Multi-field variant: 2–3 stacked or paired Inputs (name, email, company) plus a submit button below, inside a bordered card on `--m-surface` — the partner/growth-network shape.',
		'Labels are optional for the single-field variant (placeholder carries the meaning); the multi-field variant always uses visible labels above each field.',
		'On submit, the form replaces itself in place with a success message (checkmark + one sentence) rather than navigating away or opening a modal — the page context is preserved.',
		'Validation errors render inline below the specific field in monochrome ink text, never a red border or red text — consistent with the "no red" rule; use a subtle warm-token background tint on the field itself if emphasis is needed.',
		'The submit button uses the standard squircle-button treatment and press-scale; no separate "loading" spinner variant beyond a brief disabled state with reduced opacity.',
	],

	dom: `<form class="form-capture">
  <label class="sr-only" for="email">Work email</label>
  <input id="email" type="email" placeholder="you@company.com" required />
  <button type="submit">Get started</button>
</form>`,

	tokensUsed: [
		{ part: 'card surface (multi-field)', role: '--m-surface', notes: 'Bordered container for the application-form variant.' },
		{ part: 'input border', role: '--m-border' },
		{ part: 'input focus ring', role: '--m-accent-border' },
		{ part: 'submit button', role: '--m-accent', notes: 'Standard squircle-button treatment.' },
		{ part: 'success check', role: '--m-positive' },
		{ part: 'inline error text', role: '--m-fg-strong', notes: 'Monochrome, never red — no red border either.' },
	],

	dimensions: [
		{ name: 'Single-field row height', value: '~48px input + button, same row on desktop' },
		{ name: 'Multi-field card padding', value: '~32–40px' },
		{ name: 'Field gap (multi-field)', value: '~16px' },
	],

	variants: [
		{ name: 'single-field (email capture)', description: 'One email input + inline submit — the home hero shape.' },
		{ name: 'multi-field (application)', description: '2–3 labeled fields in a card + submit — the /growthnetwork and /partner shape.' },
	],

	props: [
		{ name: 'fields', type: "{ name: string; label: string; type: 'text' | 'email'; required?: boolean }[]", required: true, description: '1 field for the capture variant, 2–3 for the application variant.' },
		{ name: 'submitLabel', type: 'string', default: "'Get started'", description: 'Button text.' },
		{ name: 'onSubmit', type: '(values: Record<string, string>) => Promise<void>', required: true, description: 'Submit handler; the form renders its success state once this resolves.' },
	],

	nonFeatures: [
		'Not a modal or multi-step wizard — always inline, always one screen.',
		'No file upload field — text/email inputs only.',
		'No CAPTCHA or bot-check UI in the pattern itself — that is a server-side concern layered underneath, not part of the visual recipe.',
	],

	gotchas: [
		'Never render the error state with a red border or red text — use monochrome ink text and, if needed, a warm-token background tint, consistent with the site-wide no-red rule.',
		'The success state must replace the form in place (same section, same scroll position) — do not scroll the user to a new section or navigate to a thank-you page for this pattern.',
	],

	motion: [
		'Success-state swap crossfades at --dur-fast; the submit button\'s own press-scale (0.97) is the only other motion, no loading spinner rotation.',
	],

	accessibility: [
		'Every field has a real <label> — visually hidden for the single-field variant, visible for the multi-field variant.',
		'Inline errors are associated to their field via aria-describedby and announced via a polite live region on submit failure.',
		'The success message is placed in a live region so screen-reader users hear the state change without needing to re-navigate.',
	],

	example: `<form class="form-capture">
  <label class="sr-only" for="email">Work email</label>
  <input id="email" type="email" placeholder="you@company.com" required />
  <button type="submit">Get started</button>
</form>

<style>
  .form-capture { display: flex; gap: 12px; }
  .form-capture input { flex: 1; padding: 12px 16px; border: 1px solid var(--m-border);
    background: var(--m-surface); color: var(--m-fg-strong); }
  .form-capture input:focus-visible { outline: none; border-color: var(--m-accent-border); }
  .form-capture button { padding: 12px 24px; background: var(--m-accent); color: var(--m-surface);
    border: 0; border-radius: 6px; transition: transform 100ms; }
  .form-capture button:active { transform: scale(0.97); }
  @media (max-width: 640px) { .form-capture { flex-direction: column; } }
</style>`,
	exampleLang: 'html',

	porting: [
		'An inline form (1 field for capture, 2–3 for application) that swaps to an in-place success message on submit; errors are monochrome text, never red.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-07-11', note: 'First documented — grounded in /growthnetwork, /partner, and the home email-capture hero.' }],
};
