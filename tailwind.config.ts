// Tailwind v4 configuration is primarily expressed via the `@theme` directive
// in `src/app.css`. This file exists only to scope content for Svelte tooling
// and to satisfy editor extensions that expect a config file at the project root.
import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{html,js,svelte,svx,md,ts}']
};

export default config;
