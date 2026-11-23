import type { APIRoute } from 'astro';
import { getLiveCatalogTools } from '../../../lib/server/catalog';
import { calculateAuthenticScore } from '../../../services/dataService';
import { checkRateLimit, getClientIdentifier } from '../../../lib/server/rateLimit';
import { jsonResponse } from '../../../lib/server/auth';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`catalog:${clientId}`, 120, 60_000);
  if (!rl.allowed) {
    return jsonResponse({ error: 'Rate limit exceeded.' }, 429, rl.headers);
  }

  const q = (url.searchParams.get('q') || '').trim().toLowerCase();
  const category = (url.searchParams.get('category') || 'all').trim().toLowerCase();
  const pricing = (url.searchParams.get('pricing') || 'all').trim().toLowerCase();
  const indiaOnly = url.searchParams.get('india') === 'true';
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '24', 10) || 24));

  const { tools, liveDbCount } = await getLiveCatalogTools();

  const filtered = tools.filter((t) => {
    if (q) {
      const hay = `${t.name} ${t.tagline} ${t.description} ${(t.categorySlugs || []).join(' ')} ${(t.useCases || []).join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (category !== 'all' && !(t.categorySlugs || []).includes(category)) return false;
    if (pricing !== 'all') {
      const pt = (t.pricingType || '').toLowerCase();
      if (pricing === 'free' && !(pt === 'free' || pt === 'open source' || t.freeTier)) return false;
      if (pricing !== 'free' && !pt.includes(pricing)) return false;
    }
    if (indiaOnly && !t.isIndianAI) return false;
    return true;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const offset = (safePage - 1) * limit;
  const items = filtered.slice(offset, offset + limit).map((t) => ({
    ...t,
    authenticScore: calculateAuthenticScore(t),
  }));

  return jsonResponse(
    {
      items,
      pagination: { page: safePage, limit, total, totalPages },
      meta: { totalCatalogSize: tools.length, liveDbApprovedCount: liveDbCount },
    },
    200,
    {
      ...rl.headers,
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    }
  );
};
