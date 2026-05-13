import type { ComponentSpec } from '../types.js';

/**
 * Avatar — circular user / merchant identity.
 *
 * Image with fallback initials. Built on bits-ui — handles image-load
 * timing automatically.
 */
export const avatar: ComponentSpec = {
	slug: 'avatar',
	name: 'Avatar',
	category: 'Display',
	status: 'stable',
	importPath:
		"import { Avatar, AvatarImage, AvatarFallback } from '@dashfi/svelte/ui/avatar'",
	description: 'Circular user or merchant identity. Image with fallback initials.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/avatar/',

	dimensions: [
		{
			name: 'Avatar (root)',
			value: '40px square',
			tw: 'h-10 w-10 rounded-full overflow-hidden shrink-0 relative',
			notes: 'Children can sit absolutely.'
		},
		{
			name: 'AvatarImage',
			value: 'fills parent',
			tw: 'h-full w-full aspect-square',
			notes: "Loaded via bits-ui's image state machine — hidden until `loaded`."
		},
		{
			name: 'AvatarFallback',
			value: 'fills parent, centred',
			tw: 'h-full w-full rounded-full flex items-center justify-center'
		}
	],

	tokens: [
		{
			name: 'Fallback background',
			token: { cssVar: '--color-muted', light: '#eceae0', dark: '#181e1d' }
		},
		{
			name: 'Fallback text',
			notes:
				'Inherits from parent. No explicit colour token; rely on the surrounding text colour (`--color-foreground` by default).'
		},
		{ name: 'Border', notes: 'none. The avatar reads against whatever surface it sits on.' }
	],

	composition: [
		'Always render at least <code>AvatarFallback</code> — it covers the load-failure path. Pair with <code>AvatarImage</code> for the happy path.',
		'Common sizes: <code>h-8 w-8</code> (table rows), <code>h-10 w-10</code> (default, lists), <code>h-12 w-12</code> (profile chips), <code>h-16 w-16</code> (settings cards). Override via <code>class</code>.',
		'For decorative avatars accompanied by adjacent name text, pass <code>alt=""</code> on <code>AvatarImage</code> so screen readers ignore the duplicate.'
	],

	nonFeatures: [
		'No <code>size</code> prop. Use Tailwind <code>h-*</code> / <code>w-*</code> via <code>class</code>.',
		'No <code>tone</code> prop. There is no <code>brand</code> / <code>ink</code> variant in the canonical — fallback is always <code>--color-muted</code>. The rebuild adds tones; the canonical does not.',
		'No initials prop. Pass initials as children of <code>AvatarFallback</code>.',
		'No badge / status-dot slot. Compose at the call site with a positioned <code>&lt;span&gt;</code>.',
		'No font-family override. Inherits from the surrounding context.'
	],

	props: [
		{
			name: 'Avatar.delayMs',
			type: 'number',
			description:
				'Delay before the fallback appears while the image loads. Prevents fallback flash on fast networks.'
		},
		{
			name: 'AvatarImage.src',
			type: 'string',
			description: 'Image source URL. The component hides itself if the image errors.'
		},
		{
			name: 'AvatarImage.alt',
			type: 'string',
			description: 'Alt text. Pass empty string for decorative avatars paired with adjacent name text.'
		},
		{
			name: 'AvatarFallback.children',
			type: 'Snippet',
			required: true,
			description: 'Fallback content — typically initials. Shown until image loads or forever on failure.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: '...restProps',
			type: 'bits-ui Avatar.* props',
			description: 'All bits-ui Avatar.Root / Avatar.Image / Avatar.Fallback props pass through.'
		}
	],

	porting: [
		'Round container clipping a square image, with a same-shape fallback as a sibling. Default 40px, override via class. Fallback bg = <code>--color-muted</code>.'
	],

	example: `<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '@dashfi/svelte/ui/avatar';
<\/script>

<Avatar>
	<AvatarImage src="/users/alex.jpg" alt="Alex Chen" />
	<AvatarFallback>AC</AvatarFallback>
</Avatar>

<!-- Initials only -->
<Avatar>
	<AvatarFallback>JS</AvatarFallback>
</Avatar>

<!-- Custom size -->
<Avatar class="h-12 w-12">
	<AvatarFallback>RZ</AvatarFallback>
</Avatar>`,

	accessibility: [
		'<code>AvatarImage</code> requires <code>alt</code>. For decorative avatars, pass <code>alt=""</code> and ensure surrounding text identifies the user.',
		'Initials in <code>AvatarFallback</code> should match the visible name to be useful for screen readers — or hide the avatar from AT entirely.',
		'Avatars are not interactive by default. Wrap in a <code>&lt;button&gt;</code> if used as a menu trigger; provide an <code>aria-label</code>.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Confirmed unchanged: 40px h-10 w-10 rounded-full root with overflow-hidden shrink-0 relative, image fills via aspect-square h-full w-full, fallback uses bg-muted centred via flex items-center justify-center. No size / tone / initials / status-dot props on the canonical. The previous v0.3.1 anatomy referenced a stale branch and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-13',
			note: "Anatomy tightened: 40px rounded-full default, image fills parent via bits-ui's state machine, fallback bg --color-muted. Explicit non-features (no size / tone / initials / status-dot props — the rebuild adds tone variants and an initials prop, neither in canonical). Matches the Input precedent."
		},
		{
			version: 'v0.3.0',
			date: '2026-05-10',
			note: 'First documented in Dashbook.'
		}
	]
};
