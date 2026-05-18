/**
 * Internal-login form handler. Validates the team passphrase and sets the
 * `dashbook_internal` cookie on success, then redirects to the original page.
 *
 * See src/lib/server/internal-auth.ts.
 */

import { fail, redirect } from '@sveltejs/kit';
import { checkPassphrase, setInternalCookie } from '$lib/server/internal-auth';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

function safeReturn(raw: string | null | undefined): string {
	if (!raw) return '/';
	// Only allow same-app paths. Block protocol-relative // and absolute URLs.
	if (!raw.startsWith('/') || raw.startsWith('//')) return '/';
	return raw;
}

export const load: PageServerLoad = ({ url }) => {
	return {
		returnTo: safeReturn(url.searchParams.get('return'))
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const passphrase = String(data.get('passphrase') ?? '');
		const returnTo = safeReturn(String(data.get('returnTo') ?? '/'));

		if (!passphrase) {
			return fail(400, { error: 'Passphrase required.', returnTo });
		}

		if (!checkPassphrase(passphrase)) {
			// Constant 1.2s delay on failure to slow brute-force.
			await new Promise((resolve) => setTimeout(resolve, 1200));
			return fail(401, { error: 'Wrong passphrase.', returnTo });
		}

		setInternalCookie(cookies);
		throw redirect(303, returnTo);
	}
};
