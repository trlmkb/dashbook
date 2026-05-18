/**
 * Reactive client-side flag for "this browser has an internal session".
 *
 * The real auth cookie (`dashbook_internal`) is `httpOnly` so JS can't read it.
 * On successful login the server ALSO sets a non-httpOnly companion cookie
 * (`dashbook_internal_ui=1`) — purely a UI hint with no security value. This
 * module reads that companion cookie on client mount and exposes a reactive
 * boolean any chrome component can subscribe to.
 *
 * Why a separate cookie at all: the static pages are prerendered, so the nav
 * HTML is baked at build time and can't differ per-visitor. We let the page
 * ship with the "public" nav, then on hydration we flip a flag if the user
 * is signed in and the nav reveals the internal items.
 *
 * Server-side gating still happens via `guardInternal()` — this flag only
 * affects what the client RENDERS, not what it can ACCESS.
 */

const UI_COOKIE_NAME = 'dashbook_internal_ui';

class InternalState {
	isInternal = $state(false);

	/** Read the UI hint cookie. Safe to call before/after hydration. */
	refresh() {
		if (typeof document === 'undefined') return;
		this.isInternal = document.cookie
			.split(';')
			.map((c) => c.trim())
			.some((c) => c.startsWith(`${UI_COOKIE_NAME}=`));
	}
}

export const internalState = new InternalState();
