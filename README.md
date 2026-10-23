# AI Discovery Platform (AIO AI)

An enterprise-grade, intent-driven AI tool discovery, workflow orchestration, and model intelligence platform built with **Astro 5**, **Tailwind CSS v4**, **Drizzle ORM**, and **Supabase PostgreSQL**.

---

## 🌟 Core Pillars & Key Differentiators

1. **Zero-Emoji Vercel Aesthetic (`DESIGN.md`)**:
   - 100% of emojis have been replaced across all templates with crisp inline SVGs, dedicated category icons (`CategoryIcon.astro`), or verified domain-based favicons (`ToolLogo.astro`).
   - Clean Geist typography, hairline borders (`#ebebeb`), and responsive dark/light modes.

2. **100+ Verified AI Tools & 16 India-First Innovators**:
   - Catalog contains 113 manually audited tools across 13 core categories.
   - Dedicated spotlight for **16 verified India-First AI tools** (Sarvam AI, Krutrim, Bhashini, Karya, Qure.ai, Gnani.ai, Reverie, Yellow.ai, Haptik, Neysa, Soket AI Labs, CoRover BharatGPT, Wadhwani AI, KissanAI, MayaData OpenEBS, InVideo).
   - Strict adherence to **PRD Rule 44 (Zero Fake Activity)**: Zero fabricated user reviews, zero synthetic ratings, and zero fake vote counts. Community ratings initialize at 0 until real authenticated users submit feedback.
   - Editorial `platformScore` (0–100) and Cost-to-Value `valueScore` (0–100) with transparent evaluation criteria.

3. **Official LLM Token Calculator Suite (`/token-calculator`)**:
   - Real-time text analysis: computes **Tokens**, **Words**, **Characters (without spaces)**, and **Total Characters**.
   - Live cost computation to 6 decimal places across 13 verified official frontier models (`o3-mini`, `o1`, `gpt-4o`, `gpt-4o-mini`, `claude-3-5-sonnet`, `claude-3-5-haiku`, `gemini-2.0-flash`, `deepseek-v3`, `deepseek-r1`, `mistral-large`, `codestral`).
   - **Zero third-party aggregators**: Strictly official API rates, official endpoints, and model identifiers with one-click copy.
   - Cross-provider limits and price comparison table with real-time column sorting and search.

4. **Connected Entity Graph (`/tools/[slug]`)**:
   - Tool profiles answer: *What is it? Who is it for? What does it cost? Is there an open-source alternative?*
   - Dynamically interconnects:
     - **Used in These Workflows** (linking to `/workflows/[id]`)
     - **Creators Who Teach This Tool** (linking to `/creators/[slug]`)
     - **Open-Source Self-Hostable Alternatives** (linking to `/open-source/[slug]`)
     - **Related AI News & Breakdowns** (linking to `/news/[slug]`)
     - **Verification & Freshness Box** with verified timestamp and working correction report tickets.

5. **Global `Cmd+K` / `Ctrl+K` Command Palette**:
   - Instant keyboard-accessible modal searching across Tools, Models, Workflows, Creators, Repositories, and Utilities.

6. **Creator Discovery Hub (`/creators`)**:
   - 15+ verified top AI & Tech YouTube educators (*Andrej Karpathy, 3Blue1Brown, Matthew Berman, Prompt Engineering, Wes Roth, Yannic Kilcher, AI Jason, sentdex, Two Minute Papers, Krutrim Tech, CodeWithHarry, Krish Naik*, etc.).
   - Displays entry-point masterclasses, curriculum topics, and linked tools.

7. **Client-Side Creator Utilities Suite (`/utilities`)**:
   - 5 zero-cost, private client-side utilities running in-browser:
     1. Structured System Prompt Improver & Generator
     2. YouTube Title, Hook & Shorts Script Structurer
     3. Client-Side Image Resizer, Compressor & WebP Converter (HTML5 Canvas)
     4. Clean High-Resolution QR Code Generator (SVG & PNG)
     5. Word, Character, Sentence & Reading-Time Counter

8. **Admin Console & Validated Bulk Tool Importer (`/admin`)**:
   - Drag-and-drop CSV/JSON upload with validation for required columns, malformed URLs, and duplicate slugs.
   - Validation summary report and batch insertion into PostgreSQL.
   - User-submitted corrections and review moderation queue.

---

## 🏗️ Technology Stack

| Component | Technology | Description |
|---|---|---|
| **Framework** | **Astro 5** | High-performance SSG & SSR with client islands |
| **Styling** | **Tailwind CSS v4** | Minimalist Vercel design system (`DESIGN.md`), Geist typography |
| **Database** | **Supabase PostgreSQL** | Hosted database on port 6543 (transaction pooler with `prepare: false`) |
| **ORM** | **Drizzle ORM** | Type-safe schema definitions (`pgTable`, `jsonb`, relations) |
| **Search** | **Fuse.js** | Client-side fuzzy search across multi-domain entity index |
| **Auth** | **Supabase Auth** | Session management, login, signup, and profile bookmarks |

---

## 🗄️ Relational Database Schema (`src/db/schema.ts`)

The PostgreSQL database encompasses 11 core domains:
1. `users` & `profiles` (Authentication, roles, reputation points)
2. `categories` & `tags` (Taxonomy classification)
3. `tools` & `toolCategories` (AI catalog with 6 pricing states, verification timestamps, features, pros, cons)
4. `workflows` & `workflowSteps` (Executable recipes with server-gated premium data)
5. `repositories` (Open-source AI repos with stars, licenses, minimum VRAM requirements)
6. `newsStories` & `storyEntities` (Industry developments linked to catalog entities)
7. `creators` (YouTube educators with topics taught and top video links)
8. `models` (Official LLM catalog for the Token Calculator suite)
9. `reviews` (Authentic community reviews with helpful votes)
10. `bookmarks` & `stacks` (User-saved tools and custom multi-tool stacks)
11. `communityPosts`, `votes`, `reports`, `corrections` (Community threads, anti-gaming votes, and data correction tickets)

---

## 🚀 Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and provide your Supabase PostgreSQL credentials:
```bash
cp .env.example .env
```
*(If no `DATABASE_URL` is set, the application automatically runs in resilient offline fallback mode using `seedData.ts`.)*

### 3. Database Migration & Seed
```bash
# Push schema to Supabase PostgreSQL
npm run db:push

# Seed categories, 113 tools, workflows, creators, repos, and models
npm run db:seed
```

### 4. Start Development Server
```bash
# Recommended: background mode
astro dev --background

# Check status
astro dev status

# Stop server
astro dev stop
```

### 5. Build for Production
```bash
npm run build
```

---

## 📜 Route Inventory

- **Core Discovery**: `/`, `/tools`, `/tools/[slug]`, `/compare`, `/finder`, `/categories`, `/stack-builder`
- **Model Intelligence**: `/token-calculator`, `/token-calculator/models`, `/token-calculator/models/[id]`, `/token-calculator/compare`
- **Creator Hub**: `/creators`, `/creators/[slug]`
- **Open-Source Hub**: `/open-source`, `/open-source/trending`, `/open-source/[slug]`
- **News**: `/news`, `/news/daily`, `/news/[slug]`
- **Utilities**: `/utilities`
- **Community & Submissions**: `/community`, `/submit`
- **Auth & Profiles**: `/login`, `/signup`, `/profile`
- **Administration**: `/admin`
- **SEO & Search Engines**: `/sitemap.xml`, `/robots.txt`
