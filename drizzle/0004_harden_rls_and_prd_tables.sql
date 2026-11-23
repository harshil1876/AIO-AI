-- ============================================================================
-- MIGRATION 0004: HARDENED RLS POLICIES + COMPLETE PRD PRODUCTION TABLES
-- ============================================================================
-- Fixes:
-- 1. Resolves UUID (auth.uid()) vs integer (public.users.id) mismatch via
--    SECURITY DEFINER helper functions public.current_app_user_id() & is_app_admin().
-- 2. Eliminates anonymous DELETE/INSERT/SELECT holes on bookmarks, votes,
--    users (PII), reviews, stacks, community_posts, community_comments, profiles,
--    reports (%admin% wildcard), and analytics_events.
-- 3. Adds PRD Section 32 tables: collections, collection_items, follows,
--    user_history, newsletter_subscribers, entitlements, verification_records,
--    moderation_actions, price_alerts.

-- 1. Security Helper Functions (STABLE + SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.current_app_user_id()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.users WHERE auth_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_app_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users
    WHERE auth_id = auth.uid()
      AND role = 'admin'
  );
$$;

-- 2. New PRD Section 32 Tables
CREATE TABLE IF NOT EXISTS public.collections (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  slug varchar(255) NOT NULL UNIQUE,
  title varchar(255) NOT NULL,
  description text,
  is_public boolean DEFAULT true,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.collection_items (
  id serial PRIMARY KEY,
  collection_id integer NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
  entity_type varchar(50) NOT NULL,
  entity_slug varchar(255) NOT NULL,
  note text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.follows (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_type varchar(50) NOT NULL,
  target_slug varchar(255) NOT NULL,
  created_at timestamp DEFAULT now(),
  UNIQUE(user_id, target_type, target_slug)
);

CREATE TABLE IF NOT EXISTS public.user_history (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  action_type varchar(50) NOT NULL,
  entity_type varchar(50),
  entity_slug varchar(255),
  query_text text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id serial PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  cadence varchar(20) DEFAULT 'weekly',
  topics jsonb DEFAULT '["AI News","Open Source","Workflows"]'::jsonb,
  status varchar(20) DEFAULT 'active',
  unsubscribe_token varchar(128) NOT NULL,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.entitlements (
  id serial PRIMARY KEY,
  user_id integer NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  plan varchar(50) NOT NULL DEFAULT 'free',
  status varchar(30) NOT NULL DEFAULT 'active',
  provider varchar(30),
  provider_customer_id varchar(255),
  provider_subscription_id varchar(255),
  currency varchar(10) DEFAULT 'USD',
  current_period_end timestamp,
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.verification_records (
  id serial PRIMARY KEY,
  entity_type varchar(50) NOT NULL,
  entity_slug varchar(255) NOT NULL,
  status varchar(50) NOT NULL,
  source_url varchar(500),
  checked_fields jsonb DEFAULT '[]'::jsonb,
  verifier_id integer REFERENCES public.users(id) ON DELETE SET NULL,
  checked_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.moderation_actions (
  id serial PRIMARY KEY,
  moderator_id integer REFERENCES public.users(id) ON DELETE SET NULL,
  target_type varchar(50) NOT NULL,
  target_id integer NOT NULL,
  action varchar(50) NOT NULL,
  reason text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.price_alerts (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tool_slug varchar(255) NOT NULL,
  alert_type varchar(50) DEFAULT 'price_drop',
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT now(),
  UNIQUE(user_id, tool_slug)
);

-- 3. Drop All Permissive / Vulnerable Legacy Policies from 0001
DROP POLICY IF EXISTS "read_users" ON users;
DROP POLICY IF EXISTS "update_own_user" ON users;
DROP POLICY IF EXISTS "insert_profiles" ON profiles;
DROP POLICY IF EXISTS "update_own_profile" ON profiles;
DROP POLICY IF EXISTS "insert_reviews" ON reviews;
DROP POLICY IF EXISTS "update_own_reviews" ON reviews;
DROP POLICY IF EXISTS "delete_own_reviews" ON reviews;
DROP POLICY IF EXISTS "read_bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "insert_bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "delete_bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "public_read_stacks" ON stacks;
DROP POLICY IF EXISTS "insert_stacks" ON stacks;
DROP POLICY IF EXISTS "update_own_stacks" ON stacks;
DROP POLICY IF EXISTS "delete_own_stacks" ON stacks;
DROP POLICY IF EXISTS "insert_posts" ON community_posts;
DROP POLICY IF EXISTS "update_own_posts" ON community_posts;
DROP POLICY IF EXISTS "delete_own_posts" ON community_posts;
DROP POLICY IF EXISTS "insert_comments" ON community_comments;
DROP POLICY IF EXISTS "delete_own_comments" ON community_comments;
DROP POLICY IF EXISTS "insert_votes" ON votes;
DROP POLICY IF EXISTS "delete_votes" ON votes;
DROP POLICY IF EXISTS "insert_reports" ON reports;
DROP POLICY IF EXISTS "admin_read_reports" ON reports;
DROP POLICY IF EXISTS "insert_corrections" ON corrections;
DROP POLICY IF EXISTS "admin_read_events" ON analytics_events;

-- 4. Apply Strictly Scoped Ownership & Admin Policies

-- Users (Protect PII: users only read/update their own row; admins read all)
CREATE POLICY "read_own_user" ON users
  FOR SELECT TO authenticated
  USING (auth_id = auth.uid() OR public.is_app_admin());

CREATE POLICY "update_own_user" ON users
  FOR UPDATE TO authenticated
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

-- Profiles (Public showcase readable; strictly owner-writable)
CREATE POLICY "insert_own_profile" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY "update_own_profile" ON profiles
  FOR UPDATE TO authenticated
  USING (user_id = public.current_app_user_id())
  WITH CHECK (user_id = public.current_app_user_id());

-- Bookmarks (Strictly Private to Owner)
CREATE POLICY "read_own_bookmarks" ON bookmarks
  FOR SELECT TO authenticated
  USING (user_id = public.current_app_user_id());

CREATE POLICY "insert_own_bookmarks" ON bookmarks
  FOR INSERT TO authenticated
  WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY "delete_own_bookmarks" ON bookmarks
  FOR DELETE TO authenticated
  USING (user_id = public.current_app_user_id());

-- Votes (Authenticated owner-only write/delete)
CREATE POLICY "insert_own_votes" ON votes
  FOR INSERT TO authenticated
  WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY "delete_own_votes" ON votes
  FOR DELETE TO authenticated
  USING (user_id = public.current_app_user_id());

-- Reviews (Public read; owner insert/update/delete)
CREATE POLICY "insert_own_reviews" ON reviews
  FOR INSERT TO authenticated
  WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY "update_own_reviews" ON reviews
  FOR UPDATE TO authenticated
  USING (user_id = public.current_app_user_id());

CREATE POLICY "delete_own_reviews" ON reviews
  FOR DELETE TO authenticated
  USING (user_id = public.current_app_user_id() OR public.is_app_admin());

-- Stacks (Public if is_public=true, else owner only)
CREATE POLICY "read_public_or_own_stacks" ON stacks
  FOR SELECT
  USING (is_public = true OR user_id = public.current_app_user_id());

CREATE POLICY "insert_own_stacks" ON stacks
  FOR INSERT TO authenticated
  WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY "update_own_stacks" ON stacks
  FOR UPDATE TO authenticated
  USING (user_id = public.current_app_user_id());

CREATE POLICY "delete_own_stacks" ON stacks
  FOR DELETE TO authenticated
  USING (user_id = public.current_app_user_id() OR public.is_app_admin());

-- Community Posts & Comments
CREATE POLICY "insert_own_posts" ON community_posts
  FOR INSERT TO authenticated
  WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY "update_own_posts" ON community_posts
  FOR UPDATE TO authenticated
  USING (user_id = public.current_app_user_id());

CREATE POLICY "delete_own_posts" ON community_posts
  FOR DELETE TO authenticated
  USING (user_id = public.current_app_user_id() OR public.is_app_admin());

CREATE POLICY "insert_own_comments" ON community_comments
  FOR INSERT TO authenticated
  WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY "delete_own_comments" ON community_comments
  FOR DELETE TO authenticated
  USING (user_id = public.current_app_user_id() OR public.is_app_admin());

-- Reports & Corrections (Authenticated submit; Admin read/manage)
CREATE POLICY "insert_authenticated_reports" ON reports
  FOR INSERT TO authenticated
  WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY "strict_admin_read_reports" ON reports
  FOR SELECT TO authenticated
  USING (public.is_app_admin());

CREATE POLICY "insert_authenticated_corrections" ON corrections
  FOR INSERT TO authenticated
  WITH CHECK (user_id = public.current_app_user_id());

-- Analytics Events (Admin-only read)
CREATE POLICY "strict_admin_read_events" ON analytics_events
  FOR SELECT TO authenticated
  USING (public.is_app_admin());

-- 5. Enable RLS on All New PRD Tables
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_collections" ON public.collections FOR SELECT USING (is_public = true OR user_id = public.current_app_user_id());
CREATE POLICY "manage_own_collections" ON public.collections FOR ALL TO authenticated USING (user_id = public.current_app_user_id()) WITH CHECK (user_id = public.current_app_user_id());

ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_collection_items" ON public.collection_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.collections c WHERE c.id = collection_id AND (c.is_public = true OR c.user_id = public.current_app_user_id()))
);
CREATE POLICY "manage_own_collection_items" ON public.collection_items FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.collections c WHERE c.id = collection_id AND c.user_id = public.current_app_user_id())
);

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "manage_own_follows" ON public.follows FOR ALL TO authenticated USING (user_id = public.current_app_user_id()) WITH CHECK (user_id = public.current_app_user_id());

ALTER TABLE public.user_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "manage_own_history" ON public.user_history FOR ALL TO authenticated USING (user_id = public.current_app_user_id()) WITH CHECK (user_id = public.current_app_user_id());

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_manage_newsletter" ON public.newsletter_subscribers FOR ALL TO authenticated USING (public.is_app_admin());

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_own_entitlement" ON public.entitlements FOR SELECT TO authenticated USING (user_id = public.current_app_user_id() OR public.is_app_admin());
CREATE POLICY "admin_manage_entitlements" ON public.entitlements FOR ALL TO authenticated USING (public.is_app_admin());

ALTER TABLE public.verification_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_verifications" ON public.verification_records FOR SELECT USING (true);
CREATE POLICY "admin_manage_verifications" ON public.verification_records FOR ALL TO authenticated USING (public.is_app_admin());

ALTER TABLE public.moderation_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_manage_moderation_actions" ON public.moderation_actions FOR ALL TO authenticated USING (public.is_app_admin());

ALTER TABLE public.price_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "manage_own_price_alerts" ON public.price_alerts FOR ALL TO authenticated USING (user_id = public.current_app_user_id()) WITH CHECK (user_id = public.current_app_user_id());
