export type PatternCategory =
	| 'Shells'
	| 'Data'
	| 'Forms'
	| 'Confirmation'
	| 'States'
	| 'Layout'
	| 'Architecture';

export type PatternEntry = {
	slug: string;
	name: string;
	description: string;
	category: PatternCategory;
	uses: string[];
	/**
	 * True if the pattern's preview / code / rationale content is still being authored.
	 * The page renders a "Drafting" notice instead of empty tabs.
	 */
	draft?: boolean;
};

export const patterns: PatternEntry[] = [
	// Shells — full-page chrome compositions (page-level patterns)
	{
		slug: 'protected-app-shell',
		name: 'Protected app shell',
		description:
			'The authenticated-app frame: sidebar + topbar + content slot. Permission-driven nav, responsive dropdown↔sheet swap, global dialog mount point. Every signed-in route uses this.',
		category: 'Shells',
		uses: ['Sidebar', 'SidebarProvider', 'SidebarInset', 'SidebarTrigger', 'SidebarMenu']
	},
	{
		slug: 'auth-split-screen',
		name: 'Auth split-screen',
		description:
			'Brand visual on one side, form on the other. Used for login, signup, password reset, 2FA challenge. Same shell across every unauthenticated state.',
		category: 'Shells',
		uses: ['Card', 'Button', 'Input', 'Label']
	},
	{
		slug: 'sub-section-tabs',
		name: 'Sub-section header with tabs',
		description:
			'Section title + lede + tab strip + content. Reused inside settings, transactions, bill pay, anywhere a section needs internal navigation without leaving the protected shell.',
		category: 'Shells',
		uses: ['PageHeader', 'Pill', '$page.url', 'Separator']
	},

	// Data
	{
		slug: 'transaction-list',
		name: 'Transaction list',
		description:
			'The canonical Dash.fi data screen — search, facet filters, paginated table. Drop-in for cards, statements, ad spend, vendors.',
		category: 'Data',
		uses: ['SearchFilter', 'SelectFilter', 'Table', 'Pagination', 'Pill', 'Badge']
	},
	{
		slug: 'metric-card',
		name: 'Metric card',
		description:
			'A single headline number with a delta. The atom of every dashboard hero, KYC overview, statement summary.',
		category: 'Data',
		uses: ['Card', 'Pill']
	},
	{
		slug: 'tabbed-section-counts',
		name: 'Tabbed section with live counts',
		description:
			'Page-level pattern: tabs that double as data counters. "All (124) · Pending (3) · Settled (121)." Counts react to filters. The single most-replicated page shape inside the product.',
		category: 'Data',
		uses: ['Tabs', 'Pill', 'Table', '$page.url']
	},
	{
		slug: 'workflow-data-table-page',
		name: 'Workflow data table page',
		description:
			'Header + filters + table + row actions + bulk-action bar. The default shape for any "list of work items" route (invoices, disputes, reconciliations).',
		category: 'Data',
		uses: [
			'SearchFilter',
			'SelectFilter',
			'Table',
			'Checkbox',
			'Pagination',
			'DropdownMenu',
			'Button'
		]
	},
	{
		slug: 'dashboard-summary',
		name: 'Dashboard summary',
		description:
			'Metric tiles row + recent activity + quick actions. The home of every authenticated section — overview before drill-in.',
		category: 'Data',
		uses: ['Pill', 'Table', 'Button']
	},

	// Forms
	{
		slug: 'settings-section',
		name: 'Settings section',
		description:
			'A grouped block of form controls inside a long settings page. Label · description · control · inline help.',
		category: 'Forms',
		uses: ['Label', 'Input', 'Switch', 'Separator', 'Button']
	},
	{
		slug: 'multi-section-settings',
		name: 'Multi-section settings page',
		description:
			'Page-level: stacked Settings-section blocks with anchor side nav. Used for business profile, account, security, notifications.',
		category: 'Forms',
		// In-page anchor nav is a plain <nav>, not the lib `Sidebar` (see the pattern's own anti-pattern).
		uses: ['Label', 'Input', 'Switch', 'Separator', 'Button', 'Pill', 'IntersectionObserver']
	},
	{
		slug: 'multi-step-onboarding',
		name: 'Multi-step onboarding flow',
		description:
			'Linear stepper with persistent state, back/next controls, per-step validation, and a review step before submit. The apply flow uses this; KYC/KYB uses this.',
		category: 'Forms',
		uses: ['Button', 'Input', 'Label', '+layout.server.ts']
	},

	// Confirmation
	{
		slug: 'destructive-confirm',
		name: 'Destructive confirmation',
		description:
			'Two-step gate for irreversible actions — close card, revoke virtual, terminate user. AlertDialog with a single destructive primary.',
		category: 'Confirmation',
		uses: ['Button', 'AlertDialog']
	},

	// States
	{
		slug: 'empty-zero-state',
		name: 'Empty state',
		description:
			'What the surface looks like before there is data. Centered, opinionated, ends with a single primary CTA.',
		category: 'States',
		uses: ['Empty', 'Button']
	},
	{
		slug: 'terminal-state',
		name: 'Terminal state page',
		description:
			'Success / failure / blocked end-of-flow screen. Single message, single CTA (or two — primary + secondary). Used at the end of apply, after dispute submission, on hard-block compliance fails.',
		category: 'States',
		uses: ['Button', 'Pill', 'Lucide icons']
	},

	// Layout
	{
		slug: 'card-detail',
		name: 'Card detail',
		description:
			'Two-column issued-card summary. Status pill, limit progress, controls on the right. Pattern for any "thing" detail page.',
		category: 'Layout',
		uses: ['Card', 'Pill', 'Progress', 'Switch', 'Button', 'Separator']
	},

	// Drafts — scaffolded shape, content still being authored (render the "Drafting" notice)
	{
		slug: 'statement-archive',
		name: 'Statement archive',
		description:
			'Year pager over monthly statement rows, each opening a preview modal (PDF/CSV export). The shape for any "archive of periodic documents" surface — statements, tax forms, annual reports.',
		category: 'Data',
		uses: ['Button', 'Dialog', 'Pill'],
		draft: true
	},
	{
		slug: 'role-permission-matrix',
		name: 'Role permission matrix',
		description:
			'Master-detail: role list on the left, a permission checkbox grid on the right, collapsing to a Select-driven single-column view on mobile. For any many-roles × many-capabilities admin surface.',
		category: 'Forms',
		uses: ['Select', 'Checkbox', 'Separator'],
		draft: true
	},
	{
		slug: 'product-catalog',
		name: 'Product catalog',
		description:
			'Enable/disable rows for a set of offerable products, each with an off-ramp confirmation dialog and an expandable pricing table. For admin surfaces that toggle product availability rather than edit records.',
		category: 'Layout',
		uses: ['Switch', 'AlertDialog', 'Table'],
		draft: true
	},

	// Architecture — cross-cutting page-level techniques
	{
		slug: 'auth-route-groups',
		name: 'Auth route-group contract',
		description:
			'SvelteKit route groups encode auth state — `(auth)` / `(protected)` / `(onboarding)` / `(protected)/(2fa)`. The folder structure IS the contract for "can this user be here?"',
		category: 'Architecture',
		uses: ['SvelteKit route groups', '+layout.server.ts']
	},
	{
		slug: 'url-state-dialog',
		name: 'URL-as-state deep-linkable dialog',
		description:
			'Dialogs and sheets whose open/closed state lives in the URL via `replaceState`. Shareable, back-button-correct, refresh-survivable. Used for transaction detail, card detail, edit drawers.',
		category: 'Architecture',
		uses: ['Dialog', 'Sheet', 'replaceState', '$page.url']
	}
];

export const patternCategoryOrder: PatternCategory[] = [
	'Shells',
	'Data',
	'Forms',
	'Confirmation',
	'States',
	'Layout',
	'Architecture'
];

export function patternsByCategory(): Map<PatternCategory, PatternEntry[]> {
	const map = new Map<PatternCategory, PatternEntry[]>();
	for (const c of patternCategoryOrder) map.set(c, []);
	for (const p of patterns) map.get(p.category)?.push(p);
	return map;
}
