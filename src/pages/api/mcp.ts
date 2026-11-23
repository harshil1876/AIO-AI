import type { APIRoute } from 'astro';
import { z } from 'zod';
import { runFinderEngine } from '../../lib/server/finderEngine';
import { TOOLS_DATA, OFFICIAL_MODELS, OPEN_SOURCE_REPOS, calculateAuthenticScore } from '../../services/dataService';
import { checkRateLimit, getClientIdentifier } from '../../lib/server/rateLimit';
import { jsonResponse } from '../../lib/server/auth';

export const prerender = false;

const McpCallSchema = z.object({
  jsonrpc: z.literal('2.0').optional().default('2.0'),
  id: z.union([z.string(), z.number()]).optional().default(1),
  method: z.enum(['tools/list', 'tools/call', 'initialize']),
  params: z.record(z.string(), z.any()).optional().default({}),
});

const MCP_TOOLS = [
  {
    name: 'aio_find_ai_stack',
    description: 'Recommend a verified 3-tier AI stack ($0 Open Source, Freemium, Enterprise) + workflows + creators for any user goal.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Natural language user task or goal' },
        budget: { type: 'string', enum: ['free', 'under50', 'enterprise', 'any'] },
        indiaFocus: { type: 'boolean' },
      },
      required: ['query'],
    },
  },
  {
    name: 'aio_compare_llm_costs',
    description: 'Calculate and rank exact official API token costs across 26 frontier LLM models in USD and INR.',
    inputSchema: {
      type: 'object',
      properties: {
        inputTokens: { type: 'number', default: 100000 },
        outputTokens: { type: 'number', default: 25000 },
      },
    },
  },
  {
    name: 'aio_search_verified_tools',
    description: 'Search the verified AIO AI catalog with deterministic 5-Factor Authenticity Scores.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        freeOnly: { type: 'boolean' },
      },
      required: ['query'],
    },
  },
];

export const GET: APIRoute = async () => {
  return jsonResponse({
    name: 'AIO AI Public Discovery & MCP Server',
    protocol: 'Model Context Protocol (JSON-RPC 2.0)',
    version: '1.0.0',
    endpoint: '/api/mcp',
    catalogStats: {
      tools: TOOLS_DATA.length,
      models: OFFICIAL_MODELS.length,
      openSourceRepos: OPEN_SOURCE_REPOS.length,
    },
    availableTools: MCP_TOOLS,
  });
};

export const POST: APIRoute = async ({ request }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`mcp:${clientId}`, 60, 60_000);
  if (!rl.allowed) return jsonResponse({ error: 'Rate limit exceeded.' }, 429, rl.headers);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonResponse({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, 400, rl.headers);
  }

  const parsed = McpCallSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonResponse({ jsonrpc: '2.0', id: null, error: { code: -32600, message: 'Invalid MCP request' } }, 400, rl.headers);
  }

  const { id, method, params } = parsed.data;

  if (method === 'initialize') {
    return jsonResponse(
      {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: { name: 'aio-ai-mcp', version: '1.0.0' },
          capabilities: { tools: {} },
        },
      },
      200,
      rl.headers
    );
  }

  if (method === 'tools/list') {
    return jsonResponse({ jsonrpc: '2.0', id, result: { tools: MCP_TOOLS } }, 200, rl.headers);
  }

  const toolName = String(params.name || '');
  const args = (params.arguments || {}) as Record<string, any>;

  if (toolName === 'aio_find_ai_stack') {
    const result = runFinderEngine({
      query: String(args.query || 'AI automation'),
      budget: args.budget || 'any',
      indiaFocus: Boolean(args.indiaFocus),
    });
    return jsonResponse(
      { jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] } },
      200,
      rl.headers
    );
  }

  if (toolName === 'aio_compare_llm_costs') {
    const inTok = Math.max(0, Number(args.inputTokens ?? 100_000));
    const outTok = Math.max(0, Number(args.outputTokens ?? 25_000));
    const ranked = OFFICIAL_MODELS.map((m) => {
      const usd = (inTok / 1_000_000) * m.inputCostPer1M + (outTok / 1_000_000) * m.outputCostPer1M;
      return {
        id: m.id,
        name: m.name,
        provider: m.provider,
        contextWindow: m.contextWindow,
        estimatedUsd: Number(usd.toFixed(6)),
        estimatedInr: Number((usd * 84.5).toFixed(2)),
      };
    }).sort((a, b) => a.estimatedUsd - b.estimatedUsd);

    return jsonResponse(
      { jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(ranked, null, 2) }] } },
      200,
      rl.headers
    );
  }

  if (toolName === 'aio_search_verified_tools') {
    const q = String(args.query || '').toLowerCase();
    const freeOnly = Boolean(args.freeOnly);
    const matched = TOOLS_DATA.filter((t) => {
      const hay = `${t.name} ${t.tagline} ${t.description} ${(t.categorySlugs || []).join(' ')}`.toLowerCase();
      const okQ = !q || hay.includes(q);
      const okF = !freeOnly || t.pricingType === 'Free' || t.pricingType === 'Open Source' || t.freeTier;
      return okQ && okF;
    })
      .slice(0, 15)
      .map((t) => ({
        slug: t.slug,
        name: t.name,
        pricingType: t.pricingType,
        startingPrice: t.startingPrice,
        websiteUrl: t.websiteUrl,
        authenticityScore: calculateAuthenticScore(t).total,
      }));

    return jsonResponse(
      { jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(matched, null, 2) }] } },
      200,
      rl.headers
    );
  }

  return jsonResponse({ jsonrpc: '2.0', id, error: { code: -32601, message: `Unknown tool: ${toolName}` } }, 404, rl.headers);
};
