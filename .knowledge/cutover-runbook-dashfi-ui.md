# Cutover runbook: design-vnext to master

**Audience:** dashfi-ui contributors with in-flight feature branches when `@dashfi/svelte`'s `design-vnext` merges to `core` master.

**TL;DR:** Get your branch green before the merge. On merge day, pull master, rebase your feature branch, reinstall, run typecheck and build, then smoke-test the routes below. The lib API is byte-identical - the only real risk is visual drift from the jade brand refresh.

---

## Section 1: Before the merge

The vnext merge is scheduled for `<TBD>`. Do this earlier in the week:

1. Get your feature branch into a PR-ready state. Squash WIP commits where it makes sense - a clean history rebases more cleanly.
2. Run the standard checks on your branch as-is, against current master:
   ```
   pnpm install
   pnpm nx run dashfi-ui-app:typecheck
   pnpm nx run dashfi-ui-app:lint
   pnpm nx run dashfi-ui-app:test
   pnpm nx run dashfi-ui-app:build
   ```
   Fix anything red now. Don't try to debug pre-existing failures on top of a rebase.
3. Audit your branch for things that will fight vnext:
   - Custom CSS overrides on lib components (Button, Card, Dialog, Sheet, Pill, Sidebar). The vnext look will win; your override may double up or be visually wrong.
   - Hardcoded colors that should be tokens. Jade is the new brand surface - hex values will look off-palette.
   - Custom `border-radius` on anything that the lib now renders as a squircle.
   - Custom hover states on sidebar items. The convention is now `hover:opacity-80`.

Flag these in your PR description so reviewers know what was touched.

---

## Section 2: The day vnext merges

Run these in order, from your dashfi-ui worktree:

1. Pull latest master:
   ```
   git checkout master
   git pull --ff-only
   ```
2. Switch to your feature branch:
   ```
   git checkout <your-branch>
   ```
3. Rebase onto master - do not merge. Linear history is easier to review and revert:
   ```
   git rebase master
   ```
4. Resolve conflicts. Most will land in `pnpm-lock.yaml` and `package.json`. The lib API is byte-identical (see `.knowledge/lib-api-drift-audit.md`), so source-level conflicts should be limited to files you and the lib touched in the same place.
5. Refresh the workspace:
   ```
   pnpm install
   ```
6. Typecheck:
   ```
   pnpm nx run dashfi-ui-app:typecheck
   ```
   Expect 0 errors.
7. Lint:
   ```
   pnpm nx run dashfi-ui-app:lint
   ```
   Expect 0 errors.
8. Build:
   ```
   pnpm nx run dashfi-ui-app:build
   ```
   Expect a clean build.

If any of those fail, jump to Section 4.

---

## Section 3: Visual smoke test

`workspace:*` always resolves to HEAD, so the vnext look is now live in your app. Walk these routes in `pnpm dev` and look for regressions:

- `/login` - auth shell. Check Button variants and input focus rings.
- `/dashboard` - protected app shell. Check the sidebar, topbar, and metric tiles.
- `/settings/profile` - sub-section tabs pattern.
- `/transactions` - tabbed section with live counts. Check Pill rendering.
- `/cards` - workflow data table. Check row actions and the bulk action bar.
- `<your-feature-route>` - anywhere your branch added or changed UI. Test thoroughly, not just by glance.

What's expected to change visually:

- **Buttons:** ink remains the default. The brand jade variant has smoother corners and less shadow.
- **Pills:** API unchanged. Visual restraint applied - less saturation, no shadow.
- **Sidebar:** hover is now `hover:opacity-80`. If you set a custom hover background, it will fight the lib.
- **Squircle corners:** applied to Card, Dialog, Sheet. Custom `border-radius` on these will stack visually.
- **Shadows:** removed across the board. If you relied on a lib shadow for layering, the layer is now flat.

If something looks wrong, capture a screenshot before you start changing things - you'll need it for the bug report.

---

## Section 4: Common rebase issues

- **`pnpm install` fails on catalog resolution.** Run `pnpm install --no-frozen-lockfile`, then commit the regenerated lockfile.
- **Typecheck errors on a lib import.** Usually a missing peer dep. Add it explicitly to `packages/dashfi-ui/package.json` and reinstall.
- **A prop or export your branch used no longer exists.** Cross-check `.knowledge/lib-api-drift-audit.md`. The audit says byte-identical, so this should not happen. If it does, file an issue against the lib - do not patch around it locally.
- **Visual regression you can't isolate.** Take a screenshot, note the route, and open an issue. Don't ship the rebase until you know whether the regression is in your branch or in vnext.

---

## Section 5: When to file an issue vs fix forward

- **File an issue.** Visual regression you can't fix inside your feature's scope. Route it to the owner of the affected lib component.
- **Fix in your branch.** Your own custom CSS that conflicts with vnext. Remove the override and let the lib's new look win.
- **Roll back.** Only if a regression is breaking a production-facing flow. Coordinate with the lib team before reverting - they own the call on vnext.

---

## Section 6: After the rebase

- Push the rebased branch (force-push with lease):
  ```
  git push --force-with-lease
  ```
- PR review goes through the normal channel. Call out in the description that the branch was rebased onto post-vnext master and which routes you smoke-tested.
- After merge, watch production for 24 hours. Visual regressions that didn't show locally tend to surface on real data.
- If something's off in production, vnext can be reverted on master. The lib team owns that decision.

---

## Section 7: Where to get help

- **Slack:** `#engineering` for product questions, `#dashbook` for lib and design system questions.
- **GitHub issues:**
  - dashfi-ui app issues: `dash.fi/core`
  - `@dashfi/svelte` lib issues: `trlmkb/dashbook`
- **Maintainer:** `<TBD>`

---

Owner: `<TBD>`. Last updated: 2026-05-18.
