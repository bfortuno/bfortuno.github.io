## Purpose

Dark/light mode switching for the site: user control, system-preference default, and persistence. Established in the `project-scaffold` change.

## Requirements

### Requirement: Dark/light mode toggle
The site SHALL provide a control, reachable on every page, that switches the site between a light theme and a dark theme.

#### Scenario: Toggling theme
- **WHEN** a user activates the theme toggle
- **THEN** the site's background, text, and accent colors switch between the light and dark palettes immediately, without a page reload

#### Scenario: Toggle is keyboard operable
- **WHEN** a user reaches the theme toggle via keyboard and presses `Enter` or `Space`
- **THEN** the theme switches, the same as a mouse click

### Requirement: System preference default
On a user's first visit (no stored preference), the site SHALL default to the theme matching the operating system's `prefers-color-scheme` setting.

#### Scenario: First visit with OS dark mode enabled
- **WHEN** a user with no stored theme preference visits the site and their OS is set to dark mode
- **THEN** the site renders in the dark theme on first paint

### Requirement: Persisted user preference
Once a user explicitly picks a theme via the toggle, that choice SHALL persist across page navigations and future visits, overriding the OS default.

#### Scenario: Returning visitor with explicit preference
- **WHEN** a user previously chose dark mode via the toggle and returns to the site later (OS preference unchanged or changed)
- **THEN** the site renders in dark mode, matching their stored choice rather than the current OS setting

### Requirement: No flash of incorrect theme
The correct theme SHALL be applied before the page's first paint, so users do not see a flash of the wrong theme on load.

#### Scenario: Reloading in dark mode
- **WHEN** a user with a stored dark-mode preference reloads any page
- **THEN** the page renders directly in dark mode with no visible flash of the light theme beforehand

### Requirement: Single accent color
Both themes SHALL share one accent color value (adjusted only for contrast against each theme's background), used consistently for interactive/highlighted elements site-wide.

#### Scenario: Accent color consistency
- **WHEN** the theme is switched between light and dark
- **THEN** interactive elements (links, focus states, highlights) continue to use the same accent hue in both themes
