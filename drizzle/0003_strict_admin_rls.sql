-- Migration: 0003_strict_admin_rls.sql
-- Enforces cryptographic email check (auth.jwt() ->> 'email' = 'harshilpival@gmail.com')
-- on tools, categories, corrections, reports, and news_stories write operations.

-- 1. Tools Admin Policy
DROP POLICY IF EXISTS "admin_manage_tools" ON tools;
CREATE POLICY "admin_manage_tools" ON tools 
  FOR ALL TO authenticated 
  USING ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com') 
  WITH CHECK ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com');

-- 2. Categories Admin Policy
DROP POLICY IF EXISTS "admin_manage_categories" ON categories;
CREATE POLICY "admin_manage_categories" ON categories 
  FOR ALL TO authenticated 
  USING ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com') 
  WITH CHECK ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com');

-- 3. Corrections Admin Policy
DROP POLICY IF EXISTS "admin_manage_corrections" ON corrections;
CREATE POLICY "admin_manage_corrections" ON corrections 
  FOR ALL TO authenticated 
  USING ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com') 
  WITH CHECK ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com');

-- 4. Reports Admin Policy
DROP POLICY IF EXISTS "admin_manage_reports" ON reports;
CREATE POLICY "admin_manage_reports" ON reports 
  FOR ALL TO authenticated 
  USING ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com') 
  WITH CHECK ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com');

-- 5. News Stories Admin Policy
DROP POLICY IF EXISTS "admin_manage_news_stories" ON news_stories;
CREATE POLICY "admin_manage_news_stories" ON news_stories 
  FOR ALL TO authenticated 
  USING ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com') 
  WITH CHECK ((auth.jwt() ->> 'email') = 'harshilpival@gmail.com');
