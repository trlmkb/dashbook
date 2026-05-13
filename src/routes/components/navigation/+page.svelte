<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { SubNavigation } from '@dashfi/svelte/ui/navigation';

	const propsTable: PropDef[] = [
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
	];

	const items = [
		{ label: 'Profile', href: '/settings/profile' },
		{ label: 'Notifications', href: '/settings/notifications' },
		{ label: 'Security', href: '/settings/security' },
		{ label: 'Billing', href: '/settings/billing' }
	];

	const example = `<script lang="ts">
	import { SubNavigation } from '@dashfi/svelte/ui/navigation';
<\/script>

const items = [
\t{ label: 'Profile', href: '/settings/profile' },
\t{ label: 'Notifications', href: '/settings/notifications' },
\t{ label: 'Security', href: '/settings/security' },
\t{ label: 'Billing', href: '/settings/billing' }
];

<SubNavigation {items} />`;
</script>

<svelte:head><title>Sub Navigation — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Sub Navigation"
	description="In-page section nav — settings, profile, account flows. Uses route binding for active state."
	importPath="@dashfi/svelte/ui/navigation"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<div style:width="240px">
					<SubNavigation {items} />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Variants</div>
			<ul class="docs-list">
				<li><strong>primary</strong> — top-level horizontal nav strip (default).</li>
				<li><strong>secondary</strong> — sub-navigation row, typically under the primary header.</li>
			</ul>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li>Each item renders as a link. The component manages active-state styling internally — caller passes <code>items: &#123; href, label &#125;[]</code>.</li>
				<li>Primary variant uses larger spacing and emphasis; secondary is condensed for sub-nav placement.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Inactive links <code>--color-muted-foreground</code>; active link <code>--color-foreground</code>.</li>
				<li>Active indicator (per variant) uses <code>--color-foreground</code> or <code>--color-brand</code>.</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Drop into the app shell at the top of a route — primary above the page header, secondary just below.</li>
				<li>Items array is a single source of truth; the component matches the current URL against <code>href</code> to set the active state.</li>
			</ul>
			<div class="docs-h">Not part of SubNavigation</div>
			<ul class="docs-list">
				<li>Not a primary-app-shell sidebar. For that, compose <code>Sidebar</code> primitives directly.</li>
				<li>No custom render slot — items are label + href only.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Two-variant horizontal nav strip; active state matched against current URL.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Horizontal sub-nav
					with <code>primary</code> and <code>secondary</code> variants. Item-array driven
					with URL-matched active state.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
