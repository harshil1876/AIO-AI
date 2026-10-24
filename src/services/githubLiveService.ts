export interface GitHubLiveStats {
  stars: number;
  formattedStars: string;
  forks: number;
  formattedForks: string;
  openIssues: number;
  lastPushedAgo: string;
  latestReleaseTag?: string;
  latestReleaseName?: string;
  defaultBranch?: string;
}

export interface HardwarePreset {
  id: string;
  label: string;
  vramGb: number;
  type: 'gpu' | 'apple-silicon' | 'cpu';
}

export const HARDWARE_PRESETS: HardwarePreset[] = [
  { id: 'all', label: 'All Hardware Configurations', vramGb: 999, type: 'gpu' },
  { id: 'mac-8gb', label: 'Apple Silicon (M1/M2/M3) - 8GB Unified', vramGb: 6, type: 'apple-silicon' },
  { id: 'mac-16gb', label: 'Apple Silicon (M1/M2/M3/M4) - 16GB Unified', vramGb: 12, type: 'apple-silicon' },
  { id: 'mac-36gb', label: 'Apple Silicon Max/Pro - 36GB-48GB Unified', vramGb: 32, type: 'apple-silicon' },
  { id: 'mac-64gb', label: 'Apple Silicon Studio/Max - 64GB+ Unified', vramGb: 56, type: 'apple-silicon' },
  { id: 'rtx-3060-12gb', label: 'Nvidia RTX 3060 / 4070 - 12GB VRAM', vramGb: 12, type: 'gpu' },
  { id: 'rtx-4080-16gb', label: 'Nvidia RTX 4080 - 16GB VRAM', vramGb: 16, type: 'gpu' },
  { id: 'rtx-4090-24gb', label: 'Nvidia RTX 4090 / 3090 - 24GB VRAM', vramGb: 24, type: 'gpu' },
  { id: 'cpu-only', label: 'CPU Inference Only (No Dedicated GPU)', vramGb: 4, type: 'cpu' },
];

export function checkHardwareCompatibility(minVramGb: number, userHardwareId: string): {
  status: 'runs-smoothly' | 'quantized-only' | 'cloud-gpu-needed';
  label: string;
  badgeClass: string;
} {
  const preset = HARDWARE_PRESETS.find(p => p.id === userHardwareId) || HARDWARE_PRESETS[0];
  if (preset.id === 'all') {
    return {
      status: 'runs-smoothly',
      label: 'Compatible',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
  }

  const userVram = preset.vramGb;

  if (userVram >= minVramGb) {
    return {
      status: 'runs-smoothly',
      label: 'Runs Smoothly (Full FP16/Q8)',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
  } else if (userVram >= minVramGb * 0.45) {
    return {
      status: 'quantized-only',
      label: 'Quantized Only (Q4_K_M)',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
    };
  } else {
    return {
      status: 'cloud-gpu-needed',
      label: 'Cloud GPU Needed (> ' + minVramGb + 'GB)',
      badgeClass: 'bg-red-50 text-red-700 border-red-200'
    };
  }
}

export async function fetchLiveRepoStats(owner: string, repo: string): Promise<GitHubLiveStats | null> {
  const cacheKey = `aio_gh_live_${owner}_${repo}`;
  const cacheTimeKey = `aio_gh_time_${owner}_${repo}`;
  const TTL = 60 * 60 * 1000; // 1 hour cache

  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimeKey);
      if (cached && cachedTime && (Date.now() - Number(cachedTime) < TTL)) {
        return JSON.parse(cached);
      }
    } catch(e) {}
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!res.ok) return null;
    const data = await res.json();

    // Fetch latest release tag
    let releaseTag: string | undefined;
    let releaseName: string | undefined;
    try {
      const relRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
      if (relRes.ok) {
        const relData = await relRes.json();
        releaseTag = relData.tag_name;
        releaseName = relData.name;
      }
    } catch(e) {}

    const stats: GitHubLiveStats = {
      stars: data.stargazers_count,
      formattedStars: formatNumber(data.stargazers_count),
      forks: data.forks_count,
      formattedForks: formatNumber(data.forks_count),
      openIssues: data.open_issues_count,
      lastPushedAgo: formatPushedAgo(data.pushed_at),
      latestReleaseTag: releaseTag,
      latestReleaseName: releaseName,
      defaultBranch: data.default_branch || 'main'
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(stats));
        localStorage.setItem(cacheTimeKey, String(Date.now()));
      } catch(e) {}
    }

    return stats;
  } catch (err) {
    console.warn(`GitHub stats live fetch failed for ${owner}/${repo}:`, err);
    return null;
  }
}

export async function fetchRepoReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: { 'Accept': 'application/vnd.github.v3.raw' }
    });
    if (res.ok) {
      return await res.text();
    }
  } catch(e) {}
  return null;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return String(num);
}

function formatPushedAgo(isoString: string): string {
  if (!isoString) return 'recently';
  const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diffSec < 3600) return `${Math.max(1, Math.floor(diffSec / 60))}m ago`;
  const diffHours = Math.floor(diffSec / 3600);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
