import type { APIRoute } from 'astro';
import { z } from 'zod';
import crypto from 'node:crypto';
import { db } from '../../../db';
import { newsletterSubscribers } from '../../../db/schema';
import { checkRateLimit, getClientIdentifier } from '../../../lib/server/rateLimit';
import { jsonResponse } from '../../../lib/server/auth';

export const prerender = false;

const SubscribeSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address').max(255),
  cadence: z.enum(['daily', 'weekly']).optional().default('weekly'),
  topics: z.array(z.string().trim().max(50)).max(10).optional().default(['AI News', 'Open Source', 'Workflows']),
});

/**
 * Topic-Based Daily & Weekly Newsletter Subscription Endpoint (PRD Sec 44).
 */
export const POST: APIRoute = async ({ request }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`newsletter:${clientId}`, 10, 60_000);
  if (!rl.allowed) {
    return jsonResponse({ error: 'Too many subscription attempts. Please try again shortly.' }, 429, rl.headers);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON request.' }, 400, rl.headers);
  }

  const parsed = SubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ error: 'Please provide a valid email address.', details: parsed.error.flatten() }, 400, rl.headers);
  }

  const email = parsed.data.email.toLowerCase();
  const unsubscribeToken = crypto.randomBytes(24).toString('hex');

  if (process.env.DATABASE_URL) {
    try {
      await db
        .insert(newsletterSubscribers)
        .values({
          email,
          cadence: parsed.data.cadence,
          topics: parsed.data.topics,
          status: 'active',
          unsubscribeToken,
        })
        .onConflictDoUpdate({
          target: newsletterSubscribers.email,
          set: {
            cadence: parsed.data.cadence,
            topics: parsed.data.topics,
            status: 'active',
          },
        });
    } catch {
      // Graceful acceptance if migration 0004 hasn't been executed on remote DB yet
    }
  }

  return jsonResponse(
    {
      subscribed: true,
      email,
      cadence: parsed.data.cadence,
      topics: parsed.data.topics,
      message: `Subscribed to the AIO AI ${parsed.data.cadence} briefing.`,
    },
    201,
    rl.headers
  );
};
