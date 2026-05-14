<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter
	} from '@dashfi/svelte/ui/dialog';

	// Live demo state — single source of truth syncs with ?demo-detail in the URL.
	// We use a private query key (`demo-detail`) so this preview can't collide with
	// real dialog state on the host page.
	const QUERY_KEY = 'demo-detail';

	let open = $state(false);
	let urlPreview = $state('');

	function syncFromUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		open = params.get(QUERY_KEY) === 'open';
		urlPreview = window.location.pathname + window.location.search;
	}

	function writeUrl(next: boolean) {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		if (next) params.set(QUERY_KEY, 'open');
		else params.delete(QUERY_KEY);
		const qs = params.toString();
		const newUrl = window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash;
		window.history.replaceState({}, '', newUrl);
		urlPreview = window.location.pathname + window.location.search;
	}

	function handleOpenChange(next: boolean) {
		open = next;
		writeUrl(next);
	}

	onMount(() => {
		syncFromUrl();
		window.addEventListener('popstate', syncFromUrl);
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;
		window.removeEventListener('popstate', syncFromUrl);
		// Clean up our private query key on destroy so we don't leak it.
		const params = new URLSearchParams(window.location.search);
		if (params.has(QUERY_KEY)) {
			params.delete(QUERY_KEY);
			const qs = params.toString();
			const newUrl = window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash;
			window.history.replaceState({}, '', newUrl);
		}
	});

	const example = `<script lang="ts">
\timport { page } from '$app/state';
\timport { replaceState } from '$app/navigation';
\timport {
\t\tDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
\t} from '@dashfi/svelte/ui/dialog';
\timport { Button } from '@dashfi/svelte/ui/button';

\tconst QUERY_KEY = 'detail';

\t// Open state is derived from the URL — single source of truth.
\tlet open = $derived(page.url.searchParams.get(QUERY_KEY) === 'open');

\tfunction handleOpenChange(next: boolean) {
\t\tconst params = new URLSearchParams(page.url.searchParams);
\t\tif (next) params.set(QUERY_KEY, 'open');
\t\telse params.delete(QUERY_KEY);
\t\tconst qs = params.toString();
\t\treplaceState(\`\${page.url.pathname}\${qs ? \`?\${qs}\` : ''}\`, {});
\t}
<\/script>

<Button onclick={() => handleOpenChange(true)}>Open detail</Button>

<Dialog {open} onOpenChange={handleOpenChange}>
\t<DialogContent>
\t\t<DialogHeader>
\t\t\t<DialogTitle>Transaction detail</DialogTitle>
\t\t\t<DialogDescription>
\t\t\t\tShareable, back-button-correct, refresh-survivable.
\t\t\t</DialogDescription>
\t\t</DialogHeader>
\t</DialogContent>
</Dialog>`;
</script>

<svelte:head><title>URL-as-state deep-linkable dialog — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="URL-as-state deep-linkable dialog"
	description="Dialogs whose open/closed state lives in the URL via replaceState. Shareable, back-button-correct, refresh-survivable. Used for transaction detail, card detail, edit drawers."
	uses={['Dialog', 'Sheet', 'replaceState', '$page.url']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="320px">
			{#snippet children(_m)}
				<div class="demo">
					<p class="demo-lead">
						Open the dialog. Notice the URL gains <code>?demo-detail=open</code>. Refresh — it
						reopens. Hit back — it closes. Right-click → copy link — share that URL with anyone,
						the dialog opens for them too.
					</p>
					<div class="demo-row">
						<Button onclick={() => handleOpenChange(true)}>Open detail</Button>
						<div class="url-display" aria-live="polite">
							<span class="url-label">URL</span>
							<code class="url-value">{urlPreview || '(loading)'}</code>
						</div>
					</div>
					<Dialog {open} onOpenChange={handleOpenChange}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Transaction detail</DialogTitle>
								<DialogDescription>
									This dialog's open state lives in the URL. Try refreshing while it's open,
									or hitting the browser back button — the URL is the source of truth, the
									component just reads it.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button variant="outline" onclick={() => handleOpenChange(false)}>Close</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
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
				A dialog is a UI state. Local component state would have worked — but local state isn't
				shareable, doesn't survive refresh, and the browser back button can't see it. Moving the
				state into a URL search param gives you three properties for free that local state can't:
			</p>
			<ul>
				<li>
					<strong>Shareable.</strong> Right-click → copy link. Anyone you paste that URL to lands
					with the dialog open on the same row. Support tickets reference exact dialog states.
				</li>
				<li>
					<strong>Back-button-correct.</strong> Users expect <kbd>Esc</kbd> and the browser back
					button to close transient overlays. Reading from the URL means the back button is the
					close affordance — for free.
				</li>
				<li>
					<strong>Refresh-survivable.</strong> The browser's "lost my place" failure mode goes
					away. Hot-reload doesn't unmount the dialog state during development. Refreshing for
					stale data doesn't kick you out of context.
				</li>
			</ul>

			<h3>Decisions</h3>
			<ul>
				<li>
					<strong><code>replaceState</code>, not <code>pushState</code>.</strong> Opening and
					closing a dialog isn't navigation — it's the same page in a different state. Using
					push would pollute the back stack with a history entry per dialog open. Replace keeps
					the back button pointing at the previous page.
				</li>
				<li>
					<strong>Derive open state from the URL, don't store it twice.</strong> Open is a
					<code>$derived</code> of the search param, not a separate
					<code>$state</code>. One source of truth — the URL — and the dialog re-renders when the
					URL changes (refresh, back/forward, programmatic nav).
				</li>
				<li>
					<strong>Key the param descriptively.</strong> Use <code>?detail=open</code> or
					<code>?detail=txn_8a3c</code>, not <code>?d=1</code>. Search params show up in shared
					URLs, server logs, and support tickets — they should read like English.
				</li>
				<li>
					<strong>Encode the entity ID in the value, not a second param.</strong> Prefer
					<code>?detail=txn_8a3c</code> over <code>?detail=open&amp;id=txn_8a3c</code>. Two
					correlated params drift; one composite param can't.
				</li>
				<li>
					<strong>Bidirectional binding via <code>onOpenChange</code>.</strong> The dialog calls
					<code>onOpenChange(false)</code> on <kbd>Esc</kbd>, overlay click, and close button —
					all three end up writing the URL. No special-case wiring.
				</li>
			</ul>

			<h3>Source</h3>
			<p>
				Distilled from the deep-linkable dialog wiring across dashfi-ui. Full inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern C3).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Entity-ID dialogs</strong> — <code>?detail=txn_8a3c</code> opens the dialog
					AND loads the transaction with id <code>txn_8a3c</code>. The single param drives both
					"open?" and "for what?" — copy link includes everything the recipient needs.
				</li>
				<li>
					<strong>Sheet (mobile) variant</strong> — same pattern with <code>Sheet</code> instead
					of <code>Dialog</code>. The URL contract is identical; the component swaps based on
					viewport. <code>?detail=open</code> opens a side sheet on desktop and a bottom sheet on
					mobile — one query key, one mental model.
				</li>
				<li>
					<strong>Coordinated multi-dialog</strong> — when a page has several dialog-able rows
					but only one should be open at a time, use a single param whose value is the row id
					(<code>?detail=row_42</code>). Opening row 43 sets the param to <code>row_43</code>,
					closing row 42 implicitly. Mutex by URL.
				</li>
				<li>
					<strong>Hash fragment instead of search param</strong> — <code>#detail</code> works
					too. Use it when the dialog state is purely client-side and you don't want the URL to
					look like a "real" parameter (e.g. analytics tooling that treats search params as
					meaningful).
				</li>
			</ul>

			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't use this for transient confirmation dialogs.</strong> A "Delete this?"
					confirmation has a 2-second lifespan — putting it in the URL pollutes the share story
					and survives refresh in a way the user didn't intend. AlertDialog stays local.
				</li>
				<li>
					<strong>Don't use this for forms with unsaved state.</strong> URL-state survives
					refresh, but unsaved form fields don't. The user would land in a dialog with empty
					inputs and feel cheated. Either persist the form draft separately, or keep the dialog
					out of the URL.
				</li>
				<li>
					<strong>Don't <code>pushState</code> per keystroke</strong> if you're encoding a typed
					value. Debounce or only sync to URL on close — otherwise the back button steps through
					every character the user typed.
				</li>
				<li>
					<strong>Don't put sensitive data in the param value.</strong> Search params end up in
					browser history, server logs, and referrer headers. Use entity IDs, not PII.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.demo {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
		max-width: 560px;
	}
	.demo-lead {
		font-size: 13px;
		line-height: 1.6;
		color: var(--fg-muted);
		margin: 0;
	}
	.demo-lead code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--bg-muted);
		padding: 1px 6px;
		color: var(--fg);
	}
	.demo-row {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}
	.url-display {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		border: 1px solid var(--border);
		background: var(--bg);
		flex: 1;
		min-width: 0;
	}
	.url-label {
		font-family: var(--font-mono);
		font-size: 9px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		flex-shrink: 0;
	}
	.url-value {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg);
		background: transparent;
		padding: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
		min-width: 0;
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
	.rationale kbd {
		font-family: var(--font-mono);
		font-size: 0.9em;
		border: 1px solid var(--border);
		background: var(--bg-muted);
		padding: 1px 6px;
		border-radius: 2px;
	}
</style>
