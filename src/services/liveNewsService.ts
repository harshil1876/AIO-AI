export interface LiveNewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceBadge: string;
  timestampMs: number;
  timeAgo: string;
  category: string;
  upvotes?: number;
  commentsCount?: number;
  isBreaking?: boolean;
}

const CACHE_KEY = 'aio_live_news_cache_v2';
const CACHE_TIME_KEY = 'aio_live_news_cache_time_v2';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Robust fetch with strict timeout enforcement using AbortController (3500ms default)
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 3500): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function fetchHackerNewsStream(): Promise<LiveNewsItem[]> {
  const items: LiveNewsItem[] = [];
  try {
    const res = await fetchWithTimeout(
      'https://hn.algolia.com/api/v1/search_by_date?query=AI+OR+LLM+OR+OpenAI+OR+Anthropic+OR+DeepSeek+OR+Gemini+OR+Claude&tags=story&hitsPerPage=25',
      { headers: { 'Accept': 'application/json' } },
      3500
    );
    if (res.ok) {
      const data = await res.json();
      if (data.hits && Array.isArray(data.hits)) {
        for (const hit of data.hits) {
          if (!hit.title) continue;
          
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
            const timeMs = new Date(hit.created_at).getTime();
            items.push({
              id: `hn-${hit.objectID}`,
              title: hit.title,
              url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
              source: 'Hacker News AI',
              sourceBadge: '[HN Algolia]',
              timestampMs: timeMs,
              timeAgo: formatTimeAgo(timeMs),
              category: detectCategory(hit.title),
              upvotes: hit.points || 1,
              commentsCount: hit.num_comments || 0,
              isBreaking: (hit.points || 0) > 100
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('Live HN news fetch notice:', err);
  }
  return items;
}

async function fetchHuggingFaceStream(): Promise<LiveNewsItem[]> {
  const items: LiveNewsItem[] = [];
  try {
    const res = await fetchWithTimeout('https://huggingface.co/api/daily_papers?limit=10', {
      headers: { 'Accept': 'application/json' }
    }, 3500);
    if (res.ok) {
      const papers = await res.json();
      if (Array.isArray(papers)) {
        for (const p of papers) {
          const paperObj = p.paper || p;
          if (!paperObj.title) continue;
          const timeMs = paperObj.publishedAt ? new Date(paperObj.publishedAt).getTime() : Date.now() - 3600000;
          items.push({
            id: `hf-${paperObj.id || Math.random().toString(36).substring(2, 7)}`,
            title: `[Paper] ${paperObj.title}`,
            url: `https://huggingface.co/papers/${paperObj.id}`,
            source: 'Hugging Face Daily',
            sourceBadge: '[Hugging Face]',
            timestampMs: timeMs,
            timeAgo: formatTimeAgo(timeMs),
            category: 'Research & Papers',
            upvotes: paperObj.upvotes || 15,
            commentsCount: 0,
            isBreaking: false
          });
        }
      }
    }
  } catch (err) {
    console.warn('Hugging Face papers fetch notice:', err);
  }
  return items;
}

async function fetchDevToStream(): Promise<LiveNewsItem[]> {
  const items: LiveNewsItem[] = [];
  try {
    const res = await fetchWithTimeout('https://dev.to/api/articles?tag=ai&per_page=12', {}, 3500);
    if (res.ok) {
      const devArticles = await res.json();
      if (Array.isArray(devArticles)) {
        for (const art of devArticles) {
          const timeMs = new Date(art.published_at).getTime();
          items.push({
            id: `devto-${art.id}`,
            title: art.title,
            url: art.url,
            source: 'Dev.to AI',
            sourceBadge: '[Dev.to AI]',
            timestampMs: timeMs,
            timeAgo: formatTimeAgo(timeMs),
            category: 'Engineering & Code',
            upvotes: art.public_reactions_count || 10,
            commentsCount: art.comments_count || 0
          });
        }
      }
    }
  } catch (err) {
    console.warn('Live Dev.to articles fetch notice:', err);
  }
  return items;
}

async function fetchGitHubReleasesStream(): Promise<LiveNewsItem[]> {
  const items: LiveNewsItem[] = [];
  try {
    const flagshipRepos = ['ollama/ollama', 'vllm-project/vllm', 'comfyanonymous/ComfyUI'];
    const repoPromises = flagshipRepos.map(async (repo) => {
      try {
        const ghRes = await fetchWithTimeout(`https://api.github.com/repos/${repo}/releases?per_page=1`, {
          headers: { 'Accept': 'application/vnd.github.v3+json' }
        }, 3500);
        if (ghRes.ok) {
          const releases = await ghRes.json();
          if (Array.isArray(releases) && releases[0]) {
            const rel = releases[0];
            const timeMs = new Date(rel.published_at).getTime();
            return {
              id: `gh-rel-${rel.id}`,
              title: `[Release] ${repo}: ${rel.name || rel.tag_name}`,
              url: rel.html_url,
              source: 'GitHub AI Releases',
              sourceBadge: '[GitHub Release]',
              timestampMs: timeMs,
              timeAgo: formatTimeAgo(timeMs),
              category: 'Model Releases',
              upvotes: 25,
              commentsCount: 0,
              isBreaking: true
            } as LiveNewsItem;
          }
        }
      } catch (e) {}
      return null;
    });

    const settled = await Promise.allSettled(repoPromises);
    for (const r of settled) {
      if (r.status === 'fulfilled' && r.value) {
        items.push(r.value);
      }
    }
  } catch (err) {
    console.warn('GitHub releases fetch notice:', err);
  }
  return items;
}

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

  // Execute all 4 live news streams concurrently with strict timeout enforcement
  const results = await Promise.allSettled([
    fetchHackerNewsStream(),
    fetchHuggingFaceStream(),
    fetchDevToStream(),
    fetchGitHubReleasesStream()
  ]);

  const items: LiveNewsItem[] = [];
  for (const res of results) {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      items.push(...res.value);
    }
  }

  // Deduplicate by normalized title
  const seen = new Set<string>();
  const uniqueItems = items.filter(item => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort strictly newest-first (Chronological Authenticity)
  uniqueItems.sort((a, b) => b.timestampMs - a.timestampMs);

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
