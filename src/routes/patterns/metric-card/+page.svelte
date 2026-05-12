<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@dashfi/svelte/ui/card';
	import { Pill } from '@dashfi/svelte/ui/pill';

	const example = `<script lang="ts">
\timport { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@dashfi/svelte/ui/card';
\timport { Pill } from '@dashfi/svelte/ui/pill';
<\/script>

<Card>
\t<CardHeader>
\t\t<CardDescription>MTD spend</CardDescription>
\t\t<CardTitle class="text-3xl font-mono tabular-nums">$408,210</CardTitle>
\t</CardHeader>
\t<CardContent class="flex items-baseline gap-3">
\t\t<Pill type="success">+12.4%</Pill>
\t\t<span class="text-muted-foreground text-sm">vs last month</span>
\t</CardContent>
</Card>`;
</script>

<svelte:head><title>Metric card — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Metric card"
	description="A single headline number with a delta. The atom of every dashboard hero, KYC overview, statement summary. Hairline border, monospace amount, semantic-colored delta pill."
	uses={['Card', 'Pill']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="320px">
			{#snippet children(_m)}
				<div class="grid">
					<Card>
						<CardHeader>
							<CardDescription>MTD spend</CardDescription>
							<CardTitle class="text-3xl font-mono tabular-nums">$408,210</CardTitle>
						</CardHeader>
						<CardContent class="flex items-baseline gap-3">
							<Pill type="success">+12.4%</Pill>
							<span class="text-muted-foreground text-sm">vs last month</span>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardDescription>Outstanding</CardDescription>
							<CardTitle class="text-3xl font-mono tabular-nums">$28,902</CardTitle>
						</CardHeader>
						<CardContent class="flex items-baseline gap-3">
							<Pill type="warning">+$2,408</Pill>
							<span class="text-muted-foreground text-sm">since Monday</span>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardDescription>Active cards</CardDescription>
							<CardTitle class="text-3xl font-mono tabular-nums">142</CardTitle>
						</CardHeader>
						<CardContent class="flex items-baseline gap-3">
							<Pill type="base">no change</Pill>
							<span class="text-muted-foreground text-sm">7d</span>
						</CardContent>
					</Card>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				Headline numbers fail when they're hard to compare. Monospace tabular-numeric digits
				keep dollar values aligned across cards; the delta pill carries direction and
				magnitude in a small, scannable shape that doesn't compete with the number itself.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li><strong>Label above the number</strong>, not below. Reading order is "what is this → how much".</li>
				<li><strong>Pill carries semantic color</strong>: success / warning / danger / base. Never two pills.</li>
				<li><strong>Comparison context goes muted, after the pill</strong>. "vs last month" is helpful but secondary.</li>
				<li><strong>No icons by default</strong>. The number is the figure-of-merit. Icons add chrome.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li><strong>+ Sparkline</strong> below the delta when trend over a short period matters.</li>
				<li><strong>Inverted (white-on-jade) Card</strong> for a single hero metric at the top of a dashboard.</li>
				<li><strong>CardFooter with a "View" link</strong> when the card is a portal into more detail.</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 16px;
		width: 100%;
		max-width: 880px;
	}
	.rationale {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 720px;
	}
	.rationale h3 {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 24px 0 4px;
	}
	.rationale h3:first-child {
		margin-top: 0;
	}
	.rationale p {
		font-size: 14px;
		line-height: 1.65;
		color: var(--fg);
		margin: 0;
	}
	.rationale ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.rationale li {
		padding: 10px 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		border-top: 1px solid var(--border);
	}
	.rationale li:first-child {
		border-top: 0;
		padding-top: 0;
	}
</style>
