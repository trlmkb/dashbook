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
			'Header + filters + table + row actions + bulk-action bar. The default shape for any "list of work items" route (invoices, disputes, reconciliations). See Bulk action bar for the dedicated selection-toolbar pattern — DropdownMenu + Button alone don\'t cover the async-run + progress + toast contract.',
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
	{
		slug: 'bulk-action-bar',
		name: 'Bulk action bar',
		description:
			'The sticky selection toolbar that appears once ≥1 row is checked. Count + clear on the left, an async BulkRunner-driven action group on the right, a busy/progress state that disables the group and reports a toast when the run finishes.',
		category: 'Data',
		uses: ['Button', 'Loader', 'toast']
	},
	{
		slug: 'card-gallery',
		name: 'Card gallery',
		description:
			'Grid↔list toggle over a set of issued cards, with a cardholder combobox facet, status chips, and per-card freeze/edit/duplicate/archive actions. The overview shape for any "collection of visual objects" surface.',
		category: 'Data',
		uses: ['ToggleGroup', 'Command', 'Popover', 'Select', 'Input', 'Pagination']
	},
	{
		slug: 'notification-inbox',
		name: 'Notification inbox',
		description:
			'Today / Yesterday / This week / This month / Older grouping over a flat notification feed, with a date-range Select filter and click-to-mark-read. The canonical shape for any chronological, groupable feed.',
		category: 'Data',
		uses: ['Select', 'Separator', 'Pill']
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
			'Linear stepper with persistent state, back/next controls, per-step validation, and a review step before submit. The apply flow uses this; KYC/KYB uses this. When NOT to use: a modal-scoped flow (add funds, a dialog wizard) — reach for In-dialog stepper instead; it trades the persisted-route stepper for a direction-aware fly transition inside one Dialog.',
		category: 'Forms',
		uses: ['Button', 'Input', 'Label', '+layout.server.ts']
	},
	{
		slug: 'in-dialog-stepper',
		name: 'In-dialog stepper',
		description:
			'A stepper that lives entirely inside one Dialog — a `steps` array of `{ component, props }`, current index in local state, direction-aware `fly` transition on step change. Used for add-funds, wire details, and other modal-scoped multi-step flows that don\'t warrant their own route.',
		category: 'Forms',
		uses: ['Dialog', 'Skeleton']
	},
	{
		slug: 'bulk-import-wizard',
		name: 'Bulk import wizard',
		description:
			'Template → upload → map columns → process, in one Dialog with a left step-rail. Drag-and-drop or click-to-browse CSV upload, auto-detected column mapping against required fields, a LinearLoader-driven processing state, and a "keep working" escape hatch so the import runs in the background.',
		category: 'Forms',
		uses: ['Dialog', 'Select', 'LinearLoader', 'Pill', 'Alert']
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
	{
		slug: 'secret-reveal',
		name: 'Secret reveal',
		description:
			'Reveal-once semantics for API keys and webhook secrets — a Dialog that opens already showing the value, with an explicit "won\'t be shown again" warning and a copy-to-clipboard field. There is no re-open; the value must be regenerated to be seen twice.',
		category: 'Confirmation',
		uses: ['Dialog', 'Button']
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
			'Two-column issued-card summary. Status pill, limit progress, controls on the right. Pattern for any "thing" detail page. Note: this is a simplified excerpt — the production card-management surface adds freeze/edit/duplicate/archive actions, a transaction feed, and permission-gated controls not reproduced here.',
		category: 'Layout',
		uses: ['Card', 'Pill', 'Progress', 'Switch', 'Button', 'Separator']
	},
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
