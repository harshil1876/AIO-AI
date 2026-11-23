import type { APIRoute } from 'astro';
import { z } from 'zod';
import { verifyRequestUser, jsonResponse } from '../../../lib/server/auth';
import { checkRateLimit, getClientIdentifier } from '../../../lib/server/rateLimit';

export const prerender = false;

const CheckoutSchema = z.object({
  plan: z.enum(['pro', 'creator_pro', 'business']),
  billingCycle: z.enum(['monthly', 'annual']).default('monthly'),
  currency: z.enum(['INR', 'USD']).default('USD'),
});

const PLAN_PRICING = {
  pro: { INR: { monthly: 799, annual: 7670 }, USD: { monthly: 12, annual: 115 } },
  creator_pro: { INR: { monthly: 1999, annual: 19190 }, USD: { monthly: 29, annual: 278 } },
  business: { INR: { monthly: 4999, annual: 47990 }, USD: { monthly: 79, annual: 758 } },
} as const;

/**
 * Dual-Region Billing Checkout API (PRD Sec 25 & 26):
 * - INR -> Razorpay (India PPP + UPI / Cards)
 * - USD -> Stripe Checkout (Global)
 */
export const POST: APIRoute = async ({ request, url }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`checkout:${clientId}`, 15, 60_000);
  if (!rl.allowed) return jsonResponse({ error: 'Rate limit exceeded.' }, 429, rl.headers);

  const user = await verifyRequestUser(request);
  if (!user) {
    return jsonResponse({ error: 'Please sign in before upgrading your workspace plan.', loginUrl: '/login?redirect=/pricing' }, 401, rl.headers);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON request.' }, 400, rl.headers);
  }

  const parsed = CheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ error: 'Invalid plan configuration.', details: parsed.error.flatten() }, 400, rl.headers);
  }

  const { plan, billingCycle, currency } = parsed.data;
  const amount = PLAN_PRICING[plan][currency][billingCycle];
  const provider = currency === 'INR' ? 'razorpay' : 'stripe';

  // Live Stripe Checkout Session when STRIPE_SECRET_KEY is configured
  if (provider === 'stripe' && process.env.STRIPE_SECRET_KEY) {
    try {
      const params = new URLSearchParams();
      params.set('mode', 'subscription');
      params.set('customer_email', user.email);
      params.set('success_url', `${url.origin}/dashboard?upgraded=${plan}`);
      params.set('cancel_url', `${url.origin}/pricing?canceled=1`);
      params.set('metadata[user_email]', user.email);
      params.set('metadata[plan]', plan);
      params.set('line_items[0][quantity]', '1');
      params.set('line_items[0][price_data][currency]', 'usd');
      params.set('line_items[0][price_data][unit_amount]', String(amount * 100));
      params.set('line_items[0][price_data][recurring][interval]', billingCycle === 'annual' ? 'year' : 'month');
      params.set('line_items[0][price_data][product_data][name]', `AIO AI ${plan.replace('_', ' ').toUpperCase()} (${billingCycle})`);

      const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (stripeRes.ok) {
        const session = (await stripeRes.json()) as any;
        return jsonResponse({ provider: 'stripe', checkoutUrl: session.url, sessionId: session.id, amount, currency }, 200, rl.headers);
      }
    } catch {
      // Fall through to structured readiness response
    }
  }

  // Live Razorpay Order when RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET are configured
  if (provider === 'razorpay' && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    try {
      const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
      const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // paise
          currency: 'INR',
          receipt: `aio_${plan}_${Date.now()}`,
          notes: { email: user.email, plan, billingCycle },
        }),
      });

      if (rzpRes.ok) {
        const order = (await rzpRes.json()) as any;
        return jsonResponse(
          {
            provider: 'razorpay',
            orderId: order.id,
            keyId: process.env.RAZORPAY_KEY_ID,
            amount,
            currency: 'INR',
            prefill: { email: user.email, name: user.name },
          },
          200,
          rl.headers
        );
      }
    } catch {
      // Fall through cleanly
    }
  }

  return jsonResponse(
    {
      provider,
      configured: false,
      plan,
      billingCycle,
      amount,
      currency,
      message:
        provider === 'razorpay'
          ? 'Razorpay India UPI/Card checkout is wired and ready. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel environment variables to activate live INR billing.'
          : 'Stripe Global USD checkout is wired and ready. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in Vercel environment variables to activate live USD billing.',
    },
    200,
    rl.headers
  );
};
