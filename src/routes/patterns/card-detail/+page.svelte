<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Card, CardHeader, CardContent } from '@dashfi/svelte/ui/card';
	import { Pill } from '@dashfi/svelte/ui/pill';
	import { Progress } from '@dashfi/svelte/ui/progress';
	import { Switch } from '@dashfi/svelte/ui/switch';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Separator } from '@dashfi/svelte/ui/separator';

	let frozen = $state(false);
	const spentMTD = 8214;
	const limitMTD = 25000;
	const limitPct = (spentMTD / limitMTD) * 100;

	const example = `<script lang="ts">
\timport { Card, CardHeader, CardContent } from '@dashfi/svelte/ui/card';
\timport { Pill } from '@dashfi/svelte/ui/pill';
\timport { Progress } from '@dashfi/svelte/ui/progress';
\timport { Switch } from '@dashfi/svelte/ui/switch';
\timport { Button } from '@dashfi/svelte/ui/button';
\timport { Separator } from '@dashfi/svelte/ui/separator';
<\/script>

<div class="detail">
\t<div class="card-visual">/* card art */</div>

\t<div class="meta">
\t\t<header>
\t\t\t<div class="row">
\t\t\t\t<h2>Engineering · 4429</h2>
\t\t\t\t<Pill type="success">Active</Pill>
\t\t\t</div>
\t\t\t<p>Virtual card · Issued 2026-03-12 · Owned by Alex Chen</p>
\t\t</header>

\t\t<section>
\t\t\t<div class="row">
\t\t\t\t<span>Monthly limit</span>
\t\t\t\t<span class="amt">$8,214 / $25,000</span>
\t\t\t</div>
\t\t\t<Progress value={limitPct} />
\t\t</section>

\t\t<Separator />

\t\t<section>
\t\t\t<div class="row">
\t\t\t\t<span>Freeze card</span>
\t\t\t\t<Switch bind:checked={frozen} />
\t\t\t</div>
\t\t</section>

\t\t<footer>
\t\t\t<Button variant="outline">View transactions</Button>
\t\t\t<Button variant="destructive">Close card</Button>
\t\t</footer>
\t</div>
</div>`;
</script>

<svelte:head><title>Card detail — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Card detail"
	description="Two-column issued-card summary. Card visual on the left, metadata + controls on the right. The pattern works for any 'thing' detail page — vendor, user, account, virtual card."
	uses={['Card', 'Pill', 'Progress', 'Switch', 'Button', 'Separator']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="500px">
			{#snippet children(_m)}
				<div class="detail">
					<div class="card-visual" class:frozen>
						<div class="card-art">
							<span class="brand-line">dash.fi</span>
							<span class="card-number">•••• •••• •••• 4429</span>
							<div class="card-foot">
								<span>Engineering</span>
								<span>05/29</span>
							</div>
						</div>
					</div>

					<div class="meta">
						<header class="meta-head">
							<div class="row">
								<h2>Engineering · 4429</h2>
								<Pill type={frozen ? 'warning' : 'success'}>
									{frozen ? 'Frozen' : 'Active'}
								</Pill>
							</div>
							<p>Virtual · Issued 2026-03-12 · Owned by Alex Chen</p>
						</header>

						<section class="block">
							<div class="row block-head">
								<span class="label">Monthly limit</span>
								<span class="amt font-mono tabular-nums">$8,214 / $25,000</span>
							</div>
							<Progress value={limitPct} />
						</section>

						<Separator />

						<section class="block">
							<div class="row">
								<div>
									<div class="label-strong">Freeze card</div>
									<div class="sub">Pauses all charges. Reversible.</div>
								</div>
								<Switch bind:checked={frozen} />
							</div>
						</section>

						<footer class="meta-foot">
							<Button variant="outline">View transactions</Button>
							<Button variant="destructive">Close card</Button>
						</footer>
					</div>
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
				Detail pages have a high attention cost — they're entered with intent and leave with
				a decision. The visual on the left grounds you in <em>which</em> thing you're looking
				at; the right column is the action surface. Reading left → right matches "identify →
				decide".
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Status pill in the header</strong>, never floating elsewhere. It's the second
					thing you read after the name.
				</li>
				<li>
					<strong>Limit shown as fraction + bar</strong>. The fraction tells you the precise
					number; the bar tells you whether it's "fine" or "watch out" at a glance.
				</li>
				<li>
					<strong>Reversible action (Switch) sits above destructive (Button)</strong>. Order
					reflects severity — the easy thing first.
				</li>
				<li>
					<strong>Two buttons in the footer max</strong>: one neutral, one destructive.
					Everything else lives in dropdown menu items if needed.
				</li>
			</ul>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Mobile</strong>: stack columns. The card visual sits above the meta column,
					full width.
				</li>
				<li>
					<strong>Multi-tab</strong>: when the entity has lots of associated data (e.g. a user
					with cards + transactions + members), wrap the meta column in <code>Tabs</code>.
				</li>
				<li>
					<strong>Edit-in-place</strong>: replace the header <code>&lt;h2&gt;</code> with an
					inline-editable <code>Input</code> revealed on click.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.detail {
		display: grid;
		grid-template-columns: 320px 1fr;
		gap: 32px;
		width: 100%;
		max-width: 880px;
		align-items: start;
	}
	.card-visual {
		aspect-ratio: 16/10;
		background: var(--gradient-jade-linear, linear-gradient(135deg, #2b605c 0%, #123b39 100%));
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		transition: filter 200ms, opacity 200ms;
	}
	.card-visual.frozen {
		filter: grayscale(0.6) brightness(0.85);
		opacity: 0.7;
	}
	.card-art {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		color: #faf8f1;
		font-family: var(--font-mono);
	}
	.brand-line {
		font-size: 16px;
		letter-spacing: -0.02em;
		font-weight: 200;
	}
	.card-number {
		font-size: 13px;
		letter-spacing: 0.1em;
		align-self: flex-start;
	}
	.card-foot {
		display: flex;
		justify-content: space-between;
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		opacity: 0.85;
	}
	.meta {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.meta-head h2 {
		font-size: 20px;
		font-weight: 500;
		margin: 0;
	}
	.meta-head p {
		font-size: 12px;
		color: var(--fg-muted);
		margin: 4px 0 0;
	}
	.block {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	.block-head .label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.amt {
		font-size: 13px;
		color: var(--fg);
	}
	.label-strong {
		font-size: 14px;
		font-weight: 500;
		color: var(--fg);
	}
	.sub {
		font-size: 12px;
		color: var(--fg-muted);
		margin-top: 2px;
	}
	.meta-foot {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	@media (max-width: 720px) {
		.detail {
			grid-template-columns: 1fr;
		}
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
	.rationale code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
</style>
