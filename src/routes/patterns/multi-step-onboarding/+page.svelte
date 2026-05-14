<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Label } from '@dashfi/svelte/ui/label';

	type StepId = 'business' | 'contact' | 'banking' | 'review';

	const steps: { id: StepId; title: string; eyebrow: string }[] = [
		{ id: 'business', title: 'Business details', eyebrow: 'Business' },
		{ id: 'contact', title: 'Primary contact', eyebrow: 'Contact' },
		{ id: 'banking', title: 'Funding source', eyebrow: 'Banking' },
		{ id: 'review', title: 'Review and submit', eyebrow: 'Review' }
	];

	let stepIndex = $state(0);
	let submitted = $state(false);

	const form = $state({
		business: {
			legalName: 'Dash Inc.',
			type: 'C-Corporation',
			ein: '88-1234567'
		},
		contact: {
			name: 'Zygis Lukosius',
			email: 'zygis@dash.fi',
			phone: '+1 (415) 555-0142'
		},
		banking: {
			routing: '021000021',
			account: '0000123456789',
			accountType: 'Business checking'
		}
	});

	const businessTypes = ['Sole proprietor', 'LLC', 'C-Corporation', 'S-Corporation', 'Partnership'];
	const accountTypes = ['Business checking', 'Business savings'];

	function goNext() {
		if (stepIndex < steps.length - 1) {
			stepIndex += 1;
			submitted = false;
		} else {
			submitted = true;
		}
	}

	function goBack() {
		if (stepIndex > 0) {
			stepIndex -= 1;
			submitted = false;
		}
	}

	function jumpTo(i: number) {
		// Stepper-as-link: only completed/current allowed
		if (i <= stepIndex) {
			stepIndex = i;
			submitted = false;
		}
	}

	const continueLabel = $derived(stepIndex === steps.length - 1 ? 'Submit application' : 'Continue');

	const layoutServer = `// src/routes/(onboarding)/apply/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const ORDER = ['business', 'contact', 'banking', 'review'] as const;
type Step = (typeof ORDER)[number];

export const load: LayoutServerLoad = async ({ locals, url, params }) => {
\tconst app = await locals.db.application.findForUser(locals.session.userId);

\t// Already submitted — kick into the dashboard.
\tif (app?.submittedAt) {
\t\tthrow redirect(303, '/dashboard');
\t}

\t// Enforce step ordering: a user can't deep-link to step N
\t// without having completed step N-1.
\tconst current = (params.step ?? 'business') as Step;
\tconst maxAllowed = ORDER.indexOf(app?.furthestStep ?? 'business');
\tconst requested = ORDER.indexOf(current);
\tif (requested > maxAllowed) {
\t\tthrow redirect(303, \`/apply/\${ORDER[maxAllowed]}\`);
\t}

\treturn {
\t\tapplication: app ?? { furthestStep: 'business' as Step, data: {} },
\t\tsteps: ORDER
\t};
};`;

	const layoutSvelte = `<!-- src/routes/(onboarding)/apply/+layout.svelte -->
<script lang="ts">
\timport { page } from '$app/state';
\timport { Button } from '@dashfi/svelte/ui/button';
\tlet { data, children } = $props();

\tconst current = $derived(page.url.pathname.split('/').pop() ?? 'business');
\tconst index = $derived(data.steps.indexOf(current));
<\/script>

<div class="apply-shell">
\t<!-- Stepper indicator: each circle is a link to a completed step -->
\t<ol class="stepper">
\t\t{#each data.steps as step, i (step)}
\t\t\t<li class:done={i < index} class:current={i === index}>
\t\t\t\t{#if i <= index}
\t\t\t\t\t<a href="/apply/{step}">{i + 1}</a>
\t\t\t\t{:else}
\t\t\t\t\t<span>{i + 1}</span>
\t\t\t\t{/if}
\t\t\t\t<span class="label">{step}</span>
\t\t\t</li>
\t\t{/each}
\t</ol>

\t<!-- Each step is its own route — refresh, share, back-button all work -->
\t<main class="step-frame">
\t\t{@render children()}
\t</main>

\t<footer class="apply-footer">
\t\t<Button variant="outline" href={index > 0 ? \`/apply/\${data.steps[index - 1]}\` : undefined} disabled={index === 0}>
\t\t\tBack
\t\t</Button>
\t\t<!-- Continue is owned by each step's <form action="?/next"> -->
\t\t<Button type="submit" form="step-form" variant="brand">
\t\t\t{index === data.steps.length - 1 ? 'Submit application' : 'Continue'}
\t\t</Button>
\t</footer>
</div>`;
</script>

<svelte:head><title>Multi-step onboarding flow — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Multi-step onboarding flow"
	description="Linear stepper with persistent state, back/next controls, per-step validation, and a review step before submit. The apply flow uses this; KYC/KYB uses this."
	uses={['Button', 'Progress', 'Card', 'Form', 'Input', 'Label']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="640px">
			{#snippet children(_m)}
				<div class="flow">
					<!-- Stepper indicator -->
					<ol class="stepper">
						{#each steps as step, i (step.id)}
							{@const state = i < stepIndex ? 'done' : i === stepIndex ? 'current' : 'future'}
							<li class="step" data-state={state}>
								<button
									type="button"
									class="dot"
									aria-current={i === stepIndex ? 'step' : undefined}
									disabled={i > stepIndex}
									onclick={() => jumpTo(i)}
								>
									{#if state === 'done'}
										<svg viewBox="0 0 16 16" aria-hidden="true">
											<path
												d="M3.5 8.2L6.5 11.2L12.5 5.2"
												fill="none"
												stroke="currentColor"
												stroke-width="1.6"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									{:else}
										<span>{i + 1}</span>
									{/if}
								</button>
								<span class="step-label">{step.eyebrow}</span>
								{#if i < steps.length - 1}
									<span class="segment" data-state={i < stepIndex ? 'done' : 'future'}></span>
								{/if}
							</li>
						{/each}
					</ol>

					<!-- Step header -->
					<header class="step-header">
						<span class="eyebrow">Step {stepIndex + 1} of {steps.length}</span>
						<h2>{steps[stepIndex].title}</h2>
					</header>

					<!-- Step content -->
					<div class="step-body">
						{#if stepIndex === 0}
							<div class="field">
								<Label for="legalName">Legal business name</Label>
								<Input id="legalName" bind:value={form.business.legalName} />
							</div>
							<div class="field">
								<Label for="businessType">Business type</Label>
								<div class="mock-select">
									<Input id="businessType" bind:value={form.business.type} list="bt-list" />
									<datalist id="bt-list">
										{#each businessTypes as t (t)}
											<option value={t}></option>
										{/each}
									</datalist>
									<span class="chev" aria-hidden="true">▾</span>
								</div>
							</div>
							<div class="field">
								<Label for="ein">EIN</Label>
								<Input id="ein" bind:value={form.business.ein} placeholder="00-0000000" />
							</div>
						{:else if stepIndex === 1}
							<div class="field">
								<Label for="contactName">Primary contact name</Label>
								<Input id="contactName" bind:value={form.contact.name} />
							</div>
							<div class="field">
								<Label for="contactEmail">Email</Label>
								<Input id="contactEmail" type="email" bind:value={form.contact.email} />
							</div>
							<div class="field">
								<Label for="contactPhone">Phone</Label>
								<Input id="contactPhone" type="tel" bind:value={form.contact.phone} />
							</div>
						{:else if stepIndex === 2}
							<div class="field">
								<Label for="routing">Routing number</Label>
								<Input id="routing" bind:value={form.banking.routing} />
							</div>
							<div class="field">
								<Label for="account">Account number</Label>
								<Input id="account" bind:value={form.banking.account} />
							</div>
							<div class="field">
								<Label for="acctType">Account type</Label>
								<div class="mock-select">
									<Input id="acctType" bind:value={form.banking.accountType} list="at-list" />
									<datalist id="at-list">
										{#each accountTypes as t (t)}
											<option value={t}></option>
										{/each}
									</datalist>
									<span class="chev" aria-hidden="true">▾</span>
								</div>
							</div>
						{:else}
							<div class="review">
								<div class="review-group">
									<span class="review-title">Business</span>
									<dl>
										<dt>Legal name</dt>
										<dd>{form.business.legalName}</dd>
										<dt>Type</dt>
										<dd>{form.business.type}</dd>
										<dt>EIN</dt>
										<dd class="mono">{form.business.ein}</dd>
									</dl>
								</div>
								<div class="review-group">
									<span class="review-title">Contact</span>
									<dl>
										<dt>Name</dt>
										<dd>{form.contact.name}</dd>
										<dt>Email</dt>
										<dd>{form.contact.email}</dd>
										<dt>Phone</dt>
										<dd class="mono">{form.contact.phone}</dd>
									</dl>
								</div>
								<div class="review-group">
									<span class="review-title">Banking</span>
									<dl>
										<dt>Routing</dt>
										<dd class="mono">{form.banking.routing}</dd>
										<dt>Account</dt>
										<dd class="mono">••••{form.banking.account.slice(-4)}</dd>
										<dt>Type</dt>
										<dd>{form.banking.accountType}</dd>
									</dl>
								</div>
								{#if submitted}
									<div class="submitted" role="status">Application submitted ✓</div>
								{/if}
							</div>
						{/if}
					</div>

					<!-- Footer bar -->
					<footer class="footer">
						<Button variant="outline" disabled={stepIndex === 0} onclick={goBack}>Back</Button>
						<Button variant="brand" onclick={goNext}>{continueLabel}</Button>
					</footer>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<div class="code-pair">
			<h4>(onboarding)/apply/+layout.server.ts</h4>
			<CodeSnippet code={layoutServer} language="ts" />
			<h4>(onboarding)/apply/+layout.svelte</h4>
			<CodeSnippet code={layoutSvelte} language="svelte" />
		</div>
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				Linear stepper with persistent state across step navigation, back/next controls, per-step
				validation, and a review step before submit. The apply flow uses this; KYC/KYB uses this.
				The key insight: each step is its own route, not a tab-on-one-page. Routes give
				refresh-survival, deep-linkable progress (support can say <em>"go to step 3"</em>), and
				back-button correctness.
			</p>
			<p>
				The layout owns the stepper indicator, the footer bar, and the server-side guard. Each
				step page owns only its own form and validation. The split keeps step pages small and
				stops the layout from caring what's inside any given step.
			</p>

			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Each step is its own route under <code>(onboarding)</code>.</strong> Tabs would
					collapse the flow into one page, losing refresh-survival and back-button semantics. A
					user who closes the tab on step 3 and returns from email a day later lands back on step
					3 because <code>/apply/banking</code> is a real URL.
				</li>
				<li>
					<strong>A layout-level server guard enforces step ordering.</strong> The user can't
					deep-link to step 3 without completing step 2 — the guard redirects them back. This is
					the same folder-as-contract idea as the auth route-group pattern: the guard runs once
					per group, not per page.
				</li>
				<li>
					<strong>State persists in the loader, not client-side.</strong> Server-side
					persistence means refresh restores progress and partial applications can resume across
					devices. The loader returns the application record; each step's form pre-fills from
					it; Continue writes back and advances <code>furthestStep</code>.
				</li>
				<li>
					<strong>Validation runs per-step on Continue</strong>, not as a final submit. Catching
					<em>"EIN format invalid"</em> three steps later is hostile — by then the user has
					forgotten what they typed and lost context for fixing it.
				</li>
				<li>
					<strong>The review step is mandatory.</strong> It's the user's last chance to catch
					mistakes before a binding submission. Skipping straight from step N to submit is the
					wrong default for anything regulatory (KYC, KYB, ACH authorization).
				</li>
				<li>
					<strong>Back-and-forward through completed steps is free.</strong> Going back doesn't
					erase later steps' data; the user can revise and re-Continue without restarting.
					Editing the EIN on step 1 shouldn't blow away the routing number on step 3.
				</li>
			</ul>

			<h3>Source</h3>
			<p>
				<code>(onboarding)/apply/+layout.svelte</code> + step pages in dashfi-ui. Inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern P5).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Branching steps</strong> — when a user's answer in step 2 changes which step 3
					they see (e.g. <em>"Sole proprietor"</em> vs <em>"Corporation"</em> branch the
					business-info questions), make the branching explicit in the stepper: render the
					branch indicator inline rather than hiding the difference. Users should never feel
					like the flow changed shape behind their back.
				</li>
				<li>
					<strong>Save and resume</strong> — for long flows (KYC, KYB), surface a
					<em>"Save and finish later"</em> link in the footer. Sends a magic link to the user's
					email with a deep URL back into the flow at the exact step they left. The server-side
					persistence already supports this; the link is just the affordance.
				</li>
				<li>
					<strong>Recovery from abandon</strong> — when a user returns after dropping the flow,
					show a <em>"You left off here"</em> banner at the top of the step. Not a modal —
					modals at flow-start feel hostile and demand a decision before the user has remembered
					the context.
				</li>
				<li>
					<strong>Stepper as link, not just indicator</strong> — clicking a previous step's
					circle navigates back to that step. Forward steps stay disabled until reached. Lets
					users jump-back-and-revise without using the Back button N times.
				</li>
			</ul>

			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't model the stepper as a <code>Tabs</code> component.</strong> Tabs imply
					equal-weight, freely-navigable peers; a stepper implies ordered, gated progress.
					Conflating them encourages skipping ahead, which is exactly what the flow exists to
					prevent.
				</li>
				<li>
					<strong>Don't auto-advance on field blur.</strong> Users tab through forms naturally;
					auto-advance on blur creates surprise step-changes mid-typing and steals the keyboard
					focus from wherever the user expected it next.
				</li>
				<li>
					<strong>Don't keep onboarding state in client-side <code>$state</code> only.</strong>
					Refresh wipes it. Always persist server-side so the flow survives the user closing the
					tab, switching devices, or returning from an email link.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.flow {
		display: flex;
		flex-direction: column;
		gap: 32px;
		width: 100%;
		max-width: 640px;
	}

	/* Stepper indicator */
	.stepper {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		list-style: none;
		padding: 0;
		margin: 0;
		gap: 0;
	}
	.step {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}
	.dot {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 500;
		border: 1.5px solid var(--border);
		background: var(--bg);
		color: var(--fg-muted);
		cursor: pointer;
		padding: 0;
		position: relative;
		z-index: 1;
		transition: all 120ms ease;
	}
	.dot:disabled {
		cursor: not-allowed;
	}
	.step[data-state='current'] .dot {
		border-color: #2b605c;
		color: #2b605c;
		box-shadow: 0 0 0 3px rgba(43, 96, 92, 0.12);
	}
	.step[data-state='done'] .dot {
		background: #2b605c;
		border-color: #2b605c;
		color: var(--bg, #fff);
	}
	.dot svg {
		width: 14px;
		height: 14px;
		display: block;
	}
	.step-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.step[data-state='current'] .step-label,
	.step[data-state='done'] .step-label {
		color: var(--fg);
	}
	.segment {
		position: absolute;
		top: 14px;
		left: calc(50% + 18px);
		right: calc(-50% + 18px);
		height: 1.5px;
		background: var(--border);
		z-index: 0;
	}
	.segment[data-state='done'] {
		background: #2b605c;
	}

	/* Step header */
	.step-header {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.step-header h2 {
		font-size: 22px;
		font-weight: 500;
		margin: 0;
		color: var(--fg);
		letter-spacing: -0.01em;
	}

	/* Step content */
	.step-body {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.mock-select {
		position: relative;
	}
	.mock-select .chev {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--fg-muted);
		font-size: 10px;
		pointer-events: none;
	}

	/* Review step */
	.review {
		display: flex;
		flex-direction: column;
		gap: 20px;
		border: 1px solid var(--border);
		background: var(--bg-muted);
		padding: 20px;
	}
	.review-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.review-title {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.review dl {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 6px 16px;
		margin: 0;
	}
	.review dt {
		font-size: 13px;
		color: var(--fg-muted);
	}
	.review dd {
		font-size: 13px;
		color: var(--fg);
		margin: 0;
	}
	.review dd.mono {
		font-family: var(--font-mono);
		font-size: 12px;
	}
	.submitted {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #2b605c;
		padding-top: 8px;
		border-top: 1px solid var(--border);
	}

	/* Footer bar */
	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 16px;
		border-top: 1px solid var(--border);
		gap: 12px;
	}

	/* Code pair */
	.code-pair {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 880px;
	}
	.code-pair h4 {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.05em;
		color: var(--fg-muted);
		margin: 0;
	}

	/* Rationale */
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
	.rationale em {
		font-style: italic;
		color: var(--fg-muted);
	}
</style>
