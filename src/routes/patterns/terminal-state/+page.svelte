<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Pill } from '@dashfi/svelte/ui/pill';
	import CheckCircle2 from '@lucide/svelte/icons/check-circle-2';
	import XCircle from '@lucide/svelte/icons/x-circle';
	import ShieldAlert from '@lucide/svelte/icons/shield-alert';

	const example = `<script lang="ts">
\timport CheckCircle2 from '@lucide/svelte/icons/check-circle-2';
\timport { Button } from '@dashfi/svelte/ui/button';
\timport { Pill } from '@dashfi/svelte/ui/pill';

\tlet { data } = $props();
<\/script>

<svelte:head><title>Application approved · Dash.fi</title></svelte:head>

<section class="terminal">
\t<div class="icon"><CheckCircle2 size={32} strokeWidth={1.5} /></div>
\t<Pill type="success">Approved</Pill>
\t<h1>Welcome to Dash.fi, {data.businessName}.</h1>
\t<p class="body">
\t\tYour application is approved. We're issuing your first card now —
\t\tit'll appear in your dashboard within a minute.
\t</p>
\t<Button variant="brand" href="/dashboard">Go to dashboard</Button>
</section>

<style>
\t.terminal {
\t\tdisplay: flex;
\t\tflex-direction: column;
\t\talign-items: center;
\t\tgap: 16px;
\t\tmax-width: 480px;
\t\tmargin: 0 auto;
\t\tpadding: 64px 24px;
\t\ttext-align: center;
\t}
</style>`;
</script>

<svelte:head><title>Terminal state — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Terminal state page"
	description="Success / failure / blocked end-of-flow screen. Single message, single CTA (or two — primary + secondary). Used at the end of apply, after dispute submission, on hard-block compliance fails."
	uses={['Empty', 'Button', 'Pill']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="600px">
			{#snippet children(_m)}
				<div class="stack">
					<div class="variant">
						<span class="variant-label">Success</span>
						<div class="frame">
							<div class="icon icon-success">
								<CheckCircle2 size={32} strokeWidth={1.5} />
							</div>
							<Pill type="success">Approved</Pill>
							<h3 class="headline">Welcome to Dash.fi, Acme Inc.</h3>
							<p class="body">
								Your application is approved. We're issuing your first card now —
								it'll appear in your dashboard within a minute.
							</p>
							<div class="actions">
								<Button variant="brand">Go to dashboard</Button>
							</div>
						</div>
					</div>

					<div class="separator"></div>

					<div class="variant">
						<span class="variant-label">Failure</span>
						<div class="frame">
							<div class="icon icon-danger">
								<XCircle size={32} strokeWidth={1.5} />
							</div>
							<Pill type="danger">Action needed</Pill>
							<h3 class="headline">We couldn't process your application.</h3>
							<p class="body">
								We weren't able to verify the EIN you submitted. Re-check the
								details and resubmit, or reach support if you think this is a
								mistake.
							</p>
							<div class="actions actions-pair">
								<Button variant="outline">Edit application</Button>
								<Button variant="ghost">Contact support</Button>
							</div>
						</div>
					</div>

					<div class="separator"></div>

					<div class="variant">
						<span class="variant-label">Blocked</span>
						<div class="frame">
							<div class="icon icon-muted">
								<ShieldAlert size={32} strokeWidth={1.5} />
							</div>
							<Pill type="base">Under review</Pill>
							<h3 class="headline">Your application needs a closer look.</h3>
							<p class="body">
								We're reviewing some details with our compliance team. We'll email
								you within 2 business days. No action needed from you right now.
							</p>
						</div>
					</div>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
		<p class="code-note">
			Notice the route renders without the protected-app-shell — terminal states are
			flow-endings, not in-section navigation, so the shell would distract from the
			next-step decision. Mount this page at a flat route (e.g.
			<code>/apply/done</code>) outside the <code>(app)</code> group, or use a layout
			that suppresses sidebar and topbar.
		</p>
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				The end of a flow — success, failure, or hard block. Single message, single
				primary CTA (or two: primary + secondary). The page intentionally has no
				shell chrome — it's the moment the user is finished with one thing and
				choosing the next, and reducing visual surface helps them choose. Distinct
				from <code>Empty state</code>: empty is "no data yet, take this action to
				create some"; terminal is "you've reached an end, here's where to go next."
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>No shell chrome.</strong> No sidebar, no topbar, no breadcrumbs.
					The user just finished a multi-step process; the shell would compete with
					the moment.
				</li>
				<li>
					<strong>Status pill is text + colour, not colour alone.</strong>
					"Approved" / "Action needed" / "Under review" — colour reinforces, label
					communicates.
				</li>
				<li>
					<strong>One primary CTA. Optionally one secondary.</strong> Never three.
					A second CTA is for escape valves ("contact support") not equal-weight
					choices.
				</li>
				<li>
					<strong>Headline is sentence case, ends with a period.</strong> This is
					Dash.fi voice. "Welcome to Dash.fi, Acme Inc." not "Welcome to Dash.fi!".
				</li>
				<li>
					<strong>Body text names the next step concretely.</strong> Not "We'll be
					in touch" — "We'll email you within 2 business days." Concrete time
					horizons reduce anxiety.
				</li>
				<li>
					<strong>Blocked variant can have zero CTAs.</strong> When the user
					genuinely has nothing to do, render no buttons. Adding "OK" or "Got it"
					to acknowledge is theatre.
				</li>
			</ul>
			<h3>Empty vs terminal</h3>
			<ul>
				<li>
					<strong>Direction of time.</strong> Empty is a starting state: data could
					exist but doesn't yet. Terminal is an ending: the flow has run, this is
					the result.
				</li>
				<li>
					<strong>What the CTA does.</strong> Empty's CTA creates data ("Issue
					first card"). Terminal's CTA navigates forward ("Go to dashboard") or
					backward ("Edit application").
				</li>
				<li>
					<strong>How often the user sees it.</strong> Empty repeats on every visit
					to an empty surface. Terminal is encountered once per flow run.
				</li>
				<li>
					<strong>Tone.</strong> Empty's tone is invitational ("Get started").
					Terminal's tone matches the outcome (celebratory / corrective / patient).
				</li>
			</ul>
			<h3>Source</h3>
			<p>
				<code>(onboarding)/apply/done/+page.svelte</code> and similar terminal pages
				in dashfi-ui. Inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern P4).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Auto-redirect after success.</strong> For low-stakes confirmations
					(e.g. "Payment scheduled"), add a 5-second countdown that auto-navigates
					to the next page. Show the countdown so the user can cancel. Useful for
					non-terminal-but-confirming states.
				</li>
				<li>
					<strong>Failure with retry inline.</strong> If the failure is recoverable
					in-place (e.g. "Payment failed — card declined"), include a small inline
					form to enter a different card right on the terminal page. Avoids forcing
					the user to navigate back through the flow.
				</li>
				<li>
					<strong>Blocked with status check.</strong> For "under review" states
					with a known SLA, show "Status check" as a secondary action that links to
					a transparency page showing current queue position.
				</li>
				<li>
					<strong>Multi-currency / regulatory variants.</strong> Different terminal
					copy by region (e.g. FDIC mention for US, FCA reference for UK). Use the
					loader's region data to select copy; don't hardcode.
				</li>
			</ul>
			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't show a metric tile row on a terminal page.</strong>
					"You've spent $12k in cards" right after "Welcome to Dash.fi" makes no
					sense. Terminal pages are single-purpose.
				</li>
				<li>
					<strong>Don't auto-trigger confetti or celebration animations on success.</strong>
					Particle effects feel like SaaS theatre, especially in fintech. The jade
					pill + period-terminated headline is the celebration. Restraint.
				</li>
				<li>
					<strong>Don't reach for <code>Empty state</code> when the user has just
					submitted a flow.</strong> They're different patterns. Empty implies "go
					create"; terminal implies "you finished."
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 0;
		width: 100%;
		max-width: 560px;
	}
	.variant {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px 0;
	}
	.variant-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		text-align: center;
	}
	.separator {
		height: 1px;
		background: var(--border);
		width: 100%;
	}
	.frame {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		max-width: 480px;
		margin: 0 auto;
		padding: 24px 24px;
		text-align: center;
		width: 100%;
	}
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border: 1px solid var(--border);
		margin-bottom: 4px;
		color: var(--fg-muted);
	}
	.icon-success {
		color: var(--brand, #00a884);
		border-color: var(--brand, #00a884);
	}
	.icon-danger {
		color: var(--destructive, #d97706);
		border-color: var(--destructive, #d97706);
	}
	.icon-muted {
		color: var(--fg-muted);
	}
	.headline {
		font-size: 20px;
		font-weight: 500;
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--fg);
		margin: 0;
	}
	.body {
		font-size: 14px;
		line-height: 1.65;
		color: var(--fg-muted);
		margin: 0;
		max-width: 420px;
	}
	.actions {
		display: flex;
		gap: 8px;
		margin-top: 8px;
	}
	.actions-pair {
		flex-wrap: wrap;
		justify-content: center;
	}
	.code-note {
		max-width: 720px;
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.65;
		color: var(--fg-muted);
	}
	.code-note code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
		color: var(--fg);
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
