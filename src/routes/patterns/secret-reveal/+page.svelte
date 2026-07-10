<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Input } from '@dashfi/svelte/ui/input';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';
	import KeyRound from '@lucide/svelte/icons/key-round';

	let open = $state(true);
	let copied = $state(false);
	const apiKey = 'dash_key_live_EXAMPLE1H8x2K9mQwP3nR7tYbVcXzA1B2C3D4E5F6';

	async function copy(): Promise<void> {
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	const example = `<script lang="ts">
\timport { Button } from '@dashfi/svelte/ui/button';
\timport * as Dialog from '@dashfi/svelte/ui/dialog';
\timport SecretField from './secret-field.svelte';

\tlet { open = \$bindable(), apiKey }: { open: boolean; apiKey: string | null } = \$props();
<\/script>

<Dialog.Root bind:open>
\t<Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()}>
\t\t<Dialog.Header>
\t\t\t<Dialog.Title>API key</Dialog.Title>
\t\t\t<Dialog.Description>
\t\t\t\tCopy this key now — it won't be shown again. Send it as a Bearer token
\t\t\t\tin the Authorization header.
\t\t\t</Dialog.Description>
\t\t</Dialog.Header>
\t\t{#if apiKey}
\t\t\t<SecretField id="api-key-reveal" label="Key" value={apiKey} />
\t\t{/if}
\t\t<Dialog.Footer>
\t\t\t<Button onclick={() => (open = false)}>Done</Button>
\t\t</Dialog.Footer>
\t</Dialog.Content>
</Dialog.Root>`;
</script>

<svelte:head><title>Secret reveal — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Secret reveal"
	description="Reveal-once semantics for API keys and webhook secrets — a Dialog that opens already showing the value, with an explicit 'won't be shown again' warning and a copy-to-clipboard field. There is no re-open; the value must be regenerated to be seen twice."
	uses={['Dialog', 'Button']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="320px">
			{#snippet children(_m)}
				{#if open}
					<div class="dialog">
						<header class="head">
							<span class="icon"><KeyRound size={16} strokeWidth={1.5} /></span>
							<div>
								<div class="title">API key</div>
								<p class="desc">
									Copy this key now — it won't be shown again. Send it as a Bearer token in the
									<code>Authorization</code> header.
								</p>
							</div>
						</header>
						<div class="body">
							<label class="field-label" for="key-preview">Key</label>
							<div class="secret-field">
								<Input id="key-preview" readonly value={apiKey} class="mono" />
								<button type="button" class="copy-btn" onclick={copy} aria-label="Copy">
									{#if copied}
										<Check size={14} strokeWidth={1.5} />
									{:else}
										<Copy size={14} strokeWidth={1.5} />
									{/if}
								</button>
							</div>
						</div>
						<footer class="foot">
							<Button onclick={() => (open = false)}>Done</Button>
						</footer>
					</div>
				{:else}
					<div class="closed">
						<p>Dialog closed — the key cannot be shown again.</p>
						<Button variant="outline" onclick={() => (open = true)}>Reopen (demo only)</Button>
					</div>
				{/if}
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
				API keys and webhook secrets are only ever returned in full by the server at
				creation/regeneration time — every later fetch returns a masked value. The dialog exists
				to make that constraint legible: it opens already showing the value (no separate "Reveal"
				click to fumble), states plainly that it won't come back, and gets out of the way once
				the user has copied it.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong><code>onOpenAutoFocus</code> is prevented</strong> so focus doesn't land inside
					the secret field and trigger an accidental text selection or overlay conflict on open.
				</li>
				<li>
					<strong>The field is read-only, not disabled</strong> — read-only still allows text
					selection and copy; disabled would visually gray it out and block both.
				</li>
				<li>
					<strong>Copy-confirm is a icon morph, not a toast alone</strong> — the copy button
					itself swaps to a check for ~1.5s, so the confirmation is spatially tied to the action.
				</li>
				<li>
					<strong>No "regenerate" button inside this dialog.</strong> Regeneration is a
					separate, explicitly destructive action (it invalidates the old key) that lives on the
					settings page, not bundled into the reveal moment.
				</li>
			</ul>
			<h3>Source</h3>
			<p>
				Distilled from <code>settings/developer/api-key-reveal-dialog.svelte</code> and
				<code>webhook-secret-reveal-dialog.svelte</code>, both composing a shared
				<code>secret-field.svelte</code>.
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Webhook signing secret</strong> — same shell, different copy: "Store this
					signing secret securely — used to verify webhook payloads," with a link to the
					verification docs instead of an Authorization-header note.
				</li>
				<li>
					<strong>Masked-with-toggle variant</strong> — for values a user might need to view more
					than once in the same session (rare), a masked input with a show/hide eye icon is
					acceptable, but only when the server itself is willing to return the plaintext value
					again — never a client-side cache of a reveal-once secret.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.dialog {
		width: 100%;
		max-width: 420px;
		border: 1px solid var(--border);
		background: var(--bg);
	}
	.head {
		display: flex;
		gap: 12px;
		padding: 16px 18px;
		border-bottom: 1px solid var(--border);
	}
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: 1px solid var(--border);
		color: var(--fg-muted);
		flex-shrink: 0;
	}
	.title {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 4px;
	}
	.desc {
		margin: 0;
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg-muted);
	}
	.desc code {
		font-family: var(--font-mono);
		background: var(--bg-muted);
		padding: 1px 4px;
	}
	.body {
		padding: 16px 18px;
	}
	.field-label {
		display: block;
		font-size: 12px;
		font-weight: 500;
		margin-bottom: 6px;
	}
	.secret-field {
		position: relative;
	}
	:global(.secret-field .mono) {
		font-family: var(--font-mono);
		font-size: 12px;
		padding-right: 36px;
	}
	.copy-btn {
		position: absolute;
		right: 4px;
		top: 50%;
		transform: translateY(-50%);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		border: 0;
		background: transparent;
		color: var(--fg-muted);
		cursor: pointer;
	}
	.copy-btn:hover {
		color: var(--fg);
	}
	.foot {
		display: flex;
		justify-content: flex-end;
		padding: 12px 18px;
		border-top: 1px solid var(--border);
	}
	.closed {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: flex-start;
		font-size: 13px;
		color: var(--fg-muted);
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
