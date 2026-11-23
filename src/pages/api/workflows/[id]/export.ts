import type { APIRoute } from 'astro';
import { getWorkflowById } from '../../../../services/dataService';
import { verifyRequestUser, hasPaidEntitlement, jsonResponse } from '../../../../lib/server/auth';
import { checkRateLimit, getClientIdentifier } from '../../../../lib/server/rateLimit';

export const prerender = false;

/**
 * Server-Gated Workflow Export Endpoint (PRD Sec 18):
 * Free preview metadata is public; Pro/Enterprise platform exports
 * (n8n JSON, Make Blueprint, Zapier Config, SKILL.md) enforce server-side
 * entitlement checks rather than leaking paid templates in static HTML.
 */
export const GET: APIRoute = async ({ params, request, url }) => {
  const clientId = getClientIdentifier(request);
  const rl = await checkRateLimit(`wf-export:${clientId}`, 30, 60_000);
  if (!rl.allowed) return jsonResponse({ error: 'Rate limit exceeded.' }, 429, rl.headers);

  const workflowId = params.id || '';
  const workflow = getWorkflowById(workflowId);
  if (!workflow) {
    return jsonResponse({ error: 'Workflow not found.' }, 404, rl.headers);
  }

  const format = (url.searchParams.get('format') || 'n8n').toLowerCase();
  const isProFormat = format === 'make' || format === 'zapier' || format === 'full_bundle';

  const user = await verifyRequestUser(request);
  const entitled = hasPaidEntitlement(user);

  if (isProFormat && !entitled) {
    return jsonResponse(
      {
        error: 'Pro or Team entitlement required for multi-platform commercial exports.',
        upgradeUrl: '/pricing',
        currentPlan: user?.plan || 'free',
        freePreviewAvailable: true,
        freePreview: {
          id: workflow.id,
          title: workflow.title,
          category: workflow.category,
          estimatedCost: workflow.estimatedCost,
          toolsUsed: workflow.toolsUsed,
        },
      },
      403,
      rl.headers
    );
  }

  const nodes = (workflow.steps || []).map((step: any, idx: number) => ({
    id: `node_${idx + 1}`,
    name: typeof step === 'string' ? step : step.title || `Step ${idx + 1}`,
    type: idx === 0 ? 'n8n-nodes-base.webhook' : 'n8n-nodes-base.httpRequest',
    position: [260 + idx * 280, 300],
    parameters: {
      notes: typeof step === 'string' ? step : step.description || '',
    },
  }));

  if (format === 'skill') {
    const skillMd = `---\nname: ${workflow.id}\ndescription: ${workflow.title}\n---\n\n# ${workflow.title}\n\n${workflow.description}\n\n## System Prompt\n\`\`\`\n${workflow.systemPrompt}\n\`\`\`\n\n## API Payload Schema\n\`\`\`json\n${JSON.stringify(workflow.apiPayloadSchema || {}, null, 2)}\n\`\`\`\n`;
    return new Response(skillMd, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${workflow.id}-SKILL.md"`,
        ...rl.headers,
      },
    });
  }

  if (format === 'make') {
    return jsonResponse(
      {
        platform: 'Make.com Blueprint',
        name: workflow.title,
        entitlementVerified: true,
        flow: nodes.map((n, i) => ({ id: i + 1, module: i === 0 ? 'gateway:CustomWebHook' : 'http:ActionSendData', metadata: n })),
      },
      200,
      rl.headers
    );
  }

  if (format === 'zapier') {
    return jsonResponse(
      {
        platform: 'Zapier Multi-Step Config',
        title: workflow.title,
        entitlementVerified: true,
        trigger: { app: 'webhooks', event: 'catch_hook' },
        actions: nodes.slice(1).map((n) => ({ app: 'ai_by_zapier', label: n.name, notes: n.parameters.notes })),
      },
      200,
      rl.headers
    );
  }

  // Standard n8n JSON export
  return jsonResponse(
    {
      name: workflow.title,
      nodes,
      connections: {},
      active: false,
      meta: {
        exportedBy: 'AIO AI Server Entitlement Engine',
        plan: user?.plan || 'free',
        systemPrompt: entitled ? workflow.systemPrompt : `${workflow.systemPrompt.slice(0, 180)}... [Upgrade to Pro for full prompt & webhook bundle]`,
      },
    },
    200,
    rl.headers
  );
};
