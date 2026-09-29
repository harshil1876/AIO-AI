# AI Discovery Platform - Implementation Plan

## A. Product Map
1. **Discover**: Homepage, Tools Directory, Categories, Trending, New, Free, Indian AI
2. **AI Finder**: Task-based search, Recommendations, Comparisons
3. **News**: Daily AI briefing, topics, entity-linked stories
4. **Open Source**: Repositories, Trending, Categories
5. **Workflows**: Browse, free/freemium/paid, workflow previews
6. **Creators**: Channels, rankings, analytics
7. **Community**: Discussions, reviews, show & tell
8. **My AI**: Bookmarks, collections, history
9. **Utilities**: Built-in mini-tools (PDF, image, prompt improver)
10. **Admin**: Dashboard, moderation, tool import, entity management

## B. MVP Scope
### MUST
- Homepage
- Tool directory & detail pages
- Search and filtering (Categories, Pricing, Indian AI)
- Authentication
- Bookmarks & Reviews
- Basic Community (discussions)
- Admin tool management & Tool import
- Basic AI Finder (metadata/rules-based)
- SEO foundation & Analytics events
- Small set of built-in utilities

### SHOULD
- Trending/new/free sorting
- Basic Rankings (Platform Score, Community Rating)

### LATER
- Executable workflow engine
- Native mobile apps
- Full creator analytics suite
- Large-scale premium marketplace
- Public API billing
- Complex recommendation ML
- Multi-provider workflow compilation

## C. Architecture
- **Framework**: Astro (SSG/SSR) with React components.
- **Database**: PostgreSQL (via Supabase or Neon for free tier).
- **ORM**: Drizzle ORM for type-safe DB access (lightweight and edge-compatible).
- **Auth**: Supabase Auth or Auth.js for managed free-tier auth.
- **Styling**: Tailwind CSS v4 (using the Vercel-inspired DESIGN.md guidelines).
- **Storage**: Supabase Storage for images/logos.
- **Search**: PostgreSQL Full Text Search (can migrate to vector search later).
- **Analytics**: Lightweight custom DB events or PostHog.
- **Hosting**: Vercel (free tier friendly).

## D. Database Schema (Core Entities)
- `User`: id, email, role, created_at
- `Profile`: id, user_id, username, bio, avatar_url
- `Tool`: id, slug, name, tagline, description, website_url, pricing_type, is_verified, platform_score, created_at
- `Category`: id, slug, name, description
- `ToolCategory`: tool_id, category_id
- `Review`: id, tool_id, user_id, rating, content, created_at
- `Bookmark`: id, user_id, tool_id, created_at
- `CommunityPost`: id, user_id, title, content, type, upvotes, created_at

## E. Route Map
- **Public**: `/`, `/tools`, `/tools/[slug]`, `/categories`, `/news`, `/open-source`, `/workflows`, `/creators`, `/community`, `/finder`, `/utilities`
- **Authenticated**: `/my-ai`, `/settings`, `/community/new`
- **Admin**: `/admin`, `/admin/tools`, `/admin/users`, `/admin/import`

## F. Component Map
- **Layout**: Header, Footer, AdminSidebar
- **Cards**: ToolCard, NewsCard, RepoCard, WorkflowCard, CreatorCard
- **UI Base**: Button, Input, Select, Modal, Badge (Vercel-style aesthetics)
- **Forms**: ReviewForm, PostForm, ToolSubmitForm

## G. API/Service Map
- `/api/tools`: CRUD tools, search, filter
- `/api/finder`: Metadata-based recommendation logic
- `/api/community`: Posts, upvotes, reviews
- `/api/admin`: Moderation, imports

## H. Testing Plan
- **E2E**: Search -> Filter -> View Tool -> Bookmark -> Review
- **Auth**: Signup, login, protected routes
- **Admin**: Permission checks, tool import validation
- **SEO**: Meta tags generation for tool pages
