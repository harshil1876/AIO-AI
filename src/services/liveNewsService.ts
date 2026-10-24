export interface LiveNewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  timeAgo: string;
  category: string;
  upvotes?: number;
  commentsCount?: number;
  isBreaking?: boolean;
}

const CACHE_KEY = 'aio_live_news_cache';
const CACHE_TIME_KEY = 'aio_live_news_cache_time';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export async function fetchLiveAINews(): Promise<LiveNewsItem[]> {
  // Check browser localStorage cache first
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      if (cached && cachedTime && (Date.now() - Number(cachedTime) < CACHE_TTL_MS)) {
        return JSON.parse(cached);
      }
    } catch (e) {}
  }

  const items: LiveNewsItem[] = [];

  // 1. Fetch from Hacker News Algolia API (CORS friendly, no key required)
  try {
    const res = await fetch(
      'https://hn.algolia.com/api/v1/search_by_date?query=AI+OR+LLM+OR+OpenAI+OR+Anthropic+OR+DeepSeek+OR+Gemini&tags=story&hitsPerPage=25',
      { headers: { 'Accept': 'application/json' } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.hits && Array.isArray(data.hits)) {
        for (const hit of data.hits) {
          if (!hit.title) continue;
          
          // Filter out low quality or non-AI noise
          const lower = hit.title.toLowerCase();
          if (
            lower.includes('ai') || 
            lower.includes('llm') || 
            lower.includes('model') || 
            lower.includes('openai') || 
            lower.includes('anthropic') || 
            lower.includes('deepseek') || 
            lower.includes('claude') || 
            lower.includes('gemini') || 
            lower.includes('gpu') || 
            lower.includes('transformer') ||
            lower.includes('reasoning')
          ) {
            items.push({
              id: `hn-${hit.objectID}`,
              title: hit.title,
              url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
              source: 'Hacker News AI',
              timeAgo: formatTimeAgo(new Date(hit.created_at).getTime()),
              category: detectCategory(hit.title),
              upvotes: hit.points || 1,
              commentsCount: hit.num_comments || 0,
              isBreaking: hit.points > 100
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('Live HN news fetch fallback:', err);
  }

  // 2. Fetch from Dev.to AI Articles (CORS friendly, no key required)
  try {
    const res = await fetch('https://dev.to/api/articles?tag=ai&per_page=10');
    if (res.ok) {
      const devArticles = await res.json();
      if (Array.isArray(devArticles)) {
        for (const art of devArticles) {
          items.push({
            id: `devto-${art.id}`,
            title: art.title,
            url: art.url,
            source: 'Dev.to Community',
            timeAgo: formatTimeAgo(new Date(art.published_at).getTime()),
            category: 'Engineering & Code',
            upvotes: art.public_reactions_count || 10,
            commentsCount: art.comments_count || 0
          });
        }
      }
    }
  } catch (err) {
    console.warn('Live Dev.to articles fetch fallback:', err);
  }

  // Deduplicate by normalized title
  const seen = new Set<string>();
  const uniqueItems = items.filter(item => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Cache in localStorage
  if (typeof window !== 'undefined' && uniqueItems.length > 0) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(uniqueItems));
      localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
    } catch (e) {}
  }

  return uniqueItems;
}

function detectCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('code') || t.includes('coding') || t.includes('developer') || t.includes('git')) return 'AI Coding';
  if (t.includes('model') || t.includes('weights') || t.includes('release') || t.includes('deepseek') || t.includes('claude')) return 'Model Releases';
  if (t.includes('open source') || t.includes('local') || t.includes('ollama') || t.includes('vllm')) return 'Open Source';
  if (t.includes('agent') || t.includes('workflow') || t.includes('autonomous')) return 'Autonomous Agents';
  if (t.includes('gpu') || t.includes('nvidia') || t.includes('chip') || t.includes('hardware')) return 'Compute & Hardware';
  return 'Frontier AI';
}

function formatTimeAgo(timestampMs: number): string {
  const diffSec = Math.floor((Date.now() - timestampMs) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  return `${diffDays}d ago`;
}

export { fetchLiveAINews as fetchLiveAINewsWire };
