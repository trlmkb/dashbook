<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import DoDontGrid from '$chrome/DoDontGrid.svelte';
	import Download from '@lucide/svelte/icons/download';
	import Package from '@lucide/svelte/icons/package';
	import {
		CARD_DIMENSIONS,
		cardVariants,
		getCardVariant,
		cardBackgroundSvg,
		cardAppIconSvg,
		cardCobrandLogoSvg,
		cardIssuerLogoSvg,
		cardPreviewSvg,
		slotDimensionsLabel,
		type CardVariant
	} from '$chrome/card-sources';
	import { createZip, type ZipEntry } from '$chrome/zip';

	const defaultVariant = cardVariants[0];
	let selectedId = $state<string>(defaultVariant.id);

	// Custom-variant fields. Seeded from the selected variant — change a
	// slider and the previews update live without saving back to the variant
	// list (the brand team can copy the values to add a new preset).
	let bg = $state<string>(defaultVariant.bg);
	let wordmarkFg = $state<string>(defaultVariant.wordmarkFg);
	let appBg = $state<string>(defaultVariant.appIcon.bg);
	let appGlyph = $state<string>(defaultVariant.appIcon.glyph);
	let useGradient = $state<boolean>(!!defaultVariant.gradient);
	let gradientFrom = $state<string>(defaultVariant.gradient?.from ?? '#5868D8');
	let gradientOpacity = $state<number>(defaultVariant.gradient?.opacity ?? 0.55);
	let gradientCx = $state<number>(30);
	let gradientCy = $state<number>(35);
	let gradientR = $state<number>(70);

	// Whenever the user picks a different preset, re-seed the custom controls.
	$effect(() => {
		const v = getCardVariant(selectedId);
		bg = v.bg;
		wordmarkFg = v.wordmarkFg;
		appBg = v.appIcon.bg;
		appGlyph = v.appIcon.glyph;
		useGradient = !!v.gradient;
		gradientFrom = v.gradient?.from ?? '#5868D8';
		gradientOpacity = v.gradient?.opacity ?? 0.55;
		gradientCx = v.gradient ? parseInt(v.gradient.cx) : 30;
		gradientCy = v.gradient ? parseInt(v.gradient.cy) : 35;
		gradientR = v.gradient ? parseInt(v.gradient.r) : 70;
	});

	// Live variant — composes from the live controls. NOT persisted; this is
	// what every preview + download button uses.
	const liveVariant = $derived<CardVariant>({
		id: 'live',
		label: 'Live',
		description: 'Live editor state.',
		status: 'draft',
		usedForBins: [],
		bg,
		gradient: useGradient
			? {
					from: gradientFrom,
					to: 'transparent',
					cx: `${gradientCx}%`,
					cy: `${gradientCy}%`,
					r: `${gradientR}%`,
					opacity: gradientOpacity
				}
			: null,
		wordmarkFg,
		appIcon: { bg: appBg, glyph: appGlyph, radius: 0.2 }
	});

	// Live SVGs for inline preview.
	const previewSvg = $derived(cardPreviewSvg(liveVariant));
	const backgroundSvg = $derived(cardBackgroundSvg(liveVariant));
	const appIconSvg = $derived(cardAppIconSvg(liveVariant));
	const cobrandSvg = $derived(cardCobrandLogoSvg(liveVariant));
	const issuerSvg = $derived(cardIssuerLogoSvg());

	type Slot = 'background' | 'app-icon' | 'cobrand-logo' | 'issuer-logo';
	type Format = 'svg' | 'png';

	function svgFor(slot: Slot): string {
		switch (slot) {
			case 'background':
				return backgroundSvg;
			case 'app-icon':
				return appIconSvg;
			case 'cobrand-logo':
				return cobrandSvg;
			case 'issuer-logo':
				return issuerSvg;
		}
	}

	function dimsFor(slot: Slot) {
		switch (slot) {
			case 'background':
				return CARD_DIMENSIONS.background;
			case 'app-icon':
				return CARD_DIMENSIONS.appIcon;
			case 'cobrand-logo':
				return CARD_DIMENSIONS.cobrandLogo;
			case 'issuer-logo':
				return CARD_DIMENSIONS.issuerLogo;
		}
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

	async function downloadSvg(slot: Slot) {
		const blob = new Blob([svgFor(slot)], { type: 'image/svg+xml' });
		triggerDownload(blob, `dashfi-card-${selectedId}-${slot}.svg`);
	}

	async function downloadPng(slot: Slot) {
		const svg = svgFor(slot);
		const { width, height } = dimsFor(slot);
		const blob = await rasterizeSvgToPng(svg, width, height);
		triggerDownload(blob, `dashfi-card-${selectedId}-${slot}.png`);
	}

	async function downloadPreviewSvg() {
		const blob = new Blob([previewSvg], { type: 'image/svg+xml' });
		triggerDownload(blob, `dashfi-card-${selectedId}-preview.svg`);
	}

	async function downloadPreviewPng() {
		const { width, height } = CARD_DIMENSIONS.background;
		const blob = await rasterizeSvgToPng(previewSvg, width, height);
		triggerDownload(blob, `dashfi-card-${selectedId}-preview.png`);
	}

	// ── MDES bundle — all 4 slots × (SVG + PNG) + README in one zip ──────
	// One click delivers everything brand-ops needs to feed the MC portal
	// for a single BIN submission. Filenames match the MDES slot names so
	// they're upload-form-friendly.

	let bundleStatus = $state<'idle' | 'building' | 'done'>('idle');

	async function downloadMdesBundle() {
		bundleStatus = 'building';
		try {
			const slots: Slot[] = ['background', 'app-icon', 'cobrand-logo', 'issuer-logo'];
			const entries: ZipEntry[] = [];

			// Per-slot SVG + PNG
			for (const slot of slots) {
				const svg = svgFor(slot);
				const { width, height } = dimsFor(slot);
				entries.push({
					name: `${slot}.svg`,
					data: new TextEncoder().encode(svg)
				});
				const pngBlob = await rasterizeSvgToPng(svg, width, height);
				const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
				entries.push({ name: `${slot}.png`, data: pngBytes });
			}

			// Composite preview (SVG + PNG) — visual aid, NOT for MDES upload
			entries.push({
				name: 'preview-composite.svg',
				data: new TextEncoder().encode(previewSvg)
			});
			const previewBlob = await rasterizeSvgToPng(
				previewSvg,
				CARD_DIMENSIONS.background.width,
				CARD_DIMENSIONS.background.height
			);
			entries.push({
				name: 'preview-composite.png',
				data: new Uint8Array(await previewBlob.arrayBuffer())
			});

			// Submission README
			const readme = buildReadme(liveVariant);
			entries.push({
				name: 'README.txt',
				data: new TextEncoder().encode(readme)
			});

			const blob = createZip(entries);
			triggerDownload(blob, `dashfi-card-${selectedId}-mdes-bundle.zip`);
			bundleStatus = 'done';
			setTimeout(() => (bundleStatus = 'idle'), 2000);
		} catch (err) {
			console.error('MDES bundle build failed', err);
			bundleStatus = 'idle';
		}
	}

	function buildReadme(v: CardVariant): string {
		return `Dash.fi card art — MDES submission bundle
Variant: ${v.label} (${v.id})
Generated: ${new Date().toISOString()}

UPLOADABLE ASSETS (one BIN per submission)
──────────────────────────────────────────
1. background.svg / .png     — 1536 × 969    upload as: dashfi-card-bg-${v.id.slice(0, 16)}
2. app-icon.svg / .png       — 100 × 100     upload as: dashfi-app-icon-${v.id.slice(0, 16)}
                               (PNG required — MDES does NOT accept SVG/PDF for icon slot)
3. cobrand-logo.svg / .png   — 1372 × 283    upload as: dashfi-cobrand
4. issuer-logo.svg / .png    — 1372 × 283    upload as: dashfi-issuer-hide
                               (1×1 transparent placeholder — hides issuer mark)

NOT FOR UPLOAD
──────────────
- preview-composite.svg / .png  — visual mock of how the card looks in Apple Pay /
                                   Google Pay after Mastercard overlays the brand
                                   mark + PAN. Reference only.

MC COLOUR FIELDS (configure separately in MC's UI, not uploaded)
────────────────────────────────────────────────────────────────
- Card Background:  ${v.bg}
- PAN:              #FFFFFF
- Card Description: #EBEDE4

WHAT MUST NOT APPEAR IN UPLOADED ART
─────────────────────────────────────
- PAN, cardholder name, expiration, CVC/CVV
- EMV chip artwork, NFC / contactless symbol
- Mastercard brand mark (MC composites at render time — 459×283 bottom-right)
- Rounded corners (wallets round at composite time)

LAYOUT (1536 × 969 canvas)
──────────────────────────
- A = 82 px   side padding
- B = 57 px   top/bottom padding
- C = 1372    cobrand + issuer area width
- D = 283     logo area height
- E = 459     brand-logo width (MC supplies, reserve safe zone)

Cobrand + issuer band sits at top: (82, 57) → (1454, 340)
Brand-mark slot bottom-right:     (995, 629) → (1454, 912)

See https://dashbook.vercel.app/brand/card for the live configurator and
.knowledge/mdes-asset-spec.md for the verified spec audit.
`;
	}

	async function rasterizeSvgToPng(
		svg: string,
		width: number,
		height: number
	): Promise<Blob> {
		const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(svgBlob);
		try {
			const img = new Image();
			img.crossOrigin = 'anonymous';
			await new Promise<void>((resolve, reject) => {
				img.onload = () => resolve();
				img.onerror = () => reject(new Error('SVG image failed to load'));
				img.src = url;
			});
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			if (!ctx) throw new Error('canvas 2d unavailable');
			ctx.drawImage(img, 0, 0, width, height);
			return await new Promise<Blob>((resolve, reject) =>
				canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png')
			);
		} finally {
			URL.revokeObjectURL(url);
		}
	}

	const dos = [
		{
			kind: 'do' as const,
			text: 'Upload all four MDES slots per BIN — Card Background, App Icon, Cobrand Logo, Issuer Logo. Missing any slot fails the MC submission.'
		},
		{
			kind: 'do' as const,
			text: 'Match the colour fields you configure separately in MC (Background #2C3FB2, PAN #FFFFFF, Description #EBEDE4) to the values bundled in your design.'
		},
		{
			kind: 'do' as const,
			text: 'Use the 1×1 transparent issuer slot to hide the issuer mark. Dash.fi designs bake the issuer indication into the background.'
		},
		{
			kind: 'dont' as const,
			text: "Don't ship card artwork that occupies the bottom-right corner — Mastercard composites their network mark there at render time and will obscure custom art."
		},
		{
			kind: 'dont' as const,
			text: "Don't include the PAN in your uploaded assets. Mastercard renders the masked PAN themselves from the tokenized card data."
		},
		{
			kind: 'dont' as const,
			text: "Don't use raster-only assets when SVG works — SVG re-colours cleanly across MDES updates and stays well under the 1MB upload limit."
		}
	];
</script>

<svelte:head><title>Card — Brand — Dashbook</title></svelte:head>

<InnerPage section="/brand" wide>
	<PageHeader
		label="Brand / Card"
		title="Card."
		lede="The Dash.fi credit card art configurator. Generates Mastercard MDES-compliant assets for tokenization (Apple Pay, Google Pay, Samsung Pay). Pick a variant, tweak the design live, download all four MDES slots in SVG and PNG."
	/>

	<Section
		label="Variant"
		note="Single canonical Dash.fi card. Mastercard composites the brand mark + PAN per-token at render time — one design serves every BIN."
	>
		<div class="variant-row">
			{#each cardVariants as v (v.id)}
				<button
					class:active={selectedId === v.id}
					class="variant-chip"
					onclick={() => (selectedId = v.id)}
				>
					<div class="variant-label">{v.label}</div>
					<div class="variant-meta">{v.status}</div>
				</button>
			{/each}
		</div>
		<p class="variant-desc">{getCardVariant(selectedId).description}</p>
	</Section>

	<Section
		label="Preview"
		note="What the card LOOKS like in Apple Pay / Google Pay after Mastercard composites their brand mark on top. Updates live with the controls below."
	>
		<div class="preview-stage">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<div class="preview-card">{@html previewSvg}</div>
			<div class="preview-meta">
				<div><strong>Card</strong> · 1536 × 969 · {bg}</div>
				<div><strong>App icon</strong> · 100 × 100</div>
			</div>
			<div class="preview-actions">
				<button class="bundle-btn" onclick={downloadMdesBundle} disabled={bundleStatus === 'building'}>
					<Package size={14} stroke-width="1.5" />
					{bundleStatus === 'building'
						? 'Building bundle…'
						: bundleStatus === 'done'
							? 'Downloaded ✓'
							: 'Download MDES bundle (zip)'}
				</button>
				<button class="preview-btn" onclick={downloadPreviewSvg}>
					<Download size={14} stroke-width="1.5" />
					Preview SVG
				</button>
				<button class="preview-btn" onclick={downloadPreviewPng}>
					<Download size={14} stroke-width="1.5" />
					Preview PNG
				</button>
			</div>
			<p class="bundle-hint">
				The MDES bundle ships all 4 upload slots (SVG + PNG) plus a README with
				submission steps and naming conventions — one click instead of eight.
			</p>
		</div>
	</Section>

	<Section
		label="Customize"
		note="Edits are live but not persisted. Copy the values into `src/lib/chrome/card-sources.ts` to save as a new preset."
	>
		<div class="control-grid">
			<label class="control">
				<span>Background</span>
				<input type="color" bind:value={bg} />
				<input type="text" bind:value={bg} maxlength="7" />
			</label>

			<label class="control">
				<span>Wordmark fill</span>
				<input type="color" bind:value={wordmarkFg} />
				<input type="text" bind:value={wordmarkFg} maxlength="7" />
			</label>

			<label class="control">
				<span>App icon bg</span>
				<input type="color" bind:value={appBg} />
				<input type="text" bind:value={appBg} maxlength="7" />
			</label>

			<label class="control">
				<span>App icon glyph</span>
				<input type="color" bind:value={appGlyph} />
				<input type="text" bind:value={appGlyph} maxlength="7" />
			</label>

			<label class="control control-full">
				<span>Highlight gradient</span>
				<label class="toggle">
					<input type="checkbox" bind:checked={useGradient} />
					<span>Enabled</span>
				</label>
			</label>

			{#if useGradient}
				<label class="control">
					<span>Gradient hot colour</span>
					<input type="color" bind:value={gradientFrom} />
					<input type="text" bind:value={gradientFrom} maxlength="7" />
				</label>

				<label class="control">
					<span>Opacity ({gradientOpacity.toFixed(2)})</span>
					<input
						type="range"
						min="0"
						max="1"
						step="0.05"
						bind:value={gradientOpacity}
					/>
				</label>

				<label class="control">
					<span>Hotspot X ({gradientCx}%)</span>
					<input type="range" min="0" max="100" bind:value={gradientCx} />
				</label>

				<label class="control">
					<span>Hotspot Y ({gradientCy}%)</span>
					<input type="range" min="0" max="100" bind:value={gradientCy} />
				</label>

				<label class="control">
					<span>Radius ({gradientR}%)</span>
					<input type="range" min="10" max="100" bind:value={gradientR} />
				</label>
			{/if}
		</div>
	</Section>

	<Section
		label="MDES asset slots"
		note="Each slot uploads separately to the Mastercard MDES portal. Dimensions are fixed — these are the exact pixel sizes the MC upload form requires."
	>
		<div class="slot-grid">
			{#each ['background', 'app-icon', 'cobrand-logo', 'issuer-logo'] as Slot[] as slot (slot)}
				{@const dims = dimsFor(slot)}
				{@const svg = svgFor(slot)}
				<div class="slot">
					<div class="slot-head">
						<div class="slot-name">{slot.replace('-', ' ')}</div>
						<div class="slot-dims">{dims.width} × {dims.height}</div>
					</div>
					<div class="slot-preview" style:aspect-ratio="{dims.width} / {dims.height}">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html svg}
					</div>
					<div class="slot-actions">
						<button onclick={() => downloadSvg(slot)}>
							<Download size={14} stroke-width="1.5" />
							SVG
						</button>
						<button onclick={() => downloadPng(slot)}>
							<Download size={14} stroke-width="1.5" />
							PNG
						</button>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section
		label="MDES submission checklist"
		note="Upload all four assets in this order. Each asset name field accepts up to 30 characters."
	>
		<ol class="checklist">
			<li>
				<strong>Card Background</strong> ({slotDimensionsLabel('background')}, SVG or PNG)
				— suggested name: <code>dashfi-card-bg-{selectedId.slice(0, 16)}</code>
			</li>
			<li>
				<strong>App Icon</strong> ({slotDimensionsLabel('appIcon')}, PNG)
				— suggested name: <code>dashfi-app-icon-{selectedId.slice(0, 16)}</code>
			</li>
			<li>
				<strong>Cobrand Logo</strong> ({slotDimensionsLabel('cobrandLogo')}, SVG or PNG)
				— suggested name: <code>dashfi-cobrand</code>
			</li>
			<li>
				<strong>Issuer Logo</strong> ({slotDimensionsLabel('issuerLogo')}, SVG or PNG)
				— transparent placeholder; suggested name: <code>dashfi-issuer-hide</code>
			</li>
		</ol>
		<p class="note">
			Configure the colour fields separately in MC's UI:
			<strong>Card Background</strong> <code>{bg}</code>,
			<strong>PAN</strong> <code>#FFFFFF</code>,
			<strong>Card Description</strong> <code>#EBEDE4</code>.
		</p>
	</Section>

	<Section label="Do & Don't" note="Common pitfalls when prepping MDES uploads.">
		<DoDontGrid items={dos} />
	</Section>

	<Section
		label="Programmatic access"
		note="Same assets exposed via Dashbook's MCP server and HTTP API. See /developers/install."
	>
		<ul class="docs-list">
			<li>
				<strong>MCP tool</strong>:
				<code>marketing_get_card_art({'{ variant, slot, format }'})</code> returns the SVG inline + URL.
			</li>
			<li>
				<strong>HTTP API</strong>: <code>/api/card/&lt;variant&gt;/&lt;slot&gt;</code>. Slot
				names: <code>background</code>, <code>app-icon</code>, <code>cobrand-logo</code>,
				<code>issuer-logo</code>, <code>preview</code>. Returns SVG with
				<code>Content-Type: image/svg+xml</code>, 24h cache, CORS open.
			</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.variant-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 16px;
	}
	.variant-chip {
		all: unset;
		cursor: pointer;
		padding: 10px 14px;
		border: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 2px;
		transition: border-color var(--dur-fast) var(--easing-out);
	}
	.variant-chip:hover {
		border-color: var(--fg);
	}
	.variant-chip.active {
		border-color: var(--fg);
		background: var(--bg-muted);
	}
	.variant-label {
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.04em;
	}
	.variant-meta {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.variant-desc {
		font-size: 14px;
		color: var(--fg-muted);
		max-width: 640px;
	}

	.preview-stage {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.preview-card {
		width: 100%;
		max-width: 720px;
		aspect-ratio: 1536 / 969;
		overflow: hidden;
	}
	.preview-card :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
	.preview-meta {
		display: flex;
		gap: 24px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
	}

	.preview-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-items: center;
		margin-top: 4px;
	}
	.bundle-btn,
	.preview-btn {
		all: unset;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.04em;
		padding: 10px 14px;
		border: 1px solid var(--border);
		transition:
			border-color var(--dur-fast) var(--easing-out),
			background-color var(--dur-fast) var(--easing-out);
	}
	.bundle-btn {
		background: var(--m-jade, #2b605c);
		color: #fff;
		border-color: var(--m-jade, #2b605c);
		font-weight: 500;
	}
	.bundle-btn:hover:not(:disabled) {
		opacity: 0.88;
	}
	.bundle-btn:disabled {
		opacity: 0.6;
		cursor: progress;
	}
	.preview-btn:hover {
		border-color: var(--fg);
	}
	.bundle-hint {
		font-size: 12px;
		color: var(--fg-muted);
		margin: 0;
		max-width: 540px;
	}

	.control-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 16px;
	}
	.control {
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-size: 13px;
	}
	.control > span {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.control input[type='color'] {
		width: 100%;
		height: 36px;
		border: 1px solid var(--border);
		cursor: pointer;
		padding: 0;
	}
	.control input[type='text'] {
		font-family: var(--font-mono);
		font-size: 12px;
		padding: 6px 8px;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--fg);
	}
	.control input[type='range'] {
		width: 100%;
	}
	.control-full {
		grid-column: 1 / -1;
	}
	.toggle {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-sans);
		font-size: 13px;
		color: var(--fg);
		text-transform: none;
		letter-spacing: 0;
		cursor: pointer;
	}
	.toggle input {
		cursor: pointer;
	}

	.slot-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 20px;
	}
	.slot {
		display: flex;
		flex-direction: column;
		gap: 8px;
		border: 1px solid var(--border);
		padding: 14px;
	}
	.slot-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.slot-name {
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.04em;
		text-transform: capitalize;
	}
	.slot-dims {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--fg-muted);
		letter-spacing: 0.1em;
	}
	.slot-preview {
		width: 100%;
		background: var(--bg-muted);
		overflow: hidden;
	}
	.slot-preview :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
	.slot-actions {
		display: flex;
		gap: 6px;
	}
	.slot-actions button {
		all: unset;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		padding: 6px 10px;
		border: 1px solid var(--border);
		transition: border-color var(--dur-fast) var(--easing-out);
	}
	.slot-actions button:hover {
		border-color: var(--fg);
	}

	.checklist {
		font-size: 14px;
		line-height: 1.8;
		padding-left: 20px;
	}
	.checklist code {
		font-family: var(--font-mono);
		font-size: 12px;
		padding: 1px 4px;
		background: var(--bg-muted);
	}
	.note {
		font-size: 13px;
		color: var(--fg-muted);
		margin-top: 12px;
	}
	.note code {
		font-family: var(--font-mono);
		font-size: 12px;
		padding: 1px 4px;
		background: var(--bg-muted);
		color: var(--fg);
	}
</style>
