<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { alert as spec } from '$specs/components/alert';
	import { Alert, AlertTitle, AlertDescription } from '@dashfi/svelte/ui/alert';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import Info from '@lucide/svelte/icons/info';
	import CircleX from '@lucide/svelte/icons/circle-x';
</script>

<svelte:head><title>Alert — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
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
		<CodeSnippet code={spec.example} language="svelte" />
	{/snippet}

	{#snippet docs()}
		<PropsTable props={spec.props} />
	{/snippet}

	{#snippet anatomy()}
		<Anatomy {spec} />
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				{#each spec.accessibility as item (item)}
					<li>{@html item}</li>
				{/each}
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			{#each spec.changelog as entry (entry.version)}
				<li>
					<span class="docs-cl-when">{entry.version} — {entry.date}</span>
					<p>{entry.note}</p>
				</li>
			{/each}
		</ul>
	{/snippet}
</ComponentLayout>
