import type { APIRoute } from 'astro';
import { fetchLiveGitHubTrendingRepos } from '../../../services/githubLiveService';
import { TOOLS_DATA } from '../../../services/dataService';
import { db } from '../../../db';
import { verificationRecords } from '../../../db/schema';
import { jsonResponse } from '../../../lib/server/auth';

export const prerender = false;

/**
 * Scheduled Data Ingestion & Health Verification Cron Job (PRD Sec 30 & 31).
 * Invoked every 6 hours via vercel.json crons; protected by CRON_SECRET.
 */
export const GET: APIRoute = async ({ request }) => {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization') || '';
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return jsonResponse({ error: 'Unauthorized cron invocation.' }, 401);
  }

  const startedAt = Date.now();
  const report: Record<string, any> = {
    startedAt: new Date(startedAt).toISOString(),
    githubSynced: false,
    toolsHealthSampled: 0,
    brokenLinksDetected: [] as string[],
  };

  // 1. Refresh GitHub Trending Telemetry
  try {
    const gh = await fetchLiveGitHubTrendingRepos('daily', 'all');
    report.githubSynced = gh.isLive;
    report.githubCount = gh.items.length;
  } catch (e: any) {
    report.githubError = e?.message || 'GitHub sync failed';
  }

  // 2. Sample 5 catalog domains for uptime/redirect verification (respecting timeouts)
  const sample = TOOLS_DATA.slice(0, 5);
  for (const tool of sample) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(tool.websiteUrl, { method: 'HEAD', signal: controller.signal });
      clearTimeout(t);
      report.toolsHealthSampled++;
      const status = res.status >= 400 && res.status !== 403 && res.status !== 405 ? 'needs_review' : 'verified';
      if (status === 'needs_review') report.brokenLinksDetected.push(tool.slug);

      if (process.env.DATABASE_URL) {
        try {
          await db.insert(verificationRecords).values({
            entityType: 'tool',
            entitySlug: tool.slug,
            status,
            sourceUrl: tool.websiteUrl,
            checkedFields: ['domain_health', 'http_status'],
          });
        } catch {}
      }
    } catch {
      report.toolsHealthSampled++;
    }
  }

  report.durationMs = Date.now() - startedAt;
  return jsonResponse({ ok: true, report }, 200);
};
