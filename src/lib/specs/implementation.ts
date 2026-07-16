type ImplementationSource = {
	slug: string;
	name: string;
	importPath: string;
	canonicalSource: string;
};

export type ComponentImplementation =
	| {
			kind: 'shared-svelte-component';
			reusePolicy: 'required-in-svelte';
			package: '@dashfi/svelte';
			importPath: string;
			importStatement: string;
			canonicalSource: string;
			handoffDirective: string;
			nonSvelteFallback: {
				action: 'port';
				tool: 'product_port_to';
				instruction: string;
			};
	  }
	| {
			kind: 'dashbook-scaffold';
			reusePolicy: 'reference-guidance';
			importPath: string;
			canonicalSource: string;
			handoffDirective: string;
	  };

/** Strip the `import { X } from 'Y'` wrapper down to just `Y`. */
export function importPathOnly(importStatement: string): string {
	return importStatement.replace(/^import .+ from '/, '').replace(/'$/, '');
}

/**
 * Machine-readable routing carried beside anatomy through Design → Code handoff.
 * Anatomy describes what the component looks like; this tells the receiver
 * whether to import the production implementation or port the anatomy.
 */
export function getComponentImplementation(spec: ImplementationSource): ComponentImplementation {
	const importPath = importPathOnly(spec.importPath);
	if (importPath.startsWith('@dashfi/svelte/')) {
		return {
			kind: 'shared-svelte-component',
			reusePolicy: 'required-in-svelte',
			package: '@dashfi/svelte',
			importPath,
			importStatement: spec.importPath,
			canonicalSource: spec.canonicalSource,
			handoffDirective: `Svelte/SvelteKit: import ${spec.name} from the shared library using the exact importStatement. Do not recreate it from anatomy HTML, generated CSS, or screenshots.`,
			nonSvelteFallback: {
				action: 'port',
				tool: 'product_port_to',
				instruction:
					'For React, React Native, Vue, or plain HTML/CSS, port the anatomy with product_port_to because @dashfi/svelte is not a cross-framework runtime.'
			}
		};
	}

	return {
		kind: 'dashbook-scaffold',
		reusePolicy: 'reference-guidance',
		importPath,
		canonicalSource: spec.canonicalSource,
		handoffDirective:
			'This entry is composed guidance rather than an @dashfi/svelte export. Follow its canonical example and referenced Dashbook asset tools.'
	};
}

/** Add routing metadata without mutating the canonical hand-authored spec. */
export function withComponentImplementation<T extends ImplementationSource>(
	spec: T
): T & {
	implementation: ComponentImplementation;
} {
	return { ...spec, implementation: getComponentImplementation(spec) };
}
