## ADDED Requirements

### Requirement: Downloadable CV PDF
The CV page SHALL provide a clearly visible link to download or view the CV PDF.

#### Scenario: Visitor downloads the CV
- **WHEN** a visitor activates the CV download/view link
- **THEN** the CV PDF file loads or downloads successfully

### Requirement: CV summary parsed from a structured data file
The CV page's HTML summary (education, experience, projects, skills, languages) SHALL be rendered by parsing a structured data file at build time; it SHALL NOT be hardcoded as page markup.

#### Scenario: Updating CV summary content
- **WHEN** the structured CV data file is edited
- **THEN** the rendered summary reflects the change after the next build, with no page-markup changes required

### Requirement: Education, experience, and projects sections
The CV summary SHALL display education history, research/work experience, and selected projects, each as a list of entries with a title/role, organization or institution, time period, and highlight bullet points.

#### Scenario: Entry with multiple highlights
- **WHEN** an entry has more than one highlight bullet point
- **THEN** all of its highlight bullet points are rendered, in order

### Requirement: Skills and languages sections
The CV summary SHALL display technical skills (grouped by category) and spoken languages (with proficiency level).

#### Scenario: Skills grouped by category
- **WHEN** the skills data groups entries under multiple categories
- **THEN** each category is displayed with its own set of skills

### Requirement: No duplicated publications list
The CV page SHALL NOT re-list publication entries; it SHALL instead link to the site's Publications page.

#### Scenario: Visitor looks for publications on the CV page
- **WHEN** a visitor is on the CV page and wants to see publications
- **THEN** they find a link to the Publications page rather than a second, separately-maintained list of papers

### Requirement: CV page uses the shared shell
The CV page SHALL render through the shared `Layout` component established by the site shell, with no duplicate `<head>`/nav/footer markup.

#### Scenario: CV page inherits the shared shell
- **WHEN** the CV page is rendered
- **THEN** it shows the same navigation, footer, and theme toggle as every other page, provided by the shared `Layout` component
