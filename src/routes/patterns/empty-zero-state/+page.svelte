<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import {
		Empty,
		EmptyHeader,
		EmptyTitle,
		EmptyDescription,
		EmptyContent
	} from '@dashfi/svelte/ui/empty';
	import Plus from '@lucide/svelte/icons/plus';
	import CreditCard from '@lucide/svelte/icons/credit-card';

	const example = `<script lang="ts">
\timport { Button } from '@dashfi/svelte/ui/button';
\timport { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@dashfi/svelte/ui/empty';
\timport Plus from '@lucide/svelte/icons/plus';
\timport CreditCard from '@lucide/svelte/icons/credit-card';
<\/script>

<Empty>
\t<EmptyHeader>
\t\t<CreditCard size={28} strokeWidth={1.5} />
\t\t<EmptyTitle>No active cards yet</EmptyTitle>
\t\t<EmptyDescription>
\t\t\tIssue a virtual card to spin up project budgets, vendor payments,
\t\t\tor ad-platform spend in minutes.
\t\t</EmptyDescription>
\t</EmptyHeader>
\t<EmptyContent>
\t\t<Button variant="brand">
\t\t\t<Plus size={16} strokeWidth={1.5} />
\t\t\tIssue first card
\t\t</Button>
\t</EmptyContent>
</Empty>`;
</script>

<svelte:head><title>Empty state — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Empty state"
	description="What the surface looks like before there is data. Centered icon, one-line title, sentence of context, single primary CTA. Used on every list/table page in the empty case."
	uses={['Empty', 'Button']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="380px">
			{#snippet children(_m)}
				<div class="frame">
					<Empty>
						<EmptyHeader>
							<div class="icon"><CreditCard size={28} strokeWidth={1.5} /></div>
							<EmptyTitle>No active cards yet</EmptyTitle>
							<EmptyDescription>
								Issue a virtual card to spin up project budgets, vendor payments, or
								ad-platform spend in minutes.
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<Button variant="brand">
								<Plus size={16} strokeWidth={1.5} />
								Issue first card
							</Button>
						</EmptyContent>
					</Empty>
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
				A user's first encounter with a surface deserves more than "Nothing here." Empty states
				do three things at once: show what would have been here, tell the user why it's
				missing, and offer the single next step that gets data into the surface.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>One icon, one title, one description, one CTA</strong>. If you reach for a
					second button you've created a fork in the user's intent — push that decision
					earlier in the flow.
				</li>
				<li>
					<strong>The icon is monochrome and quiet</strong>. It's an orientation cue, not a
					mascot. Stroke 1.5px from Lucide, fg-muted.
				</li>
				<li>
					<strong>The description names the benefit, not the empty</strong>. Not "You have no
					cards" — "Issue a virtual card to spin up project budgets". The benefit is what
					earns the click.
				</li>
				<li>
					<strong>The CTA uses the brand (jade) variant</strong>. Empty states are the rare
					surface where the primary action is the only thing the user can do — and we lean
					into that with the strongest visual emphasis we have.
				</li>
			</ul>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Post-filter empty</strong>: when filters reduce a non-empty dataset to
					nothing, the CTA becomes "Clear filters" instead of a creation action.
				</li>
				<li>
					<strong>Read-only empty</strong> (e.g. another team owns the data): drop the CTA,
					keep the icon + title + description. End with a "Learn more" link to docs.
				</li>
				<li>
					<strong>Error vs empty</strong>: if the data failed to load (not just missing), reach
					for <code>AlertError</code> instead — the affordance is "retry", not "create".
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.frame {
		width: 100%;
		max-width: 520px;
	}
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border: 1px solid var(--border);
		color: var(--fg-muted);
		margin: 0 auto 8px;
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
