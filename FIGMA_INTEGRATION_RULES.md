# Figma Integration Rules — Dashbook + @dashfi/svelte

> Companion to `FIGMA_HANDOFF.md`. This file lives here because the figma-desktop
> MCP (which agents use to read designs and write code) needs a rules doc to
> understand how to map Figma → this codebase. The HANDOFF doc covers the
> reverse direction (code → Figma authoring instructions for a designer).

---

## TL;DR for an agent using the figma-desktop MCP

When you call `get_design_context` on a Figma node and need to convert it to code:

1. **Color tokens** → match against `src/app.css` `@theme` block (Tailwind v4) OR
   the portal layer `@layer base :root` (raw `--bg`, `--fg`, etc.). If the Figma
   variable name matches `--dash-*`, use that primitive directly. If it matches
   `--color-*`, that's a Tailwind utility (use `bg-brand`, `text-primary`, etc.).
2. **Text styles** → match against the 8 semantic classes in `src/app.css`
   `@layer components`: `.heading-display`, `.page-label`, `.section-header`,
   `.data-value`, `.body-lg`, `.body`, `.body-sm`, `.caption`.
3. **Component instances** → look up the import path in
   `src/lib/content/components.ts` (every Dash.fi component has an
   `importPath` field). Always import from `@dashfi/svelte/ui/{slug}`.
4. **Layout** → use `<InnerPage>`, `<PageHeader>`, `<Section>` chrome from
   `src/lib/chrome/` to match the rest of the portal. Don't roll a new layout.
5. **Voice** → sentence case, no emoji, no exclamation marks, contractions OK.
   See `PLAN.md` §13.

---

## 1. Design tokens

### Where they live

- **Canonical hex tokens**: `src/app.css` — the single source of truth.
- **Two layers in `app.css`**:
  - `@theme { ... }` — Tailwind v4 generates utilities from this
    (`--color-brand` → `bg-brand`, `text-brand`).
  - `@layer base :root { ... }` — portal chrome reads these directly
    (`var(--bg)`, `var(--fg)`, `var(--brand)`).
- **Lib HSL tokens**: `lib/styles/global.css` — same semantic names, HSL-formatted,
  scoped to `.preview-canvas` only. **Do not edit these from the portal side.**

### Token tiers

| Tier | Prefix     | Scope               | Example                    | Examples of values                       |
| ---- | ---------- | ------------------- | -------------------------- | ---------------------------------------- |
| 1    | `--dash-*` | Base palette        | `--dash-jade: #2B605C`     | 13 brand primitives                      |
| 2    | none       | Product semantic    | `--brand`, `--bg`, `--fg`  | Light + dark modes                       |
| 2b   | `--color-*`| Tailwind theme      | `--color-brand`            | Sourced from Tier 2 with one indirection |
| 3    | `--m-*`    | Marketing aliases   | `--m-jade`, `--m-cobalt`   | Reference Tier 1 primitives              |

### Mapping a Figma color variable to code

1. If Figma variable name starts with `dash/`, it's Tier 1 → use `var(--dash-*)`.
2. If it's a semantic name (brand/fg/bg/border/etc.), use the Tailwind utility
   (`bg-brand`, `text-fg`) OR the CSS var directly (`var(--brand)`).
3. If it's marketing-prefixed (`m/jade`, etc.), use `var(--m-*)`.

---

## 2. Typography

### 3 self-hosted families

- **PP Supply Mono** (200 / 400) — display headings, big numerics, code, eyebrows
- **PP Supply Sans** (200 / 400) — rare secondary display
- **Bai Jamjuree** (400 / 500 / 600 / 700) — body, UI, reading copy

### 8 semantic text classes (`src/app.css` `@layer components`)

| Class             | Family   | Weight | Size              | Use                                       |
| ----------------- | -------- | ------ | ----------------- | ----------------------------------------- |
| `.heading-display`| Mono     | 200    | clamp(2.5,6vw,4.5rem) | Page hero titles                      |
| `.section-header` | Mono     | 500    | 11px / 0.15em LS  | Section labels                            |
| `.page-label`     | Mono     | 400    | 12px / 0.3em LS   | Breadcrumb eyebrow                        |
| `.label-caps`     | Mono     | 500    | 11px / 0.15em LS  | Capped labels                             |
| `.nav-section`    | Mono     | 500    | 11px / 0.15em LS  | Sidebar section heads                     |
| `.data-value`     | Mono     | 400    | varies            | Big numbers + currency                    |
| `.body-lg`        | Sans     | 400    | 17px / 1.6 LH     | Lede / large body                         |
| `.body`           | Sans     | 400    | 15px / 1.6 LH     | Default body                              |
| `.body-sm`        | Sans     | 400    | 13px / 1.5 LH     | Help text / captions in form rows         |
| `.caption`        | Sans     | 400    | 12px / 1.4 LH     | Footer / small print                      |

### When generating code from Figma text

- Get the Figma text style name (e.g. "Heading/Display").
- Match to the semantic class above. Use `class="heading-display"` etc.
- Never inline `font-family` / `font-size` / `line-height` for things that match
  a semantic class — defeats the typography system.

---

## 3. Components

### Location

- **Lib** (`@dashfi/svelte`): `/Users/zy/dev/dash/core/libs/svelte-components/lib/src/lib/ui/{slug}/`
- **Portal docs** (this repo): `src/routes/components/{slug}/+page.svelte`
- **Inventory**: `src/lib/content/components.ts` — every component has
  `slug`, `name`, `description`, `category`, `status`, `importPath`. 60 total.

### Import pattern

```svelte
<script lang="ts">
  import { Button } from '@dashfi/svelte/ui/button';
  import {
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
  } from '@dashfi/svelte/ui/card';
</script>
```

### When Figma shows a button-shaped instance

1. Identify the variant from the Figma instance's variant properties (`variant`,
   `size`).
2. Map to `<Button variant="..." size="...">`.
3. Variants available: `default`, `brand`, `destructive`, `secondary`,
   `outline`, `ghost`, `link`.
4. Sizes: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`.
5. For icon-only buttons, always add `aria-label="..."`.

### When Figma shows something that isn't a known component

1. Check `src/lib/content/components.ts` — there might be a less-obvious primitive
   that fits (e.g. `Pill` for status chips, `Indicator` for presence dots,
   `Item` for list rows).
2. If genuinely new, **don't invent it inside dashbook**. Add the component to
   the lib (`libs/svelte-components/lib/src/lib/ui/`) first, then document it
   here. See `/developers` § "Add a new component".

---

## 4. Layout chrome (dashbook-specific)

Three reusable layout primitives in `src/lib/chrome/`:

| Chrome           | Use                                                                |
| ---------------- | ------------------------------------------------------------------ |
| `InnerPage`      | Page wrapper — sidebar (optional, via section) + content column   |
| `PageHeader`     | Eyebrow label + display heading + lede paragraph                  |
| `Section`        | Content block — section header + optional note + children         |

### Page skeleton

```svelte
<script lang="ts">
  import InnerPage from '$chrome/InnerPage.svelte';
  import PageHeader from '$chrome/PageHeader.svelte';
  import Section from '$chrome/Section.svelte';
</script>

<InnerPage section="/foundations" wide>
  <PageHeader label="Foundations / Color" title="Color." lede="..." />

  <Section label="Base palette" note="Optional descriptive note">
    <!-- content -->
  </Section>
</InnerPage>
```

- `section` prop tells `InnerPage` which nav section's sidebar to show. If the
  matching `primaryNav` entry has children, sidebar renders; otherwise the
  layout is full-width.
- `wide` prop bumps content `max-width` from 880px to 1100px. Use for
  Components, Patterns, Press, Brand, Foundations pages.

---

## 5. Assets

- **Static SVGs**: `static/assets/*.svg` and `static/favicon.svg`. Use
  `currentColor` so `color: ...` from the parent paints the mark.
- **Fonts**: `static/fonts/PPSupply{Mono,Sans}-{Weight}.otf`. Self-hosted.
- **Wordmark + app icon**: Use `<LogoMark variant="wordmark" />` from
  `$chrome/LogoMark.svelte` — currentColor-aware, supports `accent` prop for
  the `.fi` dot / app `d` glyph.
- **Image optimization**: We don't ship a CDN. Static-site adapter inlines small
  assets. Don't add a third-party image processor; keep it simple.

---

## 6. Icons

- **Only Lucide.** Imported per-icon: `import Plus from '@lucide/svelte/icons/plus'`.
- **Stroke width 1.5** by default. Size 14–18px inside buttons, 16–24px for
  standalone affordances, 28+px for empty-state icons.
- **No emoji, no second icon library.** This is non-negotiable.

```svelte
<Button>
  <Plus size={16} strokeWidth={1.5} />
  New transaction
</Button>
```

---

## 7. Styling approach

- **Tailwind v4 via `@theme` directive** (preferred). Inside lib components.
- **Scoped Svelte `<style>` blocks** for dashbook chrome — most foundation,
  brand, patterns, and developers pages do this. Tailwind classes are still
  available but most chrome uses raw CSS for tightness.
- **CSS custom properties** for design tokens (see §1).
- **`tailwind-variants` + `tailwind-merge`** for component variants in the lib.
- **No CSS-in-JS**, no Styled Components, no Emotion.
- **Responsive**: mobile-first via `@media (min-width: 720px)` / `(max-width: 720px)`.

---

## 8. Project structure quick map

```
dashbook/
├── PLAN.md                        ← single source of truth
├── FIGMA_HANDOFF.md               ← code → Figma authoring brief
├── FIGMA_INTEGRATION_RULES.md     ← this file (Figma → code rules)
├── src/
│   ├── app.css                    ← tokens + base + typography classes
│   ├── lib/
│   │   ├── chrome/                ← 25 portal-specific UI primitives
│   │   │   ├── InnerPage.svelte
│   │   │   ├── PageHeader.svelte
│   │   │   ├── Section.svelte
│   │   │   ├── LogoMark.svelte    ← supports accent prop
│   │   │   ├── AssetConfigurator.svelte
│   │   │   ├── CodeSnippet.svelte
│   │   │   ├── PropsTable.svelte
│   │   │   ├── PatternLayout.svelte
│   │   │   └── ...
│   │   ├── content/               ← static data
│   │   │   ├── components.ts      ← 60-component inventory
│   │   │   ├── patterns.ts        ← 6-pattern inventory
│   │   │   ├── nav.ts             ← 8-page IA
│   │   │   └── tokens.ts
│   │   └── tokens.ts
│   └── routes/
│       ├── +page.svelte           ← Overview
│       ├── brand/{logo,color,...}
│       ├── foundations/{color,typography,...}
│       ├── components/{slug}      ← 60 component pages
│       ├── patterns/{slug}        ← 6 pattern pages
│       ├── developers/+page.svelte
│       ├── press/+page.svelte
│       └── changelog/+page.svelte
└── static/{fonts,assets}/
```

---

## 9. Common Figma → code mappings (cheat sheet)

| Figma element                  | Codegen target                                    |
| ------------------------------ | ------------------------------------------------- |
| Frame with rounded corners     | `<Card>` (use the right `CardX` subcomponents)    |
| Pill / badge                   | `<Pill type="...">` or `<Badge variant="...">`    |
| Filled rectangle button        | `<Button variant="brand">`                        |
| Outlined button                | `<Button variant="outline">`                      |
| Icon-only button               | `<Button variant="ghost" size="icon">` + `aria-label` |
| Text input                     | `<Input>`                                         |
| Toggle / switch                | `<Switch>`                                        |
| Checkbox                       | `<Checkbox>`                                      |
| Tab bar                        | `<Tabs>` + `<TabsList>` + `<TabsTrigger>`         |
| Modal                          | `<Dialog>` (or `<AlertDialog>` for destructive)   |
| Side sheet                     | `<Sheet>`                                         |
| Bottom drawer                  | `<Drawer>`                                        |
| Cmd+K palette                  | `<Command>`                                       |
| Table                          | `<Table>` (simple) or `<EnhancedTable>` (sortable / paginated) |
| Date range                     | `<DateRangeSelector>`                             |
| Phone input                    | `<PhoneInput allowedCountryCodes={...}>`          |
| Empty state                    | `<Empty>` + `<EmptyHeader>` + `<EmptyContent>`    |
| Avatar circle                  | `<Avatar>` + `<AvatarImage>` + `<AvatarFallback>` |
| Status dot                     | `<Indicator>`                                     |

---

## 10. Adapting Figma output — what NOT to do

- **Don't copy pixel values inline.** If Figma says `padding-top: 18px`,
  pick the nearest token (12 / 16 / 20 / 24 / 32 / 48 / 64) or use the spacing
  utilities (`pt-4`, `pt-5`, etc.).
- **Don't import a new icon library** because Figma used Material icons.
  Translate to Lucide. If a Lucide equivalent doesn't exist, ask.
- **Don't copy the Figma frame layer name** as a class name. Use semantic
  names that match the chrome (`.cell`, `.matrix-row`, `.tier`, etc.).
- **Don't introduce new colors** even if Figma has them. Open a token PR
  against `app.css` first.

---

## 11. Validation

After generating code from a Figma design:

```bash
cd /Users/zy/dev/dashbook
pnpm check              # svelte-check — should be 0 errors
pnpm build              # adapter-static — should write to ./build cleanly
```

If a new component renders wrong inside `.preview-canvas`, that's almost always
the HSL token layer (lib's `global.css`) vs. hex token layer (portal `app.css`)
divergence. Check `PreviewCanvas.svelte` for the scoped token definitions.
