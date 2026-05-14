<script lang="ts">
	import { onMount } from 'svelte';
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Label } from '@dashfi/svelte/ui/label';
	import { Input } from '@dashfi/svelte/ui/input';
	import { Switch } from '@dashfi/svelte/ui/switch';
	import { Separator } from '@dashfi/svelte/ui/separator';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Pill } from '@dashfi/svelte/ui/pill';

	type SectionId = 'profile' | 'contact' | 'security' | 'notifications' | 'integrations';

	const sections: { id: SectionId; label: string }[] = [
		{ id: 'profile', label: 'Profile' },
		{ id: 'contact', label: 'Contact' },
		{ id: 'security', label: 'Security' },
		{ id: 'notifications', label: 'Notifications' },
		{ id: 'integrations', label: 'Integrations' }
	];

	// Active anchor — tracked by both click and scroll position.
	let activeAnchor = $state<SectionId>('profile');

	// Scroll container + section refs.
	let scrollEl: HTMLDivElement | undefined = $state();
	const sectionEls: Partial<Record<SectionId, HTMLElement>> = $state({});

	// Form state — mocked, per-section.
	let businessName = $state('Dash Inc.');
	let displayName = $state('Dash');
	let primaryEmail = $state('ops@dash.fi');
	let phone = $state('+1 (415) 555-0142');
	let address = $state('548 Market St, San Francisco, CA');
	let require2fa = $state(true);
	let sso = $state(false);
	let sessionTimeout = $state('30');
	let emailDigests = $state(true);
	let smsHighValue = $state(false);
	let slack = $state(true);

	const integrations: { name: string; connected: boolean }[] = [
		{ name: 'QuickBooks', connected: true },
		{ name: 'Slack', connected: true },
		{ name: 'Xero', connected: false }
	];

	function scrollTo(id: SectionId) {
		const el = sectionEls[id];
		if (!el || !scrollEl) return;
		// Scroll the inner section into view within the constrained right column.
		const top = el.offsetTop - 8;
		scrollEl.scrollTo({ top, behavior: 'smooth' });
		activeAnchor = id;
	}

	onMount(() => {
		if (!scrollEl) return;

		// IntersectionObserver against the right-column scroll container keeps the
		// active anchor honest as the user scrolls directly (wheel, trackpad, kbd).
		const io = new IntersectionObserver(
			(entries) => {
				// Pick the section closest to the top of the viewport that is intersecting.
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible.length > 0) {
					const id = (visible[0].target as HTMLElement).id as SectionId;
					if (id) activeAnchor = id;
				}
			},
			{
				root: scrollEl,
				// Trigger when a section's top reaches roughly the top quarter of the viewport.
				rootMargin: '0px 0px -70% 0px',
				threshold: 0
			}
		);

		for (const s of sections) {
			const el = sectionEls[s.id];
			if (el) io.observe(el);
		}
		return () => io.disconnect();
	});

	const example = `<script lang="ts">
\timport { onMount } from 'svelte';
\timport { Label } from '@dashfi/svelte/ui/label';
\timport { Input } from '@dashfi/svelte/ui/input';
\timport { Switch } from '@dashfi/svelte/ui/switch';
\timport { Separator } from '@dashfi/svelte/ui/separator';
\timport { Button } from '@dashfi/svelte/ui/button';

\ttype SectionId = 'profile' | 'contact' | 'security' | 'notifications' | 'integrations';

\tconst sections: { id: SectionId; label: string }[] = [
\t\t{ id: 'profile', label: 'Profile' },
\t\t{ id: 'contact', label: 'Contact' },
\t\t{ id: 'security', label: 'Security' },
\t\t{ id: 'notifications', label: 'Notifications' },
\t\t{ id: 'integrations', label: 'Integrations' }
\t];

\tlet activeAnchor = $state<SectionId>('profile');
\tlet scrollEl: HTMLDivElement | undefined = $state();
\tconst sectionEls: Partial<Record<SectionId, HTMLElement>> = $state({});

\tfunction scrollTo(id: SectionId) {
\t\tconst el = sectionEls[id];
\t\tif (!el || !scrollEl) return;
\t\tscrollEl.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' });
\t\tactiveAnchor = id;
\t}

\tonMount(() => {
\t\tif (!scrollEl) return;
\t\tconst io = new IntersectionObserver(
\t\t\t(entries) => {
\t\t\t\tconst visible = entries
\t\t\t\t\t.filter((e) => e.isIntersecting)
\t\t\t\t\t.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
\t\t\t\tif (visible.length > 0) {
\t\t\t\t\tconst id = (visible[0].target as HTMLElement).id as SectionId;
\t\t\t\t\tif (id) activeAnchor = id;
\t\t\t\t}
\t\t\t},
\t\t\t{ root: scrollEl, rootMargin: '0px 0px -70% 0px', threshold: 0 }
\t\t);
\t\tfor (const s of sections) {
\t\t\tconst el = sectionEls[s.id];
\t\t\tif (el) io.observe(el);
\t\t}
\t\treturn () => io.disconnect();
\t});
<\/script>

<div class="page">
\t<nav class="anchor-nav" aria-label="Settings sections">
\t\t{#each sections as s (s.id)}
\t\t\t<button
\t\t\t\tclass="anchor"
\t\t\t\tclass:active={activeAnchor === s.id}
\t\t\t\tonclick={() => scrollTo(s.id)}
\t\t\t>{s.label}</button>
\t\t{/each}
\t</nav>

\t<div class="scroll" bind:this={scrollEl}>
\t\t{#each sections as s (s.id)}
\t\t\t<section id={s.id} bind:this={sectionEls[s.id]} class="settings">
\t\t\t\t<!-- header, rows, save button -->
\t\t\t</section>
\t\t\t<Separator />
\t\t{/each}
\t</div>
</div>`;
</script>

<svelte:head><title>Multi-section settings page — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Multi-section settings page"
	description="Page-level: stacked Settings-section blocks with anchor side nav. Used for business profile, account, security, notifications."
	uses={['Sidebar', 'Card', 'Label', 'Input', 'Switch', 'Separator', 'Button']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="640px">
			{#snippet children(_m)}
				<div class="page">
					<nav class="anchor-nav" aria-label="Settings sections">
						{#each sections as s (s.id)}
							<button
								type="button"
								class="anchor"
								class:active={activeAnchor === s.id}
								onclick={() => scrollTo(s.id)}
							>{s.label}</button>
						{/each}
					</nav>

					<div class="scroll" bind:this={scrollEl}>
						<!-- Profile -->
						<section
							id="profile"
							bind:this={sectionEls.profile}
							class="settings"
						>
							<header class="head">
								<p class="eyebrow">Profile</p>
								<h2>Business profile</h2>
								<p class="lede">How Dash and your partners see your business.</p>
							</header>

							<div class="row">
								<div class="row-label">
									<Label for="biz-name">Business name</Label>
									<p class="help">The legal name on your statements and partner-issued cards.</p>
								</div>
								<div class="row-control"><Input id="biz-name" bind:value={businessName} /></div>
							</div>

							<Separator />

							<div class="row">
								<div class="row-label">
									<Label for="disp-name">Display name</Label>
									<p class="help">Shown to teammates inside the app. Can be a short form.</p>
								</div>
								<div class="row-control"><Input id="disp-name" bind:value={displayName} /></div>
							</div>

							<Separator />

							<div class="row">
								<div class="row-label">
									<Label>Logo</Label>
									<p class="help">PNG or SVG, square, at least 256px.</p>
								</div>
								<div class="row-control">
									<Button variant="outline">Upload logo</Button>
								</div>
							</div>

							<footer class="foot">
								<Button variant="outline">Save</Button>
							</footer>
						</section>

						<Separator />

						<!-- Contact -->
						<section
							id="contact"
							bind:this={sectionEls.contact}
							class="settings"
						>
							<header class="head">
								<p class="eyebrow">Contact</p>
								<h2>Contact details</h2>
								<p class="lede">Where Dash reaches you for statements, alerts, and support.</p>
							</header>

							<div class="row">
								<div class="row-label">
									<Label for="primary-email">Primary email</Label>
									<p class="help">Statements, receipts, and security alerts go here.</p>
								</div>
								<div class="row-control"><Input id="primary-email" bind:value={primaryEmail} /></div>
							</div>

							<Separator />

							<div class="row">
								<div class="row-label">
									<Label for="phone">Phone</Label>
									<p class="help">For SMS alerts and account recovery.</p>
								</div>
								<div class="row-control"><Input id="phone" bind:value={phone} /></div>
							</div>

							<Separator />

							<div class="row">
								<div class="row-label">
									<Label for="address">Business address</Label>
									<p class="help">Must match the address on your business documents.</p>
								</div>
								<div class="row-control"><Input id="address" bind:value={address} /></div>
							</div>

							<footer class="foot">
								<Button variant="outline">Save</Button>
							</footer>
						</section>

						<Separator />

						<!-- Security -->
						<section
							id="security"
							bind:this={sectionEls.security}
							class="settings"
						>
							<header class="head">
								<p class="eyebrow">Security</p>
								<h2>Security and access</h2>
								<p class="lede">Controls that protect your workspace and members.</p>
							</header>

							<div class="row">
								<div class="row-label">
									<Label>Require 2FA for all members</Label>
									<p class="help">Members without 2FA enabled can't sign in until they enrol.</p>
								</div>
								<div class="row-control switch-wrap">
									<Switch bind:checked={require2fa} />
								</div>
							</div>

							<Separator />

							<div class="row">
								<div class="row-label">
									<Label>Single sign-on</Label>
									<p class="help">Route sign-in through your identity provider.</p>
								</div>
								<div class="row-control switch-wrap">
									<Switch bind:checked={sso} />
								</div>
							</div>

							<Separator />

							<div class="row">
								<div class="row-label">
									<Label for="session-timeout">Session timeout</Label>
									<p class="help">Minutes of inactivity before members are signed out.</p>
								</div>
								<div class="row-control"><Input id="session-timeout" bind:value={sessionTimeout} /></div>
							</div>

							<footer class="foot">
								<Button variant="outline">Save</Button>
							</footer>
						</section>

						<Separator />

						<!-- Notifications -->
						<section
							id="notifications"
							bind:this={sectionEls.notifications}
							class="settings"
						>
							<header class="head">
								<p class="eyebrow">Notifications</p>
								<h2>Notifications</h2>
								<p class="lede">When Dash should reach you, and how.</p>
							</header>

							<div class="row">
								<div class="row-label">
									<Label>Email digests</Label>
									<p class="help">Monday-morning summary of last week's spend.</p>
								</div>
								<div class="row-control switch-wrap">
									<Switch bind:checked={emailDigests} />
								</div>
							</div>

							<Separator />

							<div class="row">
								<div class="row-label">
									<Label>SMS for high-value transactions</Label>
									<p class="help">A text for any single transaction over $5,000.</p>
								</div>
								<div class="row-control switch-wrap">
									<Switch bind:checked={smsHighValue} />
								</div>
							</div>

							<Separator />

							<div class="row">
								<div class="row-label">
									<Label>Slack integration</Label>
									<p class="help">Post alerts into your finance Slack channel.</p>
								</div>
								<div class="row-control switch-wrap">
									<Switch bind:checked={slack} />
								</div>
							</div>

							<footer class="foot">
								<Button variant="outline">Save</Button>
							</footer>
						</section>

						<Separator />

						<!-- Integrations -->
						<section
							id="integrations"
							bind:this={sectionEls.integrations}
							class="settings"
						>
							<header class="head">
								<p class="eyebrow">Integrations</p>
								<h2>Integrations</h2>
								<p class="lede">Where Dash sends transactions and what it pulls back.</p>
							</header>

							<ul class="integration-list">
								{#each integrations as i (i.name)}
									<li class="integration-row">
										<div class="integration-info">
											<div class="integration-logo" aria-hidden="true">
												{i.name.charAt(0)}
											</div>
											<div class="integration-text">
												<p class="integration-name">{i.name}</p>
												<p class="help">
													{i.connected ? 'Syncing transactions and vendors.' : 'Not connected yet.'}
												</p>
											</div>
										</div>
										<div class="integration-action">
											{#if i.connected}
												<Pill type="base">Connected</Pill>
											{:else}
												<Button variant="outline">Connect</Button>
											{/if}
										</div>
									</li>
								{/each}
							</ul>

							<footer class="foot">
								<Button variant="outline">Save</Button>
							</footer>
						</section>
					</div>
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
				Long settings pages stack many <code>Settings section</code> blocks — the
				component-recipe pattern — and add a sidebar of in-page anchors so users can jump to a
				section without losing scroll context. Used for business profile, account, security,
				and notifications. Distinct from <code>Sub-section header with tabs</code>: tabs route
				between sub-pages; this is one page with internal navigation.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>In-page anchors, not routes.</strong> All sections live on one route so
					unsaved changes in section A aren't lost when the user clicks section B. Routes
					would force a save-or-discard dialog on every nav.
				</li>
				<li>
					<strong>Save buttons are per-section, not page-global.</strong> A single page-global
					save conflates intent — the user might want to save Profile but discard pending
					Security tweaks. Per-section save preserves intent.
				</li>
				<li>
					<strong>Active anchor tracks scroll position</strong>, via
					<code>IntersectionObserver</code>. Don't track on click only — users also scroll
					directly, and the indicator should stay honest.
				</li>
				<li>
					<strong>Nav is sticky on the left</strong>, not fixed full-height. Sticky behaviour
					ties it to the content scroll context so the nav doesn't float off into empty space
					when the user reaches the bottom of the page.
				</li>
				<li>
					<strong>Each section is also linkable via hash</strong> —
					<code>#profile</code>, <code>#security</code> — so support can deep-link to "open
					settings, scroll to Notifications."
				</li>
				<li>
					<strong>Cap sections at about seven.</strong> Beyond that, split into multiple route
					children using <code>Sub-section header with tabs</code>. Long anchor nav lists
					become hard to scan.
				</li>
			</ul>
			<h3>When to use vs alternatives</h3>
			<ul>
				<li>Settings page with 3–7 sections — this pattern.</li>
				<li>
					Settings page with 1–2 sections — just stack <code>Settings section</code> recipes
					without the side nav.
				</li>
				<li>
					Settings page with 8 or more sections — split into sub-routes via
					<code>Sub-section header with tabs</code>.
				</li>
				<li>
					Settings page where sections are semantically separate (account vs workspace) —
					split into routes; don't paper over the separation with anchors.
				</li>
			</ul>
			<h3>Source</h3>
			<p>
				<code>(protected)/settings/business/+page.svelte</code> in dashfi-ui. Inventory at
				<code>.knowledge/dashfi-ui-patterns.md</code> (pattern P3).
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Page-global save (sticky footer)</strong> — when sections share state, like
					compliance settings with cross-section validation, a single sticky-footer save
					makes more sense than per-section saves. Use sparingly; usually per-section is
					right.
				</li>
				<li>
					<strong>Read-only sections</strong> — for compliance-bound settings (legal entity
					name, KYC fields), render the section as label and value pairs without inputs. The
					save button is replaced with a "Request change" link.
				</li>
				<li>
					<strong>Per-section badges in the nav</strong> — "Profile (3 unsaved)" or
					"Security needs attention" surfaces issues without forcing the user to scroll
					through every section. Useful when validation is async or compliance-driven.
				</li>
				<li>
					<strong>Collapsed sections</strong> — when sections are long but rarely edited,
					render them collapsed with an "Expand" chevron. Use sparingly; usually scroll is
					enough.
				</li>
			</ul>
			<h3>Anti-patterns</h3>
			<ul>
				<li>
					<strong>Don't put each section in a separate route just because you can.</strong>
					Routes for sections introduce save-or-discard nag dialogs the user doesn't want.
					Split routes when sections are semantically separate, not just because they're
					long.
				</li>
				<li>
					<strong>Don't render the side nav as a <code>Sidebar</code> lib component.</strong>
					The lib <code>Sidebar</code> is for the protected app shell. This page's nav is a
					much lighter in-page anchor list — using the heavy lib component conflates two
					patterns.
				</li>
				<li>
					<strong>Don't auto-save on input change.</strong> Settings imply intent; auto-save
					robs the user of the ability to try something and back out. Save buttons exist for
					a reason.
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.page {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 32px;
		width: 100%;
		max-width: 880px;
		align-items: start;
	}

	/* Left column — anchor nav.
	   Sticky inside the preview canvas; in a real route it would be sticky to the
	   page scroll context. */
	.anchor-nav {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-top: 4px;
	}
	.anchor {
		all: unset;
		cursor: pointer;
		display: block;
		padding: 8px 12px;
		font-size: 13px;
		line-height: 1.4;
		color: var(--fg-muted);
		border-left: 2px solid transparent;
		transition: color 120ms ease, border-color 120ms ease, background 120ms ease;
	}
	.anchor:hover {
		color: var(--fg);
	}
	.anchor.active {
		color: var(--jade, var(--fg));
		border-left-color: var(--jade, var(--fg));
		font-weight: 500;
	}

	/* Right column — scroll container. Constrained for the preview canvas so
	   scroll is contained; in a real route the page itself scrolls. */
	.scroll {
		max-height: 600px;
		overflow-y: auto;
		overflow-x: hidden;
		padding-right: 8px;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.settings {
		display: flex;
		flex-direction: column;
		gap: 20px;
		scroll-margin-top: 8px;
	}
	.head {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 0;
	}
	.head h2 {
		font-size: 18px;
		font-weight: 500;
		margin: 0;
		color: var(--fg);
	}
	.lede {
		font-size: 13px;
		color: var(--fg-muted);
		margin: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 200px;
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
		padding-top: 8px;
	}

	/* Integrations list — logo row + status. */
	.integration-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.integration-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 12px 0;
		border-top: 1px solid var(--border);
	}
	.integration-row:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.integration-info {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
	}
	.integration-logo {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-muted);
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 500;
		color: var(--fg);
		flex-shrink: 0;
	}
	.integration-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}
	.integration-name {
		font-size: 14px;
		font-weight: 500;
		color: var(--fg);
		margin: 0;
	}
	.integration-action {
		flex-shrink: 0;
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
