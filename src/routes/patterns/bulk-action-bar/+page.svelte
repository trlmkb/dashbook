<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Checkbox } from '@dashfi/svelte/ui/checkbox';
	import { toast } from 'svelte-sonner';
	import Loader from '@lucide/svelte/icons/loader';
	import X from '@lucide/svelte/icons/x';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Send from '@lucide/svelte/icons/send';

	type Row = { id: string; merchant: string; amount: number; hasAiSuggestion: boolean };

	const rows: Row[] = [
		{ id: 'tx_1', merchant: 'Stripe', amount: -2890.0, hasAiSuggestion: true },
		{ id: 'tx_2', merchant: 'AWS', amount: -12_408.55, hasAiSuggestion: true },
		{ id: 'tx_3', merchant: 'Meta Ads', amount: -8200.0, hasAiSuggestion: false },
		{ id: 'tx_4', merchant: 'Vercel', amount: -990.0, hasAiSuggestion: true }
	];

	let selected = $state(new Set<string>());
	let busy = $state(false);
	let progressLabel = $state('');

	const aiAcceptable = $derived(rows.filter((r) => selected.has(r.id) && r.hasAiSuggestion));

	function toggle(id: string): void {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		selected = next;
	}

	function toggleAll(): void {
		selected = selected.size === rows.length ? new Set() : new Set(rows.map((r) => r.id));
	}

	async function acceptAi(): Promise<void> {
		const targets = aiAcceptable;
		if (targets.length === 0) {
			toast.info('No selected rows have an AI suggestion to accept');
			return;
		}
		busy = true;
		for (let i = 0; i < targets.length; i++) {
			progressLabel = `Accepting ${i + 1}/${targets.length}`;
			await new Promise((r) => setTimeout(r, 200));
		}
		busy = false;
		progressLabel = '';
		toast.success(`Accepted AI category for ${targets.length} transaction${targets.length === 1 ? '' : 's'}`);
	}

	function fmt(n: number): string {
		return `−$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
	}

	const example = `<script lang="ts">
\timport { BulkActionBar, BulkActionButton } from '$lib/components/common/bulk-action-bar';
\timport { BulkRunner, reportBulkResult } from '$lib/components/expense-coding';
\timport { Sparkles, Send } from '@lucide/svelte';

\tconst runner = new BulkRunner();
\tlet acceptingAi = $state(false);

\tconst aiAcceptable = $derived(
\t\tselected.filter((e) => !!e.aiSuggestedSpendCategoryId && !e.spendCategoryId)
\t);

\tasync function handleAcceptAi() {
\t\tconst targets = aiAcceptable;
\t\tif (targets.length === 0) return toast.info('Nothing to accept');
\t\tacceptingAi = true;
\t\ttry {
\t\t\tconst results = await runner.run(targets, 'Accepting', (e) =>
\t\t\t\tupsert.mutateAsync({ transactionId: e.transactionId, spendCategoryId: e.aiSuggestedSpendCategoryId! })
\t\t\t);
\t\t\treportBulkResult(results, { past: 'Accepted AI category for', infinitive: 'accept AI category for' }, 0, 'expense');
\t\t} finally {
\t\t\tacceptingAi = false;
\t\t}
\t}
<\/script>

<BulkActionBar count={selected.length} busy={acceptingAi} progressLabel={runner.progressLabel} onClear={() => selection.clear()}>
\t<BulkActionButton icon={Sparkles} label="Accept AI suggestions" count={aiAcceptable.length} onclick={handleAcceptAi} />
\t<BulkActionButton icon={Send} label="Submit" count={submittable.length} onclick={handleSubmit} />
</BulkActionBar>`;
</script>

<svelte:head><title>Bulk action bar — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Bulk action bar"
	description="The sticky selection toolbar that appears once ≥1 row is checked. Count + clear on the left, an async BulkRunner-driven action group on the right, a busy/progress state that disables the group and reports a toast when the run finishes."
	uses={['Button', 'Checkbox', 'Loader', 'toast']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="360px">
			{#snippet children(_m)}
				<div class="frame">
					<div class="rows">
						<div class="row head">
							<Checkbox checked={selected.size === rows.length} onCheckedChange={toggleAll} />
							<span>Merchant</span>
							<span class="right">Amount</span>
						</div>
						{#each rows as r (r.id)}
							<div class="row">
								<Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggle(r.id)} />
								<span>{r.merchant}{r.hasAiSuggestion ? ' · AI suggestion' : ''}</span>
								<span class="right mono">{fmt(r.amount)}</span>
							</div>
						{/each}
					</div>

					{#if selected.size > 0}
						<div class="bar" role="region" aria-label="Bulk actions">
							<span class="count">{selected.size} selected</span>
							<Button variant="ghost" size="sm" onclick={() => (selected = new Set())} disabled={busy}>
								<X size={14} strokeWidth={1.5} />
								Clear
							</Button>
							<div class="divider"></div>
							<div class="actions">
								<Button size="sm" disabled={busy} onclick={acceptAi}>
									<Sparkles size={14} strokeWidth={1.5} />
									Accept AI suggestions ({aiAcceptable.length})
								</Button>
								<Button size="sm" variant="outline" disabled={busy}>
									<Send size={14} strokeWidth={1.5} />
									Submit
								</Button>
							</div>
							{#if busy}
								<div class="busy">
									<Loader size={14} strokeWidth={1.5} class="spin" />
									<span class="mono">{progressLabel}</span>
								</div>
							{/if}
						</div>
					{/if}
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
				Every selection surface in Dash.fi — expenses, card transactions, bill-pay — needs the
				same three things once rows are checked: how many, a way to back out, and a set of
				actions that might take a moment each. The bar formalizes that as one component instead
				of three ad-hoc re-implementations.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Count and clear are structural, not per-caller.</strong> The bar renders nothing
					when count is 0 — callers never write their own <code>{`{#if selected.length > 0}`}</code>
					guard.
				</li>
				<li>
					<strong>Each action button carries its own applicable count.</strong> "Accept AI
					suggestions (2)" is honest about how many of the N selected rows the action actually
					applies to — not every selected row necessarily qualifies.
				</li>
				<li>
					<strong>Busy state disables the whole action group</strong>, not just the button that
					was clicked, and shows a shared progress label ("Categorizing 3/4") so a second click
					can't start an overlapping run.
				</li>
				<li>
					<strong>Runs report a toast on completion</strong>, including a "skipped N ineligible"
					note when the applicable count is less than the full selection.
				</li>
			</ul>
			<h3>Source</h3>
			<p>
				Distilled from <code>lib/components/common/bulk-action-bar/</code> plus its
				expense-transactions consumer (<code>expense-bulk-action-bar.svelte</code>) and siblings
				in card-transactions and bill-pay.
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Export menu instead of a button</strong> — when an action has format options
					(CSV/PDF), render a small dropdown menu in the action slot rather than adding a second
					bar.
				</li>
				<li>
					<strong>Zero-eligible disabled state</strong> — if none of the selected rows qualify for
					an action, render the button disabled with count (0) rather than hiding it; hiding
					makes the bar jump width as selection changes.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.frame {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
		max-width: 720px;
	}
	.rows {
		border: 1px solid var(--border);
	}
	.row {
		display: grid;
		grid-template-columns: 24px 1fr auto;
		align-items: center;
		gap: 12px;
		padding: 10px 12px;
		font-size: 13px;
		border-top: 1px solid var(--border);
	}
	.row:first-child {
		border-top: 0;
	}
	.row.head {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-muted);
		background: var(--bg-muted);
	}
	.right {
		text-align: right;
	}
	.mono {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
		padding: 10px 14px;
		border: 1px solid var(--border);
		background: var(--bg-muted);
		animation: fade-in 150ms ease-out;
	}
	.count {
		font-size: 13px;
		font-weight: 500;
		font-variant-numeric: tabular-nums;
	}
	.divider {
		width: 1px;
		height: 20px;
		background: var(--border);
	}
	.actions {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.busy {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-left: auto;
		font-size: 12px;
		color: var(--fg-muted);
	}
	:global(.spin) {
		animation: spin 900ms linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
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
