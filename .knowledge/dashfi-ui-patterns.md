# dashfi-ui Page Patterns

Source: /Users/zy/dev/dash/core/packages/dashfi-ui/app/src/

## 1. Route Map

Top-level structure uses SvelteKit route groups: `(auth)`, `(onboarding)`, `(protected)`.

### Root
- `/+layout.svelte` — global root layout (whole app shell)
- `/+page.svelte` — root entry / redirect

### `(auth)` group — public auth flows
- `(auth)/+layout.svelte` — auth shell (centered card)
- `(auth)/login/+layout.svelte` — login-specific shell
- `(auth)/login/+page.svelte`
- `(auth)/login/email/+page.svelte`
- `(auth)/login/password/+page.svelte`
- `(auth)/login/2fa/+page.svelte`
- `(auth)/login/discovery/+page.svelte` — Stytch org discovery
- `(auth)/register/complete/+page.svelte`
- `(auth)/(protected)/setup-2fa/+page.svelte` — 2FA setup after partial auth

### `(onboarding)/apply` group — application/qualification flow
- `(onboarding)/apply/+layout.svelte` — outer onboarding wrapper
- `(onboarding)/apply/(steps)/+layout.svelte` — multi-step wizard wrapper
- `(onboarding)/apply/(steps)/+page.svelte` — step landing
- `(onboarding)/apply/approved-application/+page.svelte` — terminal-state page
- `(onboarding)/apply/qualification-rejected/+page.svelte` — terminal-state page
- `(onboarding)/apply/rejected-application/+page.svelte` — terminal-state page

### `(protected)` group — authenticated app
Outer shell: `(protected)/+layout.svelte` (sidebar + topbar + slot).

Section layouts (each adds a section-scoped header / tab bar):
- `accounting/+layout.svelte` → `account-map`, `card-transactions`, `categories`, `payments`
- `analytics/+layout.svelte` → `insights`
- `bill-pay/+layout.svelte` → `overview`, `drafts`, `pending-approval`, `attention`, `approved`, `paid`
- `cards/+layout.svelte` → `overview`, `your-requests`
- `cash-advance/+layout.svelte` → `overview`, `activity`
- `expenses/+layout.svelte` → `policies`, `transactions/+layout.svelte` (nested)
- `inbox/+layout.svelte` → `to-review`, `your-requests`
- `payments/+layout.svelte` → `by-spend-date`
- `people/+layout.svelte` → root, `teams`
- `policy/+layout.svelte` → root + `[type=policy_type]` dynamic param
- `rewards/+layout.svelte` → `overview`, `cards`, `transactions`, `terms`
- `settings/+layout.svelte` → root + `business`, `developer`, `documents`, `integrations`, `roles`, `users`
- `transactions/+layout.svelte` → `all`, `pending`
- `vendors/+layout.svelte` → `overview`, `drafts`, `for-approval`, `needs-review`, `your-requests`

Section landing pages without their own +layout (direct children of `(protected)/+layout.svelte`):
- `dashboard/+page.svelte`
- `agents/+page.svelte`
- `financial-accounts/+page.svelte`
- `notifications/all/+page.svelte`, `notifications/preferences/+page.svelte`
- `profile/+page.svelte`
- `statements/+page.svelte`

## 2. Layout Patterns

### L1. Root layout (`/+layout.svelte`)
- **Role:** Global app shell — mounts providers, runs once for whole app.
- **Composes:** `ModeWatcher` (mode-watcher), `Toaster` (`@dashfi/svelte/ui/sonner`), `QueryClientProvider` (TanStack), `Beacon` helper (HubSpot).
- **Side effects:** PostHog page-view tracking on every navigation; route-aware beacon init/destroy (destroys on `/login` & `/apply`).
- **Dashbook deps:** `Toaster`. Non-Dashbook: `@tanstack/svelte-query`, `mode-watcher`, PostHog, HubSpot Beacon.
- **No visual chrome** — purely a provider shell.

### L2. `(auth)/+layout.svelte` — Public auth shell
- **Role:** Branded marketing-style auth shell with two-column desktop layout.
- **Visual chrome:** Left `<BrandPanel/>` (desktop-only); right form panel with animated radial-gradient "blob" + `FlowLines` background; jade theme (`#123B39 → #0c1614`) forced via scoped CSS overrides (white text, jade submit buttons, dark-on-light inputs).
- **State:** Localstorage-backed "What's new" announcement banner on `/login` route only.
- **Calls:** `removeInitialLoadingOverlay()` on mount (removes pre-hydration spinner injected at SSR).
- **Dashbook deps:** `Button`, `FlowLines`. Non-Dashbook: `@lucide/svelte`.

### L3. `(auth)/login/+layout.svelte` — Login sub-shell
- **Role:** Adds shared login chrome — top bar with Back-link + Dash logo (suppressed on the root `/login` page); renders Cloudflare Turnstile widget below children on specific login routes (`/login`, `/login/email`, `/login/password`, `/login/password/forgot`).
- **Pattern:** Provides Turnstile token via Svelte `setContext('turnstile', {...})` so descendant pages can gate submit buttons on token presence.
- **Error UX:** Maps Turnstile error codes → human-readable Alert messages with mailto-support fallback.
- **Dashbook deps:** `Button`, `Logo`, `Alert.*`, design tokens (`DT.transition.duration`). Non-Dashbook: `svelte-turnstile`.

### L4. `(onboarding)/apply/+layout.svelte` — Onboarding shell
- **Role:** Standalone header with logo + hamburger `DropdownMenu` (Support, Theme switch, Logout). Full-bleed children below.
- **Differs from L2:** No two-column branding, no Turnstile, no auth gate — this is the post-signup application flow where user is partially authenticated.
- **Dashbook deps:** `Button` (via `buttonVariants`), `Logo`, `DropdownMenu.*`. Non-Dashbook: `mode-watcher`.

### L5. `(protected)/+layout.svelte` — Auth gate & global cross-cutting
- **Role:** First-line authenticated wrapper. Doesn't render UI itself — orchestrates app-wide bootstrap:
  - Sets `authContext` from server `data.auth` (user + account + perms).
  - Initializes Knock notifications (token-gated).
  - Identifies user in Sentry, PostHog, structured logger.
  - Initializes per-user/per-account TanStack Query persister (IndexedDB) **before** children render — gates rendering on `persisterReady` so hydrating queries find their cache.
  - Handles `?error=BANK_FEED_LINK_ERROR` query param by toasting + replaceState.
- **Composes:** `RootProvider` (additional context) → `App` (visual shell).
- **Non-Dashbook deps:** Sentry, TanStack, PostHog, Knock, custom logger.

### L6. `(protected)/app.svelte` — Authenticated visual shell
- **Role:** The sidebar + topbar shell every authenticated page lives in.
- **Composes:**
  - `Sidebar.Provider` + `Sidebar.Inset` (Dashbook `@dashfi/svelte/ui/sidebar`) — collapsible app navigation with localStorage-backed `sidebarCollapsed`.
  - `AppSidebar` (`$lib/components/nav`) configured by a permission/feature-flag-driven `nav` array (Dashboard, Inbox, Spend [Cards/Transactions/Payments/Cash Advance], Expenses, Bill Pay, Vendors, Financial Accounts, Accounting, Insights, Agents, Company [People/Policy/Statements/Rewards/Settings]).
  - Sticky `<header>` with `Sidebar.Trigger`, `AccountLimitsDropdown` / `AccountLimitsSheet` (responsive), `AccountPaymentDropdown` / `AccountPaymentSheet`, `NotificationBell`.
  - Cross-cutting alert/banner rail: `SupportModeBanner`, `AccountStatusAlert`.
  - Loader: route transition shows `LoadingSpinner` only on cross-section nav (sibling navigation within the same top-level segment skips the spinner).
  - Global modals/dialogs mounted at shell level: `MakePaymentDialog`, `AutoPaydownSettingsDialog`, `HubSpotSupportFormModal`, `SessionExpiredModal`.
- **Transitions:** Content has `in:fly={{y:8, duration:220}}` / `out:fade={{duration:80}}` between routes.
- **Responsive split:** `MediaQuery('min-width: 64rem')` toggles dropdown ↔ sheet variants of the same control.
- **Permission gating:** Every nav item built via `hasAuthPermissions({anyOf:[…]})` + `isFeatureFlagEnabled` — sets the canonical pattern for permission-gated nav.
- **Dashbook deps:** `Sidebar.*`. Non-Dashbook deps: `@lucide/svelte`, `svelte/reactivity/MediaQuery`, Svelte transitions.

### L7. Section layouts (per-feature)
Common shape — wraps children in a centered `max-w-(--breakpoint-2xl)` card with section H1 + `SubNavigation` tabs.

- **`bill-pay/+layout.svelte`** — Title "Bill Pay" + right-aligned action cluster (Export button when rows selected via `billSelection` store, `NewBillButton`). Tabs: Overview, Drafts, Needs attention, For approval, For payment, History — each label includes a live count from a separate `getBillsQuery` per status. Wraps children in `<VendorSheetProvider><BillSheetProvider>` — slide-over sheets opened from rows.
- **`settings/+layout.svelte`** — Title "Settings" + horizontal `SubNavigation` tab bar. Tabs are filtered by permission (`user:read.*`, `user-role:write`, `accounting-integration-connection:read`, `document:read`). No actions in header.
- **`transactions/+layout.svelte`** — Same shape but `SubNavigation` is permission-gated via `<ShowIfPermission anyOf={['card-transaction:read.all']}>` — admin sees tabs, non-admin sees only the embedded page content.
- **Same template reused** by: `accounting`, `analytics`, `cards`, `cash-advance`, `expenses`, `inbox`, `payments`, `people`, `policy`, `rewards`, `vendors` layouts.

### L8. `(onboarding)/apply/(steps)/+layout.svelte`
- **Role:** Multi-step wizard sub-shell nested inside L4. Wraps the application step screens. (Not deep-read this pass.)

### L9. `(protected)/+error.svelte` — Error boundary
- **Role:** Custom error page for `(protected)` group. Branches on `error.status === 403` (Lock icon + "no permission" copy) vs. generic 404/500 (broken-page SVG + message + `TraceId` for support).
- **Always offers:** "Go to Dashboard" button as escape hatch.
- **Dashbook deps:** `Button`. Internal: `TraceId` (Sentry trace).

## 3. Page Patterns

### P1. Branded Auth Card — minimal call-to-action stack
- **Where:** `(auth)/login/+page.svelte`, `(auth)/login/email/+page.svelte`, `(auth)/login/password/+page.svelte`, `(auth)/login/2fa/+page.svelte`, `(auth)/register/complete/+page.svelte`
- **Composes:** Mobile-only `Logo`, large display heading (`heading-supply-mono text-6xl/7xl`), subtitle, stacked-2.5 gap `Button` action cluster (social SSO), thin gradient OR-divider, secondary `ghost`-variant link row (Email link · Password).
- **State:** All submit buttons gated on `getContext('turnstile').token` truthiness. PostHog test IDs used on every interactive element.
- **When to use:** Public auth entry point with multiple providers + fallback options.
- **Frequency:** Common (5+ instances).

### P2. Tabbed Section Page with Counts
- **Where:** `(protected)/bill-pay/+layout.svelte` (tabs), pages: `bill-pay/overview`, `bill-pay/drafts`, `bill-pay/attention`, `bill-pay/pending-approval`, `bill-pay/approved`, `bill-pay/paid`. Also `vendors/*`, `inbox/*`.
- **Composes:** Section H1 (font-mono large display) + right-aligned action cluster + `SubNavigation` with live counts in labels + per-tab content area inside a `bg-card rounded-xl shadow-sm` panel.
- **Data shape:** Each tab triggers its own `getXQuery({statuses:'…'})` whose `data.totalCount` becomes the label badge — all queries run in parallel via TanStack so counts are live across tabs.
- **When to use:** Workflow inbox-style sections where users move items through statuses and want to see queue sizes.
- **Frequency:** Common.

### P3. Workflow Table Page (data-table host)
- **Where:** `bill-pay/overview/+page.svelte`, all `bill-pay/[status]` pages, `vendors/*`, `accounting/card-transactions`, `transactions/all`, `transactions/pending`, `expenses/transactions/*`
- **Composes:** A single feature-specific table component (e.g. `BillTable`) bound to `queryParams` $state + a TanStack query whose results feed `bills`/`items`. Optional `groupBy` callback + `renderGroupHeader` (using `renderComponent`) for status grouping. `columnVisibility` $state to hide context-conditional columns. Page-level `$effect` polls (`setInterval`) when items have async work in progress (e.g. invoice parsing).
- **Selection:** Multi-select via a shared `*Selection` store (e.g. `billSelection.svelte.ts`) so the parent layout's header can react with bulk actions (Export, etc.).
- **When to use:** Any list/queue view with filters, pagination, sort, multi-select, status grouping.
- **Frequency:** Most common pattern in the app (15+ instances).

### P4. Dashboard Composition (permission-gated card grid)
- **Where:** `(protected)/dashboard/+page.svelte`
- **Composes:** A responsive grid (`xl:grid-cols-2` when both halves visible) hosting feature "boxes" (`RewardsBox`, `SpendBox`) wrapped in `<ShowIfPermission anyOf={[…]}>` or a `hasAuthPermissions` derived. Below: a full-width Recent Transactions list with skeleton fallback.
- **When to use:** Landing pages aggregating module previews.
- **Frequency:** One-off (only the dashboard route).

### P5. Settings Read-Only Section (rows + Alert)
- **Where:** `settings/business/+page.svelte` (template likely shared by other settings sub-pages)
- **Composes:** An informational `Alert.Root` (variant="default") at top explaining how to edit, then a `divide-y` stack of `<SectionRow label value description>` items rendered from a derived array. Per-row inline `Skeleton` while loading; per-row trailing slot for actions (e.g. ExternalLink for website).
- **Error path:** Inline `Alert.Root variant="destructive"` with Retry button (`refetch`) + "contact support" inline link.
- **When to use:** Account/business detail screens where users view but must contact support to edit.
- **Frequency:** Common across settings (5+ sub-pages).

### P6. Terminal-State Page (apply outcome)
- **Where:** `(onboarding)/apply/approved-application/+page.svelte`, `qualification-rejected`, `rejected-application`
- **Composes:** Centered `prose` block with status-colored heading (font-mono, green-600 for success), supporting copy, and a single primary `Button` with inline loader (uses `transition:fade` swap between LoaderIcon and label). Often triggers a fetch + `goto(resolve('/'))` on success.
- **When to use:** Final-step "you're done" or "we can't proceed" screens at end of a flow.
- **Frequency:** Common in onboarding (3 instances) — pattern reusable for any flow terminus.

### P7. Multi-step Wizard Step
- **Where:** `(onboarding)/apply/(steps)/+page.svelte` (and presumably each child step). Wrapper layout `(steps)/+layout.svelte` likely renders progress indicator + Back/Next chrome.
- **Frequency:** One-off as a flow, but common as a structural pattern.

### P8. List-with-side-Sheet
- **Where:** Implicit via `BillSheetProvider` / `VendorSheetProvider` wrapping the `bill-pay` layout — clicking a table row opens a detail sheet (slide-over) instead of navigating. Similar pattern likely in `cards`, `vendors`.
- **Composes:** Sheet provider at section layout → table rows call provider methods to open prefilled sheet → sheet is the canonical "row detail" surface.
- **When to use:** When rows have rich detail/edit forms but you want to keep the list context.
- **Frequency:** Common.

## 4. Cross-Cutting Patterns

### C1. Permission gating
Three coexisting mechanisms — pick by context:
- **Page-level redirect** — `+layout.server.ts` (not deep-read, but referenced from `(protected)/+layout.svelte` data shape) issues server-side auth.
- **Imperative** — `hasAuthPermissions({anyOf:[…]})` inside `$derived.by` for conditional logic (nav arrays, button visibility). Used heavily in `(protected)/app.svelte`.
- **Declarative wrapper** — `<ShowIfPermission anyOf={['…']}>{children}</ShowIfPermission>` (`$lib/auth/components/show-if-permission.svelte`) — wraps JSX subtrees in dashboards and section layouts.

### C2. Feature flags
`isFeatureFlagEnabled('flagName')` returns a reactive `{value}` object. Combined with permission checks for nav items (`cardRequestEnabled`, `billPayExperimental`, `cashAdvanceEnabled`, `expenseManagementEnabled`, `accountingEnabled`). Global override panel toggled via `getFeatureFlagsContext().overridesOpen = true` from `AppSidebar`.

### C3. Loading & error UX
- **Initial loading overlay** — Server-rendered overlay removed by `removeInitialLoadingOverlay()` in onMount of public-facing layouts (`(auth)`, `(onboarding)/apply`) and after the protected query-persister hydrates.
- **Cross-section route transitions** — `<LoadingSpinner/>` shown only on cross-section navigation (logic: `fromSeg !== toSeg`). Sibling navigations within the same section don't blink the spinner.
- **Inline list loading** — Per-row `<Skeleton/>` cells (preferred over full-page spinners on data-bound pages).
- **Error pages** — `(protected)/+error.svelte` branches on 403 (lock icon) vs. generic (uses `TraceId` for support tickets).
- **Inline error blocks** — `Alert.Root variant="destructive"` with embedded `Retry` button and "contact support" inline link.
- **Toasts** — `svelte-sonner` `toast.error/success` for async outcomes (form submits, fetches). Configured globally as `<Toaster position="top-right" richColors/>`.

### C4. Global dialogs/modals (singleton, mounted at shell)
Mounted once in `(protected)/app.svelte` and triggered via shared `$state` rune-based stores:
- `MakePaymentDialog` ← `makePaymentDialogState` + `openMakePaymentDialog()`
- `AutoPaydownSettingsDialog` ← `autoPaydownDialogState`
- `HubSpotSupportFormModal` ← local `isHubSpotSupportOpen` + `onOpenHubSpotSupportModal()` callback (also wired to a global handler)
- `SessionExpiredModal` ← internal Stytch auth state
- **URL-as-state** — `MakePaymentDialog` opens when `?make-payment=open`; on close uses `replaceState` to strip param. Pattern: certain modals are deep-linkable.

### C5. Responsive dropdown ↔ sheet switching
`new MediaQuery('min-width: 64rem')` decides between `AccountLimitsDropdown` / `AccountLimitsSheet`, `AccountPaymentDropdown` / `AccountPaymentSheet`. The same data is rendered in two distinct components rather than a single CSS-responsive component.

### C6. Server-driven user identification fanout
On mount of `(protected)/+layout.svelte`, the same user data is broadcast to Sentry (`setUser` + span attributes), pino logger (`LOGGER.current.child(...)`), PostHog (`posthogIdentifyUser` + `posthogGroup`), and TanStack persister (per-user IndexedDB key). One canonical place; avoids drift.

### C7. Theme system
`mode-watcher` `<ModeWatcher defaultMode="system"/>` at root. Theme switcher exposed via `setMode()` calls inside `DropdownMenu` (e.g. onboarding header). `.dark`-aware Tailwind classes throughout. Auth shell ignores theme — it forces a fixed jade dark look via scoped `:global(.auth-content …)` CSS.

### C8. Realtime / polling refresh
Pages that render data with async upstream processing (e.g. bill invoice parsing) use a page-level `$effect` to set up `setInterval(() => billsQuery.refetch(), 5000)` and clean it up in the effect's teardown. Pattern: declarative reactive polling, no useEffect-style mess.

### C9. Notification surface (Knock)
`NotificationBell` lives in shell topbar; `initKnock(surfaceId, token)` called as soon as `getKnockTokenQuery().data.token` resolves. Notifications routes (`notifications/all`, `notifications/preferences`) are simple full-width pages — the bell is the entry point.

### C10. Selection state via class-based runes stores
Multi-select tables share a singleton store (e.g. `billSelection.svelte.ts`) exporting `{set(rows), hasSelection, count, bills}`. Section layout reads this to render bulk action buttons; pages set it from the table's `onSelected`.

### C11. Cloudflare Turnstile gate
On select login routes, `(auth)/login/+layout.svelte` renders Turnstile and exposes the token via `setContext('turnstile', …)`. Pages use `getContext('turnstile')` to gate submit buttons — gating is per-button rather than a blocking overlay.

### C12. Route group structure as auth contract
- `(auth)` — public, no auth required.
- `(auth)/(protected)/setup-2fa` — nested group means: in the auth shell, but requires partial auth (logged in but missing 2FA).
- `(onboarding)/apply` — authenticated but not yet onboarded.
- `(protected)` — fully authenticated app.
The nesting communicates the auth state expectation before any code runs.

## 5. Recommended Additions to Dashbook /patterns/

Ranked by frequency in dashfi-ui × reusability for other Dashbook consumers.

1. **App Shell (Sidebar + Topbar + Inset)** — The exact composition in `(protected)/app.svelte`: `Sidebar.Provider` + `Sidebar.Inset` with persistent localStorage state, sticky backdrop-blur header, slot-driven nav items with permission/feature-flag arrays, route-transition spinner that suppresses on sibling navigation, slot for global banners (`SupportModeBanner`, `AccountStatusAlert`). Highest-value pattern — every authenticated SaaS app reinvents this and gets it wrong.

2. **Tabbed Section Page with Live Counts** — Section H1 + right-aligned action cluster + `SubNavigation` whose label format is `"Drafts (12)"` driven by parallel TanStack queries per tab. Generic enough to fit any queue/inbox/workflow surface. Should ship with a recipe showing the per-tab query pattern.

3. **Workflow Data Table Page** — Bound `queryParams` $state + TanStack query + `groupBy` callback for status grouping + shared `*Selection` store + auto-polling `$effect` for async upstream work. The single most-repeated structural pattern in the app — needs a canonical Dashbook reference.

4. **Branded Auth Card** — Two-column auth shell (brand panel + form panel with animated blob + FlowLines), Turnstile via `setContext`, stacked SSO buttons + minimal OR-divider + ghost-button fallback row. Auth screens are universal; Dashbook should have an opinionated take.

5. **Terminal-State / Outcome Page** — Centered prose, status-colored mono heading, single CTA with inline loader fade-swap, optional auto-redirect on success. Cheap to add, applies to every flow (apply, signup, checkout, invitation accept).

### Honorable mentions (worth documenting as "patterns to follow" even if no new component needed):
- **Responsive dropdown↔sheet pattern** — `MediaQuery` selecting between two component variants of the same control. Useful Dashbook guidance to add to the existing `Sheet` + `DropdownMenu` docs.
- **Global dialog mount-at-shell + rune-store trigger** — Architectural pattern (state location + URL deep-linking via `replaceState`). Best documented as a guide in `/patterns/` rather than a component.
- **`ShowIfPermission` declarative wrapper** — If Dashbook supports an auth/permission story, this is the right shape to mirror.
- **Read-only settings rows with edit-via-support Alert** — Niche but recognizable; appears across all `settings/*` sub-pages.

---

_Inventory completed within file budget (15 of 20 files read). Did not deep-read `(steps)/+layout.svelte`, individual section layouts beyond bill-pay/settings/transactions, or feature components (`BillTable`, `AppSidebar`, `RewardsBox`, etc.). The patterns above are inferred from layouts plus 4 representative pages; section layouts share an obvious template (centered max-width container, H1, SubNavigation, optional permission gate) confirmed across the three sampled._
