CREATE TABLE "analytics_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"entity_type" varchar(50),
	"entity_slug" varchar(255),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_slug" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"icon_name" varchar(100) DEFAULT 'general-chatbots',
	"display_order" integer DEFAULT 0,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "community_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"user_id" integer,
	"author_name" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "community_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"author_name" varchar(255) NOT NULL,
	"title" varchar(500) NOT NULL,
	"content" text NOT NULL,
	"type" varchar(50) DEFAULT 'discussion',
	"category" varchar(100) DEFAULT 'General',
	"upvotes" integer DEFAULT 0,
	"comment_count" integer DEFAULT 0,
	"is_pinned" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "corrections" (
	"id" serial PRIMARY KEY NOT NULL,
	"tool_slug" varchar(255) NOT NULL,
	"user_id" integer,
	"author_email" varchar(255),
	"field_name" varchar(100) NOT NULL,
	"suggested_value" text NOT NULL,
	"proof_url" varchar(500),
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "creators" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"channel_name" varchar(255) NOT NULL,
	"handle" varchar(100) NOT NULL,
	"youtube_url" varchar(500) NOT NULL,
	"avatar_url" varchar(500),
	"description" text NOT NULL,
	"primary_category" varchar(100) NOT NULL,
	"difficulty" varchar(50) DEFAULT 'all-levels',
	"is_india_creator" boolean DEFAULT false,
	"subscribers_estimate" varchar(50),
	"avg_views_estimate" varchar(50),
	"upload_cadence" varchar(100),
	"top_topics" jsonb DEFAULT '[]'::jsonb,
	"top_videos" jsonb DEFAULT '[]'::jsonb,
	"tools_taught" jsonb DEFAULT '[]'::jsonb,
	"educational_score" integer DEFAULT 92,
	"metrics_checked_at" timestamp DEFAULT now(),
	CONSTRAINT "creators_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "models" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"provider" varchar(100) NOT NULL,
	"provider_slug" varchar(100) NOT NULL,
	"description" text,
	"model_identifier" varchar(255) NOT NULL,
	"endpoint_url" varchar(500) NOT NULL,
	"official_docs_url" varchar(500) NOT NULL,
	"context_window" integer NOT NULL,
	"max_output_tokens" integer NOT NULL,
	"input_cost_per_1m" numeric(8, 4) NOT NULL,
	"output_cost_per_1m" numeric(8, 4) NOT NULL,
	"input_cost_per_1k" numeric(8, 6) NOT NULL,
	"output_cost_per_1k" numeric(8, 6) NOT NULL,
	"status" varchar(50) DEFAULT 'Active',
	"last_verified_at" timestamp DEFAULT now(),
	CONSTRAINT "models_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "news_stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"headline" varchar(500) NOT NULL,
	"summary" text NOT NULL,
	"why_it_matters" text,
	"source_name" varchar(255) NOT NULL,
	"source_url" varchar(500) NOT NULL,
	"topic" varchar(100) NOT NULL,
	"is_india_news" boolean DEFAULT false,
	"status" varchar(50) DEFAULT 'published',
	"published_at" timestamp DEFAULT now(),
	"retrieved_at" timestamp DEFAULT now(),
	CONSTRAINT "news_stories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"username" varchar(255),
	"full_name" varchar(255),
	"bio" text,
	"avatar_url" varchar(500),
	"website_url" varchar(500),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"target_type" varchar(50) NOT NULL,
	"target_id" integer NOT NULL,
	"reason" text NOT NULL,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "repositories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"owner" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"github_url" varchar(500) NOT NULL,
	"description" text NOT NULL,
	"beginner_explanation" text,
	"setup_guide" text,
	"language" varchar(100),
	"license" varchar(100),
	"stars" integer DEFAULT 0,
	"forks" integer DEFAULT 0,
	"stars_weekly" integer DEFAULT 0,
	"open_issues" integer DEFAULT 0,
	"difficulty" varchar(50) DEFAULT 'intermediate',
	"ai_category" varchar(100),
	"deployment_types" jsonb DEFAULT '["local"]'::jsonb,
	"min_vram_gb" numeric(4, 1) DEFAULT '0',
	"last_commit_at" timestamp,
	"metrics_fetched_at" timestamp DEFAULT now(),
	"platform_saves" integer DEFAULT 0,
	CONSTRAINT "repositories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"tool_id" integer NOT NULL,
	"user_id" integer,
	"author_name" varchar(255) NOT NULL,
	"rating" integer NOT NULL,
	"content" text NOT NULL,
	"pros" text,
	"cons" text,
	"verified_user" boolean DEFAULT false,
	"helpful_votes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"user_id" integer,
	"author_name" varchar(255) DEFAULT 'Anonymous',
	"description" text,
	"tools" jsonb DEFAULT '[]'::jsonb,
	"estimated_monthly_cost" varchar(100),
	"is_public" boolean DEFAULT true,
	"save_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "stacks_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "story_entities" (
	"id" serial PRIMARY KEY NOT NULL,
	"story_id" integer NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_slug" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "tool_alternatives" (
	"tool_id" integer NOT NULL,
	"alternative_slug" varchar(255) NOT NULL,
	"reason" text,
	CONSTRAINT "tool_alternatives_tool_id_alternative_slug_pk" PRIMARY KEY("tool_id","alternative_slug")
);
--> statement-breakpoint
CREATE TABLE "tool_categories" (
	"tool_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "tool_categories_tool_id_category_id_pk" PRIMARY KEY("tool_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "tool_tags" (
	"tool_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "tool_tags_tool_id_tag_id_pk" PRIMARY KEY("tool_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"tagline" varchar(500),
	"description" text,
	"website_url" varchar(500) NOT NULL,
	"affiliate_url" varchar(500),
	"github_url" varchar(500),
	"logo_url" varchar(500),
	"company_name" varchar(255),
	"pricing_state" varchar(50) DEFAULT 'freemium' NOT NULL,
	"starting_price" varchar(100),
	"currency" varchar(10) DEFAULT 'USD',
	"billing_period" varchar(50),
	"has_free_plan" boolean DEFAULT false,
	"has_free_trial" boolean DEFAULT false,
	"price_source_url" varchar(500),
	"price_checked_at" timestamp,
	"deployment_types" jsonb DEFAULT '["cloud"]'::jsonb,
	"target_audience" jsonb DEFAULT '[]'::jsonb,
	"features" jsonb DEFAULT '[]'::jsonb,
	"use_cases" jsonb DEFAULT '[]'::jsonb,
	"pros" jsonb DEFAULT '[]'::jsonb,
	"cons" jsonb DEFAULT '[]'::jsonb,
	"is_india_first" boolean DEFAULT false,
	"indian_languages" jsonb DEFAULT '[]'::jsonb,
	"is_open_source" boolean DEFAULT false,
	"is_sponsored" boolean DEFAULT false,
	"verification_status" varchar(50) DEFAULT 'verified',
	"last_verified_at" timestamp DEFAULT now(),
	"verified_source_url" varchar(500),
	"platform_score" integer DEFAULT 85,
	"value_score" integer DEFAULT 85,
	"community_rating" numeric(3, 2),
	"review_count" integer DEFAULT 0,
	"bookmark_count" integer DEFAULT 0,
	"view_count" integer DEFAULT 0,
	"outbound_click_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "tools_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'user',
	"plan" varchar(50) DEFAULT 'free',
	"reputation_points" integer DEFAULT 0,
	"followed_topics" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"target_type" varchar(50) NOT NULL,
	"target_id" integer NOT NULL,
	"vote_type" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "workflow_tools" (
	"workflow_id" integer NOT NULL,
	"tool_slug" varchar(255) NOT NULL,
	CONSTRAINT "workflow_tools_workflow_id_tool_slug_pk" PRIMARY KEY("workflow_id","tool_slug")
);
--> statement-breakpoint
CREATE TABLE "workflows" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"purpose" varchar(500) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"difficulty" varchar(50) DEFAULT 'intermediate',
	"pricing_tier" varchar(50) DEFAULT 'freemium',
	"estimated_monthly_cost" varchar(100),
	"cost_assumptions" text,
	"platforms" jsonb DEFAULT '[]'::jsonb,
	"required_credentials" jsonb DEFAULT '[]'::jsonb,
	"node_diagram" jsonb DEFAULT '[]'::jsonb,
	"basic_steps" jsonb DEFAULT '[]'::jsonb,
	"is_premium" boolean DEFAULT false,
	"premium_prompts" jsonb DEFAULT '[]'::jsonb,
	"premium_export_json" jsonb DEFAULT '{}'::jsonb,
	"troubleshooting_guide" text,
	"save_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "workflows_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_comments" ADD CONSTRAINT "community_comments_post_id_community_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_comments" ADD CONSTRAINT "community_comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "corrections" ADD CONSTRAINT "corrections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stacks" ADD CONSTRAINT "stacks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_entities" ADD CONSTRAINT "story_entities_story_id_news_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."news_stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_alternatives" ADD CONSTRAINT "tool_alternatives_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_categories" ADD CONSTRAINT "tool_categories_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_categories" ADD CONSTRAINT "tool_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_tags" ADD CONSTRAINT "tool_tags_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_tags" ADD CONSTRAINT "tool_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_tools" ADD CONSTRAINT "workflow_tools_workflow_id_workflows_id_fk" FOREIGN KEY ("workflow_id") REFERENCES "public"."workflows"("id") ON DELETE cascade ON UPDATE no action;