import { describe, expect, test } from 'vitest';
import { getComponentImplementation, importPathOnly } from '../../src/lib/specs/implementation.js';

describe('component implementation routing', () => {
	test('requires the exact shared import for Svelte components', () => {
		const importStatement = "import { Button } from '@dashfi/svelte/ui/button'";
		const implementation = getComponentImplementation({
			slug: 'button',
			name: 'Button',
			importPath: importStatement,
			canonicalSource: 'libs/svelte-components/lib/src/lib/ui/button/'
		});

		expect(implementation).toMatchObject({
			kind: 'shared-svelte-component',
			reusePolicy: 'required-in-svelte',
			package: '@dashfi/svelte',
			importPath: '@dashfi/svelte/ui/button',
			importStatement,
			nonSvelteFallback: { action: 'port', tool: 'product_port_to' }
		});
	});

	test('keeps composed chrome entries as reference guidance', () => {
		const importPath = '// Resolved via marketing_get_logo({ variant: "wordmark" })';
		expect(
			getComponentImplementation({
				slug: 'wordmark',
				name: 'Wordmark',
				importPath,
				canonicalSource: 'src/lib/chrome/logo-sources.ts'
			})
		).toMatchObject({
			kind: 'dashbook-scaffold',
			reusePolicy: 'reference-guidance',
			importPath
		});
	});

	test('extracts the package path from multi-symbol imports', () => {
		expect(
			importPathOnly("import { Pagination, PaginationLink } from '@dashfi/svelte/ui/pagination'")
		).toBe('@dashfi/svelte/ui/pagination');
	});
});
