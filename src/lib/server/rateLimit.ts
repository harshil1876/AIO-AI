/**
 * Production Server-Side Rate Limiter for AIO AI API Routes (PRD Sec 35 & 11).
 * Uses sliding-window memory store by default and supports Upstash Redis REST
 * when UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are configured.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const memoryBuckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  headers: Record<string, string>;
}

export function getClientIdentifier(request: Request, fallback = 'anon'): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return fallback;
}

export async function checkRateLimit(
  key: string,
  limit = 60,
  windowMs = 60_000
): Promise<RateLimitResult> {
  const now = Date.now();
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Optional distributed Redis rate limiter
  if (upstashUrl && upstashToken) {
    try {
      const redisKey = `aio:rl:${key}`;
      const res = await fetch(`${upstashUrl}/incr/${encodeURIComponent(redisKey)}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${upstashToken}` },
      });
      if (res.ok) {
        const data = (await res.json()) as { result?: number };
        const count = Number(data.result || 1);
        if (count === 1) {
          await fetch(`${upstashUrl}/pexpire/${encodeURIComponent(redisKey)}/${windowMs}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${upstashToken}` },
          });
        }
        const remaining = Math.max(0, limit - count);
        const resetAt = now + windowMs;
        return {
          allowed: count <= limit,
          limit,
          remaining,
          resetAt,
          headers: {
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': String(Math.floor(resetAt / 1000)),
          },
        };
      }
    } catch {
      // Fall through cleanly to local sliding window
    }
  }

  // Prevent unbounded memory growth
  if (memoryBuckets.size > MAX_KEYS) {
    for (const [k, b] of memoryBuckets.entries()) {
      if (b.resetAt <= now) memoryBuckets.delete(k);
    }
  }

  const existing = memoryBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    memoryBuckets.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - 1),
      resetAt,
      headers: {
        'X-RateLimit-Limit': String(limit),
        'X-RateLimit-Remaining': String(Math.max(0, limit - 1)),
        'X-RateLimit-Reset': String(Math.floor(resetAt / 1000)),
      },
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);
  return {
    allowed: existing.count <= limit,
    limit,
    remaining,
    resetAt: existing.resetAt,
    headers: {
      'X-RateLimit-Limit': String(limit),
      'X-RateLimit-Remaining': String(remaining),
      'X-RateLimit-Reset': String(Math.floor(existing.resetAt / 1000)),
    },
  };
}
