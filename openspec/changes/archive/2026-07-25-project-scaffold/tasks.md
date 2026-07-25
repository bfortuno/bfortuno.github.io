## 1. Remove placeholder site

- [x] 1.1 Remove root `index.html`, `style.css`, `script.js`

## 2. Astro project init

- [x] 2.1 Initialize Astro project (TypeScript, minimal template) at repo root
- [x] 2.2 Add/confirm `package.json` scripts (`dev`, `build`, `preview`) and `engines.node` set to the target LTS version
- [x] 2.3 Add `astro.config.mjs` (site URL set to the GitHub Pages domain; no `base` needed since this is a user/org page) — `.mjs` per Astro's own scaffold default, not `.ts`
- [x] 2.4 Add `.gitignore` entries for `node_modules/`, `dist/`, `.astro/`

## 3. Base layout and page shell

- [x] 3.1 Create `src/layouts/Layout.astro` with `<head>` metadata slot, skip-to-content link, `header`/`nav`/`main`/`footer` landmarks
- [x] 3.2 Create `src/components/Nav.astro` with links to Home, Publications, Projects, CV, News, Contact; visible keyboard focus states
- [x] 3.3 Create `src/components/Footer.astro` with copyright line and placeholder area for contact/social links
- [x] 3.4 Add base global CSS (reset, typography with serif/clean-sans heading font, responsive breakpoints, mobile-first from 320px)

## 4. Theme toggle

- [x] 4.1 Define CSS custom properties for light/dark palettes plus one shared `--accent` value
- [x] 4.2 Add blocking inline script in `Layout.astro` `<head>` that reads `localStorage` (falling back to `prefers-color-scheme`) and sets `data-theme` on `<html>` before first paint
- [x] 4.3 Create `src/components/ThemeToggle.astro` (button, keyboard operable) that flips `data-theme` and writes the choice to `localStorage`
- [x] 4.4 Add `ThemeToggle` to the shared layout/nav so it's present on every page

## 5. Placeholder routes for every planned page

- [x] 5.1 Create `src/pages/index.astro` (Home) stub using the shared layout with "Coming soon" placeholder content
- [x] 5.2 Create `src/pages/publications.astro` stub
- [x] 5.3 Create `src/pages/projects.astro` stub
- [x] 5.4 Create `src/pages/cv.astro` stub
- [x] 5.5 Create `src/pages/news.astro` stub
- [x] 5.6 Create `src/pages/contact.astro` stub

## 6. GitHub Actions deploy pipeline

- [x] 6.1 Add `.github/workflows/deploy.yml`: checkout, setup Node (matching `engines.node`), install deps, `astro build`, upload build artifact, deploy via `actions/deploy-pages`
- [x] 6.2 Scope workflow triggers to push on `main` (plus `workflow_dispatch` for manual runs) and set `permissions`/`concurrency` per GitHub Pages Actions requirements

## 7. Verification

- [x] 7.1 Run `npm run build` locally and confirm it completes without errors
- [x] 7.2 Run `npm run dev`, manually check: nav keyboard navigation, responsive layout at 320px, theme toggle (light→dark→reload, no flash of wrong theme), all nav links resolve to a real (stub) page — verified headlessly via Playwright against system Chromium (screenshots + DOM assertions), all checks passed
- [x] 7.3 In GitHub repo Settings → Pages, set Source to "GitHub Actions" (manual step, cannot be scripted) — confirmed by user
- [x] 7.4 Push to `main`, confirm the Actions workflow run succeeds, and confirm the deployed site is reachable at the GitHub Pages URL — confirmed live at <https://bfortuno.github.io/>
