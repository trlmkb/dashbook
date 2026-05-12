# Accent Color Feature — Implementation Brief

> Hand this brief to an agent with edit permissions. It's self-contained:
> read it top-to-bottom, execute the steps, run the verification, report back.

---

## Context

Dashbook ships a logo download tool — `src/lib/chrome/AssetConfigurator.svelte` —
exposed on `/press` (and possibly `/brand/logo`). It lets users pick a preset
color combination, choose size + format, and download a single file or a ZIP
bundle of all presets.

We're adding a **"Customize accent color"** mode. When enabled, the dot in
`dash.fi` (wordmark) or the inner "d" glyph (app icon) is tinted with a
user-chosen color while the rest of the mark keeps its preset color.

Three accent choices:

1. **Match parent** — accent inherits the parent fill (no-op; equivalent to OFF)
2. **Dash.fi yellow** — `#EBFF00` (the brand's electric highlight)
3. **Custom** — full color picker + hex input

The feature must:

- Work in the live preview as you change colors
- Apply to single downloads (SVG / PNG / JPG)
- Apply to the bundle ZIP — every variant in the zip reflects the chosen accent
- Be mirrored in `LogoMark.svelte` (the inline SVG component used elsewhere in
  the portal) so previews on `/brand/logo` etc. can also accent the dot/glyph

---

## SVG path identifiers (read the user's spec carefully)

**Wordmark accent path** (the `.` in `dash.fi`):

```
m309.664 76.8046h-23.176v12.887h23.176z
```

This is one path among nine in `WORDMARK_PATHS`. Split it out into its own
`WORDMARK_ACCENT` constant.

**App icon accent path** (the "d" inside the rounded square):

```
m79.2812 148.527v-26.246c0-17.497 14.2764-31.4998 31.7098-31.4998h13.57l14.623 9.7938v-44.8016h17.613v124.2536h-45.806c-17.4473 0-31.7098-14.182-31.7098-31.5zm31.7098 14.003h28.193v-40.771l-20.079-13.481h-8.1c-7.754 0-14.0964 6.3-14.0964 14.003v26.246c0 7.703 6.3424 14.003 14.0964 14.003z
```

This is the existing `APP_GLYPH` constant. The accent simply overrides the
existing `glyph` parameter when set.

---

## Files to change (3)

1. `src/lib/chrome/logo-sources.ts`
2. `src/lib/chrome/AssetConfigurator.svelte`
3. `src/lib/chrome/LogoMark.svelte`

No other files should need touching. No new dependencies.

---

## Step 1 — `logo-sources.ts` (full replacement)

Replace the file with:

```ts
/**
 * SVG source generators for the Dash.fi wordmark and app icon.
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

/** Wordmark — viewBox 0 0 426 90. Optional `accent` overrides only the `.fi` dot fill. */
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

/** App icon — viewBox 0 0 236 236. Optional `accent` overrides the glyph (D) fill. */
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
```

---

## Step 2 — `AssetConfigurator.svelte` (six targeted edits)

### 2a. Add state (after `let working = $state(false);`)

```ts
// Accent customization — wordmark dot (`.fi`) or app-icon glyph (D)
let customizeAccent = $state(false);
let accentMode = $state<'parent' | 'yellow' | 'custom'>('parent');
let customAccent = $state('#EBFF00');

const accent = $derived.by<string | null>(() => {
	if (!customizeAccent) return null;
	if (accentMode === 'parent') return null;
	if (accentMode === 'yellow') return '#EBFF00';
	return customAccent;
});
```

### 2b. Plumb accent through `currentSvg`

Replace:

```ts
function currentSvg(targetSize?: number): string {
	const sz = targetSize ?? size;
	if (kind === 'wordmark') return wordmarkSvg(fg, bg, sz);
	return appIconSvg(bg ?? '#000000', glyph, sz);
}
```

With:

```ts
function currentSvg(targetSize?: number): string {
	const sz = targetSize ?? size;
	if (kind === 'wordmark') return wordmarkSvg(fg, bg, sz, accent);
	return appIconSvg(bg ?? '#000000', glyph, sz, accent);
}
```

### 2c. Filename includes accent suffix

Replace the existing `colorPart` + `filename` derivations with:

```ts
const colorPart = $derived(useCustom ? customFg.replace('#', '').toLowerCase() : colorId);

const accentPart = $derived.by(() => {
	if (!accent) return '';
	if (accentMode === 'yellow') return '-accent-yellow';
	return `-accent-${customAccent.replace('#', '').toLowerCase()}`;
});

const filename = $derived(
	`dashfi-${kind === 'wordmark' ? 'logo' : 'app-icon'}-${colorPart}${accentPart}-${size}px${
		format !== 'svg' ? `-${quality}x` : ''
	}.${format}`
);
```

### 2d. Bundle ZIP reflects accent (THIS is the new requirement)

Replace the body of `downloadAll` with:

```ts
async function downloadAll() {
	working = true;
	try {
		const enc = new TextEncoder();
		const entries: ZipEntry[] = [];
		const accentSuffix = accent
			? accentMode === 'yellow'
				? '-accent-yellow'
				: `-accent-${customAccent.replace('#', '').toLowerCase()}`
			: '';

		for (const p of presets) {
			const fgC = p.fg;
			const bgC = p.bg;
			const glyphC = p.glyph ?? '#FAF8F1';
			const svgString =
				kind === 'wordmark'
					? wordmarkSvg(fgC, bgC, 1024, accent)
					: appIconSvg(bgC ?? '#000000', glyphC, 1024, accent);

			entries.push({
				name: `svg/dashfi-${kind === 'wordmark' ? 'logo' : 'app-icon'}-${p.id}${accentSuffix}.svg`,
				data: enc.encode(svgString)
			});

			for (const px of [256, 512, 1024]) {
				const w = kind === 'app' ? px : px;
				const h = kind === 'app' ? px : Math.round((90 / 426) * px);
				const blob = await rasterize(
					kind === 'wordmark'
						? wordmarkSvg(fgC, bgC, px, accent)
						: appIconSvg(bgC ?? '#000000', glyphC, px, accent),
					w,
					h,
					'image/png',
					null
				);
				const buf = new Uint8Array(await blob.arrayBuffer());
				entries.push({
					name: `png/dashfi-${kind === 'wordmark' ? 'logo' : 'app-icon'}-${p.id}${accentSuffix}-${px}px.png`,
					data: buf
				});
			}
		}

		const zip = createZip(entries);
		const zipName = `dashfi-${kind === 'wordmark' ? 'wordmark' : 'app-icon'}${accentSuffix}-bundle.zip`;
		triggerDownload(zip, zipName);
	} finally {
		working = false;
	}
}
```

Key changes vs current:

- `accent` argument passed to `wordmarkSvg` / `appIconSvg` calls (both SVG + raster paths)
- File names within the ZIP get `accentSuffix` so canonical and accented bundles don't collide
- ZIP filename itself gets the accent suffix (`dashfi-wordmark-accent-yellow-bundle.zip`)

### 2e. New UI block (between Color and Size control groups)

Insert this `<div class="control-group">` after the closing `</div>` of the
Color group and before the Size group:

```svelte
<div class="control-group">
	<label class="custom-toggle accent-toggle">
		<input type="checkbox" bind:checked={customizeAccent} />
		<span>Customize accent color</span>
	</label>
	{#if customizeAccent}
		<div class="accent-row">
			<label class="accent-option" class:active={accentMode === 'parent'}>
				<input type="radio" name="accent-mode" value="parent" bind:group={accentMode} />
				<span class="accent-swatch" style:background={fg}></span>
				<span class="accent-label">Match parent</span>
			</label>
			<label class="accent-option" class:active={accentMode === 'yellow'}>
				<input type="radio" name="accent-mode" value="yellow" bind:group={accentMode} />
				<span class="accent-swatch" style:background="#EBFF00"></span>
				<span class="accent-label">Dash.fi yellow</span>
			</label>
			<label class="accent-option" class:active={accentMode === 'custom'}>
				<input type="radio" name="accent-mode" value="custom" bind:group={accentMode} />
				<input
					type="color"
					bind:value={customAccent}
					disabled={accentMode !== 'custom'}
					class="accent-picker"
					aria-label="Custom accent color"
				/>
				<input
					type="text"
					bind:value={customAccent}
					class="hex-input"
					disabled={accentMode !== 'custom'}
				/>
			</label>
		</div>
		<p class="accent-hint">
			{kind === 'wordmark'
				? 'Tints the “.” between “dash” and “fi”.'
				: 'Tints the inner “d” glyph.'}
		</p>
	{/if}
</div>
```

### 2f. CSS additions (inside the existing `<style>` block)

```css
.accent-toggle {
	font-family: var(--font-mono);
	font-size: 10px;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: var(--fg-muted);
	display: inline-flex;
	align-items: center;
	gap: 8px;
}
.accent-row {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	padding-top: 8px;
}
.accent-option {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	border: 1px solid var(--border);
	cursor: pointer;
	font-family: var(--font-mono);
	font-size: 11px;
	letter-spacing: -0.02em;
	color: var(--fg-muted);
	transition:
		border-color 120ms,
		color 120ms;
}
.accent-option:hover {
	color: var(--fg);
}
.accent-option.active {
	border-color: var(--brand);
	color: var(--fg);
}
.accent-option input[type='radio'] {
	margin: 0;
}
.accent-swatch {
	display: inline-block;
	width: 14px;
	height: 14px;
	border: 1px solid var(--border);
	border-radius: 50%;
}
.accent-label {
	letter-spacing: 0.05em;
	text-transform: uppercase;
}
.accent-picker {
	width: 28px;
	height: 28px;
	padding: 0;
	border: 1px solid var(--border);
	background: transparent;
	cursor: pointer;
}
.accent-picker:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}
.accent-hint {
	font-size: 12px;
	color: var(--fg-muted);
	margin: 0;
	padding-top: 4px;
}
```

---

## Step 3 — `LogoMark.svelte` (full replacement)

The inline component used outside the AssetConfigurator (e.g. on `/brand/logo`,
homepage hero) needs accent support too so previews stay consistent.

Replace with:

```svelte
<script lang="ts">
	type Props = {
		variant: 'wordmark' | 'app';
		class?: string;
		accent?: string | null;
	};

	let { variant, class: className = '', accent = null }: Props = $props();
	const accentFill = $derived(accent ?? 'currentColor');
</script>

{#if variant === 'wordmark'}
	<svg
		class={className}
		viewBox="0 0 426 90"
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-label="Dash.fi wordmark"
		fill="currentColor"
	>
		<path
			d="m0 67.2114v-18.9871c0-12.6581 10.3035-22.7886 22.8855-22.7886h9.7938l10.5533 7.0853v-32.4115h12.7119v89.8905h-33.059c-12.592 0-22.8855-10.2598-22.8855-22.7886zm22.8855 10.1305h20.3471v-29.4958l-14.4908-9.7523h-5.8463c-5.5965 0-10.1736 4.5577-10.1736 10.1305v18.9871c0 5.5728 4.5771 10.1305 10.1736 10.1305z"
		/>
		<path
			d="m72.3441 67.2114v-18.9871c0-12.6582 10.3035-22.7886 22.8855-22.7886h9.7934l10.554 7.0853v-7.0853h12.712v64.5743h-33.0594c-12.592 0-22.8855-10.2599-22.8855-22.7886zm22.8855 10.1305h20.3474v-29.4958l-14.491-9.7523h-5.8464c-5.5964 0-10.1735 4.5577-10.1735 10.1305v18.9871c0 5.5728 4.5771 10.1305 10.1735 10.1305z"
		/>
		<path
			d="m143.549 71.2616v-2.5277h12.712v2.5277c0 4.0502 3.308 6.9659 8.774 6.9659h11.573c5.976 0 8.904-2.4082 8.904-6.0803 0-14.31-41.064-5.0652-41.064-29.6251 0-10.2599 8.265-17.0964 20.348-17.0964h10.933c11.442 0 20.347 8.2297 20.347 18.8677v1.1444h-12.712v-1.1444c0-4.0502-3.178-7.0853-7.625-7.0853h-10.933c-5.337 0-7.626 2.1494-7.626 5.314 0 10.2598 41.064 3.8014 41.064 29.6251 0 10.638-8.774 17.8528-21.616 17.8528h-11.573c-12.332 0-21.486-7.981-21.486-18.7384z"
		/>
		<path
			d="m225.817.1095v32.4115l10.553-7.0853h9.794c12.592 0 22.885 10.1305 22.885 22.7886v41.7857h-12.711v-41.7857c0-5.5728-4.578-10.1305-10.174-10.1305h-5.846l-14.491 9.7523v42.1639h-12.712v-89.9005h12.712z"
		/>
		<path
			d="m349.718 0h12.083v12.6581h-12.083c-5.726 0-10.173 4.4284-10.173 10.1305v6.329h22.246v12.6582h-22.246v48.1147h-12.712v-48.1147h-17.169v-12.6582h17.169v-6.329c0-12.6581 10.173-22.7886 22.885-22.7886z"
		/>
		<path
			d="m371.325 77.2325h20.986v-35.4766h-30.52v-12.6581h43.232v48.1347h20.977v12.6581h-54.675z"
		/>
		<path d="m405.023 0h-23.175v12.887h23.175z" />
		<path d="m225.797.1095h-23.175v12.887h23.175z" />
		<!-- Accent dot — separated for accent prop -->
		<path d="m309.664 76.8046h-23.176v12.887h23.176z" fill={accentFill} />
	</svg>
{:else}
	<svg
		class={className}
		viewBox="0 0 236 236"
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-label="Dash.fi app icon"
	>
		<rect width="236" height="236" rx="36" fill="currentColor" />
		<path
			d="m79.2812 148.527v-26.246c0-17.497 14.2764-31.4998 31.7098-31.4998h13.57l14.623 9.7938v-44.8016h17.613v124.2536h-45.806c-17.4473 0-31.7098-14.182-31.7098-31.5zm31.7098 14.003h28.193v-40.771l-20.079-13.481h-8.1c-7.754 0-14.0964 6.3-14.0964 14.003v26.246c0 7.703 6.3424 14.003 14.0964 14.003z"
			fill={accent ?? 'var(--app-icon-glyph, #ffffff)'}
			opacity="0.95"
		/>
	</svg>
{/if}
```

Backward compatibility: existing callers that don't pass `accent` get the
exact same rendering they got before (`currentColor` for the dot, the existing
`--app-icon-glyph` CSS var fallback for the app glyph). The new prop is purely
additive.

---

## Order of operations

1. Apply Step 1 (`logo-sources.ts` — full rewrite). The function signatures
   gain an optional fourth parameter so existing callers still compile.
2. Apply Step 2 (`AssetConfigurator.svelte` — 6 sub-edits in order: 2a → 2f).
3. Apply Step 3 (`LogoMark.svelte` — full rewrite).
4. Verify (next section).

If any step fails the type-check, fix in place — don't proceed to the next.

---

## Verification

```bash
cd /Users/zy/dev/dashbook
pnpm check                                   # must pass clean
pnpm dev                                     # boot dev server
```

Then **screenshot** these flows (the user explicitly wants visual verification
before reporting back):

1. Navigate to whatever page hosts the wordmark `AssetConfigurator`
   (likely `/press` — search for `AssetConfigurator kind="wordmark"`).
2. **Default state**: customize checkbox unchecked. Logo renders as today.
3. **Toggle ON · "Match parent"**: dot stays the same color. Filename in the
   "Filename" row does NOT include `-accent-*`.
4. **Pick "Dash.fi yellow"**: the dot in the live preview turns `#EBFF00`.
   Filename now ends `-accent-yellow-{size}px.svg`.
5. **Pick "Custom"** + change color to `#FF00AA`: dot updates live. Filename
   ends `-accent-ff00aa-{size}px.svg`.
6. **Click "Download"**: file downloads. Open the downloaded SVG in a viewer
   — confirm the dot path has the chosen accent color in its `<g>` wrapper.
7. **Click "Download bundle (.zip)"**: zip downloads. Filename is
   `dashfi-wordmark-accent-yellow-bundle.zip` (or custom-hex variant).
   Inspect the ZIP — every SVG and PNG name should contain the accent suffix,
   and the SVG content should have the accent dot tinted.
8. **Switch to app icon configurator** (`/press` or `/brand/logo`).
9. Repeat steps 2–7 — accent should tint the inner "d" glyph.
10. **`/brand/logo`** — if `LogoMark` is used there for preview tiles, confirm
    they still render correctly (no visual regression with `accent={null}`).

Inspect computed styles on the dot path to confirm the actual fill RGB:

```js
// In DevTools console on the preview:
const dot = document.querySelector('.preview svg g:last-of-type path');
getComputedStyle(dot).fill;
// → should be rgb(235, 255, 0) for yellow, rgb(53, 76, 239) for cobalt, etc.
```

---

## Risks & gotchas

- **Don't break the existing presets.** All preset entries must continue to
  render exactly as before when `customizeAccent` is OFF. This is why all
  function signatures take `accent` as optional with `null` default.
- **Hex normalization.** Filenames lowercase hex without the `#`. Don't
  double-strip — only strip in the `accentPart` derivation.
- **ZIP bloat.** When accent is OFF, ZIP behavior is byte-identical to today.
  When ON, ZIP entries change names but stay the same count. We are NOT adding
  parallel canonical + accent sets.
- **`PreviewCanvas` not involved.** The configurator is a portal-chrome
  component — it does NOT render inside `PreviewCanvas`. Don't add HSL token
  plumbing here; the configurator uses portal hex CSS vars directly.
- **`LogoMark` backward compatibility.** Existing usages (homepage hero,
  brand/logo page) MUST keep working unchanged when no `accent` prop is
  passed. The default of `accent ?? 'currentColor'` ensures this for the
  wordmark; for the app icon, the existing `--app-icon-glyph` CSS var fallback
  is preserved.

---

## Report back

After steps 1–3 are applied and verification passes, report:

- File diffs summary (which files changed, line counts)
- `pnpm check` output (must be clean)
- Three screenshots: wordmark with yellow accent · wordmark with custom hex ·
  app icon with yellow accent
- One ZIP filename listing (`unzip -l` output) for the accented bundle to
  prove the accent suffix propagated through

Do not bump the dashbook version — token/feature additions of this size are
internal increments. Add a one-line entry to `src/routes/changelog/+page.svelte`
under whatever version the next release will be (ask the user if unsure).
