/**
 * Export helpers. The page doc IS the export format — a list of
 * {blockId, props} that maps directly onto the marketing recipe model, so a
 * developer (or a future codegen step) can assemble the real Astro page.
 *
 * JSON.stringify reads through the Svelte `$state` proxy fine (unlike
 * structuredClone), so no snapshot is needed here.
 */

import type { PageDoc } from './types';
import { getBlock } from './blocks/registry';

export function pageToJSON(doc: PageDoc): string {
	return JSON.stringify(doc, null, 2);
}

/** kebab block id → PascalCase component name (hero → Hero, stat-trio → StatTrio). */
function pascal(id: string): string {
	return id
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join('');
}

/** One prop → an Astro attribute. Strings inline; everything else in braces. */
function attr(key: string, value: unknown): string {
	if (typeof value === 'string') return `${key}="${value.replace(/"/g, '&quot;')}"`;
	if (typeof value === 'boolean') return value ? key : `${key}={false}`;
	if (typeof value === 'number') return `${key}={${value}}`;
	return `${key}={${JSON.stringify(value)}}`;
}

/**
 * Astro scaffold — maps each block to a PascalCase component invocation with the
 * edited props. Import paths + component names are placeholders for the team to
 * point at the real www.dash.fi marketing components. This is a starting point,
 * not a drop-in page.
 */
export function pageToAstro(doc: PageDoc): string {
	if (doc.sections.length === 0) return '--- ---\n\n<!-- empty page -->\n';
	const names = [...new Set(doc.sections.map((s) => pascal(s.blockId)))];
	const imports = names
		.map((n) => `  import ${n} from '@/components/marketing/${n}.astro';`)
		.join('\n');
	const body = doc.sections
		.map((s) => {
			const name = pascal(s.blockId);
			const attrs = Object.entries(s.props).map(([k, v]) => attr(k, v));
			if (attrs.length === 0) return `<${name} />`;
			return `<${name}\n${attrs.map((a) => `  ${a}`).join('\n')}\n/>`;
		})
		.join('\n\n');
	return `---\n// Component names + import paths are placeholders — point them at the\n// real www.dash.fi marketing components, and reconcile prop names.\n${imports}\n---\n\n${body}\n`;
}

/** Pick a short headline-ish value to summarize a section in the recipe. */
function headline(props: Record<string, unknown>): string {
	for (const key of ['heading', 'eyebrow', 'quote', 'title', 'name']) {
		const v = props[key];
		if (typeof v === 'string' && v.trim()) return v.trim();
	}
	return '';
}

/** Human-readable section list — quick to scan, not machine-consumed. */
export function pageToRecipe(doc: PageDoc): string {
	if (doc.sections.length === 0) return '(empty page)';
	return doc.sections
		.map((s, i) => {
			const name = getBlock(s.blockId)?.name ?? s.blockId;
			const bg = typeof s.props.background === 'string' ? ` · ${s.props.background}` : '';
			const h = headline(s.props);
			return `${i + 1}. ${name}${bg}${h ? ` — "${h}"` : ''}`;
		})
		.join('\n');
}

export function downloadText(filename: string, text: string, type = 'application/json') {
	const blob = new Blob([text], { type });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
