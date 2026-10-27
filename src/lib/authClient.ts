import { supabase, isSupabaseConfigured } from './supabase';

export interface AuthUserInfo {
  id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
  authProvider?: string;
  isAdmin?: boolean;
}

const ADMIN_EMAILS = [
  'harshilpival@gmail.com',
  ...(import.meta.env.PUBLIC_ADMIN_EMAILS ? import.meta.env.PUBLIC_ADMIN_EMAILS.split(',').map((e: string) => e.trim().toLowerCase()) : [])
];

export function isUserAdmin(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export function parseStoredUser(): AuthUserInfo | null {
  if (typeof window === 'undefined') return null;

  try {
    // 1. Direct local user storage
    const localUserStr = localStorage.getItem('aio_user');
    if (localUserStr) {
      const u = JSON.parse(localUserStr);
      if (u && (u.email || u.name)) {
        return {
          id: u.id,
          name: u.name || u.email?.split('@')[0] || 'Builder',
          email: u.email || '',
          avatarUrl: u.avatarUrl || u.avatar_url,
          authProvider: u.authProvider || 'email',
          isAdmin: isUserAdmin(u.email)
        };
      }
    }

    // 2. Scan Supabase session tokens in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k === 'supabase.auth.token' || (k.startsWith('sb-') && k.endsWith('-auth-token')))) {
        const raw = localStorage.getItem(k);
        if (raw) {
          const parsed = JSON.parse(raw);
          const sessionUser = parsed.user || (parsed.currentSession && parsed.currentSession.user);
          if (sessionUser && (sessionUser.email || sessionUser.user_metadata)) {
            const meta = sessionUser.user_metadata || {};
            const fullName = meta.full_name || meta.name || sessionUser.email?.split('@')[0] || 'Builder';
            const email = sessionUser.email || '';
            const avatar = meta.avatar_url || meta.picture || '';
            return {
              id: sessionUser.id,
              name: fullName,
              email: email,
              avatarUrl: avatar,
              authProvider: meta.iss ? 'google' : 'email',
              isAdmin: isUserAdmin(email)
            };
          }
        }
      }
    }
  } catch (e) {
    console.error('Error parsing stored user auth:', e);
  }

  return null;
}

export async function getLiveAuthSession(): Promise<AuthUserInfo | null> {
  const cached = parseStoredUser();
  if (cached) return cached;

  if (isSupabaseConfigured && typeof window !== 'undefined') {
    try {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const u = data.session.user;
        const meta = u.user_metadata || {};
        const fullName = meta.full_name || meta.name || u.email?.split('@')[0] || 'Builder';
        const info: AuthUserInfo = {
          id: u.id,
          name: fullName,
          email: u.email || '',
          avatarUrl: meta.avatar_url || meta.picture || '',
          authProvider: meta.iss ? 'google' : 'email',
          isAdmin: isUserAdmin(u.email)
        };
        // Sync to aio_user for instant synchronous loading on subsequent pages
        localStorage.setItem('aio_user', JSON.stringify(info));
        return info;
      }
    } catch (e) {
      console.warn('Supabase getSession notice:', e);
    }
  }

  return null;
}

export async function signOutUser(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('aio_user');
    // Clear all Supabase auth keys
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('sb-') || k === 'supabase.auth.token')) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));

    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
  } catch (e) {
    console.error('Error signing out:', e);
  } finally {
    window.location.href = '/';
  }
}
