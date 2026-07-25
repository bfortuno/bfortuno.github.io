## 1. Content collection

- [x] 1.1 Check the installed Astro version's content-collections API and define/extend `src/content/config.ts` with a `projects` collection — Astro 7.1.3 uses the Content Layer API with the config file at `src/content.config.ts` (not `src/content/config.ts`), and `z` comes from `astro/zod` rather than being re-exported from `astro:content` as older docs show
- [x] 1.2 Define the Zod schema: title, authors (name/affiliations/optional url), affiliations, hero image/video (exactly one, via `.refine`), abstract, optional method figure, results (array, may be empty), optional acknowledgements, optional bibtex

## 2. Layout and components

- [x] 2.1 Create `src/layouts/ProjectPageLayout.astro` composing inside the shared `Layout`, accepting a collection entry's data
- [x] 2.2 Create `src/components/AuthorsBar.astro`: authors with superscript affiliation numbers, affiliations list below
- [x] 2.3 Create the hero teaser rendering: image via `<img>`, video via `<video autoplay muted loop playsinline>` that pauses when `prefers-reduced-motion: reduce` is set
- [x] 2.4 Render the abstract section
- [x] 2.5 Render the optional method figure section (omitted entirely when absent)
- [x] 2.6 Create `src/components/ResultsStrip.astro`: horizontally scrollable CSS scroll-snap strip of image/video items with optional captions, with a visible scroll affordance; omitted entirely when the results list is empty
- [x] 2.7 Render the optional acknowledgements section (omitted entirely when absent)
- [x] 2.8 Create `src/components/BibtexBlock.astro`: `<pre><code>` block plus a "Copy" button (Clipboard API); omitted entirely when no bibtex is present

## 3. Routing

- [x] 3.1 Create `src/pages/projects/[slug].astro` using `getStaticPaths()` over the `projects` collection, rendering each entry through `ProjectPageLayout`
- [x] 3.2 Confirm this coexists cleanly with the existing `src/pages/projects.astro` stub (no route conflict, stub untouched) — build generated both `/projects/index.html` (stub) and `/projects/example-project/index.html` (template) side by side

## 4. Example instance

- [x] 4.1 Create `src/content/projects/example-project.md` (or `.mdx`) with clearly-fake placeholder content: title, 2+ authors with shared/distinct affiliations, placeholder hero image, abstract, method figure, 2-3 placeholder result images, acknowledgements, and a placeholder bibtex string
- [x] 4.2 Add placeholder image assets under `public/projects/` for the hero, method figure, and result images

## 5. Verification

- [x] 5.1 Run `npm run build` locally and confirm it completes without errors, including a schema-validation failure test (temporarily break the example entry, confirm the build fails, then restore it) — confirmed the `.refine()` check rejects an entry with both heroImage and heroVideo set, then restored and rebuilt clean
- [x] 5.2 In a browser (or headless check), verify: `/projects/example-project` renders all present sections correctly, method figure/acknowledgements sections are absent without leaving empty gaps, the results strip scrolls horizontally with a visible affordance, the BibTeX copy button actually copies the text, `prefers-reduced-motion` is respected if a video hero is tested, layout remains responsive at 320px, keyboard reachability of the copy button and any links — verified via Playwright (16 checks, all passed) plus visual screenshots in light/dark; hero video + reduced-motion path implemented per design but unexercised (no video asset in the example instance, as scoped)
- [x] 5.3 Confirm with the user that no real featured paper/project content exists yet (placeholder example instance only) before considering the change content-complete — user previewed the local dev server and confirmed "its alright, push them"
