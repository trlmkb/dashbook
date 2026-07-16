/**
 * @dashfi/mcp-server — Dashbook design-system MCP.
 *
 * Exposes the Dashbook component specs, foundations tokens, and marketing
 * assets as MCP tools so any Claude session can build Dash.fi UIs against
 * the canonical brand spec.
 *
 * Tool namespaces:
 * - Product   — components, foundations, tokens. Jade-brand product surfaces.
 * - Marketing — logo/voice/palette/partners/legal. Cobalt-accent marketing
 *               surfaces.
 * - Shared    — version + changelog (no namespace prefix).
 *
 * Manual invocation pattern:
 *   "Use the Dashbook product design system" → product tools
 *   "Use the Dashbook marketing design system" → marketing tools
 *
 * Tool names are prefixed so an agent can disambiguate at-a-glance:
 *   product_list_components / product_get_component / ...
 *   marketing_get_logo / marketing_get_brand_voice / ...
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerProductTools } from './tools/product.js';
import { registerMarketingTools } from './tools/marketing.js';
import { registerSharedTools } from './tools/shared.js';
import { registerDashbookResources } from './resources.js';

export const SERVER_NAME = 'dashbook';
// Tracks the @dashfi/mcp-server package version; surfaced by serverInfo, the
// `version` tool, and the /.well-known/mcp-server-card.json discovery document.
export const SERVER_VERSION = '0.5.0';

/** Build a fully-configured MCP server instance. */
export function createDashbookMcpServer(): McpServer {
	const server = new McpServer(
		{ name: SERVER_NAME, version: SERVER_VERSION },
		{
			capabilities: { tools: {}, resources: {} },
			instructions: [
				'The Dashbook MCP exposes Dash.fi\'s brand & design system.',
				'',
				'Use the **product** tools (prefix `product_`) when building product UI:',
				'components, foundations, tokens, port-to-other-stacks helpers.',
				'',
				'Use the **marketing** tools (prefix `marketing_`) for brand assets:',
				'logos, voice/tone, marketing palette, partner kits, legal disclosures.',
				'',
				'When the user asks to "build a Dash.fi UI", default to product. When',
				'asked for "marketing materials", "brand kit", "partner co-branding", or',
				'"announcement email", default to marketing.'
			].join('\n')
		}
	);

	registerProductTools(server);
	registerMarketingTools(server);
	registerSharedTools(server);
	registerDashbookResources(server);

	return server;
}
