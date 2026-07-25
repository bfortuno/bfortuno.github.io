## Why

The repo currently contains only a placeholder static site (`index.html`, `style.css`, `script.js`) with no build system, no deployment automation, and no reusable layout. Before any real page (home, publications, projects, CV, news, contact) can be built, the site needs an Astro project foundation with an automated GitHub Pages deploy, a consistent shell (nav/footer), and a dark/light mode toggle. This is change 1 of 8 in the site build sequence.

## What Changes

- Initialize an Astro project (TypeScript) at the repo root, replacing the placeholder `index.html`/`style.css`/`script.js`. **BREAKING**: removes the existing placeholder static site entirely.
- Add a GitHub Actions workflow that builds the Astro site and deploys it to GitHub Pages on push to `main` (repo is `bfortuno.github.io`, a user site served at the domain root — no `base` path needed).
- Add a base `Layout` component (`<head>` metadata, skip-link, consistent page wrapper) used by all routes.
- Add top navigation (placeholder links for Home, Publications, Projects, CV, News, Contact — routes not built yet, so links point to `#` or are omitted/disabled until their page exists) and a footer (copyright, links placeholder).
- Add a dark/light mode toggle: respects `prefers-color-scheme` by default, user override persisted (e.g. `localStorage`), single CSS accent color, no flash-of-wrong-theme on load.
- Add a responsive page shell (mobile-first, works down to ~320px width) with minimal placeholder content on the one route needed to prove the pipeline (e.g. a stub home route with a "Site under construction" placeholder — the real home page content is change 2).
- Establish base conventions: TypeScript config, component folder structure, accessibility baseline (semantic landmarks, keyboard-navigable nav and theme toggle).

## Capabilities

### New Capabilities
- `site-shell`: Base layout, navigation, footer, and responsive page shell shared by every page of the site.
- `theme-toggle`: Dark/light mode switching, persistence, and system-preference default.
- `deploy-pipeline`: Automated build and deployment of the Astro site to GitHub Pages via GitHub Actions.

### Modified Capabilities
- None (no existing specs in `openspec/specs/` yet — this is the first change).

## Impact

- **Removed**: `index.html`, `style.css`, `script.js` (placeholder site) at repo root.
- **Added**: Astro project structure (`src/layouts/`, `src/components/`, `src/pages/`, `astro.config.*`, `package.json`, `tsconfig.json`), `.github/workflows/deploy.yml`.
- **Dependencies**: Node.js/npm toolchain and Astro become required to build/preview the site locally.
- **Open questions / content needed from user**:
  - Confirm the GitHub Pages source setting should be "GitHub Actions" (vs. deploying from a branch) — this proposal assumes the Actions-based deploy.
  - Confirm Node version to target in CI (proposing latest LTS unless you have a preference).
  - No real page copy, images, or logo needed yet for this change — a placeholder stub page is enough to verify deploy.
