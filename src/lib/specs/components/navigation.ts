import type { ComponentSpec } from '../types.js';

/**
 * SubNavigation — in-page section nav.
 *
 * Two-variant horizontal nav strip; active state matched against current URL.
 * Used inside settings, profile, account flows.
 */
export const navigation: ComponentSpec = {
	slug: 'navigation',
	name: 'Sub Navigation',
	category: 'Navigation',
	status: 'beta',
	importPath: "import { SubNavigation } from '@dashfi/svelte/ui/navigation'",
	description:
		'In-page section nav — settings, profile, account flows. Uses route binding for active state. Two variants: primary (top strip) and secondary (sub-row).',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/navigation/',

	dimensions: [
		{
			name: 'Container',
			value: 'horizontal nav strip',
			notes: 'Caller passes items: { href, label }[]; component renders + matches active state internally.'
		},
		{
			name: 'Item (primary)',
			value: 'larger spacing and emphasis',
			notes: 'Top-level horizontal nav strip — default variant.'
		},
		{
			name: 'Item (secondary)',
			value: 'condensed for sub-nav placement',
			notes: 'Typically rendered under the primary header.'
		}
	],

	tokens: [
		{
			name: 'Inactive link',
			token: { cssVar: '--color-muted-foreground', light: '#6e8180', dark: '#819896' }
		},
		{
			name: 'Active link text',
			token: { cssVar: '--color-foreground', light: '#123b38', dark: '#ffffff' }
		},
		{
			name: 'Active indicator',
			token: { cssVar: '--color-foreground', light: '#123b38', dark: '#ffffff' },
			notes: 'Per variant — may use --color-brand for the secondary pill variant.'
		}
	],

	variants: [
		{ name: 'primary', description: 'Top-level horizontal nav strip (default).' },
		{ name: 'secondary', description: 'Sub-navigation row, typically under the primary header.' }
	],

	composition: [
		'Drop into the app shell at the top of a route — primary above the page header, secondary just below.',
		'Items array is a single source of truth; the component matches the current URL against <code>href</code> to set the active state.',
		'<code>match="exact"</code> matches the pathname exactly; <code>"contains"</code> matches when the pathname contains the item href (useful for nested routes).'
	],

	nonFeatures: [
		'Not a primary-app-shell sidebar. For that, compose <code>Sidebar</code> primitives directly.',
		'No custom render slot — items are label + href only.',
		'No icon support — text labels only.',
		'No nested / submenu support.'
	],

	props: [
		{
			name: 'items',
			type: 'SubNavItem[]',
			required: true,
			description: 'Navigation entries — each item has { href: string; label: string }.'
		},
		{
			name: 'variant',
			type: "'primary' | 'secondary'",
			default: "'primary'",
			description: 'Visual treatment. Primary renders vertical rail; secondary renders inline pill row.'
		},
		{
			name: 'match',
			type: "'exact' | 'contains'",
			default: "'exact'",
			description: 'Active-state strategy. Exact matches the pathname exactly; contains matches when pathname contains the item href.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		}
	],

	porting: [
		'Two-variant horizontal nav strip; active state matched against current URL.',
		'Replace SvelteKit\'s <code>$page</code>/pathname store with your router\'s equivalent.'
	],

	example: `<script lang="ts">
	import { SubNavigation } from '@dashfi/svelte/ui/navigation';

	const items = [
		{ label: 'Profile', href: '/settings/profile' },
		{ label: 'Notifications', href: '/settings/notifications' },
		{ label: 'Security', href: '/settings/security' },
		{ label: 'Billing', href: '/settings/billing' }
	];
<\/script>

<SubNavigation {items} />`,

	accessibility: [
		'Renders as <code>&lt;nav&gt;</code> for landmark navigation.',
		'Active link sets <code>aria-current="page"</code>.',
		'Standard anchor focus / activation semantics.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Horizontal sub-nav with primary and secondary variants. Item-array driven with URL-matched active state.'
		}
	]
};
