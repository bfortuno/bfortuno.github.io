## Why

The `/publications` route currently just renders "Coming soon." Publications are one of the two most-visited sections of an academic site (alongside the CV), and the site needs a real, filterable list before it's genuinely useful to a visitor evaluating Benjamin's research. This is change 3 of 9 in the site build sequence.

## What Changes

- Replace the `src/pages/publications.astro` stub with a real publications list parsed from a structured data file (source format decided in design.md).
- Each entry displays: title, authors, venue, year, links (PDF/DOI/code as available), and an optional thumbnail image.
- Entries carry one or more tags (e.g. `surgical robotics`, `control`, `teleoperation`, `haptics`) and the page provides tag-based filtering (client-side, no backend).
- Entries may be flagged `featured: true` and carry an optional `projectPage` slug, which — when both are present and the target page exists — links out to that paper's dedicated project page (built by change 4, the Nerfies-style template). Until change 4 exists, no entry will actually have a resolvable `projectPage`, so no dead links are shipped; the field is added to the data schema now so change 4 doesn't need to rework it.
- No real publication data exists yet. The page ships with 2-3 clearly-fake example entries (e.g. "Example Paper Title" / "TODO: Author List") so the layout, filtering, and tagging can be verified, replaced by Benjamin's real publication list afterward.

## Capabilities

### New Capabilities
- `publications-page`: The publications route's data schema, list rendering, tag filtering, and link/thumbnail display.

### Modified Capabilities
- None. `site-shell`, `theme-toggle`, `deploy-pipeline`, and `home-page` are unaffected — the `/publications` route already exists (from change 1) and is already wrapped in the shared `Layout`; this change only replaces its inner content. The Home page's "Latest Paper" highlight link already points at `/publications` and needs no change.

## Impact

- **Changed**: `src/pages/publications.astro` (stub → real list + filter UI), a new structured data file for publication entries, and new supporting components under `src/components/` (e.g. a `PublicationCard` and a tag-filter control).
- **No changes** to layout, nav, footer, theme system, deploy pipeline, or the home page.
- **Open questions / content needed from you** (placeholders will be used until supplied):
  - Your real publication list (title, authors, venue, year, links, tags) — none will be invented; the page ships with obviously-fake placeholder entries until you supply the real list (as a `.bib` file, or dictated to me directly).
  - The exact tag vocabulary — proposing the examples from your brief (`surgical robotics`, `control`, `teleoperation`, `haptics`) as the starting set; extendable per entry.
  - Whether any current paper should be marked `featured` (relevant only once change 4's project-page template exists) — can be decided later without reworking this change.
