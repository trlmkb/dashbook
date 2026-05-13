<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { command as spec } from '$specs/components/command';
	import {
		Command,
		CommandInput,
		CommandList,
		CommandGroup,
		CommandItem,
		CommandSeparator,
		CommandEmpty
	} from '@dashfi/svelte/ui/command';
</script>

<svelte:head><title>Command — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="360px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="480px">
					<Command>
						<CommandInput placeholder="Search…" />
						<CommandList>
							<CommandEmpty>No results.</CommandEmpty>
							<CommandGroup heading="Cards">
								<CommandItem>Issue virtual card</CommandItem>
								<CommandItem>Freeze card</CommandItem>
								<CommandItem>Close account</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading="Actions">
								<CommandItem>Download April statement</CommandItem>
								<CommandItem>Refresh spending data</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</div>
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
