## 1. Data source

- [x] 1.1 Extend `src/content.config.ts` with a `news` collection using Astro's `file()` loader over `src/content/news.yaml`
- [x] 1.2 Define the Zod schema: date (string), text (string), optional link
- [x] 1.3 Create `src/content/news.yaml` with 3 clearly-fake placeholder entries, deliberately out of chronological order in the file

## 2. Rendering

- [x] 2.1 Create `src/components/NewsEntry.astro` rendering date, text, and an optional link (graceful when the link is absent)
- [x] 2.2 Sort entries reverse-chronologically by date before rendering (in the page or a small lib function), not relying on source-file order

## 3. Assemble the news page

- [x] 3.1 Replace the `src/pages/news.astro` stub with the sorted list of `NewsEntry`s, composed inside the existing `Layout`
- [x] 3.2 Confirm no duplicate `<head>`/nav/footer markup is introduced (page still renders through the shared `Layout` only)

## 4. Verification

- [x] 4.1 Run `npm run build` locally and confirm it completes without errors — confirmed entries render sorted 2026-03-15 → 2026-01-10 → 2025-09-01 despite different source-file order
- [x] 4.2 In a browser (or headless check), verify: all 3 placeholder entries render in the correct reverse-chronological order (not source-file order), the entry with a link renders it correctly, entries without a link have no dead/empty link element, layout remains responsive at 320px, keyboard reachability of any entry links — verified via Playwright (9 checks, all passed) plus visual screenshots
- [x] 4.3 Confirm with the user that the real news list is still pending (or capture it if supplied) before considering the change content-complete — user confirmed: keep placeholders, "yes"
