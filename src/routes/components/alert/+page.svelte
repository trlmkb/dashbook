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
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li><strong>Root</strong> — <code>grid</code> with <code>grid-cols-[0_1fr]</code>, or <code>grid-cols-[calc(var(--spacing)*5)_1fr]</code> when an SVG is present. <code>gap-y-1.5</code> (6px) row gap, <code>gap-x-3</code> (12px) col gap when icon present.</li>
				<li><strong>Border-left strip</strong> — <code>border-l-[3px]</code> (3px). The visual signature.</li>
				<li><strong>Padding</strong> — <code>pl-4 py-2.5</code> → 16px left, 10px vertical, 0 right.</li>
				<li><strong>Type</strong> — <code>text-sm</code> (14px).</li>
				<li><strong>Icon (Lucide child)</strong> — <code>size-4</code> (16×16), <code>translate-y-0.5</code> (2px) baseline nudge.</li>
				<li><strong>AlertTitle</strong> — inherits text-sm; default semibold leading.</li>
				<li><strong>AlertDescription</strong> — same row in the grid; sits under the title.</li>
			</ul>

			<div class="docs-h">Tokens per variant</div>
			<ul class="docs-list">
				<li><code>default</code> — border <code>--color-border</code> <code>#e8e6dc</code>/<code>#1f2a29</code>; text + icon <code>--color-muted-foreground</code> <code>#6e7878</code>/<code>#8b9695</code>.</li>
				<li><code>destructive</code> — border + icon <code>--color-destructive</code> (monochrome: <code>#000000</code>/<code>#ffffff</code>).</li>
				<li><code>success</code> / <code>brand</code> — border + icon <code>--color-brand</code> (jade <code>#2b605c</code>/<code>#5bb8b0</code>).</li>
				<li><code>info</code> — border + icon Tailwind <code>sky-500</code> <code>#0ea5e9</code>.</li>
				<li><code>warning</code> — border + icon Tailwind <code>amber-500</code> <code>#f59e0b</code>.</li>
				<li>Root text always <code>--color-foreground</code> (variant only colors the border + icon).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Place a Lucide icon as the first child — the grid auto-detects it and re-allocates the first column.</li>
				<li>Follow with <code>AlertTitle</code> then optional <code>AlertDescription</code>.</li>
				<li>Mounts with an optional Svelte slide transition via <code>transitionParams</code> (default <code>{`{ duration: 0 }`}</code>).</li>
			</ul>

			<div class="docs-h">Not part of Alert</div>
			<ul class="docs-list">
				<li>No close button. Compose at the call site if dismissal is needed.</li>
				<li>No background fill — variants are border-left + icon tint only.</li>
				<li>No radius. The shape is flat-edged.</li>
				<li>No <code>role</code> auto-set — pair with <code>role="alert"</code>/<code>"status"</code> at the call site per AT need.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Six variants, three-column-aware grid, 3px left border in the variant color. That's the whole contract.</li>
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
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch — Alert is a CSS-grid with a 3px <code>border-l-[3px]</code> strip in the
					variant color, <code>text-sm</code> body text, <code>size-4</code> Lucide icon
					translated <code>translate-y-0.5</code>. Six variants
					(default/destructive/success/info/warning/brand). No bg fill, no radius,
					no auto role. Earlier prose-style anatomy is superseded.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
