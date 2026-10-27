import type { APIRoute } from 'astro';
import { TOOLS_DATA } from '../data/seedData';
import { OFFICIAL_MODELS } from '../data/modelsData';
import { CREATORS_DATA } from '../data/creatorsData';
import { WORKFLOWS_DATA } from '../data/workflowsData';
import { OPEN_SOURCE_REPOS } from '../data/openSourceData';
import { NEWS_STORIES } from '../data/newsData';

const BASE_URL = 'https://aio-ai.pages.dev';

export const GET: APIRoute = () => {
  const staticRoutes = [
    '',
    '/tools',
    '/compare',
    '/finder',
    '/categories',
    '/workflows',
    '/creators',
    '/open-source',
    '/open-source/trending',
    '/trending',
    '/token-calculator',
    '/token-calculator/models',
    '/token-calculator/compare',
    '/utilities',
    '/news',
    '/community',
    '/submit',
    '/stack-builder',
  ];

  const toolRoutes = TOOLS_DATA.map(t => `/tools/${t.slug}`);
  const modelRoutes = OFFICIAL_MODELS.map(m => `/token-calculator/models/${m.id}`);
  const creatorRoutes = CREATORS_DATA.map(c => `/creators/${c.slug}`);
  const workflowRoutes = WORKFLOWS_DATA.map(w => `/workflows/${w.id}`);
  const repoRoutes = OPEN_SOURCE_REPOS.map(r => `/open-source/${r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
  const newsRoutes = NEWS_STORIES.map(s => `/news/${s.id}`);

  const allUrls = [
    ...staticRoutes,
    ...toolRoutes,
    ...modelRoutes,
    ...creatorRoutes,
    ...workflowRoutes,
    ...repoRoutes,
    ...newsRoutes,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/tools/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
