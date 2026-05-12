# Dashbook Figma library — handoff brief

Source of truth for building the Dashbook Figma file (`sN3gd41e7FhsyoQ7WqJu0j`).

Mirrors the dashbook code repo at `/Users/zy/dev/dashbook/` as of v0.7.0
(plan date 2026-05-11). Cross-references throughout point at live dashbook
pages — open `https://brand.dash.fi` (or `pnpm dev` locally) in a second
window while working through this document.

The dashbook code agent never writes the Figma file. The Figma file mirrors
the code; the code never mirrors Figma. If a value here contradicts
`/Users/zy/dev/dashbook/src/app.css`, the CSS is right and this document is
stale — flag it.

## How to use this document

Work top-to-bottom. The order is dependency order: primitives before
aliases, variables before text styles, foundations before components. Use
the checklists at the end of each section to track progress.

Voice rules (apply to every label, description, page name, and component
name in Figma): sentence case, no exclamation marks, no emoji, no
"click here", numerals not spelled-out numbers, contractions OK.

---

## 1. Figma file structure

Eight top-level pages, in this exact order. Names use sentence case.

| # | Page name        | Purpose                                                                                                                     | Dashbook URL                                  |
| - | ---------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 1 | Cover            | File cover: dashbook wordmark, version, last-updated date, link to brand.dash.fi.                                           | `/`                                           |
| 2 | Brand            | Logo, color, typography, voice, motion, photography, iconography. One frame per subsection.                                 | `/brand`                                      |
| 3 | Foundations      | Color · Typography · Spacing · Radius · Elevation · Motion · Accessibility · Data viz · Currency. One frame per subsection. | `/foundations`                                |
| 4 | Components       | 60 component frames, grouped by Inputs · Display · Feedback · Navigation · Layout · Data.                                   | `/components`                                 |
| 5 | Patterns         | 6 recipes (transaction list, metric card, settings section, destructive confirmation, empty state, card detail).            | `/patterns`                                   |
| 6 | Resources        | Token list, design checklist, link card to GitHub + Storybook, this handoff.                                                | `/developers`                                 |
| 7 | Press & Partners | Wordmark + app-icon asset frames, media contacts block, legal disclosure library, partner co-branding (when shipped).       | `/press`                                      |
| 8 | Changelog        | Dated release notes mirroring `/changelog`.                                                                                 | `/changelog`                                  |

Page-level frame naming convention: `Section / Subsection` (e.g.
`Brand / Color`, `Foundations / Accessibility`, `Components / Inputs / Button`).

---

## 2. Variable collections

Three collections, set up in this order. All hex values come from
`/Users/zy/dev/dashbook/src/app.css`.

### 2.1 Collection: Base palette (single mode)

Collection name: `Base palette`. Mode name: `Default`. Variable type:
`Color`. These are the 13 brand primitives — every other color variable
should resolve back to one of these.

| Variable name           | Type  | Value (Default)                  | Notes                                                  |
| ----------------------- | ----- | -------------------------------- | ------------------------------------------------------ |
| `dash/cobalt`           | Color | `#354CEF`                        | Marketing brand primary.                               |
| `dash/cobalt-deep`      | Color | `#2A3ECC`                        | Cobalt pressed.                                        |
| `dash/periwinkle`       | Color | `#B6C1F2`                        | Cobalt tint.                                           |
| `dash/mist`             | Color | `#E7E7F0`                        | Cool gray neutral.                                     |
| `dash/cream`            | Color | `#EBEDE4`                        | Warm cream surface.                                    |
| `dash/white`            | Color | `#FFFFFF`                        |                                                        |
| `dash/yellow`           | Color | `#EBFF00`                        | Electric highlight — sparing use only.                 |
| `dash/yellow-glow`      | Color | `rgba(235, 255, 0, 0.5)`         | Set alpha to 50%. Used for glow effects.               |
| `dash/jade`             | Color | `#2B605C`                        | Product brand accent.                                  |
| `dash/jade-deep`        | Color | `#123B39`                        | Body text on light surfaces.                           |
| `dash/ink`              | Color | `#25261D`                        | Default button background, deck cover background.      |
| `dash/graphite`         | Color | `#505148`                        | Warm gray body copy.                                   |
| `dash/graphite-soft`    | Color | `#80817A`                        | Softest warm gray.                                     |

Figma path convention: use forward slashes in the variable name to create
folder grouping (`dash/cobalt` shows up under a `dash` folder).

### 2.2 Collection: Product semantic (two modes: Light, Dark)

Collection name: `Product semantic`. Modes: `Light` (default), `Dark`.
Variable type: `Color`. These power the Dashbook portal chrome and the
component preview canvases. Where possible, alias the value to a base
palette variable instead of typing a hex.

| Variable name        | Type  | Value (Light)        | Value (Dark)         | Alias hint                                       |
| -------------------- | ----- | -------------------- | -------------------- | ------------------------------------------------ |
| `bg`                 | Color | `#FAF8F1`            | `#0F1413`            | Light is a cream-tinted off-white; dark is jade-ink. |
| `bg-muted`           | Color | `#ECEAE0`            | `#181E1D`            |                                                  |
| `fg`                 | Color | `#123B39`            | `#FFFFFF`            | Light = `dash/jade-deep`; dark = `dash/white`.    |
| `fg-muted`           | Color | `#6E7878`            | `#8B9695`            |                                                  |
| `border`             | Color | `#E8E6DC`            | `#1F2A29`            | Hairline.                                        |
| `input-border`       | Color | `#B6C0BF`            | `#1F2A29`            |                                                  |
| `primary`            | Color | `#000000`            | `#FFFFFF`            | Note: portal `--primary` is true black/white. The Tailwind `--color-primary` is `dash/ink` in light — see §2.4. |
| `primary-fg`         | Color | `#FFFFFF`            | `#000000`            |                                                  |
| `brand`              | Color | `#2B605C`            | `#5BB8B0`            | Light = `dash/jade`; dark lifts to teal `#5BB8B0`. |
| `brand-fg`           | Color | `#FFFFFF`            | `#FFFFFF`            |                                                  |
| `destructive`        | Color | `#000000`            | `#FFFFFF`            | Portal-side destructive is monochrome. Tailwind `--color-destructive` is `#FF4000` orange — that lives in §2.4. |
| `ring`               | Color | `#2B605C`            | `#5BB8B0`            | Focus ring = brand.                              |
| `card`               | Color | `#FAF8F1`            | `#0F1413`            | Same as `bg`.                                    |
| `popover`            | Color | `#FFFFFF`            | `#141A19`            |                                                  |

### 2.3 Collection: Marketing aliases (single mode)

Collection name: `Marketing aliases`. Mode name: `Default`. Variable type:
`Color`. Every entry below MUST be set up as an alias to a `Base palette`
variable, not as a hex. If you find yourself typing a hex into this
collection, you've made a mistake — go back to §2.1.

| Variable name      | Aliases to            | Resolves to (reference only) |
| ------------------ | --------------------- | ---------------------------- |
| `m/cobalt`         | `dash/cobalt`         | `#354CEF`                    |
| `m/cobalt-deep`    | `dash/cobalt-deep`    | `#2A3ECC`                    |
| `m/lavender`       | `dash/periwinkle`     | `#B6C1F2`                    |
| `m/cobalt-dust`    | `dash/mist`           | `#E7E7F0`                    |
| `m/cream`          | `dash/cream`          | `#EBEDE4`                    |
| `m/yellow`         | `dash/yellow`         | `#EBFF00`                    |
| `m/jade`           | `dash/jade`           | `#2B605C`                    |
| `m/jade-deep`      | `dash/jade-deep`      | `#123B39`                    |
| `m/near-black`     | `dash/ink`            | `#25261D`                    |
| `m/warm-fg`        | `dash/graphite`       | `#505148`                    |

### 2.4 Note on Tailwind theme colors (informational only — do NOT duplicate)

The dashbook code repo also defines a second set of CSS variables under
Tailwind's `@theme` directive (e.g. `--color-primary: #25261D`,
`--color-brand: #2B605C`, `--color-destructive: #FF4000`). These are
consumed by `@dashfi/svelte` components running inside `.preview-canvas`.
For Figma purposes we treat them as already covered by §2.1 and §2.2:

- Tailwind `--color-primary` (`#25261D` light / `#FFFFFF` dark) ≈ alias to `dash/ink` in light, `dash/white` in dark
- Tailwind `--color-brand` matches §2.2 `brand`
- Tailwind `--color-destructive` (`#FF4000`) is the only one with no base palette primitive — if a component needs it, alias the destructive token to a new local color `#FF4000` named `orange` in the component-local override panel. Do not add it to `Base palette` (per the plan, the 13 are frozen).
- Tailwind `--color-cobalt-foreground`, `--color-orange-foreground` etc. all resolve to `dash/white`.

### Section checklist

- [ ] Created `Base palette` collection with 13 variables
- [ ] Created `Product semantic` collection with both modes and 14 variables each
- [ ] Created `Marketing aliases` collection with 10 alias variables
- [ ] Verified every marketing alias points at a base primitive, not a hex
- [ ] Verified dark-mode swap by toggling the file mode

---

## 3. Text styles

8 text styles, mapped to the semantic classes in
`/Users/zy/dev/dashbook/src/app.css` (`@layer components`). All values
below are copied verbatim from `app.css` and from
`/Users/zy/dev/dashbook/src/routes/brand/typography/+page.svelte`.

Font stack (set these as the file's primary fonts):

- `PP Supply Mono` — weights 200 (Ultralight) and 400 (Regular). Self-hosted OTF.
- `Bai Jamjuree` — weights 400, 500, 600, 700.
- `PP Supply Sans` — weights 200, 400. Used rarely; secondary display only.

Style names use `Title case / Variant` so they group in Figma's text-style
panel.

### 3.1 `Heading / Display`

- Family: `PP Supply Mono`
- Weight: 200 Ultralight
- Size: 72px (set this as the canonical Figma size; the CSS uses `clamp(2.5rem, 6vw, 4.5rem)` which tops out at 72)
- Line height: 90% (0.9 × size)
- Letter spacing: -1% (-0.01em)
- Text case: UPPERCASE
- Color: bind to `Product semantic / fg`

### 3.2 `Heading / Page label`

- Family: `PP Supply Mono`
- Weight: 400 Regular
- Size: 12px (0.75rem)
- Line height: 140% (1.4)
- Letter spacing: 30% (0.3em)
- Text case: UPPERCASE
- Color: bind to `Product semantic / fg-muted`

### 3.3 `Heading / Section header`

- Family: `PP Supply Mono`
- Weight: 500 (use 400 Regular if 500 isn't available in the licensed weight set; CSS spec says 500)
- Size: 11px (0.6875rem)
- Line height: 140% (1.4)
- Letter spacing: 15% (0.15em)
- Text case: UPPERCASE
- Color: bind to `Product semantic / fg-muted`

Used for both `.section-header`, `.label-caps`, and `.nav-section` in CSS.

### 3.4 `Body / Data value`

- Family: `PP Supply Mono`
- Weight: 400 Regular
- Size: 15px (the data-value class itself has no fixed size; 15px matches default body size)
- Line height: 140%
- Letter spacing: -2% (-0.02em)
- Text case: As typed
- Numeric: tabular figures ON
- Color: bind to `Product semantic / fg`

### 3.5 `Body / Body lg`

- Family: `Bai Jamjuree`
- Weight: 400 Regular
- Size: 17px (1.0625rem)
- Line height: 160% (1.6)
- Letter spacing: -1% (-0.01em — matches `body { letter-spacing: -0.01em }` in `app.css`)
- Color: bind to `Product semantic / fg`

### 3.6 `Body / Body`

- Family: `Bai Jamjuree`
- Weight: 400 Regular
- Size: 15px (0.9375rem)
- Line height: 160% (1.6)
- Letter spacing: -1% (-0.01em)
- Color: bind to `Product semantic / fg`

### 3.7 `Body / Body sm`

- Family: `Bai Jamjuree`
- Weight: 400 Regular
- Size: 13px (0.8125rem)
- Line height: 150% (1.5)
- Letter spacing: -1% (-0.01em)
- Color: bind to `Product semantic / fg-muted`

### 3.8 `Body / Caption`

- Family: `Bai Jamjuree`
- Weight: 400 Regular
- Size: 12px (0.75rem)
- Line height: 140% (1.4)
- Letter spacing: -1% (-0.01em)
- Color: bind to `Product semantic / fg-muted`

### Scale reference (informational — not text styles)

From `/brand/typography`. Use these only to set heading frames in the
typography specimen page, not as additional text styles.

| Size  | Role                 |
| ----- | -------------------- |
| 12px  | Caption · footnote   |
| 14px  | Body small · UI      |
| 15px  | Body                 |
| 17px  | Body large · lede    |
| 20px  | Subhead              |
| 24px  | Section title        |
| 32px  | Page heading         |
| 48px  | Hero (mid)           |
| 56px  | Hero (page header)   |
| 72px  | Display              |

### Section checklist

- [ ] All 3 font families uploaded to the Figma file
- [ ] All 8 text styles created with exact values above
- [ ] Each text style's color is bound to a Product semantic variable, not a fixed hex
- [ ] Verified dark-mode color swap by toggling the file mode

---

## 4. Component variants

60 components from `/Users/zy/dev/dashbook/src/lib/content/components.ts`.

**Priority order.** Build the canonical 10 with full variant trees first.
Stub the remaining 50 as `Component / <Name>` frames containing only:
the component name (text style: `Heading / Section header`), the import
path (text style: `Body / Data value`, monospace), a status pill, and a
24×24 placeholder rectangle bound to `Product semantic / bg-muted`. They
can be promoted to full variants in a follow-up pass.

### 4.1 Canonical 10 — full variant trees

These 10 are the most-used components in the lib. Build each one in
Figma using component properties (`Variant`, `Boolean`, `Instance swap`,
`Text`) so a designer can configure without re-detaching.

#### Button — `/components/button`

Import: `import { Button } from '@dashfi/svelte/ui/button'`

Variant properties:

- `Variant`: default · brand · destructive · secondary · outline · ghost · link
- `Size`: sm · default · lg · icon
- `State`: rest · hover · focus · pressed · disabled · loading
- `Has icon`: false · leading · trailing · only

Visual specs (from `/Users/zy/dev/dashbook/PLAN.md` §6 button variants table):

| Variant      | Background           | Text             | Notes                                           |
| ------------ | -------------------- | ---------------- | ----------------------------------------------- |
| default      | `dash/ink` `#25261D` | `dash/white`     | Light mode. Dark mode inverts to white-on-ink.  |
| brand        | `dash/jade` `#2B605C`| `dash/white`     | Lifts to `#5BB8B0` in dark mode.                |
| destructive  | `#FF4000` orange     | `dash/white`     | Brand-constant. Not in base palette (see §2.4). |
| secondary    | `dash/cobalt` `#354CEF` | `dash/white`  | Brand-constant.                                 |
| outline      | transparent          | varies           | 1px border `Product semantic / border`.         |
| ghost        | transparent          | `Product semantic / fg` | No border, hover fills with `bg-muted`. |
| link         | transparent          | `brand`          | Underline on hover.                             |

Corner radius: 0 (matches `--radius: 0` in app.css).

#### Badge — `/components/badge`

Import: `import { Badge } from '@dashfi/svelte/ui/badge'`

Variant properties:

- `Variant`: default · secondary · destructive · outline
- `Size`: default

Visual specs: pill-shaped (`radius-full`), short status or category label,
padding 4px 8px, text uses `Body / Caption` style.

#### Card — `/components/card`

Import:
`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@dashfi/svelte/ui/card'`

This is a compound component. Create the parent Card and child instances
for Header, Title, Description, Content, Footer. Use Auto layout vertical
stack.

Variant properties on parent:

- `Has header`: true · false
- `Has footer`: true · false

Visual specs: border `Product semantic / border` 1px, background
`Product semantic / card`, padding 24px, radius 0.

#### Input — `/components/input`

Import: `import { Input } from '@dashfi/svelte/ui/input'`

Variant properties:

- `State`: rest · hover · focus · disabled · error
- `Has icon`: false · leading · trailing
- `Has label`: true · false

Visual specs: height 36px (default size), border 1px
`Product semantic / input-border`, padding-x 12px, text `Body / Body sm`,
focus ring 2px offset `Product semantic / ring`, radius 0.

#### Alert — `/components/alert`

Import: `import { Alert, AlertTitle, AlertDescription } from '@dashfi/svelte/ui/alert'`

Variant properties:

- `Type`: info · success · warning · destructive
- `Has icon`: true · false

Visual specs: 1px border, padding 16px, icon 16×16 leading, title uses
`Body / Body` weight 500, description uses `Body / Body sm`. Map types
to colors:

- info → `dash/cobalt`
- success → `dash/jade`
- warning → `dash/yellow` text on `dash/ink` background (avoid pure yellow on cream)
- destructive → `#FF4000` orange

#### Tabs — `/components/tabs`

Import: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@dashfi/svelte/ui/tabs'`

Variant properties on TabsTrigger:

- `State`: rest · hover · active · disabled

Visual specs: underline indicator on active tab (2px,
`Product semantic / brand`), inactive triggers `fg-muted`, active
trigger `fg`. Text `Body / Body sm` weight 500.

#### Select — `/components/select`

Import:
`import { Select, SelectTrigger, SelectContent, SelectItem } from '@dashfi/svelte/ui/select'`

Variant properties on trigger:

- `State`: rest · hover · open · focus · disabled
- `Has value`: true (filled) · false (placeholder)

Variant properties on item:

- `State`: rest · hover · selected · disabled

Visual specs: trigger matches Input dimensions, chevron 16×16 trailing.
Open panel: shadow `--shadow-md` (0 6px 20px -6px rgba(18, 59, 57, 0.14),
0 1px 2px rgba(18, 59, 57, 0.06)), background `Product semantic / popover`,
border 1px.

#### Dialog — `/components/dialog`

Import:
`import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@dashfi/svelte/ui/dialog'`

Variant properties on DialogContent:

- `Size`: sm (400px) · default (520px) · lg (720px)

Visual specs: backdrop `rgba(0,0,0,0.6)`, content background
`Product semantic / popover`, padding 24px, max-width per size, shadow
`--shadow-md`, radius 0. Title `Body / Body lg` weight 500, description
`Body / Body sm`. Footer auto-layout right-aligned, gap 8px.

#### Switch — `/components/switch`

Import: `import { Switch } from '@dashfi/svelte/ui/switch'`

Variant properties:

- `State`: off · on · disabled-off · disabled-on
- `Focus`: false · true

Visual specs: track 28×16, thumb 12×12 circle, track color
`Product semantic / input-border` off / `Product semantic / brand` on.

#### Checkbox — `/components/checkbox`

Import: `import { Checkbox } from '@dashfi/svelte/ui/checkbox'`

Variant properties:

- `State`: unchecked · checked · indeterminate · disabled
- `Focus`: false · true

Visual specs: 16×16 square (no radius), border 1px
`Product semantic / input-border` unchecked, fill
`Product semantic / brand` checked with white check glyph.

### 4.2 The other 50 — stub frames

For each entry below, create a frame named `Components / <Category> / <Name>`
with:

1. The component name as a heading (text style `Heading / Section header`)
2. The import path in monospace (text style `Body / Data value`)
3. A status pill (Stable · Beta · Deprecated; see status taxonomy below)
4. A placeholder rectangle 240×120, fill `Product semantic / bg-muted`, label "TODO — variant tree pending"

Status taxonomy (from PLAN.md §7):

- **Stable** — API frozen, fully documented
- **Beta** — Functional, API may shift
- **Deprecated** — Reserved (no current entries)

Component inventory follows. Total: 60.

#### Inputs (17)

| Slug                  | Name                  | Status  | Import                                                                                                                                                                                                  |
| --------------------- | --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| button                | Button                | stable  | `import { Button } from '@dashfi/svelte/ui/button'` — full variants in §4.1                                                                                                                            |
| input                 | Input                 | stable  | `import { Input } from '@dashfi/svelte/ui/input'` — full variants in §4.1                                                                                                                              |
| textarea              | Textarea              | stable  | `import { Textarea } from '@dashfi/svelte/ui/textarea'`                                                                                                                                                |
| label                 | Label                 | stable  | `import { Label } from '@dashfi/svelte/ui/label'`                                                                                                                                                      |
| checkbox              | Checkbox              | stable  | `import { Checkbox } from '@dashfi/svelte/ui/checkbox'` — full variants in §4.1                                                                                                                        |
| switch                | Switch                | stable  | `import { Switch } from '@dashfi/svelte/ui/switch'` — full variants in §4.1                                                                                                                            |
| radio-group           | Radio Group           | stable  | `import { RadioGroup, RadioGroupItem } from '@dashfi/svelte/ui/radio-group'`                                                                                                                           |
| select                | Select                | stable  | `import { Select, SelectTrigger, SelectContent, SelectItem } from '@dashfi/svelte/ui/select'` — full variants in §4.1                                                                                  |
| toggle                | Toggle                | stable  | `import { Toggle } from '@dashfi/svelte/ui/toggle'`                                                                                                                                                    |
| toggle-group          | Toggle Group          | stable  | `import { ToggleGroup, ToggleGroupItem } from '@dashfi/svelte/ui/toggle-group'`                                                                                                                        |
| calendar              | Calendar              | stable  | `import { Calendar } from '@dashfi/svelte/ui/calendar'`                                                                                                                                                |
| multi-select          | Multi Select          | beta    | `import { MultiSelect } from '@dashfi/svelte/ui/multi-select'`                                                                                                                                         |
| phone-input           | Phone Input           | beta    | `import { PhoneInput } from '@dashfi/svelte/ui/phone-input'`                                                                                                                                           |
| tel-input             | Tel Input             | beta    | `import { TelInput } from '@dashfi/svelte/ui/tel-input'`                                                                                                                                               |
| date-range-selector   | Date Range Selector   | beta    | `import { DateRangeSelector } from '@dashfi/svelte/ui/date-range-selector'`                                                                                                                            |
| range-calendar        | Range Calendar        | beta    | `import { RangeCalendar } from '@dashfi/svelte/ui/range-calendar'`                                                                                                                                     |
| form                  | Form                  | beta    | `import { FormField, FormLabel, FormControl, FormDescription, FormFieldErrors } from '@dashfi/svelte/ui/form'`                                                                                         |

#### Display (14)

| Slug             | Name             | Status  | Import                                                                                                                       |
| ---------------- | ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| badge            | Badge            | stable  | `import { Badge } from '@dashfi/svelte/ui/badge'` — full variants in §4.1                                                    |
| avatar           | Avatar           | stable  | `import { Avatar, AvatarImage, AvatarFallback } from '@dashfi/svelte/ui/avatar'`                                             |
| pill             | Pill             | stable  | `import { Pill } from '@dashfi/svelte/ui/pill'` — types: base · info · success · warning · danger                            |
| empty            | Empty            | stable  | `import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@dashfi/svelte/ui/empty'`                   |
| separator        | Separator        | stable  | `import { Separator } from '@dashfi/svelte/ui/separator'`                                                                    |
| skeleton         | Skeleton         | stable  | `import { Skeleton } from '@dashfi/svelte/ui/skeleton'`                                                                      |
| code-block       | Code Block       | beta    | `import { CodeBlock } from '@dashfi/svelte/ui/code-block'`                                                                   |
| alert-error      | Alert Error      | beta    | `import { AlertError } from '@dashfi/svelte/ui/alert-error'`                                                                 |
| indicator        | Indicator        | beta    | `import { Indicator } from '@dashfi/svelte/ui/indicator'`                                                                    |
| item             | Item             | beta    | `import { Item, ItemContent, ItemTitle, ItemDescription, ItemMedia, ItemActions } from '@dashfi/svelte/ui/item'`             |
| logo             | Logo             | stable  | `import { Logo, LogoSmall, LogoApp } from '@dashfi/svelte/ui/logo'`                                                          |
| merchant-logo    | Merchant Logo    | beta    | `import { MerchantLogo } from '@dashfi/svelte/ui/merchant-logo'`                                                             |
| flow-lines       | Flow Lines       | beta    | `import { FlowLines } from '@dashfi/svelte/ui/flow-lines'`                                                                   |
| magnetic-hover   | Magnetic Hover   | beta    | `import { MagneticHover } from '@dashfi/svelte/ui/magnetic-hover'`                                                           |

#### Feedback (15)

| Slug              | Name              | Status  | Import                                                                                                                                                                                                                                |
| ----------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alert             | Alert             | stable  | `import { Alert, AlertTitle, AlertDescription } from '@dashfi/svelte/ui/alert'` — full variants in §4.1                                                                                                                              |
| alert-dialog      | Alert Dialog      | stable  | `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@dashfi/svelte/ui/alert-dialog'`                                                |
| dialog            | Dialog            | beta    | `import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@dashfi/svelte/ui/dialog'` — full variants in §4.1                                                                              |
| sheet             | Sheet             | stable  | `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@dashfi/svelte/ui/sheet'`                                                                                                              |
| popover           | Popover           | beta    | `import { Popover, PopoverTrigger, PopoverContent } from '@dashfi/svelte/ui/popover'`                                                                                                                                                |
| tooltip           | Tooltip           | beta    | `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@dashfi/svelte/ui/tooltip'`                                                                                                                               |
| progress          | Progress          | stable  | `import { Progress } from '@dashfi/svelte/ui/progress'`                                                                                                                                                                              |
| linear-loader     | Linear Loader     | stable  | `import { LinearLoader } from '@dashfi/svelte/ui/linear-loader'`                                                                                                                                                                     |
| loader            | Loader            | stable  | `import { Loader } from '@dashfi/svelte/ui/loader'`                                                                                                                                                                                  |
| spinner           | Spinner           | beta    | `import { Spinner } from '@dashfi/svelte/ui/spinner'`                                                                                                                                                                                |
| drawer            | Drawer            | beta    | `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@dashfi/svelte/ui/drawer'`                                                                                                       |
| fullscreen-dialog | Fullscreen Dialog | beta    | `import { FullscreenDialog } from '@dashfi/svelte/ui/fullscreen-dialog'`                                                                                                                                                             |
| hover-card        | Hover Card        | beta    | `import { HoverCard, HoverCardTrigger, HoverCardContent } from '@dashfi/svelte/ui/hover-card'`                                                                                                                                       |
| sonner            | Toast (Sonner)    | beta    | `import { Toaster } from '@dashfi/svelte/ui/sonner'`                                                                                                                                                                                 |
| support-modal     | Support Modal     | beta    | `import { SupportModal } from '@dashfi/svelte/ui/support-modal'`                                                                                                                                                                     |

#### Navigation (9)

| Slug            | Name            | Status  | Import                                                                                                                                                                                                |
| --------------- | --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tabs            | Tabs            | stable  | `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@dashfi/svelte/ui/tabs'` — full variants in §4.1                                                                                          |
| accordion       | Accordion       | stable  | `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@dashfi/svelte/ui/accordion'`                                                                                          |
| collapsible     | Collapsible     | beta    | `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@dashfi/svelte/ui/collapsible'`                                                                                                |
| breadcrumb      | Breadcrumb      | stable  | `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@dashfi/svelte/ui/breadcrumb'`                                                      |
| pagination      | Pagination      | beta    | `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@dashfi/svelte/ui/pagination'`                                                    |
| dropdown-menu   | Dropdown Menu   | beta    | `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@dashfi/svelte/ui/dropdown-menu'`                                                                          |
| scroll-area     | Scroll Area     | beta    | `import { ScrollArea, ScrollBar } from '@dashfi/svelte/ui/scroll-area'`                                                                                                                              |
| command         | Command         | beta    | `import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandSeparator, CommandEmpty } from '@dashfi/svelte/ui/command'`                                                          |
| navigation      | Sub Navigation  | beta    | `import { SubNavigation } from '@dashfi/svelte/ui/navigation'`                                                                                                                                       |

#### Layout (1)

| Slug | Name | Status | Import                                                                                                                            |
| ---- | ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| card | Card | stable | `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@dashfi/svelte/ui/card'` — full variants in §4.1 |

#### Data (4)

| Slug           | Name           | Status | Import                                                                                                                       |
| -------------- | -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| table          | Table          | beta   | `import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@dashfi/svelte/ui/table'`                    |
| enhanced-table | Enhanced Table | beta   | `import { EnhancedTable } from '@dashfi/svelte/ui/enhanced-table'`                                                           |
| data-table    | Data Table     | beta   | `import { createSvelteTable } from '@dashfi/svelte/ui/data-table'`                                                           |
| table-filters  | Table Filters  | beta   | `import { SearchFilter, DateRangeFilter, FilterButton } from '@dashfi/svelte/ui/table-filters'`                              |

### Section checklist

- [ ] Canonical 10 built with full variant trees
  - [ ] Button
  - [ ] Badge
  - [ ] Card
  - [ ] Input
  - [ ] Alert
  - [ ] Tabs
  - [ ] Select
  - [ ] Dialog
  - [ ] Switch
  - [ ] Checkbox
- [ ] Remaining 50 stub frames created with name, import path, status pill, placeholder
- [ ] Every component fill bound to a variable, not a hex
- [ ] Every text bound to a text style, not a free-form font setting

---

## 5. Code Connect

For the canonical 10, add Code Connect mappings using the import paths in
§4.1. Use the Figma Code Connect Svelte template. Example for Button:

```
import { Button } from '@dashfi/svelte/ui/button'
```

Map Figma variant properties → Svelte props:

- `Variant` → `variant` prop ('default' | 'brand' | 'destructive' | 'secondary' | 'outline' | 'ghost' | 'link')
- `Size` → `size` prop ('sm' | 'default' | 'lg' | 'icon')
- `State=disabled` → `disabled={true}`
- `State=loading` → `loading={true}`

Repeat for the other 9 canonical components, deriving prop names from the
component's source in `/Users/zy/dev/dash/core/libs/svelte-components/lib/`.

Stub components don't get Code Connect until they're built out.

### Section checklist

- [ ] Code Connect template authored for each of the canonical 10
- [ ] Each Code Connect import line matches `components.ts` exactly
- [ ] No emoji or exclamation marks in any Code Connect comment

---

## 6. Page contents (what goes on each Figma page)

The page structure was defined in §1. Below is the content brief for each
page — what frames go inside.

### Brand

Mirror `/brand` and its subpages. One frame per subsection in this order:

1. Logo — show wordmark and app icon, both light and dark variant. Link to `/brand/logo`.
2. Color — every base palette swatch (13) with hex and variable name in mono. Link to `/foundations/color`.
3. Typography — full type specimen using the 8 text styles. Mirror `/brand/typography` layout: hero, families, scale table, casing rules, downloads, license, do/don't. Link to `/brand/typography`.
4. Voice — short list of voice rules from PLAN.md §13. Sentence case, no exclamation marks, no emoji, contractions OK, numerals, "you" / "we".
5. Motion — 3 easings, 4 durations as labelled rectangles. Reference values from app.css `:root` block (`--easing-out`, `--easing-in`, `--easing-default`, `--dur-instant 50ms`, `--dur-fast 150ms`, `--dur-normal 300ms`, `--dur-slow 500ms`).
6. Photography — placeholder; copy from `/brand/photography`.
7. Iconography — `@lucide/svelte` icon set sample. No emoji, no second icon library.

### Foundations

Mirror `/foundations` — 9 subpages.

1. Color — same swatches as Brand / Color, plus product semantic and marketing aliases.
2. Typography — type scale only (the 10-step pixel ladder).
3. Spacing — 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 128 px scale (verify against dashbook code).
4. Radius — 0 (default), 4 (sm), 6 (md), 8 (lg), 9999 (full).
5. Elevation — 2 shadows from app.css: `--shadow-sm` and `--shadow-md`.
6. Motion — same as Brand / Motion.
7. Accessibility — WCAG 2.2 AA targets, focus ring spec, contrast table, motion reduction notes.
8. Data viz — tabular numerics, semantic up/down/neutral, 5-series chart palette.
9. Currency — USD/EUR/GBP/JPY rendering examples.

### Components

Six section dividers (Inputs · Display · Feedback · Navigation · Layout ·
Data) with the inventory from §4 below them. One frame per component.

### Patterns

6 frames, one per recipe from PLAN.md §8:

1. Transaction list (Data) — uses SearchFilter, SelectFilter, Table, Pagination, Pill, Badge
2. Metric card (Data) — uses Card, Pill
3. Settings section (Forms) — uses Label, Input, Switch, Separator, Button
4. Destructive confirmation (Confirmation) — uses Button, AlertDialog
5. Empty state (States) — uses Empty, Button
6. Card detail (Layout) — uses Card, Pill, Progress, Switch, Button, Separator

### Resources

- Token list reference (cross-link to §2 of this doc)
- Designer checklist (copy from §7 of this doc)
- Link cards: GitHub repo, Storybook, brand.dash.fi, this handoff document
- Status legend (Stable / Beta / Deprecated)

### Press & Partners

- Logo download frames — wordmark and app icon, light + dark
- Media contacts block
- Legal disclosure library — copy strings from `/press`
- Partner co-branding rules (pending — code agent is finishing this section)

### Changelog

- Dated release notes through v0.7.0. Mirror `/changelog`.

---

## 7. Designer checklist (to copy onto the Resources page)

Use this when starting a new Figma design that consumes the system.

- [ ] Color: every fill bound to `Product semantic` or `Marketing aliases`, never a raw hex
- [ ] Type: every text node uses one of the 8 text styles
- [ ] Mode: design works in both Light and Dark — toggle file mode and check
- [ ] Hairlines: borders are 1px, color `Product semantic / border`
- [ ] Radius: 0 by default; 4/6/8/full only when component-specified
- [ ] No emoji
- [ ] Sentence case throughout (proper nouns and product names are the only exception)
- [ ] No exclamation marks
- [ ] Numerals not spelled-out
- [ ] Currency prefixed (`$1,200` not `1,200$`)
- [ ] Numbers use tabular figures (set numeric variant to `Tabular` on every numeric text node)
- [ ] Components instantiated, not detached
- [ ] Focus state shown for every interactive element
- [ ] Loading state shown for every async surface
- [ ] Empty state shown for every list

---

## 8. Cross-links

Open these in a second window while building the Figma file:

- Master plan — `/Users/zy/dev/dashbook/PLAN.md`
- Token source — `/Users/zy/dev/dashbook/src/app.css`
- Component inventory — `/Users/zy/dev/dashbook/src/lib/content/components.ts`
- Typography specimen — `/Users/zy/dev/dashbook/src/routes/brand/typography/+page.svelte`
- Live site — `https://brand.dash.fi` (or `pnpm dev` on `http://localhost:5173`)
- Component live previews — `https://brand.dash.fi/components/<slug>`
- Foundations live previews — `https://brand.dash.fi/foundations/<page>` (color · typography · spacing · radius · elevation · motion · accessibility · data-viz · currency)
- Per-pattern live previews — `https://brand.dash.fi/patterns/<slug>`
- Press kit live previews — `https://brand.dash.fi/press`

---

## 9. Open questions for the human

These need answers before the Figma file can be considered complete:

1. Are PP Supply Mono weight 500 glyphs included in the Pangram Pangram license, or should we step down to 400 Regular for section headers? The CSS spec is 500.
2. Should the destructive orange `#FF4000` be added as a 14th base palette primitive, or kept as a component-local color? Plan currently says 13 are frozen.
3. Press kit ZIP composition is still parked in PLAN.md §12 — confirm before building the Press & Partners page assets.
4. Editorial / News tab decision pending (§12) — affects whether the Figma file needs an Editorial page.

---

## 10. Path-A note (not taken in this session)

This handoff was produced because the Figma write-tool was not available
in this agent's environment. When a session does have write access:

1. Open file `sN3gd41e7FhsyoQ7WqJu0j`.
2. Work top-to-bottom through this document.
3. Tick the section checklists as you go.
4. When done, replace this document with a "Figma file is now the source of truth" pointer that links to the file.

_End of handoff. Cross-check against PLAN.md §10 before sign-off._
