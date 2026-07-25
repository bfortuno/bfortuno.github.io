## Purpose

The shared page shell (layout, navigation, footer) used by every page of the site. Established in the `project-scaffold` change; extended as new pages are added.

## Requirements

### Requirement: Shared page layout
Every route in the site SHALL render through a single shared `Layout` component that provides consistent `<head>` metadata (charset, viewport, title slot), a skip-to-content link, the site navigation, the page's main content, and the site footer.

#### Scenario: New page uses the shared layout
- **WHEN** a new Astro page is added under `src/pages/`
- **THEN** it wraps its content in the shared `Layout` component instead of defining its own `<head>`/nav/footer

### Requirement: Site navigation
The site SHALL present a top navigation with links to Home, Publications, Projects, CV, News, and Contact, visible on every page, and usable via keyboard alone (tab order, visible focus states, `Enter`/`Space` activation).

#### Scenario: Navigating with keyboard only
- **WHEN** a user tabs through the page using only the keyboard
- **THEN** every navigation link receives a visible focus indicator and can be activated without a mouse

#### Scenario: Nav link before its page exists
- **WHEN** a nav link points to a page not yet built with real content (e.g. Publications, before change 3 is implemented)
- **THEN** the link resolves to a real route rendering a "Coming soon" placeholder rather than a broken link or 404

### Requirement: Site footer
Every page SHALL render a footer containing a copyright line and a placeholder area for contact/social links to be populated in a later change.

#### Scenario: Footer present on every route
- **WHEN** any page in the site is rendered
- **THEN** the footer with the copyright line is present at the bottom of the page

### Requirement: Responsive shell
The page shell (layout, navigation, footer) SHALL remain usable and readable at viewport widths from 320px up through desktop widths, without horizontal scrolling or overlapping elements.

#### Scenario: Narrow viewport
- **WHEN** the site is viewed at a 320px-wide viewport
- **THEN** navigation, content, and footer remain readable and usable with no horizontal overflow

### Requirement: Semantic, accessible markup
Page structure SHALL use semantic HTML landmarks (`header`, `nav`, `main`, `footer`) so assistive technology can navigate the page by region.

#### Scenario: Screen reader landmark navigation
- **WHEN** a screen reader user navigates by landmark
- **THEN** they can jump directly to the navigation, main content, and footer regions
