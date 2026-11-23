import type { APIRoute } from 'astro';
import { batchRefreshCreatorStats } from '../../../services/youtubeLiveService';
import { checkRateLimit, getClientIdentifier } from '../../../lib/server/rateLimit';
import { jsonResponse } from '../../../lib/server/auth';

export const prerender = false;

/**
 * Server-side YouTube Data API v3 Proxy (PRD Sec 35 & 47):
 * Keeps YOUTUBE_API_KEY strictly on the server and caches responses at the edge.
 */
export const GET: APIRoute = async ({ request, url }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`yt-stats:${clientId}`, 40, 60_000);
  if (!rl.allowed) {
    return jsonResponse({ error: 'Rate limit exceeded.' }, 429, rl.headers);
  }

  const rawHandles = (url.searchParams.get('handles') || '').trim();
  if (!rawHandles) {
    return jsonResponse({ stats: {}, configured: Boolean(process.env.YOUTUBE_API_KEY) }, 200, rl.headers);
  }

  const handles = rawHandles
    .split(',')
    .map((h) => h.trim().replace(/^@/, '').replace(/[^a-zA-Z0-9._-]/g, ''))
    .filter(Boolean)
    .slice(0, 25);

  const stats = await batchRefreshCreatorStats(handles);

  return jsonResponse(
    {
      stats,
      configured: Boolean(process.env.YOUTUBE_API_KEY),
      note: 'Derived metrics are calculated estimates from permitted public YouTube Data API endpoints.',
    },
    200,
    {
      ...rl.headers,
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    }
  );
};
