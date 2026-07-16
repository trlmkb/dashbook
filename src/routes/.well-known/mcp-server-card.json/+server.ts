/**
 * MCP server card — `/.well-known/mcp-server-card.json`.
 *
 * A `application/mcp-server-card+json` *document* describing the Dashbook MCP
 * server: how to connect (transport + endpoint), auth, and capabilities. The
 * ARD manifest (`/.well-known/ai-catalog.json`) points its
 * `application/mcp-server-card+json` entry at THIS document rather than at the
 * Streamable HTTP execution endpoint (`/mcp`) — per operating-model §10.4, an
 * mcp-server-card entry must resolve to a card, not the execution endpoint.
 *
 * The endpoint/documentation URLs are derived from the request origin, so the
 * card is correct on any deploy domain (dashbook.vercel.app, previews, or a
 * future custom domain) without hardcoding one.
 */

import type { RequestHandler } from './$types';
import { SERVER_NAME, SERVER_VERSION } from '$lib/mcp/server.js';

const ONE_DAY = 60 * 60 * 24;

export const GET: RequestHandler = async ({ url }) => {
	const base = url.origin;
	const card = {
		name: SERVER_NAME,
		displayName: 'Dashbook — Dash.fi design system',
		description:
			'Streamable HTTP MCP server exposing Dash.fi component specs, foundations, tokens, and marketing assets as tools and resources. No auth.',
		version: SERVER_VERSION,
		protocol: 'mcp',
		transport: {
			type: 'streamable-http',
			url: `${base}/mcp`
		},
		authentication: { type: 'none' },
		capabilities: { tools: true, resources: true, prompts: false },
		documentation: `${base}/developers/mcp`
	};
	return new Response(JSON.stringify(card, null, 2), {
		status: 200,
		headers: {
			'Content-Type': 'application/mcp-server-card+json; charset=utf-8',
			'Cache-Control': `public, max-age=${ONE_DAY}, s-maxage=${ONE_DAY}`,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS'
		}
	});
};

// Derived from the request origin — must not be prerendered to a fixed host.
export const prerender = false;
