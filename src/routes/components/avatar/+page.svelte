<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { avatar as spec } from '$specs/components/avatar';
	import { Avatar, AvatarImage, AvatarFallback } from '@dashfi/svelte/ui/avatar';
</script>

<svelte:head><title>Avatar — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
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
