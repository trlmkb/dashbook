# Dashbook

Dash.fi brand & design system portal — public, living documentation for designers, engineers, sales, marketing, partners.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:5173
```

## Build

```bash
pnpm check    # svelte-check
pnpm build    # static output to ./build
pnpm preview  # serve the production build locally
```

## Structure

- `src/routes/` — pages (8-page IA: Overview, Brand, Foundations, Components, Patterns, Developers, Press, Changelog)
- `src/lib/chrome/` — portal layout primitives (Header, Sidebar, Footer, ThemeToggle, CommandPalette, Wordmark, Swatch, CopyValue)
- `src/lib/tokens.ts` — canonical token export, mirrored from `dash-fi-app-ds/project/colors_and_type.css`
- `src/lib/content/nav.ts` — IA source of truth
- `static/fonts/` — PP Supply Mono + PP Supply Sans (self-hosted, Pangram Pangram commercial license)
- `static/assets/` — logos

Components are consumed from `@dashfi/svelte` (linked via `file:` to `core/libs/svelte-components/lib`).
