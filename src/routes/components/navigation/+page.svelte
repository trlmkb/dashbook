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
</ComponentLayout>
