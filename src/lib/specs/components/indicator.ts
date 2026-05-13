import type { ComponentSpec } from '../types.js';

export const indicator: ComponentSpec = {
	slug: 'indicator',
	name: 'Indicator',
	category: 'Display',
	status: 'beta',
	importPath: "import { Indicator } from '@dashfi/svelte/ui/indicator'",
	description:
		'Small status dot. Layered over icons or avatars for unread counts, presence, alerts. Jade-only.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/indicator/indicator.svelte',

	dimensions: [
		{ name: 'Size', value: '10×10px', tw: 'size-2.5' },
		{
			name: 'Outer ring',
			value: '1px halo',
			tw: 'border',
			notes:
				'In `--color-background`. Acts as a halo so the dot reads on any surface.'
		},
		{
			name: 'Inner stack',
			value: 'two absolute rounded-full spans',
			notes:
				'The first animates `animate-ping` with `opacity-75`; the second is the solid dot.'
		},
		{
			name: 'Positioning',
			value: 'caller-controlled',
			notes:
				"Component renders relative to the parent's positioning context."
		}
	],

	tokens: [
		{
			name: 'Dot + ping',
			token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' },
			notes: '`bg-brand`. Jade.'
		},
		{
			name: 'Halo',
			token: { cssVar: '--color-background', light: '#faf8f1', dark: '#0f1413' },
			notes: '`border-background`. Cream in light, ink in dark.'
		}
	],

	composition: [
		"Place over an icon or avatar via <code>position: absolute</code> on a relative parent. The component itself uses absolute-positioned inner spans, so the outer wrapper participates in the parent's positioning context.",
		'Status-only — for counts (1, 2, 9+) use a Badge instead.'
	],

	nonFeatures: [
		'No count / number support. Status-only.',
		'No color prop. Brand jade is the single canonical accent for this dot.',
		'No size variants. <code>size-2.5</code> (10px) is the brand-tuned hit-target-adjacent size.',
		'No motion-prefers handling — <code>animate-ping</code> respects user reduced-motion settings via the Tailwind animation.'
	],

	props: [
		{
			name: 'class',
			type: 'string',
			description:
				'Additional Tailwind classes appended to the root div — use to absolutely position the dot over its anchor.'
		}
	],

	porting: [
		'10×10 jade dot + halo + pinging ring overlay. Single accent token (<code>--color-brand</code>).'
	],

	example: `<script lang="ts">
	import { Indicator } from '@dashfi/svelte/ui/indicator';
<\/script>

<div class="relative">
\t<Bell />
\t<Indicator />
</div>`,

	accessibility: [
		'The dot is decorative — convey status via an adjacent label or <code>aria-label</code> on the parent.',
		'<code>animate-ping</code> respects user reduced-motion preferences via the underlying Tailwind animation.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Canonical is size-2.5 rounded-full with a border-background halo and two absolute bg-brand spans — solid dot + animate-ping ring.'
		}
	]
};
