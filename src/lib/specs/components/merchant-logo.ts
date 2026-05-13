import type { ComponentSpec } from '../types.js';

export const merchantLogo: ComponentSpec = {
	slug: 'merchant-logo',
	name: 'Merchant Logo',
	category: 'Display',
	status: 'beta',
	importPath: "import { MerchantLogo } from '@dashfi/svelte/ui/merchant-logo'",
	description:
		'Auto-fetched merchant logo with initials fallback. Used in transaction rows and Ad-Pay surfaces.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/merchant-logo/merchant-logo.svelte',

	dimensions: [
		{
			name: 'Image',
			value: 'sized to fill the square footprint',
			notes:
				'Falls back to initials on load error or missing URL.'
		},
		{
			name: 'Loading state',
			value: 'Spinner during fetch',
			notes: 'When an image URL is provided, renders a `Spinner` while fetching.'
		},
		{
			name: 'Spade placeholders',
			value: 'auto-filtered to initials fallback',
			notes:
				'URLs containing `spadeapi.com` or `static.spade.com` are filtered — they are Spade upstream placeholders, not real logos.'
		}
	],

	tokens: [
		{
			name: 'Initials fallback',
			notes:
				'Uses muted background + foreground tokens — caller sees clean restraint without manually styling. Inherits the Avatar treatment.'
		}
	],

	sizes: [
		{ name: 'sm', height: '24px', fontSize: '12px', notes: '`size-6 text-xs`.' },
		{ name: 'md', height: '32px', fontSize: '14px', notes: '`size-8 text-sm` (default).' },
		{ name: 'lg', height: '48px', fontSize: '16px', notes: '`size-12 text-base`.' }
	],

	composition: [
		'Drop into transaction rows, Ad-Pay surfaces, merchant pickers.',
		'Always pass <code>merchantName</code> — it powers both the alt text and the initials fallback.',
		'Compose with <code>Indicator</code> on a relative parent for unread / status overlays.'
	],

	nonFeatures: [
		'No accessibility text — pair with the merchant name in body copy.',
		'No custom fallback. Initials are derived from <code>merchantName</code>.',
		'No badge / status. Compose with <code>Indicator</code> at the call site.'
	],

	props: [
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
	],

	porting: [
		'Square avatar in three sizes (24/32/48), CDN logo with initials fallback. Spinner during load; muted-bg initials on error/miss.'
	],

	example: `<script lang="ts">
	import { MerchantLogo } from '@dashfi/svelte/ui/merchant-logo';
<\/script>

<MerchantLogo merchantName="meta.com" />
<MerchantLogo merchantName="stripe.com" />
<MerchantLogo merchantName="ups.com" fallback="UPS" />`,

	accessibility: [
		'Pair with merchant name in body copy — the logo image is decorative without it.',
		'The component sets <code>alt</code> from <code>merchantName</code> so screen readers can announce it.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Three sizes (24/32/48px), CDN-fetched image with Spinner on load and initials fallback on error/miss.'
		}
	]
};
