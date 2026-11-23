import type { APIRoute } from 'astro';
import { z } from 'zod';
import { runFinderEngine } from '../../lib/server/finderEngine';
import { checkRateLimit, getClientIdentifier } from '../../lib/server/rateLimit';
import { jsonResponse } from '../../lib/server/auth';

export const prerender = false;

const FinderSchema = z.object({
  query: z.string().trim().min(2, 'Please describe your goal (at least 2 characters)').max(600),
  persona: z.enum(['engineer', 'creator', 'hacker', 'lead', 'researcher', 'student', 'marketer']).optional().default('engineer'),
  budget: z.enum(['free', 'under50', 'enterprise', 'any']).optional().default('any'),
  indiaFocus: z.boolean().optional().default(false),
});

export const POST: APIRoute = async ({ request }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`finder:${clientId}`, 45, 60_000);
  if (!rl.allowed) {
    return jsonResponse({ error: 'Rate limit exceeded. Please wait a moment before running another Finder query.' }, 429, rl.headers);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON request body.' }, 400, rl.headers);
  }

  const parsed = FinderSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ error: 'Validation failed', details: parsed.error.flatten() }, 400, rl.headers);
  }

  const recommendation = runFinderEngine(parsed.data);

  // Optional Pluggable LLM Reasoning Layer (PRD Sec 34 & 57) when AI_PROVIDER_API_KEY is configured server-side
  const aiApiKey = process.env.AI_PROVIDER_API_KEY || process.env.OPENROUTER_API_KEY;
  const aiBaseUrl = process.env.AI_PROVIDER_BASE_URL || 'https://openrouter.ai/api/v1/chat/completions';
  const aiModel = process.env.AI_PROVIDER_MODEL || 'google/gemini-2.0-flash-001';

  if (aiApiKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      const topToolNames = recommendation.matchedTools.slice(0, 5).map((t) => `${t.name} (${t.pricingType})`).join(', ');
      const llmRes = await fetch(aiBaseUrl, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${aiApiKey}`,
        },
        body: JSON.stringify({
          model: aiModel,
          max_tokens: 180,
          temperature: 0.2,
          messages: [
            {
              role: 'system',
              content: 'You are AIO AI Finder. In 2 concise factual sentences, explain why these verified tools fit the user task without inventing pricing or claiming objective superiority.',
            },
            {
              role: 'user',
              content: `Task: ${parsed.data.query}. Budget: ${parsed.data.budget}. Matched catalog tools: ${topToolNames}.`,
            },
          ],
        }),
      });
      clearTimeout(timeout);
      if (llmRes.ok) {
        const llmData = (await llmRes.json()) as any;
        const reasoning = llmData?.choices?.[0]?.message?.content?.trim();
        if (reasoning) {
          recommendation.whyRecommended.unshift(reasoning);
          recommendation.llmEnhanced = true;
        }
      }
    } catch {
      // Deterministic hybrid entity-graph results remain intact
    }
  }

  return jsonResponse(recommendation, 200, rl.headers);
};
