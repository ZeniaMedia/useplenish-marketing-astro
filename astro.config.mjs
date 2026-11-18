import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://useplenish.com',
  integrations: [
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy-Report-Only':
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://us-assets.i.posthog.com; connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'none'",
      },
    },
  },
});
