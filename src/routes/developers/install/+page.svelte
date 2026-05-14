<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';

	// GitHub coords for the source repo. Marketplace name (used after the `@` in
	// `/plugin install dashbook@dashfi`) is set in `.claude-plugin/marketplace.json`
	// and stays `dashfi` regardless of where the source is hosted.
	const MARKETPLACE_GH = 'trlmkb/dashbook';
	const MARKETPLACE_NAME = 'dashfi';

	// ── Claude Code ────────────────────────────────────────────────────
	const claudeCodeManualInstall = `# Two commands in Claude Code:
/plugin marketplace add ${MARKETPLACE_GH}
/plugin install dashbook@${MARKETPLACE_NAME}`;

	const claudeCodeAfterInstall = `# Verify:
/mcp                          # "dashbook" should appear, connected

# Try a slash command:
/dashbook-component button    # fetches Button anatomy from MCP
/dashbook-port input react    # generates React snippet
/dashbook-voice               # brand voice rules

# Or in natural language — the skill auto-activates on Dash.fi keywords:
# "Use the Dashbook product design system. Build a settings page."`;

	const coworkSetup = `# claude.ai admin → Plugins → Create Plugin Marketplace
# 1. Choose: GitHub syncing
# 2. Repo: ${MARKETPLACE_GH}        (auto-pulls .claude-plugin/marketplace.json)
# 3. Installation preference:
#       Installed by default    ← recommended for Dash.fi engineers
#       Available               ← members install manually
#       Required                ← installed + uninstall-blocked
# 4. Publish.
#
# Every org member's Claude Code auto-installs Dashbook on next session.
# Updates propagate automatically when this page pushes new marketplace.json.`;

	// ── claude.ai (web) ────────────────────────────────────────────────
	const connectorSetup = `# claude.ai admin → Organization settings → Connectors → Add → Custom → Web
#
# Name:                Dashbook
# Remote MCP URL:      https://dashbook.vercel.app/mcp
# OAuth Client ID:     (leave blank — Dashbook MCP is unauthenticated)
# OAuth Client Secret: (leave blank)
# Action permissions:  (defaults are fine)
#
# Save. The connector appears under each member's Customize → Connectors —
# they click Enable once to opt in. No forced auto-activation, no per-member
# admin approval.`;

	const claudeAiVerify = `# In any org member's claude.ai chat:
"Show me the Dashbook brand voice rules."

# Expected: Claude calls marketing_get_brand_voice (visible in the tool-call
# expansion in chat) and returns the structured voice spec.`;

	// ── Claude Desktop ────────────────────────────────────────────────
	const desktopManualMacOS = `// macOS — ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "dashbook": {
      "url": "https://dashbook.vercel.app/mcp"
    }
  }
}`;

	const desktopManualWindows = `// Windows — %APPDATA%\\Claude\\claude_desktop_config.json
{
  "mcpServers": {
    "dashbook": {
      "url": "https://dashbook.vercel.app/mcp"
    }
  }
}`;

	// ── Verification ──────────────────────────────────────────────────
	const verifyCurl = `# Sanity-check the live endpoint from any machine:
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
		lede="Three pieces — a Claude Code plugin (skill + slash commands + MCP), an org connector (MCP only), and a skill (prose only) — distributed across four surfaces. Pick your surface; the recipe below tells you what to wire and how."
	/>

	<Section
		label="Surface matrix"
		note="Four Anthropic surfaces consume the Dashbook brand system in different ways. Use this matrix to find your recipe."
	>
		<div class="matrix">
			<table>
				<thead>
					<tr>
						<th>Surface</th>
						<th>MCP tools</th>
						<th>Skill prose</th>
						<th>Slash commands</th>
						<th>Org-admin push</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><strong>Claude Code</strong> (CLI)</td>
						<td>✓ via plugin</td>
						<td>✓ via plugin</td>
						<td>✓ via plugin</td>
						<td>✓ Cowork</td>
					</tr>
					<tr>
						<td><strong>claude.ai</strong> (web)</td>
						<td>✓ via Connector</td>
						<td>—<br /><span class="muted">(see notes)</span></td>
						<td>—</td>
						<td>✓ Connectors tab</td>
					</tr>
					<tr>
						<td><strong>Claude Desktop</strong></td>
						<td>✓ via manual config or Cowork</td>
						<td>—</td>
						<td>—</td>
						<td>partial<br /><span class="muted">(Cowork-installed Claude Code)</span></td>
					</tr>
					<tr>
						<td><strong>Claude Design</strong> (Labs)</td>
						<td>—<br /><span class="muted">(coming weeks)</span></td>
						<td>—</td>
						<td>—</td>
						<td>—</td>
					</tr>
				</tbody>
			</table>
			<p class="matrix-note">
				The full bundle — tools + skill + slash commands + boundary signals — only
				reaches Claude Code today. Other surfaces get the tool layer, with skill
				prose reaching them indirectly via the boundary signal baked into every
				tool description.
			</p>
		</div>
	</Section>

	<Section
		label="Claude Code (CLI) · per-user install"
		note="Adds the marketplace, installs the plugin, registers the MCP server, loads the skill, and wires three slash commands. Three commands total."
	>
		<CodeSnippet code={claudeCodeManualInstall} language="bash" />
		<div class="setup-head">After install</div>
		<CodeSnippet code={claudeCodeAfterInstall} language="bash" />
	</Section>

	<Section
		label="Claude Code (CLI) · org-wide push (Cowork)"
		note="Owner-only, one-time. Registers the dashbook plugin as part of the org's plugin marketplace so every Dash.fi engineer's Claude Code auto-installs it on next session. Updates propagate automatically. Requires Team or Enterprise plan."
	>
		<CodeSnippet code={coworkSetup} language="bash" />
		<p class="aside">
			Owners only — Admins can't push Cowork plugins. Verify with the
			<a href="https://support.claude.com/en/articles/13837433-manage-claude-cowork-plugins-for-your-organization">Manage Claude Cowork plugins</a>
			doc. Once published, members see Dashbook listed in their <code>/plugin marketplace list</code> alongside Anthropic's defaults.
		</p>
	</Section>

	<Section
		label="claude.ai (web) · org Connector"
		note="Owner-only, one-time. Registers the Dashbook MCP server at the org level so every member of the workspace can opt in from their Customize panel. Tool-only — no skill prose, no slash commands. Requires Team or Enterprise plan."
	>
		<CodeSnippet code={connectorSetup} language="bash" />
		<div class="setup-head">Verify</div>
		<CodeSnippet code={claudeAiVerify} language="bash" />
		<p class="aside">
			Each member needs to click <strong>Enable</strong> the first time it appears
			under their Customize → Connectors. No forced auto-activation; no per-member
			admin approval after.
			<a href="https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp">Get started with custom connectors</a>.
		</p>
	</Section>

	<Section
		label="claude.ai (web) · skill prose"
		note="claude.ai doesn't have a first-class org-skills feature today. The skill's routing prose only reaches web users in two indirect ways."
	>
		<ul class="docs-list">
			<li>
				<strong>Tool-description boundary signal</strong> — every Dashbook
				<code>product_*</code> tool description ends with a paragraph naming the
				cross-namespace rule ("wordmarks live in marketing_*, not here"). When
				Claude on claude.ai introspects the connector's tool catalogue, it sees
				the boundary at tool-discovery time. This is what makes the cross-namespace
				bug fix work even without explicit skill prose.
			</li>
			<li>
				<strong>Org-wide workspace instructions</strong> — paste the relevant
				rules from <code>SKILL.md</code> into your org's default workspace
				instructions (claude.ai admin → Organization settings → Default
				instructions). Always-on rather than keyword-activated; useful if your
				org does a lot of Dash.fi UI / marketing work.
			</li>
		</ul>
	</Section>

	<Section
		label="Claude Desktop · manual MCP config"
		note="Direct config edit. Wires the MCP server only — does not install the skill or slash commands (those come with the Claude Code plugin path)."
	>
		<div class="setup-head">macOS</div>
		<CodeSnippet code={desktopManualMacOS} language="json" />
		<div class="setup-head">Windows</div>
		<CodeSnippet code={desktopManualWindows} language="json" />
		<p class="aside">
			Restart Claude Desktop after editing. Manual config is a fallback — prefer
			the Cowork org push (which reaches Claude Code, and Desktop where supported)
			when you can.
		</p>
	</Section>

	<Section
		label="Claude Design (Anthropic Labs) · coming soon"
		note="Claude Design (claude.ai/design) is live as a visual collaboration tool, but doesn't yet support MCP, connectors, skills, or plugins. Anthropic has stated integration support is coming. Use Claude Code or claude.ai web for Dashbook access in the meantime."
	>
		<ul class="docs-list">
			<li>
				<strong>Status</strong>: integration mechanisms not yet shipped per the
				<a href="https://www.anthropic.com/news/claude-design-anthropic-labs">Claude Design announcement</a>.
				The announcement note: "Over the coming weeks, we'll make it easier to
				build integrations with Claude Design."
			</li>
			<li>
				<strong>Workaround</strong>: when you need Dashbook context inside a
				design session, generate the assets in Claude Code (using the plugin) and
				paste / drag them into Claude Design.
			</li>
			<li>
				<strong>When it ships</strong>: this page will be updated with the
				connector / skill registration recipe for Claude Design. Subscribe to the
				Dashbook changelog to know when.
			</li>
		</ul>
	</Section>

	<Section
		label="What the plugin bundle includes"
		note="One plugin install, four artefacts."
	>
		<ul class="docs-list">
			<li>
				<strong>Skill</strong> — <code>dashbook-design-system</code>. Auto-activates
				on Dash.fi keywords (Dash.fi, dashbook, jade brand, dash card, agent
				names, partner co-branding, launch email). Routes the agent to the right
				tool namespace (product vs marketing). Includes the cross-namespace rule
				and the wordmark-is-single-source invariant.
			</li>
			<li>
				<strong>MCP server</strong> — registered at
				<code>https://dashbook.vercel.app/mcp</code>. 17 tools across
				<code>product_*</code> (components, foundations, tokens, port-to,
				page-templates, logo proxy), <code>marketing_*</code> (voice, logos,
				palette, partner kits, disclosures, card art), and shared (version,
				changelog).
			</li>
			<li>
				<strong>Boundary signals</strong> — every <code>product_*</code> tool
				description ends with a paragraph naming what the namespace does NOT
				contain ("brand wordmarks, partner logos, legal disclosures…"), pointing
				agents at the marketing namespace. Mirrored on <code>marketing_*</code>.
				Teaches the boundary at tool-discovery time even when the skill prose
				isn't loaded.
			</li>
			<li>
				<strong>Slash commands</strong> (Claude Code only):
				<ul class="docs-list nested">
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
		label="Other MCP-aware clients"
		note="The server speaks Streamable HTTP, so anything MCP-aware can point at the remote URL."
	>
		<ul class="docs-list">
			<li><strong>Cursor / Zed / Windsurf / others</strong> — each has its own MCP config file. URL is the same: <code>https://dashbook.vercel.app/mcp</code>.</li>
			<li><strong>Stdio (via npm)</strong> — <code>npx -y @dashfi/mcp-server</code>. Proxies to the same remote endpoint. Useful for environments that don't support remote MCP URLs.</li>
			<li><strong>API / Anthropic Console</strong> — workspace MCP settings on <code>console.anthropic.com</code>. Same URL. Note this is the API admin, separate from claude.ai's org admin.</li>
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
			<li>Slash commands — <code>claude-plugin/commands/</code></li>
			<li>MCP server — <code>src/lib/mcp/</code> + endpoint at <code>src/routes/mcp/+server.ts</code></li>
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

	.aside {
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		margin-top: 16px;
	}

	.aside a,
	.docs-list a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.matrix {
		overflow-x: auto;
		margin-top: 12px;
	}

	.matrix table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}

	.matrix th,
	.matrix td {
		text-align: left;
		padding: 10px 12px;
		border-bottom: 1px solid var(--border);
		vertical-align: top;
	}

	.matrix th {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-muted);
		background: var(--bg-muted);
	}

	.matrix td:first-child {
		min-width: 180px;
	}

	.muted {
		color: var(--fg-muted);
		font-size: 11px;
	}

	.matrix-note {
		margin-top: 16px;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 720px;
	}

	.docs-list.nested {
		margin-top: 6px;
		padding-left: 16px;
	}
</style>
