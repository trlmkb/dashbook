import type { Handle } from '@sveltejs/kit';

const THEME_COOKIE = 'dashbook-theme';

export const handle: Handle = async ({ event, resolve }) => {
	const stored = event.cookies.get(THEME_COOKIE);
	const theme = stored === 'light' || stored === 'dark' ? stored : 'system';
	event.locals.theme = theme;

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			// Render the stored theme class on <html> server-side when the user has
			// an explicit choice; 'system' resolves on the client via the inline
			// pre-paint script in app.html.
			const themeAttr = theme === 'dark' ? ' class="dark"' : '';
			return html.replace('%sveltekit.theme%', themeAttr);
		}
	});
};
