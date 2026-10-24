-- ============================================================================
-- DRIZZLE MIGRATION 0002: SYNC AUTH.USERS TO PUBLIC.USERS & PUBLIC.PROFILES
-- ============================================================================
-- Connects Supabase Auth (Google OAuth, GitHub, Email/Password) directly to
-- public.users and public.profiles so foreign key references (reviews, bookmarks,
-- community_posts, stacks, votes) resolve without constraint violations.

-- 1. Ensure auth_id column exists on public.users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS auth_id uuid UNIQUE;

-- 2. Create or replace the SECURITY DEFINER sync function
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id integer;
BEGIN
  -- Insert or update user record
  INSERT INTO public.users (auth_id, email, role, plan, reputation_points, followed_topics)
  VALUES (
    NEW.id,
    NEW.email,
    'user',
    'free',
    0,
    '[]'::jsonb
  )
  ON CONFLICT (email) DO UPDATE
  SET auth_id = EXCLUDED.auth_id
  RETURNING id INTO v_user_id;

  -- Ensure matching profile exists
  INSERT INTO public.profiles (
    user_id,
    username,
    full_name,
    avatar_url
  )
  VALUES (
    v_user_id,
    COALESCE(NEW.raw_user_meta_data->>'user_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- 3. Attach trigger to auth.users for any new signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_auth_user();

-- 4. Backfill existing auth.users into public.users and public.profiles
DO $$
DECLARE
  r RECORD;
  v_uid integer;
BEGIN
  FOR r IN SELECT id, email, raw_user_meta_data FROM auth.users WHERE email IS NOT NULL LOOP
    INSERT INTO public.users (auth_id, email, role, plan, reputation_points, followed_topics)
    VALUES (r.id, r.email, 'user', 'free', 0, '[]'::jsonb)
    ON CONFLICT (email) DO UPDATE
    SET auth_id = EXCLUDED.auth_id
    RETURNING id INTO v_uid;

    INSERT INTO public.profiles (user_id, username, full_name, avatar_url)
    VALUES (
      v_uid,
      COALESCE(r.raw_user_meta_data->>'user_name', split_part(r.email, '@', 1)),
      COALESCE(r.raw_user_meta_data->>'full_name', r.raw_user_meta_data->>'name', split_part(r.email, '@', 1)),
      r.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (user_id) DO NOTHING;
  END LOOP;
END;
$$;
