import { pgTable, serial, text, varchar, timestamp, boolean, integer, primaryKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 50 }).default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  username: varchar('username', { length: 255 }).unique(),
  bio: text('bio'),
  avatarUrl: varchar('avatar_url', { length: 255 }),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
});

export const tools = pgTable('tools', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  tagline: varchar('tagline', { length: 255 }),
  description: text('description'),
  websiteUrl: varchar('website_url', { length: 255 }),
  pricingType: varchar('pricing_type', { length: 50 }), // free, freemium, paid, etc.
  isVerified: boolean('is_verified').default(false),
  platformScore: integer('platform_score').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const toolCategories = pgTable('tool_categories', {
  toolId: integer('tool_id').references(() => tools.id).notNull(),
  categoryId: integer('category_id').references(() => categories.id).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.toolId, t.categoryId] }),
}));

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  toolId: integer('tool_id').references(() => tools.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const bookmarks = pgTable('bookmarks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  toolId: integer('tool_id').references(() => tools.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const communityPosts = pgTable('community_posts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // discussion, question, review
  upvotes: integer('upvotes').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});
