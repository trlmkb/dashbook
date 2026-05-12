<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Label } from '@dashfi/svelte/ui/label';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Switch } from '@dashfi/svelte/ui/switch';
	import { Separator } from '@dashfi/svelte/ui/separator';
	import { Button } from '@dashfi/svelte/ui/button';

	let companyName = $state('Dash Inc.');
	let weeklyDigest = $state(true);
	let realtimeAlerts = $state(false);

	const example = `<script lang="ts">
\timport { Label } from '@dashfi/svelte/ui/label';
\timport { Input } from '@dashfi/svelte/ui/input';
\timport { Switch } from '@dashfi/svelte/ui/switch';
\timport { Separator } from '@dashfi/svelte/ui/separator';
\timport { Button } from '@dashfi/svelte/ui/button';
<\/script>

<section class="settings-section">
\t<header>
\t\t<h2>Notifications</h2>
\t\t<p>Choose what you'd like Dash to email you about.</p>
\t</header>

\t<div class="row">
\t\t<div>
\t\t\t<Label for="company">Company name</Label>
\t\t\t<p class="help">Used on statements and partner-issued cards.</p>
\t\t</div>
\t\t<Input id="company" bind:value={companyName} />
\t</div>

\t<Separator />

\t<div class="row">
\t\t<div>
\t\t\t<Label>Weekly digest</Label>
\t\t\t<p class="help">A Monday-morning summary of last week's spend.</p>
\t\t</div>
\t\t<Switch bind:checked={weeklyDigest} />
\t</div>

\t<footer>
\t\t<Button variant="brand">Save changes</Button>
\t</footer>
</section>`;
</script>

<svelte:head><title>Settings section — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Settings section"
	description="A grouped block of form controls inside a long settings page. Section header → row of (label + description + control) → separator → next row. Save bar at the end."
	uses={['Label', 'Input', 'Switch', 'Separator', 'Button']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="540px">
			{#snippet children(_m)}
				<section class="settings">
					<header class="head">
						<h2>Notifications</h2>
						<p>Choose what you'd like Dash to email you about.</p>
					</header>

					<div class="row">
						<div class="row-label">
							<Label for="company">Company name</Label>
							<p class="help">Used on statements and partner-issued cards.</p>
						</div>
						<div class="row-control"><Input id="company" bind:value={companyName} /></div>
					</div>

					<Separator />

					<div class="row">
						<div class="row-label">
							<Label>Weekly digest</Label>
							<p class="help">A Monday-morning summary of last week's spend.</p>
						</div>
						<div class="row-control switch-wrap">
							<Switch bind:checked={weeklyDigest} />
						</div>
					</div>

					<Separator />

					<div class="row">
						<div class="row-label">
							<Label>Real-time alerts</Label>
							<p class="help">
								A push notification for transactions over $5,000, declined cards, and policy
								violations.
							</p>
						</div>
						<div class="row-control switch-wrap">
							<Switch bind:checked={realtimeAlerts} />
						</div>
					</div>

					<footer class="foot">
						<Button variant="brand">Save changes</Button>
					</footer>
				</section>
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
				Settings screens drift into chaos when every row has its own layout. This pattern
				enforces a single rhythm: label on the left, control on the right, description hugging
				the label. Switches and inputs both fit; the visual scan stays vertical.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Label-left, control-right</strong>. Scanning a settings page is a vertical
					read of labels first; controls follow.
				</li>
				<li>
					<strong>Help text is in <code>.help</code>, not a tooltip</strong>. Discoverable on
					first read; no hover required.
				</li>
				<li>
					<strong>Separator between rows, not row borders</strong>. Separators are quieter and
					let the form breathe.
				</li>
				<li>
					<strong>One save bar per section</strong>, not per row. Reduces button density;
					commits a whole intent at once.
				</li>
			</ul>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Sticky save bar</strong> when the section is taller than the viewport — pin
					to the bottom only after dirty state.
				</li>
				<li>
					<strong>Dirty indicator</strong>: a small pill in the section header when the form
					has unsaved changes.
				</li>
				<li>
					<strong>Destructive zone</strong> at the very bottom (delete account, reset API key).
					Visually separated by a 64px gap and a dimmed border.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.settings {
		width: 100%;
		max-width: 640px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.head h2 {
		font-size: 18px;
		font-weight: 500;
		margin: 0 0 4px;
		color: var(--fg);
	}
	.head p {
		font-size: 13px;
		color: var(--fg-muted);
		margin: 0;
	}
	.row {
		display: grid;
		grid-template-columns: 1fr 220px;
		gap: 24px;
		align-items: start;
	}
	.row-label {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-top: 6px;
	}
	.help {
		font-size: 12px;
		color: var(--fg-muted);
		margin: 0;
		line-height: 1.5;
	}
	.row-control {
		display: flex;
		justify-content: flex-end;
	}
	.switch-wrap {
		padding-top: 4px;
	}
	.foot {
		display: flex;
		justify-content: flex-end;
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
</style>
