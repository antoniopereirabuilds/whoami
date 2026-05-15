// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://antonioppereira.github.io',
  // Personal site repo (antonioppereira.github.io) serves from the root.
  // If you instead deploy from a project repo, set base: '/<repo-name>'.
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    icon(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
