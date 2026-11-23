import type { APIRoute } from 'astro';
import { getToolBySlug, calculateAuthenticScore } from '../../../services/dataService';
import { escapeHtml } from '../../../utils/security';

export const prerender = false;

/**
 * Embeddable "Verified on AIO AI" Dynamic SVG Trust Badge (Global SEO Backlink Flywheel).
 * Tool founders embed <img src="https://aio-ai.vercel.app/api/badge/cursor.svg" /> on their site/README.
 */
export const GET: APIRoute = async ({ params }) => {
  const rawSlug = (params.slug || '').replace(/\.svg$/i, '');
  const tool = getToolBySlug(rawSlug);

  const label = tool ? escapeHtml(tool.name.slice(0, 22)) : 'AIO AI Verified';
  const score = tool ? `${calculateAuthenticScore(tool).total}/100` : 'Verified';
  const accent = tool && calculateAuthenticScore(tool).total >= 85 ? '#10B981' : '#2563EB';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="236" height="44" viewBox="0 0 236 44" role="img" aria-label="Verified on AIO AI: ${label} ${score}">
  <rect width="236" height="44" rx="10" fill="#09090B"/>
  <rect x="1" y="1" width="234" height="42" rx="9" fill="none" stroke="#27272A" stroke-width="1.5"/>
  <circle cx="20" cy="22" r="6" fill="${accent}"/>
  <path d="M17.5 22l1.8 1.8 3.4-3.6" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="34" y="18" fill="#A1A1AA" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="9" font-weight="700" letter-spacing="0.6">VERIFIED ON AIO AI</text>
  <text x="34" y="33" fill="#FFFFFF" font-family="system-ui,-apple-system,sans-serif" font-size="12" font-weight="800">${label}</text>
  <rect x="174" y="10" width="52" height="24" rx="6" fill="${accent}"/>
  <text x="200" y="26" text-anchor="middle" fill="#FFFFFF" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="11" font-weight="800">${score}</text>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
