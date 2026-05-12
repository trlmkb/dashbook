<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { MerchantLogo } from '@dashfi/svelte/ui/merchant-logo';

	const propsTable: PropDef[] = [
		{
			name: 'merchantName',
			type: 'string',
			required: true,
			description: 'Merchant display name. Used as alt text and to derive initials fallback.'
		},
		{
			name: 'logoUrl',
			type: 'string',
			description: 'Logo image URL. Spade placeholder URLs are filtered to the initials fallback.'
		},
		{
			name: 'size',
			type: "'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Square footprint: sm=24px, md=32px, lg=48px.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		}
	];

	const example = `<script lang="ts">
	import { MerchantLogo } from '@dashfi/svelte/ui/merchant-logo';
<\/script>

<MerchantLogo merchantName="meta.com" />
<MerchantLogo merchantName="stripe.com" />
<MerchantLogo merchantName="ups.com" fallback="UPS" />`;
</script>

<svelte:head><title>Merchant Logo — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Merchant Logo"
	description="Auto-fetched merchant logo with initials fallback. Used in transaction rows and Ad-Pay surfaces."
	importPath="@dashfi/svelte/ui/merchant-logo"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:display="flex" style:gap="16px" style:align-items="center">
					<MerchantLogo merchantName="meta.com" />
					<MerchantLogo merchantName="stripe.com" />
					<MerchantLogo merchantName="ups.com" />
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
			<ul class="docs-list">
				<li>Resolves the logo via a CDN at runtime.</li>
				<li>Falls back to a colored square with merchant initials on miss.</li>
				<li>Pair with the merchant name in body copy — never rely on the logo alone for identification.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
