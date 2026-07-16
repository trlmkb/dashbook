import type { ComponentSpec } from '../types.js';

/**
 * Button — the primary action surface.
 *
 * Seven variants, six sizes, built-in loading state. Renders as <button>
 * by default; passing `href` swaps to <a>.
 */
export const button: ComponentSpec = {
	slug: 'button',
	name: 'Button',
	category: 'Inputs',
	status: 'stable',
	importPath: "import { Button } from '@dashfi/svelte/ui/button'",
	description:
		'The primary action surface. Seven variants, six sizes, with loading state. Renders as button or anchor.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/button/button.svelte',

	dimensions: [
		{
			name: 'Radius',
			value: '6px',
			tw: 'rounded-md',
			notes:
				'`--radius-md`; `[corner-shape:squircle]` applied so corners render as squircles where supported.'
		},
		{ name: 'Type weight', value: '500', tw: 'font-medium', notes: 'Bai Jamjuree, `whitespace-nowrap`.' },
		{
			name: 'Inline icons',
			value: '16px',
			tw: '[&_svg]:size-4',
			notes: '`shrink-0`, pointer-events disabled. Icons compose as children.'
		},
		{
			name: 'Press',
			value: 'scale 0.97',
			tw: 'active:scale-[0.97]',
			notes: "Baked into base — every button gets the brand's signature press feedback."
		},
		{
			name: 'Transition',
			value: '150ms',
			tw: 'transition-all duration-150',
			notes: 'Bg, text, border, and scale animate.'
		}
	],

	tokens: [
		{
			name: 'Shadow',
			notes: 'none on this branch. Buttons are flat surfaces; the press-scale carries the affordance.'
		},
		{
			name: 'Focus',
			notes:
				'native `outline-none`. Focus is communicated by the browser keyboard cursor / app-level focus styling; the button class does not add a ring.'
		},
		{
			name: 'Disabled',
			notes: '`opacity-40` + `pointer-events-none`. No alternate fill.'
		}
	],

	variants: [
		{
			name: 'default',
			description: 'Ink primary — the unmarked CTA.',
			tokens: [
				{
					name: 'bg',
					token: { cssVar: '--color-primary', light: '#24251d', dark: '#ffffff' }
				},
				{
					name: 'text',
					token: { cssVar: '--color-primary-foreground', light: '#ffffff', dark: '#000000' }
				},
				{ name: 'hover', notes: 'opacity 80%.' }
			]
		},
		{
			name: 'brand',
			description: 'Jade brand button.',
			tokens: [
				{ name: 'bg', token: { cssVar: '--color-brand', light: '#2b5f5b', dark: '#46b9af' } },
				{
					name: 'text',
					token: { cssVar: '--color-brand-foreground', light: '#ffffff', dark: '#000000' }
				},
				{ name: 'hover', notes: 'opacity 80%.' }
			]
		},
		{
			name: 'destructive',
			description: 'Orange destructive action.',
			tokens: [
				{
					name: 'bg',
					token: { cssVar: '--color-destructive', light: '#ff4000', dark: '#ff4000' }
				},
				{
					name: 'text',
					token: {
						cssVar: '--color-destructive-foreground',
						light: '#ffffff',
						dark: '#ffffff'
					}
				},
				{ name: 'hover', notes: 'opacity 80%.' }
			]
		},
		{
			name: 'outline',
			description: 'Transparent with a hairline border.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{ name: 'border', token: { cssVar: '--color-border', light: '#ebeae5', dark: '#1e2928' } },
				{ name: 'text', token: { cssVar: '--color-foreground', light: '#123b38', dark: '#ffffff' } },
				{ name: 'hover bg', notes: '`--color-muted` at 50% alpha.' }
			]
		},
		{
			name: 'secondary',
			description: 'Cobalt blue brand-constant (not warm-grey on this branch).',
			tokens: [
				{ name: 'bg', token: { cssVar: '--color-cobalt', light: '#344aef', dark: '#344aef' } },
				{
					name: 'text',
					token: { cssVar: '--color-cobalt-foreground', light: '#ffffff', dark: '#ffffff' }
				},
				{ name: 'hover', notes: 'opacity 80%.' }
			]
		},
		{
			name: 'ghost',
			description: 'Transparent surface, muted-foreground text.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{
					name: 'text',
					token: {
						cssVar: '--color-muted-foreground',
						light: '#6e8180',
						dark: '#819896'
					}
				},
				{
					name: 'hover',
					notes: 'bg `--color-muted` at 40% alpha, text switches to `--color-foreground`.'
				}
			]
		},
		{
			name: 'link',
			description: 'Underline-only treatment.',
			tokens: [
				{ name: 'bg', notes: 'transparent.' },
				{ name: 'text', token: { cssVar: '--color-foreground', light: '#123b38', dark: '#ffffff' } },
				{ name: 'underline', notes: '`underline-offset-4`; underline on hover.' }
			]
		}
	],

	sizes: [
		{ name: 'sm', height: '36px (h-9)', padding: '16px horizontal (px-4)', fontSize: '13px (text-[13px])', notes: 'gap-1.5.' },
		{
			name: 'default',
			height: '40px (h-10)',
			padding: '20px horizontal (px-5), 8px vertical (py-2)',
			fontSize: '14px (text-sm)',
			notes: 'gap-2.'
		},
		{
			name: 'lg',
			height: '44px (h-11)',
			padding: '32px horizontal (px-8)',
			fontSize: '14px',
			notes: 'gap-2.'
		},
		{ name: 'icon-sm', height: '36×36px (size-9)', notes: 'Icon-only.' },
		{ name: 'icon', height: '40×40px (size-10)', notes: 'Default icon-only size.' },
		{ name: 'icon-lg', height: '44×44px (size-11)', notes: 'Larger icon-only.' }
	],

	composition: [
		'Render as <code>&lt;button&gt;</code> by default. Passing <code>href</code> swaps the element to <code>&lt;a&gt;</code> — never both.',
		'Icons compose as <em>children</em> using <code>@lucide/svelte</code> at <code>size={16}</code>: <code>&lt;Button&gt;&lt;Plus size=&#123;16&#125; /&gt;New&lt;/Button&gt;</code>. There is no <code>icon</code> prop.',
		'<code>loading</code> renders a centred <code>Loader</code> overlay (lucide, <code>animate-spin</code>) inside <code>inset-2</code>; the children layer drops to 50% opacity with <code>blur-xs</code>. On the button (vs anchor) variant the wrapper also adds a <code>backdrop-blur-sm</code> layer.'
	],

	nonFeatures: [
		'No <code>icon</code> / <code>iconRight</code> prop. Icons go in the children slot.',
		'No <code>fullWidth</code> prop. Set <code>w-full</code> via <code>class</code> at the call site.',
		'No drop shadow. Buttons on this branch are flat — the press-scale and opacity changes are the affordance.',
		'No focus ring on the class. Rely on the browser keyboard cursor (Buttons inherit <code>outline-none</code>; surface-level focus styling is the caller\'s responsibility if needed).',
		'No "primary" variant alias. Use <code>default</code> directly; <code>brand</code> for jade.',
		'No warm-grey secondary. Secondary is cobalt on this branch.'
	],

	props: [
		{
			name: 'variant',
			type: "'brand' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'default'",
			description: 'Visual variant. See Anatomy for full mapping.'
		},
		{
			name: 'size',
			type: "'sm' | 'default' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg'",
			default: "'default'",
			description: 'Size token. h-9 / h-10 / h-11; icon sizes are square (size-9 / size-10 / size-11).'
		},
		{
			name: 'loading',
			type: 'boolean',
			default: 'false',
			description: 'Show an inline spinner over a blurred content layer. Disables activation.'
		},
		{
			name: 'href',
			type: 'string',
			description: 'When set, the button renders as an <a> instead of a <button>.'
		},
		{
			name: 'type',
			type: "'button' | 'submit' | 'reset'",
			default: "'button'",
			description: 'Standard HTML button type. Ignored when href is set.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 40% opacity, pointer-events disabled.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Button label content. Can include Lucide icons.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | HTMLAnchorElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onclick',
			type: '(event: MouseEvent) => void',
			description: 'Standard click handler. All native button/anchor events are passed through.'
		}
	],

	porting: [
		'Sizes: h-9 / h-10 / h-11 (sm / default / lg) with px-4 / px-5 / px-8. Three square icon sizes match the three width sizes. Radius is <code>--radius-md</code> 6px with optional squircle corner-shape; bake the active scale 0.97 transition into the class. No shadows.',
		'Variant table is the contract: brand jade, default ink, destructive orange, secondary <strong>cobalt</strong> (not warm-grey), outline hairline + muted hover, ghost muted-foreground text, link underline-only. Hover drops opacity to 80%.'
	],

	example: `<script lang="ts">
	import { Button } from '@dashfi/svelte/ui/button';
<\/script>

<Button>Default</Button>
<Button variant="brand">Brand</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

<Button loading>Submitting</Button>
<Button disabled>Disabled</Button>
<Button href="/signup">As a link</Button>`,

	accessibility: [
		'<strong>Keyboard:</strong> <code>Tab</code> focuses; <code>Space</code> / <code>Enter</code> activates.',
		'Renders as a native <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> — inherits semantics. No extra ARIA needed for typical use.',
		'For icon-only buttons, pass <code>aria-label</code> via the rest-props spread.',
		'<code>loading</code> state visually disables the button and prevents activation; consider an <code>aria-busy</code> announcement.',
		'Outline ring uses <code>--ring</code> (jade in light, lifted jade in dark) — visible only on keyboard focus (<code>:focus-visible</code>).'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Variant table refreshed: secondary is now cobalt blue (--color-cobalt #354cef), not warm-grey. Sizes bumped one notch (sm → h-9, default → h-10, lg → h-11); padding default is now px-5. New icon-sm / icon-lg sizes (size-9 / size-11). Hover drops opacity to 80% (was 90%). Press scale active:scale-[0.97] baked into base. Drop shadows removed across all variants. Disabled is now opacity-40. Focus ring removed (relies on native outline-none).'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-12',
			note: 'Anatomy tightened: per-size dimensions (h-8/9/10), per-variant token tuples (bg, text, border, hover, shadow) with resolved hex for both modes, composition rule (icons as children, never an icon prop), and explicit non-features. Matches the Input precedent so non-Svelte re-implementations have an unambiguous spec.'
		},
		{
			version: 'v0.3.0',
			date: '2026-05-10',
			note: 'First documented in Dashbook.'
		}
	]
};
