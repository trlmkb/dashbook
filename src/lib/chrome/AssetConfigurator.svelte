<script lang="ts">
	import Download from '@lucide/svelte/icons/download';
	import Package from '@lucide/svelte/icons/package';
	import {
		wordmarkSvg,
		appIconSvg,
		wordmarkPresets,
		appIconPresets,
		type ColorPreset
	} from './logo-sources';
	import { createZip, type ZipEntry } from './zip';

	type Kind = 'wordmark' | 'app';
	type Format = 'svg' | 'png' | 'jpg';

	type Props = {
		kind: Kind;
	};

	let { kind }: Props = $props();

	const presets = $derived<ColorPreset[]>(kind === 'wordmark' ? wordmarkPresets : appIconPresets);
	const sizes = [32, 64, 128, 256, 512, 1024] as const;

	// Both preset arrays start with `jade`. Hardcoded to avoid referencing
	// a derived value when seeding state — see svelte.dev/e/state_referenced_locally.
	const formats: { id: Format; label: string }[] = [
		{ id: 'svg', label: 'SVG' },
		{ id: 'png', label: 'PNG' },
		{ id: 'jpg', label: 'JPG' }
	];
	const qualities = [1, 2, 3] as const;

	let colorId = $state<string>('jade');
	let useCustom = $state(false);
	let customFg = $state('#2B605C');
	let customBg = $state('#FAF8F1');
	let customGlyph = $state('#FAF8F1');
	let transparentBg = $state(false);

	let sizeIdx = $state(3); // 256px
	let useCustomSize = $state(false);
	let customSize = $state(256);

	let format = $state<Format>('svg');
	let quality = $state(2);
	let working = $state(false);

	// Accent customization (dot of .fi for wordmark; glyph D for app icon)
	let customizeAccent = $state(false);
	let accentMode = $state<'parent' | 'yellow' | 'custom'>('parent');
	let customAccent = $state('#EBFF00');

	const accent = $derived.by<string | null>(() => {
		if (!customizeAccent) return null;
		if (accentMode === 'parent') return null;
		if (accentMode === 'yellow') return '#EBFF00';
		return customAccent;
	});

	const preset = $derived(presets.find((p) => p.id === colorId) ?? presets[0]);

	const fg = $derived(useCustom ? customFg : preset.fg);
	const bg = $derived(useCustom ? (transparentBg ? null : customBg) : preset.bg);
	const glyph = $derived(
		kind === 'app' ? (useCustom ? customGlyph : (preset.glyph ?? '#FAF8F1')) : ''
	);

	const size = $derived(
		useCustomSize ? Math.max(8, Math.min(4096, customSize | 0)) : sizes[sizeIdx]
	);
	const pixelSize = $derived(format === 'svg' ? size : size * quality);

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

	function currentSvg(targetSize?: number): string {
		const sz = targetSize ?? size;
		if (kind === 'wordmark') return wordmarkSvg(fg, bg, sz, accent);
		return appIconSvg(bg ?? '#000000', glyph, sz, accent);
	}

	function triggerDownload(blob: Blob, name: string) {
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = name;
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	async function rasterize(
		svgString: string,
		w: number,
		h: number,
		mime: 'image/png' | 'image/jpeg',
		fillBg: string | null
	): Promise<Blob> {
		const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(svgBlob);
		try {
			const img = await loadImage(url);
			const canvas = document.createElement('canvas');
			canvas.width = w;
			canvas.height = h;
			const ctx = canvas.getContext('2d');
			if (!ctx) throw new Error('canvas 2d context unavailable');
			if (fillBg) {
				ctx.fillStyle = fillBg;
				ctx.fillRect(0, 0, w, h);
			}
			ctx.drawImage(img, 0, 0, w, h);
			return await new Promise<Blob>((resolve, reject) => {
				canvas.toBlob(
					(b) => (b ? resolve(b) : reject(new Error('canvas.toBlob returned null'))),
					mime,
					0.92
				);
			});
		} finally {
			URL.revokeObjectURL(url);
		}
	}

	function loadImage(url: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = () => reject(new Error('failed to load SVG into <img>'));
			img.src = url;
		});
	}

	function pxDimensions(): { w: number; h: number } {
		if (kind === 'app') return { w: pixelSize, h: pixelSize };
		const ratio = 90 / 426;
		return { w: pixelSize, h: Math.round(pixelSize * ratio) };
	}

	async function downloadOne() {
		working = true;
		try {
			if (format === 'svg') {
				triggerDownload(new Blob([currentSvg()], { type: 'image/svg+xml' }), filename);
			} else {
				const { w, h } = pxDimensions();
				const mime = format === 'png' ? 'image/png' : 'image/jpeg';
				const svgString = currentSvg(size);
				const fillBg = format === 'jpg' && !bg ? '#FFFFFF' : null;
				const blob = await rasterize(svgString, w, h, mime, fillBg);
				triggerDownload(blob, filename);
			}
		} finally {
			working = false;
		}
	}

	async function downloadAll() {
		working = true;
		try {
			const enc = new TextEncoder();
			const entries: ZipEntry[] = [];

			for (const p of presets) {
				const fgC = p.fg;
				const bgC = p.bg;
				const glyphC = p.glyph ?? '#FAF8F1';
				const svgString =
					kind === 'wordmark'
						? wordmarkSvg(fgC, bgC, 1024)
						: appIconSvg(bgC ?? '#000000', glyphC, 1024);

				entries.push({
					name: `svg/dashfi-${kind === 'wordmark' ? 'logo' : 'app-icon'}-${p.id}.svg`,
					data: enc.encode(svgString)
				});

				for (const px of [256, 512, 1024]) {
					const w = kind === 'app' ? px : px;
					const h = kind === 'app' ? px : Math.round((90 / 426) * px);
					const blob = await rasterize(
						kind === 'wordmark'
							? wordmarkSvg(fgC, bgC, px)
							: appIconSvg(bgC ?? '#000000', glyphC, px),
						w,
						h,
						'image/png',
						null
					);
					const buf = new Uint8Array(await blob.arrayBuffer());
					entries.push({
						name: `png/dashfi-${kind === 'wordmark' ? 'logo' : 'app-icon'}-${p.id}-${px}px.png`,
						data: buf
					});
				}
			}

			const zip = createZip(entries);
			triggerDownload(zip, `dashfi-${kind === 'wordmark' ? 'wordmark' : 'app-icon'}-bundle.zip`);
		} finally {
			working = false;
		}
	}
</script>

<div class="cfg">
	<div class="preview" style:background={bg ?? 'transparent'}>
		<div class="preview-inner" style:--mark-color={fg} style:--glyph-color={glyph}>
			{#if !bg}
				<div class="checker" aria-hidden="true"></div>
			{/if}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html currentSvg(kind === 'wordmark' ? 320 : 200)}
		</div>
	</div>

	<div class="controls">
		<div class="control-group">
			<div class="label">Color</div>
			<div class="swatches">
				{#each presets as p (p.id)}
					<button
						type="button"
						class="swatch"
						class:active={!useCustom && colorId === p.id}
						title={p.label}
						style:background={p.bg ?? '#ffffff'}
						style:border-color={!useCustom && colorId === p.id ? 'var(--brand)' : 'var(--border)'}
						onclick={() => {
							useCustom = false;
							colorId = p.id;
						}}
					>
						<span class="swatch-fg" style:background={p.fg}></span>
						{#if kind === 'app' && p.glyph}
							<span class="swatch-glyph" style:background={p.glyph}></span>
						{/if}
					</button>
				{/each}
				<button
					type="button"
					class="swatch swatch-custom"
					class:active={useCustom}
					style:border-color={useCustom ? 'var(--brand)' : 'var(--border)'}
					onclick={() => (useCustom = true)}
					title="Custom"
				>
					<span class="custom-label">Custom</span>
				</button>
			</div>
			{#if useCustom}
				<div class="custom-row">
					<label class="custom-field">
						<span>Foreground</span>
						<input type="color" bind:value={customFg} />
						<input type="text" bind:value={customFg} class="hex-input" />
					</label>
					{#if kind === 'wordmark'}
						<label class="custom-field">
							<span>Background</span>
							<input type="color" bind:value={customBg} disabled={transparentBg} />
							<input type="text" bind:value={customBg} class="hex-input" disabled={transparentBg} />
						</label>
						<label class="custom-toggle">
							<input type="checkbox" bind:checked={transparentBg} />
							<span>Transparent</span>
						</label>
					{:else}
						<label class="custom-field">
							<span>Surface</span>
							<input type="color" bind:value={customBg} />
							<input type="text" bind:value={customBg} class="hex-input" />
						</label>
						<label class="custom-field">
							<span>Glyph</span>
							<input type="color" bind:value={customGlyph} />
							<input type="text" bind:value={customGlyph} class="hex-input" />
						</label>
					{/if}
				</div>
			{/if}
		</div>

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

		<div class="control-group">
			<div class="label">Size</div>
			<div class="seg">
				{#each sizes as s, i (s)}
					<button
						type="button"
						class="seg-item"
						class:active={!useCustomSize && sizeIdx === i}
						onclick={() => {
							useCustomSize = false;
							sizeIdx = i;
						}}>{s}<span class="unit">px</span></button
					>
				{/each}
				<button
					type="button"
					class="seg-item seg-custom"
					class:active={useCustomSize}
					onclick={() => (useCustomSize = true)}>Custom</button
				>
			</div>
			{#if useCustomSize}
				<div class="custom-row">
					<label class="custom-field">
						<span>Width (px)</span>
						<input type="number" min="8" max="4096" bind:value={customSize} class="num-input" />
					</label>
				</div>
			{/if}
		</div>

		<div class="control-group two-col">
			<div>
				<div class="label">Format</div>
				<div class="seg">
					{#each formats as f (f.id)}
						<button
							type="button"
							class="seg-item"
							class:active={format === f.id}
							onclick={() => (format = f.id)}>{f.label}</button
						>
					{/each}
				</div>
			</div>
			<div>
				<div class="label">Quality</div>
				<div class="seg">
					{#each qualities as q (q)}
						<button
							type="button"
							class="seg-item"
							class:active={quality === q}
							disabled={format === 'svg'}
							onclick={() => (quality = q)}>{q}x</button
						>
					{/each}
				</div>
			</div>
		</div>

		<div class="filename">
			<div class="label">Filename</div>
			<code>{filename}</code>
		</div>

		<div class="actions">
			<button type="button" class="primary" onclick={downloadOne} disabled={working}>
				<Download size={14} strokeWidth={1.5} />
				{working ? 'Working…' : 'Download'}
			</button>
			<button type="button" class="secondary" onclick={downloadAll} disabled={working}>
				<Package size={14} strokeWidth={1.5} />
				Download bundle (.zip)
			</button>
		</div>
	</div>
</div>

<style>
	.cfg {
		display: grid;
		grid-template-columns: minmax(280px, 1fr) minmax(320px, 1.2fr);
		gap: 32px;
		border: 1px solid var(--border);
	}
	.preview {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 48px;
		min-height: 320px;
		position: relative;
		border-right: 1px solid var(--border);
		transition: background-color 200ms var(--easing-default);
	}
	.preview-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
	}
	.preview-inner :global(svg) {
		max-width: 100%;
		height: auto;
		display: block;
	}
	.checker {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(45deg, var(--bg-muted) 25%, transparent 25%),
			linear-gradient(-45deg, var(--bg-muted) 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, var(--bg-muted) 75%),
			linear-gradient(-45deg, transparent 75%, var(--bg-muted) 75%);
		background-size: 16px 16px;
		background-position:
			0 0,
			0 8px,
			8px -8px,
			-8px 0;
		opacity: 0.5;
		z-index: 0;
	}
	.controls {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.control-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.control-group.two-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
	.label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.swatches {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
		gap: 6px;
	}
	.swatch {
		position: relative;
		height: 40px;
		border: 1px solid var(--border);
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3px;
		transition: border-color 120ms;
	}
	.swatch:hover {
		border-color: var(--input-border);
	}
	.swatch-fg,
	.swatch-glyph {
		display: block;
		width: 14px;
		height: 14px;
		border-radius: 50%;
	}
	.swatch-custom {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-muted);
		background: var(--bg);
	}
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
	.custom-label {
		display: block;
	}
	.custom-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 8px;
	}
	.custom-field {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: var(--fg-muted);
	}
	.custom-field span {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.custom-field input[type='color'] {
		width: 32px;
		height: 32px;
		padding: 0;
		border: 1px solid var(--border);
		background: transparent;
		cursor: pointer;
	}
	.hex-input,
	.num-input {
		width: 90px;
		font-family: var(--font-mono);
		font-size: 12px;
		padding: 6px 8px;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--fg);
		letter-spacing: -0.02em;
	}
	.hex-input:focus,
	.num-input:focus {
		outline: none;
		border-color: var(--brand);
	}
	.num-input {
		width: 100px;
	}
	.custom-toggle {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: var(--fg-muted);
		font-family: var(--font-mono);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
	.seg {
		display: flex;
		flex-wrap: wrap;
		border: 1px solid var(--border);
	}
	.seg-item {
		flex: 1 1 auto;
		min-width: 60px;
		padding: 8px 10px;
		border: 0;
		border-right: 1px solid var(--border);
		background: var(--bg);
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-muted);
		cursor: pointer;
		letter-spacing: -0.02em;
		transition:
			color 120ms,
			background-color 120ms;
	}
	.seg-item:last-child {
		border-right: 0;
	}
	.seg-item:hover:not(:disabled) {
		color: var(--fg);
	}
	.seg-item.active {
		background: var(--brand);
		color: var(--brand-fg);
	}
	.seg-item:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.seg-item .unit {
		font-size: 9px;
		color: inherit;
		opacity: 0.7;
		margin-left: 2px;
		letter-spacing: 0.05em;
	}
	.filename {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.filename code {
		display: block;
		font-family: var(--font-mono);
		font-size: 12px;
		padding: 10px 12px;
		background: var(--bg-muted);
		color: var(--fg);
		letter-spacing: -0.02em;
		word-break: break-all;
	}
	.actions {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-top: 4px;
	}
	.actions button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		border: 1px solid var(--border);
		cursor: pointer;
		transition:
			background-color 120ms,
			border-color 120ms,
			color 120ms;
		letter-spacing: -0.01em;
	}
	.actions .primary {
		background: var(--brand);
		color: var(--brand-fg);
		border-color: var(--brand);
	}
	.actions .primary:hover:not(:disabled) {
		opacity: 0.9;
	}
	.actions .secondary {
		background: var(--bg);
		color: var(--fg);
	}
	.actions .secondary:hover:not(:disabled) {
		border-color: var(--brand);
		color: var(--brand);
	}
	.actions button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	@media (max-width: 720px) {
		.cfg {
			grid-template-columns: 1fr;
		}
		.preview {
			border-right: 0;
			border-bottom: 1px solid var(--border);
		}
		.control-group.two-col {
			grid-template-columns: 1fr;
		}
	}
</style>
