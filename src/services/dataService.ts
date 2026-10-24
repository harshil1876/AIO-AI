import { TOOLS_DATA, CATEGORIES_DATA, type ToolData, type CategoryData } from '../data/seedData';
import { WORKFLOWS_DATA, type WorkflowItem } from '../data/workflowsData';
import { OPEN_SOURCE_REPOS, type OpenSourceRepo } from '../data/openSourceData';
import { OFFICIAL_MODELS, type LLMModel } from '../data/modelsData';
import { NEWS_STORIES, type NewsStory } from '../data/newsData';
import { CREATORS_DATA, type CreatorData } from '../data/creatorsData';
import { COMMUNITY_POSTS, COMMUNITY_LEADERBOARD } from '../data/communityData';

export {
  TOOLS_DATA,
  CATEGORIES_DATA,
  WORKFLOWS_DATA,
  OPEN_SOURCE_REPOS,
  OFFICIAL_MODELS,
  NEWS_STORIES,
  CREATORS_DATA,
  COMMUNITY_POSTS,
  COMMUNITY_LEADERBOARD,
};

export type {
  ToolData,
  CategoryData,
  WorkflowItem,
  OpenSourceRepo,
  LLMModel,
  NewsStory,
  CreatorData,
};

// Helper lookup functions
export function getToolBySlug(slug: string): ToolData | undefined {
  return TOOLS_DATA.find(t => t.slug === slug);
}

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return CATEGORIES_DATA.find(c => c.slug === slug);
}

export function getWorkflowById(id: string): WorkflowItem | undefined {
  return WORKFLOWS_DATA.find(w => w.id === id);
}

export function getRepoBySlug(slug: string): OpenSourceRepo | undefined {
  return OPEN_SOURCE_REPOS.find(r => r.slug === slug);
}

export function getModelById(id: string): LLMModel | undefined {
  return OFFICIAL_MODELS.find(m => m.id === id);
}

export function getNewsBySlug(slug: string): NewsStory | undefined {
  return NEWS_STORIES.find(s => s.slug === slug || s.id === slug);
}

export function getCreatorBySlug(slug: string): CreatorData | undefined {
  return CREATORS_DATA.find(c => c.slug === slug);
}

export async function getAllTools(): Promise<ToolData[]> {
  return TOOLS_DATA;
}

export async function getAllCategories(): Promise<CategoryData[]> {
  return CATEGORIES_DATA;
}

export async function getTrendingTools(limit: number = 6): Promise<ToolData[]> {
  return [...TOOLS_DATA].sort((a, b) => (b.platformScore || 0) - (a.platformScore || 0)).slice(0, limit);
}

export async function getIndianAITools(): Promise<ToolData[]> {
  return TOOLS_DATA.filter(t => t.isIndianAI);
}

export async function getFreeTools(limit: number = 3): Promise<ToolData[]> {
  return TOOLS_DATA.filter(t => t.freeTier || t.pricingType === 'Free' || t.pricingType === 'Open Source').slice(0, limit);
}
