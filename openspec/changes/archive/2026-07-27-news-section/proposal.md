## Why

The `/news` route currently just renders "Coming soon." A simple reverse-chronological news list (paper accepted, talk given, milestone reached) lets Benjamin post short updates without touching layout code. This is change 7 of 9.

## What Changes

- Replace the `src/pages/news.astro` stub with a reverse-chronological list of short news entries, sourced from a structured data file (not hardcoded page markup).
- Each entry has a date, a short text blurb, and an optional link (e.g. to the paper, talk slides, or announcement).
- Ship 3 clearly-fake placeholder entries (dated, out of order in the source file, to prove the sort is actually applied) until Benjamin supplies real updates.

## Capabilities

### New Capabilities
- `news-section`: The news route's data schema and reverse-chronological rendering.

### Modified Capabilities
- None. `site-shell`, `theme-toggle`, `deploy-pipeline`, `home-page`, `publications-page`, `project-page-template`, `projects-page`, and `cv-page` are unaffected — the `/news` route already exists (from change 1) and is already wrapped in the shared `Layout`; this change only replaces its inner content.

## Impact

- **Changed**: `src/pages/news.astro` (stub → reverse-chronological list), a new `src/content/news.yaml` data file, a new content-collection definition (extending `src/content.config.ts`), and a small `NewsEntry.astro` component.
- **No changes** to layout, nav, footer, theme system, deploy pipeline, home page, publications page, project-page template, projects grid, or CV page.
- **Open questions / content needed from you** (placeholders used until supplied):
  - Your real news/updates list — none will be invented; 3 obviously-fake placeholder entries ship until you supply real ones.
