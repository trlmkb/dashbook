<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Label } from '@dashfi/svelte/ui/label';
	import { fly } from 'svelte/transition';

	type StepId = 'form' | 'review' | 'confirmation';
	const steps: { id: StepId; title: string }[] = [
		{ id: 'form', title: 'Add funds' },
		{ id: 'review', title: 'Review fund addition' },
		{ id: 'confirmation', title: 'Confirmation' }
	];

	let current = $state(0);
	let direction = $state(1);
	let amount = $state('5,000.00');

	function navigate(next: number): void {
		direction = next >= current ? 1 : -1;
		current = next;
	}

	const example = `<script lang="ts">
\tlet currentStep = \$state(0);
\tlet direction = \$state(1);

\t// Steps are data, not markup — { component, props } lets the same
\t// dialog shell drive wildly different step content.
\tconst steps = \$derived(
\t\taccount
\t\t\t? [
\t\t\t\t\t{ id: 'form', title: 'Add funds', component: AddFundsForm,
\t\t\t\t\t  props: { account, onNext: () => navigateToStep('review') } },
\t\t\t\t\t{ id: 'review', title: 'Review fund addition', component: AddFundsReview,
\t\t\t\t\t  props: { onNext: () => navigateToStep('confirmation') } },
\t\t\t\t\t{ id: 'confirmation', component: AddFundsConfirmation,
\t\t\t\t\t  props: { onNext: () => handleClose() } }
\t\t\t\t]
\t\t\t: []
\t);

\tfunction navigateToStep(step: number | string) {
\t\tconst i = typeof step === 'string' ? steps.findIndex((s) => s.id === step) : step;
\t\tif (i < 0 || i >= steps.length) return;
\t\tdirection = i >= currentStep ? 1 : -1;
\t\tcurrentStep = i;
\t}
<\/script>

<Dialog.Content class="sm:max-w-xl">
\t{#if steps[currentStep]?.title}
\t\t<Dialog.Header><Dialog.Title>{steps[currentStep].title}</Dialog.Title></Dialog.Header>
\t{/if}
\t<div class="grid">
\t\t{#each steps as step, index (step.id)}
\t\t\t{#if index === currentStep}
\t\t\t\t<div in:fly={{ x: 60 * direction }} class="col-start-1 row-start-1">
\t\t\t\t\t<step.component {...step.props} />
\t\t\t\t</div>
\t\t\t{/if}
\t\t{/each}
\t</div>
</Dialog.Content>`;
</script>

<svelte:head><title>In-dialog stepper — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="In-dialog stepper"
	description="A stepper that lives entirely inside one Dialog — a steps array of { component, props }, current index in local state, direction-aware fly transition on step change. Used for add-funds, wire details, and other modal-scoped multi-step flows that don't warrant their own route."
	uses={['Dialog', 'Skeleton']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="420px">
			{#snippet children(_m)}
				<div class="dialog">
					<header class="head">{steps[current].title}</header>
					<div class="grid">
						{#key current}
							<div class="step" in:fly={{ x: 60 * direction, duration: 220 }}>
								{#if steps[current].id === 'form'}
									<Label for="amount">Amount</Label>
									<Input id="amount" bind:value={amount} />
									<p class="hint">Funds transfer from your linked bank account.</p>
									<div class="actions">
										<Button variant="brand" onclick={() => navigate(1)}>Continue</Button>
									</div>
								{:else if steps[current].id === 'review'}
									<div class="review-row">
										<span>Amount</span>
										<span class="mono">${amount}</span>
									</div>
									<div class="review-row">
										<span>Destination</span>
										<span>Operating account · ····4821</span>
									</div>
									<div class="actions">
										<Button variant="ghost" onclick={() => navigate(0)}>Back</Button>
										<Button variant="brand" onclick={() => navigate(2)}>Confirm</Button>
									</div>
								{:else}
									<p class="confirm">Funds added. This may take 1–2 business days to settle.</p>
									<div class="actions">
										<Button variant="brand" onclick={() => navigate(0)}>Done</Button>
									</div>
								{/if}
							</div>
						{/key}
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
				Some flows are too short-lived to earn a route — add funds, confirm a wire, walk through
				a 2-step upgrade. The in-dialog stepper keeps the whole flow inside one Dialog mount,
				trading persisted URL state (which the route-level
				<a href="/patterns/multi-step-onboarding">Multi-step onboarding flow</a> uses) for a
				lighter-weight, closable-anytime interaction.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Steps are data — <code>{`{ id, title, component, props }`}</code> —</strong>
					not a chain of <code>{`{#if}`}</code> blocks. The dialog shell doesn't know or care what
					each step renders; it only manages the index and direction.
				</li>
				<li>
					<strong>Direction-aware transition.</strong> Moving forward flies in from the right;
					moving back (via a "Back" button) flies in from the left. The sign of
					<code>direction</code> is set at the navigation call, not inferred from indices at
					render time.
				</li>
				<li>
					<strong>Steps stack on the same grid cell</strong> (<code>col-start-1 row-start-1</code>)
					so the outgoing step doesn't visually reflow the dialog height as the incoming step
					transitions in.
				</li>
				<li>
					<strong>Closing resets to step 0.</strong> Re-opening the dialog for the same entity
					always starts from the top — there's no "resume where I left off" for a flow this
					short.
				</li>
			</ul>
			<h3>Source</h3>
			<p>
				Distilled from <code>financial-accounts/components/add-funds-dialog.svelte</code> and its
				<code>add-funds-steps/</code> siblings.
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Branching step, not linear</strong> — the add-funds flow inserts a "Wire
					transfer" step between form and review only when the user picks that funding method;
					the steps array is <code>$derived</code>, so it can branch on state rather than always
					being a fixed sequence.
				</li>
				<li>
					<strong>Loading skeleton before steps resolve</strong> — when the dialog needs an async
					fetch before it knows which steps apply (e.g. the target account), render a
					<code>Skeleton</code> stack in place of the step content, never a spinner alone.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.dialog {
		width: 100%;
		max-width: 440px;
		border: 1px solid var(--border);
		background: var(--bg);
		overflow: hidden;
	}
	.head {
		padding: 14px 18px;
		font-size: 14px;
		font-weight: 500;
		border-bottom: 1px solid var(--border);
	}
	.grid {
		position: relative;
		min-height: 220px;
	}
	.step {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 18px;
	}
	.hint {
		margin: 0;
		font-size: 12px;
		color: var(--fg-muted);
	}
	.review-row {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		padding: 6px 0;
		border-bottom: 1px solid var(--border);
	}
	.mono {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
	.confirm {
		font-size: 13px;
		color: var(--fg);
	}
	.actions {
		display: flex;
		gap: 8px;
		margin-top: auto;
		padding-top: 12px;
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
	.rationale a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
