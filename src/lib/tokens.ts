/**
 * Canonical token export for Dashbook.
 *
 * Source of truth: /Users/zy/dev/dash/dash-fi-app-ds/project/colors_and_type.css
 * Mirrored by:    /Users/zy/dev/dashbook/src/app.css
 *
 * Any time a token changes, both this file and `app.css` must be updated together.
 */

export type ColorToken = {
	name: string;
	cssVar: string;
	light: string;
	dark: string;
	role: string;
};

export type ThemeToken = ColorToken;

export const productColors: ColorToken[] = [
	{
		name: 'bg',
		cssVar: '--bg',
		light: '#FAF8F1',
		dark: '#0F1413',
		role: 'Page background — warm cream in light, near-black in dark.'
	},
	{
		name: 'bg-muted',
		cssVar: '--bg-muted',
		light: '#ECEAE0',
		dark: '#181E1D',
		role: 'Hover, subtle fills. One step down from page background.'
	},
	{
		name: 'fg',
		cssVar: '--fg',
		light: '#123B39',
		dark: '#FFFFFF',
		role: 'Primary text. Deep jade in light, white in dark.'
	},
	{
		name: 'fg-muted',
		cssVar: '--fg-muted',
		light: '#6E7878',
		dark: '#8B9695',
		role: 'Captions, secondary labels, deactivated text.'
	},
	{
		name: 'border',
		cssVar: '--border',
		light: '#E8E6DC',
		dark: '#1F2A29',
		role: 'Hairline borders. The only stroke weight in the system: 1px.'
	},
	{
		name: 'input-border',
		cssVar: '--input-border',
		light: '#B6C0BF',
		dark: '#1F2A29',
		role: 'Form fields — slightly stronger than --border for affordance.'
	},
	{
		name: 'primary',
		cssVar: '--primary',
		light: '#000000',
		dark: '#FFFFFF',
		role: 'Primary action surface (e.g. main button). Inverted in dark mode.'
	},
	{
		name: 'primary-fg',
		cssVar: '--primary-fg',
		light: '#FFFFFF',
		dark: '#000000',
		role: 'Foreground for primary surfaces.'
	},
	{
		name: 'brand',
		cssVar: '--brand',
		light: '#2B605C',
		dark: '#5BB8B0',
		role: 'The single brand accent — deep jade. Lifts in dark for legibility.'
	},
	{
		name: 'brand-fg',
		cssVar: '--brand-fg',
		light: '#FFFFFF',
		dark: '#FFFFFF',
		role: 'Foreground when over the brand color.'
	},
	{
		name: 'destructive',
		cssVar: '--destructive',
		light: '#000000',
		dark: '#FFFFFF',
		role: 'Destructive actions — monochrome, no red. Trust signal.'
	},
	{
		name: 'ring',
		cssVar: '--ring',
		light: '#2B605C',
		dark: '#5BB8B0',
		role: 'Focus ring — same as brand.'
	},
	{
		name: 'card',
		cssVar: '--card',
		light: '#FAF8F1',
		dark: '#0F1413',
		role: 'Card surface — same as page background by default (border-only cards).'
	},
	{
		name: 'popover',
		cssVar: '--popover',
		light: '#FFFFFF',
		dark: '#141A19',
		role: 'Floating surfaces — popover, tooltip, dropdown menus.'
	}
];

/**
 * Base palette — named brand primitives. Every other color token references one of these.
 * Update hex values here only; `--m-*` and product semantic tokens follow automatically.
 */
export const baseColors: ColorToken[] = [
	{
		name: 'dash-cobalt',
		cssVar: '--dash-cobalt',
		light: '#354CEF',
		dark: '#354CEF',
		role: 'The dominant marketing brand color (~33k uses in Figma). Reserved for marketing surfaces.'
	},
	{
		name: 'dash-cobalt-deep',
		cssVar: '--dash-cobalt-deep',
		light: '#2A3ECC',
		dark: '#2A3ECC',
		role: 'Pressed/hover state for cobalt on marketing surfaces.'
	},
	{
		name: 'dash-periwinkle',
		cssVar: '--dash-periwinkle',
		light: '#B6C1F2',
		dark: '#B6C1F2',
		role: 'Cobalt tint — light marketing surfaces and accents.'
	},
	{
		name: 'dash-mist',
		cssVar: '--dash-mist',
		light: '#E7E7F0',
		dark: '#E7E7F0',
		role: 'Cool blue-gray neutral for marketing surfaces.'
	},
	{
		name: 'dash-cream',
		cssVar: '--dash-cream',
		light: '#EBEDE4',
		dark: '#EBEDE4',
		role: 'Warm cream — alternative marketing surface (the product uses #FAF8F1, slightly warmer).'
	},
	{
		name: 'dash-white',
		cssVar: '--dash-white',
		light: '#FFFFFF',
		dark: '#FFFFFF',
		role: 'Pure white. Used for popover surfaces in light mode.'
	},
	{
		name: 'dash-yellow',
		cssVar: '--dash-yellow',
		light: '#EBFF00',
		dark: '#EBFF00',
		role: 'Electric highlight — sparing only. Pulls focus to one element per surface.'
	},
	{
		name: 'dash-yellow-glow',
		cssVar: '--dash-yellow-glow',
		light: 'rgba(235, 255, 0, 0.5)',
		dark: 'rgba(235, 255, 0, 0.5)',
		role: 'The yellow-highlight focus glow. Used as box-shadow alpha layer.'
	},
	{
		name: 'dash-jade',
		cssVar: '--dash-jade',
		light: '#2B605C',
		dark: '#2B605C',
		role: 'The product brand accent. Single most-referenced color in product UI.'
	},
	{
		name: 'dash-jade-deep',
		cssVar: '--dash-jade-deep',
		light: '#123B39',
		dark: '#123B39',
		role: 'Body text on light surfaces. Carries weight without aggression.'
	},
	{
		name: 'dash-ink',
		cssVar: '--dash-ink',
		light: '#25261D',
		dark: '#25261D',
		role: 'Warm near-black for marketing deck covers and brand-book backgrounds.'
	},
	{
		name: 'dash-graphite',
		cssVar: '--dash-graphite',
		light: '#505148',
		dark: '#505148',
		role: 'Warm gray for marketing body copy and disclaimers.'
	},
	{
		name: 'dash-graphite-soft',
		cssVar: '--dash-graphite-soft',
		light: '#80817A',
		dark: '#80817A',
		role: 'Soft warm gray — lightest neutral for tertiary marketing text.'
	}
];

/**
 * Marketing aliases — semantic names for marketing surfaces. Each is an alias
 * of a `--dash-*` primitive; do not assign hex values directly.
 */
export const marketingColors: ColorToken[] = [
	{
		name: 'm-cobalt',
		cssVar: '--m-cobalt',
		light: '#354CEF',
		dark: '#354CEF',
		role: 'Alias of --dash-cobalt. Marketing brand color.'
	},
	{
		name: 'm-cobalt-deep',
		cssVar: '--m-cobalt-deep',
		light: '#2A3ECC',
		dark: '#2A3ECC',
		role: 'Alias of --dash-cobalt-deep. Pressed/hover for marketing cobalt.'
	},
	{
		name: 'm-lavender',
		cssVar: '--m-lavender',
		light: '#B6C1F2',
		dark: '#B6C1F2',
		role: 'Alias of --dash-periwinkle. Light marketing surface.'
	},
	{
		name: 'm-cobalt-dust',
		cssVar: '--m-cobalt-dust',
		light: '#E7E7F0',
		dark: '#E7E7F0',
		role: 'Alias of --dash-mist. Cool blue-gray neutral.'
	},
	{
		name: 'm-cream',
		cssVar: '--m-cream',
		light: '#EBEDE4',
		dark: '#EBEDE4',
		role: 'Alias of --dash-cream. Alternate cream surface.'
	},
	{
		name: 'm-yellow',
		cssVar: '--m-yellow',
		light: '#EBFF00',
		dark: '#EBFF00',
		role: 'Alias of --dash-yellow. Highlight only — one element per surface.'
	},
	{
		name: 'm-jade',
		cssVar: '--m-jade',
		light: '#2B605C',
		dark: '#2B605C',
		role: 'Alias of --dash-jade. Marketing jade medium — same as product --brand.'
	},
	{
		name: 'm-jade-deep',
		cssVar: '--m-jade-deep',
		light: '#123B39',
		dark: '#123B39',
		role: 'Alias of --dash-jade-deep. Marketing jade deep — same as product --fg.'
	},
	{
		name: 'm-near-black',
		cssVar: '--m-near-black',
		light: '#25261D',
		dark: '#25261D',
		role: 'Alias of --dash-ink. Warm near-black for marketing decks.'
	},
	{
		name: 'm-warm-fg',
		cssVar: '--m-warm-fg',
		light: '#505148',
		dark: '#505148',
		role: 'Alias of --dash-graphite. Warm gray for marketing body copy.'
	}
];

export const radii = {
	none: '0',
	sm: '4px',
	md: '6px',
	lg: '8px',
	full: '9999px'
} as const;

export const shadows = {
	sm: '0 1px 2px 0 rgba(18, 59, 57, 0.08)',
	md: '0 6px 20px -6px rgba(18, 59, 57, 0.14), 0 1px 2px rgba(18, 59, 57, 0.06)'
} as const;

export const motion = {
	easingOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
	easingIn: 'cubic-bezier(0.4, 0, 1, 1)',
	easingDefault: 'cubic-bezier(0.4, 0, 0.2, 1)',
	durations: {
		instant: '50ms',
		fast: '150ms',
		normal: '300ms',
		slow: '500ms'
	}
} as const;

export const tokens = {
	productColors,
	baseColors,
	marketingColors,
	radii,
	shadows,
	motion
} as const;
