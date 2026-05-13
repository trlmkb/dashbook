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
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Sizes</strong> — <code>sm</code> = <code>size-6 text-xs</code> (24×24 / 12px text), <code>md</code> = <code>size-8 text-sm</code> (32×32 / 14px), <code>lg</code> = <code>size-12 text-base</code> (48×48 / 16px).</li>
				<li><strong>Image</strong> — sized to fill, falls back to initials on load error or missing URL.</li>
				<li><strong>Loading</strong> — when an image URL is provided, renders a <code>Spinner</code> while fetching.</li>
				<li><strong>Spade placeholders</strong> — URLs containing <code>spadeapi.com</code> or <code>static.spade.com</code> are auto-filtered to the initials fallback.</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Initials fallback uses muted background and foreground tokens — caller sees clean restraint without manually styling.</li>
			</ul>
			<div class="docs-h">Not part of MerchantLogo</div>
			<ul class="docs-list">
				<li>No accessibility text — pair with the merchant name in body copy.</li>
				<li>No custom fallback. Initials are derived from <code>merchantName</code>.</li>
				<li>No badge / status. Compose with <code>Indicator</code> at the call site.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Square avatar in three sizes (24/32/48), CDN logo with initials fallback.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch. Three sizes (24/32/48px), CDN-fetched image with Spinner on load
					and initials fallback on error/miss.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
