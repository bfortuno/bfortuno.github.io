## Context

The `/projects` route exists as a stub (from change 1) wrapped in the shared `Layout`. Change 4 established a `projects` content collection and `/projects/<slug>` route for full Nerfies-style dedicated pages, but nothing yet links to them from within the site itself except a not-yet-populated `projectPage` field on publications. This change gives `/projects` its real content — a card grid — and is the first place that actually renders a link to a change-4 dedicated page.

## Goals / Non-Goals

**Goals:**
- A responsive grid of project cards: title, short abstract, tags, placeholder media, and code/paper/demo links.
- Prove the "card links to its dedicated page only when one exists" rule end-to-end, using the real `example-project` entry from change 4.
- Keep the data source simple and separate from change 4's `projects` collection — cards are lightweight metadata, not full pages.

**Non-Goals:**
- Tag-based filtering. The brief for this page (unlike Publications) only asks for tags to be shown, not filtered on — adding a filter UI here would be scope creep beyond what was asked; can be proposed as a follow-up if wanted later.
- Building any new change-4 dedicated pages — this change only links to the one that already exists (`example-project`).
- Video/GIF asset optimization — placeholder media only, real assets supplied later as-is.

## Decisions

**A second, separate content collection (`project-cards`) via Astro's `file()` loader over a single `src/content/project-cards.yaml`, not reusing change 4's `projects` collection.**
- Change 4's `projects` collection holds full dedicated pages (hero, abstract, results, BibTeX, Markdown body) — a different shape and purpose than a lightweight grid card (title, short abstract, tags, one media item, a few links). Reusing it would force every card to look like a full page or would bloat the change-4 schema with grid-only fields. Two collections cleanly separate "the grid entry" from "the optional dedicated page it may point to."
- `file()` loader over one YAML file (rather than one Markdown file per card, like change 4) fits because cards have no long-form body content to author — just a handful of short fields, and a single YAML file is easy to scan/edit as a list.

**Card → dedicated page linking: a card's `detailSlug` renders a link only when `getCollection('projects')` actually contains an entry with that id.**
- Checked at build time (Astro build is fully static, so this is just an array lookup during page generation), consistent with how change 3 already decided to handle its `projectPage` field ("only link when it resolves"), rather than assuming the referenced page exists.

**No tag filter UI.**
- Alternative considered: reuse change 3's `TagFilter` component here too, for consistency. Rejected for now because the brief only asked for tags to be *shown* on Projects (badges), not filtered — adding interactive filtering not requested is scope creep; straightforward to add later as its own small change if wanted, reusing the same `TagFilter` pattern already proven on Publications.

**Media placeholder: support `image` and `video` types (a GIF is just an `image` under the hood - `.gif` files render fine via `<img>`, no separate type needed).**

## Risks / Trade-offs

- [Risk] Two separate "project" concepts (`projects` collection for dedicated pages, `project-cards` collection for grid entries) could be confused later. → Mitigation: naming and this design doc make the split explicit; revisit only if maintaining two files in practice proves annoying.
- [Trade-off] No tag filtering means Projects and Publications behave slightly differently (one filters, one doesn't) even though both show tags. Acceptable since it matches what was actually asked for each page; consistency isn't a goal in itself here.

## Open Questions

Carried over from proposal.md:
- Real project list, to replace the 3 placeholder cards.
- Whether any additional real project should get a full change-4 dedicated page.
