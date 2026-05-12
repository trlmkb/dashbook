<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import {
		AlertDialog,
		AlertDialogTrigger,
		AlertDialogContent,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogAction,
		AlertDialogCancel
	} from '@dashfi/svelte/ui/alert-dialog';

	const example = `<script lang="ts">
\timport { Button } from '@dashfi/svelte/ui/button';
\timport {
\t\tAlertDialog, AlertDialogTrigger, AlertDialogContent,
\t\tAlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
\t\tAlertDialogFooter, AlertDialogAction, AlertDialogCancel
\t} from '@dashfi/svelte/ui/alert-dialog';
<\/script>

<AlertDialog>
\t<AlertDialogTrigger>
\t\t{#snippet child({ props })}
\t\t\t<Button variant="destructive" {...props}>Close card</Button>
\t\t{/snippet}
\t</AlertDialogTrigger>
\t<AlertDialogContent>
\t\t<AlertDialogHeader>
\t\t\t<AlertDialogTitle>Close virtual card?</AlertDialogTitle>
\t\t\t<AlertDialogDescription>
\t\t\t\tAll active subscriptions on <strong>Engineering · 4429</strong> will fail at their next
\t\t\t\trenewal. You'll need to update the card on each vendor.
\t\t\t</AlertDialogDescription>
\t\t</AlertDialogHeader>
\t\t<AlertDialogFooter>
\t\t\t<AlertDialogCancel>Cancel</AlertDialogCancel>
\t\t\t<AlertDialogAction onclick={closeCard}>Close card</AlertDialogAction>
\t\t</AlertDialogFooter>
\t</AlertDialogContent>
</AlertDialog>`;
</script>

<svelte:head><title>Destructive confirmation — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Destructive confirmation"
	description="Two-step gate for irreversible actions — close card, revoke virtual, terminate user. AlertDialog with a single destructive primary; consequences spelled out in plain language."
	uses={['Button', 'AlertDialog']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="240px">
			{#snippet children(_m)}
				<div class="frame">
					<p class="caption">Click below to see the confirmation flow:</p>
					<AlertDialog>
						<AlertDialogTrigger>
							{#snippet child({ props }: { props: Record<string, unknown> })}
								<Button variant="destructive" {...props}>Close card</Button>
							{/snippet}
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Close virtual card?</AlertDialogTitle>
								<AlertDialogDescription>
									All active subscriptions on <strong>Engineering · 4429</strong> will fail at
									their next renewal. You'll need to update the card on each vendor.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Close card</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
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
				Destructive actions need friction proportional to their blast radius. AlertDialog
				forces a deliberate second click, blocks the rest of the UI while the prompt is open,
				and steals keyboard focus — so a careless Enter won't blow up a card.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>The trigger uses the destructive variant</strong> (orange). The cascade
					inside Alert/Badge picks the same orange, so the user's mental model stays consistent.
				</li>
				<li>
					<strong>The description spells out consequences in plain language</strong> — what
					breaks, who feels it, what they'll have to redo. Never just "Are you sure?".
				</li>
				<li>
					<strong>Cancel is the cancel; the action is on the right</strong>. Right is "forward,
					commit" in our reading order. Mirrors macOS and Linear.
				</li>
				<li>
					<strong>Use AlertDialog, not Dialog</strong>. AlertDialog is non-dismissible by
					backdrop click — appropriate friction for destructive.
				</li>
			</ul>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Type-the-name-to-confirm</strong> when the action affects multiple resources
					(e.g. closing all cards on an account). Add an <code>Input</code> requiring the user
					to type the resource name.
				</li>
				<li>
					<strong>Inline destructive in row</strong> for low-stakes destructive actions (delete
					draft, remove tag) — skip the AlertDialog, use a tooltip undo toast instead.
				</li>
				<li>
					<strong>Async action with loading button</strong>: pass <code>loading</code> to the
					AlertDialogAction Button and keep the dialog open until the request resolves.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.frame {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: center;
		justify-content: center;
	}
	.caption {
		font-size: 13px;
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
