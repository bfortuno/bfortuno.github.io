## 1. Data source and parsing

- [x] 1.1 Evaluate and add a BibTeX-parsing npm package compatible with Node 22/ESM (e.g. `@retorquere/bibtex-parser`); fall back to structured YAML (documented in design.md) if it proves impractical — used `@retorquere/bibtex-parser` with `sentenceCase: false` (its default sentence-case conversion mangles title casing); added a local ambient type declaration since the published package ships no `.d.ts` despite its `exports` map claiming one
- [x] 1.2 Create `src/data/publications.bib` with 2-3 clearly-fake placeholder entries (e.g. "Example Paper Title One") covering: all fields present, thumbnail/code absent, and one `featured: true` entry with no `projectpage` set — 3 entries per user request
- [x] 1.3 Add a small TypeScript module (e.g. `src/lib/publications.ts`) that parses `publications.bib` into a typed array of publication entries (title, authors, venue, year, tags, pdf/doi/code links, thumbnail, featured, projectPage)

## 2. Publication card rendering

- [x] 2.1 Create `src/components/PublicationCard.astro` rendering title, authors, venue, year, available links, and thumbnail (graceful when thumbnail/links are absent)
- [x] 2.2 Render a "Project Page →" link only when `projectPage` is set and resolves to an existing route; otherwise omit it — implemented as "render whenever `projectPage` is set"; no entry sets it yet (existence-checking deferred to change 4, which is responsible for only setting the field once the matching route exists)

## 3. Tag filtering

- [x] 3.1 Derive the set of tags present across all entries and render them as filter buttons/checkboxes above the list
- [x] 3.2 Add a small client-side script that shows/hides `PublicationCard`s based on the selected tag(s), with an "All" / clear option
- [x] 3.3 Verify the full list is visible and usable before any filter is applied (no JS-required blank state) — "All" is active by default, no `hidden` attributes set until a filter button is clicked

## 4. Assemble the publications page

- [x] 4.1 Replace the `src/pages/publications.astro` stub with the tag filter UI and the list of `PublicationCard`s, composed inside the existing `Layout`
- [x] 4.2 Confirm no duplicate `<head>`/nav/footer markup is introduced (page still renders through the shared `Layout` only)

## 5. Verification

- [x] 5.1 Run `npm run build` locally and confirm it completes without errors
- [x] 5.2 In a browser (or headless check), verify: all placeholder entries render correctly, tag filtering shows/hides the right entries, entries with missing optional fields render without broken images/dead links, layout remains responsive at 320px, keyboard reachability of filter controls and entry links — verified via Playwright; caught and fixed a real bug where `.publication-card[hidden]` still rendered as `display: flex` because an author CSS rule beat the browser's default `[hidden]` rule (see `.publication-card[hidden] { display: none }` in global.css)
- [x] 5.3 Confirm with the user that the real publication list, tag vocabulary, and any `featured` designation are still pending (or capture them if supplied) before considering the change content-complete — user confirmed at approval time: keep placeholders, 3 example entries
