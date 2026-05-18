/**
 * Gate /patterns/* to dashfi-internal viewers. See src/lib/server/internal-auth.ts.
 * `prerender = false` so SvelteKit runs this server load on every request.
 */
import { guardInternal } from '$lib/server/internal-auth';

export const prerender = false;
export const load = guardInternal;
