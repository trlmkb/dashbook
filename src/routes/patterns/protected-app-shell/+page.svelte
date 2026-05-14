<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import LogoMark from '$chrome/LogoMark.svelte';
	import {
		SidebarProvider,
		Sidebar,
		SidebarContent,
		SidebarHeader,
		SidebarFooter,
		SidebarMenu,
		SidebarMenuItem,
		SidebarMenuButton,
		SidebarGroup,
		SidebarGroupLabel,
		SidebarGroupContent,
		SidebarInset,
		SidebarTrigger,
		SidebarSeparator
	} from '@dashfi/svelte/ui/sidebar';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Pill } from '@dashfi/svelte/ui/pill';
	import Home from '@lucide/svelte/icons/home';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import Receipt from '@lucide/svelte/icons/receipt';
	import Wallet from '@lucide/svelte/icons/wallet';
	import Settings from '@lucide/svelte/icons/settings';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';

	// Permissions / feature flags drive the nav. In production these come from the
	// session loader; here they're literal so the preview is reproducible.
	const perms = { canViewAdmin: true, canViewBilling: true };
	const flags = { rewardsBeta: false };

	type NavItem = {
		title: string;
		icon: typeof Home;
		href: string;
		active?: boolean;
		visible?: boolean;
	};

	const primaryNav: NavItem[] = [
		{ title: 'Dashboard', icon: Home, href: '/dashboard', active: true },
		{ title: 'Cards', icon: CreditCard, href: '/cards' },
		{ title: 'Transactions', icon: Receipt, href: '/transactions' },
		{ title: 'Bill pay', icon: Wallet, href: '/bill-pay', visible: perms.canViewBilling },
		{ title: 'Rewards', icon: ShieldCheck, href: '/rewards', visible: flags.rewardsBeta }
	];

	const adminNav: NavItem[] = [
		{ title: 'Settings', icon: Settings, href: '/settings' },
		{ title: 'Admin', icon: ShieldCheck, href: '/admin', visible: perms.canViewAdmin }
	];

	const example = `<script lang="ts">
\timport {
\t\tSidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
\t\tSidebarMenu, SidebarMenuItem, SidebarMenuButton,
\t\tSidebarGroup, SidebarGroupLabel, SidebarGroupContent,
\t\tSidebarInset, SidebarTrigger, SidebarSeparator
\t} from '@dashfi/svelte/ui/sidebar';
\timport type { LayoutData } from './$types';

\tlet { data, children }: { data: LayoutData; children: Snippet } = $props();

\t// Permissions + flags arrive on \`data\` from +layout.server.ts.
\t// The nav array filters them out before render — there's no per-item if-block.
\tconst nav = $derived(
\t\t[
\t\t\t{ title: 'Dashboard', icon: Home, href: '/dashboard' },
\t\t\t{ title: 'Cards', icon: CreditCard, href: '/cards' },
\t\t\t{ title: 'Transactions', icon: Receipt, href: '/transactions' },
\t\t\t{ title: 'Bill pay', icon: Wallet, href: '/bill-pay', visible: data.perms.canViewBilling },
\t\t\t{ title: 'Rewards', icon: ShieldCheck, href: '/rewards', visible: data.flags.rewardsBeta }
\t\t].filter((i) => i.visible !== false)
\t);
<\/script>

<SidebarProvider>
\t<Sidebar collapsible="icon">
\t\t<SidebarHeader>
\t\t\t<a href="/" class="brand"><LogoMark variant="wordmark" /></a>
\t\t</SidebarHeader>

\t\t<SidebarContent>
\t\t\t<SidebarGroup>
\t\t\t\t<SidebarGroupContent>
\t\t\t\t\t<SidebarMenu>
\t\t\t\t\t\t{#each nav as item (item.href)}
\t\t\t\t\t\t\t<SidebarMenuItem>
\t\t\t\t\t\t\t\t<SidebarMenuButton isActive={\$page.url.pathname.startsWith(item.href)}>
\t\t\t\t\t\t\t\t\t{#snippet child({ props })}
\t\t\t\t\t\t\t\t\t\t<a href={item.href} {...props}>
\t\t\t\t\t\t\t\t\t\t\t<item.icon size={16} />
\t\t\t\t\t\t\t\t\t\t\t<span>{item.title}</span>
\t\t\t\t\t\t\t\t\t\t</a>
\t\t\t\t\t\t\t\t\t{/snippet}
\t\t\t\t\t\t\t\t</SidebarMenuButton>
\t\t\t\t\t\t\t</SidebarMenuItem>
\t\t\t\t\t\t{/each}
\t\t\t\t\t</SidebarMenu>
\t\t\t\t</SidebarGroupContent>
\t\t\t</SidebarGroup>
\t\t</SidebarContent>

\t\t<SidebarFooter>
\t\t\t<UserMenu user={data.user} />
\t\t</SidebarFooter>
\t</Sidebar>

\t<SidebarInset>
\t\t<header class="topbar">
\t\t\t<SidebarTrigger />
\t\t\t<Breadcrumb />
\t\t</header>
\t\t<main class="content">
\t\t\t{@render children()}
\t\t</main>
\t</SidebarInset>
</SidebarProvider>`;
</script>

<svelte:head><title>Protected app shell — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Protected app shell"
	description="The authenticated-app frame: sidebar + topbar + content slot. Permission-driven nav, responsive dropdown↔sheet swap, global dialog mount point. Every signed-in route uses this."
	uses={['Sidebar', 'SidebarProvider', 'SidebarInset', 'SidebarTrigger', 'SidebarMenu']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="600px">
			{#snippet children(_m)}
				<div class="shell-frame">
					<SidebarProvider open={true} class="!min-h-0 !h-full">
						<Sidebar collapsible="none">
							<SidebarHeader>
								<div class="brand">
									<LogoMark variant="wordmark" class="brand-wordmark" />
								</div>
							</SidebarHeader>

							<SidebarSeparator />

							<SidebarContent>
								<SidebarGroup>
									<SidebarGroupLabel>Workspace</SidebarGroupLabel>
									<SidebarGroupContent>
										<SidebarMenu>
											{#each primaryNav.filter((i) => i.visible !== false) as item (item.href)}
												<SidebarMenuItem>
													<SidebarMenuButton isActive={item.active === true}>
														<item.icon size={16} strokeWidth={1.5} />
														<span>{item.title}</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
											{/each}
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>

								<SidebarGroup>
									<SidebarGroupLabel>Admin</SidebarGroupLabel>
									<SidebarGroupContent>
										<SidebarMenu>
											{#each adminNav.filter((i) => i.visible !== false) as item (item.href)}
												<SidebarMenuItem>
													<SidebarMenuButton>
														<item.icon size={16} strokeWidth={1.5} />
														<span>{item.title}</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
											{/each}
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							</SidebarContent>

							<SidebarFooter>
								<div class="user-menu">
									<div class="avatar">ZY</div>
									<div class="user-meta">
										<div class="user-name">Zygis Y.</div>
										<div class="user-org">Dash.fi · Owner</div>
									</div>
									<ChevronRight size={14} strokeWidth={1.5} />
								</div>
							</SidebarFooter>
						</Sidebar>

						<SidebarInset>
							<header class="topbar">
								<SidebarTrigger />
								<div class="breadcrumb">
									<span class="crumb">Workspace</span>
									<span class="sep">/</span>
									<span class="crumb">Dashboard</span>
								</div>
								<Pill type="success">Live</Pill>
							</header>

							<main class="content">
								<div class="content-head">
									<div class="label">Overview</div>
									<h2>Welcome back, Zygis.</h2>
								</div>
								<div class="placeholder-grid">
									<div class="placeholder-tile">
										<div class="tile-label">Open balance</div>
										<div class="tile-value">$42,318.91</div>
									</div>
									<div class="placeholder-tile">
										<div class="tile-label">Pending</div>
										<div class="tile-value">$1,204.00</div>
									</div>
									<div class="placeholder-tile">
										<div class="tile-label">Active cards</div>
										<div class="tile-value">28</div>
									</div>
								</div>
								<Button variant="brand">Issue card</Button>
							</main>
						</SidebarInset>
					</SidebarProvider>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				This is the centerpiece of authenticated Dash.fi. Every signed-in route mounts inside it.
				The shape is three layers stacked horizontally: navigation (Sidebar) · workspace
				(SidebarInset) · global overlays (Dialog / Sheet mounted at the SidebarProvider root).
				Centralising the chrome here means a new route is one file with a content snippet, never
				a re-implementation of nav or topbar.
			</p>

			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Permission-driven nav as a filtered array, not <code>{`{#if}`}</code> per item.</strong>
					Each nav entry carries its own <code>visible</code> predicate sourced from session +
					flags; one <code>.filter()</code> derives the rendered list. New nav rows don't fork
					the markup.
				</li>
				<li>
					<strong>SidebarProvider at the layout root, not per-page.</strong> Mounting once means
					the sidebar state (collapsed / expanded), keyboard shortcut, and Tooltip provider all
					live in one place. Children just emit their content.
				</li>
				<li>
					<strong>Collapse mode: <code>icon</code> on desktop, <code>offcanvas</code> via
						Sheet on mobile.</strong> Same component, two responsive modes; the lib swaps to
					<code>Sheet</code> below the breakpoint automatically. No separate mobile nav to
					maintain.
				</li>
				<li>
					<strong>Active-route highlight by URL match, not local state.</strong>
					<code>isActive={`{$page.url.pathname.startsWith(item.href)}`}</code> means deep links
					and back-button stay correct without per-page bookkeeping.
				</li>
				<li>
					<strong>Footer holds the user menu, not the topbar.</strong> Topbar real estate is for
					context (breadcrumbs, status), not identity. The sidebar bottom is where the user
					always finds themselves — including the sign-out affordance.
				</li>
				<li>
					<strong>SidebarTrigger lives in the topbar.</strong> Putting it inside the sidebar
					would mean clicking inside a hidden element to reveal it. Topbar placement keeps the
					trigger reachable in every state.
				</li>
			</ul>

			<h3>Responsive strategy</h3>
			<ul>
				<li>
					<strong>≥ 768px</strong> — sidebar visible by default, collapsible to icon-only via
					<code>collapsible="icon"</code>. Topbar always shows breadcrumbs.
				</li>
				<li>
					<strong>&lt; 768px</strong> — sidebar hides behind a Sheet (lib handles the swap).
					SidebarTrigger opens it as a left-side drawer. Topbar collapses breadcrumbs to a
					single current-page label.
				</li>
				<li>
					<strong>Keyboard</strong> — the provider wires <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>B</kbd>
					to toggle. Don't override.
				</li>
			</ul>

			<h3>Source</h3>
			<p>
				Distilled from <code>(protected)/+layout.svelte</code> +
				<code>(protected)/app.svelte</code> in dashfi-ui. Full inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern L4).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Pinned context bar</strong> — when the user is acting on behalf of another
					entity (impersonation, multi-tenant org switching), add a slim ribbon ABOVE the
					topbar. Distinct background colour, single dismiss/exit affordance. Keep it inside
					SidebarInset so the sidebar remains stable.
				</li>
				<li>
					<strong>Floating sidebar variant</strong> — pass <code>variant="floating"</code> to
					<code>Sidebar</code> for a card-style sidebar with border + shadow. Use sparingly —
					it's a marketing-app aesthetic, not a workhorse-app one.
				</li>
				<li>
					<strong>Right-side sidebar</strong> — <code>side="right"</code>. We don't use this in
					Dash.fi (LTR primary content convention), but it's the same API.
				</li>
				<li>
					<strong>Without sidebar</strong> — for "focused" flows (onboarding, dispute resolution,
					anything wizard-like), use a different shell entirely (<a
						href="/patterns/auth-split-screen">Auth split-screen</a>) rather than disabling the
					sidebar. Sidebar-disabled-with-everything-else-the-same is uncanny.
				</li>
			</ul>

			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't render a nav item with <code>{`{#if visible}`}</code> wrapper.</strong>
					Filter the array. The <code>{`{#each}`}</code> stays clean and the order of conditional
					items doesn't drift.
				</li>
				<li>
					<strong>Don't mount Dialogs inside <code>SidebarInset</code>.</strong> They need to
					escape the sidebar+inset layout. Mount at the
					<code>SidebarProvider</code> root or directly under <code>{`<body>`}</code> via a
					portal — bits-ui handles this automatically with its overlay primitive.
				</li>
				<li>
					<strong>Don't put the user menu in the topbar.</strong> It splits identity from
					navigation, and the topbar is contextual to the current page. SidebarFooter is the
					user's home.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.shell-frame {
		width: 100%;
		height: 540px;
		border: 1px solid var(--border);
		overflow: hidden;
	}
	.brand {
		display: flex;
		align-items: center;
		padding: 8px 12px;
	}
	/* Canonical wordmark SVG via `<LogoMark variant="wordmark" />`.
	   No hand-rolled "D in a square" — that's the anti-pattern this
	   pattern's own anatomy warns against. */
	:global(.brand-wordmark) {
		width: 72px;
		height: auto;
		color: var(--fg);
	}
	.user-menu {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		cursor: pointer;
	}
	.user-menu:hover {
		background: rgba(0, 0, 0, 0.04);
	}
	.avatar {
		width: 28px;
		height: 28px;
		background: var(--m-cobalt, #354cef);
		color: #fff;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		flex-shrink: 0;
	}
	.user-meta {
		flex: 1;
		min-width: 0;
	}
	.user-name {
		font-size: 12px;
		font-weight: 500;
	}
	.user-org {
		font-size: 10px;
		color: var(--fg-muted);
	}

	.topbar {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 16px;
		border-bottom: 1px solid var(--border);
		background: var(--bg);
	}
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 6px;
		flex: 1;
		font-size: 12px;
		color: var(--fg-muted);
	}
	.breadcrumb .crumb:last-child {
		color: var(--fg);
	}
	.breadcrumb .sep {
		opacity: 0.5;
	}

	.content {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		overflow-y: auto;
	}
	.content-head .label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 4px;
	}
	.content-head h2 {
		margin: 0;
		font-size: 22px;
		font-weight: 400;
		letter-spacing: -0.01em;
	}

	.placeholder-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.placeholder-tile {
		padding: 16px;
		background: var(--bg);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.tile-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.tile-value {
		font-family: var(--font-mono);
		font-size: 20px;
		font-weight: 300;
		letter-spacing: -0.01em;
		color: var(--fg);
	}

	.rationale {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 720px;
	}
	.rationale h3 {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 24px 0 4px;
	}
	.rationale h3:first-child {
		margin-top: 0;
	}
	.rationale p {
		font-size: 14px;
		line-height: 1.65;
		color: var(--fg);
		margin: 0;
	}
	.rationale ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.rationale li {
		padding: 10px 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		border-top: 1px solid var(--border);
	}
	.rationale li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.rationale code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
	.rationale kbd {
		font-family: var(--font-mono);
		font-size: 0.9em;
		border: 1px solid var(--border);
		background: var(--bg-muted);
		padding: 1px 6px;
		border-radius: 2px;
	}
	.rationale a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
