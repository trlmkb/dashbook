<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { componentCount } from '$specs/components/index.js';

	// Remote URL is the canonical install path.
	const remoteUrl = 'https://dashbook.vercel.app/mcp';

	const claudeDesktop = `// ~/Library/Application Support/Claude/claude_desktop_config.json
//   (macOS — Windows path is in %APPDATA%\\\\Claude\\\\)
{
  "mcpServers": {
    "dashbook": {
      "command": "npx",
      "args": ["-y", "@dashfi/mcp-server"]
    }
  }
}`;

	const claudeDesktopRemote = `// Alternative — pure remote (no npm install).
// Claude Desktop 2025.10+ supports remote MCP URLs natively.
{
  "mcpServers": {
    "dashbook": {
      "url": "${remoteUrl}"
    }
  }
}`;

	const claudeCode = `// .mcp.json in your project root (or ~/.claude.json globally)
{
  "mcpServers": {
    "dashbook": {
      "type": "http",
      "url": "${remoteUrl}"
    }
  }
}`;

	const claudeCodeStdio = `// Or via the stdio adapter (for offline / local development):
{
  "mcpServers": {
    "dashbook": {
      "command": "npx",
      "args": ["-y", "@dashfi/mcp-server"]
    }
  }
}`;

	const curlInit = `# Sanity-check the remote endpoint with curl:
curl -sS -X POST ${remoteUrl} \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json, text/event-stream' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{
        "protocolVersion":"2024-11-05",
        "capabilities":{},
        "clientInfo":{"name":"curl","version":"0"}}}'

# Expect an SSE-style "data: {…serverInfo…}" line back.`;

	const usagePrompts = `# Manual invocation — the design system has two namespaces.

"Use the Dashbook product design system. Build a settings page with a
work-email input, a save button, and an avatar."

"Use the Dashbook marketing design system. Draft a launch announcement
email with the partner-bank disclosure."

# Or call tools directly by name:

"Call product_get_component slug=button — what variants does it have?"

"Call product_port_to slug=input stack=react — give me the React snippet."`;

	const toolList: { name: string; description: string; ns: 'product' | 'marketing' | 'shared' }[] = [
		{ name: 'product_list_components', ns: 'product', description: 'Catalogue of all components by category + status.' },
		{ name: 'product_get_component', ns: 'product', description: 'Full anatomy for one component — dimensions, tokens, variants, props, porting.' },
		{ name: 'product_get_foundation', ns: 'product', description: 'Color / typography / spacing / radius / motion / shadows foundation data.' },
		{ name: 'product_get_token', ns: 'product', description: 'Resolve a single token to its hex (light + dark).' },
		{ name: 'product_search', ns: 'product', description: 'Fuzzy search across all components.' },
		{ name: 'product_port_to', ns: 'product', description: 'Stack-specific porting checklist for a component.' },
		{ name: 'marketing_get_brand_voice', ns: 'marketing', description: 'Tone / sentence-case / numerics rules.' },
		{ name: 'marketing_get_logo', ns: 'marketing', description: 'Wordmark + app icon SVG. Returns both URL and inline content.' },
		{ name: 'marketing_list_logo_presets', ns: 'marketing', description: 'Available colorway presets for wordmark + app icon.' },
		{ name: 'marketing_get_marketing_palette', ns: 'marketing', description: 'Cobalt-based marketing palette.' },
		{ name: 'marketing_get_legal_disclosure', ns: 'marketing', description: 'FDIC / partner-bank / card-issuer disclosure text.' },
		{ name: 'marketing_get_partner_kit', ns: 'marketing', description: 'Partner co-branding rules.' },
		{ name: 'marketing_search', ns: 'marketing', description: 'Search marketing assets + guidance.' },
		{ name: 'version', ns: 'shared', description: 'MCP server + docs site version.' },
		{ name: 'changelog', ns: 'shared', description: 'Recent design-system changes.' }
	];
</script>

<svelte:head>
	<title>MCP — Developers — Dashbook</title>
</svelte:head>

<InnerPage>
	<PageHeader
		label="Developers"
		title="MCP server"
		lede="Dashbook ships an MCP server so any Claude session — Desktop, Code, Cloud, or anything else MCP-aware — can query the canonical brand spec on demand. {componentCount} components, foundations, brand voice, and asset URLs exposed as tools."
	/>

	<Section
		label="What it is"
		note="One hosted MCP endpoint, two tool namespaces. Manual invocation by keyword keeps marketing and product surfaces from leaking into each other."
	>
		<ul class="docs-list">
			<li>
				<strong>Remote URL</strong> — <code>{remoteUrl}</code>. Zero-install. Works from any client
				that supports remote MCP URLs.
			</li>
			<li>
				<strong>npm package</strong> — <code>@dashfi/mcp-server</code>. A stdio adapter that proxies
				to the remote URL. Lets Claude Desktop install via <code>npx</code>.
			</li>
			<li>
				<strong>Tool namespaces</strong> — <code>product_*</code> (jade brand, components, foundations)
				and <code>marketing_*</code> (cobalt accent, voice, logos, partners, legal). Plus two shared
				tools: <code>version</code> and <code>changelog</code>.
			</li>
			<li>
				<strong>Manual invocation</strong> — say "use the Dashbook product design system" or "use the
				Dashbook marketing design system" to scope the agent. The tool descriptions make routing
				obvious; the agent picks the right namespace.
			</li>
		</ul>
	</Section>

	<Section
		label="Install — Claude Desktop"
		note="Drop into your config. Restart Claude Desktop. The Dashbook tools appear in the integrations panel."
	>
		<div class="setup-head">Via npm package (recommended)</div>
		<CodeSnippet code={claudeDesktop} language="json" />
		<div class="setup-head">Via remote URL (no install)</div>
		<CodeSnippet code={claudeDesktopRemote} language="json" />
	</Section>

	<Section
		label="Install — Claude Code"
		note="Add to your project's .mcp.json or your global ~/.claude.json. Pick remote for normal use; pick stdio for offline / local-dev."
	>
		<div class="setup-head">Remote (recommended)</div>
		<CodeSnippet code={claudeCode} language="json" />
		<div class="setup-head">Stdio</div>
		<CodeSnippet code={claudeCodeStdio} language="json" />
	</Section>

	<Section
		label="Install — anything else MCP-aware"
		note="Point the client at the remote URL. The endpoint speaks Streamable HTTP (the modern MCP transport) and falls back to SSE for older clients."
	>
		<CodeSnippet code={curlInit} language="bash" />
	</Section>

	<Section
		label="Tools"
		note="15 tools total. Prefix tells you the namespace at a glance."
	>
		<div class="tool-table">
			{#each ['product', 'marketing', 'shared'] as ns (ns)}
				<div class="ns-head">{ns}</div>
				{#each toolList.filter((t) => t.ns === ns) as t (t.name)}
					<div class="tool-row">
						<code>{t.name}</code>
						<span>{t.description}</span>
					</div>
				{/each}
			{/each}
		</div>
	</Section>

	<Section
		label="Using it"
		note="Once installed, invoke manually. The MCP doesn't auto-activate — that's intentional, gives you control over product vs marketing context."
	>
		<CodeSnippet code={usagePrompts} language="text" />
	</Section>

	<Section
		label="What it returns"
		note="Structured JSON, not prose. Agents can parse the dimensions / tokens / variants / props fields directly. Same data the docs site renders."
	>
		<ul class="docs-list">
			<li>
				<strong>Components</strong> — every value visible in <a href="/components">/components/&lt;name&gt;</a>'s
				Anatomy tab is a typed field on the spec. Dimensions, tokens (per-part, per-mode hex),
				variants, sizes, composition rules, non-features, props, porting checklist, canonical Svelte
				example.
			</li>
			<li>
				<strong>Foundations</strong> — color (product + base + marketing palettes), typography (font
				families + license notes), spacing scale, radius scale, motion durations, shadow scale.
			</li>
			<li>
				<strong>Marketing</strong> — brand voice rules, legal disclosure text, and <strong>logo SVGs
				returned both as URL and inline content</strong> (same bytes either way; pick whichever
				fits the surface you're building). Partner-kit endpoint still returns URLs only — per-partner
				asset bundles are Phase 2.
			</li>
		</ul>
	</Section>

	<Section
		label="Source of truth"
		note="The MCP reads from the same typed spec modules the docs site renders from. One source, two consumers."
	>
		<ul class="docs-list">
			<li>
				<strong>Component specs</strong> — <code>src/lib/specs/components/&lt;slug&gt;.ts</code> (one
				per component, all 60).
			</li>
			<li><strong>Schema</strong> — <code>src/lib/specs/types.ts</code>.</li>
			<li>
				<strong>Tokens</strong> — <code>src/lib/tokens.ts</code> (colors, radii, shadows, motion).
			</li>
			<li>
				<strong>MCP wiring</strong> — <code>src/lib/mcp/server.ts</code> + <code>tools/&#123;product,marketing,shared&#125;.ts</code>.
			</li>
			<li><strong>Endpoint</strong> — <code>src/routes/mcp/+server.ts</code>.</li>
		</ul>
	</Section>

	<Section
		label="Coming soon"
		note="Phase 2 items — slated for the next sprint."
	>
		<ul class="docs-list">
			<li>Per-partner asset bundles + co-branding lockup rules in <code>marketing_get_partner_kit</code>.</li>
			<li>Full marketing search across voice / palette / disclosures.</li>
			<li>Foundations deep-extract — typography type scale + spacing scale beyond what's in <code>tokens.ts</code>.</li>
			<li>
				Auth gating for partner-specific assets (FDIC partner data, exec bios, etc.). Public
				surfaces stay public.
			</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.setup-head {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 24px 0 8px;
	}
	.tool-table {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.ns-head {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 16px 0 4px;
	}
	.ns-head:first-child {
		margin-top: 0;
	}
	.tool-row {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 16px;
		padding: 8px 0;
		border-top: 1px solid var(--border);
		font-size: 14px;
		line-height: 1.5;
	}
	.tool-row code {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg);
	}
	.tool-row span {
		color: var(--fg);
	}
</style>
