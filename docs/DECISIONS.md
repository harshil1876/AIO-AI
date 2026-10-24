# AI Discovery Platform (AIO AI) — Architecture Decision Log

## Decision 001: Technology Stack
**Date**: 2026-09-29  
**Problem**: Need a modern, maintainable, free-tier-friendly stack with excellent SSR/SSG and strong SEO.  
**Decision**: Use Astro 5 with React/vanilla islands, Tailwind CSS v4, and Supabase (PostgreSQL + Auth + Storage).  
**Alternatives**:  
- Next.js: Good, but Astro provides better default shipping of zero JS and highly optimized static generation for directory sites.  
- Remix: Same reasoning; Astro is superior for content-heavy directory and utility sites.  
**Reason**: Astro natively supports the PRD requirements for SEO-first pages, fast performance, and a modular monolith structure. Supabase provides all necessary backend services in a free-tier friendly package.

## Decision 002: Implementation Phasing
**Date**: 2026-09-29  
**Problem**: The PRD has a very large scope including workflows, creator intelligence, token economics, etc., which could risk MVP delivery.  
**Decision**: Strictly adhere to the MVP scope (Phases 1-4 & 9) before expanding to News, Creators, and Workflows.  
**Alternatives**: Build everything concurrently.  
**Reason**: PRD Section 3 "CRITICAL SCOPE RULE" mandates not implementing every future feature in the first pass to ensure the core directory and MVP are launchable.

## Decision 003: Entity Graph Expansion, Zero-Fake-Activity Hardening & Command Palette
**Date**: 2026-10-23  
**Problem**: Audit revealed pure SSG limitations, schema mismatches with 8 flat tables vs. PRD 11 domains, fake synthetic reviews in seed data violating PRD Rule 44, and broken routes.  
**Decision**:  
1. Expand Drizzle ORM schema to full 11-domain entity graph covering tools with 6 pricing states, workflows, repositories, newsStories, creators, models, reviews, bookmarks, stacks, communityPosts, votes, and corrections.  
2. Strip all fabricated user reviews and synthetic upvotes to strictly adhere to PRD Rule 44; keep Platform Score as an editorial 0-100 metric.  
3. Expand seed catalog to 113 real verified tools including 16 India-First AI innovators.  
4. Implement global Cmd+K / Ctrl+K Command Palette powered by fuzzy search across all entities.  
5. Build all missing routes: Creator Discovery Hub (`/creators`, `/creators/[slug]`), Daily News (`/news`, `/news/[slug]`), Trending Open Source (`/open-source/trending`, `/open-source/[slug]`), Client-Side Creator Utilities (`/utilities`), and Community Submissions (`/submit`).

## Decision 004: Clean Precision Aesthetic Transition & Neo-Brutalist Scope Demarcation
**Date**: 2026-10-24  
**Problem**: User feedback identified inconsistent neo-brutalist styling across developer workflows, open source, and tools directories that hindered readability and felt cluttered.  
**Decision**:  
1. Establish Clean Precision Style (Refined Linear/Stripe/Vercel modern aesthetic: neutral palette, hairline borders `#E2E8F0`, slate typography, 0 emojis) across 95% of the platform.  
2. Confine Neo-Brutalism strictly to the daily AI news wire (`/news`, `/news/[slug]`) where a bold dispatch aesthetic enhances journalistic freshness.  
3. Remove redundant Daily Newspaper duplicate pages in favor of a single unified AI News Wire.

## Decision 005: Supabase Auth-to-PostgreSQL Trigger Sync & Live Hybrid Data Engine
**Date**: 2026-10-24  
**Problem**: Supabase Auth creates users in `auth.users`, but database foreign keys (`reviews.user_id`, `bookmarks.user_id`, `stacks.user_id`, `community_posts.user_id`) reference `public.users(id)`. Without automated synchronization, authenticated users hit PostgreSQL foreign-key constraint violations on reviews and bookmarks. Furthermore, static builds left news, GitHub telemetry, and model prices frozen.  
**Decision**:  
1. Deploy `drizzle/0002_sync_auth_users_trigger.sql` with a `SECURITY DEFINER` function and `on_auth_user_created` trigger on `auth.users`, backfilling all existing auth accounts into `public.users` and `public.profiles`.  
2. Implement client-side safety upsert on `/dashboard` and `/login` to ensure profile readiness before any mutation.  
3. Implement Hybrid Live Data Engine (`liveNewsService.ts`, `githubLiveService.ts`, `liveModelService.ts`) hydrating static catalogs with real-time Algolia HN AI, GitHub REST, and OpenRouter pricing APIs with graceful offline fallbacks.  
4. Apply Row Level Security (`0001_enable_rls_policies.sql`) across all 24 PostgreSQL tables with strict anonymous read vs authenticated write isolation.
