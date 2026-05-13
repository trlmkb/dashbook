import adapter from '@sveltejs/adapter-vercel';
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
		// adapter-vercel keeps prerendered pages static and only spins up a
		// Vercel function for routes that opt out — currently just `/mcp`.
		adapter: adapter({
			runtime: 'nodejs22.x'
		}),
		alias: {
			$chrome: 'src/lib/chrome',
			$content: 'src/lib/content',
			$specs: 'src/lib/specs'
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
