import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import { db } from '../../../db';
import { users, entitlements } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { jsonResponse } from '../../../lib/server/auth';

export const prerender = false;

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Cryptographically Verified Billing Webhook (Razorpay + Stripe):
 * Updates server-side `entitlements` and `users.plan` after HMAC verification.
 */
export const POST: APIRoute = async ({ request }) => {
  const rawBody = await request.text();
  const rzpSignature = request.headers.get('x-razorpay-signature');
  const stripeSignature = request.headers.get('stripe-signature');

  let provider: 'razorpay' | 'stripe' | null = null;
  let email = '';
  let plan: 'free' | 'pro' | 'creator_pro' | 'business' = 'pro';
  let subscriptionId = '';
  let currency = 'USD';

  if (rzpSignature) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
    if (!secret) return jsonResponse({ error: 'Razorpay webhook secret not configured.' }, 503);
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    if (!safeEqual(expected, rzpSignature)) {
      return jsonResponse({ error: 'Invalid Razorpay signature.' }, 401);
    }
    provider = 'razorpay';
    currency = 'INR';
    const payload = JSON.parse(rawBody);
    email = (payload?.payload?.payment?.entity?.notes?.email || payload?.payload?.payment?.entity?.email || '').toLowerCase();
    const p = payload?.payload?.payment?.entity?.notes?.plan;
    if (p === 'pro' || p === 'creator_pro' || p === 'business') plan = p;
    subscriptionId = payload?.payload?.payment?.entity?.id || '';
  } else if (stripeSignature) {
    const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
    if (!secret) return jsonResponse({ error: 'Stripe webhook secret not configured.' }, 503);
    const parts = Object.fromEntries(stripeSignature.split(',').map((kv) => kv.split('=')));
    const signedPayload = `${parts.t}.${rawBody}`;
    const expected = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');
    if (!parts.v1 || !safeEqual(expected, parts.v1)) {
      return jsonResponse({ error: 'Invalid Stripe signature.' }, 401);
    }
    provider = 'stripe';
    currency = 'USD';
    const event = JSON.parse(rawBody);
    const obj = event?.data?.object || {};
    email = (obj.customer_email || obj.metadata?.user_email || '').toLowerCase();
    const p = obj.metadata?.plan;
    if (p === 'pro' || p === 'creator_pro' || p === 'business') plan = p;
    subscriptionId = obj.subscription || obj.id || '';
  } else {
    return jsonResponse({ error: 'Missing webhook signature header.' }, 400);
  }

  if (email && process.env.DATABASE_URL) {
    try {
      const userRows = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (userRows[0]) {
        const uid = userRows[0].id;
        await db.update(users).set({ plan }).where(eq(users.id, uid));
        await db
          .insert(entitlements)
          .values({
            userId: uid,
            plan,
            status: 'active',
            provider,
            providerSubscriptionId: subscriptionId,
            currency,
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          })
          .onConflictDoUpdate({
            target: entitlements.userId,
            set: {
              plan,
              status: 'active',
              provider,
              providerSubscriptionId: subscriptionId,
              currency,
              updatedAt: new Date(),
            },
          });
      }
    } catch {
      return jsonResponse({ error: 'Failed to persist entitlement update.' }, 500);
    }
  }

  return jsonResponse({ received: true, provider, plan }, 200);
};
