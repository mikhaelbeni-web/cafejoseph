// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cafejoseph.paris',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
