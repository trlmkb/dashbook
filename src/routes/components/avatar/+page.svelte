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
			<div class="docs-h">Parts</div>
			<ul class="docs-list">
				<li><code>Avatar</code> — root. Default <code>h-10 w-10</code> rounded-full.</li>
				<li><code>AvatarImage</code> — attempts to load the image; hidden if it errors.</li>
				<li><code>AvatarFallback</code> — initials shown until image loads (or forever, if it fails).</li>
			</ul>
			<div class="docs-h">Sizing</div>
			<ul class="docs-list">
				<li>Default <code>h-10 w-10</code> (40px). Override via <code>class</code> with Tailwind utilities.</li>
				<li>Common sizes: <code>h-8</code> (table rows), <code>h-10</code> (lists), <code>h-12</code> (profile chips), <code>h-16</code> (settings).</li>
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
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
