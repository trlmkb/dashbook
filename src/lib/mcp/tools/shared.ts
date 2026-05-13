/**
 * Shared tools — non-namespaced. Available regardless of product/marketing context.
 */

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SERVER_VERSION } from '../server.js';

function json(value: unknown): { content: { type: 'text'; text: string }[] } {
	return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] };
}

const DOCS_BASE = 'https://dashbook.vercel.app';

export function registerSharedTools(server: McpServer): void {
	server.registerTool(
		'version',
		{
			title: 'Dashbook MCP server version',
			description: 'Returns the version of the MCP server and the docs site it points at.',
			inputSchema: {}
		},
		async () => {
			return json({
				mcpServer: SERVER_VERSION,
				docs: DOCS_BASE,
				canonicalLib: '@dashfi/svelte (branch: EN-XX/design-vnext--sidebar-feature)'
			});
		}
	);

	server.registerTool(
		'changelog',
		{
			title: 'Recent changes to the Dashbook design system',
			description:
				'Returns the most recent changelog entries from the docs site. Use to see what shifted in components, foundations, or marketing assets recently.',
			inputSchema: {}
		},
		async () => {
			return json({
				note: 'Full changelog at /changelog. Per-component changelogs at /components/<slug> → Changelog tab.',
				docs: `${DOCS_BASE}/changelog`,
				recent: [
					{
						date: '2026-05-13',
						note: 'Full-library v0.3.2 anatomy regeneration against the EN-XX/design-vnext--sidebar-feature branch. Input became underline-only; Button secondary became cobalt; Card became zero-chrome.'
					},
					{
						date: '2026-05-13',
						note: 'Added /developers/from-another-stack — stack-agnostic consumption guide.'
					},
					{
						date: '2026-05-11',
						note: 'v0.9.0 release cut. Landing page redesign.'
					}
				]
			});
		}
	);
}
