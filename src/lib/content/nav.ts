/**
 * Canonical IA — single source of truth for the 8-page portal structure.
 * The Header, Sidebar, Cmd+K palette and footer all read from this.
 */

export type NavItem = {
	title: string;
	href: string;
	description?: string;
	children?: NavItem[];
};

export const primaryNav: NavItem[] = [
	{
		title: 'Overview',
		href: '/',
		description: 'Start here — what Dashbook is and where to find what you need.'
	},
	{
		title: 'Brand',
		href: '/brand',
		description: 'Logo, color, typography, voice, motion, photography, iconography.',
		children: [
			{ title: 'Logo', href: '/brand/logo' },
			{ title: 'Color', href: '/brand/color' },
			{ title: 'Typography', href: '/brand/typography' },
			{ title: 'Voice', href: '/brand/voice' },
			{ title: 'Motion', href: '/brand/motion' },
			{ title: 'Photography', href: '/brand/photography' },
			{ title: 'Iconography', href: '/brand/iconography' }
		]
	},
	{
		title: 'Foundations',
		href: '/foundations',
		description: 'Tokens, spacing, layout, elevation, accessibility, data viz, currency.',
		children: [
			{ title: 'Color', href: '/foundations/color' },
			{ title: 'Typography', href: '/foundations/typography' },
			{ title: 'Spacing', href: '/foundations/spacing' },
			{ title: 'Radius', href: '/foundations/radius' },
			{ title: 'Elevation', href: '/foundations/elevation' },
			{ title: 'Motion', href: '/foundations/motion' },
			{ title: 'Accessibility', href: '/foundations/accessibility' },
			{ title: 'Data viz', href: '/foundations/data-viz' },
			{ title: 'Currency', href: '/foundations/currency' }
		]
	},
	{
		title: 'Components',
		href: '/components',
		description: 'Live previews, props, code, accessibility — for every component.'
	},
	{
		title: 'Patterns',
		href: '/patterns',
		description: 'Page templates and recipes — card detail, KYC, transactions.',
		children: [
			{ title: 'Transaction list', href: '/patterns/transaction-list' },
			{ title: 'Metric card', href: '/patterns/metric-card' },
			{ title: 'Destructive confirm', href: '/patterns/destructive-confirm' },
			{ title: 'Empty state', href: '/patterns/empty-zero-state' },
			{ title: 'Settings section', href: '/patterns/settings-section' },
			{ title: 'Card detail', href: '/patterns/card-detail' }
		]
	},
	{
		title: 'Developers',
		href: '/developers',
		description: 'Install, theming, contribution guide, status board.',
		children: [
			{ title: 'Overview', href: '/developers' },
			{ title: 'Figma library', href: '/developers/figma' }
		]
	},
	{
		title: 'Press & Partners',
		href: '/press',
		description: 'Brand kit, partner lockups, exec bios, legal disclosures.'
	},
	{
		title: 'Changelog',
		href: '/changelog',
		description: 'Dated release notes for the design system.'
	}
];

export const audienceTiles: NavItem[] = [
	{
		title: 'For designers',
		href: '/brand',
		description:
			'Logos, color, typography, voice, motion. The full brand book — and a Figma library you can subscribe to.'
	},
	{
		title: 'For engineers',
		href: '/components',
		description:
			'Every component, live, with copy-pasteable Svelte snippets, accessibility notes, and changelogs.'
	},
	{
		title: 'For press & partners',
		href: '/press',
		description:
			'Logos, exec bios, customer logos, "Powered by Dash" badge, legal disclosure library.'
	}
];

export const footerLinks: { title: string; items: NavItem[] }[] = [
	{
		title: 'Resources',
		items: [
			{ title: 'GitHub', href: 'https://github.com/' },
			{ title: 'Figma library', href: 'https://www.figma.com/' },
			{ title: 'Storybook', href: '#' }
		]
	},
	{
		title: 'Legal',
		items: [
			{ title: 'Trademark usage', href: '/press#trademark' },
			{ title: 'Font license', href: '/brand/typography#license' }
		]
	}
];
