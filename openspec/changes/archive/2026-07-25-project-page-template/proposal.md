## Why

Both a featured paper (linked from Publications) and a standout project (thesis work, MMI collaboration output, open-source tool — to be shown on the Projects grid in change 5) deserve a dedicated page in the well-known academic project-page format: title/authors/affiliations bar, hero teaser, abstract, method figure, results, optional BibTeX. This is the style popularized by nerfies.github.io and now standard across CV/robotics research pages. Building one by hand per paper or project doesn't scale and invites drift; a single reusable template that takes content through frontmatter means each new featured item — paper or project — is just a new content file. This is change 4 of 9, and unblocks the `featured`/`projectPage` fields already added to the publications schema in change 3, as well as the "links to a dedicated page" behavior planned for change 5's project cards.

## What Changes

- Add a `projects` content collection (Astro content collections) with a schema covering: title, authors (with affiliation references), affiliations list, hero media (image or video), abstract, an optional method figure (image + caption), a results section (one or more media items with captions — images or videos, laid out as a horizontally scrollable strip so it covers both "comparison" and "carousel" use cases without a JS carousel library), optional acknowledgements text, and an **optional** raw BibTeX string (optional because a software/thesis project may have no citation, unlike a paper).
- Add a reusable `ProjectPageLayout.astro` that renders all of the above sections in the Nerfies-style structure, composed inside the site's existing shared `Layout` (so nav/footer/theme toggle stay consistent site-wide) — port the *structure and spirit* of nerfies.github.io, not its literal Bulma/jQuery implementation. The layout works equally for a paper writeup or a project showcase; the BibTeX section simply doesn't render when absent.
- Add a dynamic route `src/pages/projects/[slug].astro` that renders any entry in the `projects` collection through `ProjectPageLayout`. This coexists with the existing `/projects` stub route (from change 1) — that stub remains untouched; change 5 (Projects grid) will replace it separately, and will link its cards to these same dedicated pages where one exists.
- Add a copy-to-clipboard control on the BibTeX block, shown only when an entry has one (small vanilla script, consistent with the site's no-framework approach).
- Ship exactly one example instance (`src/content/projects/example-project.md`) with clearly-fake placeholder content (title, authors, affiliations, abstract, media) so the template can be verified end-to-end. Not modeled on any real paper or project.

## Capabilities

### New Capabilities
- `project-page-template`: The reusable Nerfies-style page layout (usable for either a paper or a project), its content schema, the `/projects/<slug>` dynamic route, and the copy-able BibTeX block.

### Modified Capabilities
- None. `site-shell`, `theme-toggle`, `deploy-pipeline`, `home-page`, and `publications-page` are unaffected. The `publications-page` capability's `projectPage` field can now, in principle, resolve to a real route once a real paper's slug matches a `projects` collection entry — but no `publications.bib` entry is being changed in this change, so no publications-page behavior changes yet.

## Impact

- **Added**: `src/content/config.ts` (or extended, if it already declares other collections) defining the `projects` collection schema; `src/layouts/ProjectPageLayout.astro`; `src/pages/projects/[slug].astro`; supporting components (e.g. `AuthorsBar`, `ResultsStrip`, `BibtexBlock`); one example content file.
- **No changes** to the existing `/projects` stub page, layout, nav, footer, theme system, deploy pipeline, home page, or publications page.
- **Open questions / content needed from you** (placeholders used until supplied):
  - No real featured paper or standout project exists yet to build a real instance for — the example instance is entirely placeholder (fake title/authors/media), clearly marked as such.
  - Whether the results section should default to images, videos, or a mix — the schema supports both per item; the example instance will use placeholder images only (video placeholders would require a real video asset, which none exists yet).
