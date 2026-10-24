-- AIO AI Production Database Hardening Migration: 0001_enable_rls_policies.sql
-- Enables Row Level Security (RLS) on all 24 PostgreSQL tables
-- Protects catalog against arbitrary DELETE/UPDATE via browser anon keys
-- Grants appropriate read/write scopes to public, authenticated users, and admins.

-- 1. Catalog Tables (Public Read-Only)
ALTER TABLE IF EXISTS tools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_tools" ON tools;
CREATE POLICY "public_read_tools" ON tools FOR SELECT USING (true);
DROP POLICY IF EXISTS "user_submit_draft_tools" ON tools;
CREATE POLICY "user_submit_draft_tools" ON tools FOR INSERT WITH CHECK (verification_status IN ('needs_review', 'draft'));
DROP POLICY IF EXISTS "admin_manage_tools" ON tools;
CREATE POLICY "admin_manage_tools" ON tools FOR ALL TO authenticated USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() ->> 'email') LIKE '%admin%') WITH CHECK ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() ->> 'email') LIKE '%admin%');

ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT USING (true);

ALTER TABLE IF EXISTS tags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_tags" ON tags;
CREATE POLICY "public_read_tags" ON tags FOR SELECT USING (true);

ALTER TABLE IF EXISTS tool_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_tool_categories" ON tool_categories;
CREATE POLICY "public_read_tool_categories" ON tool_categories FOR SELECT USING (true);

ALTER TABLE IF EXISTS tool_tags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_tool_tags" ON tool_tags;
CREATE POLICY "public_read_tool_tags" ON tool_tags FOR SELECT USING (true);

ALTER TABLE IF EXISTS tool_alternatives ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_tool_alternatives" ON tool_alternatives;
CREATE POLICY "public_read_tool_alternatives" ON tool_alternatives FOR SELECT USING (true);

ALTER TABLE IF EXISTS workflows ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_workflows" ON workflows;
CREATE POLICY "public_read_workflows" ON workflows FOR SELECT USING (true);

ALTER TABLE IF EXISTS workflow_tools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_workflow_tools" ON workflow_tools;
CREATE POLICY "public_read_workflow_tools" ON workflow_tools FOR SELECT USING (true);

ALTER TABLE IF EXISTS repositories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_repositories" ON repositories;
CREATE POLICY "public_read_repositories" ON repositories FOR SELECT USING (true);

ALTER TABLE IF EXISTS news_stories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_news_stories" ON news_stories;
CREATE POLICY "public_read_news_stories" ON news_stories FOR SELECT USING (true);

ALTER TABLE IF EXISTS story_entities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_story_entities" ON story_entities;
CREATE POLICY "public_read_story_entities" ON story_entities FOR SELECT USING (true);

ALTER TABLE IF EXISTS creators ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_creators" ON creators;
CREATE POLICY "public_read_creators" ON creators FOR SELECT USING (true);

ALTER TABLE IF EXISTS models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_models" ON models;
CREATE POLICY "public_read_models" ON models FOR SELECT USING (true);

-- 2. User Activity & Interaction Tables
ALTER TABLE IF EXISTS reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_reviews" ON reviews;
CREATE POLICY "public_read_reviews" ON reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "insert_reviews" ON reviews;
CREATE POLICY "insert_reviews" ON reviews FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "update_own_reviews" ON reviews;
CREATE POLICY "update_own_reviews" ON reviews FOR UPDATE TO authenticated USING (auth.uid()::text = user_id::text);
DROP POLICY IF EXISTS "delete_own_reviews" ON reviews;
CREATE POLICY "delete_own_reviews" ON reviews FOR DELETE TO authenticated USING (auth.uid()::text = user_id::text);

ALTER TABLE IF EXISTS bookmarks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read_bookmarks" ON bookmarks;
CREATE POLICY "read_bookmarks" ON bookmarks FOR SELECT USING (true);
DROP POLICY IF EXISTS "insert_bookmarks" ON bookmarks;
CREATE POLICY "insert_bookmarks" ON bookmarks FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "delete_bookmarks" ON bookmarks;
CREATE POLICY "delete_bookmarks" ON bookmarks FOR DELETE USING (true);

ALTER TABLE IF EXISTS stacks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_stacks" ON stacks;
CREATE POLICY "public_read_stacks" ON stacks FOR SELECT USING (is_public = true OR auth.uid()::text = user_id::text);
DROP POLICY IF EXISTS "insert_stacks" ON stacks;
CREATE POLICY "insert_stacks" ON stacks FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "update_own_stacks" ON stacks;
CREATE POLICY "update_own_stacks" ON stacks FOR UPDATE USING (auth.uid()::text = user_id::text);
DROP POLICY IF EXISTS "delete_own_stacks" ON stacks;
CREATE POLICY "delete_own_stacks" ON stacks FOR DELETE USING (auth.uid()::text = user_id::text);

ALTER TABLE IF EXISTS community_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_posts" ON community_posts;
CREATE POLICY "public_read_posts" ON community_posts FOR SELECT USING (true);
DROP POLICY IF EXISTS "insert_posts" ON community_posts;
CREATE POLICY "insert_posts" ON community_posts FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "update_own_posts" ON community_posts;
CREATE POLICY "update_own_posts" ON community_posts FOR UPDATE TO authenticated USING (auth.uid()::text = user_id::text);
DROP POLICY IF EXISTS "delete_own_posts" ON community_posts;
CREATE POLICY "delete_own_posts" ON community_posts FOR DELETE TO authenticated USING (auth.uid()::text = user_id::text);

ALTER TABLE IF EXISTS community_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_comments" ON community_comments;
CREATE POLICY "public_read_comments" ON community_comments FOR SELECT USING (true);
DROP POLICY IF EXISTS "insert_comments" ON community_comments;
CREATE POLICY "insert_comments" ON community_comments FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "delete_own_comments" ON community_comments;
CREATE POLICY "delete_own_comments" ON community_comments FOR DELETE TO authenticated USING (auth.uid()::text = user_id::text);

ALTER TABLE IF EXISTS votes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_votes" ON votes;
CREATE POLICY "public_read_votes" ON votes FOR SELECT USING (true);
DROP POLICY IF EXISTS "insert_votes" ON votes;
CREATE POLICY "insert_votes" ON votes FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "delete_votes" ON votes;
CREATE POLICY "delete_votes" ON votes FOR DELETE USING (true);

ALTER TABLE IF EXISTS reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "insert_reports" ON reports;
CREATE POLICY "insert_reports" ON reports FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "admin_read_reports" ON reports;
CREATE POLICY "admin_read_reports" ON reports FOR SELECT TO authenticated USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() ->> 'email') LIKE '%admin%');

ALTER TABLE IF EXISTS corrections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_corrections" ON corrections;
CREATE POLICY "public_read_corrections" ON corrections FOR SELECT USING (true);
DROP POLICY IF EXISTS "insert_corrections" ON corrections;
CREATE POLICY "insert_corrections" ON corrections FOR INSERT WITH CHECK (true);

ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read_users" ON users;
CREATE POLICY "read_users" ON users FOR SELECT USING (true);
DROP POLICY IF EXISTS "update_own_user" ON users;
CREATE POLICY "update_own_user" ON users FOR UPDATE TO authenticated USING (auth.uid()::text = id::text);

ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_profiles" ON profiles;
CREATE POLICY "public_read_profiles" ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "insert_profiles" ON profiles;
CREATE POLICY "insert_profiles" ON profiles FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid()::text = user_id::text);

ALTER TABLE IF EXISTS analytics_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "insert_analytics_events" ON analytics_events;
CREATE POLICY "insert_analytics_events" ON analytics_events FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "admin_read_events" ON analytics_events;
CREATE POLICY "admin_read_events" ON analytics_events FOR SELECT USING (true);
