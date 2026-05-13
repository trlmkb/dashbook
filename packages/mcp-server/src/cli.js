#!/usr/bin/env node
/**
 * @dashfi/mcp-server CLI — stdio adapter that proxies to the remote Dashbook MCP.
 *
 * Run by Claude Desktop / Claude Code via `npx -y @dashfi/mcp-server`. The
 * client speaks MCP over stdio; this process forwards each message to the
 * remote endpoint at https://dashbook.vercel.app/mcp and streams the response
 * back.
 *
 * Why proxy instead of running the server locally?
 *
 * The Dashbook MCP is a thin shell over the typed spec modules, which live
 * inside the dashbook repo. Bundling those into a published npm package
 * would couple the package version to every docs-side spec edit. Proxying
 * keeps the package small (~2 KB) and the docs site always-current.
 *
 * For local development against an unpublished branch, set:
 *   DASHBOOK_MCP_URL=http://localhost:5173/mcp npx @dashfi/mcp-server
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

const REMOTE_URL = process.env.DASHBOOK_MCP_URL ?? 'https://dashbook.vercel.app/mcp';

/**
 * Build a passthrough server that forwards every JSON-RPC message to the
 * remote endpoint via the SDK's HTTP client.
 */
async function main() {
	const client = new Client(
		{ name: 'dashbook-mcp-proxy', version: '0.1.0' },
		{ capabilities: { tools: {}, resources: {}, prompts: {} } }
	);

	const httpTransport = new StreamableHTTPClientTransport(new URL(REMOTE_URL));
	await client.connect(httpTransport);

	// Pull the server's capability descriptors so the local stdio server can
	// advertise the same surface.
	const initResult = client.getServerVersion();

	const stdioServer = new Server(
		initResult ?? { name: 'dashbook', version: '0.1.0' },
		{ capabilities: { tools: {}, resources: {}, prompts: {} } }
	);

	// Forward every tool list + tool call to the remote.
	stdioServer.setRequestHandler({ method: 'tools/list' }, async (req) => {
		return client.listTools(req.params);
	});

	stdioServer.setRequestHandler({ method: 'tools/call' }, async (req) => {
		return client.callTool(req.params);
	});

	stdioServer.setRequestHandler({ method: 'resources/list' }, async (req) => {
		return client.listResources(req.params);
	});

	stdioServer.setRequestHandler({ method: 'resources/read' }, async (req) => {
		return client.readResource(req.params);
	});

	stdioServer.setRequestHandler({ method: 'prompts/list' }, async (req) => {
		return client.listPrompts(req.params);
	});

	stdioServer.setRequestHandler({ method: 'prompts/get' }, async (req) => {
		return client.getPrompt(req.params);
	});

	const stdio = new StdioServerTransport();
	await stdioServer.connect(stdio);

	// Keep the process alive until stdin closes.
	process.stdin.on('end', () => {
		client.close().finally(() => process.exit(0));
	});
}

main().catch((err) => {
	console.error('@dashfi/mcp-server fatal:', err);
	process.exit(1);
});
