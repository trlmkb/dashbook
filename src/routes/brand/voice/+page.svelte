<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import DoDontGrid from '$chrome/DoDontGrid.svelte';

	const principles = [
		{
			title: 'Direct',
			body: 'Short declarative sentences. No throat-clearing. The reader is busy — get to the point.'
		},
		{
			title: 'Confident',
			body: "We've shipped, we know the math, we say it. Specifics over hedges. Real numbers over vague claims."
		},
		{
			title: 'Warm without being chummy',
			body: 'Contractions are fine. Names are not. Address the reader as "you," the company as "we." Never the royal "our customers."'
		},
		{
			title: 'No theater',
			body: 'No exclamation marks. No emoji. No marketing spaghetti. The product earns trust by speaking like a person who ships.'
		}
	];

	const examples = [
		{
			context: 'Empty state — Dashboard',
			before:
				"Oops! 😬 We don't have any spending data yet. Check back soon or contact support if you think this is a mistake!",
			after:
				'No spending data available. Start using your card to see spending analytics here.'
		},
		{
			context: 'Error state',
			before:
				'Whoops! Something went wrong. Please retry or reach out to our friendly support team!!',
			after: 'Unable to load spending data. Please try refreshing or check back later.'
		},
		{
			context: 'Login subhead',
			before: 'Welcome to Dash.fi! New users — please complete the onboarding wizard below.',
			after: "New here? We'll get you set up automatically."
		},
		{
			context: 'Toast — success',
			before: '🎉 Hooray! Your spending data was refreshed!',
			after: 'Spending data refreshed successfully.'
		},
		{
			context: 'Marketing — hero',
			before:
				'The very best corporate card for the modern, growing, ambitious advertiser of today and tomorrow.',
			after: 'Built for growth.'
		}
	];

	const tone = [
		{
			ctx: 'Routine action',
			row: ['Calm', 'Precise', 'Functional'],
			example: '"Card unlocked. Try a transaction to confirm."'
		},
		{
			ctx: 'Money moved',
			row: ['Calm', 'Confident', 'Receipt-like'],
			example: '"$1,240.00 sent to Acme Co. Reference 4401-902F-X."'
		},
		{
			ctx: 'Approval blocked',
			row: ['Direct', 'Helpful', 'No blame'],
			example: '"Decline — daily limit reached. Limit resets at midnight UTC."'
		},
		{
			ctx: 'Marketing — celebratory',
			row: ['Confident', 'A little swaggering', 'Specific'],
			example: '"Brands are switching from Capital One, Chase, and Amex every day."'
		}
	];

	const dos = [
		{ kind: 'do' as const, text: 'Sentence case across the UI. Title case is for proper nouns only.' },
		{ kind: 'do' as const, text: 'Use contractions. They\'re warmer and read faster ("we\'ll", "you\'re", "let\'s").' },
		{ kind: 'do' as const, text: 'Numerals, not spelled-out numbers. "3 cards", not "three cards". Currency prefixed: "$300M+".' },
		{ kind: 'dont' as const, text: "Don't use emoji anywhere. Not in copy, not in cards, not in empty states." },
		{ kind: 'dont' as const, text: "Don't use exclamation marks in product UI. They feel performative — the brand doesn't perform." },
		{ kind: 'dont' as const, text: "Don't address users by name in body copy. Reserve names for greetings only." }
	];
</script>

<svelte:head><title>Voice — Brand — Dashbook</title></svelte:head>

<InnerPage section="/brand" wide>
	<PageHeader
		label="Brand / Voice"
		title="Voice."
		lede="Direct, confident, warm without being chummy. The brand speaks like a founder who ships — not a bank."
	/>

	<Section label="Principles">
		<ul class="principles">
			{#each principles as p, i (p.title)}
				<li>
					<span class="num tabular-nums">0{i + 1}</span>
					<div>
						<div class="p-title">{p.title}</div>
						<p>{p.body}</p>
					</div>
				</li>
			{/each}
		</ul>
	</Section>

	<Section
		label="Tone matrix"
		note="Tone shifts by context. The principles never change — only the dial."
	>
		<table class="tone">
			<thead>
				<tr>
					<th>Context</th>
					<th>Tone dial</th>
					<th>Example</th>
				</tr>
			</thead>
			<tbody>
				{#each tone as t (t.ctx)}
					<tr>
						<td class="ctx">{t.ctx}</td>
						<td class="dial">
							{#each t.row as r (r)}
								<span class="chip">{r}</span>
							{/each}
						</td>
						<td class="ex">{t.example}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Section>

	<Section
		label="Examples by context"
		note="Before / after. Every brand book has these — most stop at one. We use product surfaces."
	>
		<div class="examples">
			{#each examples as ex (ex.context)}
				<div class="example">
					<div class="ex-ctx">{ex.context}</div>
					<div class="ex-grid">
						<div class="ex-cell before">
							<div class="ex-label">Before</div>
							<p>{ex.before}</p>
						</div>
						<div class="ex-cell after">
							<div class="ex-label">After</div>
							<p>{ex.after}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Do · Don't">
		<DoDontGrid items={dos} />
	</Section>
</InnerPage>

<style>
	.principles {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.principles li {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 24px;
		padding: 32px 0;
		border-top: 1px solid var(--border);
		align-items: flex-start;
	}
	.principles li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.num {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--fg-muted);
		padding-top: 6px;
		letter-spacing: -0.02em;
	}
	.p-title {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		color: var(--fg);
		margin-bottom: 12px;
	}
	.principles p {
		font-size: 15px;
		line-height: 1.6;
		color: var(--fg-muted);
		max-width: 600px;
	}

	table.tone {
		width: 100%;
		border-collapse: collapse;
	}
	table.tone th {
		text-align: left;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 500;
		padding: 12px 16px 12px 0;
		border-bottom: 1px solid var(--border);
	}
	table.tone td {
		padding: 16px 16px 16px 0;
		border-bottom: 1px solid var(--border);
		vertical-align: middle;
		font-size: 14px;
	}
	.ctx {
		color: var(--fg-muted);
		width: 200px;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: -0.02em;
	}
	.dial {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
	.chip {
		font-family: var(--font-mono);
		font-size: 11px;
		padding: 3px 8px;
		border: 1px solid var(--border);
		color: var(--fg-muted);
		letter-spacing: -0.01em;
	}
	.ex {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: 18px;
		color: var(--fg);
		letter-spacing: -0.01em;
		max-width: 460px;
	}

	.examples {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.example {
		border: 1px solid var(--border);
	}
	.ex-ctx {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		padding: 12px 16px;
		border-bottom: 1px solid var(--border);
	}
	.ex-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.ex-cell {
		padding: 24px;
	}
	.ex-cell.before {
		border-right: 1px solid var(--border);
		opacity: 0.65;
	}
	.ex-cell.after .ex-label {
		color: var(--brand);
	}
	.ex-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 12px;
	}
	.ex-cell p {
		font-size: 15px;
		line-height: 1.55;
		color: var(--fg);
	}
	@media (max-width: 720px) {
		.principles li {
			grid-template-columns: 60px 1fr;
		}
		.ex-grid {
			grid-template-columns: 1fr;
		}
		.ex-cell.before {
			border-right: 0;
			border-bottom: 1px solid var(--border);
		}
	}
</style>
