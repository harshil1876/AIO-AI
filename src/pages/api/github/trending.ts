import type { APIRoute } from 'astro';
import { fetchLiveGitHubTrendingRepos, fetchLiveGitHubTrendingDevelopers } from '../../../services/githubLiveService';
import { checkRateLimit, getClientIdentifier } from '../../../lib/server/rateLimit';
import { jsonResponse } from '../../../lib/server/auth';

export const prerender = false;

/**
 * Server-side GitHub Trending Proxy (PRD Sec 35):
 * Uses private process.env.GITHUB_TOKEN on the server so API credentials
 * are never bundled into browser JavaScript.
 */
export const GET: APIRoute = async ({ request, url }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`gh-trending:${clientId}`, 60, 60_000);
  if (!rl.allowed) {
    return jsonResponse({ error: 'Rate limit exceeded.' }, 429, rl.headers);
  }

  const mode = url.searchParams.get('mode') === 'developers' ? 'developers' : 'repos';
  const range = (url.searchParams.get('range') || 'weekly').toLowerCase();
  const language = (url.searchParams.get('language') || 'all').toLowerCase().slice(0, 40);

  if (mode === 'developers') {
    const devResult = await fetchLiveGitHubTrendingDevelopers();
    return jsonResponse(devResult, 200, {
      ...rl.headers,
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
    });
  }

  const repoResult = await fetchLiveGitHubTrendingRepos(range, language);
  return jsonResponse(repoResult, 200, {
    ...rl.headers,
    'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
  });
};
