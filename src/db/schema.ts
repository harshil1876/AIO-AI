import { pgTable, serial, text, varchar, timestamp, boolean, integer, numeric, jsonb, primaryKey } from 'drizzle-orm/pg-core';

// -------------------------------------------------------------
// 1. Users & Profiles
// -------------------------------------------------------------
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 50 }).default('user'), // 'user' | 'moderator' | 'admin'
  plan: varchar('plan', { length: 50 }).default('free'), // 'free' | 'pro' | 'creator_pro' | 'business'
  reputationPoints: integer('reputation_points').default(0),
  followedTopics: jsonb('followed_topics').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
});

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  username: varchar('username', { length: 255 }).unique(),
  fullName: varchar('full_name', { length: 255 }),
  bio: text('bio'),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  websiteUrl: varchar('website_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// -------------------------------------------------------------
// 2. Categories & Tags
// -------------------------------------------------------------
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  iconName: varchar('icon_name', { length: 100 }).default('general-chatbots'),
  displayOrder: integer('display_order').default(0),
});

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
});

// -------------------------------------------------------------
// 3. AI Tools (Full PRD Specification)
// -------------------------------------------------------------
export const tools = pgTable('tools', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  tagline: varchar('tagline', { length: 500 }),
  description: text('description'),
  websiteUrl: varchar('website_url', { length: 500 }).notNull(),
  affiliateUrl: varchar('affiliate_url', { length: 500 }),
  githubUrl: varchar('github_url', { length: 500 }),
  logoUrl: varchar('logo_url', { length: 500 }),
  companyName: varchar('company_name', { length: 255 }),
  
  // Pricing states (PRD Section 11): 'free' | 'freemium' | 'free_trial' | 'paid' | 'open_source' | 'unknown'
  pricingState: varchar('pricing_state', { length: 50 }).notNull().default('freemium'),
  startingPrice: varchar('starting_price', { length: 100 }),
  currency: varchar('currency', { length: 10 }).default('USD'), // 'USD' | 'INR' | 'EUR'
  billingPeriod: varchar('billing_period', { length: 50 }), // 'monthly' | 'yearly' | 'one-time' | 'usage'
  hasFreePlan: boolean('has_free_plan').default(false),
  hasFreeTrial: boolean('has_free_trial').default(false),
  priceSourceUrl: varchar('price_source_url', { length: 500 }),
  priceCheckedAt: timestamp('price_checked_at'),
  
  // Deployment & Audience
  deploymentTypes: jsonb('deployment_types').$type<string[]>().default(['cloud']), // 'cloud' | 'self_hosted' | 'local' | 'api'
  targetAudience: jsonb('target_audience').$type<string[]>().default([]),
  
  // Features, Use Cases, Pros & Cons
  features: jsonb('features').$type<string[]>().default([]),
  useCases: jsonb('use_cases').$type<string[]>().default([]),
  pros: jsonb('pros').$type<string[]>().default([]),
  cons: jsonb('cons').$type<string[]>().default([]),
  
  // India-First & Open-Source Flags
  isIndiaFirst: boolean('is_india_first').default(false),
  indianLanguages: jsonb('indian_languages').$type<string[]>().default([]),
  isOpenSource: boolean('is_open_source').default(false),
  isSponsored: boolean('is_sponsored').default(false),
  
  // Verification & Moderation Status
  verificationStatus: varchar('verification_status', { length: 50 }).default('verified'), // 'verified' | 'needs_review' | 'reported' | 'deprecated' | 'draft'
  lastVerifiedAt: timestamp('last_verified_at').defaultNow(),
  verifiedSourceUrl: varchar('verified_source_url', { length: 500 }),
  
  // Editorial and Community Scoring
  platformScore: integer('platform_score').default(85), // Editorial 0-100 score
  valueScore: integer('value_score').default(85), // Cost-to-value 0-100 score
  communityRating: numeric('community_rating', { precision: 3, scale: 2 }), // Null until real users rate
  reviewCount: integer('review_count').default(0), // Count of real user reviews
  bookmarkCount: integer('bookmark_count').default(0),
  viewCount: integer('view_count').default(0),
  outboundClickCount: integer('outbound_click_count').default(0),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const toolCategories = pgTable('tool_categories', {
  toolId: integer('tool_id').references(() => tools.id, { onDelete: 'cascade' }).notNull(),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'cascade' }).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.toolId, t.categoryId] }),
}));

export const toolTags = pgTable('tool_tags', {
  toolId: integer('tool_id').references(() => tools.id, { onDelete: 'cascade' }).notNull(),
  tagId: integer('tag_id').references(() => tags.id, { onDelete: 'cascade' }).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.toolId, t.tagId] }),
}));

export const toolAlternatives = pgTable('tool_alternatives', {
  toolId: integer('tool_id').references(() => tools.id, { onDelete: 'cascade' }).notNull(),
  alternativeSlug: varchar('alternative_slug', { length: 255 }).notNull(),
  reason: text('reason'),
}, (t) => ({
  pk: primaryKey({ columns: [t.toolId, t.alternativeSlug] }),
}));

// -------------------------------------------------------------
// 4. Workflows (Multi-step Executable AI Blueprints)
// -------------------------------------------------------------
export const workflows = pgTable('workflows', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  purpose: varchar('purpose', { length: 500 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  difficulty: varchar('difficulty', { length: 50 }).default('intermediate'), // 'beginner' | 'intermediate' | 'advanced'
  pricingTier: varchar('pricing_tier', { length: 50 }).default('freemium'), // 'free' | 'freemium' | 'paid'
  estimatedMonthlyCost: varchar('estimated_monthly_cost', { length: 100 }),
  costAssumptions: text('cost_assumptions'),
  platforms: jsonb('platforms').$type<string[]>().default([]),
  requiredCredentials: jsonb('required_credentials').$type<string[]>().default([]),
  nodeDiagram: jsonb('node_diagram').$type<any>().default([]),
  basicSteps: jsonb('basic_steps').$type<any>().default([]),
  
  // Server-gated premium data (PRD Section 18 & 30)
  isPremium: boolean('is_premium').default(false),
  premiumPrompts: jsonb('premium_prompts').$type<any>().default([]),
  premiumExportJson: jsonb('premium_export_json').$type<any>().default({}),
  troubleshootingGuide: text('troubleshooting_guide'),
  
  saveCount: integer('save_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const workflowTools = pgTable('workflow_tools', {
  workflowId: integer('workflow_id').references(() => workflows.id, { onDelete: 'cascade' }).notNull(),
  toolSlug: varchar('tool_slug', { length: 255 }).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.workflowId, t.toolSlug] }),
}));

// -------------------------------------------------------------
// 5. Open-Source Repositories
// -------------------------------------------------------------
export const repositories = pgTable('repositories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  owner: varchar('owner', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  githubUrl: varchar('github_url', { length: 500 }).notNull(),
  description: text('description').notNull(),
  beginnerExplanation: text('beginner_explanation'),
  setupGuide: text('setup_guide'),
  language: varchar('language', { length: 100 }),
  license: varchar('license', { length: 100 }),
  stars: integer('stars').default(0),
  forks: integer('forks').default(0),
  starsWeekly: integer('stars_weekly').default(0),
  openIssues: integer('open_issues').default(0),
  difficulty: varchar('difficulty', { length: 50 }).default('intermediate'), // 'beginner' | 'intermediate' | 'advanced'
  aiCategory: varchar('ai_category', { length: 100 }),
  deploymentTypes: jsonb('deployment_types').$type<string[]>().default(['local']),
  minVramGb: numeric('min_vram_gb', { precision: 4, scale: 1 }).default('0'),
  lastCommitAt: timestamp('last_commit_at'),
  metricsFetchedAt: timestamp('metrics_fetched_at').defaultNow(),
  platformSaves: integer('platform_saves').default(0),
});

// -------------------------------------------------------------
// 6. News Stories & Story Entities
// -------------------------------------------------------------
export const newsStories = pgTable('news_stories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  headline: varchar('headline', { length: 500 }).notNull(),
  summary: text('summary').notNull(),
  whyItMatters: text('why_it_matters'),
  sourceName: varchar('source_name', { length: 255 }).notNull(),
  sourceUrl: varchar('source_url', { length: 500 }).notNull(),
  topic: varchar('topic', { length: 100 }).notNull(),
  isIndiaNews: boolean('is_india_news').default(false),
  status: varchar('status', { length: 50 }).default('published'), // 'draft' | 'reviewed' | 'published' | 'corrected'
  publishedAt: timestamp('published_at').defaultNow(),
  retrievedAt: timestamp('retrieved_at').defaultNow(),
});

export const storyEntities = pgTable('story_entities', {
  id: serial('id').primaryKey(),
  storyId: integer('story_id').references(() => newsStories.id, { onDelete: 'cascade' }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // 'tool' | 'repository' | 'workflow' | 'creator' | 'model'
  entitySlug: varchar('entity_slug', { length: 255 }).notNull(),
});

// -------------------------------------------------------------
// 7. YouTube Creators Discovery (AI & Tech Educators)
// -------------------------------------------------------------
export const creators = pgTable('creators', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  channelName: varchar('channel_name', { length: 255 }).notNull(),
  handle: varchar('handle', { length: 100 }).notNull(),
  youtubeUrl: varchar('youtube_url', { length: 500 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  description: text('description').notNull(),
  primaryCategory: varchar('primary_category', { length: 100 }).notNull(), // 'AI News' | 'AI Tools' | 'AI Tutorials' | 'AI Coding' | 'AI Agents' | 'Automation' | 'AI Research' | 'Indian AI'
  difficulty: varchar('difficulty', { length: 50 }).default('all-levels'), // 'beginner' | 'intermediate' | 'advanced' | 'all-levels'
  isIndiaCreator: boolean('is_india_creator').default(false),
  subscribersEstimate: varchar('subscribers_estimate', { length: 50 }),
  avgViewsEstimate: varchar('avg_views_estimate', { length: 50 }),
  uploadCadence: varchar('upload_cadence', { length: 100 }),
  topTopics: jsonb('top_topics').$type<string[]>().default([]),
  topVideos: jsonb('top_videos').$type<any>().default([]),
  toolsTaught: jsonb('tools_taught').$type<string[]>().default([]),
  educationalScore: integer('educational_score').default(92),
  metricsCheckedAt: timestamp('metrics_checked_at').defaultNow(),
});

// -------------------------------------------------------------
// 8. Official LLM Models (Token Calculator Suite)
// -------------------------------------------------------------
export const models = pgTable('models', {
  id: varchar('id', { length: 100 }).primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  provider: varchar('provider', { length: 100 }).notNull(), // 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek' | 'Mistral'
  providerSlug: varchar('provider_slug', { length: 100 }).notNull(),
  description: text('description'),
  modelIdentifier: varchar('model_identifier', { length: 255 }).notNull(),
  endpointUrl: varchar('endpoint_url', { length: 500 }).notNull(),
  officialDocsUrl: varchar('official_docs_url', { length: 500 }).notNull(),
  contextWindow: integer('context_window').notNull(),
  maxOutputTokens: integer('max_output_tokens').notNull(),
  inputCostPer1M: numeric('input_cost_per_1m', { precision: 8, scale: 4 }).notNull(),
  outputCostPer1M: numeric('output_cost_per_1m', { precision: 8, scale: 4 }).notNull(),
  inputCostPer1K: numeric('input_cost_per_1k', { precision: 8, scale: 6 }).notNull(),
  outputCostPer1K: numeric('output_cost_per_1k', { precision: 8, scale: 6 }).notNull(),
  status: varchar('status', { length: 50 }).default('Active'), // 'Active' | 'Preview'
  lastVerifiedAt: timestamp('last_verified_at').defaultNow(),
});

// -------------------------------------------------------------
// 9. Community, Trust & User Activity Tables
// -------------------------------------------------------------
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  toolId: integer('tool_id').references(() => tools.id, { onDelete: 'cascade' }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  authorName: varchar('author_name', { length: 255 }).notNull(),
  rating: integer('rating').notNull(), // 1 to 5
  content: text('content').notNull(),
  pros: text('pros'),
  cons: text('cons'),
  verifiedUser: boolean('verified_user').default(false),
  helpfulVotes: integer('helpful_votes').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const bookmarks = pgTable('bookmarks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // 'tool' | 'workflow' | 'repository' | 'creator' | 'model'
  entitySlug: varchar('entity_slug', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const stacks = pgTable('stacks', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  authorName: varchar('author_name', { length: 255 }).default('Anonymous'),
  description: text('description'),
  tools: jsonb('tools').$type<string[]>().default([]), // array of tool slugs
  estimatedMonthlyCost: varchar('estimated_monthly_cost', { length: 100 }),
  isPublic: boolean('is_public').default(true),
  saveCount: integer('save_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const communityPosts = pgTable('community_posts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  authorName: varchar('author_name', { length: 255 }).notNull(),
  title: varchar('title', { length: 500 }).notNull(),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).default('discussion'), // 'discussion' | 'question' | 'showcase' | 'workflow'
  category: varchar('category', { length: 100 }).default('General'),
  upvotes: integer('upvotes').default(0),
  commentCount: integer('comment_count').default(0),
  isPinned: boolean('is_pinned').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const communityComments = pgTable('community_comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => communityPosts.id, { onDelete: 'cascade' }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  authorName: varchar('author_name', { length: 255 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const votes = pgTable('votes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  targetType: varchar('target_type', { length: 50 }).notNull(), // 'post' | 'review' | 'workflow'
  targetId: integer('target_id').notNull(),
  voteType: varchar('vote_type', { length: 10 }).notNull(), // 'up' | 'down'
  createdAt: timestamp('created_at').defaultNow(),
});

export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  targetType: varchar('target_type', { length: 50 }).notNull(), // 'post' | 'comment' | 'review' | 'tool'
  targetId: integer('target_id').notNull(),
  reason: text('reason').notNull(),
  status: varchar('status', { length: 50 }).default('pending'), // 'pending' | 'resolved' | 'dismissed'
  createdAt: timestamp('created_at').defaultNow(),
});

export const corrections = pgTable('corrections', {
  id: serial('id').primaryKey(),
  toolSlug: varchar('tool_slug', { length: 255 }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  authorEmail: varchar('author_email', { length: 255 }),
  fieldName: varchar('field_name', { length: 100 }).notNull(), // 'pricing' | 'broken_link' | 'deprecated' | 'features' | 'other'
  suggestedValue: text('suggested_value').notNull(),
  proofUrl: varchar('proof_url', { length: 500 }),
  status: varchar('status', { length: 50 }).default('pending'), // 'pending' | 'approved' | 'rejected'
  createdAt: timestamp('created_at').defaultNow(),
});

export const analyticsEvents = pgTable('analytics_events', {
  id: serial('id').primaryKey(),
  eventType: varchar('event_type', { length: 100 }).notNull(), // 'tool_view' | 'outbound_click' | 'search' | 'finder_run' | 'utility_use'
  entityType: varchar('entity_type', { length: 50 }),
  entitySlug: varchar('entity_slug', { length: 255 }),
  metadata: jsonb('metadata').$type<any>().default({}),
  createdAt: timestamp('created_at').defaultNow(),
});
