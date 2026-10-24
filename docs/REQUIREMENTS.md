# AI Discovery Platform (AIO AI) — PRD Requirements Traceability Matrix

This document maps all core PRD specifications (Sections 1 through 73) directly to their implementing routes, components, database entities, and automated verification tests.

| PRD Section | Requirement Description | Implementation Route / Component | PostgreSQL Table / Service | Verification Method |
|---|---|---|---|---|
| **1–6** | Project Vision, Scope Boundary & Zero-Emoji Rule | `DESIGN.md`, `src/layouts/Layout.astro`, `src/components/Header.astro` | All Tables | Visual audit + `scripts/verifyPlatform.ts` |
| **7–8** | Public Landing Page vs Workspace Shell | `src/pages/index.astro`, `src/pages/dashboard.astro` | `tools`, `categories`, `workflows` | Auto-redirect tests + `hideSidebar={true}` |
| **9–13** | AI Tools Directory & 6 Pricing States | `src/pages/tools/index.astro`, `src/pages/tools/[slug].astro` | `tools`, `tool_categories`, `tool_tags` | `npm test` (Suite 1: 113 verified tools) |
| **14–16** | AI Intent Finder Engine | `src/pages/finder.astro`, `src/components/CommandPalette.astro` | `tools`, `categories` | `npm test` (Suite 5: keyword intent matcher) |
| **17–19** | Side-by-Side Comparison Matrix | `src/pages/compare.astro` | `tools` | Radar ROI scoring & pricing breakdown |
| **20–22** | India-First AI Spotlight & Vernacular Tools | `/tools?category=india-first`, `src/pages/tools/index.astro` | `tools (is_india_first = true)` | `npm test` (16 India-First tools asserted) |
| **23–27** | Production AI Workflows & n8n JSON Blueprints | `src/pages/workflows/index.astro`, `src/pages/workflows/[id].astro` | `workflows`, `workflow_tools` | `npm test` (Suite 1: 16 verified workflows) |
| **28–32** | Open-Source AI Hub & GitHub Live Telemetry | `src/pages/open-source/index.astro`, `trending.astro`, `[slug].astro` | `repositories`, `githubLiveService.ts` | `npm test` (20 repos + VRAM compatibility suite) |
| **33–36** | Hardware VRAM & "Can My PC Run This?" Engine | `src/pages/open-source/[slug].astro`, `src/pages/utilities/index.astro` | `repositories (min_vram_gb)` | `npm test` (Suite 3: 6GB / 8GB / 16GB VRAM logic) |
| **37–40** | Daily AI News Wire & Reaction Thread | `src/pages/news/index.astro`, `src/pages/news/[slug].astro` | `news_stories`, `story_entities`, `liveNewsService.ts` | `npm test` (Suite 1: 24 stories + Algolia live sync) |
| **41–44** | PRD Rule 44: Zero Fake Reviews & Community Anti-Gaming | `src/pages/tools/[slug].astro`, `src/pages/community/index.astro` | `reviews`, `votes`, `community_posts` | `npm test` (0 fake seed reviews, 1-vote-per-user check) |
| **45–48** | AI & Tech YouTube Educators Hub | `src/pages/creators/index.astro`, `src/pages/creators/[slug].astro` | `creators` | `npm test` (Suite 1: 18 curated educators) |
| **49** | My Stack Builder & Cost Estimator | `src/pages/stack-builder.astro` | `stacks` | Real Supabase insertion + `?stackId=` share links |
| **50–52** | Mandatory Legal, Privacy, Terms & Disclosures | `src/pages/privacy.astro`, `terms.astro`, `guidelines.astro`, `disclosure.astro` | N/A (Static Legal Content) | `npm test` (Suite 6: Route existence assertions) |
| **53–55** | Automated Testing & QA Quality Gate | `scripts/verifyPlatform.ts` | All Datasets | `npm test` (46 assertions passing 100%) |
| **56–58** | Official LLM Token Calculator (26 Models) | `src/pages/token-calculator/index.astro`, `compare.astro`, `[id].astro` | `models`, `liveModelService.ts` | `npm test` (Suite 2: official pricing & token math) |
| **59–62** | Client-Side Developer & Creator Utilities | `src/pages/utilities/index.astro` | N/A (100% Client-Side Wasm / Canvas) | Prompt Improver, Hook Gen, WebP Resizer, QR Gen |
| **63–65** | Supabase Authentication & Profile Synchronization | `src/pages/login.astro`, `signup.astro`, `profile.astro`, `dashboard.astro` | `users`, `profiles`, `auth.users` | Trigger `0002_sync_auth_users_trigger.sql` applied |
| **66–68** | Admin Operations, Moderation & Bulk Importer | `src/pages/admin.astro` | `tools`, `corrections`, `reports` | Real `supabase.from('tools').upsert` & queue actions |
| **69–71** | Row Level Security (RLS) & Database Isolation | `drizzle/0001_enable_rls_policies.sql`, `scripts/secureDb.ts` | All 24 PostgreSQL Tables | Applied via `npm run db:secure` |
| **72–73** | Production Deployment, SEO & Security Headers | `astro.config.mjs`, `vercel.json`, `public/_headers` | Platform Config | Automated static compile (243 routes in 4.10s) |
