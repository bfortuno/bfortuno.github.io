## ADDED Requirements

### Requirement: Projects parsed from a structured data file
The projects page SHALL render its grid of cards by parsing a structured data file at build time; cards SHALL NOT be hardcoded as page markup.

#### Scenario: Adding a project card
- **WHEN** a new entry is added to the project-cards data file
- **THEN** it appears on the rendered projects page after the next build, with no page-markup changes required

### Requirement: Project card display
Each project card SHALL display its title, a short abstract, its tech/methods tags, and one placeholder media item (image or video).

#### Scenario: Card with all link types present
- **WHEN** a card has code, paper, and demo links
- **THEN** all three links are rendered for that card

#### Scenario: Card with no links
- **WHEN** a card has none of code/paper/demo links
- **THEN** the card still renders correctly with title/abstract/tags/media and no dead or empty link elements

### Requirement: Conditional link to a dedicated project page
A project card MAY reference a dedicated page slug; the projects page SHALL render a link to that dedicated page only when the referenced page actually exists.

#### Scenario: Card with an existing dedicated page
- **WHEN** a card's referenced slug corresponds to an existing entry in the project-page-template's content collection
- **THEN** the card displays a link to that dedicated page

#### Scenario: Card with no dedicated page
- **WHEN** a card has no referenced slug, or the slug does not correspond to an existing entry
- **THEN** the card renders normally without a dedicated-page link, and no broken link is produced

### Requirement: Projects page uses the shared shell
The projects page SHALL render through the shared `Layout` component established by the site shell, with no duplicate `<head>`/nav/footer markup.

#### Scenario: Projects page inherits the shared shell
- **WHEN** the projects page is rendered
- **THEN** it shows the same navigation, footer, and theme toggle as every other page, provided by the shared `Layout` component
