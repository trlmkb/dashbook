<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';

	const claudeAiExample = `# In claude.ai (with the Dashbook Connector enabled):

"Draft a launch email for our new credit card refresh. On-brand."

# Claude will:
# 1. Call marketing_get_brand_voice() — gets the tone rules
# 2. Call marketing_get_partner_kit() if partner-co-branded
# 3. Write the email in Dash.fi voice, sentence case, no exclamations, no emoji`;

	const assetUrls = `# Wordmark SVG (any colorway, any size, any format)
https://dashbook.vercel.app/api/logo/wordmark/jade?format=svg&size=400
https://dashbook.vercel.app/api/logo/wordmark/jade?format=png&scale=2
https://dashbook.vercel.app/api/logo/wordmark/white-on-ink

# App icon
https://dashbook.vercel.app/api/logo/app/jade?format=png&size=256
https://dashbook.vercel.app/api/logo/app/cobalt?format=svg

# Card art (MDES tokenization assets)
https://dashbook.vercel.app/api/card/jade/preview?format=png

# Available colorway presets:
# Wordmark: jade · jade-dark · ink · cream-on-jade · white-on-ink · white-on-cobalt · black · transparent
# App:      jade · cobalt · ink · cream · white · black`;
</script>

<svelte:head><title>Use Dashbook as marketing or sales — Dashbook</title></svelte:head>

<InnerPage>
	<PageHeader
		label="Use / Marketing & sales"
		title="Marketing &amp; sales."
		lede="Brand voice for emails, partner-co-branding rules for decks, logos at any URL. Plus the Dashbook Connector in claude.ai — Claude reads the voice rules and drafts copy on-brand without you pasting prompts."
	/>

	<Section
		label="1. Voice + tone (the most useful thing here)"
		note="If you only learn one thing from Dashbook: the Dash.fi voice rules."
	>
		<ul class="docs-list">
			<li>
				<strong>Sentence case</strong>. Always. Even headings. Especially CTAs.
			</li>
			<li>
				<strong>No exclamation marks.</strong> No "Hooray!" or "Welcome!". Confidence carries the
				celebration.
			</li>
			<li>
				<strong>No emoji.</strong> In emails, decks, app copy, social. Restraint over enthusiasm.
			</li>
			<li>
				<strong>Numerals, not words.</strong> "5 cards" not "five cards". Currency prefixed with the
				symbol: $1,234.00.
			</li>
			<li>
				<strong>"You" for users, "we" for company.</strong> Direct, plural-first.
			</li>
		</ul>
		<p class="next">
			Full rules + 9 good examples + 5 bad examples + 5 before/after rewrites at
			<a href="/brand/voice">/brand/voice</a>. Or call <code>marketing_get_brand_voice</code> via
			the Dashbook Connector in claude.ai.
		</p>
	</Section>

	<Section
		label="2. Drafting copy with claude.ai"
		note="Easiest path: enable the Dashbook Connector in your claude.ai workspace, then just write what you need. Claude reads the brand voice automatically."
	>
		<CodeSnippet code={claudeAiExample} language="markdown" />
		<p class="next">
			Don't have the Connector? Ask your admin to enable it under
			Organization settings → Connectors. Setup recipe at
			<a href="/developers/install">/developers/install</a>.
		</p>
	</Section>

	<Section
		label="3. Logos + assets at fingertips"
		note="Every brand asset is at a stable URL. No login, no Dropbox, no DAM. Copy a URL into a deck or email and the SVG renders inline."
	>
		<CodeSnippet code={assetUrls} language="bash" />
		<p class="next">
			Or use the configurator at <a href="/brand/logo">/brand/logo</a> — pick a colorway + size +
			format, hit download. Bundle download (all colorways at once) is a "Download all" button on
			the same page.
		</p>
	</Section>

	<Section
		label="4. Partner co-branding"
		note="Customer co-brand badges, Powered-by-Dash lockups, do/don't rules — the kit for any partner-facing surface."
	>
		<ul class="docs-list">
			<li>
				<a href="/press">/press</a> has the full partner kit — 3 Powered-by-Dash badge variants,
				customer logo lockups, 8 co-branding do/don't rules.
			</li>
			<li>
				The MCP tool <code>marketing_get_partner_kit</code> returns the structured data — useful when
				drafting in claude.ai.
			</li>
		</ul>
	</Section>

	<Section
		label="5. Legal disclosures"
		note="FDIC, partner-bank, card-issuance — copy that's been compliance-reviewed."
	>
		<ul class="docs-list">
			<li>
				<a href="/press">/press</a> has the canonical disclosures: TransPecos Banks SSB + Patriot
				Bank N.A. (issuing banks for Mastercard cards), Visa Global Services, Currency Cloud, FinCEN
				+ FINTRAC MSB registrations.
			</li>
			<li>
				MCP: <code>marketing_get_legal_disclosure({'{ kind: "deposit-fdic" }'})</code> returns the
				disclosure text + which partner/regulator it relates to.
			</li>
			<li>
				<strong>Always use the canonical text.</strong> Compliance-reviewed copy is not a place to
				paraphrase. Copy + paste.
			</li>
		</ul>
	</Section>

	<Section
		label="6. When you need new copy"
		note="The Dashbook system covers tone + a lot of stock language. For genuinely new copy, the loop:"
	>
		<ol class="ordered">
			<li>Describe what you're drafting to claude.ai (with the Dashbook Connector enabled).</li>
			<li>Claude pulls the voice rules + any relevant partner/legal data via MCP.</li>
			<li>It writes a draft on-brand.</li>
			<li>You edit + ship.</li>
		</ol>
		<p class="next">
			If you find yourself fighting Claude on tone, the voice rules might be missing a case worth
			documenting. File an issue at <a href="https://github.com/trlmkb/dashbook/issues">
				trlmkb/dashbook/issues
			</a>.
		</p>
	</Section>
</InnerPage>

<style>
	.docs-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		padding-left: 18px;
	}
	.docs-list a,
	.next a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.docs-list code,
	.next code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
	.ordered {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		padding-left: 20px;
	}
	.next {
		font-size: 13px;
		color: var(--fg-muted);
		margin-top: 16px;
	}
</style>
