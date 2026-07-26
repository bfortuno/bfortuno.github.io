## 1. Data source

- [x] 1.1 Extend `src/content.config.ts` with a `projectCards` collection using Astro's `file()` loader over `src/content/project-cards.yaml`
- [x] 1.2 Define the Zod schema: title, abstract, tags (string array), media ({ type: 'image'|'video', src, alt }), links ({ code?, paper?, demo? }), optional `detailSlug`
- [x] 1.3 Create `src/content/project-cards.yaml` with 3 clearly-fake placeholder cards: one with `detailSlug: example-project` (linking to change 4's existing page), two with no `detailSlug`

## 2. Project card rendering

- [x] 2.1 Create `src/components/ProjectCard.astro` rendering title, abstract, tags, media, and available links (graceful when links are absent)
- [x] 2.2 Render a link to the dedicated page only when `detailSlug` is set and a matching entry exists in the `projects` collection (from change 4); otherwise omit it
- [x] 2.3 Add placeholder media assets under `public/projects-grid/` (or reuse `public/projects/` naming) for the 3 example cards

## 3. Assemble the projects page

- [x] 3.1 Replace the `src/pages/projects.astro` stub with a responsive grid of `ProjectCard`s, composed inside the existing `Layout`
- [x] 3.2 Confirm no duplicate `<head>`/nav/footer markup is introduced (page still renders through the shared `Layout` only)

## 4. Verification

- [x] 4.1 Run `npm run build` locally and confirm it completes without errors
- [x] 4.2 In a browser (or headless check), verify: all 3 placeholder cards render correctly, the card with `detailSlug: example-project` links to `/projects/example-project`, the two cards without a `detailSlug` render with no dead/broken link, layout remains responsive at 320px, keyboard reachability of all card links — verified via Playwright (11 checks, all passed) plus visual screenshots in light/dark
- [x] 4.3 Confirm with the user that the real project list is still pending (or capture it if supplied) before considering the change content-complete — user confirmed: keep placeholders, "yes, it looks fine"
