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
	description="Vertical content group with internal rhythm. Compositional — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter. No border, no background, no shadow — Card is pure spacing."
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
			<div class="docs-h">Dimensions (per part)</div>
			<ul class="docs-list">
				<li><strong>Card</strong> (root <code>&lt;div&gt;</code>) — <code>flex flex-col</code>, <code>gap-8</code> (32px between children), <code>p-8</code> (32px padding all sides). No border, no radius, no shadow, no background.</li>
				<li><strong>CardHeader</strong> — <code>flex flex-col</code>, <code>space-y-1.5</code> (6px vertical gap between title and description). No padding.</li>
				<li><strong>CardTitle</strong> — 18px (<code>text-lg</code>), weight 500 (<code>font-medium</code>), <code>tracking-tight</code> (-0.025em). Default tag <code>&lt;h3&gt;</code>.</li>
				<li><strong>CardDescription</strong> — 14px (<code>text-sm</code>), colour <code>--color-muted-foreground</code>. Renders as <code>&lt;p&gt;</code>.</li>
				<li><strong>CardContent</strong> — no default styling. A bare <code>&lt;div&gt;</code> wrapper.</li>
				<li><strong>CardFooter</strong> — <code>flex items-center pt-4</code> (16px top padding to separate from preceding content).</li>
			</ul>

			<div class="docs-h">Tokens (per part)</div>
			<ul class="docs-list">
				<li><strong>Card</strong> — text <code>--color-card-foreground</code> (light <code>#123b39</code>, dark <code>#ffffff</code>). No background, no border, no shadow — Card reads against whatever surface it sits on.</li>
				<li><strong>CardDescription</strong> — text <code>--color-muted-foreground</code> (light <code>#6e7878</code>, dark <code>#8b9695</code>).</li>
				<li><strong>CardTitle</strong> — text inherits (<code>--color-card-foreground</code>).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>The canonical composition is <code>Card &gt; CardHeader{`{`}CardTitle + CardDescription{`}`} + CardContent + CardFooter</code>. Each subpart is a separate sibling.</li>
				<li>The 32px <code>gap-8</code> on Card carries the rhythm between parts — sub-parts do not add their own vertical margins.</li>
				<li>For card-shaped surfaces in surrounding chrome (table rows, settings sections), use <code>Card</code> alone and let the parent surface provide any background or border treatment.</li>
			</ul>

			<div class="docs-h">Not part of Card</div>
			<ul class="docs-list">
				<li>No border, no background, no rounded corners, no shadow on this branch. If you need a bordered surface, wrap Card in an outer container that provides those.</li>
				<li>No padding prop. <code>p-8</code> (32px) is baked into Card root; sub-parts use the parent's gap rhythm.</li>
				<li>No <code>variant</code> prop. Card is a single opinionated treatment.</li>
				<li>No click handler. Wrap the entire Card in <code>&lt;a&gt;</code> or <code>&lt;button&gt;</code> at the call site if it needs to be activatable.</li>
				<li>No <code>p-6</code>/<code>p-4</code> alternative paddings. 32px is the only padding step.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>Card</code> — only <code>class</code>, <code>ref</code>, plus DOM event handlers forwarded via <code>...restProps</code>.</li>
				<li><code>CardTitle</code> — <code>tag</code> picks the heading level (h1-h6, default h3).</li>
				<li>All other parts are pure layout wrappers with <code>class</code> + <code>ref</code>.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Card on this branch is a <strong>spacing primitive</strong>: 32px padding, 32px gap, no surface decoration. The visual weight comes from the typography (Title at <code>text-lg font-medium</code>) and the muted Description.</li>
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
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the <code>EN-XX/design-vnext--sidebar-feature</code>
					branch. Card is now a <strong>spacing primitive</strong> — no border, no
					radius, no shadow, no background. Root applies <code>p-8</code> (32px),
					<code>gap-8</code> (32px), <code>flex flex-col</code>. Title resized from
					<code>leading-none font-semibold tracking-tight</code> (no font-size) to
					<code>text-lg font-medium tracking-tight</code> — 18px weight 500. Header is
					a bare <code>flex flex-col space-y-1.5</code>, no padding. Content is
					unstyled. Footer is <code>flex items-center pt-4</code>. Sub-part paddings
					(<code>p-6</code> / <code>pt-0</code>) are gone — rhythm comes from the root's
					<code>gap-8</code>. v0.3.1 described the prior bordered treatment.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-12</span>
				<p>
					Anatomy tightened: per-part dimensions (root <code>rounded-md</code>
					6px + 1px border + <code>shadow-sm</code>; <code>p-6</code> on each
					sub-part), per-part tokens with resolved hex, composition rule
					(parts as siblings, header sits flush over content), and
					explicit non-features (no padding prop, no variant prop, no
					click handler, no <code>rounded-lg</code>). Matches the Input
					precedent.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
