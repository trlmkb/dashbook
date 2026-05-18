/**
 * Internal-section gate (shared-passphrase + HMAC-signed cookie).
 *
 * Three routes are gated to dashfi-internal viewers:
 *   /components/*  /patterns/*  /developers/*
 *
 * A `+layout.server.ts` in each directory calls `guardInternal()`.
 * When the cookie is missing or expired, the user is redirected to
 * `/internal-login?return=<path>`. After they enter the team passphrase,
 * a signed cookie is set for 90 days and they bounce back to the page
 * they originally asked for.
 *
 * Why shared-passphrase (not Vercel Authentication): Vercel's Deployment
 * Protection is a paid feature. This is the free, identity-less alternative.
 * Rotate the passphrase in Vercel env vars if it leaks.
 *
 * Env vars (set in Vercel dashboard + .env.local for dev):
 *   DASHBOOK_INTERNAL_PASSPHRASE — the secret string visitors type
 *   DASHBOOK_INTERNAL_SECRET     — random key used to HMAC-sign the cookie
 *
 * `$env/dynamic/private` (not static) so the build doesn't fail when env
 * vars are missing — the guard surfaces a 500 only when someone tries to
 * sign in or load a gated route without config.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';
import { redirect, type Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const COOKIE_NAME = 'dashbook_internal';
const UI_COOKIE_NAME = 'dashbook_internal_ui';
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60; // 90 days

function requireSecret(): string {
	const secret = env.DASHBOOK_INTERNAL_SECRET;
	if (!secret || secret.length < 16) {
		throw new Error(
			'DASHBOOK_INTERNAL_SECRET is not set (or is shorter than 16 chars). Set it in Vercel env vars and .env.local.'
		);
	}
	return secret;
}

function requirePassphrase(): string {
	const pass = env.DASHBOOK_INTERNAL_PASSPHRASE;
	if (!pass) {
		throw new Error('DASHBOOK_INTERNAL_PASSPHRASE is not set. Set it in Vercel env vars and .env.local.');
	}
	return pass;
}

function sign(payload: string): string {
	return createHmac('sha256', requireSecret()).update(payload).digest('hex');
}

function safeEqualStrings(a: string, b: string): boolean {
	const ab = Buffer.from(a);
	const bb = Buffer.from(b);
	if (ab.length !== bb.length) return false;
	return timingSafeEqual(ab, bb);
}

/** True if the visitor has a valid, unexpired internal cookie. */
export function cookieIsValid(cookies: Cookies): boolean {
	const raw = cookies.get(COOKIE_NAME);
	if (!raw) return false;
	const dot = raw.indexOf('.');
	if (dot < 1) return false;
	const expiresAtStr = raw.slice(0, dot);
	const sig = raw.slice(dot + 1);
	const expiresAt = Number(expiresAtStr);
	if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
	try {
		return safeEqualStrings(sign(expiresAtStr), sig);
	} catch {
		// Secret missing — fail closed.
		return false;
	}
}

/** Set the internal cookie. Call after a successful passphrase check. */
export function setInternalCookie(cookies: Cookies): void {
	const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
	const value = `${expiresAt}.${sign(String(expiresAt))}`;
	cookies.set(COOKIE_NAME, value, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: MAX_AGE_SECONDS
	});
	setUiCookie(cookies);
}

/**
 * Set the non-httpOnly UI hint cookie. JS reads this to decide whether to
 * render the internal nav items + populate the ⌘K palette with internal
 * entries. NO security value — actual access is gated server-side.
 */
function setUiCookie(cookies: Cookies): void {
	cookies.set(UI_COOKIE_NAME, '1', {
		path: '/',
		httpOnly: false,
		secure: true,
		sameSite: 'lax',
		maxAge: MAX_AGE_SECONDS
	});
}

/** Constant-time passphrase check against the configured env var. */
export function checkPassphrase(input: string): boolean {
	try {
		return safeEqualStrings(input, requirePassphrase());
	} catch {
		return false;
	}
}

/**
 * Use as the `load` function in a protected `+layout.server.ts`. Redirects
 * unauthenticated visitors to `/internal-login` with a return-to query.
 * Also refreshes the UI hint cookie so authed visitors who landed before this
 * feature shipped pick up the hint on their next gated-page load.
 */
export function guardInternal(event: { cookies: Cookies; url: URL }) {
	if (!cookieIsValid(event.cookies)) {
		const returnTo = event.url.pathname + event.url.search;
		throw redirect(303, `/internal-login?return=${encodeURIComponent(returnTo)}`);
	}
	if (!event.cookies.get(UI_COOKIE_NAME)) {
		setUiCookie(event.cookies);
	}
	return {};
}
