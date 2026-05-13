/**
 * Dashbook MCP endpoint — Streamable HTTP transport.
 *
 * Stateless: every request spins up a fresh MCP server + transport, handles
 * the request, and returns. No session state is retained between requests.
 *
 * For local development the endpoint lives at http://localhost:5173/mcp.
 * Once deployed to Vercel, it's at https://dashbook.vercel.app/mcp.
 *
 * Both GET and POST are accepted — the transport handles SSE upgrade
 * negotiation internally based on the `Accept: text/event-stream` header.
 */

import type { RequestHandler } from './$types';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createDashbookMcpServer } from '$lib/mcp/server.js';

const corsHeaders: Record<string, string> = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization, Mcp-Session-Id',
	'Access-Control-Expose-Headers': 'Mcp-Session-Id'
};

async function handle(request: Request): Promise<Response> {
	const server = createDashbookMcpServer();
	const transport = new WebStandardStreamableHTTPServerTransport({});
	await server.connect(transport);

	const response = await transport.handleRequest(request);

	// Layer CORS headers on top of the transport's response.
	const headers = new Headers(response.headers);
	for (const [k, v] of Object.entries(corsHeaders)) headers.set(k, v);

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}

export const GET: RequestHandler = ({ request }) => handle(request);
export const POST: RequestHandler = ({ request }) => handle(request);

export const OPTIONS: RequestHandler = () =>
	new Response(null, { status: 204, headers: corsHeaders });

/**
 * Don't prerender the MCP endpoint — it's dynamic.
 */
export const prerender = false;
