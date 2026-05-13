import type { ComponentSpec } from '../types.js';

export const magneticHover: ComponentSpec = {
	slug: 'magnetic-hover',
	name: 'Magnetic Hover',
	category: 'Display',
	status: 'beta',
	importPath: "import { MagneticHover } from '@dashfi/svelte/ui/magnetic-hover'",
	description:
		'Decorative — wrapped element shifts subtly toward the cursor on hover. For marketing CTAs only; not for product UI.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/magnetic-hover/magnetic-hover.svelte',

	dimensions: [
		{
			name: 'Wrapper',
			value: 'bare <div> around child',
			notes:
				'Translates toward the cursor on hover; transforms the wrapping div, not the child.'
		},
		{
			name: 'Strength',
			value: 'default 0.3',
			notes:
				'translation = (cursorCenter − elementCenter) × `strength`. Caller-controlled.'
		},
		{
			name: 'Transition',
			value: '300ms ease (default)',
			notes: '`transform` animates over `transitionDuration` ms.'
		},
		{
			name: 'Reset',
			value: 'mouseleave returns to origin'
		}
	],

	tokens: [
		{
			name: 'Surface',
			notes: 'None. The wrapper has no visual styling — the child renders as-is.'
		}
	],

	composition: [
		'Wrap a single child — typically a Button or similar CTA. The wrapping div translates on hover; the child is untouched.',
		'Use on marketing surfaces only — landing CTAs, hero buttons, brand moments. Never on product chrome.',
		'Pair with <code>variant="brand"</code> Button for the canonical jade pull.'
	],

	nonFeatures: [
		'No focus mirroring — pure hover effect. Keyboard users get nothing. Hence marketing-only.',
		'No motion-prefers handling built in. Wrap or disable manually for reduced-motion users.',
		'No fallback styling. The wrapped child renders as-is when <code>disabled</code>.'
	],

	props: [
		{
			name: 'strength',
			type: 'number',
			default: '0.3',
			description:
				'Multiplier applied to the cursor-distance offset. Higher values pull the element further.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description:
				'Disable the magnetic effect — the element stops responding to mouse movement.'
		},
		{
			name: 'transitionDuration',
			type: 'number',
			default: '300',
			description: 'CSS transition duration in milliseconds for transform changes.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the wrapping <div>.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'The element to magnetize. Typically a Button or similar CTA.'
		}
	],

	porting: [
		'Pointer-position translate × 0.3 with 300ms ease on a wrapping element. Hover-only — no focus / no keyboard mirror.'
	],

	example: `<script lang="ts">
	import { MagneticHover } from '@dashfi/svelte/ui/magnetic-hover';
<\/script>

<MagneticHover>
\t<Button variant="brand">Get the card →</Button>
</MagneticHover>`,

	accessibility: [
		'Decorative effect only — keyboard / AT users see the underlying CTA unchanged.',
		'Pair with a meaningful Button label; the magnetic motion adds no semantic weight.',
		'For users with motion sensitivities, gate the wrapper behind <code>prefers-reduced-motion</code> at the call site.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Cursor-tracking transform on the wrapping div — (cursor − center) × strength, 300ms ease. Marketing-only; no keyboard fallback.'
		}
	]
};
