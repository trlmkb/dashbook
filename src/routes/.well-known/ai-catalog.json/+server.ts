/**
 * Agentic Resource Discovery (ARD) manifest — `/.well-known/ai-catalog.json`.
 *
 * Lets ARD-aware agent clients discover Dashbook's callable surfaces without
 * being told about them out-of-band: the MCP server, the plain-HTTP JSON
 * API, llms.txt, and the human docs site.
 *
 * Verified against the draft ARD spec (v0.9, unstable as of 2026-07) —
 * https://github.com/ards-project/ard-spec (spec/ard.md,
 * spec/schemas/ai-catalog.schema.json) and the announcement post
 * https://developers.googleblog.com/announcing-the-agentic-resource-discovery-specification/.
 *
 * Shape used here (root): `specVersion` (required, "1.0"), `host` (optional
 * publisher metadata — `displayName` required within it), `entries`
 * (required array). Each entry: `identifier` (required, RFC 8141 URN —
 * `urn:air:<publisher>:<namespace>:<agent-name>`), `displayName` (required),
 * `type` (required — IANA media type), and exactly one of `url` / `data`,
 * plus optional `description`, `tags`, `capabilities`, `representativeQueries`.
 *
 * `application/mcp-server-card+json` is the one entry-type value the spec's
 * own examples define (called out there as a de-facto, pre-registration
 * media type). No ARD-specific media type is documented for a generic JSON
 * API, an llms.txt file, or a human docs site, so those three entries use
 * plain, already-registered IANA media types (`application/json`,
 * `text/plain`, `text/html`) instead of guessing at spec-specific ones —
 * see the PR body for the same note.
 *
 * `trustManifest` is omitted — Dashbook has no signing/attestation identity
 * to declare, and the field is optional.
 */

import type { RequestHandler } from './$types';

const ONE_DAY = 60 * 60 * 24;
const DOCS_BASE = 'https://dashbook.vercel.app';

const manifest = {
	specVersion: '1.0',
	host: {
		displayName: 'Dashbook — Dash.fi design system',
		documentationUrl: `${DOCS_BASE}/developers/mcp`
	},
	entries: [
		{
			identifier: 'urn:air:dash.fi:dashbook:mcp-server',
			displayName: 'Dashbook MCP server',
			type: 'application/mcp-server-card+json',
			url: `${DOCS_BASE}/.well-known/mcp-server-card.json`,
			description:
				'Server card for the Dashbook MCP server (Streamable HTTP, no auth) — exposes Dash.fi component specs, foundations, tokens, and marketing assets as tools and resources. The card carries the connect endpoint and capabilities.',
			tags: ['design-system', 'brand', 'dash.fi', 'mcp'],
			representativeQueries: [
				'build a Dash.fi UI component',
				'get the Dash.fi brand voice rules',
				'fetch the Dash.fi wordmark SVG'
			]
		},
		{
			identifier: 'urn:air:dash.fi:dashbook:json-api',
			displayName: 'Dashbook JSON API',
			type: 'application/json',
			url: `${DOCS_BASE}/api/components.json`,
			description:
				'CORS-open, no-auth JSON endpoints mirroring the MCP tool responses, for clients without MCP support. Root catalogue at /api/components.json; see /developers/mcp for the full endpoint list.',
			tags: ['design-system', 'brand', 'dash.fi']
		},
		{
			identifier: 'urn:air:dash.fi:dashbook:llms-txt',
			displayName: 'Dashbook llms.txt',
			type: 'text/plain',
			url: `${DOCS_BASE}/llms.txt`,
			description: 'llms.txt index of Dashbook surfaces for LLM context loading.',
			tags: ['design-system', 'dash.fi']
		},
		{
			identifier: 'urn:air:dash.fi:dashbook:docs',
			displayName: 'Dashbook docs site',
			type: 'text/html',
			url: DOCS_BASE,
			description: 'Human-readable component, foundation, and brand documentation.',
			tags: ['design-system', 'brand', 'dash.fi']
		}
	]
};

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify(manifest, null, 2), {
		status: 200,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': `public, max-age=${ONE_DAY}, s-maxage=${ONE_DAY}`,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS'
		}
	});
};

export const prerender = true;
