## Why

The `/cv` route currently just renders "Coming soon." Benjamin has now supplied a real CV PDF and its full source content (education, research/work experience, selected projects, technical skills, languages), so this change can ship with real content from the start rather than placeholders. This is change 6 of 9.

## What Changes

- Replace the `src/pages/cv.astro` stub with: a prominent download/view link to the CV PDF (already moved to `public/cv/benjamin-fortuno-cv.pdf`), plus a lightweight HTML summary covering education, research/work experience, selected projects, technical skills, and languages, sourced from a structured YAML data file (not hardcoded page markup).
- The HTML summary intentionally does **not** duplicate the Publications list — change 3 already made `publications.bib` the canonical source, and maintaining a second hand-written publications list here risks drift. Instead, the page links to `/publications`.
- Real content throughout (no placeholders needed for this change) — sourced directly from the CV data Benjamin provided.

## Capabilities

### New Capabilities
- `cv-page`: The CV route's PDF download link and the structured HTML summary (education, experience, projects, skills, languages).

### Modified Capabilities
- None. `site-shell`, `theme-toggle`, `deploy-pipeline`, `home-page`, `publications-page`, `project-page-template`, and `projects-page` are unaffected — the `/cv` route already exists (from change 1) and is already wrapped in the shared `Layout`; this change only replaces its inner content.

## Impact

- **Added**: `public/cv/benjamin-fortuno-cv.pdf` (already moved from the repo root and renamed), `src/data/cv.yaml` (structured summary data), `src/lib/cv.ts` (small YAML-parsing module, same pattern as `src/lib/publications.ts`), supporting components under `src/components/`.
- **Changed**: `src/pages/cv.astro` (stub → PDF link + HTML summary).
- **New dependency**: a YAML-parsing package (`yaml`), since this data file isn't parsed by anything already installed.
- **No changes** to layout, nav, footer, theme system, deploy pipeline, home page, publications page, project-page template, or the projects grid.
- **Decisions flagged for your confirmation** (not blocking approval, but worth a look before implementation):
  - Your source content includes a phone number (`@REDACTED=false`). I'll include it in the on-page HTML summary by default (matching that flag), but flagging that plain page text is more easily scraped by bots than a PDF - say the word if you'd rather omit the phone number from the page itself while keeping it in the PDF.
  - Your source lists 3 publications; since `publications.bib` (change 3) is the canonical source and currently holds 3 fake placeholder entries, I'd like to replace those with these 3 real ones as part of implementing this change (content-only update, no spec change needed) - confirm this is wanted, and confirm authorship position/full author lists are correct as given (your source has a TODO noting you weren't 100% sure of author order on all three).
  - Two commented-out items in your source (a "Kinamics Ltd." work experience entry, and a couple of commented-out bullet points) are treated as intentionally excluded and left out.
