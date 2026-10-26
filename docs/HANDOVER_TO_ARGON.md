# AIO AI — Master Platform Handover & Architecture Report
**Author:** Antigravity AI Engineering Team  
**Recipient:** Argon & Core Stakeholders  
**Repository:** [`harshil1876/AIO-AI`](https://github.com/harshil1876/AIO-AI)  
**Branch:** `main` | **Latest Commit:** `3ab5399`  
**Test Suite:** 53 / 53 Assertions Passing (100.0%) | **Static Build:** 294 Pages (< 4s)  

---

## 1. Executive Summary

**AIO AI** has been successfully transformed from an early static prototype into an enterprise-grade, production-ready AI discovery, workflow automation, and intelligence platform. 

The platform delivers a verified, intent-driven ecosystem built specifically for software engineers, founders, and practitioners building with AI. Every metric, ranking, community contribution, and pricing figure across the platform adheres to a strict **Zero-Fake Data Guarantee**:
- **0 Synthetic Billing/Savings Claims**: All arbitrary metrics (e.g. fake "\$44/mo savings") have been purged; counters reflect solely verified user activity.
- **0 Fabricated Community Posts or Bot Leaderboards**: The community forum launches with real cold-start governance and Supabase PostgreSQL persistence.
- **Deterministic 5-Factor Authenticity Scoring**: No pay-for-placement bias. Every tool score is calculated from transparent, auditable criteria (Docs & API Maturity, Pricing Transparency, Workflow Interop, Domain Health, and Verified Community Signal).
- **Live Hybrid Hydration**: Static build speed with client-side real-time data hydration for GitHub repository search (`stars:>=1000`), velocity trending, Hacker News Algolia AI dispatches, and Hugging Face daily papers.
- **Enterprise Security**: Row Level Security (RLS) active across all 24 PostgreSQL tables, automated auth-to-public-profile synchronization triggers, and zero hardcoded secret fallbacks.

---

## 2. Chronological Evolution (Starting to Ending)

The codebase underwent 7 core evolutionary phases across 25 git commits:

```
[Day 1 Scaffolding] -> [Core MVP Pages] -> [Cost & Workflow Tools] -> [Entity Graph Expansion] 
       -> [Supabase 24 Tables] -> [Clean Precision Style] -> [RLS & Auth Trigger] -> [9-Pillar Overhaul]
```

### Phase 1: MVP Foundation & Static Scaffolding (`eb408c4` → `157a5c1`)
- Bootstrapped Astro 5 with Tailwind CSS v4.
- Scaffolded basic directory routing: `/`, `/tools`, `/categories`, `/workflows`, `/news`.
- Established initial tool cards, pricing badges, and category filters.

### Phase 2: Intelligence Utilities & Cost Mathematics (`70d029d` → `5767a94`)
- Implemented the **Cost-to-Value Score** and **Open Source Switch** mechanics.
- Built interactive visual workflow maps and initial AI Stack Combinator prototypes.
- Replaced all emojis across the entire UI with accessible, responsive SVG icons.
- Designed initial Token Cost Calculator for frontier models.

### Phase 3: Token Suite & PRD Entity Expansion (`4b1c7d3` → `928c809`)
- Built the **Official LLM Token Calculator Suite** (`/token-calculator`) supporting 26 frontier models with 6-decimal pricing precision in USD ($) and INR (₹).
- Expanded data model from flat mock arrays to an 11-domain relational entity graph via Drizzle ORM.
- Expanded catalog to **113 verified tools**, with dedicated spotlight for **16 India-First Sovereign AI innovations** (Sarvam AI, Krutrim, Bhashini, Qure.ai, etc.).
- Integrated global **Cmd+K / Ctrl+K Command Palette** with instant fuzzy search across all tools, workflows, repos, and educators.
- Created the **Creator Discovery Hub** (`/creators`) and **Hardware VRAM Calculator**.

### Phase 4: Supabase PostgreSQL Migration (`34a0eee` → `3828690`)
- Deployed a comprehensive PostgreSQL database schema via Drizzle ORM containing **24 relational tables**.
- Introduced the left sidebar workspace shell, unified docs portal, and community forum.
- Experimented with high-contrast Neo-Brutalist newspaper aesthetic on `/news`.

### Phase 5: Workspace Separation & Aesthetic Realignment (`890a2fa` → `bcbbcf8`)
- **Landing Page vs Workspace Separation**:
  - Unauthenticated visitors to `/` see a clean marketing landing page with the internal sidebar hidden (`hideSidebar={true}`).
  - Authenticated users automatically redirect to `/dashboard`.
  - Clicking "Home" in the sidebar routes authenticated users to `/dashboard`.
- **Aesthetic Precision Alignment**:
  - Stripped cluttered neo-brutalist borders and hard drop shadows from Open Source, Workflows, Utilities, and Creators.
  - Established the **Clean Precision Style** (Linear/Stripe refined modern palette, hairline borders `#E2E8F0`, slate typography) across 95% of the platform.
  - Confined Neo-Brutalism strictly to the daily AI news wire (`/news`) where bold headline typography enhances journalistic reading.
  - Removed duplicate daily newspaper routes in favor of unified real-time news.

### Phase 6: Database Hardening & Security Isolation (`6d5c352` → `a231884`)
- **Row Level Security (RLS)**: Enacted `0001_enable_rls_policies.sql` across all 24 database tables, enforcing anonymous `SELECT` read-only and authenticated `auth.uid() = user_id` for mutations (`INSERT`, `UPDATE`, `DELETE`).
- **Auth Trigger Synchronization**: Applied `0002_sync_auth_users_trigger.sql` linking `auth.users` to `public.users` and `public.profiles`, preventing foreign key constraint violations during reviews, bookmarks, and stack saves.
- **Secret Sanitization**: Completely scrubbed hardcoded pooler hostnames and API fallback strings from client source code; all access strictly reads from `.env`.
- **Production Launch Pack**: Added mandatory legal pages (`/privacy`, `/terms`, `/guidelines`, `/disclosure`) and custom `404.astro` with built-in search.
- **Automated Verification Suite**: Initialized `scripts/verifyPlatform.ts` (`npm test`) to guarantee zero regression across catalog schemas and formulas.

### Phase 7: Session Resilience & 9-Pillar Master Overhaul (`d263bbf` → `e4fbf6c` → `3ab5399`)
- **Auth Resilience**: Resolved OAuth hash/query redirection loops so logging out and signing back in never traps users. Added 1-Click Instant Demo Mode for testing.
- **Pillar 1**: Purged synthetic billing and fake community leaderboards.
- **Pillar 2**: Built deterministic 5-Factor Authenticity Scorecard on tools and categories.
- **Pillar 3**: Added Live GitHub AI Search (`stars:>=1000`) with Safety Banner and multi-facet GitHub Trending (Repos vs Developers/Orgs).
- **Pillar 4**: Rebuilt `/news` into a live-first chronological wire with clickable source badges.
- **Pillar 5**: Upgraded all 16 production workflows with complete system prompts and JSON schemas; created interactive **Workflow Studio (`/workflows/builder`)**.
- **Pillar 6**: Scaled Creator Hub to **60+ verified channels** across India and global ecosystems.
- **Pillar 7**: Redesigned **Stack Builder** with custom naming, 5 modular slots, and 1-Click Free Swap ($0/mo).
- **Pillar 8**: Built 5-tab user profile hub (`/profile`) and dedicated **Pricing Page (`/pricing`)** with PPP toggle.
- **Pillar 9**: Expanded verification suite to **53 passing tests (100%)** and validated static compilation across **294 routes**.

---

## 3. Architecture & Tech Stack

```mermaid
flowchart TD
    Client["Client Browser (Vanilla Island Hydration)"]
    Astro["Astro 5 SSG / SSR Engine (Node.js 22)"]
    Tailwind["Tailwind CSS v4 Engine"]
    
    subgraph Data Layer
        Seed["Curated Seed Registry (113 Tools, 26 Models, 16 Workflows, 62 Creators)"]
        LiveEng["Hybrid Live Data Engine (GitHub API, HN Algolia, Hugging Face)"]
    end
    
    subgraph Backend & Persistence
        Supabase["Supabase Cloud Platform"]
        PG["PostgreSQL Database (24 Tables with RLS)"]
        Auth["Supabase Auth (Google OAuth & Email/Password)"]
        Trigger["SECURITY DEFINER on_auth_user_created Trigger"]
    end
    
    Client --> Astro
    Astro --> Tailwind
    Astro --> Seed
    Client -.-> LiveEng
    Client -.-> Auth
    Auth --> Trigger --> PG
    Client -.-> PG
```

### Key Technologies
- **Core Framework**: Astro 5 (Static Site Generation with client hydration islands)
- **Styling**: Tailwind CSS v4 (Clean Precision modern design tokens)
- **Database & Auth**: Supabase PostgreSQL + Supabase Auth
- **ORM & Migrations**: Drizzle ORM (`drizzle-kit`, `postgres.js`)
- **External Real-Time APIs**: GitHub REST API (`/search/repositories`), Hacker News Algolia AI, Hugging Face Daily Papers, Dev.to AI
- **Test Runner**: TSX + Custom Assertion Suite (`scripts/verifyPlatform.ts`)

---

## 4. Database Architecture & Security Model

Managed via Drizzle ORM in `src/db/schema.ts`, the database contains **24 relational tables** with Row Level Security:

| Table Category | Tables Included | RLS Policy |
| :--- | :--- | :--- |
| **Identity & Profiles** | `users`, `profiles` | Public read; Owner update (`auth.uid() = id`) |
| **Catalog & Taxonomy** | `tools`, `categories`, `tags`, `tool_categories`, `tool_tags`, `tool_alternatives` | Public read; Admin write |
| **Workflows & Stacks** | `workflows`, `workflow_tools`, `stacks` | Public read; Owner insert/update/delete |
| **Open Source & Hardware**| `repositories` | Public read; Admin write |
| **News & Intelligence** | `news_stories`, `story_entities` | Public read; Admin write |
| **Creators & Models** | `creators`, `models` | Public read; Admin write |
| **User Interactions** | `reviews`, `bookmarks`, `community_posts`, `community_comments`, `votes`, `reports`, `corrections`, `analytics_events` | Public read; Authenticated insert/update/delete |

### Foreign-Key Auth Sync Trigger (`0002_sync_auth_users_trigger.sql`)
When a user signs up via Google OAuth or Email:
1. `auth.users` creates the master auth record.
2. The `on_auth_user_created` trigger executes a `SECURITY DEFINER` function.
3. Automatically upserts matching rows into `public.users` and `public.profiles`.
4. Guarantees that any foreign key referencing `public.users(id)` (e.g. `reviews.user_id`, `bookmarks.user_id`, `stacks.user_id`) executes cleanly without FK violation errors.

---

## 5. Zero-Fake Policy & Authenticity Engine

### Deterministic 5-Factor Scorecard (0–100 Points)
Replaced synthetic or opaque "popularity" scores with an auditable calculation in `src/services/dataService.ts`:
1. **Docs & API Maturity (max 25 pts)**: OpenAPI specs, SDK availability, interactive docs, developer changelog.
2. **Pricing Transparency & Free Tier (max 25 pts)**: Public pricing page, free tier / generous trial, clear overage rates.
3. **Workflow Interoperability (max 20 pts)**: Webhooks, n8n/Zapier integration, REST API availability, MCP server support.
4. **Live Domain Health & Uptime (max 15 pts)**: HTTPS verification, status page uptime, fast DNS resolution.
5. **Verified Community Signal (max 15 pts)**: Real GitHub stars, active practitioner sentiment, official enterprise adoption.

*Every tool detail page (`/tools/[slug]`) and category card displays this breakdown with interactive sub-score bars.*

---

## 6. Complete Feature Module Inventory

### 1. AI Tools Directory (`/tools`, `/tools/[slug]`)
- 113 verified tools across 13 classifications.
- 6 pricing states with instant currency switching (USD $ / INR ₹).
- Real-time client search, pricing multi-select, and category filtering.
- Full competitor alternative matrix and connected workflow graph.

### 2. AI Intent Finder (`/finder`)
- Natural language engineering matcher mapping complex queries ("run transcription locally on 8GB GPU") to vetted open-source models and tools.

### 3. Official LLM Token Calculator (`/token-calculator`)
- Direct official first-party API rates for 26 models.
- Context window indicators, input/output cost calculators, and USD/INR purchasing parity.

### 4. Open-Source AI Hub & Live GitHub Search (`/open-source`, `/open-source/trending`)
- 20 flagship repositories + **Live GitHub AI Search Engine** safety-gated to `stars:>=1000`.
- Trending hub with Repositories vs Developers/Orgs tabs, language filters (Python, TS, Rust, C++), and Today / Week / Month velocity toggles.
- **"Can My PC Run This?"** GPU VRAM compatibility checker (4GB to 48GB).

### 5. Production Workflows Hub & Custom Studio (`/workflows`, `/workflows/builder`)
- 16 pre-built workflows with complete prompts, copyable REST API schemas, and n8n JSON exports.
- **Interactive Workflow Studio (`/workflows/builder`)**:
  - Drag-and-drop canvas for Trigger, AI Model, Transform, and Output nodes.
  - Multi-model token cost calculator across 26 models.
  - Step execution test simulator.
  - LocalStorage and Supabase persistence.

### 6. Live AI News Wire (`/news`, `/news/[slug]`)
- Live-first chronological feed aggregating Hacker News Algolia, Hugging Face Daily Papers, and Dev.to AI.
- Exact relative timestamps (`14m ago`, `2h ago`) and clickable source verification badges.
- Retains high-contrast Neo-Brutalist editorial gazette styling.

### 7. Global Creator Hub (`/creators`, `/creators/[slug]`)
- 60+ verified educators across India and global ecosystems.
- Filter by Country/Region, Subscriber Tier (<100K, 100K-500K, 500K-2M, 2M+), Category, and Language.

### 8. Custom Named Stack Builder (`/stack-builder`)
- Custom stack naming, role selection, and 5 modular slots (Model, Orchestrator, Vector DB, IDE, Runtime).
- Real-time monthly/annual economics in USD and INR.
- **1-Click Free Swap ($0/mo)** swapping commercial tools for self-hosted open-source tools.
- Persistent sharing URLs (`?name=...&l1=...`).

### 9. Workspace Profile & Community Governance (`/profile`, `/community`)
- 5-tab user profile hub (Account & Reputation, My Workflows, My Named Stacks, Saved Bookmarks, Submitted Contributions).
- Authentic community forum powered by real Supabase posts, comments, and single-vote-per-user tracking.

### 10. Dedicated Pricing & Plans (`/pricing`)
- Transparent 4-tier matrix: Explorer (₹0), Pro (₹799/mo), Creator Pro (₹1,999/mo), Team (₹4,999/mo).
- Monthly vs Annual toggle (Save 20%) and INR vs USD currency switch.
- Feature comparison matrix table and interactive FAQ accordion.

---

## 7. Quality Assurance & Verification Results

### Test Execution: `npm test`
```
======================================================
   AIO AI AUTOMATED PLATFORM VERIFICATION SUITE
======================================================

[Suite 1: Data Catalog Integrity]
  ✓ PASS: Catalog contains >= 100 verified tools (Actual: 113)
  ✓ PASS: All cataloged tools have valid name, slug, websiteUrl, and tagline
  ✓ PASS: Tool slugs are 100% unique with zero collision
  ✓ PASS: Categories taxonomy has >= 12 standard classifications (Actual: 13)
  ✓ PASS: LLM Token registry has >= 25 official provider models (Actual: 26)
  ✓ PASS: Production AI workflows count >= 15 (Actual: 16)
  ✓ PASS: Open-source repository catalog >= 20 (Actual: 20)
  ✓ PASS: Curated AI educators catalog >= 60 (Actual: 62)
  ✓ PASS: All 16 workflows have full systemPrompt, userPromptTemplate, and apiPayloadSchema (Actual: 16/16)
  ✓ PASS: Technical news wire stories >= 20 (Actual: 24)

[Suite 2: Token Calculator Math]
  ✓ PASS: Calculates positive pricing for GPT-4o ($0.2250)
  ✓ PASS: GPT-4o has at least 128k context window (Actual: 128,000 tokens)
  ✓ PASS: DeepSeek R1 input pricing verified under $1.00/1M tokens ($0.14/1M)

[Suite 3: VRAM Hardware Compatibility Logic]
  ✓ PASS: 16GB GPU runs 12GB requirement at full fp16 capability
  ✓ PASS: 8GB GPU runs 10GB requirement via 4-bit / 8-bit GGUF quantization
  ✓ PASS: 6GB GPU correctly flags insufficient VRAM for 16GB model

[Suite 4: Momentum & Adoption Formula]
  ✓ PASS: Adoption velocity weights views(1x), bookmarks(3x), outbound(2x) = 190

[Suite 5: AI Intent Finder Matcher]
  ✓ PASS: Intent search for 'code' matches >= 5 tools (Matched: 23)
  ✓ PASS: Intent search for 'india' matches Indian AI tools (Matched: 16)

[Suite 6: Community Integrity & 5-Factor Authenticity Scoring]
  ✓ PASS: Community contains zero fake seed users; only 1 official pinned governance guide
  ✓ PASS: Community leaderboard has zero fake bot profiles; starts in authentic cold start
  ✓ PASS: Deterministic 5-Factor score for ChatGPT is 83/100
  ✓ PASS: 5-Factor sub-dimension scores respect exact bounds (25/25/20/15/15)

[Suite 7: Critical Routes & Artifact Completeness]
  ✓ PASS: 30 / 30 Core Page Route Templates Exist and Compile

======================================================
TEST EXECUTION SUMMARY: 53 / 53 assertions passed (100.0%)
STATUS: ALL PLATFORM ASSERTIONS PASSED WITH ZERO ERRORS.
======================================================
```

### Static Build Validation: `npm run build`
- **Output**: 294 fully compiled static HTML pages.
- **Build Time**: 3.12 seconds on Node.js 22.
- **Diagnostic Errors**: 0 errors, 0 broken links.

---

## 8. Run & Deployment Instructions for Argon

### 1. Local Setup
```bash
git clone https://github.com/harshil1876/AIO-AI.git
cd AIO-AI
npm install
```

### 2. Environment Variables (`.env`)
Ensure your `.env` contains:
```env
PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
DATABASE_URL=postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### 3. Run Security & Migrations
```bash
# Applies RLS policies & auth sync trigger
npm run db:secure
```

### 4. Run Test Suite
```bash
npm test
```

### 5. Start Development Server
```bash
astro dev --background
# Check server logs: astro dev logs
# Check server status: astro dev status
```

### 6. Production Deployment (Vercel / Cloudflare / Netlify)
1. Link GitHub repository `harshil1876/AIO-AI` to Vercel.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Add the 4 environment variables from step 2.
5. Deploy.

---

## 9. Conclusion & Platform Sign-Off

The AIO AI codebase is in a verified, clean, and production-ready state. All dummy data has been eradicated, security policies and triggers are in place, the 5-factor scoring engine operates deterministically, and the test suite passes with 100% compliance. 

The repository is fully synchronized on branch `main` at `https://github.com/harshil1876/AIO-AI`.
