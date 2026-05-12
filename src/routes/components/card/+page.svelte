<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent,
		CardFooter
	} from '@dashfi/svelte/ui/card';
	import { Button } from '@dashfi/svelte/ui/button';

	const cardProps: PropDef[] = [
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
			description: 'Element ref binding for the root <div>.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Card body content. Compose with CardHeader, CardContent, CardFooter.'
		}
	];

	const cardHeaderProps: PropDef[] = [
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
			description: 'Element ref binding for the header <div>.'
		}
	];

	const cardTitleProps: PropDef[] = [
		{
			name: 'tag',
			type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
			default: "'h3'",
			description: 'Semantic heading level to render.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLHeadingElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the heading element.'
		}
	];

	const cardDescriptionProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLParagraphElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the <p>.'
		}
	];

	const cardContentProps: PropDef[] = [
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
			description: 'Element ref binding for the content <div>.'
		}
	];

	const cardFooterProps: PropDef[] = [
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
			description: 'Element ref binding for the footer <div>.'
		}
	];

	const example = `<script lang="ts">
\timport {
\t\tCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
\t} from '@dashfi/svelte/ui/card';
<\/script>

<Card>
\t<CardHeader>
\t\t<CardTitle>Daily limit</CardTitle>
\t\t<CardDescription>Resets midnight UTC.</CardDescription>
\t</CardHeader>
\t<CardContent>
\t\t<div class="data-value text-3xl">$2,408,210</div>
\t</CardContent>
\t<CardFooter>
\t\t<Button variant="outline" size="sm">Increase limit</Button>
\t</CardFooter>
</Card>`;
</script>

<svelte:head><title>Card — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Card"
	description="A bordered surface for grouping related content. Compositional — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter. Hairline border, square corners, no shadow."
	importPath="@dashfi/svelte/ui/card"
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Composition" minHeight="280px">
				{#snippet children(_m)}
					<div style:width="320px">
						<Card>
							<CardHeader>
								<CardTitle>Daily limit</CardTitle>
								<CardDescription>Resets midnight UTC.</CardDescription>
							</CardHeader>
							<CardContent>
								<div class="data-value" style:font-size="32px" style:line-height="1">
									$2,408,210
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" size="sm">Increase limit</Button>
							</CardFooter>
						</Card>
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
			<PropsTable title="Card" props={cardProps} />
			<PropsTable title="CardHeader" props={cardHeaderProps} />
			<PropsTable title="CardTitle" props={cardTitleProps} />
			<PropsTable title="CardDescription" props={cardDescriptionProps} />
			<PropsTable title="CardContent" props={cardContentProps} />
			<PropsTable title="CardFooter" props={cardFooterProps} />
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Parts</div>
			<ul class="docs-list">
				<li><code>Card</code> — root container. 1px hairline border. No shadow.</li>
				<li><code>CardHeader</code> — title cluster. Padded, separated from content.</li>
				<li><code>CardTitle</code> — page-section heading inside the card.</li>
				<li><code>CardDescription</code> — small caption below the title.</li>
				<li><code>CardContent</code> — main payload area.</li>
				<li><code>CardFooter</code> — action row, typically right-aligned buttons.</li>
			</ul>
			<div class="docs-h">Variants</div>
			<ul class="docs-list">
				<li>None. The card is intentionally a single, opinionated treatment.</li>
				<li>For subtler grouping, prefer the <code>.card-minimal</code> utility (border-top only).</li>
			</ul>
		</div>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Renders as a plain <code>&lt;div&gt;</code> tree — no implicit ARIA.</li>
				<li>Use semantic heading levels inside <code>CardTitle</code> via the <code>level</code> prop (h2/h3 typically).</li>
				<li>If the card is the primary affordance, wrap it in <code>&lt;a&gt;</code> or <code>&lt;button&gt;</code> at the call site.</li>
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
