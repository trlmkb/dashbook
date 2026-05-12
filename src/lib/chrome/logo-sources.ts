/**
 * SVG source generators for the Dash.fi wordmark and app icon.
 * The marks are inlined here so we can re-color them client-side and
 * rasterize them to PNG/JPG via canvas without re-fetching network assets.
 */

/* Main wordmark glyphs — every path except the `.fi` accent dot. */
const WORDMARK_MAIN = `
<path d="m0 67.2114v-18.9871c0-12.6581 10.3035-22.7886 22.8855-22.7886h9.7938l10.5533 7.0853v-32.4115h12.7119v89.8905h-33.059c-12.592 0-22.8855-10.2598-22.8855-22.7886zm22.8855 10.1305h20.3471v-29.4958l-14.4908-9.7523h-5.8463c-5.5965 0-10.1736 4.5577-10.1736 10.1305v18.9871c0 5.5728 4.5771 10.1305 10.1736 10.1305z"/>
<path d="m72.3441 67.2114v-18.9871c0-12.6582 10.3035-22.7886 22.8855-22.7886h9.7934l10.554 7.0853v-7.0853h12.712v64.5743h-33.0594c-12.592 0-22.8855-10.2599-22.8855-22.7886zm22.8855 10.1305h20.3474v-29.4958l-14.491-9.7523h-5.8464c-5.5964 0-10.1735 4.5577-10.1735 10.1305v18.9871c0 5.5728 4.5771 10.1305 10.1735 10.1305z"/>
<path d="m143.549 71.2616v-2.5277h12.712v2.5277c0 4.0502 3.308 6.9659 8.774 6.9659h11.573c5.976 0 8.904-2.4082 8.904-6.0803 0-14.31-41.064-5.0652-41.064-29.6251 0-10.2599 8.265-17.0964 20.348-17.0964h10.933c11.442 0 20.347 8.2297 20.347 18.8677v1.1444h-12.712v-1.1444c0-4.0502-3.178-7.0853-7.625-7.0853h-10.933c-5.337 0-7.626 2.1494-7.626 5.314 0 10.2598 41.064 3.8014 41.064 29.6251 0 10.638-8.774 17.8528-21.616 17.8528h-11.573c-12.332 0-21.486-7.981-21.486-18.7384z"/>
<path d="m225.817.1095v32.4115l10.553-7.0853h9.794c12.592 0 22.885 10.1305 22.885 22.7886v41.7857h-12.711v-41.7857c0-5.5728-4.578-10.1305-10.174-10.1305h-5.846l-14.491 9.7523v42.1639h-12.712v-89.9005h12.712z"/>
<path d="m349.718 0h12.083v12.6581h-12.083c-5.726 0-10.173 4.4284-10.173 10.1305v6.329h22.246v12.6582h-22.246v48.1147h-12.712v-48.1147h-17.169v-12.6582h17.169v-6.329c0-12.6581 10.173-22.7886 22.885-22.7886z"/>
<path d="m371.325 77.2325h20.986v-35.4766h-30.52v-12.6581h43.232v48.1347h20.977v12.6581h-54.675z"/>
<path d="m405.023 0h-23.175v12.887h23.175z"/>
<path d="m225.797.1095h-23.175v12.887h23.175z"/>`;

/* Accent path — the `.` dot between dash and fi in the wordmark. */
const WORDMARK_ACCENT = `<path d="m309.664 76.8046h-23.176v12.887h23.176z"/>`;

const APP_GLYPH = `<path d="m79.2812 148.527v-26.246c0-17.497 14.2764-31.4998 31.7098-31.4998h13.57l14.623 9.7938v-44.8016h17.613v124.2536h-45.806c-17.4473 0-31.7098-14.182-31.7098-31.5zm31.7098 14.003h28.193v-40.771l-20.079-13.481h-8.1c-7.754 0-14.0964 6.3-14.0964 14.003v26.246c0 7.703 6.3424 14.003 14.0964 14.003z"/>`;

/** Wordmark — viewBox 0 0 426 90. `fg` is the main path fill. Optional `bg` paints behind.
 *  Optional `accent` overrides only the `.fi` dot fill (everything else stays `fg`). */
export function wordmarkSvg(
	fg: string,
	bg: string | null = null,
	size: number | null = null,
	accent: string | null = null
): string {
	const w = size ?? 426;
	const h = size ? Math.round((90 / 426) * size) : 90;
	const bgRect = bg ? `<rect width="426" height="90" fill="${bg}"/>` : '';
	const accentFill = accent ?? fg;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 426 90" role="img" aria-label="Dash.fi wordmark" fill="${fg}">${bgRect}<g fill="${fg}">${WORDMARK_MAIN.trim()}</g><g fill="${accentFill}">${WORDMARK_ACCENT}</g></svg>`;
}

/** App icon — viewBox 0 0 236 236. `bg` is the rounded square, `glyph` is the D mark.
 *  Optional `accent` overrides the glyph fill — treat the D as an accent surface. */
export function appIconSvg(
	bg: string,
	glyph: string,
	size: number | null = null,
	accent: string | null = null
): string {
	const s = size ?? 236;
	const glyphFill = accent ?? glyph;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 236 236" role="img" aria-label="Dash.fi app icon"><rect width="236" height="236" rx="36" fill="${bg}"/><g fill="${glyphFill}" opacity="0.95">${APP_GLYPH.trim()}</g></svg>`;
}

/** Color preset metadata for the AssetConfigurator. */
export type ColorPreset = {
	id: string;
	label: string;
	fg: string;
	bg: string | null;
	glyph?: string;
};

export const wordmarkPresets: ColorPreset[] = [
	{ id: 'jade', label: 'Jade on cream', fg: '#2B605C', bg: '#FAF8F1' },
	{ id: 'jade-dark', label: 'Jade-light on ink', fg: '#5BB8B0', bg: '#0F1413' },
	{ id: 'ink', label: 'Ink on cream', fg: '#123B39', bg: '#FAF8F1' },
	{ id: 'cream-on-jade', label: 'Cream on jade', fg: '#FAF8F1', bg: '#2B605C' },
	{ id: 'white-on-ink', label: 'White on ink', fg: '#FFFFFF', bg: '#0F1413' },
	{ id: 'white-on-cobalt', label: 'White on cobalt', fg: '#FFFFFF', bg: '#354CEF' },
	{ id: 'black', label: 'Black', fg: '#000000', bg: '#FFFFFF' },
	{ id: 'transparent', label: 'Jade · transparent', fg: '#2B605C', bg: null }
];

export const appIconPresets: ColorPreset[] = [
	{ id: 'jade', label: 'Jade · cream glyph', fg: '#2B605C', bg: '#2B605C', glyph: '#FAF8F1' },
	{ id: 'cobalt', label: 'Cobalt · mist glyph', fg: '#354CEF', bg: '#354CEF', glyph: '#E7E7F0' },
	{ id: 'ink', label: 'Ink · cream glyph', fg: '#0F1413', bg: '#0F1413', glyph: '#FAF8F1' },
	{ id: 'cream', label: 'Cream · jade glyph', fg: '#FAF8F1', bg: '#FAF8F1', glyph: '#2B605C' },
	{ id: 'white', label: 'White · jade glyph', fg: '#FFFFFF', bg: '#FFFFFF', glyph: '#2B605C' },
	{ id: 'black', label: 'Black · white glyph', fg: '#000000', bg: '#000000', glyph: '#FFFFFF' }
];
