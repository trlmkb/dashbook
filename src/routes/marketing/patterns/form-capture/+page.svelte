<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { formCapture as spec } from '$specs/marketing/patterns/form-capture';

	let email = $state('');
	let submitted = $state(false);

	// Demo only — the real single-field form is a GET navigation to
	// app.dash.fi/signup; this preview never submits anywhere.
	function submit(e: Event): void {
		e.preventDefault();
		submitted = true;
	}
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">Single-field (shipping-audit hero, calculator CTA)</p>
			{#if !submitted}
				<form class="capture" onsubmit={submit}>
					<label class="sr-only" for="email-demo">Work email</label>
					<span class="capture-field">
						<svg class="capture-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
							<rect x="2" y="4" width="20" height="16" rx="2"></rect>
							<path d="m22 7-10 5L2 7"></path>
						</svg>
						<input id="email-demo" type="email" placeholder="Enter your work email" bind:value={email} required />
					</span>
					<button type="submit">
						Run your first audit
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path d="M5 12h14M13 5l7 7-7 7" />
						</svg>
					</button>
				</form>
				<p class="note">Demo only — the real form navigates to app.dash.fi/signup on submit (no in-place success state).</p>
			{:else}
				<p class="note">Submitted (demo) — this would navigate to app.dash.fi/signup?email=... in production.</p>
			{/if}
		</div>

		<div class="demo">
			<p class="eyebrow">HubSpot embed — inline card (partner page)</p>
			<div class="pn-form-card">
				<div class="hs-form-placeholder">
					<span class="hs-spinner" aria-hidden="true"></span>
					<span>Loading the partner application form&hellip;</span>
				</div>
				<p class="note">Demo only — in production this div is replaced by a HubSpot iframe (data-form-id, data-portal-id) loaded from js.hsforms.net.</p>
			</div>
		</div>

		<div class="demo">
			<p class="eyebrow">HubSpot embed — modal (Growth Network)</p>
			<div class="gn-dlg-preview">
				<button type="button" class="gn-dlg-close" aria-label="Close (demo)">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
						<path d="M6 6l12 12M18 6L6 18" />
					</svg>
				</button>
				<p class="gn-dlg-eyebrow">Growth Network</p>
				<h3 class="gn-dlg-title">Private Network for Agencies, Consultants &amp; Operators</h3>
				<div class="gn-dlg-loading">
					<span class="hs-spinner" aria-hidden="true"></span>
					<span>Loading the application form&hellip;</span>
				</div>
				<p class="note">Demo only — a native &lt;dialog&gt; wraps the same HubSpot embed mechanism; opens via `data-apply-open`, falls back to a mailto link after ~12s if the iframe never mounts.</p>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 32px;
	}
	.demo + .demo {
		margin-top: 20px;
	}
	.eyebrow {
		margin: 0 0 20px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}

	/* ── Single-field capture ── */
	.capture {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 448px;
	}
	.capture-field {
		position: relative;
		flex: 1;
		display: flex;
		align-items: center;
	}
	.capture-icon {
		position: absolute;
		left: 14px;
		width: 16px;
		height: 16px;
		color: var(--m-fg-subtle);
		pointer-events: none;
	}
	.capture input {
		width: 100%;
		border-radius: 999px;
		padding: 10px 16px 10px 40px;
		border: 1px solid var(--m-border-strong);
		background: var(--m-card);
		color: var(--m-fg-strong);
		font: inherit;
		font-size: 14px;
	}
	.capture input:focus-visible {
		outline: none;
		border-color: var(--m-accent);
		box-shadow: 0 0 0 3px var(--m-accent-soft);
	}
	.capture button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		height: 42px;
		padding: 0 20px;
		border-radius: 999px;
		border: 0;
		background: var(--m-accent);
		color: #fff;
		font: inherit;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
		transition: transform 100ms;
	}
	.capture button:active {
		transform: scale(0.98);
	}
	.capture button svg {
		width: 16px;
		height: 16px;
	}
	@media (min-width: 640px) {
		.capture {
			flex-direction: row;
		}
	}
	.note {
		margin: 12px 0 0;
		font-size: 13px;
		line-height: 1.5;
		color: var(--m-fg-muted);
	}

	/* ── HubSpot embed placeholder (shared) ── */
	.hs-form-placeholder,
	.gn-dlg-loading {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 40px 0;
		font-size: 14px;
		color: var(--m-fg-muted);
	}
	.hs-spinner {
		width: 20px;
		height: 20px;
		flex: none;
		border-radius: 50%;
		border: 2px solid var(--m-accent-soft);
		border-top-color: var(--m-accent);
		animation: hs-spin 0.7s linear infinite;
	}
	@keyframes hs-spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* ── HubSpot embed — inline card (partner page) ── */
	.pn-form-card {
		max-width: 460px;
		padding: clamp(22px, 3vw, 36px);
		border: 1px solid var(--m-border);
		background: var(--m-card);
	}

	/* ── HubSpot embed — modal (Growth Network) ── */
	.gn-dlg-preview {
		position: relative;
		max-width: min(560px, 100%);
		border: 1px solid var(--m-border);
		background: var(--m-card);
		border-radius: 16px;
		padding: 30px clamp(20px, 4vw, 38px) 34px;
	}
	.gn-dlg-close {
		position: absolute;
		top: 14px;
		right: 14px;
		width: 36px;
		height: 36px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 0;
		border-radius: 9px;
		background: transparent;
		color: var(--m-fg-muted);
		cursor: pointer;
	}
	.gn-dlg-eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 400;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--m-accent);
	}
	.gn-dlg-title {
		margin: 8px 0 0;
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 200;
		letter-spacing: -0.01em;
		line-height: 1.18;
		color: var(--m-fg-strong);
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
	}
</style>
