import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.md']
		})
	],
	kit: {
		adapter: adapter({
			fallback: 'index.html',
			strict: false
		}),
		alias: {
			$chrome: 'src/lib/chrome',
			$content: 'src/lib/content'
		},
		prerender: {
			handleHttpError: ({ path, referrer, status }) => {
				// Deliberate broken-image demo on /components/avatar.
				if (path === '/intentionally-missing.jpg') return;
				// Intra-app pages we link to from previews but haven't built yet.
				if (status === 404) {
					// eslint-disable-next-line no-console
					console.warn(`prerender 404 ${path} (from ${referrer ?? 'unknown'})`);
					return;
				}
				throw new Error(`${status} ${path}`);
			}
		}
	}
};

export default config;
