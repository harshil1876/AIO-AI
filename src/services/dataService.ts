import { db } from '../db';
import * as schema from '../db/schema';
import { desc } from 'drizzle-orm';
import { TOOLS_DATA, CATEGORIES_DATA, type ToolData, type CategoryData } from '../data/seedData';

// Track connection health during process lifetime so we don't repeatedly wait on timeouts
let isDbUnreachable = false;

async function withTimeout<T>(promise: Promise<T>, ms: number = 1000): Promise<T> {
  if (isDbUnreachable) {
    throw new Error('DB marked unreachable in current session');
  }
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => {
      isDbUnreachable = true;
      reject(new Error('DB Timeout'));
    }, ms))
  ]).catch(err => {
    isDbUnreachable = true;
    throw err;
  });
}

export async function getAllCategories(): Promise<CategoryData[]> {
  try {
    const dbCats = await withTimeout(db.select().from(schema.categories));
    if (dbCats && dbCats.length > 0) {
      return CATEGORIES_DATA.map(cat => {
        const found = dbCats.find(c => c.slug === cat.slug);
        const count = TOOLS_DATA.filter(t => t.categorySlugs.includes(cat.slug)).length;
        return {
          ...cat,
          name: found ? found.name : cat.name,
          description: found?.description || cat.description,
          count
        };
      });
    }
  } catch {
    // Graceful fallback to verified in-memory dataset
  }

  return CATEGORIES_DATA.map(cat => ({
    ...cat,
    count: TOOLS_DATA.filter(t => t.categorySlugs.includes(cat.slug)).length
  }));
}

export async function getAllTools(): Promise<ToolData[]> {
  try {
    const dbTools = await withTimeout(db.select().from(schema.tools).orderBy(desc(schema.tools.platformScore)));
    if (dbTools && dbTools.length > 0) {
      return TOOLS_DATA.map(tool => {
        const dbTool = dbTools.find(t => t.slug === tool.slug);
        if (dbTool) {
          return {
            ...tool,
            id: dbTool.id,
            name: dbTool.name,
            tagline: dbTool.tagline || tool.tagline,
            platformScore: dbTool.platformScore || tool.platformScore,
            websiteUrl: dbTool.websiteUrl || tool.websiteUrl,
          };
        }
        return tool;
      });
    }
  } catch {
    // Fallback to verified catalog
  }

  return TOOLS_DATA;
}

export async function getToolBySlug(slug: string): Promise<ToolData | undefined> {
  const all = await getAllTools();
  return all.find(t => t.slug === slug);
}

export async function getTrendingTools(limit = 6): Promise<ToolData[]> {
  const all = await getAllTools();
  return [...all].sort((a, b) => b.platformScore - a.platformScore).slice(0, limit);
}

export async function getIndianAITools(): Promise<ToolData[]> {
  const all = await getAllTools();
  return all.filter(t => t.isIndianAI || t.categorySlugs.includes('india-first'));
}

export async function getFreeTools(limit = 4): Promise<ToolData[]> {
  const all = await getAllTools();
  return all.filter(t => t.pricingType === 'Free' || t.freeTier).slice(0, limit);
}

export async function getOpenSourceTools(): Promise<ToolData[]> {
  const all = await getAllTools();
  return all.filter(t => t.pricingType === 'Open Source' || t.categorySlugs.includes('open-source-models'));
}

export interface SearchFilters {
  query?: string;
  category?: string;
  pricing?: string;
  sort?: 'platformScore' | 'rating' | 'newest';
}

export async function filterTools(filters: SearchFilters): Promise<ToolData[]> {
  let list = await getAllTools();

  if (filters.category && filters.category !== 'all') {
    list = list.filter(t => t.categorySlugs.includes(filters.category!));
  }

  if (filters.pricing && filters.pricing !== 'all') {
    if (filters.pricing === 'Free') {
      list = list.filter(t => t.pricingType === 'Free' || t.freeTier);
    } else {
      list = list.filter(t => t.pricingType.toLowerCase() === filters.pricing!.toLowerCase());
    }
  }

  if (filters.query && filters.query.trim().length > 0) {
    const q = filters.query.toLowerCase().trim();
    list = list.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.categorySlugs.some(c => c.toLowerCase().includes(q)) ||
      t.features.some(f => f.toLowerCase().includes(q)) ||
      t.useCases.some(u => u.toLowerCase().includes(q))
    );
  }

  if (filters.sort === 'rating') {
    list.sort((a, b) => ((b.rating ?? 0) - (a.rating ?? 0)));
  } else {
    list.sort((a, b) => b.platformScore - a.platformScore);
  }

  return list;
}
