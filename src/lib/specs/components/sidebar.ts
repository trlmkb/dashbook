import type { ComponentSpec } from '../types.js';

/**
 * Sidebar — the authenticated-app navigation shell.
 *
 * A ~20-sub-component family (bits-ui Sheet under the hood on mobile) that
 * backs every signed-in route via the Protected app shell pattern. Documented
 * here because it was previously referenced by that pattern but had no
 * standalone component page.
 */
export const sidebar: ComponentSpec = {
	slug: 'sidebar',
	name: 'Sidebar',
	category: 'Navigation',
	status: 'beta',
	importPath:
		"import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarMenu } from '@dashfi/svelte/ui/sidebar'",
	description:
		'The authenticated-app navigation shell. Collapsible (icon / offcanvas / none), auto-swaps to a Sheet below the md breakpoint, Cmd/Ctrl+B keyboard shortcut. Every signed-in route mounts inside it via the Protected app shell pattern.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/sidebar/',

	whenToUse:
		'Use Sidebar for the authenticated-app navigation frame — one per protected layout, mounted once at the layout root via SidebarProvider. Do not reach for it as a generic "panel on the side" primitive; for that, compose a plain flex layout instead.',

	dimensions: [
		{
			name: 'Sidebar width (expanded)',
			value: '16rem',
			notes: '--sidebar-width CSS var, set by SidebarProvider.'
		},
		{
			name: 'Sidebar width (mobile sheet)',
			value: '18rem',
			notes: '--sidebar-width-mobile — the Sheet drawer width below md.'
		},
		{
			name: 'Sidebar width (icon-collapsed)',
			value: '3rem',
			notes: '--sidebar-width-icon — width when collapsible="icon" is collapsed.'
		},
		{
			name: 'SidebarMenuButton height',
			value: '32px default / 28px sm / 48px lg',
			tw: 'h-8 / h-7 / h-12'
		},
		{
			name: 'SidebarTrigger',
			value: '28×28 (Button size="icon")',
			tw: 'size-7'
		},
		{
			name: 'Breakpoint',
			value: '768px (md)',
			notes: 'Below it, Sidebar renders as a Sheet instead of a fixed column.'
		}
	],

	tokens: [
		{
			name: 'Background',
			token: { cssVar: '--sidebar', light: 'var(--color-sidebar)', dark: 'var(--color-sidebar)' },
			notes: 'bg-sidebar / text-sidebar-foreground utility pair.'
		},
		{
			name: 'Active menu item',
			token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' },
			notes: 'data-active="true" sets bg-brand/10 + text-brand — the only jade-tinted state.'
		},
		{
			name: 'Rail hover border',
			notes: 'hover:after:bg-sidebar-border — the thin drag-resize affordance on the rail.'
		}
	],

	variants: [
		{ name: 'sidebar', description: 'Default — fixed column, full height.' },
		{
			name: 'floating',
			description: 'Card-style with border + shadow-sm, inset from the viewport edge.'
		},
		{
			name: 'inset',
			description: 'Pairs with SidebarInset — the content area gets rounded corners + margin.'
		}
	],

	composition: [
		'Mount <code>SidebarProvider</code> once at the protected layout root — it owns open/collapsed state, the keyboard shortcut, and a shared Tooltip.Provider for icon-collapsed tooltips.',
		'<code>Sidebar</code> renders the nav column; pair its <code>collapsible</code> prop (<code>offcanvas</code> / <code>icon</code> / <code>none</code>) with the desired desktop behavior — mobile always renders as a Sheet regardless of this prop.',
		'Structure inside <code>Sidebar</code>: <code>SidebarHeader</code> (brand) → <code>SidebarContent</code> (one or more <code>SidebarGroup</code> + <code>SidebarGroupLabel</code> + <code>SidebarGroupContent</code> + <code>SidebarMenu</code> of <code>SidebarMenuItem</code>/<code>SidebarMenuButton</code>) → <code>SidebarFooter</code> (user menu).',
		'<code>SidebarInset</code> wraps the page content sibling to <code>Sidebar</code>; use it (not a bare <code>&lt;main&gt;</code>) so the <code>variant="inset"</code> rounded-corner treatment works.',
		'<code>SidebarTrigger</code> belongs in the page topbar, not inside the sidebar itself — it must stay reachable while the sidebar is collapsed or hidden.',
		'Nav arrays should carry their own <code>visible</code> predicate and be <code>.filter()</code>ed before the <code>{#each}</code> — never wrap individual <code>SidebarMenuItem</code>s in <code>{#if}</code>.'
	],

	nonFeatures: [
		'No built-in breadcrumb or page title — those live in the topbar, composed separately.',
		'No multi-level nested nav beyond SidebarMenuSub — it is one level of sub-items, not an arbitrary tree.',
		'No built-in resize-by-drag; SidebarRail is a click-to-toggle affordance, not a drag handle.',
		'Right-side placement (<code>side="right"</code>) exists on the API but is unused in Dash.fi — the product convention is left-side only.'
	],

	props: [
		{
			name: 'SidebarProvider.open',
			type: 'boolean',
			default: 'true',
			bindable: true,
			description: 'Desktop expanded/collapsed state.'
		},
		{
			name: 'SidebarProvider.onOpenChange',
			type: '(open: boolean) => void',
			description: 'Fired when open state changes (including via the keyboard shortcut).'
		},
		{
			name: 'Sidebar.side',
			type: "'left' | 'right'",
			default: "'left'",
			description: 'Which viewport edge the sidebar docks to.'
		},
		{
			name: 'Sidebar.variant',
			type: "'sidebar' | 'floating' | 'inset'",
			default: "'sidebar'",
			description: 'Visual treatment — see Variants.'
		},
		{
			name: 'Sidebar.collapsible',
			type: "'offcanvas' | 'icon' | 'none'",
			default: "'offcanvas'",
			description: 'Desktop collapse behavior. Mobile always uses a Sheet regardless.'
		},
		{
			name: 'SidebarMenuButton.isActive',
			type: 'boolean',
			default: 'false',
			description: 'Highlights the current route — bg-brand/10 + text-brand.'
		},
		{
			name: 'SidebarMenuButton.tooltipContent',
			type: 'Snippet | string',
			description: 'Shown on hover when the sidebar is icon-collapsed; hidden otherwise.'
		},
		{
			name: 'SidebarTrigger.onclick',
			type: '(e: MouseEvent) => void',
			description: 'Additional handler; the trigger always also calls sidebar.toggle().'
		}
	],

	porting: [
		'A fixed nav column that becomes an off-canvas drawer (Sheet/Dialog) below ~768px, with an icon-collapsed rail state on desktop and a Cmd/Ctrl+B toggle shortcut.',
		'Active-state highlight is background + text color only (brand/10 + brand) — no left-border accent, no icon recoloring beyond the shared text color.',
		'Preserve the header/content/footer three-slot structure — brand at top, scrollable nav groups in the middle, user identity pinned at the bottom.'
	],

	example: `<script lang="ts">
	import {
		SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
		SidebarMenu, SidebarMenuItem, SidebarMenuButton,
		SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
		SidebarInset, SidebarTrigger
	} from '@dashfi/svelte/ui/sidebar';
<\/script>

<SidebarProvider>
	<Sidebar collapsible="icon">
		<SidebarHeader><a href="/"><LogoMark variant="wordmark" /></a></SidebarHeader>
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>Workspace</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton isActive={true}>
								<Home size={16} /><span>Dashboard</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
		<SidebarFooter><UserMenu /></SidebarFooter>
	</Sidebar>

	<SidebarInset>
		<header><SidebarTrigger /></header>
		<main>{@render children()}</main>
	</SidebarInset>
</SidebarProvider>`,

	accessibility: [
		'The mobile drawer renders via bits-ui <code>Sheet</code>, inheriting its focus trap and Escape-to-close behavior; its title/description are visually hidden but present for screen readers.',
		'<code>SidebarTrigger</code> carries an <code>sr-only</code> "Toggle Sidebar" label alongside its icon.',
		'<code>SidebarRail</code> exposes <code>aria-label="Toggle Sidebar"</code> and a native <code>title</code> tooltip.',
		'Icon-collapsed <code>SidebarMenuButton</code>s surface their label via a <code>Tooltip</code> on hover/focus rather than dropping it entirely.'
	],

	changelog: [
		{
			version: 'v0.5.3',
			date: '2026-07-11',
			note: 'First documented in Dashbook — was referenced by the protected-app-shell pattern but had no standalone component page.'
		}
	]
};
