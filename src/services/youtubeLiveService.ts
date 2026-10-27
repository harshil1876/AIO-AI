// YouTube Data API v3 Live Telemetry Service for AIO AI
// Quota efficient: Batches up to 50 channels per call (1 quota unit)

export interface LiveChannelStats {
  channelId?: string;
  handle: string;
  subscriberCount: number;
  formattedSubscribers: string;
  videoCount: number;
  viewCount: number;
  avatarUrl: string;
  lastUpdated: number;
}

export function getCreatorAvatar(handle: string, explicitAvatar?: string): string {
  if (explicitAvatar && !explicitAvatar.includes('unsplash.com')) {
    return explicitAvatar;
  }
  const cleanHandle = handle.replace(/^@/, '');
  return `https://unavatar.io/youtube/${cleanHandle}`;
}

export function formatSubscriberCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(count >= 10000000 ? 0 : 1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(0) + 'K';
  }
  return String(count);
}

/**
 * Batch refreshes YouTube channel statistics using YouTube Data API v3
 * Uses 1 quota unit for up to 50 channels.
 */
export async function batchRefreshCreatorStats(
  handles: string[]
): Promise<Record<string, LiveChannelStats>> {
  const apiKey = 
    (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_YOUTUBE_API_KEY) ||
    (typeof process !== 'undefined' ? process.env?.PUBLIC_YOUTUBE_API_KEY : undefined);

  const results: Record<string, LiveChannelStats> = {};
  const cachePrefix = 'aio_yt_stat_';
  const TTL = 24 * 60 * 60 * 1000; // 24-hour cache

  // Check cache first
  const missingHandles: string[] = [];
  if (typeof window !== 'undefined') {
    for (const h of handles) {
      const clean = h.replace(/^@/, '');
      try {
        const cached = localStorage.getItem(`${cachePrefix}${clean}`);
        if (cached) {
          const parsed = JSON.parse(cached) as LiveChannelStats;
          if (Date.now() - parsed.lastUpdated < TTL) {
            results[clean] = parsed;
            continue;
          }
        }
      } catch (e) {}
      missingHandles.push(clean);
    }
  } else {
    missingHandles.push(...handles.map(h => h.replace(/^@/, '')));
  }

  if (missingHandles.length === 0 || !apiKey) {
    return results;
  }

  // Fetch in batches of up to 50
  for (let i = 0; i < missingHandles.length; i += 50) {
    const batch = missingHandles.slice(i, i + 50);
    for (const handle of batch) {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`
        );
        if (!res.ok) continue;
        const data = await res.json();
        const item = data.items?.[0];
        if (item) {
          const subs = parseInt(item.statistics?.subscriberCount || '0', 10);
          const statObj: LiveChannelStats = {
            channelId: item.id,
            handle,
            subscriberCount: subs,
            formattedSubscribers: formatSubscriberCount(subs),
            videoCount: parseInt(item.statistics?.videoCount || '0', 10),
            viewCount: parseInt(item.statistics?.viewCount || '0', 10),
            avatarUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || getCreatorAvatar(handle),
            lastUpdated: Date.now()
          };
          results[handle] = statObj;
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(`${cachePrefix}${handle}`, JSON.stringify(statObj));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn(`YouTube API query failed for @${handle}:`, err);
      }
    }
  }

  return results;
}
