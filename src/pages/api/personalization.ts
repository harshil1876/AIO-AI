import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../db';
import { collections, follows, priceAlerts } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
import { verifyRequestUser, jsonResponse } from '../../lib/server/auth';
import { checkRateLimit, getClientIdentifier } from '../../lib/server/rateLimit';
import { TOOLS_DATA, WORKFLOWS_DATA, CREATORS_DATA, calculateAuthenticScore } from '../../services/dataService';
import { sanitizePlainText, sanitizeSlug } from '../../utils/security';

export const prerender = false;

const PersonalizeActionSchema = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('toggle_follow'),
    targetType: z.enum(['topic', 'creator', 'tool', 'repo']),
    targetSlug: z.string().trim().min(1).max(120),
  }),
  z.object({
    action: z.literal('create_collection'),
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().max(400).optional().default(''),
    isPublic: z.boolean().optional().default(true),
  }),
  z.object({
    action: z.literal('toggle_price_alert'),
    toolSlug: z.string().trim().min(1).max(120),
    alertType: z.enum(['price_drop', 'free_tier_change', 'oss_alternative']).optional().default('price_drop'),
  }),
]);

function buildExplainableFeed(followedTopics: string[], savedSlugs: string[]) {
  const topicsLower = followedTopics.map((t) => t.toLowerCase());
  const recommendations = TOOLS_DATA.map((tool) => {
    const reasons: string[] = [];
    let score = calculateAuthenticScore(tool).total;
    const hay = `${tool.name} ${tool.tagline} ${(tool.categorySlugs || []).join(' ')}`.toLowerCase();

    for (const topic of topicsLower) {
      if (hay.includes(topic) || (topic === 'india ai' && tool.isIndianAI) || (topic === 'open source' && tool.pricingType === 'Open Source')) {
        score += 25;
        reasons.push(`Because you follow "${topic}"`);
      }
    }

    if (savedSlugs.includes(tool.slug)) {
      score -= 100; // Already saved; surface fresh discoveries
    }

    return {
      slug: tool.slug,
      name: tool.name,
      tagline: tool.tagline,
      pricingType: tool.pricingType,
      score: calculateAuthenticScore(tool).total,
      rankScore: score,
      reason: reasons[0] || 'High 5-Factor Authenticity & verified free tier',
    };
  })
    .sort((a, b) => b.rankScore - a.rankScore)
    .slice(0, 6);

  const recommendedCreators = CREATORS_DATA.filter((c) => {
    if (topicsLower.length === 0) return true;
    const hay = `${c.category} ${(c.topics || []).join(' ')} ${c.region}`.toLowerCase();
    return topicsLower.some((t) => hay.includes(t));
  }).slice(0, 4);

  const recommendedWorkflows = WORKFLOWS_DATA.slice(0, 3);

  return { recommendations, recommendedCreators, recommendedWorkflows };
}

export const GET: APIRoute = async ({ request, url }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`pers-get:${clientId}`, 90, 60_000);
  if (!rl.allowed) return jsonResponse({ error: 'Rate limit exceeded.' }, 429, rl.headers);

  const topicsParam = (url.searchParams.get('topics') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 10);
  const savedParam = (url.searchParams.get('saved') || '')
    .split(',')
    .map((s) => sanitizeSlug(s))
    .filter(Boolean)
    .slice(0, 50);

  const user = await verifyRequestUser(request);
  let dbFollows: string[] = topicsParam;
  let dbCollections: any[] = [];
  let dbAlerts: string[] = [];

  if (user?.appUserId && process.env.DATABASE_URL) {
    try {
      const [fRows, cRows, aRows] = await Promise.all([
        db.select().from(follows).where(eq(follows.userId, user.appUserId)).limit(50),
        db.select().from(collections).where(eq(collections.userId, user.appUserId)).limit(25),
        db.select().from(priceAlerts).where(eq(priceAlerts.userId, user.appUserId)).limit(50),
      ]);
      if (fRows.length > 0) dbFollows = fRows.map((r) => r.targetSlug);
      dbCollections = cRows;
      dbAlerts = aRows.map((a) => a.toolSlug);
    } catch {
      // Fall back to query-param topics
    }
  }

  const feed = buildExplainableFeed(dbFollows, savedParam);
  return jsonResponse(
    {
      authenticated: Boolean(user),
      plan: user?.plan || 'free',
      followedTopics: dbFollows,
      collections: dbCollections,
      priceAlerts: dbAlerts,
      feed,
    },
    200,
    rl.headers
  );
};

export const POST: APIRoute = async ({ request }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`pers-post:${clientId}`, 30, 60_000);
  if (!rl.allowed) return jsonResponse({ error: 'Rate limit exceeded.' }, 429, rl.headers);

  const user = await verifyRequestUser(request);
  if (!user) {
    return jsonResponse({ error: 'Sign in required to sync personalization preferences.' }, 401, rl.headers);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400, rl.headers);
  }

  const parsed = PersonalizeActionSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ error: 'Invalid payload.', details: parsed.error.flatten() }, 400, rl.headers);
  }

  const data = parsed.data;
  if (!user.appUserId || !process.env.DATABASE_URL) {
    return jsonResponse({ synced: false, localOnly: true, action: data.action }, 200, rl.headers);
  }

  try {
    if (data.action === 'toggle_follow') {
      const slug = sanitizeSlug(data.targetSlug);
      const existing = await db
        .select()
        .from(follows)
        .where(
          and(
            eq(follows.userId, user.appUserId),
            eq(follows.targetType, data.targetType),
            eq(follows.targetSlug, slug)
          )
        )
        .limit(1);

      if (existing[0]) {
        await db.delete(follows).where(eq(follows.id, existing[0].id));
        return jsonResponse({ synced: true, following: false, targetSlug: slug }, 200, rl.headers);
      }

      await db.insert(follows).values({
        userId: user.appUserId,
        targetType: data.targetType,
        targetSlug: slug,
      });
      return jsonResponse({ synced: true, following: true, targetSlug: slug }, 201, rl.headers);
    }

    if (data.action === 'create_collection') {
      const title = sanitizePlainText(data.title, 120);
      const slug = `${sanitizeSlug(title)}-${Date.now().toString(36)}`;
      const created = await db
        .insert(collections)
        .values({
          userId: user.appUserId,
          slug,
          title,
          description: sanitizePlainText(data.description, 400),
          isPublic: data.isPublic,
        })
        .returning();
      return jsonResponse({ synced: true, collection: created[0] }, 201, rl.headers);
    }

    if (data.action === 'toggle_price_alert') {
      const toolSlug = sanitizeSlug(data.toolSlug);
      const existing = await db
        .select()
        .from(priceAlerts)
        .where(and(eq(priceAlerts.userId, user.appUserId), eq(priceAlerts.toolSlug, toolSlug)))
        .limit(1);

      if (existing[0]) {
        await db.delete(priceAlerts).where(eq(priceAlerts.id, existing[0].id));
        return jsonResponse({ synced: true, watching: false, toolSlug }, 200, rl.headers);
      }

      await db.insert(priceAlerts).values({
        userId: user.appUserId,
        toolSlug,
        alertType: data.alertType,
      });
      return jsonResponse({ synced: true, watching: true, toolSlug }, 201, rl.headers);
    }
  } catch {
    return jsonResponse({ synced: false, localOnly: true }, 200, rl.headers);
  }

  return jsonResponse({ error: 'Unsupported action.' }, 400, rl.headers);
};
