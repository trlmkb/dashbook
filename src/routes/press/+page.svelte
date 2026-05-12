<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import AssetConfigurator from '$chrome/AssetConfigurator.svelte';
	import PoweredByBadge from '$chrome/PoweredByBadge.svelte';
	import DoDontGrid from '$chrome/DoDontGrid.svelte';
	import { badgeVariants, customerLockups, coBrandRules } from '$content/partners';
</script>

<svelte:head><title>Press &amp; Partners — Dashbook</title></svelte:head>

<InnerPage section="/press" wide>
	<PageHeader
		label="Press & Partners"
		title="Press & partners."
		lede="Brand kit, partner co-branding rules, customer logos, and the legal disclosure library. Royalty-free for editorial use under our trademark policy."
	/>

	<Section
		label="Wordmark"
		note="Configurable downloads — color, size, format. Bundle ships every preset at 256 / 512 / 1024px."
	>
		<AssetConfigurator kind="wordmark" />
	</Section>

	<Section
		label="App icon"
		note="Square geometry for app launchers, favicons, social avatars."
	>
		<AssetConfigurator kind="app" />
	</Section>

	<Section
		label="Partner kit"
		note="For customers and partners co-branding with Dash.fi. Powered-by-Dash badge in three approved color treatments, customer-lockup examples, and co-branding rules."
	>
		<div class="partner-kit">
			<div class="kit-block">
				<div class="kit-head">Powered-by-Dash badge</div>
				<p class="kit-intro">
					Use the badge as a link from your site footer or About page back to
					<code>dash.fi</code>. Three approved color treatments — pick the one that matches
					your surrounding surface. Hover any badge to preview the link state.
				</p>
				<div class="badge-grid">
					{#each badgeVariants as v (v.id)}
						<div class="badge-cell">
							<div class="badge-canvas" style:background={v.bg}>
								<PoweredByBadge fg={v.fg} href="https://dash.fi" />
							</div>
							<div class="badge-caption">
								<span class="badge-name">{v.label}</span>
								<p>{v.note}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="kit-block">
				<div class="kit-head">Customer logo lockup</div>
				<p class="kit-intro">
					Customer logo on the left, hairline divider, "Powered by Dash" on the right. Equal
					optical weight between the two marks. Hairline border keeps the relationship visually
					clear without recruiting the entire surface.
				</p>
				<div class="lockup-grid">
					{#each customerLockups as c (c.name)}
						<div class="lockup-cell">
							<div class="lockup-canvas">
								<span class="customer-mark">{c.name}</span>
								<span class="lockup-rule" aria-hidden="true"></span>
								<PoweredByBadge fg="#2B605C" size="sm" href="https://dash.fi" />
							</div>
							<div class="lockup-caption">
								<span class="lockup-name">{c.name}</span>
								<span class="lockup-meta">{c.industry}</span>
								<p>{c.note}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="kit-block">
				<div class="kit-head">Co-branding rules</div>
				<DoDontGrid items={coBrandRules} />
			</div>
		</div>
	</Section>

	<Section
		label="Media contact"
		note="For press inquiries, interview requests, and pre-embargo briefings."
	>
		<div class="contact-grid">
			<div class="contact-cell">
				<div class="label">Press</div>
				<a href="mailto:press@dash.fi">press@dash.fi</a>
			</div>
			<div class="contact-cell">
				<div class="label">Partnerships</div>
				<a href="mailto:partners@dash.fi">partners@dash.fi</a>
			</div>
			<div class="contact-cell">
				<div class="label">Security disclosure</div>
				<a href="mailto:security@dash.fi">security@dash.fi</a>
			</div>
		</div>
	</Section>

	<Section
		id="trademark"
		label="Legal disclosures"
		note="Required language for marketing pieces, partner co-branding, and regulated channels. Full agreements at dash.fi/legal."
	>
		<ul class="disclosures">
			<li>
				<span class="cap">Legal entity</span>
				<p>
					Dash.fi Technologies Inc., 2261 Market Street, STE 5135, San Francisco, CA 94114.
					Dash.fi is a registered trademark of Dash.fi Technologies Inc.
				</p>
			</li>
			<li>
				<span class="cap">Issuing banks</span>
				<p>
					Dash.fi cards are issued by <strong>TransPecos Banks, SSB</strong> (Mastercard,
					Member FDIC) and <strong>Patriot Bank, N.A.</strong> (AdSpend &amp; Rewards
					Mastercard, Member FDIC). Card-issuing relationships are disclosed on each
					cardholder agreement.
				</p>
			</li>
			<li>
				<span class="cap">FDIC</span>
				<p>
					Your account at Dash.fi is not, itself, an FDIC-insured product. Cards are issued
					by FDIC member banks (TransPecos Banks SSB and Patriot Bank N.A.); deposits held
					at those issuing banks are FDIC-insured up to applicable limits.
				</p>
			</li>
			<li>
				<span class="cap">Payment services</span>
				<p>
					Payment processing is provided by Visa Global Services Inc. (VGSI, NMLS ID 181032)
					and, for cross-border money movement, The Currency Cloud Limited (UK FCA, FRN
					900199) in partnership with CFSB in the United States.
				</p>
			</li>
			<li>
				<span class="cap">Compliance</span>
				<p>
					FinCEN-registered Money Services Business; FINTRAC foreign MSB registration
					(Canada). Full platform agreement, cardholder terms, privacy policy, and rewards
					terms at <a href="https://dash.fi/legal" target="_blank" rel="noopener">dash.fi/legal</a>.
				</p>
			</li>
			<li>
				<span class="cap">Support hotline</span>
				<p>
					VGSI cardholder support: <strong>(888) 733-0041</strong>.
				</p>
			</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.contact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.contact-cell {
		background: var(--bg);
		padding: 20px 24px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.contact-cell a {
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--fg);
		text-decoration: none;
		letter-spacing: -0.02em;
	}
	.contact-cell a:hover {
		color: var(--brand);
	}
	.disclosures {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.disclosures li {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 24px;
		padding: 20px 0;
		border-top: 1px solid var(--border);
	}
	.disclosures li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.cap {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		padding-top: 2px;
	}
	.disclosures p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
	}
	@media (max-width: 720px) {
		.disclosures li {
			grid-template-columns: 1fr;
			gap: 8px;
		}
	}

	/* --- Partner kit ------------------------------------------------------ */
	.partner-kit {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
	.kit-block {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.kit-head {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.kit-intro {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		margin: 0 0 8px;
		max-width: 720px;
	}
	.badge-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	@media (min-width: 720px) {
		.badge-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.badge-cell {
		background: var(--bg);
		display: flex;
		flex-direction: column;
	}
	.badge-canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 140px;
		padding: 32px;
	}
	.badge-caption {
		padding: 14px 18px;
		border-top: 1px solid var(--border);
	}
	.badge-name {
		display: block;
		font-size: 13px;
		font-weight: 500;
		color: var(--fg);
		margin-bottom: 4px;
	}
	.badge-caption p {
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 0;
	}

	.lockup-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	@media (min-width: 720px) {
		.lockup-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.lockup-cell {
		background: var(--bg);
		display: flex;
		flex-direction: column;
	}
	.lockup-canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		min-height: 140px;
		padding: 32px;
		background: var(--bg-muted);
	}
	.customer-mark {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: 24px;
		letter-spacing: -0.02em;
		color: var(--fg);
		text-transform: uppercase;
	}
	.lockup-rule {
		display: inline-block;
		width: 1px;
		height: 28px;
		background: var(--border);
	}
	.lockup-caption {
		padding: 14px 18px;
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.lockup-name {
		font-size: 13px;
		font-weight: 500;
		color: var(--fg);
	}
	.lockup-meta {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: -0.02em;
		color: var(--fg-muted);
	}
	.lockup-caption p {
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 4px 0 0;
	}
</style>
