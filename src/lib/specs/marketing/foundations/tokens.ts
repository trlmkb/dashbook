import type { MarketingTokensFoundation } from './types.js';
import { marketingRoles, marketingColors } from '../../../tokens.js';

/**
 * Marketing tokens — the surface-theming role set.
 *
 * Promotes the `/shipping` rebuild's richer per-surface token layer site-wide.
 * The role values live in `$lib/tokens` (`marketingRoles`) + `src/app.css`; this
 * spec wraps them with the philosophy, the `data-tone` convention, the dark
 * variant mechanism, and the color rules.
 */
export const marketingTokensFoundation: MarketingTokensFoundation = {
	philosophy:
		'Re-theme a whole marketing surface by editing ~20 role variables in one place. Components reference roles (`--m-surface`, `--m-accent`, `--m-positive`…), never raw hex. Pair every semantic element with a `data-tone` attribute so one element styles four ways with no extra classes.',

	roles: marketingRoles,
	legacyAliases: marketingColors,

	toneConvention: {
		attribute: 'data-tone',
		values: ['accent', 'positive', 'warn', 'negative'],
		usage:
			'Put `data-tone="accent|positive|warn|negative"` on a chip, cell, dot, or callout. The element\'s CSS reads tone-scoped roles (`--m-accent`, `--m-positive`…) so fill, text, and border all shift together — no per-tone class needed. Accent and positive both resolve to jade by design (money is positive, positive is on-brand).',
	},

	darkVariant: {
		trigger: '[data-marketing-dark]',
		notes:
			'A marketing surface goes dark by setting `data-marketing-dark` on ANY subtree — independent of the product-wide `html.dark` theme. The `--m-*` roles re-resolve inside that subtree and every component that references them follows. Use it to drop an ink band between two light sections without touching component code.',
		deltas: [
			'accent jade #2B605C → lifted #5BB8B0',
			'surface #FAF9F5 → #14181C; raised #FFFFFF → rgba(234,230,219,.04)',
			'text ink #0F1412 → paper #FAF9F5',
			'border rgba(37,38,29,.1) → rgba(234,230,219,.12)',
			'negative ink #25261D → paper #EBEDE4 (stays monochrome)',
		],
	},

	radii: {
		scale: '--radius-* : 2 / 4 / 8 / 12 / 20 / 28 / full',
		button: 'Buttons are a 6px squircle: `border-radius: 6px; corner-shape: squircle`.',
	},

	layoutScale: {
		contentMax: '1240px (--content-max)',
		gutters: { sm: '24px', md: '40px', lg: '80px' },
	},

	colorRules: [
		'Money / positive = jade. Savings, gains, "included". Never green.',
		'Negative / violations = monochrome ink. Overcharges, declines, flags. Never red.',
		'Amber = caution only. Sparing — one cautionary element per surface at most.',
		'Cobalt is a marketing-only data accent; jade is the shared brand accent with product.',
		'Multi-color is permitted only inside decorative duotone icons — nowhere else.',
	],
};
