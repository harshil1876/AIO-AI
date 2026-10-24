import { OFFICIAL_MODELS, type LLMModel } from '../data/modelsData';

export interface LiveSyncedModel extends LLMModel {
  isLiveSynced?: boolean;
  liveSyncTimestamp?: string;
}

const CACHE_KEY = 'aio_live_models_cache';
const CACHE_TIME_KEY = 'aio_live_models_cache_time';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function fetchLiveOfficialModels(): Promise<LiveSyncedModel[]> {
  // Check client-side cache
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      if (cached && cachedTime && (Date.now() - Number(cachedTime) < CACHE_TTL_MS)) {
        return JSON.parse(cached);
      }
    } catch(e) {}
  }

  // Base list
  const modelMap = new Map<string, LiveSyncedModel>();
  for (const model of OFFICIAL_MODELS) {
    modelMap.set(model.id, { ...model, isLiveSynced: false });
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data)) {
        const primaryPrefixes = ['openai/', 'anthropic/', 'google/', 'deepseek/', 'mistralai/', 'meta-llama/', 'qwen/', 'x-ai/'];

        for (const item of data.data) {
          const id: string = item.id || '';
          const isPrimary = primaryPrefixes.some(prefix => id.startsWith(prefix));
          if (!isPrimary) continue;

          // Check if matches one of our models by identifier or suffix
          const cleanSuffix = id.split('/')[1] || id;
          const matchedKey = Array.from(modelMap.keys()).find(k => 
            cleanSuffix.toLowerCase().includes(k.toLowerCase()) || 
            k.toLowerCase().includes(cleanSuffix.toLowerCase())
          );

          if (matchedKey) {
            const existing = modelMap.get(matchedKey)!;
            const inputPricePerM = item.pricing?.prompt ? Number(item.pricing.prompt) * 1000000 : existing.inputCostPer1M;
            const outputPricePerM = item.pricing?.completion ? Number(item.pricing.completion) * 1000000 : existing.outputCostPer1M;

            modelMap.set(matchedKey, {
              ...existing,
              contextWindow: item.context_length || existing.contextWindow,
              formattedContext: (item.context_length || existing.contextWindow).toLocaleString(),
              inputCostPer1M: Number(inputPricePerM.toFixed(4)),
              outputCostPer1M: Number(outputPricePerM.toFixed(4)),
              inputCostPer1K: Number((inputPricePerM / 1000).toFixed(6)),
              outputCostPer1K: Number((outputPricePerM / 1000).toFixed(6)),
              isLiveSynced: true,
              liveSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('OpenRouter live model pricing sync notice:', err);
  }

  const result = Array.from(modelMap.values());

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(result));
      localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
    } catch(e) {}
  }

  return result;
}
