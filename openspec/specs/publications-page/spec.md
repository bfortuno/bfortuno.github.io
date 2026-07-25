## Purpose

The publications route: data-driven rendering from a structured file, entry display, tag filtering, and featured/project-page linking. Established in the `publications-page` change.

## Requirements

### Requirement: Publications parsed from a structured data file
The publications page SHALL render its list of entries by parsing a structured data file (BibTeX or equivalent) at build time; entries SHALL NOT be hardcoded as page markup.

#### Scenario: Adding a publication
- **WHEN** a new entry is added to the publications data file
- **THEN** it appears on the rendered publications page after the next build, with no page-markup changes required

### Requirement: Publication entry display
Each publication entry SHALL display its title, authors, venue, and year, plus any of its available links (PDF, DOI, code) and optional thumbnail image.

#### Scenario: Entry with all fields present
- **WHEN** an entry has title, authors, venue, year, a PDF link, a DOI link, a code link, and a thumbnail
- **THEN** all of those are rendered for that entry

#### Scenario: Entry with optional fields absent
- **WHEN** an entry has no thumbnail and no code link
- **THEN** the entry still renders correctly with title/authors/venue/year and whichever links are present, without broken image icons or dead links for the absent fields

### Requirement: Tag-based filtering
The publications page SHALL let visitors filter the visible entries by tag (e.g. `surgical robotics`, `control`, `teleoperation`, `haptics`), operating entirely client-side with no backend request.

#### Scenario: Filtering by a single tag
- **WHEN** a visitor selects a tag filter
- **THEN** only entries carrying that tag remain visible, without a page reload

#### Scenario: Clearing the filter
- **WHEN** a visitor clears the active tag filter (or no filter is selected)
- **THEN** all publication entries are visible

### Requirement: Featured entries may link to a dedicated project page
A publication entry MAY be flagged as featured and MAY reference a dedicated project page slug; the publications page SHALL render a link to that project page only when the referenced page actually exists.

#### Scenario: Featured entry with an existing project page
- **WHEN** an entry is flagged featured and its referenced project page slug corresponds to an existing route
- **THEN** the entry displays a link to that project page

#### Scenario: Featured entry with no project page yet
- **WHEN** an entry is flagged featured but has no project page slug, or the slug does not correspond to an existing route
- **THEN** the entry renders normally without a project-page link, and no broken link is produced

### Requirement: Publications page uses the shared shell
The publications page SHALL render through the shared `Layout` component established by the site shell, with no duplicate `<head>`/nav/footer markup.

#### Scenario: Publications page inherits the shared shell
- **WHEN** the publications page is rendered
- **THEN** it shows the same navigation, footer, and theme toggle as every other page, provided by the shared `Layout` component
