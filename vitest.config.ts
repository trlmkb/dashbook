import { defineConfig } from 'vitest/config';

// Isolated config for the spec-audit engine. Deliberately does NOT load the
// SvelteKit plugin — the engine is a plain Node/TS tool that reads source
// files, so its tests run in a node environment with no app bundling.
export default defineConfig({
	test: {
		include: ['scripts/spec-audit/**/*.test.ts'],
		environment: 'node'
	}
});
