## Context

The repo (`bfortuno.github.io`) currently holds a static placeholder (`index.html`, `style.css`, `script.js`) with no build tooling. It must become an Astro static site deployed to GitHub Pages at the domain root (this is a user/org page, not a project page, so no `base`/subpath handling is needed). This is the first of 8 planned changes; every later page (home, publications, projects, CV, news, contact) will be built as an Astro route inside the shell this change establishes, so the layout, nav, and theme system need to be stable and extensible rather than reworked later.

## Goals / Non-Goals

**Goals:**
- Get a working Astro + TypeScript project building and deploying to GitHub Pages via GitHub Actions.
- Establish one shared `Layout` component, nav, and footer that every future page will use unchanged (or with minimal extension).
- Ship a dark/light toggle that is correct on first paint (no flash-of-wrong-theme) and persists across visits.
- Keep the shell responsive and accessible from day one (semantic landmarks, keyboard operability) since retrofitting accessibility later is costlier.

**Non-Goals:**
- No real page content (bio, publications, projects, CV, news) — that's changes 2–7.
- No BibTeX parsing, no content collections for publications/projects yet — only the shell.
- No SEO/OG/sitemap work — that's change 8 (Polish pass).
- No CMS, no server/database — content stays file-based per project conventions.

## Decisions

**Astro with the built-in `pages/` router, no UI framework integration (no React/Vue/Svelte island).**
The nav/footer/theme-toggle are simple enough for plain Astro components + a small inline/vanilla TS script for theme persistence. Avoids adding a client framework dependency before it's known to be needed (later pages like publications filtering may warrant a light client script, decided in that change).

**Deploy via `actions/deploy-pages` (GitHub Actions → Pages), not a `gh-pages` branch push.**
- Alternative considered: `peaceiris/actions-gh-pages` pushing a `gh-pages` branch. Rejected because it requires an extra branch and a `GITHUB_TOKEN` push permission dance; the native `actions/configure-pages` + `actions/upload-pages-artifact` + `actions/deploy-pages` flow is the current GitHub-recommended path, keeps the repo history clean (no build output committed), and matches "Source: GitHub Actions" in repo Pages settings.
- Requires the repo's Settings → Pages → Source to be set to "GitHub Actions" (a one-time manual step done in the GitHub UI — cannot be scripted from here; called out as a task).

**Theme persistence: `localStorage` + a tiny blocking inline script in `<head>`, CSS custom properties + `[data-theme]` attribute on `<html>`.**
- Alternative considered: CSS-only `prefers-color-scheme` media query without JS toggle. Rejected because the spec requires a user-facing toggle, not just OS-following.
- The inline script must run before first paint (placed in `Layout.astro`'s `<head>`, not deferred) to avoid a flash of incorrect theme; this is the standard pattern for static sites.
- Single accent color implemented as one CSS custom property (`--accent`) so it's trivial to retheme later; light/dark only change background/foreground/accent-contrast tokens.

**Navigation links to not-yet-built pages.**
Since Publications/Projects/CV/News/Contact don't exist until later changes, nav items for them will be rendered but non-interactive placeholders are undesirable (broken UX). Decision: build one placeholder route per planned page (`/publications`, `/projects`, `/cv`, `/news`, `/contact`, and `/` for home) each rendering a minimal "Coming soon" stub via the shared Layout, so every nav link resolves to a real page instead of a dead `#` link or 404. Later changes replace each stub's content in place — the route files already exist, so those changes only need to fill in content, not create routing.

**Node version:** target latest active LTS (currently Node 22) in both `package.json` engines field and the CI workflow, so local dev and CI stay in sync.

## Risks / Trade-offs

- [Risk] GitHub Pages "Source" setting must be switched to "GitHub Actions" manually in the repo settings, or the workflow's deploy step will fail. → Mitigation: call out as an explicit manual task in tasks.md and verify deploy succeeds before considering the change done.
- [Risk] Placeholder stub routes could be mistaken for real content if the change sits un-reviewed. → Mitigation: every stub page clearly says "Coming soon" and is not linked from anywhere but the nav; no fabricated content is used.
- [Risk] Theme flash-of-wrong-theme bugs are easy to introduce (e.g. script deferred, or applied after CSS parses). → Mitigation: verify manually in the browser (hard refresh, toggle, reload) as part of task completion, in both light and dark OS settings.
- [Trade-off] No UI framework now means if a later page (e.g. publications filtering) needs richer interactivity, that change will need to decide then whether to add one — deferred rather than solved here, kept as an explicit non-goal.

## Open Questions

- Should the GitHub Pages custom domain (if any) be configured now via a `public/CNAME` file, or is `bfortuno.github.io` the final serving domain with no custom domain? (Assuming no custom domain unless you tell me otherwise — no CNAME file added in this change.)
