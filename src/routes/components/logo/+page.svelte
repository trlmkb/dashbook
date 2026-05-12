<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Logo, LogoSmall, LogoApp } from '@dashfi/svelte/ui/logo';

	const logoProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the root <svg>. Default sizing is h-4.'
		}
	];

	const logoSmallProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the root <svg>. Default sizing is h-4.'
		}
	];

	const logoAppProps: PropDef[] = [
		{
			name: 'radius',
			type: 'number',
			default: '0',
			description: 'Corner radius of the square background, in viewBox units (0-640).'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the root <svg>. Default sizing is size-10.'
		}
	];

	const example = `<script lang="ts">
	import { Logo, LogoSmall, LogoApp } from '@dashfi/svelte/ui/logo';
<\/script>

<Logo />        <!-- Full wordmark -->
<LogoSmall />   <!-- Compact wordmark -->
<LogoApp />     <!-- Square app icon -->`;
</script>

<svelte:head><title>Logo — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Logo"
	description="Three Dash.fi mark variants — full wordmark, compact wordmark, square app icon. For marketing surfaces and login screens."
	importPath="@dashfi/svelte/ui/logo"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:display="flex" style:gap="40px" style:align-items="center">
					<Logo />
					<LogoSmall />
					<LogoApp />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Logo" props={logoProps} />
			<PropsTable title="LogoSmall" props={logoSmallProps} />
			<PropsTable title="LogoApp" props={logoAppProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<ul class="docs-list">
				<li><code>Logo</code> — full <em>dash.fi</em> wordmark with cobalt-or-jade dot.</li>
				<li><code>LogoSmall</code> — wordmark trimmed for tight horizontal space.</li>
				<li><code>LogoApp</code> — square app icon glyph (the lowercase 'd').</li>
				<li>For brand-page documentation and downloads, see <a href="/brand/logo">Brand / Logo</a>.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
