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
