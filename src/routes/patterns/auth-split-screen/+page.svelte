<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Label } from '@dashfi/svelte/ui/label';

	const layoutCode = `<!-- src/routes/(auth)/+layout.svelte -->
<script lang="ts">
\tlet { children } = $props();
<\/script>

<div class="auth-shell">
\t<aside class="brand-pane">
\t\t<a href="/" class="brand">
\t\t\t<LogoMark variant="wordmark" />
\t\t</a>
\t\t<div class="brand-message">
\t\t\t<h1>Money, built for ops.</h1>
\t\t\t<p>
\t\t\t\tIssue cards, pay bills, reconcile in real time —
\t\t\t\teverything from one place.
\t\t\t</p>
\t\t</div>
\t\t<footer class="brand-footer">
\t\t\t<span>© Dash.fi Technologies Inc.</span>
\t\t</footer>
\t</aside>

\t<main class="form-pane">
\t\t<div class="form-frame">
\t\t\t{@render children()}
\t\t</div>
\t</main>
</div>

<style>
\t.auth-shell {
\t\tdisplay: grid;
\t\tgrid-template-columns: 1fr 1fr;
\t\tmin-height: 100svh;
\t}
\t.brand-pane {
\t\tbackground: var(--m-jade);
\t\tcolor: var(--m-cream);
\t\tpadding: 48px;
\t\tdisplay: flex;
\t\tflex-direction: column;
\t\tjustify-content: space-between;
\t}
\t.form-pane {
\t\tdisplay: flex;
\t\talign-items: center;
\t\tjustify-content: center;
\t\tpadding: 48px;
\t}
\t.form-frame {
\t\twidth: 100%;
\t\tmax-width: 420px;
\t}
\t@media (max-width: 768px) {
\t\t.auth-shell { grid-template-columns: 1fr; }
\t\t.brand-pane { display: none; }
\t}
</style>`;

	const pageCode = `<!-- src/routes/(auth)/login/+page.svelte -->
<script lang="ts">
\timport { Button } from '@dashfi/svelte/ui/button';
\timport { Input } from '@dashfi/svelte/ui/input';
\timport { Label } from '@dashfi/svelte/ui/label';

\tlet email = $state('');
\tlet password = $state('');
<\/script>

<div class="header">
\t<div class="label">Sign in</div>
\t<h2>Welcome back.</h2>
\t<p class="lede">
\t\tNew here? <a href="/signup">Create an account</a>.
\t</p>
</div>

<form method="POST" class="form">
\t<div class="field">
\t\t<Label for="email">Work email</Label>
\t\t<Input id="email" name="email" type="email" bind:value={email} required />
\t</div>
\t<div class="field">
\t\t<Label for="password">Password</Label>
\t\t<Input id="password" name="password" type="password" bind:value={password} required />
\t\t<a class="forgot" href="/reset">Forgot password?</a>
\t</div>
\t<Button type="submit" variant="brand" size="lg">Sign in</Button>
</form>`;
</script>

<svelte:head><title>Auth split-screen — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Auth split-screen"
	description="Brand visual on one side, form on the other. Used for login, signup, password reset, 2FA challenge. Same shell across every unauthenticated state."
	uses={['Card', 'Button', 'Input', 'Label']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="560px">
			{#snippet children(_m)}
				<div class="shell">
					<aside class="brand-pane">
						<div class="brand">
							<div class="brand-mark">d</div>
							<span class="brand-text">dash<span class="brand-accent">.</span>fi</span>
						</div>
						<div class="brand-message">
							<div class="brand-eyebrow">Brand &amp; design system</div>
							<h2 class="brand-headline">Money, built for ops.</h2>
							<p class="brand-lede">
								Issue cards, pay bills, reconcile in real time — everything from one place.
							</p>
						</div>
						<div class="brand-footer">© Dash.fi Technologies Inc.</div>
					</aside>

					<main class="form-pane">
						<div class="form-frame">
							<div class="form-header">
								<div class="form-label">Sign in</div>
								<h3 class="form-title">Welcome back.</h3>
								<p class="form-lede">
									New here? <a href="#">Create an account</a>.
								</p>
							</div>
							<form class="form" onsubmit={(e) => e.preventDefault()}>
								<div class="field">
									<Label for="demo-email">Work email</Label>
									<Input id="demo-email" type="email" placeholder="you@company.com" />
								</div>
								<div class="field">
									<div class="field-row">
										<Label for="demo-password">Password</Label>
										<a class="field-aside" href="#">Forgot?</a>
									</div>
									<Input id="demo-password" type="password" placeholder="••••••••" />
								</div>
								<Button type="button" variant="brand" size="lg">Sign in</Button>
							</form>
						</div>
					</main>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<div class="code-pair">
			<h4>(auth)/+layout.svelte</h4>
			<CodeSnippet code={layoutCode} language="svelte" />
			<h4>(auth)/login/+page.svelte</h4>
			<CodeSnippet code={pageCode} language="svelte" />
		</div>
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				Every unauthenticated state — login, signup, password reset, 2FA challenge, magic-link
				prompt — lives in the same shell. The layout encodes the contract: "you're not in yet, here
				is the brand and here is the door." Switching between the four pages means swapping
				children, never the chrome. The brand pane stays put; the form column reflows.
			</p>

			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>50/50 split, not 60/40 or 40/60.</strong> Even split signals equal weight
					between brand presence and the user's task. Tilting toward the brand looks marketing;
					tilting toward the form looks utilitarian. Symmetry says "both matter."
				</li>
				<li>
					<strong>Brand pane on the left.</strong> LTR reading languages parse left-to-right;
					brand comes first as the orientation cue, then the user lands on the form. Right-side
					brand reads as a sidebar.
				</li>
				<li>
					<strong>Form max-width 420px.</strong> Line length for labels + inputs caps around
					~420px before forms feel sparse. We center the form column and let the pane be wider
					than the form to give the user vertical breathing room.
				</li>
				<li>
					<strong>One affordance per page.</strong> Sign in / Create account / Reset / Verify —
					one verb per child route. The "switch flows" link (e.g. "New here? Create an account")
					sits in the form header, not as a duplicate button.
				</li>
				<li>
					<strong>Brand pane uses jade, not cobalt.</strong> Jade is the product brand; auth is
					the threshold to the product. Cobalt is reserved for marketing surfaces. Auth is the
					quietest moment where the two could be confused — go product.
				</li>
				<li>
					<strong>No top-level nav.</strong> The user is on a single-purpose surface. Adding nav
					(home, pricing, docs) gives them four ways to bounce — which is exactly the wrong
					behaviour on a signup page. Provide an exit via the brand logo only.
				</li>
			</ul>

			<h3>Responsive strategy</h3>
			<ul>
				<li>
					<strong>≥ 768px</strong> — 50/50 split. Brand pane visible.
				</li>
				<li>
					<strong>&lt; 768px</strong> — brand pane disappears entirely. Form expands to full
					width with a small top-of-page brand mark (just the wordmark, no headline). Mobile
					users came here to sign in, not to read brand copy.
				</li>
				<li>
					<strong>Form keeps its <code>max-width: 420px</code></strong> on both breakpoints.
					Centered. Don't stretch inputs to viewport width on tablets — that reads as a hostile
					form.
				</li>
			</ul>

			<h3>Source</h3>
			<p>
				Distilled from <code>(auth)/+layout.svelte</code> +
				<code>(auth)/login/+page.svelte</code> in dashfi-ui. Full inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern L2).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Brand pane with hero artwork</strong> — replace the headline + lede with a
					full-bleed brand image (vector map, photography, animated motion preview). Use for
					signup specifically, where the lift of "see what you're getting" justifies the
					density. Don't use for password reset — the user is already a customer; selling them
					again feels off.
				</li>
				<li>
					<strong>Centered single-column variant</strong> — for terminal auth states
					(verification sent, reset complete, account deactivated), drop the split entirely.
					Single centered card on a full-bleed brand background. The split is for entry; the
					centered card is for endings.
				</li>
				<li>
					<strong>SSO + email-and-password split</strong> — when the org supports both, the
					primary affordance is the SSO button (Google / Microsoft / "Sign in with your
					provider"), with an "Or use email" link below that progressively discloses the
					email/password form. Don't show both forms at once.
				</li>
				<li>
					<strong>Multi-step on the form column</strong> — for password reset (email → code →
					new password), keep the brand pane stable across all three steps. The form column
					transitions; the brand stays put. Stable chrome makes the multi-step feel like one
					flow, not three pages.
				</li>
			</ul>

			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't show marketing CTAs on auth pages.</strong> No "Schedule a demo", no
					"See pricing", no testimonials. The user has already chosen to sign in or sign up.
					Adding upsells reads as desperation.
				</li>
				<li>
					<strong>Don't put the form inside a Card with a visible border.</strong> The form pane
					is already a visual container — bordering the form again creates a card-within-a-card.
				</li>
				<li>
					<strong>Don't auto-focus the email field on every render.</strong> Auto-focus on
					first-paint is fine; on every re-render it steals focus from users tabbing through. Use
					<code>autocomplete</code> attributes; let the browser do the right thing.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.shell {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		height: 500px;
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.brand-pane {
		background: var(--m-jade, #2b605c);
		color: var(--m-cream, #ebede4);
		padding: 32px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-width: 0;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.brand-mark {
		width: 26px;
		height: 26px;
		background: var(--m-cream, #ebede4);
		color: var(--m-jade, #2b605c);
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 500;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
	}
	.brand-text {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 500;
		color: var(--m-cream, #ebede4);
	}
	.brand-accent {
		color: var(--m-yellow, #ebff00);
	}
	.brand-message {
		max-width: 380px;
	}
	.brand-eyebrow {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		opacity: 0.7;
		margin-bottom: 16px;
	}
	.brand-headline {
		margin: 0 0 12px;
		font-size: 32px;
		font-weight: 400;
		letter-spacing: -0.02em;
		line-height: 1.1;
		color: var(--m-cream, #ebede4);
	}
	.brand-lede {
		margin: 0;
		font-size: 14px;
		line-height: 1.65;
		opacity: 0.85;
	}
	.brand-footer {
		font-family: var(--font-mono);
		font-size: 10px;
		opacity: 0.6;
	}

	.form-pane {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 32px;
		background: var(--bg);
	}
	.form-frame {
		width: 100%;
		max-width: 360px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.form-header .form-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 4px;
	}
	.form-title {
		margin: 0 0 8px;
		font-size: 22px;
		font-weight: 400;
		letter-spacing: -0.01em;
	}
	.form-lede {
		margin: 0;
		font-size: 13px;
		color: var(--fg-muted);
	}
	.form-lede a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.field-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.field-aside {
		font-size: 11px;
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

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
