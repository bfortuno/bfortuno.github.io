## ADDED Requirements

### Requirement: Bio and photo section
The home page SHALL present a bio section containing a profile photo (or clearly labeled placeholder) with descriptive alt text, and a short bio paragraph introducing Benjamin.

#### Scenario: Photo missing real content
- **WHEN** no real photo file has been supplied yet
- **THEN** the page renders a clearly labeled placeholder image area with non-empty, descriptive alt text, rather than a broken image or empty space

#### Scenario: Bio text missing real content
- **WHEN** no real bio copy has been supplied yet
- **THEN** the page renders visible placeholder text marked as a TODO, rather than fabricated biographical content

### Requirement: Current affiliation display
The home page SHALL state Benjamin's current affiliation: PhD candidate at Politecnico di Milano, in collaboration with Medical Microinstruments (MMI), Pisa.

#### Scenario: Affiliation visible on page load
- **WHEN** a visitor loads the home page
- **THEN** the PhD/PoliMi affiliation and the MMI collaboration are stated in the visible content without requiring interaction

### Requirement: PoliMi-MMI collaboration callout
The home page SHALL include a visually distinct callout section (not an inline paragraph of the same visual weight as surrounding text) describing the PoliMi-MMI collaboration.

#### Scenario: Callout is visually distinguished
- **WHEN** the home page renders
- **THEN** the collaboration callout is presented in a visually distinct block (e.g. bordered or tinted panel) using the site's accent color, separate from the general bio text

### Requirement: Highlight links
The home page SHALL present 3 to 4 highlight links routing visitors to key destinations (e.g. latest paper, current project, CV, contact), each resolving to a real page.

#### Scenario: Highlight link resolves to a real page
- **WHEN** a visitor activates a highlight link
- **THEN** they are taken to an existing page (a full page built in a later change, or a stub page from the site shell) rather than a broken link or 404

#### Scenario: Highlight links keyboard accessible
- **WHEN** a visitor tabs through the highlight links using only the keyboard
- **THEN** each link receives a visible focus indicator and can be activated with `Enter`

### Requirement: Home page uses the shared shell
The home page SHALL render through the shared `Layout` component established by the site shell, with no duplicate `<head>`/nav/footer markup.

#### Scenario: Home page inherits the shared shell
- **WHEN** the home page is rendered
- **THEN** it shows the same navigation, footer, and theme toggle as every other page, provided by the shared `Layout` component
