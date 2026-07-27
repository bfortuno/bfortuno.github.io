## Context

The `/news` route exists as a stub (from change 1) wrapped in the shared `Layout`. This is the simplest content page in the site so far: a flat, growing list of short dated entries, with no filtering, no detail pages, and no cross-references to other capabilities.

## Goals / Non-Goals

**Goals:**
- A reverse-chronological list of short entries, each with a date, text, and optional link.
- Adding an entry means editing one data file - no layout/component changes needed.

**Non-Goals:**
- Categorization/tagging of entries (e.g. "publication" vs "talk" vs "milestone") - the brief's examples describe *kinds* of updates, not a required taxonomy; adding one now would be speculative. Can be added later if the list grows long enough to need it.
- Pagination or an entry limit - out of scope until the list is long enough to warrant it.
- RSS/Atom feed generation - not requested; can be proposed separately later if wanted.

## Decisions

**Data source: `src/content/news.yaml`, an Astro content collection via the `file()` loader - same pattern as change 5's `project-cards.yaml`.**
- Entries are short, flat, and similarly-shaped (date + text + optional link), same fit as project cards: a single YAML file, not one Markdown file per entry (unlike change 4's `projects` collection, which needs long-form Markdown bodies for full dedicated pages - news entries don't).

**Schema: `date` (ISO `YYYY-MM-DD` string), `text` (the short entry itself), optional `link`.**
- Deliberately no separate `title` field - the brief describes "short entries," and a one-line/short-paragraph `text` field is enough; splitting into title+body would add structure the content doesn't need.
- `date` as a plain ISO string (not a JS `Date` in the schema) keeps YAML authoring simple and avoids timezone ambiguity; sorting is done by string comparison, which works correctly for `YYYY-MM-DD` formatted dates.

**Sorting: reverse-chronological by `date`, computed in the page (or a small lib function), not relied upon from source-file ordering.**
- The 3 placeholder entries are deliberately written out of chronological order in the YAML file, so the build/test can prove the sort is actually applied rather than accidentally correct because the file happened to already be in order.

## Risks / Trade-offs

- [Trade-off] No categorization means all entries look visually the same regardless of kind (paper vs. talk vs. milestone). Accepted per Non-Goals - easy to add a `category`/badge later without breaking existing entries (it would just be an optional field).

## Open Questions

Carried over from proposal.md:
- Real news/updates list, to replace the 3 placeholder entries.
