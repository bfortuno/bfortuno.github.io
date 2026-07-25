## Context

The `/publications` route exists as a stub (from change 1) wrapped in the shared `Layout`. This change gives it real structure: a data file, parsing, list rendering, and client-side tag filtering. No real publication data exists yet — the brief explicitly allows deferring the BibTeX-vs-YAML choice, and explicitly forbids inventing real publications, so this change ships with clearly-fake placeholder entries.

## Goals / Non-Goals

**Goals:**
- Parse a single structured data file into a list of publication entries at build time (fully static — no client-side fetch/backend).
- Render each entry with title, authors, venue, year, links (PDF/DOI/code), optional thumbnail, and tags.
- Provide client-side tag filtering that works with JavaScript-light interaction (no backend, no full framework).
- Add `featured`/`projectPage` fields to the schema now so change 4 (Nerfies-style project-page template) can wire up real links later without a schema change.

**Non-Goals:**
- Building the Nerfies-style project-page template itself (change 4) or making any `projectPage` link actually resolve — no entry in this change will set `projectPage` to a real value.
- Full-text/fuzzy search — tag filtering only.
- A CMS or admin UI for editing entries — the data file is hand-edited.
- Citation-style rendering (APA/MLA/BibTeX-formatted citation strings) beyond the raw fields — out of scope unless requested later.

## Decisions

**Source format: `src/data/publications.bib` (BibTeX), not YAML.**
- The brief allows either; BibTeX is the standard academic interchange format and is what Google Scholar, Zotero, and DBLP export directly — this matters because it lowers the friction for Benjamin to paste in his real list later (copy from Scholar/Zotero, no reformatting).
- Non-standard fields needed for this site (`tags`, `featured`, `pdf`, `code`, `thumbnail`, `projectpage`) are added as ordinary custom BibTeX fields on each entry — BibTeX entries are just key-value pairs, and parsers generally preserve unrecognized fields, so no sidecar YAML file is needed to carry site-specific metadata.
- Alternative considered: structured YAML. Rejected as the primary source because it's less portable from reference managers (an extra manual reformatting step every time Benjamin adds a paper), even though it would be marginally simpler to parse. If BibTeX parsing proves genuinely painful at implementation time, falling back to YAML remains an option — call this out during implementation rather than block the proposal on it.
- Parsing: a small BibTeX-parsing npm package (evaluated at implementation time for Node 22 / ESM compatibility, e.g. `@retorquere/bibtex-parser` or similar), imported and run in the page's frontmatter at build time — output is plain data, no client-side parsing.

**Tag filtering: vanilla client-side script, no UI framework.**
- Consistent with change 1's decision to avoid adding a UI framework until proven necessary. A small `is:inline`/module script toggles a `hidden` attribute (or a CSS class) on cards based on selected tag buttons; works without JS too in the sense that all entries are visible by default (progressive enhancement, not a blank state requiring JS).
- Alternative considered: an Astro island with a framework (React/Preact) for filter state. Rejected as overkill for toggling visibility of a static, pre-rendered list.

**Featured entries and `projectPage`: schema-only in this change.**
- The `featured: true` flag and `projectPage: <slug>` field are parsed and available, but the UI only renders a "Project Page →" link when `projectPage` is both present and non-empty. Since no example/placeholder entry sets `projectPage`, no link will actually render yet — this avoids shipping a dead link ahead of change 4, while avoiding a schema rework when change 4 lands.

**Placeholder entries: 2-3 obviously-fake papers (e.g. "Example Paper Title One"), not modeled on any real work.**
- Needed to verify list rendering, thumbnails, links, and tag filtering end-to-end before Benjamin's real list is supplied. Titles/authors are generic enough to be unmistakably placeholder, per the content rule against inventing real publications.

## Risks / Trade-offs

- [Risk] BibTeX parsing library choice/behavior (e.g. handling of custom fields, multi-author name splitting) isn't finalized until implementation. → Mitigation: if the first-choice library mishandles custom fields or is ESM-incompatible, swap for an alternative during task 1 without needing a new proposal (implementation detail, not a spec-level change).
- [Risk] Tag filtering implemented as a plain script could be missed by users who don't have JS, seeing all entries unfiltered. → Mitigation: acceptable — the full unfiltered list is still fully readable and functional without JS; filtering is progressive enhancement, not required for the page to be useful.
- [Trade-off] Keeping site-specific metadata (tags, featured, thumbnail) as custom BibTeX fields instead of a separate YAML sidecar keeps everything in one file at the cost of slightly non-standard `.bib` content (tools expecting pure academic BibTeX will just ignore the extra fields, which is safe).

## Open Questions

Carried over from proposal.md:
- Real publication list, to replace the placeholder entries.
- Confirm the tag vocabulary (proposed: `surgical robotics`, `control`, `teleoperation`, `haptics`, extendable).
- Whether/which paper(s) should be marked `featured` (relevant once change 4 exists).
