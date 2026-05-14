<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';

	const tree = [
		{ depth: 0, name: 'src/routes/', group: null, note: '' },
		{ depth: 1, name: '+layout.svelte', group: null, note: 'Root chrome (no guards)' },
		{ depth: 1, name: '+page.svelte', group: 'public', note: 'Marketing landing — public' },
		{ depth: 1, name: '(auth)/', group: 'auth', note: 'Unauthenticated-only group' },
		{ depth: 2, name: '+layout.server.ts', group: 'auth', note: 'Redirect logged-in → /dashboard' },
		{ depth: 2, name: 'login/+page.svelte', group: 'auth', note: '' },
		{ depth: 2, name: 'signup/+page.svelte', group: 'auth', note: '' },
		{ depth: 2, name: 'reset/+page.svelte', group: 'auth', note: '' },
		{ depth: 1, name: '(onboarding)/', group: 'onboarding', note: 'Session + incomplete application' },
		{ depth: 2, name: '+layout.server.ts', group: 'onboarding', note: 'Redirect completed → /dashboard, no-session → /login' },
		{ depth: 2, name: 'apply/+page.svelte', group: 'onboarding', note: '' },
		{ depth: 1, name: '(protected)/', group: 'protected', note: 'Session required' },
		{ depth: 2, name: '+layout.server.ts', group: 'protected', note: 'Redirect no-session → /login' },
		{ depth: 2, name: 'dashboard/+page.svelte', group: 'protected', note: '' },
		{ depth: 2, name: '(2fa)/', group: '2fa', note: 'Session + verified 2FA' },
		{ depth: 3, name: '+layout.server.ts', group: '2fa', note: 'Redirect unverified → /verify-2fa' },
		{ depth: 3, name: 'settings/+page.svelte', group: '2fa', note: '' },
		{ depth: 3, name: 'admin/+page.svelte', group: '2fa', note: '' }
	];

	const guardCode = `// src/routes/(protected)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
\tif (!locals.session) {
\t\tthrow redirect(303, \`/login?next=\${encodeURIComponent(url.pathname)}\`);
\t}
\treturn { user: locals.session.user };
};`;

	const twoFaGuardCode = `// src/routes/(protected)/(2fa)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
\t// Parent guard already verified \`locals.session\` exists.
\tif (!locals.session.mfaVerified) {
\t\tthrow redirect(303, \`/verify-2fa?next=\${encodeURIComponent(url.pathname)}\`);
\t}
\treturn {};
};`;
</script>

<svelte:head><title>Auth route-group contract — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Auth route-group contract"
	description="SvelteKit route groups encode auth state. The folder structure IS the contract for 'can this user be here?' — new routes inherit their guard by where they're placed."
	uses={['SvelteKit route groups', '+layout.server.ts']}
>
	{#snippet preview()}
		<div class="tree-wrap">
			<div class="tree-header">
				<span class="tree-label">Folder tree</span>
				<span class="tree-meta">4 groups · 4 guards · 1 nested group</span>
			</div>
			<div class="tree">
				{#each tree as row (row.name + row.depth)}
					<div class="row" data-group={row.group ?? 'none'} style:padding-left="{row.depth * 16}px">
						<span class="name">{row.name}</span>
						{#if row.group}
							<span class="chip" data-group={row.group}>{row.group}</span>
						{/if}
						{#if row.note}
							<span class="note">{row.note}</span>
						{/if}
					</div>
				{/each}
			</div>
			<div class="legend">
				<span class="legend-item"><span class="dot" data-group="auth"></span> unauthenticated-only</span>
				<span class="legend-item"><span class="dot" data-group="onboarding"></span> in-flight application</span>
				<span class="legend-item"><span class="dot" data-group="protected"></span> session required</span>
				<span class="legend-item"><span class="dot" data-group="2fa"></span> 2FA-verified only</span>
			</div>
		</div>
	{/snippet}

	{#snippet code()}
		<div class="code-pair">
			<h4>(protected)/+layout.server.ts</h4>
			<CodeSnippet code={guardCode} language="ts" />
			<h4>(protected)/(2fa)/+layout.server.ts</h4>
			<CodeSnippet code={twoFaGuardCode} language="ts" />
		</div>
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				SvelteKit route groups (parenthesised path segments — e.g. <code>(protected)</code>) are
				URL-invisible folders that share a layout. We use them to encode auth state: the folder a
				route lives in IS the answer to "what does the user need to access this?" Guards live in
				each group's <code>+layout.server.ts</code> and run before any child route's load — so
				placing a new file under <code>(protected)/</code> inherits the session check
				automatically.
			</p>
			<p>
				The benefit compounds: a new engineer asking "is this route protected?" doesn't read code
				— they read the folder name. There's no per-route guard to forget, no decorator to apply,
				no middleware list to keep in sync.
			</p>

			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Four groups, not three.</strong> Splitting <code>(protected)</code> from
					<code>(protected)/(2fa)</code> means high-sensitivity routes (settings, admin, anything
					that mutates auth) get an extra hurdle without duplicating the session check. The 2FA
					group sits INSIDE protected so the session guard runs first and the 2FA guard runs
					second — composition over duplication.
				</li>
				<li>
					<strong>Guards return data, not just protect.</strong> Each
					<code>+layout.server.ts</code> returns the values its descendants need (user, org,
					feature flags), so children never re-fetch them. Loads cascade.
				</li>
				<li>
					<strong>Redirects preserve <code>?next=</code>.</strong> Every redirect carries the
					originally-requested path so post-auth the user lands where they were going. Don't lose
					their intent because of a session expiry.
				</li>
				<li>
					<strong><code>(onboarding)</code> is its own group, not a subset of <code>(protected)</code>.</strong>
					Users mid-application have a session but aren't fully "in" — the protected nav would
					confuse them. Two groups, two guards, two layouts.
				</li>
			</ul>

			<h3>When to add a new group</h3>
			<ul>
				<li>
					You catch yourself writing the same guard at the top of more than two routes' loads.
				</li>
				<li>
					A subset of authenticated routes needs an extra check that doesn't apply to the rest
					(e.g. <em>requires-org-admin</em>, <em>requires-billing-set-up</em>,
					<em>requires-kyb-approved</em>).
				</li>
				<li>You want the URL to stay clean — a group is invisible in the URL.</li>
				<li>
					Don't reach for a group when the predicate is route-specific. A one-off check belongs
					in <code>+page.server.ts</code> for that route.
				</li>
			</ul>

			<h3>Source</h3>
			<p>
				Distilled from the <code>src/routes/</code> folder structure of dashfi-ui. Full inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern C1).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Role-based groups</strong> — e.g. <code>(protected)/(admin)/</code>,
					<code>(protected)/(billing-owner)/</code>. Same pattern, different predicate. The
					predicate becomes a permission check instead of an auth check.
				</li>
				<li>
					<strong>Org-tenant groups</strong> — for multi-tenant apps,
					<code>(protected)/[orgSlug]/</code> isn't a group but a param; the param's load guards
					that the user belongs to that org. Use a real param (not a group) when the segment
					appears in the URL.
				</li>
				<li>
					<strong>Feature-flag groups</strong> — <code>(protected)/(beta)/</code> with a guard that
					checks the user's flag set. Lets you ship beta routes to the codebase without exposing
					them to the wrong users.
				</li>
				<li>
					<strong>Public+private split inside one section</strong> — when most of a section is
					public but a few sub-routes need a session, prefer two parallel groups
					(<code>(public-help)/</code> and <code>(protected)/help/</code>) over conditional
					rendering. The folder name keeps the contract honest.
				</li>
			</ul>

			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't run guards in <code>+page.server.ts</code> when a group exists.</strong>
					The whole point of the group is that the check runs once per group, not per page.
				</li>
				<li>
					<strong>Don't use a group when the predicate depends on route data</strong> — e.g.
					"only the user who owns this card can view it." That's a per-route check, not a group
					predicate.
				</li>
				<li>
					<strong>Don't nest groups beyond two levels deep.</strong> If you need
					<code>(protected)/(2fa)/(admin)/(super-admin)/</code> you're modelling the wrong thing —
					collapse into a single check that composes the predicates.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.tree-wrap {
		max-width: 760px;
		border: 1px solid var(--border);
		background: var(--bg);
	}
	.tree-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 12px 16px;
		border-bottom: 1px solid var(--border);
		background: var(--bg-muted);
	}
	.tree-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg);
	}
	.tree-meta {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
	}
	.tree {
		padding: 12px 16px;
		font-family: var(--font-mono);
		font-size: 12px;
		line-height: 1.9;
	}
	.row {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}
	.name {
		color: var(--fg);
		flex-shrink: 0;
	}
	.row[data-group='auth'] .name {
		color: #b87333; /* warm orange — unauthenticated */
	}
	.row[data-group='onboarding'] .name {
		color: var(--m-cobalt, #354cef);
	}
	.row[data-group='protected'] .name {
		color: #2b605c; /* jade */
	}
	.row[data-group='2fa'] .name {
		color: #6b3380; /* deeper purple */
	}
	.row[data-group='public'] .name {
		color: var(--fg-muted);
	}
	.chip {
		font-size: 9px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 1px 6px;
		color: var(--fg-muted);
		border: 1px solid var(--border);
		flex-shrink: 0;
	}
	.chip[data-group='auth'] {
		color: #b87333;
		border-color: #b87333;
	}
	.chip[data-group='onboarding'] {
		color: var(--m-cobalt, #354cef);
		border-color: var(--m-cobalt, #354cef);
	}
	.chip[data-group='protected'] {
		color: #2b605c;
		border-color: #2b605c;
	}
	.chip[data-group='2fa'] {
		color: #6b3380;
		border-color: #6b3380;
	}
	.note {
		font-family: var(--font-sans, inherit);
		font-size: 12px;
		color: var(--fg-muted);
		font-style: italic;
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		padding: 10px 16px;
		border-top: 1px solid var(--border);
		font-size: 11px;
		color: var(--fg-muted);
		background: var(--bg-muted);
	}
	.legend-item {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.dot {
		width: 8px;
		height: 8px;
		flex-shrink: 0;
	}
	.dot[data-group='auth'] {
		background: #b87333;
	}
	.dot[data-group='onboarding'] {
		background: var(--m-cobalt, #354cef);
	}
	.dot[data-group='protected'] {
		background: #2b605c;
	}
	.dot[data-group='2fa'] {
		background: #6b3380;
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
