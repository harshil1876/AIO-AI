# AI Discovery Platform

A unified platform for AI tools, AI news, open source, workflows, creator intelligence, and community.

## Architecture

This project is built using:
- **Framework**: [Astro](https://astro.build/) for excellent SSR/SSG and fast page loads.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a custom minimal design system (Vercel-inspired Geist aesthetic).
- **Database**: PostgreSQL (via Supabase, Neon, or local).
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) for type-safe database interactions.
- **Authentication**: Designed for managed auth providers like Supabase Auth or Auth.js.

## Setup & Local Development

1. **Install dependencies**:
   ```sh
   npm install
   ```

2. **Set up Environment Variables**:
   Copy `.env.example` to `.env` and fill in your connection details.
   ```sh
   cp .env.example .env
   ```

3. **Database Migration**:
   To push the schema to your database:
   ```sh
   npx drizzle-kit push
   ```
   Or generate migrations:
   ```sh
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

4. **Start Development Server**:
   ```sh
   npm run dev
   ```

## Seed Data

To populate the database with an initial catalog, use the admin import tool or run a seed script. We prioritize high-quality initial data (100-300 records) rather than scraping thousands of unverified tools.
*Note: A `db/seed.ts` script is recommended to be written before production launch to standardize categories.*

## Admin Setup

The `/admin` dashboard allows you to:
- Manage and verify tools
- Import CSV/JSON tool lists
- Moderate community reviews
- View basic platform analytics

Admin routes require authentication and the `role` field in the `users` table to be set to `admin`.

## Testing

Run tests before deployment:
- **Unit/Integration**: Configured via Vitest (add to `package.json`).
- **E2E**: Use Playwright to verify critical user journeys (Tool Discovery, AI Finder, Workflows).
- **SEO/Accessibility**: Lighthouse checks on tool and category pages.

## Known Limitations (MVP)

- **AI Finder**: Currently rules-based. Full semantic retrieval and LLM reasoning are planned for later.
- **Auth**: Placeholders exist, but production Oauth/credentials must be hooked up to your provider.
- **Workflows**: The marketplace is for browsing static workflows. Executable compilation (n8n/Zapier) is a future phase.

## Future Roadmap

- Executable workflow engine
- Native mobile apps
- Full creator analytics suite
- Complex recommendation ML
- Large-scale premium marketplace

See the full PRD and `docs/IMPLEMENTATION_PLAN.md` for more details.
