import type { ComponentSpec } from '../types.js';

/**
 * Tabs — switch between panes of related content.
 *
 * Two variants: primary (underline) and secondary (sliding pill).
 * Built on bits-ui — keyboard navigation and roving tabindex.
 */
export const tabs: ComponentSpec = {
	slug: 'tabs',
	name: 'Tabs',
	category: 'Navigation',
	status: 'stable',
	importPath:
		"import { Tabs, TabsList, TabsTrigger, TabsContent } from '@dashfi/svelte/ui/tabs'",
	description: 'Switch between panes of content. Underline indicator on the active tab.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/tabs/',

	dimensions: [
		{
			name: 'Tabs (root)',
			value: 'no layout styling',
			notes: 'Holds shared `value` state.'
		},
		{
			name: 'TabsContent',
			value: 'mt-2 (8px top margin)',
			tw: 'mt-2 focus-visible:ring-2 ring-ring ring-offset-2',
			notes: 'No default padding.'
		}
	],

	tokens: [
		{
			name: 'TabsList text colour',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' },
			notes: 'Both variants inherit `text-muted-foreground` on the list; triggers override on active / hover.'
		},
		{
			name: 'TabsList border (primary)',
			token: { cssVar: '--color-border', light: '#e8e6dc', dark: '#1f2a29' },
			notes: 'Bottom border uses the default `border` token.'
		},
		{
			name: 'TabsTrigger inactive',
			notes: 'text `--color-muted-foreground` (inherited).'
		},
		{
			name: 'TabsTrigger active',
			token: { cssVar: '--color-foreground', light: '#123b39', dark: '#ffffff' },
			notes:
				'Primary: bottom border switches to `--color-primary`. Secondary: position indicator pill (border `--color-primary`) slides under the active trigger. `data-[state=active]:pointer-events-none` so the active tab cannot be re-clicked.'
		},
		{
			name: 'TabsTrigger hover',
			notes:
				'text `--color-foreground`. Primary: bottom border `border-primary`. Secondary: text colour shift only.'
		},
		{
			name: 'Focus ring',
			notes: '2px (`focus-visible:ring-2`) in `--color-ring` with 2px offset.'
		},
		{ name: 'Disabled', notes: '`opacity-40` + `pointer-events-none`.' },
		{
			name: 'Transition',
			notes: '`transition-all` on triggers; secondary indicator `transition-all duration-300 ease-out`.'
		}
	],

	variants: [
		{
			name: 'primary (default)',
			description: 'Underline track — flex row with a 1px bottom border.',
			tokens: [
				{
					name: 'list',
					notes:
						'`flex items-center gap-4 border-b`. The list sits on top of a 1px line that becomes the underline track.'
				},
				{
					name: 'trigger',
					notes:
						'`px-0 py-2.5 text-sm` (10px vertical), `-mb-px` to overlap the list border, `border-b-2 border-b-transparent`. Active and hover switch the bottom border to `border-primary`.'
				}
			]
		},
		{
			name: 'secondary',
			description: 'Sliding pill indicator over rounded pill triggers.',
			tokens: [
				{
					name: 'list',
					notes:
						'`relative flex items-center gap-1 rounded-md`, with a positioned indicator child. No bottom border.'
				},
				{
					name: 'trigger',
					notes:
						'`rounded-md px-3 py-1.5 text-xs` (12px font, 12h × 6v padding), `select-none`, `relative z-0`. The pill *is* the trigger; no per-trigger border.'
				},
				{
					name: 'indicator',
					notes:
						'Absolute pill drawn on the list: `absolute top-0 bottom-0 rounded-md border border-primary pointer-events-none`. Position (`left` + `width`) tracks the active trigger via offsetLeft / offsetWidth, animated with `transition-all duration-300 ease-out` once mounted (initial render is jump-cut).'
				}
			]
		}
	],

	composition: [
		'Standard tree: <code>Tabs &gt; TabsList &gt; TabsTrigger</code> + sibling <code>TabsContent</code>. Each <code>TabsContent</code> matches a trigger by <code>value</code>.',
		'Pick the visual style on the list: <code>&lt;TabsList variant="primary"&gt;</code> for the underline (default) or <code>&lt;TabsList variant="secondary"&gt;</code> for the sliding pill.',
		'Triggers are <code>inline-flex</code> — they take only as much width as their content + padding + gap.',
		'For controlled mode, bind <code>value</code> on <code>Tabs</code>.'
	],

	nonFeatures: [
		'No additional variants beyond <code>primary</code> and <code>secondary</code>. Size is fixed per variant — primary is <code>text-sm</code>, secondary is <code>text-xs</code>.',
		'No icon-on-trigger slot. Embed icons as children: <code>&lt;TabsTrigger&gt;&lt;Icon /&gt;Label&lt;/TabsTrigger&gt;</code>.',
		'No vertical orientation styling out of the box (the <code>orientation</code> prop only affects arrow-key direction).',
		'No badge / count slot on triggers.',
		'No lazy-mount toggle — use <code>forceMount</code> on TabsContent for animation needs.',
		'No background fill on the secondary list itself. Only the sliding indicator is rendered.'
	],

	props: [
		{
			name: 'Tabs.value',
			type: 'string',
			bindable: true,
			description: 'The active tab value. Bind for controlled mode.'
		},
		{
			name: 'Tabs.activationMode',
			type: "'automatic' | 'manual'",
			default: "'automatic'",
			description: 'Whether tabs activate on focus or only on explicit selection.'
		},
		{
			name: 'Tabs.orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Layout orientation. Affects arrow-key navigation direction.'
		},
		{
			name: 'Tabs.loop',
			type: 'boolean',
			default: 'true',
			description: 'Whether keyboard navigation wraps around at the ends.'
		},
		{
			name: 'TabsList.variant',
			type: "'primary' | 'secondary'",
			default: "'primary'",
			description: 'Primary renders an underline track; secondary renders a sliding pill indicator.'
		},
		{
			name: 'TabsTrigger.value',
			type: 'string',
			required: true,
			description: 'Unique value identifying this trigger and its corresponding content.'
		},
		{
			name: 'TabsContent.value',
			type: 'string',
			required: true,
			description: 'Must match the value of the matching trigger.'
		},
		{
			name: 'TabsContent.forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting when inactive — useful for animated transitions.'
		}
	],

	porting: [
		'<strong>Primary</strong>: flex row with a 1px bottom border (<code>--color-border</code>). Triggers are text-only with <code>px-0 py-2.5 text-sm</code>. Active gets a 2px bottom border in <code>--color-primary</code>; <code>-mb-px</code> makes it overlap the list border so it visually replaces a segment.',
		'<strong>Secondary</strong>: <code>rounded-md</code> list with <code>gap-1</code>. Triggers are <code>rounded-md px-3 py-1.5 text-xs</code> pills; an absolute indicator pill (<code>border border-primary rounded-md</code>) slides under the active trigger via JS-measured <code>offsetLeft</code> / <code>offsetWidth</code> with 300ms ease-out.'
	],

	example: `<script lang="ts">
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '@dashfi/svelte/ui/tabs';
<\/script>

<Tabs value="overview">
	<TabsList>
		<TabsTrigger value="overview">Overview</TabsTrigger>
		<TabsTrigger value="transactions">Transactions</TabsTrigger>
		<TabsTrigger value="rewards">Rewards</TabsTrigger>
	</TabsList>
	<TabsContent value="overview">…overview pane…</TabsContent>
	<TabsContent value="transactions">…transactions pane…</TabsContent>
	<TabsContent value="rewards">…rewards pane…</TabsContent>
</Tabs>`,

	accessibility: [
		'Implements WAI-ARIA tabs pattern. <code>Arrow Left/Right</code> moves between triggers, <code>Home/End</code> jumps to first/last.',
		'Inactive tab panes are removed from the tab order until activated.',
		'Each <code>TabsTrigger</code> needs unique <code>value</code>; pair with a meaningful label.',
		"Provide <code>aria-label</code> on <code>Tabs</code> if the surrounding context doesn't make the purpose clear."
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. The canonical now ships a real variant="secondary" on TabsList — a sliding border-primary pill indicator over rounded-md px-3 py-1.5 text-xs pill triggers, alongside the existing underline default. The primary trigger padding also shifted to px-0 py-2.5 with a border-b-2 indicator. The previous v0.3.1 anatomy referenced a stale branch (and incorrectly claimed no secondary variant existed) and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-13',
			note: 'Anatomy tightened: per-part dimensions (flex row with border-b, triggers px-0.5 py-2 with -mb-px overlap), per-state token tuples (inactive --color-muted-foreground, active --color-foreground + border-b-primary underline), and explicit non-features (no pill / segmented variant in canonical). Matches the Input precedent.'
		},
		{
			version: 'v0.3.0',
			date: '2026-05-10',
			note: 'First documented in Dashbook.'
		}
	]
};
