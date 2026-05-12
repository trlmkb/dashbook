<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Alert, AlertTitle, AlertDescription } from '@dashfi/svelte/ui/alert';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import Info from '@lucide/svelte/icons/info';
	import CircleX from '@lucide/svelte/icons/circle-x';

	const alertProps: PropDef[] = [
		{
			name: 'variant',
			type: "'default' | 'destructive' | 'success' | 'info' | 'warning' | 'brand'",
			default: "'default'",
			description: 'Visual variant. Controls the border-left and icon color.'
		},
		{
			name: 'transitionParams',
			type: 'SlideParams',
			default: '{ duration: 0 }',
			description: 'Svelte slide transition params used when the alert mounts/unmounts.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Alert content — typically an icon followed by AlertTitle and AlertDescription.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'All native div attributes pass through to the rendered element.'
		}
	];

	const alertTitleProps: PropDef[] = [
		{
			name: 'children',
			type: 'Snippet',
			description: 'Title content — a short sentence.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'All native div attributes pass through.'
		}
	];

	const alertDescriptionProps: PropDef[] = [
		{
			name: 'children',
			type: 'Snippet',
			description: 'Description content — one supporting sentence.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'All native div attributes pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Alert, AlertTitle, AlertDescription } from '@dashfi/svelte/ui/alert';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
<\/script>

<Alert variant="success">
\t<CircleCheck />
\t<AlertTitle>Spending data refreshed.</AlertTitle>
\t<AlertDescription>Last updated just now.</AlertDescription>
</Alert>

<Alert variant="destructive">
\t<CircleX />
\t<AlertTitle>Card declined.</AlertTitle>
\t<AlertDescription>Daily limit reached. Resets midnight UTC.</AlertDescription>
</Alert>`;
</script>

<svelte:head><title>Alert — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Alert"
	description="Inline contextual messaging — success, warning, error, info. Always paired with an icon and short copy. Border-left strip in the variant color."
	importPath="@dashfi/svelte/ui/alert"
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Variants" minHeight="320px">
				{#snippet children(_m)}
					<div style:width="100%" style:max-width="540px" style:display="flex" style:flex-direction="column" style:gap="12px">
						<Alert variant="default">
							<Info />
							<AlertTitle>Statement available.</AlertTitle>
							<AlertDescription>April 2026 statement is ready to download.</AlertDescription>
						</Alert>
						<Alert variant="success">
							<CircleCheck />
							<AlertTitle>Spending data refreshed.</AlertTitle>
							<AlertDescription>Last updated just now.</AlertDescription>
						</Alert>
						<Alert variant="warning">
							<TriangleAlert />
							<AlertTitle>You're approaching your daily limit.</AlertTitle>
							<AlertDescription>$2.1M of $2.4M used.</AlertDescription>
						</Alert>
						<Alert variant="destructive">
							<CircleX />
							<AlertTitle>Card declined.</AlertTitle>
							<AlertDescription>Daily limit reached. Resets midnight UTC.</AlertDescription>
						</Alert>
						<Alert variant="brand">
							<CircleCheck />
							<AlertTitle>3% cashback applied.</AlertTitle>
							<AlertDescription>$1,240 in rewards earned this month.</AlertDescription>
						</Alert>
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
			<PropsTable title="Alert" props={alertProps} />
			<PropsTable title="AlertTitle" props={alertTitleProps} />
			<PropsTable title="AlertDescription" props={alertDescriptionProps} />
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Parts</div>
			<ul class="docs-list">
				<li><code>Alert</code> — root container with border-left accent.</li>
				<li><code>AlertTitle</code> — short title sentence.</li>
				<li><code>AlertDescription</code> — supporting copy.</li>
				<li>Lucide icon child — placed first, automatically sized and tinted.</li>
			</ul>
			<div class="docs-h">Variants</div>
			<ul class="docs-list">
				<li><code>default</code> — neutral border, muted text.</li>
				<li><code>success</code>, <code>brand</code> — jade accent.</li>
				<li><code>warning</code> — amber accent (the rare warm color).</li>
				<li><code>info</code> — sky accent (informational only).</li>
				<li><code>destructive</code> — black on light, white on dark (monochrome).</li>
			</ul>
		</div>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Wrap with <code>role="alert"</code> at the call site for assertive announcements (errors, warnings).</li>
				<li>Use <code>role="status"</code> for non-urgent feedback (success, info).</li>
				<li>The icon is decorative — title carries the meaning. Never rely on color alone.</li>
				<li>Keep copy short. One-sentence title + one-sentence description is the rhythm.</li>
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
