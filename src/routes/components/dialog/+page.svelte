<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { dialog as spec } from '$specs/components/dialog';
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogTitle,
		DialogDescription,
		DialogHeader,
		DialogFooter
	} from '@dashfi/svelte/ui/dialog';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Label } from '@dashfi/svelte/ui/label';
</script>

<svelte:head><title>Dialog — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Dialog>
					<DialogTrigger>
						{#snippet child({ props })}
							<Button {...props}>Issue virtual card</Button>
						{/snippet}
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Issue virtual card</DialogTitle>
							<DialogDescription>For one-off vendor or ad-account spend.</DialogDescription>
						</DialogHeader>
						<div style:display="flex" style:flex-direction="column" style:gap="8px">
							<Label for="name">Card nickname</Label>
							<Input id="name" placeholder="Q2 Meta · brand campaign" />
						</div>
						<DialogFooter>
							<Button>Issue</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={spec.example} language="svelte" />{/snippet}
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
