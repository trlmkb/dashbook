<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { hoverCard as spec } from '$specs/components/hover-card';
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '@dashfi/svelte/ui/hover-card';
	import { Button } from '@dashfi/svelte/ui/button';
</script>

<svelte:head><title>Hover Card — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<HoverCard>
					<HoverCardTrigger>
						{#snippet child({ props }: { props: Record<string, unknown> })}
							<Button variant="link" {...props}>@dashfi</Button>
						{/snippet}
					</HoverCardTrigger>
					<HoverCardContent>
						<div style:padding="4px" style:font-size="13px">
							<strong>Dash.fi</strong>
							<p style:margin-top="4px" style:color="var(--fg-muted)">
								The corporate charge card built for high-spend advertisers.
							</p>
						</div>
					</HoverCardContent>
				</HoverCard>
			{/snippet}
		</PreviewCanvas>
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
