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

export interface AuthenticScorecard {
  total: number; // 0 - 100
  docsApi: number; // max 25: Docs & API Maturity
  pricing: number; // max 25: Pricing Transparency & Free Tier
  interop: number; // max 20: Workflow Interoperability & Integration
  health: number; // max 15: Live Domain Health & Uptime
  community: number; // max 15: Verified Community Signal & Open Source
  verdict: string;
}

export function calculateAuthenticScore(tool: ToolData): AuthenticScorecard {
  // 1. Docs & API Maturity (max 25)
  let docsApi = 12; // Base for verified production tool
  const hasGitHub = !!tool.githubUrl;
  const hasApiFeature = tool.features?.some(f => /api|sdk|rest|webhook|mcp|extension|cli/i.test(f)) ||
    tool.deploymentTypes?.some(d => /api|cloud|self-hosted/i.test(d));
  if (hasGitHub) docsApi += 7;
  if (hasApiFeature) docsApi += 6;
  docsApi = Math.min(25, docsApi);

  // 2. Pricing Transparency & Free Tier (max 25)
  let pricing = 10;
  if (tool.freeTier || tool.pricingType === 'Free' || tool.pricingType === 'Open Source') {
    pricing += 9;
  } else if (tool.hasFreeTrial) {
    pricing += 5;
  }
  if (tool.startingPrice && !tool.startingPrice.toLowerCase().includes('contact')) {
    pricing += 6; // Transparent upfront pricing, not hidden behind sales call
  }
  pricing = Math.min(25, pricing);

  // 3. Workflow Interoperability (max 20)
  let interop = 10;
  if (tool.openSourceAlternative) interop += 4;
  if (tool.categorySlugs?.length > 1) interop += 3;
  if (tool.features?.some(f => /export|json|csv|pipeline|workflow|integration|plugin|python|docker/i.test(f))) {
    interop += 3;
  }
  interop = Math.min(20, interop);

  // 4. Live Domain Health (max 15)
  let health = 12;
  if (tool.websiteUrl && tool.websiteUrl.startsWith('https://')) health += 3;
  health = Math.min(15, health);

  // 5. Verified Community Signal (max 15)
  let community = 8;
  if (tool.isVerified) community += 4;
  if (tool.isIndianAI) community += 3;
  else if (hasGitHub) community += 3;
  community = Math.min(15, community);

  const total = docsApi + pricing + interop + health + community;

  let verdict = 'Standard Tier';
  if (total >= 90) verdict = 'Enterprise & Production Ready';
  else if (total >= 80) verdict = 'High Authenticity & Stable';
  else if (total >= 70) verdict = 'Functional & Verified';

  return {
    total,
    docsApi,
    pricing,
    interop,
    health,
    community,
    verdict
  };
}

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
