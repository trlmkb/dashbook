<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { accordion as spec } from '$specs/components/accordion';
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '@dashfi/svelte/ui/accordion';
</script>

<svelte:head><title>Accordion — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="280px">
			{#snippet children(_m)}
				<div style:width="480px">
					<Accordion type="single" value="how">
						<AccordionItem value="how">
							<AccordionTrigger>How does Dash.fi work?</AccordionTrigger>
							<AccordionContent>
								Corporate charge card with built-in audit agents that recover ad-spend
								overcharges and shipping refunds.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="rewards">
							<AccordionTrigger>What's the cashback rate?</AccordionTrigger>
							<AccordionContent>
								3% on ad spend and shipping. Standard 1% on everything else.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="apply">
							<AccordionTrigger>How do I apply?</AccordionTrigger>
							<AccordionContent>
								Brands switching from Capital One, Chase, and Amex apply every day.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
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
