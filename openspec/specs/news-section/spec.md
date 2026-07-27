## Purpose

The news route: a reverse-chronological list of short updates sourced from structured data. Established in the `news-section` change.

## Requirements

### Requirement: News entries parsed from a structured data file
The news page SHALL render its list of entries by parsing a structured data file at build time; entries SHALL NOT be hardcoded as page markup.

#### Scenario: Adding a news entry
- **WHEN** a new entry is added to the news data file
- **THEN** it appears on the rendered news page after the next build, with no page-markup changes required

### Requirement: Reverse-chronological ordering
The news page SHALL display entries in reverse-chronological order (most recent first), regardless of the order entries appear in the source data file.

#### Scenario: Entries authored out of order
- **WHEN** the source data file lists entries in a non-chronological order
- **THEN** the rendered page still displays them sorted from most recent to oldest

### Requirement: News entry display
Each news entry SHALL display its date and its text; an entry MAY include a link, which SHALL be rendered when present.

#### Scenario: Entry with a link
- **WHEN** an entry includes a link
- **THEN** the entry's text is accompanied by a working link to that URL

#### Scenario: Entry without a link
- **WHEN** an entry has no link
- **THEN** the entry still renders correctly with its date and text, with no dead or empty link element

### Requirement: News page uses the shared shell
The news page SHALL render through the shared `Layout` component established by the site shell, with no duplicate `<head>`/nav/footer markup.

#### Scenario: News page inherits the shared shell
- **WHEN** the news page is rendered
- **THEN** it shows the same navigation, footer, and theme toggle as every other page, provided by the shared `Layout` component
