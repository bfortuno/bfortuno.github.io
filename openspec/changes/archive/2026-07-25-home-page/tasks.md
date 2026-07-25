## 1. Bio and photo section

- [x] 1.1 Create `src/components/BioPhoto.astro`: placeholder image box (fixed aspect ratio, descriptive alt text, visible "photo placeholder" label) plus a bio paragraph slot
- [x] 1.2 Add placeholder bio copy in `index.astro` wrapped in a `TODO:` comment, clearly marked as not-yet-real content

## 2. Affiliation

- [x] 2.1 Add an affiliation line/section stating: PhD candidate at Politecnico di Milano, in collaboration with Medical Microinstruments (MMI), Pisa

## 3. Collaboration callout

- [x] 3.1 Create `src/components/CollaborationCallout.astro`: visually distinct panel (border/tint using `--accent`) with placeholder copy describing the PoliMi-MMI collaboration and its research focus
- [x] 3.2 Verify the callout is visually distinct from surrounding body text in both light and dark themes

## 4. Highlight links

- [x] 4.1 Create `src/components/HighlightLinks.astro` accepting a small array of `{ label, href }` items, rendered as a keyboard-accessible list of link cards
- [x] 4.2 Wire up default highlight links in `index.astro`: Latest Paper → `/publications`, Current Project → `/projects`, CV → `/cv`, Contact → `/contact` (update once real targets are confirmed)
- [x] 4.3 Verify all highlight links resolve (no 404s) and are reachable/activatable via keyboard — verified via Playwright (all 4 links return 200, all reachable by Tab)

## 5. Assemble the home page

- [x] 5.1 Replace the `src/pages/index.astro` stub with `BioPhoto`, affiliation, `CollaborationCallout`, and `HighlightLinks`, composed inside the existing `Layout`
- [x] 5.2 Confirm no duplicate `<head>`/nav/footer markup is introduced (page still renders through the shared `Layout` only)

## 6. Verification

- [x] 6.1 Run `npm run build` locally and confirm it completes without errors
- [x] 6.2 In a browser (or headless check), verify: placeholder photo has alt text, collaboration callout is visually distinct in both themes, all highlight links work and are keyboard-reachable, layout remains responsive at 320px — verified via Playwright against system Chromium, screenshots + DOM assertions, all checks passed
- [x] 6.3 Confirm with the user that real bio text, photo, and highlight-link targets are still pending (or capture them if supplied) before considering the change content-complete — user confirmed: keep placeholders for now, defaults accepted
