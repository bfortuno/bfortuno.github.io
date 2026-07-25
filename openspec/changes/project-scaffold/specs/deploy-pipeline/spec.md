## ADDED Requirements

### Requirement: Automated build and deploy on push
Pushing to the `main` branch SHALL trigger a GitHub Actions workflow that builds the Astro site and deploys the build output to GitHub Pages, with no manual build/upload step required.

#### Scenario: Push to main triggers deploy
- **WHEN** a commit is pushed to `main`
- **THEN** a GitHub Actions run starts, builds the site, and publishes the result to GitHub Pages without manual intervention

### Requirement: Deployed site reachable at Pages URL
After a successful workflow run, the built site SHALL be reachable at the repository's GitHub Pages URL (the domain root, since this repo is a user/org page).

#### Scenario: Verifying a deploy
- **WHEN** a workflow run completes successfully
- **THEN** visiting the site's GitHub Pages URL shows the newly built content

### Requirement: Build failures block deployment
If the Astro build step fails, the workflow SHALL NOT deploy a broken or partial build to GitHub Pages; the previous successful deployment remains live.

#### Scenario: Broken build does not deploy
- **WHEN** a pushed commit causes the Astro build step to fail
- **THEN** the workflow run fails before the deploy step, and the site continues serving the last successful build
