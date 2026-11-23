import { db } from '../../db';
import { tools as toolsTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { TOOLS_DATA, type ToolData } from '../../services/dataService';

let cachedMergedTools: ToolData[] | null = null;
let cacheExpiresAt = 0;

/**
 * Live Hybrid Catalog Loader (Phase 1):
 * Merges live verified tools approved in Supabase PostgreSQL with the verified
 * curated catalog, cached for 60 seconds so /admin approvals go live immediately
 * without requiring a full static rebuild.
 */
export async function getLiveCatalogTools(): Promise<{ tools: ToolData[]; liveDbCount: number }> {
  const now = Date.now();
  if (cachedMergedTools && now < cacheExpiresAt) {
    return { tools: cachedMergedTools, liveDbCount: Math.max(0, cachedMergedTools.length - TOOLS_DATA.length) };
  }

  const bySlug = new Map<string, ToolData>();
  TOOLS_DATA.forEach((t) => bySlug.set(t.slug, t));
  let liveDbCount = 0;

  if (process.env.DATABASE_URL) {
    try {
      const dbRows = await db
        .select()
        .from(toolsTable)
        .where(eq(toolsTable.verificationStatus, 'verified'))
        .limit(500);

      for (const row of dbRows) {
        if (!row.slug || !row.name) continue;
        liveDbCount++;
        if (!bySlug.has(row.slug)) {
          bySlug.set(row.slug, {
            slug: row.slug,
            name: row.name,
            tagline: row.tagline || 'Verified AI tool submitted by the community.',
            description: row.description || row.tagline || '',
            websiteUrl: row.websiteUrl,
            logoUrl: row.logoUrl || undefined,
            githubUrl: row.githubUrl || undefined,
            pricingType:
              row.pricingState === 'free'
                ? 'Free'
                : row.pricingState === 'open_source'
                ? 'Open Source'
                : row.pricingState === 'paid'
                ? 'Paid'
                : 'Freemium',
            startingPrice: row.startingPrice || 'Free / Varies',
            freeTier: Boolean(row.hasFreePlan),
            hasFreeTrial: Boolean(row.hasFreeTrial),
            categorySlugs: ['general-chatbots'],
            features: Array.isArray(row.features) ? row.features : [],
            useCases: Array.isArray(row.useCases) ? row.useCases : [],
            pros: Array.isArray(row.pros) ? row.pros : [],
            cons: Array.isArray(row.cons) ? row.cons : [],
            deploymentTypes: Array.isArray(row.deploymentTypes) ? row.deploymentTypes : ['Cloud'],
            targetAudience: Array.isArray(row.targetAudience) ? row.targetAudience : ['Builders'],
            isVerified: true,
            isIndianAI: Boolean(row.isIndiaFirst),
            platformScore: row.platformScore || 85,
            valueScore: row.valueScore || 85,
            lastVerifiedAt: row.lastVerifiedAt ? new Date(row.lastVerifiedAt).toISOString().split('T')[0] : '2026-11-23',
          });
        }
      }
    } catch {
      // Fall back cleanly to static verified catalog when offline/build-time
    }
  }

  cachedMergedTools = Array.from(bySlug.values());
  cacheExpiresAt = now + 60_000;
  return { tools: cachedMergedTools, liveDbCount };
}
