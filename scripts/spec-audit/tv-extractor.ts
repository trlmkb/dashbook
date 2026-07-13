/**
 * tv() extractor — parses `tailwind-variants` configs into structured blocks.
 *
 * Handles both `.ts` sources (badge puts `tv()` in `index.ts`) and `.svelte`
 * sources (button/alert define it in a `<script module>` block). A component can
 * declare more than one (switch: track + thumb). Only string-literal class
 * values are extracted; anything computed is skipped so it can be flagged
 * verify-only rather than silently mis-generated.
 */
import ts from 'typescript';

export type TvBlock = {
	name: string;
	base?: string;
	variants: Record<string, Record<string, string>>;
	defaultVariants: Record<string, string>;
};

/** Concatenate the contents of every <script> block in a .svelte file. */
function scriptBodies(source: string): string {
	const re = /<script[^>]*>([\s\S]*?)<\/script>/g;
	const parts: string[] = [];
	let m: RegExpExecArray | null;
	while ((m = re.exec(source)) !== null) parts.push(m[1] as string);
	return parts.join('\n');
}

function literalValue(node: ts.Expression): string | null {
	if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
	return null;
}

/** Flat object literal → { key: stringValue } for string-literal values only. */
function flatStringObject(node: ts.ObjectLiteralExpression): Record<string, string> {
	const out: Record<string, string> = {};
	for (const prop of node.properties) {
		if (!ts.isPropertyAssignment(prop)) continue;
		const key = propName(prop.name);
		if (key === null) continue;
		const val = literalValue(prop.initializer);
		if (val !== null) out[key] = val;
	}
	return out;
}

function propName(name: ts.PropertyName): string | null {
	if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
	return null;
}

function findProp(obj: ts.ObjectLiteralExpression, key: string): ts.Expression | undefined {
	for (const prop of obj.properties) {
		if (ts.isPropertyAssignment(prop) && propName(prop.name) === key) return prop.initializer;
	}
	return undefined;
}

function parseTvArg(name: string, arg: ts.ObjectLiteralExpression): TvBlock {
	const block: TvBlock = { name, variants: {}, defaultVariants: {} };

	const base = findProp(arg, 'base');
	if (base) {
		const v = literalValue(base);
		if (v !== null) block.base = v;
	}

	const variants = findProp(arg, 'variants');
	if (variants && ts.isObjectLiteralExpression(variants)) {
		for (const axis of variants.properties) {
			if (!ts.isPropertyAssignment(axis)) continue;
			const axisName = propName(axis.name);
			if (axisName === null || !ts.isObjectLiteralExpression(axis.initializer)) continue;
			block.variants[axisName] = flatStringObject(axis.initializer);
		}
	}

	const defaults = findProp(arg, 'defaultVariants');
	if (defaults && ts.isObjectLiteralExpression(defaults)) {
		block.defaultVariants = flatStringObject(defaults);
	}

	return block;
}

/** Extract every `const NAME = tv({ ... })` block from .ts or .svelte source. */
export function extractTvBlocks(source: string): TvBlock[] {
	const code = source.includes('<script') ? scriptBodies(source) : source;
	const sf = ts.createSourceFile('component.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
	const blocks: TvBlock[] = [];

	const visit = (node: ts.Node): void => {
		if (
			ts.isVariableDeclaration(node) &&
			ts.isIdentifier(node.name) &&
			node.initializer &&
			ts.isCallExpression(node.initializer) &&
			ts.isIdentifier(node.initializer.expression) &&
			node.initializer.expression.text === 'tv'
		) {
			const arg = node.initializer.arguments[0];
			if (arg && ts.isObjectLiteralExpression(arg)) {
				blocks.push(parseTvArg(node.name.text, arg));
			}
		}
		ts.forEachChild(node, visit);
	};
	visit(sf);
	return blocks;
}
