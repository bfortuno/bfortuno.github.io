## Why

The site currently has a shell (nav, footer, theme toggle) but every route, including the home page, is a bare "Coming soon" stub. The home page is the site's front door: it needs to introduce Benjamin, state his PhD/PoliMi affiliation, make the PoliMi–MMI collaboration visible at a glance, and route visitors to the site's other key destinations. This is change 2 of 8 in the site build sequence.

## What Changes

- Replace the `src/pages/index.astro` stub with real home page content:
  - Bio section with a placeholder for a profile photo (`alt` text required) and a short bio paragraph.
  - Current affiliation line: PhD candidate at Politecnico di Milano, in collaboration with Medical Microinstruments (MMI), Pisa.
  - A dedicated "Collaboration" callout section that visually stands out (not just inline text) explaining the PoliMi–MMI partnership and its research focus (trustworthy/robust learning-based robot control for surgical microsurgery).
  - 3–4 "highlight links": latest paper, current project, CV, contact — each pointing at a real route or placeholder anchor until that page/content exists (Publications/Projects/CV/Contact routes already exist as stubs from change 1; "latest paper" may point at the Publications page until per-paper deep links exist in change 3).
- All real copy (bio text, photo, highlight-link targets/labels) is unknown and MUST NOT be invented — placeholders with explicit `TODO` markers are used instead, listed as open questions below.

## Capabilities

### New Capabilities
- `home-page`: The home route's content sections — bio/photo, affiliation, collaboration callout, and highlight links — and their requirements (structure, accessibility, responsiveness), independent of the final copy.

### Modified Capabilities
- None. `site-shell`, `theme-toggle`, and `deploy-pipeline` (from change 1) are unaffected — the home route already exists and is already wrapped in the shared `Layout`; this change only replaces its inner content.

## Impact

- **Changed**: `src/pages/index.astro` (stub → real sections), plus new supporting components under `src/components/` (e.g. a `CollaborationCallout` and a `HighlightLinks` component) and any new placeholder image assets under `public/`.
- **No changes** to layout, nav, footer, theme system, or deploy pipeline.
- **Open questions / content needed from you** (placeholders will be used until supplied):
  - Bio paragraph text (a few sentences about you, your research, background).
  - Profile photo file (and its alt text) — until supplied, a placeholder image/box will render.
  - The 3–4 highlight links: exact labels and targets. Proposed defaults, pending your confirmation:
    1. Latest paper → Publications page (or a specific paper once you tell me which)
    2. Current project → Projects page (or a specific project)
    3. CV → CV page
    4. Contact → Contact page
  - Any specific wording you want for the Collaboration callout beyond "PhD in collaboration with Medical Microinstruments (MMI), Pisa" — or is the description in this proposal's "What Changes" section sufficient as placeholder copy?
