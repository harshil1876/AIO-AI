// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
// Hybrid rendering: static prerendering by default for fast SEO pages,
// with per-route SSR (`export const prerender = false`) for all /api/* endpoints and dynamic routes.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://aio-ai.vercel.app',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
