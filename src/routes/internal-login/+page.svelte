<script lang="ts">
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showPassphrase = $state(false);
</script>

<svelte:head><title>Sign in — Dashbook</title></svelte:head>

<main class="page">
	<div class="card">
		<div class="eyebrow">Internal section</div>
		<h1 class="title">Sign in.</h1>
		<p class="lede">
			Components, patterns, and developer docs are gated to the Dash.fi team. Enter the team passphrase to continue. The session lasts 90 days on this browser.
		</p>

		<form method="POST" class="form">
			<input type="hidden" name="returnTo" value={data.returnTo} />
			<label for="passphrase" class="label">Passphrase</label>
			<div class="input-wrap">
				<!-- svelte-ignore a11y_autofocus -->
				<input
					id="passphrase"
					name="passphrase"
					type={showPassphrase ? 'text' : 'password'}
					autocomplete="current-password"
					required
					autofocus
				/>
				<button
					type="button"
					class="toggle"
					aria-label={showPassphrase ? 'Hide passphrase' : 'Show passphrase'}
					aria-pressed={showPassphrase}
					onclick={() => (showPassphrase = !showPassphrase)}
				>
					{#if showPassphrase}
						<EyeOff size={16} strokeWidth={1.5} />
					{:else}
						<Eye size={16} strokeWidth={1.5} />
					{/if}
				</button>
			</div>
			{#if form?.error}
				<p class="error" role="alert">{form.error}</p>
			{/if}
			<button type="submit" class="submit">Continue</button>
		</form>

		<p class="footer">
			<a href="/">← Back to Dashbook home</a>
		</p>
	</div>
</main>

<style>
	.page {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 24px;
		background: var(--bg);
	}
	.card {
		width: 100%;
		max-width: 420px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 32px;
		border: 1px solid var(--border);
		background: var(--bg);
	}
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.title {
		font-size: 28px;
		font-weight: 400;
		letter-spacing: -0.01em;
		color: var(--fg);
		margin: 0;
	}
	.lede {
		font-size: 14px;
		line-height: 1.55;
		color: var(--fg-muted);
		margin: 0 0 12px 0;
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.input-wrap {
		position: relative;
	}
	.form input {
		width: 100%;
		height: 40px;
		padding: 0 40px 0 12px;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--fg);
		font-size: 14px;
		font-family: var(--font-mono);
		box-sizing: border-box;
	}
	.form input:focus {
		outline: none;
		border-color: var(--m-jade, #2b605c);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--m-jade, #2b605c) 30%, transparent);
	}
	.toggle {
		position: absolute;
		top: 50%;
		right: 8px;
		transform: translateY(-50%);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		background: transparent;
		color: var(--fg-muted);
		cursor: pointer;
		padding: 0;
		transition: color 150ms;
	}
	.toggle:hover {
		color: var(--fg);
	}
	.toggle:focus-visible {
		outline: 2px solid var(--m-jade, #2b605c);
		outline-offset: 1px;
	}
	.error {
		font-size: 13px;
		color: var(--destructive, #ff4000);
		margin: 4px 0 0 0;
	}
	.submit {
		margin-top: 8px;
		height: 40px;
		border: 1px solid var(--fg);
		background: var(--fg);
		color: var(--bg);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 150ms;
	}
	.submit:hover {
		opacity: 0.8;
	}
	.footer {
		font-size: 13px;
		margin: 8px 0 0 0;
	}
	.footer a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
