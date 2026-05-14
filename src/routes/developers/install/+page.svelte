<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';

	// GitHub coords for the source repo. The marketplace name (used after the
	// `@` in `/plugin install dashbook@dashfi`) is set in
	// `.claude-plugin/marketplace.json` and stays `dashfi` regardless of
	// where the source is hosted.
	const MARKETPLACE_GH = 'trlmkb/dashbook';
	const MARKETPLACE_NAME = 'dashfi';

	const claudeCodeInstall = `# In Claude Code, run two commands:

/plugin marketplace add ${MARKETPLACE_GH}
/plugin install dashbook@${MARKETPLACE_NAME}`;

	const claudeCodeAfterInstall = `# Verify the install:
/mcp                          # should list a "dashbook" MCP server, connected

# Try a slash command:
/dashbook-component button    # fetches the Button anatomy from the MCP
/dashbook-port input react    # gets a React snippet of Input
/dashbook-voice               # pulls the brand voice rules

# Or in natural language — the dashbook-design-system skill auto-activates:
# "Use the Dashbook product design system. Build a settings page."`;

	const consoleSteps = `# Steps for the Anthropic Console admin (one-time):

# 1. Open https://console.anthropic.com → your workspace
# 2. Go to: Customizations → Plugins → Manage organization plugins
# 3. Add plugin from marketplace:
#       Marketplace coordinates: ${MARKETPLACE_GH}     (GitHub repo)
#       Marketplace name:        ${MARKETPLACE_NAME}     (what users see in their plugin list)
#       Plugin name:             dashbook
# 4. Approve and publish

# Every member of the workspace then sees the plugin under
# Customize → Plugins → Your organization in Claude Desktop and can
# install with one click. No manual config edits.`;

	const desktopManualMacOS = `// macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
{
	"mcpServers": {
		"dashbook": {
			"url": "https://dashbook.vercel.app/mcp"
		}
	}
}`;

	const desktopManualWindows = `// Windows: %APPDATA%\\Claude\\claude_desktop_config.json
{
	"mcpServers": {
		"dashbook": {
			"url": "https://dashbook.vercel.app/mcp"
		}
	}
}`;

	const verifyCurl = `# Sanity-check the live endpoint at any time:
curl -sS -X POST https://dashbook.vercel.app/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json, text/event-stream' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{
        "protocolVersion":"2024-11-05",
        "capabilities":{},
        "clientInfo":{"name":"curl","version":"0"}}}'

# Expect: data: {"result":{...,"serverInfo":{"name":"dashbook"...}}}`;
</script>

<svelte:head>
	<title>Install — Developers — Dashbook</title>
</svelte:head>

<InnerPage>
	<PageHeader
		label="Developers"
		title="Install"
		lede="One-click install for Claude Code and Claude Desktop. The Dashbook plugin bundles the auto-suggest skill, registers the hosted MCP server, and ships three slash commands. Three install paths depending on which surface you use."
	/>

	<Section
		label="Path 1 — Anthropic Console (org admin, one-time)"
		note="Once registered in Console, every Dash.fi workspace member sees the plugin in Claude Desktop → Customize → Plugins → Your organization and clicks install. Single source of truth for the whole company. Requires Team or Enterprise plan."
	>
		<CodeSnippet code={consoleSteps} language="bash" />
		<p style:font-size="14px" style:color="var(--fg-muted)" style:margin-top="16px">
			The exact UI path in Anthropic Console moves around — if Customizations → Plugins isn't visible, look for "Marketplaces" or "Org integrations" in your workspace settings. Once added, the plugin propagates to all members within a few minutes.
		</p>
	</Section>

	<Section
		label="Path 2 — Claude Code (any developer, manual)"
		note="Adds the marketplace, installs the plugin, registers the MCP server, loads the skill. Three commands total."
	>
		<CodeSnippet code={claudeCodeInstall} language="bash" />
		<div class="setup-head">After install</div>
		<CodeSnippet code={claudeCodeAfterInstall} language="bash" />
	</Section>

	<Section
		label="Path 3 — Claude Desktop (manual config, until Console plugin is registered)"
		note="If your org admin hasn't registered the plugin in Console yet — or you're using a personal Anthropic account without the team tier — wire the MCP server in directly. Restart Claude Desktop after editing."
	>
		<div class="setup-head">macOS</div>
		<CodeSnippet code={desktopManualMacOS} language="json" />
		<div class="setup-head">Windows</div>
		<CodeSnippet code={desktopManualWindows} language="json" />
		<p style:font-size="14px" style:color="var(--fg-muted)" style:margin-top="16px">
			This wires the MCP server but does NOT install the skill or slash commands — those come with the plugin path. Manual config is a fallback; prefer Path 1 or Path 2 when you can.
		</p>
	</Section>

	<Section
		label="What the plugin includes"
		note="One install, three artefacts."
	>
		<ul class="docs-list">
			<li>
				<strong>Skill</strong> — <code>dashbook-design-system</code>. Auto-activates on Dash.fi
				keywords (Dash.fi, dashbook, jade brand, dash card, AdPay/shipping/tokens/AP agent, partner
				co-branding, launch email). Routes the agent to the right tool namespace (product vs
				marketing).
			</li>
			<li>
				<strong>MCP server</strong> — registered at <code>https://dashbook.vercel.app/mcp</code>.
				15 tools across <code>product_*</code> (components, foundations, tokens, port-to),
				<code>marketing_*</code> (voice, logos, palette, partner kits, disclosures), and shared
				(version, changelog).
			</li>
			<li>
				<strong>Slash commands</strong>:
				<ul class="docs-list" style:margin-top="6px">
					<li><code>/dashbook-component &lt;slug&gt;</code> — fetches anatomy for one component.</li>
					<li><code>/dashbook-port &lt;slug&gt; &lt;stack&gt;</code> — generates a stack-specific port (react / react-native / html-css / vue).</li>
					<li><code>/dashbook-voice</code> — brand voice + tone rules for copywriting.</li>
				</ul>
			</li>
		</ul>
	</Section>

	<Section
		label="Verify the server is alive"
		note="No client needed — works from any machine with curl."
	>
		<CodeSnippet code={verifyCurl} language="bash" />
	</Section>

	<Section
		label="Other clients"
		note="The MCP server speaks Streamable HTTP, so anything MCP-aware can point at the remote URL. See /developers/mcp for the raw tool reference and stdio config snippets."
	>
		<ul class="docs-list">
			<li><strong>Claude Cloud</strong> (console.anthropic.com / API) — workspace MCP settings. Same URL.</li>
			<li><strong>Cursor / Zed / Windsurf / others</strong> — each has its own MCP config file. URL is the same.</li>
			<li><strong>Stdio (via npm)</strong> — <code>npx -y @dashfi/mcp-server</code>. Proxies to the same remote endpoint. Useful for environments that don't support remote MCP URLs.</li>
		</ul>
	</Section>

	<Section
		label="Source"
		note="Plugin source lives in this repo so the bundled skill and the live docs stay in sync. PRs welcome."
	>
		<ul class="docs-list">
			<li>Marketplace manifest — <code>.claude-plugin/marketplace.json</code></li>
			<li>Plugin manifest — <code>claude-plugin/.claude-plugin/plugin.json</code></li>
			<li>Skill — <code>claude-plugin/skills/dashbook-design-system/SKILL.md</code></li>
			<li>Commands — <code>claude-plugin/commands/</code></li>
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
</style>
