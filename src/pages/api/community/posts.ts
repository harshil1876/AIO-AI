import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../../db';
import { communityPosts } from '../../../db/schema';
import { desc } from 'drizzle-orm';
import { verifyRequestUser, jsonResponse } from '../../../lib/server/auth';
import { checkRateLimit, getClientIdentifier } from '../../../lib/server/rateLimit';
import { validateContentSafety } from '../../../utils/moderationFilter';
import { sanitizePlainText, sanitizeSlug } from '../../../utils/security';

export const prerender = false;

const CreatePostSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters').max(220),
  content: z.string().trim().min(10, 'Post body must be at least 10 characters').max(5000),
  category: z.string().trim().max(80).optional().default('ai-engineering'),
  type: z.enum(['discussion', 'question', 'project', 'repo', 'workflow', 'showcase']).optional().default('discussion'),
  authorName: z.string().trim().max(100).optional(),
});

export const GET: APIRoute = async ({ request }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`comm-get:${clientId}`, 90, 60_000);
  if (!rl.allowed) return jsonResponse({ error: 'Rate limit exceeded' }, 429, rl.headers);

  if (!process.env.DATABASE_URL) {
    return jsonResponse({ posts: [], source: 'offline-fallback' }, 200, rl.headers);
  }

  try {
    const rows = await db
      .select()
      .from(communityPosts)
      .orderBy(desc(communityPosts.createdAt))
      .limit(50);

    const posts = rows.map((r) => ({
      id: r.id,
      title: r.title,
      content: r.content,
      type: r.type || 'discussion',
      space: r.category || 'ai-engineering',
      author: r.authorName,
      upvotes: r.upvotes || 0,
      comment_count: r.commentCount || 0,
      publishedAt: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recently',
    }));

    return jsonResponse({ posts, source: 'postgresql' }, 200, rl.headers);
  } catch (err) {
    return jsonResponse({ posts: [], source: 'fallback', notice: 'Database temporarily unavailable' }, 200, rl.headers);
  }
};

export const POST: APIRoute = async ({ request }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`comm-post:${clientId}`, 10, 60_000);
  if (!rl.allowed) {
    return jsonResponse({ error: 'Posting rate limit exceeded. Please wait before submitting another post.' }, 429, rl.headers);
  }

  const user = await verifyRequestUser(request);
  if (!user) {
    return jsonResponse({ error: 'Authentication required to publish community posts.' }, 401, rl.headers);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload.' }, 400, rl.headers);
  }

  const parsed = CreatePostSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ error: 'Validation failed', details: parsed.error.flatten() }, 400, rl.headers);
  }

  const cleanTitle = sanitizePlainText(parsed.data.title, 220);
  const cleanContent = sanitizePlainText(parsed.data.content, 5000);
  const cleanCategory = sanitizeSlug(parsed.data.category) || 'ai-engineering';

  // Server-side moderation check (PRD Sec 35 & 36 — never trust client-only moderation)
  const safety = validateContentSafety(`${cleanTitle}\n${cleanContent}`);
  if (!safety.isSafe) {
    return jsonResponse({ error: safety.reason || 'Content rejected by server moderation policy.' }, 422, rl.headers);
  }

  if (!process.env.DATABASE_URL) {
    return jsonResponse(
      {
        status: 'accepted_local',
        post: {
          title: cleanTitle,
          content: cleanContent,
          category: cleanCategory,
          type: parsed.data.type,
          author_name: user.name,
        },
      },
      201,
      rl.headers
    );
  }

  try {
    const inserted = await db
      .insert(communityPosts)
      .values({
        userId: user.appUserId,
        authorName: user.name,
        title: cleanTitle,
        content: cleanContent,
        type: parsed.data.type,
        category: cleanCategory,
        upvotes: 1,
      })
      .returning();

    return jsonResponse({ status: 'published', post: inserted[0] }, 201, rl.headers);
  } catch (err: any) {
    return jsonResponse({ error: 'Failed to persist post to database.' }, 500, rl.headers);
  }
};
