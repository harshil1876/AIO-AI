# AIO AI — The Unified AI Discovery, Workflow & Intelligence Platform

[![Verification Suite](https://img.shields.io/badge/Verification%20Suite-46%2F46%20Passing-emerald)](https://github.com/harshil1876/AIO-AI)
[![Database](https://img.shields.io/badge/Supabase%20PostgreSQL-24%20Tables%20RLS-blue)](https://supabase.com)
[![Framework](https://img.shields.io/badge/Astro-5.x%20%7C%20Tailwind%20v4-black)](https://astro.build)

**AIO AI** (`harshil1876/AIO-AI`) is a production-grade, intent-driven AI discovery, workflow orchestration, model benchmark, and creator intelligence platform. Built for software engineers, product founders, and technical practitioners running AI in production.

---

## Key Platform Features

1. **AI Tools Directory (`/tools`, `/tools/[slug]`)**:
   - 113+ verified AI tools across 13 standard taxonomy classifications.
   - 6 pricing states (`free`, `freemium`, `free_trial`, `paid`, `open_source`, `unknown`) with USD ($) and INR (₹) currency conversions.
   - Dedicated spotlight for **16 India-First Sovereign AI tools** (Sarvam AI, Krutrim, Bhashini, Qure.ai, Soket AI Labs, etc.).
   - Connected entity graph: links directly to production workflows, YouTube educators who teach the tool, and self-hostable open-source alternatives.
   - **PRD Rule 44 (Zero Fake Reviews)**: Zero fabricated ratings or bot comments. Real authenticated reviews sync directly to PostgreSQL.

2. **AI Intent-Based Finder (`/finder`)**:
   - Conversational intent matching engine mapping natural language engineering problems (e.g., "transcribe Hindi video on 8GB GPU", "automated PR review webhook") directly to verified tools and open-source models.

3. **Official LLM Token Calculator Suite (`/token-calculator`)**:
   - Live cost counter with 6 decimal places across 26 official frontier models (OpenAI, Anthropic, Google, DeepSeek, Mistral, Meta, Qwen, xAI).
   - Zero third-party aggregator pricing; strictly official first-party API rates.
   - Live text metrics: Tokens, Words, Characters without spaces, and Estimated Latency.

4. **Production AI Workflows Hub (`/workflows`, `/workflows/[id]`)**:
   - 16+ production-ready workflows with 1-click **"Copy Valid n8n JSON"** and interactive Node Inspector drawers.

5. **Open-Source AI Hub (`/open-source`, `/open-source/trending`, `/[slug]`)**:
   - 20+ top AI repositories with live GitHub stars, forks, open issues, and latest release tags.
   - Interactive **"Can My PC Run This?"** GPU hardware checker assessing VRAM suitability across 4GB, 6GB, 8GB, 12GB, 16GB, 24GB, and 48GB cards.

6. **Daily AI News Wire (`/news`, `/news/[slug]`)**:
   - High-contrast Neo-Brutalist technical dispatch ticker.
   - Real-time Algolia HN AI and ArXiv research integration.
   - "60s Bullet Mode" toggle, 30-second technical TL;DR, and practitioner discussion thread.

7. **Curated AI & Tech Educators Hub (`/creators`, `/creators/[slug]`)**:
   - 18+ verified YouTube AI creators (Andrej Karpathy, 3Blue1Brown, Matthew Berman, CodeWithHarry, etc.) with 3 structured learning tracks.

8. **Interactive AI Stack Builder (`/stack-builder`)**:
   - Assemble role-specific stacks (Creator, Engineer, Marketer, India-First Enterprise).
   - Real-time cloud subscription cost vs. 100% free open-source alternative comparison.
   - Public stack saving and persistent sharing links (`/stack-builder?stackId=...`).

9. **Security, Compliance & Community Governance**:
   - Row Level Security (RLS) enabled across all 24 Supabase PostgreSQL tables.
   - Automated `auth.users` ↔ `public.users` sync trigger.
   - Mandatory legal pages: `/privacy`, `/terms`, `/guidelines`, and `/disclosure`.
   - Custom `/404` page with embedded AI Finder search bar.

---

## Quickstart & Local Development

### Prerequisites
- Node.js `>=22.12.0`
- npm or pnpm

### 1. Installation
```bash
git clone https://github.com/harshil1876/AIO-AI.git
cd AIO-AI
npm install
```

### 2. Environment Setup
Copy the template and configure your Supabase credentials:
```bash
cp .env.example .env
```

### 3. Database Security & Migrations
To apply Row Level Security policies and auth synchronization triggers to your PostgreSQL database:
```bash
npm run db:secure
```

### 4. Run Automated Verification Tests
```bash
npm test
```
*Executes 46 automated assertions validating data integrity, ranking mathematics, token costs, VRAM logic, and route completeness.*

### 5. Start Development Server
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### 6. Production Static Build
```bash
npm run build
```
Compiles 240+ optimized static HTML pages in `< 5 seconds`.

---

## Database Architecture (PostgreSQL / Supabase)

The platform utilizes a relational entity graph managed via **Drizzle ORM** with 24 tables:
- `users` (with `auth_id uuid UNIQUE` synced via trigger to `auth.users`)
- `profiles` (usernames, avatars, reputation points)
- `tools`, `categories`, `tags`, `tool_categories`, `tool_tags`, `tool_alternatives`
- `workflows`, `workflow_tools`
- `repositories` (open-source repos with VRAM requirements)
- `news_stories`, `story_entities`
- `creators` (curated YouTube AI channels)
- `models` (official token pricing registry)
- `reviews`, `bookmarks`, `stacks`, `community_posts`, `community_comments`, `votes`, `reports`, `corrections`, `analytics_events`

---

## License

Code is licensed under the [MIT License](LICENSE).
Directory metadata, reviews, and editorial benchmark scores are copyright © 2026 AIO AI Platform.
