## Context

The `/cv` route exists as a stub (from change 1) wrapped in the shared `Layout`. Unlike every prior content change, real content already exists here: a finished CV PDF and its full source (education, experience, projects, skills, languages, plus a header with name/tagline/contact line). This is also the first page whose summary content overlaps conceptually with two other capabilities: Publications (change 3) and the future Interests & Contact page (change 8) - decisions below are mostly about avoiding duplication with those.

## Goals / Non-Goals

**Goals:**
- Prominent, unmistakable link to download/view the CV PDF.
- A lightweight, skimmable HTML summary (education, experience, selected projects, skills, languages) sourced from structured data, not hand-built markup.
- No duplicated source of truth for publications - link to the existing Publications page instead of re-listing entries here.

**Non-Goals:**
- Rebuilding the CV as a PDF-generation pipeline (e.g. compiling the HTML summary back into a PDF) - the PDF is supplied as-is; the HTML summary is a separate, hand-authored-data rendering, not a byte-for-byte mirror.
- Full contact-links section (email/ORCID/Scholar/GitHub/institutional profile) - that's change 8's job. This page includes only what a CV conventionally shows in its header (name, tagline, and immediate contact line), not the full contact directory.
- Any change to `publications.bib`'s schema - only its placeholder *content* may be replaced with real entries (see Decisions), which is a data update, not a spec change.

## Decisions

**Structured data in `src/data/cv.yaml`, parsed by a small `src/lib/cv.ts` module - same pattern as change 3's `src/lib/publications.ts`.**
- The source content (education entries, experience entries, project entries, skills, languages) is naturally a nested structure, not a flat list of similarly-shaped records - a poor fit for Astro's content-collection `file()`/`glob()` loaders (both expect a collection of entries with an id each). A single YAML file parsed directly mirrors the schema shape exactly and needs no ID-per-entry workaround.
- Alternative considered: forcing this into a content collection (e.g. one entry per resume section). Rejected - adds indirection without benefit for a single-owner, single-instance data file.

**New dependency: the `yaml` npm package**, imported in `src/lib/cv.ts` to parse `src/data/cv.yaml?raw` (same `?raw` import mechanism change 3 used for the `.bib` file).
- Alternative considered: hand-rolling a parser, or storing the data as JSON instead (natively importable in Vite without a parser). Rejected JSON for authoring ergonomics - the source content is naturally multi-line prose in places (highlights, summary), and YAML handles that far more readably than JSON's escaped strings.

**No publications section on the CV page - link to `/publications` instead.**
- `publications.bib` (change 3) is the single source of truth for publication entries. Re-entering the same three papers by hand into `cv.yaml` would create a second copy that can silently drift (e.g. if a venue or year is corrected in one place but not the other). A CV page linking out to the canonical list avoids this entirely.
- Separately (see proposal's flagged decisions): the three publications supplied are real, so `publications.bib`'s existing placeholder entries can be replaced with them - a content update to change 3's data file, not a new capability or spec change, and not strictly part of this change's scope, but reasonable to do alongside it since the same source material arrived together.

**Contact line: name, tagline, email, phone, location, LinkedIn - shown once, in the CV summary's header, using the same accent-colored, minimalist styling as the rest of the site (not the resume source's literal blue-heading, Inter-font, uppercase CSS, which belongs to the PDF/standalone resume, not this site's shared design system).**
- The provided CSS (embedded in the source content) styles a **different, standalone HTML/PDF document** - it is not meant to be dropped into this site, which already has its own typographic system (serif headings, single accent color, dark/light tokens) established since change 1. This change reimplements the same *information* using the site's existing components/CSS conventions, not the literal supplied stylesheet.
- Phone number inclusion in the on-page summary (vs. PDF-only) is flagged as an open question in the proposal, since it's a judgment call about public exposure that belongs to Benjamin, not an implementation detail to decide unilaterally.

**Commented-out content in the source (the "Kinamics Ltd." role, a couple of bullet points) is excluded**, respecting what reads as an intentional edit already made by Benjamin in his working copy, rather than re-including material he chose to comment out.

## Risks / Trade-offs

- [Risk] A public phone number in page text (vs. only in the PDF) is more easily scraped than PDF text. → Mitigation: flagged as an explicit open question rather than decided silently; default (include, per the source's `@REDACTED=false`) is easy to reverse in one line if Benjamin prefers otherwise.
- [Trade-off] Not listing publications on the CV page means a visitor reading the CV alone won't see the paper list without an extra click to `/publications`. Accepted - the alternative (duplicated data) was judged worse for long-term maintenance.
- [Risk] `publications.bib`'s placeholder entries would be replaced with real data as part of this change's implementation, slightly widening this change's footprint beyond "CV page only." → Mitigation: explicitly flagged for confirmation in the proposal; if declined, it's simply skipped and handled as its own follow-up later.

## Open Questions

Carried over from proposal.md:
- Include the phone number in the on-page HTML summary, or PDF-only?
- Replace `publications.bib`'s 3 placeholder entries with the 3 real papers supplied now (and confirm their author-order/position is correct as given)?
