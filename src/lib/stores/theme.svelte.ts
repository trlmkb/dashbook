/**
 * Theme runes store — tracks light | dark | system, persists to cookie + localStorage,
 * applies the `dark` class to <html> in lockstep with the inline pre-paint script
 * in app.html.
 */

import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

const COOKIE = 'dashbook-theme';
const STORAGE = 'dashbook-theme';
const ONE_YEAR = 60 * 60 * 24 * 365;

function readInitial(): Theme {
	if (!browser) return 'system';
	const stored = localStorage.getItem(STORAGE);
	if (stored === 'light' || stored === 'dark') return stored;
	return 'system';
}

function resolve(theme: Theme): 'light' | 'dark' {
	if (theme !== 'system') return theme;
	if (!browser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(resolved: 'light' | 'dark') {
	if (!browser) return;
	document.documentElement.classList.toggle('dark', resolved === 'dark');
	document.documentElement.style.colorScheme = resolved;
}

function persist(theme: Theme) {
	if (!browser) return;
	if (theme === 'system') {
		localStorage.removeItem(STORAGE);
		document.cookie = `${COOKIE}=; max-age=0; path=/; SameSite=Lax`;
	} else {
		localStorage.setItem(STORAGE, theme);
		document.cookie = `${COOKIE}=${theme}; max-age=${ONE_YEAR}; path=/; SameSite=Lax`;
	}
}

class ThemeStore {
	#theme = $state<Theme>(readInitial());
	#resolved = $state<'light' | 'dark'>(resolve(this.#theme));

	constructor() {
		if (browser) {
			// Re-resolve when system preference changes and user is on 'system'.
			const mql = window.matchMedia('(prefers-color-scheme: dark)');
			mql.addEventListener('change', () => {
				if (this.#theme === 'system') {
					this.#resolved = resolve(this.#theme);
					apply(this.#resolved);
				}
			});
		}
	}

	get theme(): Theme {
		return this.#theme;
	}

	get resolved(): 'light' | 'dark' {
		return this.#resolved;
	}

	set(next: Theme) {
		this.#theme = next;
		this.#resolved = resolve(next);
		apply(this.#resolved);
		persist(next);
	}

	cycle() {
		const order: Theme[] = ['light', 'dark', 'system'];
		const idx = order.indexOf(this.#theme);
		this.set(order[(idx + 1) % order.length]);
	}
}

export const theme = new ThemeStore();
