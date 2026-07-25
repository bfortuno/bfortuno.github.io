## Context

Change 3 added `featured`/`projectPage` fields to publications entries, anticipating a dedicated page format for standout work. Change 5 (Projects grid, next after this one) will also link project cards to a dedicated page "when it has one." Both consumers need the same underlying page type: a single reusable template usable for **either** a paper writeup or a general project (thesis work, MMI collaboration output, open-source tool), modeled structurally on nerfies.github.io (title/authors/affiliations bar, hero teaser, abstract, method figure, results, optional BibTeX) but implemented in Astro/CSS matching this site's existing minimalist academic look — not a port of Nerfies' literal Bulma/jQuery/CSS.

## Goals / Non-Goals

**Goals:**
- One reusable layout + content schema that serves both a paper page and a project page, so change 5 doesn't need a second template.
- Type-safe, validated content authored as simple Markdown+frontmatter files — no hand-rolled parsing (unlike change 3's BibTeX case, which needed a real bibliography interchange format; here there's no equivalent external format to interoperate with, so a native Astro mechanism is the right fit).
- Every optional section (method figure, results, acknowledgements, BibTeX) degrades gracefully when absent, since a project entry may have fewer sections than a paper entry.
- Stay within the existing design system: same fonts, same light/dark tokens, same single accent color, rendered inside the shared `Layout` (nav/footer/theme toggle stay consistent).

**Non-Goals:**
- No JS carousel library for the results section — CSS-only scroll-snap strip (see Decisions).
- No automatic cross-referencing between a project page's BibTeX and `publications.bib` — entered independently for now; revisit only if duplication becomes a real maintenance problem.
- No video transcoding/optimization — real video files (once supplied) are used as-is.
- Not building change 5's Projects grid itself — only the destination page it will eventually link to.

## Decisions

**Astro Content Collections (`src/content/config.ts`, a `projects` collection) rather than hand-parsed frontmatter.**
- Gives schema validation (via Zod) and generated TypeScript types for free, and is the idiomatic Astro mechanism for a growing set of similarly-shaped Markdown entries — a better fit here than change 3's BibTeX approach, since there's no external interchange format (like BibTeX) this content needs to stay compatible with.
- Alternative considered: plain `import.meta.glob` over hand-written frontmatter. Rejected — no validation, no generated types, more boilerplate for the same result.

**Schema (fields on each `projects` entry):**
- `title: string`
- `authors: { name: string; affiliations: number[]; url?: string }[]` — `affiliations` indexes into the `affiliations` list below, matching the classic superscript-number convention.
- `affiliations: string[]`
- exactly one of `heroImage: string` / `heroVideo: string` (enforced with a Zod `.refine`) — the hero teaser.
- `abstract: string`
- `methodFigure?: { image: string; caption: string }`
- `results: { type: 'image' | 'video'; src: string; caption?: string }[]` — may be empty.
- `acknowledgements?: string`
- `bibtex?: string` — optional because a software/thesis project may have no citation.
- Slug is the filename, per Astro's content-collection default, matching the `projectPage` slug referenced from `publications.bib`.

**Results section: CSS-only horizontally scrollable strip (`overflow-x: auto; scroll-snap-type: x mandatory`), not a JS carousel.**
- Handles both the "side-by-side comparison" case (few items, fits without scrolling on wide viewports) and the "carousel" case (many items, scrolls) with the same markup, consistent with the site's no-framework-until-needed approach (change 1, change 3). Add a visible scroll affordance (e.g. partially-visible next item, or subtle edge fade) so the strip doesn't look like a dead-end when there's more than fits on screen.
- Alternative considered: a JS carousel library (Splide/Swiper). Rejected as unnecessary weight/dependency for this site's scale; revisit only if the user specifically wants autoplay or slide indicators later.

**Hero video: `autoplay muted loop playsinline`, paused when `prefers-reduced-motion: reduce` is set.**
- Standard pattern for silent looping teaser videos; respecting reduced-motion is required by this project's accessibility conventions (a hard requirement, not a polish item). No real video asset exists yet, so this path is implemented but not exercised by the example instance (which uses a placeholder image hero).

**BibTeX block: `<pre><code>` plus a "Copy" button using the Clipboard API, entirely omitted when `bibtex` is absent.**
- Small vanilla script consistent with `ThemeToggle`'s existing pattern (change 1) — no new dependency.

**Routing: `src/pages/projects/[slug].astro` using `getStaticPaths()` over `getCollection('projects')`, fully static output.**
- Coexists with the existing `src/pages/projects.astro` stub (change 1) without conflict — Astro routes an exact `projects.astro` file separately from a `projects/[slug].astro` dynamic route. Change 5 replaces the stub; this change does not touch it.

**`ProjectPageLayout.astro` composes inside the shared `Layout`.**
- Keeps nav/footer/theme-toggle consistent with the rest of the site per the `site-shell` requirement that every page renders through the shared `Layout` — the Nerfies-style sections are the page's *content*, not a replacement shell.

## Risks / Trade-offs

- [Risk] Astro's content-collections API may differ in exact shape from what's assumed here at design time (the installed Astro version, `^7.1.3`, is well ahead of the version most public content-collection examples target). → Mitigation: confirm the current collection-definition API (e.g. loader-based `glob()` vs legacy glob-collection) against the installed version during implementation; this is an implementation detail, not a spec-level concern.
- [Risk] A horizontally-scrolling results strip may not read as scrollable at a glance. → Mitigation: make the next item partially visible at the container edge (or an equivalent visual cue) so affordance is obvious without JS.
- [Risk] Hero video autoplay could be blocked by some browsers if not muted, or could be jarring for motion-sensitive users. → Mitigation: always `muted`, and pause via `prefers-reduced-motion` media query.
- [Trade-off] Supporting both "paper" and "project" use cases from one schema means more optional fields and more conditional rendering than a single-purpose paper page would need — accepted, since this is exactly the reuse the brief (and your clarification) asked for.

## Open Questions

Carried over from proposal.md:
- No real featured paper or project exists yet — the example instance is entirely placeholder content.
- Results section will ship with placeholder images only in the example instance (no real video asset available yet); video support is implemented but unexercised until one is supplied.
