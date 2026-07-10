/**
 * Origin validation for the public `/mcp` endpoint.
 *
 * The server is stateless, read-only, and unauthenticated by design — this
 * is not an auth boundary. It exists to future-proof against DNS-rebinding
 * style requests from a browser context that shouldn't be talking to this
 * endpoint, per the MCP transport security guidance to validate `Origin` on
 * HTTP transports. Non-browser clients (curl, MCP inspector, server-to-
 * server callers) never send an `Origin` header, so the allowlist only
 * matters for browser-originated requests.
 */

/** Origins allowed to call the `/mcp` endpoint from a browser context. */
const ALLOWED_ORIGIN_PATTERNS: RegExp[] = [
	/^https:\/\/dashbook\.vercel\.app$/,
	/^https:\/\/([a-z0-9-]+\.)*claude\.ai$/,
	/^https:\/\/([a-z0-9-]+\.)*claude\.com$/,
	// Local development.
	/^https?:\/\/localhost(:\d+)?$/,
	/^https?:\/\/127\.0\.0\.1(:\d+)?$/
];

/**
 * True if the request should be allowed through.
 *
 * - No `Origin` header at all → allow (non-browser client; same-origin
 *   requests and most HTTP libraries omit it).
 * - `Origin` present → allow only if it matches the allowlist.
 */
export function isAllowedOrigin(origin: string | null): boolean {
	if (origin === null) return true;
	return ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}
