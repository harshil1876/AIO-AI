import {
  TOOLS_DATA,
  WORKFLOWS_DATA,
  OPEN_SOURCE_REPOS,
  CREATORS_DATA,
  OFFICIAL_MODELS,
  calculateAuthenticScore,
  type ToolData,
  type WorkflowItem,
  type OpenSourceRepo,
  type CreatorData,
  type LLMModel,
} from '../../services/dataService';

export interface FinderQueryInput {
  query: string;
  persona?: string;
  budget?: 'free' | 'under50' | 'enterprise' | 'any';
  indiaFocus?: boolean;
}

export interface FinderTierStack {
  tier: 'A' | 'B' | 'C';
  pill: string;
  title: string;
  estimatedMonthlyCost: string;
  costAssumptions: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requiredCredentials: string[];
  steps: {
    stepNumber: number;
    role: string;
    toolName: string;
    toolSlug: string;
    href: string;
    pricingLabel: string;
    reason: string;
  }[];
  cliCommand: string;
  starterPrompt: string;
  stackBuilderUrl: string;
}

export interface FinderRecommendationResponse {
  query: string;
  detectedIntents: string[];
  whyRecommended: string[];
  tiers: {
    A: FinderTierStack;
    B: FinderTierStack;
    C: FinderTierStack;
  };
  matchedTools: Array<{
    slug: string;
    name: string;
    tagline: string;
    pricingType: string;
    startingPrice: string;
    score: number;
    isIndianAI?: boolean;
    matchScore: number;
    matchReasons: string[];
  }>;
  matchedWorkflows: Array<{
    id: string;
    title: string;
    category: string;
    difficulty: string;
    estimatedCost: string;
    matchScore: number;
  }>;
  matchedRepos: Array<{
    slug: string;
    name: string;
    repo: string;
    stars: string;
    minVramGb: string;
    license: string;
    cli: string;
    matchScore: number;
  }>;
  matchedCreators: Array<{
    slug: string;
    name: string;
    handle: string;
    category: string;
    subscribers: string;
    isIndia?: boolean;
    matchScore: number;
  }>;
  recommendedModels: Array<{
    id: string;
    name: string;
    provider: string;
    inputCostPer1M: number;
    outputCostPer1M: number;
    contextWindow: number;
  }>;
  engineVersion: string;
  llmEnhanced: boolean;
}

const SYNONYM_GROUPS: Record<string, string[]> = {
  video: ['video', 'youtube', 'shorts', 'reels', 'tiktok', 'editing', 'clip', 'caption', 'faceless', 'cinema', 'sora', 'runway', 'kling'],
  code: ['code', 'coding', 'developer', 'git', 'pr', 'ide', 'typescript', 'python', 'react', 'fullstack', 'refactor', 'sql', 'debug', 'cursor', 'copilot', 'devops'],
  image: ['image', 'art', 'design', 'photo', 'thumbnail', 'logo', 'flux', 'midjourney', 'diffusion', 'ui', 'figma', 'ecommerce', 'product'],
  audio: ['audio', 'voice', 'tts', 'speech', 'podcast', 'dubbing', 'whisper', 'music', 'transcribe', 'elevenlabs', 'sound'],
  indic: ['india', 'indian', 'hindi', 'tamil', 'telugu', 'marathi', 'bengali', 'regional', 'indic', 'sarvam', 'bhashini', 'krutrim', 'vernacular', 'inr', 'upi'],
  rag: ['rag', 'pdf', 'document', 'docs', 'knowledge', 'vector', 'search', 'research', 'paper', 'arxiv', 'citation', 'offline', 'private'],
  agents: ['agent', 'agents', 'autonomous', 'workflow', 'automation', 'n8n', 'zapier', 'make', 'webhook', 'support', 'whatsapp', 'bot', 'crm', 'lead', 'sales', 'email'],
  writing: ['write', 'writing', 'seo', 'blog', 'copy', 'marketing', 'article', 'newsletter', 'content', 'social', 'linkedin', 'twitter'],
  local: ['local', 'offline', 'vram', 'gpu', 'ollama', 'llama', 'deepseek', 'gguf', 'self-hosted', 'open-source', 'privacy', 'rtx', 'mac'],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);
}

function expandTokens(rawTokens: string[]): { expanded: Set<string>; detectedIntents: string[] } {
  const expanded = new Set<string>(rawTokens);
  const detectedIntents: string[] = [];

  for (const [intent, words] of Object.entries(SYNONYM_GROUPS)) {
    const hit = rawTokens.some((t) => words.includes(t) || words.some((w) => t.length >= 4 && w.includes(t)));
    if (hit) {
      detectedIntents.push(intent);
      words.slice(0, 6).forEach((w) => expanded.add(w));
    }
  }

  return { expanded, detectedIntents };
}

function scoreTool(
  tool: ToolData,
  rawTokens: string[],
  expanded: Set<string>,
  persona: string,
  budget: string,
  indiaFocus: boolean
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  const haystack = [
    tool.name,
    tool.tagline,
    tool.description,
    ...(tool.categorySlugs || []),
    ...(tool.useCases || []),
    ...(tool.features || []),
    ...(tool.targetAudience || []),
  ]
    .join(' ')
    .toLowerCase();

  let directHits = 0;
  for (const tok of rawTokens) {
    if (tool.name.toLowerCase().includes(tok)) {
      score += 18;
      directHits++;
    } else if (haystack.includes(tok)) {
      score += 9;
      directHits++;
    }
  }
  if (directHits > 0) {
    reasons.push(`Matches ${directHits} task keyword${directHits > 1 ? 's' : ''} in verified capabilities`);
  }

  let semanticHits = 0;
  for (const exp of expanded) {
    if (!rawTokens.includes(exp) && haystack.includes(exp)) {
      score += 3;
      semanticHits++;
    }
  }
  if (semanticHits >= 2) {
    reasons.push('High domain relevance across use-cases and taxonomy');
  }

  // Budget alignment
  const isFree = tool.pricingType === 'Free' || tool.pricingType === 'Open Source' || tool.freeTier;
  if (budget === 'free' && isFree) {
    score += 14;
    reasons.push(`Zero-cost fit (${tool.pricingType})`);
  } else if (budget === 'under50' && (tool.pricingType === 'Freemium' || isFree)) {
    score += 8;
    reasons.push('Matches affordable freemium tier');
  }

  // India focus
  if ((indiaFocus || expanded.has('india') || expanded.has('indic')) && tool.isIndianAI) {
    score += 22;
    reasons.push('India-First sovereign AI / Indic language support');
  }

  // Persona bonus
  if (persona === 'creator' && /video|audio|image|writing|creator/i.test(haystack)) score += 6;
  if (persona === 'engineer' && /code|api|open-source|developer|agent/i.test(haystack)) score += 6;
  if (persona === 'researcher' && /research|paper|rag|indic|model/i.test(haystack)) score += 6;

  // Deterministic platform authenticity tie-breaker
  const authScore = calculateAuthenticScore(tool).total;
  score += Math.round(authScore / 12);

  return { score, reasons: reasons.slice(0, 3) };
}

export function runFinderEngine(input: FinderQueryInput): FinderRecommendationResponse {
  const query = (input.query || '').trim() || 'Build a practical AI workflow';
  const persona = input.persona || 'engineer';
  const budget = input.budget || 'any';
  const rawTokens = tokenize(query);
  const { expanded, detectedIntents } = expandTokens(rawTokens);
  const indiaFocus = Boolean(input.indiaFocus || detectedIntents.includes('indic'));

  // 1. Score ALL 113+ Tools
  const scoredTools = TOOLS_DATA.map((tool) => {
    const res = scoreTool(tool, rawTokens, expanded, persona, budget, indiaFocus);
    return { tool, ...res };
  }).sort((a, b) => b.score - a.score);

  const topTools = scoredTools.slice(0, 8);

  // 2. Score ALL 88+ Open-Source Repos
  const scoredRepos = OPEN_SOURCE_REPOS.map((repo) => {
    const text = `${repo.name} ${repo.repo} ${repo.description} ${repo.category || ''} ${repo.replacesCommercialTool || ''}`.toLowerCase();
    let s = 0;
    for (const tok of rawTokens) if (text.includes(tok)) s += 12;
    for (const exp of expanded) if (text.includes(exp)) s += 3;
    return { repo, score: s };
  }).sort((a, b) => b.score - a.score);

  const topRepos = scoredRepos.slice(0, 5);

  // 3. Score ALL 16+ Workflows
  const scoredWorkflows = WORKFLOWS_DATA.map((wf) => {
    const text = `${wf.title} ${wf.description} ${wf.category} ${(wf.toolsUsed || []).join(' ')}`.toLowerCase();
    let s = 0;
    for (const tok of rawTokens) if (text.includes(tok)) s += 14;
    for (const exp of expanded) if (text.includes(exp)) s += 4;
    return { wf, score: s };
  }).sort((a, b) => b.score - a.score);

  const topWorkflows = scoredWorkflows.slice(0, 4);

  // 4. Score ALL 103+ YouTube Creators
  const scoredCreators = CREATORS_DATA.map((c) => {
    const text = `${c.name} ${c.handle} ${c.category} ${(c.topics || []).join(' ')} ${c.description || ''}`.toLowerCase();
    let s = 0;
    for (const tok of rawTokens) if (text.includes(tok)) s += 10;
    for (const exp of expanded) if (text.includes(exp)) s += 3;
    if (indiaFocus && c.region === 'India') s += 14;
    return { creator: c, score: s };
  }).sort((a, b) => b.score - a.score);

  const topCreators = scoredCreators.slice(0, 4);

  // 5. Select Best-Fit Frontier LLM Models
  const cheapestModels = [...OFFICIAL_MODELS]
    .sort((a, b) => a.inputCostPer1M - b.inputCostPer1M)
    .slice(0, 4);

  // Build 3 Dynamic Budget Tiers from REAL matched catalog entities
  const freeTools = scoredTools.filter(
    (x) => x.tool.pricingType === 'Free' || x.tool.pricingType === 'Open Source' || x.tool.freeTier
  );
  const freemiumTools = scoredTools.filter(
    (x) => x.tool.pricingType === 'Freemium' || x.tool.freeTier || x.tool.hasFreeTrial
  );
  const proTools = scoredTools.filter((x) => x.tool.pricingType === 'Paid' || x.tool.pricingType === 'Freemium');

  const pick = (list: typeof scoredTools, idx: number, fallbackIdx: number): ToolData =>
    (list[idx] || scoredTools[fallbackIdx] || TOOLS_DATA[0]).tool;

  const r0 = topRepos[0]?.repo || OPEN_SOURCE_REPOS[0];
  const wf0 = topWorkflows[0]?.wf || WORKFLOWS_DATA[0];

  const free1 = pick(freeTools, 0, 0);
  const free2 = pick(freeTools, 1, 1);
  const mid1 = pick(freemiumTools, 0, 0);
  const mid2 = pick(freemiumTools, 1, 2);
  const mid3 = pick(freemiumTools, 2, 3);
  const ent1 = pick(proTools, 0, 0);
  const ent2 = pick(proTools, 1, 1);
  const ent3 = pick(proTools, 2, 2);

  const makeStackUrl = (name: string, t1: ToolData, t2: ToolData, t3: ToolData) =>
    `/stack-builder?name=${encodeURIComponent(name)}&l1=${encodeURIComponent(t1.slug)}&l2=${encodeURIComponent(t2.slug)}&l3=${encodeURIComponent(t3.slug)}`;

  const tierA: FinderTierStack = {
    tier: 'A',
    pill: 'TIER A • $0 OPEN SOURCE / FREE',
    title: `Zero-Cost Local & Open Stack for "${query.slice(0, 48)}"`,
    estimatedMonthlyCost: '$0 / mo (₹0 software cost)',
    costAssumptions: 'Uses verified open-source weights/repos and free-tier tooling. Local GPU/electricity excluded.',
    difficulty: 'Intermediate',
    requiredCredentials: ['Local Machine (8GB–16GB RAM/VRAM)', 'Git / Docker or Ollama CLI'],
    steps: [
      {
        stepNumber: 1,
        role: 'Primary Open-Source Engine',
        toolName: r0.name,
        toolSlug: r0.slug,
        href: `/open-source/${r0.slug}`,
        pricingLabel: `Open Source (${r0.license || 'MIT'})`,
        reason: r0.description.slice(0, 120),
      },
      {
        stepNumber: 2,
        role: 'Core Free / Open Tool',
        toolName: free1.name,
        toolSlug: free1.slug,
        href: `/tools/${free1.slug}`,
        pricingLabel: free1.pricingType,
        reason: free1.tagline,
      },
      {
        stepNumber: 3,
        role: 'Supporting Workflow Companion',
        toolName: free2.name,
        toolSlug: free2.slug,
        href: `/tools/${free2.slug}`,
        pricingLabel: free2.pricingType,
        reason: free2.tagline,
      },
    ],
    cliCommand: r0.quickstartCommands?.cli || r0.quickstartCommands?.docker || `git clone ${r0.url}`,
    starterPrompt: `Act as a specialized AI engineer. Build a zero-cost pipeline for: "${query}". Use ${r0.name} + ${free1.name}. Output step-by-step commands, input/output contracts, and verification checks.`,
    stackBuilderUrl: makeStackUrl(`Free Stack: ${query.slice(0, 28)}`, free1, free2, pick(freeTools, 2, 2)),
  };

  const tierB: FinderTierStack = {
    tier: 'B',
    pill: 'TIER B • FREEMIUM / BALANCED (<$50/MO)',
    title: `Balanced Cloud & API Stack for "${query.slice(0, 48)}"`,
    estimatedMonthlyCost: '$15 – $39 / mo (~₹1,250 – ₹3,250)',
    costAssumptions: 'Combines generous free tiers with low-cost API tokens (e.g., DeepSeek / Gemini Flash / Claude Haiku).',
    difficulty: 'Beginner',
    requiredCredentials: [`${mid1.name} Account`, `${mid2.name} API Key`],
    steps: [
      {
        stepNumber: 1,
        role: 'Primary Application Layer',
        toolName: mid1.name,
        toolSlug: mid1.slug,
        href: `/tools/${mid1.slug}`,
        pricingLabel: `${mid1.pricingType} (${mid1.startingPrice || 'Free tier'})`,
        reason: mid1.tagline,
      },
      {
        stepNumber: 2,
        role: 'Automation & Model Layer',
        toolName: mid2.name,
        toolSlug: mid2.slug,
        href: `/tools/${mid2.slug}`,
        pricingLabel: `${mid2.pricingType} (${mid2.startingPrice || 'Usage-based'})`,
        reason: mid2.tagline,
      },
      {
        stepNumber: 3,
        role: 'Distribution & Quality Layer',
        toolName: mid3.name,
        toolSlug: mid3.slug,
        href: `/tools/${mid3.slug}`,
        pricingLabel: mid3.pricingType,
        reason: mid3.tagline,
      },
    ],
    cliCommand: `npx @aio-ai/cli init --workflow ${wf0.id} --tier freemium`,
    starterPrompt: `Design a cost-capped (<$50/mo) production workflow for: "${query}". Orchestrate ${mid1.name}, ${mid2.name}, and ${mid3.name} with clear fallback rules and token budgets.`,
    stackBuilderUrl: makeStackUrl(`Balanced Stack: ${query.slice(0, 24)}`, mid1, mid2, mid3),
  };

  const tierC: FinderTierStack = {
    tier: 'C',
    pill: 'TIER C • PRO / ENTERPRISE SCALE',
    title: `High-Throughput Production Architecture for "${query.slice(0, 44)}"`,
    estimatedMonthlyCost: '$99 – $350 / mo (Team SLA)',
    costAssumptions: 'Includes commercial team seats, SOC2/SSO governance, and frontier reasoning model API volume.',
    difficulty: 'Advanced',
    requiredCredentials: ['Enterprise API Keys', 'SSO / Audit Logging', 'Webhook Secrets'],
    steps: [
      {
        stepNumber: 1,
        role: 'Enterprise Core Platform',
        toolName: ent1.name,
        toolSlug: ent1.slug,
        href: `/tools/${ent1.slug}`,
        pricingLabel: `${ent1.pricingType} (${ent1.startingPrice || 'Custom'})`,
        reason: ent1.tagline,
      },
      {
        stepNumber: 2,
        role: 'Scale Orchestration Engine',
        toolName: ent2.name,
        toolSlug: ent2.slug,
        href: `/tools/${ent2.slug}`,
        pricingLabel: ent2.pricingType,
        reason: ent2.tagline,
      },
      {
        stepNumber: 3,
        role: 'Verification & Governance',
        toolName: ent3.name,
        toolSlug: ent3.slug,
        href: `/tools/${ent3.slug}`,
        pricingLabel: ent3.pricingType,
        reason: ent3.tagline,
      },
    ],
    cliCommand: `docker compose -f aio-enterprise-stack.yml up -d # ${ent1.slug} + ${ent2.slug}`,
    starterPrompt: `Architect an enterprise-grade, audited AI pipeline for: "${query}" using ${ent1.name}, ${ent2.name}, and ${ent3.name}. Include RBAC, PII redaction, retries, and latency SLAs.`,
    stackBuilderUrl: makeStackUrl(`Enterprise: ${query.slice(0, 26)}`, ent1, ent2, ent3),
  };

  const whyRecommended = [
    `Scanned all ${TOOLS_DATA.length} verified tools, ${OPEN_SOURCE_REPOS.length} open-source repos, ${WORKFLOWS_DATA.length} workflows, and ${CREATORS_DATA.length} educators.`,
    detectedIntents.length > 0
      ? `Detected core task intent domains: ${detectedIntents.join(', ').toUpperCase()}.`
      : `Ranked by direct keyword alignment, deterministic 5-Factor Authenticity Scores, and pricing transparency.`,
    budget === 'free'
      ? `Prioritized Zero-Cost Open-Source and Free-Tier options with explicit hardware/hosting assumptions.`
      : indiaFocus
      ? `Elevated India-First sovereign models and INR-friendly tools matching your query.`
      : `Synthesized 3 transparent budget tiers ($0 OSS, Balanced Freemium, Enterprise) with zero pay-to-win bias.`,
  ];

  return {
    query,
    detectedIntents,
    whyRecommended,
    tiers: { A: tierA, B: tierB, C: tierC },
    matchedTools: topTools.map(({ tool, score, reasons }) => ({
      slug: tool.slug,
      name: tool.name,
      tagline: tool.tagline,
      pricingType: tool.pricingType,
      startingPrice: tool.startingPrice || 'Free / Varies',
      score: calculateAuthenticScore(tool).total,
      isIndianAI: tool.isIndianAI,
      matchScore: score,
      matchReasons: reasons.length > 0 ? reasons : ['High deterministic 5-Factor Authenticity Score'],
    })),
    matchedWorkflows: topWorkflows.map(({ wf, score }) => ({
      id: wf.id,
      title: wf.title,
      category: wf.category,
      difficulty: wf.difficulty || 'Intermediate',
      estimatedCost: wf.estimatedCost || '$0 - $20/mo',
      matchScore: score,
    })),
    matchedRepos: topRepos.map(({ repo, score }) => ({
      slug: repo.slug,
      name: repo.name,
      repo: repo.repo,
      stars: repo.stars,
      minVramGb: repo.hardwareSpecs?.minVramGb || '8GB',
      license: repo.license || 'MIT',
      cli: repo.quickstartCommands?.cli || `git clone ${repo.url}`,
      matchScore: score,
    })),
    matchedCreators: topCreators.map(({ creator, score }) => ({
      slug: creator.slug,
      name: creator.name,
      handle: creator.handle,
      category: creator.category,
      subscribers: creator.subscribers,
      isIndia: creator.region === 'India',
      matchScore: score,
    })),
    recommendedModels: cheapestModels.map((m: LLMModel) => ({
      id: m.id,
      name: m.name,
      provider: m.provider,
      inputCostPer1M: m.inputCostPer1M,
      outputCostPer1M: m.outputCostPer1M,
      contextWindow: m.contextWindow,
    })),
    engineVersion: 'Finder v2.0 Hybrid Entity-Graph Engine',
    llmEnhanced: false,
  };
}
