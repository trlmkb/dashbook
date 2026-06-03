/**
 * Canonical IA — single source of truth for the 8-page portal structure.
 * The Header, Sidebar, Cmd+K palette and footer all read from this.
 */

import { marketingFoundationsContent, marketingPatternsContent } from './marketing.js';

export type NavItem = {
	title: string;
	href: string;
	description?: string;
	children?: NavItem[];
	/**
	 * `internal: true` means the route exists but should NOT be rendered as a
	 * top-level nav link, footer link, audience tile, or ⌘K search result.
	 * The route itself is gated by Vercel Deployment Protection (Team-only)
	 * — see PLAN.md §11 for the dashboard config. Lookups that resolve
	 * "what section am I on?" (Sidebar / InnerPage) still honour these
	 * entries so authed team members get the right chrome.
	 */
	internal?: boolean;
};

export const primaryNav: NavItem[] = [
	{
		title: 'Overview',
		href: '/',
		description: 'Start here — what Dashbook is and where to find what you need.'
	},
	{
		title: 'Use',
		href: '/use',
		description: 'How to use Dashbook — runbooks for engineers, designers, marketing, and the maintainer.',
		children: [
			{ title: 'Engineer', href: '/use/dev' },
			{ title: 'Designer', href: '/use/designer' },
			{ title: 'Marketing & sales', href: '/use/marketer' },
			{ title: 'Maintainer', href: '/use/maintainer' }
		]
	},
	{
		title: 'Brand',
		href: '/brand',
		description: 'Logo, color, typography, voice, motion, photography, iconography.',
		children: [
			{ title: 'Logo', href: '/brand/logo' },
			{ title: 'Card', href: '/brand/card' },
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
		title: 'Marketing',
		href: '/marketing',
		description:
			'Reusable marketing page patterns + foundations — heroes, layout frames, the shipping building blocks, tokens, type, motion.',
		internal: true,
		children: [
			...marketingFoundationsContent.map((f) => ({
				title: f.name,
				href: `/marketing/foundations/${f.slug}`
			})),
			...marketingPatternsContent.map((p) => ({
				title: p.name,
				href: `/marketing/patterns/${p.slug}`
			}))
		]
	},
	{
		title: 'Components',
		href: '/components',
		description: 'Live previews, props, code, accessibility — for every component.',
		internal: true
	},
	{
		title: 'Patterns',
		href: '/patterns',
		description: 'Page templates and recipes — card detail, KYC, transactions.',
		internal: true,
		children: [
			{ title: 'Protected app shell', href: '/patterns/protected-app-shell' },
			{ title: 'Auth split-screen', href: '/patterns/auth-split-screen' },
			{ title: 'Sub-section tabs', href: '/patterns/sub-section-tabs' },
			{ title: 'Transaction list', href: '/patterns/transaction-list' },
			{ title: 'Metric card', href: '/patterns/metric-card' },
			{ title: 'Tabbed section with counts', href: '/patterns/tabbed-section-counts' },
			{ title: 'Workflow data table page', href: '/patterns/workflow-data-table-page' },
			{ title: 'Dashboard summary', href: '/patterns/dashboard-summary' },
			{ title: 'Settings section', href: '/patterns/settings-section' },
			{ title: 'Multi-section settings', href: '/patterns/multi-section-settings' },
			{ title: 'Multi-step onboarding', href: '/patterns/multi-step-onboarding' },
			{ title: 'Destructive confirm', href: '/patterns/destructive-confirm' },
			{ title: 'Empty state', href: '/patterns/empty-zero-state' },
			{ title: 'Terminal state', href: '/patterns/terminal-state' },
			{ title: 'Card detail', href: '/patterns/card-detail' },
			{ title: 'Auth route groups', href: '/patterns/auth-route-groups' },
			{ title: 'URL-state dialog', href: '/patterns/url-state-dialog' }
		]
	},
	{
		title: 'Developers',
		href: '/developers',
		description: 'Install, theming, contribution guide, status board.',
		internal: true,
		children: [
			{ title: 'Overview', href: '/developers' },
			{ title: 'Figma library', href: '/developers/figma' },
			{ title: 'From another stack', href: '/developers/from-another-stack' },
			{ title: 'MCP server', href: '/developers/mcp' },
			{ title: 'Install', href: '/developers/install' }
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
		href: '/use/dev',
		description:
			'How to install the plugin, build a screen end-to-end, and port components to React, RN, or vanilla — plus the MCP server for LLM-driven work.'
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
