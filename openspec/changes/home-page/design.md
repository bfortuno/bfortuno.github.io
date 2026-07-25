## Context

Change 1 (project-scaffold) shipped the shared `Layout`/`Nav`/`Footer` shell and a stub `src/pages/index.astro` rendering only "Coming soon". This change replaces that stub with the site's actual front door. No real bio copy, photo, or confirmed highlight-link targets exist yet — those are supplied by Benjamin later; this change builds the structure and placeholder content so it can be dropped in without further layout changes.

## Goals / Non-Goals

**Goals:**
- Build the home page's content sections (bio/photo, affiliation, collaboration callout, highlight links) as reusable, accessible Astro markup/components.
- Make the PoliMi–MMI collaboration visually distinct (not buried in a paragraph) per the project's explicit requirement that the collaboration be "clearly visible."
- Keep every piece of real content behind an obvious placeholder so nothing fabricated ships.

**Non-Goals:**
- Writing the actual bio, sourcing the photo, or finalizing which paper/project the highlight links point to — tracked as open questions, resolved by the user later (content is swappable without a follow-up OpenSpec change; just edit the placeholder values).
- Publications/Projects/CV data modeling (BibTeX parsing, project card schema) — those arrive in changes 3–5. Highlight links here just point at the existing stub routes.
- SEO/OG image work for the home page — that's change 8 (Polish pass).

## Decisions

**Content lives inline in `index.astro` as typed props on small components, not in a Markdown/YAML content file.**
Unlike Publications/Projects/News (which are naturally list-shaped and benefit from a data file per the project's "content sourced from Markdown/YAML/BibTeX" convention), the home page is one-off prose and a fixed set of links — a content file would add indirection without benefit. Placeholder strings live directly in `index.astro`, each wrapped in an obvious `TODO:` marker, easy for Benjamin to find and edit directly.

**Collaboration callout as its own component (`CollaborationCallout.astro`), visually distinct via a bordered/tinted panel using the existing `--accent` token.**
- Alternative considered: a plain paragraph under "Affiliation." Rejected because the proposal (and the user's original brief) calls for the collaboration to be "clearly visible," which a same-weight paragraph doesn't achieve.
- Reuses the single accent color from the theme-toggle capability rather than introducing a second color, keeping the minimalist-academic direction intact.

**Highlight links as a `HighlightLinks.astro` component rendering a small list of 3-4 labeled cards/links, sourced from a plain array in the frontmatter (not a content collection)** — matches the "content file" decision above: too small and static to warrant a collection.
- Default targets (pending user confirmation): Latest Paper → `/publications`, Current Project → `/projects`, CV → `/cv`, Contact → `/contact`. These already resolve to real (stub) pages from change 1, so no dead links.

**Placeholder photo: a fixed-aspect-ratio box with descriptive alt text and a visible "photo placeholder" label, not a fake/generic stock image.**
- Alternative considered: a generic silhouette/avatar image. Rejected — could be mistaken for a real asset; an explicit placeholder box makes the missing content obvious to anyone browsing the deployed site before the real photo is added.

## Risks / Trade-offs

- [Risk] Shipping visible "TODO"/placeholder text to production (GitHub Pages) before real content arrives means the live site looks unfinished. → Mitigation: this is expected and time-boxed — the user will supply real content promptly after this change is approved; placeholders are clearly labeled so it reads as "under construction," not broken.
- [Risk] Hardcoding highlight-link targets to stub routes couples this change to change 1's routes. → Mitigation: those routes are already stable (site-shell spec requires them), so this is a reasonable dependency, not a new risk.
- [Trade-off] Inline placeholder content (vs. a data file) means editing copy later means editing `.astro` files directly rather than a content file. Acceptable for a single one-off page; revisit only if the home page grows more sections later.

## Open Questions

Carried over from proposal.md — resolved by the user before or during implementation:
- Bio paragraph text and photo file.
- Confirmed highlight-link labels/targets (defaults proposed above).
- Any specific wording for the Collaboration callout beyond the placeholder description.
