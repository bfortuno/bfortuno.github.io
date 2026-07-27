// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
// Served at the domain root: bfortuno.github.io is a user/org GitHub Pages
// site, so no `base` path is needed.
export default defineConfig({
  site: 'https://bfortuno.github.io',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
  ],
});
