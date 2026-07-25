## ADDED Requirements

### Requirement: Reusable project/paper page content schema
Project and paper pages SHALL be authored as entries in a validated content collection (title, authors with affiliations, hero media, abstract, optional method figure, results items, optional acknowledgements, optional BibTeX), not as hand-built page markup per entry.

#### Scenario: Adding a new project or paper page
- **WHEN** a new entry is added to the projects content collection with a valid frontmatter schema
- **THEN** a page is generated for it at `/projects/<slug>` with no page-markup changes required

#### Scenario: Invalid entry fails validation
- **WHEN** an entry is missing a required field or violates the schema (e.g. specifies both a hero image and a hero video, or neither)
- **THEN** the build fails with a schema validation error rather than silently rendering a broken page

### Requirement: Title, authors, and affiliations bar
Each project/paper page SHALL display the title, the list of authors, and their affiliations, with each author linked to their affiliation(s).

#### Scenario: Multiple authors with shared and distinct affiliations
- **WHEN** an entry lists multiple authors referencing overlapping affiliation indices
- **THEN** each author's affiliation reference(s) are visibly associated with the correct affiliation text

### Requirement: Hero teaser media
Each project/paper page SHALL display a hero teaser using exactly one of an image or a video.

#### Scenario: Image hero
- **WHEN** an entry specifies a hero image
- **THEN** the page displays that image prominently near the top of the page

#### Scenario: Video hero respects reduced motion
- **WHEN** an entry specifies a hero video and the visitor's system has `prefers-reduced-motion: reduce` enabled
- **THEN** the video does not autoplay

### Requirement: Abstract section
Each project/paper page SHALL display an abstract/summary text section.

#### Scenario: Abstract always present
- **WHEN** any project/paper page is rendered
- **THEN** the abstract text is visible without requiring interaction

### Requirement: Optional method figure
A project/paper page SHALL render a method figure (image with caption) when the entry provides one, and SHALL NOT render an empty method-figure section when it does not.

#### Scenario: Method figure present
- **WHEN** an entry specifies a method figure
- **THEN** the image and its caption are displayed in a dedicated section

#### Scenario: Method figure absent
- **WHEN** an entry has no method figure
- **THEN** no method-figure section (empty or otherwise) is rendered

### Requirement: Results section
A project/paper page SHALL display its results items (if any) as a horizontally scrollable strip of media (images and/or videos) with optional captions, without requiring a JavaScript carousel library.

#### Scenario: Multiple results items
- **WHEN** an entry has more results items than fit in the viewport width
- **THEN** the remaining items are reachable by horizontal scrolling, with a visible affordance that more content exists

#### Scenario: No results items
- **WHEN** an entry has an empty results list
- **THEN** no results section is rendered

### Requirement: Optional acknowledgements
A project/paper page SHALL render an acknowledgements text section when the entry provides one, and SHALL NOT render an empty acknowledgements section when it does not.

#### Scenario: Acknowledgements present
- **WHEN** an entry specifies acknowledgements text
- **THEN** it is displayed in a dedicated section, typically near the end of the page

### Requirement: Optional copy-able BibTeX block
A project/paper page SHALL render a BibTeX citation block with a control to copy it to the clipboard when the entry provides a BibTeX string, and SHALL NOT render a BibTeX section when it does not.

#### Scenario: BibTeX present
- **WHEN** an entry specifies a BibTeX string
- **THEN** the page displays it in a readable block with a control that copies the exact BibTeX text to the clipboard when activated

#### Scenario: BibTeX absent
- **WHEN** an entry has no BibTeX string (e.g. a non-paper project)
- **THEN** no BibTeX section or copy control is rendered

### Requirement: Project/paper pages use the shared shell
Every project/paper page SHALL render through the shared `Layout` component established by the site shell, with no duplicate `<head>`/nav/footer markup.

#### Scenario: Project page inherits the shared shell
- **WHEN** a project/paper page is rendered
- **THEN** it shows the same navigation, footer, and theme toggle as every other page, provided by the shared `Layout` component
