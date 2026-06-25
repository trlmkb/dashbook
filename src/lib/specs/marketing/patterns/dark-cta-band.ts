import type { MarketingPatternSpec } from './types.js';

/**
 * DarkCtaBand — the jade-glow closing band.
 *
 * The canonical end-of-page call to action: a full-width dark band whose
 * background is a deep-jade glow pooling up from the bottom edge into a
 * near-black teal base. The role tokens flip dark (paper text, mint accent),
 * the heading is the big ultralight display, and the primary button inverts to
 * a light beige fill. Distinct from the flat warm-ink emphasis band (see the
 * Section foundation) — this one always carries the radial jade glow and is
 * reserved for the page closer.
 */
export const darkCtaBand: MarketingPatternSpec = {
	slug: 'dark-cta-band',
	name: 'DarkCtaBand',
	category: 'CTAs',
	status: 'stable',
	description:
		'The jade-glow closing band — a full-width dark section with a deep-jade radial glow rising from the bottom into a near-black teal base. Carries the page-closing call to action: eyebrow, ultralight display heading, lede, and a light-beige primary button. Reserved for the final CTA, one per page.',

	source: 'src/styles/shipping-audit.css (.ship-cta-dark) + final CTA sections across product pages',
	sourceNote:
		'Background recipe and role-flip pulled from live ship-design CSS (.ship-cta-dark role block + radial-gradient rule). Verify exact section padding against the page source.',

	whenToUse:
		'Reach for DarkCtaBand as the last band on a marketing page — the closing "apply / book a demo" moment. Use the flat warm-ink emphasis band (Section foundation) for a mid-page dark interruption that is not the closer; use SplitCta or SectionCta for a lighter inline CTA inside the page flow.',

	recipe: [
		'Paint the band background with a bottom-anchored radial glow: `radial-gradient(ellipse 80% 70% at 50% 100%, var(--m-jade-deep) 0%, <near-black teal> 70%)` — the deep jade pools up from the bottom edge and falls off to the near-black base.',
		'Flip the role tokens dark: text to paper (`--m-fg-strong` → #FFFFFF, body → `--m-fg-muted` on dark ≈ rgba(234,230,219,0.62)), and the accent lifts to mint #5BB8B0 (the on-ink accent — never the light-mode jade).',
		'Set the heading in the ultralight display face (PP Supply Mono ~200), large and tight, with the accent word in mint.',
		'Center the stack: eyebrow → heading → lede → button row, with generous closer padding `clamp(64px, 9vw, 112px)` top and bottom.',
		'Make the primary button the light-on-dark exception: a light beige fill (#EBEDE4) with deep-jade text (#123B39) — not white, not jade. A secondary button stays ghost/outline in the paper hairline.',
		'Cards or chips inside the band use the dark card surface (`--m-card` on dark ≈ rgba(234,230,219,0.04)) with the paper hairline border.',
	],

	dom: `<section class="dark-cta-band" data-marketing-dark>
  <div class="inner">
    <p class="eyebrow">Apply now</p>
    <h2>Keep more of <span class="accent">every dollar</span>.</h2>
    <p class="lede">Apply in minutes. No personal guarantee, no platform fee.</p>
    <div class="actions">
      <a class="btn-primary" href="/apply">Apply now</a>
      <a class="btn-ghost" href="/demo">Book a demo</a>
    </div>
  </div>
</section>`,

	tokensUsed: [
		{ part: 'glow', role: '--m-jade-deep', notes: 'Deep jade (#0D2E2C) — the glow colour pooling up from the bottom edge.' },
		{ part: 'base', role: '(literal)', notes: 'Near-black teal ≈ hsl(176 56% 8%); the radial falls off to this by ~70%.' },
		{ part: 'heading', role: '--m-fg-strong', notes: 'Resolves to #FFFFFF on the dark band.' },
		{ part: 'body / lede', role: '--m-fg-muted', notes: 'Paper at ~0.62 alpha on dark.' },
		{ part: 'accent word', role: '(literal)', notes: 'Mint #5BB8B0 — the accent lift on ink bands, not the light-mode jade.' },
		{ part: 'primary button', role: '(literal)', notes: 'Light beige #EBEDE4 fill + deep-jade #123B39 text — the dark-band button exception.' },
		{ part: 'card / chip surface', role: '--m-card', notes: 'Dark card ≈ rgba(234,230,219,0.04) with the paper hairline.' },
	],

	dimensions: [
		{ name: 'Glow', value: 'radial-gradient(ellipse 80% 70% at 50% 100%, #0D2E2C 0%, hsl(176 56% 8%) 70%)', notes: 'Bottom-anchored; jade pools up, falls to near-black teal.' },
		{ name: 'Section padding', value: 'clamp(64px, 9vw, 112px)', notes: 'The final-CTA closer scale — taller than a standard section.' },
		{ name: 'Accent (on dark)', value: '#5BB8B0', notes: 'Mint lift, not light-mode jade.' },
		{ name: 'Primary button', value: '#EBEDE4 fill / #123B39 text' },
		{ name: 'Heading', value: 'Ultralight display ~200, tight tracking' },
		{ name: 'Alignment', value: 'Centered stack' },
	],

	variants: [
		{ name: 'closer', description: 'Default — the full-bleed jade-glow band that closes the page.' },
		{ name: 'with secondary', description: 'Primary beige button paired with a ghost/outline secondary (e.g. "Book a demo").' },
	],

	props: [
		{ name: 'eyebrow', type: 'string', description: 'Mono eyebrow above the heading.' },
		{ name: 'heading', type: 'string', required: true, description: 'The closing headline; an accent span lifts to mint.' },
		{ name: 'lede', type: 'string', description: 'One supporting line under the heading.' },
		{ name: 'primary', type: '{ label: string; href: string }', required: true, description: 'The light-beige primary CTA.' },
		{ name: 'secondary', type: '{ label: string; href: string }', description: 'Optional ghost secondary CTA.' },
	],

	nonFeatures: [
		'Not the flat emphasis band — that one is a solid warm near-black (#25261D) with no glow; this band always carries the radial jade glow and is the page closer.',
		'Not cobalt — the closer is jade, never the cobalt data-accent band.',
		'No white primary button — the primary inverts to light beige (#EBEDE4); a pure-white fill is off-system here.',
		'At most one per page — it is the closer, not a repeatable section.',
	],

	gotchas: [
		'The accent on the dark band is mint #5BB8B0, not the light-mode jade — a light-mode jade word reads muddy on the near-black base.',
		'Anchor the radial at `50% 100%` (bottom-centre); centring it washes the whole band and loses the "glow rising from the floor" read.',
		'The primary button is beige with deep-jade text — do not reuse the light-mode jade-fill button or a white button inside this band.',
	],

	accessibility: [
		'Keep the closing heading in the document outline (an `<h2>` under the page `<h1>`); the band is a section, not a new document.',
		'Mint #5BB8B0 on the near-black base clears AA for large text; keep body copy at the paper `--m-fg-muted`, not the fainter subtle token.',
	],

	example: `<section class="dark-cta-band" data-marketing-dark>
  <div class="inner">
    <p class="eyebrow">Apply now</p>
    <h2>Keep more of <span class="accent">every dollar</span>.</h2>
    <p class="lede">Apply in minutes. No personal guarantee, no platform fee, and up to 3% cash back.</p>
    <div class="actions">
      <a class="btn-primary" href="/apply">Apply now</a>
      <a class="btn-ghost" href="/demo">Book a demo</a>
    </div>
  </div>
</section>

<style>
  .dark-cta-band {
    --accent: #5bb8b0;
    background: radial-gradient(ellipse 80% 70% at 50% 100%,
      var(--m-jade-deep) 0%, hsl(176 56% 8%) 70%);
    padding-block: clamp(64px, 9vw, 112px);
    color: rgba(234, 230, 219, 0.62);
    text-align: center;
  }
  .dark-cta-band .eyebrow { color: var(--accent); font-family: var(--font-mono);
    font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; }
  .dark-cta-band h2 { color: #fff; font-family: var(--font-display);
    font-weight: 200; font-size: clamp(28px, 3.6vw, 42px); letter-spacing: -0.025em; }
  .dark-cta-band h2 .accent { color: var(--accent); }
  .dark-cta-band .actions { display: inline-flex; gap: 12px; margin-top: 24px; }
  .dark-cta-band .btn-primary { background: #ebede4; color: #123b39;
    border-radius: 10px; padding: 12px 20px; text-decoration: none; }
  .dark-cta-band .btn-ghost { color: #faf9f5;
    border: 1px solid rgba(234, 230, 219, 0.2); border-radius: 10px; padding: 12px 20px; }
</style>`,
	exampleLang: 'html',

	porting: [
		'A full-width band with a bottom-anchored radial glow (deep jade → near-black teal), dark role tokens, a centred ultralight heading, and a light-beige primary button with deep-jade text.',
		'The accent is mint #5BB8B0 on the dark base; the primary button is the only light-beige fill in the system — reserve it for this closer.',
	],

	changelog: [{ version: 'v0.2.0', date: '2026-06-25', note: 'First documented — the live jade-glow closing band (.ship-cta-dark), previously unspecced.' }],
};
