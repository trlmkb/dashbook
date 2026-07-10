<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';

	const installSnippet = `# In Claude Code (per-user)
/plugin marketplace add trlmkb/dashbook
/plugin install dashbook@dashfi

# Verify
/mcp                          # "dashbook" should appear, connected
/dashbook-component button    # fetches Button anatomy from MCP`;

	const workflowSnippet = `# 1. Find the right component
product_list_components({ category: "Inputs" })

# 2. Get full anatomy (dimensions, tokens, variants, props)
product_get_component({ slug: "button" })

# 3. For a non-Svelte stack, get the stack-specific port
product_port_to({ slug: "button", stack: "react" })

# 4. Resolve a token to a hex value
product_get_token({ name: "brand" })   # → { light: "#2B605C", dark: "#5BB8B0" }`;

	const apiSnippet = `# No MCP client? Hit the JSON API directly:
curl https://dashbook.vercel.app/api/components.json                # catalogue
curl https://dashbook.vercel.app/api/components/button.json         # one component
curl https://dashbook.vercel.app/api/foundations/color.json         # tokens (light + dark)
curl https://dashbook.vercel.app/api/foundations/typography.json    # type system + webDelivery URLs
curl 'https://dashbook.vercel.app/api/logo/wordmark/jade?format=svg&size=400'  # wordmark`;
</script>

<svelte:head><title>Use Dashbook as a developer — Dashbook</title></svelte:head>

<InnerPage>
	<PageHeader
		label="Use / Engineer"
		title="Engineer."
		lede="Build Dash.fi UI in any stack. Dashbook exposes the design system three ways: a Claude Code plugin with skill + slash commands + MCP, a remote MCP for other clients, and a static JSON / SVG API for everything else."
	/>

	<Section label="1. Install" note="The fastest path: install the plugin and let Claude Code wire everything.">
		<CodeSnippet code={installSnippet} language="bash" />
		<p class="next">
			Full setup matrix (Claude Code · claude.ai · Desktop · Claude Design) lives at
			<a href="/developers/install">/developers/install</a>.
		</p>
	</Section>

	<Section label="2. Workflow" note="The canonical loop when building a screen.">
		<CodeSnippet code={workflowSnippet} language="bash" />
		<p class="next">
			The skill activates automatically on Dash.fi keywords. If you're hitting it manually, prefix
			your request with "Use the Dashbook product design system" so the agent loads context.
		</p>
		<p class="next">
			Clients that browse a catalogue instead of calling tools can also read MCP resources —
			<code>dashbook://components</code>, <code>dashbook://components/&#123;slug&#125;</code>, and
			<code>dashbook://foundations/&#123;slug&#125;</code> — same data, resources/list + resources/read.
			Full connector setup (Claude Code CLI, claude.ai custom connector, discovery via llms.txt / the
			ARD manifest) is documented at <code>/developers/mcp</code>.
		</p>
	</Section>

	<Section
		label="3. Build to spec"
		note="Every component has a structured anatomy: dimensions, tokens, variants, sizes, props, composition rules, non-features, porting checklist."
	>
		<ul class="docs-list">
			<li>
				<strong>Dimensions</strong>: exact pixel values (height, padding, radius). No "looks about right."
			</li>
			<li>
				<strong>Tokens</strong>: resolved hex values in both light + dark mode. Token name + literal hex
				next to each other so the port is unambiguous.
			</li>
			<li>
				<strong>Composition</strong>: how the component is assembled from sub-parts. E.g. Button = root + label + optional icon.
			</li>
			<li>
				<strong>Non-features</strong>: what the component explicitly does NOT do. Saves you from "can I
				add an icon prefix to Input?" (no — wrap it differently).
			</li>
			<li>
				<strong>Props</strong>: typed props table with defaults + nullable flags.
			</li>
			<li>
				<strong>Porting</strong>: stack-specific checklist (React / RN / HTML+CSS / Vue).
			</li>
		</ul>
	</Section>

	<Section
		label="4. Non-Svelte stacks"
		note="Tokens, components, and the port-to recipes work the same way regardless of stack. The lib is Svelte; the design system is the design system."
	>
		<p>
			See <a href="/developers/from-another-stack">/developers/from-another-stack</a> for the full
			guide on vanilla CSS tokens, font loading, component port recipes for React / React Native /
			HTML+CSS / Vue.
		</p>
	</Section>

	<Section
		label="5. No MCP? Hit the JSON API"
		note="Every component anatomy and every foundation token is available as static JSON. CORS open, 24h cache, no auth, no SDK."
	>
		<CodeSnippet code={apiSnippet} language="bash" />
		<p class="next">
			These work for any client — agents, crawlers, archives, link unfurlers, doc-search indexers.
			Same shape as the MCP tools return.
		</p>
	</Section>

	<Section
		label="6. Reporting bugs"
		note="Found a component anatomy that doesn't match the source? An MCP tool that returns the wrong shape? A token that drifted?"
	>
		<ul class="docs-list">
			<li>
				<strong>Issue on GitHub</strong>:
				<a href="https://github.com/trlmkb/dashbook/issues">trlmkb/dashbook/issues</a>
			</li>
			<li>
				<strong>Slack</strong>: #dashbook (or DM the maintainer)
			</li>
			<li>
				<strong>Quick fix yourself</strong>: PRs welcome. The spec files at
				<code>src/lib/specs/</code> are the single source of truth — fixing one updates docs + MCP + JSON API simultaneously.
			</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.next {
		font-size: 13px;
		color: var(--fg-muted);
		margin-top: 16px;
	}
	.next a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.docs-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		padding-left: 18px;
	}
	.docs-list a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.docs-list code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
</style>
