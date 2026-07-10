<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { formCapture as spec } from '$specs/marketing/patterns/form-capture';

	let email = $state('');
	let submitted = $state(false);

	function submit(e: Event): void {
		e.preventDefault();
		submitted = true;
	}
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			{#if !submitted}
				<form class="form-capture" onsubmit={submit}>
					<label class="sr-only" for="email-demo">Work email</label>
					<input id="email-demo" type="email" placeholder="you@company.com" bind:value={email} required />
					<button type="submit">Get started</button>
				</form>
			{:else}
				<p class="success">✓ You're on the list — we'll be in touch shortly.</p>
			{/if}
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 32px;
	}
	.form-capture {
		display: flex;
		gap: 12px;
		max-width: 460px;
	}
	.form-capture input {
		flex: 1;
		padding: 12px 16px;
		border: 1px solid var(--m-border);
		background: var(--m-surface);
		color: var(--m-fg-strong);
		font: inherit;
	}
	.form-capture input:focus-visible {
		outline: none;
		border-color: var(--m-accent-border);
	}
	.form-capture button {
		padding: 12px 24px;
		background: var(--m-accent);
		color: var(--m-surface);
		border: 0;
		border-radius: 6px;
		font: inherit;
		cursor: pointer;
		transition: transform 100ms;
	}
	.form-capture button:active {
		transform: scale(0.97);
	}
	.success {
		margin: 0;
		font-size: 14px;
		color: var(--m-positive);
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
	}
	@media (max-width: 560px) {
		.form-capture {
			flex-direction: column;
		}
	}
</style>
