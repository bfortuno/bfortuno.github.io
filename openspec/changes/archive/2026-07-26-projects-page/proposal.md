## Why

The `/projects` route currently just renders "Coming soon." Alongside Publications, this is the other section that shows what Benjamin actually builds: thesis work, MMI collaboration outputs, open-source tools, and side projects. This is change 5 of 9, and it's the first real consumer of change 4's project-page-template — proving end-to-end that a card can link out to a dedicated page when one exists.

## What Changes

- Replace the `src/pages/projects.astro` stub with a grid of project cards, each showing: title, a short abstract, tech/methods tags (badges, not filterable — unlike Publications, this wasn't asked for here, and can be added later if wanted), placeholder media (image/GIF/video), and links to code/paper/demo as available.
- A card MAY reference a `detailSlug` matching an entry in change 4's `projects` content collection; the card SHALL link to that dedicated page only when a matching entry actually exists (mirroring the same "only link when it resolves" rule already established for Publications' `featured`/`projectPage` fields).
- Add a `project-cards` content collection (Astro content collection, `file()` loader over a single `src/content/project-cards.yaml`) — distinct from change 4's `projects` collection (which holds full dedicated pages); this collection holds only the lightweight card data for the grid.
- Ship 3 clearly-fake placeholder cards: one linking its `detailSlug` to change 4's existing `example-project` page (proving the "has a dedicated page" path end-to-end), and two with no `detailSlug` (proving the "no dedicated page" path renders cleanly with no dead link).

## Capabilities

### New Capabilities
- `projects-page`: The projects route's card grid, its data schema, media/link display, and the conditional link to a change-4 dedicated page.

### Modified Capabilities
- None. `site-shell`, `theme-toggle`, `deploy-pipeline`, `home-page`, `publications-page`, and `project-page-template` are unaffected — the `/projects` route already exists (from change 1) and is already wrapped in the shared `Layout`; this change only replaces its inner content. No entry in change 4's `projects` collection is being added or modified (the existing `example-project` entry is only linked to, not changed).

## Impact

- **Changed**: `src/pages/projects.astro` (stub → card grid), a new `src/content/project-cards.yaml` data file, a new content-collection definition (extending `src/content.config.ts`), and a new `ProjectCard.astro` component.
- **No changes** to layout, nav, footer, theme system, deploy pipeline, home page, publications page, or the change-4 project-page template/route.
- **Open questions / content needed from you** (placeholders used until supplied):
  - Your real project list (title, abstract, tags, media, links) — none will be invented; 3 obviously-fake placeholder cards ship until you supply the real ones.
  - Whether any additional real projects (beyond the one example) should get a full change-4 dedicated page, and if so, which.
