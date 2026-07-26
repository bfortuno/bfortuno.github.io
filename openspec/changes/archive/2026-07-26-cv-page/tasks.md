## 1. Data source

- [x] 1.1 Add the `yaml` npm package
- [x] 1.2 Create `src/data/cv.yaml` transcribing the real supplied content: headline/summary, education (3 entries), experience (2 entries, excluding the commented-out Kinamics Ltd. role), selected projects (2 entries), skills (grouped), languages
- [x] 1.3 Add `src/lib/cv.ts` parsing `cv.yaml` into typed data (same `?raw` + parser pattern as `src/lib/publications.ts`)

## 2. Components and rendering

- [x] 2.1 Create `src/components/CvHeader.astro`: name, tagline/summary, contact line (email, location, LinkedIn; phone included pending confirmation), and the CV download link - styled with this site's existing design system, not the source content's embedded CSS — phone included per approval of the proposal's default
- [x] 2.2 Create `src/components/CvSection.astro` (or similar) reusable for education/experience/projects: entry title/role, organization, period, highlight bullets — implemented as `CvEntryCard.astro`
- [x] 2.3 Render the skills section grouped by category
- [x] 2.4 Render the languages section
- [x] 2.5 Add a link to `/publications` in place of a publications list

## 3. Assemble the CV page

- [x] 3.1 Replace the `src/pages/cv.astro` stub with `CvHeader` + education/experience/projects sections + skills + languages + publications link, composed inside the existing `Layout`
- [x] 3.2 Confirm no duplicate `<head>`/nav/footer markup is introduced (page still renders through the shared `Layout` only)

## 4. Verification

- [x] 4.1 Run `npm run build` locally and confirm it completes without errors — confirmed CV PDF copied to `dist/cv/`, real content present in `dist/cv/index.html`
- [x] 4.2 In a browser (or headless check), verify: the CV PDF link resolves and downloads/opens correctly, all summary sections render with the real content, the publications link points to `/publications`, layout remains responsive at 320px, keyboard reachability of the download link and publications link — verified via Playwright (15 checks, all passed) plus visual screenshots in light/dark
- [x] 4.3 Confirm with the user: phone number inclusion on-page, and whether to replace `publications.bib`'s placeholder entries with the 3 real papers now supplied — user confirmed both defaults and supplied the exact IEEE Xplore BibTeX records; also bolded the site owner's name in the author list per user request
