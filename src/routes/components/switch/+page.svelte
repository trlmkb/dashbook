<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { switchSpec as spec } from '$specs/components/switch';
	import { Switch } from '@dashfi/svelte/ui/switch';
	import { Label } from '@dashfi/svelte/ui/label';

	let on = $state(true);
	let off = $state(false);
</script>

<svelte:head><title>Switch — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="States" minHeight="160px">
				{#snippet children(_m)}
					<div style:display="flex" style:gap="32px" style:align-items="center">
						<div style:display="flex" style:gap="12px" style:align-items="center">
							<Switch bind:checked={on} id="on" />
							<Label for="on">On</Label>
						</div>
						<div style:display="flex" style:gap="12px" style:align-items="center">
							<Switch bind:checked={off} id="off" />
							<Label for="off">Off</Label>
						</div>
						<div style:display="flex" style:gap="12px" style:align-items="center">
							<Switch checked disabled id="dis-on" />
							<Label for="dis-on">Disabled</Label>
						</div>
					</div>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="Sizes" minHeight="160px">
				{#snippet children(_m)}
					<div style:display="flex" style:gap="24px" style:align-items="center">
						<Switch size="xs" checked />
						<Switch size="sm" checked />
						<Switch size="base" checked />
						<Switch size="lg" checked />
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
