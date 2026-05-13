<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Avatar, AvatarImage, AvatarFallback } from '@dashfi/svelte/ui/avatar';

	const avatarProps: PropDef[] = [
		{
			name: 'delayMs',
			type: 'number',
			description: 'Delay before the fallback appears while the image loads. Prevents fallback flash on fast networks.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Avatar contents — typically <AvatarImage> followed by <AvatarFallback>.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Native div attributes pass through to the root element.'
		}
	];

	const avatarImageProps: PropDef[] = [
		{
			name: 'src',
			type: 'string',
			description: 'Image source URL. The component hides itself if the image errors.'
		},
		{
			name: 'alt',
			type: 'string',
			description: 'Alt text. Pass empty string for decorative avatars paired with adjacent name text.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: '...restProps',
			type: 'HTMLImgAttributes',
			description: 'Native img attributes pass through, including onload and onerror.'
		}
	];

	const avatarFallbackProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Fallback content — typically initials. Shown until image loads or forever on failure.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Native div attributes pass through to the fallback element.'
		}
	];

	const example = `<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '@dashfi/svelte/ui/avatar';
<\/script>

<Avatar>
\t<AvatarImage src="/users/alex.jpg" alt="Alex Chen" />
\t<AvatarFallback>AC</AvatarFallback>
</Avatar>

<!-- Initials only -->
<Avatar>
\t<AvatarFallback>JS</AvatarFallback>
</Avatar>

<!-- Custom size -->
<Avatar class="h-12 w-12">
\t<AvatarFallback>RZ</AvatarFallback>
</Avatar>`;
</script>

<svelte:head><title>Avatar — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Avatar"
	description="Circular user or merchant identity. Image with fallback initials. Built on bits-ui — handles image-load timing automatically."
	importPath="@dashfi/svelte/ui/avatar"
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Sizes &amp; states" minHeight="200px">
				{#snippet children(_m)}
					<div style:display="flex" style:gap="16px" style:align-items="center">
						<Avatar class="h-8 w-8">
							<AvatarFallback>AC</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>JS</AvatarFallback>
						</Avatar>
						<Avatar class="h-12 w-12">
							<AvatarFallback>RZ</AvatarFallback>
						</Avatar>
						<Avatar class="h-16 w-16">
							<AvatarFallback>MK</AvatarFallback>
						</Avatar>
					</div>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="With image (broken — falls back)" minHeight="160px">
				{#snippet children(_m)}
					<div style:display="flex" style:gap="16px">
						<Avatar>
							<AvatarImage src="/intentionally-missing.jpg" alt="" />
							<AvatarFallback>AC</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage src="/intentionally-missing.jpg" alt="" />
							<AvatarFallback>JS</AvatarFallback>
						</Avatar>
					</div>
				{/snippet}
			</PreviewCanvas>
		</div>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Avatar" props={avatarProps} />
			<PropsTable title="AvatarImage" props={avatarImageProps} />
			<PropsTable title="AvatarFallback" props={avatarFallbackProps} />
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions (per part)</div>
			<ul class="docs-list">
				<li><strong>Avatar</strong> (root) — 40px square (<code>h-10 w-10</code>). <code>rounded-full</code>. <code>overflow-hidden</code>. <code>shrink-0</code>. <code>position: relative</code> so children can sit absolutely.</li>
				<li><strong>AvatarImage</strong> — fills the parent (<code>h-full w-full</code>), <code>aspect-square</code>. Loaded via bits-ui's image state machine — hidden until <code>loaded</code>.</li>
				<li><strong>AvatarFallback</strong> — fills the parent (<code>h-full w-full</code>), <code>rounded-full</code>, centred <code>flex items-center justify-center</code>.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Fallback background</strong> — <code>bg-muted</code> resolves to <code>--color-muted</code> (light <code>#eceae0</code>, dark <code>#181e1d</code>).</li>
				<li><strong>Fallback text</strong> — inherits from parent. No explicit colour token; rely on the surrounding text colour (<code>--color-foreground</code> by default).</li>
				<li><strong>Border</strong> — none. The avatar reads against whatever surface it sits on.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Always render at least <code>AvatarFallback</code> — it covers the load-failure path. Pair with <code>AvatarImage</code> for the happy path.</li>
				<li>Common sizes: <code>h-8 w-8</code> (table rows), <code>h-10 w-10</code> (default, lists), <code>h-12 w-12</code> (profile chips), <code>h-16 w-16</code> (settings cards). Override via <code>class</code>.</li>
				<li>For decorative avatars accompanied by adjacent name text, pass <code>alt=""</code> on <code>AvatarImage</code> so screen readers ignore the duplicate.</li>
			</ul>

			<div class="docs-h">Not part of Avatar</div>
			<ul class="docs-list">
				<li>No <code>size</code> prop. Use Tailwind <code>h-*</code> / <code>w-*</code> via <code>class</code>.</li>
				<li>No <code>tone</code> prop. There is no <code>brand</code> / <code>ink</code> variant in the canonical — fallback is always <code>--color-muted</code>. The rebuild adds tones; the canonical does not.</li>
				<li>No initials prop. Pass initials as children of <code>AvatarFallback</code>.</li>
				<li>No badge / status-dot slot. Compose at the call site with a positioned <code>&lt;span&gt;</code>.</li>
				<li>No font-family override. Inherits from the surrounding context.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>Avatar.delayMs</code> — delay before fallback appears while image loads. Prevents fallback flash on fast networks.</li>
				<li><code>AvatarImage.src</code>, <code>alt</code> — standard <code>&lt;img&gt;</code> attributes.</li>
				<li>All bits-ui <code>Avatar.Root</code> / <code>Avatar.Image</code> / <code>Avatar.Fallback</code> props pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Round container clipping a square image, with a same-shape fallback as a sibling. Default 40px, override via class. Fallback bg = <code>--color-muted</code>.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li><code>AvatarImage</code> requires <code>alt</code>. For decorative avatars, pass <code>alt=""</code> and ensure surrounding text identifies the user.</li>
				<li>Initials in <code>AvatarFallback</code> should match the visible name to be useful for screen readers — or hide the avatar from AT entirely.</li>
				<li>Avatars are not interactive by default. Wrap in a <code>&lt;button&gt;</code> if used as a menu trigger; provide an <code>aria-label</code>.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch.
					Confirmed unchanged: 40px <code>h-10 w-10 rounded-full</code>
					root with <code>overflow-hidden shrink-0 relative</code>,
					image fills via <code>aspect-square h-full w-full</code>,
					fallback uses <code>bg-muted</code> centred via
					<code>flex items-center justify-center</code>. No size /
					tone / initials / status-dot props on the canonical. The
					previous v0.3.1 anatomy referenced a stale branch and is no
					longer accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-13</span>
				<p>
					Anatomy tightened: 40px <code>rounded-full</code> default, image
					fills parent via bits-ui's state machine, fallback bg
					<code>--color-muted</code>. Explicit non-features (no size /
					tone / initials / status-dot props — the rebuild adds tone
					variants and an initials prop, neither in canonical). Matches
					the Input precedent.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
