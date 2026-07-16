/**
 * Value resolvers — turn Tailwind utility classes / CSS custom properties into
 * the concrete values a spec records: resolved light/dark hex, and geometry.
 *
 * The lib theme sheet (`@dashfi/svelte/dist/styles/global.css`) stores colours
 * as space-separated HSL triples under `:root` (light) and `.dark` (dark), e.g.
 * `--primary: 67 13% 13%`. A utility like `bg-primary` renders as
 * `hsl(var(--primary))`, so the engine reports what actually paints. Because the
 * lib rounds design-intent hex into HSL, the rendered hex can differ by 1-3 per
 * channel from the hex a human recorded — see `hexWithinTolerance`.
 */

/** Resolved value of a token per theme (matches the spec's TokenRef shape). */
export type TokenRef = {
	cssVar: string;
	light: string;
	dark: string;
};

/** token-name (no leading `--`) → raw declared value per theme. */
export type TokenSheet = Record<string, { light: string; dark: string }>;

const HSL_TRIPLE = /^(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/;

/** Convert a space-separated HSL triple (`"67 13% 13%"`) to `#rrggbb`. */
export function hslTripleToHex(triple: string): string {
	const m = triple.trim().match(HSL_TRIPLE);
	if (!m) throw new Error(`not an HSL triple: ${JSON.stringify(triple)}`);
	const h = Number(m[1]);
	const s = Number(m[2]) / 100;
	const l = Number(m[3]) / 100;

	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m0 = l - c / 2;

	let r = 0;
	let g = 0;
	let b = 0;
	if (h < 60) [r, g, b] = [c, x, 0];
	else if (h < 120) [r, g, b] = [x, c, 0];
	else if (h < 180) [r, g, b] = [0, c, x];
	else if (h < 240) [r, g, b] = [0, x, c];
	else if (h < 300) [r, g, b] = [x, 0, c];
	else [r, g, b] = [c, 0, x];

	const hex = (v: number) =>
		Math.round((v + m0) * 255)
			.toString(16)
			.padStart(2, '0');
	return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/** Extract the `{ ... }` body of the first `selector { ... }` block, brace-matched. */
function extractBlock(css: string, selector: string): string | null {
	const at = css.indexOf(selector);
	if (at === -1) return null;
	const open = css.indexOf('{', at);
	if (open === -1) return null;
	let depth = 0;
	for (let i = open; i < css.length; i++) {
		if (css[i] === '{') depth++;
		else if (css[i] === '}') {
			depth--;
			if (depth === 0) return css.slice(open + 1, i);
		}
	}
	return null;
}

function declarations(block: string): Record<string, string> {
	const out: Record<string, string> = {};
	const re = /--([\w-]+)\s*:\s*([^;]+);/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(block)) !== null) {
		out[m[1] as string] = (m[2] as string).trim();
	}
	return out;
}

/** Parse a lib theme sheet into a token → {light, dark} map. Dark falls back to light. */
export function parseTokenSheet(css: string): TokenSheet {
	const light = declarations(extractBlock(css, ':root') ?? '');
	const dark = declarations(extractBlock(css, '.dark') ?? '');
	const sheet: TokenSheet = {};
	for (const name of new Set([...Object.keys(light), ...Object.keys(dark)])) {
		const l = light[name] ?? dark[name];
		if (l === undefined) continue;
		sheet[name] = { light: l, dark: dark[name] ?? l };
	}
	return sheet;
}

/** Render a raw declared value (HSL triple or hex) to hex; null if not a flat colour. */
export function renderValue(raw: string): string | null {
	if (/^#[0-9a-fA-F]{3,8}$/.test(raw)) return raw.toLowerCase();
	if (HSL_TRIPLE.test(raw)) return hslTripleToHex(raw);
	return null; // gradients, rgba(), var() chains — decline, keep as prose
}

// Colour-bearing Tailwind prefixes. Longer prefixes first so `ring-offset` wins over `ring`.
const COLOUR_PREFIXES = [
	'ring-offset',
	'bg',
	'text',
	'border',
	'ring',
	'fill',
	'stroke',
	'outline',
	'accent',
	'caret',
	'decoration',
	'placeholder',
	'from',
	'via',
	'to',
	'divide'
];

/**
 * Resolve a single utility class to a TokenRef, or null when it does not map to
 * a flat design token (transparent, arbitrary Tailwind palette, non-colour
 * utilities, gradients). Returning null is deliberate — those stay prose.
 */
export function resolveUtility(className: string, sheet: TokenSheet): TokenRef | null {
	// Strip Tailwind modifiers (`hover:`, `data-[state=open]:`) and important
	// markers. Alpha utilities deliberately stay verify-only: flattening
	// `bg-brand/10` to the opaque brand hex would be a confident wrong answer.
	const utility = className.split(':').at(-1)?.replace(/^!/, '') ?? className;
	if (utility.includes('/')) return null;
	const prefix = COLOUR_PREFIXES.find((p) => utility.startsWith(`${p}-`));
	if (!prefix) return null;
	const token = utility.slice(prefix.length + 1);
	const entry = sheet[token];
	if (!entry) return null;
	const light = renderValue(entry.light);
	const dark = renderValue(entry.dark);
	if (light === null || dark === null) return null;
	return { cssVar: `--color-${token}`, light, dark };
}

/** Resolve one CSS variable recorded by a spec against the lib token sheet. */
export function resolveCssVar(cssVar: string, sheet: TokenSheet): TokenRef | null {
	const token = cssVar.replace(/^--color-/, '').replace(/^--/, '');
	const entry = sheet[token];
	if (!entry) return null;
	const light = renderValue(entry.light);
	const dark = renderValue(entry.dark);
	if (light === null || dark === null) return null;
	return { cssVar, light, dark };
}

function hexToRgb(hex: string): [number, number, number] {
	const h = hex.replace('#', '');
	const n =
		h.length === 3
			? h
					.split('')
					.map((c) => c + c)
					.join('')
			: h;
	return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
}

/**
 * True when two hex colours are within per-channel tolerance. The lib rounds
 * design-intent hex through HSL, so the rendered hex drifts 1-3 per channel from
 * an author-recorded hex; that is not real drift. A genuine colour change moves
 * well beyond the tolerance.
 */
export function hexWithinTolerance(a: string, b: string, tolerance = 6): boolean {
	const [r1, g1, b1] = hexToRgb(a);
	const [r2, g2, b2] = hexToRgb(b);
	return (
		Math.abs(r1 - r2) <= tolerance &&
		Math.abs(g1 - g2) <= tolerance &&
		Math.abs(b1 - b2) <= tolerance
	);
}
