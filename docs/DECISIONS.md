# AI Discovery Platform - Decision Log

## Decision 001: Technology Stack
**Date**: 2026-09-29
**Problem**: Need a modern, maintainable, free-tier-friendly stack with excellent SSR/SSG and strong SEO.
**Decision**: Use Astro with React components, Tailwind CSS v4, and Supabase (PostgreSQL + Auth + Storage).
**Alternatives**: 
- Next.js: Good, but Astro provides better default shipping of zero JS and highly optimized static generation for directory sites.
- Remix: Same reasoning, Astro is superior for content-heavy sites.
**Reason**: Astro natively supports the PRD requirements for SEO-first pages, fast performance, and a modular monolith structure. Supabase provides all necessary backend services in a free-tier friendly package.

## Decision 002: Implementation Phasing
**Date**: 2026-09-29
**Problem**: The PRD has a very large scope including workflows, creator intelligence, etc., which could risk MVP delivery.
**Decision**: Strictly adhere to the MVP scope (Phase 1-4 & 9) before expanding to News, Creators, and Workflows.
**Alternatives**: Build everything concurrently.
**Reason**: PRD Section 3 "CRITICAL SCOPE RULE" mandates not implementing every future feature in the first pass to ensure the core directory and MVP are launchable.

## Decision 003: Entity Graph Expansion, Zero-Fake-Activity Hardening & Command Palette
**Date**: 2026-10-23
**Problem**: The audit revealed pure SSG limitations, schema mismatches with 8 flat tables vs. PRD 11 domains, fake synthetic reviews in seed data violating PRD Rule 44, and broken routes.
**Decision**: 
1. Expand Drizzle ORM schema to full 11-domain entity graph covering tools with 6 pricing states, workflows, repositories, newsStories, creators, models, reviews, bookmarks, stacks, communityPosts, votes, and corrections.
2. Strip all fabricated user reviews and synthetic upvotes to strictly adhere to PRD Rule 44; keep Platform Score as an editorial 0-100 metric.
3. Expand seed catalog to 113 real verified tools including 16 India-First AI innovators.
4. Implement global Cmd+K / Ctrl+K Command Palette powered by fuzzy search across all entities.
5. Build all missing routes: Creator Discovery Hub (/creators, /creators/[slug]), Daily News (/news/daily, /news/[slug]), Trending Open Source (/open-source/trending, /open-source/[slug]), Client-Side Creator Utilities (/utilities), and Community Submissions (/submit).
