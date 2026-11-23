import { createClient } from '@supabase/supabase-js';
import { db } from '../../db';
import { users, entitlements } from '../../db/schema';
import { eq } from 'drizzle-orm';

export interface VerifiedServerUser {
  authId: string;
  appUserId: number | null;
  email: string;
  name: string;
  role: 'user' | 'moderator' | 'admin';
  plan: 'free' | 'pro' | 'creator_pro' | 'business';
}

const ADMIN_EMAILS = new Set(
  (process.env.ADMIN_EMAILS || process.env.PUBLIC_ADMIN_EMAILS || 'harshilpival@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
);

function getServerSupabase() {
  const url = (process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || '').trim();
  if (!url || !key || !url.startsWith('https://')) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/**
 * Cryptographically verifies the Bearer JWT sent by a client against Supabase Auth,
 * then resolves the user's database role and server-side plan entitlement (PRD Sec 18 & 35).
 */
export async function verifyRequestUser(request: Request): Promise<VerifiedServerUser | null> {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token) return null;

  const client = getServerSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client.auth.getUser(token);
    if (error || !data?.user || !data.user.email) return null;

    const authUser = data.user;
    const email = authUser.email.toLowerCase().trim();
    const meta = authUser.user_metadata || {};
    const name = meta.full_name || meta.name || email.split('@')[0] || 'Builder';

    let appUserId: number | null = null;
    let role: 'user' | 'moderator' | 'admin' = ADMIN_EMAILS.has(email) ? 'admin' : 'user';
    let plan: 'free' | 'pro' | 'creator_pro' | 'business' = 'free';

    // Query PostgreSQL for authoritative role and entitlement when DATABASE_URL is configured
    if (process.env.DATABASE_URL) {
      try {
        const rows = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (rows[0]) {
          appUserId = rows[0].id;
          if (rows[0].role === 'admin' || rows[0].role === 'moderator') {
            role = rows[0].role;
          }
          if (
            rows[0].plan === 'pro' ||
            rows[0].plan === 'creator_pro' ||
            rows[0].plan === 'business'
          ) {
            plan = rows[0].plan;
          }

          const entRows = await db
            .select()
            .from(entitlements)
            .where(eq(entitlements.userId, rows[0].id))
            .limit(1);

          if (entRows[0] && entRows[0].status === 'active') {
            const p = entRows[0].plan;
            if (p === 'pro' || p === 'creator_pro' || p === 'business') {
              plan = p;
            }
          }
        }
      } catch {
        // Graceful fallback if DB is temporarily unreachable
      }
    }

    return { authId: authUser.id, appUserId, email, name, role, plan };
  } catch {
    return null;
  }
}

export function hasPaidEntitlement(user: VerifiedServerUser | null): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.plan === 'pro' || user.plan === 'creator_pro' || user.plan === 'business';
}

export function jsonResponse(body: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}
